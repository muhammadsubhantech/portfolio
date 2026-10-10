import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-3xl pt-10 md:pt-16">
      {eyebrow ? (
        <p className="reveal text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="reveal reveal-d1 mt-4 max-w-full font-display text-[2.15rem] leading-[1.08] text-fg md:text-5xl lg:text-[3.6rem]">
        {title}
      </h1>
      {children ? (
        <div className="reveal reveal-d2 mt-5 max-w-2xl text-base text-muted md:text-lg">
          {children}
        </div>
      ) : null}
    </header>
  );
}
