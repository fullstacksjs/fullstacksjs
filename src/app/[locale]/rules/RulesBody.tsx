'use client';
import { isNull } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Article } from '@/components/Article';
import { Paragraph } from '@/components/Paragraph';
import { Rule } from '@/components/Rule';
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

export default function RulesBody(): React.JSX.Element {
  const [activeTarget, setActive] = useState<string | undefined>();
  const t = useTranslations();

  const handleSelect = (target: string) => {
    if (target === activeTarget) setActive(undefined);
    else setActive(target);
  };

  return (
    <>
      <Article id="rules" title={t('title')}>
        <Paragraph>
          {t.rich('desc', { b: (chunk) => <b>{chunk}</b> })}
        </Paragraph>

        <RuleSet>
          {rules.map((rule) => (
            <Rule
              key={rule}
              onSelect={handleSelect}
              isActive={isNull(activeTarget) || activeTarget === rule}
              target={rule}
            >
              {t.rich(`items.${rule}`, { b: (chunk) => <b>{chunk}</b> })}
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
              isActive={isNull(activeTarget) || activeTarget === guide}
              target={guide}
            >
              {t(`guidelines.items.${guide}`)}
            </Rule>
          ))}
        </RuleSet>
      </Article>
    </>
  );
}
