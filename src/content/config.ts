import { defineCollection, z } from 'astro:content';

const base = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  updated: z.date().optional(),
  tags: z.array(z.string()).default([]),
  category: z
    .enum(['web', 'pwn', 'crypto', 'rev', 'for', 'misc', 'research', 'general'])
    .default('general'),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  ctf_event: z.string().optional(),
  source_url: z.string().url().optional(),
  hero_image: z.string().optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: base.extend({
      category: base.shape.category.default('research'),
    }),
  }),
  links: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()).default([]),
      category: z
        .enum(['web', 'pwn', 'crypto', 'rev', 'forensics', 'misc', 'research', 'general'])
        .default('research'),
      source_url: z.string().url(),
      draft: z.boolean().default(false),
    }),
  }),
};
