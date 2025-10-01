// ABOUTME: Middleware for content negotiation - serves markdown or HTML based on Accept header
// ABOUTME: Implements Accept header pattern for AI-friendly markdown content delivery
import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, site } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if this is a .md URL request
  const isMdUrl = pathname.endsWith('.md');

  // Only handle root-level log entry paths or .md URLs
  // Skip: /log/* redirects, tags, API routes, static assets, scripts, etc.
  if (pathname.startsWith('/api/') ||
      pathname.startsWith('/_astro/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/fonts/') ||
      pathname.startsWith('/src/') ||   // Skip source scripts
      pathname.startsWith('/log/') ||   // Skip /log/* redirects
      pathname.startsWith('/tags/') ||  // Skip tag pages
      pathname === '/' ||
      (pathname.includes('.') && !isMdUrl)) { // Skip other file extensions but not .md
    return next();
  }

  // Extract slug from pathname (remove leading slash and .md extension if present)
  const slug = pathname.replace(/^\//, '').replace(/\.md$/, '').replace(/\/$/, '');

  // Skip middleware during prerendering (headers not available)
  // During prerendering, accessing request.headers triggers a warning
  try {
    const acceptHeader = request.headers.get('accept') || '';

    // Check if client prefers markdown/plain text
    const plainIndex = acceptHeader.indexOf('text/plain');
    const markdownIndex = acceptHeader.indexOf('text/markdown');
    const htmlIndex = acceptHeader.indexOf('text/html');

    // Determine if markdown is preferred via Accept header OR .md URL
    const prefersMarkdown = isMdUrl ||
                            ((plainIndex !== -1 || markdownIndex !== -1) &&
                             (htmlIndex === -1 ||
                              (plainIndex !== -1 && plainIndex < htmlIndex) ||
                              (markdownIndex !== -1 && markdownIndex < htmlIndex)));

    if (prefersMarkdown) {
      // Check if this is a valid log entry
      const logEntries = await getCollection('log', ({ data }) => {
        return data.draft !== true;
      });
      const entry = logEntries.find(e => e.slug === slug);

      if (entry) {
        // Read the raw markdown file
        const markdownPath = path.resolve(process.cwd(), 'src/content/log', `${slug}.md`);

        if (fs.existsSync(markdownPath)) {
          const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

          // Construct canonical URL (HTML version)
          const siteUrl = site?.toString() || 'https://nibzard.com';
          const canonicalUrl = new URL(`/${slug}`, siteUrl).toString();

          return new Response(markdownContent, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
              'Link': `<${canonicalUrl}>; rel="canonical"`,
              'X-Content-Type-Options': 'nosniff',
              'Vary': 'Accept', // Important for caching
            }
          });
        }
      }
    }
  } catch (error) {
    // During prerendering, headers are not available - silently continue
    // In production, any real errors will be logged
  }

  // Continue with normal Astro rendering (HTML)
  return next();
});
