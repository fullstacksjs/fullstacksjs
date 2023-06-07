import { useTranslations } from 'next-intl';

export default function JoinButton(): JSX.Element {
  const t = useTranslations('hero');

  return (
    <a
      className="flex flex-row items-center justify-center rounded-lg bg-accent-0 px-12 py-4 text-sm font-semibold uppercase leading-snug text-dark-0 outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 transition-shadow hover:ring-[6px] hover:ring-accent-0/40 focus:outline"
      href="https://t.me/fullstacksjs"
      target="_blank"
      rel="noopener"
    >
      {t('join')}
    </a>
  );
}
