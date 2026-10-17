"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { Resource } from "@/data/resources";
import { SITE } from "@/data/site";
import { useToast } from "@/components/Toast";

type PendingKey = { slug: string; token: string; step: number; ts: number };

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
  const toast = useToast();

  const [key, setKey] = useState<string | null>(initialKey ?? null);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [busy, setBusy] = useState(false);

  async function copy(value: string, label = "Copied!") {
    try {
      await navigator.clipboard.writeText(value);
      toast(label, "success");
    } catch {
      toast("Couldn't copy", "error");
    }
  }

  async function directGetKey() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/key/${resource.slug}/direct`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.key) setKey(data.key);
      else setError(data.error ?? "unknown");
    } catch {
      setError("network");
    } finally {
      setBusy(false);
    }
  }

  async function startFlow() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/token/${resource.slug}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setError(data.error ?? "token_failed");
        return;
      }

      const pending: PendingKey = {
        slug: resource.slug,
        token: data.token,
        step: 0,
        ts: Date.now(),
      };
      try {
        localStorage.setItem("pendingKey", JSON.stringify(pending));
      } catch {}

      const firstUrl = resource.linkvertise?.[0]?.url;
      if (!firstUrl) {
        setError("no_linkvertise_url");
        return;
      }

      window.location.assign(firstUrl);
    } catch {
      setError("network");
    } finally {
      setBusy(false);
    }
  }

  const errorMessages: Record<string, string> = {
    worker_unreachable: t("resource.err.workerDown"),
    rate_limited: t("resource.err.rateLimited"),
    not_found: t("resource.err.notFound"),
    server_not_configured: t("resource.err.notConfigured"),
    invalid_token: t("resource.err.notConfigured"),
    missing_token: t("resource.keyError"),
    missing_params: t("resource.keyError"),
    token_used: t("resource.keyError"),
    invalid_hash: t("resource.keyError"),
    bad_json: t("resource.keyError"),
    network: t("resource.err.network"),
    worker_error: t("resource.err.workerDown"),
    no_linkvertise_url: "Configuration error. Contact admin.",
    token_failed: "Key system not ready. Try again.",
    unknown: t("resource.keyError"),
  };

  const loaderUrl = resource.loaderScriptId
    ? `${SITE.loader}/get_script?script=${resource.loaderScriptId}`
    : null;
  const loaderSnippet = loaderUrl
    ? `loadstring(game:HttpGet("${loaderUrl}"))()`
    : null;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/resources"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← {t("resources.back")}
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`category-label label-${resource.color}`}>
            {resource.category}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-zinc-500">
            {resource.tag}
          </span>
          <span className="text-[11px] text-zinc-500">v{resource.version}</span>
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold tracking-tight sm:text-5xl">
          {resource.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          {resource.description}
        </p>
      </header>

      {/* Loader snippet (для скриптів) */}
      {loaderSnippet && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">
            How to use
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
            <li>Copy the loader below</li>
            <li>Paste into your Roblox executor</li>
            <li>Enter your key when prompted</li>
            <li>Script loads automatically</li>
          </ol>
          <div className="mt-4">
            <div className="mb-1 text-xs text-zinc-500">Loader</div>
            <div className="flex items-start gap-2">
              <code className="flex-1 overflow-x-auto whitespace-pre rounded bg-black/40 px-3 py-2 text-xs text-violet-200">
                {loaderSnippet}
              </code>
              <button
                type="button"
                onClick={() => copy(loaderSnippet, "Loader copied!")}
                className="shrink-0 rounded bg-violet-500 px-3 py-2 text-xs font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Direct download (без ключа) */}
      {!resource.requiresKey && resource.downloadUrl && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">
            Download
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            No key required. Download directly.
          </p>
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Download ↗
          </a>
        </section>
      )}

      {/* Key section */}
      {resource.requiresKey && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">
            {key ? "Your key" : t("resource.access.title")}
          </h2>

          {key ? (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-black/40 px-3 py-2 text-sm">
                  {key}
                </code>
                <button
                  type="button"
                  onClick={() => copy(key, "Key copied!")}
                  className="rounded bg-violet-500 px-3 py-2 text-sm font-medium"
                >
                  {t("resource.copy")}
                </button>
              </div>
              {resource.keyUsage && (
                <p className="mt-3 text-xs text-zinc-500">
                  {resource.keyUsage}
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm text-zinc-400">
                {resource.steps === 0
                  ? "Key will be generated instantly."
                  : resource.steps === 1
                    ? "Complete 1 quick step (2 ads) to unlock your key."
                    : `Complete ${resource.steps} steps (2 ads each) to unlock your premium key.`}
              </p>

              <button
                type="button"
                onClick={resource.steps === 0 ? directGetKey : startFlow}
                disabled={busy}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {busy ? "Loading…" : t("resource.getKey")}
              </button>

              {resource.steps > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({ length: resource.steps }).map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-10 rounded-full bg-violet-500/30"
                    />
                  ))}
                </div>
              )}

              {error && (
                <p className="mt-3 rounded bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {errorMessages[error] ?? t("resource.keyError")}
                </p>
              )}
            </>
          )}
        </section>
      )}

      {/* Support */}
      <section className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-400/6 p-6">
        <h2 className="font-[Space_Grotesk] text-lg font-semibold">
          Need help?
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Join our Discord for support or watch video guides on YouTube.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={SITE.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            💬 Discord
          </a>
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            ▶ YouTube
          </a>
        </div>
      </section>
    </main>
  );
}