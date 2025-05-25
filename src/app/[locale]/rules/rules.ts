import type { Messages } from 'next-intl';

export type Rule = keyof Messages['rules']['items'];
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
