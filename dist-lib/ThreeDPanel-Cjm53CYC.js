import { i as e, r as t, t as n } from "./rafScheduler-Be5Ie1zf.js";
import { t as r } from "./messageBus-D2dmTOBd.js";
import { n as i, t as a } from "./defaults-CrWOF-m4.js";
import { a as o, i as s, n as c, r as l, t as u } from "./renderables-xrrMKAIX.js";
import { a as d, c as f, i as p, l as m, n as h, o as g, p as _, r as v, s as y, t as b, u as x } from "./r3fZUpSceneChrome-DvNW_aap.js";
import S, { Suspense as C, useCallback as ee, useEffect as w, useMemo as T, useRef as E, useState as D } from "react";
import { Fragment as O, jsx as k, jsxs as A } from "react/jsx-runtime";
import { Canvas as j, useThree as M } from "@react-three/fiber";
import * as N from "three";
import "three/examples/jsm/controls/OrbitControls.js";
//#region src/shared/utils/pointCloud.ts
function P(e) {
	let t = new ArrayBuffer(e.byteLength);
	return new Uint8Array(t).set(e), t;
}
//#endregion
//#region src/features/panels/ThreeD/core/PointCloudParse.worker.ts?worker&inline
var F = "function e(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.name==`string`&&typeof t.offset==`number`}function t(e){return e instanceof Uint8Array}function n(e,t){return e.find(e=>e.name===t)}function r(e,t,n){let r=e.getUint32(t,n);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function i(e,t,n,r){return n===2?e.getUint8(t):e.getFloat32(t,r)}function a(e,t,n){return[n,-e,-t]}function o(e,t){return!!(e&&/optical/i.test(e)||t&&/(?:^|\\/)depth(?:\\/|$)/i.test(t)&&/points/i.test(t))}function s(e){let t=e.header;if(!t||typeof t!=`object`)return;let n=t.frame_id;return typeof n==`string`?n:void 0}const c=[.13572138,4.6153926,-42.66032258,132.13108234],l=[.09140261,2.19418839,4.84296658,-14.18503333],u=[.1066733,12.64194608,-60.58204836,110.36276771],d=[-152.94239396,59.28637943],f=[4.27729857,2.82956604],p=[-89.90310912,27.34824973];function m(e){return Math.max(0,Math.min(1,e))}function h(e,t,n){let r=m(e)*.99+.01,i=r*r,a=i*r,o=i*i,s=a*i,h=c[0]+r*c[1]+i*c[2]+a*c[3]+o*d[0]+s*d[1],g=l[0]+r*l[1]+i*l[2]+a*l[3]+o*f[0]+s*f[1],_=u[0]+r*u[1]+i*u[2]+a*u[3]+o*p[0]+s*p[1];t[n]=m(h),t[n+1]=m(g),t[n+2]=m(_)}function g(c,l={}){if(!c||typeof c!=`object`)return null;let u=c,{fields:d,data:f,point_step:p,width:m,height:g}=u;if(!Array.isArray(d)||!t(f)||typeof p!=`number`||typeof m!=`number`||typeof g!=`number`)return null;let _=m*g;if(_<=0||p<=0||f.byteLength<_*p)return null;let v=o(l.frameId??s(u),l.topic),y=d.filter(e),b=n(y,`x`),x=n(y,`y`),S=n(y,`z`);if(!b||!x||!S)return null;let C=u.is_bigendian!==!0,w=new DataView(f.buffer,f.byteOffset,f.byteLength),T=n(y,`rgb`)??n(y,`rgba`),E=n(y,`r`),D=n(y,`g`),O=n(y,`b`),k=!!(E&&D&&O),A=n(y,`intensity`),j=T?`rgb`:k?`rgba_fields`:A?`intensity`:`depth`,M=new Float32Array(_*3),N=new Float32Array(_*3),P=j===`rgb`||j===`rgba_fields`?null:new Float32Array(_),F=C&&p%4==0&&b.offset===0&&x.offset===4&&S.offset===8&&(b.datatype===void 0||b.datatype===7)&&(x.datatype===void 0||x.datatype===7)&&(S.datatype===void 0||S.datatype===7)?new Float32Array(f.buffer,f.byteOffset,Math.floor(f.byteLength/4)):null,I=p/4,L=0,R=1/0,z=-1/0;for(let e=0;e<_;e++){let t,n,o;if(F){let r=e*I;t=F[r],n=F[r+1],o=F[r+2]}else{let r=e*p;t=w.getFloat32(r+b.offset,C),n=w.getFloat32(r+x.offset,C),o=w.getFloat32(r+S.offset,C)}if(!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(o)||v&&o<=1e-4)continue;let s,c,l;v?[s,c,l]=a(t,n,o):(s=t,c=n,l=o);let u=L*3;if(M[u]=s,M[u+1]=c,M[u+2]=l,j===`rgb`&&T){let[t,n,i]=r(w,e*p+T.offset,C);N[u]=t,N[u+1]=n,N[u+2]=i}else if(j===`rgba_fields`&&E&&D&&O){let t=e*p;N[u]=w.getUint8(t+E.offset)/255,N[u+1]=w.getUint8(t+D.offset)/255,N[u+2]=w.getUint8(t+O.offset)/255}else if(P){let r=j===`intensity`&&A?i(w,e*p+A.offset,A.datatype,C):v?o:Math.hypot(t,n,o);P[L]=r,Number.isFinite(r)&&(r<R&&(R=r),r>z&&(z=r))}L++}if(L===0)return{positions:new Float32Array,count:0,maxPoints:_};let B=M.slice(0,L*3),V;if(j===`rgb`||j===`rgba_fields`)V=N.slice(0,L*3);else if(P){V=new Float32Array(L*3);let e=z-R;if(j===`intensity`)if(e<=0||!Number.isFinite(e))V.fill(.5);else for(let t=0;t<L;t++){let n=(P[t]-R)/e,r=t*3;V[r]=n,V[r+1]=n,V[r+2]=n}else if(e<=0||!Number.isFinite(e))for(let e=0;e<L;e++)h(.5,V,e*3);else for(let t=0;t<L;t++)h((P[t]-R)/e,V,t*3)}return V?{positions:B,colors:V,count:L,maxPoints:_}:{positions:B,count:L,maxPoints:_}}function _(e){let{buffer:t,byteOffset:n,byteLength:r}=e;return t instanceof ArrayBuffer&&n===0&&r===t.byteLength?t:t.slice(n,n+r)}self.onmessage=e=>{let t=e.data;if(!(!t||t.type!==`parse`))try{let e=g({fields:t.fields,data:new Uint8Array(t.data),point_step:t.pointStep,width:t.width,height:t.height,is_bigendian:t.isBigendian},{topic:t.topic,frameId:t.frameId});if(!e){let e={type:`error`,id:t.id,message:`invalid PointCloud2`};self.postMessage(e);return}let n=_(e.positions),r=[n],i={type:`parsed`,id:t.id,pointCount:e.count,maxPoints:e.maxPoints??t.width*t.height,positions:n};if(e.colors){let t=_(e.colors);r.push(t),i.colors=t}self.postMessage(i,r)}catch(e){let n={type:`error`,id:t.id,message:e instanceof Error?e.message:String(e)};self.postMessage(n)}};", te = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", F], { type: "text/javascript;charset=utf-8" });
function ne(e) {
	let t;
	try {
		if (t = te && (self.URL || self.webkitURL).createObjectURL(te), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(F), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/shared/bvh/coordinates.ts
function I(e, t) {
	let [n, r, i] = e;
	if (n *= t.scale, r *= t.scale, i *= t.scale, t.yUpToZUp) {
		let e = -i, t = r;
		r = e, i = t;
	}
	return t.flipY && (r = -r), [
		n,
		r,
		i
	];
}
//#endregion
//#region src/features/panels/ThreeD/ThreeDPanel.tsx
var re = 5, ie = 8;
function L(e, t) {
	return BigInt(e) * 1000000000n + BigInt(t);
}
var R = new N.Mesh(new N.BoxGeometry(1, 1, 1)), z = new N.Box3(), ae = new N.BoxGeometry(1, 1, 1), oe = new N.SphereGeometry(.5, 16, 12);
function B(e) {
	if (e.length === 0) return null;
	let t = new N.Box3(), n = !1, r = new N.Vector3(), i = new N.Vector3(), a = new N.Quaternion(), o = new N.Vector3();
	for (let s of e) {
		if (s.kind === "line") {
			for (let e of s.points) o.set(e[0], e[1], e[2]), n ? t.expandByPoint(o) : (t.setFromCenterAndSize(o, new N.Vector3(1e-4, 1e-4, 1e-4)), n = !0);
			continue;
		}
		if (s.kind === "orientedBox") {
			R.position.set(s.position[0], s.position[1], s.position[2]), R.scale.set(s.scale[0], s.scale[1], s.scale[2]), a.set(s.quaternion[0], s.quaternion[1], s.quaternion[2], s.quaternion[3]), R.quaternion.copy(a), R.updateMatrixWorld(!0), z.setFromObject(R), n ? t.union(z) : (t.copy(z), n = !0);
			continue;
		}
		r.set(s.position[0], s.position[1], s.position[2]), i.set(s.scale[0], s.scale[1], s.scale[2]), z.setFromCenterAndSize(r, i), n ? t.union(z) : (t.copy(z), n = !0);
	}
	return n ? (t.expandByScalar(.02), t) : null;
}
function V(e) {
	return e.map((e) => e.toFixed(3)).join(",");
}
function se(e, t) {
	let n = t[0], r = t[t.length - 1], i = [String(e), String(t.length)], a = t.find((e) => typeof e.frameIndex == "number")?.frameIndex;
	typeof a == "number" && i.push(String(a));
	for (let e of [n, r]) if (e) if (i.push(e.key), e.kind === "line") {
		let t = e.points[0], n = e.points[e.points.length - 1];
		t && i.push(V(t)), n && i.push(V(n));
	} else i.push(V(e.position));
	return i.join("|");
}
function ce(e, t) {
	return !e || t.size > e.size || Math.abs(t.position[0] - e.position[0]) > .05 || Math.abs(t.position[1] - e.position[1]) > .05 || Math.abs(t.position[2] - e.position[2]) > .05;
}
var H = {
	clearTracks: !0,
	clearMarkerPrimitives: !0,
	clearSkeletonPrimitives: !1,
	clearLaserScanCloud: !0,
	clearOccupancyCloud: !0
}, le = ({ bvhTopic: e, skeletonPrimitives: t, resetVersion: n, onGroundLayout: r }) => {
	let { camera: i, controls: a, invalidate: o } = M(), s = E(null), c = E(null), l = E(null), u = E(null), d = E(0), p = E(r);
	return w(() => {
		p.current = r;
	}, [r]), w(() => {
		e || (s.current = null, c.current = null, l.current = null, u.current = null, d.current = 0);
	}, [e]), w(() => {
		c.current = null, l.current = null, u.current = null, d.current = 0, s.current = null;
	}, [n]), w(() => {
		if (!e) return;
		let r = t.filter((e) => e.key.startsWith("bvh:"));
		if (r.length === 0) return;
		let m = se(n, r);
		if (u.current === m) return;
		let h = s.current !== n;
		if (!h && (d.current += 1, d.current % ie !== 0)) return;
		u.current = m;
		let g = B(r);
		if (!g || g.isEmpty()) return;
		let _ = c.current;
		_ ? _.union(g) : c.current = g.clone();
		let v = c.current, y = new N.Vector3(), b = new N.Vector3();
		v.getCenter(y), v.getSize(b);
		let x = !1;
		if (h) {
			s.current = n;
			let e = i, t = Math.max(b.x, b.y, 2), r = Math.max(20, Math.ceil(t * 1.6)), o = new N.Vector3(y.x, y.y, 0);
			f(e, o, r);
			let c = a;
			c && (c.target.copy(o), c.update()), x = !0;
		}
		let S = Math.max(b.x, b.y, 2), C = {
			size: Math.max(20, Math.ceil(S * 1.6)),
			divisions: 10,
			position: [
				y.x,
				y.y,
				0
			]
		};
		ce(l.current, C) && (l.current = C, p.current?.(C), x = !0), x && o();
	}, [
		e,
		t,
		n,
		i,
		a,
		o
	]), null;
}, ue = ({ colors: e, size: t = 20, divisions: n = 10, position: r = [
	0,
	0,
	0
] }) => /* @__PURE__ */ k("group", {
	position: r,
	children: /* @__PURE__ */ k("gridHelper", {
		rotation: [
			Math.PI / 2,
			0,
			0
		],
		args: [
			t,
			n,
			e.gridPrimary,
			e.gridSecondary
		]
	})
});
function U(e) {
	e && e.geometry.dispose();
}
function W(e) {
	e.computeBoundingSphere();
	let t = e.boundingSphere;
	(!t || !Number.isFinite(t.radius) || t.radius < 0) && (e.boundingSphere = new N.Sphere(new N.Vector3(0, 0, 0), 1));
}
function G(e, t) {
	e.count = t;
}
function K(e, t) {
	let n = t.count, r = t.colors != null && t.colors.length >= n * 3, i = Math.max(t.maxPoints ?? n, n, 1);
	if (e && n <= e.capacity) {
		if (e.position.array.set(t.positions.subarray(0, n * 3)), G(e.position, n), e.position.needsUpdate = !0, r) if (e.color) e.color.array.set(t.colors.subarray(0, n * 3)), G(e.color, n), e.color.needsUpdate = !0;
		else {
			let r = new Float32Array(e.capacity * 3);
			r.set(t.colors.subarray(0, n * 3));
			let i = new N.BufferAttribute(r, 3);
			G(i, n), i.setUsage(N.DynamicDrawUsage), e.geometry.setAttribute("color", i), e.color = i;
		}
		else e.color &&= (e.geometry.deleteAttribute("color"), null);
		return e.geometry.setDrawRange(0, n), e.drawCount = n, e;
	}
	U(e);
	let a = i, o = new N.BufferGeometry(), s = new Float32Array(a * 3);
	n > 0 && s.set(t.positions.subarray(0, n * 3));
	let c = new N.BufferAttribute(s, 3);
	G(c, n), c.setUsage(N.DynamicDrawUsage), o.setAttribute("position", c);
	let l = null;
	if (r && n > 0) {
		let e = new Float32Array(a * 3);
		e.set(t.colors.subarray(0, n * 3)), l = new N.BufferAttribute(e, 3), G(l, n), l.setUsage(N.DynamicDrawUsage), o.setAttribute("color", l);
	}
	return o.setDrawRange(0, n), n > 0 ? W(o) : o.boundingSphere = new N.Sphere(new N.Vector3(0, 0, 0), 1), {
		geometry: o,
		position: c,
		color: l,
		capacity: a,
		drawCount: n
	};
}
var de = ({ data: e, color: t, size: n }) => {
	let r = E(null), [i, a] = D(null), [o, s] = D(!1), { invalidate: c } = M();
	return w(() => {
		let t = K(r.current, e);
		r.current = t, a(t.geometry), s(t.color != null), c();
	}, [e, c]), w(() => () => {
		U(r.current), r.current = null;
	}, []), i ? /* @__PURE__ */ k("points", {
		geometry: i,
		frustumCulled: !1,
		children: /* @__PURE__ */ k("pointsMaterial", {
			size: n,
			color: o ? "#ffffff" : t,
			vertexColors: o,
			sizeAttenuation: !0
		})
	}) : null;
}, fe = ({ player: e, panelId: t, topic: n, color: r, size: i }) => {
	let a = E(null), [o, s] = D(null), [c, l] = D(!1), { invalidate: u, camera: d, controls: f } = M(), p = E(d), m = E(f), h = E(u), g = E(null), _ = E(!1), v = E(null), b = E(1), x = E(null), S = E(null), C = E(!1);
	return w(() => {
		p.current = d, m.current = f, h.current = u;
	}, [
		d,
		f,
		u
	]), w(() => {
		C.current = !1;
	}, [n]), w(() => {
		let r = new ne();
		v.current = r;
		let i = (e) => {
			if (C.current) return;
			let t = p.current;
			if (!(t instanceof N.PerspectiveCamera)) return;
			W(e);
			let n = e.boundingSphere;
			if (!n || !Number.isFinite(n.radius) || n.radius <= 0) return;
			let r = new N.Box3().setFromBufferAttribute(e.getAttribute("position"));
			if (r.isEmpty()) return;
			let i = y(t, r), a = m.current;
			a && (a.target.copy(i), a.update()), C.current = !0;
		}, o = (e, t, n, r) => {
			if (n <= 0) return;
			let o = {
				positions: e,
				colors: t,
				count: n,
				maxPoints: r
			}, c = K(a.current, o);
			a.current = c;
			let u = c.color != null !== _.current;
			(c.geometry !== g.current || u) && (g.current = c.geometry, _.current = c.color != null, s(c.geometry), l(c.color != null)), i(c.geometry), h.current();
		}, c = () => {
			let e = S.current;
			!e || x.current != null || (S.current = null, x.current = e.id, r.postMessage(e, [e.data]));
		};
		r.onmessage = (e) => {
			let t = e.data;
			if (t.id !== x.current) {
				c();
				return;
			}
			if (x.current = null, t.type === "parsed") {
				let e = new Float32Array(t.positions), n = t.colors ? new Float32Array(t.colors) : void 0;
				o(e, n, t.pointCount, t.maxPoints);
			}
			c();
		};
		let u = `${t}:pointcloud`, d = null;
		return e.registerHighFrequencyConsumer(u, {
			topic: n,
			lane: "pointcloud",
			mode: "latest",
			onLatestMessage: (e) => {
				let t = e.message;
				if (!t || typeof t != "object") return;
				let i = t, a = i.data;
				if (!(a instanceof Uint8Array) || !Array.isArray(i.fields) || typeof i.point_step != "number" || typeof i.width != "number" || typeof i.height != "number") return;
				if (!d) {
					let e = [];
					for (let t of i.fields) {
						if (!t || typeof t != "object") continue;
						let n = t;
						typeof n.name != "string" || typeof n.offset != "number" || e.push({
							name: n.name,
							offset: n.offset,
							datatype: typeof n.datatype == "number" ? n.datatype : void 0
						});
					}
					d = e;
				}
				let o = i.header, s = o && typeof o == "object" && typeof o.frame_id == "string" ? o.frame_id : void 0, c = P(a), l = b.current++, u = {
					type: "parse",
					id: l,
					fields: d,
					pointStep: i.point_step,
					width: i.width,
					height: i.height,
					isBigendian: i.is_bigendian === !0,
					topic: n,
					frameId: s,
					data: c
				};
				S.current = u, x.current ?? (S.current = null, x.current = l, r.postMessage(u, [c]));
			}
		}), () => {
			e.unregisterHighFrequencyConsumer(u), r.onmessage = null, r.terminate(), v.current = null, S.current = null, x.current = null, U(a.current), a.current = null, g.current = null, _.current = !1, s(null), l(!1);
		};
	}, [
		e,
		t,
		n
	]), o ? /* @__PURE__ */ k("points", {
		geometry: o,
		frustumCulled: !1,
		children: /* @__PURE__ */ k("pointsMaterial", {
			size: i,
			color: c ? "#ffffff" : r,
			vertexColors: c,
			sizeAttenuation: !0
		})
	}) : null;
};
function q(e) {
	let { material: t } = e;
	if (Array.isArray(t)) for (let e of t) e.dispose();
	else t.dispose();
}
var pe = ({ track: e }) => {
	let t = T(() => {
		let t = new N.BufferGeometry();
		return t.setAttribute("position", new N.Float32BufferAttribute(e.points.flat(), 3)), new N.Line(t, new N.LineBasicMaterial({ color: e.color }));
	}, [e.points, e.color]);
	if (w(() => () => {
		t.geometry.dispose(), q(t);
	}, [t]), e.points.length === 0) return null;
	if (e.mode === "pose") {
		let t = e.points[e.points.length - 1];
		return /* @__PURE__ */ A("mesh", {
			position: t,
			children: [/* @__PURE__ */ k("sphereGeometry", { args: [
				.08,
				16,
				12
			] }), /* @__PURE__ */ k("meshStandardMaterial", { color: e.color })]
		});
	}
	return /* @__PURE__ */ k("primitive", { object: t });
}, J = S.memo(({ primitive: e }) => {
	let t = T(() => {
		let t = new N.BufferGeometry();
		return t.setAttribute("position", new N.Float32BufferAttribute(e.points.flat(), 3)), t;
	}, [e.points]), n = T(() => new N.LineBasicMaterial({ color: e.color }), [e.color]), r = T(() => new N.Line(t, n), [t, n]);
	return w(() => () => {
		t.dispose();
	}, [t]), w(() => () => n.dispose(), [n]), /* @__PURE__ */ k("primitive", { object: r });
});
J.displayName = "MarkerLinePrimitiveView";
var Y = S.memo(({ primitive: e }) => {
	let t = T(() => new N.MeshStandardMaterial({
		color: e.color,
		roughness: .58,
		metalness: .04
	}), [e.color]);
	return w(() => () => t.dispose(), [t]), e.kind === "orientedBox" ? /* @__PURE__ */ k("mesh", {
		geometry: ae,
		material: t,
		position: e.position,
		scale: e.scale,
		quaternion: e.quaternion
	}) : /* @__PURE__ */ k("mesh", {
		geometry: e.kind === "cube" ? ae : oe,
		material: t,
		position: e.position,
		scale: e.scale
	});
});
Y.displayName = "MeshPrimitiveView";
var me = S.memo(({ primitive: e }) => e.kind === "line" ? /* @__PURE__ */ k(J, { primitive: e }) : /* @__PURE__ */ k(Y, { primitive: e }));
me.displayName = "MarkerPrimitiveView";
function X(e, t = "#38bdf8") {
	if (!e || typeof e != "object") return t;
	let n = e, r = typeof n.r == "number" ? Math.max(0, Math.min(1, n.r)) : .22, i = typeof n.g == "number" ? Math.max(0, Math.min(1, n.g)) : .74, a = typeof n.b == "number" ? Math.max(0, Math.min(1, n.b)) : .97;
	return `rgb(${Math.round(r * 255)}, ${Math.round(i * 255)}, ${Math.round(a * 255)})`;
}
function Z(e, t) {
	return typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? String(e) : t;
}
function Q(e) {
	if (!e || typeof e != "object") return null;
	let t = e.position;
	if (t && typeof t == "object" && typeof t.x == "number" && typeof t.y == "number") {
		let e = t;
		return [
			e.x,
			e.y,
			typeof e.z == "number" ? e.z : 0
		];
	}
	return null;
}
function he(e, t) {
	if (!e || typeof e != "object") return [];
	let n = e, r = Array.isArray(n.markers) ? n.markers : [e], i = [];
	for (let e of r) {
		if (!e || typeof e != "object") continue;
		let n = e, r = Z(n.id, String(i.length)), a = `${Z(n.ns, "marker")}:${r}`, o = X(n.color, t), s = n.scale && typeof n.scale == "object" ? n.scale : {}, c = [
			typeof s.x == "number" && s.x > 0 ? s.x : .2,
			typeof s.y == "number" && s.y > 0 ? s.y : .2,
			typeof s.z == "number" && s.z > 0 ? s.z : .2
		];
		if (n.type === 4 && Array.isArray(n.points)) {
			let e = n.points.map((e) => _({ position: e })).filter((e) => e != null);
			e.length >= 2 && i.push({
				kind: "line",
				key: a,
				points: e,
				color: o
			});
			continue;
		}
		let l = Q(n.pose) ?? Q({ position: n.position }) ?? [
			0,
			0,
			0
		], u = n.type === 1 ? "cube" : "sphere";
		i.push({
			kind: u,
			key: a,
			position: l,
			scale: c,
			color: o
		});
	}
	return i;
}
function ge(e) {
	return /Thumb|Index|Middle|Ring|Pinky|InHand/i.test(e) ? .018 : /Hand|Foot|Neck|Head/i.test(e) ? .035 : .045;
}
function _e(e, t) {
	let n = e.parentIndex >= 0 ? t[e.parentIndex] : void 0;
	if (e.name === "End Site" && /^Head$/i.test(n?.name ?? "")) return;
	if (/^Head$/i.test(e.name)) return [
		.093,
		.073,
		.1
	];
	let r = ge(e.name);
	return /Thumb|Index|Middle|Ring|Pinky|InHand/i.test(e.name) ? [
		r * 1.6,
		r,
		r * 1.1
	] : /Hand|Foot/i.test(e.name) ? [
		r * 1.8,
		r * 1.2,
		r * .9
	] : /Shoulder|UpLeg|Hips/i.test(e.name) ? [
		r * 2,
		r * 1.2,
		r * 1.2
	] : /Spine|Neck/i.test(e.name) ? [
		r * 1.4,
		r * 1.2,
		r * 1.8
	] : [
		r * 1.6,
		r * 1.1,
		r * 1.2
	];
}
function $(e, t) {
	let n = `${t}:${e}`;
	return /Thumb|Index|Middle|Ring|Pinky|InHand/i.test(n) ? .012 : /Hand|Foot|Neck|Head/i.test(n) ? .03 : /Spine|Hips/i.test(n) ? .07 : .045;
}
function ve(e, t = "") {
	let n = `${t}:${e}`;
	return /Head|Neck/i.test(n) ? "#f8c7a3" : /Thumb|Index|Middle|Ring|Pinky|InHand/i.test(n) ? "#f6d365" : /Right.*(Shoulder|Arm|ForeArm|Hand)/i.test(n) ? "#60a5fa" : /Left.*(Shoulder|Arm|ForeArm|Hand)/i.test(n) ? "#f59e0b" : /Right.*(UpLeg|Leg|Foot)/i.test(n) ? "#f87171" : /Left.*(UpLeg|Leg|Foot)/i.test(n) ? "#34d399" : /Spine|Hips/i.test(n) ? "#a78bfa" : "#94a3b8";
}
function ye(e, t, n, r) {
	let i = new N.Vector3(...t.position), a = new N.Vector3(...n.position), o = a.clone().sub(i), s = o.length();
	if (s <= 1e-6) return;
	o.normalize();
	let c = i.add(a).multiplyScalar(.5), l = new N.Quaternion().setFromUnitVectors(g, o), u = /^Head$/i.test(t.name) && n.name === "End Site" ? Math.min(Math.max(s * .45, .08), .14) : Math.min($(n.name, t.name), Math.max(s * .35, .006));
	return {
		kind: "orientedBox",
		key: e,
		frameIndex: r,
		position: [
			c.x,
			c.y,
			c.z
		],
		scale: [
			u,
			u,
			s
		],
		quaternion: [
			l.x,
			l.y,
			l.z,
			l.w
		],
		color: ve(n.name, t.name)
	};
}
function be(e, t) {
	if (!e || typeof e != "object") return [];
	let n = e, r = typeof n.frame_index == "number" && Number.isFinite(n.frame_index) ? n.frame_index : void 0, i = n.joints;
	if (!Array.isArray(i)) return [];
	let a = i.map((e) => {
		if (!e || typeof e != "object") return;
		let n = e, r = Number(n.x), i = Number(n.y), a = Number(n.z), o = Number(n.parent_index);
		if ([
			r,
			i,
			a,
			o
		].every((e) => Number.isFinite(e))) return {
			name: typeof n.name == "string" ? n.name : "",
			position: I([
				r,
				i,
				a
			], t),
			parentIndex: o
		};
	}).filter((e) => e != null), o = [];
	if (t.renderMode === "stick") {
		let e = /* @__PURE__ */ new Set();
		for (let t = 0; t < a.length; t++) {
			let n = a[t];
			if (!n) continue;
			if (!e.has(t)) {
				e.add(t);
				let i = _e(n, a);
				i && o.push({
					kind: "cube",
					key: `bvh:joint:${t}`,
					frameIndex: r,
					position: n.position,
					scale: i,
					color: ve(n.name)
				});
			}
			if (n.parentIndex < 0 || n.parentIndex >= a.length) continue;
			let i = a[n.parentIndex];
			if (!i) continue;
			let s = ye(`bvh:bone:${n.parentIndex}->${t}`, i, n, r);
			s && o.push(s);
		}
		return o;
	}
	for (let e = 0; e < a.length; e++) {
		let n = a[e];
		if (!n || n.parentIndex < 0 || n.parentIndex >= a.length) continue;
		let i = a[n.parentIndex];
		i && o.push({
			kind: "line",
			key: `bvh:line:${n.parentIndex}->${e}`,
			frameIndex: r,
			points: [i.position, n.position],
			color: t.color
		});
	}
	return o;
}
function xe(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (!Array.isArray(t.ranges) || typeof t.angle_min != "number" || typeof t.angle_increment != "number") return null;
	let n = [], r = t.ranges;
	for (let e = 0; e < r.length; e += 1) {
		let i = r[e];
		if (typeof i != "number" || !Number.isFinite(i) || i <= 0) continue;
		let a = t.angle_min + e * t.angle_increment;
		n.push(Math.cos(a) * i, Math.sin(a) * i, 0);
	}
	if (n.length === 0) return null;
	let i = new Float32Array(n);
	return {
		positions: i,
		count: i.length / 3
	};
}
function Se(e) {
	if (!e || typeof e != "object") return null;
	let t = e, n = t.info;
	if (!n || typeof n != "object" || !Array.isArray(t.data)) return null;
	let r = n, i = typeof r.width == "number" ? r.width : 0, a = typeof r.height == "number" ? r.height : 0, o = typeof r.resolution == "number" ? r.resolution : 0;
	if (i <= 0 || a <= 0 || o <= 0) return null;
	let s = Q(r.origin) ?? [
		0,
		0,
		0
	], c = [], l = t.data;
	for (let e = 0; e < a; e += 1) for (let t = 0; t < i; t += 1) {
		let n = l[e * i + t];
		typeof n != "number" || n < 50 || c.push(s[0] + t * o, s[1] + e * o, s[2]);
	}
	if (c.length === 0) return null;
	let u = new Float32Array(c);
	return {
		positions: u,
		count: u.length / 3
	};
}
var Ce = /* @__PURE__ */ new Set(), we = "https://assets.embodiflow.com/resources";
function Te(e) {
	return e.endsWith("/") ? e.slice(0, -1) : e;
}
function Ee(e, t) {
	return /\/resources\/?$/i.test(e) ? t.replace(/^resources\/+/i, "") : t;
}
function De(e) {
	if (/^https?:\/\//i.test(e)) return e;
	let t = window, n = Te(t.__ROSVIEW_URDF_PACKAGE_BASE__ || t.__ROS_STUDIO_URDF_PACKAGE_BASE__ || we);
	if (e.startsWith("/")) return `${n}/${Ee(n, e.replace(/^\/+/, ""))}`;
	if (!e.startsWith("package://")) return e;
	let r = e.slice(10), i = r.indexOf("/"), a = i >= 0 ? r.slice(0, i) : r, o = i >= 0 ? r.slice(i + 1) : "", s = t.__ROSVIEW_URDF_PACKAGE_BASES__?.[a] ?? t.__ROS_STUDIO_URDF_PACKAGE_BASES__?.[a];
	if (s) {
		let e = Te(s);
		return o ? `${e}/${o}` : e;
	}
	return `${n}/${Ee(n, r)}`;
}
function Oe(e, t) {
	let n = `${e}|${t}`;
	Ce.has(n) || (Ce.add(n), console.warn(`ROSView 3D: skip mesh ${e}. ${t}`));
}
var ke = 512, Ae = S.memo(({ player: e, urdf: t, jointState: r, tfMessagesRef: i, tfVersion: a, resetVersion: d, startTime: f, urdfRootScale: p, fallbackMeshColor: m, meshOutlineColor: h, onMeshLoadProgressChange: g }) => {
	let [_, v] = D(null), y = E(0), b = f ? L(f.sec, f.nsec) : 0n, x = E(b), S = E(r), C = E(!1), T = E(!1), O = E(null), { invalidate: A } = M();
	w(() => {
		S.current = r;
	}, [r]);
	let j = ee(() => {
		!_ || T.current || (T.current = !0, O.current = n(() => {
			T.current = !1, O.current = null, C.current && (C.current = !1, c(_, S.current)), u(_, x.current), A();
		}));
	}, [_, A]);
	return w(() => {
		x.current = b, j();
	}, [b, j]), w(() => () => {
		O.current?.(), O.current = null, T.current = !1;
	}, [_]), w(() => {
		let t = e.subscribeCurrentTime((e) => {
			x.current = BigInt(e.sec) * 1000000000n + BigInt(e.nsec), j();
		});
		return () => {
			t();
		};
	}, [e, j]), w(() => {
		let e = !1;
		return y.current = 0, g?.(null), (async () => {
			try {
				let n = await s(t, {
					resolveMeshUrl: De,
					warn: Oe,
					fallbackMeshColor: m,
					outlineColor: h,
					onMeshLoadProgress: (t) => {
						e || g?.(t);
					}
				});
				if (e) {
					o(n);
					return;
				}
				for (let e of i.current) l(n, e), y.current += 1;
				c(n, r), u(n, x.current), v(n), g?.(null);
			} catch (e) {
				let t = e instanceof Error ? e.message : String(e);
				console.warn(`ROS View 3D: URDF parse failed. ${t}`), g?.(null);
			}
		})(), () => {
			e = !0, g?.(null), v((e) => (o(e), null));
		};
	}, [
		t,
		d,
		m,
		h,
		g
	]), w(() => {
		if (!_) return;
		let e = i.current, t = y.current, n = e.length;
		for (let r = t; r < n; r++) {
			let t = e[r];
			t && l(_, t);
		}
		t = n, t >= ke && (e.splice(0, t), t = 0), y.current = t, j();
	}, [
		_,
		i,
		a,
		j
	]), w(() => {
		_ && (C.current = !0, j());
	}, [
		_,
		r,
		j
	]), _ ? /* @__PURE__ */ k("group", {
		scale: [
			p,
			p,
			p
		],
		children: /* @__PURE__ */ k("primitive", { object: _.root })
	}) : null;
}), je = ({ player: t, panelId: n, colors: i, showGrid: a, showAxes: o, showPlaceholder: s, pointSize: c, skeleton: l, urdf: u, topicSettings: d, onMeshLoadProgressChange: f }) => {
	let [p, m] = D([]), [g, _] = D([]), [y, b] = D([]), [S, C] = D(null), [j, M] = D(null), [N, P] = D(null), F = E(null), [te, ne] = D(null), I = E([]), [ie, R] = D(0), [z, ae] = D(0), oe = E(0n), [B, V] = D(null), se = ee((e) => {
		V((t) => t && e.size <= t.size ? t : e);
	}, []), ce = T(() => (B?.size ?? 20) / 20 * re, [B]), U = e((e) => e.sortedTopics), W = e((e) => e.playerState.activeData?.startTime), G = T(() => U.find((e) => e.type.includes("PointCloud2"))?.name, [U]), K = T(() => d.filter((e) => e.enabled && e.topic.length > 0), [d]), q = T(() => {
		if (u.sourceType === "topic") return u.topic && u.topic.length > 0 ? u.topic : U.find((e) => e.name.includes("robot_description"))?.name;
	}, [
		U,
		u.sourceType,
		u.topic
	]), [J, Y] = D(null);
	w(() => {
		J && console.warn(`ROS View 3D: ${J}`);
	}, [J]);
	let X = T(() => U.find((e) => e.type === "sensor_msgs/msg/JointState")?.name, [U]), Z = T(() => U.find((e) => e.type.includes("BvhSkeletonFrame"))?.name, [U]);
	w(() => {
		V(null);
	}, [z]), w(() => {
		Z || V(null);
	}, [Z]), w(() => {
		if (u.sourceType === "topic") {
			F.current && !q && (F.current = null, P(null)), Y(null);
			return;
		}
		if (u.sourceType === "file") {
			let e = u.fileContent;
			e && e !== F.current ? (F.current = e, P(e)) : !e && F.current && (F.current = null, P(null)), Y(null);
			return;
		}
		if (u.sourceType === "url") {
			if (!u.url) {
				F.current && (F.current = null, P(null)), Y(null);
				return;
			}
			let e = new AbortController();
			return Y(null), (async () => {
				try {
					let t = await fetch(u.url, { signal: e.signal });
					if (!t.ok) throw Error(`HTTP ${t.status}`);
					let n = await t.text();
					if (e.signal.aborted) return;
					n !== F.current && (F.current = n, P(n));
				} catch (t) {
					if (e.signal.aborted) return;
					let n = t instanceof Error ? t.message : String(t);
					Y(`Failed to load URDF: ${n}`);
				}
			})(), () => e.abort();
		}
	}, [
		u.sourceType,
		u.topic,
		u.url,
		u.fileContent,
		q
	]);
	let Q = T(() => U.filter((e) => e.type.includes("TFMessage") || e.type.includes("tf2_msgs") || e.type.includes("tf/tfMessage")).map((e) => e.name), [U]);
	w(() => {
		let e = [];
		q && e.push({
			topic: q,
			subscriberId: n
		}), X && e.push({
			topic: X,
			subscriberId: n
		}), Z && e.push({
			topic: Z,
			subscriberId: n
		});
		for (let t of K) e.push({
			topic: t.topic,
			subscriberId: n
		});
		for (let t of Q) e.push({
			topic: t,
			subscriberId: n
		});
		return e.length > 0 && t.registerSubscriptions(n, e), () => t.unregisterSubscriptions(n);
	}, [
		t,
		n,
		q,
		X,
		Z,
		K,
		Q
	]);
	let ge = T(() => new Set(Q), [Q]), _e = T(() => new Map(K.map((e) => [e.topic, e])), [K]);
	w(() => t.subscribeCurrentTime((e) => {
		let t = L(e.sec, e.nsec), n = oe.current, r = W ? L(W.sec, W.nsec) : void 0, i = r != null && t <= r + 5000000n && n > t, a = n > t + 5000000n;
		(i || a) && (I.current = [], R(0), H.clearTracks && m([]), H.clearMarkerPrimitives && _([]), H.clearSkeletonPrimitives && b([]), H.clearLaserScanCloud && C(null), H.clearOccupancyCloud && M(null), ae((e) => e + 1)), oe.current = t;
	}), [t, W]);
	let $ = ee(() => {
		let e = r.getSubscriberMessages(n);
		if (!e || e.length === 0) return;
		let t, i, a = 0, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c, u, d, f = I.current;
		for (let n of e) {
			let e = n.message, r = typeof e == "object" && e ? e : null;
			if (n.topic === q) {
				if (!r) continue;
				typeof r.data == "string" && (t = r.data);
			} else if (n.topic === X) {
				if (!r) continue;
				let e = r.name, t = r.position;
				Array.isArray(e) && Array.isArray(t) && e.every((e) => typeof e == "string") && (i = {
					name: e,
					position: t
				});
			} else if (n.topic === Z) l.enabled && (d = be(e, l));
			else if (ge.has(n.topic)) {
				if (!r) continue;
				Array.isArray(r.transforms) && (f.push(e), a++);
			} else {
				let t = _e.get(n.topic);
				if (!t) continue;
				let i = t.renderMode;
				if (i === "pose" || i === "path") {
					let r = x(e);
					r.length > 0 && o.set(n.topic, {
						topic: n.topic,
						color: t.color,
						points: r,
						mode: i
					});
					continue;
				}
				if (i === "skeleton") {
					d = be(e, {
						...l,
						color: t.color || l.color
					});
					continue;
				}
				if (i === "marker" || i === "auto" && r && (Array.isArray(r.markers) || typeof r.type == "number")) {
					let n = he(e, t.color);
					for (let e of n) s.set(e.key, e);
					continue;
				}
				if (i === "laserScan" || i === "auto" && r && Array.isArray(r.ranges) && typeof r.angle_increment == "number") {
					let t = xe(e);
					t && (c = t);
					continue;
				}
				if (i === "depth" || i === "auto" && r && Array.isArray(r.data) && r.info && typeof r.info == "object") {
					let t = Se(e);
					t && (u = t);
				}
			}
		}
		t !== void 0 && t !== F.current && (F.current = t, P(t)), i !== void 0 && ne(i), o.size > 0 && m((e) => {
			let t = new Map(e.map((e) => [e.topic, e]));
			for (let [e, n] of o) t.set(e, n);
			return Array.from(t.values());
		}), s.size > 0 && _((e) => {
			let t = new Map(e.map((e) => [e.key, e]));
			for (let [e, n] of s) t.set(e, n);
			return Array.from(t.values());
		}), d && b(d), c && C(c), u && M(u), a > 0 && R((e) => e + 1);
	}, [
		n,
		q,
		X,
		Z,
		l,
		ge,
		_e
	]);
	return w(() => {
		let e = r.subscribeToMessages(n, $);
		return $(), e;
	}, [n, $]), /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k(h, { background: i.sceneBackground }),
		/* @__PURE__ */ k(v, {}),
		/* @__PURE__ */ k(le, {
			bvhTopic: Z,
			skeletonPrimitives: y,
			resetVersion: z,
			onGroundLayout: se
		}),
		/* @__PURE__ */ k("ambientLight", { intensity: i.ambientLightIntensity }),
		/* @__PURE__ */ k("hemisphereLight", { args: [
			"#ffffff",
			"#6b7280",
			i.hemisphereLightIntensity
		] }),
		/* @__PURE__ */ k("directionalLight", {
			position: [
				6,
				-4,
				8
			],
			intensity: i.keyLightIntensity
		}),
		/* @__PURE__ */ k("directionalLight", {
			position: [
				-6,
				4,
				5
			],
			intensity: i.fillLightIntensity
		}),
		/* @__PURE__ */ k("directionalLight", {
			position: [
				-2,
				-7,
				6
			],
			intensity: i.rimLightIntensity
		}),
		a && (Z && B ? /* @__PURE__ */ k(ue, {
			colors: i,
			size: B.size,
			divisions: B.divisions,
			position: B.position
		}) : /* @__PURE__ */ k(ue, { colors: i })),
		o && /* @__PURE__ */ k("axesHelper", { args: [1] }),
		G && /* @__PURE__ */ k(fe, {
			player: t,
			panelId: n,
			topic: G,
			color: i.pointCloudColor,
			size: c
		}),
		S && /* @__PURE__ */ k(de, {
			data: S,
			color: "#f97316",
			size: .02
		}),
		j && /* @__PURE__ */ k(de, {
			data: j,
			color: "#a855f7",
			size: .04
		}),
		p.map((e) => /* @__PURE__ */ k(pe, { track: e }, e.topic)),
		g.map((e) => /* @__PURE__ */ k(me, { primitive: e }, e.key)),
		y.map((e) => /* @__PURE__ */ k(me, { primitive: e }, e.key)),
		N && /* @__PURE__ */ k(Ae, {
			player: t,
			urdf: N,
			jointState: te,
			tfMessagesRef: I,
			tfVersion: ie,
			resetVersion: z,
			startTime: W,
			urdfRootScale: ce,
			fallbackMeshColor: i.fallbackMeshColor,
			meshOutlineColor: i.meshOutlineColor,
			onMeshLoadProgressChange: f
		}),
		s && !G && !N && y.length === 0 && /* @__PURE__ */ A("mesh", {
			position: [
				0,
				0,
				.5
			],
			children: [/* @__PURE__ */ k("boxGeometry", { args: [
				1,
				1,
				1
			] }), /* @__PURE__ */ k("meshStandardMaterial", { color: i.placeholderColor })]
		})
	] });
}, Me = ({ player: e, panelId: n, showGrid: r = !0, showAxes: o = !1, showPlaceholder: s = !0, pointSize: c = .05, skeleton: l = a().skeleton, urdf: u, topicSettings: f = [] }) => {
	let { resolvedTheme: h } = t(), g = T(() => m(h), [h]), _ = u ?? i(), [v, y] = D(null), x = v !== null && v.total > 0 && v.loaded < v.total, S = x ? Math.round(v.loaded / v.total * 100) : 0;
	return /* @__PURE__ */ A("div", {
		className: `relative h-full w-full overflow-hidden [contain:strict] ${g.panelBackgroundClassName}`,
		children: [/* @__PURE__ */ k("div", {
			className: `absolute top-2 left-2 z-10 px-2 py-1 rounded text-[10px] font-mono pointer-events-none ${x ? "animate-pulse" : ""} ${g.overlayClassName}`,
			children: x ? `Loading Mesh ${v.loaded}/${v.total} (${S}%)` : "3D View"
		}), /* @__PURE__ */ k(j, {
			shadows: !0,
			frameloop: "demand",
			camera: p,
			gl: d,
			children: /* @__PURE__ */ A(C, {
				fallback: null,
				children: [/* @__PURE__ */ k(je, {
					player: e,
					panelId: n,
					colors: g,
					showGrid: r,
					showAxes: o,
					showPlaceholder: s,
					pointSize: c,
					skeleton: l,
					urdf: _,
					topicSettings: f,
					onMeshLoadProgressChange: y
				}), /* @__PURE__ */ k(b, { labelColor: g.gizmoLabelColor })]
			})
		})]
	});
};
//#endregion
export { Me as ThreeDPanel };
