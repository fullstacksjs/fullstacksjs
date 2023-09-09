import { formatStopWatch } from '@/utils/date';
import { useAsyncEffect } from 'ahooks';
import { useAtom } from 'jotai';

import { isFinishedAtom, useTimeEllipses, recordAtom } from '../atoms';
import { useSupabase } from '@/data-layer/supabase/SupabaseProvider';

export const Timer = ({ className }: { className?: string }) => {
  const diff = useTimeEllipses();
  const [isFinished] = useAtom(isFinishedAtom);
  const { supabase } = useSupabase();
  const [record, setRecord] = useAtom(recordAtom);

  useAsyncEffect(async () => {
    const session = (await supabase.auth.getSession()).data.session;

    if (session === null) return;

    const lastRecord = (await supabase.from('records').select('best_record'))
      .data?.[0]?.best_record;
    const bestRecord =
      diff && lastRecord ? Math.min(diff, lastRecord) : lastRecord || diff;

    setRecord(bestRecord);

    await supabase.from('records').upsert(
      {
        best_record: bestRecord,
        user_id: session.user.id,
      },
      { onConflict: 'user_id' },
    );
  }, [isFinished]);

  return (
    <>
      <span className={className}>{formatStopWatch(diff)}</span>
      {record && <span>your best time {formatStopWatch(record)}</span>}
    </>
  );
};
