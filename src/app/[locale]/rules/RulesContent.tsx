'use client';
import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { Paragraph } from '@/components/Paragraph';
import { Rule, useRuleTarget } from '@/components/Rule';
import { RuleSet } from '@/components/RuleSet';

const rules = [
  'violence',
  'name-calling',
  'nsfw',
  'personal',
  'insult',
  'sex',
  'copyright',
  'spam',
  'dm',
  'advocate',
];

const guidelines = ['kind', 'topic', 'cross', 'opinion'];
const i18nMapper = { b: (chunk: React.ReactNode) => <b>{chunk}</b> };

export default function RulesContent(): React.JSX.Element {
  const t = useTranslations();
  const { handleSelect, getState: isActive } = useRuleTarget();

  return (
    <Articles>
      <Article id="rules" title={t('title')}>
        <Paragraph>{t.rich('desc', i18nMapper)}</Paragraph>

        <RuleSet>
          {rules.map((rule) => (
            <Rule
              key={rule}
              onSelect={handleSelect}
              state={isActive(rule)}
              target={rule}
            >
              {t.rich(`items.${rule}`, i18nMapper)}
            </Rule>
          ))}
        </RuleSet>
      </Article>

      <Article id="guides" title={t('guidelines.title')}>
        <RuleSet>
          {guidelines.map((guide) => (
            <Rule
              key={guide}
              onSelect={handleSelect}
              state={isActive(guide)}
              target={guide}
            >
              {t(`guidelines.items.${guide}`)}
            </Rule>
          ))}
        </RuleSet>
      </Article>
    </Articles>
  );
}
