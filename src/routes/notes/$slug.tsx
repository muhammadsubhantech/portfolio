import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { NoteCard } from "@/components/cards/note-card";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getNote, NOTES, type NoteBlock } from "@/data/notes";
import { SITE } from "@/data/site";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note) throw notFound();
    return { note };
  },
  head: ({ loaderData }) => {
    const note = loaderData?.note;
    if (!note) return pageHead({ ...{ title: "Notes", description: "Notes by Muhammad Subhan", path: "/notes" } });
    return pageHead({
      title: `${note.title} | ${SITE.name}`,
      description: note.description,
      path: `/notes/${note.slug}`,
    });
  },
  component: NotePage,
});

function NotePage() {
  const { note } = Route.useLoaderData();
  const related = NOTES.filter((item) => note.related.includes(item.slug));
  const headings = note.blocks.filter((block) => block.type === "h2");
  const shareUrl = `/notes/${note.slug}`;
  const shareText = encodeURIComponent(note.title);

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
          { name: note.title, path: shareUrl },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: note.title,
          description: note.description,
          path: shareUrl,
          date: note.date,
          image: note.image,
        })}
      />
      <article className="mx-auto max-w-3xl px-4 pb-20 md:px-6">
        <Link
          to="/notes"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted no-underline hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          All notes
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-accent">{note.category}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-fg md:text-5xl">
          {note.title}
        </h1>
        <p className="mt-4 text-muted">{note.excerpt}</p>
        <p className="mt-3 text-sm text-subtle">
          By {SITE.name} · {note.date} · {note.readMinutes} min read
        </p>
        <div className="img-zoom mt-8 overflow-hidden rounded-[var(--radius-md)]">
          <img src={note.image} alt={note.imageAlt} className="aspect-[16/9] w-full object-cover" />
        </div>

        {headings.length > 1 ? (
          <nav className="mt-10 rounded-[var(--radius-md)] p-5 shadow-[var(--shadow-border)]" aria-label="Table of contents">
            <p className="text-xs uppercase tracking-[0.16em] text-subtle">Contents</p>
            <ol className="mt-3 space-y-2">
              {headings.map((heading) =>
                heading.type === "h2" ? (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="text-sm text-muted hover:text-fg">
                      {heading.text}
                    </a>
                  </li>
                ) : null,
              )}
            </ol>
          </nav>
        ) : null}

        <div className="mt-10">
          {note.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <section className="mt-12 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">Share</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-fg"
            >
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-fg"
            >
              LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-fg"
            >
              Facebook
            </a>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <h2 className="font-display text-3xl text-fg">Related articles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <NoteCard key={item.slug} note={item} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </SiteShell>
  );
}

function Block({ block }: { block: NoteBlock }) {
  if (block.type === "p") {
    return <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{block.text}</p>;
  }
  if (block.type === "h2") {
    return (
      <h2 id={block.id} className="mt-12 scroll-mt-24 font-display text-3xl text-fg">
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 id={block.id} className="mt-8 scroll-mt-24 text-lg font-semibold text-fg">
        {block.text}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <blockquote className="mt-6 border-l-2 border-accent pl-4 font-display text-xl text-fg">
      {block.text}
    </blockquote>
  );
}
