'use client';

import type { SupabaseClient } from '@supabase/supabase-js';

import { useRouter } from 'next/navigation';
import { createContext, useEffect } from 'react';

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
