"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

type Section = { titleKey: any; textKey: any };

export default function LegalPage({
  kickerKey,
  titleKey,
  updatedKey,
  introKey,
  sections,
}: {
  kickerKey: any;
  titleKey: any;
  updatedKey: any;
  introKey: any;
  sections: Section[];
}) {
  const { t } = useLanguage();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← {t("nav.explore")}
      </Link>

      <header className="mt-8">
        <p className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          {t(kickerKey)}
        </p>
        <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-5xl">
          {t(titleKey)}
        </h1>
        <p className="mt-2 text-xs text-zinc-500">{t(updatedKey)}</p>
        <p className="mt-5 text-sm leading-7 text-zinc-400">{t(introKey)}</p>
      </header>

      <div className="mt-10 space-y-6">
        {sections.map((s, i) => (
          <section
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              {t(s.titleKey)}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {t(s.textKey)}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}