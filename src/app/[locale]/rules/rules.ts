import type { Messages } from 'next-intl';

type Rule = keyof Messages['rules']['items'];
export const rules: Rule[] = [
  'violence',
  'name-calling',
  'nsfw',
  'personal',
  'insult',
  'sex',
  'copyright',
  'spam',
  'dm',
  'controversial',
  'advocate',
  'disturb',
];
