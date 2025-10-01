// ABOUTME: Middleware for content negotiation - serves markdown or HTML based on Accept header
// ABOUTME: Implements Accept header pattern for AI-friendly markdown content delivery with AI agent metadata
import { defineMiddleware } from 'astro:middleware';
import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';

/**
 * Generate AI-friendly metadata header for markdown responses
 */
function generateAIMetadata(
  entry: CollectionEntry<'log'>,
  slug: string,
  siteUrl: string,
  relatedPosts: CollectionEntry<'log'>[]
): string {
  const { data } = entry;
  const publishedDate = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : String(data.date);
  const tags = data.tags ? data.tags.join(', ') : 'None';

  // Extract year for citation
  const year = data.date instanceof Date
    ? data.date.getFullYear()
    : new Date(data.date).getFullYear();

  // Generate citation from author name (Format: "Balić, N." from "Nikola Balić")
  const author = data.author || 'Nikola Balić';
  const [firstName, lastName] = author.split(' ');
  const citationAuthor = `${lastName}, ${firstName.charAt(0)}.`;

  // Generate full academic citation
  const citation = `${citationAuthor} (${year}). ${data.title}. nibzard.com.`;

  let metadata = '=== SITE CONTEXT FOR AI AGENTS ===\n';
  metadata += `SITE: nibzard.com\n`;
  metadata += `AUTHOR: ${data.author || 'Nikola Balić'}\n`;
  metadata += `PUBLISHED: ${publishedDate}\n`;
  if (data.updated) {
    const updatedDate = data.updated instanceof Date
      ? data.updated.toISOString().split('T')[0]
      : String(data.updated);
    metadata += `UPDATED: ${updatedDate}\n`;
  }
  metadata += `TAGS: ${tags}\n`;
  // Ensure siteUrl doesn't end with slash before adding slug
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');
  metadata += `URL: ${cleanSiteUrl}/${slug}\n`;
  metadata += `CITE_AS: "${citation}"\n`;
  metadata += `LICENSE: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)\n`;
  metadata += `\n`;

  metadata += `NAVIGATION:\n`;
  metadata += `- Home: /\n`;
  metadata += `- Log: /log\n`;
  metadata += `- About: /about\n`;
  metadata += `- Projects: /projects\n`;
  metadata += `- Now: /now\n`;
  metadata += `\n`;

  if (relatedPosts.length > 0) {
    metadata += `RELATED_POSTS:\n`;
    relatedPosts.forEach(post => {
      metadata += `- ${post.data.title}: /${post.slug}\n`;
    });
    metadata += `\n`;
  }

  metadata += `AUTHOR_CONTACT:\n`;
  metadata += `- X: https://x.com/nibzard\n`;
  metadata += `- LinkedIn: https://www.linkedin.com/in/nikolabalic/\n`;
  metadata += `- GitHub: https://github.com/nibzard\n`;
  metadata += `=================================\n\n`;

  return metadata;
}

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
      pathname.startsWith('/src/') ||      // Skip source scripts
      pathname.startsWith('/scripts/') ||  // Skip compiled scripts
      pathname.startsWith('/log/') ||      // Skip /log/* redirects
      pathname.startsWith('/tags/') ||     // Skip tag pages
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

          // Get related posts (2 random posts excluding current)
          const otherEntries = logEntries.filter(e => e.slug !== slug);
          const relatedPosts = otherEntries
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(2, otherEntries.length));

          // Generate AI-friendly metadata header
          const aiMetadata = generateAIMetadata(entry, slug, siteUrl, relatedPosts);

          // Prepend metadata to markdown content
          const enhancedContent = aiMetadata + markdownContent;

          return new Response(enhancedContent, {
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
