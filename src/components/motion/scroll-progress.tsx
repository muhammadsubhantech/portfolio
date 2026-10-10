import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
