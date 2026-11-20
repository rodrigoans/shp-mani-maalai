/**
 * Configuración de módulos
 * Agrega aquí todos tus módulos con su estrategia de carga
 */
export const MODULES_CONFIG = {
  
  // ⚡ MÓDULOS CRÍTICOS (se cargan cuando el navegador está libre)
  critical: [
    {
      path: './modules/announcement-rotator.js',
      init: 'initAnnouncements',
      selector: '.utility-bar__announcements'
    },
    {
      path: './modules/old.js',
      init: 'initMiModulo',
      selector: '.mi-selector'
    }
  ],

  // 👁️ MÓDULOS QUE CARGAN AL SER VISIBLES (Intersection Observer)
  onVisible: [
    {
      path: './modules/product-gallery.js',
      init: 'initGallery',
      selector: '.product__gallery',
      rootMargin: '200px' // Precarga 200px antes de entrar
    },
    {
      path: './modules/reviews.js',
      init: 'initReviews',
      selector: '.product__reviews',
      rootMargin: '300px'
    }
  ],

  // 🖱️ MÓDULOS QUE CARGAN AL INTERACTUAR (click, hover, etc.)
  onEvent: [
    {
      path: './modules/mobile-menu.js',
      init: 'initMobileMenu',
      selector: '.header__menu-toggle',
      event: 'click'
    },
    {
      path: './modules/mini-cart.js',
      init: 'initMiniCart',
      selector: '.header__cart-icon',
      event: 'mouseenter'
    },
    {
      path: './modules/quick-view.js',
      init: 'initQuickView',
      selector: '.product__quick-view-btn',
      event: 'click'
    }
  ],

  // ⏰ MÓDULOS CON RETRASO (setTimeout)
  delayed: [
    {
      path: './modules/newsletter-popup.js',
      init: 'initPopup',
      delay: 8000 // 8 segundos
    },
    {
      path: './modules/exit-intent.js',
      init: 'initExitIntent',
      delay: 15000 // 15 segundos
    }
  ]
};