---
title: "Every AI App Needs an Undo Plan"
description: "Useful autonomy depends on previews, recovery, and clear boundaries around actions that cannot be reversed."
tldr: "Design recovery before granting autonomy. Restoring internal state does not reverse every external consequence."
date: 2026-09-26
tags: ["AI", "AGENTS", "UX"]
draft: true
author: "Nikola Balić"
topics: ["Recovery design", "Concurrent changes", "Agent autonomy"]
entities: ["Microsoft Research", "Neon", "LangGraph"]
answers_questions:
  - "What does meaningful undo require in an AI app?"
  - "Why is replay different from reversing an action?"
---

Suppose an assistant tidying a contact list merges two people who share a surname. Before you fix it, someone else adds a legitimate phone number to the merged record. Restoring yesterday's database would erase that correct update along with the mistake.

I would test this hypothetical case before letting an assistant edit real records. Recovery requires understanding which changes belong to whom. If the interface promises undo, it needs a way to preserve the later work.

## Different actions need different recovery

A draft can often return to an earlier version. A shared record may require a targeted correction that preserves later work. A sent message may need a follow-up explanation. Information disclosed to an unintended recipient cannot be made undisclosed by restoring your database.

The interface should reflect those differences before the action. It can show a preview for an edit, explain the affected records for a merge, or state that sending a message has an external consequence. Asking for approval without showing what the approval covers gives the user little help.

Microsoft's [human-AI interaction guidelines](https://www.microsoft.com/en-us/research/?p=564561) already recommend efficient correction, recovery from errors, and limiting activity when uncertainty is high. Applying those principles to agents means making recovery part of the workflow before the agent can change things.

## Try the change somewhere else first

For the contact-list example, a preview could show the records to be merged, the chosen field values, and the information that would otherwise be lost. The assistant could flag uncertainty about whether the records describe the same person.

An isolated data environment can help test a proposed operation. [Neon's database-branching documentation](https://neon.com/docs/get-started-with-neon/workflow-primer) describes branches whose changes do not affect their parent. A branch can provide a place to inspect a change before applying it to the main database.

That isolation has limits. A copied database may still contain sensitive information. An application connected to a test branch might still call a real email service unless its external connections are separately configured. Database branching isolates database changes; external connections need their own configuration.

For a toy test, synthetic records and simulated external services make it easier to see the behavior without creating real consequences.

## Replay can perform the action again

Agent checkpoints let you debug a run or explore another execution path. External actions need separate handling when you replay it.

[LangGraph's time-travel documentation](https://docs.langchain.com/oss/python/langgraph/use-time-travel) explains that replay re-executes later nodes, including model calls and API requests. Forking creates another path from a prior state. Neither automatically undoes what the earlier path already did outside the stored execution state.

If a replayed node sends a message, it may send another message. The application needs to decide how repeated attempts are identified and whether a previously completed external action should be skipped, reconciled, or explicitly repeated.

In product terms, a button labeled "try again" needs to make that distinction clear. Users should not have to discover that retrying a failed-looking workflow duplicates its successful side effects.

## Repair the mistake without erasing other work

Microsoft's [compensating-transaction guidance](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction) explains why restoring an old state can overwrite legitimate concurrent changes. Recovery may require application-specific corrective actions, and those actions can fail too.

For our illustrative merge, the system would need a history of the original records, the merge operation, and subsequent edits. It might restore the two identities and ask a reviewer where the new phone number belongs. Yesterday's records cannot tell it where today's phone number belongs.

The user-facing experience could say which values were restored, which later changes were preserved, and which conflict still needs a decision. The user should be able to inspect the repaired records and any unresolved conflicts.

Some operations need compensation: correcting an invoice, issuing a refund, or sending a clarification. Those actions address a consequence while leaving a record that the original event happened. Others require escalation because the system lacks enough evidence to repair them safely.

## Grant autonomy in proportion to recovery

I would test an agent's mistake and its recovery together. Introduce an incorrect edit, add a legitimate concurrent change, then see whether correction preserves that work. Separately, replay a simulated external request and inspect whether it duplicates the effect.

Until those behaviors are understood, a preview is more useful than a broad promise of reversibility. Once a narrow action has reliable recovery, it can earn more autonomy.

After recovery, the product should show which changes it restored and explain any consequences that remain.

<!-- EDITORIAL NOTES: remove before publication.
Research checked: 2026-09-26. All contact examples are hypothetical; implement the synthetic-record exercise before adding results. Verify preservation of concurrent changes and non-duplication on simulated replay, including failed compensation. Capture screenshots of the user's preview, history, recovery, and unresolved-conflict experience.
Brief's original title exceeds schema's 60-character limit; retain its full premise in the deck/body rather than loosening schema. Do not imply branching sanitizes data, checkpoints undo external effects, or every action can be rolled back.
-->
