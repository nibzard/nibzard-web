import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Bf8Ar9Xh.mjs';
import { manifest } from './manifest_pjdOEZVY.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/subscribe.astro.mjs');
const _page4 = () => import('./pages/elements.astro.mjs');
const _page5 = () => import('./pages/log.astro.mjs');
const _page6 = () => import('./pages/log/_---slug_.astro.mjs');
const _page7 = () => import('./pages/now.astro.mjs');
const _page8 = () => import('./pages/rss.xml.astro.mjs');
const _page9 = () => import('./pages/search.astro.mjs');
const _page10 = () => import('./pages/tags/_tag_.astro.mjs');
const _page11 = () => import('./pages/tags.astro.mjs');
const _page12 = () => import('./pages/unsubscribe.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const _page14 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.0_@types+node@22.15.21_less@4.3.0_rollup@4.41.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.8.0_@types+node@22.15.21_less@4.3.0_rollup@4.41.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/subscribe.ts", _page3],
    ["src/pages/elements.astro", _page4],
    ["src/pages/log/index.astro", _page5],
    ["src/pages/log/[...slug].astro", _page6],
    ["src/pages/now.astro", _page7],
    ["src/pages/rss.xml.js", _page8],
    ["src/pages/search.astro", _page9],
    ["src/pages/tags/[tag].astro", _page10],
    ["src/pages/tags/index.astro", _page11],
    ["src/pages/unsubscribe.astro", _page12],
    ["src/pages/index.astro", _page13],
    ["src/pages/[...slug].astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_astro-internal_actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "72e0c116-fb95-43a5-b76e-8c913966487d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
