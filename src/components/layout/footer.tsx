import { Link } from "@tanstack/react-router";
import { NAV, SITE, SOCIALS } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_0.8fr_0.9fr] md:px-6">
        <div>
          <p className="font-display text-2xl text-fg">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{SITE.footerLine}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            Navigation
          </p>
          <ul className="mt-3 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted no-underline hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            Social
          </p>
          <ul className="mt-3 space-y-2">
            {SOCIALS.filter((s) => s.id !== "portfolio").map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted no-underline hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-border px-4 py-6 text-xs text-subtle md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          © {SITE.year} {SITE.name}. All rights reserved.
        </p>
        <p>{SITE.builtLine}</p>
      </div>
    </footer>
  );
}
