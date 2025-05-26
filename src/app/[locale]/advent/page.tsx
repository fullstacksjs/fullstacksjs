import { Article } from '@/components/Article';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';
import { i18nComponents as tc } from '@/i18n/i18nComponents';
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
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'advent' });

  return (
    <div className="flex flex-col gap-16">
      <Article id="advent" title={t.rich('title', tc)}>
        <Paragraph>{t.rich('desc', tc)}</Paragraph>
        <div>
          <Paragraph>{t.rich('kick-off', tc)}</Paragraph>
          <Paragraph>{t.rich('fun', tc)}</Paragraph>
        </div>
        <Paragraph>{t.rich('desc-2', tc)}</Paragraph>
      </Article>

      <Article id="advent" title={t.rich('how-works', tc)}>
        <div>
          <Paragraph>{t.rich('puzzles', tc)}</Paragraph>
          <Paragraph>{t.rich('stars', tc)}</Paragraph>
        </div>
      </Article>

      <Article id="advent" title={t.rich('join.title', tc)}>
        <NextIntlClientProvider
          messages={{ advent: pick(messages.advent, ['join']) }}
        >
          <HowToJoinItems />
        </NextIntlClientProvider>
      </Article>

      <Article id="ai" title={t.rich('ai.title', tc)}>
        <Paragraph>{t.rich('ai.desc', tc)}</Paragraph>
      </Article>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
