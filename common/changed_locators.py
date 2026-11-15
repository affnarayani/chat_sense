"""Track locators that broke at runtime and their vision-suggested replacements.

The JSON file lives at ``json/changed_locators.json`` and is updated *during* the
run (each time a locator fails), not only at the end.

Each entry looks like::

    {
      "platform": "allindiachat",
      "locator_name": "chat_box",
      "broke_locator": "frame.locator('div.kiwi-ircinput-editor[role=\"textbox\"]').first",
      "suggested_locator": "page.locator('div.kiwi-input')",
    }
"""
import json
from pathlib import Path

from common.paths import JSON_DIR

CHANGED_PATH = Path(JSON_DIR) / "changed_locators.json"


def load():
    if not CHANGED_PATH.exists():
        return []
    try:
        with open(CHANGED_PATH, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        return data if isinstance(data, list) else []
    except Exception:
        return []


def _save(entries):
    CHANGED_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(CHANGED_PATH, "w", encoding="utf-8") as fh:
        json.dump(entries, fh, indent=2, ensure_ascii=False)
        fh.write("\n")


def add_or_update(platform, locator_name, broke_locator, suggested_locator):
    """Insert or update the entry for ``broke_locator``. Returns True if saved."""
    if not suggested_locator:
        return False
    entries = load()
    for entry in entries:
        if entry.get("broke_locator") == broke_locator:
            entry["platform"] = platform
            entry["locator_name"] = locator_name
            entry["suggested_locator"] = suggested_locator
            _save(entries)
            return True
    entries.append({
        "platform": platform,
        "locator_name": locator_name,
        "broke_locator": broke_locator,
        "suggested_locator": suggested_locator,
    })
    _save(entries)
    return True


def remove(broke_locator):
    entries = load()
    remaining = [e for e in entries if e.get("broke_locator") != broke_locator]
    if len(remaining) != len(entries):
        _save(remaining)
        return True
    return False


def apply_startup_correction(auto_correct, books):
    """Reconcile changed_locators.json with the locator txt files at startup.

    ``books`` maps platform -> LocatorBook.

    * auto_correct True  -> append each suggested locator below its primary as a
      fallback, then remove that entry from the JSON.
    * auto_correct False -> remove an entry only when its suggested locator is
      already present in the platform locator txt; otherwise keep it.
    """
    entries = load()
    if not entries:
        return

    remaining = []
    for entry in entries:
        platform = entry.get("platform")
        name = entry.get("locator_name")
        suggested = entry.get("suggested_locator")
        book = books.get(platform)

        if auto_correct:
            if book and name and suggested and book.add_fallback(name, suggested):
                print(f"[AUTO-CORRECT] Applied fallback for '{name}': {suggested}", flush=True)
                continue  # fixed -> drop the entry
            remaining.append(entry)
        else:
            if book and suggested and book.has_expression(suggested):
                print(f"[AUTO-CORRECT] Suggested locator already present for '{name}', removing entry.", flush=True)
                continue
            remaining.append(entry)

    _save(remaining)