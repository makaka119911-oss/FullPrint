import { FaqSection } from "@/components/home/faq";
import { FinalCtaSection } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero";
import { IndustriesSection } from "@/components/home/industries";
import { MaterialsStripSection } from "@/components/home/materials-strip";
import { ServicesSection } from "@/components/home/features";
import { TrustBarSection } from "@/components/home/trust-bar";
import { TrustMetricsSection } from "@/components/home/trust-metrics";
import { WorkflowSection } from "@/components/home/workflow";

const navLinkBase =
  "rounded-md px-2 py-1 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const nav = [
  {
    href: "#trust",
    label: "Дисциплина",
    active:
      "[html:has(#trust:target)_&]:bg-zinc-200 [html:has(#trust:target)_&]:text-zinc-950 [html:has(#trust:target)_&]:shadow-sm",
  },
  {
    href: "#services",
    label: "Услуги",
    active:
      "[html:has(#services:target)_&]:bg-zinc-200 [html:has(#services:target)_&]:text-zinc-950 [html:has(#services:target)_&]:shadow-sm",
  },
  {
    href: "#workflow",
    label: "Процесс",
    active:
      "[html:has(#workflow:target)_&]:bg-zinc-200 [html:has(#workflow:target)_&]:text-zinc-950 [html:has(#workflow:target)_&]:shadow-sm",
  },
  {
    href: "#materials",
    label: "Материалы",
    active:
      "[html:has(#materials:target)_&]:bg-zinc-200 [html:has(#materials:target)_&]:text-zinc-950 [html:has(#materials:target)_&]:shadow-sm",
  },
  {
    href: "#metrics",
    label: "Метрики",
    active:
      "[html:has(#metrics:target)_&]:bg-zinc-200 [html:has(#metrics:target)_&]:text-zinc-950 [html:has(#metrics:target)_&]:shadow-sm",
  },
  {
    href: "#industries",
    label: "Отрасли",
    active:
      "[html:has(#industries:target)_&]:bg-zinc-200 [html:has(#industries:target)_&]:text-zinc-950 [html:has(#industries:target)_&]:shadow-sm",
  },
  {
    href: "#faq",
    label: "FAQ",
    active:
      "[html:has(#faq:target)_&]:bg-zinc-200 [html:has(#faq:target)_&]:text-zinc-950 [html:has(#faq:target)_&]:shadow-sm",
  },
  {
    href: "#cta",
    label: "Старт",
    active:
      "[html:has(#cta:target)_&]:bg-zinc-200 [html:has(#cta:target)_&]:text-zinc-950 [html:has(#cta:target)_&]:shadow-sm",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <a
            href="#hero"
            className="rounded-md px-2 py-1 text-base font-semibold tracking-tight text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white [html:has(#hero:target)_&]:bg-zinc-200 [html:has(#hero:target)_&]:shadow-sm"
          >
            FullPrint
          </a>
          <nav className="hidden flex-wrap items-center justify-end gap-x-2 gap-y-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${navLinkBase} ${item.active}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#prompt"
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-teal-500/40 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
          >
            Загрузка
          </a>
        </div>
        <div className="min-w-0 border-t border-zinc-100 px-4 py-2 sm:px-6 lg:hidden">
          <nav className="flex gap-3 overflow-x-auto pb-1 text-xs text-zinc-600 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-md px-2 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${item.active}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <TrustBarSection />
        <ServicesSection />
        <WorkflowSection />
        <MaterialsStripSection />
        <TrustMetricsSection />
        <IndustriesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-zinc-600 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs text-zinc-500">
            FullPrint MVP · только фронтенд
          </span>
          <span>В этой версии нет API-маршрутов и серверной генерации.</span>
        </div>
      </footer>
    </div>
  );
}
