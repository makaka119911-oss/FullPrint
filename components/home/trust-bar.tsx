const pillars = [
  {
    code: "01",
    label: "Замкнутый производственный контур",
    detail:
      "Входы и выходы этапов зафиксированы: то, что утверждено заказчиком, совпадает с тем, что уходит в печать.",
    value: "Меньше неопределённости",
  },
  {
    code: "02",
    label: "Контроль геометрии и DFM",
    detail:
      "Проверки до постановки в очередь — замечания до расхода филамента и машинного времени.",
    value: "Ранний отлов рисков",
  },
  {
    code: "03",
    label: "Версии и трассировка",
    detail:
      "Референс, модель и выгрузка — как ревизии. Удобно для повторов и разборов качества.",
    value: "Повторяемость",
  },
  {
    code: "04",
    label: "Отгрузка по списку качества",
    detail:
      "Упаковка и передача партии — по согласованному чек-листу; логистика прописывается в КП.",
    value: "Понятная приёмка",
  },
] as const;

export function TrustBarSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-20 border-b border-zinc-200 bg-white py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-teal-800">
            Почему процессу можно доверить запуск
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-zinc-900 sm:text-base">
            Дисциплина производства — не маркетинг: четыре опоры, на которых
            держится срок и качество B2B-поставки.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {pillars.map((c) => (
            <article
              key={c.code}
              className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 shadow-sm transition duration-200 hover:border-teal-500/35 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-semibold tabular-nums text-teal-800">
                  {c.code}
                </span>
                <span className="hidden text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:block">
                  {c.value}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-zinc-950 sm:text-base">
                {c.label}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                {c.detail}
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-teal-700/40 via-zinc-200 to-transparent opacity-80 transition group-hover:from-teal-600 group-hover:opacity-100" />
              <p className="mt-3 text-[11px] font-medium text-teal-900 sm:hidden">
                {c.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
