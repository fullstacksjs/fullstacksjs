import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { FocusItem } from '@/components/FocusItemList/FocusItem';
import { FocusItemList } from '@/components/FocusItemList/FocusItemList';
import { FocusItemListSkeleton } from '@/components/FocusItemList/FocusItemListSkeleton';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';
import { i18nComponents as tc } from '@/i18n/i18nComponents';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { guidelines } from './guidelines';
import { rules } from './rules';

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Rules: A Guide to Respectful Conduct',
  description:
    'The FullstacksJS community is committed to creating a safe and welcoming environment for everyone. These rules outline the behaviors that are considered harassment and unacceptable within our community. By following these rules, we can all help to create a positive and productive environment for learning and collaboration.',
});

export default async function RulesPage({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('rules');

  return (
    <NextIntlClientProvider>
      <Articles>
        <Article id="rules" title={t('title')}>
          <Paragraph>{t.rich('desc', tc)}</Paragraph>

          <FocusItemList
            fallback={<FocusItemListSkeleton lines={rules.length} />}
          >
            {rules.map((rule) => (
              <FocusItem key={rule} target={rule}>
                {t.rich(`items.${rule}`, tc)}
              </FocusItem>
            ))}
          </FocusItemList>
        </Article>

        <Article id="guides" title={t('guidelines.title')}>
          <FocusItemList
            fallback={<FocusItemListSkeleton lines={guidelines.length} />}
          >
            {guidelines.map((guide) => (
              <FocusItem key={guide} target={guide}>
                {t(`guidelines.items.${guide}`)}
              </FocusItem>
            ))}
          </FocusItemList>
        </Article>
      </Articles>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
