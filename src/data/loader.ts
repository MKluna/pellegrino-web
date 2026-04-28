// Server-only product loader. Reads from the Astro Content Collection.
// Only import this file from `.astro` files (frontmatter).
// React/client code must use `data/products.ts` for types & formatPrice.

import { getCollection } from 'astro:content';
import type { Product } from './products';

export async function loadProducts(): Promise<Product[]> {
  const entries = await getCollection('products');
  return entries
    .map((entry) => ({
      slug: entry.id,
      ...entry.data,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getByCategory(cat: Product['category']): Promise<Product[]> {
  const all = await loadProducts();
  return all.filter((p) => p.category === cat);
}

export async function getFeatured(): Promise<Product[]> {
  const all = await loadProducts();
  return all.filter((p) => p.featured);
}

export async function getBySlug(slug: string): Promise<Product | undefined> {
  const all = await loadProducts();
  return all.find((p) => p.slug === slug);
}
