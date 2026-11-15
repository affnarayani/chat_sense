"""Central configuration loader.

All tunable settings live in json/config.json. Import ``get`` anywhere to read a
value with an optional fallback default, e.g.::

    from common.config_loader import get
    headless = get("headless", True)
"""
import json
from functools import lru_cache
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parent.parent / "json" / "config.json"


@lru_cache(maxsize=1)
def _load():
    with open(CONFIG_PATH, "r", encoding="utf-8") as fh:
        return json.load(fh)


def get(key, default=None):
    """Return the config value for ``key`` or ``default`` when missing."""
    try:
        return _load().get(key, default)
    except Exception:
        return default


def reload():
    """Clear the cached config (useful after editing config.json at runtime)."""
    _load.cache_clear()