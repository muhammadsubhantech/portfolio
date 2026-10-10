import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium tracking-tight transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent)] hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_10px_24px_-14px_var(--accent)]",
        secondary:
          "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-surface",
        ghost: "bg-transparent text-fg hover:text-accent",
        nav: "bg-transparent text-muted hover:text-fg",
      },
      size: {
        sm: "h-10 min-h-10 px-3.5 text-sm",
        md: "h-11 min-h-11 px-4 text-sm",
        lg: "h-12 min-h-12 px-5 text-[0.9375rem]",
        icon: "size-10 min-h-10 min-w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
