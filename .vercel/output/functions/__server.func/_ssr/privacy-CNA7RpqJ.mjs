import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TopBar, r as Column } from "./router-BMWwwCUs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CNA7RpqJ.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: "Privacy",
			to: "/settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Column, {
			className: "space-y-5 text-base leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl leading-tight",
					children: "Notes stay on this phone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pullover keeps visit notes in this browser. There is no account. Closing the tab does not upload your list. Clearing the browser's site data deletes the notes." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you tap Shape the note, the recap you typed or dictated, plus the name and clinic you entered, is sent once to an AI service to arrange it into what changed, what to watch, and what's next. That text is not used to build a medical record here. If you tap Save my words instead, nothing is sent." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Copy and Share hand the note to whatever app you pick — a text thread, mail, or nothing. Pullover does not message your family on its own." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pullover does not record the appointment. You recap it afterward, in your own words. It is not medical advice, not a patient portal, and not for emergencies." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The app is not directed at children. Don't put someone else's full medical chart into it." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Last updated September 28, 2026."
				})
			]
		})]
	});
}
//#endregion
export { PrivacyPage as component };
