import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO';

import AskContent from './AskContent';

interface MetaDataProps {
  searchParams: Record<string, string>;
}

export function generateMetadata({ searchParams }: MetaDataProps): Metadata {
  const params = new URLSearchParams(searchParams);

  return generatePageOG({
    title:
      'How to Ask a Programming Question: A Guide to Getting the Help You Need',
    description:
      'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.',
    images: searchParams['focus']
      ? `/api/og/ask?${params.toString()}`
      : '/og/og.png',
  });
}

export default async function AskPage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['ask'])}>
      <AskContent />
    </NextIntlClientProvider>
  );
}
