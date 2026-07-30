import e from "react";
//#region node_modules/.pnpm/zustand@5.0.14_@types+react@19.2.17_react@19.2.8_use-sync-external-store@1.6.0_react@19.2.8_/node_modules/zustand/esm/vanilla/shallow.mjs
var t = (e) => Symbol.iterator in e, n = (e) => "entries" in e, r = (e, t) => {
	let n = e instanceof Map ? e : new Map(e.entries()), r = t instanceof Map ? t : new Map(t.entries());
	if (n.size !== r.size) return !1;
	for (let [e, t] of n) if (!r.has(e) || !Object.is(t, r.get(e))) return !1;
	return !0;
}, i = (e, t) => {
	let n = e[Symbol.iterator](), r = t[Symbol.iterator](), i = n.next(), a = r.next();
	for (; !i.done && !a.done;) {
		if (!Object.is(i.value, a.value)) return !1;
		i = n.next(), a = r.next();
	}
	return !!i.done && !!a.done;
};
function a(e, a) {
	return Object.is(e, a) ? !0 : typeof e != "object" || !e || typeof a != "object" || !a || Object.getPrototypeOf(e) !== Object.getPrototypeOf(a) ? !1 : t(e) && t(a) ? n(e) && n(a) ? r(e, a) : i(e, a) : r({ entries: () => Object.entries(e) }, { entries: () => Object.entries(a) });
}
//#endregion
//#region node_modules/.pnpm/zustand@5.0.14_@types+react@19.2.17_react@19.2.8_use-sync-external-store@1.6.0_react@19.2.8_/node_modules/zustand/esm/react/shallow.mjs
function o(t) {
	let n = e.useRef(void 0);
	return (e) => {
		let r = t(e);
		return a(n.current, r) ? n.current : n.current = r;
	};
}
//#endregion
export { o as t };
