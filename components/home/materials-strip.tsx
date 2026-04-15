import { Section } from "./section";

const slides = [
  {
    title: "FDM · термопласты",
    goodFor:
      "Корпуса, крепёж, крупные габариты, быстрые итерации при умеренных нагрузках.",
    risky:
      "Тонкие стенки без скруглений, длинные нависания без поддержек — нужен отдельный разбор.",
    typical: "Прототипы узлов, кожухи, мелкосерия до нескольких сотен шт.",
    logic:
      "Намотка слоя → поддержки → съём → постобработка по согласованному чек-листу.",
  },
  {
    title: "SLA · фотополимер",
    goodFor:
      "Мелкая геометрия, гладкий класс А, узкие каналы, мастер-модели.",
    risky:
      "Ударные нагрузки и высокие температуры без подбора смолы; усадка и посткюр влияют на размер.",
    typical: "Прецизионные прототипы, литники, детали с высокой детализацией.",
    logic:
      "Печать слоями → посткюр → снятие опор → доработка поверхности по ТЗ.",
  },
  {
    title: "SLS · PA12",
    goodFor:
      "Сложная топология, внутренние полости, функциональные детали без ручных поддержек.",
    risky:
      "Пористость и шероховатость по умолчанию; герметичность и точность — по согласованию.",
    typical: "Рабочие прототипы, узлы со взаимным проникновением, малые серии.",
    logic:
      "Спекание слоя → очистка → контроль геометрии → опционально окраска.",
  },
  {
    title: "Постобработка",
    goodFor:
      "Сборка «из коробки»: снятие следов печати, допуски под пресс-посадку, внешний вид.",
    risky:
      "Агрессивная механическая обработка на тонких стенках — риск деформации.",
    typical: "Шлифовка, тонировка, базовая сборка, маркировка перед упаковкой.",
    logic:
      "Операции только из согласованного перечня; приёмка по критериям из КП.",
  },
] as const;

const rowLabel = {
  goodFor: "Сильные стороны",
  risky: "На что обратить внимание",
  typical: "Типичный заказ",
  logic: "Логика производства",
} as const;

export function MaterialsStripSection() {
  return (
    <Section
      id="materials"
      eyebrow="Материалы и технологии"
      title="С чем сравнивать стек под ваш кейс"
      subtitle="Ответ на «что мне подойдёт»: не каталог, а матрица решений — сильные стороны, ограничения и типовой производственный ход."
      variant="dark"
      emphasis
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:gap-5 sm:px-6 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0 xl:grid-cols-4">
        {slides.map((s) => (
          <article
            key={s.title}
            className="flex min-h-[380px] min-w-[min(100%,20.5rem)] shrink-0 snap-center flex-col rounded-2xl border border-zinc-600/90 bg-zinc-900 p-6 shadow-xl ring-1 ring-white/5 transition duration-200 hover:border-teal-500/45 hover:ring-teal-500/15 sm:min-w-[20rem] lg:min-h-[400px] lg:min-w-0 xl:p-7"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-white xl:text-xl">
                {s.title}
              </h3>
              <span
                className="shrink-0 rounded border border-teal-500/30 bg-teal-950/40 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-teal-300/90"
                aria-hidden
              >
                Сравнение
              </span>
            </div>

            <dl className="mt-4 flex flex-1 flex-col gap-3 text-sm">
              <div className="rounded-lg border border-zinc-700/80 bg-zinc-950/50 p-3">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-wider text-teal-400/95">
                  {rowLabel.goodFor}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-zinc-300">
                  {s.goodFor}
                </dd>
              </div>
              <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-3">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">
                  {rowLabel.risky}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-zinc-400">
                  {s.risky}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {rowLabel.typical}
                </dt>
                <dd className="mt-1 text-zinc-400">{s.typical}</dd>
              </div>
              <div className="border-t border-zinc-700/70 pt-3">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {rowLabel.logic}
                </dt>
                <dd className="mt-1 font-mono text-[11px] leading-relaxed text-zinc-500">
                  {s.logic}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-zinc-500 lg:text-left">
        Итоговый выбор материала и постобработки фиксируется после приёмки модели
        и согласования допусков.
      </p>
    </Section>
  );
}
