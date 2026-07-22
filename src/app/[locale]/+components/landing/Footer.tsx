import { useTranslations } from 'next-intl';

import Discord from '@/components/Icons/Discord.svg';
import Github from '@/components/Icons/Github.svg';
import Telegram from '@/components/Icons/Telegram.svg';
import Twitch from '@/components/Icons/Twitch.svg';
import Twitter from '@/components/Icons/Twitter.svg';
import Youtube from '@/components/Icons/Youtube.svg';
import { ExternalLink } from '@/components/Link';

const socials = [
  {
    key: 'telegram',
    icon: Telegram,
    href: 'https://t.me/fullstacksjs',
    handle: '@fullstacksjs',
  },
  {
    key: 'github',
    icon: Github,
    href: 'https://github.com/fullstacksjs',
    handle: '/fullstacksjs',
  },
  {
    key: 'youtube',
    icon: Youtube,
    href: 'https://youtube.com/@fullstacksjs',
    handle: '@fullstacksjs',
  },
  {
    key: 'twitter',
    icon: Twitter,
    href: 'https://twitter.com/fullstacksjs',
    handle: '@fullstacksjs',
  },
  {
    key: 'discord',
    icon: Discord,
    href: 'https://discord.gg/rRKPzR4SY4',
    handle: '#fullstacksjs',
  },
  {
    key: 'twitch',
    icon: Twitch,
    href: 'https://twitch.tv/fullstacksjs',
    handle: '/fullstacksjs',
  },
] as const;

export const Footer = () => {
  const t = useTranslations('main');

  return (
    <footer className="container flex flex-col flex-wrap items-start justify-between gap-10 px-20 pt-20 mobile:flex-row">
      <div className="max-w-160">
        <h2 className="mb-2 text-lg font-bold">
          Fullstacks<span className="text-accent-0">JS</span>
        </h2>
        <p className="text-sm text-fg-1">{t('footer.tagline')}</p>
      </div>
      <div className="flex w-full flex-col gap-4 desktop:w-fit">
        <div className="font-mono text-sm tracking-widest text-fg-1 uppercase">
          {t('footer.findUs')}
        </div>
        {socials.map(({ key, icon: Icon, href, handle }) => (
          <ExternalLink
            key={key}
            href={href}
            className="group flex items-center gap-4 rounded-md border border-border px-6 py-4 text-fg-1 transition-colors hover:bg-bg-darker hover:text-accent-0"
          >
            <Icon width="24" />
            <span className="font-mono text-sm tracking-wide text-fg-1 transition-colors group-hover:text-accent-0">
              {handle}
            </span>
          </ExternalLink>
        ))}
      </div>
    </footer>
  );
};
