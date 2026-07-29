import { f as e, i as t, t as n } from "./rafScheduler-Be5Ie1zf.js";
import { h as r } from "./rosMessageTypes-D0Ar3Pyn.js";
import { t as i } from "./messageBus-D2dmTOBd.js";
import { t as a } from "./useMessageBus-Cj1eCJEb.js";
import { t as o } from "./shallow-DHPf4mbW.js";
import { a as s, o as c, r as l, t as u } from "./time-BoEDgjoH.js";
import { useCallback as d, useEffect as f, useLayoutEffect as p, useMemo as m, useRef as h, useState as g } from "react";
import { jsx as _, jsxs as v } from "react/jsx-runtime";
//#region src/features/panels/Align/core/alignTimeUtils.ts
function y(e) {
	return c(e.receiveTime);
}
function b(e) {
	if (!e) return null;
	let t = e.header?.stamp;
	return t && typeof t.sec == "number" && typeof t.nsec == "number" ? BigInt(t.sec) * 1000000000n + BigInt(t.nsec) : null;
}
function x(e, t) {
	return t === "receiveTime" ? y(e) : b(e.message) ?? y(e);
}
function S(e, t) {
	return {
		topic: e.topic,
		plotNs: x(e, t),
		receiveNs: y(e),
		stampNs: b(e.message)
	};
}
function ee(e, t, n) {
	let r = t - n, i = t + n;
	return e.filter((e) => e.plotNs >= r && e.plotNs <= i);
}
function te(e, t) {
	let n = Number((e - t) / 1000000n);
	return `${n >= 0 ? "+" : ""}${n} ms`;
}
//#endregion
//#region src/features/panels/Align/AlignPanel.tsx
var C = 6e4, w = 6;
function T(e) {
	return `${e.topic}|${e.plotNs.toString()}|${e.receiveNs.toString()}`;
}
function E(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
var D = (y) => {
	let { player: b, panelId: x, setConfig: D, topics: O, timeMode: k, windowHalfMs: A, dotRadius: j, dotOpacity: M } = y, { formatMessage: N } = e(), { sortedTopics: P, startTime: F, endTime: I } = t(o((e) => ({
		sortedTopics: e.sortedTopics,
		startTime: e.playerState.activeData?.startTime,
		endTime: e.playerState.activeData?.endTime
	}))), L = h(b.getCurrentTime() ?? {
		sec: 0,
		nsec: 0
	}), [R, ne] = g(0), z = m(() => P.filter((e) => r(e.type)).map((e) => e.name), [P]), B = m(() => {
		if (O.length > 0) {
			let e = new Set(z);
			return O.filter((t) => e.has(t));
		}
		return z;
	}, [O, z]), V = B.join("\0");
	f(() => {
		let e = B.map((e) => ({
			topic: e,
			subscriberId: x
		}));
		return e.length > 0 && b.registerSubscriptions(x, e), () => {
			b.unregisterSubscriptions(x);
		};
	}, [
		b,
		x,
		V,
		B
	]);
	let re = a(x), [H, U] = g([]), [W, G] = g(null), [K, ie] = g({
		w: 300,
		h: 120
	}), q = h(null), J = h(null), Y = h(void 0), X = h("");
	f(() => b.subscribeCurrentTime((e) => {
		L.current = e, Y.current != null && window.clearTimeout(Y.current), Y.current = window.setTimeout(() => {
			Y.current = void 0, ne((e) => e + 1);
		}, 180);
	}), [b]);
	let Z = d(async () => {
		if (B.length === 0 || !b.getMessagesInTimeRange) {
			X.current = "", U([]);
			return;
		}
		let e = L.current, t = u(e, -A), n = u(e, A), r = `${V}|${A}|${k}|${t.sec}:${t.nsec}|${n.sec}:${n.nsec}`;
		if (r !== X.current) {
			X.current = r;
			try {
				let e = (await b.getMessagesInTimeRange({
					start: t,
					end: n,
					topics: B
				})).map((e) => S(e, k));
				U(e);
			} catch (e) {
				console.warn("AlignPanel: range read failed", e);
			}
		}
	}, [
		B,
		V,
		b,
		k,
		A
	]);
	f(() => {
		Z();
	}, [
		Z,
		R,
		F,
		I
	]), f(() => {
		if (B.length === 0) return;
		let e = i.getSubscriberMessages(x);
		if (!e || e.length === 0) return;
		let t = new Set(B), n = c(L.current), r = BigInt(Math.round(A * 1e6)), a = e.filter((e) => t.has(e.topic)).map((e) => S(e, k));
		U((e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of e) t.set(T(n), n);
			for (let e of a) t.set(T(e), e);
			let i = [...t.values()];
			return i = ee(i, n, r), i.length > C && (i = i.slice(i.length - C)), i;
		});
	}, [
		re,
		x,
		B,
		k,
		A
	]);
	let Q = m(() => [...B].sort((e, t) => e.localeCompare(t)), [B]), $ = d(() => {
		let e = q.current, t = J.current;
		if (!e || !t) return;
		let n = t.getBoundingClientRect(), r = window.devicePixelRatio || 1, i = Math.max(1, n.width), a = Math.max(1, n.height);
		(e.width !== Math.floor(i * r) || e.height !== Math.floor(a * r)) && (e.width = Math.floor(i * r), e.height = Math.floor(a * r));
		let o = e.getContext("2d");
		if (!o) return;
		o.setTransform(r, 0, 0, r, 0, 0), o.clearRect(0, 0, i, a);
		let s = document.documentElement.classList.contains("dark"), l = s ? "#0a0a0a" : "#f8fafc", u = s ? "#27272a" : "#e2e8f0", d = s ? "#38bdf8" : "#0284c7";
		o.fillStyle = l, o.fillRect(0, 0, i, a);
		let f = w, p = Math.max(1, a - w * 2), m = c(L.current), h = BigInt(Math.round(A * 1e6)), g = m - h, _ = h * 2n, v = Number(_), y = Math.max(1, Q.length), b = p / y;
		o.strokeStyle = u, o.lineWidth = 1;
		for (let e = 0; e <= y; e++) {
			let t = f + e * b;
			o.beginPath(), o.moveTo(0, t), o.lineTo(i, t), o.stroke();
		}
		let x = i / 2;
		o.strokeStyle = d, o.lineWidth = 1.5, o.beginPath(), o.moveTo(x, f), o.lineTo(x, f + p), o.stroke();
		let S = new Map(Q.map((e, t) => [e, t]));
		o.fillStyle = d, o.globalAlpha = M;
		for (let e of H) {
			let t = S.get(e.topic);
			if (t == null) continue;
			let n = Number(e.plotNs - g) / v * i, r = f + t * b + b / 2;
			n < -2 || n > i + 2 || (o.beginPath(), o.arc(n, r, j, 0, Math.PI * 2), o.fill());
		}
		o.globalAlpha = 1, W && (o.strokeStyle = s ? "#fbbf24" : "#d97706", o.lineWidth = 1, o.beginPath(), o.arc(W.x, W.y, 6, 0, Math.PI * 2), o.stroke());
	}, [
		M,
		j,
		W,
		Q,
		H,
		A
	]);
	return f(() => {
		$();
	}, [
		$,
		R,
		H,
		W
	]), p(() => {
		let e = J.current;
		if (!e) return;
		let t = () => {
			let { clientWidth: t, clientHeight: n } = e;
			ie((e) => e.w === t && e.h === n ? e : {
				w: t,
				h: n
			});
		};
		t();
		let r = new ResizeObserver(() => {
			t(), n($);
		});
		return r.observe(e), () => r.disconnect();
	}, [$]), /* @__PURE__ */ _("div", {
		ref: J,
		className: "flex flex-col h-full min-h-0 bg-background text-foreground border-t border-border/60",
		onWheel: (e) => {
			e.preventDefault();
			let t = e.deltaY > 0 ? 1.12 : 1 / 1.12;
			D((e) => ({
				...e,
				windowHalfMs: E(Math.round(e.windowHalfMs * t), 50, 3e4)
			})), X.current = "";
		},
		children: /* @__PURE__ */ v("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ _("canvas", {
				ref: q,
				className: "absolute inset-0 w-full h-full block touch-none",
				onPointerMove: (e) => {
					let t = J.current;
					if (!t) return;
					let n = t.getBoundingClientRect(), r = Math.max(1, n.width), i = Math.max(1, n.height), a = e.clientX - n.left, o = e.clientY - n.top, s = w, l = Math.max(1, i - w * 2), u = c(L.current), d = BigInt(Math.round(A * 1e6)), f = u - d, p = d * 2n, m = Number(p), h = l / Math.max(1, Q.length), g = new Map(Q.map((e, t) => [e, t])), _ = null;
					for (let e of H) {
						let t = g.get(e.topic);
						if (t == null) continue;
						let n = Number(e.plotNs - f) / m * r, i = s + t * h + h / 2, c = a - n, l = o - i, u = Math.hypot(c, l);
						u <= 10 && (!_ || u < _.dist) && (_ = {
							dist: u,
							x: n,
							y: i,
							point: e
						});
					}
					G(_ ? {
						x: _.x,
						y: _.y,
						point: _.point,
						centerTime: L.current
					} : null);
				},
				onPointerLeave: () => G(null)
			}), W ? /* @__PURE__ */ v("div", {
				className: "absolute z-20 pointer-events-none rounded border border-border bg-card/95 px-2 py-1 text-[10px] font-mono shadow max-w-[min(360px,90vw)]",
				style: {
					left: E(W.x + 8, 4, K.w - 200),
					top: E(W.y + 8, 4, K.h - 80)
				},
				children: [
					/* @__PURE__ */ _("div", {
						className: "font-semibold truncate",
						title: W.point.topic,
						children: W.point.topic
					}),
					/* @__PURE__ */ _("div", { children: N({ id: "panels.align.overlay.plot" }, { value: te(W.point.plotNs, c(W.centerTime)) }) }),
					/* @__PURE__ */ _("div", { children: N({ id: "panels.align.overlay.receive" }, { value: l(s(W.point.receiveNs)) }) }),
					W.point.stampNs == null ? /* @__PURE__ */ _("div", {
						className: "text-muted-foreground",
						children: N({ id: "panels.align.overlay.stampNone" })
					}) : /* @__PURE__ */ _("div", { children: N({ id: "panels.align.overlay.stamp" }, { value: l(s(W.point.stampNs)) }) })
				]
			}) : null]
		})
	});
};
//#endregion
export { D as AlignPanel };
