import type { Messages } from 'next-intl';

export type Ask = keyof Messages['ask']['guides'];
export const asks: Ask[] = [
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
