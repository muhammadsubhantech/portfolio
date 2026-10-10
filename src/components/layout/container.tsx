import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  wide,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-6",
        wide ? "max-w-6xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
