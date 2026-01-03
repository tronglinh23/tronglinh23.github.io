# CTF Cosmic Blog (Astro + Tailwind + MDX)

A static, GitHub-Pages-friendly personal site for CTF posts, research notes, and link posts — with a cosmic/astronaut theme.

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
