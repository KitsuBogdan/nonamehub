"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { resources } from "@/data/resources";

const gradientByColor: Record<string, string> = {
  violet: "from-violet-700/40 to-violet-950",
  blue: "from-blue-700/40 to-blue-950",
  orange: "from-orange-700/40 to-orange-950",
  green: "from-emerald-700/40 to-emerald-950",
  pink: "from-pink-700/40 to-pink-950",
  cyan: "from-cyan-700/40 to-cyan-950",
};

export default function ResourcesClient() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        {t("resources.back")}
      </Link>

      <header className="mt-8">
        <p className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          {t("resources.kicker")}
        </p>
        <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("resources.title")}
          <span className="text-violet-400">.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          {t("resources.subtitle")}
        </p>
      </header>

      {resources.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.slug}
              href={`/resource/${r.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-violet-400/40"
            >
              <div
                className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${
                  gradientByColor[r.color] ?? gradientByColor.violet
                }`}
              >
                <span className="absolute top-3 left-3 rounded-md border border-white/20 bg-black/40 px-2 py-1 text-[9px] font-bold tracking-wider text-zinc-200">
                  {r.type.toUpperCase()}
                </span>
                <span className="font-[Space_Grotesk] text-2xl font-semibold text-white/90 drop-shadow">
                  {r.title.split(" ")[0]}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-violet-300">
                    {r.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    ↓ {r.downloads}
                  </span>
                </div>
                <h2 className="mt-3 font-[Space_Grotesk] text-base font-semibold">
                  {r.title}
                </h2>
                <p className="mt-2 text-xs leading-6 text-zinc-400">
                  {r.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-zinc-500">
                  <span>v{r.version}</span>
                  <span className="text-violet-300 transition group-hover:translate-x-1">
                    {t("resources.open")} ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-14 text-center">
          <span className="text-3xl text-violet-300">✦</span>
          <h3 className="mt-3 font-[Space_Grotesk] text-xl font-semibold">
            {t("resources.empty.title")}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
            {t("resources.empty.text")}
          </p>
        </div>
      )}
    </main>
  );
}