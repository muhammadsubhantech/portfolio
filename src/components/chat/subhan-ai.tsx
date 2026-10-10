import { Link } from "@tanstack/react-router";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { askSubhan } from "@/lib/ask-subhan";
import { CHAT_GREETING, matchLocalAnswer, UNKNOWN } from "@/lib/knowledge";
import { cn } from "@/lib/utils";
import { useChatUi } from "@/store/ui";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Who is Muhammad Subhan?",
  "What technologies does he work with?",
  "Show me his projects.",
  "Is he open to internships?",
  "How can I contact him?",
];

export function SubhanAi() {
  const { open, setOpen, toggle } = useChatUi();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [hint, setHint] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [turns, open, pending]);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => setHint(true), 2800);
    return () => window.clearTimeout(timer);
  }, [open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    const history = turns.slice(-6);
    const nextTurns: Turn[] = [...turns, { role: "user", content: message }];
    setTurns(nextTurns);
    setInput("");
    setPending(true);
    try {
      const result = await askSubhan({ data: { message, history } });
      const reply = result.ok ? result.text : UNKNOWN;
      setTurns([...nextTurns, { role: "assistant", content: reply }]);
    } catch {
      const local = matchLocalAnswer(message);
      setTurns([...nextTurns, { role: "assistant", content: local?.text ?? UNKNOWN }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open ? (
        <section
          className="chat-enter pointer-events-auto flex h-[min(32rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border-hover)]"
          aria-label="Ask Subhan AI"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-accent-dim text-accent">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">Subhan AI</p>
                <p className="flex items-center gap-1.5 text-[0.7rem] text-muted">
                  <span className="ai-live" aria-hidden="true" />
                  Ask me about Muhammad Subhan
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="nav"
              size="icon"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </header>

          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant">{CHAT_GREETING}</Bubble>
            {turns.map((turn, i) => (
              <Bubble key={`${turn.role}-${i}`} role={turn.role}>
                {turn.content}
              </Bubble>
            ))}
            {pending ? <p className="text-xs text-muted">Subhan AI is thinking…</p> : null}
            {turns.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full px-3 py-1.5 text-left text-xs text-muted shadow-[var(--shadow-border)] hover:text-fg"
                    onClick={() => send(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            className="border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <div className="flex items-center gap-2">
              <input
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask about skills, projects, contact…"
                className="h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] bg-surface px-3 text-sm text-fg placeholder:text-subtle"
                aria-label="Message Subhan AI"
              />
              <Button type="submit" size="icon" disabled={pending || !input.trim()} aria-label="Send message">
                <ArrowUp className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-[0.65rem] text-subtle">
              Answers stay within published portfolio facts.{" "}
              <Link to="/contact" className="text-muted hover:text-fg" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </p>
          </form>
        </section>
      ) : null}

      {hint && !open ? (
        <p className="chat-hint pointer-events-none rounded-full bg-bg-elevated px-3 py-1.5 text-xs text-muted shadow-[var(--shadow-border)]">
          Ask Subhan AI
        </p>
      ) : null}
      <button
        type="button"
        className={cn(
          "chat-enter pointer-events-auto grid size-12 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_10px_30px_-12px_var(--glow)]",
          "transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:shadow-[0_0_24px_-6px_var(--accent)] active:scale-[0.96]",
        )}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close Ask Subhan AI" : "Open Ask Subhan AI"}
      >
        <Sparkles className="size-4" />
      </button>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: string }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[92%] whitespace-pre-wrap rounded-[var(--radius-md)] px-3 py-2 text-sm leading-relaxed",
          role === "user"
            ? "bg-accent text-accent-fg"
            : "bg-surface text-fg shadow-[var(--shadow-border)]",
        )}
      >
        {children}
      </p>
    </div>
  );
}
