import { getEnv as _getEnv, isNullOrEmpty } from '@fullstacksjs/toolbox';
import { z } from 'zod';

type EnvKey =
  | 'NEXT_PUBLIC_AUTH0_CLIENT_ID'
  | 'NEXT_PUBLIC_AUTH0_DOMAIN'
  | 'NEXT_PUBLIC_FEATURES'
  | 'NEXT_PUBLIC_GA_TRACKING_ID'
  | 'NEXT_PUBLIC_GTM_CONTAINER';

const getEnv = _getEnv<EnvKey>;

const hasFeature =
  (feature: string) =>
  (v: string | undefined): boolean => {
    if (isNullOrEmpty(v)) return true;
    return v
      .split(',')
      .map((s) => s.trim())
      .includes(feature);
  };

const Config = z.object({
  auth0: z.object({
    domain: z.string(),
    clientId: z.string(),
  }),
  analytics: z.object({
    containerId: z.string().optional(),
    trackingId: z.string().optional(),
  }),
  features: z.object({
    about: z.string().optional().transform<boolean>(hasFeature('about')),
    rules: z.string().optional().transform<boolean>(hasFeature('rules')),
    events: z.string().optional().transform<boolean>(hasFeature('events')),
    ask: z.string().optional().transform<boolean>(hasFeature('ask')),
    locales: z.string().optional().transform<boolean>(hasFeature('locales')),
  }),
});

export type Config = z.infer<typeof Config>;

export const config = Config.parse({
  auth0: {
    domain: getEnv('NEXT_PUBLIC_AUTH0_DOMAIN'),
    clientId: getEnv('NEXT_PUBLIC_AUTH0_CLIENT_ID'),
  },
  analytics: {
    containerId: getEnv('NEXT_PUBLIC_GTM_CONTAINER'),
    trackingId: getEnv('NEXT_PUBLIC_GA_TRACKING_ID'),
  },
  features: {
    about: getEnv('NEXT_PUBLIC_FEATURES'),
    rules: getEnv('NEXT_PUBLIC_FEATURES'),
    events: getEnv('NEXT_PUBLIC_FEATURES'),
    ask: getEnv('NEXT_PUBLIC_FEATURES'),
    locales: getEnv('NEXT_PUBLIC_FEATURES'),
  },
});
