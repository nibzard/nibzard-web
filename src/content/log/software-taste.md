---
title: "Taste Is Becoming More Important in Software"
description: "Generating alternatives is easier. Choosing useful, coherent work still requires criteria and contact with real users."
tldr: "Define what good means, vary alternatives deliberately, and test your choices against users rather than relying on polish."
date: 2026-09-26
tags: ["AI", "DESIGN", "PRODUCT"]
draft: true
author: "Nikola Balić"
topics: ["Design judgment", "Creative diversity", "User testing"]
entities: ["Anil Doshi", "Oliver Hauser", "Microsoft Research", "Anthropic"]
answers_questions:
  - "What does taste mean in software design?"
  - "How can teams test design judgment with AI?"
---

Imagine two interfaces for booking a repair. One has beautiful transitions, a dashboard, and a cheerful assistant. The other asks what broke, when you are available, and how to contact you.

I would need to know who is using them before choosing. The first might suit someone managing hundreds of repairs; the second might suit someone with one broken appliance.

In this hypothetical comparison, taste includes deciding which interface fits the job. As generating alternatives gets easier, I want to be able to explain why I would keep one.

## Name the decision

Taste can describe several judgments that are easy to blur together. You might prefer a visual style, recognize a coherent structure, notice an unnecessary feature, or understand that a design makes the user's task harder.

Those judgments need different evidence. Aesthetic preference can be honestly personal. Accessibility can be checked against requirements and tested with relevant users. Whether someone understands the main action can be observed. Whether the extra dashboard is useful depends on what they need to do.

For our booking example, I would define success before generating the interface. A person should understand what service they are requesting, provide enough information, select a workable time, and know whether the booking is confirmed or awaiting review.

Even a polished screen fails part of the job if it leaves the person unsure whether their booking is confirmed.

## Individual quality and collective variety differ

Doshi and Hauser's 2024 [short-story experiment](https://arxiv.org/abs/2312.00506) found that access to AI-generated ideas improved evaluations of individual stories, particularly for less creative writers, while AI-assisted stories became more similar to one another.

The result concerns this writing task, so it cannot settle whether AI improves creative work generally. Within the experiment, better individual evaluations came with less variety across the stories.

A CHI 2024 [visual-ideation experiment](https://arxiv.org/abs/2403.11164) involving 60 participants found greater fixation and fewer, less varied, less original ideas in the AI-supported condition than in the baseline. The brief task and participants' limited professional experience matter when interpreting the result.

These studies make me want to inspect what varies across the alternatives. Ten screens can all begin with the same assumptions about the user's task.

For the repair service, deliberate variation might mean testing a direct request form, a guided diagnostic conversation, and a repeat-customer shortcut. Those options change the workflow. Recoloring a dashboard would leave its assumptions intact.

## Selection requires attention

Lee and colleagues' CHI 2025 [survey of knowledge workers](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/) gathered 936 examples from 319 respondents. Participants described critical-thinking work moving toward verifying information, integrating responses, and overseeing tasks. Higher confidence in AI was associated with less reported critical thinking.

The survey is self-reported and observational, so it cannot demonstrate that AI causes permanent cognitive decline. It describes the effort people put into checking and using outputs, work that can feel optional when generation is easy.

A useful selection habit is to record why you reject an alternative. "I dislike it" is legitimate as a preference. "People cannot tell whether the request was accepted" is a testable usability concern. "This feature creates maintenance work without serving the brief" is a scope decision.

Keeping those reasons separate makes revision more productive. You can disagree about style without dismissing a failed user task, and you can remove a feature without pretending it was technically broken.

## Some judgment can be automated

Anthropic's March 2026 [application-development work](https://www.anthropic.com/engineering/harness-design-long-running-apps) describes translating subjective design judgments into criteria for an evaluator agent, with examples used for calibration.

Parts of design evaluation can already be expressed and automated, which complicates claims that taste will always be uniquely human. I would still want to check whether the evaluator's preferences fit the intended users.

A system can become very good at rewarding its own rubric. If the rubric favors visual novelty, an unusual navigation scheme might score well while confusing the person trying to book a repair. Human judgment has the same vulnerability when it treats the author's preferences as the user's needs.

## Put the choice in front of someone

For a worked comparison, I would take one small brief through three workflows: direct generation, generation with explicit criteria, and generation followed by user testing and revision. Record time and cost alongside completion, confusion, accessibility issues, and the reasons for rejected options.

The exercise would show how these workflows handle this brief; it could not establish a permanent ranking of models or designers. A useful result might be discovering that the preferred screen needs a plainer status message, or that an impressive feature should disappear entirely.

Before testing a generated design, write down who it is for and what they need to do. Decide what would count as a failure, then watch someone try it. Keep the observations alongside your reasons for choosing the design so you can see where your judgment held up and where it needs revision.

<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. Interfaces and proposed experiment are hypothetical. Run the three-workflow comparison with the same brief, document evaluator criteria and rejected alternatives, and obtain consent for user observations. Keep scale and limitations explicit.
Science publisher page could not be retrieved in this session; linked author manuscript was retrieved. Verify the final published text before adding detailed statistics. CHI fixation result is task-specific; critical-thinking study is self-reported and observational. Do not claim permanent uniquely human taste or general cognitive decline. Confirm any meeting model comparison through inspectable outputs before naming it.
-->
