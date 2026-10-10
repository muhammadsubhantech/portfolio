import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 text-fg no-underline"
      aria-label="Muhammad Subhan home"
    >
      <span
        className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-surface text-[0.7rem] font-semibold tracking-[0.12em] text-accent shadow-[var(--shadow-border)]"
        aria-hidden="true"
      >
        MS
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">Muhammad Subhan</span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:block">
            Tech
          </span>
        </span>
      )}
    </Link>
  );
}
