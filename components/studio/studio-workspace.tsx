"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { ConversionPanel } from "@/components/studio/conversion-panel";
import { ModelViewer } from "@/components/studio/model-viewer";

type GenerationRecord = {
  id: string;
  image_url: string | null;
  model_url: string | null;
  prompt: string;
};

type ApiResponse = {
  modelUrl: string | null;
  format: string;
  glbUrl: string | null;
  stlUrl: string | null;
  error?: string;
};

function extractStyle(prompt: string) {
  const match = prompt.match(/Style:\s*(.+)$/im);
  return match?.[1]?.trim() ?? "Не указан";
}

export function StudioWorkspace() {
  const searchParams = useSearchParams();
  const generationId = searchParams.get("generationId");

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [generation, setGeneration] = React.useState<GenerationRecord | null>(null);
  const [statusText, setStatusText] = React.useState("Ожидание запуска конвертации");
  const [phase, setPhase] = React.useState<
    "idle" | "sending" | "processing" | "done" | "error"
  >("idle");
  const [modelUrl, setModelUrl] = React.useState<string | null>(null);
  const [glbUrl, setGlbUrl] = React.useState<string | null>(null);
  const [stlUrl, setStlUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadGeneration() {
      if (!generationId) {
        setError("Не указан generationId в URL");
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        if (!supabase) {
          setError(SUPABASE_CLIENT_CONFIG_ERROR);
          return;
        }
        const { data, error: queryError } = await supabase
          .from("generations")
          .select("id, image_url, model_url, prompt")
          .eq("id", generationId)
          .single();

        if (queryError) throw queryError;

        const row = data as GenerationRecord;
        setGeneration(row);

        if (row.model_url) {
          setModelUrl(row.model_url);
          const isStl = row.model_url.toLowerCase().endsWith(".stl");
          setStlUrl(isStl ? row.model_url : null);
          setGlbUrl(!isStl ? row.model_url : null);
          setPhase("done");
          setStatusText("Готово");
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Не удалось загрузить генерацию",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGeneration();
  }, [generationId]);

  async function handleGenerate3D() {
    if (!generation?.image_url || !generationId) return;

    try {
      setPhase("sending");
      setStatusText("Отправка...");
      await new Promise((resolve) => setTimeout(resolve, 250));
      setPhase("processing");
      setStatusText("Генерация 3D... (может занять 1-2 минуты)");

      const res = await fetch("/api/generate-3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: generation.image_url,
          generationId,
        }),
      });

      const payload = (await res.json()) as ApiResponse;
      if (!res.ok) {
        throw new Error(payload.error ?? "Не удалось сгенерировать 3D");
      }

      setModelUrl(payload.modelUrl);
      setGlbUrl(payload.glbUrl);
      setStlUrl(payload.stlUrl);
      setPhase("done");
      setStatusText("Готово");
    } catch (e) {
      setPhase("error");
      setStatusText(
        e instanceof Error ? e.message : "Ошибка во время конвертации",
      );
    }
  }

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-6 text-sm text-zinc-400">
        Загружаем студию...
      </div>
    );
  }

  if (error || !generation) {
    return (
      <div className="mt-8 rounded-2xl border border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">
        {error ?? "Генерация не найдена"}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <ConversionPanel
          generationId={generation.id}
          imageUrl={generation.image_url}
          prompt={generation.prompt}
          style={extractStyle(generation.prompt)}
          statusText={statusText}
          phase={phase}
          modelUrl={modelUrl}
          glbUrl={glbUrl}
          stlUrl={stlUrl}
          onGenerate={handleGenerate3D}
        />
      </div>
      <div className="lg:col-span-3">
        <ModelViewer modelUrl={modelUrl} />
      </div>
    </div>
  );
}

