"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const [lastHash, setLastHash] = useState<string | null>(null);
  const handledRef = useRef(false);

  async function processHash(hash: string) {
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

    const timeoutId = setTimeout(() => {
      processHash(hash);
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryTabs: { key: CategoryKey; label: string }[] = [
    { key: "all", label: "All resources" },
    { key: "Scripts", label: "Scripts" },
    { key: "Models", label: "Models" },
    { key: "UI", label: "UI" },
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

      <section className="hero hero--solo">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content hero-content--centered">
          <div className="eyebrow">
            <span className="status-dot" />
            THE COMMUNITY RESOURCE HUB
          </div>
          <h1 className="hero-title">
            Build something
            <br />
            <span>extraordinary.</span>
          </h1>
          <p className="hero-copy">
            Discover scripts, models, and UI kits made for your next Roblox
            project. Find your next starting point.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalog">
              Explore resources <span>→</span>
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
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <div>
            <div className="section-kicker">THE LIBRARY</div>
            <h2>
              Explore resources
              <span>.</span>
            </h2>
            <p>Useful building blocks for your next creation.</p>
          </div>
          <div className="resource-count">
            <span className="count-dot" />
            {filteredResources.length} resources
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
              placeholder="Search resources..."
              aria-label="Search resources"
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
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <Link
                    className="resource-button"
                    href={`/resource/${resource.slug}`}
                  >
                    View resource <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✦</span>
            <h3>No resources found</h3>
            <p>Try another search or choose a different category.</p>
          </div>
        )}
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-heading">
          <div className="section-kicker">SIMPLE BY DESIGN</div>
          <h2>
            From discovery to download
            <span>.</span>
          </h2>
          <p>A straightforward path to the resources you need.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon">⌕</div>
            <h3>Find your resource</h3>
            <p>Explore the library and choose a script, model, or UI kit.</p>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon">↗</div>
            <h3>Complete the steps</h3>
            <p>Follow the access requirements shown on the resource page.</p>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon">⌘</div>
            <h3>Get your access</h3>
            <p>Unlock an available download or receive your access key.</p>
          </div>
        </div>
      </section>
    </main>
  );
}