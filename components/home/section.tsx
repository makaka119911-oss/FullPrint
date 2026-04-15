import type { ReactNode } from "react";
import { SectionHeader } from "./section-header";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** muted = light gray band for alternating rhythm */
  variant?: "default" | "muted";
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "default",
  children,
}: SectionProps) {
  const band =
    variant === "muted" ? "bg-zinc-100 border-y border-zinc-200" : "";

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 ${band}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
