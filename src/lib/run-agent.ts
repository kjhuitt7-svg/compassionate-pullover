import { createServerFn } from "@tanstack/react-start";
import { AGENT_BY_SLUG } from "@/data/agents";
import { parseAgentJson, type AgentResult } from "@/lib/agent-result";

const SCHEMA = `{
  "title": "short headline",
  "summary": "2-4 sentences, plain language, the actual answer",
  "items": [
    { "title": "name or action", "detail": "one or two sentences", "tag": "optional label like Now or High", "amount": "optional dollar or qty" }
  ],
  "sections": [{ "heading": "optional extra section", "body": "plain text, no markdown" }],
  "rewrite": "optional full rewritten text when the job is to rewrite, translate, proof, or draft",
  "next": "one concrete next step for the human"
}`;

export const runAgent = createServerFn({ method: "POST" })
  .validator((input: { slug: string; input: string; extra?: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: AgentResult } | { ok: false; error: string }> => {
    const agent = AGENT_BY_SLUG[data.slug];
    if (!agent) return { ok: false, error: "Unknown agent." };

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "This agent is offline in this environment." };
    }

    const input = data.input.trim().slice(0, 8000);
    if (!input) return { ok: false, error: "Give the agent something to work with." };

    const extra = (data.extra ?? "").trim().slice(0, 500);

    const system = [
      `You are ${agent.name}, a TreasureRate gold-armored specialist.`,
      `Tagline: ${agent.tagline}`,
      `Everyday problem you solve: ${agent.problem}`,
      `Core benefit: ${agent.benefit}`,
      `Do exactly this job. Do not add extras, upsells, or unrelated features.`,
      `Be specific to the user's facts. No filler, no hashtags, no emoji.`,
      `If the domain is legal, medical, tax, insurance, or investing, be educational only and say so in summary — not professional advice.`,
      `Return ONLY valid JSON matching this schema (no markdown fences):`,
      SCHEMA,
      `Keep items to what helps. Prefer 3–8 items. Keep rewrite under 400 words.`,
    ].join("\n");

    const user = extra
      ? `Extra context: ${extra}\n\nUser input:\n${input}`
      : input;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: 1100,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      if (!res.ok) {
        return { ok: false, error: `The agent couldn't finish (${res.status}). Try again.` };
      }

      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      if (!text.trim()) {
        return { ok: false, error: "Empty response. Try a shorter input." };
      }
      return { ok: true, result: parseAgentJson(text) };
    } catch {
      return { ok: false, error: "Network error talking to the agent." };
    }
  });
