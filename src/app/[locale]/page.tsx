import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import Articles from '@/components/Articles';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';

export const metadata = {
  title: 'Fullstacksjs',
};

// export const dynamic = 'force-dynamic';

export default function Home() {
  const t = useTranslations('main');

  return (
    <Articles>
      <Article title={t('about.title')}>
        <Paragraph>
          {t.rich('about.content', {
            mark: (chunk) => <Highlight>{chunk}</Highlight>,
          })}
        </Paragraph>
      </Article>

      <Article title={t('motivation.title')}>
        <Paragraph>
          {t.rich('motivation.content', {
            b: (chunk) => <b>{chunk}</b>,
          })}
        </Paragraph>
      </Article>

      <Article title={t('values.title')}>
        <Paragraph>{t('values.content')}</Paragraph>
        <Paragraph>
          {t.rich('values.ethics', {
            b: (chunk) => <b>{chunk}</b>,
          })}
        </Paragraph>
        <Paragraph>
          {t.rich('values.validity', {
            b: (chunk) => <b>{chunk}</b>,
          })}
        </Paragraph>
      </Article>
    </Articles>
  );
}
