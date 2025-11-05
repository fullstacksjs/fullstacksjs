import { createBrowserClient } from '@supabase/ssr';

import { clientConfig } from '@/config/clientConfig';

import type { Database } from './models/Database';

export const createBrowserSupabaseClient = () => {
  return createBrowserClient<Database>(
    clientConfig.get('supabase.url'),
    clientConfig.get('supabase.key'),
  );
};
