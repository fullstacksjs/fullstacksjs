'use server';

import { getRecord } from './getRecord';
import { createServerSupabaseClient, getSession } from './SupabaseServer';

interface Record {
  duration: number;
  mistakes: number;
}

export const submitRecord = async ({ duration, mistakes }: Record) => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (session === null) return;

  await supabase
    .from('records')
    .insert({ user_id: session.user.id, duration, mistakes });

  return getRecord();
};
