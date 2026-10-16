// src/app/resource/[slug]/ResourceView.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import type { Resource } from "@/data/resources";
import AdBlockDetector from "@/components/AdBlockDetector";
import { useToast } from "@/components/Toast";

export default function ResourceView({
  resource,
  initialKey,
  initialError,
}: {
  resource: Resource;
  initialKey?: string;
  initialError?: string;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [key, setKey] = useState<string | null>(initialKey ?? null);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [token, setToken] = useState<string | null>(null);

  // Linkvertise dynamic link: після проходження редірект на /api/key/...
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nonamehub.fyi";
  const keyUrl = token
    ? `${siteUrl}/api/key/${resource.slug}?t=${token}`
    : "";
  const lvHref = "https://link-center.net/1343514/Hlzlwx0Sl3Eb";
  const handleGetKey = () => {
    if (!token) return;
    try {
      sessionStorage.setItem(
        "pendingKey",
        JSON.stringify({ slug: resource.slug, token }),
      );
      alert("[debug] saved pendingKey: " + resource.slug);
    } catch {
      /* ignore */
    }
  };
  const [copied, setCopied] = useState(false);

  // Прибираємо ?key= / ?err= з URL після першого рендера
  useEffect(() => {
  if (initialKey || initialError) {
    const url = new URL(window.location.href);
    url.searchParams.delete("key");
    url.searchParams.delete("err");
    window.history.replaceState({}, "", url.toString());
  }
}, [initialKey, initialError]);

  // Отримуємо свіжий токен для кнопки "Get key"
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/token/${resource.slug}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { token?: string }) => {
        if (!cancelled && data.token) setToken(data.token);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, [resource.slug]);

  const toast = useToast();

async function copyKey() {
  if (!key) return;
  try {
    await navigator.clipboard.writeText(key);
    setCopied(true);
    toast("Key copied to clipboard", "success");
    setTimeout(() => setCopied(false), 1500);
  } catch {
    toast("Couldn't copy the key", "error");
  }
}

  const errorMessages: Record<string, string> = {
    worker_unreachable: t("resource.err.workerDown"),
    rate_limited: t("resource.err.rateLimited"),
    not_found: t("resource.err.notFound"),
    server_not_configured: t("resource.err.notConfigured"),
    invalid_token: t("resource.err.notConfigured"),
    missing_token: t("resource.keyError"),
    token_used: t("resource.keyError"),
    invalid_referer: t("resource.keyError"),
    unknown: t("resource.keyError"),
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        {t("resource.back")}
      </Link>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
            {resource.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
            {resource.type}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
          {resource.title}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
          {resource.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-zinc-500">{t("resource.version")}</p>
            <p className="mt-1 font-medium">{resource.version}</p>
          </div>

          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-zinc-500">{t("resource.steps")}</p>
            <p className="mt-1 font-medium">{resource.steps}</p>
          </div>

          <div className="col-span-2 rounded-xl border border-white/10 p-4 sm:col-span-1">
            <p className="text-sm text-zinc-500">{t("resource.price")}</p>
            <p className="mt-1 font-medium text-emerald-400">
              {t("resource.free")}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-5">
          <h2 className="text-lg font-semibold">
            {t("resource.access.title")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {t("resource.access.text")}
          </p>

          <div className="mt-5">
            <AdBlockDetector>
              {key ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] p-5">
                  <p className="text-xs font-semibold tracking-wider text-emerald-300/80">
                    {t("resource.keyLabel")}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <code className="rounded-lg border border-emerald-400/30 bg-black/30 px-4 py-2 font-mono text-lg text-emerald-200">
                      {key}
                    </code>
                    <button
                      type="button"
                      onClick={copyKey}
                      className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                    >
                      {copied ? t("resource.copied") : t("resource.copy")}
                    </button>
                  </div>
                  {resource.keyUsage && (
                    <p className="mt-3 text-xs leading-5 text-emerald-200/70">
                      {resource.keyUsage}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {token ? (
                    <a
                      href={lvHref}
                      onClick={handleGetKey}
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/40 sm:w-auto"
                    >
                      {t("resource.getKey")} <span>🔑</span>
                    </a>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500/40 px-5 py-3 font-semibold text-white/70 sm:w-auto">
                      {t("resource.loadingKey")}
                    </span>
                  )}

                  <p className="mt-3 text-xs leading-5 text-zinc-500">
                    {t("resource.getKeyHint")}
                  </p>

                  {error && (
                    <div className="mt-3 rounded-lg border border-red-400/30 bg-red-400/[0.08] px-4 py-3 text-xs leading-5 text-red-300">
                      {errorMessages[error] ?? t("resource.keyError")}
                    </div>
                  )}
                </>
              )}
            </AdBlockDetector>
          </div>
        </div>
      </section>
    </main>
  );
}