import { f as e, i as t, t as n } from "./rafScheduler-Be5Ie1zf.js";
import { t as r } from "./TopicQuickPicker-BAKU_tG3.js";
import { t as i } from "./PanelTopicBar-BWIbmPOs.js";
import { _ as a, a as o, b as s, c, f as l, h as u, i as d, l as ee, m as f, n as p, o as m, v as h } from "./sceneMesh-BFyCgVil.js";
import { o as g, t as _ } from "./time-BoEDgjoH.js";
import { useEffect as v, useRef as y, useState as b } from "react";
import { jsx as x, jsxs as S } from "react/jsx-runtime";
import * as C from "three";
//#region src/features/panels/Image/core/h264.ts
function w(e) {
	return T(e).includes(5);
}
function T(e) {
	return te(e).map((t) => e[t] & 31);
}
function te(e) {
	let t = [], n = 0;
	for (; n < e.byteLength - 3;) {
		let r = ne(e, n);
		if (r < 0) break;
		let i = r + (e[r + 2] === 1 ? 3 : 4);
		i < e.byteLength && t.push(i), n = i + 1;
	}
	return t.length > 0 ? t : e.byteLength > 0 ? [0] : [];
}
function ne(e, t) {
	for (let n = t; n < e.byteLength - 3; n += 1) if (!(e[n] !== 0 || e[n + 1] !== 0) && (e[n + 2] === 1 || e[n + 2] === 0 && e[n + 3] === 1)) return n;
	return -1;
}
//#endregion
//#region src/features/panels/Image/core/h264Queue.ts
function E(e) {
	let t = T(e), n = t.some((e) => e === 7 || e === 8), r = t.some((e) => e === 1 || e === 5);
	return n && !r;
}
function D(e, t = [], n = !1) {
	let r = O(e);
	if (r < 0) return {
		frames: [...e],
		droppedFrames: 0,
		resync: !1
	};
	if (r === 0) return n ? {
		frames: T(e[0].data).includes(7) ? [...e] : [...t, ...e],
		droppedFrames: 0,
		resync: !0
	} : {
		frames: [...e],
		droppedFrames: 0,
		resync: !1
	};
	let i = T(e[r].data), a = i.includes(7) ? [] : k(e, r), o = [...i.includes(7) || a.length > 0 ? a : [...t], ...e.slice(r)], s = r - a.length;
	return s === 0 ? {
		frames: [...e],
		droppedFrames: 0,
		resync: !1
	} : {
		frames: o,
		droppedFrames: s,
		resync: !0
	};
}
function O(e) {
	for (let t = e.length - 1; t >= 0; --t) if (w(e[t].data)) return t;
	return -1;
}
function k(e, t) {
	let n = -1;
	for (let r = t - 1; r >= 0; --r) {
		let t = e[r];
		if (E(t.data) && T(t.data).includes(7)) {
			n = r;
			break;
		}
	}
	return n < 0 ? [] : e.slice(n, t).filter((e) => E(e.data));
}
//#endregion
//#region src/features/panels/Image/core/messageFrameAdapter.ts
function A(e, t = {}) {
	let n = e.message;
	if (u(n)) {
		let r = s(n.data, t);
		return r ? {
			frame: {
				kind: "compressed",
				receiveTime: e.receiveTime,
				publishTime: e.publishTime,
				format: f(n),
				data: r.data
			},
			transfer: r.transfer
		} : null;
	}
	if (h(n)) {
		let r = s(n.data, t);
		return r ? {
			frame: {
				kind: "raw",
				receiveTime: e.receiveTime,
				publishTime: e.publishTime,
				encoding: n.encoding,
				width: n.width,
				height: n.height,
				step: n.step,
				isBigEndian: n.is_bigendian,
				data: r.data
			},
			transfer: r.transfer
		} : null;
	}
	return null;
}
function j(e) {
	return a(e.message);
}
function M(e) {
	let t = e.message;
	return !u(t) || !a(t) ? null : t.data;
}
//#endregion
//#region src/features/panels/Image/core/h264SeekRepair.ts
var N = [
	2e3,
	5e3,
	1e4,
	3e4
];
function P(e) {
	for (let t = e.length - 1; t >= 0; --t) {
		let n = e[t];
		if (!n) continue;
		let r = M(n);
		if (r && w(r)) return t;
	}
	return -1;
}
function F(e, t) {
	let n = g(t), r = e.filter((e) => j(e) && g(e.receiveTime) <= n).sort((e, t) => {
		let n = g(e.receiveTime) - g(t.receiveTime);
		return n < 0n ? -1 : +(n > 0n);
	}), i = r.flatMap((e) => {
		let t = M(e);
		return t ? [{
			event: e,
			data: t
		}] : [];
	});
	return P(r) < 0 ? [] : re(D(i).frames).map(({ event: e }) => e);
}
function re(e) {
	let t = e.findIndex(({ data: e }) => w(e));
	return t < 0 || t >= 180 ? [] : e.slice(0, 180);
}
async function ie(e, t, n, r) {
	if (!e.getMessagesInTimeRange) return !1;
	for (let i of N) {
		let a = _(r, -i), o = F((await e.getMessagesInTimeRange({
			start: a,
			end: r,
			topics: [n]
		})).filter((e) => e.topic === n), r);
		if (o.length !== 0) {
			t.postMessage({
				type: "reset",
				preserveFrame: !0
			});
			for (let e of o) {
				let n = A(e);
				n && t.postMessage({
					type: "frame",
					frame: n.frame
				}, n.transfer);
			}
			return !0;
		}
	}
	return !1;
}
//#endregion
//#region src/features/panels/Image/core/SceneMeshOverlayRenderer.ts
var I = 120, ae = "\n  precision highp float;\n\n  uniform mat4 uCameraFromReference;\n  uniform vec4 uIntrinsics;\n  uniform vec2 uXiAlpha;\n  uniform vec2 uSourceSize;\n  uniform vec2 uViewportSize;\n  uniform vec2 uFlip;\n  uniform vec2 uRotation;\n  uniform vec2 uPixelOffset;\n  uniform float uImageScale;\n  uniform vec2 uDepthRange;\n\n  varying vec3 vNormalCamera;\n  varying vec3 vViewDirection;\n\n  void main() {\n    vec3 cameraPoint = (uCameraFromReference * vec4(position, 1.0)).xyz;\n    float distanceOne = length(cameraPoint);\n    float zXi = uXiAlpha.x * distanceOne + cameraPoint.z;\n    float distanceTwo = length(vec3(cameraPoint.xy, zXi));\n    float denominator = uXiAlpha.y * distanceTwo + (1.0 - uXiAlpha.y) * zXi;\n    if (denominator <= 1e-7) {\n      gl_Position = vec4(2.0, 2.0, 1.0, 1.0);\n      return;\n    }\n    vec2 sourcePixel = vec2(\n      uIntrinsics.x * cameraPoint.x / denominator + uIntrinsics.z,\n      uIntrinsics.y * cameraPoint.y / denominator + uIntrinsics.w\n    );\n    vec2 imagePosition = (sourcePixel - uSourceSize * 0.5) * uImageScale * uFlip;\n    imagePosition = vec2(\n      uRotation.x * imagePosition.x - uRotation.y * imagePosition.y,\n      uRotation.y * imagePosition.x + uRotation.x * imagePosition.y\n    );\n    vec2 viewportPixel = uViewportSize * 0.5 + imagePosition + uPixelOffset;\n    vec2 ndc = vec2(\n      viewportPixel.x / uViewportSize.x * 2.0 - 1.0,\n      1.0 - viewportPixel.y / uViewportSize.y * 2.0\n    );\n    float depth = clamp(\n      (distanceOne - uDepthRange.x) / (uDepthRange.y - uDepthRange.x),\n      0.0,\n      1.0\n    ) * 2.0 - 1.0;\n    gl_Position = vec4(ndc, depth, 1.0);\n    vNormalCamera = normalize(mat3(uCameraFromReference) * normal);\n    vViewDirection = normalize(-cameraPoint);\n  }\n", L = "\n  precision highp float;\n\n  uniform vec4 uColor;\n  uniform vec3 uLightDirection;\n\n  varying vec3 vNormalCamera;\n  varying vec3 vViewDirection;\n\n  void main() {\n    vec3 normalDirection = normalize(vNormalCamera);\n    float diffuse = abs(dot(normalDirection, normalize(uLightDirection)));\n    float rim = pow(1.0 - abs(dot(normalDirection, normalize(vViewDirection))), 2.0);\n    vec3 shaded = uColor.rgb * (0.36 + 0.64 * diffuse) + vec3(0.10) * rim;\n    gl_FragColor = vec4(shaded, uColor.a);\n  }\n", R = "\n  precision highp float;\n  uniform vec4 uColor;\n  void main() {\n    gl_FragColor = uColor;\n  }\n", oe = class {
	#e;
	#t;
	#n = new C.Scene();
	#r = new C.Camera();
	#i = new C.Matrix4();
	#a = new C.Vector3();
	#o = new C.Quaternion();
	#s = new C.Vector3(1, 1, 1);
	#c;
	#l = [];
	#u = null;
	#d;
	#f = [];
	#p = null;
	#m = null;
	constructor(e, t) {
		this.#e = e, this.#d = t, this.#t = new C.WebGLRenderer({
			canvas: e,
			alpha: !0,
			antialias: !0,
			premultipliedAlpha: !0,
			powerPreference: "high-performance"
		}), this.#t.setClearColor(0, 0), this.#t.outputColorSpace = C.SRGBColorSpace, this.#t.autoClear = !0, this.#c = new ResizeObserver(() => {
			this.#x(), this.#h();
		}), this.#c.observe(e), this.#x();
	}
	addFrame(e) {
		let t = this.#l[0];
		t && e.timestampNs < t.timestampNs && (this.#l = [], this.#p = null, this.#b());
		let n = this.#l.findIndex((t) => t.timestampNs === e.timestampNs);
		n >= 0 ? this.#l[n] = e : (this.#l.push(e), this.#l.sort((e, t) => e.timestampNs < t.timestampNs ? -1 : 1), this.#l.length > I && this.#l.splice(0, this.#l.length - I));
		let r = this.#m?.timestampNs;
		r !== void 0 && (e.timestampNs >= r ? e.timestampNs - r : r - e.timestampNs) <= 8000000n && this.#h();
	}
	clearFrames() {
		this.#l = [], this.#p = null, this.#b(), this.#S();
	}
	setCalibration(e) {
		this.#u = e, e && (this.#a.set(...e.referenceFromCameraTranslation), this.#o.set(...e.referenceFromCameraQuaternion), this.#i.compose(this.#a, this.#o, this.#s).invert()), this.#e.dataset.sceneMeshCalibrated = e ? "true" : "false", this.#h();
	}
	setOptions(e) {
		this.#d = e, this.#h();
	}
	renderImageFrame(e, t, n) {
		this.#m = {
			timestampNs: e,
			width: t,
			height: n
		}, this.#h();
	}
	dispose() {
		this.#c.disconnect(), this.#b(), this.#t.dispose(), this.#e.removeAttribute("data-scene-mesh-frame-ns"), this.#e.removeAttribute("data-scene-mesh-count"), this.#e.removeAttribute("data-scene-mesh-calibrated");
	}
	#h() {
		let e = this.#u, t = this.#m;
		if (!e || !t || this.#e.clientWidth <= 0 || this.#e.clientHeight <= 0) {
			this.#S();
			return;
		}
		let n = m(this.#l, t.timestampNs);
		if (!n) {
			this.#p = null, this.#b(), this.#S();
			return;
		}
		this.#p !== n.timestampNs && (this.#g(n.meshes), this.#p = n.timestampNs);
		let r = Math.max(1, this.#e.clientWidth), i = Math.max(1, this.#e.clientHeight), a = this.#d.rotationDeg % 360 * Math.PI / 180, o = Math.cos(a), s = Math.sin(a), c = Math.abs(o), l = Math.abs(s), u = t.width * c + t.height * l, d = t.width * l + t.height * c, ee = this.#d.fitMode === "contain" ? Math.min(r / u, i / d) : Math.max(r / u, i / d), f = t.width / e.width, p = t.height / e.height, [h, g, _, v, y, b] = e.intrinsics;
		for (let e of this.#f) for (let n of [e.material, e.shadowMaterial]) {
			let e = n.uniforms;
			e.uCameraFromReference.value.copy(this.#i), e.uIntrinsics.value.set(h * f, g * p, _ * f, v * p), e.uXiAlpha.value.set(y, b), e.uSourceSize.value.set(t.width, t.height), e.uViewportSize.value.set(r, i), e.uFlip.value.set(this.#d.flipHorizontal ? -1 : 1, this.#d.flipVertical ? -1 : 1), e.uRotation.value.set(o, s), e.uImageScale.value = ee;
		}
		this.#t.render(this.#n, this.#r), this.#e.dataset.sceneMeshFrameNs = n.timestampNs.toString(), this.#e.dataset.sceneMeshCount = String(n.meshes.length);
	}
	#g(e) {
		this.#_(e) || this.#v(e);
	}
	#_(e) {
		if (e.length !== this.#f.length) return !1;
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t], r = this.#f[t];
			if (!n || !r || r.id !== n.id) return !1;
			let i = r.geometry.getAttribute("position"), a = r.geometry.getIndex();
			if (!(i instanceof C.BufferAttribute) || !a || i.array.length !== n.points.length || a.array.length !== n.indices.length) return !1;
		}
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t], r = this.#f[t], i = r.geometry.getAttribute("position"), a = r.geometry.getIndex();
			i.array.set(n.points), a.array.set(n.indices), i.needsUpdate = !0, a.needsUpdate = !0, r.geometry.computeVertexNormals(), r.material.uniforms.uColor.value.set(...n.color);
		}
		return !0;
	}
	#v(e) {
		this.#b(), this.#f = e.map((e, t) => {
			let n = new C.BufferGeometry();
			n.setAttribute("position", new C.BufferAttribute(e.points, 3)), n.setIndex(new C.BufferAttribute(e.indices, 1)), n.computeVertexNormals(), n.computeBoundingSphere();
			let r = this.#y(e.color, !1), i = this.#y([
				.01,
				.015,
				.025,
				.3
			], !0), a = new C.Mesh(n, r), o = new C.Mesh(n, i);
			return o.frustumCulled = !1, a.frustumCulled = !1, o.renderOrder = t, a.renderOrder = 10 + t, this.#n.add(o, a), {
				id: e.id,
				geometry: n,
				material: r,
				shadowMaterial: i,
				mesh: a,
				shadow: o
			};
		});
	}
	#y(e, t) {
		let n = {
			uCameraFromReference: { value: new C.Matrix4() },
			uIntrinsics: { value: new C.Vector4() },
			uXiAlpha: { value: new C.Vector2() },
			uSourceSize: { value: new C.Vector2(1, 1) },
			uViewportSize: { value: new C.Vector2(1, 1) },
			uFlip: { value: new C.Vector2(1, 1) },
			uRotation: { value: new C.Vector2(1, 0) },
			uPixelOffset: { value: t ? new C.Vector2(3, 4) : new C.Vector2(0, 0) },
			uImageScale: { value: 1 },
			uDepthRange: { value: new C.Vector2(.02, 5) },
			uColor: { value: new C.Vector4(...e) },
			uLightDirection: { value: new C.Vector3(-.35, -.55, .76).normalize() }
		};
		return new C.ShaderMaterial({
			uniforms: n,
			vertexShader: ae,
			fragmentShader: t ? R : L,
			transparent: !0,
			depthTest: !t,
			depthWrite: !t,
			side: C.DoubleSide,
			blending: C.NormalBlending
		});
	}
	#b() {
		for (let e of this.#f) this.#n.remove(e.mesh, e.shadow), e.material.dispose(), e.shadowMaterial.dispose(), e.geometry.dispose();
		this.#f = [];
	}
	#x() {
		let e = Math.max(1, this.#e.clientWidth), t = Math.max(1, this.#e.clientHeight);
		this.#t.setPixelRatio(window.devicePixelRatio || 1), this.#t.setSize(e, t, !1);
	}
	#S() {
		this.#t.clear(!0, !0, !0), this.#e.removeAttribute("data-scene-mesh-frame-ns"), this.#e.dataset.sceneMeshCount = "0";
	}
}, z = /* @__PURE__ */ new WeakMap(), B = 1;
function se(e, t, n) {
	let r = z.get(e);
	r || (r = /* @__PURE__ */ new Map(), z.set(e, r));
	let i = r.get(t);
	if (!i) {
		i = {
			consumerId: `scene-mesh-broker-${B}`,
			listeners: /* @__PURE__ */ new Set()
		}, B += 1, r.set(t, i);
		let n = i;
		e.registerHighFrequencyConsumer(n.consumerId, {
			topic: t,
			lane: "pointcloud",
			mode: "all",
			onMessageBatch: (e) => {
				for (let t of e) {
					let e = o(t.message, g(t.publishTime));
					if (e) for (let t of n.listeners) t(e);
				}
			}
		});
	}
	return i.listeners.add(n), () => {
		let r = z.get(e), i = r?.get(t);
		i && (i.listeners.delete(n), !(i.listeners.size > 0) && (e.unregisterHighFrequencyConsumer(i.consumerId), r?.delete(t), r?.size === 0 && z.delete(e)));
	};
}
//#endregion
//#region src/features/panels/Image/core/ImageRender.worker.ts?worker&inline
var V = "function e(e,t,n){let r=e+t-n,i=Math.abs(r-e),a=Math.abs(r-t),o=Math.abs(r-n);return i<=a&&i<=o?e:a<=o?t:n}function t(e,t,n){for(let r=0;r<n;r++)t[r]=e[r]}function n(e,t,n,r){let i=0;for(;i<r;i++)t[i]=e[i];for(;i<n;i++)t[i]=e[i]+t[i-r]&255}function r(e,t,n,r){if(n.length===0){for(let n=0;n<r;n++)t[n]=e[n];return}for(let i=0;i<r;i++)t[i]=e[i]+n[i]&255}function i(e,t,n,r,i){let a=0;if(n.length===0){for(;a<i;a++)t[a]=e[a];for(;a<r;a++)t[a]=e[a]+(t[a-i]>>1)&255;return}for(;a<i;a++)t[a]=e[a]+(n[a]>>1)&255;for(;a<r;a++)t[a]=e[a]+(t[a-i]+n[a]>>1)&255}function a(t,n,r,i,a){let o=0;if(r.length===0){for(;o<a;o++)n[o]=t[o];for(;o<i;o++)n[o]=t[o]+n[o-a]&255;return}for(;o<a;o++)n[o]=t[o]+r[o]&255;for(;o<i;o++)n[o]=t[o]+e(n[o-a],r[o],r[o-a])&255}function o(e,o,s){let c=o*2,l=s*(1+c);if(e.byteLength!==l)throw Error(`PNG inflated length ${e.byteLength} !== expected ${l}`);let u=new Uint8Array(s*c),d=new Uint8Array,f=0;for(let o=0;o<s;o++){let s=e[f++],l=e.subarray(f,f+c);f+=c;let p=u.subarray(o*c,(o+1)*c);switch(s){case 0:t(l,p,c);break;case 1:n(l,p,c,2);break;case 2:r(l,p,d,c);break;case 3:i(l,p,d,c,2);break;case 4:a(l,p,d,c,2);break;default:throw Error(`Unsupported PNG filter type: ${s}`)}d=p}for(let e=0;e<u.length;e+=2){let t=u[e];u[e]=u[e+1],u[e+1]=t}return u}const s=new Uint8Array([137,80,78,71,13,10,26,10]);function c(e){let t=Math.max(0,e.byteLength-s.byteLength);for(let n=0;n<=t;n++){let t=!0;for(let r=0;r<s.byteLength;r++)if(e[n+r]!==s[r]){t=!1;break}if(t)return n}return-1}function l(e,t){return e.getUint32(t,!1)}function u(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=[],r=s.byteLength;for(;r+8<=e.byteLength;){let i=l(t,r),a=String.fromCharCode(e[r+4],e[r+5],e[r+6],e[r+7]),o=r+8,s=o+i;if(s+4>e.byteLength)throw Error(`PNG chunk exceeds buffer bounds`);if(a===`IDAT`&&n.push(e.subarray(o,s)),a===`IEND`)break;r=s+4}if(n.length===0)throw Error(`PNG is missing IDAT chunks`);let i=n.reduce((e,t)=>e+t.byteLength,0),a=new Uint8Array(i),o=0;for(let e of n)a.set(e,o),o+=e.byteLength;return a}async function d(e){if(typeof DecompressionStream>`u`)throw Error(`DecompressionStream is not supported in this environment`);let t=new Uint8Array(e.byteLength);t.set(e);let n=new Blob([t.buffer]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(n).arrayBuffer())}function f(e){if(e.byteLength<s.byteLength+8+13)throw Error(`PNG buffer is too small`);for(let t=0;t<s.byteLength;t++)if(e[t]!==s[t])throw Error(`Invalid PNG signature`);let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=l(t,s.byteLength);if(String.fromCharCode(e[s.byteLength+4],e[s.byteLength+5],e[s.byteLength+6],e[s.byteLength+7])!==`IHDR`||n!==13)throw Error(`PNG is missing IHDR chunk`);let r=s.byteLength+8;return{width:l(t,r),height:l(t,r+4),bitDepth:e[r+8],colorType:e[r+9]}}async function p(e){let{width:t,height:n,bitDepth:r,colorType:i}=f(e);if(t<=0||n<=0)throw Error(`Invalid PNG dimensions: ${t}x${n}`);if(r!==16||i!==0)throw Error(`Compressed depth PNG must be 16-bit grayscale (got depth=${r}, colorType=${i})`);return{width:t,height:n,data:o(await d(u(e)),t,n)}}const m=/\\b(jpeg|jpg|png|webp|gif|avif|bmp|h264)\\b/i,h=new Set([`16uc1`,`32fc1`,`mono16`,`mono8`,`8uc1`,`rgb8`,`bgr8`,`rgba8`,`bgra8`,`8uc3`]);function g(e){return e.trim().toLowerCase()}function ee(e){let t=g(e);return t===`16uc1`||t===`mono16`?`16uc1`:t===`32fc1`?`32fc1`:null}function te(e){let t=e.trim().toLowerCase();if(t.includes(`compresseddepth`))return/\\brvl\\b/.test(t)?`rvl`:`png`}function _(e){let t=e.trim(),n=t.split(`;`).map(e=>e.trim()).filter(Boolean),r=n[0]?g(n[0]):void 0,i=n.length>1?n.slice(1).join(`;`).trim():void 0;return{rawEncoding:r,transport:i,depthCodec:i?te(i):void 0,bitmapKind:y(t)}}function v(e){let t=_(e);return t.depthCodec!=null&&ee(t.rawEncoding??``)!=null}function ne(e){return v(e)?ee(_(e).rawEncoding??``):null}function y(e){let t=e.trim().toLowerCase();if(t===`h264`||t.includes(`h264`))return`h264`;let n=e.match(m);if(!n||!n[1])return null;let r=n[1].toLowerCase();return r===`jpg`||r===`jpeg`?`jpeg`:r===`png`||r===`webp`||r===`gif`||r===`avif`||r===`bmp`?r:r===`h264`?`h264`:null}function b(e){return e.byteLength>=3&&e[0]===255&&e[1]===216&&e[2]===255?`image/jpeg`:e.byteLength>=8&&e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71&&e[4]===13&&e[5]===10&&e[6]===26&&e[7]===10?`image/png`:e.byteLength>=12&&e[0]===82&&e[1]===73&&e[2]===70&&e[3]===70&&e[8]===87&&e[9]===69&&e[10]===66&&e[11]===80?`image/webp`:null}function re(e,t){if(v(e))throw Error(`Compressed depth format must not use bitmap MIME routing: ${e}`);let n=y(e);if(n===`jpeg`)return`image/jpeg`;if(n===`png`||n===`webp`||n===`gif`||n===`avif`||n===`bmp`)return`image/${n}`;let r=e.split(`;`)[0]?.trim().split(/\\s+/)[0]?.toLowerCase();if(!r)return t?b(t)??`image/jpeg`:`image/jpeg`;if(r.startsWith(`image/`))return r;if(r===`jpg`)return`image/jpeg`;if(h.has(r)){let n=t?b(t):null;if(n)return n;throw Error(`Unsupported compressed image format token: ${e}`)}return t?b(t)??`image/jpeg`:`image/jpeg`}function ie(e){return c(e)}function ae(e,t){if(t<4)return{compressionFormat:0,depthParam:[0,0]};let n=new DataView(e.buffer,e.byteOffset,e.byteLength);return{compressionFormat:n.getInt32(0,!0),depthParam:[n.getFloat32(4,!0),n.getFloat32(8,!0)]}}async function oe(e){let t=ie(e);if(t<0)throw Error(`Compressed depth payload does not contain a PNG signature`);let n=await p(e.subarray(t));return{width:n.width,height:n.height,data:n.data}}async function se(e){let{width:t,height:n,data:r}=await oe(e);return{encoding:`16uc1`,width:t,height:n,step:t*2,isBigEndian:!1,data:r}}async function ce(e,t){let{width:n,height:r,data:i}=await oe(e),[a,o]=t.depthParam,s=new Uint8Array(n*r*4),c=new DataView(s.buffer,s.byteOffset,s.byteLength),l=new DataView(i.buffer,i.byteOffset,i.byteLength);for(let e=0;e<n*r;e++){let t=l.getUint16(e*2,!0),n=0;t!==0&&(n=a/(t-o),Number.isFinite(n)||(n=0)),c.setFloat32(e*4,n,!0)}return{encoding:`32fc1`,width:n,height:r,step:n*4,isBigEndian:!1,data:s}}async function le(e,t){if(!v(t))throw Error(`Not a compressed depth format: ${t}`);if(_(t).depthCodec===`rvl`)throw Error(`RVL compressed depth is not supported yet`);let n=ne(t);if(!n)throw Error(`Unsupported compressed depth encoding in format: ${t}`);let r=ie(e);if(r<0)throw Error(`Compressed depth payload is missing PNG data`);if(r<12&&e.byteLength<12)throw Error(`Compressed depth payload is too small`);let i=ae(e,r);return n===`16uc1`?se(e):ce(e,i)}const x={colorMode:`colormap`,flatColor:`#ffffff`,gradient:[`#000000`,`#ffffff`],colorMap:`turbo`,explicitAlpha:1};function S(e,t,n){return Math.max(t,Math.min(n,e))}const ue={r:0,g:0,b:0,a:0},de={r:0,g:0,b:0,a:0};function C(e,t){let n=t.trim(),r=n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(r){let t=r[1];return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e.r=parseInt(t.slice(0,2),16)/255,e.g=parseInt(t.slice(2,4),16)/255,e.b=parseInt(t.slice(4,6),16)/255,e.a=1,e}let i=n.match(/^rgba?\\(\\s*([0-9.]+)\\s*,\\s*([0-9.]+)\\s*,\\s*([0-9.]+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)$/i);return i?(e.r=Number(i[1])/255,e.g=Number(i[2])/255,e.b=Number(i[3])/255,e.a=i[4]==null?1:Number(i[4]),e):(e.r=e.g=e.b=e.a=1,e)}function fe(e,t,n,r){let i=S(r,0,1);e.r=t.r+(n.r-t.r)*i,e.g=t.g+(n.g-t.g)*i,e.b=t.b+(n.b-t.b)*i,e.a=t.a+(n.a-t.a)*i}function pe(e,t){let n=(1-S(t,0,1))*5+1,r=Math.floor(n),i=n%1;r%2<1&&(i=1-i);let a=1-i;r<=1?(e.r=a,e.g=0,e.b=1):r===2?(e.r=0,e.g=a,e.b=1):r===3?(e.r=0,e.g=1,e.b=a):r===4?(e.r=a,e.g=1,e.b=0):(e.r=1,e.g=a,e.b=0),e.a=1}const w=[.13572138,4.6153926,-42.66032258,132.13108234],T=[.09140261,2.19418839,4.84296658,-14.18503333],E=[.1066733,12.64194608,-60.58204836,110.36276771],me=[-152.94239396,59.28637943],he=[4.27729857,2.82956604],ge=[-89.90310912,27.34824973];function _e(e,t){let n=S(t,0,1)*.99+.01,r=n*n,i=r*n,a=1*w[0]+n*w[1]+r*w[2]+i*w[3],o=1*T[0]+n*T[1]+r*T[2]+i*T[3],s=1*E[0]+n*E[1]+r*E[2]+i*E[3],c=r*r,l=i*r,u=c*me[0]+l*me[1],d=c*he[0]+l*he[1],f=c*ge[0]+l*ge[1];e.r=S(a+u,0,1),e.g=S(o+d,0,1),e.b=S(s+f,0,1),e.a=1}const D=65535;let O;function ve(e,t){if(!O){O=new Float32Array(D*3);let e={r:0,g:0,b:0,a:0};for(let t=0;t<D;t++){_e(e,t/(D-1));let n=t*3;O[n+0]=e.r,O[n+1]=e.g,O[n+2]=e.b}}let n=Math.trunc(t*(D-1))*3;e.r=O[n+0],e.g=O[n+1],e.b=O[n+2],e.a=1}function ye(e,t){let n=t>>>0;e.a=((n&4278190080)>>>24)/255,e.r=((n&16711680)>>>16)/255,e.g=((n&65280)>>>8)/255,e.b=((n&255)>>>0)/255}function k(e,t,n){let r=e.colorMode;if(r===`rgba-fields`)throw Error(`rgba-fields color mode is not supported for scalar depth images`);switch(r){case`flat`:{let t=C(ue,e.flatColor);return e=>{e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}}case`gradient`:{let r=Math.max(n-t,2**-52),i=C(ue,e.gradient[0]),a=C(de,e.gradient[1]);return(e,n)=>{let o=Math.max(0,Math.min((n-t)/r,1));fe(e,i,a,o)}}case`colormap`:{let r=Math.max(n-t,2**-52);return e.colorMap===`turbo`?(n,i)=>{ve(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}:(n,i)=>{pe(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}}case`rgb`:return(t,n)=>{ye(t,n),t.a=e.explicitAlpha};case`rgba`:return(e,t)=>{ye(e,t)};default:throw Error(`Unsupported color mode: ${String(r)}`)}}const A=1e4,be=/depth|aligned_depth|compressed_depth/i,xe=/wrist|hand|left|right|gripper|eef|end_effector/;function j(e){return e.trim().toLowerCase()}function M(e){let t=j(e);return t===`16uc1`||t===`mono16`}function Se(e){return j(e)===`32fc1`}function Ce(e){return be.test(e)}function N(e){let t=e.trim().toLowerCase();if(!t)return null;let n=Ce(t),r=!n&&xe.test(t),i={colorMode:`colormap`,colorMap:`turbo`};return n?{...i,minValue:200,maxValue:A}:r?{...i,minValue:0,maxValue:1e3}:null}function we(e,t){let n=t?N(t):null;return n?n.minValue:M(e)?200:0}function Te(e,t){let n=t?N(t):null;return n?n.maxValue:Se(e)?1:M(e)?A:65535}function P(e,t,n){return{minValue:t?.minValue??we(e,n),maxValue:t?.maxValue??Te(e,n)}}function Ee(e,t,n,r,i,a){a[i]=e+Math.trunc(1403*r/1e3),a[i+1]=e-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+2]=e+Math.trunc(1770*t/1e3),a[i+3]=255,a[i+4]=n+Math.trunc(1403*r/1e3),a[i+5]=n-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+6]=n+Math.trunc(1770*t/1e3),a[i+7]=255}function De(e,t,n,r,i){if(r<t*2)throw Error(`UYVY image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t]-128,s=e[t+1],c=e[t+2]-128,l=e[t+3];Ee(s,o,l,c,a,i),a+=8}}}function Oe(e,t,n,r,i){if(r<t*2)throw Error(`YUYV image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t],s=e[t+1]-128,c=e[t+2];Ee(o,s,c,e[t+3]-128,a,i),a+=8}}}function ke(e,t,n,r,i){if(r<t*3)throw Error(`RGB8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=255}}}function Ae(e,t,n,r,i){if(r<t*4)throw Error(`RGBA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=e[t+3]}}}function je(e,t,n,r,i){if(r<t*4)throw Error(`BGRA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=e[t+3]}}}function Me(e,t,n,r,i){if(r<t*3)throw Error(`BGR8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=255}}}function Ne(e,t,n,r,i,a,o){if(r<t*4)throw Error(`Float image row step (${r}) must be at least 4*width (${t*4})`);let{minValue:s,maxValue:c}=P(`32fc1`,o),l;try{l=k(o,s,c)}catch{l=k({...x,colorMode:`gradient`},s,c)}let u={r:0,g:0,b:0,a:0},d=new DataView(e.buffer,e.byteOffset,e.byteLength),f=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=d.getFloat32(n+e*4,!i);l(u,t),a[f++]=Math.round(F(u.r)*255),a[f++]=Math.round(F(u.g)*255),a[f++]=Math.round(F(u.b)*255),a[f++]=Math.round(F(u.a)*255)}}}function F(e){return Math.max(0,Math.min(1,e))}function Pe(e,t,n,r,i){if(r<t)throw Error(`Mono8 image row step (${r}) must be at least width (${t})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=e[n+r];i[a++]=t,i[a++]=t,i[a++]=t,i[a++]=255}}}function Fe(e,t,n,r,i,a,o,s){if(r<t*2)throw Error(`Mono16 image row step (${r}) must be at least 2*width (${t*2})`);let{minValue:c,maxValue:l}=P(s,o),u;try{u=k(o,c,l)}catch{u=k({...x,colorMode:`gradient`},c,l)}let d={r:0,g:0,b:0,a:0},f=new DataView(e.buffer,e.byteOffset,e.byteLength),p=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=f.getUint16(n+e*2,!i);u(d,t),a[p++]=Math.round(F(d.r)*255),a[p++]=Math.round(F(d.g)*255),a[p++]=Math.round(F(d.b)*255),a[p++]=Math.round(F(d.a)*255)}}}function I(e,t,n,r){return Function(`data`,`width`,`height`,`step`,`output`,`\n      if (step < width) {\n        throw new Error(\\`Bayer image row step (\\${step}) must be at least width (\\${width})\\`);\n      }\n      for (let i = 0; i < height / 2; i++) {\n        let inIdx = i * 2 * step;\n        let outTopIdx = i * 2 * width * 4;\n        let outBottomIdx = (i * 2 + 1) * width * 4;\n        for (let j = 0; j < width / 2; j++) {\n          const tl = data[inIdx++];\n          const tr = data[inIdx++];\n          const bl = data[inIdx + step - 2];\n          const br = data[inIdx + step - 1];\n\n          const ${e} = tl;\n          const ${t} = tr;\n          const ${n} = bl;\n          const ${r} = br;\n\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n        }\n      }\n    `)}const Ie=I(`r`,`g0`,`g1`,`b`),Le=I(`b`,`g0`,`g1`,`r`),Re=I(`g0`,`b`,`r`,`g1`),ze=I(`g0`,`r`,`b`,`g1`);function Be(e){return e.trim().toLowerCase()}function Ve(e,t,n){let r=e.width,i=e.height,a=e.step??He(e),o=e.is_bigendian??!1,s=Be(e.encoding),c=e.data,l={...x,...n};switch(s){case`rgb8`:ke(c,r,i,a,t);return;case`rgba8`:Ae(c,r,i,a,t);return;case`bgra8`:je(c,r,i,a,t);return;case`bgr8`:case`8uc3`:Me(c,r,i,a,t);return;case`mono8`:case`8uc1`:Pe(c,r,i,a,t);return;case`mono16`:case`16uc1`:Fe(c,r,i,a,o,t,l,s);return;case`32fc1`:Ne(c,r,i,a,o,t,l);return;case`uyvy`:case`yuv422`:De(c,r,i,a,t);return;case`yuyv`:case`yuv422_yuy2`:Oe(c,r,i,a,t);return;case`bayer_rggb8`:Ie(c,r,i,a,t);return;case`bayer_bggr8`:Le(c,r,i,a,t);return;case`bayer_gbrg8`:Re(c,r,i,a,t);return;case`bayer_grbg8`:ze(c,r,i,a,t);return;default:throw Error(`Unsupported image encoding: ${e.encoding}`)}}function He(e){switch(Be(e.encoding)){case`rgb8`:case`bgr8`:case`8uc3`:return e.width*3;case`rgba8`:case`bgra8`:case`32fc1`:return e.width*4;case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return e.width*2;case`mono16`:case`16uc1`:return e.width*2;case`mono8`:case`8uc1`:case`bayer_rggb8`:case`bayer_bggr8`:case`bayer_gbrg8`:case`bayer_grbg8`:return e.width;default:return e.width*4}}function Ue(e){return We(e)?`key`:`delta`}function L(e){return z(e).includes(5)}function We(e){for(let t of z(e))if(t===5||t===7||t===8)return!0;return!1}function R(e){for(let t of qe(e)){if((e[t]&31)!=7||t+3>=e.byteLength)continue;let n=e[t+1],r=e[t+2],i=e[t+3];return`avc1.${B(n)}${B(r)}${B(i)}`}return null}function Ge(e){let t=R(e),n=[t,t?`avc1.${t.slice(5,7)}00${t.slice(-2)}`:null,`avc1.42E01E`,`avc1.4D4020`,`avc1.640028`];return[...new Set(n.filter(e=>e!=null))]}function Ke(e,t){let n=Number(e/1000n);return Math.max(n,t+1)}function z(e){return qe(e).map(t=>e[t]&31)}function qe(e){let t=[],n=0;for(;n<e.byteLength-3;){let r=Je(e,n);if(r<0)break;let i=r+(e[r+2]===1?3:4);i<e.byteLength&&t.push(i),n=i+1}return t.length>0?t:e.byteLength>0?[0]:[]}function Je(e,t){for(let n=t;n<e.byteLength-3;n+=1)if(!(e[n]!==0||e[n+1]!==0)&&(e[n+2]===1||e[n+2]===0&&e[n+3]===1))return n;return-1}function B(e){return e.toString(16).padStart(2,`0`).toUpperCase()}const V={frames:72,spanMs:350,decodeMs:55,decodeQueueSize:8,mediaLagMs:350},H={frames:18,spanMs:120,decodeMs:32,decodeQueueSize:1,mediaLagMs:120},U={frames:40,spanMs:250,decodeMs:45,decodeQueueSize:6,mediaLagMs:250};function Ye(){return{mode:`normal`,healthySamples:0}}function Xe(e,t){return e>120||t>1e3}function Ze(e,t){let n=t.queueFrames>=V.frames||t.queueSpanMs>=V.spanMs||t.decodeMs>=V.decodeMs||t.decodeQueueSize>=V.decodeQueueSize||t.mediaLagMs>=V.mediaLagMs,r=t.queueFrames<=H.frames&&t.queueSpanMs<=H.spanMs&&t.decodeMs<=H.decodeMs&&t.decodeQueueSize<=H.decodeQueueSize&&t.mediaLagMs<=H.mediaLagMs,i=t.queueFrames>=U.frames||t.queueSpanMs>=U.spanMs||t.decodeMs>=U.decodeMs||t.decodeQueueSize>=U.decodeQueueSize||t.mediaLagMs>=U.mediaLagMs;if(e.mode===`normal`)return n?{mode:`degraded`,healthySamples:0}:e;if(e.mode===`degraded`)return r?{mode:`recovery`,healthySamples:1}:e;if(i)return{mode:`degraded`,healthySamples:0};if(!r)return{mode:`recovery`,healthySamples:0};let a=e.healthySamples+1;return a>=12?{mode:`normal`,healthySamples:0}:{mode:`recovery`,healthySamples:a}}function Qe(e,t){return!Number.isFinite(t)||t<0?e:e===0?t:e*.8+t*.2}function W(e,t){return e==null?0:Math.max(0,Number(e-t)/1e6)}function $e(e,t,n=120){return W(e,t)>n}function et(e,t,n){return e&&t!==null&&n<t}function tt(e,t){return t?{frames:[],droppedFrames:e.length,waitForIdr:!0}:{frames:[...e],droppedFrames:0,waitForIdr:!1}}function G(e){let t=z(e),n=t.some(e=>e===7||e===8),r=t.some(e=>e===1||e===5);return n&&!r}function nt(e,t){return G(t.data)?z(t.data).includes(7)?[t]:[...e,t]:[...e]}function rt(e,t=[],n=!1){let r=it(e);if(r<0)return{frames:[...e],droppedFrames:0,resync:!1};if(r===0)return n?{frames:z(e[0].data).includes(7)?[...e]:[...t,...e],droppedFrames:0,resync:!0}:{frames:[...e],droppedFrames:0,resync:!1};let i=z(e[r].data),a=i.includes(7)?[]:at(e,r),o=[...i.includes(7)||a.length>0?a:[...t],...e.slice(r)],s=r-a.length;return s===0?{frames:[...e],droppedFrames:0,resync:!1}:{frames:o,droppedFrames:s,resync:!0}}function it(e){for(let t=e.length-1;t>=0;--t)if(L(e[t].data))return t;return-1}function at(e,t){let n=-1;for(let r=t-1;r>=0;--r){let t=e[r];if(G(t.data)&&z(t.data).includes(7)){n=r;break}}return n<0?[]:e.slice(n,t).filter(e=>G(e.data))}function ot(e,t,n,r){let i=!1,a=null;return new Promise((o,s)=>{a=setTimeout(()=>{i=!0,a=null,s(Error(n))},t),e.then(e=>{if(a!=null&&(clearTimeout(a),a=null),i){r?.(e);return}o(e)},e=>{a!=null&&(clearTimeout(a),a=null),i||s(e instanceof Error?e:Error(String(e)))})})}function st(e,t,n=8000000n){let r=null,i=n+1n;for(let n of e){let e=n.timestampNs>=t?n.timestampNs-t:t-n.timestampNs;e<i&&(r=n,i=e)}return i<=n?r:null}function ct(e,t){e.lineCap=`round`,e.lineJoin=`round`;for(let n of t.points)lt(e,n)}function lt(e,t){let{points:n}=t;if(n.length!==0)switch(e.lineWidth=Math.max(1,t.thickness),e.strokeStyle=K(t.outlineColor),e.fillStyle=K(t.fillColor),t.kind){case`points`:for(let r=0;r<n.length;r+=1){let i=n[r];e.strokeStyle=K(t.outlineColors[r]??t.outlineColor),e.beginPath(),e.arc(i.x,i.y,Math.max(1,t.thickness/2),0,Math.PI*2),e.fill(),e.stroke()}return;case`line-loop`:case`line-strip`:e.beginPath(),e.moveTo(n[0].x,n[0].y);for(let t of n.slice(1))e.lineTo(t.x,t.y);t.kind===`line-loop`&&(e.closePath(),t.fillColor.a>0&&e.fill()),e.stroke();return;case`line-list`:for(let t=0;t+1<n.length;t+=2)e.beginPath(),e.moveTo(n[t].x,n[t].y),e.lineTo(n[t+1].x,n[t+1].y),e.stroke()}}function K(e){return`rgba(${Math.round(Math.max(0,Math.min(1,e.r))*255)}, ${Math.round(Math.max(0,Math.min(1,e.g))*255)}, ${Math.round(Math.max(0,Math.min(1,e.b))*255)}, ${Math.max(0,Math.min(1,e.a))})`}const ut={backgroundColor:`#000000`,flipHorizontal:!1,flipVertical:!1,rotationDeg:0,smoothing:!0,fitMode:`contain`};function q(e){return(e%360+360)%360}function dt(e,t,n){let r=q(n)*Math.PI/180,i=Math.abs(Math.cos(r)),a=Math.abs(Math.sin(r));return{w:e*i+t*a,h:e*a+t*i}}const ft={cssWidth:0,cssHeight:0,devicePixelRatio:1},pt=5e3;var mt=class{#e=null;#t=-1;#n=null;#r=null;#i=0;#a=new Map;#o;constructor(e){this.#o=e}dispose(){this.reset(),this.#t=-1}reset(){this.#i+=1,this.#e&&this.#e.state!==`closed`&&this.#e.close(),this.#e=null,this.#n=null,this.#r=null,this.#a.clear()}get codec(){return this.#n??void 0}get decodeQueueSize(){return this.#e?.state===`configured`?this.#e.decodeQueueSize:0}async submitFrame(e,t,n){if(typeof VideoDecoder>`u`)throw Error(`WebCodecs VideoDecoder is not supported`);let r=this.#i;if(await this.#s(t),r!==this.#i)return;let i=this.#e,a=this.#c(n);z(t).some(e=>e===1||e===5)&&this.#a.set(a,{frame:e,startedAt:performance.now(),generation:r});try{i.decode(new EncodedVideoChunk({type:Ue(t),timestamp:a,data:t}))}catch(e){throw this.#a.delete(a),e}}async#s(e){let t=R(e);if(t&&t!==this.#r&&this.#e&&this.#e.state!==`closed`&&this.reset(),this.#e&&this.#e.state!==`closed`)return;let n=null;for(let t of Ge(e)){let e=[{codec:t,hardwareAcceleration:`prefer-hardware`,optimizeForLatency:!0},{codec:t,hardwareAcceleration:`no-preference`,optimizeForLatency:!0}];for(let t of e)try{let e=await VideoDecoder.isConfigSupported(t);if(e.supported){n=e.config??t;break}}catch{}if(n)break}if(!n){let t=R(e);throw Error(`H.264 codec ${t??`fallback candidates`} is not supported`)}this.#e=new VideoDecoder({output:e=>{let t=this.#a.get(e.timestamp);if(this.#a.delete(e.timestamp),!t||t.generation!==this.#i){e.close();return}this.#o.output({videoFrame:e,sourceFrame:t.frame,decodeMs:performance.now()-t.startedAt})},error:e=>{this.#o.error(Error(String(e)))}}),this.#e.addEventListener(`dequeue`,this.#o.dequeue);try{this.#e.configure(n),this.#n=n.codec,this.#r=t}catch(e){throw this.#e.close(),this.#e=null,this.#n=null,e}}#c(e){let t=Ke(e,this.#t);return this.#t=t,t}},ht=class{#e=null;#t=null;#n=new OffscreenCanvas(1,1);#r=this.#n.getContext(`2d`,{alpha:!1});#i={...ut};#a={...ft};#o={};#s=[];#c=null;#l=[];#u=!1;#d;#f=null;#p=null;#m=`idle`;#h=!1;#g=null;#_=null;#v=new Map;#y=null;#b=Ye();#x=0;#S=!1;#C=[];#w=[];#T=!1;#E=-1/0;#D=-1/0;#O=0;#k=0;#A=0;#j=-1/0;#M=null;#N=null;#P=null;#F=!1;#I=-1/0;#L=0;constructor(){if(!this.#r)throw Error(`Buffer canvas context is unavailable in worker`);this.#d=new mt({output:e=>this.#W(e),error:e=>this.#q(e),dequeue:()=>{this.#X(),this.#H()}})}handle(e){switch(e.type){case`init`:if(this.#e=e.canvas,this.#t=e.canvas.getContext(`2d`,{alpha:!1,desynchronized:!0}),!this.#t)throw Error(`Canvas 2D context is unavailable in worker`);this.#de(),this.#pe(),this.#se({phase:`idle`});return;case`viewport`:this.#a=e.viewport,this.#de(),this.#ne();return;case`renderOptions`:this.#i=e.options,this.#ne();return;case`rawDecodeOptions`:this.#o=e.options,this.#ee();return;case`playback`:this.#M=Z(e.currentTime),this.#F=e.isPlaying,this.#X(),this.#z(),this.#Q();return;case`frame`:if(this.#h)return;this.#R(e.frame),this.#u||this.#H();return;case`overlay`:if(!e.overlay)this.#s=[];else{let t=this.#s.findIndex(t=>t.timestampNs===e.overlay?.timestampNs);t>=0?this.#s[t]=e.overlay:this.#s.push(e.overlay),this.#s.length>120&&this.#s.shift()}this.#te();return;case`reset`:this.#L+=1,this.#c=null,this.#l=[],this.#Y(),this.#h=!1,this.#Z(),this.#d.reset(),this.#oe(),this.#s=[],e.preserveFrame||(this.#ie(),this.#y=null,this.#pe(),this.#se({phase:`idle`}));return;case`dispose`:this.#L+=1,this.#c=null,this.#l=[],this.#Y(),this.#h=!1,this.#d.dispose(),this.#oe(),this.#ie(),this.#y=null,self.close();return}}#R(e){if(!Y(e)){this.#c=e;return}if(this.#w=nt(this.#w,e),this.#S&&!L(e.data)){if(G(e.data)){this.#C=nt(this.#C,e);return}this.#O+=1,this.#Q();return}L(e.data)&&(this.#S=!1,this.#C.length>0&&(this.#l.push(...this.#C),this.#C=[])),this.#l.push(e),this.#X(),this.#z(),this.#Q()}#z(){let e=X(this.#l),t=Xe(this.#l.length,e),n=this.#b.mode===`degraded`&&(this.#l.length>36||e>250);if(!t&&!n)return;let r=rt(this.#l,this.#w),i=t||performance.now()-this.#j>=200;if(r.resync&&i&&(this.#l=r.frames,this.#J(),this.#O+=r.droppedFrames),Xe(this.#l.length,X(this.#l))){this.#B();return}r.resync}#B(){let e=tt(this.#l,!0);this.#O+=e.droppedFrames,this.#l=e.frames,this.#S=!0,this.#C=[...this.#w],this.#J(),this.#X(),this.#Q(!0)}#V(){let e=this.#l.shift();if(e)return e;let t=this.#c;return this.#c=null,t}async#H(){if(this.#u)return;this.#u=!0;let e=this.#L;try{let t;for(;!(this.#l.length>0&&this.#d.decodeQueueSize>=4||(t=this.#V(),!t)||e!==this.#L);)if(Y(t)&&this.#T&&(this.#J(),this.#T=!1),await this.#U(t,e),this.#h){this.#c=null,this.#l=[];break}}finally{this.#u=!1,(this.#c||this.#l.length>0&&this.#d.decodeQueueSize<4)&&this.#H()}}async#U(e,t){this.#se({phase:`decoding`,receiveTime:e.receiveTime});try{if(e.kind===`compressed`){let t=J(e.data);if(t.byteLength===0)throw Error(`Compressed image payload is empty: ${e.format}`);if(v(e.format)){let n=await le(t,e.format);this.#$({receiveTime:e.receiveTime,publishTime:e.publishTime,encoding:n.encoding,width:n.width,height:n.height,step:n.step,isBigEndian:n.isBigEndian,data:J(n.data)});return}let n=y(e.format),r=Z(e.receiveTime);if(n===`h264`){await this.#d.submitFrame(e,t,r),this.#X(),this.#Q();return}let i=await ot(this.#ae(t,e.format),pt,`Compressed image decode timed out: ${e.format}`,yt),a=i;try{let t=`displayWidth`in i?i.displayWidth:i.width,n=`displayHeight`in i?i.displayHeight:i.height,r=Q(i)?i:await ot(createImageBitmap(i),pt,`Compressed image bitmap creation timed out: ${e.format}`,xt);Q(i)&&(a=null),bt(a),a=null,this.#re(r,t,n,e.format,e.receiveTime,e.publishTime),this.#le(r,t,n,e.publishTime),this.#se({phase:`ready`,width:t,height:n,encoding:e.format,receiveTime:e.receiveTime})}catch(e){throw bt(a),e}return}let t=J(e.data);this.#$({receiveTime:e.receiveTime,publishTime:e.publishTime,encoding:e.encoding,width:e.width,height:e.height,step:e.step??e.width*gt(e.encoding),isBigEndian:e.isBigEndian??!1,data:t})}catch(n){if(t!==this.#L)return;if(Y(e)){this.#O+=1,this.#q(n instanceof Error?n:Error(String(n)));return}this.#h=!0,this.#se({phase:`error`,message:n instanceof Error?n.message:String(n)})}}#W(e){let t=Z(e.sourceFrame.receiveTime);if(this.#N=t,this.#x=Qe(this.#x,e.decodeMs),this.#F&&$e(this.#M,t)){e.videoFrame.close(),this.#O+=1,this.#X(),this.#Q();return}this.#f&&(this.#f.videoFrame.close(),this.#O+=1),this.#f={videoFrame:e.videoFrame,sourceFrame:e.sourceFrame},this.#G(),this.#X(),this.#Q()}#G(){if(this.#p!=null||!this.#f)return;let e=this.#b.mode===`normal`?16.666666666666668:33.333333333333336,t=Math.max(0,e-(performance.now()-this.#E));if(t<=0){this.#K();return}this.#p=setTimeout(()=>{this.#p=null,this.#K()},t)}async#K(){let e=this.#f;if(this.#f=null,!e)return;let{videoFrame:t,sourceFrame:n}=e,r=performance.now();try{let e=Z(n.receiveTime);if(this.#F&&$e(this.#M,e)){this.#O+=1;return}let i=t.displayWidth||t.codedWidth,a=t.displayHeight||t.codedHeight;if(!this.#ue(t,i,a,n.publishTime)){this.#O+=1;return}if(this.#E=r,this.#k+=1,this.#se({phase:`ready`,width:i,height:a,encoding:n.kind===`compressed`?n.format:`h264`,receiveTime:n.receiveTime}),this.#b.mode===`normal`&&r-this.#D>=500)try{let e=await createImageBitmap(t);this.#re(e,i,a,n.kind===`compressed`?n.format:`h264`,n.receiveTime,n.publishTime),this.#D=r}catch{}}finally{t.close(),this.#Q(),this.#f&&this.#G()}}#q(e){this.#J();let t=rt(this.#l,this.#w,!0);t.resync?(this.#l=t.frames,this.#S=!1,this.#O+=t.droppedFrames,this.#H()):(this.#O+=this.#l.length,this.#l=[],this.#S=!0,this.#C=[...this.#w]),this.#k===0&&!this.#y&&this.#se({phase:`error`,message:e.message}),this.#Q(!0)}#J(){this.#d.reset(),this.#Y(),this.#T=!1,this.#A+=1,this.#j=performance.now()}#Y(){this.#p!=null&&(clearTimeout(this.#p),this.#p=null),this.#f?.videoFrame.close(),this.#f=null}#X(){let e=this.#b.mode,t=!this.#F||this.#N==null?0:W(this.#M,this.#N);this.#b=Ze(this.#b,{queueFrames:this.#l.length,queueSpanMs:X(this.#l),decodeMs:this.#x,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:t}),e!==this.#b.mode&&this.#Q(!0)}#Z(){this.#b=Ye(),this.#x=0,this.#S=!0,this.#C=[...this.#w],this.#T=!1,this.#E=-1/0,this.#D=-1/0,this.#O=0,this.#k=0,this.#A=0,this.#j=-1/0,this.#N=null,this.#P=null,this.#I=-1/0}#Q(e=!1){let t=performance.now();if(!e&&t-this.#I<1e3)return;this.#I=t;let n=this.#N==null?0:W(this.#M,this.#N),r={pressureMode:this.#b.mode,queueFrames:this.#l.length,queueSpanMs:X(this.#l),decodeMs:this.#x,droppedFrames:this.#O,renderedFrames:this.#k,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:n,resyncCount:this.#A,codec:this.#d.codec};$.postMessage({type:`metrics`,metrics:r})}#$(e){let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height)),Ve({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#ie(),this.#y={kind:`raw`,width:e.width,height:e.height,encoding:e.encoding,step:e.step,isBigEndian:e.isBigEndian,data:e.data,receiveTime:e.receiveTime,publishTime:e.publishTime},this.#ce(e.width,e.height,e.publishTime),this.#se({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}#ee(){let e=this.#y;if(!e||e.kind!==`raw`)return;let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height));try{Ve({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#ce(e.width,e.height,e.publishTime),this.#se({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}catch{}}#te(){let e=this.#y;if(e?.kind===`bitmap`&&y(e.encoding)===`h264`){this.#P!==null&&Z(e.publishTime)===this.#P&&this.#ne();return}this.#ne()}#ne(){let e=this.#y;if(!e){this.#pe();return}e.kind===`raw`?(this.#ce(e.width,e.height,e.publishTime),this.#se({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})):(this.#le(e.bitmap,e.width,e.height,e.publishTime),this.#se({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime}))}#re(e,t,n,r,i,a){this.#ie(),this.#y={kind:`bitmap`,width:t,height:n,encoding:r,bitmap:e,receiveTime:i,publishTime:a}}#ie(){this.#y?.kind===`bitmap`&&this.#y.bitmap.close()}async#ae(e,t){let n=re(t,e);if(typeof ImageDecoder<`u`){let t=this.#v.get(n);if(t===void 0&&(t=await ImageDecoder.isTypeSupported(n),this.#v.set(n,t)),t){let t=new ImageDecoder({type:n,data:e});try{let{image:e}=await t.decode({frameIndex:0});return e}finally{t.close()}}}return createImageBitmap(new Blob([e],{type:n}))}#oe(){this.#v.clear(),this.#g=null,this.#_=null}#se(e){if(e.phase===`decoding`&&this.#m!==`idle`&&this.#m!==`error`)return;this.#m=e.phase;let t={type:`status`,status:e};$.postMessage(t)}#ce(e,t,n){_t(this.#n,e,t),this.#r.putImageData(this.#_,0,0),this.#ue(this.#n,e,t,n)}#le(e,t,n,r){this.#ue(e,t,n,r)}#ue(e,t,n,r){let i=Z(r);if(et(this.#F,this.#P,i))return!1;this.#de();let a=this.#t,o=this.#e;if(!a||!o)return!1;let s=this.#a.cssWidth||o.width/Math.max(1,this.#a.devicePixelRatio)||1,c=this.#a.cssHeight||o.height/Math.max(1,this.#a.devicePixelRatio)||1,l=q(this.#i.rotationDeg),{w:u,h:d}=dt(t,n,l),f=this.#i.fitMode===`contain`?Math.min(s/u,c/d):Math.max(s/u,c/d),p=Math.max(1,t*f),m=Math.max(1,n*f);a.save();let h=this.#fe();a.setTransform(h,0,0,h,0,0),a.clearRect(0,0,s,c),a.fillStyle=this.#i.backgroundColor,a.fillRect(0,0,s,c),a.imageSmoothingEnabled=this.#i.smoothing,a.imageSmoothingQuality=this.#i.smoothing&&this.#b.mode===`normal`?`high`:`low`,a.translate(s/2,c/2),a.rotate(l*Math.PI/180),a.scale(this.#i.flipHorizontal?-1:1,this.#i.flipVertical?-1:1),a.drawImage(e,-p/2,-m/2,p,m);let g=st(this.#s,i);return g&&(a.translate(-p/2,-m/2),a.scale(f,f),ct(a,g)),a.restore(),this.#P=i,$.postMessage({type:`rendered`,timestampNs:i,width:t,height:n}),!0}#de(){if(!this.#e)return;let e=this.#fe(),t=Math.max(1,Math.round(Math.max(0,this.#a.cssWidth)*e)),n=Math.max(1,Math.round(Math.max(0,this.#a.cssHeight)*e));this.#e.width!==t&&(this.#e.width=t),this.#e.height!==n&&(this.#e.height=n)}#fe(){let e=Math.max(1,this.#a.devicePixelRatio);return this.#b.mode===`normal`?e:Math.min(e,1)}#pe(){!this.#t||!this.#e||(this.#t.save(),this.#t.setTransform(1,0,0,1,0,0),this.#t.clearRect(0,0,this.#e.width,this.#e.height),this.#t.fillStyle=this.#i.backgroundColor,this.#t.fillRect(0,0,this.#e.width,this.#e.height),this.#t.restore())}};function gt(e){switch(e.trim().toLowerCase()){case`rgb8`:case`bgr8`:case`8uc3`:return 3;case`rgba8`:case`bgra8`:case`32fc1`:return 4;case`mono16`:case`16uc1`:case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return 2;default:return 1}}function _t(e,t,n){e.width!==t&&(e.width=t),e.height!==n&&(e.height=n)}function vt(e){let t=new Uint8Array(new ArrayBuffer(e.byteLength));return t.set(e),t}function J(e){return e.buffer instanceof ArrayBuffer&&e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e:vt(e)}function Y(e){return e.kind===`compressed`&&y(e.format)===`h264`}function X(e){if(e.length<2)return 0;let t=e.find(e=>!Y(e)||!G(e.data)),n=e.findLast(e=>!Y(e)||!G(e.data));if(!t||!n)return 0;let r=Z(n.receiveTime)-Z(t.receiveTime);return Math.max(0,Number(r)/1e6)}function Z(e){return BigInt(e.sec)*1000000000n+BigInt(e.nsec)}function yt(e){e.close()}function bt(e){e&&yt(e)}function xt(e){e.close()}function Q(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap}const St=new ht,$=self;$.onmessage=e=>{St.handle(e.data)};", H = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", V], { type: "text/javascript;charset=utf-8" });
function ce(e) {
	let t;
	try {
		if (t = H && (self.URL || self.webkitURL).createObjectURL(H), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(V), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/features/panels/Image/ImagePanel.tsx
function le(e) {
	return {
		colorMode: e.colorMode,
		flatColor: e.flatColor,
		gradient: e.gradient,
		colorMap: e.colorMap,
		explicitAlpha: e.explicitAlpha,
		minValue: e.minValue,
		maxValue: e.maxValue
	};
}
var U = (a) => {
	let { formatMessage: s } = e(), u = t((e) => e.playerState.activeData?.isPlaying ?? !1), { player: f, panelId: m, setConfig: h, topic: C, annotationTopic: w, annotationVisible: T, meshTopic: te, meshVisible: ne, backgroundColor: E, showStatusText: D, fitMode: O, flipHorizontal: k, flipVertical: A, rotation: M, smoothing: N, colorMode: P, colorMap: F, gradient: re, flatColor: I, explicitAlpha: ae, minValue: L, maxValue: R } = a, z = y(null), B = y(null), V = y(null), H = y(null), U = y(null), G = y(null), K = y(null), fe = y(null), q = y(0), J = y({ phase: "idle" }), Y = y(!1), pe = y({
		backgroundColor: E,
		flipHorizontal: k,
		flipVertical: A,
		rotationDeg: M,
		smoothing: N,
		fitMode: O
	}), [X, me] = b({ phase: "idle" }), [Z, Q] = b(null), he = `${m}:image-main`, ge = `${m}:image-main-h264`, _e = `${m}:image-annotations`, ve = `${m}:image-scene-mesh-calibration`, ye = T ? w.trim() : "", $ = ne ? te.trim() : "", be = p(C);
	v(() => {
		let e = B.current;
		if (!e) return;
		let t = new oe(e, pe.current);
		return V.current = t, () => {
			t.dispose(), V.current === t && (V.current = null);
		};
	}, []), v(() => {
		let e = z.current, t = H.current;
		if (!e || !t) return;
		if (typeof e.transferControlToOffscreen != "function") {
			let e = {
				phase: "error",
				message: s({ id: "panels.image.error.offscreenUnsupported" })
			};
			J.current = e, me(e);
			return;
		}
		G.current != null && (window.clearTimeout(G.current), G.current = null), U.current && K.current && K.current !== e && (U.current.postMessage({ type: "dispose" }), U.current.terminate(), U.current = null, K.current = null);
		let r = U.current;
		if (!r) {
			r = new ce(), U.current = r;
			let t = e.transferControlToOffscreen();
			K.current = e, r.postMessage({
				type: "init",
				canvas: t
			}, [t]);
		}
		r.onmessage = (e) => {
			let t = e.data;
			if (t.type === "metrics") {
				Q(t.metrics);
				return;
			}
			if (t.type === "rendered") {
				V.current?.renderImageFrame(t.timestampNs, t.width, t.height);
				return;
			}
			if (t.type !== "status") return;
			let n = t.status;
			de(J.current, n) || (J.current = n, me(n));
		};
		let i = -1, a = -1, o = -1, c = null, l = () => {
			let e = t.getBoundingClientRect(), n = window.devicePixelRatio || 1, s = e.width, c = e.height;
			s === i && c === a && n === o || (i = s, a = c, o = n, r.postMessage({
				type: "viewport",
				viewport: {
					cssWidth: s,
					cssHeight: c,
					devicePixelRatio: n
				}
			}));
		}, u = () => {
			c?.(), c = n(l);
		};
		l();
		let d = new ResizeObserver(u);
		return d.observe(t), window.addEventListener("resize", u), () => {
			c?.(), c = null, window.removeEventListener("resize", u), d.disconnect(), G.current = window.setTimeout(() => {
				let e = U.current;
				e && (e.postMessage({ type: "dispose" }), e.terminate(), U.current = null, K.current = null, J.current = { phase: "idle" }, me({ phase: "idle" }), Q(null), G.current = null);
			}, 0);
		};
	}, [s]), v(() => {
		if (!C) return;
		let e = U.current;
		if (e) return Y.current = !1, Q(null), e.postMessage({ type: "reset" }), f.registerHighFrequencyConsumer(he, {
			topic: C,
			lane: "video",
			mode: "latest",
			onLatestMessage: (t) => {
				if (j(t)) {
					if (Y.current) return;
					Y.current = !0, f.registerHighFrequencyConsumer(ge, {
						topic: C,
						lane: "video",
						mode: "all",
						onMessageBatch: (t) => {
							for (let n of t) j(n) && W(e, n);
						}
					});
				}
				W(e, t);
			},
			onMessageBatch: (t) => {
				if (Y.current) return;
				let n = t.at(-1);
				n && W(e, n);
			}
		}), () => {
			f.unregisterHighFrequencyConsumer(he), f.unregisterHighFrequencyConsumer(ge), e.postMessage({ type: "reset" });
		};
	}, [
		f,
		he,
		ge,
		C
	]), v(() => {
		let e = U.current;
		if (!(!ye || !e)) return f.registerHighFrequencyConsumer(_e, {
			topic: ye,
			lane: "video",
			mode: "all",
			onMessageBatch: (t) => {
				for (let n of t) {
					let t = c(n.message);
					t && e.postMessage({
						type: "overlay",
						overlay: t
					});
				}
			}
		}), () => {
			f.unregisterHighFrequencyConsumer(_e), e.postMessage({
				type: "overlay",
				overlay: null
			});
		};
	}, [
		_e,
		f,
		ye
	]), v(() => {
		let e = V.current;
		if (e?.clearFrames(), !e || !$) return;
		let t = se(f, $, (t) => e.addFrame(t));
		return () => {
			t(), e.clearFrames();
		};
	}, [f, $]), v(() => {
		let e = V.current;
		if (e?.setCalibration(null), !(!e || !be)) return f.registerHighFrequencyConsumer(ve, {
			topic: be,
			lane: "pointcloud",
			mode: "latest",
			onLatestMessage: (t) => {
				let n = d(t.message);
				n && e.setCalibration(n);
			}
		}), () => {
			f.unregisterHighFrequencyConsumer(ve), e.setCalibration(null);
		};
	}, [
		ve,
		f,
		be
	]), v(() => f.subscribeCurrentTime((e) => {
		U.current?.postMessage({
			type: "playback",
			currentTime: e,
			isPlaying: u
		});
		let t = g(e), n = fe.current;
		if (n !== t && (q.current += 1), n != null && t + 5000000n < n) {
			let n = q.current, r = U.current, i = V.current;
			i?.clearFrames();
			let a = r && C && !Y.current ? C : null;
			r && C && Y.current ? (r.postMessage({
				type: "reset",
				preserveFrame: !0
			}), ie(f, r, C, e)) : r?.postMessage({ type: "reset" });
			let s = /* @__PURE__ */ new Set();
			a && s.add(a), i && $ && s.add($), s.size > 0 && f.getMessagesInTimeRange && f.getMessagesInTimeRange({
				start: _(e, -2e3),
				end: e,
				topics: [...s]
			}).then((e) => {
				if (q.current !== n || i && V.current !== i) return;
				let s;
				for (let n of e) if (a && n.topic === a && g(n.receiveTime) <= t && (!s || g(n.receiveTime) > g(s.receiveTime)) && (s = n), i && n.topic === $) {
					let e = o(n.message, g(n.publishTime));
					e && i.addFrame(e);
				}
				r && s && W(r, s);
			});
		}
		fe.current = t;
	}), [
		u,
		f,
		$,
		C
	]), v(() => {
		let e = U.current;
		e && e.postMessage({
			type: "rawDecodeOptions",
			options: le({
				colorMode: P,
				colorMap: F,
				gradient: re,
				flatColor: I,
				explicitAlpha: ae,
				minValue: L,
				maxValue: R
			})
		});
	}, [
		P,
		F,
		re,
		I,
		ae,
		L,
		R
	]), v(() => {
		let e = {
			backgroundColor: E,
			flipHorizontal: k,
			flipVertical: A,
			rotationDeg: M,
			smoothing: N,
			fitMode: O
		};
		pe.current = e, V.current?.setOptions(e), U.current?.postMessage({
			type: "renderOptions",
			options: e
		});
	}, [
		E,
		k,
		A,
		M,
		N,
		O
	]);
	let xe = ue(X);
	return /* @__PURE__ */ S("div", {
		className: "flex flex-col h-full overflow-hidden relative",
		style: { background: E },
		"data-testid": "image-panel",
		"data-h264-pressure": Z?.pressureMode,
		"data-h264-queue-frames": Z?.queueFrames,
		"data-h264-dropped-frames": Z?.droppedFrames,
		"data-h264-decode-queue": Z?.decodeQueueSize,
		"data-h264-media-lag-ms": Z?.mediaLagMs,
		"data-h264-resync-count": Z?.resyncCount,
		"data-h264-rendered-frames": Z?.renderedFrames,
		children: [/* @__PURE__ */ x(i, {
			className: "border-zinc-800 bg-zinc-950",
			children: /* @__PURE__ */ x(r, {
				value: C,
				onChange: (e) => h((t) => ee(e, t)),
				typeIncludes: [...l],
				placeholder: s({ id: "panels.framework.topicPicker.imagePlaceholder" }),
				className: "min-w-0 flex-1",
				triggerClassName: "border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50"
			})
		}), /* @__PURE__ */ S("div", {
			ref: H,
			className: "flex-1 relative min-h-0 min-w-0 flex items-center justify-center",
			children: [
				/* @__PURE__ */ x("canvas", {
					ref: z,
					className: "w-full h-full block",
					"data-testid": "image-panel-canvas"
				}),
				/* @__PURE__ */ x("canvas", {
					ref: B,
					className: "absolute inset-0 z-[1] h-full w-full pointer-events-none",
					"data-testid": "image-panel-scene-mesh-overlay"
				}),
				D && xe && /* @__PURE__ */ x("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 italic text-xs",
					children: xe
				}),
				D && X.phase === "ready" && X.width && X.height && /* @__PURE__ */ S("div", {
					className: "absolute bottom-0 left-0 right-0 px-2 py-1 text-white/30 text-[10px] font-mono truncate pointer-events-none",
					"data-testid": "image-panel-status",
					children: [
						X.width,
						"x",
						X.height,
						" ",
						X.encoding ?? ""
					]
				})
			]
		})]
	});
};
function ue(e) {
	return e.phase === "idle" ? "Waiting for image data" : e.phase === "error" ? e.message ?? "Image decode failed" : e.phase === "decoding" && !e.width && !e.height ? "Decoding latest frame..." : null;
}
function de(e, t) {
	return e.phase === t.phase && e.width === t.width && e.height === t.height && e.encoding === t.encoding && e.message === t.message;
}
function W(e, t) {
	let n = A(t, { transferOwnership: !0 });
	n && e.postMessage({
		type: "frame",
		frame: n.frame
	}, n.transfer);
}
//#endregion
export { U as ImagePanel };
