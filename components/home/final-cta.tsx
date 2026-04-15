const proofPoints = [
  "STL / 3MF / STEP",
  "Проверка геометрии",
  "Ревизия перед печатью",
] as const;

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="scroll-mt-20 border-t border-zinc-200 bg-gradient-to-b from-zinc-100 via-white to-zinc-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 p-8 shadow-2xl shadow-zinc-950/40 sm:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-teal-500/12 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-zinc-500/10 blur-2xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-teal-300/90">
                Запуск партии
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.125rem] lg:leading-tight">
                Отправьте комплект — получите КП и согласованный маршрут
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Файл, тираж и срок в одной заявке. Дальше — приёмка комплекта,
                при необходимости уточнения, затем коммерческое предложение с
                условиями производства и отгрузки.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-stretch">
              <a
                href="#prompt"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-900/40 transition duration-200 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                Оформить заявку на расчёт
              </a>
              <a
                href="#workflow"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-zinc-500 bg-zinc-900/50 px-6 text-sm font-medium text-zinc-100 transition duration-200 hover:border-zinc-400 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              >
                Схема запуска в производство
              </a>
            </div>
          </div>

          <ul
            className="relative mt-10 flex flex-wrap justify-center gap-2 border-t border-zinc-800/90 pt-8 sm:gap-3 lg:justify-start"
            aria-label="Ключевые опоры сервиса"
          >
            {proofPoints.map((p) => (
              <li
                key={p}
                className="rounded-full border border-teal-500/25 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-teal-100/95 shadow-sm"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
