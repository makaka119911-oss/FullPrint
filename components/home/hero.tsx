/**
 * Полиш: микроподпись у CTA, focus-ring у поля, лёгкий hover у мини-карточек потока
 * (без смены копирайтинга и структуры).
 */
const pipelineSteps = [
  { step: "01", label: "Описание", detail: "Текстовый бриф" },
  { step: "02", label: "Референс", detail: "Фиксация формы" },
  { step: "03", label: "3D-модель", detail: "Проверка геометрии" },
  { step: "04", label: "Выгрузка", detail: "STL или 3MF" },
];

function PipelineRail() {
  return (
    <div className="rounded-xl border border-zinc-300 bg-white p-4 shadow-sm sm:p-5">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        Производственный поток
      </p>
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pipelineSteps.map((item) => (
          <li
            key={item.step}
            className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 transition hover:border-zinc-400 hover:bg-white hover:shadow-sm"
          >
            <span className="font-mono text-xs text-zinc-400">{item.step}</span>
            <span className="mt-1 block text-sm font-semibold text-zinc-950">
              {item.label}
            </span>
            <span className="mt-0.5 block text-xs text-zinc-500">
              {item.detail}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="border-b border-zinc-300 bg-gradient-to-b from-white to-zinc-50 py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-5 lg:pt-3">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">
              FullPrint · текст в 3D-печать
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              Опишите деталь словами — получите файл, готовый к 3D-печати.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Вы задаете требования в свободной форме. Система последовательно
              проводит через 4 шага: референс, 3D-модель и выгрузка в{" "}
              <span className="font-medium text-zinc-800">STL</span> или{" "}
              <span className="font-medium text-zinc-800">3MF</span>. На каждом
              этапе есть подтверждение, чтобы финальная геометрия совпадала с
              вашим ожиданием.
            </p>
            <ul className="mt-6 space-y-2 border-l-2 border-zinc-300 pl-4 text-sm text-zinc-600">
              <li>
                <span className="font-medium text-zinc-800">В брифе:</span>{" "}
                размеры, форма, материал и технология печати (FDM, SLA, SLS).
              </li>
              <li>
                <span className="font-medium text-zinc-800">На выходе:</span>{" "}
                проверенная твердотельная модель и файл для слайсера.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <div
              id="prompt"
              className="rounded-xl border border-zinc-900 bg-white p-5 shadow-lg shadow-zinc-900/10 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label
                  htmlFor="prompt-input"
                  className="text-sm font-semibold text-zinc-950"
                >
                  Начните здесь — опишите деталь
                </label>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Демо · без бэкенда
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Укажите размеры в мм, толщины, отверстия, скругления и технологию
                печати.
              </p>
              <textarea
                id="prompt-input"
                name="prompt"
                rows={5}
                placeholder="Пример: Кронштейн, основание 80×40 мм, стенки 3 мм, два отверстия M4 с шагом 50 мм, минимальные скругления 2 мм для FDM."
                className="mt-4 w-full resize-y rounded-md border border-zinc-400 bg-zinc-50 px-3 py-2.5 font-mono text-sm leading-6 text-zinc-900 outline-none transition focus:border-zinc-900 focus:bg-white focus-visible:ring-2 focus-visible:ring-zinc-900/15 focus-visible:ring-offset-2"
              />
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-900/30 transition hover:bg-zinc-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:w-auto"
              >
                Запустить пайплайн (скоро)
              </button>
              <p className="mt-2 text-[11px] leading-4 text-zinc-500">
                Только UI: запрос не уходит на сервер.
              </p>
              <p className="mt-3 text-xs leading-5 text-zinc-600">
                <span className="font-medium text-zinc-800">Контроль качества:</span>{" "}
                перед выгрузкой подтверждаются референс и 3D-модель, чтобы
                исключить печать неверной геометрии.
              </p>
            </div>

            <PipelineRail />
          </div>
        </div>
      </div>
    </section>
  );
}
