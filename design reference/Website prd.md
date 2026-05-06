# Product Requirements Document
## The Wardrobe Shillong — Shopify Storefront
**Version:** 1.0  
**Date:** May 2026  
**Author:** Internal  
**Status:** Ready for Development

---

## 1. Project Overview

### 1.1 Purpose
The Wardrobe Shillong is a premium curated fashion boutique based in Police Bazar, Shillong, Meghalaya (Est. 2023). This document defines the complete product, design, and engineering requirements for a full-featured Shopify e-commerce storefront — enabling customers across India who cannot visit the physical store to browse and purchase directly online.

### 1.2 Business Goal
Convert the physical store's reputation and curation into a digital sales channel. The website must feel as premium, trustworthy, and curated as walking into the store itself.

### 1.3 Store Details
| Field | Value |
|---|---|
| Store Name | The Wardrobe Shillong |
| Physical Address | Umsohsun Rd, Umsohsun, Police Bazar, Shillong, Meghalaya 793001 |
| Hours | Mon–Sun, 11:00–20:00 |
| WhatsApp | +91 98765 43210 |
| Platform | Shopify |
| Currency | INR (₹) |
| Target Market | All of India |

---

## 2. Brand Identity

### 2.1 Brand Personality
The Wardrobe is a person who wears quiet confidence. They don't shout — they let what they carry do the talking. Think: 28-year-old who reads architecture magazines, owns two pairs of Jordans and a Cartier belt, travels between Shillong and Mumbai. They are discerning, unhurried, and never loud.

**In three words:** Curated. Confident. Considered.

### 2.2 Tagline Options (choose one or use both contextually)
- *"Selected Acquisitions."* — editorial and sparse (already used in design reference)
- *"Police Bazar, Shillong — Curated Reseller"* — grounding, geographic identity

### 2.3 Brand Voice
- **Tone:** Editorial, precise, never salesy
- **Style:** Short sentences. Sparse punctuation. Names drop casually. ("Jordan. Chrome Hearts. Cartier. All in one place.")
- **Avoid:** Exclamation marks, superlatives ("amazing!", "best deals!"), casual slang, filler phrases
- **Copy examples:**
  - ✅ "Hand-selected. Every piece."
  - ✅ "From Police Bazar to your door."
  - ✅ "We don't restock. When it's gone, it's gone."
  - ❌ "Shop the hottest sneakers NOW!"
  - ❌ "Amazing collection at great prices!"

### 2.4 What This Store Is NOT
- Not a sale/discount store — never show giant "SALE" banners
- Not cluttered — whitespace is a design element
- Not generic — no stock photography of models in plain backgrounds
- No aggressive popups or countdown timers
- No neon or loud color accents
- No template-looking layouts

---

## 3. Design System

### 3.1 Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#F5F0E8` | Primary background |
| `--off-white` | `#FAF8F4` | Card backgrounds, light sections |
| `--charcoal` | `#1A1A1A` | Primary text, nav, footer |
| `--sand` | `#8B7355` | Dividers, subtle borders |
| `--gold` | `#B8965A` | Accent — brand moments, italic type, CTA outlines |
| `--warm-white` | `#FFFFFF` | Product image backgrounds |
| `--dark-section` | `#1C1A17` | Footer, Contact section dark backgrounds |
| `--muted-text` | `#6B6560` | Secondary labels, metadata |

### 3.2 Typography

#### Primary Typefaces
| Role | Font | Weight | Style |
|---|---|---|---|
| Display / Hero | Cormorant Garamond | 300–400 | Serif, large, airy |
| Hero Italic Accent | Cormorant Garamond | 400 | Italic, gold color |
| Navigation | Neue Haas Grotesk / Inter | 400 | Uppercase, tracked |
| Body / UI | Inter | 400–500 | Clean, readable |
| Labels / Metadata | Inter | 600–700 | Uppercase, 0.08em letter-spacing |

#### Type Scale
| Element | Size | Weight | Transform |
|---|---|---|---|
| Hero H1 | 72–96px | 300 | Mixed case |
| Hero Italic | 72–96px | 400 italic | Gold |
| Section H2 | 40–56px | 300 | Mixed case |
| Product Title | 28–36px | 400 | Mixed case |
| Nav Links | 13px | 400 | UPPERCASE |
| Body | 15–16px | 400 | Mixed case |
| Micro Labels | 11px | 700 | UPPERCASE, tracked |
| Price | 18–20px | 500 | Mixed case |

### 3.3 Spacing System
- Base unit: **8px**
- Section vertical padding: **80–120px** desktop, **48–64px** mobile
- Container max-width: **1400px** with 40px gutters
- Card gap: **24px** (grid), **32px** (featured)
- Product grid gap: **24px**

### 3.4 UI Component Rules

**Buttons:**
- Primary: Black fill `#1A1A1A`, white text, 0 border-radius (sharp corners), 14px uppercase, 1px border `#1A1A1A`
- Secondary / Ghost: Transparent fill, black border 1px, black text — same sharp corners
- Hover on Primary: White fill, black text, black border (invert)
- Hover on Ghost: Black fill, white text
- No rounded buttons. Sharp corners only.
- Padding: `14px 28px`

**Cards:**
- Background: `#FAF8F4`
- No drop shadows
- No rounded corners on product cards
- Brand label above product name in uppercase gold (`#B8965A`), 11px
- Product name: 16–18px, Cormorant Garamond or Inter 400
- Price in Inter 500, right-aligned or below name
- "NEW" tag: Black fill, white text, absolute top-left, 11px uppercase

**Dividers:**
- Thin `1px` lines in `#E8E3DA` (warm light grey)
- Used sparingly — section separators only
- Gold `#B8965A` used as decorative rule (very short, centered) for section titles like "OUR STORY"

**Navigation:**
- Fixed top, white/cream background
- Logo: wordmark left, monogram icon left of wordmark
- Links: SNEAKERS · CLOTHING · ACCESSORIES · ARCHIVE — all uppercase, 13px, 0.08em tracked
- Right: Search icon + Cart icon (bag icon)
- No hamburger on desktop. Mobile: hamburger → full-screen overlay menu

### 3.5 Photography Guidelines
- **Product images:** White or near-white background (`#FFFFFF` or `#F5F0E8`), no background clutter
- **Product angle:** Flat lay OR hero angled shot — consistent within each category
- **Lifestyle / editorial:** Real store interior shots (as shown in reference Image 3), honest and documentary
- **No stock photos of generic models**
- **No watermarks** on product images if possible
- **Aspect ratio:** 4:5 for product cards (portrait), 16:9 for editorial hero banners
- **Contact/Store section:** Dark background (`#1C1A17`), gold text accents, embedded map — exactly as in reference Image 4

---

## 4. Site Architecture & Pages

### 4.1 Navigation Structure
```
[Logo]   SNEAKERS   CLOTHING   ACCESSORIES   ARCHIVE    [Search] [Cart]
```

**Footer Links:**
```
Shop: Sneakers | Clothing | Accessories | Archive
Info: About | Contact | FAQ
Legal: Terms & Conditions | Privacy Policy | Refund & Cancellation Policy
© 2023 The Wardrobe Shillong. All rights reserved.
```

---

### 4.2 Page: Home (`/`)

**Hero Section:**
- Full-width, cream background
- Eyebrow text: `POLICE BAZAR, SHILLONG · EST. 2023` — gold, uppercase, 11px, tracked
- H1: `Selected` (Cormorant Garamond, 96px, charcoal, normal weight)
- H1 accent line: `Acquisitions.` (Cormorant Garamond, 96px, gold, italic)
- Subtext: `POLICE BAZAR, SHILLONG — CURATED RESELLER` — uppercase, 13px, muted, tracked
- Two CTAs below: `[SHOP SNEAKERS]` (primary black) + `[VIEW ACCESSORIES]` (ghost)
- Thin horizontal divider below hero

**"This Week's Arrivals" Section:**
- Left-aligned section header: `This Week's` (Cormorant, 40px, charcoal) + `Arrivals` (Cormorant, italic, gold)
- Right-aligned metadata: `WEEK OF [DATE]` + `VIEW ALL →` link in gold
- 4-column product grid (see Product Card spec below)
- Each card has "NEW" tag top-left

**"Our Story" Section (split layout):**
- Left: Full store interior photograph (no caption)
- Right: Gold decorative rule + `OUR STORY` label
- H2: `Curating Shillong's Finest Since Day One`
- Body copy: 2 paragraphs (see copy in reference Image 3 — adapt as final copy)
- CTA: `[DISCOVER MORE →]` ghost button

**Categories Section:**
- 3-column editorial grid: Sneakers | Clothing | Accessories
- Each column: full-bleed category image, category name overlay, CTA link

**Contact/Store Teaser:**
- Dark section (`#1C1A17`) — exactly as reference Image 4
- Left: `VISIT THE STORE` label (gold uppercase), H2 with gold italic city name, address, hours, WhatsApp
- Two CTAs: `[GET DIRECTIONS]` (gold fill, dark text) + `[MESSAGE US]` (ghost, gold border)
- Right: Embedded Google Maps (The Wardrobe Shillong, Police Bazar)

---

### 4.3 Page: Sneakers (`/collections/sneakers`)

**Header:**
- Full-width banner — editorial photo of sneaker display from store interior
- Overlay text: `Sneakers` (Cormorant, white, 72px) + subline: `Every silhouette. Every colourway.`

**Collection Grid:**
- 3-column desktop, 2-column mobile
- Filters sidebar (left): Brand, Size, Price Range, Availability
- Sort dropdown (right): Newest · Price Low–High · Price High–Low
- Product card spec: image (4:5), brand label (gold uppercase), name, price in INR

**Product Card:**
```
[Product Image — 4:5 ratio, white bg]
JORDAN                          ← brand, gold, 11px uppercase
Air Jordan 1 Retro High OG      ← name, 16px Inter
₹24,999                         ← price, 18px Inter 500
```
- "NEW" black badge top-left when applicable
- Hover: subtle scale on image (1.02), no overlay text

---

### 4.4 Page: Clothing (`/collections/clothing`)

**Header:**
- Editorial banner — store rack photo or Chrome Hearts / designer garment image
- Overlay: `Clothing` (same treatment as Sneakers)

**Grid:** Same 3-column grid as Sneakers
**Brands include:** Chrome Hearts, Corteiz, Fear of God, Stussy, gallery dept, etc.

---

### 4.5 Page: Accessories (`/collections/accessories`)

**Subcategories:**
- Watches, Belts, Sunglasses, Bags, Wallets
- Subcategory filter pills below header banner: `All · Watches · Belts · Sunglasses · Bags`

**Header:** Same editorial treatment
**Grid:** 2-column desktop (larger cards), 2-column mobile — since accessories are detail-oriented

---

### 4.6 Page: Product Detail (`/products/[handle]`)

Implement using Shopify Storefront Web Components as specified in the provided component code. Styled per The Wardrobe design system:

**Layout:** Left — image gallery (4:5 main + 3 thumbnail row), Right — product details

**Right panel, top to bottom:**
1. Brand name — gold, uppercase, 11px (e.g., `JORDAN`)
2. Product title — Cormorant or Inter, 32px
3. Price in INR — `₹24,999` — Inter 500, 20px
4. Compare-at price (if applicable) — line-through, muted
5. Variant selector (size) — sharp-cornered radio pills
6. `[ADD TO CART]` — primary black button, full width
7. `[BUY NOW]` — ghost button, full width
8. Horizontal rule
9. Description — Inter 400, 14px, muted
10. Additional info accordion (optional): Condition, Authenticity, Shipping

**Authenticity note** (small, below buttons):
> All products are sourced and verified by The Wardrobe Shillong. Est. 2023.

---

### 4.7 Page: Contact (`/pages/contact`)

**Layout:** Dark section — same palette as home contact teaser, but full page

**Content:**
- `VISIT THE STORE` gold label
- H1: `Find us in Police Bazar` (Cormorant, white + gold italic)
- Legal business name: The Wardrobe Shillong
- Address: Umsohsun Rd, Umsohsun, Police Bazar, Shillong, Meghalaya 793001
- Email: [store email]
- Phone: [store phone]
- WhatsApp: +91 98765 43210
- Hours: Mon–Sun, 11:00–20:00

**Contact Form:**
- Name, Email, Message fields — minimal styled, white borders on dark bg
- `[SEND MESSAGE]` — gold fill button

**Map:**
- Right side — embedded Google Maps iframe

---

### 4.8 Legal Pages (Required — link in footer and checkout)

#### Terms & Conditions (`/pages/terms-and-conditions`)
Must include:
- Governing law: India / Meghalaya
- Platform: Shopify
- Intellectual property notice
- Disclaimer on product descriptions

#### Privacy Policy (`/pages/privacy-policy`)
Must include:
- What data is collected (name, email, address, payment)
- How it is used
- Third-party sharing (Shopify, payment processors)
- User rights under Indian law

#### Refund & Cancellation Policy (`/pages/refund-policy`)
Must include:
- **Order cancellation:** Orders can be cancelled within 24 hours of placement
- **Returns:** Accepted within 7 days of delivery for clothing/accessories if item is unused and in original condition
- **Sneakers:** Returns accepted only if wrong item was sent or item is defective
- **Refund timeline:** Refunds processed within 7–10 business days to original payment method
- **Non-returnable:** Watches, belts, sunglasses (accessories) — all sales final
- **How to initiate:** WhatsApp +91 98765 43210 or email with order number

---

## 5. Checkout & E-commerce Requirements

### 5.1 Checkout
- Native Shopify Checkout — do not customize beyond brand colors
- Currency: INR (₹) — all prices in Indian Rupees
- Shipping: India-wide
- Payment methods: UPI, Credit/Debit Card, Net Banking, COD (if feasible)

### 5.2 Cart
- Slide-in cart drawer (right side) — no redirect to /cart page
- Show: product thumbnail, name, brand, size, price, quantity stepper, remove
- Subtotal + `[CHECKOUT]` button at bottom
- Cart icon in header shows item count badge

### 5.3 Customer Accounts
- Shopify Customer Account (using `<shopify-account>` web component)
- Styled per design system: cream background, charcoal text, gold accent
- Customers can view order history, track orders

### 5.4 Search
- Shopify Predictive Search
- Results: Product image thumbnail + name + price
- No autocomplete noise — clean dropdown on icon click

---

## 6. Mobile Design Rules

- Navigation: Hamburger → full-screen black overlay with white links, large type
- Hero: H1 scales to 52–60px, single column
- Product grid: 2 columns with 12px gap
- Product detail: image first (full width), details stacked below
- Sticky `[ADD TO CART]` bar at bottom of product page
- Touch targets: minimum 44px height
- No horizontal scroll at any breakpoint

---

## 7. Conversion Strategy

### 7.1 Trust Signals
- Authenticity statement on every product page
- Google Maps embed + physical address prominently displayed
- "Est. 2023" in hero and footer
- WhatsApp button visible on every page (sticky, bottom-right, WhatsApp green icon)
- Real store photography — not studio renders

### 7.2 Scarcity & Urgency (editorial, not aggressive)
- "When it's gone, it's gone." — single line below add to cart
- "Only 1 left." — low stock label (if inventory < 2)
- No countdown timers. No fake urgency.

### 7.3 Discovery
- "This Week's Arrivals" on homepage — drives return visits
- "ARCHIVE" nav link — past drops, creates a collector culture
- Clean collection pages with filters for quick browsing

### 7.4 WhatsApp Flow
- Floating WhatsApp button: bottom-right, all pages
- Pre-filled message: "Hi, I'm interested in [product name] from The Wardrobe Shillong."
- Product page: small text link — "Have a question? Message us on WhatsApp →"

---

## 8. Shopify Implementation Notes

### 8.1 Theme Recommendation
- Start with **Dawn** (Shopify free) or **Prestige** (paid) as base
- Heavy customization required to match design specs
- Alternatively: custom theme using Shopify Storefront Web Components (as provided in code references)

### 8.2 Storefront Web Components
Use the provided Shopify Web Components code for:
- `<shopify-store>` — store context
- `<shopify-context type="product">` — product data binding
- `<shopify-variant-selector>` — size/color selection
- `<shopify-cart>` — cart modal
- `<shopify-account>` — customer login/account

Style overrides for Web Components (adapt to brand colors):
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
}
```

### 8.3 Collections to Create in Shopify Admin
| Collection | Handle | Type |
|---|---|---|
| Sneakers | `sneakers` | Manual |
| Clothing | `clothing` | Manual |
| Accessories | `accessories` | Manual |
| Archive | `archive` | Manual |
| New Arrivals | `new-arrivals` | Smart (tag: "new") |

### 8.4 Product Tags
Use consistent tags for filtering:
- Brand: `jordan`, `nike`, `adidas`, `puma`, `chrome-hearts`, `cartier`, `louis-vuitton`, etc.
- Category: `sneakers`, `clothing`, `accessories`, `watches`, `bags`, `belts`, `sunglasses`
- Status: `new`, `archive`
- Type: `casual`, `sport`, `formal`

---

## 9. Font & Asset Loading

### 9.1 Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 9.2 Icon Set
- Use Shopify's built-in icons for cart/search
- No icon libraries — minimal, custom SVG only where needed

---

## 10. What NOT to Build

| Anti-Pattern | Reason |
|---|---|
| Popup email capture | Breaks premium feel |
| "SALE" banner or discount ribbons | Not a sale store |
| Countdown timers | Feels cheap |
| Neon/bright accent colors | Off-brand |
| Generic model stock photography | Inauthentic |
| Rounded "bubbly" button corners | Wrong aesthetic |
| Auto-playing video | Too aggressive |
| Chatbot widget (beyond WhatsApp) | Clutters UI |
| Star ratings on homepage | Not the editorial style |
| Recommendation carousels everywhere | Noise over curation |

---

## 11. Legal Compliance Checklist

Before going live, ensure:

- [ ] Terms & Conditions page live and linked in footer
- [ ] Privacy Policy page live and linked in footer
- [ ] Refund & Cancellation Policy page live and linked in footer
- [ ] Contact Us page with: legal business name, physical address, email, phone
- [ ] All prices displayed in INR (₹)
- [ ] GST number displayed (if applicable) on Contact or footer
- [ ] Shopify Payments or Razorpay configured for INR
- [ ] Checkout links to T&C and Refund Policy before purchase confirmation

---

*This PRD is the single source of truth for The Wardrobe Shillong's Shopify storefront. Any design, copy, or engineering decision should reference this document first.*