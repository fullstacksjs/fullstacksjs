import { cache } from 'react';

import type { Profile } from './models/Profile';
import { createServerSupabaseClient } from './SupabaseServer';

export const getUser = cache(async (): Promise<Profile | undefined> => {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session == null) return undefined;

    return {
      avatar: data.session.user.user_metadata['avatar_url'],
      email: data.session.user.user_metadata['email'],
      name: data.session.user.user_metadata['name'],
      username: data.session.user.user_metadata['user_name'],
    };
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
});
