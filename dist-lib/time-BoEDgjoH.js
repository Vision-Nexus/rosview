//#region src/shared/utils/time.ts
function e(e) {
	return {
		sec: Number(e / 1000000000n),
		nsec: Number(e % 1000000000n)
	};
}
function t(e) {
	return BigInt(e.sec) * 1000000000n + BigInt(e.nsec);
}
function n(e, t) {
	let n = e.nsec + Math.round(t * 1e6), r = e.sec;
	for (; n >= 1e9;) r += 1, n -= 1e9;
	return {
		sec: r,
		nsec: n
	};
}
function r(e) {
	if (!e) return "--";
	let t = new Date(e.sec * 1e3 + Math.floor(e.nsec / 1e6));
	return `${new Intl.DateTimeFormat(void 0, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(t)} ${new Intl.DateTimeFormat(void 0, {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: !1
	}).format(t)}.${Math.floor(e.nsec / 1e6).toString().padStart(3, "0")}`;
}
function i(e) {
	let t = e;
	t < 0n && (t = 0n);
	let n = Number(t / 1000000n), r = n % 1e3, i = Math.floor(n / 1e3), a = i % 60, o = Math.floor(i / 60), s = o % 60, c = Math.floor(o / 60), l = s.toString().padStart(2, "0"), u = a.toString().padStart(2, "0"), d = r.toString().padStart(3, "0");
	return c > 0 ? `${c}:${l}:${u}.${d}` : `${l}:${u}.${d}`;
}
function a(e, n) {
	if (!e || !n) return "00:00.000";
	let r = t(e) - t(n);
	return r < 0n && (r = 0n), i(r);
}
//#endregion
export { e as a, a as i, i as n, t as o, r, n as t };
