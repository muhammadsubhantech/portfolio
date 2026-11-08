import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getProject } from "@/data/projects";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return pageHead({
        title: "Projects | Muhammad Subhan",
        description: "AI and machine learning projects by Muhammad Subhan.",
        path: "/projects",
      });
    }
    return pageHead({
      title: `${project.title} | Muhammad Subhan`,
      description: project.oneLiner,
      path: `/projects/${project.slug}`,
    });
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const isSaess = project.slug === "saess-smart-emergency-surveillance";
  const sections = [
    { id: "overview", title: "Overview", body: project.overview },
    { id: "problem", title: "Problem", body: project.problem },
    { id: "approach", title: "Approach", body: project.approach },
    { id: "stack", title: "Technology stack", body: project.tags.join(" · ") },
    { id: "implementation", title: "Implementation", body: project.implementation },
    { id: "results", title: "Results", body: project.result },
    { id: "learned", title: "What I learned", body: project.learned },
    { id: "future", title: "Future improvements", body: project.future },
  ];

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <article className={isSaess ? "saess-project mx-auto max-w-6xl px-4 pb-20 md:px-6" : "mx-auto max-w-3xl px-4 pb-20 md:px-6"}>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted no-underline hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-accent">
          {project.categories[0]}
        </p>
        <h1 className="mt-3 font-display text-4xl text-fg md:text-6xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.oneLiner}</p>
        <div className={isSaess ? "saess-banner-frame mt-8 [perspective:1200px]" : "mt-8 [perspective:1200px]"}>
          <div className={isSaess ? "banner-tilt project-banner saess-banner overflow-hidden rounded-[var(--radius-md)]" : "banner-tilt project-banner overflow-hidden rounded-[var(--radius-md)]"}>
            <div className="banner-slab">
              <span className="banner-edge" aria-hidden="true" />
              <img
                src={isSaess ? "/images/saess-command-center.png" : project.image}
                alt={isSaess ? "Illustrative AI surveillance command center showing road traffic, incident detection, CNN analysis and heatmap panels" : project.imageAlt}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            {isSaess ? (
              <div className="saess-analysis-overlay" aria-hidden="true">
                <span className="saess-hud-top saess-disclaimer"><i>ILLUSTRATIVE CONCEPT · NOT LIVE</i></span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-xs)] px-2 py-1 text-xs text-subtle shadow-[var(--shadow-border)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {sections.map((section) => (
          <section key={section.id} className={isSaess ? "mt-12 saess-data-section" : "mt-12"}>
            <h2 className="font-display text-3xl text-fg">{section.title}</h2>
            <p className="mt-3 text-muted">{section.body}</p>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="font-display text-3xl text-fg">Links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.github ? (
              <Button asChild variant="secondary">
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : (
              <p className="text-muted">GitHub link will appear here when it is published.</p>
            )}
            {project.live ? (
              <Button asChild>
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live demo
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/contact">Discuss this work</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/notes">Read related notes</Link>
          </Button>
        </div>
      </article>
    </SiteShell>
  );
}
