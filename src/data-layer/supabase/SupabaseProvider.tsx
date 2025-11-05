'use client';

import type { SupabaseClient } from '@supabase/supabase-js';

import { isNull } from '@fullstacksjs/toolbox';
import { useRouter } from 'next/navigation';
import { createContext, use, useEffect } from 'react';

import type { Database } from './models/Database';

import { createBrowserSupabaseClient } from './createBrowserSupabaseClient';

interface SupabaseContext {
  supabase: SupabaseClient<Database>;
}

const Context = createContext<SupabaseContext | undefined>(undefined);
Context.displayName = 'SupabaseContext';

interface Props {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') router.refresh();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);

  return children;
}

export const useSupabase = () => {
  const context = use(Context);

  if (isNull(context))
    throw new Error('useSupabase must be used inside SupabaseProvider');

  return context;
};
