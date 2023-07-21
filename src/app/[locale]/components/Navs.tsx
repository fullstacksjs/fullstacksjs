import { useTranslations } from 'next-intl';

import type { Feature } from '@/features';
import { getServerFeature } from '@/features/getServerFeatures';
import { useDirection } from '@/hooks/useDirection';

import Nav from './Nav';

interface Nav {
  feature: Feature;
  href: string;
  children: string;
  isNew?: boolean;
}

const navs: Nav[] = [
  { feature: 'about', href: '/', children: 'about' },
  { feature: 'rules', href: '/rules', children: 'rules' },
  { feature: 'ask', href: '/ask', children: 'ask' },
  { feature: 'events', href: '/events', children: 'events' },
  { feature: 'guild', href: '/guild', children: 'guild', isNew: true },
];

export default function Navs() {
  const t = useTranslations('header.navigation');
  const direction = useDirection();

  return navs
    .filter((c) => getServerFeature(c.feature))
    .map((nav) => (
      <Nav key={nav.href} direction={direction} {...nav}>
        {t(nav.children)}
      </Nav>
    ));
}
