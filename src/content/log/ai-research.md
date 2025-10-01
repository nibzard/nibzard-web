---
title: "When AI Does Research: An End-to-End Experiment"
description: "How AI transformed an entire research project from conception to arXiv publication in just 2 days of FTE."
tldr: "AI agents can now handle end-to-end research workflows--from conceiving studies to final publication. This experiment revealed that SOTA models excel at research thinking, full reproducibility becomes trivial, and human time can finally be redistributed to the most valuable parts: thinking and doing better."
date: 2025-06-02
tags: [HUMAN, EXPERIENCE, AI, RESEARCH]
draft: false
author: "Nikola Balić"
source_url:
  html: https://nibzard.com/ai-research
  md: https://nibzard.com/ai-research.md
topics:
  - AI-augmented research
  - end-to-end academic workflows
  - reproducibility
  - LaTeX automation
  - concurrent research production
entities:
  - arXiv
  - Claude Code
  - Cursor
  - Vercel v0
  - o3
  - Gemini 2.5 Pro
  - Sonnet 3.7
answers_questions:
  - How can AI handle end-to-end academic research from conception to publication?
  - What makes reproducibility trivial in AI-assisted research?
  - How does AI redistribute researcher time from execution to thinking?
---

<blockquote class="featured-quote primary">
    Research that is deeply rooted in data and code writes itself.
</blockquote>

Fresh off the digital press, and you should [read it now](https://arxiv.org/abs/2506.02055).

![AI Research Paper on arXiv](/images/20250606-arxiv-paper.png)

This wasn't just another research paper. This was an end-to-end AI-augmented process: from conceiving the research question to building the survey tool, analyzing data, writing, reviewing, and final publication.

I served as judge, overseer, editor, ... The AI did the heavy lifting.

As the effort was spread over a month, it's hard to judge exact time invested--maybe 2 days of full-time equivalent work. Maybe less. The redistribution of human effort to the most valuable parts of research work (thinking, strategizing, deciding) is the real story here.

## What AI Augmented Research Actually Looks Like

The process revealed something profound about where we are with SOTA models. They don't just assist with research--they can *think* about research problems in ways that feel genuinely novel.

**The AI research workflow:**
- **Conception**: AI suggested research angles I hadn't considered (o3, gemini 2.5 pro, sonnet 3.7)
- **Survey Design**: Generated questionnaire structures and validated statistical approaches (o3, gemini 2.5 pro, sonnet 3.7)
- **Data Collection**: Built and deployed the survey infrastructure (Vercel v0, Claude Code)
- **Analysis**: Ran statistical models, identified patterns, proposed interpretations (Cursor with 2.5 pro)
- **Writing**: Drafted sections, handled LaTeX formatting, managed citations  (Cursor with sonnet 3.7)
- **Review**: Cross-checked findings, suggested improvements, caught inconsistencies (Cursor with 2.5 pro)
- **Publication**: Handled arXiv submission formatting and metadata

![AI Research Process and Findings](/images/20250606-arxiv-paper-2.png)

At each stage, the AI didn't just execute--it contributed intellectual value. It caught methodological issues I missed. Suggested statistical approaches I hadn't considered. Identified patterns in the data that sparked new questions.

<blockquote class="featured-quote secondary">
    SOTA models are really good for this. They can tap into deep knowledge and "think" of new approaches.
</blockquote>

## The Reproducibility Revolution

Here's what changes when AI handles your research infrastructure: **full reproducibility becomes mandatory standard**.

Not because you're trying to be a good citizen of science. Because it's actually easier than the alternative.

When AI generates your analysis code, builds your survey tools, manages your data pipelines--making it reproducible is trivial. The AI naturally creates clean, documented, version-controlled workflows because that's how it "thinks" about problems.

The [code repository](https://github.com/nibzard/agent-perceptions) for this project isn't an afterthought or a compliance checkbox. It's the living documentation of exactly how every result was generated. Because the AI built it that way from the start.

Traditional academic research treats reproducibility as an extra burden. AI-native research treats it as the foundation.

## The Abstraction of Academic Bureaucracy

Remember spending days fighting with LaTeX formatting? Debugging citation styles? Converting between file formats for different submission systems?

**Solved and abstracted.**

AI handles the entire mechanical layer of academic publishing:
- LaTeX compilation and formatting
- Citation management and style compliance
- File format conversions for different venues
- Figure generation and placement
- Reference cross-checking

This isn't just time-saving--it's cognitively liberating. When you're not fighting with tooling and processes for the hundredth time, your mental energy goes to the ideas that actually matter.

<blockquote class="featured-quote accent">
    LaTeX, conversions, translations, debugging = solved and abstracted.
</blockquote>

## Concurrent Research Production

The most profound shift: **concurrent research production unlocked**.

Traditional academic research is fundamentally serial. You conceive a study, execute it, analyze results, write it up, submit, revise, resubmit. Each phase blocks the next.

AI enables genuine concurrency. While one study is in data collection, AI can be analyzing preliminary results and drafting methodology sections. While you're thinking through implications of Study A, AI can be designing Study B and identifying relevant literature for Study C.

The bottleneck shifts from execution to strategic thinking. Which is exactly where human cognitive energy should be focused.

## The Open Science Multiplier Effect

AI should indirectly boost open science efforts, and here's why: **without easy data access, it sucks**.

AI research assistants are only as good as the data they can access. When researchers hoard datasets behind email requests and institutional barriers, AI can't help. When data is openly available with clear documentation, AI can immediately start finding patterns and generating insights.

The competitive advantage flows to research communities that embrace open practices. Not out of altruism, but out of pragmatic efficiency.

Open data → Better AI assistance → Faster research cycles → Competitive advantage

The feedback loop rewards openness in ways traditional incentives never could.

## Random Learnings from the Trenches

**SOTA models excel at research thinking.** They don't just process information--they make connections, identify gaps, suggest novel approaches. The intellectual contribution feels genuine, not just mechanical.

**Human-AI collaboration patterns emerge naturally.** I found myself naturally falling into a role more like a research director than a hands-on analyst. Setting strategic direction, making judgment calls, providing context and constraints.

**Quality control becomes more important, not less.** AI can generate impressive-looking analysis that's subtly wrong. The human role shifts to validation and sanity-checking rather than execution.

**The definition of "research skill" is changing.** Knowing how to run a regression becomes less valuable than knowing which questions are worth asking and whether the answers make sense.

## The Time Redistribution

Now imagine you spent a month or couple of months on one research project/paper and just redistribute that effort to thinking about doing stuff better and doing new things.

![Time Redistribution in AI-Augmented Research](/images/20250606-redistribution-research.png)
*Author illustration - numbers are just imaginary*

This is the real revolution.

When AI handles the execution layer--data processing, literature review, statistical analysis, writing first drafts--human researchers can focus on:
- **Problem selection**: What questions actually matter?
- **Study design**: How do we structure investigations to generate real insights?
- **Interpretation**: What do these results mean for the field?
- **Strategy**: Where should we investigate next?

The cognitive work shifts from "how do I implement this analysis?" to "what should we be analyzing and why?"

<blockquote class="featured-quote primary">
    Redistribution of time to the most valuable parts of research work: thinking.
</blockquote>

## What This Means for Academic Research

We're witnessing the same transformation in research that we've seen in software development. AI isn't replacing researchers--it's changing what research work looks like.

The successful academics of the next decade won't be those who can run the most complex statistical models or write the most polished prose. They'll be those who can:
- **Ask the right questions** in a world where answering them becomes trivial
- **Design studies** that generate genuine insights rather than publishable units
- **Interpret results** in ways that advance understanding rather than accumulate citations
- **Collaborate with AI** to multiply their intellectual output

## The Uncomfortable Questions

This raises uncomfortable questions about current academic incentives:

**If AI can generate research papers, what is the value of publication quantity?**

**If statistical analysis becomes automated, how do we evaluate methodological competence?**

**If literature review can be done instantaneously, what skills distinguish expert researchers?**

The answers aren't clear yet. But the questions are becoming urgent.

## Looking Forward

This experiment represents one data point in a much larger transformation. Academic research is about to go through the same AI-driven revolution we've seen in software development.

The researchers who adapt early--building AI-native workflows, focusing on strategic thinking over execution, embracing open practices that multiply AI effectiveness--will have overwhelming advantages.

The future belongs to those who recognize that **the revolution is already here**.

The choice isn't whether to use AI in research. It's whether to use it effectively before your competitors do.

---

*Want to explore the full study? Check out ["Will Agents Replace Us? Perceptions of Autonomous Multi-Agent AI"](https://arxiv.org/abs/2506.02055) and the [complete code repository](https://github.com/nibzard/agent-perceptions). The future of research is reproducible, AI-augmented, and available now.*