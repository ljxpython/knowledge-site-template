import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const resources = z.array(z.object({
  label: z.string(),
  url: z.string().url(),
})).default([]);

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    section: z.string().min(1),
    order: z.number().int().nonnegative(),
    published: z.boolean().default(false),
    resources,
  }),
});

export const collections = { docs };
