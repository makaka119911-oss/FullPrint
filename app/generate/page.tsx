import { Suspense } from "react";

import { GenerateWorkspace } from "@/components/generate/generate-workspace";

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
          FullPrint AI · image generation
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Генерация 2D-изображений
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Создайте концепт-изображение через AI, затем переходите к конвертации в
          3D.
        </p>
        <Suspense
          fallback={
            <div className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-6 text-sm text-zinc-400">
              Загружаем интерфейс генерации...
            </div>
          }
        >
          <GenerateWorkspace />
        </Suspense>
      </div>
    </div>
  );
}

