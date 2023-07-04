import { useTranslations } from 'next-intl';

import { Separator } from '@/components/Separator';
import type { FullstacksJSEvent } from '@/data-layer/domain';

import EventList from './EventList';

export default function EventsContent({
  upcoming,
  archived,
}: {
  upcoming: FullstacksJSEvent[];
  archived: FullstacksJSEvent[];
}) {
  const t = useTranslations('events');

  return (
    <>
      <EventList events={upcoming} title={t('upcoming.title')} />
      <Separator />
      <EventList events={archived} title={t('archived.title')} />
    </>
  );
}
