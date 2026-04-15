import { Section } from "./section";

const slides = [
  {
    title: "FDM · термопласты",
    body: "PLA, PETG, ABS и инженерные сплавы для функциональных деталей, кожухов и креплений. Оптимально для крупных габаритов и серий малых партий.",
    spec: "Слой 0,12–0,28 мм · поддержки · постобработка",
  },
  {
    title: "SLA · фотополимер",
    body: "Высокая детализация и гладкие поверхности для прецизионных узлов, литников и мастер-моделей. Подходит, когда важна микрогеометрия.",
    spec: "Минимальные радиусы · посткюр · базовая шлифовка",
  },
  {
    title: "SLS · PA12",
    body: "Прочные без поддержек изделия со сложной топологией. Хороший баланс механики и геометрической свободы для рабочих прототипов.",
    spec: "Пористость контролируется · окраска опционально",
  },
  {
    title: "Постобработка",
    body: "Снятие поддержек, базовая шлифовка, сборка пресс-посадкой, тонировка. Согласуем допуски до запуска в очередь.",
    spec: "Контрольный лист · фото отчёт при необходимости",
  },
] as const;

export function MaterialsStripSection() {
  return (
    <Section
      id="materials"
      eyebrow="Материалы и технологии"
      title="Подберите стек под задачу"
      subtitle="Горизонтальная лента карточек: технологии, типовые материалы и постобработка. Финальный выбор фиксируется после проверки модели."
      variant="muted"
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:gap-5">
        {slides.map((s) => (
          <article
            key={s.title}
            className="min-w-[min(100%,22rem)] shrink-0 snap-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:border-teal-500/35 hover:shadow-lg sm:min-w-[20rem] md:min-w-[24rem]"
          >
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-400" />
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-950">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{s.body}</p>
            <p className="mt-4 border-t border-zinc-100 pt-3 font-mono text-[11px] leading-snug text-zinc-500">
              {s.spec}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 sm:text-left">
        Листайте карточки горизонтально на мобильном · snap удерживает кадр.
      </p>
    </Section>
  );
}
