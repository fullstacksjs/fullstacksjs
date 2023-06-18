import { z } from 'zod';

const ClientConfig = z.object({
  features: z
    .string()
    .optional()
    .transform((i) => i?.split(',') ?? []),
});

export type ClientConfig = z.infer<typeof ClientConfig>;

export const clientConfig = ClientConfig.parse({
  features: process.env.NEXT_PUBLIC_FEATURES,
});
