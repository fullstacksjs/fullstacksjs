'use client';

import type { RichTranslationValues } from 'next-intl';

import { Article } from '@/components/Article';
import { useSignIn } from '@/data-layer/supabase/useSignIn';
import { useTranslations } from 'next-intl';

import { i18nMap } from './i18nMap';

const items = [
  'login-aoc',
  'join',
  'engage',
  'link',
  'login',
  'follow',
] as const;

export const HowToJoin = () => {
  const t = useTranslations('advent');
  const { signIn } = useSignIn();
  const i18n: RichTranslationValues = {
    ...i18nMap,
    login: (chunk) => (
      <button className="text-accent-0" type="submit" onClick={signIn}>
        {chunk}
      </button>
    ),
  };

  const howJoin = t.rich('join.title', i18n) as React.ReactElement;

  return (
    <Article id="advent" title={howJoin}>
      <ol className="ms-10 list-decimal text-fg-1">
        {items.map((l) => (
          <li key={l}>{t.rich(`join.${l}`, i18n)}</li>
        ))}
      </ol>
    </Article>
  );
};
