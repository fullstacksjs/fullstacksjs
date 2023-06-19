import { useTranslations } from 'next-intl';

import Discord from '@/Icons/Discord.svg';
import Github from '@/Icons/Github.svg';
import Telegram from '@/Icons/Telegram.svg';
import Twitch from '@/Icons/Twitch.svg';
import Twitter from '@/Icons/Twitter.svg';
import Youtube from '@/Icons/Youtube.svg';

import { SocialItem } from './SocialItem';

const items = [
  {
    icon: Telegram,
    href: 'https://t.me/fullstacksjs',
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
];

export default function Socials(): React.JSX.Element {
  const t = useTranslations();

  return (
    <footer>
      <ul className="flex flex-wrap place-content-between gap-8">
        {items.map(({ children, href, icon: Icon }) => (
          <li key={children} className="list-none text-accent-0">
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
