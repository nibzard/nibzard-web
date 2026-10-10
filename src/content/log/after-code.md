---
title: "The Hidden Work After AI Writes the Code"
description: "The prototype works. Now someone has to review, operate, maintain, and eventually retire it."
tldr: "Measure the cost of a reliable, maintained outcome, including review and operation, rather than the speed of its first draft."
date: 2026-09-26
tags: ["AI", "ENGINEERING", "AGENTS"]
draft: true
author: "Nikola Balić"
topics: ["Software lifecycle", "Developer productivity", "Agent observability"]
entities: ["DORA", "Anthropic", "METR", "OpenTelemetry"]
answers_questions:
  - "What work remains after AI generates code?"
  - "How should teams measure AI coding productivity?"
---

Imagine coming back the morning after a successful AI coding demo. The application loads. Someone has already sent the link to a colleague.

You need to find out where the data lives and what happens when a request fails. Someone has to pay for the model calls and know enough to change the application next week. The prototype is now somebody's responsibility.

In this hypothetical project, I would count that work when measuring AI coding productivity. Generating the first version starts a job that continues for as long as people use the result.

## Where the saved time goes

DORA's March 2026 [analysis of AI tensions](https://dora.dev/insights/balancing-ai-tensions/) examined 1,110 open-ended responses from Google software engineers collected in Q3 2025. Respondents described easier starts and faster drafting, alongside auditing, prompting, integration, and tool-management overhead.

The responses describe where work moves, although they cannot establish a causal estimate of engineering costs across the industry. Faster drafting can come with more review; whether that saves time depends on the task and workflow.

The review burden can also land on someone other than the person who generated the code. A large change is quick to produce and slow to understand. If we only count the author's elapsed time, we can mistake a transfer of work for its removal.

I would keep changes small enough that the reviewer can explain their behavior and test the important failure cases. AI can help produce tests and review feedback too, but those outputs still need to match the actual requirement.

## Quality belongs beside cost

Anthropic's March 2026 [application-development experiment](https://www.anthropic.com/engineering/harness-design-long-running-apps) compared a solo run lasting 20 minutes and costing $9 with a fuller harness lasting six hours and costing $200. The reported output quality differed substantially; the solo application's game behavior was broken during inspection.

The costs describe this vendor experiment; they do not establish a price for reliable software in general. To compare them, we need to know what each result could do. A cheap run that misses the task and an expensive run that completes it are not interchangeable units of output.

For a real project, I would want separate records for generation, review, fixes, deployment, and maintenance. I would also record abandoned attempts. They consumed effort even if they never produced a link worth sharing.

For a small project, I would total the human time and service spending needed to keep its workflow functioning for two weeks. A file count tells me much less about whether the project was worth building.

## Give the experiment an operating plan

Someone should be able to operate a small application without reconstructing the original chat. A short operating plan may be enough; it need not have the machinery of a large platform team.

For our hypothetical app, I would write down:

- Who owns it and what recurring job it serves.
- Where it runs, where data lives, and which paid services it uses.
- Which checks show that the core workflow works.
- How to inspect a failure, revert a change, and stop the service.
- When to review whether it should remain running.

A spending chart is useful, but a budget needs a mechanism that can actually constrain activity. Reporting that an agent exceeded a limit after it finishes does not prevent the excess.

[OpenTelemetry's GenAI guidance](https://opentelemetry.io/blog/2026/genai-observability/) describes tracing model calls, tool interactions, latency, and token consumption. That can help connect spending and failures to a particular task. Capturing prompt or response content, when enabled, also creates records with their own access and retention requirements.

Use the traces to find the step that failed or consumed the budget, then decide what to change. That purpose should also guide what you collect and how long you keep it.

## Be careful with productivity headlines

METR's February 2026 [experiment-design update](https://metr.org/blog/2026-02-24-uplift-update/) warned that its follow-up data gave an unreliable estimate of the current productivity effect. Participant selection and changing working practices, including parallel agent use, complicated measurement.

An older result needs to be read in its study context. Models and tools change, as do users, the tasks they attempt, and who agrees to participate in a study.

A team can still measure its own workflow. Follow a few comparable projects through actual use. Record rework, incidents, cost, review time, and the useful job completed. If AI reduces the total burden while preserving quality, that is a meaningful win. If the prototype starts faster but becomes expensive to maintain, we should be able to see that too.


<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. Opening is hypothetical. Follow three small projects through two weeks, including an abandoned one. Separate active human effort from agent elapsed time and concurrent work; include infrastructure and model costs, review, incidents, and maintenance.
Meeting projects and their performance claims remain unverified: secure naming permission and inspect artifacts before inserting them. Avoid an industry-wide causal conclusion from DORA qualitative responses or Anthropic's worked example. METR and OpenTelemetry article URLs checked directly; revisit substantive updates near publication.
-->
