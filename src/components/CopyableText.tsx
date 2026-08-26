'use client';

import { useTranslations } from 'next-intl';
import { Tooltip } from 'radix-ui';
import { useRef, useState } from 'react';
import { usePress } from 'react-aria';

import CheckIcon from '@/components/Icons/Check.svg';
import CopyIcon from '@/components/Icons/Copy.svg';
import { cn } from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const CopyableText = ({ className, children, ...props }: Props) => {
  const t = useTranslations('common');
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      return;
    }

    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  const { pressProps } = usePress({ onPress: copy });

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          asChild
          onClick={(event) => event.preventDefault()}
          onPointerDown={(event) => event.preventDefault()}
        >
          <button
            type="button"
            className={cn(
              'rounded-sm font-bold outline-hidden transition-colors',
              'cursor-pointer hover:text-fg-0 focus-visible:ring-1 motion-reduce:transition-none',
              className,
            )}
            {...pressProps}
            {...props}
          >
            {children}
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            onPointerDownOutside={(event) => {
              event.preventDefault();
            }}
            side="top"
            className={cn(
              'z-50 inline-flex items-center gap-3 rounded-md border border-border bg-bg-darker px-4 py-2',
              'text-xs whitespace-nowrap shadow-lg fa:font-fa',
              'animate-[fade-in-from-bottom_150ms_ease-out] motion-reduce:animate-none',
              'data-[state=closed]:animate-[fade-out-to-bottom_120ms_ease-in]',
              copied ? 'text-fg-success' : 'text-fg-0',
            )}
          >
            {copied ? (
              <>
                <CheckIcon className="size-5" aria-hidden />
                {t('copied')}
              </>
            ) : (
              <>
                <CopyIcon className="size-5" aria-hidden />
                {t('clickToCopy')}
              </>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
