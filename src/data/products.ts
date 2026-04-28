// Pure types and helpers — safe to import from any context (server, client, React).
// Do NOT import from `astro:content` here. Server loaders live in `loader.ts`.

export type Category =
  | 'BOLSOS'
  | 'BILLETERAS'
  | 'CARTERAS'
  | 'MOCHILAS'
  | 'PORTAFOLIOS'
  | 'RIÑONERAS';

export const CATEGORIES: Category[] = [
  'BOLSOS',
  'BILLETERAS',
  'CARTERAS',
  'MOCHILAS',
  'PORTAFOLIOS',
  'RIÑONERAS',
];

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  shortDesc: string;
  images: string[];
  featured: boolean;
  material: string;
  colors: string[];
  inStock: boolean;
}

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

export const CATEGORY_IMAGES: Record<Category, string> = {
  BOLSOS:
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format',
  BILLETERAS:
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80&auto=format',
  CARTERAS:
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80&auto=format',
  MOCHILAS:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format',
  PORTAFOLIOS:
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&fit=crop&crop=top&auto=format',
  RIÑONERAS:
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80&auto=format',
};
