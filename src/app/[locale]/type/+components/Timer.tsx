import { formatStopWatch } from '@/utils/date';
import { useAsyncEffect } from 'ahooks';
import { useAtom } from 'jotai';

import { useTimeEllipses, recordAtom } from '../atoms';
import { useSupabase } from '@/data-layer/supabase/SupabaseProvider';

export const Timer = ({
  className,
  isPerfect,
}: {
  className?: string;
  isPerfect?: boolean;
}) => {
  const diff = useTimeEllipses();
  const { supabase } = useSupabase();
  const [record, setRecord] = useAtom(recordAtom);

  useAsyncEffect(async () => {
    const session = (await supabase.auth.getSession()).data.session;

    if (session === null) return;

    const lastRecord = (await supabase.from('records').select('best_record'))
      .data?.[0]?.best_record;

    if (isPerfect) {
      const bestRecord = diff && lastRecord ? Math.min(diff, lastRecord) : diff;

      setRecord(bestRecord);

      await supabase.from('records').upsert(
        {
          best_record: bestRecord,
          user_id: session.user.id,
        },
        { onConflict: 'user_id' },
      );
    } else if (!record && lastRecord) {
      setRecord(lastRecord);
    }
  }, [isPerfect]);

  return (
    <>
      <span className={className}>{formatStopWatch(diff)}</span>
      {record && <span>your best time {formatStopWatch(record)}</span>}
    </>
  );
};
