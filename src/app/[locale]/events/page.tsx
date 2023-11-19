import { notFound } from 'next/navigation';

import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getEvents } from '@/data-layer/datocms/getEvents';

import EventsContent from './EventContent';

export const metadata = generatePageOG({
  title: 'FullstacksJS Events: Learn from the Past, Prepare for the Future',
  description:
    'The FullstacksJS Events page provides a look back at our past events, including the topics that were covered, the speakers who presented, and the resources that were shared. It also lists our upcoming events, so you can stay up-to-date on our latest events and find opportunities to learn and network with other developers.',
  images: '/og/og.png',
});

export default async function EventsPage() {
  if (!getServerFeature('events')) notFound();

  const { upcoming, archived } = await getEvents();

  return <EventsContent upcoming={upcoming} archived={archived} />;
}
