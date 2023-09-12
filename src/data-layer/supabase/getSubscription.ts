import { cache } from 'react';

import { createServerSupabaseClient, getSession } from './SupabaseServer';

export const getSubscription = cache(async (): Promise<boolean> => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (!session) return false;

  const { data } = await supabase
    .from('subscription')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('ts_guild', true);

  return !!data?.[0];
});
