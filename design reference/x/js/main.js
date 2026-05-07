/* ============================================================
   THE WARDROBE SHILLONG — Main JS
   Navigation, animations, shared utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── MOBILE MENU ── */
  const menuBtn = document.getElementById('menu-btn');
  const drawer  = document.getElementById('nav-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── CART BUTTON ── */
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  /* ── CART OVERLAY CLOSE ── */
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);

  /* ── CART FOOTER BUTTONS ── */
  document.getElementById('btn-whatsapp-checkout')?.addEventListener('click', () => Cart.checkout());
  document.getElementById('btn-reserve')?.addEventListener('click', () => Cart.reserve());

  /* ── INIT CART COUNT ── */
  Cart.updateUI();

  /* ── SEARCH ── */
  const searchBtn  = document.getElementById('nav-search-btn');
  const searchOv   = document.getElementById('search-overlay');
  const searchInp  = document.getElementById('search-input');
  const searchClose= document.getElementById('search-close');
  if (searchBtn && searchOv) {
    searchBtn.addEventListener('click', async () => {
      if (typeof PRODUCTS !== 'undefined' && !PRODUCTS.length) await loadProducts();
      else if (typeof loadProducts === 'function') await loadProducts();
      searchOv.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInp?.focus(), 100);
    });
    searchClose?.addEventListener('click', () => {
      searchOv.classList.remove('open');
      document.body.style.overflow = '';
    });
    searchInp?.addEventListener('input', doSearch);
  }

  /* ── SCROLL FADE-IN ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ── ACCORDION ── */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen  = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-trigger.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.style.height = '0';
      });
      if (!isOpen) {
        btn.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
      }
    });
  });

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links-desktop a, .nav-drawer-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── LOAD PRODUCTS (always — search needs them) ── */
  if (typeof loadProducts === 'function') {
    await loadProducts();
  }
  const productGrid = document.getElementById('product-grid');
  const archiveGrid = document.getElementById('archive-grid');
  if (productGrid) renderProductGrid(productGrid);
  if (archiveGrid) renderArchiveGrid(archiveGrid);
});

/* ── RENDER PRODUCT CARD ── */
function renderProductCard(product) {
  const initial = getBrandInitial(product.brand);
  const isSold  = product.status === 'sold-out';
  const isNew   = product.tags?.includes('new-arrival');

  const badgeHTML = isSold
    ? `<span class="product-card-badge badge-sold">Sold Out</span>`
    : isNew
    ? `<span class="product-card-badge badge-new">New</span>`
    : '';

  const hasImage = product.images && product.images.length && product.images[0] && !product.images[0].startsWith('images/placeholder');
  const imageHTML = hasImage
    ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
    : `<div class="product-card-img-placeholder">
        <span class="brand-initial">${initial}</span>
        <span class="brand-label">${product.brand}</span>
       </div>`;

  return `
    <article class="product-card ${isSold ? 'product-card-sold-out' : ''}" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-card-image">
        ${badgeHTML}
        ${imageHTML}
      </div>
      <div class="product-card-info">
        <div class="product-card-brand">${product.brand}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">${formatPrice(product.price)}</div>
      </div>
    </article>`;
}

function renderProductGrid(grid) {
  const category = grid.dataset.category;
  const featured  = grid.dataset.featured === 'true';
  let products = featured ? getProducts({ featured: true }) : getProducts({ category });
  products = products.filter(p => p.status === 'in-stock');
  grid.innerHTML = products.length
    ? products.map(renderProductCard).join('')
    : `<p style="color:var(--charcoal-mid);font-size:14px;grid-column:1/-1;padding:40px 0;">No products in this category yet.</p>`;
}

function doSearch() {
  const q = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
  const results = document.getElementById('search-results');
  if (!results) return;
  if (!q) {
    results.innerHTML = `<div class="search-empty-state">
      <div class="label">Discover</div>
      <h3>What are you looking for?</h3>
      <div class="search-suggestions">
        <button onclick="document.getElementById('search-input').value='Jordan';doSearch()">Jordan</button>
        <button onclick="document.getElementById('search-input').value='Chrome Hearts';doSearch()">Chrome Hearts</button>
        <button onclick="document.getElementById('search-input').value='Louis Vuitton';doSearch()">Louis Vuitton</button>
        <button onclick="document.getElementById('search-input').value='Cartier';doSearch()">Cartier</button>
      </div>
    </div>`;
    return;
  }
  const matches = (PRODUCTS || []).filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tags || []).some(t => t.toLowerCase().includes(q))
  );
  if (!matches.length) {
    results.innerHTML = `<div class="search-empty-state"><div class="label">No matches</div><h3>Nothing found for "${q}"</h3><p style="color:var(--charcoal-mid);font-size:13px;margin-top:8px;">Try a brand name or category.</p></div>`;
    return;
  }
  results.innerHTML = matches.map(p => {
    const img = p.images && p.images[0] && !p.images[0].startsWith('images/placeholder')
      ? `<img src="${p.images[0]}" alt="">`
      : `<span style="font-family:var(--serif);font-size:22px;color:var(--border-gold);">${getBrandInitial(p.brand)}</span>`;
    return `<a href="product.html?id=${p.id}" class="search-result-item" style="text-decoration:none;color:inherit;">
      <div class="search-result-img">${img}</div>
      <div class="search-result-info">
        <div class="search-result-brand">${p.brand}</div>
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">${formatPrice(p.price)}</div>
      </div>
    </a>`;
  }).join('');
}

function renderArchiveGrid(grid) {
  const products = getProducts({ status: 'sold-out' });
  grid.innerHTML = products.length
    ? products.map(renderProductCard).join('')
    : `<p style="color:var(--charcoal-mid);font-size:14px;grid-column:1/-1;padding:40px 0;">The archive is empty for now.</p>`;
}
