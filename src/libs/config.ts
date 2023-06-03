import { isNullOrEmpty } from '@fullstacksjs/toolbox';
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
  analytics: z.object({
    containerId: z.string(),
    trackingId: z.string(),
  }),
  features: z.object({
    about: z.string().optional().transform<boolean>(hasFeature('about')),
    rules: z.string().optional().transform<boolean>(hasFeature('rules')),
    events: z.string().optional().transform<boolean>(hasFeature('events')),
  }),
});

export type Config = z.infer<typeof Config>;

export const config = Config.parse({
  auth0: {
    domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
    clientId: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
  },
  analytics: {
    containerId: import.meta.env.PUBLIC_GTM_CONTAINER,
    trackingId: import.meta.env.PUBLIC_GA_TRACKING_ID,
  },
  features: {
    about: import.meta.env.PUBLIC_FEATURES,
    rules: import.meta.env.PUBLIC_FEATURES,
    events: import.meta.env.PUBLIC_FEATURES,
  },
});
