import { NextIntlClientProvider, useLocale } from 'next-intl';

import Articles from '@/components/Articles';

import RulesBody from './RulesBody';

export default async function RulesPage() {
  const locale = useLocale();

  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages.rules}>
      <Articles>
        <RulesBody />
      </Articles>
    </NextIntlClientProvider>
  );
}
