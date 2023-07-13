'use client';

import Script from 'next/script';

interface Props {
  trackingId: string;
  containerId: string;
}

export function GoogleAnalytics({ trackingId, containerId }: Props) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });

                gtag('config', '${trackingId}', {
                    page_path: window.location.pathname,
                });
              `,
        }}
      />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer ?? [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
              });
              const fs = document.getElementsByTagName('script')[0];
              const s = document.createElement('script');
              s.async = true;
              s.src = "https://www.googletagmanager.com/gtm.js?id=${containerId}";
              fs?.parentNode?.insertBefore(s, fs);
          `,
        }}
      />
    </>
  );
}
