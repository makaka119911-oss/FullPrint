import { Section } from "./section";
import { StatCard } from "./stat-card";

const stats = [
  {
    label: "Заявок по регламенту",
    value: "186",
    footnote:
      "Накопленный объём обработанных запросов: меньше хаоса между обращением и очередью.",
  },
  {
    label: "Моделей после DFM",
    value: "54",
    footnote:
      "Геометрия принята до выпуска — ниже риск брака на оборудовании.",
  },
  {
    label: "Комплектов к отгрузке",
    value: "41",
    footnote:
      "Файловые пакеты, готовые к передаче по списку качества.",
  },
  {
    label: "Подготовка файла",
    value: "23 min",
    footnote:
      "Ориентир длительности типового цикла оформления без партийной постобработки.",
  },
] as const;

const benefits = [
  {
    title: "Меньше внеплановых переделок",
    text: "Контрольные точки по референсу и модели отсекают ошибки до дорогих этапов.",
  },
  {
    title: "Ясная цепочка согласований",
    text: "Одна утверждённая ревизия для заказчика и производства — меньше споров о составе работ.",
  },
  {
    title: "Повторяемость партий",
    text: "Профиль партии и версии артефактов сохраняются — следующий тираж стартует быстрее.",
  },
] as const;

export function TrustMetricsSection() {
  return (
    <Section
      id="metrics"
      eyebrow="Эффект для заказчика"
      title="Что выигрывает бизнес от регламентированного запуска"
      subtitle="Сначала — коммерческий смысл процесса. Цифры ниже не позиционируются как показатели рынка: это внутренние ориентиры нагрузки на контур FullPrint."
      variant="surface"
    >
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:border-teal-500/30 hover:shadow-md"
          >
            <div className="absolute left-0 top-4 h-10 w-1 rounded-r bg-teal-600/90" />
            <p className="pl-4 text-sm font-semibold text-zinc-950">{b.title}</p>
            <p className="mt-2 pl-4 text-sm leading-relaxed text-zinc-600">
              {b.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-6 sm:p-8">
        <p className="max-w-2xl text-xs font-medium leading-relaxed text-zinc-600">
          <span className="font-semibold uppercase tracking-wider text-zinc-500">
            Справочные ориентиры
          </span>
          — приблизительные внутренние метрики без сравнения с отраслью. Не
          заменяют сроки и условия из вашего коммерческого предложения.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              footnote={s.footnote}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
