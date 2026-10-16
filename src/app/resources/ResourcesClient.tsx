// src/app/resources/ResourcesClient.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { resources } from "@/data/resources";
import ResourceArtwork from "@/components/ResourceArtwork";

export default function ResourcesClient() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="catalog-section">
        <div style={{ paddingTop: "2rem" }}>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            ← {t("resources.back")}
          </Link>
        </div>

        <div className="section-heading" style={{ marginTop: "2rem" }}>
          <div>
            <div className="section-kicker">{t("resources.kicker")}</div>
            <h2>
              {t("resources.title")}
              <span>.</span>
            </h2>
            <p>{t("resources.subtitle")}</p>
          </div>
          <div className="resource-count">
            <span className="count-dot" />
            {resources.length} {t("catalog.count")}
          </div>
        </div>

        {resources.length > 0 ? (
          <div className="resource-grid">
            {resources.map((resource) => (
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
                    {t("resources.open")} <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✦</span>
            <h3>{t("resources.empty.title")}</h3>
            <p>{t("resources.empty.text")}</p>
          </div>
        )}
      </section>
    </main>
  );
}
