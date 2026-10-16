"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { Resource } from "@/data/resources";
import { useToast } from "@/components/Toast";

const DEFAULT_REGULAR_URL =
  "https://link-center.net/1343514/Hlzlwx0Sl3Eb";

type PendingKey = {
  slug: string;
  token: string;
  step: number;
  ts: number;
};

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

  const key = initialKey ?? null;
  const error = initialError ?? null;

  const [token, setToken] = useState<string | null>(null);

  const isPremium = resource.keyType === "premium";
  const totalSteps = isPremium
    ? (resource.linkvertise?.length ?? 3)
    : 1;

  // ── Отримуємо свіжий токен при mount
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Старт флоу: зберегти токен + step 0 у localStorage і відкрити Linkvertise
  const startFlow = () => {
    if (!token) return;

    const pending: PendingKey = {
      slug: resource.slug,
      token,
      step: 0,
      ts: Date.now(),
    };

    try {
      localStorage.setItem("pendingKey", JSON.stringify(pending));
    } catch {
      /* ignore */
    }

    const firstUrl = isPremium && resource.linkvertise?.[0]
      ? resource.linkvertise[0].url
      : DEFAULT_REGULAR_URL;

    window.location.assign(firstUrl);
  };

  async function copyKey() {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      toast("Key copied to clipboard", "success");
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
    missing_params: t("resource.keyError"),
    token_used: t("resource.keyError"),
    invalid_hash: t("resource.keyError"),
    invalid_flow: t("resource.keyError"),
    bad_json: t("resource.keyError"),
    network: t("resource.err.network"),
    worker_error: t("resource.err.workerDown"),
    unknown: t("resource.keyError"),
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      {/* ... ваш заголовок, опис, версія ресурсу ... */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">
          {t("resource.access.title")}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          {t("resource.access.text")}
        </p>

        {key ? (
          <div className="mt-4">
            <div className="text-xs text-white/50">
              {t("resource.keyLabel")}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-black/40 px-3 py-2 text-sm">
                {key}
              </code>
              <button
                onClick={copyKey}
                className="rounded bg-violet-500 px-3 py-2 text-sm font-medium"
              >
                {t("resource.copy")}
              </button>
            </div>
            {resource.keyUsage && (
              <p className="mt-3 text-xs text-white/40">
                {resource.keyUsage}
              </p>
            )}
          </div>
        ) : (
          <>
            {token ? (
              <div className="mt-4">
                {isPremium ? (
                  <div className="space-y-3">
                    <div className="text-xs text-white/50">
                      {totalSteps} steps required — each step opens Linkvertise
                      with 2 ads.
                    </div>
                    <button
                      type="button"
                      onClick={startFlow}
                      className="block w-full rounded-lg bg-violet-500 px-4 py-3 text-center text-sm font-medium"
                    >
                      Start premium flow ({totalSteps} steps)
                    </button>
                    <p className="text-xs text-white/40">
                      You&apos;ll return here after each step automatically.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startFlow}
                    className="block w-full rounded-lg bg-violet-500 px-4 py-3 text-center text-sm font-medium"
                  >
                    {t("resource.getKey")}
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-4 text-sm text-white/50">
                {t("resource.loadingKey")}
              </div>
            )}

            <p className="mt-3 text-xs text-white/40">
              {t("resource.getKeyHint")}
            </p>

            {error && (
              <div className="mt-3 rounded bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMessages[error] ?? t("resource.keyError")}
              </div>
            )}
          </>
        )}
      </div>

      {/* ... блок схожих ресурсів ... */}
    </main>
  );
}