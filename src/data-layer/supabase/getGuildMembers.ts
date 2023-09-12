import { cache } from 'react';

import { createServerSupabaseClient, getSession } from './SupabaseServer';

export const getGuildMembers = cache(async () => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (!session) return null;

  const { data } = await supabase
    .from('subscription')
    .select(
      `profile:user_id (
        email
      )`,
    )
    .eq('ts_guild', true);

  return data;
});
