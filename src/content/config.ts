import { defineCollection, z } from 'astro:content';

const logCollection = defineCollection({
  type: 'content', // 'content' for Markdown files
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  log: logCollection,
};