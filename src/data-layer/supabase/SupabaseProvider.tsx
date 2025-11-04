'use client';

import type { SupabaseClient } from '@supabase/supabase-js';

import { isNull } from '@fullstacksjs/toolbox';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { createContext, use, useEffect, useMemo, useState } from 'react';

import { clientConfig } from '@/config/clientConfig';

import type { Database } from './models/Database';

interface SupabaseContext {
  supabase: SupabaseClient<Database>;
}

const Context = createContext<SupabaseContext | undefined>(undefined);
Context.displayName = 'SupabaseContext';

interface Props {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      clientConfig.get('supabase.url'),
      clientConfig.get('supabase.key'),
    ),
  );
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') router.refresh();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router, supabase]);

  const value = useMemo(() => ({ supabase }), [supabase]);

  return <Context value={value}>{children}</Context>;
}

export const useSupabase = () => {
  const context = use(Context);

  if (isNull(context))
    throw new Error('useSupabase must be used inside SupabaseProvider');

  return context;
};
