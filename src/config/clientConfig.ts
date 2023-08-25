import { z } from 'zod';

const ClientConfig = z.object({
  features: z
    .string()
    .optional()
    .transform((i) => i?.split(',') ?? []),

  supabase: z.object({
    url: z.string(),
    key: z.string(),
  }),
});

export type ClientConfig = z.infer<typeof ClientConfig>;

export const clientConfig = ClientConfig.parse({
  features: process.env.NEXT_PUBLIC_FEATURES,

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
