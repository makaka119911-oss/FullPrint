"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AuthEmailFollowupProps = {
  /** Адрес, на который ушло письмо */
  email: string;
  /** Крупный заголовок экрана */
  headline: string;
  /** Основной текст (можно передать несколько абзацев через JSX) */
  children: React.ReactNode;
  /** Подсказка про спам / задержку */
  inboxHint?: string;
  hrefPrimary: string;
  primaryLabel?: string;
  /** Вторичное действие: сбросить форму / другой email */
  onSecondaryAction?: () => void;
  secondaryLabel?: string;
  className?: string;
};

/**
 * Экран «письмо отправлено» — переиспользуемый для подтверждения email после signup
 * и (при необходимости) для forgot-password после resetPasswordForEmail.
 */
export function AuthEmailFollowup({
  email,
  headline,
  children,
  inboxHint = "Не видите письмо? Загляните в «Спам» или подождите пару минут — иногда доставка занимает время.",
  hrefPrimary,
  primaryLabel = "Перейти ко входу",
  onSecondaryAction,
  secondaryLabel = "Зарегистрироваться с другим email",
  className,
}: AuthEmailFollowupProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("fp-motion-root flex flex-col gap-6", className)}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400 dark:ring-emerald-400/30">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {headline}
        </h2>
        <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 px-3 py-2 text-sm dark:border-zinc-700/80 dark:bg-zinc-900/40">
          <span className="text-zinc-500 dark:text-zinc-400">Отправили на </span>
          <span className="break-all font-medium text-zinc-900 dark:text-zinc-100">{email}</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {children}
        </div>
        {inboxHint ? (
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{inboxHint}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="w-full rounded-full border-0 bg-[#8B5CF6] text-white hover:bg-[#7c3aed]"
        >
          <Link href={hrefPrimary}>{primaryLabel}</Link>
        </Button>
        {onSecondaryAction ? (
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full border-zinc-300 bg-transparent dark:border-zinc-600"
            onClick={onSecondaryAction}
          >
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
