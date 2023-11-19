import 'server-only';

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  return {
    messages: await import(`../messages/${locale}.json`).then((x) => x.default),
  };
});
