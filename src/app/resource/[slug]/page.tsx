import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getResourceBySlug, getAllResources } from "@/lib/resourcesStore";
import ResourceView from "./ResourceView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource || resource.disabled) return { title: "Resource not found" };
  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: `${resource.title} — NoNameHub`,
      description: resource.description,
      images: resource.cover ? [{ url: resource.cover }] : undefined,
    },
  };
}

export default async function ResourcePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ key?: string; err?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const resource = await getResourceBySlug(slug);
  if (!resource || resource.disabled) notFound();

  const all = await getAllResources();
  const similar = all
    .filter((r) => r.slug !== slug && r.category === resource.category)
    .slice(0, 3);

  return (
    <>
      <ResourceView
        key={slug}
        resource={resource}
        initialKey={sp.key}
        initialError={sp.err}
      />

      {similar.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
          <h2 className="mb-4 font-[Space_Grotesk] text-lg font-semibold">
            Similar resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {similar.map((r) => (
              <Link
                key={r.slug}
                href={`/resource/${r.slug}`}
                className="group rounded-xl border border-white/10 bg-white/3 p-4 transition hover:-translate-y-0.5 hover:border-violet-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-violet-300">
                    {r.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    ↓ {r.downloads}
                  </span>
                </div>
                <h3 className="mt-2 font-[Space_Grotesk] text-sm font-semibold">
                  {r.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
                  {r.description}
                </p>
                <span className="mt-3 inline-block text-[11px] text-violet-300 transition group-hover:translate-x-1">
                  Open ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}