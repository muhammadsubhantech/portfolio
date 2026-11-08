import { Camera, Hand, Power } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a[href], button:not([data-gesture-toggle]), [role="button"], [role="tab"], input:not([type="hidden"]), select, textarea';
const VISION_MODULE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs";
const VISION_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm";
const HAND_MODEL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

type HandLandmarker = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => {
    landmarks?: Array<Array<{ x: number; y: number; z: number }>>;
  };
  close: () => void;
};

type GestureState = {
  lastSeen: number;
  pinchDown: boolean;
  lastClick: number;
};

/** Optional, on-device hand cursor for scrolling and navigating the whole site. */
export function GestureController() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("Camera off");
  const cursorElement = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const gestureRef = useRef<GestureState>({ lastSeen: 0, pinchDown: false, lastClick: 0 });

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("Camera unavailable in this browser");
      setEnabled(false);
      return;
    }

    let stopped = false;
    let stream: MediaStream | undefined;
    let frame = 0;
    let landmarker: HandLandmarker | undefined;
    let lastDetection = 0;
    let lastTimestamp = 0;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    const gesture = gestureRef.current;
    gesture.lastSeen = 0;
    gesture.pinchDown = false;

    const start = async () => {
      try {
        setStatus("Requesting camera access");
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        if (stopped) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        video.srcObject = stream;
        await video.play();

        setStatus("Loading hand tracking");
        const vision = await import(/* @vite-ignore */ VISION_MODULE);
        const files = await vision.FilesetResolver.forVisionTasks(VISION_WASM);
        landmarker = await vision.HandLandmarker.createFromOptions(files, {
          baseOptions: { modelAssetPath: HAND_MODEL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.7,
          minHandPresenceConfidence: 0.65,
          minTrackingConfidence: 0.65,
        }) as HandLandmarker;
        if (stopped) return;
        setStatus("Show your hand · pinch to click · reach screen edges to scroll");

        const tick = (now: number) => {
          if (stopped) return;
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && now - lastDetection > 32 && landmarker) {
            lastDetection = now;
            const timestamp = Math.max(now, lastTimestamp + 1);
            lastTimestamp = timestamp;
            const results = landmarker.detectForVideo(video, timestamp);
            const points = results.landmarks?.[0];
            const cursor = cursorElement.current;

            if (points) {
              const index = points[8]!;
              const thumb = points[4]!;
              const mirroredX = 1 - index.x;
              const nextX = Math.max(0, Math.min(1, 0.5 + (mirroredX - 0.5) * 1.18)) * window.innerWidth;
              const nextY = Math.max(0, Math.min(1, 0.5 + (index.y - 0.5) * 1.18)) * window.innerHeight;
              const target = cursorRef.current;
              target.x += (nextX - target.x) * 0.42;
              target.y += (nextY - target.y) * 0.42;
              gesture.lastSeen = now;

              const x = Math.max(8, Math.min(window.innerWidth - 8, target.x));
              const y = Math.max(8, Math.min(window.innerHeight - 8, target.y));
              const pinching = Math.hypot(index.x - thumb.x, index.y - thumb.y) < 0.055;

              if (pinching && !gesture.pinchDown && now - gesture.lastClick > 550) {
                const targetElement = document.elementFromPoint(x, y);
                const interactive = targetElement?.closest<HTMLElement>(INTERACTIVE) ?? null;
                const canvasTarget = targetElement instanceof HTMLCanvasElement && targetElement.closest(".banner-stage") ? targetElement : null;
                const candidate = canvasTarget ?? interactive;
                if (candidate && !candidate.hasAttribute("disabled") && !candidate.hasAttribute("data-gesture-toggle")) {
                  candidate.click();
                  gesture.lastClick = now;
                  setStatus("Pinch click");
                }
              }
              gesture.pinchDown = pinching;

              if (y < 44) window.scrollBy({ top: -Math.min(12, (44 - y) * 0.22), behavior: "auto" });
              else if (y > window.innerHeight - 44) window.scrollBy({ top: Math.min(12, (y - window.innerHeight + 44) * 0.22), behavior: "auto" });

              document.elementFromPoint(x, y)?.dispatchEvent(new PointerEvent("pointermove", {
                bubbles: true,
                clientX: x,
                clientY: y,
                pointerType: "mouse",
              }));
              if (cursor) {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
                cursor.style.setProperty("--gesture-angle", pinching ? "360deg" : "0deg");
                cursor.dataset.visible = "true";
                cursor.dataset.pinch = String(pinching);
              }
            } else {
              gesture.pinchDown = false;
              if (now - gesture.lastSeen > 900 && cursor) cursor.dataset.visible = "false";
            }
          }
          frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      } catch {
        if (!stopped) {
          setStatus("Hand tracking unavailable · check camera access and connection");
          setEnabled(false);
        }
      }
    };

    void start();
    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      landmarker?.close();
      stream?.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      if (cursorElement.current) {
        cursorElement.current.dataset.visible = "false";
        cursorElement.current.dataset.pinch = "false";
      }
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
      <div ref={cursorElement} className="gesture-cursor" data-visible="false" data-pinch="false" aria-hidden="true" />
    </>
  );
}
