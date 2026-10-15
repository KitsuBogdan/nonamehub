"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import Brand from "./Brand";

export default function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isResources = pathname.startsWith("/resources");
  const isAbout = pathname.startsWith("/about");

  return (
    <header className="site-header">
      <Brand />

      <nav className="main-nav" aria-label="Main navigation">
        <Link className={isHome ? "nav-active" : ""} href="/#catalog">
          {t("nav.explore")}
        </Link>
        <Link className={isResources ? "nav-active" : ""} href="/resources">
          {t("nav.resources")}
        </Link>
        <Link className={isAbout ? "nav-active" : ""} href="/about">
          {t("nav.about")}
        </Link>
      </nav>

      <div className="header-right">
        <LanguageSwitcher />
        <Link className="submit-link" href="/resources">
          {t("nav.browse")} <span>↗</span>
        </Link>
        <button
          type="button"
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
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
          <Link href="/#catalog">{t("nav.explore")}</Link>
          <Link href="/resources">{t("nav.resources")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
          <Link className="mobile-cta" href="/resources">
            {t("nav.browse")} ↗
          </Link>
        </nav>
      )}
    </header>
  );
}