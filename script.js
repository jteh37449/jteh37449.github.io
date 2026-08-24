// Theme toggle. The initial theme is applied by the inline script in each
// page's <head> (before paint, to avoid a flash); this only handles clicks.
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* private mode — the choice just will not persist */
    }
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Email is stored reversed in the HTML so the plain address never appears in the
// page source for scrapers to harvest. Reassemble it at runtime.
document.querySelectorAll('a.email-link[data-e]').forEach((a) => {
  a.href = 'mailto:' + a.dataset.e.split('').reverse().join('');
  a.removeAttribute('data-e');
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
