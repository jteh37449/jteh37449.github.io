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
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
