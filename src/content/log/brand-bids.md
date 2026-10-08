---
title: "Bidding on competitor names when buyers ask agents"
description: "Rivals bid on our brand on Google while developers send AI agents to evaluate us. Agents never see the ads."
tldr: "Competitors pay to show ads above our name on Google. We pay nothing, and brand clicks still grew about six times in a year. Server logs show coding agents now read our site far more than analytics reports. Spend on what agents read, not on bidding wars over a page they never see."
date: 2026-10-07
tags: [GROWTH, AGENTS, MARKETING, OPINION]
draft: false
author: "Nikola Balić"
topics: [Competitor brand bidding, Google Ads economics, Agent traffic, Developer tools marketing, Server log analysis]
entities: [Steel, Google Ads, Google Analytics, Claude Code, ChatGPT, Googlebot]
answers_questions:
  - Is it worth bidding on a competitor's brand name in Google Ads?
  - Why does web analytics miss traffic from AI coding agents?
  - Where should a developer tools startup spend its growth budget?
---

Last week I searched Google for our own product. I typed "steel browser."

Three ads loaded before our name. One of them had our name in its headline: **Steel Alternative.**

![Google results for "steel browser" with three competitor ads above the first organic result. Advertiser names are blurred.](/images/20261007-brand-ads-us.png)

I lead growth at Steel. We build browser infrastructure for AI agents. We spend nothing on Google Ads, so the top of our own results page belongs to whoever pays for it.

First I was annoyed. Then I got curious and pulled our data to see what this costs us.

## The rules of the game

Google lets anyone bid on any brand name as a keyword. It is allowed, and it is normal.

I do think it is a weak bet for developer tools in 2026. The money has a better place to go.

## Quick napkin math

Say a competitor's name gets 1,000 searches a month. Your ad shows on most of them.

People who search a brand name want that brand. They look for the login page, the docs, the pricing. Few of them click a rival's ad. Say 2 in 100. That gives you about 15 clicks.

Google grades each ad on how well it matches the search. An ad for a different product on a brand search gets a low grade, and a low grade raises your price per click. Say $10.

So 15 clicks cost $150. If 1 in 20 of those people signs up, you paid about $200 for one signup. That signup may never pay you back.

The brand owner plays a different game. Their ad matches the search best, so they defend their name for less. They pay less and take the top spot. You pay more and take second place.

Then the owner gets annoyed and starts to bid on your name. Now you both pay, nobody moves, and Google keeps the difference.

## Everyone in the chain gets paid

It is easy to start. A startup with a fresh round has money and wants growth it can show on a chart. Many hire an agency to run paid search. Agencies are often paid as a share of ad spend, so a bigger budget is good for the agency, even when it is not good for you. Competitor keywords are an easy thing to add to the plan.

Google helps too. New advertisers get setup help, account managers, and often some free ad credit to get going. All of that help comes from the company that earns money on every click.

None of these people are acting in bad faith. But nobody in that chain has a reason to ask the hard question. That question belongs to the founders and the growth lead. Ask it before the first campaign goes live, not after the first invoice.

## What happened when we did nothing

We did not defend our name and we did not hit back. We kept building and kept writing.

Over the past year, clicks from searches for our name grew about six times. Since December, our click rate on those searches stayed between 33% and 42% every month.

![Monthly clicks from searches for "steel browser" as a multiple of July 2025. The line grows to about six times the starting level by September 2026.](/images/20261007-brand-clicks.svg)

I can't prove the ads cost us nothing, because I don't know the day they started.

Then I looked at where our visitors come from.

## The visitor our analytics can't see

Our analytics tool says AI assistants send about 3% of our sessions. It says ChatGPT sends almost all of them. Claude barely appears.

I didn't believe it. Our users are developers, and many of them live in Claude Code all day.

So I exported raw server logs for two separate 24-hour windows, with the user agent for every request, and I counted.

- For every 5 to 10 homepage loads in a normal browser, AI agents made 1 more request on behalf of a user.
- Claude Code fetched our site more than 10 times as often as Googlebot did.
- Claude made 4 to 5 times more requests than ChatGPT.

Claude Code names itself in every request. Codex does not. By default it reads from OpenAI's cached search index, so it often never reaches our server. When it does fetch a page, the request looks like plain curl or a generic OpenAI request. The real split between tools is less one-sided than these numbers.

Analytics told the opposite story. It said ChatGPT sent about 100 times more visits than Claude.

Both are true.

A ChatGPT user clicks a link. The page loads in a browser, the browser runs our analytics script, and we see a visit.

A coding agent does not click. It fetches the page, reads the text, and takes an answer back to the developer. It does not run JavaScript, so our analytics script never loads. We see nothing.

A growing part of how developers judge our product happens where our dashboard can't look, and where no ad can follow.

![Share of AI traffic by assistant. In analytics, ChatGPT has 93% and Claude under 1%. In server logs, Claude has 82% and ChatGPT 18%.](/images/20261007-agent-share.svg)

I checked whether this was one script on a loop. It was not. The requests arrived in every hour of the day, from many versions of Claude Code, through servers from San Francisco to Mumbai.

After the homepage, the page agents read most was pricing.

The exports cover two days and only our main site. Agents also read our docs, which run on a separate site, so the real number is probably higher. One agent task can also fetch a page more than once, so a fetch is not a person.

## The people who click convert better

People who come to us from an AI assistant convert at about twice the rate of people from Google search. Over six months, that channel also grew more than twice as fast as Google search.

It is still smaller than Google. It is also our fastest growing source, and it brings our best visitors.

When a developer clicks a link from an assistant, the agent already did the research. The click comes at the end of the decision.

<blockquote class="featured-quote primary">
The ad slot above our name is still for sale. It is worth a little less every month.
</blockquote>

## What we should do instead

These are the rules I follow now.

### 1. Earn the comparison instead of buying the name

A search for "[Competitor]" comes from someone who already chose. A search for "[Competitor] alternative" comes from someone who is still choosing. Write an honest comparison page for the second person, and say where the rival wins. Developers trust a page that admits a weakness. Agents quote it.

### 2. If you must bid, bid on intent

Bid on "alternative," "vs," and "pricing." Never bid on the bare name. Send the click to a real comparison page, not to your homepage.

### 3. Defend your name with the product

If people search for you and click you, the ads above you matter less than you fear.

### 4. Write for the reader who never clicks

Your next user may never see your homepage. Their agent will read your docs, your error messages, and your llms.txt. Keep them complete and current, and put working code in them. An agent will not be impressed by your hero animation.

### 5. Measure what your dashboard misses

Open your server logs and count the user agents. You will probably find a channel you did not know you had.

### 6. Spend runway where the decision happens

Every dollar in a brand bidding war is a dollar you do not spend on docs, examples, or product. Investors gave you that money to build an advantage. A tie at a higher price is not one.

## Back to the screenshot

Three companies pay to stand above our name on Google. I see it in other countries too.

![The same search from Serbia, with a different competitor ad above our results. Advertiser name is blurred.](/images/20261007-brand-ads-rs.png)

More of our users now ask an agent first. The agent never sees that results page.

I would rather spend our money on the page the agent reads.
