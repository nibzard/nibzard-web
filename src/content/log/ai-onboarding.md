---
title: "AI Has an Onboarding Problem"
description: "A powerful model still needs a useful starting task, clear limits, and a workflow people can repeat."
tldr: "Teach one useful, verifiable workflow. Measure whether someone can complete it independently and return to it later."
date: 2026-09-26
tags: ["AI", "PRODUCT", "UX"]
draft: true
author: "Nikola Balić"
topics: ["AI adoption", "Onboarding", "Workflow design"]
entities: ["Microsoft Research", "Anders Humlum", "Emilie Vestergaard"]
answers_questions:
  - "Why does an impressive AI demo fail to produce repeat use?"
  - "What should AI onboarding teach?"
---

Suppose someone watches a messy document become a tidy summary. They ask questions and say they can see how it would help. A week later, they have not tried it themselves.

We still need to observe an actual handoff like this. For this hypothetical one, I would ask what the person needs to repeat the useful part without someone running the demo for them.

They need to recognize a suitable task, choose information they are allowed to share, ask for an appropriate result, and check it. They also need a reason to do all that again.

## Enthusiasm leaves work behind

An empty chat box leaves you to decide what to ask and how to use the answer.

For an experienced user, that might be convenient. For someone starting out, even choosing the first task can be difficult. Should they upload a document? Which document? Can it contain customer details? How would they know whether the result omitted something important?

The response depends on what is stopping them. An employer restriction needs a permissions decision; someone unsure where to start may need training. If the model fails at the task, a better template may leave that failure intact. Explaining permissions also leaves the person to find a reason to use the product.

Humlum and Vestergaard's [research on ChatGPT adoption](https://knowledge.uchicago.edu/records/j95qg-jxd71) surveyed roughly 18,000 Danish workers across 11 exposed occupations. Employer restrictions and perceived training needs were important barriers. An intervention explaining potential time savings did not meaningfully change usage.

Communicating benefits left barriers intact in this study. Which onboarding interface might address them still needs testing.

## Teach the job people came to do

Consider a person preparing for a community meeting. In our worked example, the input is a public agenda, and the desired result is a checklist of decisions, unanswered questions, and dates to verify.

A guided workflow could ask for that agenda, explain that it works best with explicit dates and decisions, and place extracted items beside the relevant passages. The person can check each item before copying the list into their notes. Next week's repeat action is obvious: use the next agenda.

The person has a reason to use the checklist and a way to check it against the agenda. A scheduled discussion, for example, should remain a discussion in the output; the assistant should not turn it into a decision already made.

The assistant in [Generative AI at Work](https://arxiv.org/abs/2304.11771) operated inside a customer-support workflow. The study covered 5,172 agents and found an average 15% increase in issues resolved per hour, with larger gains among less experienced and lower-skilled workers.

The study shows benefits from assistance within that support workflow. It did not compare a guided interface with an empty chat box, so it cannot separate the interface from the effects of the tool and work context.

## A useful first success includes noticing an error

A product can make someone feel capable while leaving them unable to recognize failure.

Microsoft's [human-AI interaction guidelines](https://www.microsoft.com/en-us/research/?p=564561) recommend explaining capabilities and performance, supporting correction, and narrowing activity when uncertainty is high. These are practical onboarding requirements. A user needs to know how the tool can be wrong and how to respond.

For the agenda workflow, try a deliberately incorrect date in a sample result. Can the person find it by following the interface's checking instructions? Can they correct it without starting again? If the answer is no, the successful-looking first run has not taught enough.

Capability remains part of this problem. The [jagged-frontier experiment](https://www.hbs.edu/ris/download.aspx?name=24-013.pdf) with 758 consultants found benefits on tasks within the tested model's capabilities, and reduced correctness on a selected task outside them. The experiment used an earlier generation of GPT-4; it should not be read as a ranking of today's systems.

Onboarding needs to help people choose tasks as well as operate the interface, because task selection changes whether assistance helps.

## Measure what happens after the handoff

I would compare two ways of starting the same low-risk job: an open prompt and a guided workflow. Then I would record time to a verified result, requests for help, missed errors, and whether the person could explain the result's limits.

A week later, give them a fresh input without live coaching. Watch whether they remember where to begin and can complete and check the job. Later, see whether they choose to return when they have a real need.

A small usability exercise will not prove that a design works for everyone. It can expose a specific place where our instructions, assumptions, or interface fail.

I would keep the first workflow small enough to verify. Once someone can repeat it independently, they have a way to judge whether a more ambitious use is helping.

<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. Restore brief's longer title as a subtitle/deck if useful; frontmatter title stays below 60 characters.
Report an actual failed handoff with consent. Run exploratory beginner tests comparing the same task and information in both conditions. Record prior AI experience, permissions, help, planted error detection, and one-week return. Keep a small test illustrative.
Verify journal versions before publication: support-study statistics should remain from the revised/published 5,172-agent version; frontier experiment dates and model generation must be explicit. Do not describe five minutes to value as an established scientific threshold or non-use as laziness.
-->
