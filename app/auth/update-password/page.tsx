"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { mapSupabaseAuthError } from "@/lib/auth/error-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [sessionState, setSessionState] = React.useState<
    "loading" | "ok" | "missing"
  >("loading");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      const supabase = createClient();
      if (!supabase) {
        if (!cancelled) {
          setError(SUPABASE_CLIENT_CONFIG_ERROR);
          setSessionState("missing");
        }
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (!cancelled) {
        setSessionState(data.user ? "ok" : "missing");
        if (!data.user) {
          setError(
            "Нет активной сессии. Откройте ссылку из письма сброса пароля или войдите.",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

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
      const supabase = createClient();
      if (!supabase) {
        setError(SUPABASE_CLIENT_CONFIG_ERROR);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      setSaved(true);
      window.setTimeout(() => {
        router.replace("/dashboard");
        router.refresh();
      }, 1400);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось обновить пароль";
      setError(mapSupabaseAuthError(msg));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6">
        <Card className="mx-auto w-full max-w-md border-zinc-800 bg-zinc-950/80 text-zinc-50 shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-xl">Новый пароль</CardTitle>
            <p className="text-sm text-zinc-400">
              Задайте новый пароль после перехода по ссылке из письма.
            </p>
          </CardHeader>
          <CardContent>
            {sessionState === "loading" ? (
              <p className="text-sm text-zinc-400">Проверяем сессию…</p>
            ) : sessionState === "missing" ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : saved ? (
              <div className="space-y-4" role="status">
                <p className="text-sm font-medium text-emerald-300">Готово — пароль обновлён.</p>
                <p className="text-sm text-zinc-400">
                  Сейчас откроется дашборд. Если нет — нажмите кнопку ниже.
                </p>
                <Button
                  asChild
                  className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                >
                  <Link href="/dashboard">Перейти в кабинет</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Новый пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="border-zinc-700 bg-zinc-900/50 text-zinc-50 placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Повтор пароля</Label>
                  <Input
                    id="password2"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="border-zinc-700 bg-zinc-900/50 text-zinc-50 placeholder:text-zinc-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                  disabled={pending}
                >
                  {pending ? "Сохраняем…" : "Сохранить пароль"}
                </Button>
                {error ? <p className="text-sm text-red-400">{error}</p> : null}
              </form>
            )}

            <p className="mt-4 text-sm text-zinc-400">
              <Link className="text-zinc-200 underline-offset-4 hover:underline" href="/login">
                На страницу входа
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
