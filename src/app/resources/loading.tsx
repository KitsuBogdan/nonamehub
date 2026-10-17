export default function ResourcesLoading() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <div className="h-4 w-40 animate-pulse rounded bg-white/5" />

      <header className="mt-8">
        <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
        <div className="mt-3 h-12 w-72 animate-pulse rounded-lg bg-white/5" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-white/5" />
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
          >
            <div className="h-36 animate-pulse bg-white/5" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-12 animate-pulse rounded bg-white/5" />
              </div>
              <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="mt-2 h-3 w-full animate-pulse rounded bg-white/5" />
              <div className="mt-1 h-3 w-2/3 animate-pulse rounded bg-white/5" />
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <div className="h-3 w-10 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}