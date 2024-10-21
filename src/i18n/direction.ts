import { useLocale } from 'next-intl';

export type Direction = 'ltr' | 'rtl';

const directions: Record<string, Direction> = {
  fa: 'rtl',
};

export const getDirection = (locale: string): Direction =>
  directions[locale] ?? 'ltr';

export const useDirection = (): Direction => {
  const locale = useLocale();
  return getDirection(locale);
};

export const useIsRTL = () => {
  const direction = useDirection();
  return direction === 'rtl';
};
