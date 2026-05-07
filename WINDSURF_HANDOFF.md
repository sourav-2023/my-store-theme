# Windsurf Handoff — The Wardrobe Shillong

Open this folder in Windsurf: `C:\Users\soura\my-store`
Read `CLAUDE.md` at the root — it is the source of truth for design decisions.

---

## What This Is

A **Shopify Dawn-fork theme** for The Wardrobe Shillong — a premium curated fashion boutique in Police Bazar, Shillong. All custom files are prefixed `wardrobe-`. Dawn handles cart/checkout plumbing. We own the visual layer.

**Live store:** `the-wardrobe-28h1sv4c.myshopify.com`
**GitHub:** `github.com/sourav-2023/my-store-theme` (push to `main` → auto-deploys)
**Dev server:** `shopify theme dev --store the-wardrobe-28h1sv4c.myshopify.com` (runs at localhost:9292)

---

## Architecture

### CSS Files (all in `assets/`)
| File | Purpose |
|---|---|
| `wardrobe-base.css` | Design tokens (CSS vars), buttons, hero, arrivals, story, categories, contact strip |
| `wardrobe-header.css` | Nav overrides — cream bg, Cormorant logo, uppercase tracked links |
| `wardrobe-collection.css` | Product card, collection grid, pill filters |
| `wardrobe-product.css` | Product page — gallery, variant pills, buy buttons, accordions |
| `wardrobe-mobile.css` | Phone-first overrides — loaded globally in theme.liquid |

### Key Sections (all in `sections/`)
| File | Page |
|---|---|
| `wardrobe-hero-v2.liquid` | Homepage — animated hero with Cormorant serif + gold rule |
| `wardrobe-arrivals.liquid` | Homepage — 4-col product grid, pulls from a collection |
| `wardrobe-story.liquid` | Homepage — 50/50 image+text split. Upload store photo via Shopify admin image_picker |
| `wardrobe-categories.liquid` | Homepage — 3-col editorial category grid |
| `wardrobe-contact-strip.liquid` | Homepage — dark section, address, hours, WhatsApp, Google Maps |
| `wardrobe-collection-header.liquid` | Collection pages — editorial banner with image_picker bg + Cormorant title |
| `wardrobe-collection-body.liquid` | Collection pages — sidebar (brand/price/availability filters) + product grid side-by-side |
| `wardrobe-product-hero.liquid` | Product page — sticky gallery left, details right |
| `wardrobe-product-accordions.liquid` | Product page — Details/Condition/Shipping accordions |

### Key Snippets (all in `snippets/`)
| File | Purpose |
|---|---|
| `wardrobe-product-card.liquid` | Product card — brand gold, title, price, NEW badge |
| `wardrobe-buy-form.liquid` | Add to cart form wrapper |
| `wardrobe-whatsapp-fab.liquid` | Floating WhatsApp button (bottom-right, all pages) |
| `wardrobe-trust-bar.liquid` | "Sourced and verified" authenticity line under buy buttons |

### Templates
| File | Route |
|---|---|
| `templates/index.json` | `/` — all 5 homepage sections in order |
| `templates/product.json` | `/products/*` — product hero + accordions |
| `templates/collection.sneakers.json` | `/collections/sneakers` |
| `templates/collection.clothing.json` | `/collections/clothing` |
| `templates/collection.accessories.json` | `/collections/accessories` — 2-col grid + subcategory pills |
| `templates/page.contact.json` | `/pages/contact` |

---

## Design System (DO NOT DEVIATE)

```
Fonts:
  Serif  → Cormorant Garamond (300, 400, 300i, 400i) — always declare with !important
  Sans   → Inter (400, 500, 600, 700)

Colors:
  --w-cream:        #F5F0E8  (primary bg)
  --w-charcoal:     #1A1A1A  (text, buttons)
  --w-gold:         #B8965A  (accent — brand labels, italic type, rules)
  --w-dark-section: #1C1A17  (contact strip, footer)
  --w-muted:        #6B6560  (secondary text)
  --w-separator:    #E8E3DA  (dividers)
  --w-warm-white:   #FFFFFF  (product image bg)

Rules:
  - border-radius: 0 everywhere. No exceptions.
  - No shadows on product cards.
  - Single breakpoint: 1024px (mobile-first).
  - No Tailwind, no frameworks — vanilla CSS with wardrobe- prefix.
  - Cormorant must use !important to prevent Dawn overrides.
```

---

## What Still Needs To Be Done

### High priority
- [ ] Upload store front photo via Shopify admin → Story section (image_picker)
- [ ] Upload editorial photos for each collection header banner (Sneakers, Clothing, Accessories)
- [ ] Add real products to the Shopify store with correct tags (`new`, `sneakers`, `jordan`, etc.)
- [ ] Fix WhatsApp number in contact strip (currently placeholder: +91 94361 12345)
- [ ] Set up actual Google Maps embed URL with verified place ID for The Wardrobe Shillong

### Medium priority
- [ ] Footer — create a proper wardrobe-footer.liquid with the links from CLAUDE.md
- [ ] Mobile filter drawer — the sidebar hides on mobile (display:none). Need a slide-up filter panel
- [ ] Scroll-to-top on mobile product page when variant changes
- [ ] Test cart drawer styling — Dawn's default cart drawer needs wardrobe CSS overrides
- [ ] Create legal pages: Terms, Privacy Policy, Refund Policy (content in CLAUDE.md)

### Low priority / polish
- [ ] Predictive search styling — results need wardrobe product card treatment
- [ ] Related products section on product page
- [ ] Archive collection template
- [ ] Page speed — preload Cormorant WOFF2 files directly instead of Google Fonts

---

## How to Run

```bash
cd C:\Users\soura\my-store
shopify theme dev --store the-wardrobe-28h1sv4c.myshopify.com
```

If port 9292 is in use: `netstat -ano | grep 9292` then `taskkill /F /PID <pid>`

## How to Deploy

```bash
git add .
git commit -m "your message"
git push
# Shopify picks it up automatically via GitHub connection
# Then publish the theme via Shopify admin if needed
```
