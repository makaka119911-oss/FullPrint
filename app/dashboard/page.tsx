import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-300">
          FullPrint AI · workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Дашборд
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
          Управляйте генерациями, публикациями в маркетплейсе, покупками и
          профилем в одном месте.
        </p>

        <DashboardTabs />
      </div>
    </div>
  );
}

