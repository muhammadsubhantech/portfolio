import { createServerFn } from "@tanstack/react-start";
import { knowledgeText, matchLocalAnswer, UNKNOWN } from "@/lib/knowledge";

type Turn = { role: "user" | "assistant"; content: string };

export const askSubhan = createServerFn({ method: "POST" })
  .validator((input: { message: string; history?: Turn[] }) => {
    const message = String(input?.message ?? "").trim().slice(0, 500);
    if (!message) throw new Error("Message required");
    const history = Array.isArray(input?.history) ? input.history.slice(-6) : [];
    return { message, history };
  })
  .handler(async ({ data }) => {
    const local = matchLocalAnswer(data.message);
    if (local?.confident) {
      return { ok: true as const, text: local.text };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true as const, text: local?.text ?? UNKNOWN };
    }

    const system = `You are Subhan AI, the official assistant for Muhammad Subhan's personal portfolio.

Tone: professional, friendly, concise, helpful, confident but honest.

You may answer questions about Muhammad Subhan using ONLY the knowledge below. You may also explain general AI/ML/Python/SQL concepts at a high level when asked, without claiming Muhammad Subhan did specific work that is not listed.

NEVER invent: jobs, companies, clients, degrees, awards, certifications, salaries, project results, years of experience, or professional experience.

If information is not in the knowledge, say exactly: ${UNKNOWN}

When asked about opportunities, explain he is open to AI/ML internships, learning opportunities, collaborations and relevant remote opportunities.

Direct visitors to /contact, /projects, /about, /skills, /notes, /journey when useful.

Keep answers short unless the visitor asks for more detail.

KNOWLEDGE:
${knowledgeText()}`;

    const messages = [
      { role: "system", content: system },
      ...data.history.map((turn) => ({
        role: turn.role,
        content: turn.content.slice(0, 800),
      })),
      { role: "user", content: data.message },
    ];

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          messages,
          max_tokens: 350,
          temperature: 0.2,
        }),
      });
      if (!res.ok) {
        return { ok: true as const, text: local?.text ?? UNKNOWN };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim();
      return { ok: true as const, text: text || UNKNOWN };
    } catch {
      return { ok: true as const, text: local?.text ?? UNKNOWN };
    }
  });
