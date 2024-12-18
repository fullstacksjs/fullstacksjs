import { getRecord } from '@/data-layer/supabase/getRecord';
import { getUser } from '@/data-layer/supabase/getUser';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { TypeContent } from './TypeContent';

export default async function TypePage() {
  const record = await getRecord();
  const user = await getUser();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['type'])}>
      <TypeContent user={user} initialRecord={record?.duration} />
    </NextIntlClientProvider>
  );
}
