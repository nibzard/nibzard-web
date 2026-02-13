import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';

type SupportedCollection = 'log' | 'thoughts' | 'idea';

interface MatchedEntry {
  collection: SupportedCollection;
  entry: CollectionEntry<'log'> | CollectionEntry<'thoughts'> | CollectionEntry<'idea'>;
  canonicalPath: string;
  markdownPath: string;
}

const CONTENT_SIGNAL = 'ai-input=yes, ai-train=yes, search=yes';

function estimateMarkdownTokens(markdown: string): string {
  return Math.max(1, Math.ceil(markdown.length / 4)).toString();
}

function readMarkdownFile(collection: SupportedCollection, entryId: string): string | null {
  const markdownPath = path.resolve(process.cwd(), 'src', 'content', collection, entryId);
  if (!fs.existsSync(markdownPath)) {
    return null;
  }
  return fs.readFileSync(markdownPath, 'utf-8');
}

async function findEntryBySlug(slug: string): Promise<MatchedEntry | null> {
  const [logEntries, thoughtEntries, ideaEntries] = await Promise.all([
    getCollection('log', ({ data }) => data.draft !== true),
    getCollection('thoughts', ({ data }) => data.draft !== true),
    getCollection('idea', ({ data }) => data.draft !== true),
  ]);

  const logEntry = logEntries.find((entry) => entry.slug === slug);
  if (logEntry) {
    return {
      collection: 'log',
      entry: logEntry,
      canonicalPath: `/${logEntry.slug}`,
      markdownPath: `/${logEntry.slug}.md`,
    };
  }

  const thoughtEntry = thoughtEntries.find((entry) => entry.slug === slug);
  if (thoughtEntry) {
    return {
      collection: 'thoughts',
      entry: thoughtEntry,
      canonicalPath: `/thoughts/${thoughtEntry.slug}`,
      markdownPath: `/thoughts/${thoughtEntry.slug}.md`,
    };
  }

  const ideaEntry = ideaEntries.find((entry) => entry.slug === slug);
  if (ideaEntry) {
    return {
      collection: 'idea',
      entry: ideaEntry,
      canonicalPath: `/idea/${ideaEntry.slug}`,
      markdownPath: `/idea/${ideaEntry.slug}.md`,
    };
  }

  return null;
}

export const GET: APIRoute = async ({ params, site }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  try {
    const matchedEntry = await findEntryBySlug(slug);

    if (!matchedEntry) {
      return new Response('Markdown entry not found', { status: 404 });
    }

    const markdownContent = readMarkdownFile(matchedEntry.collection, matchedEntry.entry.id);

    if (!markdownContent) {
      return new Response('Markdown file not found', { status: 404 });
    }

    const siteUrl = site?.toString() || 'https://nibzard.com';
    const canonicalUrl = new URL(matchedEntry.canonicalPath, siteUrl).toString();
    const markdownUrl = new URL(matchedEntry.markdownPath, siteUrl).toString();

    return new Response(markdownContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Link': `<${canonicalUrl}>; rel="canonical", <${markdownUrl}>; rel="alternate"; type="text/markdown"`,
        'X-Content-Type-Options': 'nosniff',
        'Vary': 'Accept-Encoding',
        'Content-Signal': CONTENT_SIGNAL,
        'X-Markdown-Tokens': estimateMarkdownTokens(markdownContent),
        'X-Content-Collection': matchedEntry.collection,
        'X-Robots-Tag': 'index, follow',
      },
    });
  } catch (error) {
    console.error('Error serving raw markdown:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const prerender = false;
