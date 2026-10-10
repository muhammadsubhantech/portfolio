import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { SiteShell } from "@/components/layout/site-shell";
import { BannerStage } from "@/components/motion/banner-stage";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PROJECTS, PROJECT_FILTERS, type ProjectFilter } from "@/data/projects";
import { SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => pageHead({ ...SEO.projects, path: "/projects" }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const items = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((project) => project.categories.includes(filter));
  }, [filter]);

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="Work" title="Projects">
          <p>Practical work built while learning AI, data and software.</p>
        </PageIntro>

        <BannerStage
          items={PROJECTS.map((project) => ({
            slug: project.slug,
            image: project.image,
            title: project.title,
          }))}
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Project filters">
          {PROJECT_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={cn(
                "h-10 shrink-0 rounded-full px-3.5 text-sm",
                filter === item
                  ? "bg-accent text-accent-fg"
                  : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-subtle">
          Case studies map to public GitHub repositories. Results stay in the notebooks — this site
          does not invent metrics.
        </p>

        {items.length === 0 ? (
          <p className="mt-10 text-muted">No published projects in this category yet.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {items.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 50}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
