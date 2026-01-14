// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeHeadingAnchors from './src/plugins/rehype-heading-anchors.mjs';
import rehypeOptimizeImages from './src/plugins/rehype-optimize-images.mjs';
import remarkMermaidClient from './src/plugins/remark-mermaid-client.mjs';

// import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const siteUrl = 'https://nibzard.com';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), sitemap({
    filter: (page) => {
      // Include all pages by default
      return true;
    },
    serialize: (item) => {
      // Set priority based on page type
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
    remarkPlugins: [
      remarkMermaidClient,
    ],
    rehypePlugins: [
      [rehypeExternalLinks, { domain: new URL(siteUrl).hostname }],
      rehypeHeadingAnchors,
      rehypeOptimizeImages,
    ],
  },
  mdx: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [
      remarkMermaidClient,
    ],
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