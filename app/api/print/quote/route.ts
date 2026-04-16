import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { parseStlBuffer } from "@/lib/print/stl";

export const runtime = "nodejs";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function clampInt(value: string, min: number, max: number) {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function estimateUsd(params: {
  volumeMm3: number;
  triangles: number;
  process: string;
  material: string;
  layerHeight: string;
  infill: string;
  walls: string;
  supports: string;
  leadTime: string;
  quantity: number;
}) {
  const volumeCm3 = params.volumeMm3 / 1000;
  const triangleK = params.triangles / 1000;

  let base = 6 + volumeCm3 * 0.35 + triangleK * 0.08;

  if (params.process === "sla") base *= 1.35;
  if (params.process === "mjf") base *= 1.55;

  const materialFactor =
    params.material.includes("resin") || params.material.includes("pa12")
      ? 1.25
      : params.material === "abs" || params.material === "asa"
        ? 1.08
        : 1;

  const layer = Number.parseFloat(params.layerHeight);
  const layerFactor = Number.isFinite(layer) ? 0.2 / Math.max(layer, 0.08) : 1;

  const infill =
    params.infill === "solid" ? 35 : Number.parseInt(params.infill, 10) || 20;
  const infillFactor = 0.65 + infill / 100;

  const walls = Number.parseInt(params.walls, 10) || 3;
  const wallFactor = 0.85 + walls * 0.05;

  const supportsFactor =
    params.supports === "none" ? 0.95 : params.supports === "manual" ? 1.08 : 1;

  const leadFactor = params.leadTime === "express" ? 1.25 : 1;

  const total =
    base *
    materialFactor *
    layerFactor *
    infillFactor *
    wallFactor *
    supportsFactor *
    leadFactor *
    params.quantity;

  return Math.max(5, Math.round(total * 100) / 100);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Server misconfigured: Supabase env missing" },
        { status: 503 },
      );
    }
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".stl")) {
      return NextResponse.json({ error: "Only .stl is supported for now" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.byteLength > 40 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 40MB)" }, { status: 413 });
    }

    const metrics = parseStlBuffer(buffer);

    const rawModelId = String(form.get("modelId") ?? "").trim();
    const generationId = rawModelId && isUuid(rawModelId) ? rawModelId : null;
    const process = String(form.get("process") ?? "fdm");
    const material = String(form.get("material") ?? "pla");
    const layerHeight = String(form.get("layerHeight") ?? "0.20");
    const infill = String(form.get("infill") ?? "20");
    const walls = String(form.get("walls") ?? "3");
    const supports = String(form.get("supports") ?? "auto");
    const leadTime = String(form.get("leadTime") ?? "standard");
    const quantity = clampInt(String(form.get("quantity") ?? "1"), 1, 500);
    const notes = String(form.get("notes") ?? "");

    const priceUsd = estimateUsd({
      volumeMm3: metrics.volumeMm3,
      triangles: metrics.triangles,
      process,
      material,
      layerHeight,
      infill,
      walls,
      supports,
      leadTime,
      quantity,
    });

    const objectPath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.stl`;
    const { error: uploadError } = await supabase.storage
      .from("print-uploads")
      .upload(objectPath, buffer, {
        contentType: "application/sla",
        upsert: false,
        cacheControl: "3600",
      });

    if (uploadError) {
      throw new Error(
        `Storage upload failed: ${uploadError.message}. Ensure bucket "print-uploads" exists.`,
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("print-uploads")
      .getPublicUrl(objectPath);

    const { data: job, error: jobError } = await supabase
      .from("print_jobs")
      .insert({
        user_id: user.id,
        generation_id: generationId,
        stl_path: objectPath,
        stl_public_url: publicUrlData.publicUrl,
        process,
        material,
        layer_height: layerHeight,
        infill,
        walls,
        supports,
        lead_time: leadTime,
        quantity,
        notes,
        volume_mm3: metrics.volumeMm3,
        triangles: metrics.triangles,
        size_x_mm: metrics.sizeMm.x,
        size_y_mm: metrics.sizeMm.y,
        size_z_mm: metrics.sizeMm.z,
        price_usd: priceUsd,
        status: "quoted",
      })
      .select("id")
      .single();

    if (jobError || !job) {
      throw new Error(jobError?.message ?? "Failed to save print job");
    }

    return NextResponse.json({
      jobId: job.id,
      metrics,
      priceUsd,
      stlPublicUrl: publicUrlData.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Quote failed" },
      { status: 500 },
    );
  }
}
