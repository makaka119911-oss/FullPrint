"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MeshyGenerationPanel } from "@/components/generate/meshy-generation-panel";
import { PreviewPanel } from "@/components/generate/preview-panel";
import { createClient } from "@/lib/supabase/client";

type GenerateResponse = {
  generationId: string;
  imageUrl: string;
  error?: string;
};

export function GenerateWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [prompt, setPrompt] = React.useState("");
  const [style, setStyle] = React.useState("Реалистичный");
  const [aspectRatio, setAspectRatio] = React.useState("1:1");
  const [generationId, setGenerationId] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const id = searchParams.get("generationId");
    if (!id) return;

    setGenerationId(id);

    async function restore() {
      try {
        const supabase = createClient();
        const { data, error: queryError } = await supabase
          .from("generations")
          .select("image_url, prompt")
          .eq("id", id)
          .single();

        if (queryError) throw queryError;
        if (data?.image_url) setImageUrl(data.image_url);
        if (data?.prompt) setPrompt(data.prompt);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Не удалось восстановить состояние генерации",
        );
      }
    }

    restore();
  }, [searchParams]);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, style, aspectRatio }),
      });

      const data = (await response.json()) as GenerateResponse;
      if (!response.ok) {
        throw new Error(data.error ?? "Ошибка генерации");
      }

      setGenerationId(data.generationId);
      setImageUrl(data.imageUrl);

      const params = new URLSearchParams(searchParams.toString());
      params.set("generationId", data.generationId);
      router.replace(`/generate?${params.toString()}`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось сгенерировать изображение",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setImageUrl(null);
    setGenerationId(null);
    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("generationId");
    const q = params.toString();
    router.replace(q ? `/generate?${q}` : "/generate");
  }

  return (
    <>
      {error ? (
        <div className="mt-4 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <MeshyGenerationPanel
            prompt={prompt}
            style={style}
            aspectRatio={aspectRatio}
            isLoading={isLoading}
            onPromptChange={setPrompt}
            onStyleChange={setStyle}
            onAspectRatioChange={setAspectRatio}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="lg:col-span-3">
          <PreviewPanel
            imageUrl={imageUrl}
            generationId={generationId}
            isLoading={isLoading}
            onReset={handleReset}
          />
        </div>
      </div>
    </>
  );
}

