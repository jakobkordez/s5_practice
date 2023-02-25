"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Domov" },
  { href: "/priprave", label: "Priprave" },
  { href: "/izpit", label: "Izpit" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <div className="is-flex is-align-items-center">
            <figure className="image is-96x96">
              <Image
                src="/logo/zrs_logo_white.svg"
                alt="ZRS Logo"
                width={100}
                height={100}
              />
            </figure>
            <div className="ml-4">
              <h1 className="title is-size-3">Radioamaterski izpit</h1>
              <h6 className="subtitle">Pripravil: Jakob [S52KJ]</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <nav className="navbar">
            <div className="navbar-menu is-active">
              <div className="navbar-start">
                {nav.map(({ href, label }) => {
                  return (
                    <Link
                      key={href}
                      className={`navbar-item ${
                        href == pathname ? "is-active" : ""
                      }`}
                      href={href}
                    >
                      {label}
                    </Link>
                  );
                })}
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
