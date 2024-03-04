import 'server-only';

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'fa'];

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: await import(`../messages/${locale}.json`).then((x) => x.default),
  };
});
