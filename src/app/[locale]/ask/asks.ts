import type { Messages } from 'next-intl';

type Ask = keyof Messages['ask']['guides'];
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
