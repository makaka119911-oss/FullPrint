/**
 * Полиш: чётче слои «лейбл → значение → сноска», лёгкий hover без смены палитры.
 */
type StatCardProps = {
  label: string;
  value: string;
  footnote?: string;
};

export function StatCard({ label, value, footnote }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-300 bg-white px-5 py-4 shadow-sm transition hover:border-zinc-400 hover:shadow-md">
      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-zinc-950 sm:text-3xl">
        {value}
      </p>
      {footnote ? (
        <p className="mt-3 border-t border-zinc-100 pt-2 text-xs leading-5 text-zinc-500">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
