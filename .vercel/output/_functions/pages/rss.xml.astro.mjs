import rss from '@astrojs/rss';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
export { renderers } from '../renderers.mjs';

const SITE_TITLE = "nibzard";
const SITE_DESCRIPTION = "home of Nikola Balic";

async function GET(context) {
	const posts = await getCollection('log');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.id}/`,
		})),
	});
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
