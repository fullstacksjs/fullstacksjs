'use client';
import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { Rule, useRuleTarget } from '@/components/Rule';
import { RuleSet } from '@/components/RuleSet';

import { asks } from './asks';

export default function AskContent(): React.JSX.Element {
  const t = useTranslations<'ask'>();
  const { handleSelect, getState: isActive } = useRuleTarget('/ask');

  return (
    <Articles>
      <Article title={t('title')}>
        <RuleSet>
          {asks.map((ask) => (
            <Rule
              onSelect={handleSelect}
              state={isActive(ask)}
              key={ask}
              target={ask}
            >
              <p className="mb-2">{t(`guides.${ask}.title`)}:</p>
              <p className="text-light-0">{t(`guides.${ask}.desc`)}</p>
              <br />
            </Rule>
          ))}
        </RuleSet>
      </Article>
    </Articles>
  );
}
