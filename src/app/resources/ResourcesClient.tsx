{resources.length > 0 ? (
  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {resources.map((r) => (
      /* ...твій існуючий JSX карточки... */
    ))}
  </div>
) : (
  <div className="mt-10 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-14 text-center">
    <span className="text-3xl text-violet-300">✦</span>
    <h3 className="mt-3 font-[Space_Grotesk] text-xl font-semibold">
      {t("resources.empty.title")}
    </h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
      {t("resources.empty.text")}
    </p>
  </div>
)}