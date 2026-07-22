import { f as e, i as t, r as n } from "./rafScheduler-Be5Ie1zf.js";
import { t as r } from "./messageBus-D2dmTOBd.js";
import { o as i, r as a } from "./timeSeries-Al2bAf1m.js";
import { t as o } from "./transformTree-DVse8yrQ.js";
import { a as s, d as c, f as l, i as u, l as d, n as f, p, r as m, t as h } from "./r3fZUpSceneChrome-DvNW_aap.js";
import { Suspense as g, useCallback as _, useEffect as v, useMemo as y, useRef as b, useState as x } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
import { Canvas as T, useThree as E } from "@react-three/fiber";
import * as D from "three";
import { Line2 as O } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry as k } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial as A } from "three/examples/jsm/lines/LineMaterial.js";
//#region src/features/panels/Pose/trajectory.ts
function j(e, t, n, r = 6) {
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
var M = [
	"#38bdf8",
	"#f97316",
	"#22c55e",
	"#e879f9",
	"#f43f5e",
	"#facc15"
];
function N(e) {
	let t = e.trim().toLowerCase();
	return t === "geometry_msgs/msg/posestamped" || t === "geometry_msgs/posestamped";
}
var P = ({ signature: e }) => {
	let { invalidate: t } = E();
	return v(() => {
		t();
	}, [t, e]), null;
}, F = ({ band: e, color: t }) => {
	let { size: n } = E(), r = y(() => {
		let r = new k();
		r.setPositions(e.points.flat());
		let i = new A({
			color: t,
			linewidth: e.width,
			transparent: !0,
			opacity: .95,
			depthTest: !0
		});
		i.resolution.set(Math.max(1, n.width), Math.max(1, n.height));
		let a = new O(r, i);
		return a.computeLineDistances(), a;
	}, [
		e.points,
		e.width,
		t,
		n.height,
		n.width
	]);
	return v(() => () => {
		let e = r;
		e.geometry?.dispose(), Array.isArray(e.material) ? e.material.forEach((e) => e.dispose()) : e.material?.dispose();
	}, [r]), /* @__PURE__ */ C("primitive", { object: r });
}, I = ({ track: e, minLineWidth: t, maxLineWidth: n }) => {
	let r = y(() => e.samples.map((e) => e.position), [e.samples]);
	return /* @__PURE__ */ C(S, { children: y(() => j(r, t, n), [
		n,
		t,
		r
	]).map((t) => /* @__PURE__ */ C(F, {
		band: t,
		color: e.color
	}, `${e.topic}:${t.key}`)) });
}, L = ({ sample: e, scale: t, color: n }) => {
	let r = y(() => new D.Quaternion(e.orientation[0], e.orientation[1], e.orientation[2], e.orientation[3]), [e.orientation]);
	return /* @__PURE__ */ w("group", {
		position: e.position,
		quaternion: r,
		children: [/* @__PURE__ */ C("axesHelper", { args: [t] }), /* @__PURE__ */ w("mesh", { children: [/* @__PURE__ */ C("sphereGeometry", { args: [
			Math.max(t * .12, .01),
			12,
			8
		] }), /* @__PURE__ */ C("meshStandardMaterial", { color: n })] })]
	});
}, R = ({ player: S, panelId: E, config: O }) => {
	let { resolvedTheme: k } = n(), { formatMessage: A } = e(), j = t((e) => e.sortedTopics), F = y(() => j.filter((e) => N(e.type)), [j]), R = y(() => j.filter((e) => e.type.includes("TFMessage") || e.type.includes("tf2_msgs") || e.type.includes("tf/tfMessage")).map((e) => e.name), [j]), z = y(() => new Set(R), [R]), B = b(new o()), [V, H] = x([]), [U, W] = x(!1), G = b(null), K = y(() => new Map(O.topics.map((e) => [e.topic, e])), [O.topics]), q = y(() => F.map((e, t) => {
		let n = K.get(e.name);
		return {
			topic: e.name,
			color: n?.color ?? M[t % M.length],
			enabled: n?.enabled ?? !0
		};
	}), [F, K]), J = y(() => q.filter((e) => e.enabled !== !1 && e.topic.length > 0), [q]), Y = y(() => J.map((e) => e.topic), [J]), X = y(() => new Map(J.map((e) => [e.topic, e])), [J]);
	v(() => {
		let e = new Set(Y);
		H((t) => t.filter((t) => e.has(t.topic)));
	}, [Y]), v(() => {
		let e = [...Y];
		O.frameMode === "tfAligned" && e.push(...R);
		let t = Array.from(new Set(e));
		if (t.length === 0) {
			S.unregisterSubscriptions(E), H([]);
			return;
		}
		return S.registerSubscriptions(E, t.map((e) => ({
			topic: e,
			subscriberId: E
		}))), () => S.unregisterSubscriptions(E);
	}, [
		O.frameMode,
		E,
		S,
		R,
		Y
	]), v(() => S.subscribeCurrentTime((e) => {
		let t = i(e), n = G.current;
		n != null && n - t > .02 && (B.current = new o(), H([])), G.current = t;
	}), [S]);
	let Z = _(() => {
		let e = r.getSubscriberMessages(E);
		!e || e.length === 0 || H((t) => {
			let n = new Map(t.map((e) => [e.topic, e])), r = O.frameMode === "tfAligned";
			for (let t of e) {
				if (z.has(t.topic)) {
					let e = t.message;
					if (!Array.isArray(e.transforms)) continue;
					for (let t of e.transforms) {
						let e = t.header?.frame_id, n = t.child_frame_id, r = t.transform?.translation, i = t.transform?.rotation, a = t.header?.stamp, o = a?.sec, s = a?.nsec ?? a?.nanosec;
						if (typeof e != "string" || typeof n != "string" || !r || !i || typeof r.x != "number" || typeof r.y != "number" || typeof r.z != "number" || typeof i.x != "number" || typeof i.y != "number" || typeof i.z != "number" || typeof i.w != "number" || typeof o != "number" || typeof s != "number") continue;
						let c = r, l = i, u = BigInt(o) * 1000000000n + BigInt(s);
						B.current.addTransform(e, n, u, c, l);
					}
					continue;
				}
				let e = X.get(t.topic);
				if (!e || !N(t.schemaName)) continue;
				let o = p(t.message), s = l(t.message);
				if (!o || !s) continue;
				let u = a(t, "headerStamp"), d = i(u.time), f = BigInt(u.time.sec) * 1000000000n + BigInt(u.time.nsec), m = c(t.message), h = o, g = s;
				if (O.frameMode === "tfAligned" && m && O.targetFrame) {
					let e = B.current.getRelativeTransform(O.targetFrame, m, f);
					if (e) {
						let t = new D.Vector3(...o).applyQuaternion(e.rotation).add(e.position), n = e.rotation.multiply(new D.Quaternion(...s));
						h = [
							t.x,
							t.y,
							t.z
						], g = [
							n.x,
							n.y,
							n.z,
							n.w
						], r = !1;
					}
				}
				let _ = [...n.get(t.topic)?.samples ?? [], {
					t: d,
					frameId: m,
					position: h,
					orientation: g
				}], v = d - O.historySec, y = _.filter((e) => e.t >= v);
				n.set(t.topic, {
					topic: t.topic,
					color: e.color,
					samples: y
				});
			}
			return W(r), Array.from(n.values()).filter((e) => e.samples.length > 0);
		});
	}, [
		O.frameMode,
		O.historySec,
		O.targetFrame,
		E,
		z,
		X
	]);
	v(() => {
		let e = r.subscribeToMessages(E, Z);
		return Z(), e;
	}, [E, Z]), v(() => {
		O.frameMode === "tfAligned" ? R.length === 0 && W(!0) : W(!1);
	}, [O.frameMode, R.length]);
	let Q = y(() => d(k), [k]), $ = Q.panelBackgroundClassName, ee = y(() => V.map((e) => ({
		topic: e.topic,
		color: e.color,
		sample: e.samples[e.samples.length - 1]
	})).filter((e) => e.sample != null), [V]), te = y(() => `${Y.join("")}|${V.map((e) => `${e.topic}:${e.samples.length}`).join("")}`, [Y, V]);
	return /* @__PURE__ */ w("div", {
		className: `relative h-full w-full overflow-hidden [contain:strict] ${$}`,
		children: [
			U && /* @__PURE__ */ C("div", {
				className: `pointer-events-none absolute left-2 top-2 z-10 rounded border px-2 py-1 text-[10px] ${Q.overlayClassName}`,
				children: A({ id: "panels.pose.overlay.tfFallback" })
			}),
			J.length > 0 && /* @__PURE__ */ C("div", {
				className: `pointer-events-none absolute right-2 top-2 z-10 max-w-[min(24rem,48vw)] space-y-1 rounded px-2 py-1 text-[10px] font-mono ${Q.overlayClassName}`,
				children: J.map((e) => /* @__PURE__ */ w("div", {
					className: "flex items-center gap-1 overflow-hidden",
					children: [/* @__PURE__ */ C("span", {
						className: "inline-block h-2 w-2 shrink-0 rounded-sm",
						style: { backgroundColor: e.color }
					}), /* @__PURE__ */ C("span", {
						className: "truncate",
						children: e.topic
					})]
				}, e.topic))
			}),
			/* @__PURE__ */ C(T, {
				shadows: !0,
				frameloop: "demand",
				camera: u,
				gl: s,
				children: /* @__PURE__ */ w(g, {
					fallback: null,
					children: [
						/* @__PURE__ */ C(f, { background: Q.sceneBackground }),
						/* @__PURE__ */ C(m, {}),
						/* @__PURE__ */ C(P, { signature: te }),
						/* @__PURE__ */ C("ambientLight", { intensity: Q.ambientLightIntensity }),
						/* @__PURE__ */ C("hemisphereLight", { args: [
							"#ffffff",
							"#6b7280",
							Q.hemisphereLightIntensity
						] }),
						/* @__PURE__ */ C("directionalLight", {
							position: [
								6,
								-4,
								8
							],
							intensity: Q.keyLightIntensity
						}),
						/* @__PURE__ */ C("directionalLight", {
							position: [
								-6,
								4,
								5
							],
							intensity: Q.fillLightIntensity
						}),
						/* @__PURE__ */ C("directionalLight", {
							position: [
								-2,
								-7,
								6
							],
							intensity: Q.rimLightIntensity
						}),
						/* @__PURE__ */ C("group", {
							position: [
								0,
								0,
								0
							],
							children: /* @__PURE__ */ C("gridHelper", {
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								args: [
									20,
									10,
									Q.gridPrimary,
									Q.gridSecondary
								]
							})
						}),
						/* @__PURE__ */ C("axesHelper", { args: [1] }),
						V.map((e) => /* @__PURE__ */ C(I, {
							track: e,
							minLineWidth: O.minLineWidth,
							maxLineWidth: O.maxLineWidth
						}, e.topic)),
						O.showOrientation && ee.map((e) => /* @__PURE__ */ C(L, {
							sample: e.sample,
							scale: O.orientationScale,
							color: e.color
						}, `${e.topic}:axes`)),
						/* @__PURE__ */ C(h, { labelColor: Q.gizmoLabelColor })
					]
				})
			})
		]
	});
};
//#endregion
export { R as PosePanel };
