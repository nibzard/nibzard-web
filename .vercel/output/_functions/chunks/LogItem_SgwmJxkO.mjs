import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, d as renderTemplate } from './astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { s as sortTags, f as formatTagForDisplay, A as AnimatedTag } from './tagUtils_BKAYF56o.mjs';
import { A as AnimatedTagsContainer } from './AnimatedTagsContainer_B0FKHM-P.mjs';
/* empty css                         */

const $$Astro = createAstro("https://nibzard.com");
const $$LogItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LogItem;
  const { entry, currentTag = "", maxTags = 3 } = Astro2.props;
  const entryTags = entry.data.tags || [];
  const sortedTags = sortTags(entryTags);
  const tagsToDisplay = sortedTags.slice(0, maxTags);
  return renderTemplate`${maybeRenderHead()}<li class="log-item" data-astro-cid-nytp5r3y>  <div class="log-item-meta" data-astro-cid-nytp5r3y> <p class="log-item-date" data-astro-cid-nytp5r3y> <time${addAttribute(entry.data.date.toISOString(), "datetime")} data-astro-cid-nytp5r3y> ${new Date(entry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </time> </p> ${tagsToDisplay.length > 0 && renderTemplate`<div class="tags-container" data-astro-cid-nytp5r3y> ${renderComponent($$result, "AnimatedTagsContainer", AnimatedTagsContainer, { "client:visible": true, "className": "tags", "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/AnimatedTagsContainer.jsx", "client:component-export": "default", "data-astro-cid-nytp5r3y": true }, { "default": ($$result2) => renderTemplate`${tagsToDisplay.map((tag) => {
    const formattedTag = formatTagForDisplay(tag);
    return renderTemplate`${renderComponent($$result2, "AnimatedTag", AnimatedTag, { "client:visible": true, "href": `/tags/${tag.toLowerCase()}`, "isActive": tag.toLowerCase() === currentTag.toLowerCase(), "tagText": formattedTag, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/AnimatedTag.jsx", "client:component-export": "default", "data-astro-cid-nytp5r3y": true })}`;
  })}` })} </div>`} </div>  <div class="log-item-header" data-astro-cid-nytp5r3y> <div class="log-item-title-container" data-astro-cid-nytp5r3y> <h2 class="log-item-title" data-astro-cid-nytp5r3y> <a${addAttribute(`/${entry.slug}`, "href")} data-astro-cid-nytp5r3y>${entry.data.title}</a> </h2> </div> ${entry.data.description && renderTemplate`<p class="log-item-description" data-astro-cid-nytp5r3y>${entry.data.description}</p>`} </div> </li>`;
}, "/Users/nikola/dev/nibzard/src/components/LogItem.astro", void 0);

export { $$LogItem as $ };
