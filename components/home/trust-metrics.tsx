import { Section } from "./section";
import { StatCard } from "./stat-card";

const stats = [
  {
    label: "Запусков в пилоте",
    value: "186",
    footnote: "Внутренний альфа-пилот · март–апрель 2026.",
  },
  {
    label: "Подтверждено моделей",
    value: "54",
    footnote: "Шаг 03 после операторской проверки геометрии.",
  },
  {
    label: "Готовых выгрузок",
    value: "41",
    footnote: "Пакеты STL / 3MF, отмеченные как готовые к отгрузке.",
  },
  {
    label: "Медиана цикла",
    value: "23 min",
    footnote: "От брифа до шага 04 в лабораторных условиях (не SLA).",
  },
] as const;

const benefits = [
  {
    title: "Меньше переделок",
    text: "Gates на референсе и модели отсекают ошибки до расхода материала и времени станка.",
  },
  {
    title: "Предсказуемая логистика",
    text: "Сроки бьются из очереди и постобработки; повтор партии копирует проверенный профиль.",
  },
  {
    title: "Трассируемость",
    text: "Каждый артефакт с идентификатором — понятно, что согласовано и что уехало заказчику.",
  },
] as const;

export function TrustMetricsSection() {
  return (
    <Section
      id="metrics"
      eyebrow="Метрики и выгоды"
      title="Цифры пилота и практический эффект"
      subtitle="Показатели из внутреннего контура; публичная аналитика появится вместе с бэкендом очереди. Ниже — зачем бизнесу такой процесс, а не только «печать по файлу»."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            footnote={s.footnote}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-sm transition duration-300 hover:border-teal-500/25 hover:shadow-md"
          >
            <p className="text-sm font-semibold text-zinc-950">{b.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
