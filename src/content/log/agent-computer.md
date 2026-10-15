---
title: "Build the agent. Don’t build its computer."
description: "Specify the computer your agent needs, test how it recovers, and start with managed infrastructure."
tldr: "The agent is your product and its computer is infrastructure. Specify what it needs, test recovery, and start managed. Build only when no provider meets a hard requirement or ownership gives you a clear advantage."
date: 2026-10-15
tags: [AI, AGENTS, INFRASTRUCTURE]
draft: false
author: "Nikola Balić"
canonical: "https://steel.dev/blog/build-the-agent-not-its-computer"
topics: [Agent infrastructure, Managed infrastructure, Recovery, Sandboxes]
entities: [Steel, Internal Agents Map, Fly, Shopify]
answers_questions:
  - Should you build or buy agent infrastructure?
  - What does an agent’s computer need to provide?
  - How do you test recovery before choosing a provider?
---

> I wrote this article for Steel. Originally published on the [Steel blog](https://steel.dev/blog/build-the-agent-not-its-computer) on October 7, 2026.

Should you build or buy AI agent infrastructure? Specify the computer your agent needs, test how an agent sandbox recovers, and start managed. Includes a provider map.

![An engineer builds a small robot while distant crews operate the compute infrastructure](/images/agent-computer/cover.png)

If your team builds agents and has no execution platform that already fits, specify the computer, test how it recovers, and start managed unless owning it makes the agent better.

<figure>
<img src="/images/agent-computer/diagram-1.svg" alt="You build the agent and specify the computer it runs on" />
<figcaption>You build the agent and specify the computer it runs on</figcaption>
</figure>

TL;DR

- The agent is your product and its computer is infrastructure. Write down what the computer has to do, test whether a provider actually does it, and start with managed infrastructure. Build it yourself only if:
- **You have a hard requirement no provider meets**, or
- **Owning it gives you an advantage you can name.**

As we built internal agents for everything from code review to knowledge management and team communication, we kept running into the same question: where should they run, and how do we manage them at scale?

An agent that works in a demo still needs a computer to keep working. It needs a browser that stays signed in, files that survive until tomorrow, tools, access rules, and a way to continue after something breaks. Teams answer that need in one of three ways:

1.  They run the agent on **a laptop or a single server** until the agent outgrows that setup.
2.  They **build their own platform** for agent computers.
3.  Or they **buy one from a provider** and test that it does the job.

This article argues for the third, with a middle ground for teams that must keep compute inside their own network.

Take a **competitive-intelligence agent**. Every morning it opens ten competitors’ pricing pages, changelogs, and docs. It signs in to the few that sit behind a login, downloads their PDFs, compares everything with yesterday, and posts what changed to Slack. The demo works because the browser is already signed in, the files are on one machine, and someone is watching.

Then it has to run again tomorrow. It needs yesterday’s snapshots to compare against and the same signed-in sessions, and **a saved browser profile does not guarantee a valid login.** When a login expires or a site starts to block it, a person must fix that without throwing away the morning’s work. And it must not post the same change to Slack twice.

You could build that environment yourself. As more agents and users arrive, you would also allocate capacity, keep sessions apart, maintain images, investigate failed starts, and explain which work survived a failure.

**Your team would own a second product:** the service that supplies computers to its agents. Every hour spent on provisioning, isolation, snapshots, scheduling, and recovery is an hour not spent on the agent.

## What we mean by an agent’s computer

An **agent’s computer** is the working environment it can operate: its browser, files, tools, processes, access, and the state its task needs to continue.

<figure>
<img src="/images/agent-computer/diagram-2.svg" alt="Browser, files, tools, access, and state form the working environment" />
<figcaption>The working environment</figcaption>
</figure>

To learn how other teams solve these problems, we kept notes on the agents that companies build for their own work. The notes grew into the [Internal Agents Map](https://internal-agents.com/), which we now share as a public catalog. Its [definition of an internal agent](https://internal-agents.com/definitions) explains why the computer matters:

> An internal agent is one that “works with company context and tools to carry out the organization’s own work.”
>
> “A model alone doesn’t know the codebase, follow the processes, or reach the tools. The organization supplies those.”

The computer is where the agent reaches them. For the competitive-intelligence agent, the browser must reach the right pages with the right session. A tool must compare today’s snapshot with yesterday’s. The result must stay available for review with its source attached. The environment connects those steps with the right access.

This environment may span several services, such as sandboxes, browser services, storage, or an existing development platform. It need not be a graphical desktop or a machine that runs forever. A temporary worker is enough if another service preserves the state the next worker needs.

Some workloads benefit from a **persistent computer** rather than a disposable sandbox. In [Fly’s announcement](https://fly.io/news/fly-io-launches-computers-for-agents/), investor Martin Casado of Andreessen Horowitz described Fly as “giving agents real computers instead of disposable sandboxes.”

A persistent computer can make sense **when setup is expensive or a process must keep running between steps.** Preserving more state can save setup time, but the trade-off depends on storage charges, idle billing, wake-up time, and recovery guarantees. A persistent workspace need not bill for compute while it sleeps. The tests later in this article show which one your task needs.

The **harness** is a separate part of the system. It manages model calls and tool execution, and it can run outside the environment where commands execute. Some agents need no dedicated environment because remote tools already provide everything their tasks require. [Shopify describes the same split](https://internal-agents.com/agents/shopify-internal-agents) behind River, its internal Slack agent: a durable identity, a disposable agent loop, and isolated execution, each replaceable on its own.

“The agent needs somewhere to execute code” leaves many questions open. “The agent must continue tomorrow’s comparison under the same user’s access rules” gives the team something to design and test.

## Scaling browsers is scaling computers

A browser session looks like one program. Underneath, it is a computer. In our current fleet, each browser session runs in its own microVM, with its own kernel, memory, network interface, and files. To run more browsers, we run more computers.

**A fleet of browsers needs the same capacity planning, isolation, and scheduling as any fleet of agent computers.** Small settings decide how fast an agent can start work. In our fleet, reducing each browser VM from four virtual CPUs to two improved cold starts under the same host load.

In the last six months, we started three rebuilds of this infrastructure and changed its primitives each time. We stopped one before it reached production. The first version ran on an external vendor’s platform, and it still serves some sessions. **When the vendor had problems, our customers saw failed Steel sessions.** The version we are building now runs on our bare-metal servers, which gives us much more control over the runtime, scheduling, storage, and network path.

Proxies taught us the same lesson from outside our own infrastructure. Customers reported proxy failures inside Steel sessions as Steel outages. Over 30 days, customer-supplied proxies failed to establish a tunnel about 9.0% of the time, and Steel-managed proxies about 0.4%. Those figures cover tunnel setup only. The user did not care which layer failed. They saw a task that stopped.

Reliability engineers call this a **series system**: the whole works only when every part works. An agent run is a long series. Imagine a workflow where each step usually succeeds:

<figure>
<img src="/images/agent-computer/diagram-3.svg" alt="Illustrative single-attempt success rates for seven steps, from 80 to 99 percent, multiply to a 61.8 percent reliable workflow" />
<figcaption>Illustrative single-attempt success rates for a seven-step workflow</figcaption>
</figure>

Each step looks fine on its own. In this simplified example, every step must succeed, each gets one attempt, and the outcomes are independent, so the success rates multiply to 61.8%, and 38% of runs fail. Real workflows also have dependencies between steps, retries, and fallbacks, so model those too. Even so, if one layer is misconfigured, slow, or fails in a way that nobody can see, the agent’s user gets a broken product.

**Every layer is a multiplier, and your users get the product of all of them.** When any layer fails, they see a stopped task in your product, even if you bought that layer. Each layer you operate yourself is one more rate your team must keep high. Each layer you buy should show which step failed and let the agent resume from there. A capable provider also brings operating experience from many customers, so check that experience during your evaluation.

In [our proxy investigation](https://steel.dev/blog/developer-tools-come-with-an-assembly-required-sticker), we could check the health of proxies we managed and replace a failing one when changing the IP was safe. With customer-supplied proxies, blind rotation could break a session that depended on its network identity. We began work to make **each error name the active proxy, its owner, and the failure stage**, so a team can see which step in the series failed.

We made this decision ourselves, one layer down. Every agent product sits on a stack: hardware, the runtime that turns hardware into computers, the computer the agent uses, the harness, and the agent itself.

We started by buying the layer below us. We built it when we could name what owning it gives our customers: speed, density, and failure behavior that directly affect the product they use. That is the second reason to build, described later in this article. **For most teams that build agents, that layer is not the product**, and operating it creates a second product they do not need.

## Customize the environment, then choose who operates it

Your team may need a customized environment: exact package versions, a base image with your internal tools, browser profiles that stay signed in, a fixed outbound IP or proxy region, a private connection to an internal service, data that stays in one region, and access limited to one customer’s records. **You decide which requirements are necessary, wherever the environment runs.**

**Operating the service that delivers those requirements is a separate decision.** A provider can start workers and preserve specified state while your team controls the configuration. Your team owns configuration, integration, and the product result. The provider operates the service you contract for, and its experts back you up when something breaks.

<figure>
<img src="/images/agent-computer/diagram-4.svg" alt="Your team decides agent behavior, environment configuration, and service operation; a provider can operate the service layer" />
<figcaption>The provider operates only the service layer</figcaption>
</figure>

For the competitive-intelligence agent, the division might look like this:

| Responsibility            | What your team must decide                                                       |
|---------------------------|----------------------------------------------------------------------------------|
| Agent behavior            | Which competitors and pages to watch, what counts as a change, and when to alert |
| Environment configuration | Browser profiles and logins, proxy region, tools, file locations, and retention  |
| Service operation         | Who supplies capacity, keeps sessions isolated, and restores the saved state     |

Division of responsibility

[WorkOS’s Horizon](https://workos.com/blog/project-horizon) shows this separation. WorkOS needed its complete development stack, programmatic lifecycle control, and explicit outbound network controls. It lacked an existing cloud development platform and considered building one on EC2. The team first used Codespaces for a working prototype, then selected Cloudflare as its requirements became clearer. **WorkOS retained its own orchestration outside the sandboxes.**

A service that gets the prototype running may not provide the control the eventual workload requires. That can justify changing providers without justifying an internal compute platform.

Buying the service leaves your team responsible for the product’s result. You still evaluate the outputs, decide how users access them, and decide which actions need a person’s approval.

## How to test an agent’s computer

Return to tomorrow’s work. Before choosing an environment, identify the state that must survive.

<figure>
<img src="/images/agent-computer/diagram-5.svg" alt="A run is interrupted; the next run resumes from saved state" />
<figcaption>The next run starts from what was saved</figcaption>
</figure>

| State             | What continuation requires                                                   |
|-------------------|------------------------------------------------------------------------------|
| Files             | Yesterday’s snapshots, downloads, and completed comparisons remain available |
| Browser identity  | The agent can use the correct account, or a person can restore access        |
| Running processes | Necessary tools resume, or restart from saved inputs                         |
| Agent progress    | The next run knows what finished and what remains                            |
| External actions  | The application can determine which changes already reached another system   |

State that must survive

These states have different lifetimes. Preserving a conversation does not preserve a download. Restoring a disk does not restore a running process. An authenticated browser profile can outlive a worker while its login still expires at the website.

The [hosted sandboxes in OpenAI’s Agents API](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted) show how separate these lifetimes are. Workspace files persist while the sandbox exists; published output artifacts can remain after it expires. Connected sandboxes receive keep-alives between turns. If both activity and keep-alives stop for an hour, the sandbox can be deleted. **Applications must distinguish saved session information from the lifetime of their working files.**

For the competitive-intelligence agent, a temporary worker may be the right choice. It could save the snapshots and verified comparisons, then restart its tools when work resumes. If tool setup is expensive, preserve more process state. The task should determine how much state you pay to retain.

**Human intervention belongs in this test.** Let the login expire halfway through the workflow. Check whether a person can identify the problem, regain access, and return control without restarting the comparison. Decide how agent actions pause while the person acts, including what happens if their connection drops.

[Sentry’s Junior](https://internal-agents.com/agents/sentry-junior) makes this pause part of the network path. Its outbound proxy injects credentials for configured domains, or pauses the agent until a person authorizes access.

Also interrupt an external action. Suppose the agent posts the day’s changes to Slack, but loses the response before it records success. Restarting the computer cannot tell it whether a retry will post a duplicate.

An operation identifier helps only if the receiving system [uses it to deduplicate requests](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) or lets your application reliably find the original result. Otherwise, the application needs another reconciliation method before retrying. **That remains application work even with reliable compute.**

Access requires the same care. Stephen O’Grady of RedMonk [writes](https://redmonk.com/sogrady/2026/09/16/new-new-kingmakers/) that sandboxes “exist to give the exploding number of agents more autonomy, while not trusting them.”

Isolation keeps the agent away from other workloads. **It does not limit what the credentials inside the sandbox allow.** Define what the task may read and change, then test those limits. Keeping a long-lived token outside the worker reduces one exposure; it does not settle whether an authenticated action is appropriate.

Write the expected results down as a contract. For the competitive-intelligence agent, it could look like this:

| Failure to inject                                | Pass when                                                                                        | Who is responsible                                                             |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Replace the worker after some comparisons finish | Saved snapshots and finished comparisons are recoverable, and unfinished work is identifiable    | The provider keeps the promised files; your application records progress       |
| Expire the login during the run                  | The agent pauses affected actions, keeps its progress, and resumes after a person signs in again | The provider supports the browser handoff; your application pauses and resumes |
| Lose the response to a Slack post                | The application records the outcome as uncertain and reconciles it before a retry                | Your application and the receiving system, not the computer                    |
| Disconnect the person during a handoff           | Control does not return to the agent in an unsafe or undefined state                             | Your application, using the provider’s session controls                        |

Acceptance tests

**Keep the first evaluation small.**

1.  Run one typical task.
2.  Disconnect the client and reconnect.
3.  Separately, stop or replace the execution environment in a disposable test.
4.  Attempt to continue from the state the service promises to preserve.
5.  Record what resumes, what must restart, and what requires a person.
6.  Check who has enough information to make each repair.

This is a smoke test. Before production, repeat it with real concurrency, injected failures, and latency distributions. **A clean pause and resume does not prove recovery from an abrupt host failure.**

**Measure time until useful work**, including authentication and tool setup. A fast machine start has limited value if the agent spends its next minute rebuilding the environment. [Stripe avoids most of that rebuild](https://internal-agents.com/agents/stripe-minions) by starting its Minions in pre-warmed devboxes that already hold recent copies of its main repositories. Include retries and review effort when you calculate cost per accepted result.

## When to build your own agent infrastructure

There are two reasons to build the service yourself:

1.  A hard requirement that no provider meets, such as a network boundary or a hardware configuration.
2.  An advantage in the infrastructure itself, for your product or your economics, that is worth owning.

**Everything else starts managed.** Buy first, learn what your agent needs, and then decide whether to build. Building a platform before you understand the workload is the wrong order. AI coding agents make a platform look quick to build, and **that is the trap**: the code is the small part, and operating it is the second product described at the start of this article.

A requirement about where the computer runs does not always mean you must build the service. Two middle options keep the compute inside your network:

- With **managed BYOC** (bring your own cloud), the provider operates its service inside your cloud account: Northflank can run sandboxes in your account, and Steel can operate its browsers in yours.
- With **self-hosting**, your team operates someone else’s software: Microsandbox is an open-source microVM runtime that you can run on your own hardware, and [Steel’s open-source browser API](https://docs.steel.dev/overview/self-hosting/docker) can be self-hosted.

**Where the compute runs and who operates it are separate questions.** Before you compare these options, specify who owns patching, capacity, backups, recovery, and incident response. Try them before you build the full service.

An existing internal platform is a special case, because you already own it. Compare the work to extend and support it with the integration a provider would require. [Airbnb](https://internal-agents.com/agents/airbnb-airchat) is one example. Its Dev AI team spent months on an internal agent orchestrator that never shipped, then moved to a thin wrapper over vendor coding agents. Those agents run in AirDev, Airbnb’s existing remote development workspaces. **Airbnb bought the agent and kept the computer it already operated.**

[Sierra built the infrastructure for Pinecone](https://sierra.ai/blog/pinecone-harnessing-the-wisdom-of-the-workforce), its internal cloud agent. Different roles needed different combinations of tools, data, and permissions, and Sierra says it **could not find a suitable cloud agent provider** at the time. The same infrastructure also supports Ghostwriter, its customer-facing agent product.

Sierra had both reasons: a requirement no provider met, and a second product that uses the same infrastructure.

“We could build it” is not a reason.

<figure>
<img src="/images/agent-computer/diagram-6.svg" alt="Three options: buy a managed service, run it in your own cloud through managed BYOC or self-hosting, or build the service yourself" />
<figcaption>Three ways to get an agent computer</figcaption>
</figure>

**Before taking ownership, name the requirement and the engineer or team responsible for operating the service.** Include maintenance after the original authors move on. At sufficient utilization, the economics may justify that commitment; at low utilization, staffing can dominate the cost.

**Before you sign, ask the provider:**

- where browser profiles, files, logs, and backups live
- who can access them
- who handles upgrades and incidents
- what recovery it promises
- what evidence you get when something fails
- what you can export or delete when you leave

**If you buy, plan your exit.** Keep environment recipes and accepted results in forms you can move. Test what happens to unfinished work when you recreate its environment elsewhere. A different SDK is manageable; discovering that essential state cannot leave is a larger problem.

We build browser infrastructure and list Steel in the map below, so we have a commercial stake in this recommendation. Any service, including ours, should earn its place by meeting your workload’s requirements and reducing what your team has to operate.

## A map of agent sandbox providers

The tests above show that there is no single best provider. **The best one fits your workload**: the agent, the state it must keep, and the result it must deliver. Some providers optimize for inexpensive short-lived execution. Others optimize for persistent workspaces, many parallel sandboxes, development environments, GPUs, or real browsers. The categories below are **starting points, not rankings**, and they overlap.

| If you care most about                           | Providers to look at                                               | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------------------------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Low-cost CPU execution in ComputeSDK’s model     | Sandbox0, Upstash Box, Isorun                                      | These three are the lowest-cost options in [ComputeSDK’s displayed pricing scenario](https://www.computesdk.com/compare): 60 seconds on an 8 vCPU, 16 GiB sandbox. That is a modeled compute price, not a measured cost to finish your workload. Re-price your own workload before you choose.                                                                                                                                                                                                                                                                |
| A general-purpose managed sandbox                | E2B, Daytona, Blaxel, Vercel Sandbox, Cloudflare Sandbox, CreateOS | Start here when the agent needs to run code in an isolated Linux environment with a shell, files, processes, networking, and an API-managed lifecycle, and your team does not want to operate the worker fleet. All six appear in [ComputeSDK’s sandbox benchmarks](https://www.computesdk.com/benchmarks/sandboxes).                                                                                                                                                                                                                                         |
| Coding and software-engineering agents           | Daytona, Runloop, Namespace, Together Code Sandbox                 | Look here when the agent clones repositories, installs dependencies, compiles, runs tests, or starts development servers. Together Code Sandbox is built on CodeSandbox’s microVM technology.                                                                                                                                                                                                                                                                                                                                                                 |
| Long-running or stateful agents                  | Isorun, Sail, Archil, Sandbox0, Fly Sprites                        | Evaluate these when work must survive long gaps, setup is too expensive to repeat, or sandboxes must sleep and resume. Check what each one keeps. Isorun and Archil document that files, memory, and running processes survive a pause. By default, a Sandbox0 pause keeps the filesystem but not processes, memory, sockets, or live sessions; a mode that also keeps memory is experimental. Fly Sprites keep their disk while they sleep, and their checkpoints capture the full filesystem; a restore rewinds files but does not resume a paused process. |
| Many parallel sandboxes                          | Modal, Northflank                                                  | Look here when every user, task, rollout, or branch needs its own environment. Modal cites more than 100,000 concurrent sandboxes; Northflank cites more than 10,000 isolated workloads. These are vendor-reported figures, so check your account limits and the resource size behind them.                                                                                                                                                                                                                                                                   |
| GPUs or compute-heavy work                       | Modal, Beam, Northflank, Daytona                                   | Start here when the workload needs GPUs for inference, fine-tuning, or other compute-heavy work. Each lets you attach GPUs to a sandbox. Daytona’s GPU sandboxes are ephemeral and use up to 8 GPUs.                                                                                                                                                                                                                                                                                                                                                          |
| Control over where the sandbox runs              | Northflank, Microsandbox                                           | Consider these when the infrastructure boundary is itself a requirement. Northflank can run sandboxes in your own cloud account. Microsandbox is an open-source microVM runtime that runs locally; its managed cloud is in private beta, and your own cloud or hardware is available on request.                                                                                                                                                                                                                                                              |
| Cloud browsers for agents that use real websites | Steel, Browserbase, Kernel                                         | Look here when the agent must use real websites: sign in, keep a session, download files, and get through bot protection. Steel is our product. Its browser API is [open source](https://github.com/steel-dev/steel-browser), so you can read the code and self-host it. Steel also offers managed BYOC, where Steel operates the browsers in your cloud account. Browserbase is a managed service and maintains the open-source Stagehand framework. Kernel is a managed browser service that also publishes open-source browser infrastructure.             |

Where to start, Q4 2026

This table is not complete, and it does not replace a test. A provider can look right on a feature page and still have the wrong lifecycle for your task.

Public benchmarks measure narrow things, such as how fast many sandboxes start at once or how long one build takes. None of them tells you whether your agent can continue tomorrow. **Run your own benchmark on your real workload.**

When you have two or three possible providers, run the tests from the previous section. Interrupt a real task and resume it. Check the files, processes, credentials, network access, agent progress, and external actions that matter to the result. Then **compare cost per accepted result, not cost per second of compute**, and buy the least infrastructure that reliably gives the agent the environment its job requires.

## Frequently asked questions

### What is an agent’s computer?

An agent’s computer is the working environment the agent operates: its browser, files, tools, processes, access, and the state its task needs to continue. It can span several services, such as sandboxes, browser services, and storage. A temporary worker is enough if another service keeps the state the next worker needs.

### What is an agent sandbox?

An agent sandbox is an isolated environment where an agent runs code, often code that a model wrote, away from other workloads. It covers code execution; the browser, files, and saved state are other parts of an agent’s computer. Isolation does not limit what the credentials inside the sandbox allow, so define what the task may read and change, and test those limits.

### Should you build or buy AI agent infrastructure?

Most teams should buy it. Start with a managed service, and build your own only when no provider meets a hard requirement, such as a network boundary or a hardware configuration, or when owning the infrastructure gives you an advantage you can name. Building a platform before you understand the workload is the wrong order.

### What is the difference between a sandbox and a persistent computer?

A persistent computer keeps its state between steps, and a disposable sandbox is thrown away after the work. Persistence makes sense when setup is expensive or a process must keep running. It can save setup time, but compare storage charges, idle billing, wake-up time, and recovery guarantees first.

### What is BYOC?

BYOC means bring your own cloud. With managed BYOC, the provider operates its service inside your cloud account, so the compute stays in your network and your team does not build the service. Self-hosting is the other middle option: your team runs someone else’s software, such as an open-source microVM runtime.

### How do you test an agent sandbox provider?

Start with one typical task. Disconnect the client and reconnect it, then stop or replace the environment in a disposable test and try to continue from the state the service promises to keep. Record what resumes, what has to restart, and what needs a person. When you compare providers, use cost per accepted result rather than cost per second of compute.

## For the browser layer

For the browser part of your environment, start with Steel’s examples for [authentication context](https://docs.steel.dev/cookbook/auth-context), [files](https://docs.steel.dev/cookbook/files), and [computer use](https://docs.steel.dev/cookbook/claude-computer-use). Each example covers one capability. Run the acceptance tests above against any browser layer you consider, including ours.
