/**
 * LazyLoader - Motor de carga diferida
 */
export const LazyLoader = {
  loadedModules: new Set(),
  pendingModules: new Map(),

  /**
   * Carga un módulo cuando el navegador está inactivo
   */
  loadOnIdle(modulePath, initFunction) {
    const load = () => this._importModule(modulePath, initFunction);
    console.info("Hello from LazyLoad")
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 2000 });
    } else {
      setTimeout(load, 1000);
    }
  },

  /**
   * Carga un módulo cuando un elemento entra en el viewport
   */
  loadOnVisible(selector, modulePath, initFunction, rootMargin = '200px') {
    const element = document.querySelector(selector);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._importModule(modulePath, initFunction);
            obs.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(element);
  },

  /**
   * Carga un módulo al disparar un evento
   */
  loadOnEvent(selector, eventType, modulePath, initFunction) {
    const element = document.querySelector(selector);
    if (!element) return;

    const handler = () => {
      this._importModule(modulePath, initFunction);
      element.removeEventListener(eventType, handler);
    };

    element.addEventListener(eventType, handler, { once: true });
  },

  /**
   * Carga un módulo después de un retraso
   */
  loadDelayed(delay, modulePath, initFunction) {
    setTimeout(() => {
      this.loadOnIdle(modulePath, initFunction);
    }, delay);
  },

  /**
   * Importa el módulo (con cache)
   */
  async _importModule(modulePath, initFunction) {
    if (this.loadedModules.has(modulePath)) return;
    if (this.pendingModules.has(modulePath)) return;

    this.pendingModules.set(modulePath, true);

    try {
      const module = await import(modulePath);
      this.loadedModules.add(modulePath);
      this.pendingModules.delete(modulePath);
      
      if (module[initFunction] && typeof module[initFunction] === 'function') {
        module[initFunction]();
      }
    } catch (error) {
      console.error(`[LazyLoader] Error cargando ${modulePath}:`, error);
      this.pendingModules.delete(modulePath);
    }
  }
};