import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/data/agents";

export function RunForm({
  agent,
  input,
  setInput,
  extra,
  setExtra,
  busy,
  error,
  onRun,
  onSample,
}: {
  agent: Agent;
  input: string;
  setInput: (v: string) => void;
  extra: string;
  setExtra: (v: string) => void;
  busy: boolean;
  error: string | null;
  onRun: () => void;
  onSample: () => void;
}) {
  return (
    <form
      className="rounded-xl bg-card p-5 shadow-border"
      onSubmit={(e) => {
        e.preventDefault();
        onRun();
      }}
    >
      <label htmlFor="agent-input" className="text-sm font-medium">
        {agent.inputLabel}
      </label>
      <textarea
        id="agent-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={agent.inputPlaceholder}
        rows={7}
        className="mt-2 w-full resize-y rounded-lg border-0 bg-cream px-3 py-3 text-base text-ink shadow-border placeholder:text-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      />
      {agent.extraLabel ? (
        <div className="mt-3">
          <label htmlFor="agent-extra" className="text-sm font-medium">
            {agent.extraLabel}
          </label>
          <input
            id="agent-extra"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder={agent.extraPlaceholder}
            className="mt-2 h-11 w-full rounded-lg border-0 bg-cream px-3 text-base shadow-border placeholder:text-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </div>
      ) : null}
      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={busy} className="min-h-12 w-full sm:w-auto">
          {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {busy ? "Working…" : agent.action}
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={onSample} disabled={busy}>
          Try a sample
        </Button>
      </div>
    </form>
  );
}
