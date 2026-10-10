import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrap.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      80,
    );
    camera.position.set(0, 0.15, 9);

    const rig = new THREE.Group();
    scene.add(rig);

    const emerald = 0x3ecf8e;
    const mint = 0xb8ffe0;

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.85, 1),
      new THREE.MeshBasicMaterial({ color: emerald, wireframe: true }),
    );
    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      new THREE.MeshBasicMaterial({ color: mint }),
    );
    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.018, 16, 180),
      new THREE.MeshBasicMaterial({ color: emerald }),
    );
    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.01, 12, 160),
      new THREE.MeshBasicMaterial({ color: 0x7ae0b0, transparent: true, opacity: 0.7 }),
    );
    ringB.rotation.x = Math.PI / 2.2;
    const ringC = new THREE.Mesh(
      new THREE.TorusGeometry(3.05, 0.006, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0xf3f0e8, transparent: true, opacity: 0.35 }),
    );
    ringC.rotation.x = Math.PI / 3.1;
    ringC.rotation.y = 0.6;
    rig.add(core, nucleus, ringA, ringB, ringC);

    const count = window.innerWidth < 768 ? 900 : 2200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.2 + Math.pow(Math.random(), 0.6) * 9;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 11;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({
        color: 0xc8ffe6,
        size: window.innerWidth < 768 ? 0.035 : 0.028,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    scene.add(points);

    const place = () => {
      rig.position.x = host.clientWidth < 900 ? 0 : 2.15;
    };
    place();

    const pointer = { x: 0, y: 0 };
    const onMove = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 2;
      pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onMove);

    let scrollBoost = 0;
    const onScroll = () => {
      const box = host.getBoundingClientRect();
      scrollBoost = THREE.MathUtils.clamp(-box.top / Math.max(box.height, 1), 0, 1.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let frame = 0;
    let running = true;
    const clock = new THREE.Clock();
    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      rig.rotation.y = t * 0.45 + scrollBoost * 1.6;
      rig.rotation.x = Math.sin(t * 0.3) * 0.35 + pointer.y * 0.35;
      ringA.rotation.z = t * 0.7;
      ringB.rotation.z = -t * 0.45;
      ringC.rotation.y = t * 0.2;
      core.rotation.y = -t * 0.6;
      nucleus.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08);
      points.rotation.y = t * 0.06 + scrollBoost * 0.4;
      camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05;
      camera.position.y += (-pointer.y * 0.5 + 0.15 - camera.position.y) * 0.05;
      camera.position.z = 9 - scrollBoost * 2.4;
      camera.lookAt(rig.position.x * 0.35, 0, 0);
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      const w = host.clientWidth;
      const h = Math.max(host.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      place();
    };
    window.addEventListener("resize", onResize);

    const onHide = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        clock.getDelta();
        tick();
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      host.removeEventListener("pointermove", onMove);
      pointsGeo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={wrap} className="hero-scene" aria-hidden="true" />;
}
