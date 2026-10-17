"use client";

export type OverlayState =
  | { kind: "checking" }
  | { kind: "next"; completed: number; next: number; total: number; nextUrl: string }
  | { kind: "error"; message: string };

export default function HashOverlay({
  state,
  onContinue,
  onRetry,
  onClose,
}: {
  state: OverlayState;
  onContinue: (url: string) => void;
  onRetry: () => void;
  onClose: () => void;
}) {
  if (state.kind === "checking") {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0a12] p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <p className="mt-6 text-sm text-zinc-400">Verifying your step…</p>
        </div>
      </div>
    );
  }

  if (state.kind === "next") {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a12] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-400/10 text-2xl text-violet-300">
            ✓
          </div>
          <h3 className="mt-6 font-[Space_Grotesk] text-xl font-semibold">
            Step {state.completed} of {state.total} completed
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Continue to step {state.next} of {state.total} to unlock your key.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: state.total }).map((_, i) => {
              const done = i < state.completed;
              const current = i === state.next - 1;
              return (
                <span
                  key={i}
                  className={`h-2 w-12 rounded-full transition ${
                    done
                      ? "bg-violet-500"
                      : current
                        ? "bg-violet-400/60"
                        : "bg-white/10"
                  }`}
                />
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => onContinue(state.nextUrl)}
            className="mt-6 w-full rounded-xl bg-linear-to-r from-violet-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Continue to step {state.next} of {state.total} →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-400/20 bg-[#0a0a12] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/40 bg-red-400/10 text-2xl text-red-300">
          !
        </div>
        <h3 className="mt-6 font-[Space_Grotesk] text-xl font-semibold">
          Verification failed
        </h3>
        <p className="mt-2 text-sm text-zinc-400">{state.message}</p>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}