import os
import sys
import time
import json
import random
import zipfile
from pathlib import Path

from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth
import requests

# =========================
# CONFIG
# =========================
HEADLESS = True

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

# Extension Configuration
ZIP_FILE = "extension.zip"
EXTENSION_DIR = Path("extracted_extension")
MESSAGES_FILE = "messages.json"

# =========================
# EXTENSION UNZIPPER
# =========================
if not EXTENSION_DIR.exists() and Path(ZIP_FILE).exists():
    print(f"[STEP] Extracting {ZIP_FILE} to {EXTENSION_DIR}...", flush=True)
    with zipfile.ZipFile(ZIP_FILE, 'r') as zip_ref:
        zip_ref.extractall(EXTENSION_DIR)
    print("[OK] Extension extracted successfully", flush=True)
elif not Path(ZIP_FILE).exists() and not EXTENSION_DIR.exists():
    print(f"[ERROR] Neither {ZIP_FILE} nor {EXTENSION_DIR} folder found!", flush=True)
    sys.exit(1)

PATH_TO_EXTENSION = str(EXTENSION_DIR.resolve())


# =========================
# HELPER FUNCTIONS
# =========================
def custom_random_wait(min_sec, max_sec):
    seconds = random.uniform(min_sec, max_sec)
    print(f"[WAIT] Sleeping for {seconds:.2f} seconds...", flush=True)
    time.sleep(seconds)

def load_messages():
    if not Path(MESSAGES_FILE).exists():
        print(f"[ERROR] '{MESSAGES_FILE}' not found in root folder!", flush=True)
        sys.exit(1)
    with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def upload_to_tmpfiles(screenshot_path):
    url = "https://tmpfiles.org/api/v1/upload"
    
    with open(screenshot_path, "rb") as file:
        response = requests.post(url, files={"file": file})
        
    if response.status_code == 200:
        res_data = response.json()
        # Direct view URL banane ke liye '/dl/' replace karte hain
        page_url = res_data["data"]["url"]
        direct_url = page_url.replace("tmpfiles.org/", "tmpfiles.org/dl/")
        print(f"👉 DIRECT LINK (Expires in 2 Hours): {direct_url}")
        return direct_url
    else:
        print(f"[WARNING] Upload Failed: {response.status_code}")
        return None

# =========================
# MAIN
# =========================
def run():
    print("[START] Script started", flush=True)
    
    # JSON messages load karein
    messages_list = load_messages()
    print(f"[OK] Loaded {len(messages_list)} messages from JSON.", flush=True)

    stealth = Stealth()
    pw_cm = sync_playwright()
    pw = pw_cm.__enter__()

    try:
        # ========================================================
        # LAUNCH PERSISTENT CONTEXT
        # ========================================================
        user_data_dir = "./user_data"
        
        context = pw.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=HEADLESS,
            no_viewport=True,
            user_agent=USER_AGENT,
            args=[
                "--start-maximized",
                "--disable-blink-features=AutomationControlled",
                f"--disable-extensions-except={PATH_TO_EXTENSION}",
                f"--load-extension={PATH_TO_EXTENSION}"
            ]
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
        TARGET_URL = "https://www.allindiachat.com/delhi-chat/"
        print(f"[STEP] Opening URL: {TARGET_URL}...", flush=True)

        main_page.goto(
            TARGET_URL,
            wait_until="domcontentloaded"
        )

        print("[OK] URL opened successfully with Extension enabled", flush=True)

        # Clean extra tabs safely
        for p in context.pages:
            if p != main_page:
                try:
                    p.close()
                except:
                    pass
        main_page.bring_to_front()

        # ========================================================
        # IFRAME LOCATOR SEARCH & LOGIN
        # ========================================================
        print("[STEP] Searching for iframe locator...", flush=True)
        
        iframe_selector = 'iframe[name="advanced_iframe"]'
        iframe_locator = main_page.locator(iframe_selector)
        
        try:
            iframe_locator.wait_for(state="attached", timeout=15000)
            print("Locator Found!", flush=True)
            
            frame = main_page.frame_locator(iframe_selector)
            
            # 1. REQUIREMENT: Random Username input karna -> shreya_jena{5 digit number}
            print("[STEP] Locating dynamic input text field inside iframe...", flush=True)
            input_field = frame.locator('input[id^="inp_"]').first
            input_field.wait_for(state="visible", timeout=15000)
            
            random_num = random.randint(10000, 99999)
            random_username = f"shreya_jena{random_num}"
            print(f"[STEP] Filling text field with random username: '{random_username}'...", flush=True)
            input_field.fill(random_username)
            print("[OK] Text field filled successfully", flush=True)
            
            # Username ke baad delay (6-12 seconds)
            print("[STEP] Waiting before clicking submit button...", flush=True)
            custom_random_wait(6, 12)
            
            # 2. Submit Button Click karna
            print("[STEP] Locating submit button inside iframe...", flush=True)
            submit_button = frame.locator('button[type="submit"], input[type="submit"], button.login_button, input.login_button').first
            submit_button.wait_for(state="visible", timeout=10000)
            
            print("[STEP] Clicking submit button...", flush=True)
            submit_button.click()
            print("[OK] Submit button clicked successfully", flush=True)
            
            # 3. Submit ke baad mandatory 15-30 seconds ka wait
            print("[STEP] Performing post-submit random wait (15-30 seconds)...", flush=True)
            custom_random_wait(15, 30)
            
            # ========================================================
            # COLOR PICKER OPTIONS & SETTINGS (ONE-TIME ONLY)
            # ========================================================
            print("[STEP] Locating adjustment settings icon...", flush=True)
            adjust_icon = frame.locator('i.fa.fa-adjust, i[class*="fa-adjust"]').first
            adjust_icon.wait_for(state="visible", timeout=15000)
            
            print("[STEP] Clicking adjustment settings icon...", flush=True)
            adjust_icon.click()
            print("[OK] Settings icon clicked successfully", flush=True)
            
            # Click ke baad 6-12 seconds ka delay
            print("[STEP] Waiting after clicking adjustment icon...", flush=True)
            custom_random_wait(6, 12)
            
            # Full hierarchy CSS Path selector se color apply karna
            print("[STEP] Locating colour box using full hierarchy CSS path...", flush=True)
            css_selector = "body > div.kiwi-wrap.kiwi-theme-bg > div.kiwi-workspace > div.kiwi-controlinput.kiwi-theme-bg.kiwi-controlinput--show-send.kiwi-controlinput--show-tools.kiwi-controlinput--show-tools--inline > div.kiwi-controlinput-active-tool > div > div > div.kiwi-inputtools-colours-colour.irc-bg-colour-light-red"
            color_box = frame.locator(css_selector).first
            
            try:
                color_box.wait_for(state="attached", timeout=10000)
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
            
            # Color select karne ke baad 3-6 seconds wait karna
            print("[STEP] Waiting after colour selection (3-6 seconds)...", flush=True)
            custom_random_wait(3, 6)
            
            # ========================================================
            # CHAT BOX INPUT & LOOP FOR 150 MESSAGES
            # ========================================================
            print("[STEP] Locating Kiwi IRC message textbox editor...", flush=True)
            chat_box = frame.locator('div.kiwi-ircinput-editor[role="textbox"]').first
            chat_box.wait_for(state="visible", timeout=15000)

            # REQUIREMENT: Loop mein 150 baar message send karna hai
            for msg_count in range(1, 151):
                print(f"\n[LOOP - MESSAGE {msg_count}/150] Starting sequence...", flush=True)
                
                # REQUIREMENT: Textfield focus karna
                print(f"[LOOP {msg_count}] Clicking on chat box editor to focus...", flush=True)
                chat_box.click()
                chat_box.focus()
                
                # Focus karne ke baad 3-6 seconds wait karna
                custom_random_wait(3, 6)
                
                # REQUIREMENT: Har message se pehle Control+B press karna (Bold select)
                print(f"[LOOP {msg_count}] Pressing Control+B to enable Bold formatting...", flush=True)
                main_page.keyboard.press("Control+B")
                
                # Control+B ke baad 3-6 seconds wait karna
                custom_random_wait(3, 6)
                
                # REQUIREMENT: messages.json se randomly ek line pick karna
                selected_message = random.choice(messages_list)
                print(f"[LOOP {msg_count}] Selected Message to type: '{selected_message[:40]}...'", flush=True)
                
                # REQUIREMENT: Human simulated typing
                print(f"[LOOP {msg_count}] Typing selected message with human simulated delay...", flush=True)
                for char in selected_message:
                    main_page.keyboard.type(char)
                    time.sleep(random.uniform(0.05, 0.15))  # Smooth and realistic speed (50ms to 150ms per key)
                
                print(f"[OK] Message {msg_count} text typing finished.", flush=True)
                time.sleep(1) # Integration gap
                
                # Message send karne ke liye Enter press karna
                print(f"[LOOP {msg_count}] Hitting Enter key to send message...", flush=True)
                main_page.keyboard.press("Enter")
                print(f"[OK] Message {msg_count}/150 sent successfully", flush=True)
                
                # REQUIREMENT: Interval of 30 to 60 seconds each between messages
                if msg_count < 150:  # Aakhri message ke baad itna lamba wait nahi chahiye
                    print(f"[LOOP {msg_count}] Waiting for next cycle interval (30-60 seconds)...", flush=True)
                    custom_random_wait(30, 60)
            
            print("\n[SUCCESS] Successfully sent all 150 messages loop sequence!", flush=True)

        except Exception as loc_err:
            print(f"[ERROR] Chat manipulation or elements action failed: {loc_err}", flush=True)
            if 'main_page' in locals() and main_page:
                try:
                    screenshot_path = "error_screenshot.png"
                    main_page.screenshot(path=screenshot_path, full_page=True)
                    print(f"[OK] Error screenshot captured: {screenshot_path}", flush=True)
                    
                    upload_to_tmpfiles(screenshot_path)
                except Exception as screenshot_err:
                    print(f"[WARNING] Could not capture or upload screenshot: {screenshot_err}", flush=True)
            sys.exit(1)

        print("[STEP] Script wrapping up final delay sequence...", flush=True)
        custom_random_wait(5, 10)

    except Exception as e:
        print("[ERROR]", e, flush=True)
        if 'main_page' in locals() and main_page:
            try:
                screenshot_path = "error_screenshot.png"
                main_page.screenshot(path=screenshot_path, full_page=True)
                print(f"[OK] Error screenshot captured: {screenshot_path}", flush=True)
                
                upload_to_tmpfiles(screenshot_path)
            except Exception as screenshot_err:
                print(f"[WARNING] Could not capture or upload screenshot: {screenshot_err}", flush=True)
        sys.exit(1)

    finally:
        print("[STEP] Closing browser and exiting...", flush=True)
        try:
            context.close()
        except:
            pass

        try:
            pw_cm.__exit__(None, None, None)
        except:
            pass

        print("[DONE] Script finished", flush=True)


if __name__ == "__main__":
    run()