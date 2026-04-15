import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  tag?: string;
  children?: ReactNode;
};

export function FeatureCard({
  title,
  description,
  tag,
  children,
}: FeatureCardProps) {
  return (
    <article className="flex min-h-[220px] h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-500/35 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-zinc-950">
          {title}
        </h3>
        {tag ? (
          <span className="shrink-0 rounded-md border border-teal-200/80 bg-teal-50/80 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-teal-900">
            {tag}
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      {children}
    </article>
  );
}
