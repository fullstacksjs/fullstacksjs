import { range } from '@fullstacksjs/toolbox';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';
import { Suspense } from 'react';

import { generatePageOG } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { routing } from '@/i18n/routing';

import { ColorsGrid } from './+components/ColorsGrid';
import { generateColorQuestions } from './+logic/questionGenerator';

export const metadata = generatePageOG({
  title: 'HSL Color Guessing Game',
  description:
    'Test your sense of color with this interactive HSL guessing game. Improve your color perception, learn about HSL values, and challenge yourself with each round!',
});

const ColorBoard = () => {
  const colors = generateColorQuestions(20);

  return <ColorsGrid colors={colors} />;
};

const BoardSkeleton = () => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-4.5">
      {range(3).map((key) => (
        <Skeleton
          className="w-[85px] h-[85px] mobile:w-[100px] mobile:h-[100px] transition-all duration-200 rounded-lg cursor-pointer"
          key={key}
        />
      ))}
    </div>
  );
};

export default async function ColorPage({
  params,
}: SafeLocale<PageProps<'/[locale]/hsl'>>) {
  const hsl = getServerFeature('hsl');
  if (!hsl) return notFound();
  const messages = await getMessages();

  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hsl' });

  return (
    <NextIntlClientProvider messages={pick(messages, ['hsl'])}>
      <div className="flex flex-col justify-center items-center gap-18">
        <h1 className="text-3xl font-bold leading-tight">{t('title')}</h1>
        <p className="text-center">{t('desc')}</p>
        <Suspense fallback={<BoardSkeleton />}>
          <ColorBoard />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
