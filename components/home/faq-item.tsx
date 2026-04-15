/**
 * Полиш: микроиерархия вопрос/ответ + спокойный hover/focus у карточки.
 */
type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  const headingId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <li className="rounded-lg border border-zinc-300 bg-white p-6 shadow-sm transition hover:border-zinc-400 hover:shadow-md">
      <h3
        id={headingId}
        className="text-base font-semibold tracking-tight text-zinc-950"
      >
        {question}
      </h3>
      <p
        className="mt-3 text-sm leading-7 text-zinc-600"
        aria-labelledby={headingId}
      >
        {answer}
      </p>
    </li>
  );
}
