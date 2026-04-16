"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type PrintOptions = {
  process: "fdm" | "sla" | "mjf";
  material: string;
  layerHeight: string;
  infill: string;
  walls: string;
  supports: "auto" | "none" | "manual";
  quantity: string;
  leadTime: "standard" | "express";
  notes: string;
};

type Props = {
  value: PrintOptions;
  onChange: (next: PrintOptions) => void;
  onReset: () => void;
  onFileChange: (file: File | null) => void;
  remoteHint?: string | null;
};

export function PrintOptionsPanel({
  value,
  onChange,
  onReset,
  onFileChange,
  remoteHint,
}: Props) {
  function patch<K extends keyof PrintOptions>(key: K, val: PrintOptions[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/40 text-zinc-50">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Параметры печати</CardTitle>
          <p className="mt-2 text-sm text-zinc-400">
            Конфигуратор в стиле JLC: быстрые пресеты + точные поля.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl border-zinc-700" onClick={onReset}>
          Сброс
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>STL модель</Label>
          <Input
            type="file"
            accept=".stl,application/sla,model/stl"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            className="border-zinc-800 bg-zinc-950/70 text-zinc-50 file:mr-3 file:rounded-md file:border file:border-zinc-700 file:bg-zinc-900 file:px-3 file:py-1 file:text-xs file:text-zinc-200 hover:file:bg-zinc-800"
          />
          <p className="text-xs text-zinc-500">
            Сейчас поддерживается только STL (бинарный/ASCII). Файл уходит на сервер для
            разбора геометрии и загрузки в Storage.
          </p>
          {remoteHint ? (
            <p className="text-xs text-sky-300/90">{remoteHint}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Процесс</Label>
            <Select
              value={value.process}
              onValueChange={(v) => patch("process", v as PrintOptions["process"])}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fdm">FDM</SelectItem>
                <SelectItem value="sla">SLA</SelectItem>
                <SelectItem value="mjf">MJF / SLS-like</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Материал</Label>
            <Select value={value.material} onValueChange={(v) => patch("material", v)}>
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pla">PLA</SelectItem>
                <SelectItem value="petg">PETG</SelectItem>
                <SelectItem value="abs">ABS</SelectItem>
                <SelectItem value="asa">ASA</SelectItem>
                <SelectItem value="resin_std">Resin (standard)</SelectItem>
                <SelectItem value="pa12">PA12 (powder-like)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Высота слоя</Label>
            <Select value={value.layerHeight} onValueChange={(v) => patch("layerHeight", v)}>
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.12">0.12 мм</SelectItem>
                <SelectItem value="0.16">0.16 мм</SelectItem>
                <SelectItem value="0.20">0.20 мм</SelectItem>
                <SelectItem value="0.24">0.24 мм</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Infill</Label>
            <Select value={value.infill} onValueChange={(v) => patch("infill", v)}>
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="15">15%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="solid">Solid / functional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Стенки (count)</Label>
            <Select value={value.walls} onValueChange={(v) => patch("walls", v)}>
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="6">6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2 sm:col-span-1">
            <Label>Поддержки</Label>
            <Select
              value={value.supports}
              onValueChange={(v) => patch("supports", v as PrintOptions["supports"])}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="manual">Manual (later)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Количество</Label>
            <Input
              inputMode="numeric"
              value={value.quantity}
              onChange={(e) => patch("quantity", clampQuantity(e.target.value))}
              className="border-zinc-800 bg-zinc-950/70 text-zinc-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Срок</Label>
            <Select
              value={value.leadTime}
              onValueChange={(v) => patch("leadTime", v as PrintOptions["leadTime"])}
            >
              <SelectTrigger className="border-zinc-800 bg-zinc-950/70 text-zinc-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Комментарий для производства</Label>
          <Textarea
            value={value.notes}
            onChange={(e) => patch("notes", e.target.value)}
            placeholder="Ориентация, допуски, постобработка, цвет..."
            className="min-h-28 border-zinc-800 bg-zinc-950/70 text-zinc-50 placeholder:text-zinc-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function clampQuantity(raw: string) {
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) return "1";
  return String(Math.min(500, Math.max(1, n)));
}

export function defaultPrintOptions(): PrintOptions {
  return {
    process: "fdm",
    material: "petg",
    layerHeight: "0.20",
    infill: "20",
    walls: "3",
    supports: "auto",
    quantity: "1",
    leadTime: "standard",
    notes: "",
  };
}

export function estimatePrintPrice(options: PrintOptions) {
  const qty = Number.parseInt(clampQuantity(options.quantity), 10);
  const infill = options.infill === "solid" ? 35 : Number.parseInt(options.infill, 10);
  const layer = Number.parseFloat(options.layerHeight);
  const processWeight =
    options.process === "fdm" ? 1 : options.process === "sla" ? 1.35 : 1.6;
  const leadWeight = options.leadTime === "express" ? 1.25 : 1;

  const base = 9.5;
  const score =
    base +
    processWeight * 6 +
    (infill / 20) * 4 +
    (0.24 / Math.max(layer, 0.08)) * 3 +
    qty * 1.8;

  const total = Math.round(score * leadWeight);
  return `$${total}`;
}
