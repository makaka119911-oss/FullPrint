"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { sanitizeAuthNext } from "@/lib/auth/sanitize-next";
import { mapSupabaseAuthError } from "@/lib/auth/error-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function setPendingUsernameCookie(username: string) {
  const safe = encodeURIComponent(username.trim());
  document.cookie = `fp_username=${safe}; Path=/; Max-Age=600; SameSite=Lax`;
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [nextPath, setNextPath] = React.useState("/dashboard");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(sanitizeAuthNext(params.get("next")));

    const err = params.get("error");
    const details = params.get("details");
    if (!err) return;

    let message = err;
    if (err === "server_config") {
      message = SUPABASE_CLIENT_CONFIG_ERROR;
    } else if (err === "magic_link_invalid") {
      try {
        message = details
          ? decodeURIComponent(details.replace(/\+/g, " "))
          : "Ссылка недействительна или устарела. Запросите новую.";
      } catch {
        message =
          details?.replace(/\+/g, " ") ||
          "Ссылка недействительна или устарела. Запросите новую.";
      }
    } else if (err === "missing_code") {
      message = "Откройте ссылку из письма в браузере или зарегистрируйтесь снова.";
    } else if (err === "callback_exception") {
      message = "Ошибка при регистрации. Попробуйте ещё раз.";
    }

    setError(message);
    window.history.replaceState({}, "", "/signup");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSent(null);

    if (password !== password2) {
      setError("Пароли не совпадают.");
      setPending(false);
      return;
    }

    if (password.length < 6) {
      setError("Пароль не короче 6 символов.");
      setPending(false);
      return;
    }

    try {
      setPendingUsernameCookie(username);

      const supabase = createClient();
      if (!supabase) {
        setError(SUPABASE_CLIENT_CONFIG_ERROR);
        return;
      }

      const next = encodeURIComponent(nextPath);
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=${next}`;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: { username: username.trim() || undefined },
        },
      });

      if (signUpError) throw signUpError;

      if (data.session?.user) {
        await supabase.from("profiles").upsert(
          {
            id: data.session.user.id,
            email: data.session.user.email,
            username: username.trim() || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        );
        router.replace(nextPath);
        router.refresh();
        return;
      }

      setSent(email);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось зарегистрироваться";
      setError(mapSupabaseAuthError(msg));
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "border-zinc-700 bg-zinc-900/50 text-zinc-50 placeholder:text-zinc-500";

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6">
        <Card className="mx-auto w-full max-w-md border-zinc-800 bg-zinc-950/80 text-zinc-50 shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-xl">Регистрация</CardTitle>
            <p className="text-sm text-zinc-400">
              Email и пароль. Если в проекте включено подтверждение почты в Supabase — после
              регистрации проверьте входящие и перейдите по ссылке.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="maxel"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password2">Пароль ещё раз</Label>
                <Input
                  id="password2"
                  type="password"
                  placeholder="повторите пароль"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                  required
                  className={inputClass}
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                disabled={pending}
              >
                {pending ? "Создаём аккаунт…" : "Зарегистрироваться"}
              </Button>

              {sent ? (
                <p className="text-sm text-zinc-300">
                  Аккаунт создан. Письмо с подтверждением отправлено на{" "}
                  <span className="font-medium">{sent}</span>. Откройте ссылку, затем войдите.
                </p>
              ) : null}

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <p className="text-sm text-zinc-400">
                Уже есть аккаунт?{" "}
                <Link
                  className="text-zinc-200 underline-offset-4 hover:underline"
                  href="/login"
                >
                  Войти
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
