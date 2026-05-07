#!/usr/bin/env node
/**
 * Fix Wardrobe Shillong Collections and Import Products
 * Uses Shopify Admin API
 */

const SHOP_DOMAIN = 'the-wardrobe-6jaajzyl.myshopify.com';
const ACCESS_TOKEN = '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';
const API_VERSION = '2024-01';

// Collection configurations
const COLLECTIONS = [
  {
    title: 'Sneakers',
    handle: 'sneakers',
    template_suffix: 'sneakers',
    rules: [
      {
        column: 'product_type',
        relation: 'equals',
        condition: 'Sneakers'
      }
    ]
  },
  {
    title: 'Clothing',
    handle: 'clothing',
    template_suffix: 'clothing',
    rules: [
      {
        column: 'product_type',
        relation: 'equals',
        condition: 'Clothing'
      }
    ]
  },
  {
    title: 'Accessories',
    handle: 'accessories',
    template_suffix: 'accessories',
    rules: [
      {
        column: 'product_type',
        relation: 'equals',
        condition: 'Accessories'
      }
    ]
  }
];

// Products to import
const PRODUCTS = [
  {
    title: "New Balance 550",
    body_html: "Vintage basketball style meets modern comfort. The 550 features a leather upper with perforated details and cushioned midsole.",
    vendor: "New Balance",
    product_type: "Sneakers",
    tags: ["sneakers", "new-balance", "550", "vintage", "basketball"],
    variants: [
      { option1: "US 8", price: "10999", compare_at_price: "13999", sku: "NB-550-8", grams: 950, inventory_quantity: 6 },
      { option1: "US 9", price: "10999", compare_at_price: "13999", sku: "NB-550-9", grams: 950, inventory_quantity: 4 },
      { option1: "US 10", price: "10999", compare_at_price: "13999", sku: "NB-550-10", grams: 950, inventory_quantity: 5 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800", position: 1 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Cartier Classic Tee",
    body_html: "Minimalist luxury t-shirt with subtle Cartier logo embroidery. Premium Pima cotton with a refined slim fit silhouette.",
    vendor: "Cartier",
    product_type: "Clothing",
    tags: ["clothing", "t-shirt", "cartier", "luxury", "minimalist"],
    variants: [
      { option1: "S", price: "8999", compare_at_price: "11999", sku: "CR-TEE-S", grams: 250, inventory_quantity: 5 },
      { option1: "M", price: "8999", compare_at_price: "11999", sku: "CR-TEE-M", grams: 250, inventory_quantity: 4 },
      { option1: "L", price: "8999", compare_at_price: "11999", sku: "CR-TEE-L", grams: 280, inventory_quantity: 3 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1521572163474-6863f6e65777?w=800", position: 1 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Off-White Utility Jacket",
    body_html: "Statement streetwear jacket featuring industrial belt details and signature Off-White arrows. Oversized fit with multiple pockets.",
    vendor: "Off-White",
    product_type: "Clothing",
    tags: ["clothing", "jacket", "off-white", "utility", "streetwear"],
    variants: [
      { option1: "M", price: "32999", compare_at_price: "39999", sku: "OW-JKT-M", grams: 1200, inventory_quantity: 2 },
      { option1: "L", price: "32999", compare_at_price: "39999", sku: "OW-JKT-L", grams: 1250, inventory_quantity: 3 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", position: 1 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Rolex Submariner",
    body_html: "Iconic diver's watch with timeless design. Features Oystersteel case black dial and Cerachrom bezel. Water resistant to 300m.",
    vendor: "Rolex",
    product_type: "Accessories",
    tags: ["accessories", "watches", "rolex", "luxury", "diver"],
    variants: [
      { option1: "Black", price: "599999", compare_at_price: "699999", sku: "RLX-SUB-BLK", grams: 150, inventory_quantity: 1 },
      { option1: "Blue", price: "629999", compare_at_price: "729999", sku: "RLX-SUB-BLU", grams: 150, inventory_quantity: 1 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800", position: 2 }
    ],
    options: [{ name: "Color", position: 1 }]
  },
  {
    title: "Casio G-Shock",
    body_html: "Rugged digital watch with shock resistance and 200m water resistance. Features stopwatch countdown timer and LED backlight.",
    vendor: "Casio",
    product_type: "Accessories",
    tags: ["accessories", "watches", "casio", "g-shock", "sport"],
    variants: [
      { option1: "Black", price: "6999", compare_at_price: "8999", sku: "CS-GSH-BLK", grams: 80, inventory_quantity: 8 },
      { option1: "Camo", price: "7499", compare_at_price: "9499", sku: "CS-GSH-CMO", grams: 85, inventory_quantity: 5 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=800", position: 2 }
    ],
    options: [{ name: "Color", position: 1 }]
  },
  {
    title: "Gucci Leather Belt",
    body_html: "Classic leather belt with signature double G buckle. Made in Italy from smooth black leather with antique gold hardware.",
    vendor: "Gucci",
    product_type: "Accessories",
    tags: ["accessories", "belts", "gucci", "leather", "luxury"],
    variants: [
      { option1: "32", price: "29999", compare_at_price: "35999", sku: "GC-BLT-32", grams: 500, inventory_quantity: 5 },
      { option1: "34", price: "29999", compare_at_price: "35999", sku: "GC-BLT-34", grams: 500, inventory_quantity: 3 },
      { option1: "36", price: "29999", compare_at_price: "35999", sku: "GC-BLT-36", grams: 500, inventory_quantity: 4 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", position: 2 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Prada Linea Rossa Sunglasses",
    body_html: "Modern sport sunglasses with wrap design and polarized lenses. Features lightweight frame with signature red stripe detail.",
    vendor: "Prada",
    product_type: "Accessories",
    tags: ["accessories", "sunglasses", "prada", "sport", "polarized"],
    variants: [
      { option1: "Black", price: "18999", compare_at_price: "22999", sku: "PR-SUN-BLK", grams: 40, inventory_quantity: 4 },
      { option1: "Tortoise", price: "19999", compare_at_price: "23999", sku: "PR-SUN-TOR", grams: 42, inventory_quantity: 2 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800", position: 2 }
    ],
    options: [{ name: "Color", position: 1 }]
  },
  {
    title: "YSL Black Opium Perfume",
    body_html: "Iconic warm and spicy women's fragrance with notes of coffee vanilla and white flowers. Long-lasting Eau de Parfum.",
    vendor: "YSL",
    product_type: "Accessories",
    tags: ["accessories", "perfumes", "ysl", "beauty", "fragrance"],
    variants: [
      { option1: "50ml", price: "6999", compare_at_price: "8999", sku: "YSL-PRF-50", grams: 300, inventory_quantity: 6 },
      { option1: "90ml", price: "9999", compare_at_price: "11999", sku: "YSL-PRF-90", grams: 500, inventory_quantity: 4 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800", position: 2 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Louis Vuitton Speedy",
    body_html: "Iconic monogram canvas handbag with natural cowhide leather trim. Features rolled leather handles and padlock closure.",
    vendor: "Louis Vuitton",
    product_type: "Accessories",
    tags: ["accessories", "bags", "lv", "louis-vuitton", "luxury"],
    variants: [
      { option1: "25", price: "125999", compare_at_price: "149999", sku: "LV-BAG-25", grams: 800, inventory_quantity: 2 },
      { option1: "30", price: "139999", compare_at_price: "159999", sku: "LV-BAG-30", grams: 900, inventory_quantity: 1 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800", position: 2 }
    ],
    options: [{ name: "Size", position: 1 }]
  },
  {
    title: "Cartier Love Bracelet",
    body_html: "18K yellow gold bracelet with signature screw motif. Iconic screw design requires screwdriver to open - symbolizing sealed love.",
    vendor: "Cartier",
    product_type: "Accessories",
    tags: ["accessories", "jewelry", "cartier", "bracelet", "luxury"],
    variants: [
      { option1: "16", price: "299999", compare_at_price: "349999", sku: "CR-BRC-16", grams: 50, inventory_quantity: 1 },
      { option1: "17", price: "299999", compare_at_price: "349999", sku: "CR-BRC-17", grams: 52, inventory_quantity: 1 },
      { option1: "18", price: "299999", compare_at_price: "349999", sku: "CR-BRC-18", grams: 55, inventory_quantity: 1 }
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220c?w=800", position: 1 },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800", position: 2 }
    ],
    options: [{ name: "Size", position: 1 }]
  }
];

// Helper function for API calls
async function shopifyFetch(endpoint, options = {}) {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify API error: ${response.status} - ${error}`);
  }
  
  return response.json();
}

// Get existing collections
async function getCollections() {
  const data = await shopifyFetch('collections.json?limit=50');
  return data.collections;
}

// Delete a collection
async function deleteCollection(id) {
  await shopifyFetch(`collections/${id}.json`, { method: 'DELETE' });
  console.log(`Deleted collection ${id}`);
}

// Create automated smart collection
async function createSmartCollection(config) {
  const payload = {
    smart_collection: {
      title: config.title,
      handle: config.handle,
      template_suffix: config.template_suffix,
      published: true,
      rules: config.rules.map(rule => ({
        column: rule.column,
        relation: rule.relation,
        condition: rule.condition
      }))
    }
  };
  
  const data = await shopifyFetch('smart_collections.json', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  
  console.log(`Created smart collection: ${config.title} (ID: ${data.smart_collection.id})`);
  return data.smart_collection;
}

// Create a product
async function createProduct(product) {
  const payload = {
    product: {
      title: product.title,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      tags: product.tags.join(', '),
      published: true,
      options: product.options,
      variants: product.variants.map(v => ({
        option1: v.option1,
        price: v.price,
        compare_at_price: v.compare_at_price,
        sku: v.sku,
        grams: v.grams,
        inventory_management: 'shopify',
        inventory_quantity: v.inventory_quantity,
        requires_shipping: true,
        taxable: true,
        fulfillment_service: 'manual'
      })),
      images: product.images
    }
  };
  
  const data = await shopifyFetch('products.json', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  
  console.log(`Created product: ${product.title} (ID: ${data.product.id})`);
  return data.product;
}

// Main function
async function main() {
  console.log('🚀 Starting Wardrobe Shillong fix...\n');
  
  try {
    // Step 1: Get and delete existing custom collections
    console.log('📋 Step 1: Checking existing collections...');
    const collections = await getCollections();
    console.log(`Found ${collections.length} collections`);
    
    for (const collection of collections) {
      const isTarget = ['sneakers', 'clothing', 'accessories'].includes(collection.handle);
      if (isTarget && collection.collection_type === 'custom') {
        console.log(`Deleting custom collection: ${collection.title} (${collection.handle})`);
        await deleteCollection(collection.id);
      }
    }
    
    // Step 2: Create smart collections
    console.log('\n📦 Step 2: Creating smart collections...');
    for (const config of COLLECTIONS) {
      try {
        await createSmartCollection(config);
      } catch (err) {
        console.error(`Failed to create ${config.title}:`, err.message);
      }
    }
    
    // Step 3: Create products
    console.log('\n👟 Step 3: Creating products...');
    let created = 0;
    let failed = 0;
    
    for (const product of PRODUCTS) {
      try {
        await createProduct(product);
        created++;
      } catch (err) {
        console.error(`Failed to create ${product.title}:`, err.message);
        failed++;
      }
    }
    
    console.log(`\n✅ Done! Created ${created} products, ${failed} failed`);
    console.log('\n📝 Next steps:');
    console.log('1. Go to https://admin.shopify.com/store/the-wardrobe-6jaajzyl/collections');
    console.log('2. Verify collections show products');
    console.log('3. Assign theme templates in collection settings');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
