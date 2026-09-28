type SpeechResult = { isFinal: boolean; 0: { transcript: string }; length: number };
type SpeechEvent = { resultIndex: number; results: ArrayLike<SpeechResult> };

export type Recognizer = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechCtor = new () => Recognizer;

export function createRecognizer(): Recognizer | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & {
    SpeechRecognition?: SpeechCtor;
    webkitSpeechRecognition?: SpeechCtor;
  };
  const Ctor = host.SpeechRecognition ?? host.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = true;
  return rec;
}
