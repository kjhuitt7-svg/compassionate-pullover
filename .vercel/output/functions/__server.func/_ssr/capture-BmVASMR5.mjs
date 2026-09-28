import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as Mic, n as Square } from "../_libs/lucide-react.mjs";
import { i as TopBar, o as usePullover, r as Column } from "./router-BMWwwCUs.mjs";
import { n as uid } from "./utils-B4dTMZAd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/capture-BmVASMR5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createRecognizer() {
	if (typeof window === "undefined") return null;
	const host = window;
	const Ctor = host.SpeechRecognition ?? host.webkitSpeechRecognition;
	if (!Ctor) return null;
	const rec = new Ctor();
	rec.lang = "en-US";
	rec.continuous = true;
	rec.interimResults = true;
	return rec;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var shapeNote = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("5003af6a75f9f4819ae21932a60beab1fc46c9a1eba4311a4e441f24106f9066"));
var STARTERS = [
	["Meds", "Meds: "],
	["Watch for", "Watch for: "],
	["Next visit", "Next visit: "]
];
function CapturePage() {
	const navigate = useNavigate();
	const personName = usePullover((s) => s.personName);
	const addVisit = usePullover((s) => s.addVisit);
	const [raw, setRaw] = (0, import_react.useState)("");
	const [clinic, setClinic] = (0, import_react.useState)("");
	const [canSpeak, setCanSpeak] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const recRef = (0, import_react.useRef)(null);
	const baseRef = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
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
			setRaw(next.slice(0, 4e3));
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
	function insert(line) {
		setRaw((prev) => {
			const body = prev.trim();
			return (body ? `${body}\n${line}` : line).slice(0, 4e3);
		});
	}
	function save(note) {
		const id = uid();
		addVisit({
			id,
			createdAt: Date.now(),
			raw: raw.trim(),
			clinic: clinic.trim(),
			sample: false,
			sentTo: [],
			...note
		});
		navigate({
			to: "/visits/$id",
			params: { id }
		});
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
			const res = await shapeNote({ data: {
				raw: text,
				person: personName,
				clinic: clinic.trim()
			} });
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
			next: "Nothing mentioned."
		});
	}
	const person = personName.trim() || "them";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: `For ${person}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Column, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl leading-tight",
				children: "What do you remember?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Recap it in your own words. Pullover does not record the doctor — in a lot of states, including California, that needs their consent."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-4",
				children: [canSpeak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: listening ? stop : start,
					className: `flex size-16 items-center justify-center rounded-full bg-primary text-primary-fg ${listening ? "mic-live" : ""}`,
					"aria-pressed": listening,
					"aria-label": listening ? "Stop dictation" : "Start dictation",
					children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
						className: "size-6",
						strokeWidth: 1.75
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: canSpeak ? listening ? "Listening. Talk like you're telling your sister." : "Tap the mic, or just type." : "Dictation isn't in this browser. Type the recap — it works the same."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: STARTERS.map(([label, line]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => insert(line),
					className: "h-10 rounded-full border border-line bg-card px-4 text-sm",
					children: label
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Recap"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: raw,
					onChange: (e) => setRaw(e.target.value.slice(0, 4e3)),
					rows: 8,
					placeholder: "They raised the blood pressure pill. Call if she's dizzy. Follow-up in six weeks.",
					className: "w-full resize-none rounded-lg bg-card px-4 py-4 text-base leading-relaxed shadow-card outline-none placeholder:text-muted"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium uppercase tracking-widest text-muted",
					children: "Where, if you remember"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: clinic,
					onChange: (e) => setClinic(e.target.value.slice(0, 80)),
					placeholder: "Clinic or doctor",
					className: "mt-2 h-12 w-full rounded-md border border-line bg-card px-4 text-base outline-none"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-primary",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void shape(),
				disabled: busy,
				className: "mt-5 flex h-14 w-full items-center justify-center rounded-md bg-primary text-lg font-medium text-primary-fg disabled:opacity-60",
				children: busy ? "Shaping the note…" : "Shape the note"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: keepWords,
				disabled: busy,
				className: "mt-2 flex h-12 w-full items-center justify-center rounded-md text-sm font-medium text-muted",
				children: "Save my words instead"
			})
		] })]
	});
}
//#endregion
export { CapturePage as component };
