'use client';

import Script from 'next/script';

const ANALYTICS_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL;
const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export function umamiTrack(
  eventName: string,
  data?: { [key: string]: string | number },
) {
  if (typeof window === 'undefined') return;

  const umami = (
    window as unknown as {
      umami:
        | {
            track: (
              eventName: string,
              data?: { [key: string]: string | number },
            ) => void;
          }
        | undefined;
    }
  ).umami;

  umami?.track(eventName, data);
}

export function UmamiAnalytics() {
  if (!ANALYTICS_URL || !ANALYTICS_ID) return null;

  return <Script defer src={ANALYTICS_URL} data-website-id={ANALYTICS_ID} />;
}
