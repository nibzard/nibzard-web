---
title: "The Hidden Language of Search"
description: "AI answer engines rewrite your prompts into queries. Understanding this translation layer explains the weird keywords in your GSC."
tldr: "There's a hidden layer between human questions and search results. AI tools translate messy prompts into precise queries - and you can see the evidence in Google Search Console."
date: 2026-03-02
tags: [AI, SEO, SEARCH, TECH]
draft: false
author: "Nikola Balić"
topics: [AI Search, Google Search Console, RAG, Query Rewriting]
entities: [ChatGPT Search, Perplexity, Google Search Console, OpenAI]
answers_questions:
  - How do AI answer engines like ChatGPT Search retrieve information?
  - Why am I seeing weird long-tail keywords in Google Search Console?
  - What's the connection between AI prompt rewriting and SEO?
---

Here's a search query that showed up in Google Search Console recently:

> "browser-use open source agentic ai framework github repository technical documentation showing dependencies, foundation models supported, playwright integration, python libraries, and implementation architecture"

Thirty-one words. No human typed that into Google.

I’ve been using our new Steel CLI and `steel-browser` skill to explore this kind of case in practice.

This demo shows Claude Code running **parallel browser sessions** with ChatGPT so you can inspect how it reasons and what answers it returns en masse.

<https://www.youtube.com/watch?v=eKkAwi8vt4Q>

That's not a search query. That's a *translated* search query - the output of an AI rewriting someone's prompt into something a search engine can understand.

And it's showing up in GSC because somewhere, an AI answer engine sent that exact string to Google.

## Two Languages, One Problem

When you ask an AI tool a question, there are *two different languages* involved:

1. **Human language** - your prompt: messy, contextual, conversational
2. **Retrieval language** - search queries: short, explicit, keyword-heavy

Most AI answer engines solve this by inserting a translation layer:

**Prompt → (rewrite into query/queries) → Search → (select evidence) → Answer**

OpenAI explicitly confirms this for ChatGPT Search: it "typically rewrites your query into one or more targeted queries" and may do follow-up queries after seeing initial results.

This isn't speculation. It's documented behavior.

### Why rewrite at all?

Because raw prompts are terrible search queries:

- "latest" needs a date/recency hint
- "near me" needs location
- vague nouns need disambiguation
- multi-part questions need multiple searches

This is well-studied in RAG research: rewriting, decomposition, and disambiguation improve retrieval quality.

## What the Translation Looks Like

Let me show you what's happening under the hood.

### Step 1: Interpret intent

The AI first decides: *Do I need the web, or can I answer from training data?*

ChatGPT Search automatically searches when your question benefits from web info. Perplexity is "search-first" by default.

### Step 2: Rewrite into queries ("fan-out")

This is where the magic happens. One prompt becomes one or more search queries.

**Example from OpenAI's docs:**

User: "what's the latest on drugs that target CCR8 for cancer?"

Rewritten: "CCR8 immunotherapy drug development 2025" → then narrower follow-ups.

**Another example:**

User: "good restaurants near me"

Rewritten with location: "top restaurants San Francisco"

If ChatGPT Memory is enabled, it might add remembered preferences: "good vegan restaurants San Francisco."

### Step 3: Apply filters

Some systems add constraints: domain, region, language. Perplexity's API exposes these controls explicitly.

### Step 4: Retrieve, dedupe, rerank

The system merges results from multiple queries, removes duplicates, reranks by relevance/authority/recency, and opens pages to extract evidence.

If evidence is missing? It iterates with another rewrite.

### Step 5: Synthesize with citations

Finally, it writes a natural-language response grounded in what it retrieved.

## The Evidence in Your GSC

Now here's where it gets interesting for SEOs.

That 31-word query I showed you? It has clear signatures of AI origin:

- **Tool/code-like vocabulary** - "github repository", "implementation architecture"
- **Long structured text** - 31 words, comma-separated clauses
- **Multi-line/quoted snippet style** - reads like pasted context
- **Connector tokens** - "showing", "and" chaining multiple requirements

This isn't a human searching. This is an AI *fan-out* query - the kind ChatGPT Search generates when someone asks a multi-part question about browser-use.

And it's not alone. Here are more examples from real GSC data:

| Query Pattern | Why It's Likely AI-Generated |
|---------------|------------------------------|
| "read https://better-auth.com/docs/concepts/rate-limit.mdx, i want to ask questions about it" | Contains URL + intent statement, not search syntax |
| "anthropic claude computer use beta documentation" | Keyword-stuffed product name, no natural phrasing |
| "playwright connect_over_cdp documentation python" | Underscore method name + language, very specific |
| "which headless browser api should i integrate if i want an http endpoint my bots and llm agents can call on demand?" | Full question as query, 24 words |

These queries have **zero clicks** but **impressions**. Why? Because they're so specific, they match few pages - but when they do match, your page shows up.

## Why This Matters for SEO

There are three practical implications here.

### 1. New keyword patterns are emerging

AI-generated queries are:
- Longer (20-40 words)
- More structured (comma-separated, semi-colon delimited)
- More specific (exact method names, versions, documentation paths)
- Question-shaped but keyword-dense

If you're seeing these in GSC, it's not spam. It's a new kind of traffic source.

### 2. Content should match AI query patterns

Traditional SEO advice: write for humans, use natural language.

New advice: *also* include the structured, keyword-dense phrasing that AI rewriters generate.

Concrete tactics:
- Add explicit query-style headers: "What is Steel?", "Steel vs Browserbase comparison"
- Include technical specifics in headings: "playwright connect_over_cdp python documentation"
- Create cluster pages that answer multi-part intents in one URL
- Add temporal cues: "2026 benchmark", "March 2026 update"

### 3. Weird keywords aren't always weird

Before you dismiss strange queries as noise, check:

- Does it match your content technically? (method names, API endpoints)
- Is it structured like an AI rewrite? (long, comma-separated, specific)
- Does it have zero clicks but impressions? (high specificity = low volume)

If yes, it might be AI-driven traffic - and worth optimizing for.

## The Other Explanation: Security Issues

Not all weird queries are AI-generated. Some are warning signs.

If you're seeing porn, pharma, or streaming keywords that have *nothing* to do with your site, check for:

1. **Hacked content** - page injection, content injection, cloaking
2. **Spammy URLs** - infinite parameter variants returning 200/OK
3. **The Japanese keyword hack** - auto-generated spam pages in random directories

Google documents these patterns explicitly. They're real, and they show up in GSC as unrelated queries.

The difference: AI queries are *topically relevant* but weirdly structured. Spam queries are *topically irrelevant* entirely.

## The Bigger Picture

AI answer engines aren't replacing search. They're becoming a translation layer on top of it.

When you ask ChatGPT a question, it doesn't just "know" the answer. It:
1. Rewrites your question into search queries
2. Sends those queries to search providers (including Google)
3. Reads the results
4. Synthesizes an answer

Your content can appear in step 2 - even if the human never visited Google directly.

This is the new SEO frontier: **optimizing for AI rewriters**, not just human searchers.

The evidence is already in your GSC. You just have to know what you're looking at.

## See this live

If this is still abstract, watch the same workflow with the Steel CLI and `steel-browser` skill in the loop:

<https://www.youtube.com/watch?v=eKkAwi8vt4Q>

You can also read the release context in [Steel CLI and the new Steel Browser skill](https://steel.dev/blog/steel-cli-and-agent-skill).

---

## Sources

- [ChatGPT Search - OpenAI Help Center](https://help.openai.com/en/articles/9237897-chatgpt-search)
- [Learning to Refine Queries for RAG - arXiv](https://arxiv.org/pdf/2404.00610)
- [Perplexity Search API Documentation](https://docs.perplexity.ai/docs/search/quickstart)
- [Question Decomposition for RAG - arXiv](https://arxiv.org/html/2507.00355v1)
- [GSC Performance Report - Google Support](https://support.google.com/webmasters/answer/7576553)
- [GSC Data Filtering Deep Dive - Google for Developers](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive)
- [Spam Policies - Google for Developers](https://developers.google.com/search/docs/essentials/spam-policies)
