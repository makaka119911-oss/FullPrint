import { Section } from "./section";
import { FeatureCard } from "./feature-card";

const services = [
  {
    title: "Заявка и предкотировка",
    description:
      "Файл, тираж, материал и срок собираются в один комплект — основа для расчёта и согласования маршрута.",
    tag: "Quote",
  },
  {
    title: "Инженерная приёмка и DFM",
    description:
      "Разбор печатности: стенки, объём, нависания, габариты стола. Печать не начинается на непринятой геометрии.",
    tag: "DFM",
  },
  {
    title: "Ревизии без путаницы",
    description:
      "Каждый утверждённый артефакт с номером версии. Повтор заказа и претензии по качеству опираются на факты.",
    tag: "Rev",
  },
  {
    title: "Производство и ОТК",
    description:
      "Согласованный стек FDM / SLA / SLS, постобработка по регламенту, выборочный контроль перед отгрузкой.",
    tag: "QC",
  },
  {
    title: "Упаковка и отгрузка",
    description:
      "Маркировка, комплектация и документы на передачу партии. Условия доставки — в коммерческом предложении.",
    tag: "Ship",
  },
  {
    title: "Повторные запуски",
    description:
      "Профиль партии сохраняется: тиражирование с минимальными согласованиями или корректировка допусков с историей.",
    tag: "Care",
  },
] as const;

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Услуги"
      title="Что вы получаете по пути от файла до партии"
      subtitle="Ответ на вопрос «что вы для меня делаете»: не только печать, а сопровождение геометрии, версий и отгрузки."
      variant="surface"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
