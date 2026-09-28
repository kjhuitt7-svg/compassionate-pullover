import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Column, ParamedicMark, TopBar } from "@/components/chrome";
import { createRecognizer, type Recognizer } from "@/lib/dictate";
import { shapeNote } from "@/lib/shape-note";
import { usePullover } from "@/lib/store";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/capture")({
  component: CapturePage,
});

const STARTERS = [
  ["Meds", "Meds: "],
  ["Watch for", "Watch for: "],
  ["Next visit", "Next visit: "],
] as const;

function CapturePage() {
  const navigate = useNavigate();
  const personName = usePullover((s) => s.personName);
  const addVisit = usePullover((s) => s.addVisit);
  const unlocked = usePullover((s) => s.unlocked);
  const usedFreeNote = usePullover((s) => s.visits.some((visit) => !visit.sample));
  const [raw, setRaw] = useState("");
  const [clinic, setClinic] = useState("");
  const [canSpeak, setCanSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const recRef = useRef<Recognizer | null>(null);
  const baseRef = useRef("");

  useEffect(() => {
    setCanSpeak(createRecognizer() !== null);
    return () => recRef.current?.stop();
  }, []);

  function stop() {
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
  }

  function start() {
    const rec = createRecognizer();
    if (!rec) return;
    baseRef.current = raw.trim();
    rec.onresult = (event) => {
      let said = "";
      for (let i = 0; i < event.results.length; i++) said += event.results[i][0].transcript;
      const base = baseRef.current;
      const next = `${base}${base && said ? " " : ""}${said}`.replace(/\s+/g, " ");
      setRaw(next.slice(0, 4000));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
      setError("");
    } catch {
      setError("The mic didn't start. Type it instead.");
      setListening(false);
    }
  }

  function insert(line: string) {
    setRaw((prev) => {
      const body = prev.trim();
      return (body ? `${body}\n${line}` : line).slice(0, 4000);
    });
  }

  function save(note: { summary: string; changed: string; watch: string; next: string }) {
    const id = uid();
    addVisit({
      id,
      createdAt: Date.now(),
      raw: raw.trim(),
      clinic: clinic.trim(),
      sample: false,
      sentTo: [],
      ...note,
    });
    void navigate({ to: "/visits/$id", params: { id } });
  }

  async function shape() {
    const text = raw.trim();
    if (text.length < 8) {
      setError("Say a little more — meds, what to watch, or the next visit.");
      return;
    }
    stop();
    setBusy(true);
    setError("");
    try {
      const res = await shapeNote({ data: { raw: text, person: personName, clinic: clinic.trim() } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      save(res.note);
    } catch {
      setError("Couldn't reach the shaper. You can still save your words.");
    } finally {
      setBusy(false);
    }
  }

  function keepWords() {
    const text = raw.trim();
    if (text.length < 8) {
      setError("Add a few words first.");
      return;
    }
    stop();
    const line = text.replace(/\s+/g, " ");
    save({
      summary: line.length > 90 ? `${line.slice(0, 87).trim()}…` : line,
      changed: text,
      watch: "Nothing mentioned.",
      next: "Nothing mentioned.",
    });
  }

  const person = personName.trim() || "them";

  if (!unlocked && usedFreeNote) {
    return (
      <div className="flex min-h-dvh flex-col">
        <TopBar title={`For ${person}`} />
        <div className="bottom-half flex-1 bg-primary text-accent">
          <Column>
            <div className="scope-bg rounded-lg p-5 text-black">
              <h2 className="flex items-start gap-2 text-4xl font-extrabold leading-none">
                <ParamedicMark className="mt-1 size-8" />
                That was the free note
              </h2>
              <p className="mt-4 text-lg font-extrabold leading-relaxed">
                Another visit is $4.99 once. It stays on this phone.
              </p>
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

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar title={`For ${person}`} />
      <div className="bottom-half flex-1 bg-primary text-accent">
      <Column>
        <div className="scope-bg rounded-lg p-5 text-black">
        <p className="flex items-start gap-2 font-display text-4xl font-extrabold leading-none">
          <ParamedicMark className="mt-1 size-8" />
          What do you remember?
        </p>
        <p className="mt-3 text-lg font-extrabold leading-relaxed">
          Recap it in your own words. Pullover does not record the doctor — in a lot of states, including
          California, that needs their consent.
        </p>

        <div className="mt-6 flex items-center gap-4">
          {canSpeak ? (
            <button
              type="button"
              onClick={listening ? stop : start}
              className={`flex size-16 items-center justify-center rounded-full bg-primary text-primary-fg ${listening ? "mic-live" : ""}`}
              aria-pressed={listening}
              aria-label={listening ? "Stop dictation" : "Start dictation"}
            >
              {listening ? <Square className="size-5" /> : <Mic className="size-6" strokeWidth={1.75} />}
            </button>
          ) : null}
          <p className="text-lg font-extrabold leading-relaxed">
            {canSpeak
              ? listening
                ? "Listening. Talk like you're telling your sister."
                : "Tap the mic, or just type."
              : "Dictation isn't in this browser. Type the recap — it works the same."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {STARTERS.map(([label, line]) => (
            <button
              key={label}
              type="button"
              onClick={() => insert(line)}
              className="h-10 rounded-full bg-primary px-4 text-sm font-bold text-primary-fg"
            >
              {label}
            </button>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="sr-only">Recap</span>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value.slice(0, 4000))}
            rows={8}
            placeholder="They raised the blood pressure pill. Call if she's dizzy. Follow-up in six weeks."
            className="w-full resize-none rounded-lg bg-card px-4 py-4 text-base leading-relaxed shadow-card outline-none placeholder:text-muted"
          />
        </label>

        <label className="mt-4 block">
          <span className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-accent">
            <ParamedicMark />
            Where, if you remember
          </span>
          <input
            value={clinic}
            onChange={(e) => setClinic(e.target.value.slice(0, 80))}
            placeholder="Clinic or doctor"
            className="mt-2 h-12 w-full rounded-md border border-line bg-card px-4 text-base outline-none"
          />
        </label>

        {error && <p className="mt-4 text-sm leading-relaxed text-primary">{error}</p>}

        <button
          type="button"
          onClick={() => void shape()}
          disabled={busy}
          className="mt-5 flex h-14 w-full items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-fg disabled:opacity-60"
        >
          {busy ? "Shaping the note…" : "Shape the note"}
        </button>
        <button
          type="button"
          onClick={keepWords}
          disabled={busy}
          className="btn mt-2 w-full"
        >
          Save my words instead
        </button>
        </div>
      </Column>
      </div>
    </div>
  );
}
