/* ============================================================
   Personal Site — interactions
   ============================================================ */

/* ---------- 1. Page loader ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("done"), 1100);
  }
});

/* ---------- 2. Nav scroll state ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");

  // Update progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / docHeight) * 100;
  const bar = document.getElementById("progress");
  if (bar) bar.style.width = progress + "%";

  // Hero parallax — title shrinks and fades as you scroll past it
  const heroInner = document.getElementById("heroInner");
  if (heroInner && window.scrollY < window.innerHeight) {
    const factor = window.scrollY / window.innerHeight;
    heroInner.style.transform = `translateY(${factor * 60}px) scale(${1 - factor * 0.05})`;
    heroInner.style.opacity = 1 - factor * 1.2;
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 3. Custom cursor (desktop only) ---------- */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
const supportsHover = window.matchMedia("(hover: hover)").matches && window.innerWidth > 800;

if (supportsHover && dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top  = mouseY + "px";
  });

  // Ring follows with easing
  const animate = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + "px";
    ring.style.top  = ringY + "px";
    requestAnimationFrame(animate);
  };
  animate();

  // Grow ring on links, change on project cards
  document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
    const type = el.dataset.cursor;
    el.addEventListener("mouseenter", () => {
      if (type === "view") ring.classList.add("viewing");
      else ring.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("hovering", "viewing");
    });
  });
}

/* ---------- 4. Reveal sections on scroll ---------- */
const revealEls = document.querySelectorAll("section, .footer");
revealEls.forEach((el) => el.classList.add("reveal"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => sectionObserver.observe(el));

/* ---------- 5. Word-by-word reveal on headings ---------- */
document.querySelectorAll(".reveal-words").forEach((el) => {
  // Walk through child nodes, wrapping text words but preserving inline elements
  const wrapNode = (node) => {
    if (node.nodeType === 3) {
      // Text node: split into words
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      let delay = parseFloat(el.dataset.delayCounter || 0);

      words.forEach((w) => {
        if (w.trim() === "") {
          frag.appendChild(document.createTextNode(w));
        } else {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word";
          const inner = document.createElement("span");
          inner.className = "word__inner";
          inner.textContent = w;
          inner.style.transitionDelay = (delay * 0.06) + "s";
          wordSpan.appendChild(inner);
          frag.appendChild(wordSpan);
          delay++;
        }
      });
      el.dataset.delayCounter = delay;
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.tagName !== "BR") {
      // Element: recurse, but also wrap its content for animation
      const inner = document.createElement("span");
      inner.className = "word__inner";
      inner.style.transitionDelay = (parseFloat(el.dataset.delayCounter || 0) * 0.06) + "s";
      while (node.firstChild) inner.appendChild(node.firstChild);
      node.appendChild(inner);
      node.classList.add("word");
      el.dataset.delayCounter = parseFloat(el.dataset.delayCounter || 0) + 1;
    }
  };

  // Snapshot children first because we mutate as we go
  const kids = Array.from(el.childNodes);
  kids.forEach(wrapNode);
});

const wordObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        wordObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll(".reveal-words").forEach((el) => wordObserver.observe(el));

/* ---------- 6. Animated stat counters ---------- */
const animateCount = (el) => {
  if (el.hasAttribute("data-static")) {
    el.textContent = el.dataset.target;
    return;
  }
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat__num").forEach((el) => statObserver.observe(el));

/* ---------- 7. 3D tilt on portrait ---------- */
const portrait = document.getElementById("portrait");
if (portrait && supportsHover) {
  portrait.addEventListener("mousemove", (e) => {
    const rect = portrait.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform =
      `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform = "rotateY(0) rotateX(0)";
  });
}

/* ---------- 8. Magnetic effect on link buttons ---------- */
if (supportsHover) {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* ---------- 9. Theme toggle (with localStorage) ---------- */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved preference (try…catch in case storage is blocked)
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }
} catch (e) { /* ignore */ }

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });
}

/* ---------- 10. Auto-update footer year ---------- */
const yearTarget = document.querySelector(".footer p");
if (yearTarget) {
  yearTarget.innerHTML = yearTarget.innerHTML.replace(/\d{4}/, new Date().getFullYear());
}
