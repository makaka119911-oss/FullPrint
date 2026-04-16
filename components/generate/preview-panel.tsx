"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  imageUrl: string | null;
  generationId: string | null;
  isLoading: boolean;
  onReset: () => void;
};

export function PreviewPanel({
  imageUrl,
  generationId,
  isLoading,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-5 shadow-xl">
      <h2 className="text-lg font-semibold">Превью</h2>
      <p className="mt-1 text-sm text-zinc-400">Результат генерации в реальном времени.</p>

      <div className="mt-6">
        {!imageUrl && !isLoading ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 text-zinc-500">
            <ImageIcon className="mb-3 h-10 w-10" />
            <p className="text-sm">Здесь появится результат</p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="min-h-[420px] animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/70" />
        ) : null}

        {imageUrl && !isLoading ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Сгенерированное изображение"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" className="rounded-full">
                <a href={imageUrl} download target="_blank" rel="noreferrer">
                  Сохранить
                </a>
              </Button>
              <Button asChild className="rounded-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200">
                <Link href={generationId ? `/studio?generationId=${generationId}` : "/studio"}>
                  Конвертировать в 3D
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full" onClick={onReset}>
                Сгенерировать ещё
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

