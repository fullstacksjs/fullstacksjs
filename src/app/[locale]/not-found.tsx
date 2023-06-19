import { useTranslations } from 'next-intl';

const NotFound = (): React.JSX.Element => {
  const t = useTranslations('notfound');

  return <div>{t('title')}</div>;
};

export default NotFound;
