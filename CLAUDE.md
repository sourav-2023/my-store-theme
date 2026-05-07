# CLAUDE.md

---

## Project

The Wardrobe Shillong — premium curated fashion boutique on Shopify. Physical store at Police Bazar, Shillong (Est. 2023). Three core categories: Sneakers, Clothing, Accessories (watches, belts, sunglasses, bags). This site extends the physical store — people who can't visit buy directly online. Store: `the-wardrobe-shillong.myshopify.com` *(update with actual store domain)*.

**Deployment:** Push to main → GitHub auto-sync → deploys to unpublished theme. Publish via Shopify admin to go live.

## Commands

```bash
shopify theme dev --store the-wardrobe-shillong.myshopify.com   # Local dev (hot reload)
shopify theme push --unpublished                                  # New unpublished theme
shopify theme push --theme <id>                                   # Push to specific theme
shopify theme list                                                # List all themes
```

Requires Node.js 18+, Shopify CLI. No local Liquid rendering — dev server requires internet.

---

## Architecture

**Dawn fork** — Dawn handles cart, Liquid, checkout plumbing. We own the visual layer via `wardrobe-*` prefixed files. Dawn's `settings_schema.json` is unmodified.

### Pages (V1 — 6 pages)

| Page | Template | Notes |
|---|---|---|
| Home | `index.json` | Hero → arrivals grid → story split → contact teaser |
| Sneakers | `collection.sneakers.json` | Collection grid + filter sidebar |
| Clothing | `collection.clothing.json` | Collection grid + filter sidebar |
| Accessories | `collection.accessories.json` | 2-col grid + subcategory pill filters |
| Product | `product.json` | Gallery left, details right — Shopify Web Components |
| Contact | `page.contact.json` | Dark section, map embed, form, WhatsApp |

Legal pages (Terms, Privacy, Refund) use default `page.json` — plain content, no custom template needed.

### Key Sections

- `wardrobe-hero` — Cream bg, eyebrow label (gold), H1 serif + italic gold accent line, two CTA buttons
- `wardrobe-arrivals` — "This Week's Arrivals" 4-col product grid with week datestamp + VIEW ALL link
- `wardrobe-story` — 50/50 split: left = store photo, right = gold rule + heading + 2 paragraphs + ghost CTA
- `wardrobe-categories` — 3-col editorial category grid linking to collections
- `wardrobe-contact-strip` — Dark section (`#1C1A17`): address, hours, WhatsApp, map embed, two CTAs
- `wardrobe-collection-header` — Full-bleed editorial banner with category name + subline overlay
- `wardrobe-filter-sidebar` — Brand, Size, Price, Availability filters (left rail on collection pages)
- `wardrobe-product-hero` — Gallery 50% sticky left, product info scrolls right
- `wardrobe-product-accordions` — Details/Condition/Shipping `<details>/<summary>` accordions

### Key Snippets

- `wardrobe-product-card` — Brand label (gold) + image + name + price. Handles "NEW" badge logic
- `wardrobe-buy-form` — Wraps `<product-form>`. Needs: `<form>`, `<input name="id">`, Add to Cart button, Buy Now button, `{% render 'loading-spinner' %}`
- `wardrobe-cart-drawer` — Slide-in from right. Product thumb + name + brand + size + price + qty stepper + remove
- `wardrobe-whatsapp-fab` — Floating WhatsApp button, bottom-right, all pages. Pre-fills product handle in message
- `wardrobe-trust-bar` — Single line below buy buttons: authenticity statement + "Est. 2023"

### JS Behavior

- **Accordions:** Desktop ≥1024px = exclusive open (one at a time). Mobile = multi-select. Close animation via `.wardrobe-accordion--closing` + 300ms timeout.
- **Gallery:** Desktop thumbnail click swaps main image via `data-media-index`. Mobile = scroll-snap swipe with arrow buttons using `scrollBy()`.
- **Cart:** Dawn's `product-form.js` → `PUB_SUB_EVENTS.cartUpdate` → header count badge updates. Cart type: slide-in drawer (not page redirect, not toast).
- **Subcategory pills (Accessories):** JS filters visible products by `data-type` attribute client-side. No page reload.
- **WhatsApp FAB:** Reads `og:title` meta tag on product pages to pre-fill message. Falls back to generic message on other pages.

---

## Design System

**Two fonts only:**
- `.w-serif` — Cormorant Garamond (300, 400, 400 italic). Preloaded WOFF2. Used for: hero H1, section headings, product titles, italic gold accents.
- `.w-sans` — Inter (400, 500, 600, 700). System fallback: `-apple-system, Helvetica`. Used for: nav, buttons, labels, body, price, metadata.

No third font. Ever.

**CSS:** `wardrobe-base.css` (tokens + utilities), `wardrobe-product.css` (product page), `wardrobe-collection.css` (collection pages), `wardrobe-header.css`, `wardrobe-home.css`. Vanilla CSS, custom properties, `wardrobe-` prefix. No framework, no Tailwind.

**Tokens:**

```css
--w-cream:          #F5F0E8;   /* primary background */
--w-off-white:      #FAF8F4;   /* card backgrounds */
--w-charcoal:       #1A1A1A;   /* primary text, nav, footer */
--w-sand:           #8B7355;   /* dividers, borders */
--w-gold:           #B8965A;   /* accent — brand labels, italic type, CTA outlines */
--w-dark-section:   #1C1A17;   /* footer, contact section */
--w-muted:          #6B6560;   /* secondary labels, metadata */
--w-separator:      #E8E3DA;   /* thin 1px dividers */
--w-warm-white:     #FFFFFF;   /* product image backgrounds */

--w-margin-desktop: 40px;
--w-margin-mobile:  20px;
--w-nav-height:     64px;
--w-base-unit:      8px;
```

Monochrome with gold accent only. No other colors introduced.

**Responsive:** Single breakpoint `1024px`. Mobile-first. Price + CTA above fold on mobile product page (sticky bottom bar).

**Border radius:** `0px` everywhere. Sharp corners only. No exceptions.

**Interactions:** Accordion 300ms CSS grid transition. CTA hover 150ms background swap. Gallery image swap — instant. Nothing else animated.

---

## Product Card Spec

```
[Image — 4:5 ratio, #FFFFFF bg, no padding]
[NEW badge — black fill, white text, absolute top-left, 11px uppercase] (conditional)
JORDAN                     ← .w-sans 700, 11px, uppercase, gold (#B8965A), 0.08em tracked
Air Jordan 1 Retro High    ← .w-sans 400, 16px, charcoal
₹24,999                    ← .w-sans 500, 16px, charcoal
```

No card border. No shadow. No hover overlay. Image scale 1.02 on card hover (CSS only, 200ms).

---

## Collections

| Collection Handle | Shopify Template |
|---|---|
| `sneakers` | `collection.sneakers` |
| `clothing` | `collection.clothing` |
| `accessories` | `collection.accessories` |
| `archive` | `collection` (default) |
| `new-arrivals` | Smart collection — tag: `new` |

**Product tags required on every product:**
- Brand: `jordan`, `nike`, `adidas`, `chrome-hearts`, `cartier`, `louis-vuitton`, etc.
- Category: `sneakers`, `clothing`, `accessories`
- Sub-type: `watches`, `bags`, `belts`, `sunglasses`, `wallets` (accessories only)
- Status: `new` (triggers NEW badge + smart collection)
- Style: `casual`, `sport`, `formal`

---

## Shopify Web Components

Product page uses official Shopify Storefront Web Components. Script tag in `product.json` layout:

```html
<script type="module" src="https://cdn.shopify.com/storefront/web-components.js"></script>
```

Account component CSS overrides (in `wardrobe-base.css`):

```css
shopify-account {
  --shopify-account-color-background: #F5F0E8;
  --shopify-account-color-text: #1A1A1A;
  --shopify-account-color-accent: #B8965A;
  --shopify-account-color-accent-text: #ffffff;
  --shopify-account-color-border: #E8E3DA;
  --shopify-account-font-heading: 'Cormorant Garamond', serif;
  --shopify-account-font-body: 'Inter', sans-serif;
  --shopify-account-radius-base: 0px;
  --shopify-account-radius-button: 0px;
  --shopify-account-radius-dialog: 0px;
}
```

---

## Brand Voice

Quiet confidence. Editorial, not salesy. Name the product, state the brand, let the piece speak.

**Banned words:** premium, luxury, affordable, exclusive, curated, bespoke, elevate, game-changer, revolutionary, amazing, incredible, best-in-class. No exclamation marks. No countdown timers. No fake urgency. No manufactured social proof. No competitor references.

**Copy patterns:**
- ✅ `"Hand-selected. Every piece."`
- ✅ `"From Police Bazar to your door."`
- ✅ `"When it's gone, it's gone."` (low stock only — factual, not manipulative)
- ❌ `"Shop the hottest sneakers NOW!"`
- ❌ `"Only 3 left — order fast!"`

---

## Reference Docs

- `website-prd.md` — Full section specs, page-by-page UI requirements, legal checklist
- `design-reference/` — Screenshots from thewardrobe.co reference site (images 1–4)
- `design-reference/shopify-web-components.html` — Product card + account component HTML source

---

## Out of Scope (V1)

- Blog / editorial content
- Lookbook page
- About page (story lives on homepage only)
- Size guide modal
- Multi-currency
- Loyalty / rewards program
- Product reviews / ratings