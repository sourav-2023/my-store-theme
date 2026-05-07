/* ============================================================
   THE WARDROBE SHILLONG — Product Data (inlined)
   ============================================================ */

let PRODUCTS = [
  {
    "id": "aj1-chicago-2025",
    "name": "Air Jordan 1 Retro High OG \u2018Chicago\u2019 2025",
    "brand": "Jordan",
    "category": "sneakers",
    "price": 28500,
    "sizes": ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    "status": "in-stock",
    "provenance": "Sourced from Nike SNKRS, USA",
    "description": "The shoe that started it all. The Chicago colourway returns in its most faithful iteration yet \u2014 crisp white tumbled leather, varsity red overlays, and that unmistakable black toe box. Unworn, original box included.",
    "images": ["uploads/EditsbyAhmar02_e01f5772-77f7-4827-af5c-d5fa5934ec51.webp", "uploads/EditsbyAhmar01_26606013-c06f-4e2a-a961-b7161036215a.webp"],
    "featured": true,
    "dateAdded": "2025-04-14",
    "tags": ["new-arrival", "jordan", "sneakers"]
  },
  {
    "id": "ch-cross-tee-black",
    "name": "Chrome Hearts Cross Patch Tee",
    "brand": "Chrome Hearts",
    "category": "clothing",
    "price": 32000,
    "sizes": ["S", "M", "L", "XL"],
    "status": "in-stock",
    "provenance": "Sourced from Chrome Hearts LA Flagship",
    "description": "Heavyweight cotton in Chrome Hearts\u2019 signature jet-black. Front chest cross patch, back gothic lettering. Pre-washed for that broken-in drape. Receipt and original bag included.",
    "images": ["uploads/O1CN01BiJqeb1arvKkJY98p__2218394303384-0-cib.jpg", "uploads/O1CN01NLtj2Y1arvKhjn6ST__2218394303384-0-cib.jpg"],
    "featured": true,
    "dateAdded": "2025-04-14",
    "tags": ["new-arrival", "chrome-hearts", "clothing"]
  },
  {
    "id": "cartier-santos-glasses",
    "name": "Cartier Santos-Dumont Eyeglasses",
    "brand": "Cartier",
    "category": "accessories",
    "price": 65000,
    "sizes": [],
    "status": "in-stock",
    "provenance": "Sourced from Cartier Boutique, Singapore",
    "description": "The Santos-Dumont optical frame in brushed platinum and gold. Square silhouette with signature screwed bridge detail. Complete with original case, cloth, and certificate of authenticity.",
    "images": ["uploads/62d0a61b54015ce0b0811c73a61a2e81.avif", "uploads/eeeb0578a3e355659f57b9584f0d9f60.avif", "uploads/beb3a404705354209943aee57dd21f27.avif", "uploads/33a4128a45c35ed7aaf235477500ff92.jpg"],
    "featured": true,
    "dateAdded": "2025-04-14",
    "tags": ["new-arrival", "cartier", "accessories"]
  },
  {
    "id": "lv-initiales-belt-40mm",
    "name": "Louis Vuitton Initiales Belt 40mm",
    "brand": "Louis Vuitton",
    "category": "accessories",
    "price": 42000,
    "sizes": ["85cm", "90cm", "95cm", "100cm"],
    "status": "in-stock",
    "provenance": "Sourced from Louis Vuitton, Dubai Mall",
    "description": "Monogram canvas with gold LV buckle. 40mm width \u2014 the classic LV belt silhouette. Barely worn, comes with original dust bag, box, and receipt dated 2024.",
    "images": ["uploads/louis-vuitton-lv-initiales-40mm-reversible-belt--M0159T_PM2_Front view.avif", "uploads/louis-vuitton-lv-initiales-40mm-reversible-belt--M0159T_PM1_Side view.avif", "uploads/louis-vuitton-lv-initiales-40mm-reversible-belt--M0159T_PM1_Worn view.avif"],
    "featured": true,
    "dateAdded": "2025-04-14",
    "tags": ["new-arrival", "louis-vuitton", "accessories", "belts"]
  },
  {
    "id": "jordan-4-bred-remastered",
    "name": "Air Jordan 4 \u2018Bred Remastered\u2019",
    "brand": "Jordan",
    "category": "sneakers",
    "price": 24000,
    "sizes": ["UK 8", "UK 9"],
    "status": "sold-out",
    "provenance": "Sourced from StockX, Verified",
    "description": "The Bred 4 in its most faithful remaster. Net tongue, OG lace tips, and the cement grey speckle throughout. Deadstock, original receipt included.",
    "images": [],
    "featured": false,
    "dateAdded": "2025-03-28",
    "tags": ["archive", "jordan", "sneakers"]
  },
  {
    "id": "ch-leather-purse-black",
    "name": "Chrome Hearts Zip Wallet",
    "brand": "Chrome Hearts",
    "category": "accessories",
    "price": 48000,
    "sizes": [],
    "status": "sold-out",
    "provenance": "Sourced from Chrome Hearts Tokyo",
    "description": "Full-grain matte black leather with silver cross zip pull. Interior card slots and bill compartment. Aged silver hardware. Ships with original pouch.",
    "images": [],
    "featured": false,
    "dateAdded": "2025-03-15",
    "tags": ["archive", "chrome-hearts", "accessories"]
  },
  {
    "id": "palace-tri-ferg-hoodie",
    "name": "Palace Tri-Ferg Hoodie \u2018Washed Black\u2019",
    "brand": "Palace",
    "category": "clothing",
    "price": 18500,
    "sizes": ["M", "L"],
    "status": "in-stock",
    "provenance": "Sourced from Palace Skateboards, London",
    "description": "The definitive Palace hoodie in enzyme-washed black. Tri-Ferg embroidery on chest, clean back. 500gsm fleece \u2014 built for Shillong winters.",
    "images": [],
    "featured": false,
    "dateAdded": "2025-04-10",
    "tags": ["palace", "clothing"]
  },
  {
    "id": "nike-socks-crew-3pack",
    "name": "Nike Everyday Crew Socks (3 Pack)",
    "brand": "Nike",
    "category": "accessories",
    "price": 1800,
    "sizes": ["S/M", "L/XL"],
    "status": "in-stock",
    "provenance": "Nike Official",
    "description": "White, black, and grey. The essentials. Ribbed crew with Nike Swoosh at ankle. Cushioned footbed.",
    "images": [],
    "featured": false,
    "dateAdded": "2025-04-12",
    "tags": ["nike", "accessories", "socks"]
  }
];

async function loadProducts() {
  // Try loading override from admin edits first
  loadProductsWithOverride();
  return PRODUCTS;
}

function loadProductsWithOverride() {
  const override = localStorage.getItem('tw_products_override');
  if (override) {
    try { PRODUCTS = JSON.parse(override); } catch(e) {}
  }
}

function getProducts(filter = {}) {
  let p = [...PRODUCTS];
  if (filter.category) p = p.filter(x => x.category === filter.category);
  if (filter.status)   p = p.filter(x => x.status === filter.status);
  if (filter.featured) p = p.filter(x => x.featured === true);
  if (filter.tag)      p = p.filter(x => x.tags && x.tags.includes(filter.tag));
  return p;
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function saveProducts() {
  localStorage.setItem('tw_products_override', JSON.stringify(PRODUCTS));
}

function formatPrice(amount) {
  return '\u20b9' + amount.toLocaleString('en-IN');
}

function getBrandInitial(brand) {
  const map = {
    'Jordan': 'J', 'Nike': 'N', 'Chrome Hearts': 'CH',
    'Louis Vuitton': 'LV', 'Cartier': 'C', 'Palace': 'P'
  };
  return map[brand] || brand[0];
}
