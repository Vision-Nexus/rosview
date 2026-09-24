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
var o = 32, s = 33, c = 34;
function l(e) {
	return t(e).flatMap(({ offset: t }) => t + 1 < e.byteLength ? [e[t] >> 1 & 63] : []);
}
function u(e) {
	return l(e).some((e) => e === 19 || e === 20 || e === 21);
}
function ee(e) {
	return l(e).some((e) => e === o || e === s || e === c);
}
function d(e) {
	return l(e).some((e) => e <= 31);
}
//#endregion
//#region src/features/panels/Image/core/videoCodec.ts
function f(e) {
	let t = e.trim().toLowerCase();
	return /\b(?:h264|avc)\b/.test(t) ? "h264" : /\b(?:h265|hevc)\b/.test(t) ? "h265" : null;
}
function p(e, t) {
	return e === "h264" ? a(t) : l(t);
}
function m(e, t) {
	return e === "h264" ? i(t) : u(t);
}
function h(e, t) {
	return e === "h264" ? a(t).some((e) => e === 7 || e === 8) : ee(t);
}
function g(e, t) {
	return e === "h264" ? a(t).some((e) => e === 1 || e === 5) : d(t);
}
function _(e, t) {
	let n = p(e, t);
	return e === "h264" ? n.includes(7) : n.includes(32) || n.includes(33);
}
function v(e, t) {
	return h(e, t) && !g(e, t);
}
//#endregion
//#region src/features/panels/Image/core/imageTypes.ts
function te(e, t = {}) {
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
function y(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function ne(e) {
	return !!(e && typeof e == "object" && "format" in e && "data" in e && e.data instanceof Uint8Array);
}
function re(e) {
	return y(e) || ne(e);
}
function ie(e) {
	return e.format;
}
function ae(e) {
	return !!(e && typeof e == "object" && "encoding" in e && "width" in e && "height" in e && "data" in e && e.data instanceof Uint8Array);
}
var oe = /\b(jpeg|jpg|png|webp|gif|avif|bmp)\b/i;
function b(e) {
	return e.trim().toLowerCase();
}
function x(e) {
	let t = b(e);
	return t === "16uc1" || t === "mono16" ? "16uc1" : t === "32fc1" ? "32fc1" : null;
}
function S(e) {
	let t = e.trim().toLowerCase();
	if (t.includes("compresseddepth")) return /\brvl\b/.test(t) ? "rvl" : "png";
}
function C(e) {
	let t = e.trim(), n = t.split(";").map((e) => e.trim()).filter(Boolean), r = n[0] ? b(n[0]) : void 0, i = n.length > 1 ? n.slice(1).join(";").trim() : void 0;
	return {
		rawEncoding: r,
		transport: i,
		depthCodec: i ? S(i) : void 0,
		bitmapKind: E(t)
	};
}
function w(e) {
	let t = C(e);
	return t.depthCodec != null && x(t.rawEncoding ?? "") != null;
}
function T(e) {
	return w(e) ? x(C(e).rawEncoding ?? "") : null;
}
function E(e) {
	let t = f(e);
	if (t) return t;
	let n = e.match(oe);
	if (!n || !n[1]) return null;
	let r = n[1].toLowerCase();
	return r === "jpg" || r === "jpeg" ? "jpeg" : r === "png" || r === "webp" || r === "gif" || r === "avif" || r === "bmp" ? r : null;
}
function D(e) {
	let t = e.trim();
	if (!t) return !1;
	let n = t.toLowerCase();
	return n.includes("compressedimage") || n.includes("compressedvideo") ? !1 : /(^|\/)sensor_msgs\/(msg\/)?image$/i.test(t);
}
var O = [
	"image",
	"CompressedImage",
	"CompressedVideo"
];
function k(t) {
	let n = t.trim();
	return n ? e(n, "foxglove_msgs/msg/CompressedVideo") ? !0 : n.toLowerCase().includes("compressedvideo") : !1;
}
var A = 1e4, j = /depth|aligned_depth|compressed_depth/i, M = /wrist|hand|left|right|gripper|eef|end_effector/;
function N(e) {
	return e.trim().toLowerCase();
}
function P(e) {
	let t = N(e);
	return t === "16uc1" || t === "mono16";
}
function F(e) {
	return N(e) === "32fc1";
}
function se(e) {
	return j.test(e);
}
function I(e) {
	let t = e.trim().toLowerCase();
	if (!t) return null;
	let n = se(t), r = !n && M.test(t), i = {
		colorMode: "colormap",
		colorMap: "turbo"
	};
	return n ? {
		...i,
		minValue: 200,
		maxValue: A
	} : r ? {
		...i,
		minValue: 0,
		maxValue: 1e3
	} : null;
}
function L(e, t) {
	let n = t ? I(t) : null;
	return n ? n.minValue : P(e) ? 200 : 0;
}
function R(e, t) {
	let n = t ? I(t) : null;
	return n ? n.maxValue : F(e) ? 1 : P(e) ? A : 65535;
}
function z(e, t) {
	let n = I(e);
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
var B = {
	1: "points",
	POINTS: "points",
	2: "line-loop",
	LINE_LOOP: "line-loop",
	3: "line-strip",
	LINE_STRIP: "line-strip",
	4: "line-list",
	LINE_LIST: "line-list"
};
function V(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("imageannotations");
}
function H(e, t) {
	if (!Y(e) || !Array.isArray(e.points)) return null;
	let n = e.points.map(U).filter(Z), r = W(e.timestamp) ?? G(e.points) ?? (e.points.length === 0 ? t : void 0);
	return r === void 0 ? null : {
		timestampNs: r,
		points: n
	};
}
function U(e) {
	if (!Y(e) || !Array.isArray(e.points)) return null;
	let t = B[String(e.type)];
	if (!t) return null;
	let n = e.points.map(K).filter(Z), r = q(e.outline_color ?? e.outlineColor) ?? {
		r: 1,
		g: 1,
		b: 1,
		a: 1
	}, i = q(e.fill_color ?? e.fillColor) ?? r, a = e.outline_colors ?? e.outlineColors;
	return {
		kind: t,
		points: n,
		outlineColor: r,
		outlineColors: Array.isArray(a) ? a.map(q).filter(Z) : [],
		fillColor: i,
		thickness: Math.max(1, ce(e, ["thickness"]) ?? 1)
	};
}
function W(e) {
	if (!Y(e)) return;
	let t = J(e.sec ?? e.seconds), n = J(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function G(e) {
	for (let t of e) {
		if (!Y(t)) continue;
		let e = W(t.timestamp);
		if (e !== void 0) return e;
	}
}
function K(e) {
	return !Y(e) || !X(e.x) || !X(e.y) ? null : {
		x: e.x,
		y: e.y
	};
}
function q(e) {
	return !Y(e) || !X(e.r) || !X(e.g) || !X(e.b) || !X(e.a) ? null : {
		r: e.r,
		g: e.g,
		b: e.b,
		a: e.a
	};
}
function ce(e, t) {
	for (let n of t) if (X(e[n])) return e[n];
}
function J(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function Y(e) {
	return typeof e == "object" && !!e;
}
function X(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Z(e) {
	return e !== null;
}
//#endregion
//#region src/shared/utils/asyncTimeout.ts
var Q = class extends Error {
	name = "TimeoutError";
	constructor(e) {
		super(e);
	}
};
function le(e) {
	return e instanceof Q || e instanceof Error && e.name === "TimeoutError";
}
function $(e, t, n, r) {
	let i = !1, a = null;
	return new Promise((o, s) => {
		a = setTimeout(() => {
			i = !0, a = null, s(new Q(n));
		}, t), e.then((e) => {
			if (a != null && (clearTimeout(a), a = null), i) {
				r?.(e);
				return;
			}
			o(e);
		}, (e) => {
			a != null && (clearTimeout(a), a = null), i || s(e instanceof Error ? e : Error(String(e)));
		});
	});
}
//#endregion
export { m as _, z as a, f as b, O as c, re as d, y as f, k as g, te as h, H as i, T as l, D as m, $ as n, R as o, ae as p, V as r, L as s, le as t, ie as u, v, _ as x, p as y };
