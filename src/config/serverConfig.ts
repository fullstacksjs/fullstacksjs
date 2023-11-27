import 'server-only';

import { z } from 'zod';

const ServerConfig = z.object({
  metadataBase: z.string(),
  wakatime: z.object({
    endpoint: z.string(),
  }),
  dato: z.object({
    endpoint: z.string(),
    token: z.string(),
  }),
  analytics: z.object({
    containerId: z.string().optional(),
    trackingId: z.string().optional(),
  }),
  advent: z.object({
    session: z.string(),
    url: z.string().url(),
    year: z.number(),
    token: z.string(),
  }),
});

export type ServerConfig = z.infer<typeof ServerConfig>;

export const serverConfig = ServerConfig.parse({
  metadataBase: process.env.METADATA_BASE,
  wakatime: {
    endpoint: process.env.WAKATIME_ENDPOINT,
  },
  dato: {
    endpoint: process.env.DATO_ENDPOINT,
    token: process.env.DATO_TOKEN,
  },
  analytics: {
    containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },
  advent: {
    token: process.env.ADVENT_OF_CODE_SYNC_TOKEN,
    session: process.env.ADVENT_OF_CODE_SESSION,
    url: 'https://adventofcode.com/2023/leaderboard/private/view/3205245.json',
    year: 2023,
  },
});
