# Baselarte

Landing page for **Baselarte Ltda.**, a software engineering and creative technology company. It lives at [baselarte.com](https://baselarte.com).

It's a static site with plain HTML, CSS and JavaScript. There's no build step and no `node_modules`. The only runtime dependency is [Motion](https://motion.dev), loaded from jsDelivr.

## Files

```
index.html         page, SEO meta, Open Graph, JSON-LD
styles.css         design tokens, layout, light/dark themes
main.js            time-based theme, clock, Motion animations
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

## Theme

The theme follows the visitor's local clock. It's dark from 18:00 to 06:00 and light the rest of the day. A small inline script in `<head>` sets it before the first paint. `main.js` checks the time every 15 seconds and cross-fades when it changes.

## Run locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to `main`.
2. In the repo, go to **Settings → Pages**. Set **Source** to *Deploy from a branch*, then choose `main` and `/ (root)`.
3. Point the `baselarte.com` DNS records to GitHub Pages, then enable **Enforce HTTPS**.

When the page content changes, update `<lastmod>` in `sitemap.xml`.
