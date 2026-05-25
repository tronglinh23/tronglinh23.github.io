import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const httpUrl = z
  .string()
  .url()
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === 'http:' || protocol === 'https:';
    } catch {
      return false;
    }
  }, 'URL must use http or https');

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
  source_url: httpUrl.optional(),
  hero_image: z.string().optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: base.extend({
      category: base.shape.category.default('research'),
    }),
  }),
  links: defineCollection({
    loader: glob({ base: './src/content/links', pattern: '**/*.md' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()).default([]),
      category: z
        .enum(['web', 'pwn', 'crypto', 'rev', 'forensics', 'misc', 'research', 'general'])
        .default('research'),
      source_url: httpUrl,
      extra_links: z
        .array(
          z.object({
            label: z.string(),
            url: httpUrl,
          })
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
  }),
};
