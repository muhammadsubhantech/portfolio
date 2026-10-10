import { useEffect, useRef, type ReactNode } from "react";

/** Fine particle filaments that respond to how far the hero has scrolled. */
export function PortraitField({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fibers = Array.from({ length: window.innerWidth < 768 ? 14 : 26 }, (_, i) => ({
      seed: i * 0.61803398875,
      height: 0.28 + ((i * 37) % 67) / 100,
      bend: ((i * 19) % 100) / 100,
    }));
    let width = 1;
    let height = 1;
    let scroll = 0;
    let frame = 0;
    let visible = false;
    let lastDraw = 0;

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const readScroll = () => {
      const bounds = stage.getBoundingClientRect();
      scroll = Math.max(0, Math.min(1, -bounds.top / Math.max(bounds.height, 1)));
      stage.style.setProperty("--portrait-scroll", scroll.toFixed(3));
      stage.style.setProperty("--portrait-yaw", `${(-scroll * 5).toFixed(2)}deg`);
      stage.style.setProperty("--portrait-tilt", `${(scroll * 2).toFixed(2)}deg`);
      stage.style.setProperty("--portrait-lift", `${(-scroll * 12).toFixed(2)}px`);
      stage.style.setProperty("--portrait-scale", `${(1 - scroll * 0.035).toFixed(4)}`);
      if (visible) schedule();
    };

    const draw = (time: number) => {
      frame = 0;
      if (!visible || time - lastDraw < 28) return;
      lastDraw = time;
      ctx.clearRect(0, 0, width, height);

      // Hair-thin paths peel away from the portrait's right edge as the page moves.
      const spread = 0.08 + scroll * 0.31;
      const drift = reduceMotion ? 0 : time * 0.000025;
      fibers.forEach((fiber, i) => {
        const y = height * (0.1 + fiber.seed % 0.8);
        const startX = width * (0.51 + fiber.bend * 0.36);
        const endX = Math.min(width * 1.04, startX + width * spread * (0.55 + fiber.bend));
        const lift = (fiber.seed - 0.5) * height * (0.28 + scroll * 0.36);
        const wave = Math.sin(drift + fiber.seed * 6) * 9;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.bezierCurveTo(startX + width * 0.12, y + lift * 0.2 + wave, endX - width * 0.08, y - lift + wave, endX, y - lift * fiber.height);
        ctx.strokeStyle = `rgba(218, 242, 235, ${0.11 + fiber.bend * 0.25 + scroll * 0.15})`;
        ctx.lineWidth = i % 5 === 0 ? 1.15 : 0.65;
        ctx.stroke();

        const particleX = startX + (endX - startX) * ((fiber.seed * 5 + drift * 0.35) % 1);
        const particleY = y - lift * fiber.height * ((fiber.seed * 7 + drift) % 1);
        ctx.beginPath();
        ctx.arc(particleX, particleY, i % 4 === 0 ? 1.7 : 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(164, 236, 208, ${0.35 + scroll * 0.42})`;
        ctx.fill();
      });

      // A restrained edge light follows the same scroll progress.
      const glow = ctx.createLinearGradient(width * (0.58 - scroll * 0.08), 0, width, 0);
      glow.addColorStop(0, "rgba(120, 210, 183, 0)");
      glow.addColorStop(1, `rgba(120, 210, 183, ${0.035 + scroll * 0.08})`);
      ctx.fillStyle = glow;
      ctx.fillRect(width * 0.52, 0, width * 0.48, height);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) schedule();
    }, { rootMargin: "100px" });

    resize();
    readScroll();
    observer.observe(stage);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="portrait-motion" ref={stageRef}>
      {children}
      <canvas ref={canvasRef} className="portrait-filaments" aria-hidden="true" />
    </div>
  );
}
