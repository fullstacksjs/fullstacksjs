import { Article } from '@/components/Article';
import Articles from '@/components/Articles';
import { Rule } from '@/components/Rule';
import { RuleSet } from '@/components/RuleSet';
import { useTranslations } from 'next-intl';

const guides = [
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

export default function AskPage() {
  const t = useTranslations('ask');

  return (
    <Articles>
      <Article title={t('title')}>
        <RuleSet>
          {guides.map((guide) => (
            <Rule target={guide}>
              <p className="mb-2 text-accent-1">
                {t(`guides.${guide}.title`)}:
              </p>
              <p className="text-light-0">{t(`guides.${guide}.desc`)}</p>
              <br />
            </Rule>
          ))}
        </RuleSet>
      </Article>
    </Articles>
  );
}
