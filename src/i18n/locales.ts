export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof import('../../messages/en.json');
  }
}
