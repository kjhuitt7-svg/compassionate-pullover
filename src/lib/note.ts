export type NoteFields = {
  summary: string;
  changed: string;
  watch: string;
  next: string;
};

export const EMPTY_NOTE: NoteFields = {
  summary: "",
  changed: "",
  watch: "",
  next: "",
};

export function shareText(input: {
  person: string;
  clinic: string;
  summary: string;
  changed: string;
  watch: string;
  next: string;
}) {
  const who = input.clinic ? `${input.person} — ${input.clinic}` : input.person;
  return [
    who,
    input.summary.trim(),
    "",
    `What changed: ${input.changed.trim()}`,
    `Watch: ${input.watch.trim()}`,
    `Next: ${input.next.trim()}`,
    "",
    "From Pullover. Not medical advice.",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

export function cleanField(value: string, fallback: string) {
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed || fallback;
}
