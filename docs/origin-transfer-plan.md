# Reduce Nibzard's Vercel origin transfer

Investigated and RSS fix deployed 2026-09-09. The optional Cloudflare rule and broader page changes remain deferred.

## Recommendation

Keep the current hosting arrangement. First generate RSS at build time on Vercel. Then optionally cache that feed at Cloudflare. Measure the improvement before changing article rendering or moving hosting.

## Deployment result

- Full local `pnpm run build` and Vercel production build passed.
- Promoted deployment `dpl_B3snHZaBzrLHuLhP6nTMkRRjQepN` to the live domains.
- Live `https://www.nibzard.com/rss.xml` returns HTTP 200, `x-vercel-cache: HIT`, and `Cache-Control: public, max-age=300, s-maxage=3600`.
- Conditional GET through Cloudflare returns 304. All 81 feed entries match the pre-change production feed exactly.
- Candidate checks confirmed article HTML/Markdown and page-two pagination still respond successfully.
- Cloudflare remains `DYNAMIC`; the feed is now served from Vercel static storage without the RSS render-function route.
- No Cloudflare rules were changed.

## Evidence

Cloudflare GraphQL analytics for nibzard.com:

| Period / metric | Reported value |
| --- | ---: |
| Aug 10–Sep 8, requests | 254,895 |
| Aug 10–Sep 8, response bytes | 18,537,318,558 (18.54 GB) |
| Bytes served from Cloudflare cache | 1,404,361,718 (7.6%) |
| Requests served from Cloudflare cache | 45,981 (18.0%) |
| Sep 8, all response bytes | 601,570,056 |
| Sep 8, RSS response bytes | 499,782,566 (83.1% of site bytes) |
| Sep 8, RSS requests | 1,317 |
| Sep 8, RSS cache status | All reported as dynamic |

Daily totals came from `httpRequests1dGroups`; route and user-agent breakdowns came from `httpRequestsAdaptiveGroups` and may be sampled estimates. These are Cloudflare edge metrics, not Vercel Fast Origin Transfer accounting. Vercel's exact team/project attribution remains unavailable: CLI billing returned 404, and grouped observability metrics required Observability Plus.

The RSS user-agent breakdown includes FreshRSS, NetNewsWire, Feedbin, Toy-Studio-Feed-Aggregator, and others. User-agent strings are self-reported. The evidence is consistent with routine feed polling repeatedly downloading a large response; it does not establish an attack.

Live RSS is 1,632,003 bytes decoded / approximately 355,603 bytes with gzip. Repeated requests return `cf-cache-status: DYNAMIC`, `x-vercel-cache: MISS`, and `Cache-Control: public, max-age=0, must-revalidate`.

Wrangler's existing OAuth login can read the Free-plan zone, analytics, and Worker routes (none attached). Cache Rules, Page Rules, and zone settings return 403. The installed project CLI works through `node node_modules/wrangler/bin/wrangler.js`; no global Wrangler executable is on PATH.

## First change: static RSS

1. Add `export const prerender = true;` to `src/pages/rss.xml.js`. Keep server output for the rest of the app. RSS is derived entirely from build-time content and does not need a function on each poll.
2. Preserve full article content and the current feed items initially. Reducing the archive is an optional later optimization, not necessary to stop RSS function invocations.
3. Add a route-specific header for `/rss.xml` in `vercel.json`: `Cache-Control: public, max-age=300, s-maxage=3600`. This allows a five-minute browser/feed-client freshness period and one-hour shared-cache freshness. Cloudflare still needs cache eligibility configured separately.
4. Keep the feed stable between deployments; its current `lastBuildDate: new Date()` becomes a build timestamp instead of changing on every request. Use the static platform's validators, checking ETag and conditional requests after deployment.

Vercel serves prerendered files without invoking Astro middleware or the rendering function. This eliminates RSS's per-request function transfer even when Cloudflare forwards a request or a reader accesses a Vercel alias directly. [Astro Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/), [Vercel static caching](https://vercel.com/docs/caching/cdn-cache).

## Optional second change: narrow Cloudflare feed cache

After inspecting existing rules with credentials that can read them, add a rule restricted to `www.nibzard.com`, path `/rss.xml`, and GET/HEAD. Make it cache eligible, preserve query strings, and use a one-hour edge TTL for successful feed responses. Do not force-cache errors or responses with private/session data. Preserve appropriate origin validators and the browser TTL.

This further reduces traffic reaching Vercel. If one-hour publishing delay is undesirable, purge this URL after successful production deployments. Changing rules requires Cache Rules permissions; the current Wrangler login does not provide them. No extra credential is needed for the Vercel-side RSS fix.

## Follow-up only if usage remains material

- Prerender uncomplicated public pages such as the log index, about, bio, and projects after checking their layouts for request-dependent behavior.
- Cache successful public SSR responses on Vercel with explicit shared-cache lifetimes. Preserve `?page=` pagination and search queries. Bypass newsletter APIs, Astro actions, unsubscribe, authenticated requests, responses setting cookies, and errors.
- Before caching negotiated content, fix response variation consistently. The middleware chooses output using `Accept`, `User-Agent`, and `Sec-Fetch-Dest`; Markdown currently declares only `Accept, Accept-Encoding`, and live HTML lacks the full variation declaration. Apply the same complete variation policy to both formats and verify alternating requests cannot reuse the wrong representation. Raw user-agent variation can fragment caches, so measure its effectiveness.
- Do not simply prerender all article routes: static Vercel routes bypass request-time Astro middleware and would lose the current same-URL Markdown negotiation. A later static architecture would need explicit Markdown routes plus routing for negotiated requests.

Cloudflare now documents configurable Vary support on all plans; assumptions from older documentation that Free never supports it are outdated. Enabling it still requires correct headers and settings. `Accept` normalization can remove quality values used by this application's negotiation, so do not enable it without compatibility testing. [Cloudflare Vary](https://developers.cloudflare.com/cache/concepts/vary/), [Vercel CDN caching](https://vercel.com/docs/caching/cdn-cache).

## Validation and rollout

1. Use Node 24 and the standalone pnpm launcher as recorded in LESSONS_LEARNED.md. Run the required `pnpm run build`.
2. Verify `.vercel/output/static/rss.xml` exists, parses as XML, retains published entries and full content, and excludes drafts.
3. Test a preview deployment for RSS 200, consistent body and validators, repeated Vercel cache HIT, and conditional GET behavior. Confirm article HTML/Markdown and pagination remain intact; do not submit real newsletter actions as a test.
4. Deploy only the reviewed changes. This checkout contains unrelated untracked article drafts and existing edits; isolate the patch from those files.
5. Verify production after deployment. If Cloudflare caching is added, verify `cf-cache-status: HIT` on subsequent requests too.
6. Compare RSS function invocations and daily usage over 24–48 hours. Existing rolling-window usage will not disappear immediately; do not promise that this change resets the exhausted quota.

Rollback: revert the small RSS/header patch and redeploy; disable the specific Cloudflare rule if added. No hosting migration, global cache override, feed-content reduction, or paid-plan upgrade is required by this proposal.
