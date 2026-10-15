"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Brand from "./Brand";

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Brand size={28} />
          </div>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <div className="footer-col">
            <h4>{t("footer.product")}</h4>
            <Link href="/resources">{t("footer.allResources")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("footer.company")}</h4>
            <Link href="/about">{t("footer.about")}</Link>
          </div>
          <div className="footer-col">
            <h4>{t("footer.legal")}</h4>
            <Link href="/terms">{t("footer.terms")}</Link>
            <Link href="/privacy">{t("footer.privacy")}</Link>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>{t("footer.copy", { year: new Date().getFullYear() })}</span>
      </div>
    </footer>
  );
}