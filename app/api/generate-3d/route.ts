import { NextRequest, NextResponse } from "next/server";

import { convertImageTo3D } from "@/lib/ai/generate-3d";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Payload = {
  imageUrl?: string;
  generationId?: string;
};

async function uploadFromRemote(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  userId: string,
  remoteUrl: string,
  extension: "glb" | "stl",
) {
  const fileRes = await fetch(remoteUrl);
  if (!fileRes.ok) {
    throw new Error(`Failed to download ${extension.toUpperCase()} file`);
  }
  const buffer = Buffer.from(await fileRes.arrayBuffer());
  const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType:
        extension === "glb" ? "model/gltf-binary" : "application/sla",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(
      `Storage upload failed for ${extension}: ${uploadError.message}`,
    );
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    const imageUrl = body.imageUrl?.trim();
    const generationId = body.generationId?.trim();

    if (!imageUrl || !generationId) {
      return NextResponse.json(
        { error: "Missing required fields: imageUrl, generationId" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: generation, error: generationError } = await supabase
      .from("generations")
      .select("id, user_id")
      .eq("id", generationId)
      .single();

    if (generationError || !generation) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }
    if (generation.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const converted = await convertImageTo3D(imageUrl);

    let glbUrl: string | undefined;
    let stlUrl: string | undefined;

    if (converted.glbUrl) {
      glbUrl = await uploadFromRemote(
        supabase,
        "generated-models",
        user.id,
        converted.glbUrl,
        "glb",
      );
    }
    if (converted.stlUrl) {
      stlUrl = await uploadFromRemote(
        supabase,
        "generated-models",
        user.id,
        converted.stlUrl,
        "stl",
      );
    }

    const primaryModelUrl = glbUrl ?? stlUrl ?? null;
    const format = glbUrl ? "glb" : "stl";

    const { error: updateError } = await supabase
      .from("generations")
      .update({
        model_url: primaryModelUrl,
        status: "3d_generated",
      })
      .eq("id", generationId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      modelUrl: primaryModelUrl,
      format,
      glbUrl: glbUrl ?? null,
      stlUrl: stlUrl ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "3D generation failed" },
      { status: 500 },
    );
  }
}

