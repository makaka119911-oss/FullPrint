import { Section } from "./section";
import { FeatureCard } from "./feature-card";

const capabilities = [
  {
    title: "Статусы задания",
    description:
      "У каждого шага фиксированный статус: черновик, в очереди, на проверке, заблокировано, выпущено. Переход возможен только после подтверждения предыдущего артефакта.",
    tag: "Статус",
  },
  {
    title: "Критерии геометрии",
    description:
      "Проверки по чек-листу: замкнутость объема, минимальная толщина стенки, ограничения нависаний и соответствие габаритов столу печати.",
    tag: "QC",
  },
  {
    title: "Ревизии артефактов",
    description:
      "Бриф, референс, модель и итоговые файлы получают неизменяемые идентификаторы — можно отследить, что именно ушло в производство.",
    tag: "Трассировка",
  },
  {
    title: "Пакет выгрузки",
    description:
      "Базовый набор: STL (binary) и 3MF. В карточке задания — единицы измерения и краткая производственная заметка.",
    tag: "Файлы",
  },
];

export function CoreCapabilitiesSection() {
  return (
    <Section
      id="capabilities"
      eyebrow="Система"
      title="Ключевые возможности"
      subtitle="Продуктовая логика для производственного контура: подтверждения, статусы и управляемая выгрузка."
      variant="muted"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map((c) => (
          <FeatureCard
            key={c.title}
            title={c.title}
            description={c.description}
            tag={c.tag}
          />
        ))}
      </div>
    </Section>
  );
}
