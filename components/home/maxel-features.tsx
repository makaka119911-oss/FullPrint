"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Box,
  Cloud,
  ImageIcon,
  MousePointerClick,
  Pencil,
  Store,
} from "lucide-react";

const items = [
  {
    title: "AI-генерация 2D",
    subtitle: "Nano Banana",
    description:
      "Текст в концепт: быстрые итерации, контроль стиля и композиции перед 3D.",
    icon: ImageIcon,
  },
  {
    title: "Конвертация в 3D",
    subtitle: "Tripo AI",
    description:
      "Переводим 2D-референс в объёмную модель с прогрессом и готовым превью.",
    icon: Box,
  },
  {
    title: "Редактирование моделей",
    subtitle: "Studio",
    description:
      "Доводите форму, масштаб и детали до печатного качества в одном потоке.",
    icon: Pencil,
  },
  {
    title: "Маркетплейс",
    subtitle: "FullPrint",
    description:
      "Публикуйте работы, находите покупателей и управляйте карточками моделей.",
    icon: Store,
  },
  {
    title: "Печать в один клик",
    subtitle: "Quote",
    description:
      "STL на сервер, метрики объёма и ориентир цены — без ручной возни с файлами.",
    icon: MousePointerClick,
  },
  {
    title: "Облачное хранение",
    subtitle: "Supabase",
    description:
      "Генерации и файлы в облаке: доступ с любого устройства и история версий.",
    icon: Cloud,
  },
] as const;

export function MaxelFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="maxel-features-heading"
      className="relative border-t border-zinc-800/60 bg-zinc-950 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/35 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
            Возможности
          </p>
          <h2
            id="maxel-features-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            Всё, что нужно для создания 3D
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">
            Единый контур: от промпта до файла, маркетплейса и печати — с акцентом на
            скорость и предсказуемый результат.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-[#8B5CF6]/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_18px_50px_-24px_rgba(139,92,246,0.35)] motion-safe:hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 text-[#8B5CF6] transition group-hover:border-[#8B5CF6]/45 group-hover:bg-[#8B5CF6]/15"
                    aria-hidden
                  >
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 text-left">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-50">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-[#8B5CF6]/90">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
