type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
};

export function FaqItem({ id, question, answer }: FaqItemProps) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:border-teal-500/25 hover:shadow-md">
      <h3
        id={id}
        className="text-base font-semibold tracking-tight text-zinc-950"
      >
        {question}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed text-zinc-600"
        aria-labelledby={id}
      >
        {answer}
      </p>
    </li>
  );
}
