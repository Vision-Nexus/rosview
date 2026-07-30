import { t as e } from "./createLucideIcon-C0nbxVvC.js";
import { c as t, f as n, g as r, h as i, l as a, m as o } from "./rosMessageTypes-D0Ar3Pyn.js";
import { i as s, o as c, t as l } from "./timeSeries-Al2bAf1m.js";
import { a as u, o as d } from "./time-BoEDgjoH.js";
import { useCallback as f, useRef as ee, useState as te, useSyncExternalStore as ne } from "react";
var re = e("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), ie = e("ChevronUp", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), ae = e("EyeOff", [
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
]), oe = e("Eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), se = e("RotateCcw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), ce = [
	"timestamp",
	"index",
	"custom",
	"currentCustom"
], le = [
	"position",
	"velocity",
	"effort"
], ue = ["solid", "dashed"], de = 2e5, fe = 2e4, p = [
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
], pe = p;
function m(e) {
	return p[e % p.length] ?? p[0];
}
function h(e = {}) {
	let t = e.id ?? `series-${Math.random().toString(36).slice(2, 10)}`, n = e.color ? -1 : 0;
	return {
		id: t,
		topic: "",
		path: "",
		xAxisPath: "",
		label: "",
		color: e.color ?? m(n),
		enabled: !0,
		timestampMode: "headerStamp",
		lineStyle: "solid",
		lineSize: 1.5,
		...e
	};
}
var me = () => ({
	series: [h()],
	xAxisMode: "timestamp",
	maxPoints: 2e4,
	followingViewWidthSec: 0,
	syncX: !1,
	downsampleMode: "minMaxLast",
	nonIndexedMaxMessages: fe,
	jointStateFields: ["position"],
	hiddenLegendKeys: []
}), he = /* @__PURE__ */ new Set([
	"position[:]",
	"velocity[:]",
	"effort[:]"
]);
function ge(e) {
	return e.filter(Boolean).join(",");
}
function g(e) {
	return ge(e.map((e) => `${e}[:]`));
}
function _e(e, t) {
	return e.filter((e) => e.topic !== t || !he.has(e.path));
}
//#endregion
//#region src/features/panels/Plot/messagePath.ts
var _ = /^([A-Za-z_$][\w$]*)(?:\[([^\]]*)\])?$/, ve = {
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
function v(e) {
	let t = e.trim();
	return t ? /[,\s]/.test(t) ? t.split(",").flatMap((e) => e.trim().split(/\s+/)).map((e) => e.trim()).filter(Boolean) : [t] : [];
}
function y(e) {
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
function b(e) {
	return !!(Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView));
}
function ye(e) {
	if (!e || typeof e != "object") return [];
	let t = e.name;
	if (!b(t)) return [];
	let n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		n.push(typeof r == "string" && r.length > 0 ? r : `${e}`);
	}
	return n;
}
function x(e, t, n) {
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
function Ce(e) {
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
function we(e) {
	return e ? e.split(".").map((e) => e.trim()).filter(Boolean).map((e) => {
		let t = _.exec(e);
		if (!t) throw Error(`Unsupported plot path segment: ${e}`);
		return {
			field: t[1] ?? "",
			selector: Ce(t[2])
		};
	}) : [];
}
function Te(e, t) {
	let n = e < 0 ? t + e : e;
	return n >= 0 && n < t ? n : void 0;
}
function Ee(e, t) {
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
function De(e, t, n, r) {
	if (t.kind === "none") return [{
		key: r,
		label: r,
		value: e
	}];
	if (!b(e)) return [];
	if (t.kind === "index") {
		let n = Te(t.index, e.length);
		return n == null ? [] : [{
			key: `${r}[${n}]`,
			label: `${r}[${n}]`,
			value: e[n]
		}];
	}
	if (t.kind === "name") {
		let i = Array.from({ length: e.length }, (t, r) => x(e, r, n) ?? `${r}`).indexOf(t.name);
		return i < 0 || i >= e.length ? [] : [{
			key: `${r}[${t.name}]`,
			label: `${r}[${i}] (${t.name})`,
			value: e[i]
		}];
	}
	let i = Ee(t, e.length);
	if (!i) return [];
	let { startIdx: a, endIdx: o } = i, s = [];
	for (let t = a; t <= o; t++) {
		let i = x(e, t, n), a = i ? `${r}[${t}] (${i})` : `${r}[${t}]`, o = i ? `${r}[${i}]` : `${r}[${t}]`;
		s.push({
			key: o,
			label: a,
			value: e[t]
		});
	}
	return s;
}
function Oe(e) {
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
function ke(e, t) {
	let n = e;
	for (let e of t) {
		if (e === "derivative") continue;
		let t = ve[e];
		if (!t || (n = t(n), !Number.isFinite(n))) return;
	}
	return n;
}
function Ae(e) {
	return v(e).some((e) => y(e).modifiers.includes("derivative"));
}
function S(e) {
	for (let t of v(e)) {
		let { sourcePath: e } = y(t);
		if (!e) continue;
		let n = e.split(".");
		for (let e of n) {
			let t = _.exec(e);
			if (!t) continue;
			let n = t[2];
			if (n != null && Ce(n).kind === "slice") return !0;
		}
	}
	return !1;
}
function C(e, t) {
	let n = y(t);
	if (!n.sourcePath) return [];
	let r = [{
		key: "",
		label: "",
		value: e
	}], i = we(n.sourcePath);
	for (let t of i) {
		let n = [];
		for (let i of r) {
			if (!i.value || typeof i.value != "object") continue;
			let r = i.value[t.field];
			for (let a of De(r, t.selector, e, t.field)) {
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
		let t = Oe(e.value);
		if (t == null) return [];
		let r = ke(t, n.modifiers);
		return r == null ? [] : [{
			key: e.key,
			label: e.label || e.key,
			value: r
		}];
	});
}
function w(e, t) {
	let n = v(t);
	if (n.length <= 1) return C(e, n[0] ?? t);
	let r = [], i = /* @__PURE__ */ new Set();
	for (let t of n) for (let n of C(e, t)) {
		let e = `${t}|${n.key}`;
		i.has(e) || (i.add(e), r.push(n));
	}
	return r;
}
//#endregion
//#region src/features/panels/Plot/plotWarnings.ts
function je(e) {
	switch (e.kind) {
		case "noNumericValues": return `noNumeric:${e.topic}:${e.path}`;
		case "missingXPath": return `missingX:${e.topic}:${e.path}`;
		case "mismatchedXY": return `mismatch:${e.topic}:${e.xPath}:${e.yPath}`;
		default: return e.kind;
	}
}
function Me(e, t) {
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
var Ne = ["position"], Pe = {
	detect(e) {
		return (e.jointStateFields?.length ? e.jointStateFields : Ne).map((e) => ({
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
}, T = "__laser_scan_angle__", Fe = {
	detect(e) {
		return (e.schemaName?.toLowerCase() ?? "").includes("multiecho") ? [{
			path: "ranges[0][:]",
			label: "ranges[0]",
			xAxisPath: T
		}] : [{
			path: "ranges[:]",
			label: "ranges",
			xAxisPath: T
		}];
	},
	validate(e) {
		if (!e || typeof e != "object") return !1;
		let t = e.ranges;
		return Array.isArray(t) && t.length > 0;
	}
};
function Ie() {
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
function Le() {
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
var Re = { detect(e) {
	let t = e.schemaName?.toLowerCase().replace(/\/msg\//, "/") ?? "";
	return t.endsWith("/imu") ? Ie() : t.endsWith("/magneticfield") ? Le() : [
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
} }, ze = { detect(e) {
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
} }, Be = { detect() {
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
} }, Ve = { detect() {
	return [{
		path: "data[:]",
		label: "data"
	}];
} }, He = { detect(e) {
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
} }, Ue = { detect() {
	return [{
		path: "percentage",
		label: "percentage"
	}, {
		path: "voltage",
		label: "voltage"
	}];
} }, We = { detect(e) {
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
} }, Ge = { detect(e) {
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
} }, Ke = { detect(e) {
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
} }, qe = { detect() {
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
} }, Je = {
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
function Ye(e, t) {
	return e ? t.filter((t) => t.xAxisPath === "__laser_scan_angle__" ? Fe.validate?.(e) ?? !1 : w(e, t.path).length > 0) : t;
}
//#endregion
//#region src/features/panels/Plot/plotEventIndex.ts
function E(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.topic);
		e ? e.push(n) : t.set(n.topic, [n]);
	}
	return t;
}
function Xe(e, t) {
	let n = e.get(t);
	if (!(!n || n.length === 0)) return n[n.length - 1];
}
//#endregion
//#region src/features/panels/Plot/plotPointCollector.ts
function D(e) {
	return e.enabled && e.topic.length > 0 && e.path.trim().length > 0;
}
function Ze(e) {
	return e.topic.length > 0 && e.path.trim().length > 0;
}
function O(e) {
	return Math.round(e * 1e3) / 1e3;
}
function Qe(e, t) {
	if (t && t !== e.path) return t;
	if (e.label.trim()) return e.label.trim();
	let n = t || e.path || "value";
	return e.topic ? `${e.topic} · ${n}` : n;
}
function k(e, t) {
	if (t === "__laser_scan_angle__") {
		if (!e || typeof e != "object") return [];
		let t = e, n = t.ranges, r = typeof t.angle_min == "number" ? t.angle_min : 0, i = typeof t.angle_increment == "number" ? t.angle_increment : 0;
		return Array.isArray(n) ? n.map((e, t) => ({
			key: `angle[${t}]`,
			label: `angle[${t}]`,
			value: r + t * i
		})) : [];
	}
	return w(e, t);
}
function A(e, t, n, r, i, a) {
	let o = `${t.id}:${n}`, s = e.get(o);
	s || (s = {
		series: {
			key: o,
			label: Qe(t, r),
			color: t.color,
			lineStyle: t.lineStyle,
			lineSize: t.lineSize,
			enabled: t.enabled
		},
		points: [],
		derivative: Ae(t.path),
		seriesConfigId: t.id
	}, e.set(o, s)), s.points.push({
		x: i,
		y: a
	});
}
function $e(e, t) {
	let n = new Map(t.series.map((e) => [e.id, e]));
	for (let t of e) {
		let e = n.get(t.seriesConfigId);
		e && (t.series.lineStyle = e.lineStyle, t.series.lineSize = e.lineSize, e.color && (t.series.color = e.color));
	}
}
function et(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.values()) {
		let e = t.get(n.seriesConfigId) ?? [];
		e.push(n), t.set(n.seriesConfigId, e);
	}
	let n = 0;
	for (let e of t.values()) {
		if (e.length === 1) {
			let t = e[0];
			t.series.color || (t.series.color = m(n++));
			continue;
		}
		for (let t of e) t.series.color = m(n++);
	}
}
function tt(e, t, n, r, i) {
	let a = /* @__PURE__ */ new Map(), o = E(e), l = t.series.filter(D);
	for (let e of l) {
		let t = o.get(e.topic) ?? [], l = !1;
		for (let n of t) {
			let t = O(c(s(n, e.timestampMode, r, i).time)), o = w(n.message, e.path);
			for (let n of o) A(a, e, n.key, n.label, t, n.value), l = !0;
		}
		t.length > 0 && !l && n.push({
			kind: "noNumericValues",
			topic: e.topic,
			path: e.path
		});
	}
	return a;
}
function nt(e, t) {
	let n = /* @__PURE__ */ new Map(), r = E(e);
	for (let e of t.series.filter(D)) {
		let t = Xe(r, e.topic);
		t && w(t.message, e.path).forEach((t, r) => {
			A(n, e, t.key || `${r}`, t.label, r, t.value);
		});
	}
	return n;
}
function rt(e, t, n, r) {
	let i = /* @__PURE__ */ new Map(), a = E(e);
	for (let e of t.series.filter(D)) {
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
			let a = k(n.message, t), o = w(n.message, e.path), s = Math.min(a.length, o.length);
			a.length !== o.length && r.push({
				kind: "mismatchedXY",
				topic: e.topic,
				xPath: t,
				yPath: e.path
			});
			let c = a.length > 1 && o.length > 1;
			for (let t = 0; t < s; t++) {
				let n = a[t]?.value, r = o[t]?.value;
				n == null || r == null || A(i, e, c ? "value" : o[t]?.key ?? `${t}`, c ? "" : o[t]?.label ?? `${t}`, n, r);
			}
		}
	}
	return i;
}
//#endregion
//#region src/features/panels/Plot/plotAlign.ts
function it(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = O(n.x);
		t.set(e, n.y);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([e, t]) => ({
		x: e,
		y: t
	}));
}
function at(e) {
	let t = it(e).filter((e) => e.y != null), n = [];
	for (let e = 1; e < t.length; e++) {
		let r = t[e - 1], i = t[e], a = i.x - r.x;
		n.push({
			x: i.x,
			y: a === 0 ? null : (i.y - r.y) / a
		});
	}
	return n;
}
function ot(e, t, n) {
	if (e.length <= n) return [e, t];
	let r = l(e.map((e, n) => ({
		x: e,
		y: t.reduce((e, t) => e + (t[n] == null ? 0 : 1), 0)
	})), n), i = [...new Set(r.map((e) => e.x))].sort((e, t) => e - t), a = new Map(e.map((e, t) => [e, t]));
	return [i, t.map((e) => i.map((t) => {
		let n = a.get(t);
		return n == null ? null : e[n] ?? null;
	}))];
}
function st(e, t, n) {
	if (e.length === 0) return {
		data: [[]],
		sampleRatio: 1
	};
	let r = e.map((e) => {
		let r = e.derivative ? at(e.points) : it(e.points), i = r;
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
			let e = l(i.map((e, t) => ({
				x: e,
				y: o[t] ?? null
			})), t);
			i = e.map((e) => e.x), o = e.map((e) => e.y ?? null);
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
	n && s.length > t && ([s, c] = ot(s, c, t));
	let u = a > 0 ? Math.min(1, s.length / a) : 1;
	return {
		data: [s, ...c],
		sampleRatio: u
	};
}
//#endregion
//#region src/core/analysis/rangeQueryCache.ts
var ct = 24, lt = 15e5, ut = class {
	#e = /* @__PURE__ */ new Map();
	#t = ct;
	#n = lt;
	setLimits(e, t) {
		this.#t = Math.max(1, Math.floor(e)), this.#n = Math.max(1e3, Math.floor(t)), this.#r();
	}
	getOrCreate(e, t, n = {}) {
		if (!e.getMessagesInTimeRange) return Promise.resolve([]);
		let r = ft(t, n), i = Date.now(), a = this.#e.get(r);
		if (a) return a.lastAccessAt = i, a.value;
		let o = e.getMessagesInTimeRange(t).catch((e) => {
			throw this.#e.delete(r), e;
		}), s = {
			key: r,
			value: o,
			createdAt: i,
			lastAccessAt: i,
			sizeEstimate: dt(t, n)
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
function dt(e, t) {
	let n = e.end.sec + e.end.nsec / 1e9 - (e.start.sec + e.start.nsec / 1e9), r = Math.max(1, e.topics.length), i = Math.max(1, t.fields?.length ?? 1);
	return Math.max(1, Math.floor(n * 1e3 * r * i));
}
function ft(e, t) {
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
var pt = new ut(), mt = 24;
function j(e, t) {
	let n = d(e), r = d(t);
	if (r <= n) return [{
		start: e,
		end: t
	}];
	let i = r - n, a = Number(i) < 1e10 ? 1 : mt, o = i / BigInt(a), s = [], c = n;
	for (let e = 0; e < a; e++) {
		let t = e === a - 1 ? r : c + o;
		s.push({
			start: u(c),
			end: u(t)
		}), c = t + 1n;
	}
	return s;
}
function M(e) {
	let t = d(e.receiveTime).toString(), n = e.publishTime ? d(e.publishTime).toString() : "";
	return `${e.topic}|${e.schemaName}|${t}|${n}`;
}
async function N(e, t) {
	return e.getMessagesInTimeRange ? pt.getOrCreate(e, t) : [];
}
function P(e) {
	if (e?.aborted) throw new DOMException("Plot range read aborted", "AbortError");
}
function F(e) {
	return e.sort((e, t) => {
		let n = d(e.receiveTime) - d(t.receiveTime);
		return n < 0n ? -1 : n > 0n ? 1 : e.topic.localeCompare(t.topic);
	});
}
function I() {
	return new Promise((e) => globalThis.setTimeout(e, 0));
}
async function ht({ player: e, start: t, end: n, topics: r, signal: i, onProgress: a, maxMessages: o }) {
	if (r.length === 0 || !e.getMessagesInTimeRange) return [];
	let s = Array.from(new Set(r)).sort(), c = j(t, n), l = /* @__PURE__ */ new Map(), u = o != null && o > 0 ? o : void 0;
	for (let t = 0; t < c.length && (P(i), !(u != null && l.size >= u)); t++) {
		let n = c[t], r = await N(e, {
			start: n.start,
			end: n.end,
			topics: s
		});
		for (let e of r) if (l.set(M(e), e), u != null && l.size >= u) break;
		a?.({
			completed: t + 1,
			total: c.length,
			messages: l.size
		}), await I();
	}
	return F([...l.values()]);
}
function L(e, t, n) {
	let r = [];
	for (let i of t) {
		if (n != null && e.size >= n) break;
		let t = M(i);
		e.has(t) || (e.set(t, i), r.push(i));
	}
	return r;
}
async function gt({ player: e, start: t, end: n, topics: r, signal: i, onProgress: a, onBatch: o, maxMessages: s }) {
	if (r.length === 0 || !e.getMessagesInTimeRange && !e.streamMessagesInTimeRange) return [];
	let c = Array.from(new Set(r)).sort(), l = j(t, n), u = /* @__PURE__ */ new Map(), d = s != null && s > 0 ? s : void 0;
	for (let t = 0; t < l.length && (P(i), !(d != null && u.size >= d)); t++) {
		let n = l[t];
		if (e.streamMessagesInTimeRange) for await (let r of e.streamMessagesInTimeRange({
			start: n.start,
			end: n.end,
			topics: c,
			maxMessages: d == null ? void 0 : d - u.size
		})) {
			P(i);
			let e = L(u, r, d), n = {
				completed: t,
				total: l.length,
				messages: u.size
			};
			if (e.length > 0 && o?.({
				messages: e,
				progress: n
			}), a?.(n), d != null && u.size >= d) break;
			await I();
		}
		else {
			let r = L(u, await N(e, {
				start: n.start,
				end: n.end,
				topics: c
			}), d), i = {
				completed: t + 1,
				total: l.length,
				messages: u.size
			};
			r.length > 0 && o?.({
				messages: r,
				progress: i
			}), a?.(i), await I();
			continue;
		}
		let r = {
			completed: t + 1,
			total: l.length,
			messages: u.size
		};
		a?.(r), P(i), await I();
	}
	return F([...u.values()]);
}
//#endregion
//#region src/features/panels/Plot/fieldDiscovery.ts
var _t = 8, vt = 120, yt = 512, bt = /* @__PURE__ */ new Set(["header.stamp", "header.frame_id"]), xt = /* @__PURE__ */ new Set([
	"frame_id",
	"encoding",
	"format",
	"data_offset"
]), St = /* @__PURE__ */ new Set([
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
function Ct(e) {
	return Array.isArray(e) ? !0 : ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function R(e) {
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e == "bigint" || typeof e == "boolean") return !0;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length > 0 && Number.isFinite(Number(t));
	}
	return !1;
}
function z(e) {
	return e ? e.split(".").length : 0;
}
function wt(e) {
	if (bt.has(e)) return !0;
	let t = e.split(".").at(-1) ?? "";
	return xt.has(t);
}
function B(e) {
	let t = e.toLowerCase().split("."), n = 0;
	for (let e of t) St.has(e) && (n += 4);
	return t.some((e) => e === "position") && (n += 8), t.some((e) => e === "linear" || e === "angular") && (n += 5), t.at(-1) === "x" && (n += 3), t.at(-1) === "y" && (n += 2), t.at(-1) === "z" && (n += 1), n;
}
function V(e) {
	return B(e) > 0;
}
function H(e, t, n) {
	e.length >= n || e.push(t);
}
function U(e, t, n, r) {
	if (!(!t || n.length >= r.maxFields || wt(t))) {
		if (R(e)) {
			H(n, {
				path: t,
				label: t,
				kind: "scalar",
				depth: z(t),
				recommended: V(t)
			}, r.maxFields);
			return;
		}
		if (Ct(e)) {
			let i = Math.min(e.length, r.maxArrayLength);
			if (i === 0) return;
			let a = 0;
			for (let t = 0; t < i; t++) R(e[t]) && a++;
			a === i && H(n, {
				path: `${t}[:]`,
				label: t,
				kind: "array",
				depth: z(t),
				recommended: V(t)
			}, r.maxFields);
			return;
		}
		if (!(!e || typeof e != "object" || z(t) >= r.maxDepth)) for (let [i, a] of Object.entries(e)) {
			if (n.length >= r.maxFields) return;
			U(a, `${t}.${i}`, n, r);
		}
	}
}
function W(e, t = {}) {
	if (!e || typeof e != "object") return [];
	let n = {
		maxDepth: t.maxDepth ?? _t,
		maxFields: t.maxFields ?? vt,
		maxArrayLength: t.maxArrayLength ?? yt
	}, r = [];
	for (let [t, i] of Object.entries(e)) if (U(i, t, r, n), r.length >= n.maxFields) break;
	return r.sort((e, t) => {
		let n = Number(t.recommended) - Number(e.recommended);
		if (n !== 0) return n;
		let r = B(t.path) - B(e.path);
		return r === 0 ? e.path.localeCompare(t.path) : r;
	});
}
//#endregion
//#region src/features/panels/Plot/schemaRegistry/plotSchemaRegistry.ts
var G = [
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
], Tt = new Map(G.map((e) => [e.schemaSuffix, e]));
function Et(e) {
	return r(e).toLowerCase();
}
function K(e) {
	let t = Et(e);
	return Tt.get(t);
}
function Dt(e) {
	return K(e)?.defaultPriority ?? 0;
}
function Ot() {
	return G;
}
//#endregion
//#region src/features/panels/Plot/autoDetect.ts
var kt = {
	jointState: Pe,
	vector3Group: Re,
	scalar: ze,
	scalarGroup: Be,
	multiArray: Ve,
	numericArray: He,
	laserScan: Fe,
	batteryState: Ue,
	twist: We,
	pose: Ge,
	wrench: Ke,
	odometry: qe,
	tfMessage: Je
};
function q(e) {
	let { schemaName: t, sample: n, jointStateFields: r } = e;
	if (!t) return [];
	let i = K(t);
	if (!i) return W(n).map((e) => ({
		path: e.path,
		label: e.label
	}));
	let a = kt[i.adapterId], o = {
		schemaName: t,
		sample: n,
		jointStateFields: r
	}, s = a.detect(o), c = Ye(n, s);
	if (c.length > 0) return c;
	if (!n) return s;
	let l = W(n).map((e) => ({
		path: e.path,
		label: e.label
	}));
	return l.length > 0 ? l : s;
}
function At(e) {
	if (e) return K(e)?.preferredXAxisMode;
}
//#endregion
//#region src/features/panels/Plot/plottableSchemas.ts
function J(e) {
	if (i(e) || o(e) || t(e) || a(e)) return !0;
	let n = e.toLowerCase().replace(/\/msg\//, "/");
	return n.includes("/pointcloud") || n.includes("/camera_info") || n.includes("/compressedimage") || n.endsWith("/image") || n.includes("/string") || n.endsWith("/empty");
}
function jt(e) {
	return !J(e.type);
}
function Mt(e) {
	return !J(e);
}
function Nt(e) {
	return e.filter(jt);
}
//#endregion
//#region src/features/panels/Plot/plotLegendVisibility.ts
function Y(e, t) {
	return !e.includes(t);
}
function Pt(e, t, n) {
	return n ? e.filter((e) => e !== t) : e.includes(t) ? [...e] : [...e, t];
}
function Ft(e, t, n) {
	let r = new Set(t);
	if (n) return e.filter((e) => !r.has(e));
	let i = new Set(e);
	for (let e of t) i.add(e);
	return [...i];
}
function It(e, t, n) {
	let r = new Set(t), i = new Set(e.filter((e) => !r.has(e)));
	for (let e of t) e !== n && i.add(e);
	return [...i];
}
function Lt(e, t) {
	return e.filter((e) => Y(t, e.key)).length;
}
function Rt(e, t) {
	let n = new Set(t);
	return e.filter((e) => n.has(e));
}
function zt(e, t) {
	let n = new Set(t), r = /* @__PURE__ */ new Set();
	return e.forEach((e, t) => {
		n.has(e.key) && r.add(t);
	}), r;
}
function Bt(e, t) {
	if (e.length === 0) return "all";
	let n = e.filter((e) => Y(t, e.key)).length;
	return n === 0 ? "none" : n === e.length ? "all" : "partial";
}
//#endregion
//#region src/features/panels/Plot/topicPaths.ts
function Vt(e, t, n) {
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
function Ht(e, t, n, r) {
	let i = q({
		schemaName: n,
		jointStateFields: r
	});
	if (i.length === 0) return e;
	let a = g(r), o = e[0], s = _e(e.slice(1), t);
	return [h({
		id: o?.id ?? `series-${Date.now().toString(36)}-0`,
		topic: t,
		path: a,
		label: o?.label ?? i.map((e) => e.label).filter(Boolean).join(", "),
		color: o?.color ?? m(0),
		enabled: o?.enabled ?? !0,
		timestampMode: o?.timestampMode ?? "headerStamp",
		lineStyle: o?.lineStyle ?? "solid",
		lineSize: o?.lineSize ?? 1.5
	}), ...s];
}
//#endregion
//#region src/features/panels/Plot/plotTopicService.ts
function Ut(e, t) {
	let n = d(e), r = d(t), i = 1000000000n;
	return u(n + i < r ? n + i : r);
}
function Wt(e) {
	let t = e.map((e) => e.xAxisPath ?? "").filter((e) => e.trim().length > 0);
	if (t.length === 0) return "";
	let [n] = t;
	return t.every((e) => e === n) ? n : "";
}
function Gt(e) {
	let t = e.filter((e) => e.default !== !1);
	return t.length > 0 ? t : e;
}
function Kt(e) {
	return /(^|\.)([A-Za-z_$][\w$]*\[[^\]]*(?::|-)[^\]]*\])/.exec(e)?.[2] ?? "";
}
function qt(e) {
	let t = Gt(e);
	if (t.length === 0) return "";
	let n = t.filter((e) => S(e.path));
	if (n.length > 1 && new Set(n.map((e) => Kt(e.path)).filter(Boolean)).size === 1 && n.length === t.length) return t.map((e) => e.path).filter(Boolean).join(",");
	let r = n[0];
	return r ? r.path : t.map((e) => e.path).filter(Boolean).join(",");
}
function Jt(e) {
	return Gt(e).map((e) => e.label ?? e.path).filter(Boolean).join(", ");
}
async function Yt(e) {
	let { player: t, topic: n, startTime: r, endTime: i } = e;
	if (!(!t.getMessagesInTimeRange || !r || !i)) try {
		return (await t.getMessagesInTimeRange({
			start: r,
			end: Ut(r, i),
			topics: [n]
		}))[0]?.message;
	} catch {
		return;
	}
}
function Xt(e) {
	let { topic: t, schemaName: r, sample: i, existingSeriesId: a, jointStateFields: o } = e;
	if (!t || !r || !Mt(r)) return { series: [h({
		id: a,
		topic: t || "",
		path: ""
	})] };
	let s = n(r) && (o?.length ?? 0) > 0 ? o : void 0, c = q({
		schemaName: r,
		sample: i,
		jointStateFields: s
	});
	if (!c[0]) return { series: [h({
		id: a,
		topic: t,
		path: ""
	})] };
	let l = At(r);
	return {
		series: [h({
			id: a,
			topic: t,
			path: s ? g(s) : qt(c),
			xAxisPath: Wt(c),
			label: Jt(c),
			color: m(0)
		})],
		xAxisMode: l
	};
}
async function Zt(e) {
	let { topic: t, schemaName: n, player: r, startTime: i, endTime: a, existingSeriesId: o, jointStateFields: s } = e;
	return Xt({
		topic: t,
		schemaName: n,
		sample: await Yt({
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
function Qt(e, t, n) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			...n
		} : e)
	};
}
function $t(e, t) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			topic: "",
			path: ""
		} : e)
	};
}
function en(e, t, n, r) {
	return {
		...e,
		...r && n.xAxisMode ? { xAxisMode: n.xAxisMode } : {},
		series: Vt(e.series, t, n.series)
	};
}
function tn(e, t, r) {
	let i = e.series[0]?.topic ?? "", a = i ? t.get(i)?.type : void 0, o = {
		...e,
		jointStateFields: r
	};
	return i && a && n(a) && (o.series = Ht(e.series, i, a, r)), o;
}
function nn(e) {
	return {
		...e,
		series: [...e.series, h({ id: `series-${Date.now().toString(36)}` })]
	};
}
function rn(e, t) {
	return {
		...e,
		series: e.series.map((e) => e.id === t ? {
			...e,
			enabled: !e.enabled
		} : e)
	};
}
function an(e, t) {
	let n = Rt(e.hiddenLegendKeys, t);
	return n.length === e.hiddenLegendKeys.length ? e : {
		...e,
		hiddenLegendKeys: n
	};
}
//#endregion
//#region src/features/panels/Plot/plotConfigSelectors.ts
function on(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.name, n);
	return t;
}
function sn(e) {
	return e.series.some((e) => e.enabled && e.topic && e.path.trim().length > 0);
}
function cn(e) {
	return e.series.some((e) => e.topic && e.path.trim().length > 0);
}
function X(e) {
	return e.series[0];
}
function ln(e, t) {
	return Array.from(new Set(e.series.filter((e) => e.topic && e.path.trim().length > 0).map((e) => e.topic).filter((e) => {
		let n = t.get(e);
		return n ? jt(n) : !1;
	}))).sort();
}
function un(e, t) {
	let r = X(e), i = r?.topic ? t.get(r.topic)?.type : void 0;
	return i ? n(i) : !1;
}
function dn(e) {
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
function fn(e) {
	return e.series.filter((e) => e.enabled).map((e) => e.id).sort().join("|");
}
function pn(e) {
	return new Set(e.series.filter((e) => e.enabled).map((e) => e.id));
}
function mn(e) {
	return e.series.map((e) => `${e.id}|${e.label}|${e.color}|${e.lineStyle}|${e.lineSize}`).join(";");
}
//#endregion
//#region src/features/panels/Plot/plotPanelRuntimeStore.ts
var Z = [], Q = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
function hn(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r?.key !== i?.key || r?.label !== i?.label || r?.color !== i?.color) return !1;
	}
	return !0;
}
function gn(e) {
	let t = $.get(e);
	if (t) for (let e of t) e();
}
function _n(e, t) {
	hn(Q.get(e) ?? Z, t) || (t.length === 0 ? Q.delete(e) : Q.set(e, t.map((e) => ({ ...e }))), gn(e));
}
function vn(e) {
	return Q.get(e) ?? Z;
}
function yn(e) {
	Q.has(e) && (Q.delete(e), gn(e));
}
function bn(e, t) {
	let n = $.get(e);
	n || (n = /* @__PURE__ */ new Set(), $.set(e, n));
	let r = n;
	return r.add(t), () => {
		r.delete(t), r.size === 0 && $.delete(e);
	};
}
function xn(e) {
	return ne((t) => bn(e, t), () => vn(e), () => Z);
}
//#endregion
//#region src/features/panels/Plot/usePlotTopicDetection.ts
function Sn({ player: e, config: t, setConfig: r, topicByName: i, startTime: a, endTime: o }) {
	let [s, c] = te(!1), l = ee(0);
	return {
		detectingTopic: s,
		applyTopicDetection: f(async (s, u) => {
			let d = ++l.current;
			if (!u) {
				r((e) => $t(e, s));
				return;
			}
			c(!0);
			try {
				let c = s === t.series[0]?.id, f = i.get(u)?.type, ee = await Zt({
					topic: u,
					schemaName: f,
					player: e,
					startTime: a,
					endTime: o,
					existingSeriesId: s,
					jointStateFields: f && n(f) ? t.jointStateFields : void 0
				});
				if (d !== l.current) return;
				r((e) => en(e, s, ee, c));
			} finally {
				d === l.current && c(!1);
			}
		}, [
			t.jointStateFields,
			t.series,
			o,
			e,
			r,
			a,
			i
		])
	};
}
//#endregion
export { pe as $, q as A, tt as B, Bt as C, Lt as D, Pt as E, st as F, Me as G, Ze as H, $e as I, S as J, je as K, et as L, Ot as M, ht as N, Nt as O, gt as P, _e as Q, rt as R, Y as S, Ft as T, A as U, k as V, O as W, g as X, v as Y, ge as Z, an as _, on as a, me as at, Yt as b, un as c, ae as ct, fn as d, le as et, mn as f, tn as g, nn as h, xn as i, h as it, Dt as j, Mt as k, dn as l, ie as lt, X as m, yn as n, ue as nt, cn as o, se as ot, ln as p, w as q, _n as r, ce as rt, sn as s, oe as st, Sn as t, de as tt, pn as u, re as ut, rn as v, It as w, zt as x, Qt as y, nt as z };
