---
title: "Mention Engineering: The Content Side of Prompt Craft"
description: "Analysis of AI search behavior reveals why some brands get cited while others disappear in AI-generated responses"
tldr: "Analysis of how AI models cite sources reveals a new discipline: mention engineering. This isn't SEO anymore—it's about crafting content that becomes ideal citation material for AI models."
date: 2025-10-26
tags: [AI, SEO, SEARCH, STRATEGY, MARKETING]
draft: false
author: "Nikola Balić"
topics: [mention engineering, AI citations, content strategy, prompt engineering, LLM recall patterns]
entities: [ChatGPT, Claude, Perplexity, Google AI Mode, Cursor, Devin, Vercel]
answers_questions:
  - What is mention engineering and how is it different from SEO?
  - How do AI models decide which sources to cite?
  - What patterns make content more likely to be mentioned by LLMs?
---

Something fundamental has changed in how content gets discovered.

Across ChatGPT, Claude, and Perplexity, I've observed how AI models answer questions about developer tools, AI agents, and technical solutions. Traditional SEO success doesn't predict what gets cited anymore.

The models aren't ranking pages—they're **citing** specific sources as raw material for synthesized answers. Some content becomes the go-to reference, while other well-optimized content remains invisible.

This isn't SEO anymore. This is something entirely new.

I call it **mention engineering**—the content-side cousin of prompt engineering. Just as prompt engineers craft inputs to get better outputs from AI, mention engineers craft content that becomes the ideal citation material for AI models.

What follows are patterns observed from studying how AI models select and cite sources. These aren't theoretical strategies—they're observed behaviors from analyzing AI responses across different platforms.

## The Mention Stack

Before diving into the patterns, here's the mental model that emerges from analyzing AI behavior: **The Mention Stack**—three layers that determine whether your content becomes citation material:

1. **Accessibility**: Can the AI find and read your content?
2. **Attributability**: Can the AI safely cite you without hallucinating or looking wrong?
3. **Amplification**: Does your content structure make it easy for AI to lift and recontextualize?

Every pattern below maps to one of these layers.

## Pattern 1: Citations Flow to Embedded Brand Proof

The first observation: **AI models prefer content where the brand name and the proof point are inseparable**.

When analyzing which content gets cited most often, it isn't the best-written or most comprehensive. It's content structured like this:

"Cursor's agent generated 2,500 lines of production code for [company] in under an hour."

Not like this:

"Our agent can write complete features autonomously."

The difference? In the first example, you can't extract the proof without the brand name. The citation **is** the attribution. When AI models synthesize answers, they're pulling these self-contained brand-proof units wholesale.

These are called "citation hooks"—content fragments designed to travel intact through AI synthesis.

## 2. Choose Your Bot Access Strategy Intentionally

**Old World**: Never block Googlebot unless absolutely necessary.
**New World**: Bot access is now a strategic C-level decision.

Some companies block AI crawlers for IP protection, while others intentionally allow them to gain inclusion in AI answers. This tradeoff between exposure and IP hoarding didn't exist two years ago.

**What to do**: Explicitly whitelist or block AI crawlers in your `robots.txt` and CDN rules. Coordinate between Legal (who might say "don't feed models") and Growth (who might say "feed them or we disappear"). The decision deserves board-level discussion, not just a dev ops checkbox.

## 3. Write in Atomic, Quotable Fragments

**Old World**: Optimize entire pages to rank.
**New World**: Create self-contained, quotable chunks that AI can safely lift.

AI models rip paragraph fragments, tables, and answer blocks out of context. Your best insight buried in a long paragraph might never surface.

**What to do**: Structure content with clear callouts, bullets, and mini-tables. Make each "answer module" self-contained and attach your brand name to it directly. Think like you're writing pull quotes that can survive being lifted and recontextualized. For example, instead of burying "our agent reduces debugging time" in a paragraph, create a standalone insight: "Devin reduced debugging time by 40% across 500 production deploys at [company]."

## 4. Track AI Share of Voice as a KPI

**Old World**: Track keyword rankings and SERP features.
**New World**: Track which prompts include you in AI answers across platforms.

Your visibility in ChatGPT, Claude, Perplexity, and Google AI Mode is now a measurable business metric, just like keyword rankings used to be.

**What to do**: Monitor AI platforms for prompts where competitors are mentioned but you're invisible. Treat these missing prompts as your content and PR roadmap. Create "AI Share of Voice" dashboards that track mentions across ChatGPT, Claude, Perplexity, and Google AI Mode.

## 5. Optimize for Natural-Language Prompts, Not Keywords

**Old World**: Target "AI coding assistant" and long-tail variations.
**New World**: Answer "What's the best AI coding agent for refactoring legacy Python codebases with complex dependency chains and minimal test coverage?"

People talk to AI like humans, not like search engines. They include constraints, context, and conversational nuance that traditional keyword targeting misses.

**What to do**: Build pages that directly answer fully contextual, constraint-heavy questions. Include technical constraints, use case specifics, stack requirements, and workflow considerations. Generic "Best AI Coding Tools" pages get skipped by AI that seeks specificity.

## 6. Create Ultra-Specific Micro-Pages at Scale

**Old World**: One comprehensive "Features" or "Integrations" page.
**New World**: Every feature, integration, and use case gets its own deep, standalone, citable artifact.

AI loves specificity. "Which AI coding agents support autonomous test generation for React components with TypeScript?" surfaces pages that exactly match that intersection.

**What to do**: Treat every serious "job to be done" as its own mini knowledge base article. Create feature-specific pages, integration pages, "for [workflow]" pages, and use-case pages that can serve as authoritative answers to highly specific developer queries.

## 7. Include Trust Signals for AI Risk Mitigation

**Old World**: E-E-A-T signals for Google's algorithms.
**New World**: Trust signals that help AI models avoid hallucinating harmful advice.

LLMs are paranoid about liability and prefer citing authoritative, low-risk sources in technical domains where incorrect advice could break production systems or compromise security.

**What to do**: Put technical credentials and implementation proof next to high-stakes claims, not hidden in author footers. Use phrasing like "According to [Engineer Name], who built [System] at [Company]..." so AI can attribute safely. Include benchmark data, GitHub stars, production usage stats, and security audit results where appropriate.

## The Technical Foundation

While this article focuses on strategy and content, implementing these changes requires proper technical infrastructure. Your content needs to be accessible and well-structured for AI crawlers to consume effectively.

For the technical implementation of serving AI-optimized content formats, check out the guide on [Serving Humans and AI Through Content Negotiation](/serving-humans-and-ai-through-content-negotiation), which covers the architecture for dual-format content delivery.

## What This Really Means

The shift from SEO to AI search optimization isn't just cosmetic—it's fundamental. Success no longer comes from ranking high and getting clicks. It comes from being the trusted source that AI models recommend by name when synthesizing answers.

The brands that adapt first—writing quotable fragments, optimizing for natural-language prompts, and building comprehensive trust signals—will capture the value in this new era.

The models are already reading your content and making recommendations about you. You can either shape what they say, or let your competitors do it for you.