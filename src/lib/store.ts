import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Visit = {
  id: string;
  createdAt: number;
  raw: string;
  clinic: string;
  summary: string;
  changed: string;
  watch: string;
  next: string;
  sample: boolean;
  sentTo: string[];
};

const EXAMPLE_AT = Date.UTC(2026, 8, 24, 22, 10);

const EXAMPLE: Visit = {
  id: "example-mom",
  createdAt: EXAMPLE_AT,
  clinic: "Dr. Alvarez",
  sample: true,
  sentTo: ["Ana"],
  summary: "Blood pressure pill doubled. Call if she gets dizzy.",
  changed:
    "Lisinopril goes from 10 mg to 20 mg, starting tonight. Morning metformin stays the same. The higher dose is because her home readings have been high.",
  watch: "Call the office if she gets dizzy or lightheaded. Do not wait until morning.",
  next: "Follow-up in six weeks. The card is in her purse. She thinks it is October 9.",
  raw: "Saw Dr. Alvarez. They raised Mom's lisinopril from 10 to 20, start tonight. Morning metformin stays the same. If she gets dizzy, call the office, don't wait. Follow-up in six weeks — she thinks October 9 but the card is in her purse. She didn't understand the dose change. Something about home readings being high.",
};

type PulloverState = {
  personName: string;
  recipients: string[];
  visits: Visit[];
  unlocked: boolean;
  setPersonName: (name: string) => void;
  addRecipient: (name: string) => void;
  removeRecipient: (name: string) => void;
  addVisit: (visit: Visit) => void;
  updateVisit: (id: string, patch: Partial<Omit<Visit, "id">>) => void;
  removeVisit: (id: string) => void;
  markSent: (id: string) => void;
  unlock: () => void;
};

export const usePullover = create<PulloverState>()(
  persist(
    (set) => ({
      personName: "Mom",
      recipients: ["Ana"],
      visits: [EXAMPLE],
      unlocked: false,
      setPersonName: (name) => set({ personName: name.slice(0, 40) }),
      addRecipient: (name) =>
        set((state) => {
          const clean = name.trim().slice(0, 40);
          if (!clean) return state;
          if (state.recipients.some((r) => r.toLowerCase() === clean.toLowerCase())) return state;
          if (state.recipients.length >= 6) return state;
          return { recipients: [...state.recipients, clean] };
        }),
      removeRecipient: (name) =>
        set((state) => ({ recipients: state.recipients.filter((r) => r !== name) })),
      addVisit: (visit) => set((state) => ({ visits: [visit, ...state.visits] })),
      updateVisit: (id, patch) =>
        set((state) => ({
          visits: state.visits.map((visit) => (visit.id === id ? { ...visit, ...patch, sample: false } : visit)),
        })),
      removeVisit: (id) => set((state) => ({ visits: state.visits.filter((visit) => visit.id !== id) })),
      markSent: (id) =>
        set((state) => ({
          visits: state.visits.map((visit) =>
            visit.id === id ? { ...visit, sentTo: [...state.recipients] } : visit,
          ),
        })),
      unlock: () => set({ unlocked: true }),
    }),
    {
      name: "pullover-v1",
      skipHydration: true,
      partialize: (state) => ({
        personName: state.personName,
        recipients: state.recipients,
        visits: state.visits,
        unlocked: state.unlocked,
      }),
    },
  ),
);
