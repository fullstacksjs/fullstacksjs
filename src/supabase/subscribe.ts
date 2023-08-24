'use server';

import { cache } from 'react';

import { createServerSupabaseClient, getSession } from './SupabaseServer';

export const subscribe = cache(async () => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  try {
    const { data, error } = await supabase
      .from('subscription')
      .upsert(
        { user_id: session?.user.id, ts_guild: true },
        { onConflict: 'user_id' },
      )
      .select();

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
