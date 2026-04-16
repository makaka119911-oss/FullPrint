import { Suspense } from "react";

import { StudioWorkspace } from "@/components/studio/studio-workspace";

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
          FullPrint AI · studio
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Конвертация 2D в 3D
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Используйте выбранное 2D-изображение для генерации 3D-модели и
          просмотра результата в интерактивном вьювере.
        </p>

        <Suspense
          fallback={
            <div className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-6 text-sm text-zinc-400">
              Загружаем студию...
            </div>
          }
        >
          <StudioWorkspace />
        </Suspense>
      </div>
    </div>
  );
}

