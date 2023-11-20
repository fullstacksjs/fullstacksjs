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
  mark: (chunk) => <Highlight>{chunk}</Highlight>,
  b: (chunk) => <b>{chunk}</b>,
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
    </>
  );
}
