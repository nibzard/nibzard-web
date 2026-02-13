// ABOUTME: Middleware for content negotiation with robust Accept parsing
// ABOUTME: Serves markdown for log, thoughts, idea, and now pages when markdown is preferred
import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

type SupportedCollection = 'log' | 'thoughts' | 'now' | 'idea';

interface AcceptEntry {
  mediaType: string;
  q: number;
  order: number;
}

interface MediaScore {
  q: number;
  specificity: number;
  order: number;
}

interface MarkdownTarget {
  collection: SupportedCollection;
  slug?: string;
  canonicalPath: string;
  markdownPath: string;
}

interface AgentMetadataOptions {
  collection: SupportedCollection;
  canonicalUrl: string;
  markdownUrl: string;
  author?: string;
  published?: string;
  updated?: string;
  tags?: string[];
  relatedPaths?: string[];
}

const CONTENT_SIGNAL = 'ai-input=yes, ai-train=yes, search=yes';

const RESERVED_ROOT_SEGMENTS = new Set([
  'about',
  'api',
  'bio',
  'cv',
  'fonts',
  'images',
  'idea',
  'llms-full.txt',
  'llms.txt',
  'log',
  'now',
  'og',
  'projects',
  'scripts',
  'search',
  'styles',
  'tags',
  'thoughts',
  'unsubscribe',
]);

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

function parseAcceptHeader(acceptHeader: string): AcceptEntry[] {
  return acceptHeader
    .split(',')
    .map((entry, order) => {
      const [mediaTypeRaw, ...params] = entry.trim().toLowerCase().split(';');
      let q = 1;

      for (const param of params) {
        const [key, value] = param.trim().split('=');
        if (key === 'q' && value) {
          const parsedQ = Number.parseFloat(value);
          if (!Number.isNaN(parsedQ)) {
            q = parsedQ;
          }
        }
      }

      return {
        mediaType: mediaTypeRaw,
        q: Math.min(1, Math.max(0, q)),
        order,
      };
    })
    .filter((entry) => entry.mediaType.includes('/') && entry.q > 0);
}

function mediaSpecificity(requested: string, supported: string): number {
  if (requested === supported) return 2;

  const [requestedType, requestedSubtype] = requested.split('/');
  const [supportedType] = supported.split('/');

  if (requestedType === supportedType && requestedSubtype === '*') return 1;
  if (requestedType === '*' && requestedSubtype === '*') return 0;

  return -1;
}

function isBetterScore(candidate: MediaScore, current: MediaScore): boolean {
  if (candidate.q !== current.q) return candidate.q > current.q;
  if (candidate.specificity !== current.specificity) return candidate.specificity > current.specificity;
  return candidate.order < current.order;
}

function scoreMediaType(acceptEntries: AcceptEntry[], supported: string): MediaScore {
  let best: MediaScore = { q: 0, specificity: -1, order: Number.MAX_SAFE_INTEGER };

  for (const entry of acceptEntries) {
    const specificity = mediaSpecificity(entry.mediaType, supported);
    if (specificity < 0) continue;

    const candidate: MediaScore = {
      q: entry.q,
      specificity,
      order: entry.order,
    };

    if (isBetterScore(candidate, best)) {
      best = candidate;
    }
  }

  return best;
}

function prefersMarkdownResponse(acceptHeader: string, isMdUrl: boolean): boolean {
  if (isMdUrl) return true;

  const parsedAccept = parseAcceptHeader(acceptHeader);
  if (parsedAccept.length === 0) return false;

  const markdownScore = scoreMediaType(parsedAccept, 'text/markdown');
  if (markdownScore.q <= 0) return false;

  const htmlScore = scoreMediaType(parsedAccept, 'text/html');

  // Human navigation should default to HTML unless markdown is strictly preferred.
  // `.md` URLs still force markdown regardless of Accept header.
  if (htmlScore.q <= 0) return true;
  return markdownScore.q > htmlScore.q;
}

function resolveMarkdownTarget(pathname: string): MarkdownTarget | null {
  const normalizedPath = normalizePathname(pathname);
  const withoutMdExtension = normalizedPath.endsWith('.md')
    ? normalizedPath.slice(0, -3) || '/'
    : normalizedPath;

  if (withoutMdExtension === '/now') {
    return {
      collection: 'now',
      canonicalPath: '/now',
      markdownPath: '/now.md',
    };
  }

  const ideaMatch = withoutMdExtension.match(/^\/idea\/([^/]+)$/);
  if (ideaMatch) {
    const slug = ideaMatch[1];
    return {
      collection: 'idea',
      slug,
      canonicalPath: `/idea/${slug}`,
      markdownPath: `/idea/${slug}.md`,
    };
  }

  const thoughtMatch = withoutMdExtension.match(/^\/thoughts\/([^/]+)$/);
  if (thoughtMatch) {
    const slug = thoughtMatch[1];
    return {
      collection: 'thoughts',
      slug,
      canonicalPath: `/thoughts/${slug}`,
      markdownPath: `/thoughts/${slug}.md`,
    };
  }

  const logMatch = withoutMdExtension.match(/^\/([^/]+)$/);
  if (!logMatch) return null;

  const slug = logMatch[1];
  if (!slug || RESERVED_ROOT_SEGMENTS.has(slug)) {
    return null;
  }

  return {
    collection: 'log',
    slug,
    canonicalPath: `/${slug}`,
    markdownPath: `/${slug}.md`,
  };
}

function estimateMarkdownTokens(markdown: string): string {
  return Math.max(1, Math.ceil(markdown.length / 4)).toString();
}

function toDateString(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (typeof value === 'string' && value.length > 0) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  }
  return undefined;
}

function generateAgentMetadata(options: AgentMetadataOptions): string {
  const lines = [
    '<!--',
    'agent-site: nibzard.com',
    `collection: ${options.collection}`,
    `canonical-url: ${options.canonicalUrl}`,
    `markdown-url: ${options.markdownUrl}`,
    `content-signal: ${CONTENT_SIGNAL}`,
  ];

  if (options.author) lines.push(`author: ${options.author}`);
  if (options.published) lines.push(`published: ${options.published}`);
  if (options.updated) lines.push(`updated: ${options.updated}`);
  if (options.tags && options.tags.length > 0) lines.push(`tags: ${options.tags.join(', ')}`);
  if (options.relatedPaths && options.relatedPaths.length > 0) {
    lines.push(`related: ${options.relatedPaths.join(', ')}`);
  }

  lines.push('-->', '');

  return `${lines.join('\n')}\n`;
}

function buildMarkdownResponse(
  content: string,
  canonicalUrl: string,
  markdownUrl: string,
  collection: SupportedCollection
): Response {
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Link': `<${canonicalUrl}>; rel="canonical", <${markdownUrl}>; rel="alternate"; type="text/markdown"`,
      'X-Content-Type-Options': 'nosniff',
      'Vary': 'Accept, Accept-Encoding',
      'Content-Signal': CONTENT_SIGNAL,
      'X-Markdown-Tokens': estimateMarkdownTokens(content),
      'X-Content-Collection': collection,
    },
  });
}

function buildMarkdownErrorResponse(status: number, title: string, description: string): Response {
  const body = `# ${title}\n\n${description}\n`;
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Vary': 'Accept, Accept-Encoding',
      'Content-Signal': CONTENT_SIGNAL,
      'X-Markdown-Tokens': estimateMarkdownTokens(body),
    },
  });
}

function readMarkdownFile(collectionDir: string, entryId: string): string | null {
  const markdownPath = path.resolve(process.cwd(), 'src', 'content', collectionDir, entryId);
  if (!fs.existsSync(markdownPath)) {
    return null;
  }
  return fs.readFileSync(markdownPath, 'utf-8');
}

function sortByDateDesc<T extends { data: { date?: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  });
}

function buildSiteUrls(site: URL | undefined, canonicalPath: string, markdownPath: string): { canonicalUrl: string; markdownUrl: string } {
  const siteUrl = site?.toString() || 'https://nibzard.com';
  return {
    canonicalUrl: new URL(canonicalPath, siteUrl).toString(),
    markdownUrl: new URL(markdownPath, siteUrl).toString(),
  };
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, site } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/claude' || pathname === '/claude/' || pathname === '/claude.md') {
    return new Response('Not Found', { status: 404 });
  }

  const isMdUrl = pathname.endsWith('.md');

  // Keep regular browser page navigations on HTML by default.
  // Explicit `.md` URLs still opt into markdown.
  const fetchDest = request.headers.get('sec-fetch-dest');
  if (!isMdUrl && fetchDest === 'document') {
    return next();
  }

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/scripts/') ||
    pathname.startsWith('/log/') ||
    pathname.startsWith('/tags/') ||
    pathname === '/' ||
    (pathname.includes('.') && !isMdUrl)
  ) {
    return next();
  }

  const acceptHeader = request.headers.get('accept') || '';
  if (!prefersMarkdownResponse(acceptHeader, isMdUrl)) {
    return next();
  }

  const target = resolveMarkdownTarget(pathname);
  if (!target) {
    return next();
  }

  const { canonicalUrl, markdownUrl } = buildSiteUrls(site, target.canonicalPath, target.markdownPath);

  try {
    if (target.collection === 'log') {
      const logEntries = await getCollection('log', ({ data }) => data.draft !== true);
      const entry = logEntries.find((candidate) => candidate.slug === target.slug);
      if (!entry) {
        return buildMarkdownErrorResponse(404, 'Not Found', `No published log entry exists for \`${target.slug}\`.`);
      }

      const markdownContent = readMarkdownFile('log', entry.id);
      if (!markdownContent) {
        return buildMarkdownErrorResponse(404, 'Not Found', `Markdown source is unavailable for \`${target.slug}\`.`);
      }

      const relatedPaths = sortByDateDesc(logEntries)
        .filter((candidate) => candidate.slug !== entry.slug)
        .slice(0, 2)
        .map((candidate) => `/${candidate.slug}`);

      const metadata = generateAgentMetadata({
        collection: 'log',
        canonicalUrl,
        markdownUrl,
        author: entry.data.author,
        published: toDateString(entry.data.date),
        updated: toDateString(entry.data.updated),
        tags: entry.data.tags || [],
        relatedPaths,
      });

      return buildMarkdownResponse(`${metadata}${markdownContent}`, canonicalUrl, markdownUrl, 'log');
    }

    if (target.collection === 'thoughts') {
      const thoughtsEntries = await getCollection('thoughts', ({ data }) => data.draft !== true);
      const entry = thoughtsEntries.find((candidate) => candidate.slug === target.slug);
      if (!entry) {
        return buildMarkdownErrorResponse(404, 'Not Found', `No published thought exists for \`${target.slug}\`.`);
      }

      const markdownContent = readMarkdownFile('thoughts', entry.id);
      if (!markdownContent) {
        return buildMarkdownErrorResponse(404, 'Not Found', `Markdown source is unavailable for \`${target.slug}\`.`);
      }

      const metadata = generateAgentMetadata({
        collection: 'thoughts',
        canonicalUrl,
        markdownUrl,
        author: entry.data.author,
        published: toDateString(entry.data.date),
      });

      return buildMarkdownResponse(`${metadata}${markdownContent}`, canonicalUrl, markdownUrl, 'thoughts');
    }

    if (target.collection === 'idea') {
      const ideaEntries = await getCollection('idea', ({ data }) => data.draft !== true);
      const entry = ideaEntries.find((candidate) => candidate.slug === target.slug);
      if (!entry) {
        return buildMarkdownErrorResponse(404, 'Not Found', `No published idea exists for \`${target.slug}\`.`);
      }

      const markdownContent = readMarkdownFile('idea', entry.id);
      if (!markdownContent) {
        return buildMarkdownErrorResponse(404, 'Not Found', `Markdown source is unavailable for \`${target.slug}\`.`);
      }

      const metadata = generateAgentMetadata({
        collection: 'idea',
        canonicalUrl,
        markdownUrl,
        author: entry.data.author,
        published: toDateString(entry.data.date),
      });

      return buildMarkdownResponse(`${metadata}${markdownContent}`, canonicalUrl, markdownUrl, 'idea');
    }

    const nowEntries = await getCollection('now', ({ data }) => data.draft !== true);
    const sortedNowEntries = sortByDateDesc(nowEntries);
    const entry = sortedNowEntries[0];

    if (!entry) {
      return buildMarkdownErrorResponse(404, 'Not Found', 'No published now entries are available.');
    }

    const markdownContent = readMarkdownFile('now', entry.id);
    if (!markdownContent) {
      return buildMarkdownErrorResponse(404, 'Not Found', 'Markdown source is unavailable for the latest now entry.');
    }

    const metadata = generateAgentMetadata({
      collection: 'now',
      canonicalUrl,
      markdownUrl,
      author: entry.data.author,
      published: toDateString(entry.data.date),
    });

    return buildMarkdownResponse(`${metadata}${markdownContent}`, canonicalUrl, markdownUrl, 'now');
  } catch (error) {
    console.error('Error serving markdown content:', error);
    return buildMarkdownErrorResponse(500, 'Internal Server Error', 'Unable to serve markdown content right now.');
  }
});
