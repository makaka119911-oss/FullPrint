import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type MarketplaceModelCard = {
  id: string;
  title: string;
  author: string;
  price: string;
  formats: string;
  polycount: string;
  imageSrc: string;
};

type Props = {
  model: MarketplaceModelCard;
};

export function ModelCard({ model }: Props) {
  return (
    <Card className="group overflow-hidden border-zinc-800/80 bg-zinc-950/40 transition hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-zinc-800/70 bg-zinc-900/40">
        <Image
          src={model.imageSrc}
          alt={model.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
      </div>

      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {model.title}
        </CardTitle>
        <p className="text-xs text-zinc-400">by {model.author}</p>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="flex flex-wrap gap-2 text-[11px] text-zinc-300">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2 py-1">
            {model.formats}
          </span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2 py-1">
            {model.polycount}
          </span>
        </div>
        <p className="text-lg font-semibold tracking-tight text-zinc-50">
          {model.price}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-zinc-800/70 bg-zinc-950/30 px-4 py-3">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href={`/studio?generationId=demo-${model.id}`}>Превью</Link>
        </Button>
        <Button size="sm" className="rounded-full">
          Купить
        </Button>
      </CardFooter>
    </Card>
  );
}
