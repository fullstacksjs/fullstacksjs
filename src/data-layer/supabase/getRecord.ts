import { cache } from 'react';

import { createServerSupabaseClient } from './SupabaseServer';

export const getRecord = cache(async () => {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session == null) return null;

    const { data: records } = await supabase.from('records').select('*');

    return records?.[0];
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
