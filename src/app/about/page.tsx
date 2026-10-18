import type { Metadata } from "next";
import Link from "next/link";
import { getAllResources } from "@/lib/resourcesStore";

export const metadata: Metadata = {
  title: "About",
  description: "A free collection of scripts and UI libraries for Roblox Studio.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const resources = await getAllResources();
  const resourceCount = resources.length;
  const categoryCount = new Set(resources.map((r) => r.category)).size;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← Back to catalog
      </Link>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-10">
        <p className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          ABOUT
        </p>
        <h1 className="mt-4 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-6xl">
          The NoNameHub project.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
          A collection of free scripts and UI libraries for Roblox Studio.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">Resources</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold">
              {resourceCount}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">Categories</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold">
              {categoryCount}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-xs text-zinc-500">Price</p>
            <p className="mt-1 font-[Space_Grotesk] text-2xl font-semibold text-emerald-400">
              Free
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-400/6 p-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Browse catalog →
          </Link>
        </div>
      </section>
    </main>
  );
}