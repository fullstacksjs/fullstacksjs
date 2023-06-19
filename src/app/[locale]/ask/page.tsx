import { NextIntlClientProvider, useLocale } from 'next-intl';

import { getMessages } from '@/i18n';
import AskContent from './AskContent';

// export const dynamic = 'force-dynamic';

export default async function AskPage() {
  const locale = useLocale();
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.ask}>
      <AskContent />
    </NextIntlClientProvider>
  );
}
