---
title: "The Rise of Personal Software"
description: "AI makes small, personal tools easier to build. Keeping control of them is the more interesting challenge."
tldr: "Personal software matters when you can adapt it, export your data, and keep it running after the original platform changes."
date: 2026-09-26
tags: ["AI", "TOOLS", "SOFTWARE"]
draft: true
author: "Nikola Balić"
topics: ["End-user programming", "Personal software", "Software ownership"]
entities: ["Ink & Switch", "Simon Willison", "GitHub Spark"]
answers_questions:
  - "What makes personal software useful?"
  - "How can you keep control of an AI-built tool?"
---

Software can be especially annoying when it almost does what you need.

Imagine a reading list that remembers every link but forgets why you saved it. You want a sentence about the idea, a place to connect related pieces, and a way to find the unfinished ones. Instead, you have bookmarks, notes, and a weekly ritual of opening tabs you no longer recognize.

I would start with a problem like this: a recurring frustration you can describe clearly, where adding another general-purpose application might create more work. The reading list here is hypothetical.

AI makes it easier to ask for a tool shaped around that problem. The interesting question comes after the first working screen: can you change it again next month, and can you keep using it without the service that helped create it?

## We have been doing this for a long time

A spreadsheet becomes personal software when you add a formula that captures how you actually work. You add it because you are tired of calculating the same thing every Friday.

Ink & Switch's [research on end-user programming](https://www.inkandswitch.com/end-user-programming/) places spreadsheets alongside HyperCard and other attempts to bring using and modifying software closer together. The ambition predates generative AI by decades. AI gives people another way to make those modifications. The desire to make tools fit is familiar.

Their [Potluck project](https://www.inkandswitch.com/project/potluck/) explores gradually enriching documents with searches, calculations, and interactive behavior. Recipes, workouts, and chores can become tools without first becoming a formal application specification. Potluck is a design precedent, not evidence that AI has already made this easy for everyone.

I like that progression. You can know what bothers you about a workflow without having a complete replacement in mind. Adding one behavior to a document you already understand gives you something small to try.

## A small tool can be enough

Simon Willison offers a concrete example of the AI-assisted route. In December 2025, he [described more than 150 single-file HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/), almost all written using language models. His examples include converting SVGs into downloadable images and inspecting clipboard contents. Many have source code and development records you can examine.

These tools show what someone can build outside a large product. Willison is also an experienced developer who can recognize broken assumptions and debug browser behavior. Choosing manageable dependencies takes judgment too. A beginner may need help with those parts.

For our reading-list example, the first version might simply accept pasted links and notes, filter them, and export a file. That would already replace part of the weekly ritual. Accounts, synchronization, recommendations, and a mobile app can wait until actual use demonstrates a need for them.

I would judge the reading tool by whether it makes that weekly sorting job easier, which requires using it beyond the first screenshot.

## Ownership has several moving parts

Source code and usable data give you a starting point for keeping the tool alive. You still need to understand its dependencies.

You need to know where it runs, which services it calls, where records are stored, and what it takes to make a change. A tool can have downloadable source while relying on a hosted service that you cannot replace without help.

GitHub Spark supplies a concrete lifecycle example. GitHub [stopped new users and new app creation on August 4, 2026](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/), with an August 31 deadline for existing users to export code. GitHub said deployed apps would continue working. Separately, the inference service behind Spark's `llm()` function had retired, requiring affected apps to use another provider.

Losing the editing environment and losing a runtime dependency require different responses. An export button can address part of the first while leaving you responsible for the second.

Before calling our reading tool ours, I would try exporting its records, opening them elsewhere, and running the tool outside its original builder. Then I would ask someone to make a small change using the available instructions. That would show what moving and modifying the application actually involves.

## Changing the tools we already have

Ink & Switch's [malleable-software essay](https://www.inkandswitch.com/essay/malleable-software/) argues that AI code generation alone leaves questions about shared data, composition, and adapting existing applications unresolved.

If every frustration produces another isolated app, we may spend our saved time moving data among them. A tool that can work with your existing notes, preserve their meaning, and let you change one behavior could be more valuable than an impressive replacement.

For a first attempt, choose a low-risk workflow with understandable inputs and exportable outputs. After using it for a while, try making the next change you need. You will learn how much help it takes to adapt the tool once the initial build is over.

<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. Opening is hypothetical; do not present it as a reported encounter.
First commission: follow one real user's narrow tool for at least a week. Capture initial workaround, technical assistance, repeat use, second modification, export, and dependency failure. Obtain permission before naming the user or meeting projects. Replace the hypothetical arc with observed details, including a failure.
Source follow-up: revisit Spark's current deployed-app status near publication; August announcement describes promised continuity, not an independently tested outcome. Malleable-software essay link checked directly; distinguish it from the research-area landing page.
-->
