import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { useVault, EMPTY_ITEMS, type VaultItem } from "@/lib/vault-store";

export function ItemList({
  slug,
  noun,
  money,
}: {
  slug: string;
  noun: string;
  money?: boolean;
}) {
  const items = useVault((s) => s.items[slug] ?? EMPTY_ITEMS);
  const addItem = useVault((s) => s.addItem);
  const toggleItem = useVault((s) => s.toggleItem);
  const removeItem = useVault((s) => s.removeItem);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const openTotal = items
    .filter((i) => !i.done && typeof i.amount === "number")
    .reduce((a, i) => a + (i.amount ?? 0), 0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    const n = amount.trim() ? Number(amount.replace(/[^0-9.]/g, "")) : undefined;
    addItem(slug, {
      title: t,
      detail: "",
      amount: Number.isFinite(n) ? n : undefined,
    });
    setTitle("");
    setAmount("");
  }

  return (
    <section className="rounded-xl bg-card p-5 shadow-border">
      <div className="flex items-end justify-between gap-3">
        <h3 className="font-display text-base font-bold tracking-tight">Your {noun}s</h3>
        {money ? (
          <p className="font-serif text-xl italic text-gold-deep tabular-nums">
            {formatMoney(openTotal)}
            <span className="ml-1 font-sans text-xs not-italic text-muted">open</span>
          </p>
        ) : (
          <p className="text-sm text-muted tabular-nums">{items.length}</p>
        )}
      </div>
      <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Add ${noun}`}
          className="h-11 min-h-11 flex-1 rounded-lg bg-cream px-3 text-base shadow-border placeholder:text-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        />
        {money ? (
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            placeholder="$"
            className="h-11 w-full rounded-lg bg-cream px-3 text-base shadow-border sm:w-28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        ) : null}
        <Button type="submit" variant="navy" className="min-h-11">
          <Plus className="size-4" />
          Add
        </Button>
      </form>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Nothing here yet. Add one, or keep it from a run.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {items.map((item: VaultItem) => (
            <li key={item.id} className="flex items-center gap-2 py-2">
              <button
                type="button"
                aria-label={item.done ? "Mark open" : "Mark done"}
                onClick={() => toggleItem(slug, item.id)}
                className={`grid size-11 shrink-0 place-items-center rounded-md ${
                  item.done ? "text-ok" : "text-muted hover:text-ink"
                }`}
              >
                <Check className="size-4" />
              </button>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${item.done ? "text-muted line-through" : ""}`}>
                  {item.title}
                </p>
                {item.detail ? (
                  <p className="truncate text-xs text-muted">{item.detail}</p>
                ) : null}
              </div>
              {typeof item.amount === "number" ? (
                <span className="font-serif text-sm italic text-gold-deep tabular-nums">
                  {formatMoney(item.amount)}
                </span>
              ) : null}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => removeItem(slug, item.id)}
                className="grid size-11 place-items-center rounded-md text-muted hover:text-danger"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
