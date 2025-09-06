// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeHeadingAnchors from './src/plugins/rehype-heading-anchors.mjs';

// import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const siteUrl = 'https://nibzard.com';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: siteUrl,
  // output: 'static',
  output: 'server',

  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { domain: new URL(siteUrl).hostname }],
      rehypeHeadingAnchors,
    ],
  },

  // adapter: node({
  //   mode: 'standalone',
  // }),
  adapter: vercel({}),
});