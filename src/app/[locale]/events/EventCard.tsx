import { format } from 'date-fns';
import { Image } from 'react-datocms/image';

import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { EventCardTitle } from './EventCardTitle';
import { LecturerStack } from './LecturerStack';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <a
      href={event.mediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-8"
    >
      <Image
        className="aspect-video w-full rounded-md"
        data={event.thumbnail}
      />
      <div className="flex gap-4">
        <LecturerStack lecturers={event.lecturers} />
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex-1 text-base font-bold leading-tight">
            <EventCardTitle>{event.title}</EventCardTitle>
          </div>
          <div className="flex items-center text-xsm text-fg-1">
            {format(event.date, 'dd/MM/yyyy')}
          </div>
        </div>
      </div>
    </a>
  );
}
