import { f as e, h as t } from "./rosMessageTypes-D0Ar3Pyn.js";
//#region src/features/layout/autoLayout/pickDefaultRawMessagesTopic.ts
function n(n, r) {
	let i = r?.excludeTopics, a = n.filter((e) => !i?.has(e.name)), o = a.find((t) => e(t.type));
	if (o) return o.name;
	let s = a.find((e) => !t(e.type));
	return s ? s.name : a[0]?.name ?? n[0]?.name ?? "";
}
//#endregion
export { n as t };
