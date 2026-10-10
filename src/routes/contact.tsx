import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { SEO, SITE, SOCIALS } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({ ...SEO.contact, path: "/contact" }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !subject || !message) {
      setError("Please complete every field.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    const payload = { name, email, subject, message, at: new Date().toISOString() };
    try {
      const prev = JSON.parse(localStorage.getItem("ms-contact") ?? "[]") as unknown[];
      localStorage.setItem("ms-contact", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore */
    }

    if (SITE.email) {
      const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From ${name} <${email}>\n\n${message}`,
      )}`;
      window.location.href = href;
    }

    setError("");
    setStatus("sent");
    form.reset();
  }

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="Contact" title="Let's Connect.">
          <p>Have an opportunity, idea or project to discuss? I'd be happy to hear from you.</p>
        </PageIntro>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <Input id="name" name="name" autoComplete="name" required />
                </Field>
                <Field label="Email" htmlFor="email">
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </Field>
              </div>
              <Field label="Subject" htmlFor="subject">
                <Input id="subject" name="subject" required />
              </Field>
              <Field label="Message" htmlFor="message">
                <Textarea id="message" name="message" required />
              </Field>
              {status === "error" ? (
                <p className="text-sm text-accent-strong" role="alert">
                  {error}
                </p>
              ) : null}
              {status === "sent" ? (
                <p className="text-sm text-accent" role="status">
                  Thank you. Your message has been recorded. You can also reach Muhammad Subhan
                  through the social links on this page.
                </p>
              ) : null}
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <aside className="space-y-5">
              <div className="glass-card rounded-[var(--radius-md)] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">Availability</p>
                <p className="mt-3 text-sm text-muted">{SITE.availabilityCard}</p>
                <p className="mt-3 text-sm text-subtle">{SITE.location}</p>
              </div>
              <div className="glass-card rounded-[var(--radius-md)] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">Elsewhere</p>
                <ul className="mt-4 space-y-3">
                  {SOCIALS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-fg no-underline hover:text-accent"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
