import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PROJECTS } from "@/data/projects";
import { SITE, SOCIALS } from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/notes" },
  { label: "Now building", href: "#now" },
  { label: "Contact", href: "#contact" },
];

const skillItems = [
  { label: "Python", icon: Code2 },
  { label: "Machine Learning", icon: Brain },
  { label: "Deep Learning", icon: Network },
  { label: "CNN", icon: Layers3 },
  { label: "RNN", icon: Workflow },
  { label: "TensorFlow", icon: Sparkles },
  { label: "SQL", icon: Database },
  { label: "Data Analysis", icon: ChartNoAxesCombined },
  { label: "Data Engineering", icon: Workflow },
  { label: "Cloud (GCP)", icon: Database },
];

const socialLinks = [
  { label: "GitHub", href: SOCIALS.find((item) => item.id === "github")?.href ?? "https://github.com/muhammadsubhantech", icon: Github },
  { label: "LinkedIn", href: SOCIALS.find((item) => item.id === "linkedin")?.href ?? "https://www.linkedin.com/in/muhammad-subhan-ai", icon: Linkedin },
  { label: "Email", href: `mailto:${SITE.email ?? "muhammadsubhan.tech0@gmail.com"}`, icon: Mail },
];

const projectArt: Record<string, string> = {
  "saess-smart-emergency-surveillance": "/images/p-saess.jpg",
  "machine-learning-lab": "/images/cover-ml.jpg",
  "data-analysis-studio": "/images/p-dash.jpg",
  "python-practice-lab": "/images/cover-python.jpg",
  "cnn-projects": "/images/p-mnist.jpg",
  "keras-income-model": "/images/p-credit.jpg",
  "transfer-learning-lab": "/images/cover-engineering.jpg",
  "indus-weave-hr-pipeline": "/images/p-hr.jpg",
  "mnist-digit-recognizer": "/images/p-mnist.jpg",
};

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const featuredProjects = PROJECTS.slice(0, 5);

  return (
    <div className="portfolio-home" id="home">
      <div className="portfolio-progress" aria-hidden="true"><span /></div>
      <a className="portfolio-skip" href="#main">Skip to content</a>
      <header className="portfolio-topbar">
        <a className="portfolio-brand" href="#home" aria-label={SITE.name + ", home"}>
          <span className="portfolio-mark">MS</span>
          <span>{SITE.name}</span>
        </a>
        <button
          className="portfolio-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav className={"portfolio-nav" + (menuOpen ? " is-open" : "")} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.label === "Home" ? "is-active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="portfolio-nav-actions">
          <ThemeToggle />
          <a className="portfolio-cv" href="/Muhammad-Subhan-CV.pdf" download>
            <Download size={15} />
            <span>Download CV</span>
          </a>
        </div>
      </header>

      <main id="main">
        <section className="portfolio-hero" aria-labelledby="hero-title" data-journey-stage="home">
          <div className="portfolio-portrait">
            <img src="/images/portrait.jpg" alt="Portrait of Muhammad Subhan" width={720} height={900} />
            <span className="portfolio-signature" aria-hidden="true">Muhammad<br />Subhan</span>
          </div>

          <div className="portfolio-intro">
            <span className="portfolio-eyebrow">AI / ML Developer</span>
            <h1 id="hero-title">Muhammad <span>Subhan</span></h1>
            <p className="portfolio-role">AI/ML Developer · Agentic AI · Python · Data Engineering</p>
            <p className="portfolio-lead">
              AI and Cloud Data Engineering student exploring practical AI/ML, computer vision and
              data-driven applications. I turn what I learn into useful, hands-on projects.
            </p>
            <div className="portfolio-socials" aria-label="Social links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <Icon size={17} />
                </a>
              ))}
              <a href="#contact" aria-label="Contact me" title="Contact me"><Mail size={17} /></a>
              <a className="portfolio-project-link" href="#projects">View projects <ArrowRight size={15} /></a>
            </div>
          </div>

          <aside className="portfolio-quick-card" aria-label="Quick information">
            <h2>Quick info</h2>
            <ul>
              <li><MapPin size={16} /><span>Karachi, Pakistan</span></li>
              <li><GraduationCap size={16} /><span>Intermediate Computer Science · Ongoing</span></li>
              <li><Mail size={16} /><a href="mailto:muhammadsubhan.tech0@gmail.com">muhammadsubhan.tech0@gmail.com</a></li>
              <li><BriefcaseBusiness size={16} /><span>Open to internships &amp; projects</span></li>
            </ul>
            <span className="portfolio-availability"><i /> Available for opportunities</span>
          </aside>
          <a className="portfolio-scroll-cue" href="#skills"><ArrowDown size={15} /> Scroll to explore</a>
        </section>

        <section className="portfolio-band" id="skills" aria-label="Skills" data-journey-stage="skills">
          <div className="portfolio-band-title">
            <strong><Sparkles size={16} /> My skills</strong>
            <span>Technologies and tools I work with</span>
          </div>
          <div className="portfolio-skill-list">
            {skillItems.map(({ label, icon: Icon }) => (
              <span className="portfolio-skill" key={label}><Icon size={15} /> {label}</span>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="projects" data-journey-stage="projects">
          <div className="portfolio-section-heading">
            <div>
              <span className="portfolio-kicker"><Layers3 size={16} /> Selected work</span>
              <h2>Featured projects</h2>
              <p>Practical projects built with Python, AI/ML, data engineering and more.</p>
            </div>
            <a href="/projects">View all projects <ArrowRight size={16} /></a>
          </div>
          <div className="portfolio-project-grid">
            {featuredProjects.map((project) => (
              <a className="portfolio-project-card" href={"/projects/" + project.slug} key={project.slug}>
                <div className="portfolio-project-image">
                  <img src={projectArt[project.slug] ?? project.image} alt={project.imageAlt} loading="lazy" />
                </div>
                <div className="portfolio-project-body">
                  <div className="portfolio-project-topline">
                    <span>{project.categories[0]}</span>
                    <span className={project.placeholder ? "portfolio-status is-progress" : "portfolio-status"}>
                      {project.placeholder ? "In progress" : "Project"}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.oneLiner}</p>
                  <span className="portfolio-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="portfolio-now" id="now" data-journey-stage="now" aria-labelledby="now-title">
          <div className="portfolio-now-heading">
            <div>
              <span className="portfolio-kicker"><Workflow size={16} /> Current focus</span>
              <h2 id="now-title">What I’m working toward</h2>
              <p>Active learning and personal-project work, shared with the right context.</p>
            </div>
            <span className="portfolio-now-live"><i /> In progress</span>
          </div>
          <div className="portfolio-now-grid">
            <article className="portfolio-now-card">
              <span className="portfolio-now-index">01 / COMPUTER VISION</span>
              <h3>SAESS</h3>
              <p>Exploring a Smart AI Emergency Surveillance System concept for road-safety violations and incident detection.</p>
              <div className="portfolio-now-tags"><span>Wrong-way driving</span><span>Helmet / seat-belt checks</span><span>Incident detection</span></div>
            </article>
            <article className="portfolio-now-card">
              <span className="portfolio-now-index">02 / MODEL BUILDING</span>
              <h3>CNN &amp; image classification</h3>
              <p>Developing personal ML projects with Python and TensorFlow; studying training workflows and model evaluation.</p>
              <div className="portfolio-now-tags"><span>Python</span><span>TensorFlow</span><span>Computer vision</span></div>
            </article>
            <article className="portfolio-now-card">
              <span className="portfolio-now-index">03 / LEARNING TRACK</span>
              <h3>Cloud data + Agentic AI</h3>
              <p>Currently exploring Google Cloud Dataflow, cloud data pipelines, AI automation and agentic systems.</p>
              <div className="portfolio-now-tags"><span>Dataflow</span><span>Data pipelines</span><span>Agentic AI</span></div>
            </article>
          </div>
        </section>

        <section className="portfolio-lower" data-journey-stage="journey">
          <article className="portfolio-panel" id="about">
            <span className="portfolio-kicker"><Sparkles size={16} /> A little about me</span>
            <h2>Curiosity, built into the work.</h2>
            <p>{SITE.shortBio}</p>
            <div className="portfolio-traits">
              <span>Artificial Intelligence</span><span>Machine Learning</span>
              <span>Agentic AI</span><span>Data &amp; SQL</span>
            </div>
            <a className="portfolio-text-link" href="/about">More about me <ArrowUpRight size={15} /></a>
          </article>

          <article className="portfolio-panel" id="experience">
            <span className="portfolio-kicker"><GraduationCap size={16} /> Experience &amp; learning</span>
            <h2>Growing through practice.</h2>
            <div className="portfolio-timeline">
              <div>
                <span>August 2026 — May 2028 · Ongoing</span>
                <strong>Intermediate, Computer Science</strong>
                <p>Government National College · Building a foundation in computing and problem solving.</p>
              </div>
              <div>
                <span>August 2025 — Present</span>
                <strong>AI/ML Developer · Personal projects</strong>
                <p>Exploring deep learning, image classification and predictive data analysis with Python and TensorFlow.</p>
              </div>
            </div>
            <a className="portfolio-text-link" href="/journey">Explore my journey <ArrowUpRight size={15} /></a>
          </article>

          <article className="portfolio-panel portfolio-contact-panel" id="contact">
            <span className="portfolio-kicker"><Mail size={16} /> Get in touch</span>
            <h2>Have an idea to explore?</h2>
            <p>I'm open to learning opportunities, thoughtful collaborations and projects across AI and data.</p>
            <a className="portfolio-cv portfolio-contact-link" href="mailto:muhammadsubhan.tech0@gmail.com">
              <Mail size={16} /> Say hello <ArrowUpRight size={15} />
            </a>
            <a className="portfolio-text-link" href="/contact">Contact page <ExternalLink size={14} /></a>
          </article>
        </section>
      </main>

      <footer className="portfolio-footer">
        <a className="portfolio-brand" href="#home"><span className="portfolio-mark">MS</span><span>{SITE.name}</span></a>
        <span>© {SITE.year} {SITE.name}. Built with curiosity.</span>
        <a href="#home" className="portfolio-back-top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
