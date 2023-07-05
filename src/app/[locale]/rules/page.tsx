import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import RulesContent from './RulesContent';

export default async function RulesPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.rules}>
      <RulesContent />
    </NextIntlClientProvider>
  );
}
