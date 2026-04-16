"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  modelId: string | null;
  estimate: string;
  fileName: string | null;
  metrics: {
    triangles: number;
    volumeMm3: number;
    sizeMm: { x: number; y: number; z: number };
  } | null;
  jobId: string | null;
  isQuoting: boolean;
  error: string | null;
};

export function PrintSummaryCard({
  modelId,
  estimate,
  fileName,
  metrics,
  jobId,
  isQuoting,
  error,
}: Props) {
  return (
    <Card className="border-zinc-800 bg-[#121822] text-zinc-50 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
      <CardHeader>
        <CardTitle>Сводка</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-zinc-300">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="text-xs text-zinc-400">Model ID</p>
          <p className="mt-1 font-mono text-sm text-zinc-100">
            {modelId ?? "не указан"}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="text-xs text-zinc-400">Файл</p>
          <p className="mt-1 font-mono text-sm text-zinc-100">
            {fileName ?? "STL не загружен"}
          </p>
        </div>

        {metrics ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
            <p className="text-xs text-zinc-400">Геометрия (STL)</p>
            <div className="mt-2 space-y-1 text-xs text-zinc-300">
              <p>Треугольники: {Math.round(metrics.triangles).toLocaleString("ru-RU")}</p>
              <p>Объём: {metrics.volumeMm3.toFixed(0)} мм³</p>
              <p>
                Габариты: {metrics.sizeMm.x.toFixed(1)} × {metrics.sizeMm.y.toFixed(1)} ×{" "}
                {metrics.sizeMm.z.toFixed(1)} мм
              </p>
            </div>
          </div>
        ) : null}

        {jobId ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
            <p className="text-xs text-zinc-400">Print job</p>
            <p className="mt-1 font-mono text-sm text-zinc-100">{jobId}</p>
          </div>
        ) : null}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="text-xs text-zinc-400">Ориентировочная стоимость</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
            {estimate}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Оценка считается от объёма STL + выбранных параметров печати, затем
            сохраняется как `print_jobs` в Supabase.
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-zinc-950 hover:from-sky-400 hover:to-cyan-300"
            disabled={!metrics || isQuoting}
          >
            {isQuoting ? "Считаем..." : "Отправить в печать"}
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl border-zinc-700" disabled>
            Сохранить пресет
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
