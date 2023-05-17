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
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <div className="is-flex is-align-items-center">
            <figure className="image is-96x96">
              <Image
                src="/logo/logo_192.png"
                alt="Logo"
                height={96}
                width={96}
                style={{ height: '100%', width: 'auto', margin: 'auto' }}
              />
            </figure>
            <div className="ml-4">
              <h1 className="title is-size-3">Radioamaterski izpit</h1>
              <h6 className="subtitle">Pripravil: Jakob [S52KJ]</h6>
            </div>
            <a
              role="button"
              className={`navbar-burger ${navbar ? 'is-active' : ''}`}
              aria-label="menu"
              onClick={() => setNavbar(!navbar)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <nav className="navbar">
            <div className={`navbar-menu ${navbar ? 'is-active' : ''}`}>
              <div className="navbar-start">
                {nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    className={`navbar-item ${
                      href == pathname ? 'is-active' : ''
                    }`}
                    href={href}
                    onClick={() => setNavbar(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="navbar-end">
                <Link
                  className="navbar-item is-flex"
                  href="http://www.hamradio.si/"
                >
                  <span className="icon mr-2">
                    <Image
                      src="/logo/zrs_logo_white.svg"
                      alt="ZRS Logo"
                      height={32}
                      width={32}
                    />
                  </span>
                  <span>ZRS</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
