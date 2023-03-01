import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';

import locales from './astro.mjs';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [astroI18next()],
  i18nextServer: {
    resources: locales,
  },
  i18nextServerPlugins: {
    fsBackend: null,
  },
});
