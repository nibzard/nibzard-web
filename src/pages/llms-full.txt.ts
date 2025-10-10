// ABOUTME: API endpoint that serves all content as a single concatenated markdown file

import { type APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFileSync } from 'fs';
import { join } from 'path';

interface ProcessedContent {
  logs: CollectionEntry<'log'>[];
  thoughts: CollectionEntry<'thoughts'>[];
  nowUpdates: CollectionEntry<'now'>[];
  images: CollectionEntry<'images'>[];
  ideas: CollectionEntry<'idea'>[];
}

/**
 * Fetches all non-draft content from all collections
 */
async function getAllContent(): Promise<ProcessedContent> {
  const [logs, thoughts, nowUpdates, images, ideas] = await Promise.all([
    getCollection('log', (entry) => !entry.data.draft),
    getCollection('thoughts', (entry) => !entry.data.draft),
    getCollection('now', (entry) => !entry.data.draft),
    getCollection('images', (entry) => !entry.data.draft),
    getCollection('idea', (entry) => !entry.data.draft),
  ]);

  // Sort by date (newest first)
  const sortByDate = <T extends { data: { date: Date } }>(entries: T[]): T[] =>
    entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return {
    logs: sortByDate(logs),
    thoughts: sortByDate(thoughts),
    nowUpdates: sortByDate(nowUpdates),
    images: sortByDate(images),
    ideas: sortByDate(ideas),
  };
}

/**
 * Generates the header section for llms.txt
 */
function generateHeader(): string {
  return `# Nibzard

> Complete collection of Nikola Balić's technical writings, thoughts, project updates, and ideas from nibzard.com. This file provides LLMs with comprehensive access to all published content in a single, structured markdown document.

## Content Overview

This collection includes:
- **Log Articles**: In-depth technical articles, tutorials, and insights on AI, development tools, and technology
- **Thoughts**: Brief reflections and observations on technology and development
- **Now Updates**: Regular updates on current projects and activities
- **Ideas**: Project concepts and strategic thinking
- **Images**: Visual content with accompanying descriptions

All content is published by Nikola Balić and represents a comprehensive view of technical expertise and thought leadership.

`;
}

/**
 * Generates a table of contents section
 */
function generateTableOfContents(content: ProcessedContent): string {
  const sections = [];

  if (content.logs.length > 0) {
    sections.push(`### Log Articles (${content.logs.length})`);
    content.logs.forEach((log) => {
      const date = log.data.date.toISOString().split('T')[0];
      sections.push(`- [${log.data.title}](/${log.slug}): ${log.data.description}`);
    });
    sections.push('');
  }

  if (content.ideas.length > 0) {
    sections.push(`### Ideas (${content.ideas.length})`);
    content.ideas.forEach((idea) => {
      const date = idea.data.date.toISOString().split('T')[0];
      const subtitle = idea.data.subtitle ? ` - ${idea.data.subtitle}` : '';
      sections.push(`- [${idea.data.title}](/idea/${idea.slug}): ${idea.data.subtitle || 'Project concept'}${subtitle}`);
    });
    sections.push('');
  }

  if (content.thoughts.length > 0) {
    sections.push(`### Thoughts (${content.thoughts.length})`);
    content.thoughts.forEach((thought) => {
      const date = thought.data.date.toISOString().split('T')[0];
      sections.push(`- [Thought from ${date}](/thoughts/${thought.slug}): Personal reflection`);
    });
    sections.push('');
  }

  if (content.nowUpdates.length > 0) {
    sections.push(`### Now Updates (${content.nowUpdates.length})`);
    content.nowUpdates.forEach((now) => {
      const date = now.data.date.toISOString().split('T')[0];
      sections.push(`- [Now Update - ${date}](/now/${now.slug}): Current activities and projects`);
    });
    sections.push('');
  }

  if (content.images.length > 0) {
    sections.push(`### Images (${content.images.length})`);
    content.images.forEach((image) => {
      const date = image.data.date.toISOString().split('T')[0];
      sections.push(`- [Image from ${date}](/images/${image.slug}): Visual content`);
    });
    sections.push('');
  }

  return sections.join('\n') + '\n';
}

/**
 * Renders the full content of a log entry
 */
async function renderLogEntry(entry: CollectionEntry<'log'>): Promise<string> {
  // Read the raw markdown file
  const filePath = join(process.cwd(), 'src', 'content', 'log', `${entry.slug}.md`);
  const rawContent = readFileSync(filePath, 'utf-8');

  // Remove frontmatter (everything between first two --- lines)
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');

  return `### ${entry.data.title}

> ${entry.data.description}

${entry.data.tldr ? `**TL;DR:** ${entry.data.tldr}\n\n` : ''}${contentWithoutFrontmatter.trim()}

---`;
}

/**
 * Renders the full content of an idea entry
 */
async function renderIdeaEntry(entry: CollectionEntry<'idea'>): Promise<string> {
  // Read the raw markdown file
  const filePath = join(process.cwd(), 'src', 'content', 'idea', `${entry.slug}.md`);
  const rawContent = readFileSync(filePath, 'utf-8');

  // Remove frontmatter (everything between first two --- lines)
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');

  return `### ${entry.data.title}

${entry.data.subtitle ? `> ${entry.data.subtitle}\n\n` : ''}${contentWithoutFrontmatter.trim()}

---`;
}

/**
 * Renders the full content of a thought entry
 */
async function renderThoughtEntry(entry: CollectionEntry<'thoughts'>): Promise<string> {
  // Read the raw markdown file
  const filePath = join(process.cwd(), 'src', 'content', 'thoughts', `${entry.slug}.md`);
  const rawContent = readFileSync(filePath, 'utf-8');

  // Remove frontmatter (everything between first two --- lines)
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');

  return `### Thought from ${entry.data.date.toISOString().split('T')[0]}

${contentWithoutFrontmatter.trim()}

---`;
}

/**
 * Renders the full content of a now entry
 */
async function renderNowEntry(entry: CollectionEntry<'now'>): Promise<string> {
  // Read the raw markdown file
  const filePath = join(process.cwd(), 'src', 'content', 'now', `${entry.slug}.md`);
  const rawContent = readFileSync(filePath, 'utf-8');

  // Remove frontmatter (everything between first two --- lines)
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');

  return `### Now Update - ${entry.data.date.toISOString().split('T')[0]}

${contentWithoutFrontmatter.trim()}

---`;
}

/**
 * Renders the full content of an image entry
 */
async function renderImageEntry(entry: CollectionEntry<'images'>): Promise<string> {
  // Read the raw markdown file
  const filePath = join(process.cwd(), 'src', 'content', 'images', `${entry.slug}.md`);
  const rawContent = readFileSync(filePath, 'utf-8');

  // Remove frontmatter (everything between first two --- lines)
  const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');

  return `### Image from ${entry.data.date.toISOString().split('T')[0]}

**Image URL:** ${entry.data.imageUrl}

${contentWithoutFrontmatter.trim()}

---`;
}

/**
 * Generates the full content section with all entries
 */
async function generateFullContent(content: ProcessedContent): Promise<string> {
  const sections = [];

  sections.push('---\n');
  sections.push('# Complete Content\n');

  if (content.logs.length > 0) {
    sections.push('## Log Articles\n');
    for (const log of content.logs) {
      sections.push(await renderLogEntry(log));
      sections.push('\n---\n');
    }
  }

  if (content.ideas.length > 0) {
    sections.push('## Ideas\n');
    for (const idea of content.ideas) {
      sections.push(await renderIdeaEntry(idea));
      sections.push('\n---\n');
    }
  }

  if (content.thoughts.length > 0) {
    sections.push('## Thoughts\n');
    for (const thought of content.thoughts) {
      sections.push(await renderThoughtEntry(thought));
      sections.push('\n---\n');
    }
  }

  if (content.nowUpdates.length > 0) {
    sections.push('## Now Updates\n');
    for (const now of content.nowUpdates) {
      sections.push(await renderNowEntry(now));
      sections.push('\n---\n');
    }
  }

  if (content.images.length > 0) {
    sections.push('## Images\n');
    for (const image of content.images) {
      sections.push(await renderImageEntry(image));
      sections.push('\n---\n');
    }
  }

  return sections.join('\n');
}

/**
 * Generates the complete llms.txt content
 */
async function generateLLMSContent() {
  const content = await getAllContent();

  const header = generateHeader();
  const tableOfContents = generateTableOfContents(content);
  const fullContent = await generateFullContent(content);

  const markdown = header + tableOfContents + fullContent;

  const metadata = {
    totalEntries: content.logs.length + content.thoughts.length + content.nowUpdates.length + content.images.length + content.ideas.length,
    lastUpdated: new Date(),
    collections: {
      logs: content.logs.length,
      thoughts: content.thoughts.length,
      nowUpdates: content.nowUpdates.length,
      images: content.images.length,
      ideas: content.ideas.length,
    },
  };

  return {
    metadata,
    markdown,
  };
}

export const GET: APIRoute = async ({ request }) => {
  try {
    // Generate the complete llms content
    const llmsContent = await generateLLMSContent();

    // Set appropriate headers for plain text content
    const headers = new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      'Access-Control-Allow-Origin': '*', // Allow CORS for LLM applications
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Content-Count': llmsContent.metadata.totalEntries.toString(),
      'X-Last-Updated': llmsContent.metadata.lastUpdated.toISOString(),
      'X-Log-Count': llmsContent.metadata.collections.logs.toString(),
      'X-Thoughts-Count': llmsContent.metadata.collections.thoughts.toString(),
      'X-Now-Count': llmsContent.metadata.collections.nowUpdates.toString(),
      'X-Images-Count': llmsContent.metadata.collections.images.toString(),
      'X-Ideas-Count': llmsContent.metadata.collections.ideas.toString(),
    });

    return new Response(llmsContent.markdown, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error generating llms-full.txt:', error);

    return new Response('Error generating llms-full.txt content', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
};

// Support HEAD requests for content discovery
export const HEAD: APIRoute = async ({ request }) => {
  try {
    // Generate just the metadata to get content info
    const llmsContent = await generateLLMSContent();

    const headers = new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Length': new Blob([llmsContent.markdown]).size.toString(),
      'X-Content-Count': llmsContent.metadata.totalEntries.toString(),
      'X-Last-Updated': llmsContent.metadata.lastUpdated.toISOString(),
      'X-Log-Count': llmsContent.metadata.collections.logs.toString(),
      'X-Thoughts-Count': llmsContent.metadata.collections.thoughts.toString(),
      'X-Now-Count': llmsContent.metadata.collections.nowUpdates.toString(),
      'X-Images-Count': llmsContent.metadata.collections.images.toString(),
      'X-Ideas-Count': llmsContent.metadata.collections.ideas.toString(),
    });

    return new Response(null, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error in HEAD request for llms-full.txt:', error);

    return new Response(null, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
};

// Support OPTIONS requests for CORS preflight
export const OPTIONS: APIRoute = async ({ request }) => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
};