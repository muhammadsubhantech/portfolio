import { useEffect, useState } from "react";

export function BootLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("ms-boot") === "1") return;
      sessionStorage.setItem("ms-boot", "1");
    } catch {
      return;
    }
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="boot-loader" role="status" aria-label="Loading Muhammad Subhan Tech">
      <p className="font-display text-5xl text-fg">MS</p>
      <span className="boot-line" />
    </div>
  );
}
