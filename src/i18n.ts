import 'server-only';
import { getRequestConfig } from 'next-intl/server';

import message from '../messages/en.json';
type Messages = typeof message;

export const getMessages = async (locale: string): Promise<Messages> => {
  const { default: messages } = await import(`../messages/${locale}.json`);
  return messages;
};

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  return { messages: await getMessages(locale) };
});
