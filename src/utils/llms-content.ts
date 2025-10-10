// ABOUTME: Utilities for processing content collections into llms.txt format

import { getCollection, type CollectionEntry } from 'astro:content';

interface ProcessedContent {
  logs: CollectionEntry<'log'>[];
  thoughts: CollectionEntry<'thoughts'>[];
  nowUpdates: CollectionEntry<'now'>[];
  images: CollectionEntry<'images'>[];
  ideas: CollectionEntry<'idea'>[];
}

export interface LLMSContent {
  metadata: {
    totalEntries: number;
    lastUpdated: Date;
    collections: {
      logs: number;
      thoughts: number;
      nowUpdates: number;
      images: number;
      ideas: number;
    };
  };
  markdown: string;
}

/**
 * Fetches all non-draft content from all collections
 */
export async function getAllContent(): Promise<ProcessedContent> {
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
  const { Content } = await entry.render();
  const frontmatter = [
    `**Published:** ${entry.data.date.toISOString().split('T')[0]}`,
    `**Author:** ${entry.data.author}`,
    entry.data.updated ? `**Updated:** ${entry.data.updated.toISOString().split('T')[0]}` : '',
    entry.data.tags.length > 0 ? `**Tags:** ${entry.data.tags.join(', ')}` : '',
  ].filter(Boolean).join(' | ');

  return `### ${entry.data.title}

${frontmatter}

> ${entry.data.description}

${entry.data.tldr ? `**TL;DR:** ${entry.data.tldr}\n` : ''}

${Content}
`;
}

/**
 * Renders the full content of an idea entry
 */
async function renderIdeaEntry(entry: CollectionEntry<'idea'>): Promise<string> {
  const { Content } = await entry.render();
  const frontmatter = [
    `**Published:** ${entry.data.date.toISOString().split('T')[0]}`,
    `**Author:** ${entry.data.author}`,
    entry.data.category ? `**Category:** ${entry.data.category}` : '',
  ].filter(Boolean).join(' | ');

  return `### ${entry.data.title}

${frontmatter}

${entry.data.subtitle ? `> ${entry.data.subtitle}\n` : ''}

${Content}
`;
}

/**
 * Renders the full content of a thought entry
 */
async function renderThoughtEntry(entry: CollectionEntry<'thoughts'>): Promise<string> {
  const { Content } = await entry.render();
  const frontmatter = [
    `**Date:** ${entry.data.date.toISOString().split('T')[0]}`,
    `**Author:** ${entry.data.author}`,
  ].join(' | ');

  return `### Thought from ${entry.data.date.toISOString().split('T')[0]}

${frontmatter}

${Content}
`;
}

/**
 * Renders the full content of a now entry
 */
async function renderNowEntry(entry: CollectionEntry<'now'>): Promise<string> {
  const { Content } = await entry.render();
  const frontmatter = [
    `**Date:** ${entry.data.date.toISOString().split('T')[0]}`,
    `**Author:** ${entry.data.author}`,
  ].join(' | ');

  return `### Now Update - ${entry.data.date.toISOString().split('T')[0]}

${frontmatter}

${Content}
`;
}

/**
 * Renders the full content of an image entry
 */
async function renderImageEntry(entry: CollectionEntry<'images'>): Promise<string> {
  const { Content } = await entry.render();
  const frontmatter = [
    `**Date:** ${entry.data.date.toISOString().split('T')[0]}`,
    `**Author:** ${entry.data.author}`,
    `**Image URL:** ${entry.data.imageUrl}`,
  ].join(' | ');

  return `### Image from ${entry.data.date.toISOString().split('T')[0]}

${frontmatter}

${Content}
`;
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
export async function generateLLMSContent(): Promise<LLMSContent> {
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