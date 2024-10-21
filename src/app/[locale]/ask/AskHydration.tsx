'use client';
import { useScrollToFocused } from '@/hooks/useRuleTarget';

// NOTE: This component is wrapper for useScrollToFocused hook in order to use it in a server component.
export function AskHydration() {
  useScrollToFocused();

  return null;
}
