'use server';

import { cache } from 'react';

import { createServerSupabaseClient } from './createServerSupabaseClient';
import { getUser } from './getUser';

export const unsubscribe = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const user = await getUser();

  try {
    if (!user) throw Error('No session');

    const { data, error } = await supabase
      .from('subscription')
      .upsert({ user_id: user.id, ts_guild: false }, { onConflict: 'user_id' })
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
