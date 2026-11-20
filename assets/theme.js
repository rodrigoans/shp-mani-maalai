/**
 * main.js - Orquestador que lee la configuración y carga módulos
 */
import { LazyLoader } from '../src/js/lazy-loader.js';
import { MODULES_CONFIG } from '../src/js/config.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Main] Inicializando módulos...');
  
  // Cargar módulos críticos
  MODULES_CONFIG.critical.forEach(module => {
    LazyLoader.loadOnIdle(module.path, module.init);
  });

  // Cargar módulos al ser visibles
  MODULES_CONFIG.onVisible.forEach(module => {
    LazyLoader.loadOnVisible(
      module.selector,
      module.path,
      module.init,
      module.rootMargin
    );
  });

  // Cargar módulos al interactuar
  MODULES_CONFIG.onEvent.forEach(module => {
    LazyLoader.loadOnEvent(
      module.selector,
      module.event,
      module.path,
      module.init
    );
  });

  // Cargar módulos con retraso
  MODULES_CONFIG.delayed.forEach(module => {
    LazyLoader.loadDelayed(module.delay, module.path, module.init);
  });
});