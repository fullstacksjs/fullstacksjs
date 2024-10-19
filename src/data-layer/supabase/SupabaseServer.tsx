import type { CookieOptions } from '@supabase/ssr';

import { clientConfig } from '@/config/clientConfig';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from './models/Database';

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    clientConfig.supabase.url,
    clientConfig.supabase.key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (_error) {
            // Handled in the middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (_error) {
            // Handled in the middleware
          }
        },
      },
    },
  );
}
