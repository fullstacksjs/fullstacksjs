import { NextIntlClientProvider, useLocale } from 'next-intl';

import { getRecord } from '@/data-layer/supabase/getRecord';
import { getUser } from '@/data-layer/supabase/getUser';
import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import { TypeContent } from './TypeContent';

export default async function TypePage() {
  const locale = useLocale() as Locales;
  const record = await getRecord();
  const user = await getUser();
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.type}>
      <TypeContent user={user} initialRecord={record?.duration} />
    </NextIntlClientProvider>
  );
}
