import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getEventBySlug } from '@/data-layer/datocms/getEvent';

import { EventDialog } from './EventDialog';

const InnerEventPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return <EventDialog event={event} />;
};

export default async function Page({
  params,
}: SafeLocale<PageProps<'/[locale]/events/[slug]'>>) {
  return (
    <Suspense fallback={<>Loading</>}>
      <InnerEventPage params={params} />
    </Suspense>
  );
}
