'use client';

import { isNull } from '@fullstacksjs/toolbox';
import { useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useTransition,
} from 'react';

import { FocusContext } from './FocusContext';

function useFocused() {
  const search = useSearchParams();
  const focus = search.get('focus');

  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimistic] = useOptimistic(
    focus,
    (_state, newState: string | null) => {
      return newState;
    },
  );

  return {
    isPending,
    focused: optimisticState,
    setOptimistic,
    startTransition,
  };
}

function useScrollToFocused() {
  const search = useSearchParams();
  const focused = search.get('focus');

  useEffect(() => {
    if (!focused) return;
    document.getElementById(focused)?.scrollIntoView({ block: 'center' });
  }, [focused]);
}

export const FocusProvider = ({ children }: React.PropsWithChildren) => {
  useScrollToFocused();

  const { focused, isPending, startTransition, setOptimistic } = useFocused();
  const getState = useCallback(
    (target: string) => {
      if (isNull(focused)) return 'idle';
      if (focused === target) return 'focused';
      return 'faded';
    },
    [focused],
  );

  const value = useMemo(
    () => ({ focused, isPending, getState, startTransition, setOptimistic }),
    [focused, isPending, getState, startTransition, setOptimistic],
  );

  return <FocusContext value={value}>{children}</FocusContext>;
};
