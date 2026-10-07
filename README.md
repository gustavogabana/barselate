# Baselarte

Landing page for **Baselarte Ltda.**, a software engineering and creative technology company. It lives at [baselarte.com](https://baselarte.com).

It's a static site with plain HTML, CSS and JavaScript. There's no build step and no `node_modules`. The only runtime dependency is [Motion](https://motion.dev) (`motion@14.0.0`), loaded from jsDelivr.

## Files

```
index.html         page, SEO meta, Open Graph, JSON-LD
boot.js            runs in <head>: theme by local time, initial language, shared settings
styles.css         design tokens, layout, light/dark themes
i18n.js            English / Brazilian Portuguese strings and switcher
main.js            theme updates, local time, copyright year, Motion animations
404.html           GitHub Pages not-found page
assets/            OG image and PNG icons
favicon.svg/.ico   icons
site.webmanifest   PWA manifest
robots.txt         crawl rules and sitemap pointer
sitemap.xml        sitemap
llms.txt           summary for LLMs (https://llmstxt.org)
CNAME              custom domain for GitHub Pages
.nojekyll          serve files as-is, without Jekyll
```

## Layout

The page is a single centered reading column, inspired by the calm, text-first style of [Thinking Machines](https://thinkingmachines.ai):

- a centered headline and intro;
- short sections (About, Practice, Principles, Status) separated by thin rules;
- a quote from a 1979 IBM training presentation: *"A computer can never be held accountable, therefore a computer must never make a management decision."*;
- a footer with columns for Company, Language, Index and Local time.

Motion is kept quiet. Text fades up on load and as each section scrolls into view, and the language switch cross-fades. If the visitor prefers reduced motion, or the library fails to load, the page shows everything without animation.

## Theme

The theme follows the visitor's local clock. It's dark from 18:00 to 06:00 and light the rest of the day. `boot.js` sets it in `<head>` before the first paint, and the day/night hours are defined there and nowhere else. `main.js` checks the time every 15 seconds and cross-fades when it changes. The browser's theme colour is read from the CSS `--paper` variable, so the colours live only in `styles.css`.

## Language

The site is in English and Brazilian Portuguese.

- On a first visit, the page uses Portuguese if the browser language starts with `pt`, and English otherwise.
- The **PT / EN** button in the header switches between them. The footer's *Language* column has the same choice.
- The choice is saved in `localStorage`. The `<html lang>`, `<title>`, meta description and `og:locale` all follow it. If storage is blocked (e.g. private browsing), the switch still works but isn't remembered, and a warning is logged.

All strings live in `i18n.js`. To add or change copy:

1. Give the element a `data-i18n="key"` attribute, or `data-i18n-attributes="aria-label:key"` for an attribute.
2. Add the key to both the `en` and `pt-BR` tables.

The English text in `index.html` is the version search engines index, so keep it in sync with the `en` table.

## Logo

The mark is a circle resting on a horizon line:

```svg
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4">
  <circle cx="16" cy="16" r="8.5"/>
  <path d="M4.5 19h23"/>
</svg>
```

- **Meaning:** the circle reads as either a sun or a moon sitting just above the horizon. That's the moment between day and night, the same switch the site's theme makes at 06:00 and 18:00. It also echoes the mountain horizon in the original hero photo, which is now the social share image.
- **Construction:** it's drawn on a 32×32 grid. The circle is centered with radius 8.5. The horizon sits at y = 19, a little below center, so the circle appears to rest on it, and extends from x = 4.5 to 27.5. Stroke only, no fill.
- **Colour:** it always uses the current text colour (`currentColor`), so it's ink on paper by day and paper on ink by night. The palette is `#141413` ink and `#f3f1ec` paper (light theme), and `#ebe9e3` on `#0d0d0c` (dark theme).
- **Wordmark:** "baselarte", in lowercase Geist Medium with slightly tight letter spacing (−0.02em), set beside the mark.
- **Files:**
  - `favicon.svg`: the mark knocked out of a rounded square, adapting to the browser's colour scheme.
  - `favicon.ico`, `assets/icon-192.png`, `assets/icon-512.png`, `assets/apple-touch-icon.png`: the same mark rendered as PNGs for browsers, home screens and the manifest.
  - `assets/og-image.jpg`: the 1200×630 social share image.

## Conventions

- **Nothing time-dependent is hardcoded.** The copyright year, the local time and the day/night label are filled in by `main.js` from the visitor's clock. The sitemap has no `<lastmod>`, since a hand-typed date goes stale.
- **One source for each setting:**
  - day/night hours, supported languages and the storage key live in `boot.js`;
  - colours live in `styles.css`;
  - all copy lives in `i18n.js`.
- **No silent failures.** Every `catch` either recovers in a defined way and logs why, or rethrows.
- **Descriptive names:**
  - variables like `localTimeElement`, `dayPeriodKey`, `LOCAL_TIME_REFRESH_MS`;
  - classes like `.site-header`, `.reading-column`, `.pull-quote`;
  - data attributes like `data-current-year`, `data-animate-reveal`.
- **Works without JavaScript.** The English text is in the HTML, and controls that need JS (language switch, local time) carry `.requires-js` and are hidden when JS is off.

## Run locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Merge into `main` and push.
2. In the repo, go to **Settings → Pages**. Set **Source** to *Deploy from a branch*, then choose `main` and `/ (root)`.
3. Point the `baselarte.com` DNS records to GitHub Pages, then enable **Enforce HTTPS**.

