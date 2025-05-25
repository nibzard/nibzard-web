import { c as createAstro, a as createComponent, d as renderTemplate, u as unescapeHTML, r as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bkk_Z3-I.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://nibzard.com");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const { searchParams } = new URL("https://nibzard.com" + Astro2.request.url);
  const initialQuery = searchParams.get("q") || "";
  const logEntries = await getCollection("log", ({ data }) => data.draft !== true);
  const thoughts = await getCollection("thoughts", ({ data }) => data.draft !== true);
  const nowEntries = await getCollection("now", ({ data }) => data.draft !== true);
  const imageEntries = await getCollection("images", ({ data }) => data.draft !== true);
  const s = (val, def = "") => val === null || typeof val === "undefined" ? def : String(val);
  const a = (val, def = []) => Array.isArray(val) ? val : def;
  const clientFeedEntries = [
    ...logEntries.map((entry) => ({
      type: "log",
      slug: s(entry.slug),
      date: entry.data.date.toISOString(),
      title: s(entry.data.title),
      tldr: s(entry.data.tldr),
      tags: a(entry.data.tags)
    })),
    ...thoughts.map((entry) => ({
      type: "thought",
      slug: s(entry.slug),
      date: entry.data.date.toISOString(),
      text: s(entry.data?.text),
      tags: a(entry.data?.tags)
    })),
    ...nowEntries.map((entry) => ({
      type: "now",
      slug: s(entry.slug),
      date: entry.data.date.toISOString(),
      title: s(entry.data?.title),
      text: s(entry.data?.text),
      tags: a(entry.data?.tags)
    })),
    ...imageEntries.map((entry) => ({
      type: "image",
      slug: s(entry.slug),
      date: entry.data.date.toISOString(),
      caption: s(entry.data?.caption),
      imageUrl: s(entry.data?.image?.src),
      tags: a(entry.data?.tags)
    }))
  ];
  let clientFeedEntriesJsonString = "";
  try {
    clientFeedEntriesJsonString = JSON.stringify(clientFeedEntries);
  } catch (e) {
    console.error("Error stringifying clientFeedEntries on server:", e);
    clientFeedEntriesJsonString = JSON.stringify([{ type: "error", message: "Could not serialize search data." }]);
  }
  return renderTemplate(_a || (_a = __template(["", ` <script type="module">
  import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.mjs';
  // @ts-nocheck

  // Define helper functions s and a in the client-side scope
  const s = (val, def = '') => (val === null || typeof val === 'undefined') ? def : String(val);
  const a = (val, def = []) => Array.isArray(val) ? val : def;

  document.addEventListener('DOMContentLoaded', () => {
    const feedTimeline = document.getElementById('feed-timeline');
    const searchInput = document.querySelector('.search-bar');
    const jsonDataScript = document.getElementById('fuse-feed-data');
    let clientFeedEntriesData = [];
    let rawJsonContent = '';

    if (jsonDataScript) {
      rawJsonContent = jsonDataScript.textContent;
      console.log('Attempting to parse JSON, raw textContent:', rawJsonContent);
      try {
        clientFeedEntriesData = JSON.parse(rawJsonContent);
        if (Array.isArray(clientFeedEntriesData) && clientFeedEntriesData.length === 1 && clientFeedEntriesData[0].type === 'error') {
          console.error('Search data serialization error from server:', clientFeedEntriesData[0].message);
          feedTimeline.innerHTML = \`<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: \${clientFeedEntriesData[0].message}</div>\`;
          return;
        }
      } catch (error) {
        console.error('Failed to parse JSON data:', error);
        console.error('Problematic JSON string was:', rawJsonContent);
        if (feedTimeline) feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: Could not load search data. Invalid format.</div>';
        return;
      }
    } else {
      console.error('Could not find JSON data script tag (fuse-feed-data).');
      if (feedTimeline) feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: Search data script element not found.</div>';
      return;
    }

    const initialQueryFromURL = new URLSearchParams(window.location.search).get('q') || '';

    if (searchInput && searchInput.value !== initialQueryFromURL) {
      searchInput.value = initialQueryFromURL;
    }

    function formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function renderFeed(entries) {
      if (!feedTimeline) return;
      if (!entries || !entries.length) {
        feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-text-muted);padding:2rem;">No results found.</div>';
        return;
      }
      feedTimeline.innerHTML = entries.map((item, index) => {
        const date = item.date ? formatDate(item.date) : 'Date N/A';
        let entryHtml = '';
        const itemTitle = s(item.title);
        const itemTldr = s(item.tldr);
        const itemText = s(item.text);
        const itemCaption = s(item.caption);
        const itemImageUrl = s(item.imageUrl);
        const itemSlug = s(item.slug, '#');

        switch (item.type) {
          case 'log':
            entryHtml = \`
              <article class="log-entry">
                <div class="entry-meta"><time>\${date}</time></div>
                <div class="log-entry-content">
                  <h2><a href="/\${itemSlug}">\${itemTitle}</a></h2>
                  \${itemTldr ? \`<p class="log-entry-tldr">\${itemTldr}</p>\` : ''}
                </div>
              </article>\`;
            break;
          case 'thought':
            entryHtml = \`
              <div class="thought-entry">
                <div class="entry-meta"><time>\${date}</time> Thought</div>
                <blockquote><a href="/\${itemSlug}">\${itemText}</a></blockquote>
              </div>\`;
            break;
          case 'now':
            entryHtml = \`
              <div class="now-entry">
                <div class="entry-meta"><time>\${date}</time> Now</div>
                <div>\${itemTitle || itemText}</div>
              </div>\`;
            break;
          case 'image':
            entryHtml = \`
              <div class="image-entry">
                <div class="entry-meta"><time>\${date}</time> Image</div>
                <div>
                  \${itemImageUrl ? \`<img src="\${itemImageUrl}" alt="\${itemCaption || 'Search result image'}" style="max-width: 100%; border-radius: var(--border-radius); margin-bottom: var(--space-sm);"/>\` : ''}
                  <p>\${itemCaption}</p>
                </div>
              </div>\`;
            break;
        }
        return entryHtml;
      }).join('');
    }

    const fuse = new Fuse(clientFeedEntriesData, {
      keys: [
        'title', 'tldr', 'tags', 'text', 'caption', 'slug', 'imageUrl'
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    function doSearch(query) {
      if (!query) {
        renderFeed(clientFeedEntriesData);
        return;
      }
      const results = fuse.search(query).map(r => r.item);
      renderFeed(results);
    }

    if (searchInput) {
      doSearch(initialQueryFromURL);
      searchInput.addEventListener('input', (e) => {
        doSearch(e.target.value.trim());
      });
    } else {
        console.error('Search input not found on the page.');
    }
  });
</script> <script type="application/json" id="fuse-feed-data">`, "</script>"], ["", ` <script type="module">
  import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.mjs';
  // @ts-nocheck

  // Define helper functions s and a in the client-side scope
  const s = (val, def = '') => (val === null || typeof val === 'undefined') ? def : String(val);
  const a = (val, def = []) => Array.isArray(val) ? val : def;

  document.addEventListener('DOMContentLoaded', () => {
    const feedTimeline = document.getElementById('feed-timeline');
    const searchInput = document.querySelector('.search-bar');
    const jsonDataScript = document.getElementById('fuse-feed-data');
    let clientFeedEntriesData = [];
    let rawJsonContent = '';

    if (jsonDataScript) {
      rawJsonContent = jsonDataScript.textContent;
      console.log('Attempting to parse JSON, raw textContent:', rawJsonContent);
      try {
        clientFeedEntriesData = JSON.parse(rawJsonContent);
        if (Array.isArray(clientFeedEntriesData) && clientFeedEntriesData.length === 1 && clientFeedEntriesData[0].type === 'error') {
          console.error('Search data serialization error from server:', clientFeedEntriesData[0].message);
          feedTimeline.innerHTML = \\\`<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: \\\${clientFeedEntriesData[0].message}</div>\\\`;
          return;
        }
      } catch (error) {
        console.error('Failed to parse JSON data:', error);
        console.error('Problematic JSON string was:', rawJsonContent);
        if (feedTimeline) feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: Could not load search data. Invalid format.</div>';
        return;
      }
    } else {
      console.error('Could not find JSON data script tag (fuse-feed-data).');
      if (feedTimeline) feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-error);padding:2rem;">Error: Search data script element not found.</div>';
      return;
    }

    const initialQueryFromURL = new URLSearchParams(window.location.search).get('q') || '';

    if (searchInput && searchInput.value !== initialQueryFromURL) {
      searchInput.value = initialQueryFromURL;
    }

    function formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function renderFeed(entries) {
      if (!feedTimeline) return;
      if (!entries || !entries.length) {
        feedTimeline.innerHTML = '<div style="text-align:center;color:var(--color-text-muted);padding:2rem;">No results found.</div>';
        return;
      }
      feedTimeline.innerHTML = entries.map((item, index) => {
        const date = item.date ? formatDate(item.date) : 'Date N/A';
        let entryHtml = '';
        const itemTitle = s(item.title);
        const itemTldr = s(item.tldr);
        const itemText = s(item.text);
        const itemCaption = s(item.caption);
        const itemImageUrl = s(item.imageUrl);
        const itemSlug = s(item.slug, '#');

        switch (item.type) {
          case 'log':
            entryHtml = \\\`
              <article class="log-entry">
                <div class="entry-meta"><time>\\\${date}</time></div>
                <div class="log-entry-content">
                  <h2><a href="/\\\${itemSlug}">\\\${itemTitle}</a></h2>
                  \\\${itemTldr ? \\\`<p class="log-entry-tldr">\\\${itemTldr}</p>\\\` : ''}
                </div>
              </article>\\\`;
            break;
          case 'thought':
            entryHtml = \\\`
              <div class="thought-entry">
                <div class="entry-meta"><time>\\\${date}</time> Thought</div>
                <blockquote><a href="/\\\${itemSlug}">\\\${itemText}</a></blockquote>
              </div>\\\`;
            break;
          case 'now':
            entryHtml = \\\`
              <div class="now-entry">
                <div class="entry-meta"><time>\\\${date}</time> Now</div>
                <div>\\\${itemTitle || itemText}</div>
              </div>\\\`;
            break;
          case 'image':
            entryHtml = \\\`
              <div class="image-entry">
                <div class="entry-meta"><time>\\\${date}</time> Image</div>
                <div>
                  \\\${itemImageUrl ? \\\`<img src="\\\${itemImageUrl}" alt="\\\${itemCaption || 'Search result image'}" style="max-width: 100%; border-radius: var(--border-radius); margin-bottom: var(--space-sm);"/>\\\` : ''}
                  <p>\\\${itemCaption}</p>
                </div>
              </div>\\\`;
            break;
        }
        return entryHtml;
      }).join('');
    }

    const fuse = new Fuse(clientFeedEntriesData, {
      keys: [
        'title', 'tldr', 'tags', 'text', 'caption', 'slug', 'imageUrl'
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    function doSearch(query) {
      if (!query) {
        renderFeed(clientFeedEntriesData);
        return;
      }
      const results = fuse.search(query).map(r => r.item);
      renderFeed(results);
    }

    if (searchInput) {
      doSearch(initialQueryFromURL);
      searchInput.addEventListener('input', (e) => {
        doSearch(e.target.value.trim());
      });
    } else {
        console.error('Search input not found on the page.');
    }
  });
</script> <script type="application/json" id="fuse-feed-data">`, "</script>"])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Search Results for "${initialQuery}" | nibzard`, "description": `Search results for "${initialQuery}" on nibzard.` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="search-page-container"> <h1>Search</h1> <form id="search-form" class="form-group" action="/search" method="get" style="margin-bottom: var(--space-lg); display: flex; align-items: center; width: 100%; margin-left: calc(-1 * var(--space-xl)); margin-right: calc(-1 * var(--space-xl)); padding-left: var(--space-xl); padding-right: var(--space-xl);"> <input class="form-input search-bar" type="text" name="q" id="search-input"${addAttribute(initialQuery, "value")} placeholder="Search..." autocomplete="off" style="flex-grow: 1; margin-right: var(--space-sm);"> <button type="submit" class="button-primary">Search</button> </form> <div id="feed-timeline" class="feed-timeline" style="min-height: 200px;">  </div> </div> ` }), unescapeHTML(clientFeedEntriesJsonString));
}, "/Users/nikola/dev/nibzard/src/pages/search.astro", void 0);
const $$file = "/Users/nikola/dev/nibzard/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
