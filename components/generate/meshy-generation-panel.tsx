"use client";

import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  prompt: string;
  style: string;
  aspectRatio: string;
  isLoading: boolean;
  onPromptChange: (value: string) => void;
  onStyleChange: (value: string) => void;
  onAspectRatioChange: (value: string) => void;
  onGenerate: () => void;
};

const styleOptions = [
  "Реалистичный",
  "Мультяшный",
  "Концепт-арт",
  "3D-рендер",
  "Sci-Fi",
  "Минимализм",
] as const;

export function MeshyGenerationPanel({
  prompt,
  style,
  aspectRatio,
  isLoading,
  onPromptChange,
  onStyleChange,
  onAspectRatioChange,
  onGenerate,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#12161f] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
      <div
        className="pointer-events-none absolute -top-20 left-10 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-8 right-0 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <div className="mb-5 flex items-center gap-2 text-sm text-zinc-300">
          <Sparkles className="h-4 w-4 text-indigo-300" />
          <span>Meshy-style generation panel</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="meshy-prompt" className="text-zinc-300">
              Промпт
            </Label>
            <Textarea
              id="meshy-prompt"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Опишите, что хотите создать..."
              className="min-h-40 resize-none rounded-xl border-zinc-700 bg-zinc-950/80 px-3.5 py-3 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/40"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-zinc-300">Стиль</Label>
              <Select value={style} onValueChange={onStyleChange}>
                <SelectTrigger className="h-11 rounded-xl border-zinc-700 bg-zinc-950/80 text-zinc-100 focus:ring-indigo-500/40">
                  <SelectValue placeholder="Выберите стиль" />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Соотношение</Label>
              <Select value={aspectRatio} onValueChange={onAspectRatioChange}>
                <SelectTrigger className="h-11 rounded-xl border-zinc-700 bg-zinc-950/80 text-zinc-100 focus:ring-indigo-500/40">
                  <SelectValue placeholder="Формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="9:16">9:16</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 text-zinc-950 shadow-[0_8px_24px_rgba(79,70,229,0.35)] transition hover:from-indigo-400 hover:via-indigo-300 hover:to-cyan-300"
          >
            {isLoading ? "Генерируем..." : "Сгенерировать"}
          </Button>

          {isLoading ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-200">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Генерация изображения...
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

