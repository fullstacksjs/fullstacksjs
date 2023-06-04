import { features } from '../features';
import Nav from './Nav';

interface Nav {
  feature: keyof typeof features;
  href: string;
  children: string;
}

// TODO: Add internationalization
const navs: Nav[] = [
  { feature: 'about', href: '/', children: 'navigation.about' },
  { feature: 'rules', href: '/rules', children: 'navigation.rules' },
  { feature: 'ask', href: '/ask', children: 'navigation.ask' },
  { feature: 'events', href: '/events', children: 'navigation.events' },
];

export default function Navs() {
  return (
    <ul className="inline-flex gap-8 text-md font-bold leading-tight tablet:gap-16">
      {navs
        .filter((c) => features[c.feature])
        .map(({ children, href }) => (
          // TODO: Add internationalization
          <Nav key={href} href={href}>
            {children}
          </Nav>
        ))}
    </ul>
  );
}
