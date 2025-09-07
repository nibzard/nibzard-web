// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeHeadingAnchors from './src/plugins/rehype-heading-anchors.mjs';
import rehypeOptimizeImages from './src/plugins/rehype-optimize-images.mjs';

// import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const siteUrl = 'https://nibzard.com';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap({
    filter: (page) => {
      // Include all pages by default
      return true;
    },
    serialize: (item) => {
      // Adjust priority for markdown pages
      if (item.url.endsWith('.md')) {
        return {
          ...item,
          priority: 0.6,
          changefreq: 'monthly'
        };
      }
      // Default priority for HTML pages
      return {
        ...item,
        priority: item.url === siteUrl + '/' ? 1.0 : 0.8,
        changefreq: 'weekly'
      };
    }
  })],
  site: siteUrl,
  // output: 'static',
  output: 'server',

  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { domain: new URL(siteUrl).hostname }],
      rehypeHeadingAnchors,
      rehypeOptimizeImages,
    ],
  },

  // adapter: node({
  //   mode: 'standalone',
  // }),
  adapter: vercel({}),
});