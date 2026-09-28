import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/lib/utils";
import type { AgentResult } from "@/lib/agent-result";

export type VaultItem = {
  id: string;
  title: string;
  detail: string;
  amount?: number;
  qty?: number;
  tag?: string;
  done?: boolean;
  createdAt: number;
};

export type VaultRun = {
  id: string;
  at: number;
  input: string;
  result: AgentResult;
};

type VaultState = {
  items: Record<string, VaultItem[]>;
  runs: Record<string, VaultRun[]>;
  addItem: (slug: string, item: Omit<VaultItem, "id" | "createdAt">) => void;
  toggleItem: (slug: string, id: string) => void;
  removeItem: (slug: string, id: string) => void;
  addRun: (slug: string, input: string, result: AgentResult) => void;
};

export const EMPTY_ITEMS: VaultItem[] = [];
export const EMPTY_RUNS: VaultRun[] = [];

export const useVault = create<VaultState>()(
  persist(
    (set) => ({
      items: {},
      runs: {},
      addItem: (slug, item) =>
        set((s) => ({
          items: {
            ...s.items,
            [slug]: [
              { ...item, id: uid(), createdAt: Date.now() },
              ...(s.items[slug] ?? EMPTY_ITEMS),
            ].slice(0, 80),
          },
        })),
      toggleItem: (slug, id) =>
        set((s) => ({
          items: {
            ...s.items,
            [slug]: (s.items[slug] ?? EMPTY_ITEMS).map((it) =>
              it.id === id ? { ...it, done: !it.done } : it,
            ),
          },
        })),
      removeItem: (slug, id) =>
        set((s) => ({
          items: {
            ...s.items,
            [slug]: (s.items[slug] ?? EMPTY_ITEMS).filter((it) => it.id !== id),
          },
        })),
      addRun: (slug, input, result) =>
        set((s) => ({
          runs: {
            ...s.runs,
            [slug]: [
              { id: uid(), at: Date.now(), input, result },
              ...(s.runs[slug] ?? EMPTY_RUNS),
            ].slice(0, 12),
          },
        })),
    }),
    { name: "tr-vault-v1" },
  ),
);
