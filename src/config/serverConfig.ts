import 'server-only';
import { Config } from '@fullstacksjs/config';

const ServerConfig = new Config({
  metadataBase: Config.string().required(),
  cronSecret: Config.string(),
  wakatime: Config.object({
    endpoint: Config.string().required(),
  }),
  dato: Config.object({
    endpoint: Config.string().required(),
    token: Config.string().required(),
  }),
  analytics: Config.object({
    containerId: Config.string(),
    trackingId: Config.string(),
  }),
  advent: Config.object({
    session: Config.string().required(),
    url: Config.string().required(),
    year: Config.number().required(),
  }),
  revalidation: Config.object({
    username: Config.string().required(),
    password: Config.string().required(),
  }),
});

export const serverConfig = ServerConfig.parse({
  metadataBase: process.env.METADATA_BASE,
  cronSecret: process.env.CRON_SECRET,
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
    session: process.env.ADVENT_OF_CODE_SESSION,
    url: 'https://adventofcode.com/2023/leaderboard/private/view/3205245.json',
    year: 2023,
  },
  revalidation: {
    username: process.env.REVALIDATE_AUTH_USERNAME,
    password: process.env.REVALIDATE_AUTH_PASSWORD,
  },
});
