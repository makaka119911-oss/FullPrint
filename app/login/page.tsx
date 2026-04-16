"use client";

import * as React from "react";
import Link from "next/link";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
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
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
        },
      });
      if (signInError) throw signInError;

      setSent(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить ссылку");
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
            <CardTitle className="text-xl">Вход</CardTitle>
            <p className="text-sm text-zinc-400">Magic link на email — после перехода откроется дашборд.</p>
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
                className="border-zinc-700 bg-zinc-900/50 text-zinc-50 placeholder:text-zinc-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
              disabled={pending}
            >
              {pending ? "Отправляем..." : "Отправить magic link"}
            </Button>

            {sent ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Ссылка для входа отправлена на <span className="font-medium">{sent}</span>.
              </p>
            ) : null}

            {error ? (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : null}

            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Нет аккаунта?{" "}
              <Link className="text-foreground underline-offset-4 hover:underline" href="/signup">
                Регистрация
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

