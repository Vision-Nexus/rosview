import { t as e } from "./createLucideIcon-BrmWW16k.js";
import { _ as t, c as n, f as r, h as i, l as a, m as o } from "./rosMessageTypes-Di-HH75w.js";
import { i as s, o as c, t as l } from "./timeSeries-Al2bAf1m.js";
import { a as u, o as d } from "./time-BoEDgjoH.js";
import { useCallback as f, useRef as p, useState as ee, useSyncExternalStore as te } from "react";
//#region node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
var ne = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
ne.node;
var re = e(ne), m = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
m.node;
var ie = e(m), ae = {
	name: "eye-off",
	size: 24,
	node: [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]
};
ae.node;
var oe = e(ae), se = {
	name: "eye",
	size: 24,
	node: [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
se.node;
var ce = e(se), h = {
	name: "rotate-ccw",
	size: 24,
	node: [["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}], ["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}]]
};
h.node;
var le = e(h), ue = [
	"timestamp",
	"index",
	"custom",
	"currentCustom"
], de = [
	"position",
	"velocity",
	"effort"
], fe = ["solid", "dashed"], pe = 2e5, me = 2e4, g = [
	"#3b82f6",
	"#ef4444",
	"#22c55e",
	"#f59e0b",
	"#a855f7",
	"#06b6d4",
	"#f97316",
	"#84cc16",
	"#ec4899",
	"#14b8a6",
	"#6366f1",
	"#eab308",
	"#0ea5e9",
	"#d946ef",
	"#10b981",
	"#64748b"
], he = g;
function _(e) {
	return g[e % g.length] ?? g[0];
}
function v(e = {}) {
	let t = e.id ?? `series-${Math.random().toString(36).slice(2, 10)}`, n = e.color ? -1 : 0;
	return {
		id: t,
		topic: "",
		path: "",
		xAxisPath: "",
		label: "",
		color: e.color ?? _(n),
		enabled: !0,
		timestampMode: "headerStamp",
		lineStyle: "solid",
		lineSize: 1.5,
		...e
	};
}
var ge = () => ({
	series: [v()],
	xAxisMode: "timestamp",
	maxPoints: 2e4,
	followingViewWidthSec: 0,
	syncX: !1,
	downsampleMode: "minMaxLast",
	nonIndexedMaxMessages: me,
	jointStateFields: ["position"],
	hiddenLegendKeys: []
}), _e = /* @__PURE__ */ new Set([
	"position[:]",
	"velocity[:]",
	"effort[:]"
]);
function y(e) {
	return e.filter(Boolean).join(",");
}
function b(e) {
	return y(e.map((e) => `${e}[:]`));
}
function x(e, t) {
	return e.filter((e) => e.topic !== t || !_e.has(e.path));
}
//#endregion
//#region src/features/panels/Plot/messagePath.ts
var S = /^([A-Za-z_$][\w$]*)(?:\[([^\]]*)\])?$/, ve = {
	abs: Math.abs,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	ceil: Math.ceil,
	cos: Math.cos,
	deg2rad: (e) => e * Math.PI / 180,
	exp: Math.exp,
	floor: Math.floor,
	log: Math.log,
	log10: Math.log10,
	rad2deg: (e) => e * 180 / Math.PI,
	round: Math.round,
	sin: Math.sin,
	sqrt: Math.sqrt,
	tan: Math.tan
};
function C(e) {
	let t = e.trim();
	return t ? /[,\s]/.test(t) ? t.split(",").flatMap((e) => e.trim().split(/\s+/)).map((e) => e.trim()).filter(Boolean) : [t] : [];
}
function w(e) {
	let t = e.trim();
	if (!t) return {
		sourcePath: "",
		modifiers: []
	};
	let n = t.split("@").map((e) => e.trim()).filter(Boolean);
	return {
		sourcePath: n[0] ?? "",
		modifiers: n.slice(1)
	};
}
function T(e) {
	return !!(Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView));
}
function ye(e) {
	if (!e || typeof e != "object") return [];
	let t = e.name;
	if (!T(t)) return [];
	let n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		n.push(typeof r == "string" && r.length > 0 ? r : `${e}`);
	}
	return n;
}
function E(e, t, n) {
	let r = ye(n)[t];
	if (r) return r;
	let i = e[t];
	if (!i || typeof i != "object") return;
	let a = i.child_frame_id;
	return typeof a == "string" && a.length > 0 ? a : void 0;
}
var be = /^(-?\d+)-(-?\d+)$/, xe = /^(-?\d+)-$/;
function Se(e) {
	if (e === "" || e === ":" || e === "-") return {
		start: void 0,
		end: void 0
	};
	if (e.includes(":")) {
		let [t, n] = e.split(":", 2), r = t ? Number(t) : void 0, i = n ? Number(n) : void 0;
		return {
			start: Number.isFinite(r) ? r : void 0,
			end: Number.isFinite(i) ? i : void 0
		};
	}
	let t = be.exec(e);
	if (t) {
		let e = Number(t[1]), n = Number(t[2]);
		if (Number.isFinite(e) && Number.isFinite(n)) return {
			start: e,
			end: n
		};
	}
	let n = xe.exec(e);
	if (n) {
		let e = Number(n[1]);
		if (Number.isFinite(e)) return {
			start: e,
			end: void 0
		};
	}
	return null;
}
function D(e) {
	if (e == null) return { kind: "none" };
	let t = e.trim(), n = Se(t);
	if (n) return {
		kind: "slice",
		start: n.start,
		end: n.end
	};
	let r = Number(t);
	return Number.isInteger(r) ? {
		kind: "index",
		index: r
	} : {
		kind: "name",
		name: t.replace(/^['"]|['"]$/g, "")
	};
}
function Ce(e) {
	return e ? e.split(".").map((e) => e.trim()).filter(Boolean).map((e) => {
		let t = S.exec(e);
		if (!t) throw Error(`Unsupported plot path segment: ${e}`);
		return {
			field: t[1] ?? "",
			selector: D(t[2])
		};
	}) : [];
}
function we(e, t) {
	let n = e < 0 ? t + e : e;
	return n >= 0 && n < t ? n : void 0;
}
function Te(e, t) {
	if (t === 0) return null;
	let n = (e, n) => {
		if (e === void 0) return n;
		let r = e < 0 ? t + e : e;
		return r < 0 ? -1 : Math.min(t - 1, r);
	}, r = n(e.start, 0), i = n(e.end, t - 1);
	return r < 0 || i < 0 || r > i ? null : {
		startIdx: r,
		endIdx: i
	};
}
function Ee(e, t, n, r) {
	if (t.kind === "none") return [{
		key: r,
		label: r,
		value: e
	}];
	if (!T(e)) return [];
	if (t.kind === "index") {
		let n = we(t.index, e.length);
		return n == null ? [] : [{
			key: `${r}[${n}]`,
			label: `${r}[${n}]`,
			value: e[n]
		}];
	}
	if (t.kind === "name") {
		let i = Array.from({ length: e.length }, (t, r) => E(e, r, n) ?? `${r}`).indexOf(t.name);
		return i < 0 || i >= e.length ? [] : [{
			key: `${r}[${t.name}]`,
			label: `${r}[${i}] (${t.name})`,
			value: e[i]
		}];
	}
	let i = Te(t, e.length);
	if (!i) return [];
	let { startIdx: a, endIdx: o } = i, s = [];
	for (let t = a; t <= o; t++) {
		let i = E(e, t, n), a = i ? `${r}[${t}] (${i})` : `${r}[${t}]`, o = i ? `${r}[${i}]` : `${r}[${t}]`;
		s.push({
			key: o,
			label: a,
			value: e[t]
		});
	}
	return s;
}
function De(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e == "bigint") return Number(e);
	if (typeof e == "boolean") return +!!e;
	if (typeof e == "string") {
		let t = Number(e);
		return Number.isFinite(t) ? t : void 0;
	}
	if (e && typeof e == "object") {
		let t = e, n = t.nsec ?? t.nanosec;
		if (typeof t.sec == "number" && typeof n == "number") return t.sec + n / 1e9;
	}
}
function Oe(e, t) {
	let n = e;
	for (let e of t) {
		if (e === "derivative") continue;
		let t = ve[e];
		if (!t || (n = t(n), !Number.isFinite(n))) return;
	}
	return n;
}
function ke(e) {
	return C(e).some((e) => w(e).modifiers.includes("derivative"));
}
function Ae(e) {
	for (let t of C(e)) {
		let { sourcePath: e } = w(t);
		if (!e) continue;
		let n = e.split(".");
		for (let e of n) {
			let t = S.exec(e);
			if (!t) continue;
			let n = t[2];
			if (n != null && D(n).kind === "slice") return !0;
		}
	}
	return !1;
}
function je(e, t) {
	let n = w(t);
	if (!n.sourcePath) return [];
	let r = [{
		key: "",
		label: "",
		value: e
	}], i = Ce(n.sourcePath);
	for (let t of i) {
		let n = [];
		for (let i of r) {
			if (!i.value || typeof i.value != "object") continue;
			let r = i.value[t.field];
			for (let a of Ee(r, t.selector, e, t.field)) {
				let e = i.key ? `${i.key}.${a.key}` : a.key, r = i.label && a.label === t.field ? `${i.label}.${a.label}` : a.label;
				n.push({
					key: e,
					label: r,
					value: a.value
				});
			}
		}
		r = n;
	}
	return r.flatMap((e) => {
		let t = De(e.value);
		if (t == null) return [];
		let r = Oe(t, n.modifiers);
		return r == null ? [] : [{
			key: e.key,
			label: e.label || e.key,
			value: r
		}];
	});
}
function O(e, t) {
	let n = C(t);
	if (n.length <= 1) return je(e, n[0] ?? t);
	let r = [], i = /* @__PURE__ */ new Set();
	for (let t of n) for (let n of je(e, t)) {
		let e = `${t}|${n.key}`;
		i.has(e) || (i.add(e), r.push(n));
	}
	return r;
}
//#endregion
//#region src/features/panels/Plot/plotWarnings.ts
function Me(e) {
	switch (e.kind) {
		case "noNumericValues": return `noNumeric:${e.topic}:${e.path}`;
		case "missingXPath": return `missingX:${e.topic}:${e.path}`;
		case "mismatchedXY": return `mismatch:${e.topic}:${e.xPath}:${e.yPath}`;
		default: return e.kind;
	}
}
function Ne(e, t) {
	switch (e.kind) {
		case "noNumericValues": return t({ id: "panels.plot.warning.noNumericValues" }, {
			topic: e.topic,
			path: e.path
		});
		case "missingXPath": return t({ id: "panels.plot.warning.missingXPath" }, {
			topic: e.topic,
			path: e.path
		});
		case "mismatchedXY": return t({ id: "panels.plot.warning.mismatchedXY" }, {
			topic: e.topic,
			xPath: e.xPath,
			yPath: e.yPath
		});
		case "nonIndexedSource": return t({ id: "panels.plot.warning.nonIndexedSource" });
		case "downsampleLimited": return t({ id: "panels.plot.warning.downsampleLimited" });
	}
}
//#endregion
//#region src/features/panels/Plot/adapters/index.ts
var Pe = ["position"], Fe = {
	detect(e) {
		return (e.jointStateFields?.length ? e.jointStateFields : Pe).map((e) => ({
			path: `${e}[:]`,
			label: e
		}));
	},
	validate(e) {
		if (!e || typeof e != "object") return !1;
		let t = e;
		return [
			"position",
			"velocity",
			"effort"
		].some((e) => {
			let n = t[e];
			return Array.isArray(n) && n.length > 0;
		});
	}
}, Ie = "__laser_scan_angle__", Le = {
	detect(e) {
		return (e.schemaName?.toLowerCase() ?? "").includes("multiecho") ? [{
			path: "ranges[0][:]",
			label: "ranges[0]",
			xAxisPath: Ie
		}] : [{
			path: "ranges[:]",
			label: "ranges",
			xAxisPath: Ie
		}];
	},
	validate(e) {
		if (!e || typeof e != "object") return !1;
		let t = e.ranges;
		return Array.isArray(t) && t.length > 0;
	}
};
function Re() {
	return [
		{
			path: "linear_acceleration.x",
			label: "linear_acceleration.x"
		},
		{
			path: "linear_acceleration.y",
			label: "linear_acceleration.y"
		},
		{
			path: "linear_acceleration.z",
			label: "linear_acceleration.z"
		},
		{
			path: "angular_velocity.x",
			label: "angular_velocity.x"
		},
		{
			path: "angular_velocity.y",
			label: "angular_velocity.y"
		},
		{
			path: "angular_velocity.z",
			label: "angular_velocity.z"
		}
	];
}
function ze() {
	return [
		{
			path: "magnetic_field.x",
			label: "magnetic_field.x"
		},
		{
			path: "magnetic_field.y",
			label: "magnetic_field.y"
		},
		{
			path: "magnetic_field.z",
			label: "magnetic_field.z"
		}
	];
}
var Be = { detect(e) {
	let t = e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "";
	return t.endsWith("/imu") ? Re() : t.endsWith("/magneticfield") ? ze() : [
		{
			path: "x",
			label: "x"
		},
		{
			path: "y",
			label: "y"
		},
		{
			path: "z",
			label: "z"
		}
	];
} }, Ve = { detect(e) {
	let t = e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "";
	return t.endsWith("/temperature") ? [{
		path: "temperature",
		label: "temperature"
	}] : t.endsWith("/fluidpressure") ? [{
		path: "fluid_pressure",
		label: "fluid_pressure"
	}] : t.endsWith("/illuminance") ? [{
		path: "illuminance",
		label: "illuminance"
	}] : t.endsWith("/relativehumidity") ? [{
		path: "relative_humidity",
		label: "relative_humidity"
	}] : t.endsWith("/range") ? [{
		path: "range",
		label: "range"
	}] : [{
		path: "data",
		label: "data"
	}];
} }, He = { detect() {
	return [
		{
			path: "latitude",
			label: "latitude"
		},
		{
			path: "longitude",
			label: "longitude"
		},
		{
			path: "altitude",
			label: "altitude"
		}
	];
} }, Ue = { detect() {
	return [{
		path: "data[:]",
		label: "data"
	}];
} }, We = { detect(e) {
	let t = e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "";
	return t.endsWith("/joy") ? [{
		path: "axes[:]",
		label: "axes"
	}] : t.endsWith("/channelfloat32") ? [{
		path: "values[:]",
		label: "values"
	}] : [{
		path: "data[:]",
		label: "data"
	}];
} }, Ge = { detect() {
	return [{
		path: "percentage",
		label: "percentage"
	}, {
		path: "voltage",
		label: "voltage"
	}];
} }, Ke = { detect(e) {
	let t = (e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "").endsWith("/twiststamped") ? "twist." : "";
	return [
		{
			path: `${t}linear.x`,
			label: "linear.x"
		},
		{
			path: `${t}linear.y`,
			label: "linear.y"
		},
		{
			path: `${t}angular.z`,
			label: "angular.z"
		}
	];
} }, qe = { detect(e) {
	let t = e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "";
	if (t.endsWith("/pointstamped")) return [
		{
			path: "point.x",
			label: "point.x"
		},
		{
			path: "point.y",
			label: "point.y"
		},
		{
			path: "point.z",
			label: "point.z"
		}
	];
	let n = t.endsWith("/posestamped") ? "pose." : "";
	return [
		{
			path: `${n}position.x`,
			label: "position.x"
		},
		{
			path: `${n}position.y`,
			label: "position.y"
		},
		{
			path: `${n}position.z`,
			label: "position.z"
		}
	];
} }, Je = { detect(e) {
	let t = (e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "").endsWith("/wrenchstamped") ? "wrench." : "";
	return [
		{
			path: `${t}force.x`,
			label: "force.x"
		},
		{
			path: `${t}force.y`,
			label: "force.y"
		},
		{
			path: `${t}force.z`,
			label: "force.z"
		}
	];
} }, Ye = { detect() {
	return [
		{
			path: "pose.pose.position.x",
			label: "position.x"
		},
		{
			path: "pose.pose.position.y",
			label: "position.y"
		},
		{
			path: "twist.twist.linear.x",
			label: "linear.x"
		}
	];
} }, Xe = {
	detect() {
		return [
			{
				path: "transforms[:].transform.translation.x",
				label: "translation.x"
			},
			{
				path: "transforms[:].transform.translation.y",
				label: "translation.y"
			},
			{
				path: "transforms[:].transform.translation.z",
				label: "translation.z"
			},
			{
				path: "transforms[:].transform.rotation.x",
				label: "rotation.x",
				default: !1
			},
			{
				path: "transforms[:].transform.rotation.y",
				label: "rotation.y",
				default: !1
			},
			{
				path: "transforms[:].transform.rotation.z",
				label: "rotation.z",
				default: !1
			},
			{
				path: "transforms[:].transform.rotation.w",
				label: "rotation.w",
				default: !1
			}
		];
	},
	validate(e) {
		if (!e || typeof e != "object") return !1;
		let t = e.transforms;
		return !Array.isArray(t) || t.length === 0 ? !1 : t.some((e) => {
			if (!e || typeof e != "object") return !1;
			let t = e.transform;
			if (!t || typeof t != "object") return !1;
			let n = t.translation;
			return !n || typeof n != "object" ? !1 : [
				"x",
				"y",
				"z"
			].some((e) => {
				let t = n[e];
				return typeof t == "number" && Number.isFinite(t);
			});
		});
	}
};
function Ze(e, t) {
	return e ? t.filter((t) => t.xAxisPath === "__laser_scan_angle__" ? Le.validate?.(e) ?? !1 : O(e, t.path).length > 0) : t;
}
//#endregion
//#region src/features/panels/Plot/plotEventIndex.ts
function k(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.topic);
		e ? e.push(n) : t.set(n.topic, [n]);
	}
	return t;
}
function Qe(e, t) {
	let n = e.get(t);
	if (n && n.length !== 0) return n[n.length - 1];
}
//#endregion
//#region src/features/panels/Plot/plotPointCollector.ts
function A(e) {
	return e.enabled && e.topic.length > 0 && e.path.trim().length > 0;
}
function $e(e) {
	return e.topic.length > 0 && e.path.trim().length > 0;
}
function j(e) {
	return Math.round(e * 1e3) / 1e3;
}
function et(e, t) {
	if (t && t !== e.path) return t;
	if (e.label.trim()) return e.label.trim();
	let n = t || e.path || "value";
	return e.topic ? `${e.topic} · ${n}` : n;
}
function M(e, t) {
	if (t === "__laser_scan_angle__") {
		if (!e || typeof e != "object") return [];
		let t = e, n = t.ranges, r = typeof t.angle_min == "number" ? t.angle_min : 0, i = typeof t.angle_increment == "number" ? t.angle_increment : 0;
		return Array.isArray(n) ? n.map((e, t) => ({
			key: `angle[${t}]`,
			label: `angle[${t}]`,
			value: r + t * i
		})) : [];
	}
	return O(e, t);
}
function N(e, t, n, r, i, a) {
	let o = `${t.id}:${n}`, s = e.get(o);
	s || (s = {
		series: {
			key: o,
			label: et(t, r),
			color: t.color,
			lineStyle: t.lineStyle,
			lineSize: t.lineSize,
			enabled: t.enabled
		},
		points: [],
		derivative: ke(t.path),
		seriesConfigId: t.id
	}, e.set(o, s)), s.points.push({
		x: i,
		y: a
	});
}
function tt(e, t) {
	let n = new Map(t.series.map((e) => [e.id, e]));
	for (let t of e) {
		let e = n.get(t.seriesConfigId);
		e && (t.series.lineStyle = e.lineStyle, t.series.lineSize = e.lineSize, e.color && (t.series.color = e.color));
	}
}
function nt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.values()) {
		let e = t.get(n.seriesConfigId) ?? [];
		e.push(n), t.set(n.seriesConfigId, e);
	}
	let n = 0;
	for (let e of t.values()) {
		if (e.length === 1) {
			let t = e[0];
			t.series.color || (t.series.color = _(n++));
			continue;
		}
		for (let t of e) t.series.color = _(n++);
	}
}
function rt(e, t, n, r, i) {
	let a = /* @__PURE__ */ new Map(), o = k(e), l = t.series.filter(A);
	for (let e of l) {
		let t = o.get(e.topic) ?? [], l = !1;
		for (let n of t) {
			let t = j(c(s(n, e.timestampMode, r, i).time)), o = O(n.message, e.path);
			for (let n of o) N(a, e, n.key, n.label, t, n.value), l = !0;
		}
		t.length > 0 && !l && n.push({
			kind: "noNumericValues",
			topic: e.topic,
			path: e.path
		});
	}
	return a;
}
function it(e, t) {
	let n = /* @__PURE__ */ new Map(), r = k(e);
	for (let e of t.series.filter(A)) {
		let t = Qe(r, e.topic);
		t && O(t.message, e.path).forEach((t, r) => {
			N(n, e, t.key || `${r}`, t.label, r, t.value);
		});
	}
	return n;
}
function at(e, t, n, r) {
	let i = /* @__PURE__ */ new Map(), a = k(e);
	for (let e of t.series.filter(A)) {
		let t = e.xAxisPath?.trim();
		if (!t) {
			r.push({
				kind: "missingXPath",
				topic: e.topic,
				path: e.path
			});
			continue;
		}
		let o = a.get(e.topic) ?? [], s = o.at(-1), c = n ? s ? [s] : [] : o;
		for (let n of c) {
			let a = M(n.message, t), o = O(n.message, e.path), s = Math.min(a.length, o.length);
			a.length !== o.length && r.push({
				kind: "mismatchedXY",
				topic: e.topic,
				xPath: t,
				yPath: e.path
			});
			let c = a.length > 1 && o.length > 1;
			for (let t = 0; t < s; t++) {
				let n = a[t]?.value, r = o[t]?.value;
				n != null && r != null && N(i, e, c ? "value" : o[t]?.key ?? `${t}`, c ? "" : o[t]?.label ?? `${t}`, n, r);
			}
		}
	}
	return i;
}
//#endregion
//#region src/features/panels/Plot/plotAlign.ts
function P(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = j(n.x);
		t.set(e, n.y);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([e, t]) => ({
		x: e,
		y: t
	}));
}
function ot(e) {
	let t = P(e).filter((e) => e.y != null), n = [];
	for (let e = 1; e < t.length; e++) {
		let r = t[e - 1], i = t[e], a = i.x - r.x;
		n.push({
			x: i.x,
			y: a === 0 ? null : (i.y - r.y) / a
		});
	}
	return n;
}
function st(e, t, n) {
	if (e.length <= n) return [e, t];
	let r = e.map((e, n) => ({
		x: e,
		y: t.reduce((e, t) => e + (t[n] == null ? 0 : 1), 0)
	})), i = l(r, n), a = [...new Set(i.map((e) => e.x))].sort((e, t) => e - t), o = new Map(e.map((e, t) => [e, t]));
	return [a, t.map((e) => a.map((t) => {
		let n = o.get(t);
		return n == null ? null : e[n] ?? null;
	}))];
}
function ct(e, t, n) {
	if (e.length === 0) return {
		data: [[]],
		sampleRatio: 1
	};
	let r = e.map((e) => {
		let r = e.derivative ? ot(e.points) : P(e.points), i = r;
		return n && i.length > t && (i = l(i, t)), {
			bucket: e,
			rawPoints: r,
			points: i
		};
	}), i = /* @__PURE__ */ new Set();
	for (let e of r) for (let t of e.rawPoints) i.add(t.x);
	let a = i.size;
	if (r.length === 1) {
		let e = r[0];
		if (!e) return {
			data: [[]],
			sampleRatio: 1
		};
		let i = e.points.map((e) => e.x), o = e.points.map((e) => e.y ?? null);
		if (n && i.length > t) {
			let e = i.map((e, t) => ({
				x: e,
				y: o[t] ?? null
			})), n = l(e, t);
			i = n.map((e) => e.x), o = n.map((e) => e.y ?? null);
		}
		let s = a > 0 ? Math.min(1, i.length / a) : 1;
		return {
			data: [i, o],
			sampleRatio: s
		};
	}
	let o = /* @__PURE__ */ new Set();
	for (let e of r) for (let t of e.points) o.add(t.x);
	let s = Array.from(o).sort((e, t) => e - t), c = r.map((e) => new Map(e.points.map((e) => [e.x, e.y]))).map((e) => s.map((t) => e.get(t) ?? null));
	n && s.length > t && ([s, c] = st(s, c, t));
	let u = a > 0 ? Math.min(1, s.length / a) : 1;
	return {
		data: [s, ...c],
		sampleRatio: u
	};
}
//#endregion
//#region src/core/analysis/rangeQueryCache.ts
var lt = 24, ut = 15e5, dt = class {
	#e = /* @__PURE__ */ new Map();
	#t = lt;
	#n = ut;
	setLimits(e, t) {
		this.#t = Math.max(1, Math.floor(e)), this.#n = Math.max(1e3, Math.floor(t)), this.#r();
	}
	getOrCreate(e, t, n = {}) {
		if (!e.getMessagesInTimeRange) return Promise.resolve([]);
		let r = pt(t, n), i = Date.now(), a = this.#e.get(r);
		if (a) return a.lastAccessAt = i, a.value;
		let o = e.getMessagesInTimeRange(t).catch((e) => {
			throw this.#e.delete(r), e;
		}), s = {
			key: r,
			value: o,
			createdAt: i,
			lastAccessAt: i,
			sizeEstimate: ft(t, n)
		};
		return this.#e.set(r, s), this.#r(), o;
	}
	clear() {
		this.#e.clear();
	}
	getStats() {
		let e = 0;
		for (let t of this.#e.values()) e += t.sizeEstimate;
		return {
			entries: this.#e.size,
			sizeEstimate: e
		};
	}
	#r() {
		for (; this.#e.size > this.#t || this.getStats().sizeEstimate > this.#n;) {
			let e;
			for (let t of this.#e.values()) (!e || t.lastAccessAt < e.lastAccessAt) && (e = t);
			if (!e) break;
			this.#e.delete(e.key);
		}
	}
};
function ft(e, t) {
	let n = e.end.sec + e.end.nsec / 1e9 - (e.start.sec + e.start.nsec / 1e9), r = Math.max(1, e.topics.length), i = Math.max(1, t.fields?.length ?? 1);
	return Math.max(1, Math.floor(n * 1e3 * r * i));
}
function pt(e, t) {
	let n = [...e.topics].sort(), r = [...t.fields ?? []].sort();
	return JSON.stringify({
		start: e.start,
		end: e.end,
		topics: n,
		fields: r,
		timestampMode: t.timestampMode ?? "receiveTime",
		downsampleMode: t.downsampleMode ?? "none",
		customTimestampPath: t.customTimestampPath ?? ""
	});
}
var mt = new dt(), ht = 24;
function F(e, t) {
	let n = d(e), r = d(t);
	if (r <= n) return [{
		start: e,
		end: t
	}];
	let i = r - n, a = Number(i) < 1e10 ? 1 : ht, o = i / BigInt(a), s = [], c = n;
	for (let e = 0; e < a; e++) {
		let t = e === a - 1 ? r : c + o;
		s.push({
			start: u(c),
			end: u(t)
		}), c = t + 1n;
	}
	return s;
}
function I(e) {
	let t = d(e.receiveTime).toString(), n = e.publishTime ? d(e.publishTime).toString() : "";
	return `${e.topic}|${e.schemaName}|${t}|${n}`;
}
async function L(e, t, n) {
	return e.getMessagesInTimeRange ? n ? e.getMessagesInTimeRange({
		...t,
		signal: n
	}) : mt.getOrCreate(e, t) : [];
}
function R(e) {
	if (e?.aborted) throw new DOMException("Plot range read aborted", "AbortError");
}
function z(e) {
	return e.sort((e, t) => {
		let n = d(e.receiveTime) - d(t.receiveTime);
		return n < 0n ? -1 : n > 0n ? 1 : e.topic.localeCompare(t.topic);
	});
}
function B() {
	return new Promise((e) => globalThis.setTimeout(e, 0));
}
async function gt({ player: e, start: t, end: n, topics: r, signal: i, onProgress: a, maxMessages: o }) {
	if (r.length === 0 || !e.getMessagesInTimeRange) return [];
	let s = Array.from(new Set(r)).sort(), c = F(t, n), l = /* @__PURE__ */ new Map(), u = o != null && o > 0 ? o : void 0;
	for (let t = 0; t < c.length && (R(i), !(u != null && l.size >= u)); t++) {
		let n = c[t], r = await L(e, {
			start: n.start,
			end: n.end,
			topics: s
		}, i);
		for (let e of r) if (l.set(I(e), e), u != null && l.size >= u) break;
		a?.({
			completed: t + 1,
			total: c.length,
			messages: l.size
		}), await B();
	}
	return z([...l.values()]);
}
function V(e, t, n) {
	let r = [];
	for (let i of t) {
		if (n != null && e.size >= n) break;
		let t = I(i);
		e.has(t) || (e.set(t, i), r.push(i));
	}
	return r;
}
async function _t({ player: e, start: t, end: n, topics: r, signal: i, onProgress: a, onBatch: o, maxMessages: s }) {
	if (r.length === 0 || !e.getMessagesInTimeRange && !e.streamMessagesInTimeRange) return [];
	let c = Array.from(new Set(r)).sort(), l = F(t, n), u = /* @__PURE__ */ new Map(), d = s != null && s > 0 ? s : void 0;
	for (let t = 0; t < l.length && (R(i), !(d != null && u.size >= d)); t++) {
		let n = l[t];
		if (e.streamMessagesInTimeRange) for await (let r of e.streamMessagesInTimeRange({
			start: n.start,
			end: n.end,
			topics: c,
			maxMessages: d == null ? void 0 : d - u.size,
			signal: i
		})) {
			R(i);
			let e = V(u, r, d), n = {
				completed: t,
				total: l.length,
				messages: u.size
			};
			if (e.length > 0 && o?.({
				messages: e,
				progress: n
			}), a?.(n), d != null && u.size >= d) break;
			await B();
		}
		else {
			let r = V(u, await L(e, {
				start: n.start,
				end: n.end,
				topics: c
			}, i), d), s = {
				completed: t + 1,
				total: l.length,
				messages: u.size
			};
			r.length > 0 && o?.({
				messages: r,
				progress: s
			}), a?.(s), await B();
			continue;
		}
		let r = {
			completed: t + 1,
			total: l.length,
			messages: u.size
		};
		a?.(r), R(i), await B();
	}
	return z([...u.values()]);
}
//#endregion
//#region src/features/panels/Plot/fieldDiscovery.ts
var vt = 8, yt = 120, bt = 512, xt = /* @__PURE__ */ new Set(["header.stamp", "header.frame_id"]), St = /* @__PURE__ */ new Set([
	"frame_id",
	"encoding",
	"format",
	"data_offset"
]), Ct = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z",
	"w",
	"position",
	"orientation",
	"linear",
	"angular",
	"velocity",
	"effort",
	"temperature",
	"voltage",
	"percentage",
	"range",
	"force",
	"torque"
]);
function wt(e) {
	return Array.isArray(e) ? !0 : ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function H(e) {
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e == "bigint" || typeof e == "boolean") return !0;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length > 0 && Number.isFinite(Number(t));
	}
	return !1;
}
function U(e) {
	return e ? e.split(".").length : 0;
}
function Tt(e) {
	if (xt.has(e)) return !0;
	let t = e.split(".").at(-1) ?? "";
	return St.has(t);
}
function W(e) {
	let t = e.toLowerCase().split("."), n = 0;
	for (let e of t) Ct.has(e) && (n += 4);
	return t.some((e) => e === "position") && (n += 8), t.some((e) => e === "linear" || e === "angular") && (n += 5), t.at(-1) === "x" && (n += 3), t.at(-1) === "y" && (n += 2), t.at(-1) === "z" && (n += 1), n;
}
function Et(e) {
	return W(e) > 0;
}
function G(e, t, n) {
	e.length >= n || e.push(t);
}
function K(e, t, n, r) {
	if (!(!t || n.length >= r.maxFields || Tt(t))) {
		if (H(e)) {
			G(n, {
				path: t,
				label: t,
				kind: "scalar",
				depth: U(t),
				recommended: Et(t)
			}, r.maxFields);
			return;
		}
		if (wt(e)) {
			let i = Math.min(e.length, r.maxArrayLength);
			if (i === 0) return;
			let a = 0;
			for (let t = 0; t < i; t++) H(e[t]) && a++;
			a === i && G(n, {
				path: `${t}[:]`,
				label: t,
				kind: "array",
				depth: U(t),
				recommended: Et(t)
			}, r.maxFields);
			return;
		}
		if (!(!e || typeof e != "object" || U(t) >= r.maxDepth)) for (let [i, a] of Object.entries(e)) {
			if (n.length >= r.maxFields) return;
			K(a, `${t}.${i}`, n, r);
		}
	}
}
function q(e, t = {}) {
	if (!e || typeof e != "object") return [];
	let n = {
		maxDepth: t.maxDepth ?? vt,
		maxFields: t.maxFields ?? yt,
		maxArrayLength: t.maxArrayLength ?? bt
	}, r = [];
	for (let [t, i] of Object.entries(e)) if (K(i, t, r, n), r.length >= n.maxFields) break;
	return r.sort((e, t) => {
		let n = Number(t.recommended) - Number(e.recommended);
		if (n !== 0) return n;
		let r = W(t.path) - W(e.path);
		return r === 0 ? e.path.localeCompare(t.path) : r;
	});
}
//#endregion
//#region src/features/panels/Plot/schemaRegistry/plotSchemaRegistry.ts
var Dt = [
	{
		schemaSuffix: "sensor_msgs/jointstate",
		adapterId: "jointState",
		defaultPriority: 100
	},
	{
		schemaSuffix: "sensor_msgs/imu",
		adapterId: "vector3Group",
		defaultPriority: 80
	},
	{
		schemaSuffix: "sensor_msgs/magneticfield",
		adapterId: "vector3Group",
		defaultPriority: 70
	},
	{
		schemaSuffix: "sensor_msgs/laserscan",
		adapterId: "laserScan",
		defaultPriority: 40,
		preferredXAxisMode: "custom"
	},
	{
		schemaSuffix: "sensor_msgs/multiecholaserscan",
		adapterId: "laserScan",
		defaultPriority: 40,
		preferredXAxisMode: "custom"
	},
	{
		schemaSuffix: "sensor_msgs/joy",
		adapterId: "numericArray",
		defaultPriority: 50
	},
	{
		schemaSuffix: "sensor_msgs/channelfloat32",
		adapterId: "numericArray",
		defaultPriority: 50
	},
	{
		schemaSuffix: "sensor_msgs/batterystate",
		adapterId: "batteryState",
		defaultPriority: 55
	},
	{
		schemaSuffix: "sensor_msgs/temperature",
		adapterId: "scalar",
		defaultPriority: 45
	},
	{
		schemaSuffix: "sensor_msgs/fluidpressure",
		adapterId: "scalar",
		defaultPriority: 45
	},
	{
		schemaSuffix: "sensor_msgs/illuminance",
		adapterId: "scalar",
		defaultPriority: 45
	},
	{
		schemaSuffix: "sensor_msgs/relativehumidity",
		adapterId: "scalar",
		defaultPriority: 45
	},
	{
		schemaSuffix: "sensor_msgs/range",
		adapterId: "scalar",
		defaultPriority: 45
	},
	{
		schemaSuffix: "sensor_msgs/navsatfix",
		adapterId: "scalarGroup",
		defaultPriority: 50
	},
	{
		schemaSuffix: "std_msgs/float32",
		adapterId: "scalar",
		defaultPriority: 60
	},
	{
		schemaSuffix: "std_msgs/float64",
		adapterId: "scalar",
		defaultPriority: 60
	},
	{
		schemaSuffix: "std_msgs/int8",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int16",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int32",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int64",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint8",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint16",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint32",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint64",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/bool",
		adapterId: "scalar",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/byte",
		adapterId: "scalar",
		defaultPriority: 50
	},
	{
		schemaSuffix: "std_msgs/char",
		adapterId: "scalar",
		defaultPriority: 50
	},
	{
		schemaSuffix: "std_msgs/float32multiarray",
		adapterId: "multiArray",
		defaultPriority: 60
	},
	{
		schemaSuffix: "std_msgs/float64multiarray",
		adapterId: "multiArray",
		defaultPriority: 60
	},
	{
		schemaSuffix: "std_msgs/int8multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int16multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int32multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/int64multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint8multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint16multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint32multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/uint64multiarray",
		adapterId: "multiArray",
		defaultPriority: 55
	},
	{
		schemaSuffix: "std_msgs/bytemultiarray",
		adapterId: "multiArray",
		defaultPriority: 50
	},
	{
		schemaSuffix: "geometry_msgs/vector3",
		adapterId: "vector3Group",
		defaultPriority: 65
	},
	{
		schemaSuffix: "geometry_msgs/point",
		adapterId: "vector3Group",
		defaultPriority: 65
	},
	{
		schemaSuffix: "geometry_msgs/twist",
		adapterId: "twist",
		defaultPriority: 75
	},
	{
		schemaSuffix: "geometry_msgs/twiststamped",
		adapterId: "twist",
		defaultPriority: 75
	},
	{
		schemaSuffix: "geometry_msgs/pose",
		adapterId: "pose",
		defaultPriority: 70
	},
	{
		schemaSuffix: "geometry_msgs/posestamped",
		adapterId: "pose",
		defaultPriority: 70
	},
	{
		schemaSuffix: "geometry_msgs/pointstamped",
		adapterId: "pose",
		defaultPriority: 70
	},
	{
		schemaSuffix: "geometry_msgs/wrench",
		adapterId: "wrench",
		defaultPriority: 65
	},
	{
		schemaSuffix: "geometry_msgs/wrenchstamped",
		adapterId: "wrench",
		defaultPriority: 65
	},
	{
		schemaSuffix: "nav_msgs/odometry",
		adapterId: "odometry",
		defaultPriority: 80
	},
	{
		schemaSuffix: "tf2_msgs/tfmessage",
		adapterId: "tfMessage",
		defaultPriority: 20
	}
], Ot = new Map(Dt.map((e) => [e.schemaSuffix, e]));
function kt(e) {
	return t(e).toLowerCase();
}
function J(e) {
	let t = kt(e);
	return Ot.get(t);
}
function At(e) {
	return J(e)?.defaultPriority ?? 0;
}
function jt() {
	return Dt;
}
//#endregion
//#region src/features/panels/Plot/autoDetect.ts
var Mt = {
	jointState: Fe,
	vector3Group: Be,
	scalar: Ve,
	scalarGroup: He,
	multiArray: Ue,
	numericArray: We,
	laserScan: Le,
	batteryState: Ge,
	twist: Ke,
	pose: qe,
	wrench: Je,
	odometry: Ye,
	tfMessage: Xe
};
function Y(e) {
	let { schemaName: t, sample: n, jointStateFields: r } = e;
	if (!t) return [];
	let i = J(t);
	if (!i) return q(n).map((e) => ({
		path: e.path,
		label: e.label
	}));
	let a = Mt[i.adapterId], o = {
		schemaName: t,
		sample: n,
		jointStateFields: r
	}, s = a.detect(o), c = Ze(n, s);
	if (c.length > 0) return c;
	if (!n) return s;
	let l = q(n).map((e) => ({
		path: e.path,
		label: e.label
	}));
	return l.length > 0 ? l : s;
}
function Nt(e) {
	if (e) return J(e)?.preferredXAxisMode;
}
//#endregion
//#region src/features/panels/Plot/plottableSchemas.ts
function Pt(e) {
	if (i(e) || o(e) || n(e) || a(e)) return !0;
	let t = e.toLowerCase().replace(/\/msg\//, "/");
	return t.includes("/pointcloud") || t.includes("/camera_info") || t.includes("/compressedimage") || t.endsWith("/image") || t.includes("/string") || t.endsWith("/empty");
}
function Ft(e) {
	return !Pt(e.type);
}
function It(e) {
	return !Pt(e);
}
function Lt(e) {
	return e.filter(Ft);
}
//#endregion
//#region src/features/panels/Plot/plotLegendVisibility.ts
function X(e, t) {
	return !e.includes(t);
}
function Rt(e, t, n) {
	return n ? e.filter((e) => e !== t) : e.includes(t) ? [...e] : [...e, t];
}
function zt(e, t, n) {
	let r = new Set(t);
	if (n) return e.filter((e) => !r.has(e));
	let i = new Set(e);
	for (let e of t) i.add(e);
	return [...i];
}
function Bt(e, t, n) {
	let r = new Set(t), i = new Set(e.filter((e) => !r.has(e)));
	for (let e of t) e !== n && i.add(e);
	return [...i];
}
function Vt(e, t) {
	return e.filter((e) => X(t, e.key)).length;
}
function Ht(e, t) {
	let n = new Set(t);
	return e.filter((e) => n.has(e));
}
function Ut(e, t) {
	let n = new Set(t), r = /* @__PURE__ */ new Set();
	return e.forEach((e, t) => {
		n.has(e.key) && r.add(t);
	}), r;
}
function Wt(e, t) {
	if (e.length === 0) return "all";
	let n = e.filter((e) => X(t, e.key)).length;
	return n === 0 ? "none" : n === e.length ? "all" : "partial";
}
//#endregion
//#region src/features/panels/Plot/topicPaths.ts
function Gt(e, t, n) {
	let r = e.findIndex((e) => e.id === t);
	if (r < 0) return e;
	let i = e[r], a = n[0];
	if (!a?.path) return e.map((e) => e.id === t ? {
		...e,
		topic: a?.topic ?? e.topic,
		path: ""
	} : e);
	let o = {
		...a,
		id: i.id,
		enabled: i.enabled,
		timestampMode: i.timestampMode,
		lineStyle: i.lineStyle,
		lineSize: i.lineSize,
		color: i.color || a.color
	};
	return e.map((e, t) => t === r ? o : e);
}
function Kt(e, t, n, r) {
	let i = Y({
		schemaName: n,
		jointStateFields: r
	});
	if (i.length === 0) return e;
	let a = b(r), o = e[0], s = x(e.slice(1), t);
	return [v({
		id: o?.id ?? `series-${Date.now().toString(36)}-0`,
		topic: t,
		path: a,
		label: o?.label ?? i.map((e) => e.label).filter(Boolean).join(", "),
		color: o?.color ?? _(0),
		enabled: o?.enabled ?? !0,
		timestampMode: o?.timestampMode ?? "headerStamp",
		lineStyle: o?.lineStyle ?? "solid",
		lineSize: o?.lineSize ?? 1.5
	}), ...s];
}
//#endregion
//#region src/features/panels/Plot/plotTopicService.ts
function qt(e, t) {
	let n = d(e), r = d(t), i = 1000000000n, a = n + i < r ? n + i : r;
	return u(a);
}
function Jt(e) {
	let t = e.map((e) => e.xAxisPath ?? "").filter((e) => e.trim().length > 0);
	if (t.length === 0) return "";
	let [n] = t;
	return t.every((e) => e === n) ? n : "";
}
function Yt(e) {
	let t = e.filter((e) => e.default !== !1);
	return t.length > 0 ? t : e;
}
function Xt(e) {
	return /(^|\.)([A-Za-z_$][\w$]*\[[^\]]*(?::|-)[^\]]*\])/.exec(e)?.[2] ?? "";
}
function Zt(e) {
	let t = Yt(e);
	if (t.length === 0) return "";
	let n = t.filter((e) => Ae(e.path));
	if (n.length > 1 && new Set(n.map((e) => Xt(e.path)).filter(Boolean)).size === 1 && n.length === t.length) return t.map((e) => e.path).filter(Boolean).join(",");
	let r = n[0];
	return r ? r.path : t.map((e) => e.path).filter(Boolean).join(",");
}
function Qt(e) {
	return Yt(e).map((e) => e.label ?? e.path).filter(Boolean).join(", ");
}
async function $t(e) {
	let { player: t, topic: n, startTime: r, endTime: i } = e;
	if (t.getMessagesInTimeRange && r && i) try {
		return (await t.getMessagesInTimeRange({
			start: r,
			end: qt(r, i),
			topics: [n]
		}))[0]?.message;
	} catch {
		return;
	}
}
function en(e) {
	let { topic: t, schemaName: n, sample: i, existingSeriesId: a, jointStateFields: o } = e;
	if (!t || !n || !It(n)) return { series: [v({
		id: a,
		topic: t || "",
		path: ""
	})] };
	let s = r(n) && (o?.length ?? 0) > 0 ? o : void 0, c = Y({
		schemaName: n,
		sample: i,
		jointStateFields: s
	});
	if (!c[0]) return { series: [v({
		id: a,
		topic: t,
		path: ""
	})] };
	let l = Nt(n);
	return {
		series: [v({
			id: a,
			topic: t,
			path: s ? b(s) : Zt(c),
			xAxisPath: Jt(c),
			label: Qt(c),
			color: _(0)
		})],
		xAxisMode: l
	};
}
async function tn(e) {
	let { topic: t, schemaName: n, player: r, startTime: i, endTime: a, existingSeriesId: o, jointStateFields: s } = e;
	return en({
		topic: t,
		schemaName: n,
		sample: await $t({
			player: r,
			topic: t,
			startTime: i,
			endTime: a
		}),
		existingSeriesId: o,
		jointStateFields: s
	});
}
//#endregion
//#region src/features/panels/Plot/plotConfigActions.ts
function nn(e, t, n) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			...n
		} : e)
	};
}
function rn(e, t) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			topic: "",
			path: ""
		} : e)
	};
}
function an(e, t, n, r) {
	return {
		...e,
		...r && n.xAxisMode ? { xAxisMode: n.xAxisMode } : {},
		series: Gt(e.series, t, n.series)
	};
}
function on(e, t, n) {
	let i = e.series[0]?.topic ?? "", a = i ? t.get(i)?.type : void 0, o = {
		...e,
		jointStateFields: n
	};
	return i && a && r(a) && (o.series = Kt(e.series, i, a, n)), o;
}
function sn(e) {
	return {
		...e,
		series: [...e.series, v({ id: `series-${Date.now().toString(36)}` })]
	};
}
function cn(e, t) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			enabled: !e.enabled
		} : e)
	};
}
function ln(e, t) {
	let n = Ht(e.hiddenLegendKeys, t);
	return n.length === e.hiddenLegendKeys.length ? e : {
		...e,
		hiddenLegendKeys: n
	};
}
//#endregion
//#region src/features/panels/Plot/plotConfigSelectors.ts
function un(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.name, n);
	return t;
}
function dn(e) {
	return e.series.some((e) => e.enabled && e.topic && e.path.trim().length > 0);
}
function fn(e) {
	return e.series.some((e) => e.topic && e.path.trim().length > 0);
}
function pn(e) {
	return e.series[0];
}
function mn(e, t) {
	return Array.from(new Set(e.series.filter((e) => e.topic && e.path.trim().length > 0).map((e) => e.topic).filter((e) => {
		let n = t.get(e);
		return n ? Ft(n) : !1;
	}))).sort();
}
function hn(e, t) {
	let n = pn(e), i = n?.topic ? t.get(n.topic)?.type : void 0;
	return i ? r(i) : !1;
}
function gn(e) {
	let t = e.series.map((e) => `${e.id}|${e.topic}|${e.path}|${e.xAxisPath ?? ""}|${e.timestampMode}`).join(";");
	return JSON.stringify({
		xAxisMode: e.xAxisMode,
		maxPoints: e.maxPoints,
		downsampleMode: e.downsampleMode,
		nonIndexedMaxMessages: e.nonIndexedMaxMessages,
		jointStateFields: e.jointStateFields,
		series: t
	});
}
function _n(e) {
	return e.series.filter((e) => e.enabled).map((e) => e.id).sort().join("|");
}
function vn(e) {
	return new Set(e.series.filter((e) => e.enabled).map((e) => e.id));
}
function yn(e) {
	return e.series.map((e) => `${e.id}|${e.label}|${e.color}|${e.lineStyle}|${e.lineSize}`).join(";");
}
//#endregion
//#region src/features/panels/Plot/plotPanelRuntimeStore.ts
var Z = [], Q = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
function bn(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r?.key !== i?.key || r?.label !== i?.label || r?.color !== i?.color) return !1;
	}
	return !0;
}
function xn(e) {
	let t = $.get(e);
	if (t) for (let e of t) e();
}
function Sn(e, t) {
	bn(Q.get(e) ?? Z, t) || (t.length === 0 ? Q.delete(e) : Q.set(e, t.map((e) => ({ ...e }))), xn(e));
}
function Cn(e) {
	return Q.get(e) ?? Z;
}
function wn(e) {
	Q.has(e) && (Q.delete(e), xn(e));
}
function Tn(e, t) {
	let n = $.get(e);
	n || (n = /* @__PURE__ */ new Set(), $.set(e, n));
	let r = n;
	return r.add(t), () => {
		r.delete(t), r.size === 0 && $.delete(e);
	};
}
function En(e) {
	return te((t) => Tn(e, t), () => Cn(e), () => Z);
}
//#endregion
//#region src/features/panels/Plot/usePlotTopicDetection.ts
function Dn({ player: e, config: t, setConfig: n, topicByName: i, startTime: a, endTime: o }) {
	let [s, c] = ee(!1), l = p(0);
	return {
		detectingTopic: s,
		applyTopicDetection: f(async (s, u) => {
			let d = ++l.current;
			if (!u) {
				n((e) => rn(e, s));
				return;
			}
			c(!0);
			try {
				let c = s === t.series[0]?.id, f = i.get(u)?.type, p = await tn({
					topic: u,
					schemaName: f,
					player: e,
					startTime: a,
					endTime: o,
					existingSeriesId: s,
					jointStateFields: f && r(f) ? t.jointStateFields : void 0
				});
				if (d !== l.current) return;
				n((e) => an(e, s, p, c));
			} finally {
				d === l.current && c(!1);
			}
		}, [
			t.jointStateFields,
			t.series,
			o,
			e,
			n,
			a,
			i
		])
	};
}
//#endregion
export { he as $, Y as A, rt as B, Wt as C, Vt as D, Rt as E, ct as F, Ne as G, $e as H, tt as I, Ae as J, Me as K, nt as L, jt as M, gt as N, Lt as O, _t as P, x as Q, at as R, X as S, zt as T, N as U, M as V, j as W, b as X, C as Y, y as Z, ln as _, un as a, ge as at, $t as b, hn as c, oe as ct, _n as d, de as et, yn as f, on as g, sn as h, En as i, v as it, At as j, It as k, gn as l, ie as lt, pn as m, wn as n, fe as nt, fn as o, le as ot, mn as p, O as q, Sn as r, ue as rt, dn as s, ce as st, Dn as t, pe as tt, vn as u, re as ut, cn as v, Bt as w, Ut as x, nn as y, it as z };
