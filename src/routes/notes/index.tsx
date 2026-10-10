import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NoteCard } from "@/components/cards/note-card";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro, ScrollReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { NOTES, NOTE_CATEGORIES, type NoteCategory } from "@/data/notes";
import { SEO } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notes/")({
  head: () => pageHead({ ...SEO.notes, path: "/notes" }),
  component: NotesPage,
});

function NotesPage() {
  const [category, setCategory] = useState<NoteCategory | "All">("All");
  const items = useMemo(() => {
    if (category === "All") return NOTES;
    return NOTES.filter((note) => note.category === category);
  }, [category]);

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <PageIntro eyebrow="Writing" title="Notes">
          <p>Things I'm learning, building and thinking about.</p>
        </PageIntro>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {(["All", ...NOTE_CATEGORIES] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "h-10 shrink-0 rounded-full px-3.5 text-sm",
                category === item
                  ? "bg-accent text-accent-fg"
                  : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-muted">No notes in this category yet.</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {items.map((note, i) => (
              <ScrollReveal key={note.slug} delay={i * 50}>
                <NoteCard note={note} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
