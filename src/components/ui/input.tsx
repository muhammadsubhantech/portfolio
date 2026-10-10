import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-[var(--radius-sm)] bg-bg-elevated px-3.5 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle",
        "transition-[box-shadow] duration-200 ease-[var(--ease-out)]",
        "focus-visible:shadow-[var(--shadow-border-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-[var(--radius-md)] bg-bg-elevated px-3.5 py-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle",
        "transition-[box-shadow] duration-200 ease-[var(--ease-out)]",
        "focus-visible:shadow-[var(--shadow-border-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-xs font-medium uppercase tracking-[0.14em] text-muted", className)}
      {...props}
    />
  );
}
