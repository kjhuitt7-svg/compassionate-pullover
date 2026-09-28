import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { AgentResult } from "@/lib/agent-result";
import { copyText } from "@/lib/utils";

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-parchment hover:text-ink"
      aria-label="Copy"
      onClick={async () => {
        const ok = await copyText(text);
        if (ok) {
          setDone(true);
          toast("Copied");
          setTimeout(() => setDone(false), 1200);
        }
      }}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

export function ResultView({
  result,
  onKeep,
}: {
  result: AgentResult;
  onKeep?: (title: string, detail: string, amount?: string) => void;
}) {
  const blob = [
    result.title,
    result.summary,
    result.rewrite,
    ...result.items.map((i) => `${i.title}: ${i.detail}`),
    ...result.sections.map((s) => `${s.heading}\n${s.body}`),
    result.next ? `Next: ${result.next}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <article className="rounded-xl bg-card p-5 shadow-border">
      <div className="flex items-start justify-between gap-3">
        <div>
          {result.title ? (
            <h3 className="font-display text-lg font-bold tracking-tight">{result.title}</h3>
          ) : null}
          {result.summary ? (
            <p className="mt-2 text-sm leading-relaxed text-ink/90">{result.summary}</p>
          ) : null}
        </div>
        <CopyBtn text={blob} />
      </div>

      {result.items.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {result.items.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="flex flex-col gap-2 rounded-lg bg-cream px-3 py-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {item.tag ? (
                    <span className="rounded-full bg-navy px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-gold-bright">
                      {item.tag}
                    </span>
                  ) : null}
                  <p className="font-medium">{item.title}</p>
                  {item.amount ? (
                    <span className="font-serif text-base italic text-gold-deep">{item.amount}</span>
                  ) : null}
                </div>
                {item.detail ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center">
                <CopyBtn text={`${item.title}\n${item.detail}`} />
                {onKeep ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11"
                    onClick={() => onKeep(item.title, item.detail, item.amount)}
                  >
                    Keep
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {result.rewrite ? (
        <div className="mt-4 rounded-lg bg-parchment/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              Ready to use
            </p>
            <CopyBtn text={result.rewrite} />
          </div>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {result.rewrite}
          </pre>
        </div>
      ) : null}

      {result.sections.map((section) => (
        <section key={section.heading} className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
            {section.heading}
          </h4>
          <p className="mt-1 text-sm leading-relaxed">{section.body}</p>
        </section>
      ))}

      {result.next ? (
        <p className="mt-4 border-t border-border pt-3 text-sm">
          <span className="font-semibold text-gold-deep">Next. </span>
          {result.next}
        </p>
      ) : null}
    </article>
  );
}
