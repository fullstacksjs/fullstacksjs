import type { Feature } from '@/config/features';
import type { MessageKeys, NestedKeyOf } from 'next-intl';

import { getServerFeature } from '@/config/features/getServerFeatures';
import { isEmpty, isNull } from '@fullstacksjs/toolbox';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { get } from 'radash';

import { NavGroup } from './NavGroup';

type Keys = MessageKeys<
  IntlMessages['header']['navigation'],
  NestedKeyOf<IntlMessages['header']['navigation']>
>;

export interface NavGroup {
  feature?: Feature;
  text: string;
  subNavs: Nav[];
  href?: string;
  isNew?: boolean;
}

export interface Nav {
  feature?: Feature;
  href: string;
  text: string;
  isNew?: boolean;
}

const navs: NavGroup[] = [
  {
    feature: 'about',
    text: 'community.title',
    subNavs: [
      { feature: 'about', href: '/', text: 'community.about' },
      {
        feature: 'rules',
        href: '/rules',
        text: 'community.rules',
      },
      { feature: 'ask', href: '/ask', text: 'community.ask' },
    ],
  },
  {
    feature: 'events',
    text: 'events',
    subNavs: [
      { feature: 'events', href: '/events', text: 'events' },
      { feature: 'wus', href: '/wus', text: 'wus' },
      { feature: 'mob', href: '/mob', text: 'mob' },
    ],
  },
  {
    text: 'war',
    subNavs: [
      {
        feature: 'wakatime',
        href: '/wakatime',
        text: 'wakatime',
      },
      {
        feature: 'guild',
        isNew: true,
        href: '/guild',
        text: 'guild',
      },
      { feature: 'type', href: '/type', text: 'type', isNew: true },
    ],
  },
  {
    feature: 'advent',
    text: 'advent.title',
    subNavs: [
      { href: '/advent', text: 'advent.about' },
      { href: '/advent/board', text: 'advent.board' },
    ],
  },
  {
    feature: 'projects',
    text: 'projects',
    href: '/projects',
    subNavs: [],
    isNew: true,
  },
];

const isActive = (c: Nav | NavGroup) =>
  isNull(c.feature) || getServerFeature(c.feature);
const isEmptyGroup = (c: NavGroup) => !c.href && isEmpty(c.subNavs);

export const Navs = async () => {
  const messages = await getMessages();
  const t = await getTranslations('header.navigation');
  const activeNavsGroups = navs
    .map<NavGroup>((n) => ({
      ...n,
      subNavs: n.subNavs
        .filter(isActive)
        .map((c) => ({ ...c, text: t(c.text as Keys) })),
    }))
    .filter((c) => isActive(c) && !isEmptyGroup(c));

  return (
    <NextIntlClientProvider
      messages={{
        header: { navigation: { new: get(messages, 'header.navigation.new') } },
      }}
    >
      {activeNavsGroups.map((g) => (
        <NavGroup key={g.text} {...g} text={t(g.text as Keys)} />
      ))}
    </NextIntlClientProvider>
  );
};
