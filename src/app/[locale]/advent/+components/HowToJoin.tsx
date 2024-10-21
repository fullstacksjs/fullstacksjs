'use client';

import type { RichTranslationValues } from 'next-intl';

import { Anchor } from '@/components/Link';
import { useSignIn } from '@/data-layer/supabase/useSignIn';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const items = [
  'login-aoc',
  'join',
  'engage',
  'link',
  'login',
  'follow',
] as const;

export const HowToJoinItems = () => {
  const t = useTranslations('advent');
  const { signIn } = useSignIn();

  const i18n: RichTranslationValues = {
    'l-leader': (chunk) => (
      <Anchor asChild>
        <Link href="/advent/board">{chunk}</Link>
      </Anchor>
    ),
    'a-tg': (chunk) => (
      <Anchor href="https://t.me/fullstacksjs/163643">{chunk}</Anchor>
    ),
    'a-settings': (chunk) => (
      <Anchor href="https://adventofcode.com/2023/settings">{chunk}</Anchor>
    ),
    'a-leader': (chunk) => (
      <Anchor href="https://adventofcode.com/2023/leaderboard/private/view/3205245">
        {chunk}
      </Anchor>
    ),
    'a-advent': (chunk) => (
      <Anchor href="https://adventofcode.com/2023">{chunk}</Anchor>
    ),
    login: (chunk) => (
      <button className="text-accent-0" type="submit" onClick={signIn}>
        {chunk}
      </button>
    ),
  };

  return (
    <ol className="ms-10 list-decimal text-fg-1">
      {items.map((l) => (
        <li key={l}>{t.rich(`join.${l}`, i18n)}</li>
      ))}
    </ol>
  );
};
