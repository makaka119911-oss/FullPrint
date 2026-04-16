type GenerateImageInput = {
  prompt: string;
  style: string;
  aspectRatio: "1:1" | "16:9" | "9:16";
};

type GenerateImageResult = {
  imageUrl?: string;
  imageBase64?: string;
  mimeType?: string;
};

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

function mapAspectToFal(aspectRatio: GenerateImageInput["aspectRatio"]) {
  switch (aspectRatio) {
    case "16:9":
      return "landscape_16_9";
    case "9:16":
      return "portrait_16_9";
    default:
      return "square_hd";
  }
}

async function generateWithFal(
  input: GenerateImageInput,
): Promise<GenerateImageResult> {
  const timeout = withTimeout(60_000);
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    throw new Error("FAL_KEY is not configured");
  }

  try {
    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${input.prompt}. Style: ${input.style}.`,
        image_size: mapAspectToFal(input.aspectRatio),
      }),
      signal: timeout.signal,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`fal.ai request failed: ${response.status} ${message}`);
    }

    const payload = (await response.json()) as {
      images?: Array<{ url?: string }>;
      data?: { images?: Array<{ url?: string }> };
    };

    const imageUrl = payload.images?.[0]?.url ?? payload.data?.images?.[0]?.url;
    if (!imageUrl) {
      throw new Error("fal.ai response does not contain image URL");
    }

    return { imageUrl };
  } finally {
    timeout.clear();
  }
}

async function generateWithGoogle(
  input: GenerateImageInput,
): Promise<GenerateImageResult> {
  const timeout = withTimeout(60_000);
  const googleKey = process.env.GOOGLE_AI_KEY;
  if (!googleKey) {
    throw new Error("GOOGLE_AI_KEY is not configured");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${googleKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate one ${input.aspectRatio} image in style "${input.style}". Prompt: ${input.prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
        signal: timeout.signal,
      },
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Google AI request failed: ${response.status} ${message}`);
    }

    const payload = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }>;
        };
      }>;
    };

    const parts = payload.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.data);
    if (!imagePart?.inlineData?.data) {
      throw new Error("Google AI response does not contain image data");
    }

    return {
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType ?? "image/png",
    };
  } finally {
    timeout.clear();
  }
}

export async function generateImage(
  input: GenerateImageInput,
): Promise<GenerateImageResult> {
  if (process.env.FAL_KEY) {
    return generateWithFal(input);
  }
  if (process.env.GOOGLE_AI_KEY) {
    return generateWithGoogle(input);
  }

  throw new Error("Set FAL_KEY or GOOGLE_AI_KEY in environment variables");
}

