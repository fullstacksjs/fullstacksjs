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

import Avatar from './Advent.png';

const i18nMap: RichTranslationValues = {
  'e-tree': () => <Emoji name="tree" />,
  'g-star': () => <Emoji name="star" />,
  medal: () => <Emoji name="first" />,
  robot: () => <Emoji name="robot" />,
  mark: (chunk) => <Highlight>{chunk}</Highlight>,
  b: (chunk) => <b>{chunk}</b>,
  atype: (chunk) => (
    <a
      className="text-accent-0"
      href="https://adventofcode.com/2023/leaderboard/private"
    >
      {chunk}
    </a>
  ),
  'atype-two': (chunk) => (
    <a
      className="text-accent-0"
      href="https://adventofcode.com/2023/leaderboard/private/view/3205245"
    >
      {chunk}
    </a>
  ),
};

export default function AdventOfCodeContent() {
  useEffect(() => {
    document.body.classList.add('aoc-bg');

    return () => {
      document.body.classList.remove('aoc-bg');
    };
  }, []);
  const t = useTranslations('advent');

  const title = t.rich('title', i18nMap) as React.ReactElement;
  const howWorks = t.rich('how-works', i18nMap) as React.ReactElement;
  const howJoin = t.rich('how-join', i18nMap) as React.ReactElement;
  const ai = t.rich('ai', i18nMap) as React.ReactElement;

  return (
    <>
      <Image
        className="self-center"
        {...Avatar}
        width={500}
        alt="FullstacksJS Advent of Code"
      />
      <Separator />
      <Article id="advent" title={title}>
        <Paragraph>{t.rich('desc', i18nMap)}</Paragraph>
        <div>
          <Paragraph>{t.rich('kick-off', i18nMap)}</Paragraph>
          <Paragraph>{t.rich('fun', i18nMap)}</Paragraph>
        </div>
      </Article>
      <Article id="advent" title={howWorks}>
        <div>
          <Paragraph>{t.rich('puzzles', i18nMap)}</Paragraph>
          <Paragraph>{t.rich('stars', i18nMap)}</Paragraph>
        </div>
      </Article>
      <Article id="advent" title={howJoin}>
        <div>
          <Paragraph>{t.rich('engage', i18nMap)}</Paragraph>
          <Paragraph>{t.rich('already-member', i18nMap)}</Paragraph>
          <Paragraph>{t.rich('follow', i18nMap)}</Paragraph>
        </div>
      </Article>
      <Article id="ai" title={ai}>
        <Paragraph>{t.rich('ai-des', i18nMap)}</Paragraph>
      </Article>
    </>
  );
}
