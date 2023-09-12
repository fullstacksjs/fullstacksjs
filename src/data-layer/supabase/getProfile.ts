import { cache } from 'react';

import type { Profile } from './models/Profile';
import { createServerSupabaseClient } from './SupabaseServer';

export const getProfile = cache(async (): Promise<Profile | null> => {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session == null) return null;

    return {
      avatar: data.session.user.user_metadata['avatar_url'],
      email: data.session.user.user_metadata['email'],
      name: data.session.user.user_metadata['name'],
      username: data.session.user.user_metadata['user_name'],
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
