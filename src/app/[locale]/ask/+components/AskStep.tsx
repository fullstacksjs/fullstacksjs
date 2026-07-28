'use client';

import { useTranslations } from 'next-intl';

import { FocusStep } from '@/components/FocusItemList/FocusStep';

import type { Ask } from '../asks';

import { hasExample } from '../asks';
import { Example } from './Example';

interface Props {
  target: Ask;
  number: number;
  title: string;
  desc: string;
}

export const AskStep = ({ target, number, title, desc }: Props) => {
  const t = useTranslations('ask');
  const example = hasExample(target)
    ? {
        bad: t(`examples.${target}.bad`),
        good: t(`examples.${target}.good`),
      }
    : undefined;

  return (
    <FocusStep number={number} target={target} title={title}>
      <p className="mt-3 text-base/normal text-pretty text-fg-1">{desc}</p>

      {example ? (
        <div className="mt-5 flex flex-col gap-1.5">
          <Example variant="wrong">{example.bad}</Example>
          <Example variant="right">{example.good}</Example>
        </div>
      ) : null}
    </FocusStep>
  );
};
