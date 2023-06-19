import { NextIntlClientProvider, useLocale } from 'next-intl';

import { getMessages } from '@/i18n';

import RulesContent from './RulesContent';

// export const dynamic = 'force-dynamic';

export default async function RulesPage() {
  const locale = useLocale();
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.rules}>
      <RulesContent />
    </NextIntlClientProvider>
  );
}
