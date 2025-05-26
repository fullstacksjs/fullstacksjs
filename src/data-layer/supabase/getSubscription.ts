import { cache } from 'react';

import { createServerSupabaseClient } from './createServerSupabaseClient';
import { getUser } from './getUser';

export const getSubscription = cache(async (): Promise<boolean> => {
  const supabase = await createServerSupabaseClient();
  const user = await getUser();

  if (!user) return false;

  const { data } = await supabase
    .from('subscription')
    .select('*')
    .eq('user_id', user.id)
    .eq('ts_guild', true);

  return !!data?.[0];
});
