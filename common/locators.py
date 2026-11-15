"""Platform locator book.

Loads locators from ``locators/<platform>_locators.txt`` and resolves them by
name. Each non-comment line has the form::

    <name> = <playwright expression>

For a given element the primary locator is written first; any additional lines
that repeat the SAME name are fallbacks, tried in file order::

    chatgpt_textbox = page.get_by_role('textbox', name='Chat with ChatGPT').or_(...)
    chatgpt_textbox = page.locator('div[contenteditable="true"]').filter(...).first
    chatgpt_textbox = page.locator('#prompt-textarea')

Resolution strategy: primary and fallbacks are checked concurrently in a
round-robin loop (short time slices) so the first one that becomes ready wins,
without waiting for the primary's full timeout before trying a fallback. Only
when every candidate is exhausted is a ``LocatorFailure`` raised so the caller
can fall back to Gemini vision.

Expressions are evaluated with the runtime context
(``page``/``main_page``/``frame``) supplied by the caller.
"""
import time
from pathlib import Path

from common.paths import LOCATORS_DIR

# Per-attempt slice (ms) when polling candidates in the round-robin loop.
_POLL_SLICE_MS = 300


class LocatorFailure(Exception):
    """Raised when a locator name and all of its fallbacks fail to resolve."""

    def __init__(self, name, tried):
        self.name = name
        self.tried = tried
        super().__init__(f"All locator candidates failed for '{name}': {tried}")


class LocatorBook:
    def __init__(self, platform):
        self.platform = platform
        self.path = Path(LOCATORS_DIR) / f"{platform}_locators.txt"
        self.context = {}
        self.entries = []  # list of (name, expression) preserving file order
        self.load()

    def load(self):
        self.entries = []
        if not self.path.exists():
            return
        for raw in self.path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            name, expr = line.split("=", 1)
            self.entries.append((name.strip(), expr.strip()))

    def _candidates(self, name):
        """All expressions sharing this name: primary first, then fallbacks."""
        return [expr for entry_name, expr in self.entries if entry_name == name]

    def primary(self, name):
        for entry_name, expr in self.entries:
            if entry_name == name:
                return expr
        return None

    def raw(self, name):
        """Evaluate a single named locator expression (no waiting)."""
        for entry_name, expr in self.entries:
            if entry_name == name:
                return eval(expr, {}, dict(self.context))
        raise KeyError(f"Locator '{name}' not found in {self.path}")

    def resolve(self, name, state="visible", timeout=15000):
        """Return the first candidate (primary or fallback) that becomes ready.

        Candidates are polled in a round-robin loop using short slices, so a fast
        fallback is used as soon as it is ready instead of waiting for the
        primary's full timeout.
        """
        candidates = self._candidates(name)
        if not candidates:
            raise LocatorFailure(name, [])

        deadline = time.time() + max(timeout, 0) / 1000.0
        last_errors = []
        while True:
            for expr in candidates:
                remaining_ms = (deadline - time.time()) * 1000.0
                if remaining_ms <= 0:
                    raise LocatorFailure(name, last_errors or [(e, "timeout") for e in candidates])
                try:
                    locator = eval(expr, {}, dict(self.context))
                    locator.wait_for(state=state, timeout=min(_POLL_SLICE_MS, remaining_ms))
                    return locator
                except Exception as exc:  # noqa: BLE001 - keep polling other candidates
                    last_errors.append((expr, str(exc)))

    # --- mutation helpers used by the auto-correct step ---
    def has_expression(self, expr):
        return any(existing == expr for _, existing in self.entries)

    def add_fallback(self, name, expr):
        """Append ``expr`` as a same-named fallback directly below the group."""
        if not self.path.exists():
            return False
        lines = self.path.read_text(encoding="utf-8").splitlines()

        insert_at = None
        for index, raw in enumerate(lines):
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            entry_name = line.split("=", 1)[0].strip()
            if entry_name == name:
                insert_at = index + 1

        if insert_at is None:
            return False

        lines.insert(insert_at, f"{name} = {expr}")
        self.path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        self.load()
        return True