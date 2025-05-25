import { a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
import { F as FadeIn } from '../chunks/FadeIn_F1MCr00k.mjs';
import { s as sortTags, f as formatTagForDisplay, A as AnimatedTag } from '../chunks/tagUtils_BKAYF56o.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const logEntries = await getCollection("log", ({ data }) => {
    return data.draft !== true;
  });
  const allTags = logEntries.flatMap((entry) => entry.data.tags || []);
  const uniqueTags = [...new Set(allTags)];
  const sortedTags = sortTags(uniqueTags);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Tags - nibzard", "description": "Browse content by tags." }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<section class="tags-header"> <h1>All Tags</h1> <p>Browse articles and logs by topic.</p> </section> ` })} ${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "delay": 0.1, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate`${sortedTags.length > 0 ? renderTemplate`<ul class="tags-list"> ${sortedTags.map((tag, index) => {
    const formattedTag = formatTagForDisplay(tag);
    return renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": 0.1 + index * 0.05, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate` <li class="tag-item"> ${renderComponent($$result4, "AnimatedTag", AnimatedTag, { "client:visible": true, "href": `/tags/${tag.toLowerCase()}`, "tagText": formattedTag, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/AnimatedTag.jsx", "client:component-export": "default" })} </li> ` })}`;
  })} </ul>` : renderTemplate`<p class="no-tags">No tags found yet. Add tags to your log entries to see them here.</p>`}` })} ` })}`;
}, "/Users/nikola/dev/nibzard/src/pages/tags/index.astro", void 0);

const $$file = "/Users/nikola/dev/nibzard/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
