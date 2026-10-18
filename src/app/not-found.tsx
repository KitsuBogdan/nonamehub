import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-5 py-20 sm:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/3 p-8 text-center sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-400/10 text-3xl text-violet-300">
          ✳
        </div>

        <p className="mt-6 text-[10px] font-bold tracking-[2px] text-violet-300/80">
          ERROR / 404
        </p>

        <h1 className="mt-3 font-[Space_Grotesk] text-5xl font-semibold tracking-tight sm:text-7xl">
          4
          <span className="bg-linear-to-r from-violet-300 to-violet-600 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Looks like this page got lost somewhere between dimensions of Roblox
          Studio. The link may be outdated or the resource was removed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            ← Back to home
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/2 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-400/10"
          >
            Browse resources
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 text-left">
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-xs text-zinc-500">Code</p>
            <p className="mt-1 text-sm font-medium text-violet-300">404</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-xs text-zinc-500">Status</p>
            <p className="mt-1 text-sm font-medium">Not found</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-xs text-zinc-500">Tip</p>
            <p className="mt-1 text-sm font-medium text-emerald-400">
              Try again
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}