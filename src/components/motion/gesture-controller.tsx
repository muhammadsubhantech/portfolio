import { Camera, Hand, Power } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_WIDTH = 96;
const VIDEO_HEIGHT = 72;
const GRID_COLUMNS = 8;
const GRID_ROWS = 6;
const INTERACTIVE = 'a[href^="/"], a[href^="#"], button:not([data-gesture-toggle]), [role="button"], [role="tab"], input:not([type="hidden"]), select, textarea';

/** Optional, on-device motion cursor for scrolling and navigating the whole site. */
export function GestureController() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("Camera off");
  const cursorElement = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const activityRef = useRef({ lastMotion: 0, dwellTarget: null as HTMLElement | null, dwellStart: 0, fired: false });

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("Camera unavailable in this browser");
      setEnabled(false);
      return;
    }

    let stopped = false;
    let stream: MediaStream | undefined;
    let sampleTimer = 0;
    let frame = 0;
    let previous: Uint8Array | undefined;
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    canvas.width = VIDEO_WIDTH;
    canvas.height = VIDEO_HEIGHT;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const activity = activityRef.current;
    activity.dwellTarget = null;
    activity.dwellStart = 0;
    activity.fired = false;

    void navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 320 }, height: { ideal: 240 } },
      audio: false,
    }).then((camera) => {
      if (stopped) {
        camera.getTracks().forEach((track) => track.stop());
        return;
      }
      stream = camera;
      video.srcObject = camera;
      video.muted = true;
      void video.play();
      setStatus("Move hand · pause to select · screen edges to scroll");

      const sample = () => {
        if (stopped) return;
        if (context && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          context.drawImage(video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
          const pixels = context.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT).data;
          const current = new Uint8Array(VIDEO_WIDTH * VIDEO_HEIGHT);
          const cellCount = new Uint16Array(GRID_COLUMNS * GRID_ROWS);
          const cellX = new Float32Array(GRID_COLUMNS * GRID_ROWS);
          const cellY = new Float32Array(GRID_COLUMNS * GRID_ROWS);
          for (let i = 0, pixel = 0; i < pixels.length; i += 4, pixel += 1) {
            const luminance = (pixels[i]! * 3 + pixels[i + 1]! * 6 + pixels[i + 2]!) / 10;
            current[pixel] = luminance;
            if (previous && Math.abs(luminance - previous[pixel]!) > 21) {
              const x = pixel % VIDEO_WIDTH;
              const y = Math.floor(pixel / VIDEO_WIDTH);
              const col = Math.min(GRID_COLUMNS - 1, Math.floor(x / (VIDEO_WIDTH / GRID_COLUMNS)));
              const row = Math.min(GRID_ROWS - 1, Math.floor(y / (VIDEO_HEIGHT / GRID_ROWS)));
              const cell = row * GRID_COLUMNS + col;
              cellCount[cell] += 1;
              cellX[cell] += x;
              cellY[cell] += y;
            }
          }

          // Low-resolution frame differencing stays local; no video or frames leave the device.
          if (previous) {
            let densest = 0;
            for (let cell = 1; cell < cellCount.length; cell += 1) {
              if (cellCount[cell]! > cellCount[densest]!) densest = cell;
            }
            const centerCol = densest % GRID_COLUMNS;
            const centerRow = Math.floor(densest / GRID_COLUMNS);
            let motionPixels = 0;
            let xSum = 0;
            let ySum = 0;
            for (let row = Math.max(0, centerRow - 1); row <= Math.min(GRID_ROWS - 1, centerRow + 1); row += 1) {
              for (let col = Math.max(0, centerCol - 1); col <= Math.min(GRID_COLUMNS - 1, centerCol + 1); col += 1) {
                const cell = row * GRID_COLUMNS + col;
                motionPixels += cellCount[cell]!;
                xSum += cellX[cell]!;
                ySum += cellY[cell]!;
              }
            }
            const maxNoise = VIDEO_WIDTH * VIDEO_HEIGHT * 0.24;
            if (motionPixels > 10 && motionPixels < maxNoise) {
              const bounds = { x: xSum / motionPixels / VIDEO_WIDTH, y: ySum / motionPixels / VIDEO_HEIGHT };
              const gain = 1.35;
              const mappedX = Math.max(0, Math.min(1, 0.5 + ((1 - bounds.x) - 0.5) * gain));
              const mappedY = Math.max(0, Math.min(1, 0.5 + (bounds.y - 0.5) * gain));
              const nextX = mappedX * window.innerWidth;
              const nextY = mappedY * window.innerHeight;
              const target = cursorRef.current;
              const stale = performance.now() - activity.lastMotion > 2200;
              const response = stale ? 1 : 0.78;
              target.x += (nextX - target.x) * response;
              target.y += (nextY - target.y) * response;
              activity.lastMotion = performance.now();
            }
          }
          previous = current;
        }
        sampleTimer = window.setTimeout(sample, 70);
      };
      sample();
    }).catch(() => {
      if (!stopped) {
        setStatus("Camera permission not granted");
        setEnabled(false);
      }
    });

    const tick = () => {
      if (stopped) return;
      const now = performance.now();
      const target = cursorRef.current;
      const visible = now - activity.lastMotion < 2200;

      if (visible) {
        const x = Math.max(8, Math.min(window.innerWidth - 8, target.x));
        const y = Math.max(8, Math.min(window.innerHeight - 8, target.y));
        const under = document.elementFromPoint(x, y);
        const interactive = under?.closest<HTMLElement>(INTERACTIVE) ?? null;
        const galleryCanvas = under instanceof HTMLCanvasElement && under.closest(".banner-stage") ? under : null;
        const safeInternalLink = interactive?.matches("a[href^='/'], a[href^='#']") ?? false;
        const dwellable = interactive?.tagName === "BUTTON" || safeInternalLink || ["button", "tab"].includes(interactive?.getAttribute("role") ?? "") || ["INPUT", "SELECT", "TEXTAREA"].includes(interactive?.tagName ?? "");
        const candidate = galleryCanvas ?? (dwellable && !interactive?.hasAttribute("disabled") && !interactive?.hasAttribute("data-gesture-toggle") ? interactive : null);

        if (candidate !== activity.dwellTarget) {
          activity.dwellTarget = candidate;
          activity.dwellStart = now;
          activity.fired = false;
        }

        let progress = 0;
        if (candidate) {
          progress = Math.min(1, (now - activity.dwellStart) / 700);
          if (progress >= 1 && !activity.fired) {
            activity.fired = true;
            candidate.click();
            setStatus("Opened selection");
          }
        }

        // Resting near the top/bottom edge scrolls the page without changing routes.
        if (y < 44) window.scrollBy({ top: -Math.min(12, (44 - y) * 0.22), behavior: "auto" });
        else if (y > window.innerHeight - 44) window.scrollBy({ top: Math.min(12, (y - window.innerHeight + 44) * 0.22), behavior: "auto" });

        document.elementFromPoint(x, y)?.dispatchEvent(new PointerEvent("pointermove", {
          bubbles: true,
          clientX: x,
          clientY: y,
          pointerType: "mouse",
        }));
        const cursor = cursorElement.current;
        if (cursor) {
          cursor.style.left = `${x}px`;
          cursor.style.top = `${y}px`;
          cursor.style.setProperty("--gesture-angle", `${progress * 360}deg`);
          cursor.dataset.visible = "true";
        }
      } else {
        activity.dwellTarget = null;
        activity.fired = false;
        if (cursorElement.current) cursorElement.current.dataset.visible = "false";
      }

      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.clearTimeout(sampleTimer);
      window.cancelAnimationFrame(frame);
      stream?.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      if (cursorElement.current) cursorElement.current.dataset.visible = "false";
      setStatus("Camera off");
    };
  }, [enabled]);

  return (
    <>
      <aside className="site-gesture" aria-label="Site gesture controller">
        <span className="site-gesture-status" aria-live="polite">
          <span className={enabled ? "gesture-indicator is-live" : "gesture-indicator"} />
          {status}
        </span>
        <button
          type="button"
          className="gesture-toggle"
          data-gesture-toggle
          aria-label={enabled ? "Turn off gesture control" : "Turn on gesture control"}
          aria-pressed={enabled}
          onClick={() => setEnabled((value) => !value)}
        >
          {enabled ? <Power aria-hidden="true" /> : <Hand aria-hidden="true" />}
          {enabled ? "Turn off" : "Use gestures"}
          {!enabled && <Camera aria-hidden="true" />}
        </button>
      </aside>
      <div ref={cursorElement} className="gesture-cursor" data-visible="false" aria-hidden="true" />
    </>
  );
}
