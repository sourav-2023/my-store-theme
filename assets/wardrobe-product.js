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

    // Handle mobile sticky form submission
    const mobileForm = mobileSticky.querySelector('form');
    if (mobileForm) {
      mobileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Sync with main form and submit
        const mainForm = document.querySelector('#wardrobe-product-form');
        if (mainForm) {
          const mainInput = mainForm.querySelector('input[name="id"]');
          const mobileInput = mobileForm.querySelector('input[name="id"]');
          if (mainInput && mobileInput) {
            mainInput.value = mobileInput.value;
          }
          mainForm.requestSubmit();
        }
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WardrobeProduct();
});

// Handle Shopify cart events
document.addEventListener('DOMContentLoaded', () => {
  // Listen for cart updates
  document.addEventListener('cart:updated', () => {
    // Update cart count badge
    const cartCount = document.querySelector('.cart-count-bubble');
    if (cartCount) {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          cartCount.textContent = cart.item_count;
          cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
        })
        .catch(error => console.error('Error fetching cart:', error));
    }
  });

  // Handle add to cart loading states
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitButton = form.querySelector('button[type="submit"]');
      if (!submitButton) return;

      const buttonText = submitButton.querySelector('.wardrobe-button-text');
      const loadingSpinner = submitButton.querySelector('.wardrobe-loading-spinner');

      if (buttonText) buttonText.textContent = 'Adding...';
      if (loadingSpinner) loadingSpinner.removeAttribute('hidden');
      submitButton.disabled = true;

      // Reset after a timeout (in case of errors)
      setTimeout(() => {
        if (buttonText) buttonText.textContent = 'Add to Cart';
        if (loadingSpinner) loadingSpinner.setAttribute('hidden', '');
        submitButton.disabled = false;
      }, 3000);
    });
  });
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
