"""Project path helpers.

Resolves the well-known folders (json, locators, error, extension, user_data)
from config.json so every module agrees on where files live.
"""
from pathlib import Path

from common.config_loader import get

ROOT = Path(__file__).resolve().parent.parent


def resolve(rel_path):
    return (ROOT / rel_path).resolve()


_PATHS = get("paths", {}) or {}

JSON_DIR = resolve(_PATHS.get("json_dir", "json"))
LOCATORS_DIR = resolve(_PATHS.get("locators_dir", "locators"))
ERROR_DIR = resolve(_PATHS.get("error_dir", "error"))
EXTENSION_ZIP = resolve(_PATHS.get("extension_zip", "extension/extension.zip"))
EXTENSION_DIR = resolve(_PATHS.get("extension_dir", "extracted_extension"))
USER_DATA_DIR = resolve(_PATHS.get("user_data_dir", "user_data"))