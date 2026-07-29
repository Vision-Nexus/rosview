import { f as e, i as t, s as n, t as r } from "./rafScheduler-Be5Ie1zf.js";
import { f as i } from "./TopicQuickPicker-BAKU_tG3.js";
import { g as a, m as o, n as s, r as c, t as l, x as u } from "./resizable-D7WTiXmP.js";
import { t as d } from "./messageBus-D2dmTOBd.js";
import { _ as f, a as p, c as m, d as h, f as g, g as _, h as v, i as y, l as b, m as x, n as S, o as C, p as w, r as T, s as E, t as D, u as ee, v as te, y as ne } from "./meshBaseStatus-OyJpKbQZ.js";
import * as O from "react";
import { useCallback as k, useEffect as A, useMemo as j, useRef as re, useState as M } from "react";
import { jsx as N, jsxs as P } from "react/jsx-runtime";
//#region src/shared/ui/file-drop-zone.tsx
var ie = ({ accept: e, multiple: t = !1, directory: r = !1, disabled: a = !1, onFiles: o, title: s, hint: c, browseLabel: l, selectedLabel: d, error: f, testId: p, className: m }) => {
	let h = O.useRef(null), g = O.useRef(0), [_, v] = O.useState(!1), y = O.useCallback(() => {
		g.current = 0, v(!1);
	}, []), b = O.useCallback((e) => {
		a || e.length === 0 || o(e);
	}, [a, o]), x = (e) => {
		let t = Array.from(e.target.files ?? []);
		b(t), e.target.value = "";
	}, S = (e) => {
		a || !Array.from(e.dataTransfer.types).includes("Files") || (e.preventDefault(), e.stopPropagation(), g.current += 1, v(!0));
	}, C = (e) => {
		a || !Array.from(e.dataTransfer.types).includes("Files") || (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
	}, w = (e) => {
		a || (e.preventDefault(), e.stopPropagation(), g.current = Math.max(0, g.current - 1), g.current === 0 && v(!1));
	}, T = (e) => {
		a || !Array.from(e.dataTransfer.types).includes("Files") || (e.preventDefault(), e.stopPropagation(), y(), b(Array.from(e.dataTransfer.files)));
	}, E = () => {
		a || h.current?.click();
	};
	return /* @__PURE__ */ P("div", {
		className: n("space-y-1", m),
		children: [
			/* @__PURE__ */ P("div", {
				role: "button",
				tabIndex: a ? -1 : 0,
				"aria-disabled": a,
				className: n("flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-4 text-center transition-colors", a && "cursor-not-allowed opacity-50", !a && "cursor-pointer hover:border-primary/50 hover:bg-muted/30", _ && !a && "border-primary bg-muted/50", f ? "border-destructive/50" : "border-border"),
				onClick: E,
				onKeyDown: (e) => {
					a || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), E());
				},
				onDragEnter: S,
				onDragOver: C,
				onDragLeave: w,
				onDrop: T,
				children: [
					/* @__PURE__ */ N(u, {
						className: "h-5 w-5 text-muted-foreground",
						"aria-hidden": !0
					}),
					/* @__PURE__ */ P("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ N("div", {
							className: "text-xs font-medium",
							children: s
						}), c ? /* @__PURE__ */ N("div", {
							className: "text-[10px] text-muted-foreground",
							children: c
						}) : null]
					}),
					/* @__PURE__ */ N(i, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "h-7 text-xs pointer-events-none",
						tabIndex: -1,
						disabled: a,
						children: l
					}),
					/* @__PURE__ */ N("input", {
						ref: h,
						type: "file",
						className: "hidden",
						accept: e,
						multiple: t || r,
						"data-testid": p,
						disabled: a,
						...r ? {
							webkitdirectory: "",
							directory: ""
						} : {},
						onChange: x,
						onClick: (e) => e.stopPropagation()
					})
				]
			}),
			d ? /* @__PURE__ */ N("div", {
				className: "text-[10px] text-muted-foreground truncate",
				title: d,
				children: d
			}) : null,
			f ? /* @__PURE__ */ N("div", {
				className: "text-[10px] text-red-500",
				children: f
			}) : null
		]
	});
}, F = /\.(urdf|xml)$/i, ae = /\.(stl|dae|obj)$/i;
function oe(e) {
	return e.find((e) => F.test(e.name)) ?? null;
}
function I(e) {
	return e.filter((e) => ae.test(e.name));
}
//#endregion
//#region src/features/panels/UrdfDebug/MeshBaseSection.tsx
var L = {
	pending: "text-muted-foreground",
	ok: "text-emerald-600",
	local: "text-emerald-600",
	missing: "text-amber-600",
	error: "text-red-500",
	cors: "text-amber-600",
	unchecked: "text-muted-foreground"
};
function se(e, t) {
	return t({ id: `urdfDebug.meshStatus.${e}` });
}
function R(e) {
	if (e.length === 0) return null;
	let t = e[0]?.webkitRelativePath;
	if (!t) return null;
	let n = t.indexOf("/");
	return n >= 0 ? t.slice(0, n) : t;
}
var ce = ({ config: e, setConfig: t, urdfAnalysis: n, urdfFileContent: r, meshFiles: i, setMeshFiles: a, resolveMeshUrl: o, formatMessage: s }) => {
	let [c, l] = M(e.packageBaseUrl), [u, d] = M(null), [f, p] = M(null), [m, h] = M([]), [g, _] = M(!1), [v, b] = M(0);
	A(() => {
		l(e.packageBaseUrl);
	}, [e.packageBaseUrl]);
	let x = j(() => R(i), [i]), C = j(() => y(m), [m]), w = k(async () => {
		if (!n?.meshReferences.length) {
			h([]);
			return;
		}
		_(!0);
		try {
			let t = await D({
				meshReferences: n.meshReferences,
				resolveMeshUrl: o,
				strategy: e.meshStrategy
			});
			h(t);
		} finally {
			_(!1);
		}
	}, [
		n,
		o,
		e.meshStrategy
	]);
	A(() => {
		let t = !1;
		return (async () => {
			if (!n?.meshReferences.length) {
				t || h([]);
				return;
			}
			t || _(!0);
			try {
				let r = await D({
					meshReferences: n.meshReferences,
					resolveMeshUrl: o,
					strategy: e.meshStrategy
				});
				t || h(r);
			} finally {
				t || _(!1);
			}
		})(), () => {
			t = !0;
		};
	}, [
		n,
		o,
		e.meshStrategy,
		e.packageBaseUrl,
		i,
		v
	]);
	let E = (e) => {
		d(null), t((t) => ({
			...t,
			meshStrategy: e
		}));
	}, ee = k((e) => {
		let n = I(e);
		if (n.length === 0) {
			p(s({ id: "urdfDebug.upload.invalidMesh" }));
			return;
		}
		p(null), a(n), d(null), t((e) => ({
			...e,
			meshStrategy: "localUpload"
		}));
	}, [
		s,
		t,
		a
	]);
	return /* @__PURE__ */ P("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ N("div", {
				className: "text-[10px] text-muted-foreground leading-relaxed",
				children: s({ id: "urdfDebug.meshBase.hint" })
			}),
			/* @__PURE__ */ N("div", {
				className: "space-y-1",
				children: [
					["localUpload", "urdfDebug.meshBase.mode.localFolder"],
					["packageBaseUrl", "urdfDebug.meshBase.mode.remoteUrl"],
					["leaveAsIs", "urdfDebug.meshStrategy.leaveAsIs"]
				].map(([t, n]) => /* @__PURE__ */ P("label", {
					className: "flex items-center gap-2 text-xs cursor-pointer",
					children: [/* @__PURE__ */ N("input", {
						type: "radio",
						name: "mesh-base-mode",
						checked: e.meshStrategy === t,
						onChange: () => E(t)
					}), s({ id: n })]
				}, t))
			}),
			e.meshStrategy === "localUpload" && /* @__PURE__ */ N(ie, {
				directory: !0,
				multiple: !0,
				title: s({ id: "urdfDebug.upload.dropMeshTitle" }),
				hint: s({ id: "urdfDebug.upload.dropMeshHint" }),
				browseLabel: s({ id: "urdfDebug.upload.browse" }),
				selectedLabel: i.length > 0 ? s({ id: "urdfDebug.meshBase.folderSelected" }, {
					folder: x ?? "-",
					count: i.length
				}) : void 0,
				error: f,
				testId: "urdf-debug-mesh-upload",
				onFiles: ee
			}),
			e.meshStrategy === "packageBaseUrl" && /* @__PURE__ */ P("div", {
				className: "space-y-1 rounded border px-2 py-2 bg-muted/20",
				children: [
					/* @__PURE__ */ P("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ N("input", {
							className: "flex-1 min-w-0 text-xs border rounded px-2 py-1 bg-background",
							value: c,
							onChange: (e) => {
								l(e.target.value), d(null);
							},
							placeholder: s({ id: "urdfDebug.meshBase.remotePlaceholder" })
						}), /* @__PURE__ */ N("button", {
							type: "button",
							className: "shrink-0 text-xs px-2 py-1 rounded border bg-background hover:bg-muted/40",
							onClick: () => {
								let e = T(c);
								if (!e) {
									d(s({ id: "urdfDebug.meshBase.remoteInvalid" }));
									return;
								}
								d(null), t((t) => ({
									...t,
									meshStrategy: "packageBaseUrl",
									packageBaseUrl: e
								})), b((e) => e + 1);
							},
							children: s({ id: "urdfDebug.meshBase.apply" })
						})]
					}),
					u && /* @__PURE__ */ N("div", {
						className: "text-[10px] text-red-500",
						children: u
					}),
					e.packageBaseUrl ? /* @__PURE__ */ P("div", {
						className: "text-[10px] break-all",
						children: [/* @__PURE__ */ P("span", {
							className: "text-muted-foreground",
							children: [
								s({ id: "urdfDebug.meshBase.applied" }),
								":",
								" "
							]
						}), /* @__PURE__ */ N("span", {
							className: "font-mono text-emerald-700 dark:text-emerald-400",
							children: e.packageBaseUrl
						})]
					}) : /* @__PURE__ */ N("div", {
						className: "text-[10px] text-muted-foreground italic",
						children: s({ id: "urdfDebug.meshBase.remoteNotApplied" })
					})
				]
			}),
			/* @__PURE__ */ P("label", {
				className: "block space-y-1",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ N("span", {
						className: "text-[10px] text-muted-foreground",
						children: s({ id: "urdfDebug.field.packageName" })
					}), /* @__PURE__ */ N("button", {
						type: "button",
						className: "text-[10px] text-primary hover:underline",
						onClick: () => {
							let e = S(r);
							e && t((t) => ({
								...t,
								packageName: e
							}));
						},
						disabled: !r,
						children: s({ id: "urdfDebug.meshBase.detectPackage" })
					})]
				}), /* @__PURE__ */ N("input", {
					className: "w-full text-xs border rounded px-2 py-1 bg-background",
					value: e.packageName,
					onChange: (e) => t((t) => ({
						...t,
						packageName: e.target.value
					})),
					placeholder: "xArm7"
				})]
			}),
			n && n.meshReferences.length > 0 && /* @__PURE__ */ P("div", {
				className: "space-y-1 border rounded px-2 py-2",
				children: [
					/* @__PURE__ */ P("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ N("div", {
							className: "text-[10px] font-semibold",
							children: s({ id: "urdfDebug.meshBase.resolvedTitle" })
						}), /* @__PURE__ */ N("button", {
							type: "button",
							className: "text-[10px] text-primary hover:underline disabled:opacity-50",
							disabled: g,
							onClick: () => {
								b((e) => e + 1), w();
							},
							children: s({ id: "urdfDebug.meshBase.refresh" })
						})]
					}),
					/* @__PURE__ */ N("div", {
						className: "text-[10px] text-muted-foreground",
						children: g ? s({ id: "urdfDebug.meshBase.checking" }) : s({ id: "urdfDebug.meshBase.summary" }, {
							ok: C.ok,
							failed: C.failed,
							total: C.total
						})
					}),
					/* @__PURE__ */ N("div", {
						className: "max-h-44 overflow-auto space-y-1",
						children: m.map((e) => /* @__PURE__ */ P("div", {
							className: "text-[10px] border rounded px-2 py-1 space-y-0.5",
							children: [
								/* @__PURE__ */ N("div", {
									className: "font-mono truncate",
									title: e.rawPath,
									children: e.rawPath
								}),
								/* @__PURE__ */ P("div", {
									className: "font-mono break-all text-muted-foreground",
									title: e.resolvedUrl,
									children: ["→ ", e.resolvedUrl]
								}),
								/* @__PURE__ */ P("div", {
									className: `font-medium ${L[e.status]}`,
									children: [se(e.status, s), e.error ? `: ${e.error}` : ""]
								})
							]
						}, e.rawPath))
					})
				]
			})
		]
	});
};
//#endregion
//#region src/features/panels/UrdfDebug/jointPose.ts
function z(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function B(e, t) {
	if (!e) return;
	let n = e.name.indexOf(t);
	if (!(n < 0)) return e.position[n] ?? 0;
}
function V(e, t, n, r) {
	if (r) {
		let t = B(n, e.name);
		if (t != null) return z(t, e.lower, e.upper);
	}
	let i = t[e.name];
	return i != null && Number.isFinite(i) ? z(i, e.lower, e.upper) : e.defaultValue;
}
function le(e, t, n) {
	let r = new Map(n.map((e) => [e.name, e]));
	for (let n of t) {
		let t = e.get(n.sourceJoint);
		if (t == null) continue;
		let i = r.get(n.jointName), a = t * n.multiplier + n.offset;
		e.set(n.jointName, i ? z(a, i.lower, i.upper) : a);
	}
}
function ue(e) {
	let { descriptors: t, manualPositions: n, liveJointState: r, followLive: i, mimicJoints: a } = e;
	if (t.length === 0) return null;
	let o = /* @__PURE__ */ new Map();
	for (let e of t) e.sliderEnabled && o.set(e.name, V(e, n, r, i));
	le(o, a, t);
	let s = [...o.keys()];
	return s.length === 0 ? null : {
		name: s,
		position: s.map((e) => o.get(e) ?? 0)
	};
}
function H(e, t, n, r) {
	return V(e, t, n, r);
}
//#endregion
//#region src/features/panels/UrdfDebug/JointPoseSection.tsx
var U = /* @__PURE__ */ new Set(["planar", "floating"]);
function W(e, t) {
	return t({
		id: `urdfDebug.jointType.${e}`,
		defaultMessage: e
	});
}
var G = ({ descriptor: e, value: t, disabled: n, formatMessage: r, onChange: i }) => {
	let o = U.has(e.jointType);
	return /* @__PURE__ */ P("div", {
		className: "space-y-1 py-1 border-b border-border/50 last:border-b-0",
		children: [/* @__PURE__ */ P("div", {
			className: "flex items-center justify-between gap-2 min-w-0",
			children: [/* @__PURE__ */ N("span", {
				className: "text-[10px] font-mono truncate",
				title: e.name,
				children: e.name
			}), /* @__PURE__ */ N("span", {
				className: "text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0",
				children: W(e.jointType, r)
			})]
		}), e.sliderEnabled ? /* @__PURE__ */ P("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ N(a, {
				className: "flex-1",
				min: e.lower,
				max: e.upper,
				step: e.step > 0 ? e.step : .01,
				value: t,
				disabled: n,
				onChange: i
			}), /* @__PURE__ */ P("span", {
				className: "text-[10px] font-mono tabular-nums w-20 text-right shrink-0",
				children: [
					t.toFixed(3),
					" ",
					e.valueUnit
				]
			})]
		}) : /* @__PURE__ */ N("p", {
			className: "text-[10px] text-muted-foreground italic",
			children: r(o ? { id: "urdfDebug.joints.manualUnsupported" } : { id: "urdfDebug.joints.fixedJoint" })
		})]
	});
}, de = ({ descriptors: e, config: t, setConfig: n, topics: r, jointStateTopic: i, liveJointState: a, formatMessage: o }) => {
	let [s, c] = M(""), l = j(() => m(r), [r]), u = j(() => l.some((e) => e.name === t.jointStateTopic) ? t.jointStateTopic : i, [
		t.jointStateTopic,
		i,
		l
	]), d = j(() => {
		let t = s.trim().toLowerCase();
		return t ? e.filter((e) => e.name.toLowerCase().includes(t)) : e;
	}, [e, s]), f = (e, t) => {
		n((n) => ({
			...n,
			manualJointPositions: {
				...n.manualJointPositions,
				[e]: t
			}
		}));
	}, p = () => {
		n((t) => ({
			...t,
			manualJointPositions: C(e)
		}));
	}, h = (e) => {
		n((t) => {
			if (!e) return {
				...t,
				followLiveJointState: !1
			};
			let n = b(r, t.jointStateTopic);
			return {
				...t,
				followLiveJointState: !0,
				jointStateTopic: n || t.jointStateTopic
			};
		});
	};
	if (e.length === 0) return /* @__PURE__ */ N("p", {
		className: "text-[10px] text-muted-foreground italic",
		children: o({ id: "urdfDebug.joints.uploadUrdfHint" })
	});
	let g = t.followLiveJointState, _ = t.followLiveJointState;
	return /* @__PURE__ */ P("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ P("label", {
						className: "flex items-center gap-1.5 text-xs",
						children: [/* @__PURE__ */ N("input", {
							type: "checkbox",
							checked: t.followLiveJointState,
							onChange: (e) => h(e.target.checked)
						}), o({ id: "urdfDebug.joints.followLive" })]
					}),
					/* @__PURE__ */ P("select", {
						className: "flex-1 min-w-[140px] text-xs border rounded px-2 py-1 bg-background disabled:opacity-50",
						value: u,
						disabled: !_ || l.length === 0,
						onChange: (e) => n((t) => ({
							...t,
							jointStateTopic: e.target.value
						})),
						children: [/* @__PURE__ */ N("option", {
							value: "",
							children: o({ id: "urdfDebug.selectJointStateTopic" })
						}), l.map((e) => /* @__PURE__ */ N("option", {
							value: e.name,
							children: e.name
						}, e.name))]
					}),
					/* @__PURE__ */ N("button", {
						type: "button",
						className: "text-[10px] px-2 py-1 rounded border bg-muted hover:bg-muted/80 disabled:opacity-50",
						disabled: g,
						onClick: p,
						children: o({ id: "urdfDebug.joints.resetAll" })
					})
				]
			}),
			_ && l.length === 0 && /* @__PURE__ */ N("p", {
				className: "text-[10px] text-amber-600",
				children: o({ id: "urdfDebug.joints.noJointStateTopics" })
			}),
			_ && l.length > 0 && !u && /* @__PURE__ */ N("p", {
				className: "text-[10px] text-muted-foreground",
				children: o({ id: "urdfDebug.joints.selectJointStateTopicHint" })
			}),
			_ && u && !a && /* @__PURE__ */ N("p", {
				className: "text-[10px] text-muted-foreground",
				children: o({ id: "urdfDebug.joints.waitingForJointState" }, { topic: u })
			}),
			/* @__PURE__ */ N("input", {
				type: "search",
				className: "w-full text-xs border rounded px-2 py-1 bg-background",
				placeholder: o({ id: "urdfDebug.joints.filter" }),
				value: s,
				onChange: (e) => c(e.target.value)
			}),
			/* @__PURE__ */ N("div", {
				className: "max-h-64 overflow-y-auto space-y-0 pr-1",
				children: d.length === 0 ? /* @__PURE__ */ N("p", {
					className: "text-[10px] text-muted-foreground italic",
					children: o({ id: "urdfDebug.joints.noMatch" })
				}) : d.map((e) => /* @__PURE__ */ N(G, {
					descriptor: e,
					value: H(e, t.manualJointPositions, a, t.followLiveJointState),
					disabled: g || !e.sliderEnabled,
					formatMessage: o,
					onChange: (t) => f(e.name, t)
				}, e.name))
			})
		]
	});
};
//#endregion
//#region src/features/panels/UrdfDebug/jointStateMapping.ts
function K(e) {
	return typeof e == "object" && !!e && "length" in e;
}
function fe(e) {
	if (!e || typeof e != "object") return null;
	let t = e, n = t.name, r = t.position;
	if (!K(n) || !K(r) || n.length === 0) return null;
	let i = [];
	for (let e = 0; e < n.length; e += 1) {
		let t = n[e];
		if (typeof t != "string") return null;
		i.push(t);
	}
	return {
		name: i,
		position: Array.from(r, (e) => Number(e) || 0)
	};
}
//#endregion
//#region src/features/panels/UrdfDebug/recipe.ts
function pe(e, t) {
	return {
		version: 1,
		jointStateTopic: e.jointStateTopic,
		outputTfTopic: "/tf",
		outputRobotDescriptionTopic: "/robot_description",
		urdf: {
			fileName: e.urdfFileName || void 0,
			robotName: t,
			framePrefix: e.framePrefix || void 0,
			rotateMeshVisuals: e.rotateMeshVisuals,
			visualRpyOffset: [...e.visualRpyOffset]
		},
		meshes: {
			strategy: e.meshStrategy,
			packageName: e.packageName || void 0,
			packageBaseUrl: e.packageBaseUrl || void 0
		},
		rules: []
	};
}
function me(e, t) {
	let n = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = e, i.click(), URL.revokeObjectURL(r);
}
function he(e, t) {
	let n = new Blob([t], { type: "text/plain;charset=utf-8" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = e, i.click(), URL.revokeObjectURL(r);
}
//#endregion
//#region src/features/panels/UrdfDebug/embedded/fkEngine.js?raw
var q = "/** Standalone jointstate2tf FK engine for exported MCAP scripts. */\n\nfunction vec3(x = 0, y = 0, z = 0) {\n  return { x, y, z };\n}\n\nfunction quatIdentity() {\n  return { x: 0, y: 0, z: 0, w: 1 };\n}\n\nfunction vec3Add(a, b) {\n  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };\n}\n\nfunction vec3Scale(a, s) {\n  return { x: a.x * s, y: a.y * s, z: a.z * s };\n}\n\nfunction vec3Length(a) {\n  return Math.hypot(a.x, a.y, a.z);\n}\n\nfunction vec3Normalize(a) {\n  const len = vec3Length(a) || 1;\n  return { x: a.x / len, y: a.y / len, z: a.z / len };\n}\n\nfunction quatMultiply(a, b) {\n  return {\n    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,\n    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,\n    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,\n    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,\n  };\n}\n\nfunction quatFromAxisAngle(axis, angle) {\n  const n = vec3Normalize(axis);\n  const h = angle * 0.5;\n  const s = Math.sin(h);\n  return { x: n.x * s, y: n.y * s, z: n.z * s, w: Math.cos(h) };\n}\n\nfunction quatFromRPY(roll, pitch, yaw) {\n  const cx = Math.cos(roll * 0.5);\n  const sx = Math.sin(roll * 0.5);\n  const cy = Math.cos(pitch * 0.5);\n  const sy = Math.sin(pitch * 0.5);\n  const cz = Math.cos(yaw * 0.5);\n  const sz = Math.sin(yaw * 0.5);\n  return {\n    w: cz * cy * cx + sz * sy * sx,\n    x: cz * cy * sx - sz * sy * cx,\n    y: cz * sy * cx + sz * cy * sx,\n    z: sz * cy * cx - cz * sy * sx,\n  };\n}\n\nfunction vec3RotateByQuat(v, q) {\n  const { x, y, z } = v;\n  const qx = q.x;\n  const qy = q.y;\n  const qz = q.z;\n  const qw = q.w;\n  const uvx = qy * z - qz * y;\n  const uvy = qz * x - qx * z;\n  const uvz = qx * y - qy * x;\n  const uuvx = qy * uvz - qz * uvy;\n  const uuvy = qz * uvx - qx * uvz;\n  const uuvz = qx * uvy - qy * uvx;\n  return {\n    x: x + 2 * (qw * uvx + uuvx),\n    y: y + 2 * (qw * uvy + uuvy),\n    z: z + 2 * (qw * uvz + uuvz),\n  };\n}\n\nfunction composeTR(a, b) {\n  return {\n    r: quatMultiply(a.r, b.r),\n    t: vec3Add(a.t, vec3RotateByQuat(b.t, a.r)),\n  };\n}\n\nexport class JointState2TF {\n  constructor(model) {\n    this.model = model;\n  }\n\n  static fromXml(opts) {\n    return new JointState2TF(parseUrdf(opts.xml));\n  }\n\n  setJointState(jointState) {\n    const nameToPos = new Map();\n    jointState.name.forEach((n, i) => nameToPos.set(n, jointState.position[i] ?? 0));\n    nameToPos.forEach((pos, name) => {\n      const j = this.model.jointsByName.get(name);\n      if (j) j.q = pos;\n    });\n  }\n\n  compute(options = {}) {\n    const transforms = [];\n    const publishTimeNs = options.publishTimeNs != null ? Number(options.publishTimeNs) : null;\n    this.model.jointsByName.forEach((joint) => {\n      const motion = jointMotionTR(joint);\n      const rel = composeTR(joint.origin, motion);\n      const sec = publishTimeNs != null ? Math.trunc(publishTimeNs / 1e9) : 0;\n      const nanosec = publishTimeNs != null ? Math.trunc(publishTimeNs % 1e9) : 0;\n      transforms.push({\n        header: { stamp: { sec, nanosec }, frame_id: joint.parent },\n        child_frame_id: joint.child,\n        transform: {\n          translation: { x: rel.t.x, y: rel.t.y, z: rel.t.z },\n          rotation: { x: rel.r.x, y: rel.r.y, z: rel.r.z, w: rel.r.w },\n        },\n      });\n    });\n    return { transforms };\n  }\n\n  computeFromJointState(jointState, options = {}) {\n    this.setJointState(jointState);\n    return this.compute(options);\n  }\n}\n\nfunction parseUrdf(xml) {\n  const joints = extractJointBlocks(xml).map(parseJointBlock).filter(Boolean);\n  const jointsByName = new Map();\n  const jointsByParentLink = new Map();\n  const linkParent = new Map();\n  for (const j of joints) {\n    jointsByName.set(j.name, j);\n    linkParent.set(j.child, j.parent);\n    const arr = jointsByParentLink.get(j.parent) ?? [];\n    arr.push(j);\n    jointsByParentLink.set(j.parent, arr);\n  }\n  return { jointsByName, jointsByParentLink, linkParent };\n}\n\nfunction extractJointBlocks(xml) {\n  const blocks = [];\n  const re = /<joint\\b[\\s\\S]*?<\\/joint>/g;\n  let m;\n  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);\n  return blocks;\n}\n\nfunction parseJointBlock(block) {\n  const openMatch = /<joint\\b([^>]*)>/.exec(block);\n  if (!openMatch) return null;\n  const openAttrs = parseAttrs(openMatch[1]);\n  const name = (openAttrs.name ?? '').trim();\n  const type = (openAttrs.type ?? 'fixed').trim();\n  const parentLink = parseSingleTagAttr(block, 'parent', 'link');\n  const childLink = parseSingleTagAttr(block, 'child', 'link');\n  if (!name || !parentLink || !childLink) return null;\n  const originAttrs = parseFirstSelfOrOpenTag(block, 'origin');\n  const originT = parseXyz(originAttrs?.xyz);\n  const originRpy = parseRpy(originAttrs?.rpy);\n  const origin = { r: originRpy, t: originT };\n  let axis = vec3(1, 0, 0);\n  const axisAttrs = parseFirstSelfOrOpenTag(block, 'axis');\n  if (axisAttrs?.xyz) axis = parseXyzVec(axisAttrs.xyz);\n  const movable = ['revolute', 'continuous', 'prismatic', 'fixed'];\n  return {\n    name,\n    type: movable.includes(type) ? type : 'fixed',\n    parent: parentLink,\n    child: childLink,\n    origin,\n    axis: vec3Normalize(axis),\n    q: 0,\n  };\n}\n\nfunction parseAttrs(s) {\n  const out = {};\n  const re = /(\\w+)\\s*=\\s*\"([^\"]*)\"/g;\n  let m;\n  while ((m = re.exec(s)) !== null) out[m[1]] = m[2];\n  return out;\n}\n\nfunction parseSingleTagAttr(block, tag, attr) {\n  const re = new RegExp(`<${tag}\\\\b([^>]*)\\\\/>`);\n  const m = re.exec(block);\n  if (!m) return null;\n  const attrs = parseAttrs(m[1] ?? '');\n  const v = attrs[attr];\n  return typeof v === 'string' ? v.trim() : null;\n}\n\nfunction parseFirstSelfOrOpenTag(block, tag) {\n  let re = new RegExp(`<${tag}\\\\b([^>]*)\\\\/>`);\n  let m = re.exec(block);\n  if (m) return parseAttrs(m[1] ?? '');\n  re = new RegExp(`<${tag}\\\\b([^>]*)>`);\n  m = re.exec(block);\n  if (m) return parseAttrs(m[1] ?? '');\n  return null;\n}\n\nfunction parseXyz(s) {\n  if (!s) return vec3(0, 0, 0);\n  const [x, y, z] = s.split(/\\s+/).map(Number);\n  return vec3(x || 0, y || 0, z || 0);\n}\n\nfunction parseXyzVec(s) {\n  return parseXyz(s);\n}\n\nfunction parseRpy(s) {\n  if (!s) return quatIdentity();\n  const [r, p, y] = s.split(/\\s+/).map(Number);\n  return quatFromRPY(r || 0, p || 0, y || 0);\n}\n\nfunction jointMotionTR(j) {\n  switch (j.type) {\n    case 'revolute':\n    case 'continuous':\n      return { r: quatFromAxisAngle(j.axis, j.q), t: vec3(0, 0, 0) };\n    case 'prismatic':\n      return { r: quatIdentity(), t: vec3Scale(j.axis, j.q) };\n    default:\n      return { r: quatIdentity(), t: vec3(0, 0, 0) };\n  }\n}\n", J = "function clampValue(value, min, max) {\n  let out = value;\n  if (min != null && Number.isFinite(min)) out = Math.max(min, out);\n  if (max != null && Number.isFinite(max)) out = Math.min(max, out);\n  return out;\n}\n\nfunction applyLinear(value, scale, offset, min, max) {\n  return clampValue(value * scale + offset, min, max);\n}\n\nfunction applyJointMapping(input, rules) {\n  const inputMap = new Map();\n  for (let i = 0; i < input.name.length; i += 1) {\n    const jointName = input.name[i];\n    if (typeof jointName !== 'string' || !jointName) continue;\n    inputMap.set(jointName, input.position[i] ?? 0);\n  }\n  const ignored = new Set(rules.filter((r) => r.kind === 'ignore').map((r) => r.from));\n  const consumedInputs = new Set();\n  const output = new Map();\n  for (const rule of rules) {\n    switch (rule.kind) {\n      case 'ignore':\n        consumedInputs.add(rule.from);\n        output.delete(rule.from);\n        break;\n      case 'rename':\n        if (!inputMap.has(rule.from)) break;\n        consumedInputs.add(rule.from);\n        if (rule.from !== rule.to) output.delete(rule.from);\n        output.set(rule.to, inputMap.get(rule.from));\n        break;\n      case 'linear':\n        if (!inputMap.has(rule.from)) break;\n        consumedInputs.add(rule.from);\n        output.set(rule.to, applyLinear(inputMap.get(rule.from), rule.scale, rule.offset, rule.min, rule.max));\n        break;\n      case 'duplicate':\n        if (!inputMap.has(rule.from)) break;\n        consumedInputs.add(rule.from);\n        output.delete(rule.from);\n        for (const out of rule.outputs) {\n          output.set(out.to, applyLinear(inputMap.get(rule.from), out.scale, out.offset, out.min, out.max));\n        }\n        break;\n      case 'mimic':\n        if (!inputMap.has(rule.source)) break;\n        output.set(rule.to, applyLinear(inputMap.get(rule.source), rule.multiplier, rule.offset));\n        break;\n      case 'constant':\n        output.set(rule.to, rule.value);\n        break;\n      default:\n        break;\n    }\n  }\n  for (const [name, value] of inputMap) {\n    if (ignored.has(name) || consumedInputs.has(name)) continue;\n    if (!output.has(name)) output.set(name, value);\n  }\n  const names = [...output.keys()];\n  return { name: names, position: names.map((name) => output.get(name) ?? 0) };\n}", Y = "def clamp_value(value, min_v=None, max_v=None):\n    out = value\n    if min_v is not None:\n        out = max(min_v, out)\n    if max_v is not None:\n        out = min(max_v, out)\n    return out\n\ndef apply_linear(value, scale, offset, min_v=None, max_v=None):\n    return clamp_value(value * scale + offset, min_v, max_v)\n\ndef apply_joint_mapping(input_state, rules):\n    input_map = {}\n    for i, name in enumerate(input_state.get('name', [])):\n        if not name:\n            continue\n        positions = input_state.get('position', [])\n        input_map[name] = positions[i] if i < len(positions) else 0.0\n    ignored = {r['from'] for r in rules if r.get('kind') == 'ignore'}\n    consumed = set()\n    output = {}\n    for rule in rules:\n        kind = rule.get('kind')\n        if kind == 'ignore':\n            consumed.add(rule['from'])\n            output.pop(rule['from'], None)\n        elif kind == 'rename':\n            if rule['from'] not in input_map:\n                continue\n            consumed.add(rule['from'])\n            output.pop(rule['from'], None)\n            output[rule['to']] = input_map[rule['from']]\n        elif kind == 'linear':\n            if rule['from'] not in input_map:\n                continue\n            consumed.add(rule['from'])\n            output[rule['to']] = apply_linear(\n                input_map[rule['from']], rule['scale'], rule['offset'], rule.get('min'), rule.get('max')\n            )\n        elif kind == 'duplicate':\n            if rule['from'] not in input_map:\n                continue\n            consumed.add(rule['from'])\n            output.pop(rule['from'], None)\n            for out in rule.get('outputs', []):\n                output[out['to']] = apply_linear(\n                    input_map[rule['from']], out['scale'], out['offset'], out.get('min'), out.get('max')\n                )\n        elif kind == 'mimic':\n            if rule['source'] not in input_map:\n                continue\n            output[rule['to']] = apply_linear(\n                input_map[rule['source']], rule['multiplier'], rule['offset']\n            )\n        elif kind == 'constant':\n            output[rule['to']] = rule['value']\n    for name, value in input_map.items():\n        if name in ignored or name in consumed:\n            continue\n        output.setdefault(name, value)\n    names = list(output.keys())\n    return {'name': names, 'position': [output[name] for name in names]}", X = q.replace(/^export class JointState2TF/, "class JointState2TF"), Z = "const ROS2_DEFINITIONS = [\n  { name: 'builtin_interfaces/msg/Time', definitions: [{ name: 'sec', type: 'int32' }, { name: 'nanosec', type: 'uint32' }] },\n  { name: 'std_msgs/msg/Header', definitions: [{ name: 'stamp', type: 'builtin_interfaces/msg/Time', isComplex: true }, { name: 'frame_id', type: 'string' }] },\n  { name: 'geometry_msgs/msg/Vector3', definitions: [{ name: 'x', type: 'float64' }, { name: 'y', type: 'float64' }, { name: 'z', type: 'float64' }] },\n  { name: 'geometry_msgs/msg/Quaternion', definitions: [{ name: 'x', type: 'float64' }, { name: 'y', type: 'float64' }, { name: 'z', type: 'float64' }, { name: 'w', type: 'float64' }] },\n  { name: 'geometry_msgs/msg/Transform', definitions: [{ name: 'translation', type: 'geometry_msgs/msg/Vector3', isComplex: true }, { name: 'rotation', type: 'geometry_msgs/msg/Quaternion', isComplex: true }] },\n  { name: 'geometry_msgs/msg/TransformStamped', definitions: [{ name: 'header', type: 'std_msgs/msg/Header', isComplex: true }, { name: 'child_frame_id', type: 'string' }, { name: 'transform', type: 'geometry_msgs/msg/Transform', isComplex: true }] },\n  { name: 'tf2_msgs/msg/TFMessage', definitions: [{ name: 'transforms', type: 'geometry_msgs/msg/TransformStamped', isArray: true, isComplex: true }] },\n  { name: 'std_msgs/msg/String', definitions: [{ name: 'data', type: 'string' }] },\n  { name: 'sensor_msgs/msg/JointState', definitions: [{ name: 'header', type: 'std_msgs/msg/Header', isComplex: true }, { name: 'name', type: 'string', isArray: true }, { name: 'position', type: 'float64', isArray: true }, { name: 'velocity', type: 'float64', isArray: true }, { name: 'effort', type: 'float64', isArray: true }] },\n];", ge = `
class BufferReadable {
  constructor(buffer) {
    this.buffer = buffer;
  }
  size() {
    return BigInt(this.buffer.byteLength);
  }
  async read(offset, size) {
    const start = Number(offset);
    return this.buffer.subarray(start, start + Number(size));
  }
}

class BufferWritable {
  constructor() {
    this.#chunks = [];
    this.#pos = 0n;
  }
  #chunks;
  #pos;
  position() {
    return this.#pos;
  }
  async write(buffer) {
    this.#chunks.push(Buffer.from(buffer));
    this.#pos += BigInt(buffer.byteLength);
  }
  toBuffer() {
    return Buffer.concat(this.#chunks);
  }
}

${w}

function normalizeJointState(raw) {
  const name = Array.isArray(raw?.name) ? raw.name.map(String) : [];
  const position = Array.isArray(raw?.position) ? raw.position.map((v) => Number(v) || 0) : [];
  const header = raw?.header && typeof raw.header === 'object'
    ? raw.header
    : { stamp: { sec: 0, nanosec: 0 }, frame_id: '' };
  return { header, name, position };
}

function buildChannelDeserializer(channel, schema) {
  if (channel.messageEncoding === 'json') {
    const decoder = new TextDecoder();
    return (data) => JSON.parse(decoder.decode(data));
  }
  if (!schema?.data?.length) {
    throw new Error(\`Missing schema for \${channel.topic}\`);
  }
  const text = new TextDecoder().decode(schema.data);
  const reader = new MessageReader(parseMessageDefinition(text));
  return (data) => reader.readMessage(data);
}

function buildChannelSerializer(schemaName, writers) {
  const writer = writers[schemaName];
  if (!writer) throw new Error(\`Missing writer for \${schemaName}\`);
  return (msg) => writer.writeMessage(msg);
}

async function processMcap({ inputPath, outputPath, recipe, urdfXml, overwriteTopics }) {
  const tfTopic = recipe.outputTfTopic ?? '/tf';
  const robotDescTopic = recipe.outputRobotDescriptionTopic ?? '/robot_description';
  const jointTopic = recipe.jointStateTopic;
  if (!jointTopic) throw new Error('recipe.jointStateTopic is required');

  const inputBuffer = readFileSync(inputPath);
  const reader = await McapIndexedReader.Initialize({
    readable: new BufferReadable(inputBuffer),
  });

  let hasTf = false;
  let hasRobotDesc = false;
  let jointChannel = null;
  for (const channel of reader.channelsById.values()) {
    if (channel.topic === tfTopic) hasTf = true;
    if (channel.topic === robotDescTopic) hasRobotDesc = true;
    if (channel.topic === jointTopic) jointChannel = channel;
  }
  if (!jointChannel) throw new Error(\`JointState topic not found: \${jointTopic}\`);
  if (!overwriteTopics && (hasTf || hasRobotDesc)) {
    throw new Error('Input already contains /tf or /robot_description. Pass --overwrite-topics to replace them.');
  }

  const writable = new BufferWritable();
  const writer = new McapWriter({ writable });
  await writer.start({
    profile: reader.header?.profile ?? 'ros2',
    library: 'urdf-debug-processor',
  });

  const schemaMap = new Map();
  const channelMap = new Map();
  for (const schema of reader.schemasById.values()) {
    schemaMap.set(schema.id, await writer.registerSchema(schema));
  }
  for (const channel of reader.channelsById.values()) {
    if (overwriteTopics && (channel.topic === tfTopic || channel.topic === robotDescTopic)) continue;
    const mapped = { ...channel, schemaId: schemaMap.get(channel.schemaId) ?? 0 };
    channelMap.set(channel.id, await writer.registerChannel(mapped));
  }

  const outEncoding = jointChannel.messageEncoding ?? 'json';
  const preparedUrdf = prepareUrdfXml(urdfXml, recipe);
  const fkEngine = JointState2TF.fromXml({ xml: preparedUrdf });
  const jointSchema = reader.schemasById.get(jointChannel.schemaId);
  const deserializeJoint = buildChannelDeserializer(jointChannel, jointSchema);

  const writers = {
    'tf2_msgs/msg/TFMessage': new MessageWriter(ROS2_DEFINITIONS),
    'std_msgs/msg/String': new MessageWriter(ROS2_DEFINITIONS),
  };

  let tfChannelId;
  let robotDescChannelId;
  if (outEncoding === 'json') {
    const tfSchemaId = await writer.registerSchema({
      name: 'tf2_msgs/msg/TFMessage',
      encoding: 'jsonschema',
      data: new TextEncoder().encode('{"type":"object"}'),
    });
    const robotSchemaId = await writer.registerSchema({
      name: 'std_msgs/msg/String',
      encoding: 'jsonschema',
      data: new TextEncoder().encode('{"type":"object"}'),
    });
    tfChannelId = await writer.registerChannel({ schemaId: tfSchemaId, topic: tfTopic, messageEncoding: 'json', metadata: new Map() });
    robotDescChannelId = await writer.registerChannel({ schemaId: robotSchemaId, topic: robotDescTopic, messageEncoding: 'json', metadata: new Map() });
  } else {
    const tfSchemaId = await writer.registerSchema({
      name: 'tf2_msgs/msg/TFMessage',
      encoding: 'ros2msg',
      data: new TextEncoder().encode('geometry_msgs/TransformStamped[] transforms\\n'),
    });
    const robotSchemaId = await writer.registerSchema({
      name: 'std_msgs/msg/String',
      encoding: 'ros2msg',
      data: new TextEncoder().encode('string data\\n'),
    });
    tfChannelId = await writer.registerChannel({ schemaId: tfSchemaId, topic: tfTopic, messageEncoding: 'cdr', metadata: new Map() });
    robotDescChannelId = await writer.registerChannel({ schemaId: robotSchemaId, topic: robotDescTopic, messageEncoding: 'cdr', metadata: new Map() });
  }

  const serializeTf = outEncoding === 'json'
    ? (msg) => new TextEncoder().encode(JSON.stringify(msg))
    : buildChannelSerializer('tf2_msgs/msg/TFMessage', writers);
  const serializeString = outEncoding === 'json'
    ? (msg) => new TextEncoder().encode(JSON.stringify(msg))
    : buildChannelSerializer('std_msgs/msg/String', writers);

  let robotDescWritten = false;
  let tfSeq = 0;
  let processedJointStates = 0;

  for await (const message of reader.readMessages()) {
    const channel = reader.channelsById.get(message.channelId);
    if (!channel) continue;
    if (overwriteTopics && (channel.topic === tfTopic || channel.topic === robotDescTopic)) continue;

    const mappedChannelId = channelMap.get(message.channelId);
    if (mappedChannelId != null) {
      await writer.addMessage({ ...message, channelId: mappedChannelId });
    }

    if (channel.id !== jointChannel.id) continue;

    const rawJoint = normalizeJointState(deserializeJoint(message.data));
    const mapped = applyJointMapping(
      { name: rawJoint.name, position: rawJoint.position },
      recipe.rules ?? [],
    );
    const tfMsg = fkEngine.computeFromJointState(
      { header: rawJoint.header, name: mapped.name, position: mapped.position },
      { publishTimeNs: message.logTime },
    );

    if (!robotDescWritten) {
      await writer.addMessage({
        channelId: robotDescChannelId,
        sequence: 0,
        logTime: message.logTime,
        publishTime: message.publishTime,
        data: serializeString({ data: preparedUrdf }),
      });
      robotDescWritten = true;
    }

    tfSeq += 1;
    await writer.addMessage({
      channelId: tfChannelId,
      sequence: tfSeq,
      logTime: message.logTime,
      publishTime: message.publishTime,
      data: serializeTf(tfMsg),
    });
    processedJointStates += 1;
  }

  await writer.end();
  writeFileSync(outputPath, writable.toBuffer());
  return processedJointStates;
}
`.trim(), _e = "import math\nimport re\nfrom typing import Any\n\ndef _vec3(x=0.0, y=0.0, z=0.0):\n    return {'x': x, 'y': y, 'z': z}\n\ndef _quat_identity():\n    return {'x': 0.0, 'y': 0.0, 'z': 0.0, 'w': 1.0}\n\ndef _vec3_add(a, b):\n    return {'x': a['x'] + b['x'], 'y': a['y'] + b['y'], 'z': a['z'] + b['z']}\n\ndef _vec3_scale(a, s):\n    return {'x': a['x'] * s, 'y': a['y'] * s, 'z': a['z'] * s}\n\ndef _vec3_length(a):\n    return math.hypot(a['x'], a['y'], a['z'])\n\ndef _vec3_normalize(a):\n    length = _vec3_length(a) or 1.0\n    return {'x': a['x'] / length, 'y': a['y'] / length, 'z': a['z'] / length}\n\ndef _quat_multiply(a, b):\n    return {\n        'w': a['w'] * b['w'] - a['x'] * b['x'] - a['y'] * b['y'] - a['z'] * b['z'],\n        'x': a['w'] * b['x'] + a['x'] * b['w'] + a['y'] * b['z'] - a['z'] * b['y'],\n        'y': a['w'] * b['y'] - a['x'] * b['z'] + a['y'] * b['w'] + a['z'] * b['x'],\n        'z': a['w'] * b['z'] + a['x'] * b['y'] - a['y'] * b['x'] + a['z'] * b['w'],\n    }\n\ndef _quat_from_axis_angle(axis, angle):\n    n = _vec3_normalize(axis)\n    h = angle * 0.5\n    s = math.sin(h)\n    return {'x': n['x'] * s, 'y': n['y'] * s, 'z': n['z'] * s, 'w': math.cos(h)}\n\ndef _quat_from_rpy(roll, pitch, yaw):\n    cx, sx = math.cos(roll * 0.5), math.sin(roll * 0.5)\n    cy, sy = math.cos(pitch * 0.5), math.sin(pitch * 0.5)\n    cz, sz = math.cos(yaw * 0.5), math.sin(yaw * 0.5)\n    return {\n        'w': cz * cy * cx + sz * sy * sx,\n        'x': cz * cy * sx - sz * sy * cx,\n        'y': cz * sy * cx + sz * cy * sx,\n        'z': sz * cy * cx - cz * sy * sx,\n    }\n\ndef _vec3_rotate_by_quat(v, q):\n    x, y, z = v['x'], v['y'], v['z']\n    qx, qy, qz, qw = q['x'], q['y'], q['z'], q['w']\n    uvx = qy * z - qz * y\n    uvy = qz * x - qx * z\n    uvz = qx * y - qy * x\n    uuvx = qy * uvz - qz * uvy\n    uuvy = qz * uvx - qx * uvz\n    uuvz = qx * uvy - qy * uvx\n    return {'x': x + 2 * (qw * uvx + uuvx), 'y': y + 2 * (qw * uvy + uuvy), 'z': z + 2 * (qw * uvz + uuvz)}\n\ndef _compose_tr(a, b):\n    return {'r': _quat_multiply(a['r'], b['r']), 't': _vec3_add(a['t'], _vec3_rotate_by_quat(b['t'], a['r']))}\n\nclass JointState2TF:\n    def __init__(self, model):\n        self.model = model\n\n    @classmethod\n    def from_xml(cls, xml):\n        return cls(_parse_urdf(xml))\n\n    def set_joint_state(self, joint_state):\n        name_to_pos = {name: joint_state['position'][i] if i < len(joint_state['position']) else 0.0 for i, name in enumerate(joint_state.get('name', []))}\n        for name, pos in name_to_pos.items():\n            joint = self.model['joints_by_name'].get(name)\n            if joint is not None:\n                joint['q'] = pos\n\n    def compute(self, publish_time_ns=None):\n        transforms = []\n        sec = int(publish_time_ns // 1_000_000_000) if publish_time_ns else 0\n        nanosec = int(publish_time_ns % 1_000_000_000) if publish_time_ns else 0\n        for joint in self.model['joints_by_name'].values():\n            motion = _joint_motion_tr(joint)\n            rel = _compose_tr(joint['origin'], motion)\n            transforms.append({\n                'header': {'stamp': {'sec': sec, 'nanosec': nanosec}, 'frame_id': joint['parent']},\n                'child_frame_id': joint['child'],\n                'transform': {\n                    'translation': {'x': rel['t']['x'], 'y': rel['t']['y'], 'z': rel['t']['z']},\n                    'rotation': {'x': rel['r']['x'], 'y': rel['r']['y'], 'z': rel['r']['z'], 'w': rel['r']['w']},\n                },\n            })\n        return {'transforms': transforms}\n\n    def compute_from_joint_state(self, joint_state, publish_time_ns=None):\n        self.set_joint_state(joint_state)\n        return self.compute(publish_time_ns)\n\ndef _parse_attrs(text):\n    return dict(re.findall(r'(\\w+)\\s*=\\s*\"([^\"]*)\"', text))\n\ndef _parse_xyz(text):\n    if not text:\n        return _vec3()\n    parts = [float(v or 0) for v in text.split()]\n    while len(parts) < 3:\n        parts.append(0.0)\n    return _vec3(parts[0], parts[1], parts[2])\n\ndef _parse_rpy(text):\n    if not text:\n        return _quat_identity()\n    parts = [float(v or 0) for v in text.split()]\n    while len(parts) < 3:\n        parts.append(0.0)\n    return _quat_from_rpy(parts[0], parts[1], parts[2])\n\ndef _parse_joint_block(block):\n    open_match = re.search(r'<joint\\b([^>]*)>', block)\n    if not open_match:\n        return None\n    attrs = _parse_attrs(open_match.group(1))\n    name = (attrs.get('name') or '').strip()\n    joint_type = (attrs.get('type') or 'fixed').strip()\n    parent_match = re.search(r'<parent\\b[^>]*link=\"([^\"]+)\"', block)\n    child_match = re.search(r'<child\\b[^>]*link=\"([^\"]+)\"', block)\n    if not name or not parent_match or not child_match:\n        return None\n    origin_match = re.search(r'<origin\\b([^/>]*)/?>', block)\n    origin_attrs = _parse_attrs(origin_match.group(1)) if origin_match else {}\n    axis_match = re.search(r'<axis\\b([^/>]*)/?>', block)\n    axis_attrs = _parse_attrs(axis_match.group(1)) if axis_match else {}\n    origin = {'r': _parse_rpy(origin_attrs.get('rpy')), 't': _parse_xyz(origin_attrs.get('xyz'))}\n    axis = _vec3_normalize(_parse_xyz(axis_attrs.get('xyz', '1 0 0')))\n    if joint_type not in {'revolute', 'continuous', 'prismatic', 'fixed'}:\n        joint_type = 'fixed'\n    return {'name': name, 'type': joint_type, 'parent': parent_match.group(1), 'child': child_match.group(1), 'origin': origin, 'axis': axis, 'q': 0.0}\n\ndef _parse_urdf(xml):\n    joints = [j for j in (_parse_joint_block(block) for block in re.findall(r'<joint\\b[\\s\\S]*?</joint>', xml)) if j]\n    joints_by_name = {j['name']: j for j in joints}\n    return {'joints_by_name': joints_by_name}\n\ndef _joint_motion_tr(joint):\n    if joint['type'] in {'revolute', 'continuous'}:\n        return {'r': _quat_from_axis_angle(joint['axis'], joint['q']), 't': _vec3()}\n    if joint['type'] == 'prismatic':\n        return {'r': _quat_identity(), 't': _vec3_scale(joint['axis'], joint['q'])}\n    return {'r': _quat_identity(), 't': _vec3()}", ve = "def normalize_joint_state(raw):\n    if not isinstance(raw, dict):\n        raw = {}\n    name = [str(v) for v in raw.get('name', [])]\n    position = [float(v or 0) for v in raw.get('position', [])]\n    header = raw.get('header') if isinstance(raw.get('header'), dict) else {'stamp': {'sec': 0, 'nanosec': 0}, 'frame_id': ''}\n    return {'header': header, 'name': name, 'position': position}\n\ndef process_mcap(input_path, output_path, recipe, urdf_xml, overwrite):\n    from mcap.reader import make_reader\n    from mcap.writer import Writer\n\n    tf_topic = recipe.get('outputTfTopic') or '/tf'\n    robot_desc_topic = recipe.get('outputRobotDescriptionTopic') or '/robot_description'\n    joint_topic = recipe.get('jointStateTopic')\n    if not joint_topic:\n        raise SystemExit('recipe.jointStateTopic is required')\n\n    decoder_factory = None\n    try:\n        from mcap_ros2.decoder import DecoderFactory\n        decoder_factory = DecoderFactory()\n    except ImportError:\n        decoder_factory = None\n\n    with open(input_path, 'rb') as input_file, open(output_path, 'wb') as output_file:\n        reader = make_reader(input_file, decoder_factories=[decoder_factory] if decoder_factory else [])\n        summary = reader.get_summary()\n        if summary is None:\n            raise SystemExit('Input MCAP must be indexed. Run: mcap recover input.mcap -o input.indexed.mcap')\n\n        has_tf = any(ch.topic == tf_topic for ch in summary.channels.values())\n        has_robot = any(ch.topic == robot_desc_topic for ch in summary.channels.values())\n        joint_channel = next((ch for ch in summary.channels.values() if ch.topic == joint_topic), None)\n        if joint_channel is None:\n            raise SystemExit(f'JointState topic not found: {joint_topic}')\n        if not overwrite and (has_tf or has_robot):\n            raise SystemExit('Input already contains /tf or /robot_description. Pass --overwrite-topics.')\n\n        writer = Writer(output_file)\n        writer.start(profile='ros2', library='urdf-debug-processor')\n\n        schema_map = {}\n        for schema_id, schema in summary.schemas.items():\n            schema_map[schema_id] = writer.register_schema(name=schema.name, encoding=schema.encoding, data=schema.data)\n\n        channel_map = {}\n        for channel_id, channel in summary.channels.items():\n            if overwrite and channel.topic in {tf_topic, robot_desc_topic}:\n                continue\n            channel_map[channel_id] = writer.register_channel(\n                topic=channel.topic,\n                message_encoding=channel.message_encoding,\n                schema_id=schema_map.get(channel.schema_id, 0),\n                metadata=channel.metadata,\n            )\n\n        out_encoding = joint_channel.message_encoding or 'json'\n        prepared_urdf = prepare_urdf_xml(urdf_xml, recipe)\n        fk_engine = JointState2TF.from_xml(prepared_urdf)\n\n        tf_schema_id = writer.register_schema(\n            name='tf2_msgs/msg/TFMessage',\n            encoding='jsonschema' if out_encoding == 'json' else 'ros2msg',\n            data=b'{}' if out_encoding == 'json' else b'geometry_msgs/TransformStamped[] transforms\\n',\n        )\n        robot_schema_id = writer.register_schema(\n            name='std_msgs/msg/String',\n            encoding='jsonschema' if out_encoding == 'json' else 'ros2msg',\n            data=b'{}' if out_encoding == 'json' else b'string data\\n',\n        )\n        tf_channel_id = writer.register_channel(topic=tf_topic, message_encoding=out_encoding, schema_id=tf_schema_id)\n        robot_channel_id = writer.register_channel(topic=robot_desc_topic, message_encoding=out_encoding, schema_id=robot_schema_id)\n\n        def serialize_payload(msg):\n            return json.dumps(msg).encode('utf-8')\n\n        robot_desc_written = False\n        tf_seq = 0\n        processed = 0\n\n        message_iter = reader.iter_decoded_messages() if decoder_factory else reader.iter_messages()\n        for item in message_iter:\n            if decoder_factory:\n                schema, channel, message, decoded = item\n            else:\n                schema, channel, message = item\n                decoded = None\n\n            if overwrite and channel.topic in {tf_topic, robot_desc_topic}:\n                continue\n\n            mapped = channel_map.get(channel.id)\n            if mapped is not None:\n                writer.add_message(\n                    channel_id=mapped,\n                    log_time=message.log_time,\n                    data=message.data,\n                    publish_time=message.publish_time,\n                    sequence=message.sequence,\n                )\n\n            if channel.topic != joint_topic:\n                continue\n\n            if channel.message_encoding == 'json':\n                raw_joint = normalize_joint_state(json.loads(message.data.decode('utf-8')))\n            elif decoded is not None:\n                raw_joint = normalize_joint_state({\n                    'header': {\n                        'stamp': {\n                            'sec': int(getattr(decoded.header.stamp, 'sec', 0)),\n                            'nanosec': int(getattr(decoded.header.stamp, 'nanosec', 0)),\n                        },\n                        'frame_id': str(getattr(decoded.header, 'frame_id', '')),\n                    },\n                    'name': list(getattr(decoded, 'name', [])),\n                    'position': list(getattr(decoded, 'position', [])),\n                })\n            else:\n                raise SystemExit('CDR joint_states requires: pip install mcap-ros2-support')\n\n            mapped_js = apply_joint_mapping(\n                {'name': raw_joint['name'], 'position': raw_joint['position']},\n                recipe.get('rules', []),\n            )\n            tf_msg = fk_engine.compute_from_joint_state(\n                {'header': raw_joint['header'], 'name': mapped_js['name'], 'position': mapped_js['position']},\n                message.log_time,\n            )\n\n            if not robot_desc_written:\n                writer.add_message(\n                    channel_id=robot_channel_id,\n                    log_time=message.log_time,\n                    data=serialize_payload({'data': prepared_urdf}),\n                    publish_time=message.publish_time,\n                    sequence=0,\n                )\n                robot_desc_written = True\n\n            tf_seq += 1\n            writer.add_message(\n                channel_id=tf_channel_id,\n                log_time=message.log_time,\n                data=serialize_payload(tf_msg),\n                publish_time=message.publish_time,\n                sequence=tf_seq,\n            )\n            processed += 1\n\n        writer.finish()\n    return processed";
function Q(e) {
	return JSON.stringify(e, null, 2);
}
function ye(e) {
	return `#!/usr/bin/env node
/**
 * URDF Debug MCAP processor (TypeScript)
 *
 * Usage:
 *   npm i @mcap/core @foxglove/rosmsg @foxglove/rosmsg2-serialization
 *   node process_mcap_tf.mjs input.mcap output.mcap recipe.json robot.urdf [--overwrite-topics]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { McapIndexedReader, McapWriter } from '@mcap/core';
import { MessageReader, MessageWriter } from '@foxglove/rosmsg2-serialization';
import rosmsg from '@foxglove/rosmsg';
const { parseMessageDefinition } = rosmsg;

const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: node process_mcap_tf.mjs input.mcap output.mcap recipe.json robot.urdf [--overwrite-topics]');
  process.exit(1);
}
const [inputPath, outputPath, recipePath, urdfPath, ...flags] = args;
const overwriteTopics = flags.includes('--overwrite-topics');
const recipe = JSON.parse(readFileSync(recipePath, 'utf8'));
const urdfXml = readFileSync(urdfPath, 'utf8');

${J}

${X}

${Z}

${ge}

async function main() {
  const processed = await processMcap({ inputPath, outputPath, recipe, urdfXml, overwriteTopics });
  console.log('Wrote', outputPath, 'with', processed, 'joint state frame(s) expanded to /tf');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/*
Embedded recipe snapshot:
${Q(e)}
*/
`;
}
function be(e) {
	return `#!/usr/bin/env python3
"""URDF Debug MCAP processor (Python)

Usage:
  pip install mcap mcap-ros2-support
  python process_mcap_tf.py input.mcap output.mcap recipe.json robot.urdf [--overwrite-topics]
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

${Y}

${_e}

${x}

${ve}

def main() -> None:
    if len(sys.argv) < 5:
        print('Usage: python process_mcap_tf.py input.mcap output.mcap recipe.json robot.urdf [--overwrite-topics]', file=sys.stderr)
        sys.exit(1)
    input_path, output_path, recipe_path, urdf_path, *flags = sys.argv[1:]
    overwrite = '--overwrite-topics' in flags
    recipe = json.loads(Path(recipe_path).read_text(encoding='utf-8'))
    urdf_xml = Path(urdf_path).read_text(encoding='utf-8')
    processed = process_mcap(input_path, output_path, recipe, urdf_xml, overwrite)
    print('Wrote', output_path, 'with', processed, 'joint state frame(s) expanded to /tf')

if __name__ == '__main__':
    main()

# Embedded recipe snapshot:
# ${Q(e).replace(/\n/g, "\n# ")}
`;
}
//#endregion
//#region src/features/panels/UrdfDebug/UrdfDebugPanel.tsx
function xe(e) {
	return fe(d.getLastMessage(e)?.message);
}
function Se(e, t) {
	if (e === t) return !0;
	if (!e || !t || e.name.length !== t.name.length || e.position.length !== t.position.length) return !1;
	for (let n = 0; n < e.name.length; n += 1) if (e.name[n] !== t.name[n]) return !1;
	for (let n = 0; n < e.position.length; n += 1) if (e.position[n] !== t.position[n]) return !1;
	return !0;
}
function Ce(e) {
	return Math.min(58, Math.max(22, e));
}
var we = ({ player: n, panelId: i, config: a, setConfig: u }) => {
	let { formatMessage: m } = e(), y = t((e) => e.sortedTopics), [x, w] = M([]), [T, D] = M(() => /* @__PURE__ */ new Map()), [O, F] = M(null), [ae, I] = M(null), [L, se] = M(null), [R, z] = M(""), B = re(/* @__PURE__ */ new Map()), V = re(null), le = Ce(a.settingsPanelPercent), H = j(() => b(y, a.jointStateTopic), [y, a.jointStateTopic]), U = j(() => a.urdfSourceType === "topic" ? ee(y, a.urdfTopic) : "", [
		y,
		a.urdfSourceType,
		a.urdfTopic
	]);
	A(() => {
		let e = [];
		return a.urdfSourceType === "topic" && U && e.push({
			topic: U,
			subscriberId: i
		}), a.followLiveJointState && H && e.push({
			topic: H,
			subscriberId: i
		}), e.length > 0 ? n.registerSubscriptions(i, e) : n.unregisterSubscriptions(i), () => n.unregisterSubscriptions(i);
	}, [
		n,
		i,
		U,
		a.urdfSourceType,
		H,
		a.followLiveJointState
	]), A(() => {
		if (a.urdfSourceType !== "topic" || !U) {
			z("");
			return;
		}
		let e = () => {
			let e = g(d.getLastMessage(U)?.message);
			e && z((t) => t === e ? t : e);
		};
		e();
		let t = null, n = d.subscribeTopic(U, () => {
			t ||= r(() => {
				t = null, e();
			});
		});
		return () => {
			n(), t?.();
		};
	}, [U, a.urdfSourceType]), A(() => {
		if (!a.followLiveJointState || !H) {
			se(null);
			return;
		}
		let e = () => {
			let e = xe(H);
			se((t) => Se(t, e) ? t : e);
		};
		e();
		let t = null, n = d.subscribeTopic(H, () => {
			t ||= r(() => {
				t = null, e();
			});
		});
		return () => {
			n(), t?.();
		};
	}, [H, a.followLiveJointState]), A(() => {
		te(B.current);
		let e = _(x);
		return B.current = e, D(e), () => te(B.current);
	}, [x]), A(() => () => {
		V.current != null && window.clearTimeout(V.current);
	}, []);
	let W = a.urdfSourceType === "file" ? a.urdfFileContent : R, G = j(() => {
		if (!W) return {
			urdf: "",
			error: null
		};
		try {
			return {
				urdf: h(W, a.rotateMeshVisuals, a.visualRpyOffset),
				error: null
			};
		} catch (e) {
			return {
				urdf: W,
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}, [
		W,
		a.rotateMeshVisuals,
		a.visualRpyOffset
	]), K = G.urdf, fe = j(() => {
		if (!W) return "";
		try {
			return v(W, {
				rotateMeshVisuals: !1,
				visualRpyOffset: a.visualRpyOffset
			});
		} catch {
			return W;
		}
	}, [W, a.visualRpyOffset]);
	A(() => {
		G.error && F(G.error);
	}, [G.error]);
	let q = j(() => K ? p(K) : null, [K]), J = j(() => {
		if (!K) return {
			descriptors: [],
			error: null
		};
		try {
			return {
				descriptors: E(K),
				error: null
			};
		} catch (e) {
			return {
				descriptors: [],
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}, [K]), Y = J.descriptors;
	A(() => {
		J.error && F(J.error);
	}, [J.error]);
	let X = j(() => f({
		strategy: a.meshStrategy,
		packageName: a.packageName,
		packageBaseUrl: a.packageBaseUrl,
		localUrls: T
	}), [
		a.meshStrategy,
		a.packageName,
		a.packageBaseUrl,
		T
	]), Z = k((e, t) => {
		F(null), I(null);
		let n = S(e), r = [];
		try {
			r = E(h(e, a.rotateMeshVisuals, a.visualRpyOffset));
		} catch {
			r = [];
		}
		u((i) => ({
			...i,
			urdfSourceType: "file",
			urdfFileName: t,
			urdfFileContent: e,
			packageName: i.packageName || n || "",
			manualJointPositions: C(r)
		}));
	}, [
		u,
		a.rotateMeshVisuals,
		a.visualRpyOffset
	]), ge = k((e) => {
		let t = oe(e);
		if (!t) {
			I(m({ id: "urdfDebug.upload.invalidUrdf" }));
			return;
		}
		t.text().then((e) => Z(e, t.name));
	}, [m, Z]), _e = k((e) => {
		let t = e["urdf-settings"];
		if (typeof t != "number" || !Number.isFinite(t)) return;
		let n = Ce(t);
		V.current != null && window.clearTimeout(V.current), V.current = window.setTimeout(() => {
			V.current = null, u((e) => e.settingsPanelPercent === n ? e : {
				...e,
				settingsPanelPercent: n
			});
		}, 120);
	}, [u]), ve = k((e, t) => {
		e === "urdf" && F(t);
	}, []), Q = j(() => a.urdfSourceType === "topic" ? U ? m({ id: "urdfDebug.preview.emptyTopicWaiting" }, { topic: U }) : m({ id: "urdfDebug.preview.emptyTopicNoSelection" }) : m({ id: "urdfDebug.preview.empty" }), [
		a.urdfSourceType,
		U,
		m
	]), we = j(() => ue({
		descriptors: Y,
		manualPositions: a.manualJointPositions,
		liveJointState: L,
		followLive: a.followLiveJointState,
		mimicJoints: q?.mimicJoints ?? []
	}), [
		Y,
		a.manualJointPositions,
		a.followLiveJointState,
		L,
		q?.mimicJoints
	]), De = j(() => pe(a, q?.robotName), [a, q?.robotName]), Oe = /* @__PURE__ */ P("aside", {
		className: "h-full min-h-0 overflow-y-auto overscroll-y-contain bg-background p-3 space-y-3",
		children: [
			/* @__PURE__ */ P($, {
				title: m({ id: "urdfDebug.section.input" }),
				children: [/* @__PURE__ */ N("div", {
					className: "space-y-1",
					children: [["file", "urdfDebug.input.source.file"], ["topic", "urdfDebug.input.source.topic"]].map(([e, t]) => /* @__PURE__ */ P("label", {
						className: "flex items-center gap-2 text-xs cursor-pointer",
						children: [/* @__PURE__ */ N("input", {
							type: "radio",
							name: "urdf-input-source",
							checked: a.urdfSourceType === e,
							onChange: () => u((t) => ({
								...t,
								urdfSourceType: e
							}))
						}), m({ id: t })]
					}, e))
				}), a.urdfSourceType === "file" ? /* @__PURE__ */ N(ie, {
					accept: ".urdf,.xml,application/xml,text/xml",
					title: m({ id: "urdfDebug.upload.dropUrdfTitle" }),
					hint: m({ id: "urdfDebug.upload.dropUrdfHint" }),
					browseLabel: m({ id: "urdfDebug.upload.browse" }),
					selectedLabel: a.urdfFileName || void 0,
					error: ae ?? O,
					testId: "urdf-debug-urdf-upload",
					onFiles: ge
				}) : /* @__PURE__ */ P("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ N(o, {
							value: a.urdfTopic,
							onChange: (e) => u((t) => ({
								...t,
								urdfTopic: e
							})),
							topics: y,
							nameIncludes: "robot_description",
							placeholder: "/robot_description"
						}),
						U ? /* @__PURE__ */ N("div", {
							className: "text-[10px] text-muted-foreground",
							children: R ? m({ id: "urdfDebug.input.topicLoaded" }, {
								topic: U,
								bytes: R.length
							}) : m({ id: "urdfDebug.input.topicWaiting" }, { topic: U })
						}) : /* @__PURE__ */ N("div", {
							className: "text-[10px] text-muted-foreground italic",
							children: m({ id: "urdfDebug.input.topicAutoDetectHint" })
						}),
						O && a.urdfSourceType === "topic" && /* @__PURE__ */ N("div", {
							className: "text-[10px] text-red-500",
							children: O
						})
					]
				})]
			}),
			/* @__PURE__ */ N($, {
				title: m({ id: "urdfDebug.section.meshResources" }),
				children: /* @__PURE__ */ N(ce, {
					config: a,
					setConfig: u,
					urdfAnalysis: q,
					urdfFileContent: W,
					meshFiles: x,
					setMeshFiles: w,
					resolveMeshUrl: X,
					formatMessage: m
				})
			}),
			/* @__PURE__ */ P($, {
				title: m({ id: "urdfDebug.section.appearance" }),
				children: [
					/* @__PURE__ */ P("label", {
						className: "flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ N("input", {
							type: "checkbox",
							checked: a.rotateMeshVisuals,
							onChange: (e) => u((t) => ({
								...t,
								rotateMeshVisuals: e.target.checked
							}))
						}), m({ id: "urdfDebug.rotateMeshVisuals" })]
					}),
					/* @__PURE__ */ N("p", {
						className: "text-[10px] text-muted-foreground leading-relaxed pl-5",
						children: m({ id: "urdfDebug.rotateMeshVisualsHint" })
					}),
					/* @__PURE__ */ P("label", {
						className: "flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ N("input", {
							type: "checkbox",
							checked: a.showGrid,
							onChange: (e) => u((t) => ({
								...t,
								showGrid: e.target.checked
							}))
						}), m({ id: "urdfDebug.showGrid" })]
					}),
					/* @__PURE__ */ P("label", {
						className: "flex items-center gap-2 text-xs",
						children: [/* @__PURE__ */ N("input", {
							type: "checkbox",
							checked: a.showAxes,
							onChange: (e) => u((t) => ({
								...t,
								showAxes: e.target.checked
							}))
						}), m({ id: "urdfDebug.showAxes" })]
					}),
					/* @__PURE__ */ N(Te, {
						label: m({ id: "urdfDebug.field.visualRpyOffset" }),
						children: /* @__PURE__ */ N("div", {
							className: "grid grid-cols-3 gap-1",
							children: [
								"Roll",
								"Pitch",
								"Yaw"
							].map((e, t) => /* @__PURE__ */ N("input", {
								type: "number",
								step: "0.01",
								className: "text-xs border rounded px-1 py-1 bg-background",
								value: a.visualRpyOffset[t],
								onChange: (e) => {
									let n = [...a.visualRpyOffset];
									n[t] = Number(e.target.value) || 0, u((e) => ({
										...e,
										visualRpyOffset: n
									}));
								}
							}, e))
						})
					})
				]
			}),
			/* @__PURE__ */ N($, {
				title: m({ id: "urdfDebug.section.joints" }),
				children: /* @__PURE__ */ N(de, {
					descriptors: Y,
					config: a,
					setConfig: u,
					topics: y,
					jointStateTopic: H,
					liveJointState: L,
					formatMessage: m
				})
			}),
			/* @__PURE__ */ N($, {
				title: m({ id: "urdfDebug.section.export" }),
				children: /* @__PURE__ */ P("div", {
					className: "flex flex-wrap gap-1",
					children: [
						/* @__PURE__ */ N(Ee, {
							onClick: () => me("recipe.json", De),
							children: "recipe.json"
						}),
						/* @__PURE__ */ N(Ee, {
							onClick: () => he("process_mcap_tf.mjs", ye(De)),
							children: "TypeScript"
						}),
						/* @__PURE__ */ N(Ee, {
							onClick: () => he("process_mcap_tf.py", be(De)),
							children: "Python"
						})
					]
				})
			})
		]
	});
	return /* @__PURE__ */ P(c, {
		orientation: "horizontal",
		className: "h-full min-h-0 min-w-0",
		onLayoutChanged: _e,
		children: [
			/* @__PURE__ */ N(s, {
				id: "urdf-settings",
				className: "min-h-0 min-w-0",
				defaultSize: `${le}%`,
				minSize: "22%",
				maxSize: "58%",
				children: Oe
			}),
			/* @__PURE__ */ N(l, {
				withHandle: !0,
				className: "block shrink-0",
				"aria-label": m({ id: "urdfDebug.resizeSettings" })
			}),
			/* @__PURE__ */ N(s, {
				id: "urdf-preview",
				className: "min-h-0 min-w-0",
				minSize: "30%",
				children: /* @__PURE__ */ N("div", {
					className: "h-full min-h-0 overflow-hidden",
					children: /* @__PURE__ */ N(ne, {
						urdfText: fe,
						jointState: we,
						highFrequencyPoseUpdates: a.followLiveJointState,
						resolveMeshUrl: X,
						fallbackMeshColor: a.fallbackMeshColor,
						showGrid: a.showGrid,
						showAxes: a.showAxes,
						rotateMeshVisuals: a.rotateMeshVisuals,
						emptyHint: Q,
						onMeshIssue: ve
					})
				})
			})
		]
	});
}, $ = ({ title: e, children: t }) => /* @__PURE__ */ P("div", {
	className: "border rounded-md p-2 space-y-2",
	children: [/* @__PURE__ */ N("div", {
		className: "text-xs font-semibold",
		children: e
	}), t]
}), Te = ({ label: e, children: t }) => /* @__PURE__ */ P("label", {
	className: "block space-y-1",
	children: [/* @__PURE__ */ N("div", {
		className: "text-[10px] text-muted-foreground",
		children: e
	}), t]
}), Ee = ({ onClick: e, children: t }) => /* @__PURE__ */ N("button", {
	type: "button",
	className: "text-[10px] px-2 py-1 rounded border bg-muted hover:bg-muted/80",
	onClick: e,
	children: t
});
//#endregion
export { we as UrdfDebugPanel };
