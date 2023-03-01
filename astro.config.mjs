import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [astroI18next()],
});
