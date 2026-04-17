import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Только сброс пароля: redirectTo из resetPasswordForEmail должен указывать сюда.
 * Путь без query — Supabase не «съест» next=… как на /auth/callback.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PendingCookie = { name: string; value: string; options?: Record<string, unknown> };

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

  if (oauthError) {
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
    const login = new URL("/login", origin);
    login.searchParams.set("error", "server_config");
    return NextResponse.redirect(login);
  }

  if (!code) {
    const forgot = new URL("/forgot-password", origin);
    forgot.searchParams.set("error", "missing_code");
    return NextResponse.redirect(forgot);
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
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const login = new URL("/login", origin);
      login.searchParams.set("error", "magic_link_invalid");
      login.searchParams.set("details", exchangeError.message.slice(0, 200));
      return NextResponse.redirect(login);
    }

    const response = NextResponse.redirect(new URL("/auth/update-password", origin));
    flushCookies(response, pendingCookies);

    if (request.cookies.get("fp_username")) {
      response.cookies.set("fp_username", "", {
        path: "/",
        maxAge: 0,
        sameSite: "lax",
      });
    }

    return response;
  } catch {
    const login = new URL("/login", origin);
    login.searchParams.set("error", "callback_exception");
    return NextResponse.redirect(login);
  }
}
