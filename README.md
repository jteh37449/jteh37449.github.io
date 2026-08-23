# jteh37449.github.io

Jasper Tan's personal site, served by GitHub Pages at https://jteh37449.github.io

Layout follows the Minimal Mistakes academic pattern: a top navigation bar, a left sidebar
with photo and links, and a right content column.

## Files

| File | Contents |
|---|---|
| `index.html` | Homepage — intro paragraphs and a News list |
| `education.html` | University, achievements, awards, certifications, coursework |
| `projects.html` | Project write-ups |
| `blogs.html` | Index of posts (individual posts go in `posts/`) |
| `codes.html` | Released repositories and tools |
| `styles.css` | All styling |
| `script.js` | Mobile nav toggle and footer year |
| `images/profile.jpg` | Avatar, cropped square from `Me.jpg` |

## Still to fill in

Placeholder text is wrapped in `<em>[square brackets]</em>` so it is easy to spot on the page.
Search the HTML files for `[` to find every spot:

- **index.html** — major and year, and the whole second paragraph; the News list is invented, replace or delete it
- **education.html** — degree name, years, high school, and all the awards/certifications/coursework entries
- **projects.html** — all three project cards
- **blogs.html** — all three post entries
- **codes.html** — both repository cards

## Editing

**The sidebar is duplicated in all five HTML files.** It is the block starting with
`<aside class="sidebar">`. When you change your bio, location, or links, change it in every
file — otherwise the pages disagree with each other. Same for `Jasper Tan` in the `<title>`,
masthead, and footer of each page.

To swap the photo: the CSS crops to a circle, so use a square source or your face will be
center-cropped out. `images/profile.jpg` was cropped from `Me.jpg` around the face.

**The email address is stored reversed** (`data-e="moc.liamg@..."`) and reassembled by
`script.js` at load, so the plain address never appears in the page source for scrapers to
harvest. If you change it, reverse the new address the same way — don't put a plain
`mailto:` back in. The trade-off: with JavaScript disabled the Email link does nothing.

Colors, fonts, and the sidebar width are the CSS variables in the `:root` block at the top of
`styles.css`.

### Adding a blog post

Create `posts/your-post.html` (copy any page as a starting point, adjust the relative paths to
`../styles.css` and `../script.js`), then add an entry to the `.post-list` in `blogs.html`.

## Publishing

Create a repo named exactly `jteh37449.github.io`, then:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/jteh37449/jteh37449.github.io.git
git push -u origin main
```

In the repo's Settings → Pages, set Source to "Deploy from a branch", branch `main`, folder
`/ (root)`. The site goes live at https://jteh37449.github.io within a minute or two.

## Local preview

```bash
python -m http.server 8000
```

Then open http://localhost:8000
