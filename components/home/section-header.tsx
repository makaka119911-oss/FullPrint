type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Тёмный фон секции (контрастная типографика) */
  invert?: boolean;
  /** Крупнее заголовок — «слайд» презентации */
  emphasis?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
  invert = false,
  emphasis = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 max-w-3xl ${className}`}>
      {eyebrow ? (
        <p
          className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${invert ? "text-teal-300/90" : "text-teal-800"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-semibold tracking-tight ${emphasis ? "text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-tight" : "text-2xl sm:text-3xl"} ${invert ? "text-white" : "text-zinc-950"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-sm leading-relaxed sm:text-base ${invert ? "text-zinc-400" : "text-zinc-600"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
