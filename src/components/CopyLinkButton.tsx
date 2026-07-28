'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { usePress } from 'react-aria';

import CheckIcon from '@/components/Icons/Check.svg';
import CopyIcon from '@/components/Icons/Copy.svg';
import { cn } from '@/utils/cn';

interface Props {
  target: string;
}

export const CopyLinkButton = ({ target }: Props) => {
  const t = useTranslations('common');

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    const { origin, pathname } = window.location;

    try {
      await navigator.clipboard.writeText(
        `${origin}${pathname}?focus=${target}`,
      );
    } catch {
      return;
    }

    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  const { pressProps } = usePress({ onPress: copy });

  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center gap-2 font-mono text-xs opacity-0 outline-hidden transition-[opacity,color] fa:font-fa',
        'rounded-sm px-2 group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 pointer-coarse:opacity-100',
        'pointer cursor-pointer motion-reduce:transition-none',
        copied ? 'text-fg-success' : 'text-fg-1 hover:text-accent-1',
      )}
      type="button"
      {...pressProps}
    >
      {copied ? (
        <CheckIcon className="size-5" />
      ) : (
        <CopyIcon className="size-5" />
      )}
      {copied ? t('copied') : t('copy')}
    </button>
  );
};
