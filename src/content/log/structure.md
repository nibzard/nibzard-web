---
title: "Demos Run on Embeddings. Production Runs on Structure."
description: "Why the gap between AI demos and shipping AI is a reliability gap, not a capability gap."
tldr: "Production AI uses both embeddings and structure, but teams systematically underinvest in the structure layer. In high-stakes domains where 99% accuracy is a failing grade, structured data provides the reliability guarantees enterprise demands."
date: 2025-11-16
tags: [AI, PRODUCTION, ARCHITECTURE, DATA]
draft: false
author: "Nikola Balić"
topics: [production AI systems, structured data, data architecture, LLM reliability, enterprise AI]
entities: [RAG, SQL, vector databases, feature stores]
answers_questions:
  - Why do AI demos fail to ship to production?
  - What makes enterprise AI different from consumer AI demos?
  - How does structured data provide reliability guarantees?
---

Simon Willison put it perfectly:

> "You can train a model on a collection of previous prompt injection examples and get to a 99% score at detecting new ones. And that's useless because in application security, 99% is a failing grade."

This pattern extends beyond prompt injection to AI systems trying to make the leap from demo to production.

In **high-stakes domains**—financial transactions, medical information, security controls—one failure in a hundred means your system doesn't ship. Enterprise doesn't tolerate probabilistic reliability in these contexts. They need **guarantees**.

The gap between AI that demos well and AI that actually ships appears to be less about model capabilities and more about **reliability architecture**. Structure might be one way to bridge it.

## The 99% Problem

Most AI demos follow the same pattern: throw documents at a vector database, embed the user's question, retrieve similar chunks, feed them to an LLM, generate an answer.

It's semantic search with a conversational interface. It works well in demos.

In production, it often breaks in subtle ways.

The failure modes are subtle:

- **"John" in one document** isn't recognized as the same "John" in another
- **The same question asked twice** returns different answers
- **Critical information** gets paraphrased incorrectly
- **Context windows fill** with irrelevant chunks while missing the key fact
- **No way to audit** why the system made a specific decision

Optimizing embeddings, tuning retrieval parameters, and engineering prompts might get you from 90% to 95% to 98%. But you're still playing a **probabilistic game** in domains that demand **determinism**.

## Why Structure Might Provide Robustness

Structured data offers something embeddings cannot: **deterministic behavior** and **enforceable guarantees**.

Extracting information into stable schemas—entities, events, relationships, attributes—creates a foundation where reliability becomes more achievable.

**Stable identifiers eliminate ambiguity.** Instead of hoping the LLM figures out that "John from Engineering" and "John Smith" and "J. Smith" are the same person, you have `user_id: "u_12345"`. One person, one identifier, no confusion.

**Deterministic queries return consistent results.** SQL doesn't hallucinate. A query for "all high-priority tickets assigned to Alice due this week" returns the same rows every time you run it. There's no embedding drift, no semantic uncertainty, no probabilistic retrieval affecting outcomes.

**Constraints become enforceable.** You can guarantee that account balances never go negative, that required fields are always populated, that relationships maintain referential integrity. These aren't prompt engineering tricks—they're database constraints that **cannot be violated**.

**Audit trails become possible.** When decisions flow through structured queries and deterministic logic, you can trace exactly why the system behaved a specific way. Not "the embedding was similar" but "this record matched these criteria and triggered this action."

---

An alternative architecture pattern:

**Traditional RAG:** Embed everything → retrieve chunks → generate answer

**Structured approach:** Extract facts → validate against schema → store in structured form → query deterministically → use results in generation

The LLM's role shifts from knowledge base to interface layer—extracting structure from messy input, querying structured data, and formatting results conversationally.

## The Missing Layer

Here's what the market is optimizing for: **bigger context windows, better embeddings, faster retrieval, cheaper tokens**.

Here's what's systematically undervalued: **extraction accuracy, schema design, query reliability, validation logic**.

Most production systems use both embeddings and structure—hybrid search combining semantic retrieval with structured queries. Research shows **25-45% improvement in recall** when combining both approaches.

The interesting question is **where teams invest their effort**. One pattern that appears frequently:

> **Months optimizing embeddings and retrieval, weeks building extraction pipelines.**

Demos emphasize semantic search. Production failures may stem from underinvesting in structure.

Companies deploying AI in production tend to invest early in **turning unstructured communication into structured facts**. They build extraction pipelines that validate, normalize, and maintain schemas.

In high-stakes domains, **probabilistic failure modes create problems**:

- A customer support system that hallucinates **1% of the time** may not get deployed
- A financial assistant that occasionally invents account balances won't pass compliance
- A medical information system with hallucination risks faces regulatory barriers

The question shifts from "can your AI answer questions?" to **"Can you guarantee it won't fail catastrophically in critical domains?"**

Structure provides one way to approach this guarantee.

---

One hypothesis: the competitive advantage is less about better models or retrieval techniques and more about **data architecture and extraction pipelines** that turn messy reality into clean, queryable, validated structure.

This might be the undervalued piece in enterprise AI projects—not better embeddings, but **structured data infrastructure**.

Small models on well-structured data with deterministic retrieval could ship more reliably than big models on primarily semantic search. Not because they're smarter, but because they operate in an environment where **reliability guarantees become possible**.

## What This Suggests

The demo-to-production gap persists. Models get better at impressive demos while production requirements remain uncompromising about reliability in high-stakes domains.

The challenge may be less about choosing between embeddings and structure and more about recognizing where teams invest effort.

**For evaluating AI investments**, a useful question might be:

> "How will we structure our data to make outputs reliably usable in domains where errors have real consequences?"

**For building AI products**, the architecture decision may be less about which embedding model to use and more about whether you're building **extraction pipelines and data architecture as first-class infrastructure**.

---

Demos will continue to impress. Shipping to high-stakes production environments requires different tradeoffs.

Those that ship may need to invest in **structured data infrastructure**—not because embeddings don't work, but because structure offers one path to the reliability guarantees enterprise demands.

If you want to see how people like Guido van Rossum (Python's creator) are thinking about this, check out [TypeAgent](https://github.com/microsoft/TypeAgent)—Microsoft's exploration of structured RAG and logical memory for agents.
