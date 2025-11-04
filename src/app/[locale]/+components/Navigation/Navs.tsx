import type { MessageKeys, Messages, NestedKeyOf } from 'next-intl';

import { isNull, isNullOrEmptyArray } from '@fullstacksjs/toolbox';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { get } from 'radash';

import type { Feature } from '@/config/features';

import { getServerFeature } from '@/config/features/getServerFeatures';

import { NavGroup } from './NavGroup';

type Keys = MessageKeys<
  Messages['header']['navigation'],
  NestedKeyOf<Messages['header']['navigation']>
>;

export interface NavGroup {
  feature?: Feature;
  text: string;
  subNavs?: Nav[];
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
    text: 'community.title',
    subNavs: [
      { href: '/', text: 'community.about' },
      { href: '/rules', text: 'community.rules' },
      { href: '/ask', text: 'community.ask' },
    ],
  },
  {
    text: 'events',
    subNavs: [
      { href: '/events', text: 'events' },
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
      { feature: 'type', href: '/type', text: 'type' },
      { feature: 'hsl', href: '/hsl', text: 'hsl', isNew: true },
    ],
  },
  { text: 'projects', href: '/projects' },
  { text: 'blog', href: '/blogs', isNew: true },
];

const isActive = (c: Nav | NavGroup) =>
  isNull(c.feature) || getServerFeature(c.feature);
const isEmptyGroup = (c: NavGroup) => !c.href && isNullOrEmptyArray(c.subNavs);

export const Navs = async () => {
  const messages = await getMessages();
  const locale = await getLocale();

  const t = await getTranslations({ locale, namespace: 'header.navigation' });
  const activeNavsGroups = navs
    .map<NavGroup>((n) => ({
      ...n,
      subNavs: n.subNavs
        ?.filter(isActive)
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
