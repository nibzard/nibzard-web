// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeHeadingAnchors from './src/plugins/rehype-heading-anchors.mjs';
import rehypeOptimizeImages from './src/plugins/rehype-optimize-images.mjs';
import rehypeMermaid from 'rehype-mermaid';

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

  // Build optimizations for performance
  build: {
    inlineStylesheets: 'auto',
    split: true,
    assets: '_astro',
  },
  compressHTML: true,

  // Vite build optimizations
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          dead_code: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn'],
          passes: 2,
          unsafe: true,
          unsafe_comps: true,
        },
        mangle: {
          safari10: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor dependencies into separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('framer-motion')) {
                return 'react-vendor';
              }
              if (id.includes('@anthropic-ai') || id.includes('resend')) {
                return 'api-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      [rehypeExternalLinks, { domain: new URL(siteUrl).hostname }],
      rehypeHeadingAnchors,
      rehypeOptimizeImages,
      [rehypeMermaid, { strategy: 'img-svg', dark: true }],
    ],
  },

  // adapter: node({
  //   mode: 'standalone',
  // }),
  adapter: vercel({}),
});