import { isEmpty } from '@fullstacksjs/toolbox';

import SectionHeader from '@/components/SectionHeader';
import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import EventCard from './EventCard';

interface Props {
  events: FullstacksJSEvent[];
  title: string;
}

export default function EventList({ events, title }: Props) {
  if (isEmpty(events)) return null;

  return (
    <div>
      <SectionHeader>{title}</SectionHeader>
      <div className="mt-16 grid gap-16 tablet:grid-cols-2 wide:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
