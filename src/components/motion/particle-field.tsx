import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    const dots: Dot[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots.length = 0;
      const count = window.innerWidth < 768 ? 28 : 72;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < count; i += 1) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -0.12 - Math.random() * 0.28,
          r: Math.random() * 2.2 + 0.6,
          a: 0.35 + Math.random() * 0.55,
        });
      }
    };

    resize();
    seed();

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.y < -6) {
          dot.y = h + 4;
          dot.x = Math.random() * w;
        }
        if (dot.x < -6) dot.x = w + 4;
        if (dot.x > w + 6) dot.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(62, 207, 142, ${dot.a})`;
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
