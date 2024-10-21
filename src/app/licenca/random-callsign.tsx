'use client';

import { useEffect, useState } from 'react';
import { generateRandomCallsign } from '@/util/callsign-util';
import { robotoMono } from '@/fonts/fonts';

export default function RandomCallsign() {
  const [callsign, setCallsign] = useState<string>('S50ZRS');

  useEffect(() => {
    const interval = setInterval(() => {
      setCallsign(generateRandomCallsign());
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div className="my-6 text-center">
      <div className={`text-4xl font-bold text-darker ${robotoMono.className}`}>
        {callsign}
      </div>
      <div className={`morse font-bold text-gray-500`}>{callsign}</div>
    </div>
  );
}
