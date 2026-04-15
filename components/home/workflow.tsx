import { Section } from "./section";

const stages = [
  {
    code: "01",
    title: "Бриф и файл",
    body: "Загрузка модели или текстовое ТЗ: размеры, допуски, материал и технология (FDM, SLA, SLS). Черновик фиксируется до запуска в очередь.",
    gate: "Gate: старт производства",
  },
  {
    code: "02",
    title: "Референс формы",
    body: "Визуальное подтверждение пропорций и ключевых элементов. Моделирование не начинается без принятого референса.",
    gate: "Gate: референс",
  },
  {
    code: "03",
    title: "3D-модель и DFM",
    body: "Твердотельная модель проходит проверки печатности: стенки, объём, габариты, нависания. Замечания закрываются до выпуска.",
    gate: "Gate: модель",
  },
  {
    code: "04",
    title: "Выгрузка и печать",
    body: "STL и 3MF с номером ревизии, постановка в печать, постобработка и отгрузка по согласованному SLA.",
    gate: "Gate: выгрузка",
  },
] as const;

export function WorkflowSection() {
  return (
    <Section
      id="workflow"
      eyebrow="Процесс"
      title="Как это работает"
      subtitle="Четыре последовательных шага с жёсткими точками контроля. Следующий этап открывается только после подтверждения текущего — меньше сюрпризов на столе и при сборке."
      variant="muted"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((stage) => (
          <article
            key={stage.code}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 opacity-90 transition group-hover:opacity-100" />
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 font-mono text-xs font-semibold text-teal-900">
                {stage.code}
              </span>
              <h3 className="text-base font-semibold text-zinc-950">
                {stage.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {stage.body}
            </p>
            <p className="mt-4 border-t border-zinc-100 pt-3">
              <span className="inline-flex rounded-lg border border-teal-200/80 bg-teal-50/80 px-2.5 py-1 font-mono text-[11px] leading-snug text-teal-900">
                {stage.gate}
              </span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
