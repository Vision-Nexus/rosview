import { f as e, i as t, t as n } from "./rafScheduler-D3aT-VUS.js";
import { D as r, E as i, F as a, G as o, H as s, I as c, K as l, L as u, O as d, P as f, R as p, S as m, T as h, U as g, V as _, W as v, _ as y, a as b, c as x, ct as S, d as C, et as w, f as T, g as E, i as D, j as O, l as ee, lt as k, m as te, n as ne, o as A, ot as re, p as ie, q as j, r as ae, s as oe, st as M, t as se, u as N, ut as P, w as F, x as ce, z as I } from "./usePlotTopicDetection-CxdeJrHu.js";
import { t as le } from "./TopicQuickPicker-djRSFqzq.js";
import { t as ue } from "./shallow-DHPf4mbW.js";
import { i as de, o as L } from "./timeSeries-Al2bAf1m.js";
import { n as fe } from "./time-BoEDgjoH.js";
import { t as R } from "./uPlot.min-BIrX3Oxu.js";
import { useCallback as z, useEffect as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as pe, jsx as W, jsxs as G } from "react/jsx-runtime";
//#region src/features/panels/Plot/pickDefaultPlotTopic.ts
function me(e) {
	let t = d(e);
	return t.length === 0 ? "" : [...t].sort((e, t) => {
		let n = O(t.type) - O(e.type);
		return n === 0 ? e.name.localeCompare(t.name) : n;
	})[0]?.name ?? "";
}
//#endregion
//#region src/features/panels/Plot/plotChart.ts
function K(e, t) {
	if (typeof document > "u") return t;
	let n = getComputedStyle(document.documentElement).getPropertyValue(e).trim();
	return n ? n.startsWith("hsl") ? n : `hsl(${n})` : t;
}
function he() {
	let e = K("--muted-foreground", "#888888");
	return {
		axisStroke: e,
		gridStroke: e.startsWith("hsl") ? e.replace(")", " / 0.12)").replace("hsl(", "hsla(") : `hsl(${e} / 0.12)`,
		playheadStroke: K("--primary", "#f59e0b"),
		cursorLabelText: K("--popover-foreground", "#f8fafc"),
		cursorLabelBg: K("--popover", "hsl(222 47% 11%)"),
		cursorLabelBorder: K("--border", "hsl(217 33% 17%)")
	};
}
function ge(e) {
	let t = BigInt(Math.round(e * 1e9));
	return {
		sec: Number(t / 1000000000n),
		nsec: Number(t % 1000000000n)
	};
}
function q(e) {
	if (!Number.isFinite(e)) return "";
	let t = Math.abs(e);
	return t >= 1e4 ? e.toFixed(0) : t >= 100 ? e.toFixed(1) : t >= 1 ? e.toFixed(3) : t >= .001 ? e.toFixed(4) : e.toExponential(2);
}
function J(e, t, n) {
	if (!Number.isFinite(e)) return "";
	if (t === "timestamp") {
		if (n) {
			let t = BigInt(Math.round((e - L(n)) * 1e9));
			return fe(t < 0n ? 0n : t);
		}
		return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3
		});
	}
	return Number.isInteger(e) ? String(e) : e.toFixed(3);
}
function Y(e, t, n = 1e-6) {
	let r = Math.min(e.min, e.max - n), i = Math.max(e.max, r + n);
	if (!t) return {
		min: r,
		max: i
	};
	let a = t.max - t.min, o = i - r;
	return !Number.isFinite(a) || a <= 0 || o >= a ? { ...t } : (r < t.min && (i += t.min - r, r = t.min), i > t.max && (r -= i - t.max, i = t.max), {
		min: Math.max(t.min, r),
		max: Math.min(t.max, i)
	});
}
function _e(e, t, n, r) {
	let i = e.max - e.min;
	if (!Number.isFinite(i) || i <= 0 || !Number.isFinite(t)) return e;
	let a = Math.min(100, Math.max(.01, n)), o = Math.min(1, Math.max(0, (t - e.min) / i)), s = i * a;
	return Y({
		min: t - s * o,
		max: t + s * (1 - o)
	}, r);
}
function ve(e, t, n, r) {
	let i = e.max - e.min;
	if (!Number.isFinite(i) || i <= 0 || !Number.isFinite(t) || n <= 0) return e;
	let a = -(t / n) * i;
	return Y({
		min: e.min + a,
		max: e.max + a
	}, r);
}
function ye(e, t, n) {
	return e.map((e) => J(e, t, n));
}
var be = [
	.001,
	.002,
	.005,
	.01,
	.02,
	.05,
	.1,
	.2,
	.5,
	1,
	2,
	5,
	10,
	15,
	30,
	60,
	120,
	300,
	600,
	900,
	1800,
	3600,
	7200,
	14400,
	21600,
	43200
];
function xe(e) {
	if (!Number.isFinite(e) || e <= 0) return 1;
	for (let t of be) if (t >= e) return t;
	return 10 ** Math.ceil(Math.log10(e));
}
function Se(e, t, n, r, i) {
	let a = e - n, o = t - n;
	if (!Number.isFinite(a) || !Number.isFinite(o) || o <= a) return [e];
	let s = Math.max(2, Math.floor(i / Math.max(r, 30))), c = xe((o - a) / s), l = [], u = Math.ceil(a / c - 1e-12), d = Math.floor(o / c + 1e-12);
	for (let e = u; e <= d; e++) {
		let t = e * c;
		t >= a - c * 1e-9 && t <= o + c * 1e-9 && l.push(n + t);
	}
	if (a <= 0 && o >= 0) {
		let e = n;
		l.some((t) => Math.abs(t - e) < c * 1e-9) || (l.push(e), l.sort((e, t) => e - t));
	}
	return l.length > 0 ? l : [e];
}
var X = /* @__PURE__ */ new WeakMap();
function Ce(e, t) {
	e.style.position = "absolute", e.style.display = "none", e.style.font = "10px ui-sans-serif, system-ui, sans-serif", e.style.lineHeight = "1.2", e.style.padding = "2px 6px", e.style.borderRadius = "4px", e.style.background = t.cursorLabelBg, e.style.color = t.cursorLabelText, e.style.border = `1px solid ${t.cursorLabelBorder}`, e.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.45)", e.style.pointerEvents = "none", e.style.whiteSpace = "nowrap", e.style.zIndex = "20";
}
function we(e, t) {
	if (X.has(e)) return;
	let n = document.createElement("div"), r = document.createElement("div");
	Ce(n, t), Ce(r, t), e.over.appendChild(n), e.over.appendChild(r), X.set(e, {
		x: n,
		y: r
	});
}
function Te(e) {
	let t = X.get(e);
	t && (t.x.style.display = "none", t.y.style.display = "none");
}
function Ee(e, t, n) {
	let r = X.get(e);
	if (!r) return;
	let i = e.cursor.left ?? -1, a = e.cursor.top ?? -1, o = e.bbox.width, s = e.bbox.height;
	if (i < 0 || a < 0 || i > o || a > s) {
		Te(e);
		return;
	}
	let c = e.posToVal(i, "x"), l = e.posToVal(a, "y");
	r.x.textContent = J(c, t, n), r.x.style.display = "block", r.x.style.left = `${i}px`, r.x.style.top = `${s}px`, r.x.style.transform = "translate(-50%, calc(-100% - 4px))", r.y.textContent = q(l), r.y.style.display = "block", r.y.style.left = "4px", r.y.style.top = `${a}px`, r.y.style.transform = "translateY(-50%)";
}
function De(e) {
	let t = X.get(e);
	t && (t.x.remove(), t.y.remove(), X.delete(e));
}
function Oe(e, t, n) {
	let r = t();
	if (r == null || !Number.isFinite(r)) return;
	let i = e.valToPos(r, "x", !0), { top: a, height: o, left: s, width: c } = e.bbox;
	if (i < s || i > s + c) return;
	let l = e.ctx;
	l.save(), l.strokeStyle = n, l.lineWidth = 1.5, l.globalAlpha = .9, l.beginPath(), l.moveTo(i, a), l.lineTo(i, a + o), l.stroke(), l.restore();
}
function ke(e, t) {
	return {
		label: e.label,
		stroke: e.color,
		width: e.lineSize,
		show: t,
		points: { show: !1 },
		dash: e.lineStyle === "dashed" ? [6, 4] : void 0,
		spanGaps: !0
	};
}
var Z = /* @__PURE__ */ new WeakMap();
function Ae(e) {
	Z.delete(e);
}
function je(e) {
	let t = e.isLoading;
	return (e, n, r) => {
		let i = Number.isFinite(n) && Number.isFinite(r) && r >= n, a = i ? R.rangeNum(n, r, .1, !0) : [0, 1];
		if (!t || !t()) return Z.delete(e), a;
		let o = Z.get(e);
		if (!i) return o ? [o.min, o.max] : a;
		let s = a[0], c = a[1];
		if (s == null || c == null) return o ? [o.min, o.max] : a;
		if (!o) return Z.set(e, {
			min: s,
			max: c
		}), [s, c];
		let l = {
			min: Math.min(o.min, s),
			max: Math.max(o.max, c)
		};
		return Z.set(e, l), [l.min, l.max];
	};
}
function Me(e, t, n) {
	let { colors: r, xAxisMode: i, xRange: a, logStart: o, getCurrentTimeSec: s, panelId: c } = n, l = i === "timestamp" && o != null, u = l ? L(o) : void 0, d = l ? (e, t) => ye(t, i, o) : void 0, f = l && u != null ? (e, t, n, r, i, a) => Se(n, r, u, a, e.bbox.width) : void 0;
	return {
		id: c,
		series: [{ label: e.xLabel }, ...e.series.map((e, n) => ke(e, !t.has(n)))],
		axes: [{
			grid: {
				show: !0,
				stroke: r.gridStroke,
				width: 1
			},
			stroke: r.axisStroke,
			font: "10px sans-serif",
			...d ? { values: d } : {},
			...f ? { splits: f } : {}
		}, {
			grid: {
				show: !0,
				stroke: r.gridStroke,
				width: 1
			},
			stroke: r.axisStroke,
			font: "10px sans-serif"
		}],
		cursor: {
			drag: { setScale: !1 },
			x: !0,
			y: !0,
			points: { show: !1 }
		},
		legend: { show: !1 },
		scales: {
			x: {
				time: i === "timestamp" && !l,
				...a ?? {}
			},
			y: { range: je(n) }
		},
		hooks: {
			ready: [(e) => we(e, r)],
			setCursor: [(e) => Ee(e, i, o)],
			destroy: [(e) => De(e)],
			draw: [(e) => Oe(e, s, r.playheadStroke)]
		}
	};
}
function Ne(e, t, n, r) {
	let i = Math.max(e.offsetHeight || 200, 100), a = e.offsetWidth || 400, o = new R({
		...n,
		width: a,
		height: i
	}, t.data, e);
	return r && o.setScale("x", r), o;
}
//#endregion
//#region src/features/panels/Plot/PlotChartLegend.tsx
var Pe = 1;
function Q(e) {
	e.stopPropagation();
}
function Fe(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n)) : [...e];
}
function Ie(e, t, n = Pe) {
	let r = e.filter((e) => m(t, e.key)), i = e.filter((e) => !m(t, e.key));
	return [...r, ...i].slice(0, n);
}
function Le({ entry: t, visible: n, onToggle: r, onOnly: i, showOnlyAction: a }) {
	let { formatMessage: o } = e();
	return /* @__PURE__ */ G("div", {
		className: `flex min-w-0 items-center gap-1.5 rounded px-1.5 py-0.5 ${n ? "" : "opacity-55"}`,
		children: [
			/* @__PURE__ */ W("button", {
				type: "button",
				className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-accent",
				onClick: r,
				title: o({ id: n ? "panels.plot.legend.hideCurve" : "panels.plot.legend.showCurve" }),
				"aria-label": o({ id: n ? "panels.plot.legend.hideCurve" : "panels.plot.legend.showCurve" }),
				children: W(n ? M : S, { className: "h-3.5 w-3.5" })
			}),
			/* @__PURE__ */ W("span", {
				className: "inline-block h-2 w-2 shrink-0 rounded-sm ring-1 ring-border/60",
				style: { backgroundColor: t.color },
				"aria-hidden": !0
			}),
			/* @__PURE__ */ W("button", {
				type: "button",
				className: "min-w-0 flex-1 truncate text-left text-[11px] leading-tight text-foreground hover:underline",
				onClick: r,
				title: t.label,
				children: t.label
			}),
			a && i && /* @__PURE__ */ W("button", {
				type: "button",
				className: "shrink-0 rounded px-1 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground",
				onClick: i,
				title: o({ id: "panels.plot.legend.onlyThis" }),
				children: o({ id: "panels.plot.legend.only" })
			}),
			!a && /* @__PURE__ */ W("span", {
				className: "invisible shrink-0 rounded px-1 text-[10px]",
				"aria-hidden": !0,
				children: o({ id: "panels.plot.legend.only" })
			})
		]
	});
}
function Re({ panelId: t, config: n, setConfig: a }) {
	let { formatMessage: o } = e(), s = D(t), [c, l] = U(!1), [u, d] = U(""), f = V(() => Fe(s, u), [s, u]), p = n.hiddenLegendKeys, g = V(() => Ie(s, p), [s, p]), _ = V(() => s.map((e) => e.key), [s]), v = r(s, p);
	if (s.length <= 1) return null;
	let y = (e) => {
		a((t) => ({
			...t,
			hiddenLegendKeys: e
		}));
	}, b = (e) => {
		y(i(p, e.key, !m(p, e.key)));
	}, x = (e) => {
		y(F(p, _, e.key));
	};
	return /* @__PURE__ */ G("div", {
		className: `absolute left-2 top-2 z-20 w-80 max-w-[min(28rem,70%)] rounded border border-border bg-card/80 text-foreground opacity-65 shadow-sm backdrop-blur transition-opacity hover:bg-card/95 hover:opacity-100 focus-within:bg-card/95 focus-within:opacity-100 ${c ? "bottom-2 flex flex-col" : ""}`,
		onClick: Q,
		onDoubleClick: Q,
		onPointerDown: Q,
		onWheel: Q,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center gap-2 border-b border-border/70 px-2 py-1",
			children: [/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1 truncate text-[11px] font-medium",
				children: o({ id: "panels.plot.legend.visibleCount" }, {
					visible: v,
					total: s.length
				})
			}), /* @__PURE__ */ G("button", {
				type: "button",
				className: "inline-flex h-5 items-center gap-1 rounded px-1 text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground",
				onClick: () => l((e) => !e),
				title: o({ id: c ? "panels.plot.legend.collapse" : "panels.plot.legend.expand" }),
				"aria-label": o({ id: c ? "panels.plot.legend.collapse" : "panels.plot.legend.expand" }),
				children: [s.length > Pe && !c ? `+${s.length - Pe}` : null, W(c ? k : P, { className: "h-3.5 w-3.5" })]
			})]
		}), c ? /* @__PURE__ */ G(pe, { children: [/* @__PURE__ */ G("div", {
			className: "space-y-1 border-b border-border/70 p-2",
			children: [/* @__PURE__ */ W("input", {
				value: u,
				onChange: (e) => d(e.target.value),
				className: "h-7 w-full rounded border border-border bg-background px-2 text-[11px] outline-none focus:border-primary",
				placeholder: o({ id: "panels.plot.legend.searchPlaceholder" }),
				"aria-label": o({ id: "panels.plot.legend.searchPlaceholder" })
			}), /* @__PURE__ */ G("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ W("button", {
					type: "button",
					className: "rounded border border-border px-1.5 py-0.5 text-[10px] hover:bg-accent",
					onClick: () => y(h(p, _, !0)),
					children: o({ id: "panels.plot.legend.showAll" })
				}), /* @__PURE__ */ W("button", {
					type: "button",
					className: "rounded border border-border px-1.5 py-0.5 text-[10px] hover:bg-accent",
					onClick: () => y(h(p, _, !1)),
					children: o({ id: "panels.plot.legend.hideAll" })
				})]
			})]
		}), /* @__PURE__ */ W("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-1",
			children: f.length === 0 ? /* @__PURE__ */ W("div", {
				className: "px-2 py-2 text-[11px] text-muted-foreground",
				children: o({ id: "panels.plot.legend.noMatches" })
			}) : f.map((e) => /* @__PURE__ */ W(Le, {
				entry: e,
				visible: m(p, e.key),
				onToggle: () => b(e),
				onOnly: () => x(e),
				showOnlyAction: !0
			}, e.key))
		})] }) : /* @__PURE__ */ W("div", {
			className: "p-1",
			children: g.map((e) => /* @__PURE__ */ W(Le, {
				entry: e,
				visible: m(p, e.key),
				onToggle: () => b(e)
			}, e.key))
		})]
	});
}
//#endregion
//#region src/features/panels/Plot/usePlotChart.ts
function ze(e, t) {
	return e.series.map((e, n) => ({
		key: e.key,
		meta: `${e.label}|${e.color}|${e.lineStyle}|${e.lineSize}`,
		show: !t.has(n)
	}));
}
function Be(e, t) {
	if (e.length === t.length) {
		let n = !0, r = [];
		for (let i = 0; i < e.length; i++) {
			if (e[i].key !== t[i].key) {
				n = !1;
				break;
			}
			e[i].meta !== t[i].meta && r.push(i);
		}
		if (n) return r.length === 0 ? { kind: "identical" } : {
			kind: "styleUpdate",
			changed: r
		};
	}
	if (t.length > e.length) {
		let n = !0;
		for (let r = 0; r < e.length; r++) if (e[r].key !== t[r].key || e[r].meta !== t[r].meta) {
			n = !1;
			break;
		}
		if (n) return {
			kind: "pureAdd",
			added: t.slice(e.length),
			addedAt: e.length
		};
	}
	if (t.length < e.length) {
		let n = !0;
		for (let r = 0; r < t.length; r++) if (e[r].key !== t[r].key || e[r].meta !== t[r].meta) {
			n = !1;
			break;
		}
		if (n) return {
			kind: "pureDel",
			removedFrom: t.length,
			removedCount: e.length - t.length
		};
	}
	return { kind: "remount" };
}
function Ve(e) {
	return e.series.length - 1;
}
function He(e, t, n) {
	let r = e.series[t + 1];
	r && (r.label = n.label, r.stroke = () => n.color, r.width = n.lineSize, r.dash = n.lineStyle === "dashed" ? [6, 4] : [], r._paths = null);
}
function Ue(e, t, n, r) {
	return e !== t || n.kind === "pureDel" && n.removedCount > e - r;
}
function We(e, t) {
	return e != null && t <= 0;
}
function Ge(e, t) {
	e.setScale("x", t);
}
function Ke(e) {
	return e.x || e.y;
}
function qe(e) {
	return e.ctrlKey || e.metaKey ? ["x", "y"] : e.shiftKey ? ["y"] : ["x"];
}
function Je({ containerRef: e, player: t, panelId: r, config: i, dataset: a, hiddenSeries: o, xRange: s, logStart: c, loading: l, onViewportStateChange: u }) {
	let d = H(null), f = H((() => {
		let e = t.getCurrentTime();
		return e ? L(e) : void 0;
	})()), p = H(null), m = H(i.followingViewWidthSec), h = H(i.xAxisMode), g = H([]), _ = H(null), v = H(null), y = H(!!l), b = H({
		x: !1,
		y: !1
	}), x = H(s), S = H(u);
	B(() => {
		y.current = !!l;
	}, [l]), B(() => {
		x.current = s;
	}, [s]), B(() => {
		S.current = u;
	}, [u]);
	let C = z(() => {
		S.current?.({ ...b.current });
	}, []), w = z((e) => {
		let t = b.current;
		t[e] || (b.current = {
			...t,
			[e]: !0
		}, C());
	}, [C]), T = z(() => {
		let e = d.current;
		if (b.current = {
			x: !1,
			y: !1
		}, C(), e) {
			if (Ae(e), e.setData(e.data, !0), i.xAxisMode === "timestamp" && i.followingViewWidthSec > 0) {
				let t = f.current;
				t != null && Number.isFinite(t) && e.setScale("x", {
					min: t - i.followingViewWidthSec,
					max: t
				});
			} else x.current && e.setScale("x", x.current);
		}
	}, [
		i.followingViewWidthSec,
		i.xAxisMode,
		C
	]), E = z((e) => {
		let t = e.over, n = null, r = (t) => {
			let n = e.scales[t].min, r = e.scales[t].max;
			return typeof n == "number" && typeof r == "number" ? {
				min: n,
				max: r
			} : void 0;
		}, i = (t, n) => {
			w(t), e.setScale(t, n);
		}, a = (n) => {
			let a = qe(n);
			n.preventDefault();
			let o = t.getBoundingClientRect(), s = n.deltaY > 0 ? 1.18 : 1 / 1.18;
			if (a.includes("x")) {
				let t = r("x");
				if (t) {
					let r = e.posToVal(n.clientX - o.left, "x");
					i("x", _e(t, r, s, x.current));
				}
			}
			if (a.includes("y")) {
				let t = r("y");
				if (t) {
					let r = e.posToVal(n.clientY - o.top, "y");
					i("y", _e(t, r, s));
				}
			}
		}, o = (e) => {
			if (e.button !== 0 || e.altKey) return;
			let i = qe(e), a = Object.fromEntries(i.flatMap((e) => {
				let t = r(e);
				return t ? [[e, t]] : [];
			}));
			Object.keys(a).length !== 0 && (n = {
				pointerId: e.pointerId,
				clientX: e.clientX,
				clientY: e.clientY,
				scales: a,
				axes: i,
				moved: !1
			}, t.setPointerCapture(e.pointerId), t.style.cursor = "grabbing", e.preventDefault());
		}, s = (t) => {
			if (!n || n.pointerId !== t.pointerId) return;
			let r = t.clientX - n.clientX, a = t.clientY - n.clientY;
			Math.hypot(r, a) < 2 || (n.moved = !0, n.axes.includes("x") && n.scales.x && i("x", ve(n.scales.x, r, e.bbox.width, x.current)), n.axes.includes("y") && n.scales.y && i("y", ve(n.scales.y, -a, e.bbox.height)));
		}, c = (e) => {
			!n || n.pointerId !== e.pointerId || (t.releasePointerCapture(e.pointerId), t.style.cursor = "", n = null);
		}, l = (e) => {
			e.preventDefault(), T();
		};
		return t.addEventListener("wheel", a, { passive: !1 }), t.addEventListener("pointerdown", o), t.addEventListener("pointermove", s), t.addEventListener("pointerup", c), t.addEventListener("pointercancel", c), t.addEventListener("dblclick", l), () => {
			t.removeEventListener("wheel", a), t.removeEventListener("pointerdown", o), t.removeEventListener("pointermove", s), t.removeEventListener("pointerup", c), t.removeEventListener("pointercancel", c), t.removeEventListener("dblclick", l), t.style.cursor = "";
		};
	}, [w, T]), D = z(() => {
		v.current?.(), v.current = null, _.current?.disconnect(), _.current = null;
		let e = d.current;
		e && (Ae(e), e.destroy()), d.current = null, g.current = [];
	}, []), O = z(() => {
		let t = e.current;
		if (!t) return;
		D();
		let n = he(), l = Ne(t, a, Me(a, o, {
			panelId: r,
			xAxisMode: i.xAxisMode,
			xRange: s,
			logStart: c,
			getCurrentTimeSec: () => f.current,
			colors: n,
			isLoading: () => y.current
		}), s);
		d.current = l, v.current = E(l), g.current = ze(a, o), y.current && !b.current.x && We(s, m.current) && Ge(l, s);
		let u = new ResizeObserver(() => {
			let e = d.current;
			!t || !e || e.setSize({
				width: t.offsetWidth || 400,
				height: Math.max(t.offsetHeight || 200, 100)
			});
		});
		u.observe(t), _.current = u;
	}, [
		E,
		i.xAxisMode,
		e,
		a,
		D,
		o,
		c,
		r,
		s
	]);
	return B(() => {
		if (!e.current || a.series.length === 0) {
			D();
			return;
		}
		let t = d.current, n = h.current !== i.xAxisMode;
		if (m.current = i.followingViewWidthSec, h.current = i.xAxisMode, !t || n) {
			O();
			return;
		}
		let r = ze(a, o), c = Be(g.current, r);
		if (c.kind === "remount") {
			O();
			return;
		}
		let l = Ve(t), u = g.current.length;
		if (Ue(l, u, c, r.length)) {
			O();
			return;
		}
		if (c.kind === "pureAdd") c.added.forEach((e, n) => {
			t.addSeries(ke(a.series[c.addedAt + n], e.show), c.addedAt + n + 1);
		});
		else if (c.kind === "pureDel") for (let e = 0; e < c.removedCount; e++) t.delSeries(c.removedFrom + 1);
		else if (c.kind === "styleUpdate") for (let e of c.changed) He(t, e, a.series[e]);
		for (let e = 0; e < r.length; e++) t.setSeries(e + 1, { show: r[e].show });
		t.setData(a.data, !1), y.current && !b.current.x && We(s, m.current) && Ge(t, s), c.kind === "styleUpdate" ? t.redraw(!0) : y.current && t.redraw(!1), g.current = r;
	}, [
		i.followingViewWidthSec,
		i.xAxisMode,
		e,
		a,
		D,
		o,
		O,
		s
	]), B(() => {
		if (l || b.current.y) return;
		let e = d.current;
		e && (Ae(e), e.redraw(!0, !0));
	}, [l]), B(() => () => D(), [D]), B(() => {
		let e = t.subscribeCurrentTime((e) => {
			f.current = L(e), !p.current && (p.current = n(() => {
				p.current = null;
				let e = d.current;
				if (e) {
					if (!b.current.x && h.current === "timestamp" && m.current > 0) {
						let t = f.current;
						t != null && Number.isFinite(t) && e.setScale("x", {
							min: t - m.current,
							max: t
						});
					}
					e.redraw(!1);
				}
			}));
		});
		return () => {
			e(), p.current?.(), p.current = null;
		};
	}, [t]), B(() => {
		let e = d.current;
		if (!(!e || i.xAxisMode !== "timestamp") && !b.current.x) {
			if (i.followingViewWidthSec > 0) {
				let t = f.current;
				t != null && Number.isFinite(t) && e.setScale("x", {
					min: t - i.followingViewWidthSec,
					max: t
				});
			} else s && e.setScale("x", s);
		}
	}, [
		i.followingViewWidthSec,
		i.xAxisMode,
		s
	]), B(() => {
		let e = d.current;
		if (e) for (let t = 0; t < a.series.length; t++) e.setSeries(t + 1, { show: !o.has(t) });
	}, [a.series.length, o]), {
		chartRef: d,
		resetViewport: T
	};
}
//#endregion
//#region src/features/panels/Plot/plotDatasetAccumulator.ts
var Ye = {
	xLabel: "time",
	series: [],
	data: [[]],
	pointCount: 0,
	sampleRatio: 1,
	warnings: []
};
function Xe(e) {
	let t = 0;
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		for (let e = 0; e < r.length; e++) r[e] != null && t++;
	}
	return t;
}
function Ze(e, t, n, r, i, o) {
	let s = i == null ? e : new Map([...e.entries()].filter(([, e]) => i.has(e.seriesConfigId)));
	c(s.values(), o ?? t), u(s);
	let d = [...s.values()], f = n.forceDownsample === !0 || t.downsampleMode === "minMaxLast", { data: p, sampleRatio: m } = a(d, t.maxPoints, f);
	return {
		xLabel: t.xAxisMode === "timestamp" ? "time" : t.xAxisMode === "index" ? "index" : "x",
		series: d.map((e) => e.series),
		data: p,
		pointCount: Xe(p),
		sampleRatio: m,
		warnings: Array.from(new Map(r.map((e) => [l(e), e])).values())
	};
}
var Qe = class {
	_buckets = /* @__PURE__ */ new Map();
	_latestByTopic = /* @__PURE__ */ new Map();
	_warnings = /* @__PURE__ */ new Map();
	_messageCount = 0;
	_topicEventCounts = /* @__PURE__ */ new Map();
	_timestampFoundBySeries = /* @__PURE__ */ new Map();
	_config;
	_options;
	constructor(e, t = {}) {
		this._config = e, this._options = t;
		for (let e of t.extraWarnings ?? []) this._addWarning(e);
	}
	append(e) {
		if (e.length !== 0) for (let t of e) this._messageCount++, this._latestByTopic.set(t.topic, t), this._topicEventCounts.set(t.topic, (this._topicEventCounts.get(t.topic) ?? 0) + 1), this._config.xAxisMode === "timestamp" ? this._appendTimestampEvent(t) : this._config.xAxisMode === "custom" && this._appendCustomEvent(t);
	}
	buildDataset(e, t) {
		let n = t ?? this._config;
		if (this._messageCount === 0) return {
			...Ye,
			xLabel: this._config.xAxisMode === "timestamp" ? "time" : this._config.xAxisMode === "index" ? "index" : "x",
			warnings: Array.from(this._warnings.values())
		};
		let r = (t) => s(t) && (e ? e.has(t.id) : t.enabled);
		if (this._config.xAxisMode === "index") {
			let e = Array.from(this._warnings.values()), t = this._configWithSeriesFilter(r);
			return Ze(I([...this._latestByTopic.values()], t), t, this._options, e, void 0, n);
		}
		if (this._config.xAxisMode === "currentCustom") {
			let e = Array.from(this._warnings.values()), t = this._configWithSeriesFilter(r);
			return Ze(p([...this._latestByTopic.values()], t, !0, e), t, this._options, e, void 0, n);
		}
		let i = Array.from(this._warnings.values());
		if (this._config.xAxisMode === "timestamp") for (let e of this._config.series.filter(r)) (this._topicEventCounts.get(e.topic) ?? 0) > 0 && !this._timestampFoundBySeries.get(e.id) && i.push({
			kind: "noNumericValues",
			topic: e.topic,
			path: e.path
		});
		return Ze(this._buckets, this._config, this._options, i, new Set(this._config.series.filter(r).map((e) => e.id)), n);
	}
	getMessageCount() {
		return this._messageCount;
	}
	_configWithSeriesFilter(e) {
		return {
			...this._config,
			series: this._config.series.map((t) => e(t) ? t : {
				...t,
				enabled: !1
			})
		};
	}
	_appendTimestampEvent(e) {
		for (let t of this._config.series.filter(s)) {
			if (t.topic !== e.topic) continue;
			let n = v(L(de(e, t.timestampMode, this._options.logStart, this._options.logEnd).time)), r = j(e.message, t.path);
			r.length > 0 && this._timestampFoundBySeries.set(t.id, !0);
			for (let e of r) g(this._buckets, t, e.key, e.label, n, e.value);
		}
	}
	_appendCustomEvent(e) {
		for (let t of this._config.series.filter(s)) {
			if (t.topic !== e.topic) continue;
			let n = t.xAxisPath?.trim();
			if (!n) {
				this._addWarning({
					kind: "missingXPath",
					topic: t.topic,
					path: t.path
				});
				continue;
			}
			let r = _(e.message, n), i = j(e.message, t.path), a = Math.min(r.length, i.length);
			r.length !== i.length && this._addWarning({
				kind: "mismatchedXY",
				topic: t.topic,
				xPath: n,
				yPath: t.path
			});
			let o = r.length > 1 && i.length > 1;
			for (let e = 0; e < a; e++) {
				let n = r[e]?.value, a = i[e]?.value;
				n != null && a != null && g(this._buckets, t, o ? "value" : i[e]?.key ?? `${e}`, o ? "" : i[e]?.label ?? `${e}`, n, a);
			}
		}
	}
	_addWarning(e) {
		this._warnings.set(l(e), e);
	}
}, $e = 150, $ = {
	xLabel: "time",
	series: [],
	data: [[]],
	pointCount: 0,
	sampleRatio: 1,
	warnings: []
};
function et(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function tt({ player: e, config: t, activeTopics: n, hasPlotPaths: r, startTime: i, endTime: a, randomAccessByTopic: o }) {
	let [s, c] = U($), [l, u] = U(!1), [d, p] = U(null), [m, h] = U(null), g = V(() => ee(t), [t]), _ = V(() => C(t), [t]), v = V(() => T(t), [t]), y = V(() => N(t), [t]), b = H(y);
	B(() => {
		b.current = y;
	}, [y]);
	let x = H(t);
	B(() => {
		x.current = t;
	}, [t]);
	let S = H(null), w = H(null), E = H(null), D = H(null), O = H(null), k = H(0), te = z(() => {
		E.current = null, w.current && p(w.current);
	}, []), ne = z((e) => {
		w.current = e, E.current ??= requestAnimationFrame(te);
	}, [te]), A = z(() => {
		D.current != null && (cancelAnimationFrame(D.current), D.current = null), O.current != null && (globalThis.clearTimeout(O.current), O.current = null);
	}, []);
	return B(() => {
		if (!i || !a || n.length === 0 || !r) {
			c($), u(!1), p(null), h(null);
			return;
		}
		let s = new AbortController();
		c($), u(!0), p(null), h(null), k.current = 0;
		let l = o !== !1, d = l ? void 0 : t.nonIndexedMaxMessages, m = new Qe(t, {
			forceDownsample: !l,
			extraWarnings: l ? [] : [{ kind: "nonIndexedSource" }],
			logStart: i,
			logEnd: a
		});
		S.current = m;
		let g = () => {
			D.current = null, O.current = null, !s.signal.aborted && (k.current = performance.now(), c(m.buildDataset(b.current, x.current)));
		}, _ = () => {
			if (D.current != null || O.current != null) return;
			let e = performance.now() - k.current, t = Math.max(0, $e - e);
			O.current = globalThis.setTimeout(() => {
				O.current = null, D.current = requestAnimationFrame(g);
			}, t);
		};
		return f({
			player: e,
			start: i,
			end: a,
			topics: n,
			signal: s.signal,
			onProgress: ne,
			maxMessages: d,
			onBatch: ({ messages: e }) => {
				m.append(e), _();
			}
		}).then(() => {
			s.signal.aborted || (A(), g());
		}).catch((e) => {
			et(e) || (c($), h(e instanceof Error ? e.message : String(e)));
		}).finally(() => {
			s.signal.aborted || (u(!1), E.current != null && (cancelAnimationFrame(E.current), E.current = null), A());
		}), () => {
			s.abort(), E.current != null && (cancelAnimationFrame(E.current), E.current = null), A(), S.current = null;
		};
	}, [
		n,
		g,
		a,
		r,
		A,
		ne,
		e,
		o,
		i
	]), B(() => {
		let e = S.current;
		e && c(e.buildDataset(b.current, x.current));
	}, [_]), B(() => {
		let e = S.current;
		e && c(e.buildDataset(b.current, x.current));
	}, [v]), {
		dataset: s,
		loading: l,
		progress: d,
		error: m
	};
}
//#endregion
//#region src/features/panels/Plot/PlotPanel.tsx
var nt = [];
function rt({ fields: e, fieldLabels: t, onChange: n }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-0.5",
		children: w.map((r) => {
			let i = e.includes(r);
			return /* @__PURE__ */ W("button", {
				type: "button",
				onClick: () => {
					let t = i ? e.filter((e) => e !== r) : [...e, r];
					n(t.length > 0 ? t : ["position"]);
				},
				className: `rounded px-1.5 py-0.5 text-[10px] capitalize ${i ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-accent"}`,
				children: t[r]
			}, r);
		})
	});
}
var it = ({ player: n, panelId: r, config: i, setConfig: a }) => {
	let { formatMessage: s } = e(), c = H(null), l = H(!1), u = H(null), [f, p] = U({
		x: !1,
		y: !1
	}), { startTime: m, endTime: h, randomAccessByTopic: g, topics: _ } = t(ue((e) => ({
		startTime: e.playerState.activeData?.startTime,
		endTime: e.playerState.activeData?.endTime,
		randomAccessByTopic: e.playerState.activeData?.randomAccessByTopic,
		topics: e.playerState.activeData?.topics ?? []
	}))), v = V(() => d(_), [_]), S = V(() => b(_), [_]), C = V(() => ie(i, S).join("\n"), [i, S]), w = V(() => C === "" ? nt : C.split("\n"), [C]), T = V(() => A(i), [i]), D = V(() => oe(i), [i]), O = te(i), ee = x(i, S), k = V(() => {
		if (!(!m || !h || i.xAxisMode !== "timestamp")) return {
			min: L(m),
			max: L(h)
		};
	}, [
		i.xAxisMode,
		h,
		m
	]), { detectingTopic: j, applyTopicDetection: M } = se({
		player: n,
		config: i,
		setConfig: a,
		topicByName: S,
		startTime: m,
		endTime: h
	}), { dataset: N, loading: P, progress: F, error: I } = tt({
		player: n,
		config: i,
		activeTopics: w,
		hasPlotPaths: T,
		startTime: m,
		endTime: h,
		randomAccessByTopic: g
	}), { chartRef: de, resetViewport: fe } = Je({
		containerRef: c,
		player: n,
		panelId: r,
		config: i,
		dataset: N,
		hiddenSeries: V(() => ce(N.series, i.hiddenLegendKeys), [i.hiddenLegendKeys, N.series]),
		xRange: k,
		logStart: m,
		loading: P,
		onViewportStateChange: z((e) => {
			p((t) => t.x === e.x && t.y === e.y ? t : e);
		}, [])
	});
	B(() => {
		let e = w.map((e) => ({
			topic: e,
			subscriberId: r
		}));
		return e.length > 0 && n.registerSubscriptions(r, e), () => n.unregisterSubscriptions(r);
	}, [
		n,
		r,
		w
	]), B(() => {
		let e = N.series.map((e) => ({
			key: e.key,
			label: e.label,
			color: e.color
		}));
		ae(r, e);
		let t = e.map((e) => e.key);
		a((e) => y(e, t));
	}, [
		N.series,
		r,
		a
	]), B(() => () => ne(r), [r]), B(() => {
		if (l.current || !m || !h) return;
		if (O?.topic) {
			l.current = !0;
			return;
		}
		let e = me(v);
		!e || !i.series[0]?.id || (l.current = !0, M(i.series[0].id, e));
	}, [
		M,
		i.series,
		h,
		v,
		O?.topic,
		m
	]);
	let R = (e) => {
		let t = i.series[0]?.id;
		t && M(t, e);
	}, pe = (e) => {
		a((t) => E(t, S, e));
	}, K = V(() => ({
		position: s({ id: "panels.jointStatePlot.toolbar.field.position" }),
		velocity: s({ id: "panels.jointStatePlot.toolbar.field.velocity" }),
		effort: s({ id: "panels.jointStatePlot.toolbar.field.effort" })
	}), [s]), he = N.warnings[0], q = he ? o(he, s) : void 0, J = w.length > 0 && D, Y = j ? s({ id: "panels.plot.status.detectingPaths" }) : P ? F ? s({ id: "panels.plot.status.loadingProgress" }, { count: F.messages.toLocaleString() }) : s({ id: "panels.plot.status.loading" }) : I || (J && N.sampleRatio < 1 ? s({ id: "panels.plot.status.sampling" }, { percent: Math.round(N.sampleRatio * 100) }) : null), _e = (e) => {
		if (e.detail > 1) return;
		let t = u.current;
		if (t) {
			let n = e.clientX - t.x, r = e.clientY - t.y;
			if (Math.hypot(n, r) > 4) return;
		}
		let r = de.current;
		if (!r || i.xAxisMode !== "timestamp") return;
		let a = r.over.getBoundingClientRect(), o = r.posToVal(e.clientX - a.left, "x");
		Number.isFinite(o) && n.seek(ge(o));
	}, ve = P && N.pointCount === 0, ye = F && F.total > 0 ? Math.min(1, F.completed / F.total) : null, be = Ke(f);
	return /* @__PURE__ */ G("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [/* @__PURE__ */ G("div", {
			className: "flex shrink-0 items-center gap-2 border-b border-border bg-muted px-2 py-1",
			children: [
				/* @__PURE__ */ W("div", {
					className: "min-w-0 flex-1 max-w-xs",
					children: /* @__PURE__ */ W(le, {
						value: O?.topic ?? "",
						onChange: R,
						topics: v,
						placeholder: s({ id: "panels.plot.toolbar.selectTopic" }),
						triggerClassName: "h-[24px] text-[11px] px-2"
					})
				}),
				ee && /* @__PURE__ */ W(rt, {
					fields: i.jointStateFields,
					fieldLabels: K,
					onChange: pe
				}),
				Y && /* @__PURE__ */ W("span", {
					className: "ml-auto shrink-0 text-[10px] text-muted-foreground",
					children: Y
				})
			]
		}), /* @__PURE__ */ G("div", {
			className: "relative min-h-0 flex-1 flex flex-col",
			children: [
				P && /* @__PURE__ */ W("div", {
					className: "pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-transparent",
					children: ye == null ? /* @__PURE__ */ W("div", { className: "h-full w-1/3 animate-pulse rounded-r-full bg-primary/60" }) : /* @__PURE__ */ W("div", {
						className: "h-full bg-primary/70 transition-[width] duration-150 ease-linear",
						style: { width: `${Math.round(ye * 100)}%` }
					})
				}),
				/* @__PURE__ */ W("div", {
					ref: c,
					className: "min-h-0 flex-1 w-full overflow-hidden",
					onPointerDown: (e) => {
						u.current = {
							x: e.clientX,
							y: e.clientY
						};
					},
					onClick: _e
				}),
				/* @__PURE__ */ W(Re, {
					panelId: r,
					config: i,
					setConfig: a
				}),
				be && /* @__PURE__ */ G("button", {
					type: "button",
					className: "absolute right-2 top-2 z-20 inline-flex h-7 items-center gap-1 rounded border border-border bg-card/95 px-2 text-[11px] text-foreground shadow-sm hover:bg-accent",
					onClick: (e) => {
						e.stopPropagation(), fe();
					},
					title: s({ id: "panels.plot.toolbar.resetZoom" }),
					"aria-label": s({ id: "panels.plot.toolbar.resetZoomAria" }),
					children: [/* @__PURE__ */ W(re, { className: "h-3.5 w-3.5" }), s({ id: "panels.plot.toolbar.resetZoom" })]
				}),
				!J && /* @__PURE__ */ W("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-muted-foreground",
					children: s({ id: "panels.plot.empty.selectTopic" })
				}),
				ve && J && !I && /* @__PURE__ */ W("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-muted-foreground",
					children: F ? s({ id: "panels.plot.status.loadingProgress" }, { count: F.messages.toLocaleString() }) : s({ id: "panels.plot.status.loading" })
				}),
				J && !P && !j && !I && N.pointCount === 0 && /* @__PURE__ */ W("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-muted-foreground",
					children: s({ id: "panels.plot.empty.noNumericData" })
				}),
				q && /* @__PURE__ */ W("div", {
					className: "absolute bottom-1 left-1 max-w-[70%] rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-muted-foreground",
					children: q
				})
			]
		})]
	});
};
//#endregion
export { it as PlotPanel };
