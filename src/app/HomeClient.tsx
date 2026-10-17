"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import type { Resource } from "@/data/resources";
import ResourceArtwork from "@/components/ResourceArtwork";
import HashOverlay, { type OverlayState } from "@/components/HashOverlay";
import { SITE } from "@/data/site";

type CategoryKey = "all" | "Scripts" | "Models" | "UI" | "Key";

type PendingKey = { slug: string; token: string; step: number; ts: number };
const PENDING_TTL_MS = 15 * 60 * 1000;

function readPending(): PendingKey | null {
  try {
    const raw = localStorage.getItem("pendingKey");
    if (!raw) return null;
    const p = JSON.parse(raw) as PendingKey;
    if (!p?.slug || !p?.token) return null;
    if (Date.now() - p.ts > PENDING_TTL_MS) return null;
    return p;
  } catch {
    return null;
  }
}

function writePending(p: PendingKey) {
  try {
    localStorage.setItem("pendingKey", JSON.stringify(p));
  } catch {}
}

function clearPending() {
  try {
    localStorage.removeItem("pendingKey");
  } catch {}
}

function clearHashFromUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("hash");
  window.history.replaceState({}, "", url.toString());
}

export default function HomeClient({ resources }: { resources: Resource[] }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const [lastHash, setLastHash] = useState<string | null>(null);
  const handledRef = useRef(false);

  async function processHash(hash: string) {
    // Yield before any setState so this function is never considered
    // as making a synchronous setState from an effect.
    await Promise.resolve();

    const pending = readPending();
    if (!pending) {
      clearHashFromUrl();
      handledRef.current = false;
      setOverlay(null);
      return;
    }

    setOverlay({ kind: "checking" });
    setLastHash(hash);

    try {
      const res = await fetch(`/api/key/${pending.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: pending.token, hash }),
      });
      const data = await res.json();

      if (data.key) {
        clearPending();
        clearHashFromUrl();
        setOverlay(null);
        handledRef.current = false;
        router.push(
          `/resource/${pending.slug}?key=${encodeURIComponent(data.key)}`,
        );
        return;
      }

      if (data.nextUrl && data.progress) {
        writePending({
          slug: pending.slug,
          token: data.nextToken,
          step: data.nextStep,
          ts: Date.now(),
        });
        setOverlay({
          kind: "next",
          completed: data.progress.next - 1,
          next: data.progress.next,
          total: data.progress.total,
          nextUrl: data.nextUrl,
        });
        return;
      }

      setOverlay({
        kind: "error",
        message: data.error ?? "Unknown error",
      });
    } catch {
      setOverlay({ kind: "error", message: "Network error" });
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (handledRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const hash = params.get("hash");
    if (!hash) return;

    handledRef.current = true;
    
    // Defer the call to avoid triggering react-hooks/set-state-in-effect
    const timeoutId = setTimeout(() => {
      processHash(hash);
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryTabs: { key: CategoryKey; label: string }[] = [
    { key: "all", label: t("catalog.all") },
    { key: "Scripts", label: t("catalog.scripts") },
    { key: "Models", label: t("catalog.models") },
    { key: "UI", label: t("catalog.ui") },
    { key: "Key", label: "Keys" },
  ];

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (r.disabled) return false;
      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;
      const matchesQuery =
        !q ||
        `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, resources]);

  return (
    <main>
      {overlay && (
        <HashOverlay
          state={overlay}
          onContinue={(url) => {
            window.location.assign(url);
          }}
          onRetry={() => {
            if (lastHash) processHash(lastHash);
          }}
          onClose={() => {
            setOverlay(null);
            clearHashFromUrl();
            clearPending();
            handledRef.current = false;
          }}
        />
      )}

      {/* HERO */}
      <section className="hero hero--solo">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content hero-content--centered">
          <div className="eyebrow">
            <span className="status-dot" />
            {t("hero.eyebrow")}
          </div>
          <h1 className="hero-title">
            {t("hero.title1")}
            <br />
            <span>{t("hero.title2")}</span>
          </h1>
          <p className="hero-copy">{t("hero.copy")}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalog">
              {t("hero.cta")} <span>→</span>
            </a>
            <a
              className="ghost-button"
              href={SITE.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Join Discord
            </a>
            <a
              className="ghost-button"
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ YouTube
            </a>
          </div>
          <div className="hero-note">
            <span className="note-icon">✳</span>
            {t("hero.note")}
          </div>
        </div>
      </section>

      {/* CATALOG */}
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
          <div
            className="category-tabs"
            role="group"
            aria-label="Filter by category"
          >
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
                    <span
                      className={`category-label label-${resource.color}`}
                    >
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

      {/* HOW */}
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