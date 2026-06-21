# Push to GitHub → deploy Ain Hub staging on Vercel

Paste the prompt below into your local Claude Code session, opened inside your
**`theainhub-website`** repo clone. The files in this folder are the latest production
site — copy them into the repo root (overwriting), commit, and push.

---

## Copy-paste prompt for Claude Code

> I've dropped an updated set of static-site files into `~/Downloads/theainhub-deploy/`
> (index.html, about.html, contact.html, what-we-do.html, work.html, workshops.html,
> train.html, transform.html, the `blog/`, `css/`, `js/`, and `img/` folders, plus
> robots.txt, sitemap.xml, vercel.json, .gitignore, and LAUNCH-TODO.md).
>
> Please:
> 1. Copy all of those files into this repo root, overwriting existing files.
> 2. Show me `git status` and a short summary of what changed before committing.
> 3. Commit with the message:
>    `Update site: mobile hero fix (press chip + badge), latest content`
> 4. Push to `main`.
> 5. Confirm the Vercel deploy kicked off and give me the staging URL.
>
> IMPORTANT — this is a **staging** deploy, not go-live. Do NOT touch the search-indexing
> settings: keep `robots.txt` as `Disallow: /` and keep the `X-Robots-Tag: noindex, nofollow`
> header in `vercel.json`. Those stay until we intentionally launch (see LAUNCH-TODO.md).

---

## What this deploys to

- **Repo:** `mb3700/theainhub-website` (branch `main`)
- **Staging URL:** `https://ainhub-staging.vercel.app` (auto-deploys on push to `main`)
- **Search indexing:** intentionally **OFF** — `robots.txt` disallows all + `vercel.json`
  sends `X-Robots-Tag: noindex, nofollow`. This is correct for staging.

## When you're ready to GO LIVE (later, not now)

Follow `LAUNCH-TODO.md` — the critical step is reversing the noindex in **both**
`robots.txt` (→ `Allow: /`) and `vercel.json` (remove the `X-Robots-Tag` header),
then pointing `theainhub.com` at the deployment and updating `og:image` URLs.

## Verify staging after the push

```
curl -I https://ainhub-staging.vercel.app/        # expect X-Robots-Tag: noindex, nofollow
curl    https://ainhub-staging.vercel.app/robots.txt   # expect Disallow: /
```
Then open the staging URL on a phone and check the homepage hero: the "In the press"
chip should sit cleanly **below** the photo with no decorative cube overlapping it.
