import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function preview(v: string | undefined, maxLen: number) {
  if (!v?.trim()) return { present: false as const, preview: null as string | null };
  const t = v.trim();
  return { present: true as const, preview: t.slice(0, maxLen) };
}

/**
 * Диагностика env на сервере (как на Vercel). Не отдаёт полные секреты.
 * Удалите или защитите роут, когда отладка не нужна.
 */
export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: preview(process.env.NEXT_PUBLIC_SUPABASE_URL, 20),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: preview(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      20,
    ),
    FAL_KEY: { present: Boolean(process.env.FAL_KEY?.trim()) },
    TRIPO_API_KEY: { present: Boolean(process.env.TRIPO_API_KEY?.trim()) },
    NODE_ENV: process.env.NODE_ENV ?? null,
    VERCEL_ENV: process.env.VERCEL_ENV ?? null,
  });
}
