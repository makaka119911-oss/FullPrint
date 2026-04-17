"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthEmailFollowup } from "@/components/auth/auth-email-followup";
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

  function backToSignupForm() {
    setSent(null);
    setEmail("");
    setPassword("");
    setPassword2("");
    setError(null);
  }

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

      // При включённом «Confirm email» Supabase не отдаёт ошибку на дубликат, а возвращает
      // пользователя с пустым identities — так защищают от перебора email.
      const ids = data.user?.identities;
      if (data.user && Array.isArray(ids) && ids.length === 0) {
        setError(
          mapSupabaseAuthError(
            "User already registered",
          ),
        );
        return;
      }

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

  const loginWithNext = `/login?next=${encodeURIComponent(nextPath)}`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6">
        <Card className="mx-auto w-full max-w-md shadow-lg shadow-zinc-900/5 dark:shadow-black/30">
          {sent ? (
            <CardContent className="p-6 sm:p-8">
              <AuthEmailFollowup
                email={sent}
                headline="Почти на месте"
                hrefPrimary={loginWithNext}
                primaryLabel="Перейти ко входу"
                onSecondaryAction={backToSignupForm}
                secondaryLabel="Зарегистрироваться с другим email"
              >
                <p>
                  Мы отправили письмо с короткой ссылкой подтверждения. Откройте почту и
                  нажмите её — так мы активируем аккаунт и подключаем FullPrint к вашему
                  рабочему процессу.
                </p>
                <p>
                  После подтверждения войдите с тем же email и паролем — дальше можно спокойно
                  продолжать с того места, где остановились.
                </p>
              </AuthEmailFollowup>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Регистрация</CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Email и пароль. Если в Supabase включено подтверждение почты, после регистрации
                  загляните во входящие и пройдите по ссылке из письма.
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
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
                    disabled={pending}
                  >
                    {pending ? "Создаём аккаунт…" : "Зарегистрироваться"}
                  </Button>

                  {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Уже есть аккаунт?{" "}
                    <Link
                      className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                      href={loginWithNext}
                    >
                      Войти
                    </Link>
                  </p>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
}
