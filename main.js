// Baselarte — theme, local time, copyright year and gentle Motion (motion.dev) animations.
// Runs after boot.js and i18n.js.

// Keep in sync with the <link rel="modulepreload"> in index.html.
const MOTION_MODULE_URL = "https://cdn.jsdelivr.net/npm/motion@14.0.0/+esm";
const LOCAL_TIME_REFRESH_MS = 15_000;
// Slightly longer than the 1.2s colour transition in styles.css (html.theme-transition).
const THEME_TRANSITION_MS = 1300;

const documentRoot = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const { themeForDate, revealWithoutMotion, markMotionStarted } = window.siteBoot;

const localTimeElement = document.querySelector("[data-local-time]");
const dayPeriodElement = document.querySelector("[data-day-period]");
const browserThemeColorMeta = document.querySelector('meta[name="theme-color"]');

/* --------------------------------------------------------------------------
   Copyright year: always the visitor's current year, never hardcoded.
   -------------------------------------------------------------------------- */

document.querySelectorAll("[data-current-year]").forEach((yearElement) => {
  yearElement.textContent = String(new Date().getFullYear());
});

/* --------------------------------------------------------------------------
   Theme and local time. Day/night hours live in boot.js.
   -------------------------------------------------------------------------- */

function syncBrowserThemeColor() {
  // Read from the CSS so the colour is defined in one place only.
  const paperColor = getComputedStyle(documentRoot).getPropertyValue("--paper").trim();
  browserThemeColorMeta.content = paperColor;
}

function updateThemeAndLocalTime() {
  const now = new Date();
  const theme = themeForDate(now);

  if (documentRoot.dataset.theme !== theme) {
    documentRoot.classList.add("theme-transition");
    documentRoot.dataset.theme = theme;
    setTimeout(() => documentRoot.classList.remove("theme-transition"), THEME_TRANSITION_MS);
  }

  syncBrowserThemeColor();

  localTimeElement.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  localTimeElement.dateTime = now.toISOString();

  // The day/night label is translated, so keep its i18n key in sync with the theme.
  const dayPeriodKey = theme === "dark" ? "dayPeriod.night" : "dayPeriod.day";
  dayPeriodElement.dataset.i18n = dayPeriodKey;
  dayPeriodElement.textContent = window.i18n.translate(dayPeriodKey);
}

updateThemeAndLocalTime();
setInterval(updateThemeAndLocalTime, LOCAL_TIME_REFRESH_MS);

/* --------------------------------------------------------------------------
   Motion: a soft fade-up on load and as sections scroll into view.
   -------------------------------------------------------------------------- */

async function startMotion() {
  const { animate, inView, stagger } = await import(MOTION_MODULE_URL);
  markMotionStarted();

  const easeOutExpo = [0.22, 1, 0.36, 1];
  const fadeUp = { opacity: [0, 1], y: [16, 0] };

  animate("[data-animate-intro]", fadeUp, {
    duration: 1.1,
    ease: easeOutExpo,
    delay: stagger(0.15, { startDelay: 0.1 }),
  });

  inView("[data-animate-reveal]", (revealedElement) => {
    animate(revealedElement, fadeUp, { duration: 0.9, ease: easeOutExpo });
  }, { amount: 0.4 });

  // Cross-fade translated text when the language changes (used by i18n.js).
  const translatedRegions = "main, .site-nav a, .language-toggle, .footer-column h2, [data-day-period]";
  window.languageTransition = {
    fadeOut: () => animate(translatedRegions, { opacity: 0 }, { duration: 0.2 }),
    fadeIn: () => animate(translatedRegions, { opacity: 1 }, { duration: 0.35 }),
  };
}

if (prefersReducedMotion) {
  markMotionStarted();
  revealWithoutMotion();
} else {
  startMotion().catch((motionLoadError) => {
    console.warn("Motion failed to load; showing the page without animation.", motionLoadError);
    markMotionStarted();
    revealWithoutMotion();
  });
}
