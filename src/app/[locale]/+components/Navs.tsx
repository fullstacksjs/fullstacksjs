import { useTranslations } from 'next-intl';

import type { Feature } from '@/config/features';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { useDirection } from '@/hooks/useDirection';

import Nav from './Nav';

type Keys = `navigation.${keyof IntlMessages['header']['navigation']}`;

interface Nav {
  feature: Feature;
  href: string;
  children: Keys;
  isNew?: boolean;
}

const navs: Nav[] = [
  { feature: 'about', href: '/', children: 'navigation.about' },
  { feature: 'rules', href: '/rules', children: 'navigation.rules' },
  { feature: 'ask', href: '/ask', children: 'navigation.ask' },
  { feature: 'events', href: '/events', children: 'navigation.events' },
  { feature: 'wakatime', href: '/wakatime', children: 'navigation.wakatime' },
  {
    feature: 'guild',
    href: '/guild',
    children: 'navigation.guild',
    isNew: true,
  },
  { feature: 'type', href: '/type', children: 'navigation.type', isNew: true },
];

export default function Navs() {
  const t = useTranslations('header');
  const direction = useDirection();

  return navs
    .filter((c) => getServerFeature(c.feature))
    .map((nav) => (
      <Nav key={nav.href} tNew={t('new')} direction={direction} {...nav}>
        {t(nav.children)}
      </Nav>
    ));
}
