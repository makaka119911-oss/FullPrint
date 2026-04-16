import { Suspense } from "react";
import Link from "next/link";

import { PrintWorkspace } from "@/components/print/print-workspace";
import { Button } from "@/components/ui/button";

export default function PrintPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
              Print · JLC-inspired configurator
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Конфигуратор печати
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400">
              Выберите материал и режимы, получите демо-оценку и зафиксируйте параметры
              перед отправкой в производственный контур.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full border-zinc-700">
              <Link href="/studio">Назад в студию</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/marketplace">Маркетплейс</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-6 text-sm text-zinc-400">
              Загружаем конфигуратор...
            </div>
          }
        >
          <PrintWorkspace />
        </Suspense>
      </div>
    </div>
  );
}
