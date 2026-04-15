import { Section } from "./section";

const cases = [
  {
    title: "Корпуса и механика приборов",
    produces:
      "Заказные корпуса, крышки, кронштейны и несущие элементы под электронику и механику — с допусками до постановки в печать.",
    tag: "Корпуса",
  },
  {
    title: "Оснастка и направляющие",
    produces:
      "Захваты, кондукторы, направляющие и вспомогательная оснастка для серийной сборки и контроля геометрии на линии.",
    tag: "Оснастка",
  },
  {
    title: "Прототипы и посадочные проверки",
    produces:
      "Детали для примерки узлов, проверки зазоров и кинематики до запуска дорогой оснастки или литника.",
    tag: "Проверка",
  },
  {
    title: "Мелкосерийные функциональные детали",
    produces:
      "Короткие партии рабочих элементов — от одиночных образцов до повторяемых малых тиражей с одним профилем партии.",
    tag: "Серия",
  },
  {
    title: "Визуальные и выставочные макеты",
    produces:
      "Масштабные модели, фрагменты изделий и наглядные узлы для показа геометрии (без заявлений о медицинском назначении).",
    tag: "Макет",
  },
  {
    title: "Упаковка и комплектация",
    produces:
      "Ложементы, прокладки и внутренняя геометрия тары под конкретную партию — посадка и защита при транспортировке.",
    tag: "Тара",
  },
] as const;

export function IndustriesSection() {
  return (
    <Section
      id="industries"
      eyebrow="Заказные сценарии"
      title="Типовые задачи, которые закрываем изделиями с печати"
      subtitle="Практические B2B-входы: от корпусов и оснастки до макетов и тары. Конкретный маршрут и стек — после приёмки модели."
      variant="muted"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {cases.map((c) => (
          <article
            key={c.title}
            className="group flex min-h-[200px] h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-500/35 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-snug text-zinc-950">
                {c.title}
              </h3>
              <span className="shrink-0 rounded-md border border-teal-200/80 bg-teal-50/90 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-teal-900">
                {c.tag}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              FullPrint поставляет
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
              {c.produces}
            </p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent transition group-hover:via-teal-300/60" />
          </article>
        ))}
      </div>
    </Section>
  );
}
