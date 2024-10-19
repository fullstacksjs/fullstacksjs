import { generatePageOG } from '@/components/SEO';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import RulesContent from './RulesContent';

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Rules: A Guide to Respectful Conduct',
  description:
    'The FullstacksJS community is committed to creating a safe and welcoming environment for everyone. These rules outline the behaviors that are considered harassment and unacceptable within our community. By following these rules, we can all help to create a positive and productive environment for learning and collaboration.',
  images: '/og/og.png',
});

export default async function RulesPage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['rules'])}>
      <RulesContent />
    </NextIntlClientProvider>
  );
}
