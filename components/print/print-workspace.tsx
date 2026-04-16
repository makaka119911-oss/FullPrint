"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import {
  PrintOptionsPanel,
  defaultPrintOptions,
  estimatePrintPrice,
  type PrintOptions,
} from "@/components/print/print-options-panel";
import { PrintSummaryCard } from "@/components/print/print-summary-card";
import { createClient } from "@/lib/supabase/client";

type QuoteResponse = {
  jobId: string;
  metrics: {
    triangles: number;
    volumeMm3: number;
    sizeMm: { x: number; y: number; z: number };
  };
  priceUsd: number;
  stlPublicUrl: string;
  error?: string;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function fileNameFromUrl(url: string) {
  try {
    const u = new URL(url);
    const last = u.pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : "model.stl";
  } catch {
    return "model.stl";
  }
}

function parseSupabaseStoragePublicUrl(url: string) {
  try {
    const u = new URL(url);
    const marker = "/storage/v1/object/public/";
    const idx = u.pathname.indexOf(marker);
    if (idx === -1) return null;

    const rest = u.pathname.slice(idx + marker.length); // "<bucket>/<path...>"
    const [bucket, ...pathParts] = rest.split("/").filter(Boolean);
    if (!bucket || pathParts.length === 0) return null;

    return { bucket, path: pathParts.map((p) => decodeURIComponent(p)).join("/") };
  } catch {
    return null;
  }
}

export function PrintWorkspace() {
  const searchParams = useSearchParams();
  const modelId = searchParams.get("modelId");

  const [options, setOptions] = React.useState<PrintOptions>(() => defaultPrintOptions());
  const [file, setFile] = React.useState<File | null>(null);

  const [isQuoting, setIsQuoting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [serverPrice, setServerPrice] = React.useState<number | null>(null);
  const [metrics, setMetrics] = React.useState<QuoteResponse["metrics"] | null>(null);
  const [jobId, setJobId] = React.useState<string | null>(null);
  const [remoteHint, setRemoteHint] = React.useState<string | null>(null);
  const [autoToken, setAutoToken] = React.useState(0);
  const remoteLoadGen = React.useRef(0);

  const localEstimate = React.useMemo(() => estimatePrintPrice(options), [options]);
  const estimateLabel =
    serverPrice !== null ? `$${serverPrice.toFixed(2)}` : `${localEstimate} (локально)`;

  const quoteKey = React.useMemo(
    () =>
      JSON.stringify({
        process: options.process,
        material: options.material,
        layerHeight: options.layerHeight,
        infill: options.infill,
        walls: options.walls,
        supports: options.supports,
        leadTime: options.leadTime,
        quantity: options.quantity,
      }),
    [
      options.process,
      options.material,
      options.layerHeight,
      options.infill,
      options.walls,
      options.supports,
      options.leadTime,
      options.quantity,
    ],
  );

  React.useEffect(() => {
    if (!file) {
      setServerPrice(null);
      setMetrics(null);
      setJobId(null);
      setError(null);
      return;
    }

    const handle = window.setTimeout(async () => {
      setIsQuoting(true);
      setError(null);
      try {
        const form = new FormData();
        form.set("file", file);
        if (modelId) form.set("modelId", modelId);
        form.set("process", options.process);
        form.set("material", options.material);
        form.set("layerHeight", options.layerHeight);
        form.set("infill", options.infill);
        form.set("walls", options.walls);
        form.set("supports", options.supports);
        form.set("leadTime", options.leadTime);
        form.set("quantity", options.quantity);
        form.set("notes", options.notes);

        const res = await fetch("/api/print/quote", {
          method: "POST",
          body: form,
        });

        const payload = (await res.json()) as QuoteResponse & { error?: string };
        if (!res.ok) {
          throw new Error(payload.error ?? "Quote failed");
        }

        setServerPrice(payload.priceUsd);
        setMetrics(payload.metrics);
        setJobId(payload.jobId);
      } catch (e) {
        setServerPrice(null);
        setMetrics(null);
        setJobId(null);
        setError(e instanceof Error ? e.message : "Не удалось получить котировку");
      } finally {
        setIsQuoting(false);
      }
    }, 650);

    return () => window.clearTimeout(handle);
  }, [file, modelId, quoteKey, options.notes]);

  React.useEffect(() => {
    let cancelled = false;
    const gen = ++remoteLoadGen.current;

    async function run() {
      setRemoteHint(null);

      if (!modelId || !isUuid(modelId)) return;

      // Deep-link flow: always start from a clean slate for this generation.
      setFile(null);
      setError(null);

      setRemoteHint("Ищем STL в вашей генерации…");

      const supabase = createClient();
      const { data, error: genError } = await supabase
        .from("generations")
        .select("model_url")
        .eq("id", modelId)
        .maybeSingle();

      if (cancelled || gen !== remoteLoadGen.current) return;

      if (genError) {
        setRemoteHint(null);
        setError(genError.message);
        return;
      }

      const modelUrl = data?.model_url;
      if (!modelUrl || typeof modelUrl !== "string") {
        setRemoteHint("Для этой генерации пока нет `model_url` — загрузите STL вручную.");
        return;
      }

      const lower = modelUrl.toLowerCase();
      if (!lower.endsWith(".stl")) {
        setRemoteHint(
          "Автозагрузка сейчас только для `.stl`. Если у вас `.glb`, экспортируйте STL и загрузите файл.",
        );
        return;
      }

      setRemoteHint("Скачиваем STL из Storage…");

      const parsed = parseSupabaseStoragePublicUrl(modelUrl);
      let bytes: ArrayBuffer;

      if (parsed) {
        const { data: dl, error: dlError } = await supabase.storage
          .from(parsed.bucket)
          .download(parsed.path);

        if (cancelled || gen !== remoteLoadGen.current) return;

        if (dlError || !dl) {
          setRemoteHint(null);
          setError(dlError?.message ?? "Не удалось скачать STL из Storage");
          return;
        }

        bytes = await dl.arrayBuffer();
      } else {
        const res = await fetch(modelUrl, { method: "GET" });
        if (cancelled || gen !== remoteLoadGen.current) return;

        if (!res.ok) {
          setRemoteHint(null);
          setError(`Не удалось скачать STL по ссылке (${res.status})`);
          return;
        }

        bytes = await res.arrayBuffer();
      }

      if (cancelled || gen !== remoteLoadGen.current) return;

      const name = fileNameFromUrl(modelUrl);
      const nextFile = new File([bytes], name, { type: "model/stl" });
      setFile(nextFile);
      setRemoteHint(`Автозагружено: ${name}`);
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [modelId, autoToken]);

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <PrintOptionsPanel
          value={options}
          onChange={setOptions}
          onReset={() => {
            setOptions(defaultPrintOptions());
            setFile(null);
            setRemoteHint(null);
            if (modelId && isUuid(modelId)) {
              setAutoToken((t) => t + 1);
            }
          }}
          onFileChange={(next) => {
            if (next) remoteLoadGen.current += 1;
            setRemoteHint(null);
            setFile(next);
          }}
          remoteHint={remoteHint}
        />
      </div>
      <div className="lg:col-span-2">
        <PrintSummaryCard
          modelId={modelId}
          estimate={estimateLabel}
          fileName={file?.name ?? null}
          metrics={metrics}
          jobId={jobId}
          isQuoting={isQuoting}
          error={error}
        />
      </div>
    </div>
  );
}
