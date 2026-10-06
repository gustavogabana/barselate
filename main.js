// Baselarte — theme, clock and gentle Motion (motion.dev) animations.
// Language switching lives in i18n.js, which runs before this module.

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

  // The mode label is translated, so keep its i18n key in sync.
  const key = theme === "dark" ? "mode.night" : "mode.day";
  modeEl.dataset.i18n = key;
  modeEl.textContent = window.i18n.t(key);
}

tick();
setInterval(tick, 15_000);

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* --------------------------------------------------------------------------
   Motion: a soft fade-up on load and as sections scroll into view.
   -------------------------------------------------------------------------- */

async function startMotion() {
  const { animate, inView, stagger } = await import(MOTION_URL);
  window.__motionReady = true;

  const ease = [0.22, 1, 0.36, 1];
  const rise = { opacity: [0, 1], y: [16, 0] };

  animate("[data-intro]", rise, { duration: 1.1, ease, delay: stagger(0.15, { startDelay: 0.1 }) });

  inView("[data-reveal]", (el) => {
    animate(el, rise, { duration: 0.9, ease });
  }, { amount: 0.4 });

  // Cross-fade the page text when the language changes (used by i18n.js).
  const swappable = "main, .nav a, .lang, .footer-col h2, [data-mode]";
  window.__fadeOut = () => animate(swappable, { opacity: 0 }, { duration: 0.2 });
  window.__fadeIn = () => animate(swappable, { opacity: 1 }, { duration: 0.35 });
}

if (reduceMotion) {
  root.classList.remove("js");
} else {
  startMotion().catch((error) => {
    console.warn("Motion failed to load; showing static page.", error);
    root.classList.remove("js");
  });
}
