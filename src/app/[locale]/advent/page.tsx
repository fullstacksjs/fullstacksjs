import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { pick } from 'radash';

import { Article } from '@/components/Article';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';

import { HowToJoin } from './+components/HowToJoin';
import { i18nMap } from './+components/i18nMap';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function AdventOfCodePage() {
  const messages = await getMessages();
  const t = await getTranslations('advent');
  const title = t.rich('title', i18nMap) as React.ReactElement;
  const howWorks = t.rich('how-works', i18nMap) as React.ReactElement;
  const ai = t.rich('ai.title', i18nMap) as React.ReactElement;

  return (
    <NextIntlClientProvider messages={pick(messages, ['advent'])}>
      <div className="flex flex-col gap-16">
        <Article id="advent" title={title}>
          <Paragraph>{t.rich('desc', i18nMap)}</Paragraph>
          <div>
            <Paragraph>{t.rich('kick-off', i18nMap)}</Paragraph>
            <Paragraph>{t.rich('fun', i18nMap)}</Paragraph>
          </div>
          <Paragraph>{t.rich('desc-2', i18nMap)}</Paragraph>
        </Article>
        <Article id="advent" title={howWorks}>
          <div>
            <Paragraph>{t.rich('puzzles', i18nMap)}</Paragraph>
            <Paragraph>{t.rich('stars', i18nMap)}</Paragraph>
          </div>
        </Article>
        <HowToJoin />
        <Article id="ai" title={ai}>
          <Paragraph>{t.rich('ai.desc', i18nMap)}</Paragraph>
        </Article>
      </div>
    </NextIntlClientProvider>
  );
}
