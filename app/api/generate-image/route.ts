import { NextRequest, NextResponse } from "next/server";

import { generateImage } from "@/lib/ai/generate-image";
import { createClient } from "@/lib/supabase/server";

type Payload = {
  prompt?: string;
  style?: string;
  aspectRatio?: "1:1" | "16:9" | "9:16";
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    const prompt = body.prompt?.trim();
    const style = body.style?.trim();
    const aspectRatio = body.aspectRatio;

    if (!prompt || !style || !aspectRatio) {
      return NextResponse.json(
        { error: "Missing required fields: prompt, style, aspectRatio" },
        { status: 400 },
      );
    }

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

    const aiResult = await generateImage({ prompt, style, aspectRatio });

    let imageBuffer: Buffer;
    let contentType = aiResult.mimeType ?? "image/png";

    if (aiResult.imageBase64) {
      imageBuffer = Buffer.from(aiResult.imageBase64, "base64");
    } else if (aiResult.imageUrl) {
      const imageResponse = await fetch(aiResult.imageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to download generated image");
      }
      const arr = await imageResponse.arrayBuffer();
      imageBuffer = Buffer.from(arr);
      contentType = imageResponse.headers.get("content-type") ?? contentType;
    } else {
      throw new Error("AI response does not contain image");
    }

    const ext = contentType.includes("jpeg")
      ? "jpg"
      : contentType.includes("webp")
        ? "webp"
        : "png";

    const filePath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("generated-images")
      .upload(filePath, imageBuffer, {
        cacheControl: "3600",
        contentType,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(
        `Storage upload failed: ${uploadError.message}. Ensure bucket "generated-images" exists.`,
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("generated-images")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const { data: generation, error: generationError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        prompt: `${prompt}\n\nStyle: ${style}\nAspect ratio: ${aspectRatio}`,
        image_url: imageUrl,
        status: "2d_generated",
      })
      .select("id")
      .single();

    if (generationError || !generation) {
      throw new Error(generationError?.message ?? "Failed to save generation");
    }

    return NextResponse.json({
      generationId: generation.id,
      imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate image",
      },
      { status: 500 },
    );
  }
}

