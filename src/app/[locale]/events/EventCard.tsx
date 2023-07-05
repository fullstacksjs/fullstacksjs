/* eslint-disable jsx-a11y/alt-text */
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Image } from 'react-datocms/image';

import { Button } from '@/components/Button';
import type { FullstacksJSEvent } from '@/data-layer/domain';

import { EventCardTitle } from './EventCardTitle';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props) {
  const t = useTranslations();
  const lecturers = event.lecturers[0]!;

  return (
    <div className="flex flex-col rounded-md border border-dashed border-fg-muted p-[1px]">
      <Image className="aspect-video w-full" data={event.thumbnail} />
      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="h-[89px] text-xl font-bold leading-tight">
          <EventCardTitle>{event.title}</EventCardTitle>
          <p className="text-xsm text-accent-0">
            {format(event.date, 'dd/MM/yyyy')}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Image className="rounded-full" data={lecturers.avatar} />
          {event.isUpcoming ? (
            <span className="text-xsm text-accent-0">
              {t('events.subscribers', { count: 0 })}
            </span>
          ) : null}
        </div>
        {event.isUpcoming ? (
          <Button variant="outline">{t('events.upcoming.action')}</Button>
        ) : event.mediaUrl ? (
          <Button variant="outline" asChild>
            <a href={event.mediaUrl}>{t('events.archived.action')}</a>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            {t('events.waiting')}
          </Button>
        )}
      </div>
    </div>
  );
}
