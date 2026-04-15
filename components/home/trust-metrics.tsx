import { Section } from "./section";
import { StatCard } from "./stat-card";

const stats = [
  {
    label: "Запусков в пилоте",
    value: "186",
    footnote: "Внутренний альфа-пилот · март-апрель 2026.",
  },
  {
    label: "Подтверждено моделей",
    value: "54",
    footnote:
      "Количество подтверждений шага 03 после операторской проверки.",
  },
  {
    label: "Подготовлено выгрузок",
    value: "41",
    footnote: "Пакеты STL / 3MF, отмеченные как готовые к выдаче.",
  },
  {
    label: "Медианное время",
    value: "23 min",
    footnote: "От брифа до шага 04 в лабораторных условиях (не SLA).",
  },
];

export function TrustMetricsSection() {
  return (
    <Section
      id="trust"
      eyebrow="Метрики"
      title="Пилотные показатели"
      subtitle="Небольшая выборка из внутреннего пилота. Позже заменится на live-метрики из реальной очереди."
      variant="muted"
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
    </Section>
  );
}
