'use server';

import { createServerSupabaseClient, getSession } from './SupabaseServer';

interface Record {
  time: number;
  isPerfect: boolean;
}

export const submitRecord = async ({ time, isPerfect }: Record) => {
  const supabase = createServerSupabaseClient();
  const session = await getSession();

  if (session === null) return;

  const { data: records } = await supabase
    .from('records')
    .select('time')
    .single();
  const record = records?.time;

  const bestRecord = Math.min(time, record ?? Infinity);

  await supabase.from('records').upsert(
    {
      best_record: bestRecord,
      user_id: session.user.id,
      is_perfect: isPerfect,
    },
    { onConflict: 'user_id' },
  );

  return bestRecord;
};
