import { clientConfig } from '@/config/clientConfig';

import type { Feature } from './Features';

export const getServerFeature = (feature: Feature) =>
  clientConfig.get('features').includes(feature);
