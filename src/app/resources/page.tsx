import Link from "next/link";
import { getAllResources } from "@/lib/resourcesStore";
import ResourceArtwork from "@/components/ResourceArtwork";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← Back home
      </Link>

      <header className="mt-8">
        <div className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          THE CATALOG
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-6xl">
          All resources
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Browse the complete collection of scripts and UI libraries.
        </p>
      </header>

      {resources.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/3 p-12 text-center">
          <p className="text-3xl">✦</p>
          <h2 className="mt-4 font-[Space_Grotesk] text-xl font-semibold">
            The catalog is empty
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            New resources will appear here soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <article
              key={r.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 flex flex-col h-full"
            >
              <ResourceArtwork resource={r} />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center">
                  <span className={`category-label label-${r.color}`}>
                    {r.category}
                  </span>
                </div>
                <h3 className="mt-3 font-[Space_Grotesk] text-base font-semibold">
                  {r.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400 flex-1">
                  {r.description}
                </p>
                <Link
                  href={`/resource/${r.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium transition hover:border-violet-400/40"
                >
                  Open ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}