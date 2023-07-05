import { useTranslations } from 'next-intl';

import { Separator } from '@/components/Separator';
import type { Events } from '@/data-layer/domain';

import EventList from './EventList';

export default function EventsContent({ upcoming, archived }: Events) {
  const t = useTranslations('events');

  return (
    <>
      <EventList events={upcoming} title={t('upcoming.title')} />
      <Separator />
      <EventList events={archived} title={t('archived.title')} />
    </>
  );
}
