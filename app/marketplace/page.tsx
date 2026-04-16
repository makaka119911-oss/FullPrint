import Link from "next/link";

import type { MarketplaceModelCard } from "@/components/marketplace/model-card";
import { ModelGrid } from "@/components/marketplace/model-grid";
import { Button } from "@/components/ui/button";

const demoModels: MarketplaceModelCard[] = [
  {
    id: "1",
    title: "Hard-surface drone concept — print-ready shell",
    author: "FullPrint Studio",
    price: "$12",
    formats: "STL · 3MF",
    polycount: "~185k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Mechanical hinge module — parametric kit",
    author: "FullPrint Studio",
    price: "$9",
    formats: "STEP · STL",
    polycount: "~92k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Organic vase — high-detail sculpt",
    author: "FullPrint Studio",
    price: "$15",
    formats: "OBJ · STL",
    polycount: "~240k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    title: "Miniature character — supports-friendly pose",
    author: "FullPrint Studio",
    price: "$18",
    formats: "STL",
    polycount: "~310k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "5",
    title: "Architectural maquette — modular blocks",
    author: "FullPrint Studio",
    price: "$22",
    formats: "3MF · STL",
    polycount: "~140k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    title: "Prop weapon — split for FDM printing",
    author: "FullPrint Studio",
    price: "$14",
    formats: "STL",
    polycount: "~210k tris",
    imageSrc:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
              Marketplace · CGTrader-inspired grid
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Модели для печати и пайплайна
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400">
              Карточная сетка в стиле маркетплейса: превью, метаданные, цена и быстрые действия.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">На главную</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/generate">Создать модель</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ModelGrid models={demoModels} />
      </div>
    </div>
  );
}
