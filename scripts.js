// Navigation
(function () {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-nav');

  if (!nav || !toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Optional: close menu when a link is clicked (nice on mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Highlight current page in nav
(function () {
  const links = document.querySelectorAll('.main-nav__list a');
  if (!links.length) return;

  const currentPath = window.location.pathname.replace(/\/+$/, '');
  const currentFile = currentPath.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const linkPath = link.getAttribute('href').replace(/\/+$/, '');
    const linkFile = linkPath.split('/').pop() || 'index.html';

    if (linkFile === currentFile) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// Contact form placeholder (until hosting is chosen)
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const hp = contactForm.querySelector('input[name="company"]');
    if (hp && hp.value.trim() !== '') return; // spam

    formNote.textContent =
      'Thanks! This form isn’t connected yet — once hosting is finalized, we’ll enable delivery.';
    contactForm.reset();
  });
}

// Theme tooltips (Submissions page)
(function () {
  const items = document.querySelectorAll('.theme-item');
  if (!items.length) return;

  function closeAll(exceptId = null) {
    items.forEach((item) => {
      const btn = item.querySelector('.tip-btn');
      const tip = item.querySelector('.tip');
      if (!btn || !tip) return;
      if (exceptId && tip.id === exceptId) return;
      btn.setAttribute('aria-expanded', 'false');
      tip.hidden = true;
    });
  }

  items.forEach((item) => {
    const btn = item.querySelector('.tip-btn');
    const tip = item.querySelector('.tip');
    if (!btn || !tip) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAll(tip.id);
      btn.setAttribute('aria-expanded', String(!isOpen));
      tip.hidden = isOpen;
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();
