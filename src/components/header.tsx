'use client';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Domov' },
  { href: '/licenca', label: 'Licenca' },
  {
    label: 'Vaja',
    children: [
      { href: '/zbirka', label: 'Zbirka' },
      { href: '/priprave', label: 'Priprave' },
      { href: '/izpit-sim', label: 'Simulator izpita' },
    ],
  },
  // { href: "/izpit-gen", label: "Generator izpitnih pol" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="select-none text-white">
      <div className="bg-darker py-6 font-bold">
        <div className="container">
          <div className="flex flex-row items-center justify-start gap-8 px-4">
            <Image src="/logo/logo_192.png" alt="Logo" height={32} width={32} />
            <div>
              <Link href="/">
                <h1 className="text-3xl sm:text-4xl">Radioamaterski izpit</h1>
              </Link>
              <div data-nosnippet className="morse mt-1 text-sm text-gray-400">
                CQ|DE|ZRS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark">
        <nav className="container flex flex-row flex-wrap justify-start">
          {nav.map(({ href, label, children }) =>
            href ? (
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
            ) : (
              <Dropdown key={label} label={label}>
                {children?.map(({ href, label }) => (
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
              </Dropdown>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseLeave={() => setOpen(false)} className="relative">
      <button
        className={`flex flex-row items-center gap-2 px-4 py-2 transition-colors hover:bg-white/10 active:bg-white/30 ${
          open ? 'bg-white/10' : ''
        }`}
        onMouseOver={() => setOpen(true)}
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
        <FontAwesomeIcon icon={faAngleDown} className="pt-1" />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute left-0 top-full z-10 flex w-40 flex-col bg-darker shadow-lg"
        >
          {children}
        </div>
      )}
    </div>
  );
}
