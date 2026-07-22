export type Direction = 'ltr' | 'rtl';

const directions: Record<string, Direction> = {
  fa: 'rtl',
};

export const getDirection = (locale: string): Direction =>
  directions[locale] ?? 'ltr';
