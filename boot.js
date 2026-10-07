// Baselarte — boot.
// Loaded synchronously in <head> by every page so the theme and language are
// correct before the first paint. Exposes shared settings on window.siteBoot.

(() => {
  const NIGHT_STARTS_AT_HOUR = 18;
  const DAY_STARTS_AT_HOUR = 6;
  const SUPPORTED_LANGUAGES = ["en", "pt-BR"];
  const DEFAULT_LANGUAGE = "en";
  const LANGUAGE_STORAGE_KEY = "baselarte:language";
  // If the animation library has not started by then, reveal the page without it.
  const MOTION_LOAD_TIMEOUT_MS = 2500;

  const documentRoot = document.documentElement;

  function themeForDate(date) {
    const hour = date.getHours();
    const isNight = hour >= NIGHT_STARTS_AT_HOUR || hour < DAY_STARTS_AT_HOUR;
    return isNight ? "dark" : "light";
  }

  function readStoredLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (storageError) {
      // Private browsing or blocked site data: fall back to the browser language.
      console.warn("Saved language preference is unavailable.", storageError);
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (storageError) {
      // The switch still works for this visit; it just won't be remembered.
      console.warn("Language preference could not be saved.", storageError);
    }
  }

  function detectInitialLanguage() {
    const storedLanguage = readStoredLanguage();
    if (SUPPORTED_LANGUAGES.includes(storedLanguage)) return storedLanguage;

    const browserLanguage = navigator.language || "";
    return /^pt\b/i.test(browserLanguage) ? "pt-BR" : DEFAULT_LANGUAGE;
  }

  function revealWithoutMotion() {
    documentRoot.classList.remove("motion-pending");
  }

  documentRoot.dataset.theme = themeForDate(new Date());
  documentRoot.lang = detectInitialLanguage();
  documentRoot.classList.add("js-enabled", "motion-pending");

  const motionFallbackTimer = setTimeout(revealWithoutMotion, MOTION_LOAD_TIMEOUT_MS);

  window.siteBoot = {
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
    themeForDate,
    storeLanguage,
    revealWithoutMotion,
    markMotionStarted() {
      clearTimeout(motionFallbackTimer);
    },
  };
})();
