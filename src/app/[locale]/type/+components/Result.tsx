import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import type { User } from '@/data-layer/supabase/models/User';
import { formatStopWatch } from '@/utils/date';

import { isPerfectAtom, mistakesAtom } from '../atoms';
import { NeedToLogin } from './NeedToLogin';
import { Retry } from './Retry';
import { Timer } from './Timer';

interface Props {
  record?: number;
  user?: User;
}

export const Result = ({ record, user }: Props) => {
  const [mistakes] = useAtom(mistakesAtom);
  const [isPerfect] = useAtom(isPerfectAtom);
  const t = useTranslations<'type'>();

  return (
    <div className="w-full text-center">
      <div className="flex w-full flex-col items-center gap-2 text-sm font-semibold">
        <Timer className="text-5xl" />
        {record ? (
          <span>{t('best', { duration: formatStopWatch(record) })}</span>
        ) : !user ? (
          <NeedToLogin />
        ) : null}
        {!isPerfect ? (
          <span className="text-fg-success">{t('perfect')}</span>
        ) : (
          <span className="text-fg-error">{t('mistakes', { mistakes })}</span>
        )}
        <Retry />
      </div>
    </div>
  );
};
