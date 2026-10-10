import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { ProjectCard } from "@/components/cards/project-card";
import { SiteShell } from "@/components/layout/site-shell";
import { BannerStage } from "@/components/motion/banner-stage";
import { NeuralField } from "@/components/motion/neural-field";
import { PortraitField } from "@/components/motion/portrait-field";
import { ScrollReveal } from "@/components/motion/reveal";
import { AgentGraph, DataPipeline, MlPipeline } from "@/components/motion/system-visuals";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";
import { SITE, SOCIALS, TECH_PILLS } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { SEO } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => pageHead({ ...SEO.home, path: "/" }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <section className="hero-stage">
        <NeuralField />
        <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-4 py-24 md:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="relative z-10">
          <p className="hero-line inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted shadow-[var(--shadow-border)]">
            <MapPin className="size-3.5 text-accent" />
            {SITE.badge}
          </p>
          <h1 className="mt-6 max-w-full font-display text-[2.15rem] leading-[1.08] text-fg sm:text-5xl md:text-5xl lg:text-[3.55rem]">
            <span className="hero-line hero-d1 block">
              Building with <em className="word-glow not-italic text-accent">curiosity</em>,
            </span>
            <span className="hero-line hero-d2 block">learning through code.</span>
          </h1>
          <p className="hero-line hero-d3 mt-6 max-w-xl text-lg text-fg/90">{SITE.shortBio}</p>
          <p className="hero-line hero-d3 mt-4 max-w-xl text-base text-muted">{SITE.longBio}</p>
          <div className="hero-line hero-d4 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                Explore My Work
                <ArrowRight className="arrow-shift size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">
                Let's Connect
                <ArrowUpRight className="arrow-shift size-4" />
              </Link>
            </Button>
          </div>
          <ul className="hero-line hero-d5 mt-8 flex flex-wrap gap-2">
            {TECH_PILLS.map((item) => (
              <li
                key={item}
                className="rounded-full px-3 py-1.5 text-xs tracking-wide text-muted shadow-[var(--shadow-border)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-reveal relative z-10 mx-auto w-full max-w-md">
          <div className="orbit-ring orbit-slow pointer-events-none absolute -inset-6" aria-hidden="true" />
          <PortraitField>
          <article className="profile-frame relative overflow-hidden rounded-[var(--radius-md)]">
            <div className="img-zoom aspect-[3/4]">
              <img
                src="/images/profile-portrait.jpg"
                alt="Muhammad Subhan, aspiring AI ML Engineer in Karachi, Pakistan"
                className="h-full w-full object-cover object-top"
                width={900}
                height={1200}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 pt-20">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-emerald-200">
                {SITE.profileLabel}
              </p>
              <p className="mt-1 font-display text-3xl text-white">{SITE.name}</p>
              <p className="mt-1 text-sm text-white/80">{SITE.profileSubtitle}</p>
            </div>
          </article>
          </PortraitField>
        </div>
      </div>
      </section>

      <div className="marquee-wrap border-y border-border py-4" aria-hidden="true">
        <div className="marquee-track">
          {[...SITE.interests, ...SITE.interests].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <p className="mx-auto flex max-w-6xl justify-center px-4 pt-8 md:px-6">
        <a href="#story" className="scroll-cue no-underline">
          Scroll
          <span />
        </a>
      </p>

      <section id="story" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            A bit about me
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <h2 className="font-display text-4xl leading-tight text-fg md:text-5xl">
              Early in the journey.
              <br />
              Serious about the craft.
            </h2>
            <div>
              <p className="text-base text-muted md:text-lg">
                I'm an aspiring AI/ML Engineer developing hands-on experience through academic
                learning, personal projects and practical development work. I'm particularly
                interested in Artificial Intelligence, Machine Learning, Agentic AI, Python, Data
                Analysis, SQL and Data Engineering.
              </p>
              <Button asChild variant="ghost" className="mt-5 px-0">
                <Link to="/about">
                  More About Me
                  <ArrowRight className="arrow-shift size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Selected work
          </p>
          <h2 className="mt-3 font-display text-4xl text-fg md:text-5xl">
            Projects built by learning out loud.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            A collection of practical experiments and projects exploring machine learning, data
            analysis, Python, automation and AI — mapped to public GitHub repositories.
          </p>
        </ScrollReveal>
        <BannerStage
          items={PROJECTS.map((project) => ({
            slug: project.slug,
            image: project.image,
            title: project.title,
          }))}
        />
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 70}>
              <ProjectCard project={project} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link to="/projects">
              View all projects
              <ArrowRight className="arrow-shift size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Systems</p>
          <h2 className="mt-3 font-display text-4xl text-fg">How the work thinks.</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <ScrollReveal delay={0}>
            <MlPipeline />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <AgentGraph />
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <DataPipeline />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-24 md:px-6">
        <NeuralField density="soft" />
        <ScrollReveal>
          <div className="glass-card relative rounded-[var(--radius-lg)] px-6 py-12 md:px-12 md:py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Next</p>
            <h2 className="mt-3 font-display text-4xl text-fg md:text-5xl">
              Let's build something meaningful.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Interested in AI, data or technology? Let's connect and explore ideas, opportunities
              and collaborations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="btn-breathe">
                <Link to="/contact">
                  Get In Touch
                  <ArrowUpRight className="arrow-shift size-4" />
                </Link>
              </Button>
              <div className="flex flex-wrap gap-3 text-sm">
                {SOCIALS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted no-underline hover:text-fg"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteShell>
  );
}
