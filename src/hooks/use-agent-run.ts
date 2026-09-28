import { useState } from "react";
import { toast } from "sonner";
import type { Agent } from "@/data/agents";
import { runAgent } from "@/lib/run-agent";
import type { AgentResult } from "@/lib/agent-result";
import { useVault } from "@/lib/vault-store";

export function useAgentRun(agent: Agent) {
  const [input, setInput] = useState("");
  const [extra, setExtra] = useState(agent.extraPlaceholder ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResult | null>(null);
  const addRun = useVault((s) => s.addRun);

  async function run() {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Add a little context first — or tap Try a sample.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await runAgent({
        data: { slug: agent.slug, input: trimmed, extra: extra.trim() || undefined },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResult(res.result);
      addRun(agent.slug, trimmed, res.result);
    } catch {
      setError("Couldn't reach the agent. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  function loadSample() {
    setInput(agent.sample);
    toast("Sample loaded. Hit the gold button.");
  }

  return {
    input,
    setInput,
    extra,
    setExtra,
    busy,
    error,
    result,
    setResult,
    run,
    loadSample,
  };
}
