'use client';

import { range } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';

import {
  useFocus,
  useHandleFocusItem,
} from '@/components/FocusItemList/FocusContext';
import { Skeleton } from '@/components/Skeleton';
import { cn } from '@/utils/cn';

import type { Ask } from '../asks';

import { hasExample } from '../asks';
import { CopyLinkButton } from './CopyLinkButton';

interface Props {
  target: Ask;
  number: number;
  title: string;
  desc: string;
}

export const AskStep = ({ target, number, title, desc }: Props) => {
  const t = useTranslations('ask');
  const focus = useHandleFocusItem();
  const { getState } = useFocus();
  const isFocused = getState(target) === 'focused';
  const example = hasExample(target)
    ? {
        bad: t(`examples.${target}.bad`),
        good: t(`examples.${target}.good`),
      }
    : undefined;

  return (
    <li
      className={cn(
        'group relative scroll-m-40 border-border py-10 ps-10 pe-3 transition-colors not-last:border-b motion-reduce:transition-none',
        {
          'bg-linear-to-r from-accent-0/5 to-transparent to-60% fa:bg-linear-to-l':
            isFocused,
        },
      )}
      id={target}
    >
      {isFocused ? (
        <span className="absolute inset-y-10 inset-s-0 w-[2ch] bg-accent-0" />
      ) : null}

      <div className="flex items-baseline gap-7">
        <button
          aria-label={t('highlight', { number })}
          className={cn(
            'w-10 shrink-0 text-start font-mono text-xs transition-colors motion-reduce:transition-none',
            isFocused ? 'text-accent-0' : 'text-fg-1/60 group-hover:text-fg-1',
          )}
          dir="ltr"
          onClick={() => focus(target)}
          type="button"
        >
          {String(number).padStart(2, '0')}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-5">
            <h3
              className={cn(
                'text-lg/tight font-semibold transition-colors motion-reduce:transition-none',
                isFocused ? 'text-fg-0' : 'text-fg-1',
              )}
            >
              {title}
            </h3>
            <CopyLinkButton target={target} />
          </div>

          <p className="mt-3 text-base/normal text-pretty text-fg-1">{desc}</p>

          {example ? (
            <div className="mt-5 flex flex-col gap-1.5 text-sm/snug">
              <div className="flex items-baseline gap-3.5 rounded-lg bg-fg-error/10 p-4">
                <span className="shrink-0 font-mono text-fg-error" dir="ltr">
                  &minus;
                </span>
                <span>{example.bad}</span>
              </div>
              <div className="flex items-baseline gap-3.5 rounded-lg bg-fg-success/10 p-4 text-fg-0">
                <span className="shrink-0 font-mono text-fg-success" dir="ltr">
                  +
                </span>
                <span>{example.good}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export const AskStepsSkeleton = ({ lines }: { lines: number }) => (
  <ol>
    {range(lines).map((line) => (
      <li className="border-t border-border py-10" key={line}>
        <Skeleton className="h-44" />
      </li>
    ))}
  </ol>
);
