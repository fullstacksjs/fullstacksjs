import { features } from '../../features';
import { useTranslations } from 'next-intl';
import Nav from './Nav';

interface Nav {
  feature: keyof typeof features;
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
  const t = useTranslations('navigation');

  return (
    <ul className="inline-flex gap-8 text-md font-bold leading-tight tablet:gap-16">
      {navs
        .filter((c) => features[c.feature])
        .map(({ children, href }) => (
          // TODO: Add internationalization
          <Nav key={href} href={href}>
            {t(children)}
          </Nav>
        ))}
    </ul>
  );
}
