// src/app/about/AboutClient.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        {t("about.back")}
      </Link>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          {t("about.kicker")}
        </p>
        <h1 className="mt-4 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("about.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
          {t("about.text")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">{t("about.resources")}</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold">
              100+
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">{t("about.categories")}</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold">
              3
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">{t("about.price")}</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold text-emerald-400">
              {t("about.free")}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">
            {t("about.cta.title")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {t("about.cta.text")}
          </p>
          <Link
            href="/resources"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {t("about.cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}