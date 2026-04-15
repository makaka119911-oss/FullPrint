type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 max-w-2xl ${className}`}>
      {eyebrow ? (
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal-800">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
