/**
 * План точечного UI-полиша (без смены структуры секций):
 * 1) Навигация: активный пункт по :target (якорь) + focus-ring в стиле zinc.
 * 2) Логотип: то же активное состояние при #hero.
 * 3) Мобильная навигация и CTA «К форме»: согласованные hover/focus.
 * 4) Остальное: микроиерархия и hover в карточках шагов, метрик, FAQ, hero, workspace, CTA-блоке
 *    (см. комментарии в соответствующих компонентах).
 */
import { CoreCapabilitiesSection } from "@/components/home/features";
import { FaqSection } from "@/components/home/faq";
import { FinalCtaSection } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero";
import { PreviewWorkspaceSection } from "@/components/home/preview-placeholder";
import { PricingPlaceholderSection } from "@/components/home/pricing-placeholder";
import { TrustMetricsSection } from "@/components/home/trust-metrics";
import { WorkflowSection } from "@/components/home/workflow";

const navLinkBase =
  "rounded-md px-2 py-1 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const nav = [
  {
    href: "#workflow",
    label: "Процесс",
    active:
      "[html:has(#workflow:target)_&]:bg-zinc-200 [html:has(#workflow:target)_&]:text-zinc-950 [html:has(#workflow:target)_&]:shadow-sm",
  },
  {
    href: "#capabilities",
    label: "Возможности",
    active:
      "[html:has(#capabilities:target)_&]:bg-zinc-200 [html:has(#capabilities:target)_&]:text-zinc-950 [html:has(#capabilities:target)_&]:shadow-sm",
  },
  {
    href: "#workspace",
    label: "Рабочая зона",
    active:
      "[html:has(#workspace:target)_&]:bg-zinc-200 [html:has(#workspace:target)_&]:text-zinc-950 [html:has(#workspace:target)_&]:shadow-sm",
  },
  {
    href: "#trust",
    label: "Метрики",
    active:
      "[html:has(#trust:target)_&]:bg-zinc-200 [html:has(#trust:target)_&]:text-zinc-950 [html:has(#trust:target)_&]:shadow-sm",
  },
  {
    href: "#pricing",
    label: "Тарифы",
    active:
      "[html:has(#pricing:target)_&]:bg-zinc-200 [html:has(#pricing:target)_&]:text-zinc-950 [html:has(#pricing:target)_&]:shadow-sm",
  },
  {
    href: "#faq",
    label: "FAQ",
    active:
      "[html:has(#faq:target)_&]:bg-zinc-200 [html:has(#faq:target)_&]:text-zinc-950 [html:has(#faq:target)_&]:shadow-sm",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-300/80 bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
          <a
            href="#hero"
            className={`rounded-md px-2 py-1 text-base font-semibold tracking-tight text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white [html:has(#hero:target)_&]:bg-zinc-200 [html:has(#hero:target)_&]:shadow-sm`}
          >
            FullPrint
          </a>
          <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-1 md:flex">
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
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
          >
            К форме
          </a>
        </div>
        <div className="min-w-0 border-t border-zinc-100 px-6 py-2 md:hidden">
          <nav className="flex gap-4 overflow-x-auto pb-1 text-xs text-zinc-600">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded px-1.5 py-1 text-xs text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${item.active}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <WorkflowSection />
        <CoreCapabilitiesSection />
        <PreviewWorkspaceSection />
        <TrustMetricsSection />
        <PricingPlaceholderSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <footer className="border-t border-zinc-300 bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs text-zinc-500">
            FullPrint MVP · только фронтенд
          </span>
          <span>В этой версии нет API-маршрутов и серверной генерации.</span>
        </div>
      </footer>
    </div>
  );
}
