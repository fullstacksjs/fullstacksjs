import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import locales from './astro.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const loadPath = join(__dirname, 'public/locales/{{lng}}.json');

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'en',
  locales: ['en', 'fa'],
  i18nextServer: {
    backend: { loadPath },
    resources: locales,
  },
  i18nextServerPlugins: {
    fsBackend: null,
  },
};
