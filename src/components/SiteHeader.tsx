"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Brand from "./Brand";

export default function SiteHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const toggleMenu = () => {
    setOpenFor((prev) => (prev === pathname ? null : pathname));
  };

  const isHome = pathname === "/";
  const isResources = pathname.startsWith("/resources");
  const isAbout = pathname.startsWith("/about");

  return (
    <header className="site-header">
      <Brand />

      <nav className="main-nav" aria-label="Main navigation">
        <Link className={isHome ? "nav-active" : ""} href="/#catalog">
          Explore
        </Link>
        <Link className={isResources ? "nav-active" : ""} href="/resources">
          Resources
        </Link>
        <Link className={isAbout ? "nav-active" : ""} href="/about">
          About
        </Link>
      </nav>

      <div className="header-right">
        <Link className="submit-link" href="/resources">
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
          <Link href="/#catalog">Explore</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
          <Link className="mobile-cta" href="/resources">
            Browse resources ↗
          </Link>
        </nav>
      )}
    </header>
  );
}