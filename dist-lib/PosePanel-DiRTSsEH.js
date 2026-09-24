import { f as e, i as t, r as n } from "./rafScheduler-DAI3WzmT.js";
import { t as r } from "./messageBus-tPJ7Uycq.js";
import { o as i, r as a } from "./timeSeries-Al2bAf1m.js";
import { a as o, c as s, i as c, l, o as u, r as d, s as f, t as p, u as m } from "./transformTree-D_IPvW7z.js";
import { a as h, i as g, r as _, t as v } from "./scenePanelTheme-Cta9QZF0.js";
import { useCallback as y, useEffect as b, useLayoutEffect as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import * as O from "three";
import { Line2 as k } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry as A } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial as j } from "three/examples/jsm/lines/LineMaterial.js";
//#region src/features/panels/Pose/trajectory.ts
function M(e, t, n, r = 6) {
	if (e.length < 2) return [];
	let i = e.length - 1, a = Math.max(.5, Math.min(t, n)), o = Math.max(a, n), s = [];
	for (let t = 0; t < r; t += 1) {
		let n = Math.floor(t / r * i), c = Math.floor((t + 1) / r * i), l = Math.max(0, Math.min(e.length - 2, n)), u = Math.max(l + 1, Math.min(e.length - 1, c + 1)), d = e.slice(l, u + 1);
		if (d.length < 2) continue;
		let f = (t + 1) / r;
		s.push({
			key: `${t}:${l}:${u}`,
			width: a + (o - a) * f,
			points: d
		});
	}
	return s;
}
//#endregion
//#region src/features/panels/Pose/PosePanel.tsx
var N = [
	"#38bdf8",
	"#f97316",
	"#22c55e",
	"#e879f9",
	"#f43f5e",
	"#facc15"
];
function P(e) {
	let t = e.trim().toLowerCase();
	return t === "geometry_msgs/msg/posestamped" || t === "geometry_msgs/posestamped";
}
var F = ({ signature: e }) => {
	let t = s();
	return b(() => {
		t.invalidate();
	}, [t, e]), null;
}, I = ({ colors: e }) => {
	let { scene: t, invalidate: n } = s();
	return x(() => {
		let r = o({
			preset: "full",
			colors: e
		}), i = c({
			size: 20,
			divisions: 10,
			rotationX: Math.PI / 2,
			primary: e.gridPrimary,
			secondary: e.gridSecondary
		}), a = d(1);
		return t.add(r.object), t.add(i.object), t.add(a.object), n(), () => {
			t.remove(r.object), t.remove(i.object), t.remove(a.object), r.dispose(), i.dispose(), a.dispose(), n();
		};
	}, [
		e,
		n,
		t
	]), null;
}, L = ({ band: e, color: t }) => {
	let n = s(), r = S(() => {
		let r = new A();
		r.setPositions(e.points.flat());
		let i = new j({
			color: t,
			linewidth: e.width,
			transparent: !0,
			opacity: .95,
			depthTest: !0
		});
		i.resolution.set(Math.max(1, n.size.width), Math.max(1, n.size.height));
		let a = new k(r, i);
		return a.computeLineDistances(), a;
	}, [
		e.points,
		e.width,
		t,
		n
	]);
	return x(() => {
		let e = r.material, t = (t) => {
			e.resolution.set(Math.max(1, t.width), Math.max(1, t.height));
		};
		return t(n.size), n.onResize(t);
	}, [n, r]), b(() => () => {
		r.geometry.dispose(), r.material.dispose();
	}, [r]), u(r), null;
}, R = ({ track: e, minLineWidth: t, maxLineWidth: n }) => {
	let r = S(() => e.samples.map((e) => e.position), [e.samples]), i = S(() => M(r, t, n), [
		n,
		t,
		r
	]);
	return /* @__PURE__ */ E(T, { children: i.map((t) => /* @__PURE__ */ E(L, {
		band: t,
		color: e.color
	}, `${e.topic}:${t.key}`)) });
}, z = new O.SphereGeometry(1, 12, 8), B = ({ sample: e, scale: t, color: n }) => {
	let { invalidate: r } = s(), i = S(() => {
		let e = new O.Group();
		e.add(new O.AxesHelper(t));
		let r = new O.Mesh(z, new O.MeshStandardMaterial({ color: n }));
		return r.scale.setScalar(Math.max(t * .12, .01)), e.add(r), e;
	}, [n, t]);
	return x(() => {
		i.position.set(e.position[0], e.position[1], e.position[2]), i.quaternion.set(e.orientation[0], e.orientation[1], e.orientation[2], e.orientation[3]), r();
	}, [
		i,
		r,
		e.orientation,
		e.position
	]), b(() => () => {
		i.traverse((e) => {
			let t = e;
			t.geometry && t.geometry !== z && t.geometry.dispose();
			let n = t.material;
			n && (Array.isArray(n) ? n.forEach((e) => e.dispose()) : n.dispose());
		});
	}, [i]), u(i), null;
}, V = ({ player: o, panelId: s, config: c }) => {
	let { resolvedTheme: u } = n(), { formatMessage: d } = e(), x = t((e) => e.sortedTopics), T = S(() => x.filter((e) => P(e.type)), [x]), k = S(() => x.filter((e) => e.type.includes("TFMessage") || e.type.includes("tf2_msgs") || e.type.includes("tf/tfMessage")).map((e) => e.name), [x]), A = S(() => new Set(k), [k]), j = C(new p()), [M, L] = w([]), [z, V] = w(!1), H = C(null), U = S(() => new Map(c.topics.map((e) => [e.topic, e])), [c.topics]), W = S(() => T.map((e, t) => {
		let n = U.get(e.name);
		return {
			topic: e.name,
			color: n?.color ?? N[t % N.length],
			enabled: n?.enabled ?? !0
		};
	}), [T, U]), G = S(() => W.filter((e) => e.enabled !== !1 && e.topic.length > 0), [W]), K = S(() => G.map((e) => e.topic), [G]), q = S(() => new Map(G.map((e) => [e.topic, e])), [G]);
	b(() => {
		let e = new Set(K);
		L((t) => t.filter((t) => e.has(t.topic)));
	}, [K]), b(() => {
		let e = [...K];
		c.frameMode === "tfAligned" && e.push(...k);
		let t = Array.from(new Set(e));
		if (t.length === 0) {
			o.unregisterSubscriptions(s), L([]);
			return;
		}
		return o.registerSubscriptions(s, t.map((e) => ({
			topic: e,
			subscriberId: s
		}))), () => o.unregisterSubscriptions(s);
	}, [
		c.frameMode,
		s,
		o,
		k,
		K
	]), b(() => o.subscribeCurrentTime((e) => {
		let t = i(e), n = H.current;
		n != null && n - t > .02 && (j.current = new p(), L([])), H.current = t;
	}), [o]);
	let J = y(() => {
		let e = r.getSubscriberMessages(s);
		e && e.length !== 0 && L((t) => {
			let n = new Map(t.map((e) => [e.topic, e])), r = c.frameMode === "tfAligned";
			for (let t of e) {
				if (A.has(t.topic)) {
					let e = t.message;
					if (!Array.isArray(e.transforms)) continue;
					for (let t of e.transforms) {
						let e = t.header?.frame_id, n = t.child_frame_id, r = t.transform?.translation, i = t.transform?.rotation, a = t.header?.stamp, o = a?.sec, s = a?.nsec ?? a?.nanosec;
						if (typeof e != "string" || typeof n != "string" || !r || !i || typeof r.x != "number" || typeof r.y != "number" || typeof r.z != "number" || typeof i.x != "number" || typeof i.y != "number" || typeof i.z != "number" || typeof i.w != "number" || typeof o != "number" || typeof s != "number") continue;
						let c = r, l = i, u = BigInt(o) * 1000000000n + BigInt(s);
						j.current.addTransform(e, n, u, c, l);
					}
					continue;
				}
				let e = q.get(t.topic);
				if (!e || !P(t.schemaName)) continue;
				let o = h(t.message), s = g(t.message);
				if (!o || !s) continue;
				let l = a(t, "headerStamp"), u = i(l.time), d = BigInt(l.time.sec) * 1000000000n + BigInt(l.time.nsec), f = _(t.message), p = o, m = s;
				if (c.frameMode === "tfAligned" && f && c.targetFrame) {
					let e = j.current.getRelativeTransform(c.targetFrame, f, d);
					if (e) {
						let t = new O.Vector3(...o).applyQuaternion(e.rotation).add(e.position), n = e.rotation.multiply(new O.Quaternion(...s));
						p = [
							t.x,
							t.y,
							t.z
						], m = [
							n.x,
							n.y,
							n.z,
							n.w
						], r = !1;
					}
				}
				let v = [...n.get(t.topic)?.samples ?? [], {
					t: u,
					frameId: f,
					position: p,
					orientation: m
				}], y = u - c.historySec, b = v.filter((e) => e.t >= y);
				n.set(t.topic, {
					topic: t.topic,
					color: e.color,
					samples: b
				});
			}
			return V(r), Array.from(n.values()).filter((e) => e.samples.length > 0);
		});
	}, [
		c.frameMode,
		c.historySec,
		c.targetFrame,
		s,
		A,
		q
	]);
	b(() => {
		let e = r.subscribeToMessages(s, J);
		return J(), e;
	}, [s, J]), b(() => {
		c.frameMode === "tfAligned" ? k.length === 0 && V(!0) : V(!1);
	}, [c.frameMode, k.length]);
	let Y = S(() => v(u), [u]), X = Y.panelBackgroundClassName, Z = S(() => M.map((e) => ({
		topic: e.topic,
		color: e.color,
		sample: e.samples[e.samples.length - 1]
	})).filter((e) => e.sample != null), [M]), Q = S(() => `${K.join("")}|${M.map((e) => `${e.topic}:${e.samples.length}`).join("")}`, [K, M]);
	return /* @__PURE__ */ D("div", {
		className: `relative h-full w-full overflow-hidden [contain:strict] ${X}`,
		children: [
			z && /* @__PURE__ */ E("div", {
				className: `pointer-events-none absolute left-2 top-2 z-10 rounded border px-2 py-1 text-[10px] ${Y.overlayClassName}`,
				children: d({ id: "panels.pose.overlay.tfFallback" })
			}),
			G.length > 0 && /* @__PURE__ */ E("div", {
				className: `pointer-events-none absolute right-2 top-2 z-10 max-w-[min(24rem,48vw)] space-y-1 rounded px-2 py-1 text-[10px] font-mono ${Y.overlayClassName}`,
				children: G.map((e) => /* @__PURE__ */ D("div", {
					className: "flex items-center gap-1 overflow-hidden",
					children: [/* @__PURE__ */ E("span", {
						className: "inline-block h-2 w-2 shrink-0 rounded-sm",
						style: { backgroundColor: e.color }
					}), /* @__PURE__ */ E("span", {
						className: "truncate",
						children: e.topic
					})]
				}, e.topic))
			}),
			/* @__PURE__ */ D(f, {
				shadows: !0,
				gl: m,
				camera: l,
				background: Y.sceneBackground,
				gizmoLabelColor: Y.gizmoLabelColor,
				children: [
					/* @__PURE__ */ E(I, { colors: Y }),
					/* @__PURE__ */ E(F, { signature: Q }),
					M.map((e) => /* @__PURE__ */ E(R, {
						track: e,
						minLineWidth: c.minLineWidth,
						maxLineWidth: c.maxLineWidth
					}, e.topic)),
					c.showOrientation && Z.map((e) => /* @__PURE__ */ E(B, {
						sample: e.sample,
						scale: c.orientationScale,
						color: e.color
					}, `${e.topic}:axes`))
				]
			})
		]
	});
};
//#endregion
export { V as PosePanel };
