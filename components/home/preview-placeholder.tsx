/**
 * Полиш: системная подпись в тулбаре (демо/условные данные), без изменения сценария.
 */
import { Section } from "./section";

export function PreviewWorkspaceSection() {
  return (
    <Section
      id="workspace"
      eyebrow="Рабочая зона"
      title="Панель проверки модели"
      subtitle="Экран оператора: 3D-модель, статус подтверждений по шагам 01–04 и контроль выгрузки до финального релиза."
    >
      <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-lg shadow-zinc-900/30 ring-1 ring-zinc-800/60">
        <div className="flex flex-col gap-2 border-b border-zinc-700 bg-zinc-900/85 px-4 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Задание
            </span>
            <span className="font-mono text-[11px] text-zinc-300">FP-PILOT-0142</span>
            <span className="hidden text-zinc-600 sm:inline" aria-hidden>
              ·
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Шаг
            </span>
            <span className="rounded border border-zinc-600 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-200">
              03 · проверка 3D-модели
            </span>
            <span className="hidden text-zinc-600 sm:inline" aria-hidden>
              ·
            </span>
            <span className="font-mono text-[10px] text-zinc-500 sm:inline">
              демо · без данных
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-zinc-500">
            <span className="text-zinc-400">Подтверждения</span>
            <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-zinc-400">
              01 ✓
            </span>
            <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-zinc-400">
              02 ✓
            </span>
            <span className="rounded border border-zinc-600 px-1.5 py-0.5 text-zinc-300">
              03 в работе
            </span>
            <span className="rounded border border-zinc-800 px-1.5 py-0.5 text-zinc-600">
              04 заблокирован
            </span>
          </div>
        </div>
        <div className="grid gap-px bg-zinc-700 lg:grid-cols-[1fr_260px]">
          <div className="relative flex min-h-[280px] flex-col items-center justify-center bg-zinc-900 p-8 lg:min-h-[340px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_48%)]" />
            <div className="text-center">
              <div className="mx-auto h-28 w-28 rounded-lg border border-dashed border-zinc-600 bg-zinc-950/80" />
              <p className="mt-4 font-mono text-xs text-zinc-500">
                Вьюпорт офлайн · модель не загружена
              </p>
              <p className="mt-1 max-w-sm text-center font-mono text-[10px] leading-relaxed text-zinc-600">
                Планируется: орбита, сечение, измерение по референсу шага 02.
                Выгрузка отключена до подтверждения шага 04.
              </p>
            </div>
          </div>
          <aside className="flex flex-col gap-px bg-zinc-700">
            <div className="bg-zinc-900 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Выгрузка (шаг 04)
              </p>
              <dl className="mt-3 space-y-2 font-mono text-[11px] text-zinc-400">
                <div className="flex justify-between gap-4">
                  <dt>Форматы</dt>
                  <dd className="text-right text-zinc-300">STL · 3MF</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Единицы</dt>
                  <dd className="text-zinc-300">mm</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Объем печати</dt>
                  <dd className="text-right text-zinc-300">220×220×250</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Замкнутость</dt>
                  <dd className="text-zinc-300">не проверено</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Ревизия</dt>
                  <dd className="text-zinc-300">mesh-r02</dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-zinc-800 bg-zinc-950 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                Журнал
              </p>
              <ul className="mt-2 space-y-1.5 font-mono text-[10px] leading-snug text-zinc-500">
                <li>14:02 Шаг 02 — референс подтвержден · оператор A</li>
                <li>14:18 Модель r02 в очереди — ожидает шага 03</li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-end bg-zinc-900 p-4">
              <button
                type="button"
                disabled
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 py-2 font-mono text-[11px] text-zinc-500"
              >
                Выгрузка заблокирована · шаг 04
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
