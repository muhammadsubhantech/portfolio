import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Note } from "@/data/notes";

export function NoteCard({ note }: { note: Note }) {
  return (
    <article className="group card-lift card-sheen glass-card overflow-hidden rounded-[var(--radius-md)]">
      <Link to="/notes/$slug" params={{ slug: note.slug }} className="block no-underline">
        <div className="img-zoom aspect-[16/9]">
          <img
            src={note.image}
            alt={note.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-accent">
            {note.category}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-snug text-fg">{note.title}</h3>
          <p className="mt-2 text-sm text-muted">{note.excerpt}</p>
          <p className="mt-4 text-xs text-subtle">
            {note.date} · {note.readMinutes} min read
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-fg">
            Read article
            <ArrowUpRight className="arrow-shift size-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
