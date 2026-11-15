"""Error screenshot capture and upload helpers.

Screenshots are always saved to error/error_screenshot.png (replacing any
existing file) and uploaded to the onlyfiles service.
"""
from pathlib import Path

import requests

from common.config_loader import get
from common.paths import ERROR_DIR

ERROR_SCREENSHOT_PATH = Path(ERROR_DIR) / "error_screenshot.png"


def capture_error_screenshot(page):
    try:
        ERROR_DIR.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(ERROR_SCREENSHOT_PATH), full_page=True)
        print(f"[OK] Error screenshot captured: {ERROR_SCREENSHOT_PATH}", flush=True)
        return str(ERROR_SCREENSHOT_PATH)
    except Exception as exc:  # noqa: BLE001
        print(f"[WARNING] Could not capture error screenshot: {exc}", flush=True)
        return None


def upload_to_onlyfiles(screenshot_path):
    if not screenshot_path:
        return None
    url = get("onlyfiles_upload_url", "https://api.onlyfiles.com/v1/upload")
    expire = get("onlyfiles_expire", 172800)

    try:
        with open(screenshot_path, "rb") as file:
            response = requests.post(url, files={"file": file}, data={"expire": expire})

        if response.status_code == 200:
            res_data = response.json()
            if res_data.get("status"):
                direct_url = res_data["data"]["file"]["url"]["full"]
                print(f"[DIRECT LINK] (Expires in 48 Hours): {direct_url}", flush=True)
                return direct_url
            error = res_data.get("error", {})
            print(f"[WARNING] Upload failed: {error.get('message', 'Unknown error')}", flush=True)
        else:
            print(f"[WARNING] Upload failed: {response.status_code}", flush=True)
    except Exception as exc:  # noqa: BLE001
        print(f"[WARNING] Could not upload screenshot: {exc}", flush=True)
    return None