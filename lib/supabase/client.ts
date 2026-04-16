import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let warnedMissingBrowserEnv = false;

function readBrowserSupabaseEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !anonKey) {
    if (typeof window !== "undefined" && !warnedMissingBrowserEnv) {
      warnedMissingBrowserEnv = true;
      console.warn(
        "[FullPrint] В клиентском бандле нет NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
          "Проверьте Vercel → Settings → Environment Variables (Production / Preview) и Redeploy.",
      );
    }
    return null;
  }
  return { url, anonKey };
}

/** Без выброса: если env нет, вернёт null. */
export function createBrowserSupabaseClient(): SupabaseClient | null {
  const env = readBrowserSupabaseEnv();
  if (!env) return null;
  return createBrowserClient(env.url, env.anonKey);
}

/**
 * Клиентский Supabase. Не бросает: при отсутствии env возвращает null
 * (страницы должны показать сообщение или деградировать).
 */
export function createClient(): SupabaseClient | null {
  return createBrowserSupabaseClient();
}

export const SUPABASE_CLIENT_CONFIG_ERROR =
  "Supabase не сконфигурирован в этом окружении. В Vercel добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY для Production и выполните Redeploy.";
