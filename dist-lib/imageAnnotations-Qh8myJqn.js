//#region src/features/panels/Image/core/imageTypes.ts
function e(e, t = {}) {
	if (!(e instanceof Uint8Array)) return null;
	if (t.transferOwnership === !0 && e.buffer instanceof ArrayBuffer && e.byteOffset === 0 && e.byteLength === e.buffer.byteLength) return {
		data: e,
		transfer: [e.buffer]
	};
	let n = new Uint8Array(e.byteLength);
	return n.set(e), {
		data: n,
		transfer: [n.buffer]
	};
}
function t(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function n(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function r(e) {
	return t(e) || n(e);
}
function i(e) {
	return e.format;
}
function a(e) {
	return r(e) ? m(i(e)) === "h264" : !1;
}
function o(e) {
	return !!(e && typeof e == "object" && "encoding" in e && "width" in e && "height" in e && "data" in e && e.data instanceof Uint8Array);
}
var s = /\b(jpeg|jpg|png|webp|gif|avif|bmp|h264)\b/i;
function c(e) {
	return e.trim().toLowerCase();
}
function l(e) {
	let t = c(e);
	return t === "16uc1" || t === "mono16" ? "16uc1" : t === "32fc1" ? "32fc1" : null;
}
function u(e) {
	let t = e.trim().toLowerCase();
	if (t.includes("compresseddepth")) return /\brvl\b/.test(t) ? "rvl" : "png";
}
function d(e) {
	let t = e.trim(), n = t.split(";").map((e) => e.trim()).filter(Boolean), r = n[0] ? c(n[0]) : void 0, i = n.length > 1 ? n.slice(1).join(";").trim() : void 0;
	return {
		rawEncoding: r,
		transport: i,
		depthCodec: i ? u(i) : void 0,
		bitmapKind: m(t)
	};
}
function f(e) {
	let t = d(e);
	return t.depthCodec != null && l(t.rawEncoding ?? "") != null;
}
function p(e) {
	return f(e) ? l(d(e).rawEncoding ?? "") : null;
}
function m(e) {
	let t = e.trim().toLowerCase();
	if (t === "h264" || t.includes("h264")) return "h264";
	let n = e.match(s);
	if (!n || !n[1]) return null;
	let r = n[1].toLowerCase();
	return r === "jpg" || r === "jpeg" ? "jpeg" : r === "png" || r === "webp" || r === "gif" || r === "avif" || r === "bmp" ? r : r === "h264" ? "h264" : null;
}
function h(e) {
	let t = e.trim();
	if (!t) return !1;
	let n = t.toLowerCase();
	return n.includes("compressedimage") || n.includes("compressedvideo") ? !1 : /(^|\/)sensor_msgs\/(msg\/)?image$/i.test(t);
}
var g = [
	"image",
	"CompressedImage",
	"CompressedVideo"
], _ = 1e4, v = /depth|aligned_depth|compressed_depth/i, y = /wrist|hand|left|right|gripper|eef|end_effector/;
function b(e) {
	return e.trim().toLowerCase();
}
function x(e) {
	let t = b(e);
	return t === "16uc1" || t === "mono16";
}
function S(e) {
	return b(e) === "32fc1";
}
function C(e) {
	return v.test(e);
}
function w(e) {
	let t = e.trim().toLowerCase();
	if (!t) return null;
	let n = C(t), r = !n && y.test(t), i = {
		colorMode: "colormap",
		colorMap: "turbo"
	};
	return n ? {
		...i,
		minValue: 200,
		maxValue: _
	} : r ? {
		...i,
		minValue: 0,
		maxValue: 1e3
	} : null;
}
function T(e, t) {
	let n = t ? w(t) : null;
	return n ? n.minValue : x(e) ? 200 : 0;
}
function E(e, t) {
	let n = t ? w(t) : null;
	return n ? n.maxValue : S(e) ? 1 : x(e) ? _ : 65535;
}
function D(e, t) {
	let n = w(e);
	return n ? {
		...t,
		topic: e,
		colorMode: n.colorMode,
		colorMap: n.colorMap,
		minValue: n.minValue,
		maxValue: n.maxValue
	} : {
		...t,
		topic: e
	};
}
//#endregion
//#region src/features/panels/Image/core/imageAnnotations.ts
var O = {
	1: "points",
	POINTS: "points",
	2: "line-loop",
	LINE_LOOP: "line-loop",
	3: "line-strip",
	LINE_STRIP: "line-strip",
	4: "line-list",
	LINE_LIST: "line-list"
};
function k(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("imageannotations");
}
function A(e) {
	if (!R(e) || !Array.isArray(e.points)) return null;
	let t = e.points.map(j).filter(B), n = M(e.timestamp) ?? N(e.points);
	return n === void 0 ? null : {
		timestampNs: n,
		points: t
	};
}
function j(e) {
	if (!R(e) || !Array.isArray(e.points)) return null;
	let t = O[String(e.type)];
	if (!t) return null;
	let n = e.points.map(P).filter(B), r = F(e.outline_color ?? e.outlineColor) ?? {
		r: 1,
		g: 1,
		b: 1,
		a: 1
	}, i = F(e.fill_color ?? e.fillColor) ?? r, a = e.outline_colors ?? e.outlineColors;
	return {
		kind: t,
		points: n,
		outlineColor: r,
		outlineColors: Array.isArray(a) ? a.map(F).filter(B) : [],
		fillColor: i,
		thickness: Math.max(1, I(e, ["thickness"]) ?? 1)
	};
}
function M(e) {
	if (!R(e)) return;
	let t = L(e.sec ?? e.seconds), n = L(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function N(e) {
	for (let t of e) {
		if (!R(t)) continue;
		let e = M(t.timestamp);
		if (e !== void 0) return e;
	}
}
function P(e) {
	return !R(e) || !z(e.x) || !z(e.y) ? null : {
		x: e.x,
		y: e.y
	};
}
function F(e) {
	return !R(e) || !z(e.r) || !z(e.g) || !z(e.b) || !z(e.a) ? null : {
		r: e.r,
		g: e.g,
		b: e.b,
		a: e.a
	};
}
function I(e, t) {
	for (let n of t) if (z(e[n])) return e[n];
}
function L(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function R(e) {
	return typeof e == "object" && !!e;
}
function z(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function B(e) {
	return e !== null;
}
//#endregion
export { T as a, i as c, a as d, o as f, E as i, r as l, e as m, A as n, g as o, h as p, D as r, p as s, k as t, t as u };
