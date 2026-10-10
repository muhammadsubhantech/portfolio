import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { HEADED, JOURNEY } from "@/data/journey";
import { SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/journey")({
  head: () => pageHead({ ...SEO.journey, path: "/journey" }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journey", path: "/journey" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="Timeline" title="My Journey">
          <p>Learning one step at a time.</p>
        </PageIntro>

        <ol className="timeline relative mt-16 space-y-8">
          {JOURNEY.map((item, i) => (
            <li key={item.id}>
              <ScrollReveal delay={i * 40} className="relative pl-10 md:pl-12">
                <span
                  className="absolute top-1.5 left-0 size-6 rounded-full bg-bg shadow-[0_0_0_1px_var(--accent)]"
                  aria-hidden="true"
                >
                  <span className="node-pulse absolute inset-1.5 rounded-full bg-accent" />
                </span>
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {item.period}
                  {item.periodEditable ? " · editable" : ""}
                </p>
                <h2 className="mt-1 font-display text-3xl text-fg">{item.title}</h2>
                <p className="mt-2 text-muted">{item.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal className="mt-16">
          <section className="glass-card rounded-[var(--radius-md)] p-6 md:p-8">
            <h2 className="font-display text-3xl text-fg">Where I'm headed</h2>
            <p className="mt-4 text-muted">{HEADED}</p>
            <Button asChild className="mt-6">
              <Link to="/contact">Talk about what's next</Link>
            </Button>
          </section>
        </ScrollReveal>
      </div>
    </SiteShell>
  );
}
