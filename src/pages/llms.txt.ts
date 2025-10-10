// ABOUTME: llms.txt endpoint following the specification with metadata and links

import { type APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get all non-draft content
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

    const sortedLogs = sortByDate(logs);
    const sortedIdeas = sortByDate(ideas);
    const sortedThoughts = sortByDate(thoughts);
    const sortedNowUpdates = sortByDate(nowUpdates);
    const sortedImages = sortByDate(images);

    // Generate llms.txt content following the specification
    const baseUrl = 'https://www.nibzard.com';

    let content = `# Nibzard

> Complete collection of Nikola Balić's technical writings, thoughts, project updates, and ideas from nibzard.com. This file provides LLMs with structured access to all published content.

This collection includes in-depth technical articles on AI and development tools, personal reflections, project updates, and strategic ideas. All content is published by Nikola Balić and focuses on practical insights from building and shipping AI-powered products.

For the complete concatenated content of all articles, visit [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt).

## Log Articles

`;

    // Add log articles
    sortedLogs.forEach((log) => {
      content += `- [${log.data.title}](${baseUrl}/${log.slug}): ${log.data.description}\n`;
    });

    content += `\n## Ideas\n`;
    sortedIdeas.forEach((idea) => {
      const subtitle = idea.data.subtitle ? ` - ${idea.data.subtitle}` : '';
      content += `- [${idea.data.title}](${baseUrl}/idea/${idea.slug}): ${idea.data.subtitle || 'Project concept'}${subtitle}\n`;
    });

    content += `\n## Thoughts\n`;
    sortedThoughts.forEach((thought) => {
      const date = thought.data.date.toISOString().split('T')[0];
      content += `- [Thought from ${date}](${baseUrl}/thoughts/${thought.slug}): Personal reflection\n`;
    });

    content += `\n## Now Updates\n`;
    sortedNowUpdates.forEach((now) => {
      const date = now.data.date.toISOString().split('T')[0];
      content += `- [Now Update - ${date}](${baseUrl}/now/${now.slug}): Current activities and projects\n`;
    });

    content += `\n## Images\n`;
    sortedImages.forEach((image) => {
      const date = image.data.date.toISOString().split('T')[0];
      const fullImageUrl = image.data.imageUrl.startsWith('http') ? image.data.imageUrl : `${baseUrl}${image.data.imageUrl}`;
      content += `- [Image from ${date}](${baseUrl}/images/${image.slug}): Visual content - ${fullImageUrl}\n`;
    });

    content += `\n## Optional

- [Complete Content Collection](${baseUrl}/llms-full.txt): Full markdown content of all articles in a single file

---

*This file follows the [llms.txt specification](https://llmstxt.org/) for providing LLM-friendly content access.*`;

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Total-Entries': (logs.length + thoughts.length + nowUpdates.length + images.length + ideas.length).toString(),
        'X-Log-Count': logs.length.toString(),
        'X-Thoughts-Count': thoughts.length.toString(),
        'X-Now-Count': nowUpdates.length.toString(),
        'X-Images-Count': images.length.toString(),
        'X-Ideas-Count': ideas.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new Response('Error generating llms.txt content', {
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
    const [logs, thoughts, nowUpdates, images, ideas] = await Promise.all([
      getCollection('log', (entry) => !entry.data.draft),
      getCollection('thoughts', (entry) => !entry.data.draft),
      getCollection('now', (entry) => !entry.data.draft),
      getCollection('images', (entry) => !entry.data.draft),
      getCollection('idea', (entry) => !entry.data.draft),
    ]);

    const totalEntries = logs.length + thoughts.length + nowUpdates.length + images.length + ideas.length;

    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Total-Entries': totalEntries.toString(),
        'X-Log-Count': logs.length.toString(),
        'X-Thoughts-Count': thoughts.length.toString(),
        'X-Now-Count': nowUpdates.length.toString(),
        'X-Images-Count': images.length.toString(),
        'X-Ideas-Count': ideas.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error in HEAD request for llms.txt:', error);
    return new Response(null, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
};