import { notFound } from 'next/navigation';

import { getEvents } from '@/data-layer/getEvents';
import { getServerFeature } from '@/features/getServerFeatures';

import EventsContent from './EventContent';

export default async function EventsPage() {
  if (!getServerFeature('events')) notFound();

  const { upcoming, archived } = await getEvents();

  return <EventsContent upcoming={upcoming} archived={archived} />;
}
