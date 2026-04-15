import { Section } from "./section";

const stages = [
  {
    code: "01",
    title: "Задача и комплект входа",
    body: "Модель или ТЗ: габариты, допуски, материал, технология. Фиксируем исходное требование до расчёта.",
    gate: "Контрольная точка: допуск к расчёту",
  },
  {
    code: "02",
    title: "Референс формы",
    body: "Согласование пропорций и ключевых элементов до моделирования — меньше расхождений с ожиданием.",
    gate: "Контрольная точка: утверждение референса",
  },
  {
    code: "03",
    title: "3D-модель и DFM",
    body: "Проверка печатности и закрытие замечаний до выгрузки и постановки в очередь.",
    gate: "Контрольная точка: подпись модели",
  },
  {
    code: "04",
    title: "Выгрузка и производство",
    body: "STL / 3MF с ревизией, печать, постобработка и отгрузка по согласованному регламенту.",
    gate: "Контрольная точка: выпуск к отгрузке",
  },
] as const;

export function WorkflowSection() {
  return (
    <Section
      id="workflow"
      eyebrow="Процесс"
      title="Как уходит файл в производство"
      subtitle="Ответ на «как это работает»: четыре шага с контрольными точками — от комплекта документов до готовой партии."
      variant="muted"
      emphasis
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-4 xl:gap-5">
        {stages.map((stage, i) => (
          <article
            key={stage.code}
            className="relative min-w-[min(100%,19.5rem)] shrink-0 snap-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-teal-500/35 hover:shadow-lg sm:min-w-0"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-zinc-700 via-teal-600 to-teal-400" />
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 font-mono text-sm font-semibold text-teal-900">
                {stage.code}
              </span>
              {i < stages.length - 1 ? (
                <span
                  className="hidden font-mono text-[10px] uppercase tracking-wider text-zinc-400 sm:inline"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-zinc-950">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {stage.body}
            </p>
            <div className="mt-5 border-t border-zinc-100 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Контрольная точка
              </p>
              <p className="mt-1.5 rounded-lg border border-teal-200/90 bg-teal-50/90 px-3 py-2 text-sm font-medium leading-snug text-teal-950">
                {stage.gate}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
