import { notFound } from 'next/navigation';

import { getEvents } from '@/data-layer/getEvents';
import { getServerFeature } from '@/features/getServerFeatures';

import EventsContent from './EventContent';
import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const title =
  'FullstacksJS Events: Learn from the Past, Prepare for the Future ';
const description =
  'The FullstacksJS Events page provides a look back at our past events, including the topics that were covered, the speakers who presented, and the resources that were shared. It also lists our upcoming events, so you can stay up-to-date on our latest events and find opportunities to learn and network with other developers.';
const ogImage: OpenGraph['images'] = {
  url: '/og/og.png',
  alt: title,
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ogImage,
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

export default async function EventsPage() {
  if (!getServerFeature('events')) notFound();

  const { upcoming, archived } = await getEvents();

  return <EventsContent upcoming={upcoming} archived={archived} />;
}
