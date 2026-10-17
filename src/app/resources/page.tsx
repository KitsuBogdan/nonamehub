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
          THE LIBRARY
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-6xl">
          All resources
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Every script, model, and key in one place.
        </p>
      </header>

      {resources.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/3 p-12 text-center">
          <p className="text-3xl">✦</p>
          <h2 className="mt-4 font-[Space_Grotesk] text-xl font-semibold">
            No resources yet
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Check back soon — new resources will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <article
              key={r.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3"
            >
              <ResourceArtwork resource={r} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`category-label label-${r.color}`}>
                    {r.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    ↓ {r.downloads}
                  </span>
                </div>
                <h3 className="mt-3 font-[Space_Grotesk] text-base font-semibold">
                  {r.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
                  {r.description}
                </p>
                <Link
                  href={`/resource/${r.slug}`}
                  className="mt-4 inline-block rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium transition hover:border-violet-400/40"
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