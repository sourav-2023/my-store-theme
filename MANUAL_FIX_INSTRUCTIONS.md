# Fix Collections & Products - Manual Steps

The API token isn't working, so here's the fastest way to fix everything manually.

---

## PART 1: Fix Collections (5 minutes)

Go to: https://admin.shopify.com/store/the-wardrobe-6jaajzyl/collections

### Step 1: Delete Existing Collections

For each of these 3 collections:
1. Click **Sneakers**
2. Scroll down → Click **Delete collection**
3. Confirm deletion
4. Repeat for **Clothing** and **Accessories**

### Step 2: Create Automated Collections

Click **"Create collection"** and fill in:

#### Sneakers
- **Title:** Sneakers
- **Collection type:** Automated
- **Condition:** `Product type` `is equal to` `Sneakers`
- Click **Save**
- Right sidebar → **Theme template** → Select `collection.sneakers`
- **Collection availability** → Check **Online Store**
- Click **Save** again

#### Clothing
- **Title:** Clothing
- **Collection type:** Automated
- **Condition:** `Product type` `is equal to` `Clothing`
- Click **Save**
- Right sidebar → **Theme template** → Select `collection.clothing`
- **Collection availability** → Check **Online Store**
- Click **Save** again

#### Accessories
- **Title:** Accessories
- **Collection type:** Automated
- **Condition:** `Product type` `is equal to` `Accessories`
- Click **Save**
- Right sidebar → **Theme template** → Select `collection.accessories`
- **Collection availability** → Check **Online Store**
- Click **Save** again

---

## PART 2: Import Products (5 minutes)

Go to: https://admin.shopify.com/store/the-wardrobe-6jaajzyl/products

### Option A: Import via CSV (Fastest)

1. Click **"Import"** button
2. Click **"Upload file"**
3. Select: `C:\Users\soura\my-store\wardrobe-products-import.csv`
4. Click **"Upload and continue"**
5. Click **"Import products"**
6. Wait 2-3 minutes for import to complete

### Option B: Manual Product Creation

If CSV fails, create these 10 products manually:

#### Sneakers (1 product)
| Field | Value |
|-------|-------|
| **Title** | New Balance 550 |
| **Description** | Vintage basketball style meets modern comfort. The 550 features a leather upper with perforated details and cushioned midsole. |
| **Vendor** | New Balance |
| **Product type** | Sneakers |
| **Tags** | sneakers, new-balance, 550, vintage, basketball |
| **Price** | ₹10,999 |
| **Compare at price** | ₹13,999 |
| **Variants** | Size: US 8, US 9, US 10 |
| **Images** | https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800 |

#### Clothing (2 products)

**Cartier Classic Tee**
- Type: `Clothing`
- Vendor: `Cartier`
- Price: ₹8,999
- Compare: ₹11,999
- Variants: Size S, M, L
- Image: https://images.unsplash.com/photo-1521572163474-6863f6e65777?w=800

**Off-White Utility Jacket**
- Type: `Clothing`
- Vendor: `Off-White`
- Price: ₹32,999
- Compare: ₹39,999
- Variants: Size M, L
- Image: https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800

#### Accessories (7 products)

**Rolex Submariner**
- Type: `Accessories`
- Vendor: `Rolex`
- Price: ₹5,99,999
- Variants: Color Black, Blue
- Tags: accessories, watches, rolex, luxury

**Casio G-Shock**
- Type: `Accessories`
- Vendor: `Casio`
- Price: ₹6,999
- Variants: Color Black, Camo
- Tags: accessories, watches, casio, g-shock

**Gucci Leather Belt**
- Type: `Accessories`
- Vendor: `Gucci`
- Price: ₹29,999
- Variants: Size 32, 34, 36
- Tags: accessories, belts, gucci, leather

**Prada Linea Rossa Sunglasses**
- Type: `Accessories`
- Vendor: `Prada`
- Price: ₹18,999
- Variants: Color Black, Tortoise
- Tags: accessories, sunglasses, prada

**YSL Black Opium Perfume**
- Type: `Accessories`
- Vendor: `YSL`
- Price: ₹6,999
- Variants: Size 50ml, 90ml
- Tags: accessories, perfumes, ysl

**Louis Vuitton Speedy**
- Type: `Accessories`
- Vendor: `Louis Vuitton`
- Price: ₹1,25,999
- Variants: Size 25, 30
- Tags: accessories, bags, lv, luxury

**Cartier Love Bracelet**
- Type: `Accessories`
- Vendor: `Cartier`
- Price: ₹2,99,999
- Variants: Size 16, 17, 18
- Tags: accessories, jewelry, cartier

---

## Verification Checklist

After completing both parts:

- [ ] http://127.0.0.1:9292/collections/sneakers shows 3 products (Jordan 1, Nike Dunk, New Balance)
- [ ] http://127.0.0.1:9292/collections/clothing shows 3 products (Chrome Hearts, Cartier, Off-White)
- [ ] http://127.0.0.1:9292/collections/accessories shows 8 products (wallet + 7 new)
- [ ] Product pages display correctly with images and variants
- [ ] Footer shows on all pages

---

## Troubleshooting

**Products not showing in collections?**
→ Make sure Product type is exactly: `Sneakers`, `Clothing`, or `Accessories` (case-sensitive)

**Collection pages look wrong?**
→ Check theme template is assigned (right sidebar in collection edit page)

**Images not loading?**
→ The Unsplash URLs should work. If not, upload images manually.

**Variants not showing?**
→ Make sure Option Name is "Size" or "Color" consistently
