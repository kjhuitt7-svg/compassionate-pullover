//#region node_modules/.nitro/vite/services/ssr/assets/note-DPNgmkPQ.js
function shareText(input) {
	return [
		input.clinic ? `${input.person} — ${input.clinic}` : input.person,
		input.summary.trim(),
		"",
		`What changed: ${input.changed.trim()}`,
		`Watch: ${input.watch.trim()}`,
		`Next: ${input.next.trim()}`,
		"",
		"From Pullover. Not medical advice."
	].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")).join("\n");
}
function cleanField(value, fallback) {
	return value.replace(/\s+/g, " ").trim() || fallback;
}
//#endregion
export { shareText as n, cleanField as t };
