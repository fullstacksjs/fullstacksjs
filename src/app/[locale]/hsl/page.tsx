import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';
import React from 'react';

import ColorsGrid from './+components/ColorsGrid';
import { generateColorQuestions } from './generateColorQuestions';

export const metadata = generatePageOG({
  title: 'HSL Color Guessing Game',
  description:
    'Test your sense of color with this interactive HSL guessing game. Improve your color perception, learn about HSL values, and challenge yourself with each round!',
});

export default async function ColorPage({ params }: PageProps) {
  const colors = generateColorQuestions(20);
  const hsl = getServerFeature('hsl');
  if (!hsl) return notFound();
  const messages = await getMessages();

  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hsl');

  return (
    <NextIntlClientProvider messages={pick(messages, ['hsl'])}>
      <div className="flex flex-col justify-center items-center gap-18">
        <h1 className="text-3xl font-bold leading-tight">{t('title')}</h1>
        <p className="text-center">{t('desc')}</p>
        <ColorsGrid colors={colors} />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
