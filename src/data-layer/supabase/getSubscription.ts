import { cache } from 'react';

import { getUser } from './getUser';
import { createServerSupabaseClient } from './SupabaseServer';

export const getSubscription = cache(async (): Promise<boolean> => {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  if (!user) return false;

  const { data } = await supabase
    .from('subscription')
    .select('*')
    .eq('user_id', user.id)
    .eq('ts_guild', true);

  return !!data?.[0];
});
