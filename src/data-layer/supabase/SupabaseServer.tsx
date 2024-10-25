import type { CookieOptions } from '@supabase/ssr';

import { clientConfig } from '@/config/clientConfig';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from './models/Database';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    clientConfig.get('supabase.url'),
    clientConfig.get('supabase.key'),
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
