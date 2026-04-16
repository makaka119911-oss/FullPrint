"use client";

type Props = {
  imageUrl: string | null;
};

export function ImagePreview({ imageUrl }: Props) {
  if (!imageUrl) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 text-sm text-zinc-500">
        Изображение не найдено
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Исходное 2D-изображение"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

