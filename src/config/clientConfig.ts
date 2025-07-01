import { Config } from '@fullstacksjs/config';

const ClientConfig = new Config({
  features: Config.array(Config.string()),
  supabase: Config.object({
    url: Config.string().required(),
    key: Config.string().required(),
  }),
  posthog: Config.object({
    key: Config.string(),
    debug: Config.boolean(),
  }),
});

export const clientConfig = ClientConfig.parse({
  features: process.env.NEXT_PUBLIC_FEATURES?.split(',') ?? [],
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  posthog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    debug: process.env.NODE_ENV === 'development',
  },
});
