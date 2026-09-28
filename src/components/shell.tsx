import { Link } from "@tanstack/react-router";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-navy/95 text-navy-fg backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="group flex min-h-11 items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="size-9 object-contain transition-transform duration-150 group-hover:scale-105"
            />
            <span className="font-display text-lg font-extrabold tracking-tight">
              TreasureRate
              <span className="gold-text">.com</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-navy-fg/80 hover:text-gold-bright"
            >
              Vault
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>Automate the mundane. Elevate the extraordinary.</p>
          <p>Inspired by the TreasureRate agent vault. One job per agent.</p>
        </div>
      </footer>
    </div>
  );
}
