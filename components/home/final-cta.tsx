export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="scroll-mt-20 border-t border-zinc-200 bg-gradient-to-b from-zinc-100 to-white py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 p-8 shadow-2xl shadow-zinc-900/20 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-teal-300/90">
              Старт партии
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Загрузите модель или опишите деталь — соберём маршрут под вашу
              задачу.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Получите ориентир по материалу и срокам, пройдите контроль геометрии
              и зафиксируйте ревизию перед печатью. В текущей сборке доступны
              только экраны без бэкенда.
            </p>
          </div>
          <div className="relative mt-8 flex w-full shrink-0 flex-col gap-3 lg:mt-0 lg:w-auto lg:min-w-[240px]">
            <a
              href="#prompt"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-900/35 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
            >
              Перейти к загрузке
            </a>
            <a
              href="#materials"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-600 bg-zinc-950/50 px-6 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
            >
              Материалы и технологии
            </a>
            <p className="text-center text-[11px] leading-relaxed text-zinc-500 lg:text-left">
              Якорные ссылки ведут к блокам на этой странице.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
