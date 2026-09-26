---
title: "Email Might Be AI’s Most Useful Front Door"
description: "Email offers a familiar way to request work. A message still needs a structured workflow and explicit authority."
tldr: "Use email to receive intent. Keep task state, permissions, review, and consequential actions in a structured workflow."
date: 2026-09-26
tags: ["AI", "AGENTS", "EMAIL"]
draft: true
author: "Nikola Balić"
topics: ["Email workflows", "Prompt injection", "Human approval"]
entities: ["Google", "Microsoft", "NBER"]
answers_questions:
  - "How can email become an input to an AI workflow?"
  - "Why is an incoming email not permission to act?"
---

A customer writes that the checkout button is broken. Someone reads the email, copies the details into an issue tracker, asks for a screenshot, and eventually passes the request to a developer.

Imagine an assistant handling the copying, organizing the evidence, and preparing a proposed fix. The customer keeps using email. The person responsible for the site gets a structured issue and something concrete to review.

In this hypothetical workflow, the customer uses a familiar way to describe the problem. They do not need another dashboard. The system still needs to establish what they are authorized to request.

## A familiar input can save work

The revised [Shifting Work Patterns with Generative AI study](https://www.nber.org/papers/w33795) covers 66 firms and 7,137 knowledge workers. In the second half of the six-month experiment, the 80% of treated workers who used the integrated tool spent about two fewer hours per week on email. The researchers did not detect corresponding shifts in the quantity or composition of tasks.

The study supports email assistance within familiar workplace applications. It did not test autonomous business operation through an inbox; independently acting on correspondence would require separate evidence.

There is work the assistant could take on with limited authority. It could identify the relevant product, extract the reported failure, look for missing information, and prepare a reply. Each of those steps can reduce manual handling while leaving consequential decisions with the appropriate person.

## Follow the request through the whole loop

For our checkout example, a proposed workflow would preserve the original message and create an issue with a clear status. It would distinguish a customer's reported symptom from a reproduced defect.

Next, it could prepare a code change in an isolated environment and run relevant checks. The reviewer would receive the proposed change, evidence of reproduction, test results, and a preview. Approval would apply to that particular change. A later revised patch would need to stay within that approval or return for review.

The response to the customer would describe the actual status: received, investigating, awaiting information, or fixed and verified. A generated patch is not yet a verified production fix.

Email is the input and one communication channel in this loop. The task record holds identity, status, evidence, approvals, and processing history. Those details need to survive a reply arriving with a different subject line or a request being forwarded twice.

## Track processing separately from arrival

Google's [Gmail push-notification documentation](https://developers.google.com/workspace/gmail/api/guides/push) describes notifications of mailbox changes followed by retrieving relevant history. Watches need renewal; notifications can be delayed or dropped, and delivery is subject to limits.

The application has to retrieve mailbox history after a notification, reconcile missed changes, and record which requests it processed. It also needs to handle duplicates. A notification alone says nothing about whether the customer's task is complete.

For the checkout issue, a useful design would recognize the same message on a retry and find its existing task. If a tool call times out after creating an issue, retrying should not silently create a second one.


## A stranger can write instructions too

Now imagine a message that includes a legitimate bug report and a request to attach internal customer records to the reply. The sender has supplied text the agent can read. They have not gained authority over those records.

The agent needs to read the complaint while treating instructions aimed at controlling its tools as untrusted content. Sender checks can help establish identity, but identity alone does not confer every permission.

Microsoft's July 2026 [announcement of inbox prompt-injection defenses](https://techcommunity.microsoft.com/blog/MicrosoftDefenderforOffice365Blog/defending-the-inbox-against-prompt-injection-attacks/4534636) describes detecting and isolating malicious AI instructions embedded in email. The announcement addresses an email-specific threat, although it does not establish that every malicious message will be detected.

A workflow should constrain the agent's available actions as well. A classification assistant does not need the ability to export all customer records. A draft-reply assistant can place a reply in review without being able to send it.

## Start with proposals

The first version I would test would create proposed issues and draft responses. Reviewers could correct classifications, notice missing context, and inspect duplicate handling before the system receives broader autonomy.

I would include a synthetic message containing an instruction unrelated to the customer's legitimate request. Then I would inspect both the proposed output and the tool activity. Ignoring the instruction in the final prose is insufficient if the agent acted on it earlier.

For the checkout request, I would follow the record from message receipt through review and verification. At each consequential step, it should show who authorized the action and what actually happened.

<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. Customer workflow is hypothetical. Reconstruct one authorized, sanitized small-business case; measure duplication, missing information, classification, review time, and actual outcomes. Start with proposals and drafts only.
Use revised NBER figures consistently: 66 firms, 7,137 workers, two fewer weekly email hours among the 80% of treated workers using the tool in the experiment's second half. Do not substitute earlier sample or three-hour figures. EchoLeak is omitted pending a direct official characterization of its fixed status; add only with that qualification and a verified link. Meeting project names and performance remain reporting leads.
-->
