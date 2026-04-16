"use client";

import { Loader2 } from "lucide-react";

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

export function GenerationPanel({
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
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/50 p-5 shadow-xl">
      <h2 className="text-lg font-semibold">Параметры генерации</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Уточните идею, стиль и формат изображения.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="prompt">Промпт</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Опишите, что хотите создать..."
            className="min-h-36 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <Label>Стиль</Label>
          <Select value={style} onValueChange={onStyleChange}>
            <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-100">
              <SelectValue placeholder="Выберите стиль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Реалистичный">Реалистичный</SelectItem>
              <SelectItem value="Мультяшный">Мультяшный</SelectItem>
              <SelectItem value="Концепт-арт">Концепт-арт</SelectItem>
              <SelectItem value="3D-рендер">3D-рендер</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Соотношение сторон</Label>
          <Select value={aspectRatio} onValueChange={onAspectRatioChange}>
            <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-100">
              <SelectValue placeholder="Выберите формат" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">1:1</SelectItem>
              <SelectItem value="16:9">16:9</SelectItem>
              <SelectItem value="9:16">9:16</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full rounded-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
        >
          {isLoading ? "Генерируем..." : "Сгенерировать"}
        </Button>

        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Генерация изображения...
          </div>
        ) : null}
      </div>
    </div>
  );
}

