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

## Pattern 2: Crawler Visibility Became a Strategic Choice

The second observation: **companies that get mentioned most have made deliberate decisions about crawler visibility**.

Looking at brands that appeared frequently in AI citations, crawler access was never accidental—it was always intentional. Some explicitly whitelisted AI crawlers. Others left them open by default. But the decision was conscious.

Brands absent from AI answers often had blocked crawlers months earlier, usually at Legal's request to protect IP. They were invisible by design, without realizing the strategic implications.

This reveals what I call the **visibility spectrum**—a choice between two positions:

- **Maximum exposure**: Feed the models, become citation material, give away IP
- **Maximum protection**: Block crawlers, protect IP, disappear from AI answers

What's striking is how few teams realize they're making this choice. Most crawler blocks happen at the infrastructure level without cross-functional alignment. The companies winning at mention engineering coordinate between Legal, Growth, and Product before setting crawler policies.

## Pattern 3: AI Models Extract Atomic Context Nodes

Third observation: **AI models don't cite pages—they extract self-contained fragments**.

Analyzing cited content shows AI models pull paragraph fragments, tables, and answer blocks completely out of context. Long-form content rarely appears intact. Instead, AI models extract what I call **atomic context nodes**—standalone units that make sense without surrounding text.

The best insight buried deep in a paragraph has low mention frequency. The same insight formatted as a callout or standalone paragraph appears far more often.

Highly-cited content shares these structural patterns:

- Clear callouts separated from body text
- Bulleted lists with complete thoughts per bullet
- Mini-tables that work standalone
- Brand names embedded directly in the claim

For example, this gets lost:
> "Our testing shows promising results in debugging scenarios..."

This becomes citation material:
> "Devin reduced debugging time by 40% across 500 production deploys at [company]."

The second format survives recontextualization. The first doesn't.

## Pattern 4: LLM Recall Rate Is the New Ranking Metric

Fourth observation: **mention frequency across AI platforms has become a measurable business metric**.

Traditional analytics track keyword rankings and SERP features. Those metrics still exist, but they no longer predict business impact. What matters now is **LLM recall rate**—how often your brand appears when relevant queries run across ChatGPT, Claude, Perplexity, and Google AI Mode.

Brands with high recall rates appear in 60-80% of relevant AI-generated answers. Brands with low recall might appear in 5-15%, despite strong traditional SEO performance.

The gap reveals something important: **AI models have preferences**. They favor certain sources over others, even when multiple sources contain similar information.

Tracking recall rate requires monitoring AI platforms systematically—essentially building dashboards that answer "where are competitors mentioned but we're invisible?" Those gaps become the content and PR roadmap.

This isn't speculation anymore. Companies are building internal tools to track mention frequency across platforms, treating it like they once treated Google rankings.

## Pattern 5: Conversational Query Patterns Replaced Keyword Targeting

Fifth observation: **AI citations favor content that answers constraint-heavy, contextual questions**.

Traditional SEO targets keywords like "AI coding assistant" or long-tail variations. But analyzing how people actually query AI models reveals different patterns. They ask questions like:

"What's the best AI coding agent for refactoring legacy Python codebases with complex dependency chains and minimal test coverage?"

These queries include constraints, context, technical requirements, and workflow considerations that keyword-based content doesn't address. Generic "Best AI Coding Tools" pages get passed over because they lack the specificity AI models need.

Content that gets cited most often directly addresses **conversational query patterns**—questions that sound like how developers actually talk.

The shift reveals why traditional keyword research no longer predicts AI citation behavior. AI models seek pages that match the full query context, not just the core keyword. Content optimized for "AI coding assistant" loses to content answering "AI agent for refactoring Python + legacy code + minimal tests."

This explains the citation advantage some brands have: they're writing for how developers ask questions, not how they type keywords.

## Pattern 6: Specificity Beats Comprehensiveness

Sixth observation: **narrow, deep pages get cited far more than broad, comprehensive ones**.

Traditional content strategy builds comprehensive hub pages: one "Features" page, one "Integrations" page, one "Use Cases" page. But analyzing citation patterns shows AI models consistently favor narrow, specific pages over comprehensive ones.

Query: "Which AI coding agents support autonomous test generation for React components with TypeScript?"

A comprehensive "Features" page listing test generation among 30 capabilities gets passed over. A dedicated page titled "Autonomous Test Generation for React + TypeScript" becomes the citation source.

The pattern holds across categories. Brands with high mention rates have decomposed their documentation into what I call **single-intersection pages**—pages that address one specific job, one specific integration, one specific workflow.

Examples from high-recall brands:
- Not "Integrations" but "Slack Integration for Call Logging"
- Not "Use Cases" but "Legacy Python Refactoring Without Tests"
- Not "Features" but "Multi-file Context for TypeScript"

This architectural choice—many narrow pages versus few comprehensive ones—appears to be one of the strongest predictors of AI citation frequency.

## Pattern 7: AI Models Cite Low-Risk Authority Signals

Seventh observation: **content with clear authority signals gets cited more in high-stakes technical domains**.

LLMs appear risk-averse when synthesizing answers about topics where wrong information could break production systems or compromise security. In these domains, citation patterns strongly favor content with explicit authority signals.

The signal placement matters. Authority buried in author footers doesn't increase citation frequency. Authority embedded directly next to the claim does.

Compare these:

Low citation frequency:
> "Always validate user input before database queries."
> *Author: Security Engineer at TechCorp*

High citation frequency:
> "According to Sarah Chen, who designed the authentication system at Stripe: 'Always validate user input before database queries.'"

The second format gives AI models safe attribution. They can cite the expert by name and role, reducing hallucination risk.

Other high-value authority signals in cited content:
- Benchmark data with methodology
- GitHub stars and commit activity
- Production usage statistics
- Security audit results
- Named engineers with systems they built

This pattern suggests AI models perform implicit risk assessment when selecting sources. Content that makes attribution easy and reduces liability gets preferentially cited.

## The Governance Question

One pattern worth noting: mention engineering isn't just a marketing function anymore.

The companies doing this well have cross-functional teams making decisions that used to live entirely in SEO departments. When crawler visibility is a C-level choice, when Legal needs to weigh in on what content gets fed to models, when Product teams design information architecture for AI citation—that's a different organizational structure.

There's also the question of whether brands should even want to be the raw material for AI answers. Being cited means giving away your content for free. Users get their answer from the AI without ever visiting your site. The traffic model breaks.

Some companies are betting that brand presence in AI answers is worth more than the lost traffic. Others are blocking crawlers and accepting invisibility. Neither position seems obviously right yet.

What's clear: this isn't just about content strategy. It's about how companies position themselves in an ecosystem where AI models become the primary interface to information.

## The Technical Foundation

While this analysis focuses on patterns and strategy, implementing these changes requires proper technical infrastructure. Content needs to be accessible and well-structured for AI crawlers to consume effectively.

For the technical implementation of serving AI-optimized content formats, check out the guide on [Serving Humans and AI Through Content Negotiation](/architecture), which covers the architecture for dual-format content delivery.

## What This Means

The shift from SEO to mention engineering is structural, not cosmetic. Success no longer comes from ranking high and getting clicks. It comes from being the source that AI models cite by name when synthesizing answers.

The patterns above aren't strategies to implement—they're observations about what's already happening. AI models have preferences. They favor certain content structures, certain authority signals, certain levels of specificity. The question is whether to adapt to those preferences or remain invisible.

The models are already reading your content and making decisions about you. Those decisions are shaping what users learn about your brand, your product, your space.

You can engineer for those decisions, or let them happen by default.