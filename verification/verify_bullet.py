from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Load the local index.html file
        page.goto(f"file://{os.getcwd()}/index.html")

        # Wait for the bullet system section to be visible
        page.locator("#bullet-system").scroll_into_view_if_needed()
        page.wait_for_selector(".bullet-img")

        # Take a screenshot of the bullet system section
        page.locator("#bullet-system").screenshot(path="verification/bullet_system.png")
        print("Screenshot saved to verification/bullet_system.png")
        browser.close()

if __name__ == "__main__":
    run()
