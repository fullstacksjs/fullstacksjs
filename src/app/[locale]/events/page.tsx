import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getEvents } from '@/data-layer/datocms/getEvents';
import { routing } from '@/i18n/routing';
import { isEmpty } from '@fullstacksjs/toolbox';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import EventList from './EventList';

export const metadata = generatePageOG({
  title: 'FullstacksJS Events: Learn from the Past, Prepare for the Future',
  description:
    'The FullstacksJS Events page provides a look back at our past events, including the topics that were covered, the speakers who presented, and the resources that were shared. It also lists our upcoming events, so you can stay up-to-date on our latest events and find opportunities to learn and network with other developers.',
});

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!getServerFeature('events')) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('events');

  const { upcoming, archived } = await getEvents();

  return (
    <NextIntlClientProvider>
      <EventList events={upcoming} title={t('upcoming.title')} />
      {isEmpty(upcoming) || isEmpty(archived) ? null : <Separator />}
      <EventList events={archived} title={t('archived.title')} />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
