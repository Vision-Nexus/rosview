import { f as e, i as t, t as n } from "./rafScheduler-DNtaoEPW.js";
import { t as r } from "./shallow-DHPf4mbW.js";
import { o as i } from "./time-BoEDgjoH.js";
import { useCallback as a, useEffect as o, useMemo as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/features/panels/Timeline/TimelinePanel.tsx
function f(e) {
	return Number.isNaN(e) ? 0 : Math.min(100, Math.max(0, e));
}
function p(e, t) {
	return !t || t.status !== "ready" ? [] : (t.incidents ?? t.ranges).filter((t) => t.topicNames.includes(e) && t.type === "topic_frame_drop");
}
function m(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = i(n.receiveTime), r = t.get(n.topic);
		if (!r) {
			t.set(n.topic, {
				minNs: e,
				maxNs: e,
				count: 1
			});
			continue;
		}
		r.minNs = e < r.minNs ? e : r.minNs, r.maxNs = e > r.maxNs ? e : r.maxNs, r.count += 1;
	}
	return t;
}
var h = ({ player: h, config: g }) => {
	let { formatMessage: _ } = e(), { topics: v, startTime: y, endTime: b, report: x } = t(r((e) => ({
		topics: e.sortedTopics,
		startTime: e.playerState.activeData?.startTime,
		endTime: e.playerState.activeData?.endTime,
		report: e.playerState.progress.dataQualityReport
	}))), [S, C] = l(/* @__PURE__ */ new Map()), w = c(null), T = c(null), E = c(void 0), D = c(void 0), O = c(null);
	o(() => {
		let e = !1;
		async function t() {
			if (!h.getMessagesInTimeRange || !y || !b || v.length === 0) {
				C(/* @__PURE__ */ new Map());
				return;
			}
			try {
				let t = await h.getMessagesInTimeRange({
					start: y,
					end: b,
					topics: v.map((e) => e.name)
				});
				e || C(m(t));
			} catch (t) {
				e || (console.warn("TimelinePanel: failed to read topic time bounds", t), C(/* @__PURE__ */ new Map()));
			}
		}
		return t(), () => {
			e = !0;
		};
	}, [
		h,
		v,
		y,
		b
	]);
	let k = s(() => {
		if (!y || !b) return [];
		let e = i(y), t = i(b), n = t - e;
		return n <= 0n ? [] : v.map((r) => {
			let a = S.get(r.name), o, s, c = r.durationSec;
			if (a) {
				let r = a.minNs < e ? e : a.minNs, i = (a.maxNs > t ? t : a.maxNs) - r;
				i >= 0n && (o = f(Number((r - e) * 10000n / n) / 100), s = f(Number(i * 10000n / n) / 100), c = Number(i) / 1e9);
			}
			let l = g.showDrops ? p(r.name, x).map((r) => {
				let a = i(r.start), o = i(r.end), s = a < e ? e : a, c = (o > t ? t : o) - s;
				if (!(c <= 0n)) return {
					leftPercent: f(Number((s - e) * 10000n / n) / 100),
					widthPercent: Math.max(.3, f(Number(c * 10000n / n) / 100))
				};
			}).filter((e) => !!e) : [];
			return {
				name: r.name,
				messageCount: r.messageCount,
				durationSec: c,
				leftPercent: o,
				widthPercent: s,
				dropSegments: l
			};
		});
	}, [
		g.showDrops,
		b,
		x,
		S,
		y,
		v
	]), A = a((e) => {
		let t = w.current, n = T.current, r = E.current;
		if (!t || !n || !r || e == null) {
			t && (t.style.opacity = "0");
			return;
		}
		let i = e < r.startNs ? r.startNs : e > r.startNs + r.totalNs ? r.startNs + r.totalNs : e, a = Number((i - r.startNs) * 10000n / r.totalNs) / 1e4, o = Math.max(0, Math.min(n.clientWidth, n.clientWidth * a));
		t.style.transform = `translateX(${o}px)`, t.style.opacity = "1";
	}, []);
	return o(() => {
		if (!y || !b) {
			E.current = void 0, A(void 0);
			return;
		}
		let e = i(y), t = i(b) - e;
		if (t <= 0n) {
			E.current = void 0, A(void 0);
			return;
		}
		E.current = {
			startNs: e,
			totalNs: t
		}, A(D.current);
	}, [
		b,
		A,
		y
	]), o(() => {
		let e = h.subscribeCurrentTime((e) => {
			D.current = i(e), O.current ??= n(() => {
				O.current = null, A(D.current);
			});
		});
		return () => {
			e(), O.current?.(), O.current = null;
		};
	}, [A, h]), o(() => {
		let e = T.current;
		if (!e) return;
		let t = new ResizeObserver(() => {
			A(D.current);
		});
		return t.observe(e), () => t.disconnect();
	}, [A]), !y || !b || k.length === 0 ? /* @__PURE__ */ u("div", {
		className: "flex h-full items-center justify-center p-4 text-xs text-muted-foreground",
		children: _({ id: "panels.timeline.empty" })
	}) : /* @__PURE__ */ u("div", {
		className: "h-full overflow-auto p-2",
		children: /* @__PURE__ */ d("div", {
			className: "relative space-y-2",
			children: [/* @__PURE__ */ u("div", {
				ref: T,
				className: "pointer-events-none absolute inset-0 z-10",
				"aria-hidden": !0,
				children: /* @__PURE__ */ u("div", {
					ref: w,
					className: "absolute inset-y-0 left-0 w-px bg-amber-500/80 opacity-0",
					style: { transform: "translateX(0px)" },
					title: _({ id: "panels.timeline.currentTimeMarker" })
				})
			}), k.map((e) => {
				let t = e.durationSec == null ? _({ id: "panels.timeline.durationUnavailable" }) : _({ id: "panels.timeline.durationSeconds" }, { seconds: e.durationSec.toFixed(e.durationSec >= 10 ? 1 : 2) }), n = e.messageCount ?? 0, r = e.leftPercent != null && e.widthPercent != null;
				return /* @__PURE__ */ d("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ d("div", {
						className: "flex items-center justify-between gap-2 text-[12px] leading-4 text-foreground/90",
						children: [/* @__PURE__ */ u("div", {
							className: "min-w-0 truncate",
							title: e.name,
							children: e.name
						}), /* @__PURE__ */ d("div", {
							className: "shrink-0 text-muted-foreground",
							children: [
								"(",
								_({ id: "panels.timeline.messageCount" }, { count: n }),
								") (",
								t,
								")"
							]
						})]
					}), /* @__PURE__ */ d("div", {
						className: "relative h-1 overflow-hidden rounded bg-muted/60",
						children: [r && /* @__PURE__ */ u("div", {
							className: "absolute top-0 h-1 rounded bg-primary/80",
							style: {
								left: `${e.leftPercent}%`,
								width: `${Math.max(.8, e.widthPercent ?? 0)}%`
							}
						}), e.dropSegments.map((t, n) => /* @__PURE__ */ u("div", {
							className: "absolute top-0 h-1 bg-destructive",
							style: {
								left: `${t.leftPercent}%`,
								width: `${t.widthPercent}%`
							}
						}, `${e.name}-drop-${n}`))]
					})]
				}, e.name);
			})]
		})
	});
};
//#endregion
export { h as TimelinePanel };
