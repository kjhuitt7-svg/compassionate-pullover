import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Settings } from "../_libs/lucide-react.mjs";
import { a as When, o as usePullover } from "./router-BMWwwCUs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-j1xPhZBh.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const personName = usePullover((s) => s.personName);
	const recipients = usePullover((s) => s.recipients);
	const visits = usePullover((s) => s.visits);
	const latest = visits[0];
	const earlier = visits.slice(1);
	const who = recipients.length ? recipients.join(", ") : "no one yet";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-ink text-ink-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl px-5 pb-8 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-fg/70",
							children: "On the drive home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/settings",
							"aria-label": "Settings",
							className: "flex size-11 items-center justify-center rounded-md text-ink-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
								className: "size-5",
								strokeWidth: 1.75
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-5xl italic leading-none",
						children: "Pullover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-sm text-base leading-relaxed text-ink-fg/80",
						children: [
							"For ",
							personName || "them",
							". Say what you remember, then send ",
							who,
							" the three things that matter."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/capture",
						className: "mt-6 flex h-14 items-center justify-center rounded-md bg-primary text-lg font-medium text-primary-fg",
						children: "Just walked out"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-6",
			children: [latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Latest, { visit: latest }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg bg-card px-5 py-8 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "No notes yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Next time you leave the office, pull over and talk through what they said. The note stays on this phone."
				})]
			}), earlier.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium uppercase tracking-widest text-muted",
				children: "Earlier"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-line",
				children: earlier.map((visit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/visits/$id",
					params: { id: visit.id },
					className: "block py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(When, { at: visit.createdAt })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg leading-snug",
						children: visit.summary
					})]
				}) }, visit.id))
			})] })]
		})]
	});
}
function Latest({ visit }) {
	const rows = [
		["What changed", visit.changed],
		["Watch", visit.watch],
		["Next", visit.next]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg bg-card p-5 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(When, {
						at: visit.createdAt,
						withTime: true
					}), visit.clinic ? ` · ${visit.clinic}` : ""]
				}), visit.sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-sm bg-paper px-2 py-1 text-xs font-medium text-muted",
					children: "Example"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-2xl leading-snug",
				children: visit.summary
			}),
			visit.sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "An example, so you can see the shape. Yours starts with Just walked out."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-5 space-y-4",
				children: rows.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs font-medium uppercase tracking-widest text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-base leading-relaxed",
					children: value
				})] }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: visit.sentTo.length ? `Sent to ${visit.sentTo.join(", ")}` : "Not sent yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/visits/$id",
					params: { id: visit.id },
					className: "inline-flex h-11 items-center font-medium text-primary",
					children: "Edit or send"
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
