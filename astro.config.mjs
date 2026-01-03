import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

function normalizeBasePath(value) {
  if (!value) return '/';
  let trimmed = value.trim();
  if (trimmed === '' || trimmed === 'undefined' || trimmed === 'null') return '/';
  if (!trimmed.startsWith('/')) trimmed = `/${trimmed}`;
  trimmed = trimmed.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function inferBasePath() {
  // Priority:
  // 1) Explicit env BASE_PATH (e.g., "/" or "/repo")
  // 2) GitHub Actions repo name for project pages: "/<repo>"
  // 3) default "/"
  const explicit = process.env.BASE_PATH;
  if (explicit && explicit.trim() !== '') return normalizeBasePath(explicit);

  const repo = process.env.GITHUB_REPOSITORY; // "owner/repo"
  if (repo && repo.includes('/')) {
    const name = repo.split('/')[1];
    // If user pages repo "<user>.github.io", base should be "/"
    if (name.endsWith('.github.io')) return '/';
    return `/${name}`;
  }
  return '/';
}

function inferSiteUrl(base) {
  // Prefer explicit SITE_URL for correct canonical URLs and RSS.
  // Example:
  // - User pages: https://<user>.github.io
  // - Project pages: https://<user>.github.io/<repo>
  const explicit = process.env.SITE_URL;
  if (explicit && explicit.trim() !== '') return explicit.replace(/\/$/, '');

  // Fallback placeholder (you should set SITE_URL in GitHub Actions env)
  // This is still safe for build; just not ideal for SEO/RSS.
  return 'https://example.com';
}

const base = inferBasePath();
const site = inferSiteUrl(base);

export default defineConfig({
  site,
  base,
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      wrap: true
    }
  }
});
