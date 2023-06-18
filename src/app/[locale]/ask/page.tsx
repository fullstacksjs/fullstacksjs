import { useTranslations } from 'next-intl';

import { Article } from '@/components/Article';
import Articles from '@/components/Articles';
import { Rule } from '@/components/Rule';
import { RuleSet } from '@/components/RuleSet';

const asks = [
  'precise',
  'environment',
  'diagnostic',
  'sandbox',
  'courteous',
  'topic',
  'xy',
  'rush',
  'guess',
  'pv',
  'homework',
];

// export const dynamic = 'force-dynamic';

export default function AskPage() {
  const t = useTranslations('ask');

  return (
    <Articles>
      <Article title={t('title')}>
        <RuleSet>
          {asks.map((ask) => (
            <Rule key={ask} target={ask}>
              <p className="mb-2 text-accent-1">{t(`guides.${ask}.title`)}:</p>
              <p className="text-light-0">{t(`guides.${ask}.desc`)}</p>
              <br />
            </Rule>
          ))}
        </RuleSet>
      </Article>
    </Articles>
  );
}
