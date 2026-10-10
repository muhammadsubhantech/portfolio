import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead({ ...SEO.about, path: "/about" }),
  component: AboutPage,
});

const FOCUS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Agentic AI",
  "Python Development",
  "Data Analysis",
  "SQL",
  "Data Engineering",
  "Automation",
];

function AboutPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="About" title="About Muhammad Subhan">
          <p>Curious about technology. Serious about learning.</p>
        </PageIntro>

        <ScrollReveal className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <h2 className="font-display text-3xl text-fg">Introduction</h2>
            <p className="mt-4 text-muted">
              I'm Muhammad Subhan, an aspiring AI/ML Engineer based in Karachi, Pakistan. My
              interests span Artificial Intelligence, Machine Learning, Agentic AI, Python, Data
              Analysis, SQL, Deep Learning and Data Engineering.
            </p>
            <p className="mt-4 text-muted">{SITE.longBio}</p>
          </section>
          <aside className="glass-card rounded-[var(--radius-md)] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">At a glance</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-subtle">Based</dt>
                <dd className="text-fg">{SITE.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-subtle">Focus</dt>
                <dd className="text-right text-fg">AI/ML · Data · Python</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-subtle">Status</dt>
                <dd className="text-right text-fg">{SITE.availability}</dd>
              </div>
            </dl>
          </aside>
        </ScrollReveal>

        <ScrollReveal className="mt-20">
          <h2 className="font-display text-3xl text-fg">Current focus</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS.map((item) => (
              <article
                key={item}
                className="glass-card rounded-[var(--radius-md)] px-4 py-5"
              >
                <p className="text-sm font-medium text-fg">{item}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-20 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="font-display text-3xl text-fg">My approach</h2>
            <p className="mt-2 font-display text-2xl text-accent">Learn. Build. Improve.</p>
            <p className="mt-4 text-muted">
              I believe the best way to learn technology is to build with it. I focus on
              understanding concepts, applying them through practical projects and continuously
              improving through experimentation.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-fg">Experience</h2>
            <p className="mt-4 text-muted">{SITE.experience}</p>
            <p className="mt-3 text-sm text-muted">
              ICS / Computer Science at Government National College, Karachi, with a 1-year Python
              with AI diploma at TechZone.
            </p>
            <p className="mt-3 text-sm text-subtle">
              No industry titles, companies or client lists are claimed here.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-20 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="font-display text-3xl text-fg">Languages</h2>
            <ul className="mt-5 space-y-3">
              {SITE.languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 shadow-[var(--shadow-border)]"
                >
                  <span className="text-fg">{lang.name}</span>
                  <span className="text-sm text-muted">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl text-fg">Career direction</h2>
            <p className="mt-4 text-muted">{SITE.career}</p>
            <Button asChild className="mt-6">
              <Link to="/contact">
                Let's Connect
                <ArrowUpRight className="arrow-shift size-4" />
              </Link>
            </Button>
          </section>
        </ScrollReveal>
      </div>
    </SiteShell>
  );
}
