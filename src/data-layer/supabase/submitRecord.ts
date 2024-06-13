'use server';

import { getRecord } from './getRecord';
import { getUser } from './getUser';
import { createServerSupabaseClient } from './SupabaseServer';

interface Record {
  duration: number;
  mistakes: number;
}

export const submitRecord = async ({ duration, mistakes }: Record) => {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  if (user == null) return;

  const { error } = await supabase
    .from('records')
    .insert({ user_id: user.id, duration, mistakes });

  if (error) throw error;

  return getRecord();
};
