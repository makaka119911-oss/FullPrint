/** Безопасный относительный путь после логина (без open redirect). */
export function sanitizeAuthNext(
  next: string | null | undefined,
  fallback = "/dashboard",
): string {
  const path = (next?.trim() || fallback).split("?")[0] ?? fallback;
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return fallback;
  }
  return path;
}
