# CTF Cosmic Blog (Astro + Tailwind + MDX)

A static, GitHub-Pages-friendly personal site for CTF posts, research notes, and link posts - with a cosmic/astronaut theme.

If you want to find older challenge writeups that were written before this website existed, check the Notion workspace:

`https://xon1l.notion.site/0f7cc27a1426404e9383b15583584137?v=b53480fa8c5241b6b2577c0cb42da2e5&pvs=74`

## Quick start

```bash
npm install
npm run dev
```

Build locally:

```bash
npm run build
npm run preview
```

## Writing content

Content lives in:

- `src/content/blog/*.mdx`
- `src/content/links/*.md` (external link posts)

Each file has frontmatter (see sample posts).

## Deploy to GitHub Pages

This project uses **GitHub Actions** (see `.github/workflows/deploy.yml`).

### 1) Enable Pages
Repo → **Settings → Pages** → Build and deployment → **Source: GitHub Actions**.

### 2) Configure base path
This site supports both:
- **Project Pages**: `https://<user>.github.io/<repo>/` (default)
- **User Pages**: `https://<user>.github.io/`

The Astro config auto-detects the repo name in GitHub Actions and sets `base` accordingly.
For **User Pages**, set repository name to `<user>.github.io` OR set `BASE_PATH=/` in the workflow env.

### 3) Push
Push to `main`. The workflow will build and deploy.

## Customize
- Edit `src/config/site.ts` for your name, bio, social links, and site URL.
- Replace `public/astronaut.svg` and `public/og-default.png` if desired.

## Archive and reading features

- Search titles, descriptions, and tags; combine category, difficulty, event, and exact tag filters.
- Filter URLs can be bookmarked or shared. Press `/` on the blog archive to focus search.
- Clearing filters restores the current archive page; active filters search the whole collection.
- Posts include estimated reading time and a table of contents on desktop and mobile.
- The effects setting is saved on the reader's device and respects reduced-motion preferences.

Run the search and date regression checks with Node 24:

```bash
npm test
```
