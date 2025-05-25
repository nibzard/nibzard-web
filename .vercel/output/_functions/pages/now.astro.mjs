import { c as createAstro, a as createComponent, m as maybeRenderHead, f as renderSlot, b as addAttribute, d as renderTemplate, r as renderComponent } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
import { F as FadeIn } from '../chunks/FadeIn_F1MCr00k.mjs';
import 'clsx';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://nibzard.com");
const $$NowEntry = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NowEntry;
  const { entry } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="now-entry" data-astro-cid-q2ndsl22> <h1 data-astro-cid-q2ndsl22>What I'm Currently Focused On</h1> <p data-astro-cid-q2ndsl22>This is a now page, and if you have your own site, <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" data-astro-cid-q2ndsl22>you should make one,</a> too.</p> <div class="now-content" data-astro-cid-q2ndsl22> ${renderSlot($$result, $$slots["default"])} </div> <div class="now-meta" data-astro-cid-q2ndsl22> <p class="now-updated" data-astro-cid-q2ndsl22>
Last updated: <time${addAttribute(entry.data.date.toISOString(), "datetime")} data-astro-cid-q2ndsl22> ${new Date(entry.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </time> </p> </div> </div> `;
}, "/Users/nikola/dev/nibzard/src/components/NowEntry.astro", void 0);

const $$Now = createComponent(async ($$result, $$props, $$slots) => {
  const nowEntries = await getCollection("now", ({ data }) => {
    return data.draft !== true;
  });
  nowEntries.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  const latestEntry = nowEntries.length > 0 ? nowEntries[0] : null;
  let Content;
  if (latestEntry) {
    const rendered = await latestEntry.render();
    Content = rendered.Content;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Now - nibzard", "description": "What I'm currently focused on." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<section> ${latestEntry ? renderTemplate`${renderComponent($$result3, "NowEntry", $$NowEntry, { "entry": latestEntry }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Content", Content, {})} ` })}` : renderTemplate`<div> <h1>Now</h1> <p>No updates available at the moment. Check back soon!</p> </div>`} </section> ` })} ` })}`;
}, "/Users/nikola/dev/nibzard/src/pages/now.astro", void 0);

const $$file = "/Users/nikola/dev/nibzard/src/pages/now.astro";
const $$url = "/now";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Now,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
