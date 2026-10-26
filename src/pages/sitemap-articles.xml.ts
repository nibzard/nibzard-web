import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Publish the content collection at build time even though articles render on demand.
export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('The article sitemap requires a configured site URL.');

  const articles = await getCollection('log', ({ id, data }) =>
    id !== 'claude' && !data.draft && Boolean(data.title) && !data.canonical
  );
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]!);
  const urls = articles.sort((a, b) => a.id.localeCompare(b.id)).map(article => {
    const url = new URL(`/${article.id}`, site).href;
    const modified = article.data.updated ?? article.data.date;
    return `<url><loc>${escapeXml(url)}</loc>${modified ? `<lastmod>${modified.toISOString()}</lastmod>` : ''}</url>`;
  });

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
