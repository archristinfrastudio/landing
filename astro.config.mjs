// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE are filled in by the GitHub Actions workflow from GitHub Pages
// settings, so the site works both at username.github.io/repo-name and,
// later, at a custom domain (where BASE becomes "/").
const site = process.env.SITE || 'https://example.github.io';
const base = process.env.BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
});
