"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Brand from "./Brand";

import { URLS } from "@/lib/urls";

export default function SiteHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const toggleMenu = () => {
    setOpenFor((prev) => (prev === pathname ? null : pathname));
  };

  // Оскільки при доступі через library.nonamehub.fyi/lib шлях може відрізнятися,
  // перевіряємо чи поточний шлях закінчується на потрібний.
  const isHome = pathname === "/" || pathname === "/lib";
  const isResources = pathname.includes("/resources");
  const isAbout = pathname.includes("/about");

  return (
    <header className="site-header">
      <Brand />

      <nav className="main-nav" aria-label="Main navigation">
        <Link className={isHome ? "nav-active" : ""} href={URLS.explore} prefetch={false}>
          Explore
        </Link>
        <Link className={isResources ? "nav-active" : ""} href={URLS.resources} prefetch={false}>
          Resources
        </Link>
        <Link className={isAbout ? "nav-active" : ""} href={URLS.about} prefetch={false}>
          About
        </Link>
      </nav>

      <div className="header-right">
        <Link className="submit-link" href={URLS.resources} prefetch={false}>
          Browse resources <span>↗</span>
        </Link>
        <button
          type="button"
          className={`burger ${open ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href={URLS.explore} prefetch={false}>Explore</Link>
          <Link href={URLS.resources} prefetch={false}>Resources</Link>
          <Link href={URLS.about} prefetch={false}>About</Link>
          <Link className="mobile-cta" href={URLS.resources} prefetch={false}>
            Browse resources ↗
          </Link>
        </nav>
      )}
    </header>
  );
}