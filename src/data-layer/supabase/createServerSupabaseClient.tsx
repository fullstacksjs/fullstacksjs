import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { clientConfig } from '@/config/clientConfig';

import type { Database } from './models/Database';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    clientConfig.get('supabase.url'),
    clientConfig.get('supabase.key'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Handled in the middleware
          }
        },
      },
    },
  );
}
