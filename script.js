/* ============================================================
   Personal Site — interactions (full feature set)
   ============================================================ */

const supportsHover = window.matchMedia("(hover: hover)").matches && window.innerWidth > 800;

/* ---------- 1. Lenis smooth scroll ---------- */
let lenis = null;
if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Anchor link interception so Lenis handles the scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -60 });
        }
      } else if (id === "#") {
        e.preventDefault();
        lenis.scrollTo(0);
      }
    });
  });
}

/* ---------- 2. Loader ---------- */
// Dismiss loader on a fixed timer — independent of external resources.
// Using setTimeout from script execution means it fires reliably even if
// CDN scripts, fonts, or images stall.
const dismissLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("done");
};
setTimeout(dismissLoader, 1400);
// Also dismiss as soon as the DOM is ready, in case it's faster
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(dismissLoader, 1400);
} else {
  document.addEventListener("DOMContentLoaded", () => setTimeout(dismissLoader, 1400));
}

/* ---------- 3. Scroll bar + nav state + parallax + section tint ---------- */
const nav = document.querySelector(".nav");
const bar = document.getElementById("progress");
const heroInner = document.getElementById("heroInner");
const sections = document.querySelectorAll("section, header.hero");
const sideLinks = document.querySelectorAll(".side-nav a");

const onScroll = (scrollY) => {
  if (scrollY === undefined) scrollY = window.scrollY;

  // Nav border
  if (scrollY > 20) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  // Progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.width = (scrollY / docHeight) * 100 + "%";

  // Hero parallax
  if (heroInner && scrollY < window.innerHeight) {
    const f = scrollY / window.innerHeight;
    heroInner.style.transform = `translateY(${f * 60}px) scale(${1 - f * 0.05})`;
    heroInner.style.opacity = 1 - f * 1.2;
  }
};

if (lenis) lenis.on("scroll", ({ scroll }) => onScroll(scroll));
else window.addEventListener("scroll", () => onScroll(), { passive: true });
onScroll();

/* ---------- 4. Section-based tint + side nav active state ---------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Tint
        const bgKey = entry.target.dataset.bg;
        const map = { warm: "var(--tint-warm)", sage: "var(--tint-sage)", rose: "var(--tint-rose)" };
        document.documentElement.style.setProperty("--tint", map[bgKey] || "transparent");

        // Side nav active
        const id = entry.target.id;
        sideLinks.forEach((l) => l.classList.toggle("active", l.dataset.section === id));
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((s) => { if (s.id) sectionObserver.observe(s); });

/* ---------- 5. Reveal on scroll (wipe + fade) ---------- */
const revealEls = document.querySelectorAll("section, .footer, .marquee");
revealEls.forEach((el) => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- 6. Custom cursor + spotlight ---------- */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
const cursorLabel = document.getElementById("cursorLabel");
const spotlight = document.getElementById("spotlight");

if (supportsHover && dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0, sx = 0, sy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    if (spotlight) spotlight.classList.add("active");
  });
  document.addEventListener("mouseleave", () => {
    if (spotlight) spotlight.classList.remove("active");
  });

  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    sx += (mx - sx) * 0.08;
    sy += (my - sy) * 0.08;
    if (spotlight) {
      spotlight.style.left = sx + "px";
      spotlight.style.top = sy + "px";
    }
    requestAnimationFrame(tick);
  };
  tick();

  // Cursor labels by element type
  const labelMap = { link: "", view: "VIEW", drag: "DRAG", play: "PLAY" };
  document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
    const type = el.dataset.cursor || "link";
    el.addEventListener("mouseenter", () => {
      const text = labelMap[type] !== undefined ? labelMap[type] : "";
      if (text) {
        cursorLabel.textContent = text;
        ring.classList.add("labeled");
      } else {
        ring.classList.add("hovering");
      }
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("hovering", "labeled");
      cursorLabel.textContent = "";
    });
  });
}

/* ---------- 7. Text scramble on hero name ---------- */
const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";
const runScramble = (el) => {
  const orig = el.dataset.text || el.textContent;
  let frame = 0;
  const queue = orig.split("").map((c) => ({
    from: scrambleChars[Math.floor(Math.random() * scrambleChars.length)],
    to: c,
    start: Math.floor(Math.random() * 30),
    end: Math.floor(Math.random() * 30) + 30,
  }));
  const update = () => {
    let out = "";
    let done = 0;
    queue.forEach((q) => {
      if (frame >= q.end) { done++; out += q.to; }
      else if (frame >= q.start) out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      else out += q.from;
    });
    el.textContent = out;
    if (done < queue.length) { frame++; requestAnimationFrame(update); }
  };
  update();
};

document.querySelectorAll(".scramble").forEach((el) => {
  // Run once on first appearance
  let played = false;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !played) { played = true; runScramble(el); }
    });
  });
  obs.observe(el);
  // Re-run on hover
  el.addEventListener("mouseenter", () => runScramble(el));
});

/* ---------- 8. Variable letter weight on hover ---------- */
document.querySelectorAll(".vweight").forEach((el) => {
  // Wrap each visible char in a <span class="letter">, leaving inline elements intact
  const wrap = (node) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      node.textContent.split("").forEach((c) => {
        if (c === " ") frag.appendChild(document.createTextNode(" "));
        else {
          const s = document.createElement("span");
          s.className = "letter";
          s.textContent = c;
          frag.appendChild(s);
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(wrap);
    }
  };
  Array.from(el.childNodes).forEach(wrap);

  el.querySelectorAll(".letter").forEach((l) => {
    l.addEventListener("mouseenter", () => {
      l.classList.add("hot");
      setTimeout(() => l.classList.remove("hot"), 600);
    });
  });
});

/* ---------- 9. Animated stat counters ---------- */
const animateCount = (el) => {
  if (el.hasAttribute("data-static")) { el.textContent = el.dataset.target; return; }
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1800;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCount(e.target); statObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat__num").forEach((el) => statObs.observe(el));

/* ---------- 10. 3D portrait tilt ---------- */
const portrait = document.getElementById("portrait");
if (portrait && supportsHover) {
  portrait.addEventListener("mousemove", (e) => {
    const r = portrait.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform = "rotateY(0) rotateX(0)";
  });
}

/* ---------- 11. Magnetic buttons (with stronger variant) ---------- */
if (supportsHover) {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    const strength = btn.classList.contains("magnetic--strong") ? 0.5 : 0.3;
    const radius = btn.classList.contains("magnetic--strong") ? 150 : 80;
    const parent = btn.closest("section") || btn.parentElement;
    parent.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        btn.style.transform = "translate(0, 0)";
      }
    });
    parent.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* ---------- 12. Theme toggle ---------- */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    root.setAttribute("data-theme", "dark");
} catch (e) {}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

/* ---------- 13. Live LA time (with seconds — ticks every second) ---------- */
const navTimeText = document.getElementById("navTimeText");
let lastDisplayedTime = "";
const updateLATime = () => {
  if (!navTimeText) return;
  const now = new Date();
  const opts = {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const newText = now.toLocaleTimeString("en-US", opts);
  if (newText !== lastDisplayedTime) {
    navTimeText.textContent = newText;
    lastDisplayedTime = newText;
  }
};
updateLATime();
setInterval(updateLATime, 1000);

/* ---------- 14. Visitor's local time + greeting ---------- */
const visitorMsg = document.getElementById("visitorTimeMsg");
const updateVisitorMsg = () => {
  if (!visitorMsg) return;
  const now = new Date();
  const h = now.getHours();
  const localTime = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  let timeOfDay = "afternoon";
  if (h < 5) timeOfDay = "late night";
  else if (h < 12) timeOfDay = "morning";
  else if (h < 17) timeOfDay = "afternoon";
  else if (h < 21) timeOfDay = "evening";
  else timeOfDay = "night";
  visitorMsg.textContent = `it's ${localTime} your time — hope your ${timeOfDay} is going well.`;
};
updateVisitorMsg();

/* ---------- 15. Cmd+K command bar ---------- */
const cmdk = document.getElementById("cmdk");
const cmdkInput = document.getElementById("cmdkInput");
const cmdkResults = document.getElementById("cmdkResults");
const cmdkTrigger = document.getElementById("cmdkTrigger");

const cmdkItems = [
  { icon: "↑", label: "Go to top",      hint: "home",    action: () => scrollToId("#top") },
  { icon: "①", label: "About",          hint: "section", action: () => scrollToId("#about") },
  { icon: "②", label: "What I Do",      hint: "section", action: () => scrollToId("#about") },
  { icon: "③", label: "Selected Work",  hint: "section", action: () => scrollToId("#work") },
  { icon: "④", label: "Contact",        hint: "section", action: () => scrollToId("#contact") },
  { icon: "✉", label: "Email Aaron",    hint: "mailto",  action: () => location.href = "mailto:aaronwu442976@gmail.com" },
  { icon: "🌗", label: "Toggle dark mode", hint: "theme", action: () => themeToggle?.click() },
  { icon: "↻", label: "Reload page",    hint: "system",  action: () => location.reload() },
  { icon: "↗", label: "GitHub profile", hint: "link",    action: () => window.open("https://github.com/aaronwuwoo", "_blank") },
];
let cmdkFiltered = [...cmdkItems];
let cmdkSelected = 0;

const scrollToId = (id) => {
  const target = document.querySelector(id);
  if (target) {
    if (lenis) lenis.scrollTo(target, { offset: -60 });
    else target.scrollIntoView({ behavior: "smooth" });
  }
};

const renderCmdk = () => {
  if (!cmdkResults) return;
  cmdkResults.innerHTML = "";
  if (cmdkFiltered.length === 0) {
    cmdkResults.innerHTML = '<li class="cmdk-empty">No matches. Try "work" or "email".</li>';
    return;
  }
  cmdkFiltered.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "cmdk-item" + (i === cmdkSelected ? " selected" : "");
    li.innerHTML = `<span class="cmdk-item__icon">${item.icon}</span><span class="cmdk-item__label">${item.label}</span><span class="cmdk-item__hint">${item.hint}</span>`;
    li.addEventListener("click", () => { item.action(); closeCmdk(); });
    cmdkResults.appendChild(li);
  });
};

const openCmdk = () => {
  if (!cmdk) return;
  cmdk.classList.add("open");
  cmdk.setAttribute("aria-hidden", "false");
  cmdkFiltered = [...cmdkItems];
  cmdkSelected = 0;
  if (lenis) lenis.stop();
  setTimeout(() => cmdkInput?.focus(), 50);
  renderCmdk();
};
const closeCmdk = () => {
  if (!cmdk) return;
  cmdk.classList.remove("open");
  cmdk.setAttribute("aria-hidden", "true");
  if (cmdkInput) cmdkInput.value = "";
  if (lenis) lenis.start();
};

cmdkTrigger?.addEventListener("click", openCmdk);
document.querySelectorAll("[data-cmdk-close]").forEach((el) =>
  el.addEventListener("click", closeCmdk)
);

cmdkInput?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  cmdkFiltered = q
    ? cmdkItems.filter((it) => it.label.toLowerCase().includes(q) || it.hint.toLowerCase().includes(q))
    : [...cmdkItems];
  cmdkSelected = 0;
  renderCmdk();
});

cmdkInput?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    cmdkSelected = (cmdkSelected + 1) % cmdkFiltered.length;
    renderCmdk();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    cmdkSelected = (cmdkSelected - 1 + cmdkFiltered.length) % cmdkFiltered.length;
    renderCmdk();
  } else if (e.key === "Enter") {
    e.preventDefault();
    cmdkFiltered[cmdkSelected]?.action();
    closeCmdk();
  } else if (e.key === "Escape") {
    closeCmdk();
  }
});

/* ---------- 16. Keyboard shortcuts ---------- */
const sectionIds = ["#top", "#about", "#work", "#contact"];
let currentSectionIndex = 0;
sections.forEach((s) => {
  const idx = sectionIds.indexOf("#" + s.id);
  if (idx !== -1) {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) currentSectionIndex = idx; }),
      { threshold: 0.4 }
    ).observe(s);
  }
});

document.addEventListener("keydown", (e) => {
  // Don't fire when typing in inputs
  if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
  if (cmdk?.classList.contains("open")) return;

  // Cmd+K / Ctrl+K to open palette
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openCmdk();
    return;
  }

  // J = next section, K = previous
  if (e.key === "j" || e.key === "ArrowDown" && e.shiftKey) {
    e.preventDefault();
    currentSectionIndex = Math.min(currentSectionIndex + 1, sectionIds.length - 1);
    scrollToId(sectionIds[currentSectionIndex]);
  } else if (e.key === "k" || e.key === "ArrowUp" && e.shiftKey) {
    e.preventDefault();
    currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
    scrollToId(sectionIds[currentSectionIndex]);
  }
});

/* ---------- 17. Footer year ---------- */
const yearTarget = document.querySelector(".footer p");
if (yearTarget) yearTarget.innerHTML = yearTarget.innerHTML.replace(/\d{4}/, new Date().getFullYear());
