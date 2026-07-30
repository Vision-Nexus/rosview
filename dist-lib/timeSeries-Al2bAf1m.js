//#region src/core/analysis/timeSeries.ts
function e(e) {
	return e.sec + e.nsec / 1e9;
}
function t(e) {
	return BigInt(e.sec) * 1000000000n + BigInt(e.nsec);
}
function n(e) {
	if (!e || typeof e != "object") return;
	let t = e.header;
	if (!t || typeof t != "object") return;
	let n = t.stamp;
	if (!n || typeof n != "object") return;
	let r = n.sec, i = n.nsec ?? n.nanosec;
	if (typeof r == "number" && typeof i == "number") return {
		sec: r,
		nsec: i
	};
}
function r(t, n, r) {
	let i = e(t);
	if (!Number.isFinite(i)) return !1;
	let a = e(n), o = e(r), s = Math.max(o - a, 1) * .05;
	return i >= a - s && i <= o + s;
}
function i(e, t, n, i) {
	let a = s(e, t);
	return t !== "headerStamp" || a.source !== "headerStamp" || n == null || i == null || r(a.time, n, i) ? a : {
		time: e.receiveTime,
		source: "receiveTime",
		fallbackReason: "missingHeaderStamp"
	};
}
function a(e, t) {
	if (!e || typeof e != "object" || !t) return;
	let n = e;
	for (let e of t.split(".")) if (e) {
		if (typeof n != "object" || !n) return;
		n = n[e];
	}
	return n;
}
function o(e, t) {
	if (!t) return;
	let n = a(e, t);
	if (!n || typeof n != "object") return;
	let r = n, i = r.sec, o = r.nsec ?? r.nanosec;
	return typeof i == "number" && typeof o == "number" ? {
		sec: i,
		nsec: o
	} : void 0;
}
function s(e, t, r) {
	if (r && r.length > 0) {
		let t = o(e.message, r);
		return t ? {
			time: t,
			source: "customField"
		} : {
			time: e.receiveTime,
			source: "receiveTime",
			fallbackReason: "missingCustomPath"
		};
	}
	if (t === "headerStamp") {
		let t = n(e.message);
		return t ? {
			time: t,
			source: "headerStamp"
		} : {
			time: e.receiveTime,
			source: "receiveTime",
			fallbackReason: "missingHeaderStamp"
		};
	}
	return t === "publishTime" ? e.publishTime ? {
		time: e.publishTime,
		source: "publishTime"
	} : {
		time: e.receiveTime,
		source: "receiveTime",
		fallbackReason: "missingPublishTime"
	} : {
		time: e.receiveTime,
		source: "receiveTime"
	};
}
function c(e, t) {
	if (t <= 0 || e.length <= t) return e;
	let n = Math.max(1, Math.floor(t / 3)), r = Math.ceil(e.length / n), i = [];
	for (let t = 0; t < e.length; t += r) {
		let n = e.slice(t, t + r).filter((e) => e.y != null);
		if (n.length === 0) continue;
		let a = n[0], o = n[0];
		for (let e of n) (e.y ?? 0) < (a.y ?? 0) && (a = e), (e.y ?? 0) > (o.y ?? 0) && (o = e);
		let s = n[n.length - 1];
		for (let e of [
			a,
			o,
			s
		].sort((e, t) => e.x - t.x)) {
			let t = i[i.length - 1];
			(!t || t.x !== e.x || t.y !== e.y) && i.push(e);
		}
	}
	return i.length > t ? i.slice(i.length - t) : i;
}
//#endregion
export { t as a, i, n, e as o, s as r, c as t };
