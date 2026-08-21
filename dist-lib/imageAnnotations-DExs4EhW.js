import { g as e } from "./rosMessageTypes-Di-HH75w.js";
//#region src/features/panels/Image/core/imageTypes.ts
function t(e, t = {}) {
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
function n(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function r(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function i(e) {
	return n(e) || r(e);
}
function a(e) {
	return e.format;
}
function o(e) {
	return i(e) ? h(a(e)) === "h264" : !1;
}
function s(e) {
	return !!(e && typeof e == "object" && "encoding" in e && "width" in e && "height" in e && "data" in e && e.data instanceof Uint8Array);
}
var c = /\b(jpeg|jpg|png|webp|gif|avif|bmp|h264)\b/i;
function l(e) {
	return e.trim().toLowerCase();
}
function u(e) {
	let t = l(e);
	return t === "16uc1" || t === "mono16" ? "16uc1" : t === "32fc1" ? "32fc1" : null;
}
function d(e) {
	let t = e.trim().toLowerCase();
	if (t.includes("compresseddepth")) return /\brvl\b/.test(t) ? "rvl" : "png";
}
function f(e) {
	let t = e.trim(), n = t.split(";").map((e) => e.trim()).filter(Boolean), r = n[0] ? l(n[0]) : void 0, i = n.length > 1 ? n.slice(1).join(";").trim() : void 0;
	return {
		rawEncoding: r,
		transport: i,
		depthCodec: i ? d(i) : void 0,
		bitmapKind: h(t)
	};
}
function p(e) {
	let t = f(e);
	return t.depthCodec != null && u(t.rawEncoding ?? "") != null;
}
function m(e) {
	return p(e) ? u(f(e).rawEncoding ?? "") : null;
}
function h(e) {
	let t = e.trim().toLowerCase();
	if (t === "h264" || t.includes("h264")) return "h264";
	let n = e.match(c);
	if (!n || !n[1]) return null;
	let r = n[1].toLowerCase();
	return r === "jpg" || r === "jpeg" ? "jpeg" : r === "png" || r === "webp" || r === "gif" || r === "avif" || r === "bmp" ? r : r === "h264" ? "h264" : null;
}
function g(e) {
	let t = e.trim();
	if (!t) return !1;
	let n = t.toLowerCase();
	return n.includes("compressedimage") || n.includes("compressedvideo") ? !1 : /(^|\/)sensor_msgs\/(msg\/)?image$/i.test(t);
}
var _ = [
	"image",
	"CompressedImage",
	"CompressedVideo"
];
function v(t) {
	let n = t.trim();
	return n ? e(n, "foxglove_msgs/msg/CompressedVideo") ? !0 : n.toLowerCase().includes("compressedvideo") : !1;
}
var y = 1e4, b = /depth|aligned_depth|compressed_depth/i, x = /wrist|hand|left|right|gripper|eef|end_effector/;
function S(e) {
	return e.trim().toLowerCase();
}
function C(e) {
	let t = S(e);
	return t === "16uc1" || t === "mono16";
}
function w(e) {
	return S(e) === "32fc1";
}
function T(e) {
	return b.test(e);
}
function E(e) {
	let t = e.trim().toLowerCase();
	if (!t) return null;
	let n = T(t), r = !n && x.test(t), i = {
		colorMode: "colormap",
		colorMap: "turbo"
	};
	return n ? {
		...i,
		minValue: 200,
		maxValue: y
	} : r ? {
		...i,
		minValue: 0,
		maxValue: 1e3
	} : null;
}
function D(e, t) {
	let n = t ? E(t) : null;
	return n ? n.minValue : C(e) ? 200 : 0;
}
function O(e, t) {
	let n = t ? E(t) : null;
	return n ? n.maxValue : w(e) ? 1 : C(e) ? y : 65535;
}
function k(e, t) {
	let n = E(e);
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
var A = {
	1: "points",
	POINTS: "points",
	2: "line-loop",
	LINE_LOOP: "line-loop",
	3: "line-strip",
	LINE_STRIP: "line-strip",
	4: "line-list",
	LINE_LIST: "line-list"
};
function j(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("imageannotations");
}
function M(e) {
	if (!B(e) || !Array.isArray(e.points)) return null;
	let t = e.points.map(N).filter(H), n = P(e.timestamp) ?? F(e.points);
	return n === void 0 ? null : {
		timestampNs: n,
		points: t
	};
}
function N(e) {
	if (!B(e) || !Array.isArray(e.points)) return null;
	let t = A[String(e.type)];
	if (!t) return null;
	let n = e.points.map(I).filter(H), r = L(e.outline_color ?? e.outlineColor) ?? {
		r: 1,
		g: 1,
		b: 1,
		a: 1
	}, i = L(e.fill_color ?? e.fillColor) ?? r, a = e.outline_colors ?? e.outlineColors;
	return {
		kind: t,
		points: n,
		outlineColor: r,
		outlineColors: Array.isArray(a) ? a.map(L).filter(H) : [],
		fillColor: i,
		thickness: Math.max(1, R(e, ["thickness"]) ?? 1)
	};
}
function P(e) {
	if (!B(e)) return;
	let t = z(e.sec ?? e.seconds), n = z(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function F(e) {
	for (let t of e) {
		if (!B(t)) continue;
		let e = P(t.timestamp);
		if (e !== void 0) return e;
	}
}
function I(e) {
	return !B(e) || !V(e.x) || !V(e.y) ? null : {
		x: e.x,
		y: e.y
	};
}
function L(e) {
	return !B(e) || !V(e.r) || !V(e.g) || !V(e.b) || !V(e.a) ? null : {
		r: e.r,
		g: e.g,
		b: e.b,
		a: e.a
	};
}
function R(e, t) {
	for (let n of t) if (V(e[n])) return e[n];
}
function z(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function B(e) {
	return typeof e == "object" && !!e;
}
function V(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function H(e) {
	return e !== null;
}
//#endregion
export { D as a, a as c, o as d, s as f, v as h, O as i, i as l, t as m, M as n, _ as o, g as p, k as r, m as s, j as t, n as u };
