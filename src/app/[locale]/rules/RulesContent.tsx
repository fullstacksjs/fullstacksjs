'use client';
import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { FocusItemList } from '@/components/FocusItemList';
import { Paragraph } from '@/components/Paragraph';
import { useScrollToFocused } from '@/hooks/useRuleTarget';
import { useTranslations } from 'next-intl';

import { guidelines } from './guidlines';
import { rules } from './rules';

const i18nMapper = { b: (chunk: React.ReactNode) => <b>{chunk}</b> };

export default function RulesContent() {
  const t = useTranslations('rules');
  useScrollToFocused();

  return (
    <Articles>
      <Article id="rules" title={t('title')}>
        <Paragraph>{t.rich('desc', i18nMapper)}</Paragraph>

        <FocusItemList>
          {rules.map((rule) => (
            <FocusItemList.Item key={rule} target={rule}>
              {t.rich(`items.${rule}`, i18nMapper)}
            </FocusItemList.Item>
          ))}
        </FocusItemList>
      </Article>

      <Article id="guides" title={t('guidelines.title')}>
        <FocusItemList>
          {guidelines.map((guide) => (
            <FocusItemList.Item key={guide} target={guide}>
              {t(`guidelines.items.${guide}`)}
            </FocusItemList.Item>
          ))}
        </FocusItemList>
      </Article>
    </Articles>
  );
}
