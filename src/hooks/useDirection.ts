import { useLocale } from 'next-intl';

export type Direction = 'ltr' | 'rtl';

const directions: Record<string, Direction> = {
  fa: 'rtl',
};

export const useDirection = (): Direction => {
  const locale = useLocale();
  return directions[locale] ?? 'ltr';
};

export const useIsRTL = () => {
  const direction = useDirection();
  return direction === 'rtl';
};
