# Aaron Wu — Personal Site

Live at **[aaronwuwoo.github.io](https://aaronwuwoo.github.io)**

A hand-built personal website. Editorial aesthetic — cream and terracotta palette, Fraunces serif + Plus Jakarta Sans, lots of subtle motion.

---

## 📁 Files

```
aaronwuwoo.github.io/
├── index.html      ← All page content
├── style.css       ← All visual styling (colors, fonts, layout, animations)
├── script.js       ← All interactions (loader, cursor, clock, scroll, etc.)
├── favicon.svg     ← Browser tab icon
└── README.md       ← This file
```

---

## 🛠️ Editing on GitHub

The whole site lives in plain HTML/CSS/JS — no build step, no framework, no terminal needed.

1. Click any file → click the pencil ✏️ → edit → **Commit changes**
2. Wait ~60 seconds for GitHub Pages to rebuild
3. Hard-refresh the live site (`Cmd+Shift+R` / `Ctrl+Shift+R`) to bust the browser cache

### Common edits

- **Change copy** (name, bio, project description): edit `index.html`
- **Change colors/fonts/spacing**: edit `style.css` — the first block (`:root { ... }`) holds the entire palette in one place
- **Change behavior** (clock, scroll, animations): edit `script.js`

---

## ✨ Features

**On load:**
- Page loader spelling out "Aaron Wu" letter-by-letter, then peeling away
- Animated mesh gradient blobs drifting in the background
- Subtle film grain breathing on top of everything

**Hero:**
- Name scrambles in with random characters before settling
- Morphing SVG blob shape behind the text
- Parallax — title shrinks and fades as you scroll past

**Navigation:**
- Live LA time updating every second
- ⌘K command palette — press `Cmd+K` or `Ctrl+K` anywhere to open
- Theme toggle (light/dark) that remembers your preference
- Side dot nav showing current section
- Keyboard shortcuts: `J` next section, `K` previous section
- Scroll progress bar at the top

**Cursor (desktop only):**
- Custom dot + ring cursor
- Magnetic effect on buttons and links
- "VIEW" label when hovering project cards
- Soft warm spotlight glow follows your mouse

**Sections:**
- About with sticky 3D-tilting portrait
- Animated stat counters that count up when scrolled into view
- Skills grid
- Featured project card for NQ Context (mock chart + Pine Script code snippet)
- Two scrolling marquee bands
- Contact with magnetic email link and personalized time-of-day greeting
- Variable letter weight on hover for section titles
- Background tint shifts per section

**Accessibility:**
- Respects `prefers-reduced-motion`
- Respects `prefers-color-scheme` for initial theme

---

## 🎨 Customizing

### Change the color scheme

In `style.css`, find the `:root` block at the top:

```css
:root {
  --bg: #f5f1ea;        ← cream background
  --ink: #1a1714;       ← dark text
  --accent: #c04f2c;    ← terracotta accent
  --sage: #7a8471;      ← muted green
  /* ... */
}
```

Swap the hex codes. The dark theme variables sit right below in `[data-theme="dark"]`.

### Add a real photo

In `index.html`, find the `.portrait-wrap` block and replace with:

```html
<div class="portrait-wrap" id="portrait">
  <img src="me.jpg" alt="Aaron Wu" class="portrait" />
</div>
```

Then upload `me.jpg` to the repo (Add file → Upload files).

### Add another project

In `index.html`, find the `.projects` block. Copy the entire `<article class="project--featured">` block, paste a second copy right after it, and change the content. Remove the `--featured` class if you want the smaller list style.

---

## 🚀 Tech notes

- **Hosting:** GitHub Pages (free, deploys on every commit)
- **Smooth scroll:** [Lenis](https://lenis.studiofreight.com/) loaded from unpkg CDN
- **Fonts:** Google Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono)
- **No build step:** zero npm, zero bundler, zero framework
- **No tracking:** no analytics, no cookies

---

## 🐛 Troubleshooting

**Site shows old content after committing**
GitHub Pages caches aggressively. Hard-refresh with `Cmd+Shift+R`, or open in incognito.

**Live site is blank or unstyled**
Check the **Actions** tab in your repo — the most recent build should have a green ✅. If it's red ❌, click in to see the error.

**Cancelled deployments in Actions tab**
Normal when you commit multiple times in quick succession — GitHub cancels older builds so only the latest deploys. As long as the most recent run is green, you're fine.

**Something looks broken after an edit**
Click the **History** of the file on GitHub → find the last working commit → click the `...` menu → revert.

---

Built by Aaron Wu, mostly while learning. Constantly tweaking.
