"use client";

import { useCallback, useId, useState } from "react";

export function InstantQuoteCard() {
  const uid = useId();
  const fileId = `${uid}-file`;
  const [fileName, setFileName] = useState<string | null>(null);

  const onFile = useCallback((f: FileList | null) => {
    const file = f?.[0];
    setFileName(file ? file.name : null);
  }, []);

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-zinc-600 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

  return (
    <div
      id="prompt"
      className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 text-zinc-50 shadow-2xl shadow-black/35 ring-1 ring-white/10"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative p-6 sm:p-8">
        <div className="border-b border-white/10 pb-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/90">
            Заявка на предкотировку
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
            Комплект для расчёта партии
          </h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              "Рассмотрение заявки",
              "Уточнение при необходимости",
              "Коммерческое предложение",
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/50 px-3 py-2 text-[11px] font-medium leading-snug text-zinc-300"
              >
                <span className="font-mono text-[10px] text-teal-400/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor={fileId}
              className="text-xs font-medium text-zinc-400"
            >
              Файл модели <span className="text-zinc-500">(STL, 3MF, STEP)</span>
            </label>
            <label
              htmlFor={fileId}
              className="mt-1.5 flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-600 bg-zinc-950/70 px-3 py-5 text-center transition hover:border-teal-500/50 hover:bg-zinc-950 focus-within:ring-2 focus-within:ring-teal-500/40 focus-within:ring-offset-2 focus-within:ring-offset-zinc-900"
            >
              <span className="text-sm text-zinc-200">
                Перетащите файл или выберите на устройстве
              </span>
              <input
                id={fileId}
                type="file"
                accept=".stl,.3mf,.step,.stp"
                className="sr-only"
                onChange={(e) => onFile(e.target.files)}
              />
            </label>
            {fileName ? (
              <p className="mt-2 truncate font-mono text-xs text-teal-200/95">
                {fileName}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${uid}-qty`}
                className="text-xs font-medium text-zinc-400"
              >
                Тираж, шт.
              </label>
              <input
                id={`${uid}-qty`}
                type="number"
                min={1}
                placeholder="1"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor={`${uid}-material`}
                className="text-xs font-medium text-zinc-400"
              >
                Предпочтение по материалу
              </label>
              <select
                id={`${uid}-material`}
                className={inputClass}
                defaultValue="pla"
              >
                <option value="pla">PLA / FDM</option>
                <option value="petg">PETG / FDM</option>
                <option value="abs">ABS / FDM</option>
                <option value="resin">Фотополимер / SLA</option>
                <option value="pa12">PA12 / SLS</option>
                <option value="unsure">Нужна рекомендация</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor={`${uid}-deadline`}
                className="text-xs font-medium text-zinc-400"
              >
                Желаемый срок / дедлайн
              </label>
              <input
                id={`${uid}-deadline`}
                type="text"
                placeholder="Например: 20 апреля или «как можно раньше»"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor={`${uid}-comment`}
                className="text-xs font-medium text-zinc-400"
              >
                Комментарий к задаче
              </label>
              <textarea
                id={`${uid}-comment`}
                rows={3}
                placeholder="Допуски, постобработка, назначение детали, особые требования"
                className={`${inputClass} resize-y min-h-[4.5rem]`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs leading-relaxed text-zinc-500">
              Итог: менеджер проверяет комплект, при необходимости запрашивает
              уточнения, затем направляет КП с условиями и маршрутом.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-950/40 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            Отправить на расчёт
          </button>
        </div>
      </div>
    </div>
  );
}
