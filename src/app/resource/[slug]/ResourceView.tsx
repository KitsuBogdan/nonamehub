"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Resource } from "@/data/resources";
import { SITE } from "@/data/site";
import { useToast } from "@/components/Toast";

type PendingKey = { slug: string; token: string; step: number; ts: number };

type KeyInfo = {
  expiresAt: number;
  maxUses: number;
};

type ExistingKey = KeyInfo & {
  key: string;
  createdAt: number;
};

const ERROR_MESSAGES: Record<string, string> = {
  worker_unreachable: "The key server is currently unavailable. Please try again later.",
  worker_error: "The key server is currently unavailable. Please try again later.",
  admin_token_invalid: "Server configuration error. Contact the administrator.",
  malformed_response: "Server configuration error. Contact the administrator.",
  server_not_configured: "Server configuration error. Contact the administrator.",
  rate_limited: "Too many requests. Wait a minute and try again.",
  method_not_allowed: "Server error. Please try again later.",
  not_found: "Resource not found.",
  no_key_required: "This resource doesn't require a key.",
  invalid_token: "Verification failed. Please start again.",
  invalid_hash: "Hash expired or already used. Please restart the Linkvertise step.",
  linkvertise_bad_response: "Verification service unavailable. Try again in a minute.",
  linkvertise_unreachable: "Verification service unavailable. Try again.",
  linkvertise_bad_token: "Server configuration error. Contact the administrator.",
  linkvertise_not_configured: "Server configuration error. Contact the administrator.",
  missing_token: "Couldn't load the key. Try again.",
  missing_params: "Couldn't load the key. Try again.",
  token_used: "This key has already been claimed.",
  bad_json: "Server error. Please try again.",
  network: "Network error. Check your connection and try again.",
  unexpected: "Server error. Please try again.",
  no_linkvertise_url: "Configuration error. Contact admin.",
  token_failed: "Key system not ready. Try again.",
  unknown: "Couldn't load the key. Try again.",
};

function formatExpiry(ts: number): string {
  const d = new Date(ts);
  const dateStr = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const diff = ts - Date.now();
  if (diff <= 0) return `${dateStr} (expired)`;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${dateStr} (${hours}h left)`;
  const days = Math.floor(diff / 86_400_000);
  return `${dateStr} (${days}d left)`;
}

export default function ResourceView({
  resource,
  initialKey,
  initialError,
  existingKey,
}: {
  resource: Resource;
  initialKey?: string;
  initialError?: string;
  existingKey?: ExistingKey | null;
}) {
  const toast = useToast();

  const [key, setKey] = useState<string | null>(
    initialKey ?? existingKey?.key ?? null,
  );
  const [info, setInfo] = useState<KeyInfo | null>(
    existingKey
      ? { expiresAt: existingKey.expiresAt, maxUses: existingKey.maxUses }
      : null,
  );
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Fallback expiry info when key came from ?key= URL but cookie is absent
    // (e.g. copied link, cleared cookie). Deferred via microtask to avoid
    // synchronous setState inside the effect body.
    if (!existingKey && initialKey && resource.keyConfig) {
      const { expiresDays = 2, maxUses = 75 } = resource.keyConfig;
      Promise.resolve().then(() => {
        setInfo({
          expiresAt: Date.now() + expiresDays * 24 * 60 * 60 * 1000,
          maxUses,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Strip ?key= from URL after load (cookie holds it now)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.has("key")) {
      url.searchParams.delete("key");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

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
      if (data.key) {
        setKey(data.key);
        setInfo({ expiresAt: data.expiresAt, maxUses: data.maxUses });
      } else {
        setError(data.error ?? "unknown");
      }
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
        ← Back to catalog
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
              <code className="code-scroll flex-1 overflow-x-auto whitespace-pre rounded bg-black/40 px-3 py-2 pb-3 text-xs text-violet-200">
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

      {resource.requiresKey && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">
            {key ? "Your key" : "Getting access"}
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
                  Copy
                </button>
              </div>

              {info && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                  <span>
                    Expires:{" "}
                    <span className="text-zinc-300">
                      {formatExpiry(info.expiresAt)}
                    </span>
                  </span>
                  <span>
                    Limit:{" "}
                    <span className="text-zinc-300">
                      {info.maxUses} uses
                    </span>
                  </span>
                </div>
              )}

              {resource.keyUsage && (
                <p className="mt-3 text-xs text-zinc-500">
                  {resource.keyUsage}
                </p>
              )}

              {existingKey && (
                <p className="mt-3 rounded bg-violet-400/5 px-3 py-2 text-xs text-violet-200/70">
                  You already have an active key for this type. A new one can
                  be generated after this key expires.
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
                {busy ? "Loading…" : "Get key"}
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
                  {ERROR_MESSAGES[error] ?? "Couldn't load the key. Try again."}
                </p>
              )}
            </>
          )}
        </section>
      )}

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