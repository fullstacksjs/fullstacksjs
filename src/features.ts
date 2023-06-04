import { config } from './libs/config';

export const features = {
  about: config.features.about,
  rules: config.features.rules,
  ask: config.features.ask,
  events: config.features.events,
  locales: config.features.locales,
} as const;
