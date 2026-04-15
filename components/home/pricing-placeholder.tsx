import { Section } from "./section";

const tiers = [
  {
    name: "Базовый",
    price: "Скоро",
    detail:
      "1 рабочее место, ограничение на задания в месяц, поддержка по почте. Для первичной проверки процесса.",
  },
  {
    name: "Команда",
    price: "Скоро",
    detail:
      "Общая очередь заданий, приоритет на проверку шага 03, настраиваемое окно хранения выгрузок.",
  },
  {
    name: "Производство",
    price: "Скоро",
    detail:
      "Выделенная пропускная способность, целевые сроки обработки, интеграции ERP/webhook после нагрузочного этапа.",
  },
];

export function PricingPlaceholderSection() {
  return (
    <Section
      id="pricing"
      eyebrow="Тарифы"
      title="Модель подключения"
      subtitle="Финальные цены появятся после пилота. Различия по объему заданий и уровню проверки."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className="rounded-lg border border-zinc-200 bg-white p-6"
          >
            <h3 className="text-base font-semibold text-zinc-950">{tier.name}</h3>
            <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-zinc-950">
              {tier.price}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{tier.detail}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
