import { useNavigate } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { useEffect, useRef } from "react";

type Banner = { slug: string; image: string; title: string };

export function BannerStage({ items }: { items: Banner[] }) {
  const host = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const signature = items.map((item) => item.slug).join("|");

  useEffect(() => {
    const el = host.current;
    if (!el || items.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop = false;
    let frame = 0;
    const cleanups: Array<() => void> = [];

    void import("three").then((THREE) => {
      if (stop || !host.current) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a0c0b, 8, 18);
      const camera = new THREE.PerspectiveCamera(38, el.clientWidth / Math.max(el.clientHeight, 1), 0.1, 40);
      camera.position.set(0, 0.15, 8.2);

      scene.add(new THREE.AmbientLight(0xffffff, 0.62));
      const key = new THREE.DirectionalLight(0xf3f0e8, 1.5);
      key.position.set(3, 4, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0x3ecf8e, 9, 18);
      rim.position.set(-3, 1.2, 2);
      scene.add(rim);

      const rig = new THREE.Group();
      scene.add(rig);
      const fronts: InstanceType<typeof THREE.Mesh>[] = [];
      const cards: InstanceType<typeof THREE.Group>[] = [];
      const loader = new THREE.TextureLoader();
      const mobile = window.innerWidth < 768;
      const shown = items.slice(0, mobile ? 4 : items.length);

      shown.forEach((item, index) => {
        const angle = (index - (shown.length - 1) / 2) * 0.62;
        const frontMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.34,
          metalness: 0.22,
        });
        const front = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 1.55), frontMat);
        const edge = new THREE.Mesh(
          new THREE.BoxGeometry(2.68, 1.68, 0.11),
          new THREE.MeshStandardMaterial({ color: 0x18211d, roughness: 0.28, metalness: 0.72 }),
        );
        const card = new THREE.Group();
        edge.position.z = -0.075;
        card.add(edge, front);
        card.position.set(Math.sin(angle) * 3.15, Math.cos(index) * 0.12, Math.cos(angle) * 1.15 - 0.4);
        card.rotation.y = -angle * 0.85;
        card.userData.baseY = card.position.y;
        front.userData.slug = item.slug;
        fronts.push(front);
        cards.push(card);
        rig.add(card);
        loader.load(item.image, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          frontMat.map = texture;
          frontMat.needsUpdate = true;
        });
      });

      const dustCount = mobile ? 80 : 220;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i += 1) {
        dustPos[i * 3] = (Math.random() - 0.5) * 14;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
        dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dust = new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({ color: 0x9dffd0, size: 0.03, transparent: true, opacity: 0.7 }),
      );
      scene.add(dust);

      const pointer = { x: 0, y: 0 };
      const onMove = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        pointer.x = (event.clientX - box.left) / box.width - 0.5;
        pointer.y = (event.clientY - box.top) / box.height - 0.5;
        const hit = raycast(event);
        el.style.cursor = hit ? "pointer" : "grab";
      };
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const raycast = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        ndc.x = ((event.clientX - box.left) / box.width) * 2 - 1;
        ndc.y = -((event.clientY - box.top) / box.height) * 2 + 1;
        raycaster.setFromCamera(ndc, camera);
        return raycaster.intersectObjects(fronts)[0];
      };
      const onClick = (event: PointerEvent) => {
        const hit = raycast(event);
        const slug = hit?.object.userData.slug as string | undefined;
        if (!slug) return;
        void navigate({ to: "/projects/$slug", params: { slug } });
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("click", onClick);

      const clock = new THREE.Clock();
      let running = true;
      const tick = () => {
        if (!running) return;
        const t = clock.getElapsedTime();
        rig.rotation.y += ((t * 0.18 + pointer.x * 0.45) - rig.rotation.y) * 0.035;
        rig.rotation.x += ((pointer.y * -0.18) - rig.rotation.x) * 0.045;
        rig.position.y = Math.sin(t * 0.6) * 0.08;
        cards.forEach((card, index) => {
          card.position.y = (card.userData.baseY as number) + Math.sin(t * 0.8 + index * 0.7) * 0.035;
        });
        dust.rotation.y = t * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(tick);
      };
      tick();

      const onResize = () => {
        camera.aspect = el.clientWidth / Math.max(el.clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("resize", onResize);
      const io = new IntersectionObserver(([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        if (!visible) running = false;
        else if (!running) {
          running = true;
          clock.getDelta();
          tick();
        }
      });
      io.observe(el);

      cleanups.push(() => {
        running = false;
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", onResize);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("click", onClick);
        io.disconnect();
        dustGeo.dispose();
        fronts.forEach((front) => {
          front.geometry.dispose();
          const material = front.material as InstanceType<typeof THREE.MeshStandardMaterial>;
          material.map?.dispose();
          material.dispose();
        });
        cards.forEach((card) => {
          const edge = card.children[0];
          if (edge instanceof THREE.Mesh) {
            edge.geometry.dispose();
            const material = edge.material;
            if (Array.isArray(material)) material.forEach((item) => item.dispose());
            else material.dispose();
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement);
      });
    });

    return () => {
      stop = true;
      cleanups.forEach((fn) => fn());
    };
  }, [navigate, signature]);

  return (
    <div className="banner-stage" ref={host}>
      <div className="banner-stage-hud">
        <span className="banner-stage-label"><ScanLine aria-hidden="true" /> Spatial project gallery</span>
      </div>
      <p className="banner-stage-hint">Move to explore · select Use gestures for full-site control</p>
    </div>
  );
}
