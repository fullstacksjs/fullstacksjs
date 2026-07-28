import type { Messages } from 'next-intl';

export type Ask = keyof Messages['ask']['guides'];

type AskExample = keyof Messages['ask']['examples'];

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

const asksWithExample = new Set<string>([
  'precise',
  'sandbox',
  'xy',
  'guess',
] satisfies AskExample[]);

export function hasExample(ask: Ask): ask is Ask & AskExample {
  return asksWithExample.has(ask);
}
