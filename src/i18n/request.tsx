import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { i18nComponents } from './i18nComponents';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    defaultTranslationValues: i18nComponents,
  };
});
