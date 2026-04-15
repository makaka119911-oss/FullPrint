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
    <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition duration-300 hover:border-teal-500/25 hover:shadow-md">
      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-teal-900 sm:text-3xl">
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
