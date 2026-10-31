import { useEffect, useRef } from "react";
import * as THREE from "three";

/** A single scroll-linked 3D scene that travels through the portfolio story. */
export function Portfolio3DStage() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth > 720,
        powerPreference: "high-performance",
      });
    } catch {
      host.dataset.unavailable = "true";
      return;
    }

    const mobile = window.matchMedia("(max-width: 720px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 150);
    camera.position.set(0, 0.2, 8);
    const world = new THREE.Group();
    scene.add(world);

    const cyan = new THREE.MeshBasicMaterial({ color: 0x7ad9ff, wireframe: true, transparent: true, opacity: 0.54 });
    const pale = new THREE.MeshBasicMaterial({ color: 0xd9f4ff, transparent: true, opacity: 0.8 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x17649a,
      metalness: 0.35,
      roughness: 0.24,
      transparent: true,
      opacity: 0.42,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const accent = new THREE.MeshBasicMaterial({ color: 0x388bff, transparent: true, opacity: 0.7 });
    const milestones: THREE.Group[] = [];
    const addOrb = (z: number, radius: number, index: number) => {
      const group = new THREE.Group();
      group.position.set(index % 2 === 0 ? 1.9 : -1.9, index % 2 === 0 ? 0.1 : -0.2, z);
      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 2), cyan);
      const heart = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.46, 28, 24), glass);
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.45, 0.012, 8, 120), pale);
      orbit.rotation.set(0.82 + index * 0.13, 0.24, 0.4);
      const orbit2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.82, 0.007, 6, 120), accent);
      orbit2.rotation.set(1.4, 0.3 + index * 0.18, 0.8);
      group.add(shell, heart, orbit, orbit2);
      world.add(group);
      milestones.push(group);
      return group;
    };

    const hero = addOrb(0, 1.55, 0);
    hero.position.x = 2.2;
    const skill = addOrb(-18, 1.05, 1);
    skill.position.x = -2.05;
    const project = addOrb(-36, 1.35, 2);
    project.position.x = 2.1;
    const now = addOrb(-54, 1.0, 3);
    now.position.x = -1.85;
    const journey = addOrb(-72, 1.2, 4);
    journey.position.x = 1.9;
    const contact = addOrb(-90, 1.6, 5);
    contact.position.x = -1.65;

    // A low-cost ribbon of connected points gives the transitions a continuous path.
    const nodeCount = mobile ? 64 : 120;
    const nodePositions = new Float32Array(nodeCount * 3);
    const linePositions = new Float32Array((nodeCount - 1) * 6);
    for (let i = 0; i < nodeCount; i += 1) {
      const z = 10 - (i / (nodeCount - 1)) * 108;
      const x = Math.sin(i * 0.57) * (1.7 + (i % 5) * 0.17);
      const y = Math.cos(i * 0.41) * (0.9 + (i % 7) * 0.1);
      nodePositions.set([x, y, z], i * 3);
      if (i < nodeCount - 1) {
        linePositions.set([x, y, z, Math.sin((i + 1) * 0.57) * (1.7 + ((i + 1) % 5) * 0.17), Math.cos((i + 1) * 0.41) * (0.9 + ((i + 1) % 7) * 0.1), 10 - ((i + 1) / (nodeCount - 1)) * 108], i * 6);
      }
    }
    const pathGeo = new THREE.BufferGeometry();
    pathGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const path = new THREE.LineSegments(pathGeo, new THREE.LineBasicMaterial({ color: 0x6bbfff, transparent: true, opacity: 0.18 }));
    world.add(path);
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const points = new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: 0xd9f4ff, size: mobile ? 0.045 : 0.055, transparent: true, opacity: 0.9, sizeAttenuation: true }));
    world.add(points);

    // A fine star field adds depth without competing with the readable page.
    const starsCount = mobile ? 180 : 420;
    const starsPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i += 1) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 27;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      starsPositions[i * 3 + 2] = 12 - Math.random() * 112;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xb4dfff, size: 0.025, transparent: true, opacity: 0.52, sizeAttenuation: true }));
    world.add(stars);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const readPointer = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 0.55;
      pointer.targetY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 0.24;
    };
    const getScrollProgress = () => {
      const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return THREE.MathUtils.clamp(window.scrollY / range, 0, 1);
    };
    let progress = getScrollProgress();
    const updateScroll = () => {
      progress = getScrollProgress();
      document.documentElement.style.setProperty("--portfolio-progress", progress.toFixed(4));
      if (reducedMotion) render();
    };
    document.documentElement.style.setProperty("--portfolio-progress", progress.toFixed(4));
    let frame = 0;
    let active = !document.hidden;
    const clock = new THREE.Clock();
    const render = () => {
      frame = 0;
      const time = clock.getElapsedTime();
      const travel = reducedMotion ? 0 : progress * 88;
      camera.position.z = 8 - travel;
      camera.position.x += (pointer.targetX * (reducedMotion ? 0 : 1) - camera.position.x) * 0.035;
      camera.position.y += (0.18 - pointer.targetY * (reducedMotion ? 0 : 1) - camera.position.y) * 0.035;
      camera.lookAt(Math.sin(progress * Math.PI * 2) * 0.16, 0, camera.position.z - 9);
      if (!reducedMotion) {
        world.rotation.y = Math.sin(time * 0.13) * 0.025;
        milestones.forEach((group, index) => {
          group.rotation.y = time * (index % 2 === 0 ? 0.14 : -0.12) + progress * (index + 1) * 0.16;
          group.rotation.x = Math.sin(time * 0.17 + index) * 0.035;
        });
        points.rotation.z = Math.sin(time * 0.08) * 0.018;
        stars.rotation.y = time * 0.003;
      }
      renderer.render(scene, camera);
      if (!reducedMotion && active) frame = window.requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!reducedMotion && active && frame === 0) frame = window.requestAnimationFrame(render);
    };
    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reducedMotion) render();
      else schedule();
    };
    const visibility = () => {
      active = !document.hidden;
      if (!active) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (reducedMotion) render();
      else schedule();
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", readPointer, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", readPointer);
      document.removeEventListener("visibilitychange", visibility);
      window.cancelAnimationFrame(frame);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="portfolio-3d-stage" aria-hidden="true" />;
}
