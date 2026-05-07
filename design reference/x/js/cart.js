/* ============================================================
   THE WARDROBE SHILLONG — Cart Manager
   LocalStorage-based cart with WhatsApp checkout
   ============================================================ */

const WHATSAPP_NUMBER = '919876543210'; // Replace with actual number

const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem('tw_cart') || '[]'); } catch(e) { return []; }
  },
  save(items) {
    localStorage.setItem('tw_cart', JSON.stringify(items));
    Cart.updateUI();
  },
  add(product, size) {
    const items = Cart.get();
    const key = product.id + (size ? '__' + size : '');
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      items.push({
        key,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        size: size || null,
        qty: 1
      });
    }
    Cart.save(items);
    showToast('Added to Bag', 'gold');
  },
  remove(key) {
    const items = Cart.get().filter(i => i.key !== key);
    Cart.save(items);
  },
  total() {
    return Cart.get().reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  },
  count() {
    return Cart.get().reduce((sum, i) => sum + (i.qty || 1), 0);
  },
  clear() {
    localStorage.removeItem('tw_cart');
    Cart.updateUI();
  },
  updateUI() {
    // Update cart count badge
    const count = Cart.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('visible', count > 0);
    });
    // Re-render cart if drawer is open
    if (document.querySelector('.cart-drawer.open')) {
      renderCart();
    }
  },
  buildWhatsAppMessage() {
    const items = Cart.get();
    if (!items.length) return '';
    let msg = `Hello! I'd like to purchase the following from The Wardrobe Shillong:\n\n`;
    items.forEach(i => {
      msg += `• ${i.brand} — ${i.name}`;
      if (i.size) msg += ` (Size: ${i.size})`;
      msg += ` — ₹${i.price.toLocaleString('en-IN')}\n`;
    });
    msg += `\nTotal: ₹${Cart.total().toLocaleString('en-IN')}\n\n`;
    msg += `Please confirm availability and payment details. Thank you!`;
    return encodeURIComponent(msg);
  },
  checkout() {
    const msg = Cart.buildWhatsAppMessage();
    if (!msg) { showToast('Your bag is empty'); return; }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  },
  reserve() {
    const items = Cart.get();
    if (!items.length) { showToast('Your bag is empty'); return; }
    let msg = `Hi! I'd like to reserve the following for 24 hours:\n\n`;
    items.forEach(i => {
      msg += `• ${i.brand} — ${i.name}`;
      if (i.size) msg += ` (Size: ${i.size})`;
      msg += `\n`;
    });
    msg += `\nCould you hold these for me? I'll confirm within 24 hours. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }
};

/* ── CART DRAWER ── */
function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const items = Cart.get();
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Your bag is empty.<br>Discover new arrivals above.</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = '';

  container.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${getBrandInitial(item.brand)}</div>
      <div class="cart-item-details">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <button class="cart-item-remove" onclick="Cart.remove('${item.key}'); renderCart();" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');

  const total = Cart.total();
  if (footer) {
    footer.querySelector('.cart-total-amount').textContent = formatPrice(total);
  }
}

/* ── TOAST ── */
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  setTimeout(() => toast.classList.add('show'), 10);
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── HELPERS (duplicated here for cart.js standalone use) ── */
function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
function getBrandInitial(brand) {
  const map = { 'Jordan': 'J', 'Nike': 'N', 'Chrome Hearts': 'CH', 'Louis Vuitton': 'LV', 'Cartier': 'C', 'Palace': 'P' };
  return map[brand] || brand[0];
}
