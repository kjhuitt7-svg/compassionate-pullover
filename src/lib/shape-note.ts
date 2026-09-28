import { createServerFn } from "@tanstack/react-start";
import { cleanField, type NoteFields } from "@/lib/note";

function parseNote(text: string): NoteFields | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const raw = JSON.parse(text.slice(start, end + 1)) as Partial<NoteFields>;
    return {
      summary: cleanField(String(raw.summary ?? ""), "Recap saved"),
      changed: cleanField(String(raw.changed ?? ""), "Nothing mentioned."),
      watch: cleanField(String(raw.watch ?? ""), "Nothing mentioned."),
      next: cleanField(String(raw.next ?? ""), "Nothing mentioned."),
    };
  } catch {
    return null;
  }
}

export const shapeNote = createServerFn({ method: "POST" })
  .validator((input: { raw: string; person: string; clinic: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; note: NoteFields } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Shaping is offline right now. You can still save your words." };

    const raw = data.raw.trim().slice(0, 4000);
    if (raw.length < 8) return { ok: false, error: "Say a little more before shaping." };

    const person = data.person.trim().slice(0, 40) || "them";
    const clinic = data.clinic.trim().slice(0, 80);

    const system = [
      "You turn a caregiver's parking-lot recap into a short family note.",
      "Use only facts they stated. Never invent doses, dates, names, symptoms, or warnings.",
      "Do not diagnose, recommend treatment, or add advice.",
      "If a section has no facts, write exactly: Nothing mentioned.",
      "Plain sentences a sibling can read in one glance. No markdown, no emoji, no bullets.",
      "summary is one line under 90 characters.",
      "Return ONLY JSON with keys summary, changed, watch, next.",
    ].join(" ");

    const user = [`Person: ${person}`, clinic ? `Clinic: ${clinic}` : "", "Recap:", raw]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.2,
          max_tokens: 500,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      if (!res.ok) return { ok: false, error: "Couldn't shape that. Try again, or save your words." };

      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content ?? "";
      const note = parseNote(text);
      if (!note) return { ok: false, error: "The note came back messy. Try again, or save your words." };
      if (note.summary.length > 110) note.summary = `${note.summary.slice(0, 107).trim()}…`;
      return { ok: true, note };
    } catch {
      return { ok: false, error: "Couldn't reach the shaper. You can still save your words." };
    }
  });
