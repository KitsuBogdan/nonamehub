"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { resources } from "@/data/resources";
import ResourceArtwork from "@/components/ResourceArtwork";

type CategoryKey = "all" | "Scripts" | "Models" | "UI";

export default function HomeClient() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  // Обробка редіректу з Linkvertise: /?hash=XXX
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const hash = params.get("hash");
    if (!hash) return;

    let pending: { slug: string; token: string; ts: number } | null = null;
    try {
      const raw = localStorage.getItem("pendingKey");
      if (raw) pending = JSON.parse(raw);
    } catch {
      /* ignore */
    }

    // TTL 5 хв
    if (pending && Date.now() - pending.ts > 5 * 60 * 1000) {
      pending = null;
    }

    if (!pending?.slug || !pending?.token) {
      return;
    }

    try {
      localStorage.removeItem("pendingKey");
    } catch {
      /* ignore */
    }

    const target =
      `/api/key/${pending.slug}` +
      `?t=${encodeURIComponent(pending.token)}` +
      `&hash=${encodeURIComponent(hash)}`;
    window.location.href = target;
  }, []);

  const categoryTabs: { key: CategoryKey; label: string }[] = [
    { key: "all", label: t("catalog.all") },
    { key: "Scripts", label: t("catalog.scripts") },
    { key: "Models", label: t("catalog.models") },
    { key: "UI", label: t("catalog.ui") },
  ];

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;
      const matchesQuery =
        !q ||
        `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot" /> {t("hero.eyebrow")}
          </div>
          <h1>
            {t("hero.title1")}
            <br />
            <span>{t("hero.title2")}</span>
          </h1>
          <p className="hero-copy">{t("hero.copy")}</p>
          <a className="primary-button" href="#catalog">
            {t("hero.cta")} <span>→</span>
          </a>
          <div className="hero-note">
            <span className="note-icon">✳</span>
            {t("hero.note")}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-core">
            <div className="core-inner">
              <span className="core-symbol">N</span>
              <span className="core-label">NO NAME / NO LIMITS</span>
            </div>
          </div>
          <div className="float-card float-card-top">
            <span className="float-icon purple">{"</>"}</span>
            <span>
              <b>Scripts</b>
              <small>Make it work</small>
            </span>
          </div>
          <div className="float-card float-card-bottom">
            <span className="float-icon blue">◇</span>
            <span>
              <b>Models & UI</b>
              <small>Make it yours</small>
            </span>
          </div>
          <span className="visual-star star-one">✳</span>
          <span className="visual-star star-two">✦</span>
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <div>
            <div className="section-kicker">{t("catalog.kicker")}</div>
            <h2>
              {t("catalog.title")}
              <span>.</span>
            </h2>
            <p>{t("catalog.subtitle")}</p>
          </div>
          <div className="resource-count">
            <span className="count-dot" />
            {filteredResources.length} {t("catalog.count")}
          </div>
        </div>

        <div className="catalog-controls">
          <div className="category-tabs" role="group" aria-label="Filter by category">
            {categoryTabs.map(({ key, label }) => (
              <button
                key={key}
                className={`category-tab ${
                  activeCategory === key ? "selected" : ""
                }`}
                onClick={() => setActiveCategory(key)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("catalog.search")}
              aria-label={t("catalog.search")}
            />
            <kbd>/</kbd>
          </label>
        </div>

        {filteredResources.length > 0 ? (
          <div className="resource-grid">
            {filteredResources.map((resource) => (
              <article className="resource-card" key={resource.slug}>
                <ResourceArtwork resource={resource} />
                <div className="resource-card-body">
                  <div className="resource-meta">
                    <span className={`category-label label-${resource.color}`}>
                      {resource.category}
                    </span>
                    <span className="download-count">
                      <span>↓</span> {resource.downloads}
                    </span>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <Link
                    className="resource-button"
                    href={`/resource/${resource.slug}`}
                  >
                    {t("catalog.view")} <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✦</span>
            <h3>{t("catalog.empty.title")}</h3>
            <p>{t("catalog.empty.text")}</p>
          </div>
        )}
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-heading">
          <div className="section-kicker">{t("how.kicker")}</div>
          <h2>
            {t("how.title")}
            <span>.</span>
          </h2>
          <p>{t("how.subtitle")}</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">⌕</div>
            <h3>{t("how.s1.title")}</h3>
            <p>{t("how.s1.text")}</p>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon">↗</div>
            <h3>{t("how.s2.title")}</h3>
            <p>{t("how.s2.text")}</p>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon">⌘</div>
            <h3>{t("how.s3.title")}</h3>
            <p>{t("how.s3.text")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}