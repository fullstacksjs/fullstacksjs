import { notFound } from 'next/navigation';

import { getEventBySlug } from '@/data-layer/datocms/getEvent';

import { EventDialog } from './EventDialog';

export default async function Page({
  params,
}: SafeLocale<PageProps<'/[locale]/events/[slug]'>>) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return <EventDialog event={event} />;
}
