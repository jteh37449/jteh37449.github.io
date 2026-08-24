# jteh37449.github.io

Jasper Tan's personal site, served by GitHub Pages at https://jteh37449.github.io

Static HTML and CSS, no build step. Layout follows the Minimal Mistakes academic pattern:
a top navigation bar, a left sidebar with photo and links, and a right content column.

## Files

| File | Contents |
|---|---|
| `index.html` | Homepage — intro and News |
| `education.html` | Degree, awards, skills, activities |
| `projects.html` | GDP Labs internship, chess engine, Chat-Space |
| `activity.html` | Contest problem testing and volunteering |
| `codes.html` | Repositories and competitive programming profiles |
| `blogs.html` | Redirect stub → `activity.html` (the page was briefly live under the old name) |
| `styles.css` | All styling, including both colour themes |
| `script.js` | Theme toggle, certificate lightbox, mobile nav, email assembly, footer year |
| `images/profile.jpg` | Avatar, cropped square from the original photo |
| `images/certificates/` | Award certificates shown in the lightbox |
| `files/Jasper_Tan_CV.pdf` | English CV, phone number redacted |
| `files/Jasper_Tan_CV_zh.pdf` | Chinese CV, phone number redacted |

## Themes

Light and dark. The `<head>` of every page carries a small inline script that reads
`localStorage.theme` (falling back to the OS `prefers-color-scheme`) and sets
`data-theme` on `<html>` **before** the stylesheet paints, so there is no flash of the
wrong colours on load. The button in the masthead flips it and saves the choice.

Colours are CSS variables in `styles.css`, defined three times:

1. `:root` — the light palette.
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` — the
   no-JavaScript fallback.
3. `:root[data-theme="dark"]` — last, so an explicit choice beats the OS setting.

Change a colour in all three places or the themes drift apart. Both palettes clear
WCAG AA contrast; the muted grey is `#6a7278` rather than the theme's original
`#7a8288`, which was only 3.9:1 on white.

## Languages (EN / 中)

One set of pages carries both languages. English lives in the markup as normal; Chinese
lives in data attributes beside it:

| Attribute | Swaps | Use for |
|---|---|---|
| `data-zh` | `textContent` | plain text |
| `data-zh-html` | `innerHTML` | text containing links or `<strong>` |
| `data-zh-href` | the `href` | the two CV files |
| `data-zh-title` (on `<body>`) | `document.title` | page title |
| `data-cert-title-zh` | lightbox caption | certificate captions |

`applyLocale()` in `script.js` captures the English original on first run, so English is
never duplicated. **A `data-zh-html` element must not contain `data-zh` children** —
replacing `innerHTML` destroys them along with their captured original.

The initial language comes from `localStorage.locale`, falling back to the browser's
`navigator.language`. The `<head>` script sets `data-locale` before paint (same trick as the
theme), but the *text* swap runs from `script.js` at the end of `<body>`, so a Chinese
visitor may catch a brief flash of English on a slow connection. Living with that is the
trade for not maintaining a second set of pages.

Proper nouns stay in English on purpose: brand names (GitHub, Codeforces, Kaggle), official
round names ("Codeforces Round 1089 (Div. 2)"), repo names, and language/framework names.

## Entrance animations

Content fades and lifts in on load, staggered: masthead → sidebar → main column,
finishing in about 1.3s. Hovering the theme button rotates its icon; the certificate
lightbox scales in.

These fade **from opacity 0**, so a failure to animate would show a blank page. Two
guards, in `styles.css` and the inline `<head>` script:

1. Every animation rule is gated behind `:root.anim`, which only the head script adds.
   **No JavaScript → no animation, content simply renders.**
2. The same script sets a 1.6s `setTimeout` adding `.anim-settled`, which force-clears
   the animation (`animation: none; opacity: 1`). `setTimeout` runs off the wall clock,
   so it fires even where the *animation timeline* is frozen — some headless renderers
   and crawlers never advance `document.timeline.currentTime`, and without this guard
   they would render the page empty.

All animation rules also sit inside `@media (prefers-reduced-motion: no-preference)`,
so anyone who asked their OS for less motion gets none. The failsafe deliberately sits
*outside* that query, so it applies in every case.

If you add animations, keep both properties: gate on `:root.anim` and add the selector
to the `.anim-settled` failsafe block. Never write a bare `opacity: 0` that only an
animation undoes.

## Editing

**The masthead and sidebar are duplicated in all five HTML files** (no build step, no
includes). Editing your bio, links, or nav means editing five files, or the pages will
disagree with each other. Remember to update the `data-zh` alongside the English.

To swap the photo: the CSS crops to a circle, so use a square source or the centre crop
will cut your face off.

**The email address is stored reversed** (`data-e="moc.liamg@..."`) and reassembled by
`script.js` at load, so the plain address never appears in the page source for scrapers
to harvest. If you change it, reverse the new address the same way — don't put a plain
`mailto:` back in. Trade-off: with JavaScript off, the Email link does nothing.

### Adding an award with a certificate

In `education.html`, a row that opens a certificate is a `<li class="has-cert">` wrapping a
`<button class="cert-open">` with two data attributes:

- `data-cert` — path to the image under `images/certificates/`
- `data-cert-title` — the caption shown under the image in the lightbox

A row *without* a certificate is a plain `<li>` with two `<span>`s. Only rows inside a
`button.cert-open` get the document icon, so the icon always means "this opens something."

Certificates are JPEGs capped at 1400px wide. PDFs were rendered with PyMuPDF; note that
some source PDFs are very large (one page was 7438pt wide) and need a reduced zoom factor
or MuPDF refuses with "Overly large image".

## Publishing

The remote is already configured. To update the live site:

```bash
git add -A && git commit -m "Your message" && git push
```

GitHub Pages redeploys automatically, usually within a minute.

## Local preview

```bash
python -m http.server 8000
```

Then open http://localhost:8000 — and hard-reload (Ctrl+F5) after editing CSS or JS,
since the browser caches both aggressively.
