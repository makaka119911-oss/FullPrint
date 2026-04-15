import { Section } from "./section";
import { FaqItem } from "./faq-item";

const faqs = [
  {
    question: "Генерация уже работает в этой версии?",
    answer:
      "Пока нет. Это фронтенд-MVP: серверная генерация изображений и моделей еще не подключена.",
  },
  {
    question: "Какие форматы будут доступны для выгрузки?",
    answer:
      "Базовые форматы: STL и 3MF. Дополнительные форматы планируются в следующих итерациях.",
  },
  {
    question: "Как исключается некорректная геометрия перед печатью?",
    answer:
      "Перед шагом 04 требуются подтверждения референса (шаг 02) и модели (шаг 03). Автоматические проверки будут добавлены отдельно.",
  },
  {
    question: "Можно использовать свой CAD или сканы?",
    answer:
      "В текущем MVP — нет. Сейчас сценарий: текст → референс → 3D-модель. Импорт внешних данных запланирован позже.",
  },
];

export function FaqSection() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="FAQ"
      subtitle="Короткие ответы по текущему состоянию продукта."
    >
      <ul className="space-y-3" role="list">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </ul>
    </Section>
  );
}
