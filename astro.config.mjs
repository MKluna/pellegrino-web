// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: reemplazá 'pellegrino-web' con el nombre exacto de tu repo
// Si en el futuro usás dominio propio, eliminá la línea `base` y actualizá `site`
const REPO_NAME = 'pellegrino-web';

// https://astro.build/config
export default defineConfig({
  site: `https://pellegrino.com.ar`,
  base: `/${REPO_NAME}`,

  vite: {
    plugins: [tailwindcss()]
  },

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },

  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
