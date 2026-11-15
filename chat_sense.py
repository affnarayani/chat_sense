import random
import sys
import time
import zipfile

from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth

from common import changed_locators, vision
from common.config_loader import get
from common.locators import LocatorBook, LocatorFailure
from common.paths import (
    EXTENSION_DIR,
    EXTENSION_ZIP,
    JSON_DIR,
    USER_DATA_DIR,
)
from common.screenshot import capture_error_screenshot, upload_to_onlyfiles

PLATFORM = get("platform", "allindiachat")


# =========================
# HELPERS
# =========================
def custom_random_wait(min_sec, max_sec):
    seconds = random.uniform(min_sec, max_sec)
    print(f"[WAIT] Sleeping for {seconds:.2f} seconds...", flush=True)
    time.sleep(seconds)


def load_messages():
    messages_file = JSON_DIR / "messages.json"
    if not messages_file.exists():
        print(f"[ERROR] '{messages_file}' not found!", flush=True)
        sys.exit(1)
    import json

    with open(messages_file, "r", encoding="utf-8") as fh:
        return json.load(fh)


def extract_extension():
    if not EXTENSION_DIR.exists() and EXTENSION_ZIP.exists():
        print(f"[STEP] Extracting {EXTENSION_ZIP.name} to {EXTENSION_DIR}...", flush=True)
        with zipfile.ZipFile(EXTENSION_ZIP, "r") as zip_ref:
            zip_ref.extractall(EXTENSION_DIR)
        print("[OK] Extension extracted successfully", flush=True)
    elif not EXTENSION_ZIP.exists() and not EXTENSION_DIR.exists():
        print(f"[ERROR] Neither {EXTENSION_ZIP} nor {EXTENSION_DIR} folder found!", flush=True)
        sys.exit(1)


# =========================
# MAIN
# =========================
def run():
    load_dotenv()
    print("[START] Script started", flush=True)

    messages_list = load_messages()
    print(f"[OK] Loaded {len(messages_list)} messages from JSON.", flush=True)

    extract_extension()
    path_to_extension = str(EXTENSION_DIR.resolve())

    book = LocatorBook(PLATFORM)

    # Reconcile changed locators against the locator txt files before running.
    changed_locators.apply_startup_correction(
        get("auto_correct_locator", True), {PLATFORM: book}
    )

    stealth = Stealth()
    pw_cm = sync_playwright()
    pw = pw_cm.__enter__()

    try:
        # ========================================================
        # LAUNCH PERSISTENT CONTEXT
        # ========================================================
        context = pw.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=get("headless", True),
            no_viewport=True,
            user_agent=get("user_agent"),
            args=[
                "--start-maximized",
                "--disable-blink-features=AutomationControlled",
                f"--disable-extensions-except={path_to_extension}",
                f"--load-extension={path_to_extension}",
            ],
        )

        stealth.use_sync(context)
        context.grant_permissions(["clipboard-read", "clipboard-write"])

        # ========================================================
        # ANTI-PROMO PAGE / TAB MANAGER
        # ========================================================
        if context.pages:
            main_page = context.pages[0]
        else:
            main_page = context.new_page()

        book.context = {"page": main_page, "main_page": main_page, "frame": None}

        def locate(name, state="visible", timeout=None, action=None):
            """Resolve a locator by name; on failure ask Gemini vision to log a fix."""
            timeout = timeout or get("element_timeout", 15000)
            try:
                return book.resolve(name, state=state, timeout=timeout)
            except LocatorFailure:
                suggested = vision.suggest_locator(main_page, action or name)
                broke = book.primary(name)
                if suggested and broke:
                    changed_locators.add_or_update(PLATFORM, name, broke, suggested)
                raise

        def handle_new_page(new_page):
            try:
                new_page.wait_for_load_state("domcontentloaded", timeout=5000)
                print(f"[TAB GUARD] Detected extra tab opening: {new_page.url}. Closing it immediately...", flush=True)
                new_page.close()
                main_page.bring_to_front()
            except Exception:
                pass

        context.on("page", handle_new_page)

        # ========================================================
        # URL NAVIGATION
        # ========================================================
        target_url = get("target_url", "https://www.allindiachat.com/delhi-chat/")
        print(f"[STEP] Opening URL: {target_url}...", flush=True)

        main_page.goto(target_url, wait_until="domcontentloaded")
        print("[OK] URL opened successfully with Extension enabled", flush=True)

        # Clean extra tabs safely
        for page in context.pages:
            if page != main_page:
                try:
                    page.close()
                except Exception:
                    pass
        main_page.bring_to_front()

        # ========================================================
        # IFRAME LOCATOR SEARCH & LOGIN
        # ========================================================
        print("[STEP] Searching for iframe locator...", flush=True)

        iframe_locator = locate(
            "advanced_iframe_locator",
            state="attached",
            timeout=get("iframe_timeout", 15000),
            action="wait for the chat iframe to attach",
        )
        print("Locator Found!", flush=True)

        frame = book.raw("advanced_iframe_frame")
        book.context["frame"] = frame

        # 1. Random username input
        print("[STEP] Locating dynamic input text field inside iframe...", flush=True)
        input_field = locate(
            "username_input_field",
            state="visible",
            action="type the username into the login input field",
        )

        random_num = random.randint(10000, 99999)
        random_username = f"shreya_jena{random_num}"
        print(f"[STEP] Filling text field with random username: '{random_username}'...", flush=True)
        input_field.fill(random_username)
        print("[OK] Text field filled successfully", flush=True)

        # Delay before submitting
        print("[STEP] Waiting before clicking submit button...", flush=True)
        custom_random_wait(get("pre_submit_min_wait", 6), get("pre_submit_max_wait", 12))

        # 2. Submit button click
        print("[STEP] Locating submit button inside iframe...", flush=True)
        submit_button = locate(
            "submit_button",
            state="visible",
            timeout=get("submit_timeout", 10000),
            action="click the login submit button",
        )

        print("[STEP] Clicking submit button...", flush=True)
        submit_button.click()
        print("[OK] Submit button clicked successfully", flush=True)

        # 3. Post-submit wait
        print("[STEP] Performing post-submit random wait...", flush=True)
        custom_random_wait(get("post_submit_min_wait", 15), get("post_submit_max_wait", 30))

        # ========================================================
        # COLOR PICKER OPTIONS & SETTINGS (ONE-TIME ONLY)
        # ========================================================
        print("[STEP] Locating adjustment settings icon...", flush=True)
        adjust_icon = locate(
            "adjust_icon",
            state="visible",
            action="open the adjustment settings icon",
        )

        print("[STEP] Clicking adjustment settings icon...", flush=True)
        adjust_icon.click()
        print("[OK] Settings icon clicked successfully", flush=True)

        print("[STEP] Waiting after clicking adjustment icon...", flush=True)
        custom_random_wait(get("pre_submit_min_wait", 6), get("pre_submit_max_wait", 12))

        # Apply colour using the full hierarchy CSS path
        print("[STEP] Locating colour box using full hierarchy CSS path...", flush=True)
        color_box = locate(
            "color_box",
            state="attached",
            action="select the light red colour box",
        )

        try:
            color_box.scroll_into_view_if_needed()
            color_box.wait_for(state="visible", timeout=5000)

            print("[STEP] Performing Multi-Click Strategy on colour box...", flush=True)
            color_box.click(force=True)
            color_box.dispatch_event("click")
            print("[OK] Light Red colour click sequences dispatched successfully", flush=True)
        except Exception as color_err:
            print(f"[WARNING] Native CSS click failed, falling back to JavaScript evaluate: {color_err}", flush=True)
            color_box.evaluate("el => el.click()")
            print("[OK] Light Red colour applied via JavaScript execution", flush=True)

        print("[STEP] Waiting after colour selection...", flush=True)
        custom_random_wait(get("min_random_wait", 3), get("max_random_wait", 6))

        # ========================================================
        # CHAT BOX INPUT & LOOP FOR N MESSAGES
        # ========================================================
        print("[STEP] Locating Kiwi IRC message textbox editor...", flush=True)
        chat_box = locate(
            "chat_box",
            state="visible",
            action="focus the chat message editor textbox",
        )

        message_count = get("message_count", 150)
        typing_min = get("typing_min_delay", 0.05)
        typing_max = get("typing_max_delay", 0.15)
        min_rand = get("min_random_wait", 3)
        max_rand = get("max_random_wait", 6)

        for msg_count in range(1, message_count + 1):
            print(f"\n[LOOP - MESSAGE {msg_count}/{message_count}] Starting sequence...", flush=True)

            # Focus the text field
            print(f"[LOOP {msg_count}] Clicking on chat box editor to focus...", flush=True)
            chat_box.click()
            chat_box.focus()

            custom_random_wait(min_rand, max_rand)

            # Enable bold formatting
            print(f"[LOOP {msg_count}] Pressing Control+B to enable Bold formatting...", flush=True)
            main_page.keyboard.press("Control+B")

            custom_random_wait(min_rand, max_rand)

            # Pick a random message
            selected_message = random.choice(messages_list)
            print(f"[LOOP {msg_count}] Selected Message to type: '{selected_message[:40]}...'", flush=True)

            # Human simulated typing
            print(f"[LOOP {msg_count}] Typing selected message with human simulated delay...", flush=True)
            for char in selected_message:
                main_page.keyboard.type(char)
                time.sleep(random.uniform(typing_min, typing_max))

            print(f"[OK] Message {msg_count} text typing finished.", flush=True)
            custom_random_wait(get("min_absolute_wait", 1), get("max_absolute_wait", 1))

            # Send the message
            print(f"[LOOP {msg_count}] Hitting Enter key to send message...", flush=True)
            main_page.keyboard.press("Enter")
            print(f"[OK] Message {msg_count}/{message_count} sent successfully", flush=True)

            # Interval between messages
            if msg_count < message_count:
                print(f"[LOOP {msg_count}] Waiting for next cycle interval...", flush=True)
                custom_random_wait(
                    get("between_messages_min_wait", 30),
                    get("between_messages_max_wait", 60),
                )

        print(f"\n[SUCCESS] Successfully sent all {message_count} messages loop sequence!", flush=True)

        print("[STEP] Script wrapping up final delay sequence...", flush=True)
        custom_random_wait(get("final_min_wait", 5), get("final_max_wait", 10))

    except Exception as exc:
        print("[ERROR]", exc, flush=True)
        if "main_page" in locals() and main_page:
            screenshot_path = capture_error_screenshot(main_page)
            upload_to_onlyfiles(screenshot_path)
        sys.exit(1)

    finally:
        print("[STEP] Closing browser and exiting...", flush=True)
        try:
            context.close()
        except Exception:
            pass

        try:
            pw_cm.__exit__(None, None, None)
        except Exception:
            pass

        print("[DONE] Script finished", flush=True)


if __name__ == "__main__":
    run()