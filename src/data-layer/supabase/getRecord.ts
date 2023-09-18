import { cache } from 'react';

import { createServerSupabaseClient } from './SupabaseServer';

export const getRecord = cache(async () => {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session == null) return undefined;

    const { data: records } = await supabase
      .rpc('get_best_time', { p_user_id: data.session.user.id })
      .single();

    return records;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
});
