import e, { useCallback as t, useLayoutEffect as n, useRef as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { useThree as s } from "@react-three/fiber";
import { GizmoHelper as c, GizmoViewport as l, OrbitControls as u, PerspectiveCamera as d } from "@react-three/drei";
import * as f from "three";
//#region src/features/panels/common/poseExtractors.ts
function p(e) {
	return e && typeof e == "object" ? e : null;
}
function m(e) {
	let t = p(e);
	if (!t) return null;
	let n = t.pose, r = p(n);
	return r ? p(r.pose) ?? r : t;
}
function h(e) {
	let t = m(e);
	if (!t) return;
	let n = p(t.position ?? p(e)?.position);
	if (n && typeof n.x == "number" && typeof n.y == "number") return [
		n.x,
		n.y,
		typeof n.z == "number" ? n.z : 0
	];
}
function g(e) {
	let t = m(e);
	if (!t) return;
	let n = p(t.orientation);
	if (n && typeof n.x == "number" && typeof n.y == "number" && typeof n.z == "number" && typeof n.w == "number") return [
		n.x,
		n.y,
		n.z,
		n.w
	];
}
function _(e) {
	let t = p(p(e)?.header);
	return typeof t?.frame_id == "string" ? t.frame_id : "";
}
function v(e) {
	let t = p(e)?.poses;
	if (!Array.isArray(t)) {
		let t = h(e);
		return t ? [t] : [];
	}
	return t.map(h).filter((e) => e != null);
}
//#endregion
//#region src/features/panels/common/scenePanelTheme.ts
function y(e) {
	return e === "light" ? {
		panelBackgroundClassName: "bg-slate-50",
		overlayClassName: "bg-white/80 text-slate-800 border border-slate-200",
		sceneBackground: "#f8fafc",
		gridPrimary: "#cbd5e1",
		gridSecondary: "#e2e8f0",
		gizmoLabelColor: "#0f172a",
		pointCloudColor: "#0f766e",
		placeholderColor: "#f59e0b",
		ambientLightIntensity: .45,
		hemisphereLightIntensity: .55,
		keyLightIntensity: 1.2,
		fillLightIntensity: .6,
		rimLightIntensity: .85,
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#1e293b"
	} : {
		panelBackgroundClassName: "bg-[#111]",
		overlayClassName: "bg-black/50 text-white border border-white/10",
		sceneBackground: "#111111",
		gridPrimary: "#666",
		gridSecondary: "#444",
		gizmoLabelColor: "white",
		pointCloudColor: "#00ff00",
		placeholderColor: "orange",
		ambientLightIntensity: .35,
		hemisphereLightIntensity: .45,
		keyLightIntensity: 1.05,
		fillLightIntensity: .5,
		rimLightIntensity: .75,
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#94a3b8"
	};
}
//#endregion
//#region src/features/panels/common/zUpSceneLayout.ts
var b = new f.Vector3(0, 0, 1), x = [80, 80], S = [
	"#ff3653",
	"#0adb46",
	"#2c8fff"
], C = .8, w = new f.Vector3(Math.cos(Math.PI / 6), 0, Math.sin(Math.PI / 6)).normalize(), T = {
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
}, E = { antialias: !0 };
function D(e, t, n, r = C) {
	let i = f.MathUtils.degToRad(e.fov), a = 2 * Math.atan(Math.tan(i / 2) * e.aspect), o = Math.tan(i / 2), s = Math.tan(a / 2), c = w.clone().negate(), l = new f.Vector3().crossVectors(c, b).normalize(), u = new f.Vector3().crossVectors(l, c).normalize(), d = n / 2, p = [
		new f.Vector3(-d, -d, 0),
		new f.Vector3(-d, d, 0),
		new f.Vector3(d, -d, 0),
		new f.Vector3(d, d, 0)
	], m = 0;
	for (let e of p) {
		let t = e.dot(w);
		m = Math.max(m, t + Math.abs(e.dot(l)) / (s * r), t + Math.abs(e.dot(u)) / (o * r));
	}
	e.up.copy(b), e.position.copy(t).addScaledVector(w, m), e.lookAt(t), e.near = Math.max(.01, m / 1500), e.far = Math.max(6e3, m * 80), e.updateProjectionMatrix();
}
function O(e, t, n = C) {
	let r = t.getCenter(new f.Vector3()), i = t.getSize(new f.Vector3()), a = new f.Vector3(-1, 0, .28).normalize(), o = a.clone().negate(), s = new f.Vector3().crossVectors(o, b).normalize(), c = new f.Vector3().crossVectors(s, o).normalize(), l = f.MathUtils.degToRad(e.fov), u = 2 * Math.atan(Math.tan(l / 2) * e.aspect), d = Math.tan(l / 2), p = Math.tan(u / 2), m = i.clone().multiplyScalar(.5), h = [
		new f.Vector3(-m.x, -m.y, -m.z),
		new f.Vector3(-m.x, -m.y, m.z),
		new f.Vector3(-m.x, m.y, -m.z),
		new f.Vector3(-m.x, m.y, m.z),
		new f.Vector3(m.x, -m.y, -m.z),
		new f.Vector3(m.x, -m.y, m.z),
		new f.Vector3(m.x, m.y, -m.z),
		new f.Vector3(m.x, m.y, m.z)
	], g = .5;
	for (let e of h) {
		let t = e.dot(a);
		g = Math.max(g, t + Math.abs(e.dot(s)) / (p * n), t + Math.abs(e.dot(c)) / (d * n));
	}
	return g = Math.max(g, i.length() * .35 + .5), e.up.copy(b), e.position.copy(r).addScaledVector(a, g), e.lookAt(r), e.near = Math.max(.01, g / 1500), e.far = Math.max(6e3, g * 80), e.updateProjectionMatrix(), r;
}
//#endregion
//#region src/features/panels/common/r3fZUpSceneChrome.tsx
var k = e.memo(({ background: e }) => /* @__PURE__ */ a("color", {
	attach: "background",
	args: [e]
}));
k.displayName = "SceneBackgroundLayer";
var A = () => {
	let e = r(null), t = r(!1), { size: i, invalidate: o } = s();
	return n(() => {
		let n = e.current;
		if (!n || t.current) return;
		let r = i.width, a = i.height;
		r <= 0 || a <= 0 || (D(n, new f.Vector3(0, 0, 0), 20), t.current = !0, o());
	}, [
		i.width,
		i.height,
		o
	]), /* @__PURE__ */ a(d, {
		ref: e,
		makeDefault: !0,
		fov: T.fov,
		near: T.near,
		far: T.far,
		position: T.position,
		up: T.up
	});
}, j = e.memo(({ labelColor: e }) => {
	let { invalidate: n } = s(), r = t(() => {
		n();
	}, [n]);
	return /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(u, {
		makeDefault: !0,
		onChange: r
	}), /* @__PURE__ */ a(c, {
		alignment: "bottom-right",
		margin: x,
		children: /* @__PURE__ */ a(l, {
			axisColors: S,
			labelColor: e
		})
	})] });
});
j.displayName = "R3fZUpGizmoLayer";
//#endregion
export { E as a, D as c, _ as d, g as f, T as i, y as l, k as n, b as o, h as p, A as r, O as s, j as t, v as u };
