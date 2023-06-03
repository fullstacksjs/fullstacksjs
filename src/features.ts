import { config } from './libs/config';

export const features = {
  about: config.features.about,
  rules: config.features.rules,
  events: config.features.events,
} as const;
