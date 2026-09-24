import { f as e, r as t, t as n } from "./rafScheduler-DAI3WzmT.js";
import { a as r, c as i, i as a, o, r as s, s as c, u as l } from "./transformTree-D_IPvW7z.js";
import { a as u, i as d, n as f, o as p, t as m } from "./renderables-CAr-deKW.js";
import { useCallback as h, useEffect as g, useLayoutEffect as _, useMemo as v, useRef as y, useState as b } from "react";
import { jsx as x, jsxs as S } from "react/jsx-runtime";
import "three";
//#region src/features/panels/UrdfDebug/previewStatus.ts
function C(e) {
	return e.frameObjects.filter((e) => e.object.visible).length;
}
//#endregion
//#region src/features/panels/UrdfDebug/Preview.tsx
var w = {
	position: [
		3,
		-3,
		2
	],
	up: [
		0,
		0,
		1
	],
	fov: 45,
	near: .5,
	far: 5e3
}, T = 3;
function E(e) {
	return e === "light" ? {
		panelBackgroundClassName: "bg-slate-50",
		overlayClassName: "bg-white/80 text-slate-800 border border-slate-200",
		overlayErrorClassName: "bg-red-50/95 text-red-800 border border-red-200",
		sceneBackground: "#f8fafc",
		gridPrimary: "#cbd5e1",
		gridSecondary: "#e2e8f0",
		gizmoLabelColor: "#0f172a",
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#1e293b"
	} : {
		panelBackgroundClassName: "bg-[#111]",
		overlayClassName: "bg-black/50 text-white border border-white/10",
		overlayErrorClassName: "bg-red-950/80 text-red-200 border border-red-500/40",
		sceneBackground: "#111111",
		gridPrimary: "#666",
		gridSecondary: "#444",
		gizmoLabelColor: "white",
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#94a3b8"
	};
}
var D = ({ colors: e, showGrid: t, showAxes: n }) => {
	let { scene: o, invalidate: c } = i();
	return _(() => {
		let i = r({ preset: "preview" });
		o.add(i.object);
		let l = t ? a({
			size: 10,
			divisions: 10,
			rotationX: -Math.PI / 2,
			primary: e.gridPrimary,
			secondary: e.gridSecondary
		}) : null;
		l && o.add(l.object);
		let u = n ? s(1) : null;
		return u && o.add(u.object), c(), () => {
			o.remove(i.object), i.dispose(), l && (o.remove(l.object), l.dispose()), u && (o.remove(u.object), u.dispose()), c();
		};
	}, [
		e.gridPrimary,
		e.gridSecondary,
		c,
		o,
		n,
		t
	]), null;
}, O = ({ urdf: e, jointState: t, highFrequencyPoseUpdates: r, resolveMeshUrl: a, fallbackMeshColor: s, meshOutlineColor: c, meshUpAxis: l, onMeshLoadProgressChange: p, onMeshIssue: v, onPreviewBuildResult: x }) => {
	let [S, w] = b(null), T = y(t), E = y(!0), D = y(!1), O = y(null), k = y([]), A = y({
		total: 0,
		failed: 0
	}), { invalidate: j } = i(), M = h((e, t) => {
		E.current && (E.current = !1, f(e, T.current)), m(e, 0n), t && e.root.updateMatrixWorld(!0), j();
	}, [j]), N = h(() => {
		S && !D.current && (D.current = !0, O.current = n(() => {
			D.current = !1, O.current = null, M(S, !1);
		}));
	}, [S, M]);
	_(() => {
		if (T.current = t, S) {
			if (E.current = !0, r) {
				N();
				return;
			}
			O.current?.(), O.current = null, D.current = !1, M(S, !0);
		}
	}, [
		S,
		t,
		r,
		N,
		M
	]), g(() => () => {
		O.current?.(), O.current = null, D.current = !1;
	}, [S]);
	let P = h((e, t) => {
		if (!x) return;
		if (!e) {
			x({
				status: "error",
				frameObjectCount: 0,
				visibleFrameCount: 0,
				meshTotal: A.current.total,
				meshFailed: A.current.failed,
				issues: k.current,
				errorMessage: t
			});
			return;
		}
		let n = e.frameObjects.length, r = C(e), { total: i, failed: a } = A.current, o = k.current;
		x({
			status: t == null ? i > 0 && n === 0 || n > 0 && r === 0 ? "empty" : "ready" : "error",
			frameObjectCount: n,
			visibleFrameCount: r,
			meshTotal: i,
			meshFailed: a,
			issues: o,
			errorMessage: t
		});
	}, [x]);
	return g(() => {
		let t = !1;
		return k.current = [], A.current = {
			total: 0,
			failed: 0
		}, x?.(null), p?.(null), (async () => {
			try {
				let n = await d(e, {
					resolveMeshUrl: a,
					meshUpAxis: l,
					warn: (e, t) => {
						k.current.push({
							url: e,
							reason: t
						}), v?.(e, t);
					},
					fallbackMeshColor: s,
					outlineColor: c,
					onMeshLoadProgress: (e) => {
						!t && e && (A.current = {
							total: e.total,
							failed: e.failed
						}, p?.(e));
					}
				});
				if (t) {
					u(n);
					return;
				}
				f(n, T.current), m(n, 0n), w(n), p?.(null), P(n);
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				k.current.push({
					url: "urdf",
					reason: t
				}), v?.("urdf", t), p?.(null), w(null), P(null, t);
			}
		})(), () => {
			t = !0, p?.(null), x?.(null), w((e) => (u(e), null));
		};
	}, [
		e,
		l,
		s,
		c,
		a,
		v,
		p,
		x,
		P
	]), o(S?.root ?? null), null;
}, k = ({ urdfText: n, jointState: r, highFrequencyPoseUpdates: i = !1, resolveMeshUrl: a, fallbackMeshColor: o, showGrid: s, showAxes: u, rotateMeshVisuals: d = !1, emptyHint: f, onMeshLoadProgressChange: p, onMeshIssue: m, onPreviewBuildResult: g }) => {
	let { formatMessage: _ } = e(), { resolvedTheme: y } = t(), C = v(() => E(y), [y]), k = d ? "z_up" : "y_up", [A, j] = b(null), [M, N] = b(null), P = A !== null && A.total > 0 && A.loaded < A.total, F = h((e) => {
		j(e), p?.(e);
	}, [p]), I = h((e) => {
		N(e), g?.(e);
	}, [g]);
	if (!n) return /* @__PURE__ */ x("div", {
		className: "h-full flex items-center justify-center text-xs text-muted-foreground italic px-4 text-center",
		children: f ?? _({ id: "urdfDebug.preview.empty" })
	});
	let L = M != null && (M.status === "error" || M.status === "empty"), R = P && A ? _({ id: "urdfDebug.preview.loadingMesh" }, {
		loaded: A.loaded,
		total: A.total
	}) : M?.status === "error" ? _({ id: "urdfDebug.preview.error" }, { message: M.errorMessage ?? M.issues[0]?.reason ?? "Unknown error" }) : M?.status === "empty" ? _({ id: "urdfDebug.preview.emptyModel" }, {
		failed: M.meshFailed,
		total: M.meshTotal,
		visible: M.visibleFrameCount
	}) : _({ id: "urdfDebug.preview.title" }, { rotateMesh: _({ id: d ? "urdfDebug.preview.rotateMeshOn" : "urdfDebug.preview.rotateMeshOff" }) }), z = M != null && M.issues.length > 0 ? M.issues.slice(0, T) : [];
	return /* @__PURE__ */ S("div", {
		className: `relative w-full h-full ${C.panelBackgroundClassName}`,
		children: [/* @__PURE__ */ S("div", {
			className: "absolute top-2 left-2 z-10 max-w-[min(92%,28rem)] space-y-1 pointer-events-none",
			children: [/* @__PURE__ */ x("div", {
				className: `px-2 py-1 rounded text-[10px] font-mono ${P ? "animate-pulse" : ""} ${L ? C.overlayErrorClassName : C.overlayClassName}`,
				children: R
			}), z.length > 0 && /* @__PURE__ */ S("div", {
				className: `px-2 py-1 rounded text-[10px] font-mono space-y-0.5 ${C.overlayErrorClassName}`,
				children: [z.map((e) => /* @__PURE__ */ x("div", {
					className: "break-all",
					children: e.url === "urdf" ? e.reason : _({ id: "urdfDebug.preview.issueLine" }, {
						url: e.url,
						reason: e.reason
					})
				}, `${e.url}:${e.reason}`)), M != null && M.issues.length > T && /* @__PURE__ */ x("div", {
					className: "opacity-80",
					children: _({ id: "urdfDebug.preview.moreIssues" }, { count: M.issues.length - T })
				})]
			})]
		}), /* @__PURE__ */ S(c, {
			shadows: !0,
			gl: l,
			camera: w,
			autoFrameToGrid: !1,
			background: C.sceneBackground,
			gizmoLabelColor: C.gizmoLabelColor,
			children: [/* @__PURE__ */ x(D, {
				colors: C,
				showGrid: s,
				showAxes: u
			}), /* @__PURE__ */ x(O, {
				urdf: n,
				jointState: r,
				highFrequencyPoseUpdates: i,
				resolveMeshUrl: a,
				fallbackMeshColor: o,
				meshOutlineColor: C.meshOutlineColor,
				meshUpAxis: k,
				onMeshLoadProgressChange: F,
				onMeshIssue: m,
				onPreviewBuildResult: I
			})]
		})]
	});
}, A = "https://assets.embodiflow.com/resources";
function j(e) {
	return e.endsWith("/") ? e.slice(0, -1) : e;
}
function M(e) {
	let t = e.split("?")[0] ?? e, n = t.split("/");
	return n[n.length - 1] ?? t;
}
function N(e, t) {
	let n = M(t);
	if (e.has(t)) return e.get(t);
	if (e.has(n)) return e.get(n);
	let r = t.includes("meshes/") ? t.slice(t.indexOf("meshes/")) : void 0;
	if (r && e.has(r)) return e.get(r);
}
function P(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = URL.createObjectURL(n);
		if (t.set(n.name, e), n.webkitRelativePath) {
			t.set(n.webkitRelativePath, e);
			let r = n.webkitRelativePath.indexOf("meshes/");
			r >= 0 && t.set(n.webkitRelativePath.slice(r), e);
		}
	}
	return t;
}
function F(e) {
	for (let t of e.values()) URL.revokeObjectURL(t);
	e.clear();
}
function I(e) {
	let t = typeof window < "u" ? window : void 0, n = j(e.defaultRemoteBase ?? t?.__ROS_STUDIO_URDF_PACKAGE_BASE__ ?? void 0 ?? A);
	return (r) => {
		if (/^https?:\/\//i.test(r)) return r;
		let i = e.strategy === "packageBaseUrl" && !!e.packageBaseUrl?.trim();
		if (e.strategy === "localUpload") {
			let t = N(e.localUrls, r);
			if (t) return t;
		}
		if (e.strategy === "leaveAsIs" && !r.startsWith("package://")) return r;
		if (r.startsWith("/")) {
			let t = r.replace(/^\/+/, "");
			return i && e.packageBaseUrl ? `${j(e.packageBaseUrl)}/${t}` : e.strategy === "packageBaseUrl" ? r : `${n}/${t}`;
		}
		if (r.startsWith("package://")) {
			let a = r.slice(10), o = a.indexOf("/"), s = o >= 0 ? a.slice(0, o) : a, c = o >= 0 ? a.slice(o + 1) : "";
			if (e.strategy === "localUpload") {
				let t = N(e.localUrls, c);
				if (t) return t;
			}
			if (i && e.packageBaseUrl) return c ? `${j(e.packageBaseUrl)}/${c}` : j(e.packageBaseUrl);
			if (e.strategy === "packageBaseUrl") return r;
			let l = t?.__ROS_STUDIO_URDF_PACKAGE_BASES__?.[s];
			if (l) {
				let e = j(l);
				return c ? `${e}/${c}` : e;
			}
			return e.packageName && e.packageName, `${n}/${a}`;
		}
		return i && e.packageBaseUrl ? `${j(e.packageBaseUrl)}/${r}` : r;
	};
}
//#endregion
//#region src/features/panels/UrdfDebug/urdfVisualCorrection.ts
var L = [
	-Math.PI / 2,
	0,
	0
];
function R(e, t, n) {
	let r = Math.cos(e), i = Math.sin(e), a = Math.cos(t), o = Math.sin(t), s = Math.cos(n), c = Math.sin(n);
	return [
		[
			s * a,
			s * o * i - c * r,
			s * o * r + c * i
		],
		[
			c * a,
			c * o * i + s * r,
			c * o * r - s * i
		],
		[
			-o,
			a * i,
			a * r
		]
	];
}
function z(e) {
	let t = -e[2][0];
	if (Math.abs(t) < 1 - 1e-6) {
		let n = Math.asin(t);
		return [
			Math.atan2(e[2][1], e[2][2]),
			n,
			Math.atan2(e[1][0], e[0][0])
		];
	}
	let n = t > 0 ? Math.PI / 2 : -Math.PI / 2;
	return [
		Math.atan2(-e[0][1], e[1][1]),
		n,
		0
	];
}
function B(e, t) {
	let n = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let r = 0; r < 3; r += 1) for (let i = 0; i < 3; i += 1) n[r][i] = e[r][0] * t[0][i] + e[r][1] * t[1][i] + e[r][2] * t[2][i];
	return n;
}
function V(e, t) {
	let n = R(e[0], e[1], e[2]);
	if (t.rotateMeshVisuals) {
		let e = R(...L);
		n = B(n, e);
	}
	if (!t.visualRpyOffset.every((e) => e === 0)) {
		let e = R(t.visualRpyOffset[0], t.visualRpyOffset[1], t.visualRpyOffset[2]);
		n = B(n, e);
	}
	return z(n);
}
function H(e, t) {
	if (!t.rotateMeshVisuals && t.visualRpyOffset.every((e) => e === 0)) return e;
	let n = e.replace(/(<visual\b[\s\S]*?<origin\b[^>]*\brpy=")([^"]*)(")/g, (e, n, r, i) => {
		let a = r.split(/\s+/).map(Number), o = V([
			Number.isFinite(a[0]) ? a[0] : 0,
			Number.isFinite(a[1]) ? a[1] : 0,
			Number.isFinite(a[2]) ? a[2] : 0
		], t);
		return `${n}${o[0]} ${o[1]} ${o[2]}${i}`;
	});
	return n = n.replace(/<visual\b[^>]*>([\s\S]*?)<\/visual>/g, (e, n) => {
		if (/<origin\b/i.test(n)) return e;
		let r = V([
			0,
			0,
			0
		], t), i = `<origin xyz="0 0 0" rpy="${r[0]} ${r[1]} ${r[2]}"/>`;
		return e.replace(/(<visual\b[^>]*>)/, `$1\n      ${i}`);
	}), n = n.replace(/(<visual\b[\s\S]*?<origin\b(?![^>]*\brpy=)[^>]*)(>)/g, (e, n, r) => {
		let i = V([
			0,
			0,
			0
		], t);
		return `${n} rpy="${i[0]} ${i[1]} ${i[2]}"${r}`;
	}), n;
}
var U = "const TELEOP_ROTATE_MESH_RPY = [-Math.PI / 2, 0, 0];\n\nfunction rotationMatrixFromRpy(roll, pitch, yaw) {\n  const cx = Math.cos(roll), sx = Math.sin(roll);\n  const cy = Math.cos(pitch), sy = Math.sin(pitch);\n  const cz = Math.cos(yaw), sz = Math.sin(yaw);\n  return [\n    [cz * cy, cz * sy * sx - sz * cx, cz * sy * cx + sz * sx],\n    [sz * cy, sz * sy * sx + cz * cx, sz * sy * cx - cz * sx],\n    [-sy, cy * sx, cy * cx],\n  ];\n}\n\nfunction rpyFromRotationMatrix(m) {\n  const sy = -m[2][0];\n  if (Math.abs(sy) < 1 - 1e-6) {\n    const pitch = Math.asin(sy);\n    const roll = Math.atan2(m[2][1], m[2][2]);\n    const yaw = Math.atan2(m[1][0], m[0][0]);\n    return [roll, pitch, yaw];\n  }\n  const pitch = sy > 0 ? Math.PI / 2 : -Math.PI / 2;\n  const roll = Math.atan2(-m[0][1], m[1][1]);\n  return [roll, pitch, 0];\n}\n\nfunction multiplyMat3(a, b) {\n  const out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];\n  for (let i = 0; i < 3; i += 1) {\n    for (let j = 0; j < 3; j += 1) {\n      out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];\n    }\n  }\n  return out;\n}\n\nfunction transformVisualOriginRpy(rpy, options) {\n  let matrix = rotationMatrixFromRpy(rpy[0], rpy[1], rpy[2]);\n  if (options.rotateMeshVisuals) {\n    matrix = multiplyMat3(matrix, rotationMatrixFromRpy(...TELEOP_ROTATE_MESH_RPY));\n  }\n  const offset = options.visualRpyOffset ?? [0, 0, 0];\n  if (!offset.every((value) => value === 0)) {\n    matrix = multiplyMat3(matrix, rotationMatrixFromRpy(offset[0], offset[1], offset[2]));\n  }\n  return rpyFromRotationMatrix(matrix);\n}\n\nfunction prepareUrdfXml(xml, recipe) {\n  const urdf = recipe.urdf ?? {};\n  const options = {\n    rotateMeshVisuals: !!urdf.rotateMeshVisuals,\n    visualRpyOffset: Array.isArray(urdf.visualRpyOffset) ? urdf.visualRpyOffset : [0, 0, 0],\n  };\n  if (!options.rotateMeshVisuals && options.visualRpyOffset.every((value) => value === 0)) {\n    return xml;\n  }\n  let result = xml.replace(\n    /(<visual\\b[\\s\\S]*?<origin\\b[^>]*\\brpy=\")([^\"]*)(\")/g,\n    (_match, prefix, rpyRaw, suffix) => {\n      const parts = rpyRaw.split(/\\s+/).map(Number);\n      const roll = Number.isFinite(parts[0]) ? parts[0] : 0;\n      const pitch = Number.isFinite(parts[1]) ? parts[1] : 0;\n      const yaw = Number.isFinite(parts[2]) ? parts[2] : 0;\n      const next = transformVisualOriginRpy([roll, pitch, yaw], options);\n      return `${prefix}${next[0]} ${next[1]} ${next[2]}${suffix}`;\n    },\n  );\n  result = result.replace(/<visual\\b[^>]*>([\\s\\S]*?)<\\/visual>/g, (full, inner) => {\n    if (/<origin\\b/i.test(inner)) {\n      return full;\n    }\n    const rpy = transformVisualOriginRpy([0, 0, 0], options);\n    const originTag = `<origin xyz=\"0 0 0\" rpy=\"${rpy[0]} ${rpy[1]} ${rpy[2]}\"/>`;\n    return full.replace(/(<visual\\b[^>]*>)/, `$1\\n      ${originTag}`);\n  });\n  result = result.replace(\n    /(<visual\\b[\\s\\S]*?<origin\\b(?![^>]*\\brpy=)[^>]*)(>)/g,\n    (_match, prefix, suffix) => {\n      const rpy = transformVisualOriginRpy([0, 0, 0], options);\n      return `${prefix} rpy=\"${rpy[0]} ${rpy[1]} ${rpy[2]}\"${suffix}`;\n    },\n  );\n  return result;\n}", ee = "import math\nimport re\n\nTELEOP_ROTATE_MESH_RPY = [-math.pi / 2, 0.0, 0.0]\n\ndef rotation_matrix_from_rpy(roll, pitch, yaw):\n    cx, sx = math.cos(roll), math.sin(roll)\n    cy, sy = math.cos(pitch), math.sin(pitch)\n    cz, sz = math.cos(yaw), math.sin(yaw)\n    return [\n        [cz * cy, cz * sy * sx - sz * cx, cz * sy * cx + sz * sx],\n        [sz * cy, sz * sy * sx + cz * cx, sz * sy * cx - cz * sx],\n        [-sy, cy * sx, cy * cx],\n    ]\n\ndef rpy_from_rotation_matrix(m):\n    sy = -m[2][0]\n    if abs(sy) < 1 - 1e-6:\n        pitch = math.asin(sy)\n        roll = math.atan2(m[2][1], m[2][2])\n        yaw = math.atan2(m[1][0], m[0][0])\n        return [roll, pitch, yaw]\n    pitch = math.pi / 2 if sy > 0 else -math.pi / 2\n    roll = math.atan2(-m[0][1], m[1][1])\n    return [roll, pitch, 0.0]\n\ndef multiply_mat3(a, b):\n    out = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]\n    for i in range(3):\n        for j in range(3):\n            out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j]\n    return out\n\ndef transform_visual_origin_rpy(rpy, options):\n    matrix = rotation_matrix_from_rpy(rpy[0], rpy[1], rpy[2])\n    if options['rotateMeshVisuals']:\n        matrix = multiply_mat3(matrix, rotation_matrix_from_rpy(*TELEOP_ROTATE_MESH_RPY))\n    offset = options.get('visualRpyOffset') or [0, 0, 0]\n    if not all(v == 0 for v in offset):\n        matrix = multiply_mat3(matrix, rotation_matrix_from_rpy(offset[0], offset[1], offset[2]))\n    return rpy_from_rotation_matrix(matrix)\n\ndef prepare_urdf_xml(xml, recipe):\n    urdf = recipe.get('urdf') or {}\n    options = {\n        'rotateMeshVisuals': bool(urdf.get('rotateMeshVisuals')),\n        'visualRpyOffset': urdf.get('visualRpyOffset') or [0, 0, 0],\n    }\n    if not options['rotateMeshVisuals'] and all(v == 0 for v in options['visualRpyOffset']):\n        return xml\n\n    def repl_rpy(match):\n        prefix, rpy_raw, suffix = match.group(1), match.group(2) or '0 0 0', match.group(3)\n        parts = [float(v or 0) for v in rpy_raw.split()]\n        while len(parts) < 3:\n            parts.append(0.0)\n        next_rpy = transform_visual_origin_rpy(parts[:3], options)\n        return f'{prefix}{next_rpy[0]} {next_rpy[1]} {next_rpy[2]}{suffix}'\n\n    result = re.sub(\n        r'(<visual\\b[\\s\\S]*?<origin\\b[^>]*\\brpy=\")([^\"]*)(\")',\n        repl_rpy,\n        xml,\n    )\n\n    def repl_missing_origin(match):\n        full, inner = match.group(0), match.group(1)\n        if re.search(r'<origin\\b', inner, re.I):\n            return full\n        rpy = transform_visual_origin_rpy([0.0, 0.0, 0.0], options)\n        origin_tag = f'<origin xyz=\"0 0 0\" rpy=\"{rpy[0]} {rpy[1]} {rpy[2]}\"/>'\n        return re.sub(r'(<visual\\b[^>]*>)', r'\\1\\n      ' + origin_tag, full, count=1)\n\n    result = re.sub(r'<visual\\b[^>]*>([\\s\\S]*?)</visual>', repl_missing_origin, result)\n\n    def repl_missing_rpy(match):\n        prefix, suffix = match.group(1), match.group(2)\n        rpy = transform_visual_origin_rpy([0.0, 0.0, 0.0], options)\n        return f'{prefix} rpy=\"{rpy[0]} {rpy[1]} {rpy[2]}\"{suffix}'\n\n    result = re.sub(\n        r'(<visual\\b[\\s\\S]*?<origin\\b(?![^>]*\\brpy=)[^>]*)(>)',\n        repl_missing_rpy,\n        result,\n    )\n    return result", te = 100, W = Math.PI, G = .05;
function K(e) {
	try {
		let t = p(e), n = Array.from(t.robot.joints.values()).filter((e) => e.jointType !== "fixed").map((e) => e.name), r = [];
		for (let e of t.robot.links.values()) for (let t of e.visuals) t.geometry.geometryType === "mesh" && r.push(t.geometry.filename);
		return {
			robotName: t.robot.name,
			linkCount: t.robot.links.size,
			jointCount: t.robot.joints.size,
			movableJointNames: n,
			meshReferences: r,
			mimicJoints: ce(e)
		};
	} catch {
		return null;
	}
}
function q(e, t, n) {
	return H(e, {
		rotateMeshVisuals: t,
		visualRpyOffset: n
	});
}
function J(e) {
	return e.filter((e) => e.name.includes("robot_description"));
}
function Y(e, t) {
	let n = J(e);
	if (t) {
		let e = n.find((e) => e.name === t);
		if (e) return e.name;
	}
	let r = n.find((e) => e.name === "/robot_description");
	return r ? r.name : n[0]?.name ?? "";
}
function X(e) {
	if (!e || typeof e != "object") return null;
	let t = e.data;
	return typeof t == "string" && t.length > 0 ? t : null;
}
function Z(e) {
	return e.includes("JointState");
}
function Q(e) {
	return e.filter((e) => Z(e.type));
}
function ne(e, t) {
	let n = Q(e);
	if (t) {
		let e = n.find((e) => e.name === t);
		if (e) return e.name;
	}
	let r = n.find((e) => e.name.endsWith("/joint_states") || e.name.includes("joint_states"));
	return r ? r.name : n[0]?.name ?? "";
}
function re(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function ie(e) {
	return e ? Number.isFinite(e.lower) && Number.isFinite(e.upper) && e.lower < e.upper : !1;
}
function ae(e) {
	switch (e.jointType) {
		case "revolute":
		case "prismatic": return ie(e.limit) ? {
			lower: e.limit.lower,
			upper: e.limit.upper,
			sliderEnabled: !0
		} : e.jointType === "prismatic" ? {
			lower: -.05,
			upper: G,
			sliderEnabled: !0
		} : {
			lower: -W,
			upper: W,
			sliderEnabled: !0
		};
		case "continuous": return {
			lower: -W,
			upper: W,
			sliderEnabled: !0
		};
		case "fixed": return {
			lower: 0,
			upper: 0,
			sliderEnabled: !1
		};
		default: return {
			lower: 0,
			upper: 0,
			sliderEnabled: !1
		};
	}
}
function oe(e) {
	let t = p(e);
	return Array.from(t.robot.joints.values()).map((e) => {
		let { lower: t, upper: n, sliderEnabled: r } = ae(e), i = n - t, a = i > 0 ? i / te : 0, o = re(0, t, n);
		return {
			name: e.name,
			jointType: e.jointType,
			lower: t,
			upper: n,
			step: a,
			defaultValue: o,
			sliderEnabled: r,
			valueUnit: e.jointType === "prismatic" ? "m" : "rad"
		};
	});
}
function se(e) {
	let t = {};
	for (let n of e) n.sliderEnabled && (t[n.name] = n.defaultValue);
	return t;
}
function ce(e) {
	let t = [], n = /<joint\b[\s\S]*?<\/joint>/g, r;
	for (; (r = n.exec(e)) !== null;) {
		let e = r[0], n = /<joint\b[^>]*\bname="([^"]+)"/.exec(e), i = /<mimic\b([^>]*)\/>/.exec(e);
		if (!n || !i) continue;
		let a = i[1], o = /\bjoint="([^"]+)"/.exec(a);
		if (!o) continue;
		let s = /\bmultiplier="([^"]+)"/.exec(a), c = /\boffset="([^"]+)"/.exec(a);
		t.push({
			jointName: n[1].trim(),
			sourceJoint: o[1].trim(),
			multiplier: s && Number(s[1]) || 1,
			offset: c && Number(c[1]) || 0
		});
	}
	return t;
}
//#endregion
//#region src/features/panels/UrdfDebug/meshBaseStatus.ts
function $(e) {
	let t = e.trim();
	return /^https?:\/\/.+/i.test(t) ? t.replace(/\/+$/, "") : null;
}
function le(e) {
	return /package:\/\/([^/\s"']+)\//.exec(e)?.[1] ?? null;
}
function ue(e) {
	return [...new Set(e.filter((e) => e.length > 0))];
}
function de(e, t, n) {
	return n === "leaveAsIs" ? { status: "unchecked" } : t.startsWith("blob:") ? { status: "local" } : (!t || t === e) && (e.startsWith("package://") || n === "localUpload") || n === "localUpload" && !t.startsWith("blob:") ? {
		status: "missing",
		error: "No matching local file"
	} : n === "packageBaseUrl" && !/^https?:\/\//i.test(t) ? {
		status: "missing",
		error: "Base URL not applied or invalid"
	} : /^https?:\/\//i.test(t) ? { status: "pending" } : { status: "unchecked" };
}
async function fe(e) {
	try {
		let t = await fetch(e, {
			method: "HEAD",
			mode: "cors"
		});
		return t.ok || (t.status === 405 || t.status === 501) && (t = await fetch(e, {
			method: "GET",
			headers: { Range: "bytes=0-0" }
		}), t.ok || t.status === 206) ? { status: "ok" } : {
			status: "error",
			error: `HTTP ${t.status}`
		};
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		return /failed to fetch|cors|network/i.test(t) ? {
			status: "cors",
			error: t
		} : {
			status: "error",
			error: t
		};
	}
}
async function pe(e) {
	let t = ue(e.meshReferences).map((t) => {
		let n = e.resolveMeshUrl(t);
		return {
			rawPath: t,
			resolvedUrl: n,
			...de(t, n, e.strategy)
		};
	});
	return Promise.all(t.map(async (e) => {
		if (e.status !== "pending") return e;
		let t = await fe(e.resolvedUrl);
		return {
			...e,
			...t
		};
	}));
}
function me(e) {
	let t = [
		"ok",
		"local",
		"unchecked"
	], n = e.filter((e) => t.includes(e.status)).length;
	return {
		ok: n,
		failed: e.length - n,
		total: e.length
	};
}
//#endregion
export { I as _, K as a, Q as c, q as d, X as f, P as g, H as h, me as i, ne as l, ee as m, le as n, se as o, U as p, $ as r, oe as s, pe as t, Y as u, F as v, k as y };
