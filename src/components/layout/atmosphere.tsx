const PARTICLES = [
  { top: "18%", left: "12%", delay: "0s", duration: "22s" },
  { top: "32%", left: "78%", delay: "4s", duration: "26s" },
  { top: "58%", left: "22%", delay: "8s", duration: "19s" },
  { top: "72%", left: "64%", delay: "2s", duration: "24s" },
  { top: "14%", left: "48%", delay: "6s", duration: "21s" },
  { top: "84%", left: "38%", delay: "10s", duration: "28s" },
];

export function Atmosphere() {
  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="wash" />
      <div className="grid" />
      <div className="grain" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
