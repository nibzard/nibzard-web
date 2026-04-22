---
title: "Trained Qwen to Write Clojure Better Than GPT-5.4 (Kinda)"
description: "I trained a Clojure LLM from my phone. It 'beat' GPT-5.4—kind of. Here's what actually happened."
tldr: "Fine-tuned Qwen3 on Clojure. 30B SFT hits 83.8% best-of-16, smashing GPT-5.4's 64%. But RLVR with shaped rewards actually lowered the ceiling—the verifier loop matters more than the training method. Built a deployable agent from it. Data quality was the bottleneck all along."
date: 2026-04-21
tags: [HUMAN, AI, ML, EXPERIMENT, TIL]
draft: false
author: "Nikola Balić"
topics: [LLM fine-tuning, RLVR, best-of-K sampling, Clojure, small models vs large models, verification, shaped rewards, MoE models, deployable agents]
entities: [Qwen3, GPT-5.4, Claude Opus 4.7, Rich Hickey, GRPO, REINFORCE, ThinkyMachines, clj-kondo, pi-mono]
answers_questions:
  - Can a small fine-tuned model beat frontier models on code benchmarks?
  - Does RLVR actually improve model capability or just consistency?
  - What's the real value of best-of-K as an evaluation metric?
  - Do shaped rewards help or hurt when training with verifiers?
---

I was watching the [Clojure documentary](https://www.youtube.com/watch?v=Y24vK_QDLFg) this weekend. Rich Hickey talking about simplicity, immutability, the whole thing. And while it played on one screen, I got a training run going on my phone.

Not because anyone asked for it. Just because I could.

Firing off an 8B fine-tune on [Thinking Machines Tinker](https://www.thinkingmachines.ai/) from your phone while watching a documentary about that language is where we are now.

It felt right.

![Tinker dashboard](/images/20260421_tinker.png)

## The setup

I ran three frontier models (GPT-5.4, GPT-5.4-mini, Opus 4.7) on the full 558 MultiPL-E Clojure tasks. Each candidate goes through three verification gates: syntax check via `clojure.core/read`, clj-kondo lint, then clojure.test with timeouts. If it clears all three, it's in.

415 out of 558 tasks had at least one passing solution. One solution per task, best model wins. No over-representation.

The remaining 115 tasks—all three models failed—got recovered with a fix loop. Take the best failing candidate, send it back to GPT-5.4-mini with the error message, iterate up to 3 rounds. That produced both direct pairs and fix-mode pairs (prompt + broken code + error → fixed code).

Then I padded it out with synthetic data: multi-sample pairs from best-of-K runs (~1,440), evol-instruct rewrites (~425), and 52 4Clojure problems. Same bar—must pass verification.

The core dataset is 2,459 pairs. After holding out 111 tasks for evaluation (matched by function name, both kebab and snake case to prevent leakage), the training set was 2,059 pairs.

How selective? Not very. Pure functional correctness—syntax + lint + tests pass. No code quality scoring, no style filtering, no manual review, no redundancy pruning beyond one-solution-per-task dedup. If the tests passed, it went in.

LoRA rank 32 on Qwen3-8B-Base, 3 epochs, cosine schedule, max seq 2048. Nothing exotic. Then RLVR with GRPO on top. [Full training code here](https://github.com/nibzard/clojure-llm).

Baselines: Opus 4.7 at 45% pass@1. GPT-5.4 at 64% pass@1.

The goal was pass@1—can the model solve it in one shot, no retries, no hints.

## The results (on their own terms)

![Results table](/images/20260421_results_table.png)

After SFT: 37.8% pass@1.

After RLVR: 42.3%.

Four hours of RL training for +4.5 points. Did not beat Opus. On its own terms, the experiment failed.

The RL training was ugly. 10 iterations, pass rates bouncing between 43% and 70%. We had to fall back to REINFORCE because GRPO's importance sampling kept breaking on tensor shapes. Noisy loss, not much signal.

But we kept going. A second RLVR run with shaped rewards—syntax check 0.1, clj-kondo lint 0.2, load success 0.1, test pass 0.6—got the 8B to 48.6%. That finally beats Opus. First W.

Then we ran the same pipeline on Qwen3-30B-A3B, a Mixture-of-Experts model (30B total parameters, 3B active per token). Same 2,459 SFT pairs. Same shaped reward RLVR on top.

30B SFT: 52.3% pass@1. 30B RLVR: 55.0%. Both beat Opus clean. No tricks.

The model scale did what model scale does. Same data, more capacity, better results.

## Enter best-of-K

So we—Claude and I—tried best-of-K. Generate K samples, grab the first one that passes.

8B SFT model at K=16: 72.1%. At K=8: 64.9%. Already beats GPT-5.4's 64%.

You can see the tweet already: *"8B beats GPT-5.4."*

But the 30B model tells a better story. 83.8% best-of-16. 75.7% best-of-8. That doesn't just beat GPT-5.4, it's not even close. And 52.3% pass@1 means it often doesn't even need retries.

## Here's the problem

The 8B SFT-only model—the one with zero RL—also maxes out at 72.1%.

Same number.

RLVR taught the model nothing new. It just made the model a bit more consistent when you only generate a couple samples.

To be specific: best-of-2 went from 47.7% to 55.9%. That's real if you're paying per inference call in production. If you're trying to crack problems the model doesn't know how to solve, it's irrelevant.

And then there's the shaped rewards trap. The second RLVR run—the one that hit 48.6% pass@1 and beat Opus? It lowered the best-of-K ceiling from 72.1% to 64.0%. Same thing happened on the 30B model: SFT ceiling was 83.8%, RLVR dropped it to 79.3%.

Shaped rewards made the model more consistent at what it already knew, but narrowed its solution distribution. The model got better at finding *one* path to the answer, but forgot alternative paths. Binary rewards (pass/fail, nothing in between) preserved diversity better. The ceiling stayed at 72.1%.

This is the kind of thing you only see if you run best-of-K. If you only look at pass@1, shaped rewards look like a clear win. They're not. They're a tradeoff.

The actual ceiling is SFT data quality. 2,459 pairs. The remaining tasks that never pass—those are real gaps. Weird APIs, tricky algorithms, Java interop stuff. More RLVR runs don't move those.

## From benchmark to agent

The whole point wasn't just leaderboard numbers. It was building something you could actually deploy.

Clojure is unusually good for this. The REPL gives you instant feedback. clj-kondo catches issues without running anything. clojure.test handles correctness. And because Clojure compiles per-form, not per-file, a function can fail without taking down the whole module. Python doesn't give you that granularity.

I wired the 30B RLVR model into a pi-mono agent extension. You give it a task, it writes code, runs it through the verifier stack, and iterates until something passes. The test runner isn't just the eval anymore, it's the product.

JVM startup latency is real though. 2-3 seconds versus Python's 50ms. Java stack traces are harder for an agent to parse than Python tracebacks. You only run into this stuff when you go from "can the model pass tests?" to "can an agent actually ship code?"

## What I actually learned

<blockquote class="featured-quote primary">
    Best-of-K is the only eval metric to trust, because it tells you what the model knows versus how reliably it performs.
</blockquote>

Shaped rewards are a tradeoff, not a free lunch. They raise pass@1 but lower the diversity ceiling. If your verifier only gives you pass/fail, that's probably fine. If you're building a graded reward signal, watch what it does to best-of-K, not just pass@1.

SFT did most of the heavy lifting. Model scale multiplied it. RLVR helped at the margins. Data was the bottleneck from day one. 2,459 pairs gets you far, but the ceiling is set by what the model has seen, not how many RL iterations you run on top.

The verifier loop is the product. The training was research.

## The honest takeaway

A 30B model trained on 2,459 Clojure pairs, with a test runner and 8 retries, hits 75.7%. GPT-5.4 gets 64% in one shot. The small model wins if you have a verifier and a budget for retries.

That isn't really what people mean when they say a model "beats" another one.

But if you're building something where you control the inference budget and have a verification pipeline, that gap between "sometimes" and "first try" is what you're actually engineering around.

Doing it from a phone while Rich Hickey talked about simplicity in the background was fun though. Even if the RL didn't do much.
