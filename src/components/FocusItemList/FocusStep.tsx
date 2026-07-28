'use client';

import { range } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';
import { usePress } from 'react-aria';

import { CopyLinkButton } from '@/components/CopyLinkButton';
import { Skeleton } from '@/components/Skeleton';
import { cn } from '@/utils/cn';

import { useFocus, useHandleFocusItem } from './FocusContext';

interface Props {
  target: string;
  number: number;
  title: React.ReactNode;
  children?: React.ReactNode;
}

export const FocusStep = ({ target, number, title, children }: Props) => {
  const t = useTranslations('common');
  const focus = useHandleFocusItem();
  const { getState } = useFocus();
  const state = getState(target);
  const isFocused = state === 'focused';
  const { pressProps, isPressed } = usePress({ onPress: () => focus(target) });
  const { pressProps: numberPressProps } = usePress({
    onPress: () => focus(target),
  });

  return (
    <li
      className={cn(
        'group relative cursor-pointer scroll-m-40 border-border py-10 ps-6 pe-3 transition-[color,background-color,opacity] not-last:border-b motion-reduce:transition-none',
        {
          'bg-linear-to-r from-accent-0/10 to-transparent to-60% fa:bg-linear-to-l':
            isFocused,
          'bg-fg-1/5': isPressed && !isFocused,
          'opacity-40 focus-within:opacity-100 hover:opacity-100':
            state === 'faded',
        },
      )}
      id={target}
      {...pressProps}
    >
      {isFocused ? (
        <span className="absolute inset-y-10 inset-s-0 w-[1ch] rounded-sm bg-accent-0" />
      ) : null}

      <div className="flex items-baseline gap-7">
        <button
          aria-label={t('highlight', { number })}
          className={cn(
            'w-10 shrink-0 rounded-sm text-center font-mono text-xs transition-colors focus-visible:ring-1 focus-visible:outline-none motion-reduce:transition-none',
            isFocused ? 'text-accent-0' : 'text-fg-1/60 group-hover:text-fg-1',
          )}
          dir="ltr"
          type="button"
          {...numberPressProps}
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

          {children}
        </div>
      </div>
    </li>
  );
};

interface SkeletonProps {
  lines: number;
  className?: string;
}

export const FocusStepsSkeleton = ({ lines, className }: SkeletonProps) => (
  <ol>
    {range(lines).map((line) => (
      <li className="border-t border-border py-10" key={line}>
        <Skeleton className={cn('h-44', className)} />
      </li>
    ))}
  </ol>
);
