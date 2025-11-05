import { format } from 'date-fns';
import { SRCImage } from 'react-datocms';

import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { Skeleton } from '@/components/Skeleton';
import { Link } from '@/i18n/routing';

import { EventCardTitle } from './EventCardTitle';
import { LecturerStack } from './LecturerStack';

interface Props {
  event: FullstacksJSEvent;
  priority?: boolean;
}

export const EventCard = ({ event, priority }: Props) => {
  return (
    <Link
      aria-label={event.title}
      className="flex flex-col gap-8"
      href={`/events/${event.slug}`}
      scroll={false}
    >
      <SRCImage
        data={event.thumbnail}
        imgClassName="aspect-video w-full rounded-md"
        priority={priority}
      />
      <div className="flex gap-4">
        <LecturerStack lecturers={event.lecturers} />
        <div dir="rtl" className="flex flex-1 flex-col gap-4">
          <EventCardTitle data={event.title} />
          <div className="flex w-full items-center text-sm text-fg-1">
            {format(event.date, 'dd/MM/yyyy')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const EventCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="aspect-video w-full" rounded />
      <div className="flex gap-4">
        <Skeleton circle className="h-12 w-12 shrink-0" />
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-6 w-3/4" rounded />
          <Skeleton className="h-4 w-1/4" rounded />
        </div>
      </div>
    </div>
  );
};
