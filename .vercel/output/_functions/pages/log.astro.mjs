import { a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
import { F as FadeIn } from '../chunks/FadeIn_F1MCr00k.mjs';
import { $ as $$LogItem } from '../chunks/LogItem_SgwmJxkO.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const logEntries = await getCollection("log", ({ data }) => {
    return data.draft !== true;
  });
  logEntries.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Log - nibzard", "description": "A collection of thoughts, updates, and project logs." }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<section class="log-header"> <h1>Log</h1> <p>Chronicles of development, ideas, and musings.</p> </section> ` })} <ul class="log-list"> ${logEntries.length === 0 && renderTemplate`<p>No log entries yet. Stay tuned!</p>`} ${logEntries.map((entry, index) => renderTemplate`${renderComponent($$result2, "FadeIn", FadeIn, { "client:visible": true, "delay": 0.05 * index, "client:component-hydration": "visible", "client:component-path": "/Users/nikola/dev/nibzard/src/components/animations/FadeIn.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "LogItem", $$LogItem, { "entry": entry })} ` })}`)} </ul> ` })}`;
}, "/Users/nikola/dev/nibzard/src/pages/log/index.astro", void 0);

const $$file = "/Users/nikola/dev/nibzard/src/pages/log/index.astro";
const $$url = "/log";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
