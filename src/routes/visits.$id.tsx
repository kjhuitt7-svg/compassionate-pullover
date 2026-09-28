import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Column, ParamedicMark, TopBar, When } from "@/components/chrome";
import { shareText } from "@/lib/note";
import { usePullover } from "@/lib/store";

export const Route = createFileRoute("/visits/$id")({
  component: VisitPage,
});

function VisitPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const personName = usePullover((s) => s.personName);
  const visit = usePullover((s) => s.visits.find((item) => item.id === id));
  const latestId = usePullover((s) => s.visits[0]?.id);
  const unlocked = usePullover((s) => s.unlocked);
  const updateVisit = usePullover((s) => s.updateVisit);
  const removeVisit = usePullover((s) => s.removeVisit);
  const markSent = usePullover((s) => s.markSent);
  const [canShare, setCanShare] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  if (!visit) {
    return (
      <div className="flex min-h-dvh flex-col bg-paper">
        <TopBar title="Note" />
        <div className="bottom-half flex-1 bg-primary text-accent">
        <Column>
          <div className="scope-bg rounded-lg p-5 text-lg font-extrabold text-black">
          <p>That note is gone.</p>
          <Link to="/" className="btn mt-4">
            Back home
          </Link>
          </div>
        </Column>
        </div>
      </div>
    );
  }

  if (!unlocked && id !== latestId) {
    return (
      <div className="flex min-h-dvh flex-col">
        <TopBar title="Note" />
        <div className="bottom-half flex-1 bg-primary text-accent">
          <Column>
            <div className="scope-bg rounded-lg p-5 text-black">
              <h2 className="flex items-start gap-2 text-4xl font-extrabold leading-none">
                <ParamedicMark className="mt-1 size-8" />
                Earlier notes
              </h2>
              <p className="mt-4 text-lg font-extrabold leading-relaxed">The latest note is free. The rest is $4.99 once.</p>
              <Link
                to="/unlock"
                className="mt-6 flex h-14 items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-fg"
              >
                Unlock
              </Link>
            </div>
          </Column>
        </div>
      </div>
    );
  }

  const text = shareText({
    person: personName.trim() || "Update",
    clinic: visit.clinic,
    summary: visit.summary,
    changed: visit.changed,
    watch: visit.watch,
    next: visit.next,
  });

  function patch(partial: { summary?: string; changed?: string; watch?: string; next?: string; clinic?: string }) {
    updateVisit(id, partial);
  }

  async function share() {
    if (!visit) return;
    try {
      await navigator.share({ title: `${personName}: ${visit.summary}`, text });
      markSent(id);
    } catch {
      /* dismissed */
    }
  }

  return (
    <div className={`flex min-h-dvh flex-col ${canShare ? "pb-28" : ""}`}>
      <TopBar title={personName.trim() || "Note"} />
      <div className="bottom-half flex-1 bg-primary text-accent">
      <Column>
        <div className="scope-bg rounded-lg p-5 text-black">
        <p className="text-base font-extrabold">
          <When at={visit.createdAt} withTime />
        </p>
        <input
          value={visit.clinic}
          onChange={(e) => patch({ clinic: e.target.value.slice(0, 80) })}
          placeholder="Clinic or doctor"
          aria-label="Clinic or doctor"
          className="mt-1 h-12 w-full bg-transparent text-xl font-extrabold outline-none placeholder:text-black/40"
        />

        <div className="mt-2 space-y-6">
          <NoteField label="In one line" value={visit.summary} onChange={(summary) => patch({ summary })} rows={2} />
          <NoteField label="What changed" value={visit.changed} onChange={(changed) => patch({ changed })} />
          <NoteField label="Watch" value={visit.watch} onChange={(watch) => patch({ watch })} />
          <NoteField label="Next" value={visit.next} onChange={(next) => patch({ next })} />
        </div>

        <p className="mt-2 text-lg font-extrabold leading-relaxed">
          {visit.sentTo.length ? `Last sent to ${visit.sentTo.join(", ")}. ` : ""}
          Not medical advice. Call the office — or emergency services — if something feels wrong.
        </p>

        {confirming ? (
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                removeVisit(id);
                void navigate({ to: "/" });
              }}
              className="btn h-11 px-4 text-sm"
            >
              Delete note
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="btn h-11 px-4 text-sm">
              Keep it
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="btn mt-6 w-full">
            Delete this note
          </button>
        )}
        </div>
      </Column>
      </div>

      {canShare && (
      <div className="dock fixed inset-x-0 bottom-0 border-t-2 border-black bg-paper px-5 pt-3">
        <div className="mx-auto flex max-w-xl">
          <button
            type="button"
            onClick={() => void share()}
            className="h-12 w-full rounded-md bg-primary font-bold text-primary-fg"
          >
            Share
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

function NoteField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
        <ParamedicMark />
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 1200))}
        rows={rows}
        className="mt-2 w-full resize-none bg-transparent font-display text-3xl font-extrabold leading-none outline-none"
      />
    </label>
  );
}
