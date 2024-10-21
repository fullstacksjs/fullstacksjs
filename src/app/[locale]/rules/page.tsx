import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { FocusItem, FocusItemList } from '@/components/FocusItemList';
import { Paragraph } from '@/components/Paragraph';
import { generatePageOG } from '@/components/SEO';
import { getTranslations } from 'next-intl/server';

import { guidelines } from './guidelines';
import { RulesHydration } from './RuleHydration';
import { rules } from './rules';

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Rules: A Guide to Respectful Conduct',
  description:
    'The FullstacksJS community is committed to creating a safe and welcoming environment for everyone. These rules outline the behaviors that are considered harassment and unacceptable within our community. By following these rules, we can all help to create a positive and productive environment for learning and collaboration.',
  images: '/og/og.png',
});

export default async function RulesPage() {
  const t = await getTranslations('rules');

  return (
    <Articles>
      <RulesHydration />
      <Article id="rules" title={t('title')}>
        <Paragraph>{t.rich('desc')}</Paragraph>

        <FocusItemList>
          {rules.map((rule) => (
            <FocusItem key={rule} target={rule}>
              {t.rich(`items.${rule}`)}
            </FocusItem>
          ))}
        </FocusItemList>
      </Article>

      <Article id="guides" title={t('guidelines.title')}>
        <FocusItemList>
          {guidelines.map((guide) => (
            <FocusItem key={guide} target={guide}>
              {t(`guidelines.items.${guide}`)}
            </FocusItem>
          ))}
        </FocusItemList>
      </Article>
    </Articles>
  );
}
