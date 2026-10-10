import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function readTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const current = document.documentElement.dataset.theme;
  return current === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ms-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", next === "light" ? "#f4f0e6" : "#0a0c0b");
    }
  }

  return (
    <Button
      type="button"
      variant="nav"
      size="icon"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
