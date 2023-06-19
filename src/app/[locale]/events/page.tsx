import { notFound } from 'next/navigation';

import { getEvents } from '@/data-layer/getEvents';
import { getServerFeature } from '@/features/getServerFeatures';

import EventsContent from './EventContent';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await getEvents();

  if (!getServerFeature('events')) notFound();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date(),
  );

  const archivedEvents = events.filter(
    (event) => new Date() > new Date(event.date),
  );

  return <EventsContent upcoming={upcomingEvents} archived={archivedEvents} />;
}
