'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Domov' },
  { href: '/priprave', label: 'Priprave' },
  { href: '/izpit-sim', label: 'Simulator izpita' },
  // { href: "/izpit-gen", label: "Generator izpitnih pol" },
];

export default function Header() {
  const [navbar, setNavbar] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <section className="bg-darker py-6 font-bold text-white">
      <div className="container flex flex-row items-center justify-start gap-8">
        <Image src="/logo/logo_192.png" alt="Logo" height={32} width={32} />
        <Link href="/">
          <h1 className="text-4xl">Radioamaterski izpit</h1>
        </Link>
      </div>
    </section>
  );
}
