# Aaron Wu — Personal Site

Live at **[aaronwuwoo.github.io](https://aaronwuwoo.github.io)**

A hand-built personal site / digital portfolio. Bloomberg-terminal aesthetic — pitch black with amber accents, IBM Plex fonts, subtle grid lines, an animated candle chart drifting in the background.

UCI Class of 2030 · Business Administration · Funded prop trader on NQ futures · Building tools to read the tape.

---

## 📁 Files

```
aaronwuwoo.github.io/
├── index.html         ← Home page (hero, about, skills, work, contact)
├── nq-context.html    ← Project detail page for the NQ Context indicator suite
├── style.css          ← All visual styling (~1400 lines)
├── script.js          ← All interactions (~600 lines)
├── favicon.svg        ← Browser tab icon (amber AW on black)
├── portrait.png       ← Photo used in the About section
├── .nojekyll          ← Disables Jekyll on GitHub Pages
└── README.md          ← This file
```

---

## 🛠️ Editing on GitHub

No build step, no framework, no terminal needed. Everything's plain HTML/CSS/JS.

1. Click any file → click the pencil ✏️ → edit → **Commit changes**
2. Wait ~60 seconds for GitHub Pages to redeploy
3. Hard-refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`) to bust the browser cache

### Common edits

- **Change copy** (name, about, skills): edit `index.html`
- **Change the NQ Context project page**: edit `nq-context.html`
- **Change colors/fonts/spacing**: edit `style.css` — the `:root` block at the top holds the entire palette in one place
- **Change behavior** (clock, scroll, command palette, candle chart): edit `script.js`

---

## ✨ Features

### On load
- **Bloomberg-style splash loader** with status header, live ticker bar (NQ +1.24% · ES +0.87% · VIX −3.41%), "AARON WU" typed in letter-by-letter, real PST timestamp pulled in dynamically
- **Animated candle chart background** — 80 random-walk candles drifting across the screen, with ~4% chance of generating a "news candle" (giant body + long fake-out wick on the opposite side; trader humor)
- **Subtle amber grid lines** across the body — the Bloomberg signature

### Navigation
- **Live LA clock** in the nav, updating every second
- **⌘K command palette** — press `Cmd+K` / `Ctrl+K` anywhere to open. Tab through results, Enter to select.
- **Theme toggle** between Bloomberg dark and a "paper" off-hours light variant. Choice persists in localStorage.
- **Side dot nav** with section labels on hover
- **Keyboard shortcuts** — `J` for next section, `K` for previous
- **Scroll progress bar** at the top

### Cursor (desktop only)
- Custom dot + ring cursor that snaps to interactive elements
- Magnetic effect on buttons and links
- "VIEW" label appears when hovering project cards
- Soft amber spotlight glow trails the mouse

### Sections
- **Hero** with text-scramble effect on the name, parallax-shrinking title on scroll
- **About** with sticky 3D-tilting portrait photo, philosophy pull-quote ("Don't wait for the perfect moment. Create it."), four data-row quick facts
- **Stats** — Bloomberg-style indicators (2030 / 001 / NQ / ∞)
- **Skills grid** — 4 cards (Trading / Building / Studying / Looking ahead)
- **Selected Work** — featured NQ Context project (clickable card → `nq-context.html`)
- **Two scrolling marquee bands**
- **Contact** with magnetic email link and a live visitor-time greeting that updates every second (only writes to the DOM when the minute changes)

### Project page (`nq-context.html`)
- Stacked-indicator chart mock — price pane with gamma walls, day-type, setup score, sweep trigger; CVD pane below showing flow confirmation
- "Why I built it" → "What it does" feature list → "The setup score" with Pine Script code snippet → "Catching reversals with CVD" → "How I use it" daily workflow
- Real `View on GitHub` link to the Pine Script repo

### Performance
- GPU-composited animated layers (will-change, translateZ(0), contain: strict)
- Background animations pause during scroll (`is-scrolling` class)
- Respects `prefers-reduced-motion`

---

## 🎨 Customizing

### Change the color scheme

In `style.css`, find `:root` at the top:

```css
:root {
  --bg: #000000;        /* pitch black */
  --ink: #f0f0f0;       /* off-white text */
  --accent: #ff9500;    /* Bloomberg amber */
  --sage: #4ade80;      /* terminal green (up) */
  --bear: #ef4444;      /* red (down) */
  /* ... */
}
```

Swap the hex codes. The `[data-theme="light"]` block below holds the paper-mode variant.

### Change the photo

Drop a new `portrait.png` (or `portrait.jpg`) into the repo via **Add file → Upload files**. If you change the file extension, update the `<img src="...">` line in `index.html`.

### Add another project

In `index.html`, find the `.projects` block. Copy the entire `<a class="project project--link">` block, paste a second copy, change the content, and (if needed) create a corresponding project page like `nq-context.html`.

### Tweak the candle background

In `script.js`, look for the `/* 2.5. Candle chart background */` block. Knobs you can turn:
- `generateCandles(80, 600)` — first arg is candle count, second is viewBox height
- `isNews = Math.random() < 0.04` — news candle frequency (4% currently)
- `chart-scroll 90s` in `style.css` — scroll speed

---

## 🚀 Tech notes

- **Hosting:** GitHub Pages (free, deploys on every commit to `main`)
- **Smooth scroll:** [Lenis](https://lenis.studiofreight.com/) loaded from unpkg CDN
- **Fonts:** Google Fonts (IBM Plex Sans + IBM Plex Mono)
- **No build step:** zero npm, zero bundler, zero framework
- **No tracking:** no analytics, no cookies
- **`.nojekyll`** present to disable Jekyll (it interferes with file serving)

---

## 🐛 Troubleshooting

**Site shows old content after committing**
GitHub Pages caches aggressively. Hard-refresh with `Cmd+Shift+R`, or open in incognito.

**Live site is blank or unstyled**
Check the **Actions** tab in the repo — most recent build should be green ✅. If red ❌, click in to see the error.

**Cancelled deployments in Actions tab**
Normal when committing multiple times in quick succession — GitHub cancels older builds so only the latest deploys.

**Something looks broken after an edit**
Click the **History** of the file → find the last working commit → click `...` → revert.

---

Built by Aaron Wu — mostly while learning. Constantly tweaking. Find the trading script repo here: [Trading-Script-](https://github.com/aaronwuwoo/Trading-Script-).
