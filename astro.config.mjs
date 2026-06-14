// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import compress from 'astro-compress'; // 引入压缩插件
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';


// 只有在 Vercel 环境下才加载适配器，本地和 Cloudflare (SSG) 保持 undefined
const isVercel = process.env.VERCEL === '1' || process.env.DEPLOY_PLATFORM === 'vercel';



export default defineConfig({
  site: 'https://log.1k.ink',
  trailingSlash: 'never',
  
  // compress 对生成的静态资源进行压缩
  integrations: [
    icon(),
    mdx(), 
    sitemap(), 
    tailwind(), 
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    })
  ],

  build: {
    inlineStylesheets: 'auto',
    format: 'file', 
  },


  adapter: isVercel ? vercel({ webAnalytics: { enabled: true } }) : undefined,

  // 显式声明静态输出
  output: 'static',

  vite: {
    ssr: {
      external: ['node:fs', 'node:path'],
    },
    build: {
      // 保持 esbuild，它的速度与 Astro 最契合，二次压缩交给 astro-compress
      minify: 'esbuild',
      cssMinify: true,
    },
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  }
});