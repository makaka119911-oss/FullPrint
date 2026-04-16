import Link from "next/link";

const links = [
  { href: "#", label: "Политика" },
  { href: "#", label: "Контакты" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          © {new Date().getFullYear()} FullPrint. Все права защищены.
        </p>
        <div className="flex items-center gap-4">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-zinc-600 transition hover:text-foreground dark:text-zinc-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

