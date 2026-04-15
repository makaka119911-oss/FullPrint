const chips = [
  { label: "4-шаговый контур", detail: "бриф → референс → модель → выгрузка" },
  { label: "QC геометрии", detail: "стенки, объём, габариты стола" },
  { label: "Ревизии артефактов", detail: "фиксация версий перед печатью" },
  { label: "Доставка ориентир", detail: "упаковка и отслеживание — в roadmap" },
] as const;

export function TrustBarSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-20 border-b border-zinc-200 bg-white py-6 sm:py-8"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
          Производственная дисциплина
        </p>
        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {chips.map((c) => (
            <div
              key={c.label}
              className="min-w-[220px] snap-start rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 shadow-sm transition duration-300 hover:border-teal-500/30 hover:shadow-md sm:min-w-0"
            >
              <p className="text-sm font-semibold text-zinc-900">{c.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
