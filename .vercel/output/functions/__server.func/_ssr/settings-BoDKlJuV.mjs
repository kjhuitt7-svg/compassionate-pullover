import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TopBar, o as usePullover, r as Column } from "./router-BMWwwCUs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BoDKlJuV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const personName = usePullover((s) => s.personName);
	const recipients = usePullover((s) => s.recipients);
	const setPersonName = usePullover((s) => s.setPersonName);
	const addRecipient = usePullover((s) => s.addRecipient);
	const removeRecipient = usePullover((s) => s.removeRecipient);
	const [draft, setDraft] = (0, import_react.useState)("");
	function add() {
		addRecipient(draft);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Column, {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-widest text-muted",
						children: "Who you take"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: personName,
						onChange: (e) => setPersonName(e.target.value),
						className: "mt-2 h-12 w-full rounded-md border border-line bg-card px-4 text-base outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium uppercase tracking-widest text-muted",
						children: "Who gets the note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: recipients.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => removeRecipient(name),
							className: "h-10 rounded-full border border-line bg-card px-4 text-sm",
							children: [
								name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: ", remove"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: " ×"
								})
							]
						}) }, name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									add();
								}
							},
							placeholder: "Add a name",
							className: "h-12 flex-1 rounded-md border border-line bg-card px-4 text-base outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: add,
							className: "h-12 rounded-md bg-ink px-4 text-sm font-medium text-ink-fg",
							children: "Add"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Copy and Share use these names. Nothing is sent until you do."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium uppercase tracking-widest text-muted",
						children: "On your phone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base leading-relaxed",
						children: "iPhone: tap Share, then Add to Home Screen. Android: open the browser menu and choose Install app."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "mt-3 inline-flex h-11 items-center font-medium text-primary",
						children: "Privacy"
					})
				] })
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
