"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePreview } from "@/components/studio/image-preview";

type Props = {
  generationId: string;
  imageUrl: string | null;
  prompt: string;
  style: string;
  statusText: string;
  phase: "idle" | "sending" | "processing" | "done" | "error";
  modelUrl: string | null;
  glbUrl: string | null;
  stlUrl: string | null;
  onGenerate: () => void;
};

export function ConversionPanel({
  generationId,
  imageUrl,
  prompt,
  style,
  statusText,
  phase,
  modelUrl,
  glbUrl,
  stlUrl,
  onGenerate,
}: Props) {
  const isBusy = phase === "sending" || phase === "processing";
  const isDone = phase === "done" && !!modelUrl;
  const step = phase === "idle" ? 0 : phase === "sending" ? 1 : phase === "processing" ? 2 : 3;

  return (
    <Card className="border-zinc-800 bg-[#121822] text-zinc-100 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
      <CardHeader>
        <CardTitle>Конвертация 2D -&gt; 3D</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <ImagePreview imageUrl={imageUrl} />

        <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/60 p-3 text-sm">
          <p className="text-zinc-300">
            <span className="text-zinc-400">Стиль:</span> {style || "Не указан"}
          </p>
          <p className="text-zinc-300">
            <span className="text-zinc-400">Промпт:</span> {prompt || "Не указан"}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
            <span>Прогресс</span>
            <span>{step}/3</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-800">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300">
            {phase === "done" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : isBusy ? (
              <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
            ) : (
              <UploadCloud className="h-4 w-4 text-zinc-500" />
            )}
            {statusText}
          </div>
        </div>

        <Button
          onClick={onGenerate}
          disabled={isBusy || !imageUrl}
          className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-zinc-950 hover:from-sky-400 hover:to-cyan-300"
        >
          Сгенерировать 3D-модель
        </Button>

        {isDone ? (
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="secondary"
              className="rounded-xl bg-zinc-200 text-zinc-950 hover:bg-zinc-300"
              disabled={!stlUrl}
            >
              <a href={stlUrl ?? "#"} download target="_blank" rel="noreferrer">
                Скачать STL
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="rounded-xl bg-zinc-200 text-zinc-950 hover:bg-zinc-300"
              disabled={!glbUrl}
            >
              <a href={glbUrl ?? "#"} download target="_blank" rel="noreferrer">
                Скачать GLB
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={modelUrl}>Редактировать</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/marketplace">На маркетплейс</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={`/print?modelId=${generationId}`}>На печать</Link>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

