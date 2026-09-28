//#region node_modules/.nitro/vite/services/ssr/assets/utils-B4dTMZAd.js
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { uid as n, copyText as t };
