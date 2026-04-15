import { Section } from "./section";
import { FeatureCard } from "./feature-card";

const services = [
  {
    title: "Онлайн-котировка",
    description:
      "Загрузка 3D-модели и параметры партии превращаются в предварительную оценку: материал, технология, постобработка и ориентир по срокам.",
    tag: "Quote",
  },
  {
    title: "Инженерная приёмка",
    description:
      "Проверка на печатность: толщины стенок, замкнутый объём, нависания, габариты стола. Замечания возвращаются до постановки в очередь.",
    tag: "DFM",
  },
  {
    title: "Управление ревизиями",
    description:
      "Бриф, референс, модель и выгрузка получают неизменяемые идентификаторы — ясно, что ушло в производство и что принял заказчик.",
    tag: "Rev",
  },
  {
    title: "Производство и контроль",
    description:
      "Согласованный стек FDM / SLA / SLS, постобработка по чек-листу, визуальный контроль ключевых зон перед отгрузкой.",
    tag: "QC",
  },
  {
    title: "Упаковка и отгрузка",
    description:
      "Защитная упаковка, маркировка партии, документы на отгрузку. Трекинг доставки — в планах интеграции с курьерскими сервисами.",
    tag: "Ship",
  },
  {
    title: "Сопровождение партии",
    description:
      "Повтор заказа по сохранённому профилю, мелкие доработки допусков, консультация по смене материала без потери трассируемости.",
    tag: "Care",
  },
] as const;

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Услуги"
      title="Возможности сервиса"
      subtitle="Полный цикл, который ожидают от современной платформы 3D-печати: от мгновенного ориентира до отгрузки готовых деталей."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <FeatureCard
            key={s.title}
            title={s.title}
            description={s.description}
            tag={s.tag}
          />
        ))}
      </div>
    </Section>
  );
}

/** @deprecated Используйте ServicesSection */
export const CoreCapabilitiesSection = ServicesSection;
