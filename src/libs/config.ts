import { z } from 'zod';

const Config = z.object({
  auth0: z.object({
    domain: z.string(),
    clientId: z.string(),
  }),
  analytics: z.object({
    containerId: z.string(),
    trackingId: z.string(),
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
} as Config);
