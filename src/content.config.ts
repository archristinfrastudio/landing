import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Image fields hold the path Pages CMS writes (e.g. "/projects/house-1.jpg").
// The file itself lives in src/assets/projects and is optimized at build time.
const imagePath = z.string().min(1);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    location: z.string().default(''),
    year: z.coerce.number().int(),
    type: z.string(),
    summary: z.string().default(''),
    cover: imagePath,
    gallery: z.array(imagePath).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    order: z.coerce.number().default(100),
  }),
});

const settings = defineCollection({
  loader: file('./src/content/settings.json', {
    parser: (text) => [{ id: 'site', ...JSON.parse(text) }],
  }),
  schema: z.object({
    studioName: z.string(),
    logo: z.string().default(''),
    headline: z.string(),
    intro: z.string(),
    quote: z.string().default(''),
    studioText: z.string().default(''),
    city: z.string().default(''),
    established: z.string().default(''),
    phone: z.string().default(''),
    whatsapp: z.string().default(''),
    email: z.string().default(''),
    address: z.string().default(''),
    mapUrl: z.string().default(''),
    instagram: z.string().default(''),
    linkedin: z.string().default(''),
  }),
});

export const collections = { projects, settings };
