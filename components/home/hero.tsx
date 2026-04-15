import { InstantQuoteCard } from "./instant-quote-card";

const microProof = [
  "STL · 3MF · STEP",
  "Проверка геометрии",
  "Ревизия до печати",
  "Производственный регламент",
] as const;

const trustBullets = [
  {
    title: "Инженерная приёмка",
    text: "DFM до очереди: геометрия согласуется до расхода материала.",
  },
  {
    title: "Фиксированные ревизии",
    text: "Бриф, модель и выгрузка версионируются — ясно, что уходит в печать.",
  },
  {
    title: "Предсказуемый цикл",
    text: "Сроки из очереди и постобработки; повтор — по утверждённому профилю партии.",
  },
] as const;

const ctaPrimary =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
const ctaSecondary =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-400/90 bg-white px-5 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-500 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-zinc-300/80 bg-zinc-50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(212 212 216 / 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(212 212 216 / 0.9) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-zinc-700 via-teal-700 to-teal-500" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-teal-600/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-zinc-400/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-teal-800">
              FullPrint · заказная 3D-печать под задачу
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.07]">
              Детали на 3D-принтере с инженерной приёмкой и предсказуемым
              маршрутом до отгрузки.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[1.05rem]">
              От модели или ТЗ — к согласованной геометрии и запуску в производство
              без разрыва между вашей спецификацией и станком.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#prompt" className={ctaPrimary}>
                Запросить оценку
              </a>
              <a href="#workflow" className={ctaSecondary}>
                Как работает запуск
              </a>
              <a
                href="#materials"
                className="text-sm font-semibold text-teal-800 underline-offset-4 transition hover:text-teal-700 hover:underline sm:ml-0.5"
              >
                Подобрать материал
              </a>
            </div>

            <ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Ключевые гарантии процесса"
            >
              {microProof.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-zinc-300/90 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-zinc-700 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>

            <ul className="mt-10 space-y-3">
              {trustBullets.map((h) => (
                <li
                  key={h.title}
                  className="flex gap-3 rounded-xl border border-zinc-200 bg-white/95 p-4 shadow-sm transition duration-200 hover:border-teal-500/35 hover:shadow-md"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {h.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {h.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 lg:pt-1">
            <InstantQuoteCard />
          </div>
        </div>
      </div>
    </section>
  );
}
