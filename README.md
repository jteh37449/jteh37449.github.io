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
| `blogs.html` | Post index (currently empty — see below) |
| `codes.html` | Repositories and competitive programming profiles |
| `styles.css` | All styling, including both colour themes |
| `script.js` | Theme toggle, mobile nav, email assembly, footer year |
| `images/profile.jpg` | Avatar, cropped square from the original photo |

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

## Editing

**The masthead and sidebar are duplicated in all five HTML files** (no build step, no
includes). Editing your bio, links, or nav means editing five files, or the pages will
disagree with each other.

To swap the photo: the CSS crops to a circle, so use a square source or the centre crop
will cut your face off.

**The email address is stored reversed** (`data-e="moc.liamg@..."`) and reassembled by
`script.js` at load, so the plain address never appears in the page source for scrapers
to harvest. If you change it, reverse the new address the same way — don't put a plain
`mailto:` back in. Trade-off: with JavaScript off, the Email link does nothing.

### Adding a blog post

`blogs.html` currently shows an empty-state note, with a commented-out `.post-list`
template below it. To publish:

1. Create `posts/your-post.html` — copy any page as a starting point and change
   `styles.css` → `../styles.css`, `script.js` → `../script.js`,
   `images/profile.jpg` → `../images/profile.jpg`, and the nav `href`s to `../`.
2. Delete the `.empty-note` paragraph.
3. Uncomment the `.post-list` block and add an entry, newest first.

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
