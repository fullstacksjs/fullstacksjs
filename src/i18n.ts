import 'server-only';

import { getRequestConfig } from 'next-intl/server';

import type message from '../messages/en.json';

type Messages = typeof message;

const locales: Record<Locales, any> = {
  en: import('../messages/en.json').then((x) => x.default),
  fa: import('../messages/fa.json').then((x) => x.default),
};

export const getMessages = async (locale: Locales): Promise<Messages> => {
  return locales[locale] as Promise<Messages>;
};

export type Locales = 'en' | 'fa';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  return { messages: await getMessages(locale as Locales) };
});
