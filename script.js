/* =========================================================
   PERSONAL SITE — Editorial + Heavy Interactions
   ========================================================= */

:root {
  /* Light theme */
  --bg: #f5f1ea;
  --bg-soft: #ede7dc;
  --ink: #1a1714;
  --ink-soft: #4a423b;
  --accent: #c04f2c;
  --sage: #7a8471;
  --rule: #d9d1c2;
  --marquee-bg: #1a1714;
  --marquee-text: #f5f1ea;

  /* Per-section tints (used by scroll color shifts) */
  --tint-warm: rgba(192, 79, 44, 0.04);
  --tint-sage: rgba(122, 132, 113, 0.05);
  --tint-rose: rgba(192, 79, 44, 0.07);
  --tint: transparent;

  --serif: "Fraunces", "Times New Roman", serif;
  --sans: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, monospace;

  --max: 1200px;
  --pad: clamp(1.25rem, 4vw, 3rem);
}

[data-theme="dark"] {
  --bg: #1a1714;
  --bg-soft: #25201c;
  --ink: #f5f1ea;
  --ink-soft: #c4bbb0;
  --accent: #e07a52;
  --sage: #9caa90;
  --rule: #3a342e;
  --marquee-bg: #f5f1ea;
  --marquee-text: #1a1714;
  --tint-warm: rgba(224, 122, 82, 0.04);
  --tint-sage: rgba(156, 170, 144, 0.04);
  --tint-rose: rgba(224, 122, 82, 0.06);
}

*, *::before, *::after { box-sizing: border-box; }
html {
  /* Lenis handles scrolling — disable native smooth scroll */
  scroll-behavior: auto;
}
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  transition: background 0.6s ease, color 0.4s ease;
  position: relative;
}

/* Background tint based on which section is in view */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--tint);
  transition: background 0.8s ease;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; padding: 0; margin: 0; }
button { font: inherit; border: none; background: none; cursor: pointer; color: inherit; }
kbd {
  font-family: var(--mono);
  font-size: 0.75em;
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 2px 5px;
  color: var(--ink-soft);
}

::selection { background: var(--accent); color: var(--bg); }

/* ---------- Animated mesh gradient background ---------- */
.mesh-bg {
  position: fixed;
  inset: -20%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.45;
  filter: blur(80px);
}
[data-theme="dark"] .mesh-bg { opacity: 0.35; }
.mesh-blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: multiply;
}
[data-theme="dark"] .mesh-blob { mix-blend-mode: screen; }
.mesh-blob--1 {
  width: 50vw; height: 50vw;
  background: var(--accent);
  top: 0; left: -10%;
  animation: blob-1 28s ease-in-out infinite;
}
.mesh-blob--2 {
  width: 45vw; height: 45vw;
  background: var(--sage);
  bottom: 10%; right: -5%;
  animation: blob-2 35s ease-in-out infinite;
}
.mesh-blob--3 {
  width: 40vw; height: 40vw;
  background: var(--accent);
  top: 40%; left: 50%;
  opacity: 0.5;
  animation: blob-3 32s ease-in-out infinite;
}
@keyframes blob-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(20vw, 15vh) scale(1.2); }
  66%      { transform: translate(10vw, 40vh) scale(0.9); }
}
@keyframes blob-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-25vw, -20vh) scale(1.15); }
}
@keyframes blob-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50%      { transform: translate(-30%, -40%) scale(1.3); }
}

/* ---------- Animated film grain ---------- */
.grain {
  position: fixed;
  inset: -50%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.3;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: grain-shift 1.2s steps(8) infinite;
}
[data-theme="dark"] .grain { mix-blend-mode: screen; opacity: 0.15; }
@keyframes grain-shift {
  0%   { transform: translate(0, 0); }
  10%  { transform: translate(-5%, -5%); }
  20%  { transform: translate(5%, -3%); }
  30%  { transform: translate(-3%, 5%); }
  40%  { transform: translate(3%, 3%); }
  50%  { transform: translate(-5%, 0); }
  60%  { transform: translate(5%, 5%); }
  70%  { transform: translate(-3%, -3%); }
  80%  { transform: translate(3%, -5%); }
  90%  { transform: translate(-5%, 3%); }
  100% { transform: translate(0, 0); }
}

/* ---------- Mouse spotlight ---------- */
.spotlight {
  position: fixed;
  top: 0; left: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
  transform: translate(-50%, -50%);
  filter: blur(40px);
  opacity: 0;
  transition: opacity 0.5s ease;
  will-change: transform, opacity;
}
.spotlight.active { opacity: 1; }
@media (hover: none), (max-width: 800px) {
  .spotlight { display: none; }
}

/* ---------- Page loader ---------- */
.loader {
  position: fixed; inset: 0; z-index: 200;
  background: var(--ink);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s ease;
}
.loader.done { transform: translateY(-100%); pointer-events: none; }
.loader__name {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--bg);
  letter-spacing: -0.02em;
  display: flex;
}
.loader__name span {
  opacity: 0;
  transform: translateY(20px);
  animation: letterIn 0.6s forwards;
}
.loader__name span.space { width: 0.25em; }
.loader__name span:nth-child(1)  { animation-delay: 0.05s; }
.loader__name span:nth-child(2)  { animation-delay: 0.10s; }
.loader__name span:nth-child(3)  { animation-delay: 0.15s; }
.loader__name span:nth-child(4)  { animation-delay: 0.20s; }
.loader__name span:nth-child(5)  { animation-delay: 0.25s; }
.loader__name span:nth-child(6)  { animation-delay: 0.30s; }
.loader__name span:nth-child(7)  { animation-delay: 0.35s; }
.loader__name span:nth-child(8)  { animation-delay: 0.40s; }
@keyframes letterIn { to { opacity: 1; transform: translateY(0); } }

/* ---------- Progress bar ---------- */
.progress {
  position: fixed; top: 0; left: 0;
  height: 2px; width: 0%;
  background: var(--accent);
  z-index: 150;
  transition: width 0.05s linear;
}

/* ---------- Custom cursor with labels ---------- */
.cursor-dot, .cursor-ring {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.cursor-dot {
  width: 6px; height: 6px;
  background: #ffffff;
  transition: transform 0.15s ease, width 0.25s ease, height 0.25s ease;
}
.cursor-ring {
  width: 32px; height: 32px;
  border: 1px solid rgba(255,255,255,0.5);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  display: flex; align-items: center; justify-content: center;
}
.cursor-ring.hovering {
  width: 56px; height: 56px;
  border-color: rgba(255,255,255,0.9);
}
.cursor-ring.labeled {
  width: 80px; height: 80px;
  background: var(--accent);
  border: none;
  mix-blend-mode: difference;
}
.cursor-label {
  font-family: var(--sans);
  font-size: 10px;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: var(--bg);
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
  mix-blend-mode: difference;
}
.cursor-ring.labeled .cursor-label { opacity: 1; }
@media (hover: none), (max-width: 800px) {
  .cursor-dot, .cursor-ring { display: none; }
}
@media (hover: hover) and (min-width: 801px) {
  body { cursor: none; }
  a, button { cursor: none; }
}

/* ---------- Side dot nav ---------- */
.side-nav {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
}
.side-nav ul {
  display: flex; flex-direction: column;
  gap: 0.85rem;
}
.side-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-direction: row-reverse;
  padding: 0.25rem 0;
  position: relative;
}
.side-nav .side-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--rule);
  transition: background 0.3s ease, width 0.3s ease, height 0.3s ease;
}
.side-nav a.active .side-dot {
  background: var(--accent);
  width: 22px;
  border-radius: 4px;
}
.side-nav .side-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}
.side-nav a:hover .side-label,
.side-nav a.active .side-label {
  opacity: 1;
  transform: translateX(0);
}
@media (max-width: 800px) {
  .side-nav { display: none; }
}

/* ---------- Cmd+K command bar ---------- */
.cmdk {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}
.cmdk.open { display: flex; animation: fadein 0.2s ease; }
@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
.cmdk__backdrop {
  position: absolute; inset: 0;
  background: color-mix(in srgb, var(--ink) 40%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.cmdk__panel {
  position: relative;
  width: 90%;
  max-width: 540px;
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 12px;
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.4);
  overflow: hidden;
  animation: panelin 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes panelin {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.cmdk__searchwrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--rule);
}
.cmdk__searchwrap svg {
  width: 18px; height: 18px;
  color: var(--ink-soft);
  flex-shrink: 0;
}
.cmdk__input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--sans);
  font-size: 1rem;
  color: var(--ink);
  outline: none;
}
.cmdk__input::placeholder { color: var(--ink-soft); opacity: 0.7; }
.cmdk__esc {
  font-size: 0.7rem;
  padding: 2px 6px;
}
.cmdk__results {
  max-height: 360px;
  overflow-y: auto;
  padding: 0.5rem;
}
.cmdk-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.15s ease;
}
.cmdk-item.selected, .cmdk-item:hover {
  background: var(--bg-soft);
}
.cmdk-item__icon {
  font-size: 1rem;
  width: 22px; text-align: center;
  flex-shrink: 0;
}
.cmdk-item__label { flex: 1; }
.cmdk-item__hint {
  font-size: 0.75rem;
  color: var(--ink-soft);
  font-family: var(--mono);
}
.cmdk-empty {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--ink-soft);
  font-style: italic;
  font-family: var(--serif);
}
.cmdk__footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--rule);
  display: flex;
  gap: 1.25rem;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.cmdk__footer kbd { font-size: 0.7rem; }

/* ---------- Nav ---------- */
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem var(--pad);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, background 0.4s ease;
}
.nav.scrolled { border-color: var(--rule); }
.nav__logo {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 1.4rem;
  font-style: italic;
  letter-spacing: -0.02em;
}
.nav__links {
  display: flex;
  gap: 2rem;
  font-size: 0.92rem;
  font-weight: 500;
  margin: 0 auto 0 2rem;
}
.nav__links a {
  position: relative;
  padding: 0.25rem 0;
}
.nav__links a::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0; width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.3s ease;
}
.nav__links a:hover::after { width: 100%; }

.nav__right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.nav__time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--ink-soft);
}
.nav__time-dot {
  width: 6px; height: 6px;
  background: var(--sage);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.nav__time-label {
  font-family: var(--sans);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--ink);
}
.cmdk-trigger {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.65rem;
  background: var(--bg-soft);
  border: 1px solid var(--rule);
  border-radius: 6px;
  transition: background 0.2s ease;
}
.cmdk-trigger:hover { background: var(--rule); }
.cmdk-trigger kbd {
  font-family: var(--mono);
  font-size: 0.72rem;
  background: transparent;
  border: none;
  padding: 0;
  color: var(--ink-soft);
}
.theme-toggle {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease, transform 0.4s ease;
}
.theme-toggle:hover { background: var(--bg-soft); transform: rotate(360deg); }
.theme-toggle svg { width: 18px; height: 18px; }
.icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="dark"] .icon-moon { display: block; }

@media (max-width: 800px) {
  .nav__links { gap: 1rem; font-size: 0.85rem; margin: 0 0.75rem; }
  .nav__time { display: none; }
  .cmdk-trigger { display: none; }
}

/* ---------- Hero ---------- */
.hero {
  min-height: 100vh;
  max-width: var(--max);
  margin: 0 auto;
  padding: 8rem var(--pad) 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.hero__inner { will-change: transform, opacity; }

.hero-blob {
  position: absolute;
  top: 50%; right: -10%;
  transform: translateY(-50%);
  width: 60vw;
  max-width: 700px;
  z-index: -1;
  opacity: 0.35;
  filter: blur(10px);
  pointer-events: none;
}
[data-theme="dark"] .hero-blob { opacity: 0.5; }
.hero-blob svg { width: 100%; height: auto; }

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  margin: 0 0 2rem;
  opacity: 0;
  animation: fadeUp 0.8s 1.0s forwards;
}
.dot {
  width: 8px; height: 8px;
  background: var(--sage);
  border-radius: 50%;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--sage) 25%, transparent);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--sage) 25%, transparent); }
  50%      { box-shadow: 0 0 0 6px color-mix(in srgb, var(--sage) 10%, transparent); }
}

.hero__title {
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 2rem;
  max-width: 14ch;
  font-variation-settings: "opsz" 144;
}

.italic { font-style: italic; }
.accent { color: var(--accent); }
.underline {
  position: relative;
  display: inline-block;
}
.underline::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: 0.05em;
  height: 0.35em;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  z-index: -1;
  transform: skewX(-8deg);
}

.hero__lede {
  max-width: 42ch;
  font-size: 1.1rem;
  color: var(--ink-soft);
  margin: 0 0 4rem;
  opacity: 0;
  animation: fadeUp 0.9s 1.5s forwards;
}

.hero__scroll {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: auto;
  align-self: flex-start;
  opacity: 0;
  animation: fadeUp 0.9s 1.7s forwards;
  transition: color 0.2s ease;
}
.hero__scroll svg {
  width: 16px; height: 16px;
  animation: bounce 2s infinite;
}
.hero__scroll:hover { color: var(--accent); }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(4px); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---------- Variable weight letters on hover ---------- */
.vweight .letter {
  display: inline-block;
  transition: font-weight 0.5s ease, color 0.5s ease, transform 0.5s ease;
  cursor: default;
}
.vweight .letter.hot {
  font-weight: 700;
  color: var(--accent);
  transform: translateY(-2px);
}

/* ---------- Marquee ---------- */
.marquee {
  background: var(--marquee-bg);
  color: var(--marquee-text);
  padding: 1.5rem 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
  transition: background 0.4s ease, color 0.4s ease;
}
.marquee__track {
  display: flex;
  gap: 3rem;
  white-space: nowrap;
  width: max-content;
  animation: scroll-left 30s linear infinite;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.4rem;
  font-weight: 300;
}
.marquee--reverse .marquee__track { animation-direction: reverse; }
.marquee__track .star { color: var(--accent); font-style: normal; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ---------- Sections ---------- */
section {
  max-width: var(--max);
  margin: 0 auto;
  padding: 6rem var(--pad);
  position: relative;
  z-index: 2;
}

.section__label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 2rem;
}

.section__title {
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 3rem;
  max-width: 18ch;
}

/* ---------- About (with sticky title treatment) ---------- */
.about__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 800px) {
  .about__grid { grid-template-columns: 1fr; gap: 3rem; }
}

.about__text p {
  max-width: 55ch;
  margin: 0 0 1.25rem;
  color: var(--ink-soft);
}

.about__facts {
  margin-top: 2.5rem;
  border-top: 1px solid var(--rule);
}
.about__facts li {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--rule);
  font-size: 0.95rem;
}
.about__facts span {
  flex: 0 0 100px;
  font-family: var(--serif);
  font-style: italic;
  color: var(--accent);
}

.about__card {
  position: sticky;
  top: 6rem;
}
.portrait-wrap {
  perspective: 1000px;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
.portrait {
  aspect-ratio: 3 / 4;
  background:
    radial-gradient(circle at 30% 30%, var(--bg-soft), transparent 60%),
    linear-gradient(135deg, var(--sage), var(--accent));
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 1px 0 var(--rule),
    0 25px 50px -20px color-mix(in srgb, var(--ink) 30%, transparent);
  transform-style: preserve-3d;
}
.portrait__initials {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 5rem;
  color: var(--bg);
  letter-spacing: -0.03em;
  transform: translateZ(30px);
}
.portrait__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.portrait-wrap:hover .portrait__shine { opacity: 1; }
.about__caption {
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--ink-soft);
  margin: 1rem 0 0;
  text-align: center;
}

/* ---------- Stats ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem var(--pad) !important;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.stat { text-align: center; }
.stat__num {
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  color: var(--accent);
  letter-spacing: -0.03em;
  font-variation-settings: "opsz" 144;
}
.stat__label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0.75rem 0 0;
  line-height: 1.4;
}
@media (max-width: 700px) {
  .stats { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
}

/* ---------- Skills ---------- */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
  border-radius: 4px;
  overflow: hidden;
}
.skill {
  background: var(--bg);
  padding: 2.5rem 2rem;
  transition: background 0.3s ease;
}
.skill:hover { background: var(--bg-soft); }
.skill h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-style: italic;
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: var(--accent);
}
.skill p { margin: 0; color: var(--ink-soft); font-size: 0.95rem; }

/* ---------- Work ---------- */
.projects {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--rule);
}
.project {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--rule);
  position: relative;
  transition: padding 0.4s ease;
}
.project:hover { padding-left: 1.5rem; }
.project::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 0;
  background: var(--accent);
  transition: width 0.4s ease;
}
.project:hover::before { width: 3px; }

.project__meta {
  display: flex;
  flex-direction: column;
  font-family: var(--serif);
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.3;
  min-width: 60px;
}
.project__num { font-weight: 600; color: var(--accent); }

.project__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  letter-spacing: -0.015em;
  margin: 0 0 0.5rem;
}
.project__desc {
  margin: 0 0 0.75rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
  max-width: 60ch;
}
.project__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.project__tags span {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--rule);
  border-radius: 999px;
  color: var(--ink-soft);
}
.project__link {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--accent);
  white-space: nowrap;
  display: inline-block;
  transition: transform 0.3s ease;
}
.magnetic { will-change: transform; transition: transform 0.3s ease; }
.magnetic--strong { display: inline-block; }

/* ---------- Featured project card ---------- */
.project--featured {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  grid-template-columns: none;
  padding: 2.5rem 2rem;
  background: color-mix(in srgb, var(--bg-soft) 60%, transparent);
  border: 1px solid var(--rule);
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
}
.project--featured::after {
  content: "LIVE";
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--bg);
  background: var(--accent);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}
.project--featured:hover { padding-left: 2rem; }
.project--featured::before { display: none; }
.project--featured .project__meta {
  flex-direction: row;
  gap: 1rem;
}
.project--featured .project__title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  margin: 0;
}
.project--featured .project__desc {
  font-size: 1rem;
  line-height: 1.7;
  max-width: 70ch;
  margin: 0;
}
.project--featured .project__link {
  align-self: flex-start;
  margin-top: 0.5rem;
  font-size: 1.15rem;
}

/* Visuals row: chart + code side by side */
.project__visuals {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.25rem;
  margin: 1rem 0 0.5rem;
}
@media (max-width: 900px) {
  .project__visuals { grid-template-columns: 1fr; }
}

/* ---------- Mock chart ---------- */
.mock-chart {
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--ink);
  overflow: hidden;
}
.mock-chart svg {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 3px;
  background:
    linear-gradient(135deg,
      color-mix(in srgb, var(--bg) 100%, transparent),
      color-mix(in srgb, var(--bg-soft) 100%, transparent));
}
.mock-chart__caption {
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.78rem;
  color: var(--ink-soft);
  padding: 0 0.5rem 0.25rem;
  line-height: 1.4;
}

/* ---------- Code block ---------- */
.code-block {
  background: #1a1714;
  border: 1px solid color-mix(in srgb, var(--ink) 30%, transparent);
  border-radius: 6px;
  overflow: hidden;
  font-family: var(--mono);
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
[data-theme="dark"] .code-block {
  background: #0e0c0a;
  border-color: #3a342e;
}
.code-block__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.85rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.code-block__dots {
  display: flex;
  gap: 5px;
}
.code-block__dots span {
  width: 9px; height: 9px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}
.code-block__dots span:nth-child(1) { background: #ff5f57; }
.code-block__dots span:nth-child(2) { background: #febc2e; }
.code-block__dots span:nth-child(3) { background: #28c840; }
.code-block__filename {
  font-size: 0.72rem;
  color: rgba(245, 241, 234, 0.7);
  margin-left: auto;
}
.code-block__lang {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.15rem 0.45rem;
  border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
  border-radius: 3px;
}
.code-block__body {
  margin: 0;
  padding: 0.85rem 1rem;
  color: #e0d7c8;
  font-family: var(--mono);
  font-size: 0.74rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  flex: 1;
}
.code-block__body .ln {
  display: inline-block;
  width: 1.75em;
  color: rgba(245, 241, 234, 0.25);
  user-select: none;
  text-align: right;
  margin-right: 0.85em;
}
.code-block__body .com { color: #7a8471; font-style: italic; }
.code-block__body .kw  { color: #e07a52; font-weight: 500; }
.code-block__body .fn  { color: #9caa90; }
.code-block__body .str { color: #d4a017; }
.code-block__body .num { color: #c79bc7; }

@media (max-width: 700px) {
  .project--featured {
    padding: 2rem 1.25rem;
  }
  .project--featured::after { top: 1rem; right: 1rem; }
  .code-block__body { font-size: 0.7rem; }
}

@media (max-width: 700px) {
  .project { grid-template-columns: 1fr; gap: 0.75rem; }
  .project__meta { flex-direction: row; gap: 1rem; }
  .project__link { justify-self: start; }
}

/* ---------- Contact ---------- */
.contact { text-align: center; padding-bottom: 8rem; }
.contact .section__label { text-align: center; }
.contact__title {
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(3rem, 9vw, 7rem);
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 2rem;
}
.contact__lede {
  max-width: 38ch;
  margin: 0 auto 2.5rem;
  color: var(--ink-soft);
}
.contact__email {
  font-family: var(--serif);
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-style: italic;
  color: var(--accent);
  border-bottom: 1px solid var(--accent);
  padding-bottom: 0.25rem;
  display: inline-block;
}
.contact__socials {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 4rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.contact__socials a {
  position: relative;
  padding-bottom: 2px;
  transition: color 0.2s ease;
}
.contact__socials a::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.contact__socials a:hover { color: var(--accent); }
.contact__socials a:hover::after { transform: scaleX(1); }

.visitor-time {
  margin-top: 5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--rule);
  font-family: var(--serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--ink-soft);
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
}
.visitor-time__hi { color: var(--accent); margin-right: 0.4em; }

/* ---------- Footer ---------- */
.footer {
  max-width: var(--max);
  margin: 0 auto;
  padding: 2rem var(--pad);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--ink-soft);
  border-top: 1px solid var(--rule);
  position: relative;
  z-index: 2;
}
.footer__back a:hover { color: var(--accent); }
@media (max-width: 500px) {
  .footer { flex-direction: column; gap: 0.5rem; }
}

/* ---------- Reveal on scroll ---------- */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Hero should always be visible immediately, never hidden by reveal */
.hero, .hero.reveal {
  opacity: 1 !important;
  transform: none !important;
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .marquee__track, .mesh-blob, .grain { animation: none; }
}
