"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const WeisdeviceHeroBackground = dynamic(
  () =>
    import("@/components/home/weisdevice-hero-background").then(
      (m) => m.WeisdeviceHeroBackground,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0 bg-zinc-950"
        aria-hidden
      />
    ),
  },
);

export function MaxelHero() {
  return (
    <section id="start" className="relative overflow-hidden py-20 sm:py-28">
      <WeisdeviceHeroBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-200/80">
            AI · 3D · Print-ready
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            AI 3D Генератор — от идеи до печати за минуты
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
            Опишите задачу, получите 3D-модель и подготовленный к печати результат
            с понятным следующим шагом.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-7" asChild>
              <Link href="/generate">Начать генерацию</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-zinc-700/80 bg-zinc-950/30 px-7 text-zinc-50 hover:bg-zinc-950/50"
              asChild
            >
              <Link href="/marketplace">Маркетплейс</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

