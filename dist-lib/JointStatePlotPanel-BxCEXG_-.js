import { f as e, t } from "./rafScheduler-Be5Ie1zf.js";
import { t as n } from "./messageBus-D2dmTOBd.js";
import { t as r } from "./useMessageBus-Cj1eCJEb.js";
import { o as i, r as a, t as o } from "./timeSeries-Al2bAf1m.js";
import { t as s } from "./uPlot.min-DbnxNccy.js";
import { useCallback as c, useEffect as l, useMemo as u, useRef as d, useState as f } from "react";
import { jsx as p } from "react/jsx-runtime";
//#region src/features/panels/JointStatePlot/JointStatePlotPanel.tsx
var m = 3, h = .5;
function g() {
	return {
		timestamps: [],
		perJoint: [],
		jointNames: [],
		lastTs: -Infinity,
		typicalInterval: .02,
		realRowCount: 0
	};
}
function _(e, t) {
	if (!e || typeof e != "object") return null;
	let n = e[t];
	if (typeof n != "object" || !n || !("length" in n)) return null;
	let r = n.length;
	return typeof r != "number" || r === 0 ? null : n;
}
function v(e) {
	if (!e || typeof e != "object") return null;
	let t = e.name;
	if (!t || typeof t != "object" || !("length" in t)) return null;
	let n = t.length;
	if (typeof n != "number" || n === 0) return null;
	let r = [];
	for (let e = 0; e < n; e++) {
		let n = t[e];
		r.push(typeof n == "string" ? n : `joint_${e}`);
	}
	return r;
}
function y(e, t, n, r) {
	let o = !1, s = !1;
	for (let c of t) {
		let t = _(c.message, n);
		if (!t) continue;
		let l = v(c.message);
		if (!l || l.length !== t.length) continue;
		(e.jointNames.length !== l.length || l.some((t, n) => t !== e.jointNames[n])) && (e.timestamps = [], e.perJoint = Array.from({ length: l.length }, () => []), e.jointNames = l, e.lastTs = -Infinity, e.realRowCount = 0, o = !0);
		let u = i(a(c, r).time);
		if (e.lastTs > -Infinity && u - e.lastTs > Math.max(e.typicalInterval * m, h)) {
			e.timestamps.push((e.lastTs + u) / 2);
			for (let t of e.perJoint) t.push(null);
		}
		e.timestamps.push(u);
		for (let n = 0; n < e.jointNames.length; n++) {
			let r = t[n];
			e.perJoint[n].push(typeof r == "number" && Number.isFinite(r) ? r : null);
		}
		if (e.lastTs > -Infinity && u > e.lastTs) {
			let t = u - e.lastTs;
			t < h && (e.typicalInterval = e.typicalInterval * .9 + t * .1);
		}
		e.lastTs = u, e.realRowCount += 1, s = !0;
	}
	return {
		topologyChanged: o,
		hasNewData: s
	};
}
function b(e, t) {
	if (e.jointNames.length === 0 || e.timestamps.length <= t) return;
	let n = [];
	for (let t = 0; t < e.timestamps.length; t++) e.timestamps[t] !== null && n.push(t);
	if (n.length <= t) return;
	let r = e.perJoint.map((r) => {
		let i = o(n.map((t) => ({
			x: e.timestamps[t],
			y: r[t]
		})).filter((e) => e.y !== null && e.x !== null), t), a = new Set(i.map((e) => e.x)), s = /* @__PURE__ */ new Set();
		for (let t of n) a.has(e.timestamps[t]) && s.add(t);
		return s;
	}), i = /* @__PURE__ */ new Set();
	for (let t = 0; t < e.timestamps.length; t++) e.timestamps[t] === null && i.add(t);
	for (let e of r) for (let t of e) i.add(t);
	let a = Array.from(i).sort((e, t) => e - t);
	e.timestamps = a.map((t) => e.timestamps[t]);
	for (let t = 0; t < e.perJoint.length; t++) e.perJoint[t] = a.map((n) => e.perJoint[t][n]);
}
function x(e) {
	return [[], ...Array.from({ length: e }, () => [])];
}
function S(e) {
	return [e.timestamps, ...e.perJoint];
}
function C(e) {
	return `hsl(${e * 137.508 % 360}, 70%, 50%)`;
}
var w = ({ player: i, panelId: a, topic: o, field: m, selectedJoints: h, timestampMode: _, maxPointsPerJoint: v }) => {
	let { formatMessage: w } = e(), T = d(null), E = d(null), D = d(g()), O = d(!1), k = d(null), [A, j] = f(0);
	l(() => {
		if (!o) {
			i.unregisterSubscriptions(a);
			return;
		}
		return i.registerSubscriptions(a, [{
			topic: o,
			subscriberId: a
		}]), () => i.unregisterSubscriptions(a);
	}, [
		i,
		a,
		o
	]), l(() => {
		D.current = g(), j(0), k.current && (k.current(), k.current = null, O.current = !1), E.current?.setData(x(0));
	}, [
		o,
		m,
		_
	]);
	let M = c(() => {
		O.current || !E.current || (O.current = !0, k.current = t(() => {
			O.current = !1, k.current = null, E.current?.setData(S(D.current));
		}));
	}, []);
	l(() => {
		let e = n.getSubscriberMessages(a);
		if (!e || e.length === 0) return;
		let t = D.current, { topologyChanged: r, hasNewData: i } = y(t, e, m, _);
		if (!i) return;
		let o = Math.floor(v * 1.5);
		if (t.realRowCount > o && b(t, v), r) {
			j((e) => e + 1);
			return;
		}
		M();
	}, [
		r(a),
		a,
		m,
		_,
		v,
		M
	]);
	let N = u(() => D.current.jointNames, [A]);
	return l(() => {
		let e = T.current;
		if (!e || N.length === 0) return;
		let t = new s({
			title: "",
			id: a,
			width: e.offsetWidth || 400,
			height: Math.max((e.offsetHeight || 200) - 30, 80),
			series: [{ label: w({ id: "panels.jointStatePlot.axis.time" }) }, ...N.map((e, t) => ({
				label: e,
				stroke: C(t),
				width: 1.5,
				points: { show: !1 },
				spanGaps: !1
			}))],
			axes: [{
				grid: { show: !0 },
				stroke: "#888",
				font: "10px sans-serif"
			}, {
				grid: { show: !0 },
				stroke: "#888",
				font: "10px sans-serif"
			}],
			cursor: { drag: { setScale: !0 } },
			legend: { show: !1 },
			scales: { x: { time: !0 } }
		}, S(D.current), e);
		E.current = t;
		for (let e = 0; e < N.length; e++) {
			let n = h.length === 0 || h.includes(N[e]);
			t.setSeries(e + 1, { show: n });
		}
		let n = new ResizeObserver(() => {
			T.current && E.current && E.current.setSize({
				width: T.current.offsetWidth,
				height: Math.max(T.current.offsetHeight - 30, 80)
			});
		});
		return n.observe(e), () => {
			n.disconnect(), k.current && (k.current(), k.current = null, O.current = !1), t.destroy(), E.current = null;
		};
	}, [
		a,
		A,
		w
	]), l(() => {
		let e = E.current;
		if (!e) return;
		let t = D.current.jointNames;
		for (let n = 0; n < t.length; n++) {
			let r = h.length === 0 || h.includes(t[n]);
			e.setSeries(n + 1, { show: r });
		}
		e.redraw();
	}, [h]), /* @__PURE__ */ p("div", {
		ref: T,
		className: "flex-1 min-h-0 w-full overflow-hidden"
	});
};
//#endregion
export { w as JointStatePlotComponent };
