import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import { GuildContent } from './GuildContent';

export default async function GuildPage() {
  const locale = useLocale();
  const messages = await getMessages(locale as Locales);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.guild}>
      <GuildContent />
    </NextIntlClientProvider>
  );
}
