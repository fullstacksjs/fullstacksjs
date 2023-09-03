import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import type { Database } from './Database';
import type { Profile } from './Profile';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies }),
);

export const getSession = cache(async () => {
  const supabase = createServerSupabaseClient();

  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});

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

export const getSubscription = cache(async () => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  const { data } = await supabase
    .from('subscription')
    .select('*')
    .eq('user_id', session?.user.id)
    .eq('ts_guild', true);

  return !!data?.[0];
});

export const getActiveUsers = cache(async () => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (!session) return null;

  const { data } = await supabase
    .from('subscription')
    .select(
      `profile:user_id (
        email
      )`,
    )
    .eq('ts_guild', true);

  return data;
});
