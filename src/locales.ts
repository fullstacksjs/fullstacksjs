export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];
