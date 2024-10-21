import { Article } from '@/components/Article';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { pick } from 'radash';

import { HowToJoinItems } from './+components/HowToJoin';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function AdventOfCodePage() {
  const messages = await getMessages();
  const t = await getTranslations('advent');

  return (
    <NextIntlClientProvider messages={pick(messages, ['advent'])}>
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
          <HowToJoinItems />
        </Article>

        <Article id="ai" title={t.rich('ai.title')}>
          <Paragraph>{t.rich('ai.desc')}</Paragraph>
        </Article>
      </div>
    </NextIntlClientProvider>
  );
}
