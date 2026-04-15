/**
 * Полиш: визуальное выделение строки подтверждения + hover у карточек шагов.
 */
import { Section } from "./section";

const stages = [
  {
    code: "01",
    title: "Описание детали",
    body: "Текстовый бриф: размеры, ключевые элементы, материал и технология печати (FDM, SLA, SLS). До отправки в очередь статус остается черновиком.",
    gate: "Подтверждение: запуск",
  },
  {
    code: "02",
    title: "Референс",
    body: "Изображение фиксирует форму и пропорции. Построение 3D начинается только после подтверждения референса.",
    gate: "Подтверждение: референс",
  },
  {
    code: "03",
    title: "3D-модель",
    body: "По референсу собирается твердотельная модель и проходит базовые проверки печатности: стенки, замкнутость объема, габариты платформы.",
    gate: "Подтверждение: модель",
  },
  {
    code: "04",
    title: "Выгрузка",
    body: "Файлы для слайсера: STL (binary) и 3MF с номером ревизии. Выгрузка открывается только после подтверждения модели.",
    gate: "Подтверждение: выгрузка",
  },
];

export function WorkflowSection() {
  return (
    <Section
      id="workflow"
      eyebrow="Процесс"
      title="Последовательность из 4 шагов"
      subtitle="Порядок всегда один: бриф, референс, 3D-модель, выгрузка. Каждый следующий шаг открывается после подтверждения текущего."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((stage) => (
          <article
            key={stage.code}
            className="relative rounded-xl border border-zinc-300 bg-white p-6 shadow-sm transition hover:border-zinc-400 hover:shadow-md"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-xl bg-zinc-200" />
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded border border-zinc-400 bg-zinc-50 font-mono text-xs font-semibold text-zinc-700">
                {stage.code}
              </span>
              <h3 className="text-base font-semibold text-zinc-950">
                {stage.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-700">{stage.body}</p>
            <p className="mt-4 border-t border-zinc-200 pt-3">
              <span className="inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[11px] leading-snug text-zinc-600">
                {stage.gate}
              </span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
