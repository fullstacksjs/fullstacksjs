import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import type { Database } from './Database';
import type { Profile } from './Profile';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies }),
);

export async function getSession() {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session == null) return null;

    return {
      avatar: data.session.user.app_metadata['avatar_url'],
      email: data.session.user.app_metadata['email'],
      name: data.session.user.app_metadata['name'],
      username: data.session.user.app_metadata['user_name'],
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
