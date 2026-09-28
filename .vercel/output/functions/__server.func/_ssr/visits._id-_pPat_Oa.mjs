import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as When, i as TopBar, n as Route, o as usePullover, r as Column } from "./router-BMWwwCUs.mjs";
import { t as copyText } from "./utils-B4dTMZAd.mjs";
import { n as shareText } from "./note-DPNgmkPQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visits._id-_pPat_Oa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VisitPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const personName = usePullover((s) => s.personName);
	const recipients = usePullover((s) => s.recipients);
	const visit = usePullover((s) => s.visits.find((item) => item.id === id));
	const updateVisit = usePullover((s) => s.updateVisit);
	const removeVisit = usePullover((s) => s.removeVisit);
	const markSent = usePullover((s) => s.markSent);
	const [canShare, setCanShare] = (0, import_react.useState)(false);
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
	}, []);
	if (!visit) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: "Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Column, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg",
			children: "That note is gone."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-flex h-11 items-center font-medium text-primary",
			children: "Back home"
		})] })]
	});
	const text = shareText({
		person: personName.trim() || "Update",
		clinic: visit.clinic,
		summary: visit.summary,
		changed: visit.changed,
		watch: visit.watch,
		next: visit.next
	});
	const sendTo = recipients[0] || "family";
	function patch(partial) {
		updateVisit(id, partial);
	}
	async function copy() {
		if (!await copyText(text)) {
			toast("Couldn't copy. Select the note and copy it yourself.");
			return;
		}
		markSent(id);
		toast(recipients.length ? `Copied for ${recipients.join(", ")}` : "Copied");
	}
	async function share() {
		if (!visit) return;
		try {
			await navigator.share({
				title: `${personName}: ${visit.summary}`,
				text
			});
			markSent(id);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { title: personName.trim() || "Note" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Column, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(When, {
						at: visit.createdAt,
						withTime: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: visit.clinic,
					onChange: (e) => patch({ clinic: e.target.value.slice(0, 80) }),
					placeholder: "Clinic or doctor",
					"aria-label": "Clinic or doctor",
					className: "mt-1 h-10 w-full bg-transparent text-sm text-muted outline-none placeholder:text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteField, {
							label: "In one line",
							value: visit.summary,
							onChange: (summary) => patch({ summary }),
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteField, {
							label: "What changed",
							value: visit.changed,
							onChange: (changed) => patch({ changed })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteField, {
							label: "Watch",
							value: visit.watch,
							onChange: (watch) => patch({ watch })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteField, {
							label: "Next",
							value: visit.next,
							onChange: (next) => patch({ next })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [visit.sentTo.length ? `Last sent to ${visit.sentTo.join(", ")}. ` : "", "Not medical advice. Call the office — or emergency services — if something feels wrong."]
				}),
				confirming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							removeVisit(id);
							navigate({ to: "/" });
						},
						className: "h-11 rounded-md bg-ink px-4 text-sm font-medium text-ink-fg",
						children: "Delete note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirming(false),
						className: "h-11 px-3 text-sm text-muted",
						children: "Keep it"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setConfirming(true),
					className: "mt-6 h-11 text-sm text-muted",
					children: "Delete this note"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 px-5 pt-3 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-xl gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(),
						className: "h-12 flex-1 rounded-md bg-primary font-medium text-primary-fg",
						children: ["Copy for ", sendTo]
					}), canShare && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void share(),
						className: "h-12 rounded-md border border-line bg-card px-4 font-medium",
						children: "Share"
					})]
				})
			})
		]
	});
}
function NoteField({ label, value, onChange, rows = 4 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium uppercase tracking-widest text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value.slice(0, 1200)),
			rows,
			className: "mt-2 w-full resize-none bg-transparent font-display text-2xl leading-snug outline-none"
		})]
	});
}
//#endregion
export { VisitPage as component };
