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

// ---------------------------------------------------------------
// Language toggle (EN / 中)
//
// Translatable elements carry one of:
//   data-zh       — swap textContent
//   data-zh-html  — swap innerHTML (for text containing links or <strong>)
//   data-zh-href  — swap an href (used for the two CV files)
// The English original is captured on first run, so it only lives in
// the markup once. data-zh-html elements must not contain data-zh
// elements: replacing innerHTML would discard their captured original.
// ---------------------------------------------------------------
function currentLocale() {
  return document.documentElement.getAttribute('data-locale') === 'zh' ? 'zh' : 'en';
}

function applyLocale(loc) {
  document.querySelectorAll('[data-zh]').forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.textContent;
    el.textContent = loc === 'zh' ? el.dataset.zh : el.dataset.en;
  });

  document.querySelectorAll('[data-zh-html]').forEach((el) => {
    if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
    el.innerHTML = loc === 'zh' ? el.dataset.zhHtml : el.dataset.enHtml;
  });

  document.querySelectorAll('[data-zh-href]').forEach((el) => {
    if (el.dataset.enHref === undefined) el.dataset.enHref = el.getAttribute('href');
    el.setAttribute('href', loc === 'zh' ? el.dataset.zhHref : el.dataset.enHref);
  });

  const t = document.body.dataset;
  if (t.zhTitle) {
    if (t.enTitle === undefined) t.enTitle = document.title;
    document.title = loc === 'zh' ? t.zhTitle : t.enTitle;
  }

  document.documentElement.setAttribute('data-locale', loc);
  document.documentElement.lang = loc === 'zh' ? 'zh-CN' : 'en';
}

applyLocale(currentLocale());

const localeToggle = document.getElementById('localeToggle');
if (localeToggle) {
  localeToggle.addEventListener('click', () => {
    const next = currentLocale() === 'zh' ? 'en' : 'zh';
    applyLocale(next);
    try {
      localStorage.setItem('locale', next);
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

// Certificate lightbox. Award rows carry data-cert (image) and data-cert-title;
// the markup stays a plain list if this script never runs.
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const img = lightbox.querySelector('.lightbox__img');
  const caption = lightbox.querySelector('.lightbox__caption');
  let lastFocused = null;

  const open = (btn) => {
    lastFocused = btn;
    const title = (currentLocale() === 'zh' && btn.dataset.certTitleZh)
      ? btn.dataset.certTitleZh
      : btn.dataset.certTitle;
    img.src = btn.dataset.cert;
    img.alt = title;
    caption.textContent = title;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox__close').focus();
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    img.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('button.cert-open').forEach((btn) => {
    btn.addEventListener('click', () => open(btn));
  });

  lightbox.addEventListener('click', (e) => {
    // Close on backdrop or the close button, but not on the image itself.
    if (e.target === lightbox || e.target.closest('.lightbox__close')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
}

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
