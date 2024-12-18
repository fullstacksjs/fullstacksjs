import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { format } from 'date-fns';
import { SRCImage } from 'react-datocms';

import { EventCardTitle } from './EventCardTitle';
import { LecturerStack } from './LecturerStack';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <a
      aria-label={event.title}
      className="flex flex-col gap-8 font-fa"
      href={event.mediaUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <SRCImage
        data={event.thumbnail}
        imgClassName="aspect-video w-full rounded-md"
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
