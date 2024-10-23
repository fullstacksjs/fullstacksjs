import type { Feature } from '@/config/features';
import type { MessageKeys, NestedKeyOf } from 'next-intl';

import { getServerFeature } from '@/config/features/getServerFeatures';
import { isEmpty, isNull } from '@fullstacksjs/toolbox';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { pick } from 'radash';

import { NavGroup } from './NavGroup';

type Keys = MessageKeys<
  IntlMessages['header']['navigation'],
  NestedKeyOf<IntlMessages['header']['navigation']>
>;

interface NavGroup {
  feature?: Feature;
  text: Keys;
  children?: Nav[];
}

interface Nav {
  feature?: Feature;
  href: string;
  children?: Nav[];
  text: Keys;
  isNew?: boolean;
}

const navs: NavGroup[] = [
  {
    feature: 'about',
    text: 'community.title',
    children: [
      { feature: 'about', href: '/', text: 'community.about' },
      { feature: 'rules', href: '/rules', text: 'community.rules' },
      { feature: 'ask', href: '/ask', text: 'community.ask' },
    ],
  },
  {
    feature: 'events',
    text: 'events',
    children: [
      { feature: 'events', href: '/events', text: 'events' },
      { feature: 'wus', href: '/wus', text: 'wus', isNew: true },
    ],
  },
  {
    text: 'war',
    children: [
      { feature: 'wakatime', href: '/wakatime', text: 'wakatime' },
      { feature: 'guild', isNew: true, href: '/guild', text: 'guild' },
      { feature: 'type', href: '/type', text: 'type' },
    ],
  },
  {
    feature: 'advent',
    text: 'advent.title',
    children: [
      { href: '/advent', text: 'advent.about' },
      { href: '/advent/board', text: 'advent.board' },
    ],
  },
];

const isActive = (c: Nav | NavGroup) =>
  isNull(c.feature) || getServerFeature(c.feature);
const isEmptyGroup = (c: Nav | NavGroup) =>
  !isNull(c.children) && isEmpty(c.children);

export const Navs = () => {
  const t = useMessages();
  const activeNavs = navs
    .map((n) => ({
      ...n,
      children: n.children?.filter(isActive),
    }))
    .filter((c) => isActive(c) && !isEmptyGroup(c));

  return (
    <NextIntlClientProvider messages={pick(t, ['header'])}>
      {activeNavs.map((nav) => (
        <NavGroup key={nav.text} {...nav} />
      ))}
    </NextIntlClientProvider>
  );
};
