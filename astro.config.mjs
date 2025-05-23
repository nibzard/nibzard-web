// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';

const siteUrl = 'https://nibzard.com';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: siteUrl,
  output: 'static',
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { domain: new URL(siteUrl).hostname }],
    ],
  },
});