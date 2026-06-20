# Launch checklist — going live (staging → theainhub.com)

This staging site is **intentionally hidden from search**. The single most important launch step is to
**reverse that** — and it has to be done in **two** places, or the live site won't be indexed.

## 1. Re-enable search indexing  ⚠️ CRITICAL — do BOTH
- [ ] **`robots.txt`** — change `Disallow: /` to `Allow: /`:
  ```
  User-agent: *
  Allow: /
  ```
- [ ] **`vercel.json`** — remove the `X-Robots-Tag: noindex, nofollow` header block (or delete the file if
  it holds nothing else). Flipping `robots.txt` alone is **not enough** — this header also has to go, or
  every page keeps returning `noindex`.

## 2. Domain & URLs
- [ ] Point the production domain (`theainhub.com`) at this deployment.
- [ ] **OpenGraph image** — the pages' `og:image` meta points at `https://ainhub-staging.vercel.app/img/og.png`;
  update it to the production domain across the HTML files.
- [ ] **`sitemap.xml`** — already uses `https://theainhub.com/`; confirm it lists every live page
  (home, what-we-do, workshops, train, transform, about, contact, work).

## 3. Contact form
- [ ] Repoint the **EmailJS template recipient** from `skane@fgcu.edu` → `mbole@fgcu.edu` (EmailJS dashboard;
  the on-page address already shows mbole@).

## 4. Verify after launch
- [ ] `curl -I https://theainhub.com/` shows **no** `X-Robots-Tag` header.
- [ ] `https://theainhub.com/robots.txt` shows `Allow: /`.
- [ ] Submit the contact form → it arrives at `mbole@fgcu.edu`.
