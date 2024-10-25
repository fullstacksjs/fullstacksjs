import { cache } from 'react';

import type { Profile } from './models/Profile';

import { createServerSupabaseClient } from './SupabaseServer';

export const getUser = cache(async (): Promise<Profile | undefined> => {
  const supabase = await createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getUser();
    if (data.user == null) return undefined;

    return {
      id: data.user.id,
      avatar: data.user.user_metadata['avatar_url'],
      email: data.user.user_metadata['email'],
      name: data.user.user_metadata['name'],
      username: data.user.user_metadata['user_name'],
    };
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
});
