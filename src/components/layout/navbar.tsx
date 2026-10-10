import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV } from "@/data/site";
import { cn } from "@/lib/utils";
import { useChatUi } from "@/store/ui";

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const setChatOpen = useChatUi((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out)]",
        scrolled || open ? "nav-glass" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "nav-link rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.8125rem] tracking-tight no-underline transition-[color,background-color] duration-200",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
                data-active={active ? "true" : "false"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden text-muted md:inline-flex"
            onClick={() => setChatOpen(true)}
          >
            <Sparkles className="size-3.5 text-accent" />
            Ask Subhan AI
          </Button>
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">
              Let's Connect
              <ArrowUpRight className="arrow-shift size-3.5" />
            </Link>
          </Button>
          <Button
            type="button"
            variant="nav"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-border bg-bg px-4 py-4 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-base text-fg no-underline hover:bg-surface"
            >
              {item.label}
            </Link>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="mt-2 w-full"
            onClick={() => {
              setOpen(false);
              setChatOpen(true);
            }}
          >
            Ask Subhan AI
          </Button>
          <Button asChild variant="primary" className="w-full">
            <Link to="/contact">Let's Connect</Link>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
