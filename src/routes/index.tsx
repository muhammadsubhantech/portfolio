import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
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
import { SITE, SOCIALS, TECH_PILLS, SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({ ...SEO.home, path: "/" }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />

      <section className="home-hero relative isolate overflow-hidden">
        <NeuralField />
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10">
            <div className="hero-line inline-flex items-center gap-2 rounded-full border border-border bg-bg/65 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              {SITE.badge}
            </div>

            <p className="hero-line hero-d1 mt-9 text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              AI / MACHINE LEARNING / DATA
            </p>
            <h1 className="hero-line hero-d2 mt-5 max-w-3xl font-display text-[clamp(3.4rem,7.2vw,6.7rem)] leading-[0.91] tracking-[-0.055em] text-fg">
              Turning ideas
              <br />
              into <span className="italic text-accent">intelligent</span>
              <br />
              systems<span className="text-accent">.</span>
            </h1>
            <p className="hero-line hero-d3 mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
              {SITE.shortBio} {SITE.longBio}
            </p>

            <div className="hero-line hero-d4 mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group">
                <Link to="/projects">
                  Explore projects
                  <ArrowUpRight className="arrow-shift size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">
                  Let's connect
                  <ArrowRight className="arrow-shift size-4" />
                </Link>
              </Button>
            </div>

            <div className="hero-line hero-d5 mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-6">
              <div>
                <p className="font-display text-2xl text-fg">Python</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-subtle">Core language</p>
              </div>
              <span className="hidden h-9 w-px bg-border sm:block" />
              <div>
                <p className="font-display text-2xl text-fg">AI / ML</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-subtle">Main focus</p>
              </div>
              <span className="hidden h-9 w-px bg-border sm:block" />
              <div>
                <p className="font-display text-2xl text-fg">SQL</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-subtle">Data foundations</p>
              </div>
            </div>
          </div>

          <div className="profile-reveal relative mx-auto w-full max-w-[30rem] lg:ml-auto">
            <div className="hero-image-frame relative">
              <div className="hero-image-grid absolute inset-0" aria-hidden="true" />
              <div className="absolute -right-3 -top-3 z-20 rounded-full border border-accent/35 bg-bg px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-accent sm:-right-5 sm:top-8">
                Open to learning
              </div>
              <PortraitField>
                <article className="profile-frame relative overflow-hidden rounded-sm">
                  <div className="img-zoom aspect-[4/5]">
                    <img
                      src="/images/profile-portrait.jpg"
                      alt="Muhammad Subhan, aspiring AI and machine learning developer"
                      className="h-full w-full object-cover object-top"
                      width={900}
                      height={1200}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 pt-24">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                      {SITE.profileLabel}
                    </p>
                    <p className="mt-2 font-display text-3xl text-white sm:text-4xl">{SITE.name}</p>
                    <p className="mt-1 text-sm text-white/75">{SITE.profileSubtitle}</p>
                  </div>
                </article>
              </PortraitField>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.18em] text-subtle">
              <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-accent" /> Karachi, Pakistan</span>
              <span>Curiosity → Code → Impact</span>
            </div>
          </div>
        </div>
        <a href="#intro" className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-subtle no-underline transition-colors hover:text-accent md:flex">
          Scroll to explore <ArrowDown className="size-3.5" />
        </a>
      </section>

      <div className="border-y border-border bg-bg/55 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 sm:px-8 lg:justify-between lg:px-10">
          {TECH_PILLS.map((item) => (
            <span key={item} className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{item}</span>
          ))}
        </div>
      </div>

      <section id="intro" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="section-kicker"><span>01</span> / THE INTRODUCTION</p>
              <p className="mt-5 max-w-xs text-sm leading-7 text-muted">A curious computer science student building practical skills at the intersection of AI and data.</p>
            </div>
            <div>
              <h2 className="max-w-4xl font-display text-4xl leading-[1.12] text-fg sm:text-5xl lg:text-6xl">
                Early in the journey. <span className="italic text-accent">Serious</span> about building things that matter.
              </h2>
              <div className="mt-8 flex flex-col gap-6 border-t border-border pt-7 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-base leading-8 text-muted">
                  I'm developing hands-on experience through academic learning and personal projects, with a focus on Artificial Intelligence, Machine Learning, Agentic AI, Python, Data Analysis, SQL and Data Engineering.
                </p>
                <Button asChild variant="ghost" className="shrink-0 px-0">
                  <Link to="/about">More about me <ArrowUpRight className="arrow-shift size-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker"><span>02</span> / SELECTED WORK</p>
              <h2 className="mt-5 font-display text-4xl text-fg sm:text-5xl lg:text-6xl">Built with purpose.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">Experiments and practical projects exploring machine learning, data analysis, Python and intelligent systems.</p>
          </div>
        </ScrollReveal>
        <BannerStage items={PROJECTS.map((project) => ({ slug: project.slug, image: project.image, title: project.title }))} />
        <div className="mt-3 grid gap-5 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 70}>
              <ProjectCard project={project} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-9 flex justify-end">
          <Button asChild variant="secondary">
            <Link to="/projects">View all projects <ArrowUpRight className="arrow-shift size-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <ScrollReveal>
          <div className="border-y border-border py-8">
            <p className="section-kicker"><span>03</span> / HOW I THINK</p>
            <h2 className="mt-4 font-display text-4xl text-fg sm:text-5xl">From data to decisions.</h2>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <ScrollReveal><MlPipeline /></ScrollReveal>
          <ScrollReveal delay={80}><AgentGraph /></ScrollReveal>
          <ScrollReveal delay={160}><DataPipeline /></ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8 lg:px-10 lg:pb-36">
        <ScrollReveal>
          <div className="contact-panel relative overflow-hidden rounded-sm border border-border p-7 sm:p-12 lg:p-16">
            <NeuralField density="soft" />
            <div className="relative z-10 max-w-3xl">
              <p className="section-kicker"><span>04</span> / THE NEXT STEP</p>
              <Sparkles className="mt-8 size-6 text-accent" />
              <h2 className="mt-5 font-display text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Have an idea worth exploring?</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted">I'm always interested in learning, exchanging ideas and connecting with people working across AI and data.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild size="lg"><Link to="/contact">Get in touch <ArrowUpRight className="arrow-shift size-4" /></Link></Button>
                <div className="flex flex-wrap gap-4 text-sm text-muted">
                  {SOCIALS.map((item) => <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="no-underline transition-colors hover:text-accent">{item.label}</a>)}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteShell>
  );
}
