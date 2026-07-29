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
function ee(e, t) {
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
var te = {
	1: "points",
	POINTS: "points",
	2: "line-loop",
	LINE_LOOP: "line-loop",
	3: "line-strip",
	LINE_STRIP: "line-strip",
	4: "line-list",
	LINE_LIST: "line-list"
};
function ne(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("imageannotations");
}
function re(e) {
	if (!P(e) || !Array.isArray(e.points)) return null;
	let t = e.points.map(D).filter(I), n = O(e.timestamp) ?? k(e.points);
	return n === void 0 ? null : {
		timestampNs: n,
		points: t
	};
}
function D(e) {
	if (!P(e) || !Array.isArray(e.points)) return null;
	let t = te[String(e.type)];
	if (!t) return null;
	let n = e.points.map(A).filter(I), r = j(e.outline_color ?? e.outlineColor) ?? {
		r: 1,
		g: 1,
		b: 1,
		a: 1
	}, i = j(e.fill_color ?? e.fillColor) ?? r, a = e.outline_colors ?? e.outlineColors;
	return {
		kind: t,
		points: n,
		outlineColor: r,
		outlineColors: Array.isArray(a) ? a.map(j).filter(I) : [],
		fillColor: i,
		thickness: Math.max(1, M(e, ["thickness"]) ?? 1)
	};
}
function O(e) {
	if (!P(e)) return;
	let t = N(e.sec ?? e.seconds), n = N(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function k(e) {
	for (let t of e) {
		if (!P(t)) continue;
		let e = O(t.timestamp);
		if (e !== void 0) return e;
	}
}
function A(e) {
	return !P(e) || !F(e.x) || !F(e.y) ? null : {
		x: e.x,
		y: e.y
	};
}
function j(e) {
	return !P(e) || !F(e.r) || !F(e.g) || !F(e.b) || !F(e.a) ? null : {
		r: e.r,
		g: e.g,
		b: e.b,
		a: e.a
	};
}
function M(e, t) {
	for (let n of t) if (F(e[n])) return e[n];
}
function N(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function P(e) {
	return typeof e == "object" && !!e;
}
function F(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function I(e) {
	return e !== null;
}
//#endregion
//#region src/features/panels/Image/core/sceneMesh.ts
var L = 8000000n, R = /* @__PURE__ */ new WeakMap();
function z(e) {
	return e.toLowerCase().replaceAll("_", "").endsWith("sceneupdate");
}
function B(e) {
	let t = e.match(/^(.*?)(?:\/image)?\/(?:compressed|image(?:_raw)?)$/i);
	return t ? `${t[1]}/camera_info` : null;
}
function V(e, t) {
	if (!Q(e) || !Array.isArray(e.entities)) return null;
	let n = R.get(e);
	if (n) return n;
	let r = [], i;
	for (let t of e.entities) {
		if (!Q(t)) continue;
		let e = t.triangles;
		if (!Array.isArray(e)) continue;
		let n = J(t, ["id"]) ?? `mesh-${r.length}`, a = J(t, ["frame_id", "frameId"]) ?? "";
		i ??= K(t.timestamp);
		for (let t = 0; t < e.length; t += 1) {
			let i = W(e[t], e.length === 1 ? n : `${n}-${t}`, a);
			i && r.push(i);
		}
	}
	if (r.length === 0 || (i ??= t, i === void 0)) return null;
	let a = {
		timestampNs: i,
		meshes: r
	};
	return R.set(e, a), a;
}
function H(e) {
	if (!Q(e)) return null;
	let t = Y(e, ["width"]), n = Y(e, ["height"]), r = J(e, ["distortion_model", "distortionModel"]), i = q(e.D ?? e.d), a = q(e.T_r_c ?? e.t_r_c ?? e.TRC ?? e.tRC ?? e.T_b_c ?? e.t_b_c ?? e.TBC ?? e.tBC);
	if (t === void 0 || n === void 0 || t <= 0 || n <= 0 || r?.toLowerCase() !== "ds" || i?.length !== 6 || a?.length !== 7) return null;
	let o = Math.hypot(a[3], a[4], a[5], a[6]);
	return !Number.isFinite(o) || o < 1e-9 ? null : {
		width: t,
		height: n,
		intrinsics: i,
		referenceFromCameraTranslation: [
			a[0],
			a[1],
			a[2]
		],
		referenceFromCameraQuaternion: [
			a[3] / o,
			a[4] / o,
			a[5] / o,
			a[6] / o
		]
	};
}
function U(e, t, n = L) {
	let r = null, i = n + 1n;
	for (let n of e) {
		let e = n.timestampNs >= t ? n.timestampNs - t : t - n.timestampNs;
		e < i && (r = n, i = e);
	}
	return i <= n ? r : null;
}
function W(e, t, n) {
	if (!Q(e) || !Array.isArray(e.points)) return null;
	let r = e.points, i = q(e.indices);
	if (!i || i.length === 0 || i.length % 3 != 0) return null;
	let a = new Float32Array(r.length * 3);
	for (let e = 0; e < r.length; e += 1) {
		let t = r[e];
		if (!Q(t)) return null;
		let n = Y(t, ["x"]), i = Y(t, ["y"]), o = Y(t, ["z"]);
		if (n === void 0 || i === void 0 || o === void 0) return null;
		a[e * 3] = n, a[e * 3 + 1] = i, a[e * 3 + 2] = o;
	}
	let o = new Uint32Array(i.length);
	for (let e = 0; e < i.length; e += 1) {
		let t = i[e];
		if (!Number.isInteger(t) || t < 0 || t >= r.length) return null;
		o[e] = t;
	}
	return {
		id: t,
		frameId: n,
		points: a,
		indices: o,
		color: G(e.color) ?? [
			.3,
			.72,
			1,
			.78
		]
	};
}
function G(e) {
	if (!Q(e)) return null;
	let t = Y(e, ["r"]), n = Y(e, ["g"]), r = Y(e, ["b"]), i = Y(e, ["a"]);
	return t === void 0 || n === void 0 || r === void 0 || i === void 0 ? null : [
		Z(t),
		Z(n),
		Z(r),
		Z(i)
	];
}
function K(e) {
	if (!Q(e)) return;
	let t = X(e.sec ?? e.seconds), n = X(e.nsec ?? e.nanosec ?? e.nanos);
	return t !== void 0 && n !== void 0 ? t * 1000000000n + n : void 0;
}
function q(e) {
	if (!Array.isArray(e) && !ArrayBuffer.isView(e)) return null;
	let t = Array.from(e);
	return t.every($) ? t : null;
}
function J(e, t) {
	for (let n of t) {
		let t = e[n];
		if (typeof t == "string") return t;
	}
}
function Y(e, t) {
	for (let n of t) {
		let t = e[n];
		if ($(t)) return t;
	}
}
function X(e) {
	if (typeof e == "bigint") return e;
	if (typeof e == "number" && Number.isSafeInteger(e) || typeof e == "string" && /^\d+$/.test(e)) return BigInt(e);
}
function Z(e) {
	return Math.max(0, Math.min(1, e));
}
function Q(e) {
	return typeof e == "object" && !!e;
}
function $(e) {
	return typeof e == "number" && Number.isFinite(e);
}
//#endregion
export { a as _, V as a, e as b, re as c, T as d, g as f, t as g, r as h, H as i, ee as l, i as m, B as n, U as o, p, z as r, ne as s, L as t, E as u, o as v, h as y };
