import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  const { default: messages } = await import(`../messages/${locale}.json`);

  return { messages };
});
