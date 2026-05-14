/**
 * Wardrobe Product JavaScript
 * Handles gallery interactions, accordion behavior, and other product page functionality
 */

class WardrobeProduct {
  constructor() {
    this.init();
  }

  init() {
    this.initGallery();
    this.initAccordions();
    this.initVariantSelectors();
    this.initMobileSticky();
    this.initProductForm();
  }

  // Gallery functionality
  initGallery() {
    const thumbnails = document.querySelectorAll('.wardrobe-product-gallery__thumbnail');
    const mediaItems = document.querySelectorAll('.wardrobe-product-gallery__media');

    if (thumbnails.length === 0) return;

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails and media items
        thumbnails.forEach(t => t.classList.remove('is-active'));
        mediaItems.forEach(m => m.classList.remove('is-active'));

        // Add active class to clicked thumbnail and corresponding media
        thumbnail.classList.add('is-active');
        if (mediaItems[index]) {
          mediaItems[index].classList.add('is-active');
        }
      });
    });
  }

  // Accordion functionality
  initAccordions() {
    const accordions = document.querySelectorAll('.wardrobe-accordion');
    
    if (accordions.length === 0) return;

    // Handle accordion open/close behavior
    accordions.forEach(accordion => {
      const summary = accordion.querySelector('.wardrobe-accordion__summary');
      const content = accordion.querySelector('.wardrobe-accordion__content');
      
      if (!summary || !content) return;

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isMobile = window.innerWidth < 1024;
        const isOpen = accordion.hasAttribute('open');
        
        if (isMobile) {
          // Mobile: allow multiple accordions to be open
          if (isOpen) {
            this.closeAccordion(accordion);
          } else {
            this.openAccordion(accordion);
          }
        } else {
          // Desktop: exclusive behavior (only one open at a time)
          if (isOpen) {
            this.closeAccordion(accordion);
          } else {
            // Close all other accordions first
            accordions.forEach(otherAccordion => {
              if (otherAccordion !== accordion && otherAccordion.hasAttribute('open')) {
                this.closeAccordion(otherAccordion);
              }
            });
            this.openAccordion(accordion);
          }
        }
      });
    });
  }

  openAccordion(accordion) {
    const content = accordion.querySelector('.wardrobe-accordion__content');
    const icon = accordion.querySelector('.wardrobe-accordion__icon');
    
    accordion.setAttribute('open', '');
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
    
    if (icon) {
      icon.style.transform = 'rotate(45deg)';
    }
  }

  closeAccordion(accordion) {
    const content = accordion.querySelector('.wardrobe-accordion__content');
    const icon = accordion.querySelector('.wardrobe-accordion__icon');
    
    accordion.removeAttribute('open');
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  }

  // Variant selector functionality
  initVariantSelectors() {
    const variantSelects = document.querySelectorAll('.wardrobe-variant-selects');
    
    variantSelects.forEach(variantSelect => {
      const inputs = variantSelect.querySelectorAll('.wardrobe-variant-input');
      
      inputs.forEach(input => {
        input.addEventListener('change', () => {
          this.handleVariantChange(variantSelect);
        });
      });
    });
  }

  handleVariantChange(variantSelect) {
    // Get all checked radio inputs
    const checkedInputs = variantSelect.querySelectorAll('.wardrobe-variant-input:checked');
    const selectedOptions = Array.from(checkedInputs).map(input => input.value);
    
    // Find matching variant from the JSON data
    const variantsData = variantSelect.querySelector('[data-product-variants]');
    if (!variantsData) return;
    
    try {
      const variants = JSON.parse(variantsData.textContent);
      
      // Find variant matching all selected options
      const selectedVariant = variants.find(variant => {
        return variant.options.every((option, index) => {
          return option === selectedOptions[index];
        });
      });
      
      if (!selectedVariant) return;
      
      // Update hidden input with correct variant ID
      const form = variantSelect.closest('form');
      const hiddenInput = form.querySelector('input[name="id"][type="hidden"]');
      if (hiddenInput) {
        hiddenInput.value = selectedVariant.id;
      }
      
      // Also update mobile sticky form
      const mobileForm = document.querySelector('.wardrobe-product-hero__mobile-sticky-form');
      if (mobileForm) {
        const mobileInput = mobileForm.querySelector('input[name="id"]');
        if (mobileInput) {
          mobileInput.value = selectedVariant.id;
        }
      }

      // Update button states
      this.updateButtonStates(selectedVariant.id.toString());
    } catch (error) {
      console.error('Error finding selected variant:', error);
    }
  }

  updateButtonStates(variantId) {
    const variantsData = document.querySelector('[data-product-variants]');
    if (!variantsData) return;

    try {
      const variants = JSON.parse(variantsData.textContent);
      const selectedVariant = variants.find(v => v.id.toString() === variantId);
      
      if (!selectedVariant) return;

      const addToCartButton = document.querySelector('.wardrobe-button--add-to-cart');
      if (!addToCartButton) return;

      const buttonText = addToCartButton.querySelector('.wardrobe-button-text');
      const loadingSpinner = addToCartButton.querySelector('.wardrobe-loading-spinner');

      // Always allow add to cart regardless of Shopify inventory
      addToCartButton.disabled = false;
      if (buttonText) buttonText.textContent = 'Add to Cart';
      if (loadingSpinner) loadingSpinner.setAttribute('hidden', '');
    } catch (error) {
      console.error('Error parsing variants data:', error);
    }
  }

  // Mobile sticky add to cart
  initMobileSticky() {
    const mobileSticky = document.querySelector('.wardrobe-product-hero__mobile-sticky');
    if (!mobileSticky) return;

    // Show/hide sticky bar based on scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateStickyVisibility = () => {
      const currentScrollY = window.scrollY;
      const productInfo = document.querySelector('.wardrobe-product-info');
      
      if (!productInfo) return;

      const productInfoBottom = productInfo.offsetTop + productInfo.offsetHeight;

      if (currentScrollY > productInfoBottom) {
        mobileSticky.style.transform = 'translateY(0)';
      } else {
        mobileSticky.style.transform = 'translateY(100%)';
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStickyVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);

    const mobileForm = mobileSticky.querySelector('form');
    if (mobileForm) {
      mobileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mobileInput = mobileForm.querySelector('input[name="id"]');
        this.addToCart(mobileInput?.value);
      });
    }
  }

  initProductForm() {
    const productForm =
      document.querySelector('#wardrobe-product-form') ||
      document.querySelector('form[action="/cart/add"]');
    if (!productForm) return;

    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const variantInput = productForm.querySelector('input[name="id"]');
      this.addToCart(variantInput?.value);
    });
  }

  addToCart(variantId) {
    if (!variantId) {
      const variantsData = document.querySelector('[data-product-variants]');
      if (variantsData) {
        try {
          const variants = JSON.parse(variantsData.textContent);
          if (variants.length > 0) variantId = String(variants[0].id);
        } catch (e) {}
      }
    }
    if (!variantId) return;

    const btn = document.querySelector('.wardrobe-button--add-to-cart');
    const btnText = btn?.querySelector('.wardrobe-button-text');
    const spinner = btn?.querySelector('.wardrobe-loading-spinner');

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Adding...';
    if (spinner) spinner.removeAttribute('hidden');

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify({ id: Number(variantId), quantity: 1 })
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err));
        return res.json();
      })
      .then(() => {
        window.location.href = '/cart';
      })
      .catch(err => {
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = 'Add to Cart';
        if (spinner) spinner.setAttribute('hidden', '');

        const msg = err?.description || err?.message || 'Could not add to cart. Please try again.';
        let errorEl = document.querySelector('.wardrobe-cart-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'wardrobe-cart-error';
          errorEl.style.cssText = 'color:#b00;margin-top:8px;font-size:14px;';
          const buyButtons = document.querySelector('.wardrobe-buy-buttons');
          if (buyButtons) buyButtons.insertAdjacentElement('afterend', errorEl);
        }
        errorEl.textContent = msg;
      });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WardrobeProduct();
});


// Handle resize events for accordion behavior
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-initialize accordions to handle responsive behavior
    const accordions = document.querySelectorAll('.wardrobe-accordion');
    accordions.forEach(accordion => {
      const content = accordion.querySelector('.wardrobe-accordion__content');
      if (content && accordion.hasAttribute('open')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }, 250);
});
