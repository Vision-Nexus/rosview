import { g as e } from "./rosMessageTypes-Di-HH75w.js";
//#region src/features/panels/Image/core/annexB.ts
function t(e) {
	let t = [], i = 0;
	for (; i < e.byteLength - 2;) {
		let n = r(e, i);
		if (n < 0) break;
		let a = n + (e[n + 2] === 1 ? 3 : 4);
		a < e.byteLength && t.push(a), i = a + 1;
	}
	return t.length === 0 ? e.byteLength > 0 ? [{
		offset: 0,
		end: e.byteLength
	}] : [] : t.map((r, i) => ({
		offset: r,
		end: i + 1 < t.length ? n(e, t[i + 1]) : e.byteLength
	}));
}
function n(e, t) {
	return t >= 4 && e[t - 4] === 0 && e[t - 3] === 0 && e[t - 2] === 0 && e[t - 1] === 1 ? t - 4 : t - 3;
}
function r(e, t) {
	for (let n = t; n < e.byteLength - 2; n += 1) if (e[n] === 0 && e[n + 1] === 0 && (e[n + 2] === 1 || n + 3 < e.byteLength && e[n + 2] === 0 && e[n + 3] === 1)) return n;
	return -1;
}
//#endregion
//#region src/features/panels/Image/core/h264.ts
function i(e) {
	return a(e).includes(5);
}
function a(e) {
	return t(e).map(({ offset: t }) => e[t] & 31);
}
//#endregion
//#region src/features/panels/Image/core/h265.ts
var ee = 32, o = 33, s = 34;
function c(e) {
	return t(e).flatMap(({ offset: t }) => t + 1 < e.byteLength ? [e[t] >> 1 & 63] : []);
}
function te(e) {
	return c(e).some((e) => e === 19 || e === 20 || e === 21);
}
function ne(e) {
	return c(e).some((e) => e === ee || e === o || e === s);
}
function re(e) {
	return c(e).some((e) => e <= 31);
}
//#endregion
//#region src/features/panels/Image/core/videoCodec.ts
function l(e) {
	let t = e.trim().toLowerCase();
	return /\b(?:h264|avc)\b/.test(t) ? "h264" : /\b(?:h265|hevc)\b/.test(t) ? "h265" : null;
}
function u(e, t) {
	return e === "h264" ? a(t) : c(t);
}
function d(e, t) {
	return e === "h264" ? i(t) : te(t);
}
function f(e, t) {
	return e === "h264" ? a(t).some((e) => e === 7 || e === 8) : ne(t);
}
function p(e, t) {
	return e === "h264" ? a(t).some((e) => e === 1 || e === 5) : re(t);
}
function m(e, t) {
	let n = u(e, t);
	return e === "h264" ? n.includes(7) : n.includes(32) || n.includes(33);
}
function ie(e, t) {
	return f(e, t) && !p(e, t);
}
//#endregion
//#region src/features/panels/Image/core/imageTypes.ts
function h(e, t = {}) {
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
function g(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function ae(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function _(e) {
	return g(e) || ae(e);
}
function v(e) {
	return e.format;
}
function y(e) {
	return !!(e && typeof e == "object" && "encoding" in e && "width" in e && "height" in e && "data" in e && e.data instanceof Uint8Array);
}
var b = /\b(jpeg|jpg|png|webp|gif|avif|bmp)\b/i;
function x(e) {
	return e.trim().toLowerCase();
}
function S(e) {
	let t = x(e);
	return t === "16uc1" || t === "mono16" ? "16uc1" : t === "32fc1" ? "32fc1" : null;
}
function C(e) {
	let t = e.trim().toLowerCase();
	if (t.includes("compresseddepth")) return /\brvl\b/.test(t) ? "rvl" : "png";
}
function w(e) {
	let t = e.trim(), n = t.split(";").map((e) => e.trim()).filter(Boolean), r = n[0] ? x(n[0]) : void 0, i = n.length > 1 ? n.slice(1).join(";").trim() : void 0;
	return {
		rawEncoding: r,
		transport: i,
		depthCodec: i ? C(i) : void 0,
		bitmapKind: D(t)
	};
}
function T(e) {
	let t = w(e);
	return t.depthCodec != null && S(t.rawEncoding ?? "") != null;
}
function E(e) {
	return T(e) ? S(w(e).rawEncoding ?? "") : null;
}
function D(e) {
	let t = l(e);
	if (t) return t;
	let n = e.match(b);
	if (!n || !n[1]) return null;
	let r = n[1].toLowerCase();
	return r === "jpg" || r === "jpeg" ? "jpeg" : r === "png" || r === "webp" || r === "gif" || r === "avif" || r === "bmp" ? r : null;
}
function O(e) {
	let t = e.trim();
	if (!t) return !1;
	let n = t.toLowerCase();
	return n.includes("compressedimage") || n.includes("compressedvideo") ? !1 : /(^|\/)sensor_msgs\/(msg\/)?image$/i.test(t);
}
var k = [
	"image",
	"CompressedImage",
	"CompressedVideo"
];
function A(t) {
	let n = t.trim();
	return n ? e(n, "foxglove_msgs/msg/CompressedVideo") ? !0 : n.toLowerCase().includes("compressedvideo") : !1;
}
var j = 1e4, M = /depth|aligned_depth|compressed_depth/i, N = /wrist|hand|left|right|gripper|eef|end_effector/;
function P(e) {
	return e.trim().toLowerCase();
}
function F(e) {
	let t = P(e);
	return t === "16uc1" || t === "mono16";
}
function I(e) {
	return P(e) === "32fc1";
}
function L(e) {
	return M.test(e);
}
function R(e) {
	let t = e.trim().toLowerCase();
	if (!t) return null;
	let n = L(t), r = !n && N.test(t), i = {
		colorMode: "colormap",
		colorMap: "turbo"
	};
	return n ? {
		...i,
		minValue: 200,
		maxValue: j
	} : r ? {
		...i,
		minValue: 0,
		maxValue: 1e3
	} : null;
}
function z(e, t) {
	let n = t ? R(t) : null;
	return n ? n.minValue : F(e) ? 200 : 0;
}
function B(e, t) {
	let n = t ? R(t) : null;
	return n ? n.maxValue : I(e) ? 1 : F(e) ? j : 65535;
}
function V(e, t) {
	let n = R(e);
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
var H = {
	1: "points",
	POINTS: "points",
	2: "line-loop",
	LINE_LOOP: "line-loop",
	3: "line-strip",
	LINE_STRIP: "line-strip",
	4: "line-list",
	LINE_LIST: "line-list"
};
function U(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("imageannotations");
}
function W(e, t) {
	if (!Z(e) || !Array.isArray(e.points)) return null;
	let n = e.points.map(G).filter($), r = K(e.timestamp) ?? q(e.points) ?? (e.points.length === 0 ? t : void 0);
	return r === void 0 ? null : {
		timestampNs: r,
		points: n
	};
}
function G(e) {
	if (!Z(e) || !Array.isArray(e.points)) return null;
	let t = H[String(e.type)];
	if (!t) return null;
	let n = e.points.map(J).filter($), r = Y(e.outline_color ?? e.outlineColor) ?? {
		r: 1,
		g: 1,
		b: 1,
		a: 1
	}, i = Y(e.fill_color ?? e.fillColor) ?? r, a = e.outline_colors ?? e.outlineColors;
	return {
		kind: t,
		points: n,
		outlineColor: r,
		outlineColors: Array.isArray(a) ? a.map(Y).filter($) : [],
		fillColor: i,
		thickness: Math.max(1, oe(e, ["thickness"]) ?? 1)
	};
}
function K(e) {
	if (!Z(e)) return;
	let t = X(e.sec ?? e.seconds), n = X(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function q(e) {
	for (let t of e) {
		if (!Z(t)) continue;
		let e = K(t.timestamp);
		if (e !== void 0) return e;
	}
}
function J(e) {
	return !Z(e) || !Q(e.x) || !Q(e.y) ? null : {
		x: e.x,
		y: e.y
	};
}
function Y(e) {
	return !Z(e) || !Q(e.r) || !Q(e.g) || !Q(e.b) || !Q(e.a) ? null : {
		r: e.r,
		g: e.g,
		b: e.b,
		a: e.a
	};
}
function oe(e, t) {
	for (let n of t) if (Q(e[n])) return e[n];
}
function X(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function Z(e) {
	return typeof e == "object" && !!e;
}
function Q(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function $(e) {
	return e !== null;
}
//#endregion
export { u as _, z as a, v as c, y as d, O as f, ie as g, d as h, B as i, _ as l, A as m, W as n, k as o, h as p, V as r, E as s, U as t, g as u, l as v, m as y };
