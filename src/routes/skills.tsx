import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { CURRENTLY_LEARNING, SKILL_GROUPS, STACK } from "@/data/skills";
import { SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () => pageHead({ ...SEO.skills, path: "/skills" }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Skills", path: "/skills" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="Craft" title="Skills & Technologies">
          <p>Tools I use to learn, build and experiment.</p>
        </PageIntro>
        <p className="mt-6 max-w-2xl text-sm text-subtle">
          Levels are honest labels — Learning, Hands-on, Working Knowledge, Exploring — not fake
          percentages.
        </p>

        <div className="mt-14 space-y-14">
          {SKILL_GROUPS.map((group) => (
            <ScrollReveal key={group.id}>
              <h2 className="font-display text-3xl text-fg">{group.title}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((skill, index) => (
                  <ScrollReveal key={skill.name} delay={index * 70}>
                    <article className="skill-card glass-card h-full rounded-[var(--radius-md)] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-medium text-fg">{skill.name}</h3>
                        <span className="skill-mark shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-accent shadow-[var(--shadow-border)]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted">{skill.note}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-20">
          <h2 className="font-display text-3xl text-fg">Technology stack</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STACK.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 shadow-[var(--shadow-border)]"
              >
                <span
                  className="grid size-10 place-items-center rounded-[var(--radius-sm)] bg-accent-dim font-mono text-xs text-accent"
                  aria-hidden="true"
                >
                  {item.mark}
                </span>
                <span className="text-sm text-fg">{item.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-20">
          <h2 className="font-display text-3xl text-fg">Currently learning</h2>
          <p className="mt-2 text-sm text-subtle">
            Editable list — update this as the learning focus changes.
          </p>
          <ul className="mt-5 space-y-2">
            {CURRENTLY_LEARNING.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-md)] px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)]"
              >
                {item}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <Link to="/projects">
              See My Projects
              <ArrowRight className="arrow-shift size-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </SiteShell>
  );
}
