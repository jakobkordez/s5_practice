'use client';

import { morse } from '@/fonts/fonts';
import { useEffect, useState } from 'react';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function RandomCallsign() {
  const [callsign, setCallsign] = useState<string[]>('S50ZRS'.split(''));

  useEffect(() => {
    const interval = setInterval(() => {
      setCallsign(generateRandomCallsign());
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div className="my-6 text-center">
      <div className={`text-4xl font-bold text-darker ${robotoMono.className}`}>
        {callsign.join('')}
      </div>
      <div className={`font-bold text-gray-500 ${morse.className}`}>
        {callsign.join(' ')}
      </div>
    </div>
  );
}

function generateRandomCallsign(): string[] {
  const length = Math.ceil(Math.random() * 3);
  const callsign = [
    'S',
    '5',
    String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  ];

  for (let i = 0; i < length; i++) {
    callsign.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
  }

  return callsign;
}
