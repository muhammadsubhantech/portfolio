const PIPE = ["Data", "Processing", "Model", "Prediction"] as const;
const AGENT = ["Plan", "Reason", "Tools", "Memory", "Action"] as const;
const FLOW = ["Source", "Process", "Database", "Analysis", "Insight"] as const;

export function MlPipeline() {
  return (
    <figure className="system-card" aria-label="Machine learning pipeline">
      <figcaption className="text-xs uppercase tracking-[0.18em] text-accent">Machine learning</figcaption>
      <ol className="mt-5 flex flex-col gap-0">
        {PIPE.map((step, i) => (
          <li key={step} className="pipeline-step" style={{ animationDelay: `${i * 180}ms` }}>
            <span className="pipeline-dot" />
            <span className="font-mono text-xs tracking-[0.16em] text-fg">{step.toUpperCase()}</span>
            {i < PIPE.length - 1 ? <span className="pipeline-track" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function AgentGraph() {
  return (
    <figure className="system-card" aria-label="Agentic AI loop">
      <figcaption className="text-xs uppercase tracking-[0.18em] text-accent">Agentic AI</figcaption>
      <div className="relative mx-auto mt-6 h-64 max-w-sm">
        <div className="agent-core">AI Agent</div>
        {AGENT.map((label, i) => (
          <span key={label} className={`agent-node agent-node-${i + 1}`}>
            {label}
          </span>
        ))}
        <span className="agent-pulse" aria-hidden="true" />
      </div>
      <p className="mt-2 text-center font-mono text-[0.65rem] tracking-[0.14em] text-subtle">
        AGENT → PLAN → TOOLS → ACTION
      </p>
    </figure>
  );
}

export function DataPipeline() {
  return (
    <figure className="system-card" aria-label="Data engineering pipeline">
      <figcaption className="text-xs uppercase tracking-[0.18em] text-accent">Data engineering</figcaption>
      <ol className="mt-5 space-y-3">
        {FLOW.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="pipeline-dot" style={{ animationDelay: `${i * 280}ms` }} />
            <span className="font-mono text-xs tracking-[0.14em] text-fg">{step.toUpperCase()}</span>
            {i < FLOW.length - 1 ? (
              <span className="ml-auto h-px flex-1 bg-border">
                <span className="data-bit" style={{ animationDelay: `${i * 0.45}s` }} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
