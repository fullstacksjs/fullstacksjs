'use client';

import {
  useFocusState,
  useHandleFocusItem,
  useScrollToFocused,
} from '@/hooks/useRuleTarget';
import { cn } from '@/utils/cn';
import { usePress } from 'react-aria';

import { ListItem } from '../ListItem';

interface Props {
  target: string;
  children: React.ReactNode;
}
export const FocusItem = ({ target, children }: Props) => {
  const handleFocus = useHandleFocusItem(target);
  const state = useFocusState(target);

  useScrollToFocused();

  const { pressProps } = usePress({
    onPress: handleFocus,
  });

  return (
    <ListItem
      id={target}
      className={cn('group', {
        'hover:text-accent-1': state === 'idle',
        'text-accent-1': state === 'focused',
        'opacity-25 focus-within:opacity-75 hover:opacity-50':
          state === 'faded',
      })}
    >
      <button
        className={cn('block w-full text-start outline-none')}
        type="button"
        {...pressProps}
      >
        {children}
      </button>
    </ListItem>
  );
};
