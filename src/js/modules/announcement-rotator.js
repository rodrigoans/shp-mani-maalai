/**
 * Announcement Rotator Module
 */
export function initAnnouncements() {
  const container = document.querySelector('.utility-bar__announcements');
  if (!container) return;

  const items = container.querySelectorAll('.utility-bar__announcement-item');
  if (items.length <= 1) return;

  let currentIndex = 0;
  let timer = null;

  // Inicializar
  items.forEach((item, index) => {
    item.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
  });

  function showNext() {
    items[currentIndex].setAttribute('aria-hidden', 'true');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].setAttribute('aria-hidden', 'false');
  }

  timer = setInterval(showNext, 5000);

  // Pausar al hover
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => {
    timer = setInterval(showNext, 5000);
  });
}