'use client';

import { useFocusState, useHandleFocusItem } from '@/hooks/useRuleTarget';
import { cn } from '@/utils/cn';
import { usePress } from 'react-aria';

export const FocusItemList = (
  props: React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >,
) => {
  return <ol {...props} className="ms-4" />;
};

export type RuleState = 'faded' | 'focused' | 'idle';

interface FocusItemProps {
  target: string;
  children: React.ReactNode;
}

export const FocusItem = ({ target, children }: FocusItemProps) => {
  const handleFocus = useHandleFocusItem(target);
  const state = useFocusState(target);

  const { pressProps } = usePress({
    onPress: handleFocus,
  });

  return (
    <li
      id={target}
      className={cn(
        'group mb-3 ms-6 scroll-m-10 list-decimal leading-tight motion-reduce:transition-none transition-all',
        {
          'hover:text-accent-1': state === 'idle',
          'text-accent-1': state === 'focused',
          'opacity-25 focus-within:opacity-75 hover:opacity-50':
            state === 'faded',
        },
      )}
    >
      <button
        className={cn('w-full block text-start outline-none')}
        type="button"
        {...pressProps}
      >
        {children}
      </button>
    </li>
  );
};
