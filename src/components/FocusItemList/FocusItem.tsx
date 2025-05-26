'use client';

import { usePress } from 'react-aria';

import { cn } from '@/utils/cn';

import { ListItem } from '../ListItem';
import { useFocus, useHandleFocusItem } from './FocusProvider';

interface Props {
  target: string;
  children: React.ReactNode;
}
export const FocusItem = ({ target, children }: Props) => {
  const focus = useHandleFocusItem();
  const { getState } = useFocus();
  const state = getState(target);

  const { pressProps } = usePress({ onPress: () => focus(target) });

  return (
    <ListItem
      id={target}
      className={cn('group has-[.text-accent-1]:text-accent-1', {
        'hover:text-accent-1': state === 'idle',
        'text-accent-1': state === 'focused',
        'opacity-25 focus-within:opacity-75 hover:opacity-50':
          state === 'faded',
      })}
    >
      <button
        className={cn('block w-full text-start outline-hidden')}
        type="button"
        {...pressProps}
      >
        {children}
      </button>
    </ListItem>
  );
};
