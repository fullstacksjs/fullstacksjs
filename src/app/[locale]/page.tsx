import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { Paragraph } from '@/components/Paragraph';
import { Separator } from '@/components/Separator';
import { i18nComponents as tc } from '@/i18n/i18nComponents';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Banner } from './+components/Banner';
import { JoinButton } from './+components/JoinButton';

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale: 'fa', namespace: 'main' });

  return (
    <>
      <Banner cta={<JoinButton />} sub={t('vision')} title="FullstacksJS" />
      <Separator />
      <Articles>
        <Article title={t('about.title')}>
          <Paragraph>{t.rich('about.content', tc)}</Paragraph>
        </Article>

        <Article title={t('motivation.title')}>
          <Paragraph>{t.rich('motivation.content', tc)}</Paragraph>
        </Article>

        <Article title={t('values.title')}>
          <Paragraph>{t('values.content')}</Paragraph>
          <Paragraph>{t.rich('values.ethics', tc)}</Paragraph>
          <Paragraph>{t.rich('values.validity', tc)}</Paragraph>
          <Paragraph>{t.rich('values.professionalism', tc)}</Paragraph>
        </Article>
      </Articles>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
