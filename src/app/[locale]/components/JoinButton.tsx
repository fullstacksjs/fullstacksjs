import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';

export default function JoinButton(): JSX.Element {
  const t = useTranslations('hero');

  return (
    <Button href="https://t.me/fullstacksjs" target="_blank" rel="noopener">
      {t('join')}
    </Button>
  );
}
