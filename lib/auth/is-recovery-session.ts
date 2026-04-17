import type { Session } from "@supabase/supabase-js";

/**
 * Сессия после ссылки «сброс пароля» в GoTrue помечается в JWT (claim `amr` с method recovery).
 * Нужно в /auth/callback, чтобы не слать пользователя на /dashboard, если query `next` потерян.
 */
export function isRecoverySession(session: Session | null | undefined): boolean {
  const token = session?.access_token;
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length < 2) return false;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = base64 + (pad ? "=".repeat(4 - pad) : "");
    const json = Buffer.from(padded, "base64").toString("utf8");
    const payload = JSON.parse(json) as { amr?: unknown };
    const { amr } = payload;
    if (!Array.isArray(amr)) return false;

    return amr.some((item) => {
      if (typeof item === "string") return item === "recovery";
      if (item && typeof item === "object" && "method" in item) {
        return String((item as { method?: string }).method) === "recovery";
      }
      return false;
    });
  } catch {
    return false;
  }
}
