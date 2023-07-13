'use client';

import { morse } from '@/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Domov' },
  { href: '/licenca', label: 'Licenca' },
  { href: '/zbirka', label: 'Zbirka' },
  { href: '/priprave', label: 'Priprave' },
  { href: '/izpit-sim', label: 'Simulator izpita' },
  // { href: "/izpit-gen", label: "Generator izpitnih pol" },
];

export default function Header() {
  const [navbar, setNavbar] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <header className="select-none text-white">
      <div className="bg-darker py-6 font-bold">
        <div className="container">
          <div className="flex flex-row items-center justify-start gap-8 px-4">
            <Image src="/logo/logo_192.png" alt="Logo" height={32} width={32} />
            <div>
              <Link href="/">
                <h1 className="text-4xl">Radioamaterski izpit</h1>
              </Link>
              <div
                data-nosnippet
                className={`mt-1 text-sm text-gray-400 ${morse.className}`}
              >
                C Q | D E | Z R S
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark">
        <nav className="container flex flex-row justify-start">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 transition-colors ${
                href === pathname
                  ? 'cursor-default bg-white/10'
                  : 'hover:bg-white/10 active:bg-white/30'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
