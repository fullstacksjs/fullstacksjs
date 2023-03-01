import locales from './astro.mjs';

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'en',
  locales: ['en', 'fa'],
  i18nextServer: {
    backend: {
      loadPath: './public/locales/{{lng}}/{{ns}}.json',
    },
  },
  i18nextClient: {
    debug: true,
    resources: locales,
  },
  i18nextServerPlugins: {
    fsBackend: null,
  },
};
