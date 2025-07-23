import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('log');
	
	// Filter out drafts and sort by date (newest first)
	const publishedPosts = posts
		.filter(post => !post.data.draft)
		.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
		.slice(0, 20); // Limit to 20 most recent posts

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		language: 'en-us',
		managingEditor: 'nikola@balic.co (Nikola Balić)',
		webMaster: 'nikola@balic.co (Nikola Balić)',
		copyright: `Copyright © ${new Date().getFullYear()} Nikola Balić`,
		lastBuildDate: new Date(),
		items: publishedPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/${post.slug}/`,
			guid: `${context.site}${post.slug}/`,
			pubDate: post.data.date,
			author: post.data.author || 'Nikola Balić',
			categories: post.data.tags,
			content: post.data.tldr || post.data.description,
		})),
	});
}
