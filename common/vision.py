"""Gemini vision helper.

When a locator (and all of its fallbacks) fail, take a screenshot and ask
Gemini 3.5 Flash-Lite to suggest a Playwright CSS locator for the intended
action. The suggestion is returned to the caller so it can be recorded in
json/changed_locators.json (log-only: it is NOT used to drive the current run).

Authentication: the API key is read from the GEMINI_API_KEY environment variable
(or a ``gemini_api_key`` config value) and sent as the ``x-goog-api-key`` header.
"""
import base64
import json
import os

import requests

from common.config_loader import get

_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

_PROMPT = (
    "You are a Playwright automation helper. Look at this web page screenshot and "
    "return the single best Playwright CSS locator for the element required to "
    'accomplish: "{action}". '
    'Respond with JSON only, for example {{"selector": "button.login_button"}}. '
    "Prefer stable selectors based on role, text, name or attributes. "
    "Do NOT use generated ids that start with '#'."
)


def _api_key():
    return os.getenv("GEMINI_API_KEY") or get("gemini_api_key")


_COMPLETE_PREFIXES = ("page.locator(", "frame.locator(", "page.get_by_", "frame.get_by_")


def _is_complete(expression):
    return expression.startswith(_COMPLETE_PREFIXES)


def _normalize(selector):
    """Wrap a raw selector in page.locator(...) and reject unstable id selectors."""
    if not selector:
        return None

    selector = selector.strip()
    probe = selector
    if _is_complete(probe):
        probe = probe[probe.find("(") + 1: probe.rfind(")")]
    probe = probe.strip().strip("'\"")

    if probe.startswith("#"):
        print(f"[VISION] Skipping unstable id selector: {selector}", flush=True)
        return None

    if _is_complete(selector):
        return selector
    return f"page.locator({selector!r})"


def suggest_locator(page, action):
    """Return a suggested Playwright locator expression, or None."""
    key = _api_key()
    if not key:
        print("[VISION] GEMINI_API_KEY not set; skipping vision suggestion.", flush=True)
        return None

    model = get("gemini_model", "gemini-3.5-flash-lite")
    try:
        screenshot = page.screenshot(full_page=True)
    except Exception as exc:  # noqa: BLE001
        print(f"[VISION] Could not capture screenshot: {exc}", flush=True)
        return None

    image_b64 = base64.b64encode(screenshot).decode("utf-8")
    payload = {
        "contents": [{
            "parts": [
                {"text": _PROMPT.format(action=action)},
                {"inline_data": {"mime_type": "image/png", "data": image_b64}},
            ]
        }],
        "generationConfig": {"temperature": 0, "responseMimeType": "application/json"},
    }

    try:
        response = requests.post(
            _ENDPOINT.format(model=model),
            headers={"Content-Type": "application/json", "x-goog-api-key": key},
            json=payload,
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(text)
        selector = (parsed.get("selector") or "").strip()
    except Exception as exc:  # noqa: BLE001
        print(f"[VISION] Gemini suggestion failed: {exc}", flush=True)
        return None

    return _normalize(selector)