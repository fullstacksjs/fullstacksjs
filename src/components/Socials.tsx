import Discord from '@/components/Icons/Discord.svg';
import Github from '@/components/Icons/Github.svg';
import Telegram from '@/components/Icons/Telegram.svg';
import Twitch from '@/components/Icons/Twitch.svg';
import Twitter from '@/components/Icons/Twitter.svg';
import Youtube from '@/components/Icons/Youtube.svg';
import { useTranslations } from 'next-intl';

import { SocialItem } from './SocialItem';

const items = [
  {
    icon: Telegram,
    href: 'https://t.me/fullstacks',
    children: 'telegram',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@fullstacksjs',
    children: 'youtube',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/fullstacksjs',
    children: 'twitter',
  },
  {
    icon: Github,
    href: 'https://github.com/fullstacksjs',
    children: 'github',
  },
  {
    icon: Discord,
    href: 'https://discord.gg/rRKPzR4SY4',
    children: 'discord',
  },
  {
    icon: Twitch,
    href: 'https://twitch.tv/fullstacksjs',
    children: 'twitch',
  },
] as const;

export function Socials(): React.JSX.Element {
  const t = useTranslations();

  return (
    <footer>
      <ul className="flex flex-wrap justify-between gap-8">
        {items.map(({ children, href, icon: Icon }) => (
          <li className="list-none text-accent-0" key={children}>
            <SocialItem href={href}>
              <Icon className="shrink-0" />
              <span className="w-40 text-light-0 transition-colors hover:text-accent-0 mobile:w-64 tablet:w-auto wide:w-full">
                {t(`social.${children}`)}
              </span>
            </SocialItem>
          </li>
        ))}
      </ul>
    </footer>
  );
}
