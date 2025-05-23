import { visit } from 'unist-util-visit';

export default function rehypeExternalLinks(options = {}) {
  const { target = '_blank', rel = ['noopener', 'noreferrer'], domain = '', utmSource = 'nibzard.com' } = options;

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        const linkUrl = String(node.properties.href);
        let isExternal = false;

        if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
          try {
            const url = new URL(linkUrl);
            if (domain && url.hostname === domain) {
              // Internal link to the same domain specified in options
              isExternal = false;
            } else if (!domain && typeof window !== 'undefined' && url.hostname === window.location.hostname) {
              // Internal link to the current host (less reliable during build)
              // This part might not be fully effective during SSR/build as window.location.hostname might not be what you expect.
              // It's safer to rely on the 'domain' option.
              isExternal = false;
            } else if (domain && url.hostname !== domain) {
               isExternal = true;
            } else if (!linkUrl.startsWith('/') && !linkUrl.startsWith('#') && !linkUrl.startsWith('mailto:') && !linkUrl.startsWith('tel:')) {
              // Fallback: if no domain is set, consider http/https links not matching window.location.hostname as external
              // or any link that doesn't start with /, #, mailto:, tel:
              // This logic might need refinement based on how your site's internal links are structured.
              // A common case is that window.location.hostname is not available or correct at build time.
              // So we assume if a domain is NOT provided, and it starts with http, it's external unless it's the same as the build-time host.
              // For nibzard.com, we'll rely on the domain option primarily.
              isExternal = true; // Default to external if unsure without a domain
            }
          } catch (e) {
            console.error(`Invalid URL encountered in rehype plugin: ${linkUrl}`, e);
            return; // Skip malformed URLs
          }
        } else if (!linkUrl.startsWith('/') && !linkUrl.startsWith('#') && !linkUrl.startsWith('mailto:') && !linkUrl.startsWith('tel:')) {
          // Relative paths that are not root-relative or fragments are often external or require base URL.
          // However, without more context (like a base URL from Astro config), this is a heuristic.
          // For now, we will NOT treat these as external by default to avoid breaking relative in-site links.
          // The user should configure the `domain` option for robust external link detection.
        }


        if (isExternal) {
          node.properties.target = target;
          node.properties.rel = Array.isArray(rel) ? rel.join(' ') : rel;

          if (utmSource) {
            try {
              const url = new URL(linkUrl);
              url.searchParams.append('utm_source', utmSource);
              node.properties.href = url.toString();
            } catch (e) {
              console.error(`Failed to append UTM source to ${linkUrl}`, e);
            }
          }
        }
      }
    });
  };
}