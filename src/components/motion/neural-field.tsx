import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function NeuralField({ density = "hero" }: { density?: "hero" | "soft" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const count = reduce ? 0 : mobile ? (density === "hero" ? 18 : 10) : density === "hero" ? 36 : 18;
    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
    }));
    let pulse = 0;
    let frame = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      pulse = (pulse + 0.004) % 1;
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
      }
      const link = mobile ? 0.22 : 0.18;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > link) continue;
          const alpha = (1 - dist / link) * 0.35;
          ctx.strokeStyle = `rgba(62, 207, 142, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
          if (Math.abs(((i * 17 + j) % 100) / 100 - pulse) < 0.02) {
            const t = (pulse * 50) % 1;
            ctx.fillStyle = "rgba(184, 255, 224, 0.85)";
            ctx.beginPath();
            ctx.arc((a.x + (b.x - a.x) * t) * w, (a.y + (b.y - a.y) * t) * h, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      for (const node of nodes) {
        ctx.fillStyle = "rgba(62, 207, 142, 0.75)";
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    if (!reduce && count > 0) frame = window.requestAnimationFrame(draw);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(([entry]) => {
      const visible = Boolean(entry?.isIntersecting);
      if (visible && !running && !reduce) {
        running = true;
        frame = window.requestAnimationFrame(draw);
      }
      if (!visible) running = false;
    });
    io.observe(canvas);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="neural-field" aria-hidden="true" />;
}
