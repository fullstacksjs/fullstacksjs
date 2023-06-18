import { clientConfig } from '@/config/clientConfig';

import type { Feature } from './Features';

export const getServerFeature = (feature: Feature) =>
  clientConfig.features.includes(feature);
