import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { isRecoverySession } from "@/lib/auth/is-recovery-session";
import { sanitizeAuthNext } from "@/lib/auth/sanitize-next";

/** App Router: этот файл задаёт маршрут GET /auth/callback */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PendingCookie = { name: string; value: string; options?: Record<string, unknown> };

function readPendingUsername(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function flushCookies(response: NextResponse, rows: PendingCookie[]) {
  rows.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as Parameters<NextResponse["cookies"]["set"]>[2]);
  });
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error");
  const oauthDescription = requestUrl.searchParams.get("error_description");
  const nextPath = sanitizeAuthNext(requestUrl.searchParams.get("next"));
  const typeRecoveryHint = requestUrl.searchParams.get("type") === "recovery";

  console.log("[auth/callback] request", {
    origin,
    url: request.url,
    hasCode: Boolean(code),
    codeLength: code?.length ?? 0,
    next: nextPath,
    oauthError,
    typeRecoveryHint,
  });

  if (oauthError) {
    console.error("[auth/callback] Supabase redirect error:", oauthError, oauthDescription);
    const login = new URL("/login", origin);
    login.searchParams.set(
      "error",
      oauthDescription?.slice(0, 300) || oauthError,
    );
    return NextResponse.redirect(login);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[auth/callback] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    const login = new URL("/login", origin);
    login.searchParams.set("error", "server_config");
    return NextResponse.redirect(login);
  }

  const pendingCookies: PendingCookie[] = [];

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          pendingCookies.push({ name, value, options });
        });
      },
    },
  });

  try {
    if (code) {
      const { data: exchangeData, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("[auth/callback] exchangeCodeForSession:", {
          message: exchangeError.message,
          status: exchangeError.status,
          name: exchangeError.name,
        });
        const login = new URL("/login", origin);
        login.searchParams.set("error", "magic_link_invalid");
        login.searchParams.set("details", exchangeError.message.slice(0, 200));
        return NextResponse.redirect(login);
      }

      console.log("[auth/callback] exchangeCodeForSession OK", {
        hasSession: Boolean(exchangeData?.session),
        userId: exchangeData?.session?.user?.id ?? null,
        recovery: isRecoverySession(exchangeData?.session),
      });

      let finalPath = nextPath;
      if (typeRecoveryHint || isRecoverySession(exchangeData?.session)) {
        finalPath = "/auth/update-password";
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("[auth/callback] getUser after exchange:", userError.message);
      }

      const pendingUsername = readPendingUsername(request.cookies.get("fp_username")?.value);

      if (user) {
        const { error: upsertError } = await supabase.from("profiles").upsert(
          {
            id: user.id,
            email: user.email,
            username: pendingUsername || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        );

        if (upsertError) {
          console.error("[auth/callback] profiles upsert:", upsertError.message);
        }
      }

      const response = NextResponse.redirect(new URL(finalPath, origin));
      flushCookies(response, pendingCookies);

      if (request.cookies.get("fp_username")) {
        response.cookies.set("fp_username", "", {
          path: "/",
          maxAge: 0,
          sameSite: "lax",
        });
      }

      return response;
    }

    const {
      data: { user: existingUser },
    } = await supabase.auth.getUser();

    if (existingUser) {
      const redirectTarget = new URL(nextPath, origin);
      const response = NextResponse.redirect(redirectTarget);
      flushCookies(response, pendingCookies);
      console.log("[auth/callback] no code, existing session — redirect", nextPath);
      return response;
    }

    console.warn("[auth/callback] no ?code= and no session — sending to login");
    const login = new URL("/login", origin);
    login.searchParams.set("error", "missing_code");
    return NextResponse.redirect(login);
  } catch (e) {
    console.error("[auth/callback] exception:", e);
    const login = new URL("/login", origin);
    login.searchParams.set("error", "callback_exception");
    return NextResponse.redirect(login);
  }
}
