'use client';
import Image from 'next/image';
import type { RichTranslationValues } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Article } from '@/components/Article';
import { Emoji } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Separator } from '@/components/Separator';
import { useSignIn } from '@/data-layer/supabase/useSignIn';
import { Link } from '@/navigation';

import Banner from './Advent.png';
import { Anchor } from './Link';

const items = [
  'login-aoc',
  'join',
  'engage',
  'link',
  'login',
  'follow',
] as const;

export default function AdventOfCodeContent() {
  const { signIn } = useSignIn();

  useEffect(() => {
    document.body.classList.add('aoc-bg');

    return () => {
      document.body.classList.remove('aoc-bg');
    };
  }, []);
  const t = useTranslations('advent');
  const i18nMap: RichTranslationValues = {
    'e-tree': () => <Emoji name="tree" />,
    'e-star': () => <Emoji name="star" />,
    'e-medal': () => <Emoji name="first" />,
    'e-robot': () => <Emoji name="robot" />,
    mark: (chunk) => <Highlight>{chunk}</Highlight>,
    b: (chunk) => <b>{chunk}</b>,
    login: (chunk) => (
      <button className="text-accent-0" onClick={signIn}>
        {chunk}
      </button>
    ),
    'l-leader': (chunk) => (
      <Anchor asChild>
        <Link href="/advent/leaderboard">{chunk}</Link>
      </Anchor>
    ),
    'a-tg': (chunk) => (
      <Anchor href="https://t.me/fullstacksjs/163643">{chunk}</Anchor>
    ),
    'a-settings': (chunk) => (
      <Anchor href="https://adventofcode.com/2023/settings">{chunk}</Anchor>
    ),
    'a-leader': (chunk) => (
      <Anchor href="https://adventofcode.com/2023/leaderboard/private/view/3205245">
        {chunk}
      </Anchor>
    ),
    'a-advent': (chunk) => (
      <Anchor href="https://adventofcode.com/2023">{chunk}</Anchor>
    ),
  };

  const title = t.rich('title', i18nMap) as React.ReactElement;
  const howWorks = t.rich('how-works', i18nMap) as React.ReactElement;
  const howJoin = t.rich('join.title', i18nMap) as React.ReactElement;
  const ai = t.rich('ai.title', i18nMap) as React.ReactElement;

  return (
    <>
      <Image
        className="self-center"
        src={Banner.src}
        height={Banner.height}
        width={500}
        alt="FullstacksJS Advent of Code"
      />
      <Separator />
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
        <Article id="advent" title={howJoin}>
          <ol className="ms-10 list-decimal text-fg-1">
            {items.map((l) => (
              <li key={l}>{t.rich(`join.${l}`, i18nMap)}</li>
            ))}
          </ol>
        </Article>
        <Article id="ai" title={ai}>
          <Paragraph>{t.rich('ai.desc', i18nMap)}</Paragraph>
        </Article>
      </div>
    </>
  );
}
