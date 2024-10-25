import { Article } from '@/components/Article';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { pick } from 'radash';

import { HowToJoinItems } from './+components/HowToJoin';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function AdventOfCodePage({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = (await getMessages()) as IntlMessages;
  const t = await getTranslations('advent');

  return (
    <div className="flex flex-col gap-16">
      <Article id="advent" title={t.rich('title')}>
        <Paragraph>{t.rich('desc')}</Paragraph>
        <div>
          <Paragraph>{t.rich('kick-off')}</Paragraph>
          <Paragraph>{t.rich('fun')}</Paragraph>
        </div>
        <Paragraph>{t.rich('desc-2')}</Paragraph>
      </Article>

      <Article id="advent" title={t.rich('how-works')}>
        <div>
          <Paragraph>{t.rich('puzzles')}</Paragraph>
          <Paragraph>{t.rich('stars')}</Paragraph>
        </div>
      </Article>

      <Article id="advent" title={t.rich('join.title')}>
        <NextIntlClientProvider
          messages={{ advent: pick(messages.advent, ['join']) }}
        >
          <HowToJoinItems />
        </NextIntlClientProvider>
      </Article>

      <Article id="ai" title={t.rich('ai.title')}>
        <Paragraph>{t.rich('ai.desc')}</Paragraph>
      </Article>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
