import { InstantQuoteCard } from "./instant-quote-card";

const highlights = [
  {
    title: "Загрузка и бриф",
    text: "Файл или текстовое ТЗ: габариты, допуски, технология и материал.",
  },
  {
    title: "Прозрачный расчёт",
    text: "Предварительная вилка и сроки до постановки в производственную очередь.",
  },
  {
    title: "Контроль перед печатью",
    text: "Подтверждения референса и модели, чтобы избежать брака на столе.",
  },
] as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-zinc-200 bg-zinc-50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(228 228 231 / 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(228 228 231 / 0.9) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-zinc-400/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-teal-800">
              FullPrint · онлайн 3D-печать
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Промышленная 3D-печать под ключ: от файла до готовой партии.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              Загрузите модель или опишите деталь словами — получите ориентир по
              срокам и стоимости, пройдите контроль геометрии и заберите
              изделия с предсказуемым качеством. Один акцентный маршрут без
              лишней бюрократии.
            </p>
            <ul className="mt-8 space-y-4">
              {highlights.map((h) => (
                <li
                  key={h.title}
                  className="flex gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:border-teal-500/25 hover:shadow-md"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white"
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#prompt"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                Загрузить модель
              </a>
              <a
                href="#workflow"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              >
                Как мы работаем
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InstantQuoteCard />
          </div>
        </div>
      </div>
    </section>
  );
}
