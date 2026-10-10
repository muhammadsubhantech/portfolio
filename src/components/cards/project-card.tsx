import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - 0.5;
  const y = (event.clientY - box.top) / box.height - 0.5;
  event.currentTarget.style.setProperty("--card-tilt-x", `${(x * 12).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--card-tilt-y", `${(-y * 10).toFixed(2)}deg`);
}

export function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={cn("group block rounded-[var(--radius-md)] no-underline [perspective:1100px]", featured && "md:col-span-2")}
    >
      <div
        className="banner-tilt glass-card overflow-hidden rounded-[var(--radius-md)]"
        onPointerMove={tilt}
        onPointerLeave={(event) => {
          event.currentTarget.style.removeProperty("--card-tilt-x");
          event.currentTarget.style.removeProperty("--card-tilt-y");
        }}
      >
        <div className="banner-slab">
          <span className="banner-edge" aria-hidden="true" />
          <div className={cn("img-zoom", featured ? "aspect-[16/8]" : "aspect-[16/10]")}>
            <img
              src={project.image}
              alt={project.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-accent">
              {project.categories[0]}
            </p>
            <ArrowUpRight className="arrow-shift size-4 text-muted" />
          </div>
          <h3 className="mt-2 font-display text-2xl text-fg">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.oneLiner}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[var(--radius-xs)] px-2 py-1 text-[0.7rem] text-subtle shadow-[var(--shadow-border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
