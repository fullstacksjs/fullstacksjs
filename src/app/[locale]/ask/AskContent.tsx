'use client';
import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { FocusItemList } from '@/components/FocusItemList';
import { useScrollToFocused } from '@/hooks/useRuleTarget';

import { asks } from './asks';

export function AskContent() {
  const t = useTranslations('ask');
  useScrollToFocused();

  return (
    <Articles>
      <Article title={t('title')}>
        <FocusItemList>
          {asks.map((ask) => (
            <FocusItemList.Item key={ask} target={ask}>
              <p className="mb-2">{t(`guides.${ask}.title`)}:</p>
              <p className="text-light-0">{t(`guides.${ask}.desc`)}</p>
              <br />
            </FocusItemList.Item>
          ))}
        </FocusItemList>
      </Article>
    </Articles>
  );
}
