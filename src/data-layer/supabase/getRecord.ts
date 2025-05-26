import { cache } from 'react';

import { createServerSupabaseClient } from './createServerSupabaseClient';
import { getUser } from './getUser';

export const getRecord = cache(async () => {
  const supabase = await createServerSupabaseClient();

  try {
    const user = await getUser();
    if (user == null) return undefined;

    const { data: records } = await supabase
      .rpc('get_best_time', { p_user_id: user.id })
      .single();

    return records;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
});
