import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO/meta';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getReportWithCache } from '@/data-layer/wakatime/getReport';
import { i18nComponents as tc } from '@/i18n/i18nComponents';

import { CopyableText } from '../../../components/CopyableText';
import { Anchor } from '../../../components/Link';
import { PageHeader } from '../+components/PageHeader';
import { Leaderboard } from './+components/Leaderboard';

export const metadata = generatePageOG({
  title:
    'FullstacksJS Leaderboards: Track Your Progress and See How You Stack Up Against Your Peers',
  description:
    'The FullstacksJS Leaderboards track the top coders, contributors, and learners in the FullstacksJS community. See how you stack up against your peers and track your progress over time.',
});

export default async function WakatimePage({
  params,
}: SafeLocale<PageProps<'/[locale]/wakatime'>>) {
  const feature = getServerFeature('wakatime');
  if (!feature) return notFound();

  const { locale } = await params;
  const messages = await getMessages();
  const { day, year, usages, winners } = await getReportWithCache(50);
  const t = await getTranslations({ locale, namespace: 'wakatime' });

  return (
    <NextIntlClientProvider messages={pick(messages, ['wakatime', 'common'])}>
      <div className="container flex flex-col gap-16">
        <PageHeader
          command={`$ ${messages.wakatime.command}`}
          title={messages.wakatime.title}
          description={t.rich('description', {
            ...tc,
            copyable: (chunk) => (
              <CopyableText dir="ltr">{String(chunk)}</CopyableText>
            ),
            playground: (chunk) => (
              <Anchor
                href="https://t.me/fullstacksjs/163643"
                rel="noopener noreferrer"
                target="_blank"
              >
                {chunk}
              </Anchor>
            ),
          })}
        />
        <Leaderboard day={day} year={year} usages={usages} winners={winners} />
      </div>
    </NextIntlClientProvider>
  );
}
