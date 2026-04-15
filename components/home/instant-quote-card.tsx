"use client";

import { useCallback, useId, useState } from "react";

export function InstantQuoteCard() {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  const onFile = useCallback((f: FileList | null) => {
    const file = f?.[0];
    setFileName(file ? file.name : null);
  }, []);

  return (
    <div
      id="prompt"
      className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 text-zinc-50 shadow-2xl shadow-zinc-900/25 ring-1 ring-white/10"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
        aria-hidden
      />
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/90">
              Онлайн-оценка
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
              Загрузка модели и предварительный расчёт
            </h2>
          </div>
          <span className="rounded border border-white/15 bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            Демо · без сервера
          </span>
        </div>

        <label
          htmlFor={inputId}
          className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-600 bg-zinc-950/50 px-4 py-10 text-center transition hover:border-teal-500/50 hover:bg-zinc-950/80 focus-within:ring-2 focus-within:ring-teal-500/40 focus-within:ring-offset-2 focus-within:ring-offset-zinc-900"
        >
          <span className="text-sm font-medium text-zinc-200">
            Перетащите файл или нажмите для выбора
          </span>
          <span className="mt-1 text-xs text-zinc-500">
            STL, 3MF или STEP · до 50 МБ в будущей версии
          </span>
          <input
            id={inputId}
            type="file"
            accept=".stl,.3mf,.step,.stp"
            className="sr-only"
            onChange={(e) => onFile(e.target.files)}
          />
        </label>

        {fileName ? (
          <p className="mt-3 truncate text-center font-mono text-xs text-teal-200">
            {fileName}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="demo-material"
              className="text-xs font-medium text-zinc-400"
            >
              Материал (пример)
            </label>
            <select
              id="demo-material"
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              defaultValue="pla"
            >
              <option value="pla">PLA / FDM</option>
              <option value="petg">PETG / FDM</option>
              <option value="abs">ABS / FDM</option>
              <option value="resin">Фотополимер / SLA</option>
              <option value="pa12">PA12 / SLS</option>
            </select>
          </div>
          <div>
            <span className="text-xs font-medium text-zinc-400">
              Ориентир по сроку
            </span>
            <div className="mt-1.5 flex h-[42px] items-center rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-300">
              2–5 раб. дней · серийность уточняется
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Предварительная вилка
            </span>
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-white">
              от — ₽
            </span>
            <span className="text-[11px] text-zinc-500">
              Итоговая цена после проверки модели и постобработки.
            </span>
          </div>
          <button
            type="button"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            Получить расчёт (скоро)
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-500">
          В этой сборке запрос не уходит в облако — только интерфейс и локальный
          выбор файла.
        </p>
      </div>
    </div>
  );
}
