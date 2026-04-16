"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function MaxelCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="cta"
      aria-labelledby="maxel-cta-heading"
      className="relative border-t border-zinc-800/60 bg-zinc-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/[0.12] via-zinc-950/90 to-zinc-950 px-6 py-14 text-center shadow-[0_0_0_1px_rgba(139,92,246,0.08),0_24px_80px_-32px_rgba(139,92,246,0.45)] sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#8B5CF6]/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-[#8B5CF6]/15 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-300/90">
              Старт
            </p>
            <h2
              id="maxel-cta-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Готовы создать свою первую 3D-модель?
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-300 sm:text-base">
              Подключите промпт, получите 2D, затем 3D — и сразу перейдите к печати или
              публикации на маркетплейсе.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full border-0 bg-[#8B5CF6] px-8 text-white shadow-lg shadow-[#8B5CF6]/30 transition hover:bg-[#7c3aed] hover:shadow-[#8B5CF6]/40"
                asChild
              >
                <Link href="/generate">Начать бесплатно</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-zinc-600/80 bg-zinc-950/40 px-8 text-zinc-50 backdrop-blur-sm hover:border-[#8B5CF6]/40 hover:bg-zinc-900/60"
                asChild
              >
                <Link href="/marketplace">Маркетплейс</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
