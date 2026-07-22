'use client';

import type { TransitionStartFunction } from 'react';

import { createContext, use, useCallback } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';

export const FocusContext = createContext<{
  focused: string | null;
  isPending: boolean;
  getState: (target: string) => 'faded' | 'focused' | 'idle';
  startTransition: TransitionStartFunction;
  setOptimistic: (value: string | null) => void;
} | null>(null);
FocusContext.displayName = 'FocusContext';

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
