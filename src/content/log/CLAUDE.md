---
title: "How to Write New Log Articles"
description: "Instructions for AI coding agents on creating new log articles that match the site's style and voice"
tldr: "Write conversationally, use storytelling, include technical depth, follow frontmatter structure exactly. Be authentic, admit failures, share thought processes. Focus on what you learned, not just what you built."
date: 2025-10-25
tags: [HUMAN, PROCESS, AI, WRITING]
draft: false
author: "Nikola Balić"
topics: [AI-assisted writing, content creation guidelines, style guidelines, blogging workflow]
entities: [Claude Code, LLM agents, content creation]
answers_questions:
  - How should AI agents write new log articles for this site?
  - What writing style and voice should be used?
  - What frontmatter structure is required?
  - What content patterns work best for technical articles?
---

# Instructions for AI Coding Agents

This file contains guidelines for AI coding agents (like Claude Code, LLM CLI, etc.) on how to create new log articles that match the established style and voice of this site.

## Writing Style & Voice

**Be Conversational & Direct**
- Use "you" frequently to speak directly to the reader
- Maintain a casual, approachable tone even with complex technical topics
- Write as if having a conversation with a smart colleague
- Avoid formal academic language - be accessible and engaging

**Use Narrative-Driven Structure**
- Tell stories with journey formats: "Day 1, Day 2, Day 3" or "Part 1, Part 2, Part 3"
- Build suspense gradually through the article
- Weave personal experience and failures throughout
- Show evolution of thinking and learning over time

**Make Technical Topics Accessible**
- Start with concrete examples and analogies
- Explain complex concepts intuitively before diving deep
- Use code examples naturally within explanations
- Bridge theory with practical implementation

**Be Authentic and Vulnerable**
- Admit failures and what went wrong
- Share thought processes and uncertainties
- Show the messy reality of problem-solving
- Be humorous and self-aware when appropriate

**Focus on Learning & Insights**
- Emphasize what you learned, not just what you built
- Share meta-reflections on the process
- Discuss why approaches succeeded or failed
- Connect specific experiences to broader principles

## Content Patterns

**Start with Hook**
- Begin with provocative observation or personal story
- Use effective blockquotes for key insights
- Create narrative tension that draws readers in

**Structure for Depth**
- Go deep on technical details when warranted
- Include real code examples and implementation details
- Show multiple iterations and improvements
- End with actionable insights or reflections

**Include Meta-Commentary**
- Reference your own writing process when relevant
- Discuss how you collaborate with humans/AI
- Be transparent about what worked and what didn't
- Show the human side of technical work

## Required Frontmatter Structure

```yaml
---
title: "Catchy, descriptive title in quotes"
description: "Brief summary (max 130 characters)"
tldr: "Even shorter summary in quotes (max 333 characters)"
date: YYYY-MM-DD
tags: [TAG1, TAG2, TAG3] # Use ALL CAPS for tags
draft: false
author: "Nikola Balić"
topics: [Topic 1, Topic 2, Topic 3] # Detailed topics in sentence case
entities: [Entity 1, Entity 2] # People, companies, tools mentioned
answers_questions:
  - Question 1 that the article answers?
  - Question 2 that the article answers?
  - Question 3 that the article answers?
---
```

**Key Frontmatter Rules:**
- Always use quotes for title, description, and tldr
- Tags should be in ALL CAPS (like [HUMAN, OPINION], [AI, TOOLS])
- Include both topics and entities arrays for detailed categorization
- List 2-4 questions that the article explicitly answers
- Always include `author: "Nikola Balić"`
- Use current date in YYYY-MM-DD format
- Set `draft: false` for published articles

## Common Topics That Work Well

**AI-Human Collaboration**
- Stories of working with AI coding agents
- Meta-reflections on AI-assisted development
- Lessons about managing AI-human partnerships
- Technical projects where AI played key role

**Technical Deep Dives**
- Optimization problems and solutions
- Algorithm development and iteration
- Performance tuning and debugging
- Architecture decisions and tradeoffs

**Growth & Community**
- Developer tools marketing insights
- Community building strategies
- Open source project experiences
- Enterprise adoption lessons

**Process & Methodology**
- New workflows or development processes
- Tool evaluations and comparisons
- Productivity improvements
- Learning experiences from failures

## Writing Process

1. **Start with Experience**: Begin with a real project, problem, or experience
2. **Identify Learning**: Ask "what did I learn that others might find valuable?"
3. **Structure as Story**: Plan narrative arc with beginning, middle, end
4. **Write Conversationally**: Use "I" statements and speak directly to reader
5. **Include Technical Details**: Add code examples, screenshots, data
6. **Reflect on Insights**: End with broader lessons and takeaways
7. **Format Frontmatter**: Complete all required frontmatter fields exactly

## Quality Guidelines

- **Length**: Aim for 1000-3000 words depending on topic complexity
- **Technical Depth**: Include real code, data, or technical details
- **Personal Voice**: Write from personal experience, not generic advice
- **Value Proposition**: Every article should teach something valuable
- **Authenticity**: Be honest about failures, limitations, and learning process

## Examples of Good Style

- "The Berghain Challenge" - Long-form narrative with technical depth
- "Why Senior Engineers Overlook Small AI Wins" - Opinion piece with personal insights
- "The Agent is The Loop" - Short, focused article with clear takeaway
- "Developer Trust Over Conversion" - Prescriptive advice based on experience

## Final Guidelines

Remember: The goal is to share valuable learning experiences with other developers. Your unique perspective, failures, and insights are what make the content valuable. Be authentic, be technical, and be generous with your knowledge.

The best articles feel like learning from an experienced colleague who's been in the trenches and is willing to share both their successes and failures to help you grow.