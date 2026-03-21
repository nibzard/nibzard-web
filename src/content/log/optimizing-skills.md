---
title: "Optimizing Skills"
description: "Two weeks of agent benchmarks taught me that variance is a cost problem, and the real fix was better tooling."
tldr: "I spent two weeks benchmarking agent skills on Steel. The surprising result wasn't that prompts matter. It was that variance is expensive, browsing makes it obvious, and the biggest unlock came from redesigning the CLI so the environment carried more of the load."
date: 2026-03-21
tags: [AI, AGENTS, TOOLS]
draft: false
author: "Nikola Balić"
topics: [Agent skills, Benchmarking, CLI design, Progressive disclosure, Model selection]
entities: [Anthropic, OpenAI, Steel, Codex, Claude]
answers_questions:
  - "Why do agent skills matter if models are already good enough?"
  - "How do skill overlays reduce cost and variance in browsing agents?"
  - "What matters more for agent performance: better prompts or better tool design?"
---

<blockquote class="featured-quote primary">
    Skills matter. But the bigger lesson from benchmarking was that the environment matters more. A better CLI makes the skill smaller.
</blockquote>

I spent the last two weeks benchmarking agent skills, and I came out of it with an answer I wasn't expecting.

The answer wasn't really about prompts.

It started there, of course. Skills are having a moment. Anthropic pushed `SKILL.md` into the conversation, people started sharing their playbooks, and at AI Engineer NYC the whole vibe was basically: skills, skills, skills. Which makes sense. We are somewhere near the top of that hype curve right now.

But when you actually sit down and run the evals, over and over, on real tasks, something more interesting shows up.

The real problem is not that models are dumb.

The real problem is that agents start from zero every single time.

## The New Employee Problem

The simplest way to think about skills is as onboarding.

When you hire someone, you don't just throw them into production and hope for the best. You give them context. You explain how your systems work. You tell them where the traps are. You hand them the internal docs, the runbooks, the weird tribal knowledge that never made it into the README.

And even then, outcomes vary.

Some people show up with the right instincts and make good decisions immediately. Some need time. Some need much more guidance than you expected. Some head confidently into a dead end you forgot to mention.

Working with agents feels exactly like that, except you are hiring a brand new employee on every invocation.

Run the exact same task ten times and you don't get one trajectory. You get ten. One run decides to read every help page before it touches anything. Another gets impatient and starts guessing. Another hallucinated command happens to almost work, so the agent keeps digging in the wrong direction. Another gets 80% of the way there and then burns ten minutes recovering from one bad assumption.

That's the part people miss when they talk about agents abstractly. The problem isn't just quality. It's variance.

A skill is codified knowledge. It is the employee handbook, the onboarding doc, the nudge that stops the new hire from spending two days exploring the wrong cave.

## Variance Is a Cost Problem

The models are already good enough.

If you give frontier models enough time, they can usually find their way around a problem. In my runs, GPT-5.4 with extra-high reasoning and Opus 4.6 could usually grind toward an answer eventually.

But "eventually" is not free.

Time is tokens. Time is compute. Time is browser sessions waiting around. Time is proxy time, storage, memory, retries, idle states, and underlying services doing expensive things while the agent reasons about the mess it just created.

So when I say variance, I don't mean some abstract ML cleanliness metric. I mean money.

On the same task, I was seeing something like a 5x difference between a well-structured run and a sloppy one. Even under roughly identical conditions, baseline variance was often in the 20% to 40% range. Call it 30% on average.

That is enough to make an agent feel viable or feel ridiculous.

This is why I think a lot of prompt discourse misses the point. People talk as if the question is whether the model can solve the task at all. In production, that's not the only question. The more important question is: how many expensive wrong turns are you paying for on the way there?

Good skills reduce those wrong turns.

And once you see that clearly, skills stop looking like a prompt hobby and start looking like cost control.

## Browsing Makes the Pain Obvious

Most of my benchmarks were browsing-heavy tasks: filling forms, registering accounts, finding information, working through flows with real page state underneath.

This is where the problem stops being theoretical.

When an agent is just generating text or code, it can thrash around inside its own context window and mostly only waste tokens. Browsing is harsher. The agent is now operating an external system with its own timing, state transitions, failure modes, and partial visibility.

If the agent drives the session into a bad state, it often doesn't fully understand what happened. It clicked the wrong thing, dismissed the wrong modal, opened the wrong path, got rate-limited, or triggered a state transition it cannot easily unwind.

Then the waiting begins.

The agent waits for an element that will never appear. The service waits for a human action that isn't coming. The idle timeout keeps ticking. The human operator waits too. Compute burns the whole time.

This is why browsing agents can feel deceptively expensive. They don't just fail fast. They fail by drifting into a state of disrepair and sitting there confidently.

Good skills do more than improve success rates. They prevent the agent from entering those broken states in the first place.

That was also the moment I realized manual tweaking wasn't going to cut it. My first pass was exactly what you'd expect: add some dos and don'ts, rerun, eyeball the traces, declare victory. That does not scale when baseline variance is already noisy enough to lie to you.

If you want to know what helped, you need tracking. You need batches. You need reports. You need to benchmark the thing properly.

## Skill Overlays and Progressive Disclosure

The first idea that really clicked for me was skill overlays.

Instead of writing one massive monolithic skill that tries to encode everything, you create a generic base layer with the fundamentals:

- how the service works
- what the common failure modes are
- what general rules should always hold

Then, for very specific flows, you inject an overlay.

Anthropic's broader framing here is progressive disclosure. I like the overlay framing because it feels operational. You're not dumping every possible instruction into the base prompt. You're attaching a smaller, sharper layer when the task shape is known.

That specificity is the whole game.

An overlay for logging into LinkedIn is different from an overlay for posting on LinkedIn. Booking.com accommodation search is different from a generic "browse the web" instruction set. Once you accept that, the right design becomes obvious: keep the base skill broad enough to generalize, then attach specialized overlays for repeatable high-value flows.

That changed the numbers materially.

In the runs with the right overlays, I saw roughly 10x fewer tokens and about 2x less wall-clock time than runs without them. Tokens are the cleaner efficiency metric here, because some browser actions take the same amount of real time no matter what. But token reduction tells you very directly how much unnecessary work you eliminated.

Less wandering. Less re-evaluating. Less "let me inspect the environment again just to be sure."

The agent just does the thing.

## Halfway Through, the CLI Became the Story

Then came the part I didn't expect.

Halfway through this project, I realized the bigger bottleneck wasn't the skills. It was the CLI itself.

I had the harness wired up against a full Steel Cloud account, and the agent-facing CLI was struggling badly. We already knew the CLI mattered, but it had mostly been designed for humans. The printouts were readable to me, not necessarily to an agent. Some commands the agent needed simply didn't exist. Some error messages were technically correct but operationally useless.

When you watch an agent fight a surface built for human eyes, you stop believing "write better prompts" is the answer.

So we changed the surface.

Hussuf jumped on it first and reworked a big part of the CLI into something much more usable. Then Junshyoungs went further and did a Rust reimplementation push: redesigned command surfaces, cleaner agent-friendly printouts, and commands that had been missing entirely. When `v0.3.0` landed, I rebuilt the testing harness from scratch and reran the full set: twenty tasks, broad enough to be meaningful, bounded enough to compare.

That's when the pattern became undeniable.

The CLI and the skill had to improve together.

As the CLI got better, the skill got smaller. A lot of the hyper-specific instructions I'd added earlier were not actually deep agent wisdom. They were workarounds for a rough interface. Once the interface improved, that scaffolding became unnecessary.

This is an important lesson if you're building agent systems: the environment carries weight. If your tools are badly shaped, the skill has to compensate. If your tools are well designed, the skill can stay lean.

And lean skills are easier to maintain, easier to benchmark, and easier to trust.

## Claude and Codex Don't Fail the Same Way

I ran the benchmark harness across Claude and Codex, and they do not fail the same way.

Codex tends to dig deep before acting. It wants to understand the whole surface, read the help pages, inspect the options, build a local mental model, and then move. That can be excellent. It can also be overthinking.

Claude is more eager. It goes.

In a messy environment, that eagerness creates chaos. In a cleaner environment, it becomes an advantage. It feels a bit like working with a junior engineer who ships fast: if the codebase is organized and the task is clear, that energy is fantastic. If the environment is ambiguous, it turns into random motion.

With the improved CLI and tighter skills, Claude ended up a bit better in my runs precisely because Codex was sometimes too thoughtful for the job.

I also tested the faster Codex 5.3 Spark model, and that clarified another lesson: the best model is not universal. It depends on the shape of the work.

The frontier models are thoughtful. Sometimes that thoughtfulness is overkill. If the task is "book five days on the Adriatic coast," you do not need a senior engineer to reinvent the vacation-booking toolchain from first principles. You need something that recognizes the pattern, follows the flow, and finishes.

A smaller, faster model with enough context often just does that.

This is why I increasingly think "which model is best?" is the wrong question. The real question is: which model is the right fit for this workflow, in this environment, with this level of guidance?

## The Benchmark Is the Product

We ended up with six major skill versions through iteration. After `v6`, I think we're close enough that the next meaningful gains probably come from another round of CLI improvements rather than more prompt massage.

But the most valuable output from this whole exercise wasn't the topline number. It was the benchmark itself.

Each batch ran twenty tasks in parallel. Steel didn't really become the limit; my machine did. Every task spun up a coding agent, and each of those often spun up browsing sessions underneath. Running ten Claude Code or Codex sessions simultaneously is not a lightweight activity. Memory and CPU become very real bottlenecks.

Still, it worked.

And this part matters: if your task is small, or you need a prototype quickly, using a general-purpose agent can be a much better move than building a custom browsing agent from scratch. You can get a surprising amount of value before you need dedicated infrastructure.

Across those twenty-task runs, total browsing time was usually somewhere between fifty minutes and an hour. Fifty minutes meant the run was probably okay. Over an hour usually meant something had gone wrong. With proper overlays that detect known flow patterns and attach the matching instructions automatically, I think you cut that down again.

That is why I keep saying the benchmark is the real product. Without the loop, you are just narrating your intuitions. With the loop, you can watch the system teach you what it needs next.

## The Bigger Question

After two weeks of benchmarking, breaking flows, redesigning surfaces, comparing models, and reading way too many agent reports, I ended up somewhere I didn't expect.

The underlying question is not "how do I write a better prompt?"

The question is: what is the right primitive?

Once you've run enough traces on a problem, you can hand those logs back to an agent and ask it to codify what it learned. Maybe the output is a skill overlay. Maybe it's a bundle of overlays. Maybe it's a bash script that sequences the right commands. Maybe it's a Ralph loop with feedback. Maybe it's whatever we're calling autoresearch this week.

And once you see that, another uncomfortable question appears.

Do we actually need agent frameworks?

Frameworks make sense in a world where humans are writing and maintaining every layer manually. You build abstractions because abstractions help humans manage complexity.

But if agents are writing more of the code, and if the best-performing systems increasingly look like a tight loop around prompts, tools, traces, and evals, then maybe the old instinct to reach for a framework is not always the right one.

Maybe the thing we need is not more scaffolding.

Maybe we mostly need better environments and better skills.

I don't know if that's the final answer.

But that's where two weeks of benchmarking left me: less interested in prompt tricks, more interested in interfaces, and increasingly suspicious that the primitive that matters is much smaller, and much more practical, than the industry wants it to be.

---

*Note: this was also published on X. You can read the thread [here](https://x.com/nibzard/status/2035062961882955851).*
