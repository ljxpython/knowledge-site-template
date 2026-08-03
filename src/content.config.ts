import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { site } from './lib/site';

const siteBase = site.base.replace(/\/$/, '');

const resources = z.array(z.object({
  label: z.string(),
  url: z.string().refine((url) => URL.canParse(url) || url.startsWith(`${siteBase}/`), 'Expected an external URL or site-local resource path.'),
})).default([]);

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    collection: z.string().min(1),
    collectionTitle: z.string().min(1),
    collectionDescription: z.string().min(1),
    collectionOrder: z.number().int().nonnegative(),
    collectionSectionMode: z.enum(['flat', 'collapsible']).default('flat'),
    collectionNotice: z.string().min(1).optional(),
    collectionSourceLabel: z.string().min(1).optional(),
    collectionSourceUrl: z.string().url().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
    section: z.string().min(1).optional(),
    order: z.number().int().nonnegative(),
    published: z.boolean().default(false),
    source: z.string().url().optional(),
    resources,
  }),
});

export const collections = { docs };
