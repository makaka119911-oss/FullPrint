/**
 * Полиш: согласовать primary/secondary с hero (тень, граница) + системная подпись под кнопками.
 */
export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="border-t border-zinc-200 bg-zinc-100 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-xl border border-zinc-300 bg-white p-8 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">
              Следующий шаг
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Попробуйте заполнить реальный бриф на деталь.
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              В этой версии работает только интерфейс. Используйте форму выше,
              чтобы проверить, как команда формулирует требования для цепочки:
              описание → референс → модель → выгрузка.
            </p>
          </div>
          <div className="mt-8 flex w-full shrink-0 flex-col gap-3 sm:mt-0 sm:w-auto">
            <a
              href="#prompt"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-900/25 transition hover:bg-zinc-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Перейти к брифу
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Посмотреть 4 шага
            </a>
            <p className="text-center text-[11px] leading-4 text-zinc-500 sm:text-left">
              Переходы по якорям внутри страницы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
