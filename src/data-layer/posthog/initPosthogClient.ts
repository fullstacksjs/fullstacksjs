import posthog from 'posthog-js';

import { clientConfig } from '@/config/clientConfig';

export function initPosthogClient() {
  const { key, debug } = clientConfig.get('posthog');
  if (!key) return;
  return posthog.init(key, { api_host: '/ingest', debug });
}
