"use client";

import * as React from "react";
import Link from "next/link";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { mapSupabaseAuthError } from "@/lib/auth/error-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        setError(SUPABASE_CLIENT_CONFIG_ERROR);
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/recovery`,
      });

      if (resetError) throw resetError;

      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось отправить письмо";
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
            <CardTitle className="text-xl">Сброс пароля</CardTitle>
            <p className="text-sm text-zinc-400">
              Укажите email — пришлём ссылку. После перехода по ней можно задать новый пароль.
            </p>
          </CardHeader>
          <CardContent>
            {sent ? (
              <p className="text-sm text-zinc-300">
                Если аккаунт существует, письмо отправлено на <span className="font-medium">{email}</span>.
                Проверьте почту и папку «Спам».
              </p>
            ) : (
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
                    className="border-zinc-700 bg-zinc-900/50 text-zinc-50 placeholder:text-zinc-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                  disabled={pending}
                >
                  {pending ? "Отправляем…" : "Отправить ссылку"}
                </Button>
                {error ? <p className="text-sm text-red-400">{error}</p> : null}
              </form>
            )}

            <p className="mt-4 text-sm text-zinc-400">
              <Link className="text-zinc-200 underline-offset-4 hover:underline" href="/login">
                ← Назад ко входу
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
