import { createContext as e, useContext as t, useLayoutEffect as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import * as s from "three";
import { OrbitControls as c } from "three/examples/jsm/controls/OrbitControls.js";
//#region src/features/panels/common/zUpSceneLayout.ts
var l = new s.Vector3(0, 0, 1), u = [80, 80], d = [
	"#ff3653",
	"#0adb46",
	"#2c8fff"
], f = .8, p = new s.Vector3(Math.cos(Math.PI / 6), 0, Math.sin(Math.PI / 6)).normalize(), m = {
	position: [
		10,
		0,
		6
	],
	up: [
		0,
		0,
		1
	],
	fov: 45,
	near: .5,
	far: 5e3
}, h = { antialias: !0 };
function g(e, t, n, r = f) {
	let i = s.MathUtils.degToRad(e.fov), a = 2 * Math.atan(Math.tan(i / 2) * e.aspect), o = Math.tan(i / 2), c = Math.tan(a / 2), u = p.clone().negate(), d = new s.Vector3().crossVectors(u, l).normalize(), m = new s.Vector3().crossVectors(d, u).normalize(), h = n / 2, g = [
		new s.Vector3(-h, -h, 0),
		new s.Vector3(-h, h, 0),
		new s.Vector3(h, -h, 0),
		new s.Vector3(h, h, 0)
	], _ = 0;
	for (let e of g) {
		let t = e.dot(p);
		_ = Math.max(_, t + Math.abs(e.dot(d)) / (c * r), t + Math.abs(e.dot(m)) / (o * r));
	}
	e.up.copy(l), e.position.copy(t).addScaledVector(p, _), e.lookAt(t), e.near = Math.max(.01, _ / 1500), e.far = Math.max(6e3, _ * 80), e.updateProjectionMatrix();
}
function _(e, t, n = f) {
	let r = t.getCenter(new s.Vector3()), i = t.getSize(new s.Vector3()), a = new s.Vector3(-1, 0, .28).normalize(), o = a.clone().negate(), c = new s.Vector3().crossVectors(o, l).normalize(), u = new s.Vector3().crossVectors(c, o).normalize(), d = s.MathUtils.degToRad(e.fov), p = 2 * Math.atan(Math.tan(d / 2) * e.aspect), m = Math.tan(d / 2), h = Math.tan(p / 2), g = i.clone().multiplyScalar(.5), _ = [
		new s.Vector3(-g.x, -g.y, -g.z),
		new s.Vector3(-g.x, -g.y, g.z),
		new s.Vector3(-g.x, g.y, -g.z),
		new s.Vector3(-g.x, g.y, g.z),
		new s.Vector3(g.x, -g.y, -g.z),
		new s.Vector3(g.x, -g.y, g.z),
		new s.Vector3(g.x, g.y, -g.z),
		new s.Vector3(g.x, g.y, g.z)
	], v = .5;
	for (let e of _) {
		let t = e.dot(a);
		v = Math.max(v, t + Math.abs(e.dot(c)) / (h * n), t + Math.abs(e.dot(u)) / (m * n));
	}
	return v = Math.max(v, i.length() * .35 + .5), e.up.copy(l), e.position.copy(r).addScaledVector(a, v), e.lookAt(r), e.near = Math.max(.01, v / 1500), e.far = Math.max(6e3, v * 80), e.updateProjectionMatrix(), r;
}
//#endregion
//#region src/features/panels/common/threeCanvas/orbitControls.ts
function v(e, t, n) {
	let r = new c(e, t);
	return r.enableDamping = !0, r.addEventListener("change", () => {
		n();
	}), r;
}
//#endregion
//#region src/features/panels/common/threeCanvas/viewportAxesGizmo.ts
var y = "18px Inter var, Arial, sans-serif", b = 40, x = 2 * Math.PI, S = .75, C = [
	.8,
	.05,
	.05
];
function w(e) {
	let { canvas: t, camera: n, controls: r, invalidate: i } = e, a = e.labelColor, o = 0, c = 0, f = !1, p = !1, m = 0, h = new s.Scene(), g = new s.Group();
	g.scale.setScalar(b), h.add(g);
	let _ = u[0], v = new s.OrthographicCamera(-_, _, _, -_, 0, 400);
	v.position.set(0, 0, 200);
	let w = new s.Object3D();
	w.up.copy(n.up);
	let T = new s.Quaternion(), E = new s.Quaternion(), D = new s.Vector3(), O = new s.Vector4(), k = new s.Vector4(), A = new s.Vector2(), j = new s.Raycaster(), M = new s.BoxGeometry(C[0], C[1], C[2]), N = d.map((e) => new s.MeshBasicMaterial({
		color: e,
		toneMapped: !1
	}));
	function P(e, t) {
		let n = new s.Group();
		n.rotation.copy(t);
		let r = new s.Mesh(M, e);
		r.position.set(.4, 0, 0), n.add(r), g.add(n);
	}
	P(N[0], new s.Euler(0, 0, 0)), P(N[1], new s.Euler(0, 0, Math.PI / 2)), P(N[2], new s.Euler(0, -Math.PI / 2, 0));
	let F = [], I = [], L = [];
	function R(e, t, n) {
		let r = document.createElement("canvas");
		r.width = 64, r.height = 64;
		let i = r.getContext("2d");
		i && (i.beginPath(), i.arc(32, 32, 16, 0, Math.PI * 2), i.closePath(), i.fillStyle = e, i.fill(), t && (i.font = y, i.textAlign = "center", i.textBaseline = "alphabetic", i.fillStyle = n, i.fillText(t, 32, 41)));
		let a = new s.CanvasTexture(r);
		return a.colorSpace = s.SRGBColorSpace, a.needsUpdate = !0, F.push(a), a;
	}
	function z(e, t, n, r) {
		let i = R(t, n, a), o = new s.SpriteMaterial({
			map: i,
			alphaTest: .3,
			opacity: n ? 1 : S,
			toneMapped: !1,
			depthTest: !1
		});
		I.push(o);
		let c = new s.Sprite(o);
		return c.position.copy(e), c.scale.setScalar(n ? 1 : .75), c.userData.axisDirection = r.clone(), c.userData.label = n, c.userData.arcStyle = t, g.add(c), L.push(c), c;
	}
	z(new s.Vector3(1, 0, 0), d[0], "X", new s.Vector3(1, 0, 0)), z(new s.Vector3(0, 1, 0), d[1], "Y", new s.Vector3(0, 1, 0)), z(new s.Vector3(0, 0, 1), d[2], "Z", new s.Vector3(0, 0, 1)), z(new s.Vector3(-1, 0, 0), d[0], void 0, new s.Vector3(-1, 0, 0)), z(new s.Vector3(0, -1, 0), d[1], void 0, new s.Vector3(0, -1, 0)), z(new s.Vector3(0, 0, -1), d[2], void 0, new s.Vector3(0, 0, -1));
	function B() {
		let e = u[0] * 2;
		return o <= 0 || c <= 0 ? e : Math.min(e, o, c);
	}
	function V(e) {
		f = e, r.enabled = !e;
	}
	function H(e) {
		V(!0), w.up.copy(n.up), D.copy(r.target), m = n.position.distanceTo(D), T.copy(n.quaternion), w.position.set(0, 0, 0), w.up.copy(n.up), w.lookAt(e), E.copy(w.quaternion), i();
	}
	function U(e) {
		if (o <= 0 || c <= 0) return null;
		let n = t.getBoundingClientRect();
		if (n.width <= 0 || n.height <= 0) return null;
		let r = B() * (n.width / o), i = n.left + n.width - r, a = n.top + n.height - r;
		if (e.clientX < i || e.clientY < a || e.clientX > n.right || e.clientY > n.bottom) return null;
		A.x = (e.clientX - i) / r * 2 - 1, A.y = -((e.clientY - a) / r) * 2 + 1, j.setFromCamera(A, v);
		let l = j.intersectObjects(L, !1)[0]?.object.userData.axisDirection;
		return l instanceof s.Vector3 ? l : null;
	}
	let W = (e) => {
		if (p || e.button !== 0 || f) return;
		let t = U(e);
		t && (e.stopImmediatePropagation(), e.preventDefault(), H(t));
	};
	return t.addEventListener("pointerdown", W, !0), {
		get animating() {
			return f;
		},
		setSize(e, t) {
			o = e, c = t;
		},
		setLabelColor(e) {
			if (e !== a) {
				a = e;
				for (let e of L) {
					let t = e.userData.label;
					if (!t) continue;
					let n = e.material, r = n.map;
					n.map = R(e.userData.arcStyle, t, a), n.needsUpdate = !0, r?.dispose();
					let i = F.indexOf(r);
					i >= 0 && F.splice(i, 1);
				}
			}
		},
		update(e) {
			if (!f || p) return;
			if (T.angleTo(E) < .01) {
				V(!1), n.up.copy(l), w.up.copy(l), r.update(e);
				return;
			}
			let t = e * x;
			T.rotateTowards(E, t), n.position.set(0, 0, 1).applyQuaternion(T).multiplyScalar(m).add(D), n.up.set(0, 1, 0).applyQuaternion(T).normalize(), n.quaternion.copy(T), r.update(e), i();
		},
		render(e) {
			if (p || o <= 0 || c <= 0) return;
			g.quaternion.copy(n.quaternion).invert(), g.updateMatrixWorld(!0);
			let t = e.autoClear, r = e.getScissorTest();
			e.getViewport(O), e.getScissor(k);
			try {
				let t = B(), n = o - t;
				e.autoClear = !1, e.clearDepth(), e.setScissorTest(!0), e.setViewport(n, 0, t, t), e.setScissor(n, 0, t, t), e.render(h, v);
			} finally {
				e.autoClear = t, e.setViewport(O.x, O.y, O.z, O.w), e.setScissor(k.x, k.y, k.z, k.w), e.setScissorTest(r);
			}
		},
		dispose() {
			if (!p) {
				p = !0, V(!1), t.removeEventListener("pointerdown", W, !0), M.dispose();
				for (let e of N) e.dispose();
				for (let e of I) e.map = null, e.dispose();
				for (let e of F) e.dispose();
				F.length = 0, I.length = 0, L.length = 0;
			}
		}
	};
}
//#endregion
//#region src/features/panels/common/threeCanvas/threeCanvasRuntime.ts
var T = 60, E = 1 / 30, D = new s.Vector3(0, 0, 0);
function O(e) {
	return Math.min(2, Math.max(1, e));
}
function k() {
	return typeof window > "u" ? 1 : O(window.devicePixelRatio || 1);
}
function A(e) {
	let { canvas: t, shadows: n, gl: r, camera: i = m, autoFrameToGrid: a = !0, gizmoLabelColor: o, createRenderer: c } = e, l = {
		alpha: !0,
		powerPreference: "high-performance",
		...h,
		...r
	}, u = c?.(t, l) ?? new s.WebGLRenderer({
		canvas: t,
		...l
	});
	u.shadowMap.enabled = n !== !1, u.shadowMap.type = s.PCFSoftShadowMap, s.ColorManagement.enabled = !0, u.outputColorSpace = s.SRGBColorSpace, u.toneMapping = s.ACESFilmicToneMapping;
	let d = new s.Scene(), f = new s.Group();
	f.name = "contentRoot", d.add(f);
	let p = new s.PerspectiveCamera(i.fov, 1, i.near, i.far);
	p.up.set(i.up[0], i.up[1], i.up[2]), p.position.set(i.position[0], i.position[1], i.position[2]), p.lookAt(0, 0, 0), p.updateProjectionMatrix();
	let _ = {
		width: 0,
		height: 0,
		dpr: 1
	}, y = new s.Color(), b = /* @__PURE__ */ new Set(), x = performance.now(), S = 0, C = null, O = !1, A = !1, j = !1, M = 0, N = () => {
		if (C = null, A || _.width <= 0 || _.height <= 0) return;
		O = !0, M += 1;
		let e = performance.now(), t = Math.min(Math.max(0, (e - x) / 1e3), E);
		x = e;
		let n = F.enableDamping ? F.update(t) : !1;
		I.update(t), u.render(d, p), I.render(u), S = Math.max(0, S - 1);
		let r = S > 0 || n === !0 || I.animating;
		O = !1, !A && r && C == null && (C = requestAnimationFrame(N));
	}, P = (e = 1) => {
		A || (O || (M = 0), S = e > 1 ? Math.min(T, S + e) : O ? 2 : Math.max(S, 1), !(_.width <= 0 || _.height <= 0) && C == null && !O && (C = requestAnimationFrame(N)));
	}, F = v(p, t, P), I = w({
		canvas: t,
		camera: p,
		controls: F,
		labelColor: o,
		invalidate: P
	});
	return {
		renderer: u,
		scene: d,
		camera: p,
		controls: F,
		contentRoot: f,
		size: _,
		setBackground: (e) => {
			y.set(e), d.background = y;
		},
		setSize: (e, t) => {
			if (!A) {
				if (_.width = e, _.height = t, e > 0 && t > 0) {
					let n = k();
					_.dpr = n, u.setPixelRatio(n), u.setSize(e, t, !1), p.aspect = e / t, p.updateProjectionMatrix(), a && !j && (g(p, D, 20), F.target.copy(D), F.update(), j = !0), I.setSize(e, t);
				}
				for (let e of b) e(_);
				S > 0 && e > 0 && t > 0 && P();
			}
		},
		setGizmoLabelColor: (e) => {
			I.setLabelColor(e);
		},
		onResize: (e) => (b.add(e), () => {
			b.delete(e);
		}),
		invalidate: P,
		dispose: (e) => {
			A || (A = !0, C != null && (cancelAnimationFrame(C), C = null), F.dispose(), I.dispose(), u.renderLists.dispose?.(), u.dispose(), e?.loseContext === !0 && u.forceContextLoss?.(), b.clear());
		}
	};
}
//#endregion
//#region src/features/panels/common/threeCanvas/threeCanvasContext.ts
var j = e(null);
function M() {
	let e = t(j);
	if (e == null) throw Error("useThreeCanvas() requires a ready <ThreeCanvas> ancestor");
	return e;
}
//#endregion
//#region src/features/panels/common/threeCanvas/ThreeCanvas.tsx
var N = "pointer-events-none absolute left-2 top-2 z-10 rounded border px-2 py-1 text-[10px] bg-black/50 text-white border-white/10";
function P({ className: e, shadows: t, gl: s, camera: c, autoFrameToGrid: l, background: u, gizmoLabelColor: d, children: f, createRenderer: p }) {
	let m = r(null), [h, g] = i(null), [_, v] = i(!1);
	return n(() => {
		let e = m.current;
		if (!e) return;
		let n = document.createElement("canvas");
		n.className = "block h-full w-full", e.appendChild(n);
		let r;
		try {
			r = A({
				canvas: n,
				shadows: t,
				gl: s,
				camera: c,
				autoFrameToGrid: l,
				gizmoLabelColor: d,
				createRenderer: p
			});
		} catch {
			n.remove(), g(null), v(!0);
			return;
		}
		v(!1), r.setBackground(u), r.setGizmoLabelColor(d);
		let i = (e, t) => {
			r.setSize(e, t), r.invalidate();
		}, a = new ResizeObserver((e) => {
			let t = e[0]?.contentRect;
			t && i(t.width, t.height);
		});
		return a.observe(e), g(r), r.invalidate(), i(e.clientWidth, e.clientHeight), () => {
			a.disconnect(), r.dispose({ loseContext: !0 }), n.remove(), g(null);
		};
	}, []), n(() => {
		h && (h.setBackground(u), h.invalidate());
	}, [h, u]), n(() => {
		h && (h.setGizmoLabelColor(d), h.invalidate());
	}, [h, d]), /* @__PURE__ */ o("div", {
		ref: m,
		"data-testid": "three-canvas",
		className: `relative h-full w-full overflow-hidden ${e ?? ""}`,
		children: [_ ? /* @__PURE__ */ a("div", {
			className: N,
			"data-testid": "three-canvas-webgl-unavailable",
			children: "WebGL unavailable"
		}) : null, /* @__PURE__ */ a(j.Provider, {
			value: h,
			children: h ? f : null
		})]
	});
}
//#endregion
//#region src/features/panels/common/threeCanvas/useSceneObject.ts
function F(e) {
	let { contentRoot: t, invalidate: r } = M();
	n(() => {
		if (e) return t.add(e), r(), () => {
			t.remove(e), r();
		};
	}, [
		t,
		r,
		e
	]);
}
//#endregion
//#region src/features/panels/common/threeCanvas/zUpSceneHelpers.ts
function I(e) {
	e.traverse((e) => {
		let t = e;
		t.geometry && t.geometry.dispose();
		let n = t.material;
		if (n) {
			if (Array.isArray(n)) for (let e of n) e.dispose();
			else n.dispose();
		}
	});
}
function L(e) {
	let t = new s.Group();
	if (t.name = "zUpLights", e.preset === "preview") {
		t.add(new s.AmbientLight(16777215, .45)), t.add(new s.HemisphereLight("#ffffff", "#6b7280", .55));
		let e = new s.DirectionalLight(16777215, 1.05);
		e.position.set(6, -4, 8), t.add(e);
	} else {
		let { colors: n } = e;
		t.add(new s.AmbientLight(16777215, n.ambientLightIntensity)), t.add(new s.HemisphereLight("#ffffff", "#6b7280", n.hemisphereLightIntensity));
		let r = new s.DirectionalLight(16777215, n.keyLightIntensity);
		r.position.set(6, -4, 8), t.add(r);
		let i = new s.DirectionalLight(16777215, n.fillLightIntensity);
		i.position.set(-6, 4, 5), t.add(i);
		let a = new s.DirectionalLight(16777215, n.rimLightIntensity);
		a.position.set(-2, -7, 6), t.add(a);
	}
	return {
		object: t,
		dispose: () => {
			I(t);
		}
	};
}
function R(e) {
	let t = new s.GridHelper(e.size, e.divisions, e.primary, e.secondary);
	return t.rotation.x = e.rotationX, e.position && t.position.copy(e.position), {
		object: t,
		dispose: () => {
			I(t);
		}
	};
}
function z(e) {
	let t = new s.AxesHelper(e);
	return {
		object: t,
		dispose: () => {
			I(t);
		}
	};
}
//#endregion
//#region src/features/panels/ThreeD/core/transformTree.ts
var B = 32;
function V(e) {
	return new s.Vector3(e.x, e.y, e.z);
}
function H(e) {
	return new s.Quaternion(e.x, e.y, e.z, e.w);
}
var U = class {
	frames = /* @__PURE__ */ new Map();
	scratchRootMatrix = new s.Matrix4();
	scratchChildMatrix = new s.Matrix4();
	scratchLocalMatrix = new s.Matrix4();
	scratchRelativeMatrix = new s.Matrix4();
	scratchInvRootMatrix = new s.Matrix4();
	scratchComposePos = new s.Vector3();
	scratchComposeQuat = new s.Quaternion();
	scratchUnitScale = new s.Vector3(1, 1, 1);
	scratchDecomposeScale = new s.Vector3();
	scratchAncestors = [];
	scratchVisiting = /* @__PURE__ */ new Set();
	addFrame(e) {
		let t = G(e);
		t && !this.frames.has(t) && this.frames.set(t, {
			id: t,
			samples: []
		});
	}
	addTransform(e, t, n, r, i) {
		let a = G(e), o = G(t);
		if (!a || !o || a === o || (this.addFrame(a), this.addFrame(o), this.wouldCreateCycle(o, a))) return;
		let s = this.frames.get(o);
		s.parentId = a;
		let c = s.samples, l = {
			time: n,
			position: V(r),
			rotation: H(i)
		}, u = c.length > 0 ? c[c.length - 1] : void 0;
		if (!u || n > u.time) c.push(l);
		else if (n === u.time) c[c.length - 1] = l;
		else {
			let e = c.findIndex((e) => e.time === n);
			if (e >= 0) c[e] = l;
			else {
				let e = c.findIndex((e) => e.time > n);
				e === -1 ? c.push(l) : c.splice(e, 0, l);
			}
		}
		c.length > B && c.splice(0, c.length - B);
	}
	hasFrame(e) {
		return this.frames.has(G(e));
	}
	getRootFrameId(e) {
		let t = e ? G(e) : void 0;
		if (t && this.frames.has(t)) {
			let e = this.frames.get(t);
			for (; e.parentId;) {
				let t = this.frames.get(e.parentId);
				if (!t) break;
				e = t;
			}
			return e.id;
		}
		if (this.frames.has("world")) return "world";
		for (let e of this.frames.values()) if (!e.parentId) return e.id;
		return this.frames.keys().next().value;
	}
	getRelativeTransform(e, t, n) {
		let r = new s.Vector3(), i = new s.Quaternion();
		if (this.getRelativeTransformInto(e, t, n, r, i)) return {
			position: r,
			rotation: i
		};
	}
	getRelativeTransformInto(e, t, n, r, i) {
		return this.scratchVisiting.clear(), !this.buildWorldMatrixInto(G(e), n, this.scratchRootMatrix) || (this.scratchVisiting.clear(), !this.buildWorldMatrixInto(G(t), n, this.scratchChildMatrix)) ? !1 : (this.scratchInvRootMatrix.copy(this.scratchRootMatrix).invert(), this.scratchRelativeMatrix.multiplyMatrices(this.scratchInvRootMatrix, this.scratchChildMatrix), this.scratchRelativeMatrix.decompose(r, i, this.scratchDecomposeScale), !0);
	}
	getWorldMatrix(e, t) {
		let n = new s.Matrix4();
		return this.scratchVisiting.clear(), this.buildWorldMatrixInto(G(e), t, n) ? n : void 0;
	}
	buildWorldMatrixInto(e, t, n) {
		let r = this.scratchAncestors;
		r.length = 0;
		let i = e;
		for (; i;) {
			if (this.scratchVisiting.has(i)) return !1;
			let e = this.frames.get(i);
			if (!e) return !1;
			this.scratchVisiting.add(i), r.push(i), i = e.parentId;
		}
		n.identity();
		for (let e = r.length - 1; e >= 0; --e) {
			let i = this.frames.get(r[e]);
			if (i.parentId) {
				if (!W(i.samples, t, this.scratchComposePos, this.scratchComposeQuat)) return !1;
				this.scratchLocalMatrix.compose(this.scratchComposePos, this.scratchComposeQuat, this.scratchUnitScale), n.multiply(this.scratchLocalMatrix);
			}
		}
		return !0;
	}
	wouldCreateCycle(e, t) {
		let n = this.frames.get(t);
		for (; n?.parentId;) {
			if (n.parentId === e) return !0;
			n = this.frames.get(n.parentId);
		}
		return !1;
	}
};
function W(e, t, n, r) {
	if (e.length === 0) return !1;
	if (e.length === 1 || t <= e[0].time) return n.copy(e[0].position), r.copy(e[0].rotation), !0;
	if (t >= e[e.length - 1].time) {
		let t = e[e.length - 1];
		return n.copy(t.position), r.copy(t.rotation), !0;
	}
	let i = 0, a = e.length - 1;
	for (; a - i > 1;) {
		let n = i + a >> 1;
		e[n].time <= t ? i = n : a = n;
	}
	let o = e[i], s = e[a];
	if (o.time === s.time) return n.copy(s.position), r.copy(s.rotation), !0;
	let c = Number(t - o.time) / Number(s.time - o.time);
	return n.lerpVectors(o.position, s.position, c), r.slerpQuaternions(o.rotation, s.rotation, c), !0;
}
function G(e) {
	return e.startsWith("/") ? e.slice(1) : e;
}
//#endregion
export { L as a, M as c, l as d, _ as f, R as i, m as l, G as n, F as o, g as p, z as r, P as s, U as t, h as u };
