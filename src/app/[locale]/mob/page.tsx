import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { Button } from '@/components/Button';
import { generatePageOG } from '@/components/SEO';
import { getMobEvent } from '@/data-layer/datocms/getMobEvent';

import { EventActions, EventPage } from '../+components/Event/EventPage';

export async function generateMetadata(): Promise<Metadata> {
  const event = await getMobEvent();

  return generatePageOG({
    title: 'Fullstacksjs MobReview',
    description:
      'A bi-weekly livestream where we collaboratively review codebases and explore best practices for clean, efficient, and maintainable code.',
    images: event?.thumbnail.src ?? '/og/og.png',
  });
}

export default async function Page() {
  const event = await getMobEvent();
  if (!event) return notFound();

  return (
    <EventPage
      heading={event.heading}
      thumbnail={event.thumbnail}
      description={event.description}
    >
      <EventActions>
        <Button asChild size="sm">
          <a href="/mob/calendar" target="_blank">
            افزودن به تقویم
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href="/mob/live" target="_blank">
            وارد جلسه شوید
          </a>
        </Button>
      </EventActions>
    </EventPage>
  );
}
