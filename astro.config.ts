import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import type { AstroUserConfig } from 'astro'; 

const isVercel: boolean = process.env.VERCEL === '1' || process.env.DEPLOY_PLATFORM === 'vercel';

const config: AstroUserConfig = {
  site: 'https://log.1k.ink',
  trailingSlash: 'never',
  
  integrations: [
    mdx(), 
    sitemap()
  ],

  build: {
    inlineStylesheets: 'auto',
    format: 'file', 
  },

  adapter: isVercel ? vercel({ webAnalytics: { enabled: true } }) : undefined,
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:fs', 'node:path'],
    },
    build: {
      minify: true, 
      cssMinify: true,
    },
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  }
};

export default defineConfig(config);