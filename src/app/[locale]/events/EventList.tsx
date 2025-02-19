import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import SectionHeader from '@/components/SectionHeader';
import { isEmpty } from '@fullstacksjs/toolbox';

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
        {events.map((event, i) => (
          <EventCard event={event} key={event.slug} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
