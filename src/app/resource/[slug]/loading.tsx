export default function ResourceLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8">
      <div className="h-4 w-40 animate-pulse rounded bg-white/5" />

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-10">
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
        </div>
        <div className="mt-6 h-10 w-2/3 animate-pulse rounded-lg bg-white/5" />
        <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-white/5" />
        <div className="mt-2 h-4 w-5/6 max-w-xl animate-pulse rounded bg-white/5" />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <div className="h-3 w-14 animate-pulse rounded bg-white/5" />
              <div className="mt-2 h-4 w-20 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-400/6 p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-white/5" />
          <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-white/5" />
          <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/5" />
          <div className="mt-5 h-11 w-40 animate-pulse rounded-xl bg-white/5" />
        </div>
      </section>
    </main>
  );
}