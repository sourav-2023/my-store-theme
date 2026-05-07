---
name: testing-wardrobe-theme
description: Test the Wardrobe Shillong Shopify theme end-to-end. Use when verifying Liquid template changes, collection styling, or homepage section fixes.
---

# Testing Wardrobe Shopify Theme

## Prerequisites

- The store is password-protected. You need the store password to access it.
- Store URL: `https://the-wardrobe-6jaajzyl.myshopify.com`
- Chrome must be started with CDP on port 29229 for browser testing.

## Devin Secrets Needed

- `SHOPIFY_STORE_PASSWORD` — store front password to bypass the password gate

## Starting Chrome

Chrome may not be running. Start it with:
```bash
DISPLAY=:0 /opt/.devin/chrome/chrome/linux-137.0.7118.2/chrome-linux64/chrome \
  --remote-debugging-port=29229 --no-first-run --disable-default-apps \
  --user-data-dir=/home/ubuntu/.browser_data_dir \
  "https://the-wardrobe-6jaajzyl.myshopify.com" > /dev/null 2>&1 &
```
Verify with: `curl -s http://localhost:29229/json/version`

Note: The Chrome binary path might change across environments. If the above path doesn't work, try `which google-chrome` or check `/opt/.devin/chrome/` for updated versions.

## Store Password Gate

- The store redirects all pages to `/password` when not authenticated.
- Enter the store password in the password field and click "Enter".
- After entering the password, cookies persist for the session — you can navigate freely.
- If using curl, the store returns 302 to `/password`. Browser-based testing is required for full verification.

## Key Pages to Test

| Page | URL | What to check |
|------|-----|---------------|
| Homepage | `/` | Hero, Arrivals, Story sections |
| Sneakers | `/collections/sneakers` | Wardrobe-styled collection (dark header, sidebar filters) |
| Clothing | `/collections/clothing` | Same Wardrobe layout |
| Accessories | `/collections/accessories` | Same Wardrobe layout |
| All Products | `/collections/all` | Should match other collection styling after template is added |
| About | `/pages/about` | Needs page created in Shopify Admin |
| Size Guide | `/pages/size-guide` | Needs page created in Shopify Admin |

## Common Bugs to Watch For

1. **Hardcoded links/text in Liquid sections** — Check that buttons use `{{ section.settings.* | default: '...' }}` instead of hardcoded values. Hover over links to verify the href in the browser status bar.

2. **Duplicate elements** — Some sections might render both a settings-driven element AND a hardcoded duplicate. Scroll carefully and count repeated elements.

3. **Collection template assignment** — Adding a `collection.{handle}.json` template file is necessary but may not be sufficient. The template might need to be assigned to the collection in Shopify Admin for it to take effect. Check if the handle-based auto-assignment works.

4. **Missing page content** — Template files (e.g., `page.about.liquid`) can exist in the theme but the actual pages need to be created in Shopify Admin with the correct URL handle and template assignment.

## Testing Approach

Since the PR branch is typically not merged to main, the live store shows the current (pre-fix) code. Testing confirms:
- Bugs exist on the live store (validates the fix is needed)
- Code changes are correct (verified by reading the diff)
- After merge, the fixes will resolve the confirmed bugs

## Wardrobe Design System

- Background: cream `#F5F0E8`
- Text: charcoal `#1A1A1A`
- Accent: gold `#B8965A`
- Fonts: Cormorant Garamond (headings), Inter (body)
- Collection pages: dark banner header, sidebar filters (Brand, Availability, Price), product grid

## CI Notes

The repo has GitHub Actions for CLA, Theme Check, and Lighthouse. These might fail due to missing secrets (CLA token, Shopify store credentials for Lighthouse). These are pre-existing config issues and not caused by code changes.
