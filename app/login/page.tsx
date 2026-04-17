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

type AuthMode = "password" | "magic";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = React.useState<AuthMode>("password");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
          : "Ссылка входа недействительна или устарела. Запросите новую.";
      } catch {
        message =
          details?.replace(/\+/g, " ") ||
          "Ссылка входа недействительна или устарела. Запросите новую.";
      }
    } else if (err === "missing_code") {
      message = "Откройте ссылку из письма в браузере или запросите magic link снова.";
    } else if (err === "callback_exception") {
      message = "Ошибка при входе. Попробуйте ещё раз или запросите новую ссылку.";
    }

    setError(message);
    window.history.replaceState({}, "", "/login");
  }, []);

  async function onSubmitPassword(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSent(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        setError(SUPABASE_CLIENT_CONFIG_ERROR);
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;

      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось войти";
      setError(mapSupabaseAuthError(msg));
    } finally {
      setPending(false);
    }
  }

  async function onSubmitMagic(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSent(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        setError(SUPABASE_CLIENT_CONFIG_ERROR);
        return;
      }
      const next = encodeURIComponent(nextPath);
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=${next}`;
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
        },
      });
      if (signInError) throw signInError;

      setSent(email);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось отправить ссылку";
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
            <CardTitle className="text-xl">Вход</CardTitle>
            <p className="text-sm text-zinc-400">
              По паролю или одноразовой ссылке на email. После входа — в личный кабинет.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={mode === "password" ? "default" : "outline"}
                className={
                  mode === "password"
                    ? "rounded-full bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                    : "rounded-full border-zinc-600"
                }
                onClick={() => {
                  setMode("password");
                  setError(null);
                  setSent(null);
                }}
              >
                Пароль
              </Button>
              <Button
                type="button"
                size="sm"
                variant={mode === "magic" ? "default" : "outline"}
                className={
                  mode === "magic"
                    ? "rounded-full bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                    : "rounded-full border-zinc-600"
                }
                onClick={() => {
                  setMode("magic");
                  setError(null);
                  setSent(null);
                }}
              >
                Ссылка на почту
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {mode === "password" ? (
              <form onSubmit={onSubmitPassword} className="space-y-4">
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
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#8B5CF6] hover:underline"
                    >
                      Забыли пароль?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className={inputClass}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                  disabled={pending}
                >
                  {pending ? "Входим…" : "Войти"}
                </Button>
              </form>
            ) : (
              <form onSubmit={onSubmitMagic} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input
                    id="magic-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className={inputClass}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                  disabled={pending}
                >
                  {pending ? "Отправляем…" : "Отправить ссылку"}
                </Button>
              </form>
            )}

            {sent ? (
              <p className="mt-4 text-sm text-zinc-300">
                Ссылка для входа отправлена на <span className="font-medium">{sent}</span>.
              </p>
            ) : null}

            {error ? (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            ) : null}

            <p className="mt-4 text-sm text-zinc-400">
              Нет аккаунта?{" "}
              <Link
                className="text-zinc-200 underline-offset-4 hover:underline"
                href="/signup"
              >
                Регистрация
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
