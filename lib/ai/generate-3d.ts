type ConvertImageTo3DResult = {
  glbUrl?: string;
  stlUrl?: string;
};

type TripoTaskCreateResponse = {
  data?: { task_id?: string; id?: string };
  task_id?: string;
  id?: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTaskId(payload: TripoTaskCreateResponse) {
  return payload.data?.task_id ?? payload.data?.id ?? payload.task_id ?? payload.id;
}

function readModelUrls(payload: unknown): ConvertImageTo3DResult {
  const obj = payload as Record<string, unknown>;
  const data = (obj.data ?? obj.output ?? obj.result ?? {}) as Record<
    string,
    unknown
  >;
  const model = (data.model ?? data.models ?? data.files ?? {}) as Record<
    string,
    unknown
  >;

  const glbUrl =
    (model.glb as string | undefined) ??
    (model.glb_url as string | undefined) ??
    (data.glb as string | undefined) ??
    (data.glb_url as string | undefined);

  const stlUrl =
    (model.stl as string | undefined) ??
    (model.stl_url as string | undefined) ??
    (data.stl as string | undefined) ??
    (data.stl_url as string | undefined);

  return { glbUrl, stlUrl };
}

export async function convertImageTo3D(
  imageUrl: string,
): Promise<ConvertImageTo3DResult> {
  const apiKey = process.env.TRIPO_API_KEY;
  if (!apiKey) {
    throw new Error("TRIPO_API_KEY is not configured");
  }

  const createRes = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "image_to_model",
      file: { type: "url", url: imageUrl },
    }),
  });

  if (!createRes.ok) {
    throw new Error(`Tripo task create failed: ${createRes.status}`);
  }

  const created = (await createRes.json()) as TripoTaskCreateResponse;
  const taskId = getTaskId(created);
  if (!taskId) {
    throw new Error("Tripo API did not return task id");
  }

  const startedAt = Date.now();
  const timeoutMs = 2 * 60 * 1000;

  while (Date.now() - startedAt < timeoutMs) {
    await sleep(3000);

    const statusRes = await fetch(
      `https://api.tripo3d.ai/v2/openapi/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!statusRes.ok) {
      throw new Error(`Tripo status check failed: ${statusRes.status}`);
    }

    const statusPayload = (await statusRes.json()) as Record<string, unknown>;
    const status =
      (statusPayload.status as string | undefined)?.toLowerCase() ??
      (((statusPayload.data as Record<string, unknown> | undefined)?.status as
        | string
        | undefined)?.toLowerCase() ??
        "");

    if (status.includes("failed") || status.includes("error")) {
      throw new Error("Tripo conversion failed");
    }

    if (
      status.includes("success") ||
      status.includes("succeed") ||
      status.includes("completed") ||
      status.includes("done")
    ) {
      const urls = readModelUrls(statusPayload);
      if (!urls.glbUrl && !urls.stlUrl) {
        throw new Error("Tripo finished but model URLs are missing");
      }
      return urls;
    }
  }

  throw new Error("Tripo conversion timeout (2 minutes)");
}

