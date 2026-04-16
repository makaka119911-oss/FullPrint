"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Box, ImageIcon, MessageSquareText, Rocket } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Опишите идею",
    description: "Промпт, референсы и ограничения — что важно для конечной модели.",
    icon: MessageSquareText,
  },
  {
    step: 2,
    title: "AI генерирует 2D-концепт",
    description: "Быстрые варианты и правки, пока визуал не совпадёт с задумкой.",
    icon: ImageIcon,
  },
  {
    step: 3,
    title: "Конвертация в 3D-модель",
    description: "Объём, превью и ссылки на файлы — готово к студии или печати.",
    icon: Box,
  },
  {
    step: 4,
    title: "Печать или продажа на маркетплейсе",
    description: "Котировка печати или публикация карточки — следующий шаг на выбор.",
    icon: Rocket,
  },
] as const;

export function MaxelHowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="maxel-how-heading"
      className="relative border-t border-zinc-800/60 bg-zinc-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
            Как это работает
          </p>
          <h2
            id="maxel-how-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            От идеи до печати за 4 шага
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">
            Линейный сценарий без переключения контекста: каждый шаг замыкается
            понятным артефактом.
          </p>
        </motion.div>

        {/* Mobile / tablet: vertical */}
        <ol className="relative mx-auto mt-14 max-w-xl lg:hidden">
          <div
            className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-[#8B5CF6]/50 via-zinc-700 to-zinc-800"
            aria-hidden
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-5 pb-12 last:pb-0"
            >
              <div className="relative z-10 flex shrink-0 flex-col items-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8B5CF6]/35 bg-zinc-950 text-sm font-semibold text-[#8B5CF6] shadow-[0_0_20px_-4px_rgba(139,92,246,0.45)]">
                  {s.step}
                </span>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <s.icon
                    className="h-4 w-4 text-[#8B5CF6]/80"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold text-zinc-50">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Desktop: horizontal */}
        <ol className="relative mt-16 hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-[22px] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"
            aria-hidden
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#8B5CF6]/35 bg-zinc-950 text-sm font-semibold text-[#8B5CF6] shadow-[0_0_24px_-6px_rgba(139,92,246,0.5)]">
                {s.step}
              </span>
              <div className="mt-6 flex flex-col items-center gap-2">
                <s.icon className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.75} aria-hidden />
                <h3 className="text-base font-semibold tracking-tight text-zinc-50">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
