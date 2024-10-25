import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { Paragraph } from '@/components/Paragraph';
import { Separator } from '@/components/Separator';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Banner } from './+components/Banner';
import { JoinButton } from './+components/JoinButton';

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('main');

  return (
    <>
      <Banner cta={<JoinButton />} sub={t('vision')} title="FullstacksJS" />
      <Separator />
      <Articles>
        <Article title={t('about.title')}>
          <Paragraph>{t.rich('about.content')}</Paragraph>
        </Article>

        <Article title={t('motivation.title')}>
          <Paragraph>{t.rich('motivation.content')}</Paragraph>
        </Article>

        <Article title={t('values.title')}>
          <Paragraph>{t('values.content')}</Paragraph>
          <Paragraph>{t.rich('values.ethics')}</Paragraph>
          <Paragraph>{t.rich('values.validity')}</Paragraph>
          <Paragraph>{t.rich('values.professionalism')}</Paragraph>
        </Article>
      </Articles>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
