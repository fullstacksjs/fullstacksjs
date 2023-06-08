import SectionHeader from '@/components/SectionHeader';
import type { FullstackEvent } from '@/data-layer/operations/getEvents';

import EventCard from './EventCard';

interface Props {
  events: FullstackEvent[];
  title: string;
}

export default function EventList({ events, title }: Props) {
  return (
    <div>
      <SectionHeader>{title}</SectionHeader>
      <div className="mt-16 grid gap-16 tablet:grid-cols-2 desktop:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.date} event={event} />
        ))}
      </div>
    </div>
  );
}
