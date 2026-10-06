// Baselarte — landing page behaviour.
// Plain ES module; the only dependency is Motion (motion.dev), loaded from jsDelivr.

const MOTION_URL = "https://cdn.jsdelivr.net/npm/motion@14.0.0/+esm";
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Theme: dark from 18:00 to 06:00 (visitor's local time), light otherwise.
   -------------------------------------------------------------------------- */

const THEME_COLORS = { light: "#f3f1ec", dark: "#0d0d0c" };
const clockEl = document.querySelector("[data-clock]");
const modeEl = document.querySelector("[data-mode]");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function themeFor(date) {
  const hour = date.getHours();
  return hour >= 18 || hour < 6 ? "dark" : "light";
}

function tick() {
  const now = new Date();
  const theme = themeFor(now);

  if (root.dataset.theme !== theme) {
    root.classList.add("theme-shift");
    root.dataset.theme = theme;
    setTimeout(() => root.classList.remove("theme-shift"), 1300);
  }

  themeMeta.content = THEME_COLORS[theme];
  clockEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  modeEl.textContent = theme === "dark" ? "night" : "day";
}

tick();
setInterval(tick, 15_000);

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* --------------------------------------------------------------------------
   Glyph helpers: scramble text and the cipher column in the hero.
   -------------------------------------------------------------------------- */

const GLYPHS = "абвгдежзийклмнопрстуфхцчшщъыьэюяё0123456789/\\_—·";
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function scramble(el, duration = 900) {
  const final = el.dataset.text ?? (el.dataset.text = el.textContent);
  const start = performance.now();

  function frame(t) {
    const progress = Math.min(1, (t - start) / duration);
    const settled = Math.floor(progress * final.length);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      out += i < settled || final[i] === " " ? final[i] : randomGlyph();
    }
    el.textContent = out;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function buildCipher(el) {
  const rows = Math.max(8, Math.floor(el.clientHeight / 17));
  const cols = window.innerWidth < 860 ? 3 : 6;
  const lines = [];

  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      line += Math.random() < 0.28 ? randomGlyph() : " ";
    }
    lines.push(line);
  }

  el.replaceChildren(...lines.map((text) => {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }));
}

function driftCipher(el) {
  const spans = el.children;
  if (!spans.length) return;
  const span = spans[Math.floor(Math.random() * spans.length)];
  const chars = [...span.textContent];
  const i = Math.floor(Math.random() * chars.length);
  chars[i] = chars[i] === " " ? randomGlyph() : Math.random() < 0.5 ? " " : randomGlyph();
  span.textContent = chars.join("");
}

const cipher = document.querySelector(".cipher");
buildCipher(cipher);

/* --------------------------------------------------------------------------
   Motion
   -------------------------------------------------------------------------- */

async function startMotion() {
  const { animate, inView, scroll, stagger, hover } = await import(MOTION_URL);
  window.__motionReady = true;

  const ease = [0.22, 1, 0.36, 1];

  // Intro: headline words rise out of their line masks, then the supporting copy.
  animate(".hero-title .word", { y: ["110%", "0%"] }, { duration: 1.2, ease, delay: stagger(0.08, { startDelay: 0.15 }) });
  animate(
    "[data-intro]",
    { opacity: [0, 1], y: [14, 0], filter: ["blur(6px)", "blur(0px)"] },
    { duration: 1.1, ease, delay: stagger(0.12, { startDelay: 0.7 }) },
  );
  animate(cipher, { opacity: [0, 0.9] }, { duration: 2.4, delay: 0.6 });
  animate(".scroll-cue i", { scaleX: [1, 0.2, 1] }, { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2 });

  document.querySelectorAll("[data-scramble]").forEach((el, i) => {
    setTimeout(() => scramble(el), 700 + i * 200);
    hover(el, () => scramble(el, 600));
  });

  // Rotating italic word in the headline.
  const rotating = document.querySelector("[data-rotate]");
  const words = ["quiet", "deliberate", "patient", "uncommon", "honest"];
  let index = 0;

  setInterval(async () => {
    index = (index + 1) % words.length;
    await animate(rotating, { y: ["0%", "-110%"], opacity: [1, 0] }, { duration: 0.5, ease: [0.7, 0, 0.84, 0] });
    rotating.textContent = words[index];
    await animate(rotating, { y: ["110%", "0%"], opacity: [0, 1] }, { duration: 0.8, ease });
  }, 3200);

  // Slowly drifting glyphs.
  setInterval(() => driftCipher(cipher), 140);

  // Endless marquee.
  animate(".marquee-track", { x: ["0%", "-50%"] }, { duration: 38, repeat: Infinity, ease: "linear" });

  // Scroll: top progress line + hero recedes as you leave it.
  scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }));
  scroll(
    animate(".hero-inner", { y: [0, -120], opacity: [1, 0.15] }, { ease: "linear" }),
    { target: document.querySelector(".hero"), offset: ["start start", "end start"] },
  );

  // Reveal sections as they enter the viewport.
  inView(
    "[data-reveal]",
    (el) => {
      animate(el, { opacity: [0, 1], y: [28, 0], filter: ["blur(8px)", "blur(0px)"] }, { duration: 1.1, ease });
    },
    { amount: 0.3 },
  );

  // A soft light that follows the pointer around the hero.
  const glow = document.querySelector(".glow");
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      animate(glow, { x: event.clientX, y: event.clientY }, { duration: 1.6, ease });
    }, { passive: true });
  }
}

if (reduceMotion) {
  root.classList.remove("js");
} else {
  startMotion().catch((error) => {
    console.warn("Motion failed to load; showing static page.", error);
    root.classList.remove("js");
  });
}

// Rebuild the cipher only when the width changes (mobile toolbars change the height on scroll).
let lastWidth = window.innerWidth;
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    buildCipher(cipher);
  }, 200);
});
