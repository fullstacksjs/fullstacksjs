'use client';

import type { TransitionStartFunction } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';
import { isNull } from '@fullstacksjs/toolbox';
import { useSearchParams } from 'next/navigation';
import {
  createContext,
  use,
  useCallback,
  useMemo,
  useOptimistic,
  useTransition,
} from 'react';
import { useEffectOnce } from 'react-use';

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

export function useScrollToFocused() {
  const search = useSearchParams();
  const focused = search.get('focus');

  useEffectOnce(() => {
    if (!focused) return;
    document.getElementById(focused)?.scrollIntoView({ block: 'center' });
  });
}

const FocusContext = createContext<{
  focused: string | null;
  isPending: boolean;
  getState: (target: string) => 'faded' | 'focused' | 'idle';
  startTransition: TransitionStartFunction;
  setOptimistic: (value: string | null) => void;
} | null>(null);

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

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
};

export function useFocus() {
  const context = use(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
}

export function useHandleFocusItem() {
  const { focused, startTransition, setOptimistic } = useFocus();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (item: string) => {
      startTransition(() => {
        if (item === focused) {
          setOptimistic(null);
          router.push(pathname, { scroll: false });
        } else {
          setOptimistic(item);
          document.getElementById(item)?.scrollIntoView({ block: 'center' });
          router.push(`${pathname}?focus=${item}`, { scroll: false });
        }
      });
    },
    [focused, pathname, router, setOptimistic, startTransition],
  );
}
