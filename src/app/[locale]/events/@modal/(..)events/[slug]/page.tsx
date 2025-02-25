import { getEventBySlug } from '@/data-layer/datocms/getEvent';
import { notFound } from 'next/navigation';

import { EventDialog } from './EventDialog';

export default async function Page({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return <EventDialog event={event} />;
}
