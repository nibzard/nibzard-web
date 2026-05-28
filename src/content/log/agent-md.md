---
title: "Serve Markdown to Agents, HTML to Humans"
description: "A copy-paste recipe for content negotiation that gives AI agents clean markdown while browsers keep getting HTML."
tldr: "Same source, two channels. One middleware file parses Accept headers, falls back to UA sniffing for known bots, and respects sec-fetch-dest as a browser safeguard. HTML keeps a Link rel=alternate header so agents can discover the markdown variant. Plus llms.txt and llms-full.txt as prerendered static files. About 500 lines total."
date: 2026-05-28
tags: [AGENTS, ASTRO, MARKDOWN, SEO, SLOP]
draft: false
author: "Nikola Balić"
topics: [Content negotiation, AI agent crawlers, llms.txt, Astro middleware, Markdown publishing]
entities: [Astro, Vercel, GPTBot, ClaudeBot, PerplexityBot, llms.txt]
answers_questions:
  - How do I serve clean markdown to AI agents without breaking my HTML site?
  - What is the right way to detect AI bots when Accept headers are unhelpful?
  - How do I implement HTTP content negotiation in Astro middleware?
  - What goes in llms.txt and llms-full.txt, and how do I serve them efficiently?
  - How do agents discover the markdown variant of a page?
---

AI agents are crawling your site. They render the HTML, throw away the nav and the footer and the cookie banner and the CSS, and keep the article body. You paid to send all of that. They paid to parse all of that. Both of you would rather skip it.

So give them markdown instead.

This is what I ship on this site. One middleware file, two prerendered static files, a small block in `vercel.json`. Stack is Astro on Vercel, but every piece moves cleanly to Next.js, SvelteKit, or anything else with request middleware.

## What you're building

Same source, two channels. A browser hits `/agent-md` and gets HTML. An agent hits `/agent-md` and gets markdown. The agent can also be explicit and hit `/agent-md.md` to force markdown. Either works.

The switchboard is HTTP content negotiation. Three signals decide which channel to use:

1. The `Accept` header (the standard mechanism)
2. The `User-Agent` (a fallback for bots that send `Accept: */*`)
3. The `sec-fetch-dest` header (a safety net so real browsers don't accidentally get markdown)

Behavior matrix you should be able to reproduce with `curl`:

| Request | Response |
| --- | --- |
| Browser `Accept: text/html` + `sec-fetch-dest: document` | HTML + `Link: rel=alternate` |
| `Accept: text/markdown` | markdown |
| `GPTBot`/`Claude-Web`/`Perplexity` UA + `Accept: */*` | markdown |
| Plain `curl`, no AI UA | HTML + `Link: rel=alternate` |
| Any `*.md` URL | markdown (hard override) |
| Reserved roots like `/about`, `/cv`, `/log/` | HTML, no Link header |

Now the five pieces.

## 1. The `.md` URL variants

For every content collection, register a markdown sibling URL. On this site:

- `/{slug}` → HTML, `/{slug}.md` → markdown (log posts)
- `/thoughts/{slug}`, `/thoughts/{slug}.md`
- `/idea/{slug}`, `/idea/{slug}.md`
- `/now`, `/now.md`

You do not need separate `.md.ts` route files for these. The middleware handles them. The `.md` suffix is a hard override: regardless of `Accept` headers or user agent, if the URL ends in `.md`, return markdown.

Agents get a stable URL they can fetch. Humans too, if they ever want to read the source. No header juggling, no UA guessing. Just append `.md`.

## 2. The middleware

This is where the work happens. `src/middleware.ts` has three jobs.

### (a) Parse `Accept` headers with q-values

`Accept: text/html;q=0.9, text/markdown;q=1.0` means "I prefer markdown." `Accept: text/html, text/markdown;q=0.5` means "I prefer HTML." Most middleware skips q-value parsing and just does `accept.includes('text/markdown')`, which gets this wrong.

Score each type by `(q, specificity, order)` where specificity is `exact > type/* > */*`. Then compare `text/markdown` against `text/html`:

```ts
function prefersMarkdownResponse(acceptHeader: string, isMdUrl: boolean, isAiAgentRequest: boolean): boolean {
  if (isMdUrl) return true;

  const parsedAccept = parseAcceptHeader(acceptHeader);

  if (isAiAgentRequest) {
    const hasOnlyWildcards = parsedAccept.length === 0 ||
      parsedAccept.every((entry) => entry.mediaType === '*/*');
    if (hasOnlyWildcards) return true;
  }

  if (parsedAccept.length === 0) return false;

  const markdownScore = scoreMediaType(parsedAccept, 'text/markdown');
  if (markdownScore.q <= 0) return false;

  const htmlScore = scoreMediaType(parsedAccept, 'text/html');

  if (htmlScore.q <= 0) return true;
  return markdownScore.q > htmlScore.q;
}
```

The full `parseAcceptHeader` and `scoreMediaType` helpers are about 60 lines. Standard q-value parser with a tiny specificity ranking on top.

### (b) UA fallback for bots that don't negotiate

Most agents send `Accept: */*` or nothing. They're not RFC purists. So when a known bot UA shows up with an unspecific `Accept`, override to markdown:

```ts
const AI_BOT_UA_PATTERN = /\b(GPTBot|ChatGPT-User|OAI-SearchBot|Claude-Web|ClaudeBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|CCBot|Bytespider|Applebot-Extended|Meta-ExternalAgent|Diffbot|cohere-ai|YouBot|Amazonbot|FacebookBot|DuckAssistBot|Kagibot)\b/i;
```

The pattern only kicks in when the bot sends `*/*` or no `Accept`. If the bot sends something specific, honor it. Lead with the standard mechanism; treat UA as a last-resort hint.

### (c) The browser safeguard

`sec-fetch-dest: document` is sent by every modern browser on top-level navigation. Agents and `curl` don't send it. If you see it, pass through to HTML even when the rest of the signals are ambiguous. Belt and suspenders so a human never accidentally lands on a wall of raw markdown.

```ts
const fetchDest = request.headers.get('sec-fetch-dest');
if (!isMdUrl && fetchDest === 'document') {
  return passThroughWithMarkdownAlternate(next, target, site);
}
```

### The full request flow

```
if path is asset/api/reserved → next()
target = resolveMarkdownTarget(path)         // null for reserved roots
if sec-fetch-dest === 'document' && !isMdUrl → passThroughWithLink(target)
if !prefersMarkdown(accept, isMdUrl, isBot) → passThroughWithLink(target)
if !target → next()
return buildMarkdownResponse(...)            // read file, prepend metadata, set headers
```

One small piece that matters: a `RESERVED_ROOT_SEGMENTS` set so paths like `/about`, `/cv`, `/projects`, `/log/`, `/tags/` don't get resolved as content slugs. Otherwise the regex `/^\/([^/]+)$/` will happily try to serve `/about` as a log post. Reserve those upfront.

## 3. The `Link: rel="alternate"` header

For HTML responses to paths that have a markdown sibling, append:

```
Link: <https://example.com/slug.md>; rel="alternate"; type="text/markdown"
Vary: Accept, User-Agent
```

This is how well-behaved agents discover the markdown variant without guessing the `.md` suffix. They request HTML, see the `Link` header, follow it.

Append, don't replace. Pages may already have a canonical `Link`:

```ts
const existingLink = response.headers.get('link');
response.headers.set('Link', existingLink ? `${existingLink}, ${alternateLink}` : alternateLink);
```

The `Vary` header is non-optional. If you negotiate based on `Accept` and `User-Agent` without telling caches, your CDN will serve the wrong variant to half your visitors. Add both headers to the `Vary` list.

## 4. The markdown payload

When you serve markdown, prepend an HTML-comment metadata block. Agents see provenance immediately without parsing YAML frontmatter:

```markdown
<!--
agent-site: example.com
collection: log
canonical-url: https://example.com/agent-md
markdown-url: https://example.com/agent-md.md
content-signal: ai-input=yes, ai-train=yes, search=yes
author: Nikola Balić
published: 2026-05-28
tags: agents, markdown
-->

# Article title
... raw markdown body ...
```

The original frontmatter stays inside the markdown file. The HTML comment block is the agent-facing summary: who wrote it, when, where to link back to, and a `content-signal` that tells the agent how the content may be used.

Response headers on the markdown response:

```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, max-age=3600
Vary: Accept, Accept-Encoding
Link: <canonical>; rel="canonical", <md-url>; rel="alternate"; type="text/markdown"
Content-Signal: ai-input=yes, ai-train=yes, search=yes
X-Markdown-Tokens: <ceil(length / 4)>
X-Content-Type-Options: nosniff
```

`X-Markdown-Tokens` is a courtesy. Agents can budget their context window before fetching. Rough estimate: bytes divided by four.

`Content-Signal` comes from the [llms.txt convention set](https://llmstxt.org/). It tells well-behaved agents whether you want them using the content for input, training, or search. Set it once at the source.

## 5. `llms.txt` and `llms-full.txt` as static files

Two routes in `src/pages/`:

- `llms.txt.ts` — index per the [llms.txt spec](https://llmstxt.org/): a title, a blurb, sectioned links to every post.
- `llms-full.txt.ts` — the full dump: TOC plus every post body inlined, frontmatter stripped.

Both flagged static:

```ts
export const prerender = true;
```

This bakes them at build time. They get served from the CDN with no function invocation. Vercel's static handler does HEAD requests for free.

The catch: custom response headers from your route handler get **discarded** when the route is prerendered. Static files don't have a runtime that can set headers. So you set them in `vercel.json`:

```json
{
  "source": "/(llms\\.txt|llms-full\\.txt)",
  "headers": [
    { "key": "Content-Type", "value": "text/plain; charset=utf-8" },
    { "key": "Cache-Control", "value": "public, max-age=3600, s-maxage=3600" },
    { "key": "Content-Signal", "value": "ai-input=yes, ai-train=yes, search=yes" },
    { "key": "Access-Control-Allow-Origin", "value": "*" },
    { "key": "Access-Control-Allow-Methods", "value": "GET, HEAD, OPTIONS" }
  ]
}
```

For this site, `llms-full.txt` is ~743 KB. Prerendering it means it never hits the function budget. The tradeoff is losing dynamic `X-*` counters, but cache hits at the edge are worth it.

## The discovery surface

Beyond the in-band content negotiation, make your markdown surface easy to find:

- `robots.txt` open by default — `User-agent: *` / `Allow: /` with `Sitemap:` pointing to `/sitemap-index.xml`. If you block agents here, none of this matters.
- `llms.txt` at the root — agents that follow the convention find it automatically.
- `Link: rel="alternate"; type="text/markdown"` on every HTML page — agents that don't know your URL convention discover it from the response itself.

Three signals, layered. Belt, suspenders, and one more belt for luck.

## The smoke test

Run this against your dev server after wiring everything up:

```bash
# 1. Browser: HTML
curl -sI -H "Accept: text/html" -H "Sec-Fetch-Dest: document" \
  http://localhost:4321/agent-md | grep -iE "content-type|link"
# expect: text/html, Link with rel="alternate"

# 2. Explicit markdown via Accept
curl -sI -H "Accept: text/markdown" http://localhost:4321/agent-md \
  | grep -i content-type
# expect: text/markdown

# 3. AI bot UA, generic Accept
curl -sI -H "User-Agent: GPTBot/1.0" -H "Accept: */*" \
  http://localhost:4321/agent-md | grep -i content-type
# expect: text/markdown

# 4. Plain curl, no AI hints
curl -sI http://localhost:4321/agent-md | grep -i content-type
# expect: text/html

# 5. Hard override via .md suffix
curl -sI http://localhost:4321/agent-md.md | grep -i content-type
# expect: text/markdown

# 6. Reserved root stays HTML
curl -sI -H "Accept: text/markdown" http://localhost:4321/about \
  | grep -i content-type
# expect: text/html (negotiation skipped for reserved paths)
```

If those six commands give you the expected responses, you're done. The negotiation is deterministic enough that this catches every regression I've shipped so far. Add `vitest` if you start layering heuristics on top, but a curl loop has been enough.

## Gotchas

A few things I had to learn the hard way.

**Lead with `Accept`, not UA-sniffing.** UA lists rot. Bots rebrand. New ones launch every month. `Accept` headers don't change. Use UA only when `Accept` is uninformative.

**`sec-fetch-dest` is the cleanest "real browser" signal.** Every modern browser sends it on a top-level navigation. Agents and CLI tools don't. Better than trying to UA-sniff browsers in reverse.

**Reserve your root paths.** Without an explicit reserved set, your slug regex will eat `/about` and `/cv` and try to serve them as content. Enumerate them upfront.

**`Vary: Accept, User-Agent` is not optional.** If negotiation depends on those headers, the CDN has to know, or it'll serve the wrong cached variant. This is the bug I see most often in content negotiation setups.

**Append `Link` headers, don't replace them.** Existing canonical or preconnect links matter. Read, concat, write back.

**Prerender the heavy stuff.** `llms-full.txt` doesn't need to run on every request. Bake it at build time, set headers in `vercel.json`, save your function budget.

**Skip the test harness for now.** The negotiation is deterministic. A six-line `curl` script catches regressions. Reach for Vitest when you start layering heuristics that actually warrant unit tests.

## What you get

Agents stop chewing through your CSS classes to find the part they came for. Your bandwidth drops. Their token budget drops. RAG indexes get cleaner data. The `Content-Signal` header gives well-behaved agents a hint about what you'd prefer they do with the content.

Whether agents actually respect any of this is a different question. The ones that do, you've helped. The ones that don't, you haven't made it worse.

Full source on this site: [src/middleware.ts](https://github.com/nibzard/nibzard-web/blob/main/src/middleware.ts), [llms.txt.ts](https://github.com/nibzard/nibzard-web/blob/main/src/pages/llms.txt.ts), [llms-full.txt.ts](https://github.com/nibzard/nibzard-web/blob/main/src/pages/llms-full.txt.ts). Copy what's useful.
