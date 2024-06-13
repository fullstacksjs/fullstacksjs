'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { clientConfig } from '@/config/clientConfig';

import type { Database } from './models/Database';

interface SupabaseContext {
  supabase: SupabaseClient<Database>;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      clientConfig.supabase.url,
      clientConfig.supabase.key,
    ),
  );
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') router.refresh();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router, supabase]);

  const value = useMemo(() => ({ supabase }), [supabase]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined)
    throw new Error('useSupabase must be used inside SupabaseProvider');

  return context;
};
