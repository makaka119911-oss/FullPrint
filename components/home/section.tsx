import type { ReactNode } from "react";
import { SectionHeader } from "./section-header";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** default = прозрачный фон; muted / surface / dark — ритм «слайдов» */
  variant?: "default" | "muted" | "surface" | "dark";
  /** Крупный заголовок секции */
  emphasis?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "default",
  emphasis = false,
  children,
}: SectionProps) {
  const band =
    variant === "muted"
      ? "border-y border-zinc-200/90 bg-zinc-100"
      : variant === "surface"
        ? "border-y border-zinc-200/80 bg-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.6)]"
        : variant === "dark"
          ? "border-y border-zinc-800/90 bg-zinc-950 text-zinc-50"
          : "";

  const vertical =
    variant === "dark" ? "py-20 sm:py-24 lg:py-28" : "py-16 sm:py-20 lg:py-24";

  const invert = variant === "dark";

  return (
    <section id={id} className={`scroll-mt-20 ${band} ${vertical}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          invert={invert}
          emphasis={emphasis}
        />
        {children}
      </div>
    </section>
  );
}
