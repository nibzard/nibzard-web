import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('log');

	// Filter out drafts and sort by date (newest first)
	const publishedPosts = posts
		.filter(post => !post.data.draft)
		.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

	const items = await Promise.all(
		publishedPosts.map(async (post) => {
			const { Content } = await render(post);
			const { html } = await Content();
			return {
				title: post.data.title,
				description: post.data.description,
				link: `/${post.id}/`,
				guid: `${context.site}${post.id}/`,
				pubDate: post.data.date,
				author: post.data.author || 'Nikola Balić',
				categories: post.data.tags,
				content: html,
			};
		}),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		language: 'en-us',
		managingEditor: 'nikola@balic.co (Nikola Balić)',
		webMaster: 'nikola@balic.co (Nikola Balić)',
		copyright: `Copyright © ${new Date().getFullYear()} Nikola Balić`,
		lastBuildDate: new Date(),
		items,
	});
}
