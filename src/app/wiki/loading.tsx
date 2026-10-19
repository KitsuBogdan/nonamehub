export default function WikiLoading() {
  return (
    <main className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
      {/* Hero Skeleton */}
      <div className="mb-12 flex flex-col items-center border-b border-white/5 pb-12 text-center">
        <div className="h-4 w-32 animate-pulse rounded bg-white/5 mb-4" />
        <div className="h-12 w-64 animate-pulse rounded-lg bg-white/5 mb-4" />
        <div className="h-4 w-96 animate-pulse rounded bg-white/5" />
        <div className="mt-6 h-12 w-full max-w-md animate-pulse rounded-xl bg-white/5" />
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Sidebar Skeleton */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-2xl border border-[#252530] bg-[#111118] p-5">
            <div className="mb-5 h-4 w-24 animate-pulse rounded bg-white/5" />
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-full animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          </div>
        </aside>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="mb-6 h-8 w-48 animate-pulse rounded bg-white/5" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
              </div>
              <div className="mt-6 h-40 w-full animate-pulse rounded-xl bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}