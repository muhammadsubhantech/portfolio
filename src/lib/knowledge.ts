import { HEADED, JOURNEY } from "@/data/journey";
import { NOTES } from "@/data/notes";
import { PROJECTS } from "@/data/projects";
import { CURRENTLY_LEARNING, SKILL_GROUPS } from "@/data/skills";
import { SITE, SOCIALS } from "@/data/site";

export const CHAT_GREETING = `Hi! I'm Subhan AI.

I can help you learn about Muhammad Subhan, his AI/ML work, skills, projects and career interests. What would you like to know?`;

export const UNKNOWN =
  "I don't have that information yet. You can contact Muhammad Subhan directly for the latest details.";

export function knowledgeText() {
  const skills = SKILL_GROUPS.map((group) => {
    const lines = group.items
      .map((item) => `- ${item.name} (${item.level}): ${item.note}`)
      .join("\n");
    return `${group.title}\n${lines}`;
  }).join("\n\n");

  const projects = PROJECTS.map((project) => {
    return [
      `Title: ${project.title}`,
      `Status: published learning project`,
      `GitHub: ${project.github ?? "not listed"}`,
      `One-liner: ${project.oneLiner}`,
      `Tags: ${project.tags.join(", ")}`,
      `Overview: ${project.overview}`,
    ].join("\n");
  }).join("\n\n");

  const notes = NOTES.map(
    (note) =>
      `- ${note.title} (${note.category}, ${note.date}, ${note.readMinutes} min): ${note.excerpt} — /notes/${note.slug}`,
  ).join("\n");

  const journey = JOURNEY.map(
    (item) => `- ${item.title} [${item.period}]: ${item.body}`,
  ).join("\n");

  return `
Muhammad Subhan is an aspiring AI/ML Engineer based in Karachi, Pakistan, under the personal brand Muhammad Subhan Tech.

He is pursuing ICS / Computer Science at Government National College, Karachi, and a 1-year Python with AI diploma at TechZone.

He does NOT claim professional industry employment, companies, clients, awards, certifications, salaries, or years of experience. Education listed above comes from his public GitHub profile.

GitHub: https://github.com/muhammadsubhantech

Location: ${SITE.location}
Availability: ${SITE.availability}
Headline: ${SITE.tagline}
Short bio: ${SITE.shortBio}
Longer bio: ${SITE.longBio}
Experience: ${SITE.experience}
Career direction: ${SITE.career}
Open to: ${SITE.availabilityCard}
Languages: ${SITE.languages.map((l) => `${l.name} — ${l.level}`).join("; ")}
Interests: ${SITE.interests.join(", ")}
Currently learning: ${CURRENTLY_LEARNING.join("; ")}

Skills:
${skills}

Projects:
Public GitHub learning projects. Do not invent accuracy, clients or production claims. Direct people to /projects and the GitHub URLs.
${projects}

Journey:
${journey}

Where he is headed:
${HEADED}

Notes / educational articles:
${notes}

Social links:
${SOCIALS.map((s) => `${s.label}: ${s.href}`).join("\n")}

Email: not published on the website.
Contact: direct visitors to the Contact page (/contact).
Navigation pages: Home /, About /about, Projects /projects, Skills /skills, Journey /journey, Notes /notes, Contact /contact.
`.trim();
}

export function matchLocalAnswer(message: string): { text: string; confident: boolean } | null {
  const q = message.toLowerCase().trim();
  if (!q) return null;

  const has = (...words: string[]) => words.every((w) => q.includes(w));
  const any = (...words: string[]) => words.some((w) => q.includes(w));

  if (any("who is", "who are you", "about subhan", "about muhammad", "who is muhammad")) {
    return {
      confident: true,
      text: `Muhammad Subhan is an aspiring AI/ML Engineer focused on Artificial Intelligence, Machine Learning, Agentic AI, Python and Data Engineering. He is based in ${SITE.location}. ${SITE.experience} You can read more on the About page.`,
    };
  }

  if (any("contact", "email", "reach", "social", "tiktok", "instagram", "facebook", "linkedin", "github")) {
    const links = SOCIALS.map((s) => `${s.label}: ${s.href}`).join("\n");
    return {
      confident: true,
      text: `The best way to reach Muhammad Subhan is the Contact page. An email address is not published on the website yet.\n\n${links}\n\n${SITE.availabilityCard}`,
    };
  }

  if (any("intern", "opportunit", "hire", "available", "remote", "collaborat", "job", "open to")) {
    return {
      confident: true,
      text: `${SITE.availabilityCard} He is based in ${SITE.location} and ${SITE.availability.toLowerCase()}. For a conversation, use the Contact page.`,
    };
  }

  if (any("skill", "technolog", "stack", "python", "sql", "what does he work")) {
    const list = SKILL_GROUPS.flatMap((g) =>
      g.items.map((i) => `${i.name} — ${i.level}`),
    ).join("\n");
    return {
      confident: true,
      text: `Muhammad Subhan works with and is learning:\n${list}\n\nCurrently learning: ${CURRENTLY_LEARNING.join(", ")}.\nSkill levels are honest labels, not percentages. See the Skills page for the full picture.`,
    };
  }

  if (any("project", "portfolio", "case study", "github")) {
    const list = PROJECTS.map((p) => `• ${p.title} — ${p.oneLiner}${p.github ? ` (${p.github})` : ""}`).join("\n");
    return {
      confident: true,
      text: `Published learning projects on GitHub:\n${list}\n\nOpen any case study on the Projects page. Metrics are not invented on the website — they live in the notebooks.`,
    };
  }

  if (any("learn", "currently learning", "studying", "focus")) {
    return {
      confident: true,
      text: `Current focus: ${SITE.interests.join(", ")}.\nCurrently learning: ${CURRENTLY_LEARNING.join(", ")}.\n${SITE.career}`,
    };
  }

  if (any("journey", "education", "degree", "university", "school", "timeline")) {
    return {
      confident: true,
      text: `Muhammad Subhan is pursuing ICS / Computer Science at Government National College, Karachi, and a 1-year Python with AI diploma at TechZone. Exact dates are not published. ${SITE.experience}\n\nThe Journey page covers ongoing learning in Python, data analysis, machine learning, deep learning and agentic AI.\n\n${HEADED}`,
    };
  }

  if (any("language", "urdu", "english")) {
    return {
      confident: true,
      text: `Languages: ${SITE.languages.map((l) => `${l.name} — ${l.level}`).join("; ")}.`,
    };
  }

  if (any("where", "location", "karachi", "pakistan")) {
    return {
      confident: true,
      text: `Muhammad Subhan is based in ${SITE.location} and is ${SITE.availability.toLowerCase()}.`,
    };
  }

  if (any("note", "blog", "article", "writing")) {
    const list = NOTES.map((n) => `• ${n.title} — /notes/${n.slug}`).join("\n");
    return {
      confident: true,
      text: `Notes are educational articles, not personal war stories. Latest pieces:\n${list}`,
    };
  }

  if (has("name") || q === "muhammad subhan" || q.includes("brand")) {
    return {
      confident: true,
      text: `${SITE.name}, personal brand ${SITE.brand}. ${SITE.titleRole} based in ${SITE.location}.`,
    };
  }

  return null;
}
