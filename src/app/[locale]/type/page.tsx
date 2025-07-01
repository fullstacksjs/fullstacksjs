import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';

import { getServerFeature } from '@/config/features/getServerFeatures';
import { getRecord } from '@/data-layer/supabase/getRecord';
import { getUser } from '@/data-layer/supabase/getUser';

import { TypeContent } from './TypeContent';

export default async function TypePage() {
  const feature = getServerFeature('type');
  if (!feature) return notFound();

  const record = await getRecord();
  const user = await getUser();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['type'])}>
      <TypeContent user={user} initialRecord={record?.duration} />
    </NextIntlClientProvider>
  );
}
