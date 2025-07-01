import { useLocale } from 'next-intl';

export type Direction = 'ltr' | 'rtl';

const directions: Record<string, Direction> = {
  fa: 'rtl',
};

export const getDirection = (locale: string): Direction =>
  directions[locale] ?? 'ltr';

export const useIsRTL = () => {
  const locale = useLocale();
  return getDirection(locale) === 'rtl';
};
