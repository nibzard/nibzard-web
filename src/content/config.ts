import { defineCollection, z } from 'astro:content';

const logCollection = defineCollection({
  type: 'content', // 'content' for Markdown files
  schema: z.object({
    title: z.string().max(60, "Title must be 60 characters or less"),
    description: z.string().max(130, "Description must be 130 characters or less"),
    tldr: z.string().max(333, "Description must be 333 characters or less").optional(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default("Nikola Balić"),
  }),
});

const nowCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default("Nikola Balić"),
  }),
});

const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default("Nikola Balić"),
  }),
});

const imagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    imageUrl: z.string(),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default("Nikola Balić"),
  }),
});

const ideaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80, "Title must be 80 characters or less"),
    subtitle: z.string().max(120, "Subtitle must be 120 characters or less").optional(),
    date: z.date(),
    category: z.enum(['product', 'service', 'campaign', 'strategy', 'innovation']).optional(),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default("Nikola Balić"),
  }),
});

export const collections = {
  log: logCollection,
  now: nowCollection,
  thoughts: thoughtsCollection,
  images: imagesCollection,
  idea: ideaCollection,
};