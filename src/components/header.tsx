'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const nav = [
  { href: '/', label: 'Domov' },
  { href: '/licenca', label: 'Licenca' },
  {
    label: 'Vaja',
    children: [
      { href: '/zbirka', label: 'Zbirka izpitnih vprašanj' },
      { href: '/priprave', label: 'Vaja vprašanj' },
      { href: '/izpit-sim', label: 'Preizkusni izpit' },
    ],
  },
  // { href: "/izpit-gen", label: "Generator izpitnih pol" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative flex select-none flex-col bg-darker font-medium text-white lg:flex-row lg:items-center [&>*]:z-30 [&>*]:bg-darker">
      <div className="flex flex-1 flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-6 px-8 py-6">
          <Image src="/logo/logo_192.png" alt="Logo" height={24} width={24} />
          <div>
            <Link href="/" className="text-2xl sm:text-3xl">
              Radioamaterski izpit
            </Link>
          </div>
        </div>

        <button
          className="flex flex-col justify-between gap-2 px-6 lg:hidden [&>*]:h-0.5 [&>*]:w-6 [&>*]:bg-white [&>*]:transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Menu"
        >
          <div className={isMenuOpen ? 'translate-y-2.5 rotate-45' : ''} />
          <div className={isMenuOpen ? 'opacity-0' : ''} />
          <div className={isMenuOpen ? '-translate-y-2.5 -rotate-45' : ''} />
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full flex flex-col items-stretch border-t border-primary lg:relative lg:flex-row lg:gap-4 lg:border-none lg:pr-10 ${isMenuOpen ? '' : 'hidden lg:flex'}`}
      >
        {nav.map(({ href, label, children }) =>
          href ? (
            <Link
              key={href}
              href={href}
              className={`px-6 py-4 transition-colors lg:rounded-lg lg:px-4 lg:py-2 ${
                href === pathname ? 'bg-dark' : 'hover:bg-dark active:bg-black'
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
                  className={`px-6 py-4 transition-colors lg:rounded-lg lg:px-4 lg:py-2 ${
                    href === pathname
                      ? 'bg-dark'
                      : 'hover:bg-dark active:bg-black'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </Dropdown>
          ),
        )}
      </div>

      <div
        className={`fixed inset-0 !z-10 !bg-black/50 ${isMenuOpen ? 'block lg:hidden' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(0);
  }, [pathname]);

  return (
    <div onMouseLeave={() => setOpen(0)} className="relative">
      <button
        className={`hidden cursor-default px-6 py-4 transition-colors lg:block lg:cursor-auto lg:rounded-lg lg:px-4 lg:py-2 lg:hover:bg-dark lg:active:bg-black ${
          open ? 'lg:bg-dark' : ''
        }`}
        onMouseOver={() => setOpen(open | 1)}
        onClick={() => setOpen(open ^ 2)}
      >
        {label}
      </button>

      <div className={`right-0 lg:absolute lg:pt-2 ${open ? '' : 'lg:hidden'}`}>
        <div className="top-full z-10 flex flex-col border-dark shadow-lg lg:w-max lg:gap-2 lg:rounded-xl lg:border lg:bg-darker lg:p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
