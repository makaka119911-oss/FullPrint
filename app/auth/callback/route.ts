import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pendingUsername = cookieStore.get("fp_username")?.value;
    if (user) {
      await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          username: pendingUsername || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
    }

    if (pendingUsername) {
      cookieStore.delete("fp_username");
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}

