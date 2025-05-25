import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, d as renderTemplate, j as renderScript, F as Fragment } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
import { F as FadeIn } from '../chunks/FadeIn_F1MCr00k.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
import { g as getTagColors } from '../chunks/tagColors_CMoIAJx5.mjs';
/* empty css                                 */
import { $ as $$NewsletterSubscribe } from '../chunks/NewsletterSubscribe_QPROna5i.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://nibzard.com");
const $$ThoughtRenderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ThoughtRenderer;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${maybeRenderHead()}<div class="thought-item" data-astro-cid-cfsugyho> <div class="entry-meta" data-astro-cid-cfsugyho> <time${addAttribute(entry.data.date.toISOString(), "datetime")} data-astro-cid-cfsugyho> ${new Date(entry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} </time> <span class="entry-type" data-astro-cid-cfsugyho>Thought</span> </div> <div class="thought-content" data-astro-cid-cfsugyho> <blockquote data-astro-cid-cfsugyho> ${renderComponent($$result, "Content", Content, { "data-astro-cid-cfsugyho": true })} </blockquote> </div> </div> `;
}, "/Users/nikola/dev/nibzard/src/components/ThoughtRenderer.astro", void 0);

const $$Astro$1 = createAstro("https://nibzard.com");
const $$NowItemRenderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NowItemRenderer;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${maybeRenderHead()}<div class="now-item" data-astro-cid-2khzxbwj> <div class="entry-meta" data-astro-cid-2khzxbwj> <time${addAttribute(entry.data.date.toISOString(), "datetime")} data-astro-cid-2khzxbwj> ${new Date(entry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} </time> <span class="entry-type" data-astro-cid-2khzxbwj>Now</span> </div> <div class="now-item-content" data-astro-cid-2khzxbwj> ${renderComponent($$result, "Content", Content, { "data-astro-cid-2khzxbwj": true })} </div> </div> `;
}, "/Users/nikola/dev/nibzard/src/components/NowItemRenderer.astro", void 0);

const $$Astro = createAstro("https://nibzard.com");
const $$ImageRenderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ImageRenderer;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${maybeRenderHead()}<div class="image-item" data-astro-cid-whty24ux> <div class="entry-meta" data-astro-cid-whty24ux> <time${addAttribute(entry.data.date.toISOString(), "datetime")} data-astro-cid-whty24ux> ${new Date(entry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} </time> </div> <div class="image-content" data-astro-cid-whty24ux> <img${addAttribute(entry.data.imageUrl, "src")} alt="" class="image-display" data-astro-cid-whty24ux> <div class="image-description" data-astro-cid-whty24ux> ${renderComponent($$result, "Content", Content, { "data-astro-cid-whty24ux": true })} </div> </div> </div> `;
}, "/Users/nikola/dev/nibzard/src/components/ImageRenderer.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const logEntries = await getCollection("log", ({ data }) => {
    return data.draft !== true;
  });
  logEntries.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  const thoughts = await getCollection("thoughts", ({ data }) => {
    return data.draft !== true;
  });
  thoughts.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  const nowEntries = await getCollection("now", ({ data }) => {
    return data.draft !== true;
  });
  nowEntries.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  const imageEntries = await getCollection("images", ({ data }) => {
    return data.draft !== true;
  });
  imageEntries.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  const feedEntries = [];
  const totalEntries = logEntries.length + thoughts.length + nowEntries.length + imageEntries.length;
  let logIndex = 0;
  let thoughtIndex = 0;
  let nowIndex = 0;
  let imageIndex = 0;
  function getDateValue(date) {
    return date ? date.valueOf() : 0;
  }
  while (feedEntries.length < 20 && feedEntries.length < totalEntries) {
    const nextLogDate = logIndex < logEntries.length ? logEntries[logIndex].data.date : null;
    const nextThoughtDate = thoughtIndex < thoughts.length ? thoughts[thoughtIndex].data.date : null;
    const nextNowDate = nowIndex < nowEntries.length ? nowEntries[nowIndex].data.date : null;
    const nextImageDate = imageIndex < imageEntries.length ? imageEntries[imageIndex].data.date : null;
    let mostRecentType = null;
    let mostRecentValue = 0;
    const logDateValue = getDateValue(nextLogDate);
    if (logDateValue > mostRecentValue) {
      mostRecentType = "log";
      mostRecentValue = logDateValue;
    }
    const thoughtDateValue = getDateValue(nextThoughtDate);
    if (thoughtDateValue > mostRecentValue) {
      mostRecentType = "thought";
      mostRecentValue = thoughtDateValue;
    }
    const nowDateValue = getDateValue(nextNowDate);
    if (nowDateValue > mostRecentValue) {
      mostRecentType = "now";
      mostRecentValue = nowDateValue;
    }
    const imageDateValue = getDateValue(nextImageDate);
    if (imageDateValue > mostRecentValue) {
      mostRecentType = "image";
      mostRecentValue = imageDateValue;
    }
    if (mostRecentType === "log") {
      feedEntries.push({ type: "log", entry: logEntries[logIndex] });
      logIndex++;
    } else if (mostRecentType === "thought") {
      feedEntries.push({ type: "thought", entry: thoughts[thoughtIndex] });
      thoughtIndex++;
    } else if (mostRecentType === "now") {
      feedEntries.push({ type: "now", entry: nowEntries[nowIndex] });
      nowIndex++;
    } else if (mostRecentType === "image") {
      feedEntries.push({ type: "image", entry: imageEntries[imageIndex] });
      imageIndex++;
    } else {
      break;
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "nibzard - Home", "description": "Welcome to nibzard, a minimal personal website and log." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form class="search-bar-container form-group" action="/search" method="get" style="margin-bottom: var(--space-lg); display: flex; align-items: center; width: 100%; margin-left: calc(-1 * var(--space-xl)); margin-right: calc(-1 * var(--space-xl)); padding-left: var(--space-xl); padding-right: var(--space-xl);"> <input class="form-input search-bar" type="text" name="q" placeholder="Search..." autocomplete="off" style="flex-grow: 1; margin-right: var(--space-sm);"> <button type="submit" class="button-primary">Search</button> </form> <div class="feed-timeline"> ${feedEntries.map((item, index) => {
    const showNewsletter = index === 10;
    return renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${item.type === "thought" ? renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": index * 0.01, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "ThoughtRenderer", $$ThoughtRenderer, { "entry": item.entry })} ` })}` : item.type === "now" ? renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": index * 0.01, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "NowItemRenderer", $$NowItemRenderer, { "entry": item.entry })} ` })}` : item.type === "image" ? renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": index * 0.01, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate` <div class="image-container"> ${renderComponent($$result4, "ImageRenderer", $$ImageRenderer, { "entry": item.entry })} </div> ` })}` : renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": index * 0.01, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate`${(() => {
      const logEntry = item.entry;
      const firstTag = "tags" in logEntry.data ? logEntry.data.tags?.[0] || null : null;
      const tagColor = firstTag ? getTagColors(firstTag) : null;
      const borderStyle = tagColor ? `border-left-color: ${tagColor.borderColor}` : "";
      return renderTemplate`<article class="log-entry"${addAttribute(borderStyle, "style")}> <div class="entry-meta"> <time${addAttribute(logEntry.data.date.toISOString(), "datetime")}> ${new Date(logEntry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} </time> <div class="entry-tags"> ${"tags" in logEntry.data && logEntry.data.tags && logEntry.data.tags.length > 0 && renderTemplate`<div class="tag-container"> ${logEntry.data.tags.map((tag) => {
        const colors = getTagColors(tag);
        const tagStyle = colors ? `background-color: ${colors.backgroundColor}; color: ${colors.textColor}; border-color: ${colors.borderColor}` : "";
        return renderTemplate`<a${addAttribute(`/tags/${tag.toLowerCase()}`, "href")} class="tag"${addAttribute(tagStyle, "style")}> ${tag} </a>`;
      })} </div>`} </div> </div> <div class="log-entry-content"> <h2> <a${addAttribute(`/${logEntry.slug}`, "href")}>${"title" in logEntry.data ? logEntry.data.title : "Log Entry"}</a> </h2> ${"tldr" in logEntry.data && logEntry.data.tldr && renderTemplate`<p class="log-entry-tldr">${logEntry.data.tldr}</p>`} </div> </article>`;
    })()}` })}`}${showNewsletter && renderTemplate`${renderComponent($$result3, "FadeIn", FadeIn, { "client:visible": true, "delay": 0, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result4) => renderTemplate` <div class="newsletter-section"> ${renderComponent($$result4, "NewsletterSubscribe", $$NewsletterSubscribe, { "title": "Stay Updated", "description": "Subscribe to receive the latest updates and articles directly in your inbox.", "showButton": true })} </div> ` })}`}` })}`;
  })} </div> ${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "delay": 0, "yOffset": 5, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="newsletter-section"> ${renderComponent($$result3, "NewsletterSubscribe", $$NewsletterSubscribe, { "title": "Stay Updated", "description": "Subscribe to receive the latest updates and articles directly in your inbox.", "showButton": true })} </div> ` })} ` })} ${renderScript($$result, "/Users/nikola/dev/nibzard/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/nikola/dev/nibzard/src/pages/index.astro", void 0);

const $$file = "/Users/nikola/dev/nibzard/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
