import type { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import enMessages from '../../../../messages/en.json';
import AskContent from './AskContent';

const title =
  'How to Ask a Programming Question: A Guide to Getting the Help You Need';
const description =
  'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.';

interface MetaDataProps {
  searchParams: { [focus: string]: string | undefined };
}

export function generateMetadata({ searchParams }: MetaDataProps): Metadata {
  const asks: { [key: string]: number } = {
    precise: 1,
    environment: 2,
    diagnostic: 3,
    sandbox: 4,
    courteous: 5,
    topic: 6,
    xy: 7,
    rush: 8,
    guess: 9,
    pv: 10,
    homework: 11,
  };

  const focus = searchParams['focus'];
  const ask = enMessages.ask;
  const ogTitle = focus
    ? ask.guides[focus as keyof typeof ask.guides].title
    : title;
  const ogDesc = focus
    ? ask.guides[focus as keyof typeof ask.guides].desc
    : description;
  const guideNumber = focus ? asks[focus as keyof typeof asks] : 0;

  const ogImage: OpenGraph['images'] = {
    url: `/api/ask-og?guideNumber=${guideNumber}&title=${ogTitle}&desc=${ogDesc}`,
    alt: title,
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
    },
    twitter: {
      title,
      description,
      images: ogImage,
      card: 'summary_large_image',
    },
  };
}

export default async function AskPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.ask}>
      <AskContent />
    </NextIntlClientProvider>
  );
}
