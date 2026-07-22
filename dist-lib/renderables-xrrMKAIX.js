import { n as e, t } from "./transformTree-DVse8yrQ.js";
import * as n from "three";
import { ColladaLoader as r } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OBJLoader as i } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader as a } from "three/examples/jsm/loaders/STLLoader.js";
//#region src/features/panels/ThreeD/core/types.ts
function o(e) {
	let t = e.x, n = e.y, r = e.z, i = Math.cos(r * .5), a = Math.sin(r * .5), o = Math.cos(t * .5), s = Math.sin(t * .5), c = Math.cos(n * .5), l = Math.sin(n * .5);
	return {
		x: i * s * c - a * o * l,
		y: i * o * l + a * s * c,
		z: a * o * c - i * s * l,
		w: i * o * c + a * s * l
	};
}
//#endregion
//#region src/features/panels/ThreeD/core/urdf.ts
var s = /* @__PURE__ */ new Set([
	"fixed",
	"continuous",
	"revolute",
	"planar",
	"prismatic",
	"floating"
]);
function c(e) {
	let t = new DOMParser().parseFromString(e, "text/xml").querySelector("robot");
	if (!t) throw Error("No <robot> found in URDF");
	let n = l(t);
	return {
		robot: n,
		frames: Array.from(n.links.values(), (e) => e.name),
		transforms: Array.from(n.joints.values(), (e) => ({
			parent: e.parent,
			child: e.child,
			translation: e.origin.xyz,
			rotation: o(e.origin.rpy),
			joint: e
		}))
	};
}
function l(e) {
	let t = e.getAttribute("name");
	if (!t) throw Error("<robot> name is missing");
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of Array.from(e.children)) {
		let e = t.getAttribute("name");
		if (e) switch (t.nodeName) {
			case "link":
				n.set(e, u(t));
				break;
			case "joint":
				r.set(e, d(t));
				break;
			case "material":
				i.set(e, _(t));
				break;
			default: break;
		}
	}
	return {
		name: t,
		links: n,
		joints: r,
		materials: i
	};
}
function u(e) {
	let t = e.getAttribute("name");
	if (!t) throw Error("URDF link is missing name");
	let n = {
		name: t,
		visuals: [],
		colliders: []
	};
	for (let t of Array.from(e.children)) switch (t.nodeName) {
		case "visual":
			n.visuals.push(f(t));
			break;
		case "collision":
			n.colliders.push(p(t));
			break;
		default: break;
	}
	return n;
}
function d(e) {
	let t = e.getAttribute("name"), n = e.getAttribute("type");
	if (!t) throw Error("URDF joint is missing name");
	if (!n || !s.has(n)) throw Error(`Invalid joint type "${n}" for joint "${t}"`);
	let r, i, a, o, c;
	for (let t of Array.from(e.children)) switch (t.nodeName) {
		case "origin":
			r = v(t);
			break;
		case "parent":
			i = t.getAttribute("link") ?? void 0;
			break;
		case "child":
			a = t.getAttribute("link") ?? void 0;
			break;
		case "axis":
			o = b(t, "xyz") ?? void 0;
			break;
		case "limit":
			c = {
				lower: S(t, "lower") ?? 0,
				upper: S(t, "upper") ?? 0,
				effort: S(t, "effort") ?? 0,
				velocity: S(t, "velocity") ?? 0
			};
			break;
		default: break;
	}
	if (!i || !a) throw Error(`Joint "${t}" is missing parent or child`);
	return {
		name: t,
		jointType: n,
		origin: r ?? C(),
		parent: i,
		child: a,
		axis: o ?? {
			x: 1,
			y: 0,
			z: 0
		},
		limit: c
	};
}
function f(e) {
	let t = g(e, "visual");
	return {
		name: e.getAttribute("name") ?? void 0,
		origin: m(e) ?? C(),
		geometry: t,
		material: h(e)
	};
}
function p(e) {
	return {
		name: e.getAttribute("name") ?? void 0,
		origin: m(e) ?? C(),
		geometry: g(e, "collision")
	};
}
function m(e) {
	let t = Array.from(e.children).find((e) => e.nodeName === "origin");
	return t ? v(t) : void 0;
}
function h(e) {
	let t = Array.from(e.children).find((e) => e.nodeName === "material");
	return t ? _(t) : void 0;
}
function g(e, t) {
	let n = Array.from(e.children).find((e) => e.nodeName === "geometry");
	if (!n || n.children.length === 0) throw Error(`<${t}> must contain a <geometry> child`);
	return ee(n);
}
function ee(e) {
	let t = e.children[0];
	if (!t) throw Error("<geometry> must contain a geometry element");
	switch (t.nodeName) {
		case "box": {
			let e = b(t, "size");
			if (!e) throw Error("<box> is missing size");
			return {
				geometryType: "box",
				size: e
			};
		}
		case "cylinder": return {
			geometryType: "cylinder",
			radius: x(t, "radius"),
			length: x(t, "length")
		};
		case "sphere": return {
			geometryType: "sphere",
			radius: x(t, "radius")
		};
		case "mesh": {
			let e = t.getAttribute("filename");
			if (!e) throw Error("<mesh> is missing filename");
			return {
				geometryType: "mesh",
				filename: e,
				scale: b(t, "scale") ?? void 0
			};
		}
		default: throw Error(`Unsupported geometry type "${t.nodeName}"`);
	}
}
function _(e) {
	let t = { name: e.getAttribute("name") ?? void 0 };
	for (let n of Array.from(e.children)) switch (n.nodeName) {
		case "color":
			t.color = y(n, "rgba") ?? void 0;
			break;
		case "texture":
			t.texture = n.getAttribute("filename") ?? void 0;
			break;
		default: break;
	}
	return t;
}
function v(e) {
	return {
		xyz: b(e, "xyz") ?? {
			x: 0,
			y: 0,
			z: 0
		},
		rpy: b(e, "rpy") ?? {
			x: 0,
			y: 0,
			z: 0
		}
	};
}
function y(e, t) {
	let n = e.getAttribute(t);
	if (!n) return;
	let r = n.trim().split(/\s+/).map((e) => Number.parseFloat(e));
	if (!(r.length !== 4 || r.some((e) => Number.isNaN(e)))) return {
		r: r[0],
		g: r[1],
		b: r[2],
		a: r[3]
	};
}
function b(e, t) {
	let n = e.getAttribute(t);
	if (!n) return;
	let r = n.trim().split(/\s+/).map((e) => Number.parseFloat(e));
	if (!(r.length !== 3 || r.some((e) => Number.isNaN(e)))) return {
		x: r[0],
		y: r[1],
		z: r[2]
	};
}
function x(e, t) {
	let n = S(e, t);
	if (n == null) throw Error(`Missing attribute "${t}" on <${e.nodeName}>`);
	return n;
}
function S(e, t) {
	let n = e.getAttribute(t);
	if (!n) return;
	let r = Number.parseFloat(n);
	return Number.isNaN(r) ? void 0 : r;
}
function C() {
	return {
		xyz: {
			x: 0,
			y: 0,
			z: 0
		},
		rpy: {
			x: 0,
			y: 0,
			z: 0
		}
	};
}
function w(e, t) {
	let r = new n.Vector3(e.origin.xyz.x, e.origin.xyz.y, e.origin.xyz.z), i = new n.Quaternion(), a = o(e.origin.rpy);
	i.set(a.x, a.y, a.z, a.w);
	let s = new n.Matrix4().compose(r, i, new n.Vector3(1, 1, 1)), c = new n.Matrix4().identity(), l = new n.Vector3(e.axis.x, e.axis.y, e.axis.z);
	if (l.lengthSq() > 0 && l.normalize(), e.jointType === "revolute" || e.jointType === "continuous") {
		let e = new n.Quaternion().setFromAxisAngle(l, t);
		c.makeRotationFromQuaternion(e);
	} else e.jointType === "prismatic" && c.makeTranslation(l.x * t, l.y * t, l.z * t);
	s.multiply(c);
	let u = new n.Vector3(), d = new n.Quaternion(), f = new n.Vector3();
	return s.decompose(u, d, f), {
		translation: {
			x: u.x,
			y: u.y,
			z: u.z
		},
		rotation: {
			x: d.x,
			y: d.y,
			z: d.z,
			w: d.w
		}
	};
}
//#endregion
//#region src/features/panels/ThreeD/core/meshFormat.ts
function T(e) {
	return e === "stl" || e === "dae" || e === "obj";
}
function E(e) {
	let t = e.split("?")[0] ?? e, n = t.split("/").pop() ?? t;
	if (!n.includes(".")) return;
	let r = n.split(".").pop()?.toLowerCase();
	return T(r) ? r : void 0;
}
function D(e, t) {
	return E(e) ?? E(t);
}
//#endregion
//#region src/features/panels/ThreeD/core/renderables.ts
var O = new n.Vector3(1, 1, 1), k = new n.Matrix4(), A = new n.Vector3(1, 1, 1), j = /* @__PURE__ */ new Map(), M = "__ros3d_edge_outline__", N = 30, P = 1e4, F = /* @__PURE__ */ new WeakMap();
async function I(e, r) {
	let i = c(e), a = new t();
	for (let e of i.frames) a.addFrame(e);
	for (let e of i.transforms) a.addTransform(e.parent, e.child, 0n, e.translation, e.rotation);
	let o = new n.Group(), s = [], l = Array.from(i.robot.links.values()).reduce((e, t) => e + t.visuals.filter((e) => e.geometry.geometryType === "mesh").length, 0), u = 0, d = 0;
	l > 0 && r.onMeshLoadProgress?.({
		total: l,
		loaded: 0,
		failed: 0
	});
	for (let e of i.robot.links.values()) for (let t = 0; t < e.visuals.length; t += 1) {
		let n = e.visuals[t], a = await W(e.name, n, i, t, r);
		n.geometry.geometryType === "mesh" && (u += 1, a || (d += 1), r.onMeshLoadProgress?.({
			total: l,
			loaded: u,
			failed: d
		})), a && (s.push({
			frameId: e.name,
			object: a
		}), o.add(a));
	}
	let f = i.robot.links.has("world") ? "world" : U(i) ?? i.frames[0] ?? i.robot.name;
	return {
		root: o,
		parsed: i,
		transformTree: a,
		rootFrameId: f,
		frameObjects: s,
		hasRealtimeTf: !1,
		kinematicState: B(i, f)
	};
}
function L() {
	return {
		matrix: new n.Matrix4(),
		position: new n.Vector3(),
		rotation: new n.Quaternion()
	};
}
function R(e, t) {
	return new n.Matrix4().compose(new n.Vector3(e.x, e.y, e.z), new n.Quaternion(t.x, t.y, t.z, t.w), O);
}
function z(t, n) {
	let r = e(n), i = t.get(r);
	return i || (i = L(), t.set(r, i)), i;
}
function B(t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	for (let e of t.frames) z(o, e);
	for (let n of t.transforms) {
		let t = e(n.parent), s = e(n.child);
		i.set(s, t);
		let c = r.get(t) ?? [];
		c.push(s), r.set(t, c), a.set(s, R(n.translation, n.rotation)), z(o, t), z(o, s);
	}
	let s = {
		childrenByParent: r,
		parentByChild: i,
		localByChild: a,
		poseByFrame: o
	};
	return V(s, n, t.frames), s;
}
function V(t, n, r) {
	let i = /* @__PURE__ */ new Set(), a = n ? [e(n)] : [];
	for (let n of r) {
		let r = e(n);
		!t.parentByChild.has(r) && !a.includes(r) && a.push(r);
	}
	for (let e of t.childrenByParent.keys()) !t.parentByChild.has(e) && !a.includes(e) && a.push(e);
	let o = (e, n) => {
		if (i.has(e)) return;
		i.add(e);
		let r = z(t.poseByFrame, e), a = t.localByChild.get(e);
		n && a ? r.matrix.multiplyMatrices(n, a) : a ? r.matrix.copy(a) : r.matrix.identity(), r.matrix.decompose(r.position, r.rotation, A);
		for (let n of t.childrenByParent.get(e) ?? []) o(n, r.matrix);
	};
	for (let e of a) o(e);
}
function H(e) {
	return e.transformTree.getRootFrameId(e.rootFrameId) ?? e.rootFrameId ?? U(e.parsed) ?? e.parsed.frames[0];
}
function U(e) {
	let t = new Set(Array.from(e.robot.joints.values(), (e) => e.child));
	for (let n of e.robot.links.values()) if (!t.has(n.name)) return n.name;
}
async function W(e, t, r, i, a) {
	let s = new n.Group();
	s.name = `${e}-${i}-${t.geometry.geometryType}`;
	let c = new n.Group(), l = o(t.origin.rpy);
	c.position.set(t.origin.xyz.x, t.origin.xyz.y, t.origin.xyz.z), c.quaternion.set(l.x, l.y, l.z, l.w);
	let u = await G(t, r, a);
	if (u) return c.add(u), s.add(c), s;
}
async function G(e, t, r) {
	let i = oe(e.material, t) ?? new n.Color(r.fallbackMeshColor ?? "#94a3b8");
	switch (e.geometry.geometryType) {
		case "box": {
			let { size: t } = e.geometry;
			return K(new n.BoxGeometry(t.x, t.y, t.z), i);
		}
		case "sphere": return K(new n.SphereGeometry(e.geometry.radius, 24, 16), i);
		case "cylinder": {
			let t = K(new n.CylinderGeometry(e.geometry.radius, e.geometry.radius, e.geometry.length, 24), i);
			return t.rotateX(Math.PI / 2), t;
		}
		case "mesh": return await te(e, i, r);
		default: return;
	}
}
function K(e, t) {
	let r = q(t), i = new n.Mesh(e, r);
	return i.castShadow = !0, i.receiveShadow = !0, i;
}
function q(e) {
	return new n.MeshStandardMaterial({
		color: e,
		metalness: .08,
		roughness: .55,
		envMapIntensity: .25
	});
}
function J(e) {
	let t = e;
	return !!(t.map || t.normalMap || t.roughnessMap || t.metalnessMap);
}
function Y(e) {
	e.getAttribute("normal") || e.computeVertexNormals(), e.normalizeNormals();
}
function X(e) {
	let t = e.getIndex()?.count;
	return Math.ceil(t == null ? (e.getAttribute("position")?.count ?? 0) / 3 : t / 3);
}
function Z(e) {
	if (X(e) > P) return;
	let t = F.get(e);
	return t || (t = new n.EdgesGeometry(e, N), F.set(e, t)), t;
}
function Q(e, t) {
	if (e.children.some((e) => e.name === M)) return;
	let r = Z(e.geometry);
	if (!r) return;
	let i = new n.LineBasicMaterial({
		color: t,
		transparent: !0,
		opacity: .35,
		depthTest: !0,
		depthWrite: !1,
		toneMapped: !1
	}), a = new n.LineSegments(r, i);
	a.name = M, a.renderOrder = 1, e.add(a);
}
async function te(e, t, r) {
	let i = e.geometry, a = i.filename, o = r.resolveMeshUrl(a), s = await ne(o, D(a, o));
	if (s.ok === !1) {
		r.warn(o, `${s.reason} (source: ${a})`);
		return;
	}
	try {
		let e;
		return e = s.asset.kind === "stl" ? re(s.asset.buffer, t, r.meshUpAxis ?? "y_up") : s.asset.kind === "obj" ? ie(s.asset.text, t, r.meshUpAxis ?? "y_up") : ae(s.asset.text, o, r.meshUpAxis ?? "y_up"), i.scale && e.scale.set(i.scale.x, i.scale.y, i.scale.z), e.traverse((e) => {
			let i = e;
			if (!i.isMesh) return;
			i.geometry && Y(i.geometry), i.castShadow = !0, i.receiveShadow = !0;
			let a = !1, o = !1;
			if (Array.isArray(i.material)) {
				o = i.material.some((e) => J(e));
				return;
			}
			!i.material || i.material instanceof n.MeshBasicMaterial ? (i.material = q(t), a = !0) : o = J(i.material), (s.asset.kind === "stl" || s.asset.kind === "obj" || a && !o) && Q(i, r.outlineColor ?? "#94a3b8");
		}), e;
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		r.warn(o, t);
		return;
	}
}
async function ne(e, t) {
	let n = j.get(e);
	return n || (n = (async () => {
		if (!T(t)) return {
			ok: !1,
			reason: `unsupported mesh format: ${t ?? "unknown"}`
		};
		try {
			let n = await fetch(e);
			if (!n.ok) throw Error(`${n.status} ${n.statusText}`);
			return t === "stl" ? {
				ok: !0,
				asset: {
					kind: "stl",
					buffer: await n.arrayBuffer()
				}
			} : t === "obj" ? {
				ok: !0,
				asset: {
					kind: "obj",
					text: await n.text()
				}
			} : {
				ok: !0,
				asset: {
					kind: "dae",
					text: await n.text()
				}
			};
		} catch (e) {
			return {
				ok: !1,
				reason: e instanceof Error ? e.message : String(e)
			};
		}
	})(), j.set(e, n)), await n;
}
function re(e, t, r) {
	let i = K(new a().parse(e), t), o = new n.Group();
	return o.add(i), r === "y_up" && o.rotateX(Math.PI / 2), o;
}
function ie(e, t, r) {
	let a = new i().parse(e);
	return a.traverse((e) => {
		let r = e;
		r.isMesh && (!r.material || r.material instanceof n.MeshBasicMaterial) && (r.material = q(t));
	}), r === "y_up" && a.rotateX(Math.PI / 2), a;
}
function ae(e, t, n) {
	let i = new DOMParser().parseFromString(e, "application/xml"), a = (i.querySelector("up_axis")?.textContent ?? "Y_UP").trim().toUpperCase(), o = new r().parse(i.documentElement.outerHTML, t);
	return n === "y_up" && a === "Y_UP" && o.scene.rotateX(Math.PI / 2), o.scene;
}
function oe(e, t) {
	let r = e?.color;
	if (r) return new n.Color(r.r, r.g, r.b);
	if (e?.name) {
		let r = t.robot.materials.get(e.name);
		if (r?.color) return new n.Color(r.color.r, r.color.g, r.color.b);
	}
}
function se(t, n) {
	for (let r of n.transforms) {
		let n = e(r.header.frame_id), i = e(r.child_frame_id), a = BigInt(r.header.stamp.sec) * 1000000000n + BigInt(r.header.stamp.nsec);
		t.transformTree.addTransform(n, i, a, r.transform.translation, r.transform.rotation), t.hasRealtimeTf = !0;
	}
}
function ce(t, n) {
	if (!n || t.hasRealtimeTf) return 0;
	let r = 0;
	for (let i = 0; i < n.name.length; i += 1) {
		let a = n.name[i], o = n.position[i];
		if (a == null || o == null) continue;
		let s = t.parsed.robot.joints.get(a);
		if (!s) continue;
		let c = w(s, o);
		t.transformTree.addTransform(s.parent, s.child, 0n, c.translation, c.rotation), t.kinematicState.localByChild.set(e(s.child), R(c.translation, c.rotation)), r += 1;
	}
	return r > 0 && V(t.kinematicState, t.rootFrameId, t.parsed.frames), r;
}
function le(t, n) {
	let r = H(t);
	if (!r) return;
	let i = t.hasRealtimeTf ? n : 0n, a = e(r), o = t.hasRealtimeTf ? void 0 : t.kinematicState.poseByFrame.get(a);
	for (let n of t.frameObjects) {
		if (!t.hasRealtimeTf) {
			let a = t.kinematicState.poseByFrame.get(e(n.frameId));
			if (a && o) k.copy(o.matrix).invert().multiply(a.matrix), k.decompose(n.object.position, n.object.quaternion, A), n.object.visible = !0;
			else {
				let e = t.transformTree.getRelativeTransformInto(r, n.frameId, i, n.object.position, n.object.quaternion);
				n.object.visible = e;
			}
			continue;
		}
		let a = t.transformTree.getRelativeTransformInto(r, n.frameId, i, n.object.position, n.object.quaternion);
		n.object.visible = a;
	}
}
function $(e) {
	let t = e;
	for (let e of Object.keys(t)) {
		let n = t[e];
		n && typeof n == "object" && "isTexture" in n && n.isTexture && n.dispose();
	}
	e.dispose();
}
function ue(e) {
	if (e) {
		if (Array.isArray(e)) {
			for (let t of e) $(t);
			return;
		}
		$(e);
	}
}
function de(e) {
	e && (e.root.traverse((e) => {
		if (e.isMesh || e.isLineSegments) {
			let t = e;
			t.geometry && t.geometry.dispose(), ue(t.material);
		}
	}), e.root.clear());
}
//#endregion
export { de as a, I as i, ce as n, c as o, se as r, le as t };
