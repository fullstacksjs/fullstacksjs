import { cache } from 'react';

import { getUser } from './getUser';
import { createServerSupabaseClient } from './SupabaseServer';

export const getGuildMembers = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const session = await getUser();

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
