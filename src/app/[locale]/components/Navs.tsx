import { useTranslations } from 'next-intl';

import type { Feature } from '@/features';
import { getServerFeature } from '@/features/getServerFeatures';
import { useDirection } from '@/hooks/useDirection';

import Nav from './Nav';

interface Nav {
  feature: Feature;
  href: string;
  children: string;
}

const navs: Nav[] = [
  { feature: 'about', href: '/', children: 'about' },
  { feature: 'rules', href: '/rules', children: 'rules' },
  { feature: 'ask', href: '/ask', children: 'ask' },
  { feature: 'events', href: '/events', children: 'events' },
];

export default function Navs() {
  const t = useTranslations('header.navigation');
  const direction = useDirection();

  return (
    <ul className="inline-flex gap-8 text-md font-bold leading-tight tablet:gap-16">
      {navs
        .filter((c) => getServerFeature(c.feature))
        .map(({ children, href }) => (
          <Nav key={href} href={href} direction={direction}>
            {t(children)}
          </Nav>
        ))}
    </ul>
  );
}
