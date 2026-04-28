import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/products',
  }),
  schema: z.object({
    name: z.string(),
    category: z.enum([
      'BOLSOS',
      'BILLETERAS',
      'CARTERAS',
      'MOCHILAS',
      'PORTAFOLIOS',
      'RIÑONERAS',
    ]),
    price: z.number().int().positive(),
    description: z.string(),
    shortDesc: z.string(),
    images: z.array(z.string().url()).min(1),
    featured: z.boolean().default(false),
    material: z.string(),
    colors: z.array(z.string()).min(1),
    inStock: z.boolean().default(true),
  }),
});

export const collections = { products };
