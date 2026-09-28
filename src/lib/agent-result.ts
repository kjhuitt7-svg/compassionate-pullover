export type ResultItem = {
  title: string;
  detail: string;
  tag?: string;
  amount?: string;
};

export type ResultSection = {
  heading: string;
  body: string;
};

export type AgentResult = {
  title: string;
  summary: string;
  items: ResultItem[];
  sections: ResultSection[];
  rewrite?: string;
  next?: string;
};

export function emptyResult(): AgentResult {
  return { title: "", summary: "", items: [], sections: [] };
}

export function parseAgentJson(raw: string): AgentResult {
  const trimmed = raw.trim();
  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  const slice =
    start >= 0 && end > start ? unfenced.slice(start, end + 1) : unfenced;
  try {
    const parsed = JSON.parse(slice) as Partial<AgentResult>;
    return {
      title: String(parsed.title ?? ""),
      summary: String(parsed.summary ?? ""),
      items: Array.isArray(parsed.items)
        ? parsed.items.map((item) => ({
            title: String(item?.title ?? ""),
            detail: String(item?.detail ?? ""),
            tag: item?.tag ? String(item.tag) : undefined,
            amount: item?.amount ? String(item.amount) : undefined,
          }))
        : [],
      sections: Array.isArray(parsed.sections)
        ? parsed.sections.map((section) => ({
            heading: String(section?.heading ?? ""),
            body: String(section?.body ?? ""),
          }))
        : [],
      rewrite: parsed.rewrite ? String(parsed.rewrite) : undefined,
      next: parsed.next ? String(parsed.next) : undefined,
    };
  } catch {
    return {
      title: "Result",
      summary: trimmed.slice(0, 4000),
      items: [],
      sections: [],
    };
  }
}
