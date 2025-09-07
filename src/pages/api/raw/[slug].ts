import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ params, site }) => {
  const { slug } = params;
  
  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }
  
  try {
    // Get the blog entry to verify it exists
    const logEntries = await getCollection('log', ({ data }) => {
      return data.draft !== true; // Filter out drafts
    });
    const entry = logEntries.find(e => e.slug === slug);
    
    if (!entry) {
      return new Response('Blog entry not found', { status: 404 });
    }
    
    // Read the raw markdown file from the filesystem
    const markdownPath = path.resolve(process.cwd(), 'src/content/log', `${slug}.md`);
    
    if (!fs.existsSync(markdownPath)) {
      return new Response('Markdown file not found', { status: 404 });
    }
    
    const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
    
    // Construct canonical URL
    const siteUrl = site?.toString() || 'https://nibzard.com';
    const canonicalUrl = new URL(`/${slug}`, siteUrl).toString();
    
    return new Response(markdownContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Link': `<${canonicalUrl}>; rel="canonical"`,
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'index, follow' // Allow indexing but canonical will be preferred
      }
    });
    
  } catch (error) {
    console.error('Error serving raw markdown:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const prerender = false;