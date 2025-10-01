---
title: "AI Ate Its Own Tail, and I Learned Something About Writing"
tags: ["AI CODE", "WRITING", "HUMAN", "TRANSPARENCY"]
date: 2025-09-08
description: "AI analyzed its own git history. Meta-experiment revealed the urgent need for transparent proof-of-work in AI-human collaboration."
tldr: "Used AI to analyze its own git history, sparking thoughts on transparent AI-human collaboration. The future isn't hiding AI use—it's building verifiable trails of who did what, when, and how. Like Andy Weir's crowdsourced Martian, creative work has always been collaborative."
draft: false
author: "Nikola Balić"
source_url:
  html: https://nibzard.com/ai-ate-its-tail
  md: https://nibzard.com/ai-ate-its-tail.md
---

## The Experiment

I used AI to analyze the repository of a project AI itself was working on. The AI went through every commit and file history, and from that it reconstructed the entire development process.

The project itself was a [game challenge](/berghain). I was using mostly Claude Code in "YOLO mode." In practice, that meant setting the flag *dangerously-skip-permissions* and run it in the loop:

```bash
alias loop='while :; do cat prompt.md | claude -p --dangerously-skip-permissions; done'
```

My idea was simple: create a human-readable record of how the project evolved. Not just code. A story. How AI agent tried one thing, failed, switched to a new algorithm, improved it, created another, and kept iterating. I wanted a narrative version of the repo. Something I could come back to later and instantly understand what had happened.

So I asked AI to write an article from the repo's history. The result wasn't bad. I got a timeline of algorithms, changes, snippets of code. A deep dive into how the project came together. The downside? It was padded with AI filler—sloppy sentences, too much noise. That was my fault. I'd just said something like, *"go through it and write a super long deep dive article."* With better prompting, I'm sure it would have been sharper. But even so, it worked.

I shared the experiment on [Hacker News](https://news.ycombinator.com/item?id=45149330). It quickly picked up 20–something comments and a dozen or so upvotes before it was flagged. The response was mixed. Some people dismissed it. Others saw value in it. I jumped into the thread, adding explanations I hadn't included in the blog post itself. That back-and-forth made me realize: **this experiment wasn't just about documenting a project. It was about the future of writing.**

## The Real Question

Here's the thought that stuck: if AI and humans are co-writing, how do we show the human effort? How do we prove what came from where? Do we really need to? 

One idea is a **verifiable proof-of-work system.** Not a changelog, not a Git diff—something higher level, human-readable, but still verifiable. Imagine a lightweight metadata trail. Step by step:

* I started with an idea.
* I prompted AI.
* AI drafted an article.
* I added comments.
* AI revised.
* I made manual edits.
* I published.

Each step logged with a timestamp. Bundled into a signature. Anyone could open it up, verify it, and follow the creative flow. That kind of provenance would let us track how a piece of writing—or any piece of work—was actually made.

I've already experimented with this idea in another project, [MindMark](https://github.com/nibzard/mindmark)—an AI-native writing platform that makes human thinking visible through immutable process journals, cryptographic verification, and transparency tools.

## The Future is Collaborative

Because the truth is, the future of writing is AI-human collaboration. We'll see fewer "pure" human works. But then again, what counts as pure? If I use spellcheck, a grammar linter, or even just autocomplete—am I writing alone? We already accept those tools. 

> AI is the next step, just louder, faster, more opinionated.

I've already started with declaring this on my blog. Now, when I publish something that was AI-augmented, it shows a clear tag ["SLOP"](/tags/slop), and a note at the top: *"This article was heavily written by AI."* 

*It's small, but it feels honest.*

In the end, this whole process—from running YOLO code with Claude, to generating an article, to debating on HN—brought me to one realization: **the line between human and machine writing is thin.**

## This Isn't New 

What matters is not hiding it. What matters is building systems where the collaboration itself is visible, traceable, and human-approved.

Andy Weir's The Martian is a great reminder that [this kind of collaboration isn't new](https://www.youtube.com/watch?v=2tfh6OUUYUw&t=317s). He first published the book chapter by chapter on his blog, where readers fact-checked the science and flagged pacing issues. Weir revised, reposted, and refined until the story was sharp enough to self-publish, which snowballed into a publishing deal and a movie.

The pattern is the same: draft, feedback, revision, iteration. Weir had a crowd of readers; today, we have AI. The tools change, but the creative loop—writing as collaboration—stays the same.