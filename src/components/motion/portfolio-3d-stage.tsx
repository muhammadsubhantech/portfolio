import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import * as THREE from "three";

function mountSaessScene(host: HTMLDivElement, renderer: THREE.WebGLRenderer, reducedMotion: boolean) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030a18, 0.024);
  const camera = new THREE.PerspectiveCamera(42, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
  camera.position.set(0, 0.2, window.innerWidth < 720 ? 28 : 12);
  scene.add(new THREE.AmbientLight(0x5aaaff, 1.8));
  const cyanLight = new THREE.PointLight(0x18bfff, 34, 26);
  cyanLight.position.set(0, 1, 3);
  scene.add(cyanLight);
  const blueLight = new THREE.PointLight(0x176bff, 25, 22);
  blueLight.position.set(-6, 1, -1);
  scene.add(blueLight);
  const redLight = new THREE.PointLight(0xff263f, 7, 12);
  redLight.position.set(-5, -2, 2);
  scene.add(redLight);
  const world = new THREE.Group();
  scene.add(world);

  const wire = (color: number, opacity = 0.75) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false });
  const glow = (color: number, opacity = 0.9) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  const cyanWire = wire(0x4cdcff, 0.78);
  const softWire = wire(0x168ce8, 0.55);
  const paleLine = new THREE.LineBasicMaterial({ color: 0x9cecff, transparent: true, opacity: 0.65, depthWrite: false });
  const electricLine = new THREE.LineBasicMaterial({ color: 0x28bfff, transparent: true, opacity: 0.54, depthWrite: false });
  const actors: Array<{ group: THREE.Group; home: THREE.Vector3; banner: THREE.Vector3; phase: number }> = [];
  const addActor = (home: [number, number, number], banner: [number, number, number], phase: number) => {
    const group = new THREE.Group();
    group.position.set(...home);
    world.add(group);
    actors.push({ group, home: new THREE.Vector3(...home), banner: new THREE.Vector3(...banner), phase });
    return group;
  };
  const makeLine = (parent: THREE.Object3D, points: THREE.Vector3[], material = paleLine) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    parent.add(line);
    return line;
  };
  const makeStrand = (parent: THREE.Object3D, points: THREE.Vector3[], material = electricLine) => {
    const curve = new THREE.CatmullRomCurve3(points);
    const strand = new THREE.Mesh(new THREE.TubeGeometry(curve, 56, 0.009, 5, false), material);
    parent.add(strand);
    return strand;
  };

  // A luminous, faceted neural head rather than a flat logo or UI card.
  const head = addActor([0, 0.25, 1.4], [-5.4, 2.15, 0.1], 0.2);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(1.16, 34, 28), cyanWire);
  skull.scale.set(0.82, 1.08, 0.74);
  skull.rotation.z = -0.09;
  head.add(skull);
  const jaw = new THREE.Mesh(new THREE.IcosahedronGeometry(0.63, 1), softWire);
  jaw.scale.set(0.72, 0.66, 0.8);
  jaw.position.set(0, -0.66, 0.03);
  head.add(jaw);
  const face = new THREE.Group();
  face.position.z = 0.52;
  head.add(face);
  for (const x of [-0.32, 0.32]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 12), glow(0x8af1ff));
    eye.position.set(x, 0.12, 0.02);
    face.add(eye);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.012, 6, 28), glow(0x27bfff, 0.8));
    halo.position.copy(eye.position);
    face.add(halo);
  }
  makeLine(face, [new THREE.Vector3(0, 0.05, 0.03), new THREE.Vector3(-0.08, -0.22, 0.03), new THREE.Vector3(0.02, -0.28, 0.03)], paleLine);
  makeLine(face, [new THREE.Vector3(-0.25, -0.48, 0.03), new THREE.Vector3(0, -0.55, 0.03), new THREE.Vector3(0.25, -0.48, 0.03)], paleLine);
  for (const [radius, tube, y, opacity] of [[1.52, 0.014, -1.28, 0.8], [1.98, 0.007, -1.3, 0.44], [0.88, 0.012, -1.24, 0.65]] as const) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 120), glow(0x42cfff, opacity));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = y;
    head.add(ring);
  }
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.65, 0.09, 8, 1, true), softWire);
  platform.position.y = -1.34;
  head.add(platform);
  const headBeams: THREE.Mesh[] = [];
  for (let i = 0; i < 10; i += 1) {
    const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.002, 1.2, 5), glow(0x4bdcff, 0.48));
    ray.position.set(Math.cos(i * 0.628) * 0.72, -0.68, Math.sin(i * 0.628) * 0.72);
    ray.rotation.z = Math.cos(i * 0.628) * 0.5;
    head.add(ray);
    headBeams.push(ray);
  }

  // Wireframe traffic flows from the left into the analysis core.
  const car = addActor([-5.35, -1.75, 0], [2.4, 2.05, 0.2], 1.2);
  const carBody = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.48, 0.82), cyanWire);
  carBody.position.y = 0.05;
  car.add(carBody);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.48, 0.7), softWire);
  cabin.position.set(-0.05, 0.48, 0);
  car.add(cabin);
  const wheels: THREE.Mesh[] = [];
  for (const x of [-0.68, 0.7]) for (const z of [-0.43, 0.43]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.07, 8, 20), glow(0x36bfff, 0.76));
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(x, -0.2, z);
    car.add(wheel);
    wheels.push(wheel);
  }
  makeLine(car, [new THREE.Vector3(-1.2, -0.38, 0), new THREE.Vector3(1.25, -0.38, 0)], electricLine);

  // City skyline with lit camera nodes and traffic routes.
  const city = addActor([-5.2, 1.42, -0.5], [-1.6, 2.05, -0.3], 2.1);
  for (let i = 0; i < 11; i += 1) {
    const h = 0.65 + ((i * 17) % 9) * 0.16;
    const building = new THREE.Mesh(new THREE.BoxGeometry(0.34 + (i % 3) * 0.08, h, 0.32), i % 2 ? cyanWire : softWire);
    building.position.set((i - 5) * 0.42, h / 2, Math.sin(i * 8) * 0.18);
    city.add(building);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), glow(i % 4 === 0 ? 0xff4158 : 0x63e8ff));
    beacon.position.set(building.position.x, h + 0.09, building.position.z);
    city.add(beacon);
  }
  makeStrand(city, [new THREE.Vector3(-2.5, 0.05, 0.18), new THREE.Vector3(-1, 0.42, 0.18), new THREE.Vector3(0, 0.2, 0.18), new THREE.Vector3(2.4, 0.6, 0.18)]);

  // Floating island, wire tree, and a small geometric observatory on the right.
  const island = addActor([4.55, 1.35, -0.65], [-4.4, -0.8, 0], 3.1);
  const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(1.12, 1), softWire);
  rock.scale.set(1.3, 0.62, 0.86);
  island.add(rock);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.78, 0.18, 7), cyanWire);
  top.position.y = 0.54;
  island.add(top);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.075, 0.72, 7), glow(0x58cfff, 0.65));
  trunk.position.set(-0.05, 1.02, 0);
  island.add(trunk);
  const tree = new THREE.Mesh(new THREE.IcosahedronGeometry(0.48, 2), cyanWire);
  tree.position.set(-0.05, 1.55, 0);
  island.add(tree);
  for (let i = 0; i < 3; i += 1) {
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.38, 5), paleLine ? glow(0x8edfff, 0.7) : cyanWire);
    column.position.set(0.52 + (i - 1) * 0.18, 0.78, 0.05);
    island.add(column);
  }
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.26, 4), cyanWire);
  roof.position.set(0.52, 1.11, 0.05);
  roof.rotation.y = Math.PI / 4;
  island.add(roof);
  makeStrand(island, [new THREE.Vector3(-1.6, 0.58, 0), new THREE.Vector3(-0.9, 0.8, 0.2), new THREE.Vector3(0.05, 1.06, 0.15), new THREE.Vector3(1.5, 0.6, 0)]);

  // A robotic inspection arm reaches from the right toward the holographic core.
  const robot = addActor([5.05, -1.75, 1.05], [0, -0.85, 0.4], 4.15);
  const joint = (radius: number, position: THREE.Vector3) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 1), cyanWire);
    mesh.position.copy(position);
    robot.add(mesh);
    return mesh;
  };
  const armSegment = (a: THREE.Vector3, b: THREE.Vector3, radius: number) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.65, radius, d.length(), 7, 1, true), cyanWire);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    robot.add(mesh);
    return mesh;
  };
  const shoulder = new THREE.Vector3(0.25, -0.1, 0);
  const elbow = new THREE.Vector3(-0.55, 0.7, 0.05);
  const wrist = new THREE.Vector3(-1.25, 0.94, 0.22);
  joint(0.24, shoulder); joint(0.17, elbow); joint(0.12, wrist);
  armSegment(shoulder, elbow, 0.15); armSegment(elbow, wrist, 0.1);
  for (let i = 0; i < 3; i += 1) {
    const finger = new THREE.Vector3(-1.55, 0.78 + i * 0.14, 0.24);
    armSegment(wrist, finger, 0.035);
  }
  const detection = new THREE.Group();
  detection.position.copy(wrist);
  robot.add(detection);
  const corner = (x: number, y: number) => {
    makeLine(detection, [new THREE.Vector3(x * 0.3, y * 0.23, 0), new THREE.Vector3(x * 0.18, y * 0.23, 0), new THREE.Vector3(x * 0.18, y * 0.1, 0)], paleLine);
  };
  corner(-1, -1); corner(1, -1); corner(-1, 1); corner(1, 1);

  // Borderless holographic feeds: open corner strokes and points, never UI cards.
  const feeds: THREE.Group[] = [];
  for (let i = 0; i < 3; i += 1) {
    const group = new THREE.Group();
    group.position.set(i === 0 ? -2.5 : i === 1 ? 2.65 : 0.1, i === 2 ? -2.65 : 0.05, 0.15);
    world.add(group);
    feeds.push(group);
    const w = 0.76, h = 0.46, k = 0.16;
    const corners = [
      [[-w, -h], [-w + k, -h]], [[-w, -h], [-w, -h + k]],
      [[w, -h], [w - k, -h]], [[w, -h], [w, -h + k]],
      [[-w, h], [-w + k, h]], [[-w, h], [-w, h - k]],
      [[w, h], [w - k, h]], [[w, h], [w, h - k]],
    ];
    for (const [[x1,y1],[x2,y2]] of corners) makeLine(group,[new THREE.Vector3(x1,y1,0),new THREE.Vector3(x2,y2,0)],electricLine);
    for (let j = 0; j < 28; j += 1) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018 + (j % 3) * 0.006, 6, 6), glow(i === 1 && j % 4 === 0 ? 0xff5969 : 0x74eaff, 0.76));
      dot.position.set((Math.random() - 0.5) * 1.3, (Math.random() - 0.5) * 0.72, 0.025);
      group.add(dot);
    }
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), glow(0x8feeff, 0.92));
    pulse.position.set(0.18, 0.05, 0.06);
    group.add(pulse);
    group.userData.pulse = pulse;
  }

  const links: THREE.Line[] = [];
  const packets: THREE.Mesh[] = [];
  for (let i = 0; i < 9; i += 1) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(17 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: i % 3 === 0 ? 0x8eeeff : 0x278bff, transparent: true, opacity: 0.42, depthWrite: false }));
    world.add(line);
    links.push(line);
    const packet = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), glow(0x8eeeff, 0.92));
    world.add(packet);
    packets.push(packet);
  }
  const dustCount = window.innerWidth < 720 ? 160 : 360;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) dustPositions.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 12], i * 3);
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x8edfff, size: 0.025, transparent: true, opacity: 0.53, sizeAttenuation: true }));
  scene.add(dust);

  let progress = 0;
  const readProgress = () => {
    const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progress = THREE.MathUtils.clamp(window.scrollY / range, 0, 1);
  };
  readProgress();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (event: PointerEvent) => {
    pointer.tx = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 0.7;
    pointer.ty = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 0.3;
  };
  const onResize = () => {
    camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
    camera.position.z = window.innerWidth < 720 ? 28 : 15;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  };
  let active = !document.hidden;
  let frame = 0;
  const clock = new THREE.Clock();
  const smooth = (a: number, b: number, x: number) => {
    const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const render = () => {
    frame = 0;
    const t = clock.getElapsedTime();
    const formation = reducedMotion ? 0 : smooth(0.08, 0.74, progress);
    const disperse = reducedMotion ? 0 : smooth(0.2, 0.52, progress) * (1 - smooth(0.83, 1, progress)) * 0.25;
    actors.forEach((actor, index) => {
      actor.group.position.lerpVectors(actor.home, actor.banner, formation);
      actor.group.position.x += Math.sin(t * 0.42 + actor.phase) * (0.035 + disperse * 0.18);
      actor.group.position.y += Math.cos(t * 0.38 + actor.phase) * (0.045 + disperse * 0.22);
      actor.group.position.z += Math.sin(t * 0.3 + index) * 0.06;
      actor.group.rotation.y = Math.sin(t * 0.18 + actor.phase) * 0.12 + formation * (index % 2 ? -0.16 : 0.16);
      actor.group.rotation.x = Math.cos(t * 0.17 + actor.phase) * 0.05;
      const scale = THREE.MathUtils.lerp(1, 0.72, formation);
      actor.group.scale.setScalar(scale);
    });
    feeds.forEach((feed, i) => {
      const home = [new THREE.Vector3(-2.5, 0.05, 0.15), new THREE.Vector3(2.65, 0.05, 0.15), new THREE.Vector3(0.1, -2.65, 0.15)][i];
      const line = [new THREE.Vector3(-4.8, 2.15, 0.05), new THREE.Vector3(0, 2.15, 0.05), new THREE.Vector3(4.8, -0.8, 0.05)][i];
      feed.position.lerpVectors(home, line, formation);
      feed.rotation.y = Math.sin(t * 0.4 + i) * 0.14;
      feed.rotation.x = Math.cos(t * 0.3 + i) * 0.1;
      const pulse = feed.userData.pulse as THREE.Mesh;
      pulse.scale.setScalar(0.72 + Math.sin(t * 2.3 + i) * 0.2);
    });
    links.forEach((line, i) => {
      const target = i < actors.length ? actors[i].group.position : feeds[i - actors.length].position;
      const start = head.position;
      const attr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let j = 0; j <= 16; j += 1) {
        const u = j / 16;
        const arch = Math.sin(u * Math.PI) * (0.42 + (i % 3) * 0.2);
        attr.setXYZ(j, THREE.MathUtils.lerp(start.x, target.x, u), THREE.MathUtils.lerp(start.y, target.y, u) + arch, THREE.MathUtils.lerp(start.z, target.z, u) + Math.sin(u * Math.PI) * 0.3);
      }
      attr.needsUpdate = true;
      line.geometry.computeBoundingSphere();
      const packet = packets[i];
      const u = (t * 0.22 + i * 0.137) % 1;
      packet.position.lerpVectors(start, target, u);
      packet.position.y += Math.sin(u * Math.PI) * (0.42 + (i % 3) * 0.2);
    });
    head.rotation.y = Math.sin(t * 0.25) * 0.1 + pointer.x * (reducedMotion ? 0 : 0.12);
    head.rotation.x = pointer.y * (reducedMotion ? 0 : -0.08);
    platform.rotation.y = reducedMotion ? 0 : t * 0.16;
    island.rotation.y = reducedMotion ? 0 : -t * 0.08;
    robot.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.7) * 0.035;
    wheels.forEach((wheel) => { wheel.rotation.x += reducedMotion ? 0 : 0.01; });
    headBeams.forEach((beam, i) => { beam.scale.y = 0.75 + (reducedMotion ? 0 : 0.25 * Math.sin(t * 1.4 + i)); });
    dust.rotation.y = reducedMotion ? 0 : t * 0.008;
    camera.position.x += (pointer.x * (reducedMotion ? 0 : 0.35) - camera.position.x) * 0.035;
    camera.position.y += ((0.2 - pointer.y * (reducedMotion ? 0 : 0.18)) - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
    redLight.intensity = 5.5 + (reducedMotion ? 0 : (Math.sin(t * 3.8) + 1) * 1.5);
    renderer.render(scene, camera);
    if (!reducedMotion && active) frame = window.requestAnimationFrame(render);
  };
  const onScroll = () => { readProgress(); if (reducedMotion) render(); };
  const onVisibility = () => {
    active = !document.hidden;
    if (!active) { window.cancelAnimationFrame(frame); frame = 0; }
    else if (reducedMotion) render();
    else if (!frame) frame = window.requestAnimationFrame(render);
  };
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  render();
  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.cancelAnimationFrame(frame);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
        geometries.add(object.geometry);
        const material = object.material;
        if (Array.isArray(material)) material.forEach((entry) => materials.add(entry));
        else materials.add(material);
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
  };
}


/** A single scroll-linked 3D scene that travels through the portfolio story. */
export function Portfolio3DStage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
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

    if (pathname === "/projects/saess-smart-emergency-surveillance") {
      return mountSaessScene(host, renderer, reducedMotion);
    }

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
  }, [pathname]);

  return <div ref={hostRef} className="portfolio-3d-stage" aria-hidden="true" />;
}
