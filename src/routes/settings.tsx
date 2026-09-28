import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Column, ParamedicMark, TopBar } from "@/components/chrome";
import { usePullover } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const personName = usePullover((s) => s.personName);
  const recipients = usePullover((s) => s.recipients);
  const unlocked = usePullover((s) => s.unlocked);
  const setPersonName = usePullover((s) => s.setPersonName);
  const addRecipient = usePullover((s) => s.addRecipient);
  const removeRecipient = usePullover((s) => s.removeRecipient);
  const [draft, setDraft] = useState("");
  const [needsUnlock, setNeedsUnlock] = useState(false);

  function add() {
    if (!unlocked && recipients.length >= 1) {
      setNeedsUnlock(true);
      return;
    }
    addRecipient(draft);
    setDraft("");
    setNeedsUnlock(false);
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar title="Settings" />
      <div className="bottom-half flex-1 bg-primary text-accent">
      <Column>
        <div className="scope-bg space-y-8 rounded-lg p-5 text-black">
        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
            <ParamedicMark />
            Who you take
          </span>
          <input
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="mt-2 h-12 w-full rounded-md border border-line bg-card px-4 text-base outline-none"
          />
        </label>

        <section>
          <h2 className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
            <ParamedicMark />
            Who gets the note
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recipients.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => removeRecipient(name)}
                  className="h-10 rounded-full bg-primary px-4 text-sm font-bold text-primary-fg"
                >
                  {name}
                  <span className="sr-only">, remove</span>
                  <span aria-hidden="true"> ×</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
              placeholder="Add a name"
              className="h-12 flex-1 rounded-md border border-line bg-card px-4 text-base outline-none"
            />
            <button
              type="button"
              onClick={add}
              className="h-12 rounded-md bg-primary px-4 text-sm font-bold text-primary-fg"
            >
              Add
            </button>
          </div>
          <p className="mt-2 text-lg font-extrabold">Copy and Share use these names. Nothing is sent until you do.</p>
          {!unlocked && recipients.length >= 1 && (
            <div className="mt-3">
              <p className="text-lg font-extrabold">
                {needsUnlock ? "Another name is $4.99 once." : "One name is free."}
              </p>
              <Link to="/unlock" className="btn mt-3">
                Unlock
              </Link>
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
            <ParamedicMark />
            On your phone
          </h2>
          <p className="mt-2 text-lg font-extrabold leading-relaxed">
            iPhone: tap Share, then Add to Home Screen. Android: open the browser menu and choose Install app.
          </p>
          <Link to="/privacy" className="btn mt-4">
            Privacy
          </Link>
        </section>
        </div>
      </Column>
      </div>
    </div>
  );
}
