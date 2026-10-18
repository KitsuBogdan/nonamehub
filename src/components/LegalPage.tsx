import Link from "next/link";

type Section = {
  title: string;
  text: string;
};

export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← Explore
      </Link>

      <header className="mt-8">
        <p className="text-[10px] font-bold tracking-[2px] text-violet-300/80">
          {kicker}
        </p>
        <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-xs text-zinc-500">{updated}</p>
        <p className="mt-5 text-sm leading-7 text-zinc-400">{intro}</p>
      </header>

      <div className="mt-10 space-y-6">
        {sections.map((s, i) => (
          <section
            key={i}
            className="rounded-2xl border border-white/10 bg-white/3 p-6"
          >
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{s.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}