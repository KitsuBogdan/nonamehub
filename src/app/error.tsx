"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-red-400/20 bg-red-400/4 p-8 text-center sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-400/10 text-3xl text-red-300">
          !
        </div>

        <p className="mt-6 text-[10px] font-bold tracking-[2px] text-red-300/80">
          {t("error.kicker")}
        </p>

        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold tracking-tight sm:text-5xl">
          {t("error.title")}
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          {t("error.text")}
        </p>

        {error?.digest && (
          <p className="mt-3 text-xs text-zinc-600">
            {t("error.code")}{" "}
            <span className="text-zinc-400">{error.digest}</span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/40"
          >
            {t("error.retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/2 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-red-400/40 hover:bg-red-400/10"
          >
            {t("error.home")}
          </Link>
        </div>
      </div>
    </main>
  );
}