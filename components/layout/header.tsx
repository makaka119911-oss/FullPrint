"use client";

import * as React from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Loader2, UserRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/#features", label: "Возможности" },
  { href: "/#how-it-works", label: "Как это работает" },
  { href: "/#cta", label: "Старт" },
] as const;

export function Header() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    void supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) {
        setUser(data.user ?? null);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-background/70 backdrop-blur dark:border-zinc-800/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 rounded-md px-2 py-1 text-sm font-semibold tracking-tight text-foreground transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 dark:hover:bg-zinc-900/60"
          >
            FullPrint AI
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="flex min-h-9 min-w-[200px] items-center justify-end gap-2 sm:min-w-[220px]"
            aria-live="polite"
          >
            {loading ? (
              <div
                className="flex h-9 w-full max-w-[220px] items-center justify-center gap-2 rounded-full border border-transparent text-zinc-500 dark:text-zinc-400"
                aria-busy="true"
                aria-label="Проверка сессии"
              >
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                <span className="hidden text-xs text-zinc-500 sm:inline dark:text-zinc-400">
                  Загрузка…
                </span>
              </div>
            ) : user ? (
              <>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full border-0 bg-[#8B5CF6] px-4 text-white shadow-sm shadow-[#8B5CF6]/25 hover:bg-[#7c3aed]"
                >
                  <Link href="/dashboard">Дашборд</Link>
                </Button>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-800 transition hover:border-[#8B5CF6]/50 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-[#8B5CF6]/45 dark:hover:bg-zinc-900"
                  aria-label="Аккаунт"
                >
                  <UserRound className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-zinc-300 bg-transparent px-4 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-[#8B5CF6]/45 dark:hover:bg-zinc-900/60"
                >
                  <Link href="/login">Войти</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full border-0 bg-[#8B5CF6] px-4 text-white shadow-sm shadow-[#8B5CF6]/25 hover:bg-[#7c3aed]"
                >
                  <Link href="/signup">Регистрация</Link>
                </Button>
              </>
            )}
          </div>

          <ThemeToggle />

          {!loading && !user ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden rounded-full border-zinc-300 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-[#8B5CF6]/40 sm:inline-flex"
            >
              <Link href="/generate">Начать</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
