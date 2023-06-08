import { getEvents } from '@/data-layer/operations/getEvents';

import EventsContent from './EventContent';

export interface Lecturer {
  slug: string;
  name: string;
  avatar: string;
}

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date(),
  );

  const archivedEvents = events.filter(
    (event) => new Date() > new Date(event.date),
  );

  return <EventsContent upcoming={upcomingEvents} archived={archivedEvents} />;
}
