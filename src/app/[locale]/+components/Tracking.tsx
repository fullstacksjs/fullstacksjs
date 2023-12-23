'use client';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

interface Props {
  trackingId: string;
  containerId: string;
}

export function Tracking({ trackingId, containerId }: Props) {
  return (
    <>
      <GoogleTagManager gtmId={containerId} />
      <GoogleAnalytics gaId={trackingId} />
    </>
  );
}
