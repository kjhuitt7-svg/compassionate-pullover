import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import type { Agent } from "@/data/agents";
import { hoursValue } from "@/data/agents";
import { useAgentRun } from "@/hooks/use-agent-run";
import { useVault, EMPTY_RUNS } from "@/lib/vault-store";
import { RunForm } from "@/components/workspaces/run-form";
import { ResultView } from "@/components/workspaces/result-view";
import { ItemList } from "@/components/workspaces/item-list";

const MONEY_KINDS = new Set(["ledger"]);

export function AgentWorkspace({ agent }: { agent: Agent }) {
  const run = useAgentRun(agent);
  const addItem = useVault((s) => s.addItem);
  const showList = ["inbox", "ledger", "board", "plan", "people", "care", "coach"].includes(
    agent.kind,
  );
  const money = MONEY_KINDS.has(agent.kind);

  function keep(title: string, detail: string, amount?: string) {
    const n = amount ? Number(String(amount).replace(/[^0-9.]/g, "")) : undefined;
    addItem(agent.slug, {
      title,
      detail,
      amount: Number.isFinite(n) ? n : undefined,
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        All agents
      </Link>

      <header className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
            {agent.kind === "life" ? "Command" : "Single-purpose app"}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {agent.name}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{agent.problem}</p>
          <p className="mt-2 max-w-xl text-base leading-relaxed">{agent.benefit}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-3 font-medium text-gold-bright">
              <Clock className="size-3.5" />~{agent.hours} hrs/wk back
            </span>
            <span className="text-muted">
              About {hoursValue(agent.hours)}/mo of time, at a $50 hour.
            </span>
          </div>
        </div>
        <div className="relative mx-auto h-52 w-36 overflow-hidden rounded-xl bg-navy ring-1 ring-primary/40 md:h-64 md:w-44">
          <img
            src={agent.image}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      </header>

      {agent.disclaimer ? (
        <p className="mt-6 max-w-3xl rounded-lg bg-parchment px-4 py-3 text-sm text-muted">
          {agent.disclaimer}
        </p>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <RunForm
            agent={agent}
            input={run.input}
            setInput={run.setInput}
            extra={run.extra}
            setExtra={run.setExtra}
            busy={run.busy}
            error={run.error}
            onRun={run.run}
            onSample={run.loadSample}
          />
          {run.result ? (
            <ResultView result={run.result} onKeep={showList ? keep : undefined} />
          ) : (
            <p className="px-1 text-sm text-muted">
              One paste. One gold button. That's the whole app.
            </p>
          )}
        </div>
        <aside className="space-y-6">
          {showList ? <ItemList slug={agent.slug} noun={agent.itemNoun} money={money} /> : null}
          <RecentRuns slug={agent.slug} />
        </aside>
      </div>
    </div>
  );
}

function RecentRuns({ slug }: { slug: string }) {
  const runs = useVault((s) => s.runs[slug] ?? EMPTY_RUNS);
  if (runs.length === 0) return null;
  return (
    <section className="rounded-xl bg-card p-5 shadow-border">
      <h3 className="font-display text-base font-bold tracking-tight">Earlier runs</h3>
      <ul className="mt-3 space-y-3">
        {runs.slice(0, 5).map((run) => (
          <li key={run.id} className="border-t border-border pt-3 first:border-0 first:pt-0">
            <p className="text-xs text-muted">
              {new Date(run.at).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className="mt-1 line-clamp-2 text-sm">{run.result.title || run.input}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
