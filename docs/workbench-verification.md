# Verify the workbench design

The shared stylesheet loads from BaseLayout.astro. The desktop and mobile navigation, article template, archives, projects, and utility pages use the same tokens.

## Local commands

1. Install the locked dependencies with `pnpm install --frozen-lockfile`.
2. Start the site with `pnpm run dev --host 127.0.0.1`.
3. Run `node tests/workbench.browser.mjs`. Set `PUPPETEER_EXECUTABLE_PATH` if Chrome is installed outside Puppeteer's cache.
4. Run `pnpm exec tsx --test tests/content-cache.test.ts`.
5. Stop the development server before the production build to avoid sharing Vite's cache.
6. Run `pnpm run build`.

On the shared preview machine, use `TINA_PORT=4401 TINA_DATALAYER_PORT=9401 TINA_SKIP_SEARCH_INDEX=1 pnpm run build`. The port variables avoid other services. The skip variable excludes only the remote Tina Cloud search upload, which needs credentials. Regular builds keep that upload enabled. The site's search uses its existing local Fuse index.

## Browser coverage

The browser test checks 21 routes at desktop and mobile widths. It covers overflow, image loading, runtime errors, keyboard access, theme persistence, search, article utilities, Markdown negotiation, missing routes, reduced motion, and visible content without JavaScript.

Subscription requests are intercepted with a simulated success response. No email is sent. This verifies the form behavior, not the email provider.

## Preview

The Tailscale hostname is allowed only as an explicit development host. The preview is private to the tailnet. The production deployment is separate from the local implementation.

## Results on September 11, 2026

- All 42 route and viewport checks passed.
- Keyboard access, theme persistence, search, article sharing, Markdown responses, 404 behavior, simulated subscription feedback, reduced motion, and content without JavaScript passed.
- Five content-cache tests passed.
- The homepage also fits a 320px viewport. The custom MDX article form fits a 390px viewport in dark appearance.
- The production build passed with the local-only Tina search upload skip. No production deployment or real subscription was performed.

The full preview runs at https://claude-code-vm.tailef8c96.ts.net:8443/ through `nibzard-web-preview.service`. Use `sudo systemctl stop nibzard-web-preview` before a local build and `sudo systemctl start nibzard-web-preview` afterward. Tailscale proxies port 8443 to the server on 127.0.0.1:4321. The homepage, article, projects, and image asset returned HTTP 200 over HTTPS.
