---
title: "Computer Use Is a Stop-Gap (and I Sell Browsers)"
description: "Frontier models reverse-engineer or rebuild legacy apps cheaper than driving their UIs. The lock-in was never the interface."
tldr: "Computer use's strongest pitch is legacy software with no APIs. But per-token-per-step GUI driving gets expensive, and brute-force models reverse-engineer protocols or rebuild apps underneath the interface — so it is a transition, and the lock-in is data. I'm in growth at a browser-infra company; I'm saying it anyway."
date: 2026-07-23
tags: [AI, AGENTS, OPINION, INFRASTRUCTURE]
draft: true
author: "Nikola Balić"
topics: [Computer use agents, Legacy software automation, Reverse engineering with AI, Data lock-in, Browser infrastructure, RPA incumbents]
entities: [Steel, Whoop, ESP32, UiPath, SAP]
answers_questions:
  - Is UI-driving automation for legacy software a durable use case?
  - What happens when models can reverse-engineer faster than they can click?
  - Where is the real lock-in if not the interface?
  - Why is the person selling browser infrastructure arguing against his own use case?
---

I'm in growth at a company that sells browser infrastructure to AI agents. Here is the thought that keeps me honest: the use case everyone cites first for computer use might have a shelf life.

The comfortable thesis, the one in every pitch deck, goes like this: decades of enterprise software will never get an API, so agents have to drive the UI. The browser becomes the universal adapter. Point an agent at a screen, let it click.

I want to argue against that. But first, the part I have to concede.

## The comfortable thesis is mostly true today

Computer use is not vapor. It is a shipped category. [Anthropic put it in public beta](https://www.anthropic.com/news/3-5-models-and-computer-use) on Claude 3.5 Sonnet in October 2024 — and honestly called it "at times cumbersome and error-prone." [OpenAI Operator](https://techcrunch.com/2025/01/23/openais-agent-tool-will-be-available-to-users-paying-200-per-month-for-pro/) followed as a $200/month Pro preview in January 2025. [Google's Project Mariner](https://techcrunch.com/2025/05/20/google-rolls-out-project-mariner-its-web-browsing-ai-agent/) landed at I/O that May. Copilot Vision went generally available that June.

Today, right now, this works. People pay for it. I help sell the plumbing. The uncomfortable part is not whether it works. It is whether it is a destination or a hallway.

It has always felt like a hallway. Slot in computer use while the world catches up.

## What brute-force models actually do

Here is where I have to be careful, because my own evidence runs ahead of the public record.

I have spent evenings with an agent grinding through the [Whoop](https://www.whoop.com/) BLE protocol — the trendy teardown — and poking ESP32 projects over USB until they became a little climate-control device I have no business building. Low-level hardware work. In both cases the model did the heavy lifting: parsing traffic, guessing field layouts, proposing commands. I steered. It cranked.

I'm telling you that as personal practice, not as proof. Go looking for a documented case of an LLM autonomously reversing a BLE or serial protocol and you will not find one — every Whoop and ESP32 reversal on the public record was human-driven. My evenings are suggestive, not citable.

The citable version lives one layer down, in binaries. In late 2024, Google DeepMind's [Big Sleep agent found a previously-unknown exploitable bug in SQLite](https://projectzero.google/2024/10/from-naptime-to-big-sleep.html) — a stack buffer underflow in `seriesBestIndex`. Project Zero called it "the first public example of an AI agent finding a previously unknown exploitable memory-safety issue in widely used real-world software." Not a toy. The model went underneath a real codebase and surfaced something the humans had missed.

The pattern, when you put a frontier model in brute-force mode, is that it does not need the UI. It reads the traffic. It reads the binary. It reads the undocumented interface. And then the interface stops being the only door.

You can already watch agents consume the results. The Whoop ecosystem alone has a [publicly reverse-engineered REST API](https://github.com/jacc/whoop-re), a [documented BLE protocol](https://github.com/johnmiddleton12/wearable), and a [local-first iOS app](https://github.com/b-nnett/goose) reading the hardware over Bluetooth. As of May, an [MCP server hands Claude read-and-write access to Whoop's private iOS API](https://github.com/thebriangao/totem): 311 operations across 47 microservices. Nobody waited for Whoop to ship endpoints. The interface was never the gate people assumed.

## The uncomfortable math (and it is not per-click)

There is a factual trap in this argument I want to defuse up front. People say you "pay per-click" for an agent driving a GUI. That is not how it is metered. [Claude Computer Use bills as standard tool-use tokens](https://platform.claude.com/docs/en/about-claude/pricing) — system-prompt overhead, the tool definition, and a vision token charge on every screenshot. The accurate phrasing is per-token-per-step, with cost scaling on every screenshot-heavy step.

The economic argument does not survive in spite of that correction. It survives because of it.

A typical multi-step task burns [50,000 to 200,000+ tokens across 20 to 80 screenshots](https://valueaddvc.com/blog/claude-computer-use-the-api-feature-that-lets-ai-control-your-desktop) — roughly $0.50 a run on a Sonnet-class model, about 100× a plain API call. At 10,000 runs a day you are at ~$180k a month for a single workflow. And the part that keeps me honest about my own job: that cost is almost entirely frontier-model inference on every screenshot. The browser session itself — the thing Steel sells — costs fractions of a cent per task. **I am not the expensive part of this story. The model is.**

So at some volume the math flips. It becomes cheaper to reverse-engineer the protocol — or just rebuild the app — than to pay for a fresh screenshot inference on every step of every run, forever. Anthropic's own [COBOL-modernization work](https://claude.com/blog/how-ai-helps-break-cost-barrier-cobol-modernization) compresses those timelines "from years to quarters."

## The part that should make me nervous

Here is where the counter-evidence is stronger than my first draft admitted.

In April 2026, [SAP revised its API policy](https://automationtoday.net/featuredarticles/sap-api-policy-update-sparks-concern-over-ai-access-and-erp-integration/) to explicitly prohibit autonomous agents from planning or executing sequences of API calls. A top-tier enterprise vendor just walled off the clean route. If you are cheering for the stop-gap thesis, that is bad news: closing the API pushes agents back onto the GUI, which keeps interface-driving alive *longer*, not shorter.

The incumbents are not dying either. [UiPath posted FY2026 revenue of $1.611B](https://ir.uipath.com/news/detail/431/uipath-reports-fourth-quarter-and-full-year-fiscal-2026-financial-results) — up 13% year-over-year — on $1.853B in ARR, with sustained GAAP profit and a $500M buyback. They rebranded to "Agentic Automation" and pitched deterministic RPA as the governed orchestration layer *over* AI agents. One customer, Wesco, says flatly that robotic process automation will orchestrate the agents. That is not a category in retreat.

And the reason it is not in retreat is the reason I should not oversell: agents are not reliable enough yet. [About 95% of AI-agent pilots fail](https://www.computer.org/publications/tech-news/trends/ai-agents-fail-production); 95% per-step accuracy compounds to roughly 60% end-to-end across a multi-step flow. Under those conditions, deterministic UI automation stays necessary for mission-critical work. The [long-tail argument](https://aaai.latere.ai/en/orchestration/computer-use) — mainframes, seat-priced SaaS, vendors with no incentive to ship endpoints — is right that this software may never get an API. I concede it.

So let me reframe honestly. The stop-gap thesis does not hold for the extremes. The immovable legacy giants — SAP-scale ERP, mainframes still running the COBOL that handles [~95% of US ATM transactions](https://claude.com/blog/how-ai-helps-break-cost-barrier-cobol-modernization) — will keep their screens a long time. Neither an API nor a rebuild is coming for them, and you would not trust an unsupervised agent near them anyway.

But the vast middle — the apps expensive enough to click through that the per-token math stings, and cheap enough to reverse or rebuild — that is the hallway. That is where the stop-gap gets hollowed out.

## "It will just redo the thing"

Even legacy apps are not safe as *destinations*. If an agent can extract the logic, the interface stops being the moat.

What survives is the data. The datasets, the history, the records — the one thing an agent cannot regenerate from scratch. Whoop's defensible asset was never the app; it was the years of wrist data. Once the protocol was reversed and the MCP server existed, the app became replaceable. The data did not.

<blockquote class="featured-quote primary">
The moat migrates from artifact to asset.
</blockquote>

That is my compression, not a named aphorism — though the intellectual root is [Jerry Chen's "New Moats" framing](https://www.linkedin.com/pulse/reflections-moat-ai-driven-world-gert-l%25C3%25B5hmus): advantage moving from Systems of Record to Systems of Intelligence. Either way the destination is the same. As [Madrona put it](https://www.madrona.com/5-non-negotiable-ai-startup-success-factors-in-2025/): "Data isn't a byproduct of product usage — it is the moat."

COBOL is the proof I cannot argue around. AI can compress modernization from years to quarters. It has not, at scale, because the reason COBOL persists is not that we lack the cycles to rewrite it. It is that the data and the workflows sitting on top are the actual lock-in. The artifact is replaceable. The asset is not.

## Everything is a transition phase, including my job

I do not know the timeline. Six months? Three years? The counter-evidence says longer than I would like; the cost curve says the crossover is real and approaching. Holding both is the honest position.

The discipline that uncertainty forces is useful even if I am wrong about the date. If you build interface agents, know which slice of your value is the stop-gap — the clicking, the adapting, the GUI-scraping — and which part compounds. Data compounds. Workflows compound. Trust and distribution compound. Per-screenshot inference does not.

And here is why I can argue this while collecting a paycheck from browser infrastructure: browsers were never just adapters for legacy UIs. The web is where the work lives and where the data accumulates. The adapter use case — drive the old screen because there is no API — can die, and the environment use case survives it. Agents still need a place to operate, to read, and to act. That place is still the browser. I am not betting against my job. I am betting the job outlives the adapter.

## Bet on what they cannot brute-force

The list of things agents cannot brute-force is shorter than you think, and it is shrinking. But it is not empty. Data is on it. Hard-won workflow history is on it. Trust earned over years of being right is on it.

The interface is not.

