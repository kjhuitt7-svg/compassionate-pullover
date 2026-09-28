import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as cleanField } from "./note-DPNgmkPQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shape-note-BJ-4oS3G.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function parseNote(text) {
	const start = text.indexOf("{");
	const end = text.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		const raw = JSON.parse(text.slice(start, end + 1));
		return {
			summary: cleanField(String(raw.summary ?? ""), "Recap saved"),
			changed: cleanField(String(raw.changed ?? ""), "Nothing mentioned."),
			watch: cleanField(String(raw.watch ?? ""), "Nothing mentioned."),
			next: cleanField(String(raw.next ?? ""), "Nothing mentioned.")
		};
	} catch {
		return null;
	}
}
var shapeNote_createServerFn_handler = createServerRpc({
	id: "5003af6a75f9f4819ae21932a60beab1fc46c9a1eba4311a4e441f24106f9066",
	name: "shapeNote",
	filename: "src/lib/shape-note.ts"
}, (opts) => shapeNote.__executeServer(opts));
var shapeNote = createServerFn({ method: "POST" }).validator((input) => input).handler(shapeNote_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Shaping is offline right now. You can still save your words."
	};
	const raw = data.raw.trim().slice(0, 4e3);
	if (raw.length < 8) return {
		ok: false,
		error: "Say a little more before shaping."
	};
	const person = data.person.trim().slice(0, 40) || "them";
	const clinic = data.clinic.trim().slice(0, 80);
	const system = [
		"You turn a caregiver's parking-lot recap into a short family note.",
		"Use only facts they stated. Never invent doses, dates, names, symptoms, or warnings.",
		"Do not diagnose, recommend treatment, or add advice.",
		"If a section has no facts, write exactly: Nothing mentioned.",
		"Plain sentences a sibling can read in one glance. No markdown, no emoji, no bullets.",
		"summary is one line under 90 characters.",
		"Return ONLY JSON with keys summary, changed, watch, next."
	].join(" ");
	const user = [
		`Person: ${person}`,
		clinic ? `Clinic: ${clinic}` : "",
		"Recap:",
		raw
	].filter(Boolean).join("\n");
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .2,
				max_tokens: 500,
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: "Couldn't shape that. Try again, or save your words."
		};
		const note = parseNote((await res.json()).choices?.[0]?.message?.content ?? "");
		if (!note) return {
			ok: false,
			error: "The note came back messy. Try again, or save your words."
		};
		if (note.summary.length > 110) note.summary = `${note.summary.slice(0, 107).trim()}…`;
		return {
			ok: true,
			note
		};
	} catch {
		return {
			ok: false,
			error: "Couldn't reach the shaper. You can still save your words."
		};
	}
});
//#endregion
export { shapeNote_createServerFn_handler };
