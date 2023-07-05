import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import AskContent from './AskContent';

export default async function AskPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.ask}>
      <AskContent />
    </NextIntlClientProvider>
  );
}
