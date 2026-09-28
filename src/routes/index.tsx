import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ParamedicMark, When } from "@/components/chrome";
import { usePullover, type Visit } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const personName = usePullover((s) => s.personName);
  const recipients = usePullover((s) => s.recipients);
  const visits = usePullover((s) => s.visits);
  const unlocked = usePullover((s) => s.unlocked);
  const latest = visits[0];
  const earlier = visits.slice(1);
  const who = recipients.length ? recipients.join(", ") : "no one yet";
  const usedFreeNote = visits.some((visit) => !visit.sample);
  const atFreeLimit = !unlocked && usedFreeNote;

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <header className="ekg-top border-b-2 border-black text-ink">
        <div className="mx-auto max-w-xl px-5 pb-8 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm">On the drive home</p>
            <Link
              to="/settings"
              aria-label="Settings"
              className="flex size-11 items-center justify-center rounded-md"
            >
              <Settings className="size-5" strokeWidth={1.75} />
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ParamedicMark className="size-8" />
            <h1 className="pullover-title text-6xl font-extrabold italic leading-none">Pullover</h1>
          </div>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
            For {personName || "them"}. Say what you remember, then send {who} the three things that matter.
          </p>
          <Link
            to={atFreeLimit ? "/unlock" : "/capture"}
            className="mt-6 flex h-14 items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-fg"
          >
            {atFreeLimit ? "Unlock more notes" : "Just walked out"}
          </Link>
        </div>
      </header>

      <div className="bottom-half flex-1 bg-primary text-accent">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-6 font-extrabold">
        {latest ? (
          <Latest visit={latest} />
        ) : (
          <section className="scope-bg rounded-lg px-5 py-8 text-black">
            <h2 className="flex items-center gap-2 text-3xl font-extrabold">
              <ParamedicMark className="size-7" />
              No notes yet
            </h2>
            <p className="mt-2 text-xl font-extrabold">
              Next time you leave the office, pull over and talk through what they said. The note stays on this phone.
            </p>
          </section>
        )}

        {earlier.length > 0 && unlocked && (
          <section>
            <h2 className="flex items-center gap-2 text-base font-extrabold uppercase tracking-widest">
              <ParamedicMark />
              Earlier
            </h2>
            <ul className="mt-3 divide-y divide-accent">
              {earlier.map((visit) => (
                <li key={visit.id}>
                  <Link to="/visits/$id" params={{ id: visit.id }} className="block py-4">
                    <p className="text-base font-extrabold">
                      <When at={visit.createdAt} />
                    </p>
                    <p className="mt-1 text-2xl font-extrabold leading-snug">{visit.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {earlier.length > 0 && !unlocked && (
          <section className="scope-bg rounded-lg p-5 text-black">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold">
              <ParamedicMark className="size-6" />
              Earlier notes
            </h2>
            <p className="mt-2 text-lg font-extrabold">The latest note is free. The rest is $4.99 once.</p>
            <Link to="/unlock" className="btn mt-4 w-full">
              Unlock
            </Link>
          </section>
        )}
      </main>
      </div>
    </div>
  );
}

function Latest({ visit }: { visit: Visit }) {
  const rows = [
    ["What changed", visit.changed],
    ["Watch", visit.watch],
    ["Next", visit.next],
  ] as const;

  return (
    <article className="scope-bg rounded-lg p-5 text-black">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-extrabold">
          <When at={visit.createdAt} withTime />
          {visit.clinic ? ` · ${visit.clinic}` : ""}
        </p>
        {visit.sample && (
          <span className="shrink-0 rounded-sm bg-primary px-2 py-1 text-sm font-extrabold text-accent">Example</span>
        )}
      </div>
      <h2 className="mt-3 flex items-start gap-2 text-4xl font-extrabold leading-none">
        <ParamedicMark className="mt-1 size-8" />
        <span>{visit.summary}</span>
      </h2>
      {visit.sample && (
        <p className="mt-3 text-lg font-extrabold leading-relaxed">
          An example, so you can see the shape. Yours starts with Just walked out.
        </p>
      )}
      <dl className="mt-5 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
              <ParamedicMark />
              {label}
            </dt>
            <dd className="mt-1 text-xl font-extrabold leading-snug">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-base font-extrabold">
        {visit.sentTo.length ? `Sent to ${visit.sentTo.join(", ")}` : "Not sent yet"}
      </p>
      <Link to="/visits/$id" params={{ id: visit.id }} className="btn mt-4 w-full">
        Edit or send
      </Link>
    </article>
  );
}
