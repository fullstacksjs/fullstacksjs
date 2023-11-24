export const addLeadingZero = (num: number) => num.toString().padStart(2, '0');

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
]);

export function formatOrdinals(n: number) {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule) ?? 'th';
  return `${n}${suffix}`;
}
