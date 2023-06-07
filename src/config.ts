import { getEnv as _getEnv, isNullOrEmpty } from '@fullstacksjs/toolbox';
import { z } from 'zod';

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
  github: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
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
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  },
  github: {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  },
  analytics: {
    containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },
  features: {
    about: process.env.NEXT_PUBLIC_FEATURES,
    rules: process.env.NEXT_PUBLIC_FEATURES,
    events: process.env.NEXT_PUBLIC_FEATURES,
    ask: process.env.NEXT_PUBLIC_FEATURES,
    locales: process.env.NEXT_PUBLIC_FEATURES,
  },
});
