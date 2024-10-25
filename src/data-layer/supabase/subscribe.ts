'use server';

import { cache } from 'react';

import { getUser } from './getUser';
import { createServerSupabaseClient } from './SupabaseServer';

export const subscribe = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const user = await getUser();

  try {
    if (!user) throw Error('No session');

    const { data, error } = await supabase
      .from('subscription')
      .upsert({ user_id: user.id, ts_guild: true }, { onConflict: 'user_id' })
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
