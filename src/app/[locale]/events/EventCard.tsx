/* eslint-disable jsx-a11y/alt-text */
import { format } from 'date-fns';
import { Image } from 'react-datocms/image';

import type { FullstacksJSEvent } from '@/data-layer/domain';

import { EventCardTitle } from './EventCardTitle';
import { LecturerStack } from './LecturerStack';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <a href={event.mediaUrl} className="flex flex-col gap-8">
      <Image
        className="aspect-video w-full rounded-md"
        data={event.thumbnail}
      />
      <div className="flex gap-4">
        <LecturerStack lecturers={event.lecturers} />
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 items-center gap-4 text-base font-bold leading-tight">
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
