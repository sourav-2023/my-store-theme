# The Wardrobe Shillong — Windsurf Handoff v2
**Date:** May 7, 2026  
**Store:** the-wardrobe-6jaajzyl.myshopify.com  
**Admin:** https://admin.shopify.com/store/the-wardrobe-6jaajzyl  
**Theme files:** `C:\Users\soura\my-store\`  
**Admin API token:** `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`  
**Storefront token (client-safe):** `cd4e43dd3dad1ca770eb7bd76eafa79d`  
**WhatsApp:** +91 97005 752736

---

## Current Status

| Area | Status | Notes |
|------|--------|-------|
| Theme | ✅ Published | "The Wardrobe Theme" is live |
| Collections (Sneakers/Clothing/Accessories) | ⚠️ Needs fix | Need to be recreated as Automated on correct store |
| Products | ⚠️ Only 4 exist | 14 more in `wardrobe-products-import.csv` need importing |
| Header/Nav | ✅ Done | `wardrobe-header.liquid` with mobile drawer |
| Collection pages | ✅ Done | Custom templates with sidebar filters |
| Product page | ✅ Done | Gallery, accordions, related products |
| Footer | ✅ Done | `wardrobe-footer.liquid` |
| Mobile CSS | ✅ Done | `wardrobe-mobile.css` |
| Cart drawer styling | ❌ Not done | Dawn default styles |
| Contact page | ❌ Not done | Needs `wardrobe-contact-page.liquid` |
| Legal pages | ❌ Not done | Terms, Privacy, Refund |

---

## CRITICAL: Fix Collections First

The collections (Sneakers, Clothing, Accessories) are **manual type** on the live store — products won't show until they're **Automated** with Product Type rules.

### Fix via Shopify Admin:

Go to: https://admin.shopify.com/store/the-wardrobe-6jaajzyl/collections

For each collection:
1. Click collection → **Edit**
2. Under "Collection type" → change to **Automated**  
3. Condition: `Product type` → `is equal to` → `Sneakers` (or `Clothing` / `Accessories`)
4. Right sidebar → **Theme template** → select `collection.sneakers` (or `clothing` / `accessories`)
5. **Save**

| Collection | Type Rule | Template |
|------------|-----------|----------|
| Sneakers | Product type = `Sneakers` | `collection.sneakers` |
| Clothing | Product type = `Clothing` | `collection.clothing` |
| Accessories | Product type = `Accessories` | `collection.accessories` |

### Or fix via Shopify MCP (if connected):
The `.mcp.json` in the project root has the Shopify MCP configured. After fixing, also publish each collection to Online Store.

---

## Import Remaining Products

File: `C:\Users\soura\my-store\wardrobe-products-import.csv`

**Currently in store (4 products):**
- Air Jordan 1 Retro High OG "Chicago" → Sneakers ✅
- Nike SB Dunk Low "Strangelove" → Sneakers ✅
- Chrome Hearts Cross Patch Hoodie → Clothing ✅
- Louis Vuitton Damier Ebene Wallet → Accessories ✅

**Missing — import from CSV (14 more):**

| Product | Type |
|---------|------|
| New Balance 550 | Sneakers |
| Cartier Classic Tee | Clothing |
| Off-White Utility Jacket | Clothing |
| Rolex Submariner | Accessories |
| Casio G-Shock | Accessories |
| Gucci Leather Belt | Accessories |
| Prada Linea Rossa Sunglasses | Accessories |
| YSL Black Opium Perfume | Accessories |
| Louis Vuitton Speedy | Accessories |
| Cartier Love Bracelet | Accessories |

**Import via:** Shopify Admin → Products → Import → upload `wardrobe-products-import.csv`

---

## Design System (DO NOT CHANGE)

```css
/* Colors */
--cream: #F5F0E8       /* page backgrounds */
--charcoal: #1A1A1A    /* text, buttons */
--gold: #B8965A        /* accents, labels */
--warm-gray: #6B6560   /* secondary text */
--border: #E8E3DA      /* dividers */

/* Fonts */
--serif: 'Cormorant Garamond', serif   /* MUST use !important to override Dawn */
--sans: 'Inter', sans-serif

/* Rules */
- NO border-radius anywhere
- Single breakpoint: 1024px (mobile-first)
- All custom files use wardrobe- prefix
- Never embed Admin API token in theme code
```

---

## File Structure

```
C:\Users\soura\my-store\
├── sections/
│   ├── wardrobe-header.liquid          ← Custom nav + mobile drawer
│   ├── wardrobe-hero-v2.liquid         ← Homepage hero
│   ├── wardrobe-arrivals.liquid        ← Weekly arrivals product grid
│   ├── wardrobe-story.liquid           ← Brand story section
│   ├── wardrobe-contact-strip.liquid   ← Contact/map strip
│   ├── wardrobe-collection-header.liquid ← Collection banner
│   ├── wardrobe-collection-body.liquid ← Grid + sidebar filters + pills
│   ├── wardrobe-product-hero.liquid    ← Product gallery + info
│   ├── wardrobe-product-accordions.liquid
│   ├── wardrobe-related-products.liquid
│   └── wardrobe-footer.liquid
├── snippets/
│   ├── wardrobe-product-card.liquid
│   └── wardrobe-mobile-filters.liquid
├── assets/
│   ├── wardrobe-base.css               ← Design tokens + typography
│   ├── wardrobe-collection.css
│   ├── wardrobe-mobile.css             ← Phone-first overrides
│   ├── wardrobe-product.css
│   └── wardrobe-product.js
├── templates/
│   ├── index.json                      ← Homepage
│   ├── collection.sneakers.json
│   ├── collection.clothing.json
│   ├── collection.accessories.json
│   ├── product.json
│   └── page.contact.json               ← Exists but contact section not built yet
├── .mcp.json                           ← Shopify MCP server config
├── .claude/
│   └── launch.json                     ← Dev server config
└── wardrobe-products-import.csv        ← Full 18-product import file
```

---

## Dev Server

```bash
shopify theme dev --store the-wardrobe-6jaajzyl.myshopify.com --host 127.0.0.1 --port 9292
```

Preview URL: http://127.0.0.1:9292

> **Note:** The dev server creates a separate Development theme. Changes only go live after `shopify theme push` or via the dev server URL.

---

## Remaining TODOs (Prioritized)

### 🔴 Do First (Blocking)
1. **Fix collections** → recreate as Automated with Product Type rules (see above)
2. **Import 14 missing products** → upload CSV in Shopify Admin

### 🟡 High Priority
3. **Cart drawer CSS** — style Dawn's cart to match wardrobe design:
   - Background: `#F5F0E8`
   - "YOUR CART" header in Inter 700 uppercase
   - Product rows: thumbnail + brand in gold + title + size + price
   - CHECKOUT button: full-width black, no border-radius
   - Add styles to `assets/wardrobe-base.css` under `/* Cart Drawer */`

4. **Contact page** — build `sections/wardrobe-contact-page.liquid`:
   - Dark section (#1C1A17) matching the homepage contact strip
   - Address: Umsohsun Rd, Police Bazar, Shillong, Meghalaya 793001
   - Hours: Mon–Sun 11:00–20:00
   - WhatsApp: +91 97005 752736
   - Contact form (Name, Email, Message)
   - Google Maps embed on the right
   - Update `templates/page.contact.json` to use it

5. **Fix WhatsApp number** — search `94361 12345` in all files and replace with `97005 752736`

### 🟢 Medium Priority
6. **Legal pages** — create `sections/wardrobe-legal-page.liquid` and three Shopify pages:
   - `/pages/terms-and-conditions`
   - `/pages/privacy-policy`
   - `/pages/refund-policy`
   (governing law: India/Meghalaya, refunds 7 days, sneakers only if wrong/defective)

7. **Mobile audit** — test at 390px width and fix in `wardrobe-mobile.css`:
   - Hero: text not overflowing, CTAs full width
   - Arrivals: 2-col grid, text readable at 13px
   - Product page: sticky ATC bar, variant pills 44px min tap target
   - Collection: filter button visible, 2-col grid

8. **Accessories subcategory pills** — verify tag filtering works for: Watches, Bags, Perfumes, Jewelry, Belts, Sunglasses

### ⚪ Low Priority
9. Upload real store photo to Story section (replace Unsplash placeholder)
10. Add real collection header images (currently no images set)
11. About page content
12. Size guide page
13. Predictive search dropdown styling

---

## Metafields (Create in Admin)

Go to: https://admin.shopify.com/store/the-wardrobe-6jaajzyl/settings/custom_data

Under **Products**, create namespace `wardrobe`:
| Field | Type |
|-------|------|
| `condition` | Single line text |
| `source_channel` | Single line text |
| `source_date` | Date |
| `provenance_notes` | Multi-line text |
| `is_featured` | True/False |

---

## Architecture Rules (Never Break These)

1. **All custom files** use `wardrobe-` prefix
2. **Cormorant Garamond** must always be declared with `!important` to prevent Dawn overrides
3. **No border-radius** anywhere in the design
4. **No frameworks** — vanilla CSS and JS only
5. **Never embed** `shpat_*` token in theme Liquid files (only Storefront token `cd4e43...` is safe)
6. **Single breakpoint** at 1024px, mobile-first approach
7. **Colors strictly** from the design system — no hardcoded colors outside `wardrobe-base.css`

---

## Quick Test URLs (After Collection Fix)

- http://127.0.0.1:9292/collections/sneakers — should show Jordan 1 + Nike Dunk + NB 550
- http://127.0.0.1:9292/collections/clothing — should show 3 pieces
- http://127.0.0.1:9292/collections/accessories — should show watches, bags, etc.
- http://127.0.0.1:9292/products/air-jordan-1-retro-high-og-chicago — product page
- http://127.0.0.1:9292 — homepage with hero, arrivals, story, contact strip

---

## Shopify MCP (For Automated Fixes)

The `.mcp.json` at project root configures the Shopify Admin API MCP server.  
If Claude Code has the MCP connected (`shopify` server), you can:
- Create/update collections via GraphQL
- Create products programmatically
- Publish resources to Online Store

Store: `the-wardrobe-6jaajzyl.myshopify.com`  
Token: `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`
