import { Section } from "./section";

const cases = [
  {
    title: "Инженерные прототипы",
    body: "Корпуса, кронштейны, тестовые сборки — быстрые итерации до серийной оснастки.",
    tag: "R&D",
  },
  {
    title: "Производственные приспособления",
    body: "Направляющие, захваты, калибровочные стенды: допуски согласуются до постановки в печать.",
    tag: "Tooling",
  },
  {
    title: "Архитектурные и выставочные модели",
    body: "Масштабные макеты и фасадные фрагменты с аккуратной геометрией и финишем.",
    tag: "Maquette",
  },
  {
    title: "Обучение и наглядные макеты",
    body: "Учебные стенды и демонстрационные узлы без заявлений о медицинском назначении.",
    tag: "Edu",
  },
  {
    title: "Малый бизнес и кастом",
    body: "Короткие партии кастом-деталей и брендированные аксессуары с предсказуемым циклом.",
    tag: "SMB",
  },
  {
    title: "Логистика упаковки",
    body: "Ложементы, прокладки и внутренняя тароформующая геометрия под партию.",
    tag: "Pack",
  },
] as const;

export function IndustriesSection() {
  return (
    <Section
      id="industries"
      eyebrow="Отрасли и сценарии"
      title="Где FullPrint даёт максимум пользы"
      subtitle="Типовые кейсы онлайн-3D-печати: от первой детали до повторяемых поставок. Конкретный маршрут зависит от геометрии, материала и постобработки."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <article
            key={c.title}
            className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/80 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-zinc-950">{c.title}</h3>
              <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-teal-800">
                {c.tag}
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
              {c.body}
            </p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent transition group-hover:via-teal-200/80" />
          </article>
        ))}
      </div>
    </Section>
  );
}
