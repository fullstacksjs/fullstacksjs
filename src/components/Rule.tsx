'use client';

import { isNull } from '@fullstacksjs/toolbox';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { usePress } from 'react-aria';

import { useRouter } from '@/navigation';
import { cn } from '@/utils/cn';

export type RuleState = 'faded' | 'focused' | 'idle';

interface Props {
  target: string;
  children: React.ReactNode;
  state?: RuleState;
  onSelect?: (target: string) => void;
}

export const Rule = ({ state, target, children, onSelect }: Props) => {
  const { pressProps } = usePress({
    onPress: () => onSelect?.(target),
  });

  return (
    <li
      id={target}
      className={cn(
        'group text-accent-1 mb-3 ms-6 scroll-m-10 list-decimal leading-tight motion-reduce:transition-none transition-all',
        {
          'hover:text-fg-0': state === 'idle',
          'opacity-25 focus-within:opacity-75 hover:opacity-50':
            state === 'faded',
        },
      )}
    >
      <button className={cn('w-full text-start outline-none')} {...pressProps}>
        {children}
      </button>
    </li>
  );
};

export function useRuleTarget(url: string) {
  const searchParams = useSearchParams();
  const activeTarget = searchParams.get('focus');
  const router = useRouter();

  useEffect(() => {
    document
      .getElementById(activeTarget ?? '')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const getState = (target: string): RuleState => {
    if (isNull(activeTarget)) return 'idle';
    if (activeTarget === target) return 'focused';
    return 'faded';
  };

  const handleSelect = (target: string) => {
    if (target === activeTarget) router.push(url, { scroll: false });
    else router.push(`${url}?focus=${target}`, { scroll: false });
  };

  return { handleSelect, getState };
}
