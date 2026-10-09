# ilariafiore.com

Static site deployed on Netlify from this repository. Pages are Claude Design exports: the visible page is rendered at runtime by `support.js` from the template inside `<x-dc>` and the data script at the bottom of each HTML file.

## Keeping the site readable by search engines and AI crawlers

- Each page has its own `<title>`, meta description, canonical URL, Open Graph tags and JSON-LD in the real `<head>`. Update them when a page's content changes.
- `education.html` contains generated blocks between `STATIC-COURSES`, `STATIC-PROJECTS` and `JSONLD-COURSES` markers. Do not edit them by hand: after changing `COURSES` or `PROJECTS`, run `node scripts/prerender.mjs`. Netlify also runs it on every deploy (`netlify.toml`).
- When adding or removing a page, update `sitemap.xml`.
- Strings in the page data scripts use single quotes: use `’` for apostrophes.
