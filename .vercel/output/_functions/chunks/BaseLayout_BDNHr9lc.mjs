import { c as createAstro, a as createComponent, b as addAttribute, d as renderTemplate, s as spreadAttributes, u as unescapeHTML, r as renderComponent, m as maybeRenderHead, p as renderHead, f as renderSlot } from './astro/server_lwrFDKto.mjs';
import 'kleur/colors';
/* empty css                          */
import 'clsx';

const $$Astro$8 = createAstro("https://nibzard.com");
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$7 = createAstro("https://nibzard.com");
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$6 = createAstro("https://nibzard.com");
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$5 = createAstro("https://nibzard.com");
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$4 = createAstro("https://nibzard.com");
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$3 = createAstro("https://nibzard.com");
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$2 = createAstro("https://nibzard.com");
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$1 = createAstro("https://nibzard.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  const baseUrl = Astro2.site ?? Astro2.url;
  const defaultCanonicalUrl = new URL(Astro2.url.pathname + Astro2.url.search, baseUrl);
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || defaultCanonicalUrl.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "/Users/nikola/dev/nibzard/node_modules/.pnpm/astro-seo@0.8.4_prettier@3.5.3_typescript@5.8.3/node_modules/astro-seo/src/SEO.astro", void 0);

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="site-nav" data-astro-cid-pux6a34n> <ul data-astro-cid-pux6a34n> <li data-astro-cid-pux6a34n><a href="/" aria-label="Home" data-astro-cid-pux6a34n>~/</a></li> <li data-astro-cid-pux6a34n><a href="/log" aria-label="Log" data-astro-cid-pux6a34n>log</a></li> <li data-astro-cid-pux6a34n><a href="/about" aria-label="About" data-astro-cid-pux6a34n>about</a></li> <li data-astro-cid-pux6a34n><a href="/now" aria-label="Now" data-astro-cid-pux6a34n>now</a></li> </ul> </nav> `;
}, "/Users/nikola/dev/nibzard/src/components/Navigation.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="site-header full-width" data-astro-cid-3ef6ksr2> <div class="inner-container header-content" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2> <span class="accent1" data-astro-cid-3ef6ksr2>n</span>ibzard
</a> ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-3ef6ksr2": true })} </div> </header> `;
}, "/Users/nikola/dev/nibzard/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="full-width" data-astro-cid-sz7xmlte> <div class="inner-container footer-content" data-astro-cid-sz7xmlte> <div class="ascii-divider" data-astro-cid-sz7xmlte>+-+-+</div> <div class="footer-main" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} <span class="monospace" data-astro-cid-sz7xmlte>n<span class="accent1" data-astro-cid-sz7xmlte>i</span>bzard</span></p> <div class="footer-links" data-astro-cid-sz7xmlte> <a href="/log" data-astro-cid-sz7xmlte>Log</a> <a href="/about" data-astro-cid-sz7xmlte>About</a> <a href="/elements" data-astro-cid-sz7xmlte>Elements</a> </div> </div> </div> </footer> `;
}, "/Users/nikola/dev/nibzard/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://nibzard.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "nibzard",
    description = "A minimal personal website and log."
  } = Astro2.props;
  const canonicalUrl = Astro2.url.toString();
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "canonical": canonicalUrl, "openGraph": {
    basic: {
      title,
      type: "website",
      image: "/og-nibzard.jpeg",
      url: canonicalUrl
    },
    optional: {
      siteName: "nibzard"
    }
  }, "twitter": {
    creator: "@nibzard"
  }, "extend": {
    // astro-seo handles the title and description meta tags.
    // It can also handle the favicon if you provide it in the link array.
    link: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "sitemap", href: "/sitemap-index.xml" }
    ],
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "charset", content: "UTF-8" }
    ]
  } })}<!-- Import Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"><!-- View Transitions --><meta name="view-transition" content="same-origin">${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main class="content-container"> ${renderSlot($$result, $$slots["default"])} <!-- Page content will be injected here --> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/nikola/dev/nibzard/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
