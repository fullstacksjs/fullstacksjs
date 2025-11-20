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
  revalidation: Config.object({
    username: Config.string().required(),
    password: Config.string().required(),
  }),
  github: Config.object({
    token: Config.string().required(),
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
  revalidation: {
    username: process.env.REVALIDATE_AUTH_USERNAME,
    password: process.env.REVALIDATE_AUTH_PASSWORD,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
  },
});
