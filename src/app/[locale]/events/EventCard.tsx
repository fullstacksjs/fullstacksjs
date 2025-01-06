import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { Link } from '@/i18n/routing';
import { format } from 'date-fns';
import { SRCImage } from 'react-datocms';

import { EventCardTitle } from './EventCardTitle';
import { LecturerStack } from './LecturerStack';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <Link
      aria-label={event.title}
      className="flex flex-col gap-8 font-fa"
      href={`/events/${event.slug}`}
    >
      <SRCImage
        data={event.thumbnail}
        imgClassName="aspect-video w-full rounded-md"
      />
      <div className="flex gap-4">
        <LecturerStack lecturers={event.lecturers} />
        <div className="flex flex-1 flex-col gap-4">
          <EventCardTitle data={event.title} />
          <div className="flex items-center text-sm text-fg-1">
            {format(event.date, 'dd/MM/yyyy')}
          </div>
        </div>
      </div>
    </Link>
  );
}
