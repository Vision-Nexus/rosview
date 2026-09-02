import { f as e, i as t, t as n } from "./rafScheduler-BAifbkGY.js";
import { t as r } from "./TopicQuickPicker-C_vPX9PS.js";
import { t as i } from "./PanelTopicBar-B3NXTKuF.js";
import { _ as a, c as o, d as s, g as c, h as l, l as u, m as d, n as f, o as p, p as m, r as h, v as g, y as _ } from "./imageAnnotations-DXWYifIU.js";
import { a as ee, o as v, t as y } from "./time-BoEDgjoH.js";
import { useEffect as b, useRef as x, useState as S } from "react";
import { jsx as C, jsxs as te } from "react/jsx-runtime";
//#region src/features/panels/Image/core/messageFrameAdapter.ts
function w(e, t = {}) {
	let n = e.message;
	if (u(n)) {
		let r = m(n.data, t);
		return r ? {
			frame: {
				kind: "compressed",
				receiveTime: e.receiveTime,
				publishTime: e.publishTime,
				format: o(n),
				data: r.data
			},
			transfer: r.transfer
		} : null;
	}
	if (s(n)) {
		let r = m(n.data, t);
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
function T(e) {
	let t = e.message;
	return u(t) ? g(o(t)) : null;
}
function ne(e) {
	return T(e) !== null;
}
function E(e) {
	let t = e.message;
	return u(t) && g(t.format) ? t.data : null;
}
//#endregion
//#region src/features/panels/Image/core/frameAnnotationPairer.ts
function D(e) {
	let t = v(e.receiveTime), n = f(e.message, t);
	return n ? {
		...n,
		timestampNs: t
	} : null;
}
var O = 120, k = 67108864, A = 512, re = class {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = null;
	#r = null;
	#i = 0;
	#a = 0;
	#o = 0;
	#s = null;
	#c;
	#l;
	#u;
	constructor(e = O, t = k, n = A) {
		if (!Number.isInteger(e) || e < 1) throw Error("maxPendingFrames must be a positive integer");
		if (!Number.isInteger(t) || t < 1) throw Error("maxPendingBytes must be a positive integer");
		if (!Number.isInteger(n) || n < 1) throw Error("maxPendingAnnotations must be a positive integer");
		this.#c = e, this.#l = t, this.#u = n;
	}
	pushFrame(e) {
		let t = v(e.receiveTime);
		if (this.#r === null || t > this.#r) {
			this.#r = t;
			for (let e of this.#e.keys()) e < t && this.#e.delete(e);
		}
		if (this.#s !== null && t <= this.#s) return this.#o += 1, [];
		if (this.#e.has(t)) return [{
			frame: e,
			annotation: this.#e.get(t) ?? null
		}];
		if (this.#n !== null && t <= this.#n) return [{
			frame: e,
			annotation: null
		}];
		let n = this.#t.get(t) ?? [], r = ie(e);
		return n.push(r), this.#t.set(t, n), this.#i += 1, this.#a += j(r), this.#p(), [];
	}
	pushAnnotation(e) {
		let t = v(e.receiveTime), n = D(e);
		return this.#e.set(t, n), (this.#n === null || t > this.#n) && (this.#n = t), this.#m(), [...this.#d(t, n), ...this.#f()].sort(M);
	}
	get pendingFrameCount() {
		return this.#i;
	}
	get pendingFrameBytes() {
		return this.#a;
	}
	get droppedFrameCount() {
		return this.#o;
	}
	pendingRange() {
		let e = null, t = null;
		for (let n of this.#t.keys()) (e === null || n < e) && (e = n), (t === null || n > t) && (t = n);
		return e === null || t === null ? null : {
			startNs: e,
			endNs: t
		};
	}
	confirmThrough(e) {
		return (this.#n === null || e > this.#n) && (this.#n = e), this.#f();
	}
	#d(e, t) {
		let n = this.#t.get(e);
		return n ? (this.#t.delete(e), this.#i -= n.length, this.#a -= n.reduce((e, t) => e + j(t), 0), n.map((e) => ({
			frame: e,
			annotation: t
		}))) : [];
	}
	reset() {
		this.#e.clear(), this.#t.clear(), this.#n = null, this.#r = null, this.#i = 0, this.#a = 0, this.#o = 0, this.#s = null;
	}
	#f() {
		let e = this.#n;
		if (e === null) return [];
		let t = [];
		for (let [n, r] of this.#t) if (!(n > e)) {
			this.#t.delete(n), this.#i -= r.length, this.#a -= r.reduce((e, t) => e + j(t), 0);
			for (let e of r) t.push({
				frame: e,
				annotation: null
			});
		}
		return t.sort(M);
	}
	#p() {
		for (; this.#i > this.#c || this.#a > this.#l;) {
			let e = this.#t.entries().next().value;
			if (!e) return;
			let [t, n] = e, r = n.shift();
			if (!r) {
				this.#t.delete(t);
				continue;
			}
			--this.#i, this.#a -= j(r), this.#o += 1, n.length === 0 && this.#t.delete(t);
		}
	}
	#m() {
		for (; this.#e.size > this.#u;) {
			let e = this.#e.keys().next().value;
			if (e === void 0) return;
			this.#e.delete(e);
			let t = this.#t.get(e);
			t && (this.#t.delete(e), this.#i -= t.length, this.#a -= t.reduce((e, t) => e + j(t), 0), this.#o += t.length), (this.#s === null || e > this.#s) && (this.#s = e);
		}
	}
};
function ie(e) {
	let t = e.message;
	if (typeof t != "object" || !t || !("data" in t)) return e;
	let n = t.data;
	if (!(n instanceof Uint8Array) || n.buffer instanceof ArrayBuffer && n.byteOffset === 0 && n.byteLength === n.buffer.byteLength) return e;
	let r = new Uint8Array(n.byteLength);
	return r.set(n), {
		...e,
		message: {
			...t,
			data: r
		}
	};
}
function j(e) {
	let t = e.message;
	if (typeof t != "object" || !t || !("data" in t)) return 0;
	let n = t.data;
	return ArrayBuffer.isView(n) || n instanceof ArrayBuffer ? n.byteLength : 0;
}
function M(e, t) {
	let n = v(e.frame.receiveTime) - v(t.frame.receiveTime);
	return n < 0n ? -1 : +(n > 0n);
}
//#endregion
//#region src/features/panels/Image/core/videoQueue.ts
function ae(e, t, n = [], r = !1) {
	let i = oe(e, t);
	if (i < 0) return {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	if (i === 0) return r ? {
		frames: _(e, t[0].data) ? [...t] : [...n, ...t],
		droppedFrames: 0,
		resync: !0
	} : {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	let o = a(e, t[i].data), s = e === "h264" ? o.includes(7) : o.includes(32) || o.includes(33), c = s ? [] : se(e, t, i), l = [...s || c.length > 0 ? c : [...n], ...t.slice(i)], u = i - c.length;
	return u === 0 ? {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	} : {
		frames: l,
		droppedFrames: u,
		resync: !0
	};
}
function oe(e, t) {
	for (let n = t.length - 1; n >= 0; --n) if (l(e, t[n].data)) return n;
	return -1;
}
function se(e, t, n) {
	let r = -1;
	for (let i = n - 1; i >= 0; --i) {
		let n = t[i];
		if (!c(e, n.data)) continue;
		let o = a(e, n.data);
		if (e === "h264" && o.includes(7)) {
			r = i;
			break;
		}
		if (e === "h265" && o.includes(32)) {
			r = i;
			break;
		}
		e === "h265" && r < 0 && o.includes(33) && (r = i);
	}
	return r < 0 ? [] : t.slice(r, n).filter((t) => c(e, t.data));
}
//#endregion
//#region src/features/panels/Image/core/videoSeekRepair.ts
var ce = [
	2e3,
	5e3,
	1e4,
	3e4
], le = 2e3;
function N(e, t) {
	let n = v(e.receiveTime) - v(t.receiveTime);
	return n < 0n ? -1 : +(n > 0n);
}
function P(e) {
	return [...e].sort(N);
}
function F(e, t) {
	let n;
	for (let r of e) {
		let e = T(r);
		!e || t && e !== t || (!n || v(r.receiveTime) > v(n)) && (n = r.receiveTime);
	}
	return n;
}
function I(e, t) {
	for (let n of P(e)) {
		if (T(n) !== t) continue;
		let e = E(n);
		if (e && l(t, e)) return n.receiveTime;
	}
}
function L(e, t) {
	return e.some((e) => e.kind === "compressed" && g(e.format) === t && l(t, e.data));
}
function R(e, t, n) {
	let r = v(t), i = P(e.filter((e) => T(e) === n && v(e.receiveTime) <= r)).flatMap((e) => {
		let t = E(e);
		return t ? [{
			event: e,
			data: t
		}] : [];
	});
	return i.some(({ data: e }) => l(n, e)) ? B(n, ae(n, i).frames).map(({ event: e }) => e) : [];
}
function z(e, t, n, r = {}) {
	let i = R(e, t, n);
	if (i.length > 0) return i;
	let a = I(e, n);
	if (!a) return [];
	let o = [
		r.coverageEndTime ?? t,
		t,
		a
	].map(v).reduce((e, t) => t > e ? t : e);
	return R(e, {
		sec: Number(o / 1000000000n),
		nsec: Number(o % 1000000000n)
	}, n);
}
function B(e, t) {
	let n = t.findIndex(({ data: t }) => l(e, t));
	return n < 0 || n >= 180 ? [] : t.slice(0, 180);
}
function V(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => {
		let n = E(e), r = 2166136261;
		if (n) for (let e of n) r = Math.imul(r ^ e, 16777619) >>> 0;
		let i = `${e.receiveTime.sec}:${e.receiveTime.nsec}:${e.publishTime.sec}:${e.publishTime.nsec}:${n?.byteLength ?? 0}:${r}`;
		return !t.has(i) && (t.add(i), !0);
	});
}
function H(e, t, n) {
	let r = [], i = [];
	for (let a of e) {
		let e = w(a, { transferOwnership: t });
		e && (n && (e.frame.annotation = n.get(v(a.receiveTime)) ?? null), r.push(e.frame), i.push(...e.transfer));
	}
	return {
		frames: r,
		transfer: i
	};
}
async function U(e, t, n, r = {}) {
	if (!e.getMessagesInTimeRange || r.signal?.aborted) return null;
	let i = r.coverageEndTime ?? n, a = y(i, le), o = r.annotationTopic ? [t, r.annotationTopic] : [t];
	for (let s of ce) {
		let c = await e.getMessagesInTimeRange({
			start: y(n, -s),
			end: a,
			topics: o
		});
		if (r.signal?.aborted) return null;
		let l = c.filter((e) => e.topic === t), u = r.codec ?? l.map(T).find(Boolean) ?? null;
		if (!u) continue;
		let d = z(l, n, u, { coverageEndTime: i });
		if (d.length !== 0) return {
			codec: u,
			events: d,
			annotationsByFrameKey: r.annotationTopic ? new Map(c.filter((e) => e.topic === r.annotationTopic).map((e) => [v(e.receiveTime), D(e)])) : void 0
		};
	}
	return null;
}
async function ue(e) {
	let { player: t, worker: n, topic: r, targetTime: i, liveEvents: a = [], signal: o, preserveFrame: s = !1, transferOwnership: c = !1 } = e;
	if (o?.aborted) return !1;
	let l = [...a], u = e.codec ?? l.map(T).find(Boolean) ?? void 0, d = await U(t, r, i, {
		signal: o,
		coverageEndTime: F(l, u) ?? i,
		codec: u,
		annotationTopic: e.annotationTopic
	});
	if (!d || o?.aborted) return !1;
	let f = H(V(P([...d.events, ...l.filter((e) => T(e) === d.codec)])), c, d.annotationsByFrameKey);
	return L(f.frames, d.codec) ? (e.annotationTopic && f.frames.at(-1)?.annotation === null && e.onAnnotationGap?.(), n.postMessage({
		type: "bootstrapVideo",
		codec: d.codec,
		frames: f.frames,
		preserveFrame: s
	}, f.transfer), !0) : !1;
}
//#endregion
//#region src/features/panels/Image/core/ImageRender.worker.ts?worker&inline
var W = "function e(e,t,n){let r=e+t-n,i=Math.abs(r-e),a=Math.abs(r-t),o=Math.abs(r-n);return i<=a&&i<=o?e:a<=o?t:n}function t(e,t,n){for(let r=0;r<n;r++)t[r]=e[r]}function n(e,t,n,r){let i=0;for(;i<r;i++)t[i]=e[i];for(;i<n;i++)t[i]=e[i]+t[i-r]&255}function r(e,t,n,r){if(n.length===0){for(let n=0;n<r;n++)t[n]=e[n];return}for(let i=0;i<r;i++)t[i]=e[i]+n[i]&255}function i(e,t,n,r,i){let a=0;if(n.length===0){for(;a<i;a++)t[a]=e[a];for(;a<r;a++)t[a]=e[a]+(t[a-i]>>1)&255;return}for(;a<i;a++)t[a]=e[a]+(n[a]>>1)&255;for(;a<r;a++)t[a]=e[a]+(t[a-i]+n[a]>>1)&255}function a(t,n,r,i,a){let o=0;if(r.length===0){for(;o<a;o++)n[o]=t[o];for(;o<i;o++)n[o]=t[o]+n[o-a]&255;return}for(;o<a;o++)n[o]=t[o]+r[o]&255;for(;o<i;o++)n[o]=t[o]+e(n[o-a],r[o],r[o-a])&255}function o(e,o,s){let c=o*2,l=s*(1+c);if(e.byteLength!==l)throw Error(`PNG inflated length ${e.byteLength} !== expected ${l}`);let u=new Uint8Array(s*c),d=new Uint8Array,f=0;for(let o=0;o<s;o++){let s=e[f++],l=e.subarray(f,f+c);f+=c;let p=u.subarray(o*c,(o+1)*c);switch(s){case 0:t(l,p,c);break;case 1:n(l,p,c,2);break;case 2:r(l,p,d,c);break;case 3:i(l,p,d,c,2);break;case 4:a(l,p,d,c,2);break;default:throw Error(`Unsupported PNG filter type: ${s}`)}d=p}for(let e=0;e<u.length;e+=2){let t=u[e];u[e]=u[e+1],u[e+1]=t}return u}const s=new Uint8Array([137,80,78,71,13,10,26,10]);function c(e){let t=Math.max(0,e.byteLength-s.byteLength);for(let n=0;n<=t;n++){let t=!0;for(let r=0;r<s.byteLength;r++)if(e[n+r]!==s[r]){t=!1;break}if(t)return n}return-1}function l(e,t){return e.getUint32(t,!1)}function u(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=[],r=s.byteLength;for(;r+8<=e.byteLength;){let i=l(t,r),a=String.fromCharCode(e[r+4],e[r+5],e[r+6],e[r+7]),o=r+8,s=o+i;if(s+4>e.byteLength)throw Error(`PNG chunk exceeds buffer bounds`);if(a===`IDAT`&&n.push(e.subarray(o,s)),a===`IEND`)break;r=s+4}if(n.length===0)throw Error(`PNG is missing IDAT chunks`);let i=n.reduce((e,t)=>e+t.byteLength,0),a=new Uint8Array(i),o=0;for(let e of n)a.set(e,o),o+=e.byteLength;return a}async function d(e){if(typeof DecompressionStream>`u`)throw Error(`DecompressionStream is not supported in this environment`);let t=new Uint8Array(e.byteLength);t.set(e);let n=new Blob([t.buffer]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(n).arrayBuffer())}function f(e){if(e.byteLength<s.byteLength+8+13)throw Error(`PNG buffer is too small`);for(let t=0;t<s.byteLength;t++)if(e[t]!==s[t])throw Error(`Invalid PNG signature`);let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=l(t,s.byteLength);if(String.fromCharCode(e[s.byteLength+4],e[s.byteLength+5],e[s.byteLength+6],e[s.byteLength+7])!==`IHDR`||n!==13)throw Error(`PNG is missing IHDR chunk`);let r=s.byteLength+8;return{width:l(t,r),height:l(t,r+4),bitDepth:e[r+8],colorType:e[r+9]}}async function p(e){let{width:t,height:n,bitDepth:r,colorType:i}=f(e);if(t<=0||n<=0)throw Error(`Invalid PNG dimensions: ${t}x${n}`);if(r!==16||i!==0)throw Error(`Compressed depth PNG must be 16-bit grayscale (got depth=${r}, colorType=${i})`);return{width:t,height:n,data:o(await d(u(e)),t,n)}}function m(e){let t=[],n=0;for(;n<e.byteLength-2;){let r=ee(e,n);if(r<0)break;let i=r+(e[r+2]===1?3:4);i<e.byteLength&&t.push(i),n=i+1}return t.length===0?e.byteLength>0?[{offset:0,end:e.byteLength}]:[]:t.map((n,r)=>({offset:n,end:r+1<t.length?g(e,t[r+1]):e.byteLength}))}function h(e){let t=new Uint8Array(e.byteLength),n=0,r=0;for(let i of e){if(r>=2&&i===3){r=0;continue}t[n]=i,n+=1,r=i===0?r+1:0}return t.subarray(0,n)}function g(e,t){return t>=4&&e[t-4]===0&&e[t-3]===0&&e[t-2]===0&&e[t-1]===1?t-4:t-3}function ee(e,t){for(let n=t;n<e.byteLength-2;n+=1)if(e[n]===0&&e[n+1]===0&&(e[n+2]===1||n+3<e.byteLength&&e[n+2]===0&&e[n+3]===1))return n;return-1}function te(e){return re(e)?`key`:`delta`}function ne(e){return _(e).includes(5)}function re(e){for(let t of _(e))if(t===5||t===7||t===8)return!0;return!1}function ie(e){for(let{offset:t}of m(e)){if((e[t]&31)!=7||t+3>=e.byteLength)continue;let n=e[t+1],r=e[t+2],i=e[t+3];return`avc1.${v(n)}${v(r)}${v(i)}`}return null}function ae(e){let t=ie(e),n=[t,t?`avc1.${t.slice(5,7)}00${t.slice(-2)}`:null,`avc1.42E01E`,`avc1.4D4020`,`avc1.640028`];return[...new Set(n.filter(e=>e!=null))]}function _(e){return m(e).map(({offset:t})=>e[t]&31)}function v(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function y(e){return m(e).flatMap(({offset:t})=>t+1<e.byteLength?[e[t]>>1&63]:[])}function b(e){return y(e).some(e=>e===19||e===20||e===21)}function x(e){return y(e).some(e=>e===32||e===33||e===34)}function oe(e){return y(e).some(e=>e<=31)}function se(e){return b(e)||x(e)?`key`:`delta`}function ce(e){for(let t of m(e)){if(t.offset+1>=t.end||(e[t.offset]>>1&63)!=33)continue;let n=h(e.subarray(t.offset+2,t.end));if(n.byteLength<13)continue;let r=n[1],i=ue(r>>6),a=r&32?`H`:`L`,o=r&31,s=de((n[2]<<24|n[3]<<16|n[4]<<8|n[5])>>>0),c=n[12],l=[...n.subarray(6,12)];for(;l.at(-1)===0;)l.pop();let u=l.length?`.${l.map(fe).join(``)}`:``;return`${i}${o}.${s.toString(16).toUpperCase()}.${a}${c}${u}`}return null}function le(e){let t=[ce(e),`1.6.L93.B0`,`1.6.L120.B0`,`1.6.L123.B0`,`1.6.L150.B0`].flatMap(e=>e?[`hev1.${e}`,`hvc1.${e}`]:[]);return[...new Set(t)]}function ue(e){return[``,`A`,`B`,`C`][e&3]??``}function de(e){let t=e>>>0,n=0;for(let e=0;e<32;e+=1)n=(n<<1|t&1)>>>0,t>>>=1;return n}function fe(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function S(e){let t=e.trim().toLowerCase();return/\\b(?:h264|avc)\\b/.test(t)?`h264`:/\\b(?:h265|hevc)\\b/.test(t)?`h265`:null}function C(e,t){return e===`h264`?_(t):y(t)}function w(e,t){return e===`h264`?ne(t):b(t)}function pe(e,t){return e===`h264`?_(t).some(e=>e===7||e===8):x(t)}function me(e,t){return e===`h264`?_(t).some(e=>e===1||e===5):oe(t)}function he(e,t){return e===`h264`?te(t):se(t)}function ge(e,t){return e===`h264`?ae(t):le(t)}function _e(e,t){return e===`h264`?ie(t):ce(t)}function ve(e,t){let n=C(e,t);return e===`h264`?n.includes(7):n.includes(32)||n.includes(33)}function T(e,t){return pe(e,t)&&!me(e,t)}function ye(e,t){let n=Number(e/1000n);return Math.max(n,t+1)}const be=/\\b(jpeg|jpg|png|webp|gif|avif|bmp)\\b/i,xe=new Set([`16uc1`,`32fc1`,`mono16`,`mono8`,`8uc1`,`rgb8`,`bgr8`,`rgba8`,`bgra8`,`8uc3`]);function Se(e){return e.trim().toLowerCase()}function Ce(e){let t=Se(e);return t===`16uc1`||t===`mono16`?`16uc1`:t===`32fc1`?`32fc1`:null}function we(e){let t=e.trim().toLowerCase();if(t.includes(`compresseddepth`))return/\\brvl\\b/.test(t)?`rvl`:`png`}function E(e){let t=e.trim(),n=t.split(`;`).map(e=>e.trim()).filter(Boolean),r=n[0]?Se(n[0]):void 0,i=n.length>1?n.slice(1).join(`;`).trim():void 0;return{rawEncoding:r,transport:i,depthCodec:i?we(i):void 0,bitmapKind:O(t)}}function D(e){let t=E(e);return t.depthCodec!=null&&Ce(t.rawEncoding??``)!=null}function Te(e){return D(e)?Ce(E(e).rawEncoding??``):null}function O(e){let t=S(e);if(t)return t;let n=e.match(be);if(!n||!n[1])return null;let r=n[1].toLowerCase();return r===`jpg`||r===`jpeg`?`jpeg`:r===`png`||r===`webp`||r===`gif`||r===`avif`||r===`bmp`?r:null}function k(e){return e.byteLength>=3&&e[0]===255&&e[1]===216&&e[2]===255?`image/jpeg`:e.byteLength>=8&&e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71&&e[4]===13&&e[5]===10&&e[6]===26&&e[7]===10?`image/png`:e.byteLength>=12&&e[0]===82&&e[1]===73&&e[2]===70&&e[3]===70&&e[8]===87&&e[9]===69&&e[10]===66&&e[11]===80?`image/webp`:null}function Ee(e,t){if(D(e))throw Error(`Compressed depth format must not use bitmap MIME routing: ${e}`);let n=O(e);if(n===`jpeg`)return`image/jpeg`;if(n===`png`||n===`webp`||n===`gif`||n===`avif`||n===`bmp`)return`image/${n}`;let r=e.split(`;`)[0]?.trim().split(/\\s+/)[0]?.toLowerCase();if(!r)return t?k(t)??`image/jpeg`:`image/jpeg`;if(r.startsWith(`image/`))return r;if(r===`jpg`)return`image/jpeg`;if(xe.has(r)){let n=t?k(t):null;if(n)return n;throw Error(`Unsupported compressed image format token: ${e}`)}return t?k(t)??`image/jpeg`:`image/jpeg`}function De(e){return c(e)}function Oe(e,t){if(t<4)return{compressionFormat:0,depthParam:[0,0]};let n=new DataView(e.buffer,e.byteOffset,e.byteLength);return{compressionFormat:n.getInt32(0,!0),depthParam:[n.getFloat32(4,!0),n.getFloat32(8,!0)]}}async function ke(e){let t=De(e);if(t<0)throw Error(`Compressed depth payload does not contain a PNG signature`);let n=await p(e.subarray(t));return{width:n.width,height:n.height,data:n.data}}async function Ae(e){let{width:t,height:n,data:r}=await ke(e);return{encoding:`16uc1`,width:t,height:n,step:t*2,isBigEndian:!1,data:r}}async function je(e,t){let{width:n,height:r,data:i}=await ke(e),[a,o]=t.depthParam,s=new Uint8Array(n*r*4),c=new DataView(s.buffer,s.byteOffset,s.byteLength),l=new DataView(i.buffer,i.byteOffset,i.byteLength);for(let e=0;e<n*r;e++){let t=l.getUint16(e*2,!0),n=0;t!==0&&(n=a/(t-o),Number.isFinite(n)||(n=0)),c.setFloat32(e*4,n,!0)}return{encoding:`32fc1`,width:n,height:r,step:n*4,isBigEndian:!1,data:s}}async function Me(e,t){if(!D(t))throw Error(`Not a compressed depth format: ${t}`);if(E(t).depthCodec===`rvl`)throw Error(`RVL compressed depth is not supported yet`);let n=Te(t);if(!n)throw Error(`Unsupported compressed depth encoding in format: ${t}`);let r=De(e);if(r<0)throw Error(`Compressed depth payload is missing PNG data`);if(r<12&&e.byteLength<12)throw Error(`Compressed depth payload is too small`);let i=Oe(e,r);return n===`16uc1`?Ae(e):je(e,i)}const A={colorMode:`colormap`,flatColor:`#ffffff`,gradient:[`#000000`,`#ffffff`],colorMap:`turbo`,explicitAlpha:1};function j(e,t,n){return Math.max(t,Math.min(n,e))}const Ne={r:0,g:0,b:0,a:0},Pe={r:0,g:0,b:0,a:0};function M(e,t){let n=t.trim(),r=n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(r){let t=r[1];return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e.r=parseInt(t.slice(0,2),16)/255,e.g=parseInt(t.slice(2,4),16)/255,e.b=parseInt(t.slice(4,6),16)/255,e.a=1,e}let i=n.match(/^rgba?\\(\\s*([0-9.]+)\\s*,\\s*([0-9.]+)\\s*,\\s*([0-9.]+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)$/i);return i?(e.r=Number(i[1])/255,e.g=Number(i[2])/255,e.b=Number(i[3])/255,e.a=i[4]==null?1:Number(i[4]),e):(e.r=e.g=e.b=e.a=1,e)}function Fe(e,t,n,r){let i=j(r,0,1);e.r=t.r+(n.r-t.r)*i,e.g=t.g+(n.g-t.g)*i,e.b=t.b+(n.b-t.b)*i,e.a=t.a+(n.a-t.a)*i}function Ie(e,t){let n=(1-j(t,0,1))*5+1,r=Math.floor(n),i=n%1;r%2<1&&(i=1-i);let a=1-i;r<=1?(e.r=a,e.g=0,e.b=1):r===2?(e.r=0,e.g=a,e.b=1):r===3?(e.r=0,e.g=1,e.b=a):r===4?(e.r=a,e.g=1,e.b=0):(e.r=1,e.g=a,e.b=0),e.a=1}const N=[.13572138,4.6153926,-42.66032258,132.13108234],P=[.09140261,2.19418839,4.84296658,-14.18503333],F=[.1066733,12.64194608,-60.58204836,110.36276771],Le=[-152.94239396,59.28637943],Re=[4.27729857,2.82956604],ze=[-89.90310912,27.34824973];function Be(e,t){let n=j(t,0,1)*.99+.01,r=n*n,i=r*n,a=1*N[0]+n*N[1]+r*N[2]+i*N[3],o=1*P[0]+n*P[1]+r*P[2]+i*P[3],s=1*F[0]+n*F[1]+r*F[2]+i*F[3],c=r*r,l=i*r,u=c*Le[0]+l*Le[1],d=c*Re[0]+l*Re[1],f=c*ze[0]+l*ze[1];e.r=j(a+u,0,1),e.g=j(o+d,0,1),e.b=j(s+f,0,1),e.a=1}const Ve=65535;let I;function He(e,t){if(!I){I=new Float32Array(Ve*3);let e={r:0,g:0,b:0,a:0};for(let t=0;t<Ve;t++){Be(e,t/65534);let n=t*3;I[n+0]=e.r,I[n+1]=e.g,I[n+2]=e.b}}let n=Math.trunc(t*65534)*3;e.r=I[n+0],e.g=I[n+1],e.b=I[n+2],e.a=1}function Ue(e,t){let n=t>>>0;e.a=((n&4278190080)>>>24)/255,e.r=((n&16711680)>>>16)/255,e.g=((n&65280)>>>8)/255,e.b=((n&255)>>>0)/255}function L(e,t,n){let r=e.colorMode;if(r===`rgba-fields`)throw Error(`rgba-fields color mode is not supported for scalar depth images`);switch(r){case`flat`:{let t=M(Ne,e.flatColor);return e=>{e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}}case`gradient`:{let r=Math.max(n-t,2**-52),i=M(Ne,e.gradient[0]),a=M(Pe,e.gradient[1]);return(e,n)=>{let o=Math.max(0,Math.min((n-t)/r,1));Fe(e,i,a,o)}}case`colormap`:{let r=Math.max(n-t,2**-52);return e.colorMap===`turbo`?(n,i)=>{He(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}:(n,i)=>{Ie(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}}case`rgb`:return(t,n)=>{Ue(t,n),t.a=e.explicitAlpha};case`rgba`:return(e,t)=>{Ue(e,t)};default:throw Error(`Unsupported color mode: ${String(r)}`)}}const We=1e4,Ge=/depth|aligned_depth|compressed_depth/i,Ke=/wrist|hand|left|right|gripper|eef|end_effector/;function qe(e){return e.trim().toLowerCase()}function Je(e){let t=qe(e);return t===`16uc1`||t===`mono16`}function Ye(e){return qe(e)===`32fc1`}function Xe(e){return Ge.test(e)}function Ze(e){let t=e.trim().toLowerCase();if(!t)return null;let n=Xe(t),r=!n&&Ke.test(t),i={colorMode:`colormap`,colorMap:`turbo`};return n?{...i,minValue:200,maxValue:We}:r?{...i,minValue:0,maxValue:1e3}:null}function Qe(e,t){let n=t?Ze(t):null;return n?n.minValue:Je(e)?200:0}function $e(e,t){let n=t?Ze(t):null;return n?n.maxValue:Ye(e)?1:Je(e)?We:65535}function et(e,t,n){return{minValue:t?.minValue??Qe(e,n),maxValue:t?.maxValue??$e(e,n)}}function tt(e,t,n,r,i,a){a[i]=e+Math.trunc(1403*r/1e3),a[i+1]=e-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+2]=e+Math.trunc(1770*t/1e3),a[i+3]=255,a[i+4]=n+Math.trunc(1403*r/1e3),a[i+5]=n-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+6]=n+Math.trunc(1770*t/1e3),a[i+7]=255}function nt(e,t,n,r,i){if(r<t*2)throw Error(`UYVY image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t]-128,s=e[t+1],c=e[t+2]-128,l=e[t+3];tt(s,o,l,c,a,i),a+=8}}}function rt(e,t,n,r,i){if(r<t*2)throw Error(`YUYV image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t],s=e[t+1]-128,c=e[t+2];tt(o,s,c,e[t+3]-128,a,i),a+=8}}}function it(e,t,n,r,i){if(r<t*3)throw Error(`RGB8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=255}}}function at(e,t,n,r,i){if(r<t*4)throw Error(`RGBA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=e[t+3]}}}function ot(e,t,n,r,i){if(r<t*4)throw Error(`BGRA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=e[t+3]}}}function st(e,t,n,r,i){if(r<t*3)throw Error(`BGR8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=255}}}function ct(e,t,n,r,i,a,o){if(r<t*4)throw Error(`Float image row step (${r}) must be at least 4*width (${t*4})`);let{minValue:s,maxValue:c}=et(`32fc1`,o),l;try{l=L(o,s,c)}catch{l=L({...A,colorMode:`gradient`},s,c)}let u={r:0,g:0,b:0,a:0},d=new DataView(e.buffer,e.byteOffset,e.byteLength),f=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=d.getFloat32(n+e*4,!i);l(u,t),a[f++]=Math.round(R(u.r)*255),a[f++]=Math.round(R(u.g)*255),a[f++]=Math.round(R(u.b)*255),a[f++]=Math.round(R(u.a)*255)}}}function R(e){return Math.max(0,Math.min(1,e))}function lt(e,t,n,r,i){if(r<t)throw Error(`Mono8 image row step (${r}) must be at least width (${t})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=e[n+r];i[a++]=t,i[a++]=t,i[a++]=t,i[a++]=255}}}function ut(e,t,n,r,i,a,o,s){if(r<t*2)throw Error(`Mono16 image row step (${r}) must be at least 2*width (${t*2})`);let{minValue:c,maxValue:l}=et(s,o),u;try{u=L(o,c,l)}catch{u=L({...A,colorMode:`gradient`},c,l)}let d={r:0,g:0,b:0,a:0},f=new DataView(e.buffer,e.byteOffset,e.byteLength),p=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=f.getUint16(n+e*2,!i);u(d,t),a[p++]=Math.round(R(d.r)*255),a[p++]=Math.round(R(d.g)*255),a[p++]=Math.round(R(d.b)*255),a[p++]=Math.round(R(d.a)*255)}}}function z(e,t,n,r){return Function(`data`,`width`,`height`,`step`,`output`,`\n      if (step < width) {\n        throw new Error(\\`Bayer image row step (\\${step}) must be at least width (\\${width})\\`);\n      }\n      for (let i = 0; i < height / 2; i++) {\n        let inIdx = i * 2 * step;\n        let outTopIdx = i * 2 * width * 4;\n        let outBottomIdx = (i * 2 + 1) * width * 4;\n        for (let j = 0; j < width / 2; j++) {\n          const tl = data[inIdx++];\n          const tr = data[inIdx++];\n          const bl = data[inIdx + step - 2];\n          const br = data[inIdx + step - 1];\n\n          const ${e} = tl;\n          const ${t} = tr;\n          const ${n} = bl;\n          const ${r} = br;\n\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n        }\n      }\n    `)}const dt=z(`r`,`g0`,`g1`,`b`),ft=z(`b`,`g0`,`g1`,`r`),pt=z(`g0`,`b`,`r`,`g1`),mt=z(`g0`,`r`,`b`,`g1`);function ht(e){return e.trim().toLowerCase()}function gt(e,t,n){let r=e.width,i=e.height,a=e.step??_t(e),o=e.is_bigendian??!1,s=ht(e.encoding),c=e.data,l={...A,...n};switch(s){case`rgb8`:it(c,r,i,a,t);return;case`rgba8`:at(c,r,i,a,t);return;case`bgra8`:ot(c,r,i,a,t);return;case`bgr8`:case`8uc3`:st(c,r,i,a,t);return;case`mono8`:case`8uc1`:lt(c,r,i,a,t);return;case`mono16`:case`16uc1`:ut(c,r,i,a,o,t,l,s);return;case`32fc1`:ct(c,r,i,a,o,t,l);return;case`uyvy`:case`yuv422`:nt(c,r,i,a,t);return;case`yuyv`:case`yuv422_yuy2`:rt(c,r,i,a,t);return;case`bayer_rggb8`:dt(c,r,i,a,t);return;case`bayer_bggr8`:ft(c,r,i,a,t);return;case`bayer_gbrg8`:pt(c,r,i,a,t);return;case`bayer_grbg8`:mt(c,r,i,a,t);return;default:throw Error(`Unsupported image encoding: ${e.encoding}`)}}function _t(e){switch(ht(e.encoding)){case`rgb8`:case`bgr8`:case`8uc3`:return e.width*3;case`rgba8`:case`bgra8`:case`32fc1`:return e.width*4;case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return e.width*2;case`mono16`:case`16uc1`:return e.width*2;case`mono8`:case`8uc1`:case`bayer_rggb8`:case`bayer_bggr8`:case`bayer_gbrg8`:case`bayer_grbg8`:return e.width;default:return e.width*4}}const B={frames:72,spanMs:350,decodeMs:55,decodeQueueSize:8,mediaLagMs:350},V={frames:18,spanMs:120,decodeMs:32,decodeQueueSize:1,mediaLagMs:120},H={frames:40,spanMs:250,decodeMs:45,decodeQueueSize:6,mediaLagMs:250};function vt(){return{mode:`normal`,healthySamples:0}}function yt(e,t){return e>120||t>1e3}function bt(e,t){let n=t.queueFrames>=B.frames||t.queueSpanMs>=B.spanMs||t.decodeMs>=B.decodeMs||t.decodeQueueSize>=B.decodeQueueSize||t.mediaLagMs>=B.mediaLagMs,r=t.queueFrames<=V.frames&&t.queueSpanMs<=V.spanMs&&t.decodeMs<=V.decodeMs&&t.decodeQueueSize<=V.decodeQueueSize&&t.mediaLagMs<=V.mediaLagMs,i=t.queueFrames>=H.frames||t.queueSpanMs>=H.spanMs||t.decodeMs>=H.decodeMs||t.decodeQueueSize>=H.decodeQueueSize||t.mediaLagMs>=H.mediaLagMs;if(e.mode===`normal`)return n?{mode:`degraded`,healthySamples:0}:e;if(e.mode===`degraded`)return r?{mode:`recovery`,healthySamples:1}:e;if(i)return{mode:`degraded`,healthySamples:0};if(!r)return{mode:`recovery`,healthySamples:0};let a=e.healthySamples+1;return a>=12?{mode:`normal`,healthySamples:0}:{mode:`recovery`,healthySamples:a}}function xt(e,t){return!Number.isFinite(t)||t<0?e:e===0?t:e*.8+t*.2}function U(e,t){return e==null?0:Math.max(0,Number(e-t)/1e6)}function St(e,t,n=120){return U(e,t)>n}function Ct(e,t,n){return e&&t!==null&&n<t}function wt(e,t){return t?{frames:[],droppedFrames:e.length,waitForRandomAccess:!0}:{frames:[...e],droppedFrames:0,waitForRandomAccess:!1}}function Tt(e,t,n){if(!T(e,n.data))return[...t];if(e===`h264`||C(e,n.data).includes(32))return ve(e,n.data)?[n]:[...t,n];if(C(e,n.data).includes(33)){let r=[...t].reverse().find(t=>C(e,t.data).includes(32));return r?[r,n]:[n]}return[...t,n]}function Et(e,t,n=[],r=!1){let i=Dt(e,t);if(i<0)return{frames:[...t],droppedFrames:0,resync:!1};if(i===0)return r?{frames:ve(e,t[0].data)?[...t]:[...n,...t],droppedFrames:0,resync:!0}:{frames:[...t],droppedFrames:0,resync:!1};let a=C(e,t[i].data),o=e===`h264`?a.includes(7):a.includes(32)||a.includes(33),s=o?[]:Ot(e,t,i),c=[...o||s.length>0?s:[...n],...t.slice(i)],l=i-s.length;return l===0?{frames:[...t],droppedFrames:0,resync:!1}:{frames:c,droppedFrames:l,resync:!0}}function Dt(e,t){for(let n=t.length-1;n>=0;--n)if(w(e,t[n].data))return n;return-1}function Ot(e,t,n){let r=-1;for(let i=n-1;i>=0;--i){let n=t[i];if(!T(e,n.data))continue;let a=C(e,n.data);if(e===`h264`&&a.includes(7)){r=i;break}if(e===`h265`&&a.includes(32)){r=i;break}e===`h265`&&r<0&&a.includes(33)&&(r=i)}return r<0?[]:t.slice(r,n).filter(t=>T(e,t.data))}function kt(e,t,n,r){let i=!1,a=null;return new Promise((o,s)=>{a=setTimeout(()=>{i=!0,a=null,s(Error(n))},t),e.then(e=>{if(a!=null&&(clearTimeout(a),a=null),i){r?.(e);return}o(e)},e=>{a!=null&&(clearTimeout(a),a=null),i||s(e instanceof Error?e:Error(String(e)))})})}function At(e,t){e.lineCap=`round`,e.lineJoin=`round`;for(let n of t.points)jt(e,n)}function jt(e,t){let{points:n}=t;if(n.length!==0)switch(e.lineWidth=Math.max(1,t.thickness),e.strokeStyle=W(t.outlineColor),e.fillStyle=W(t.fillColor),t.kind){case`points`:for(let r=0;r<n.length;r+=1){let i=n[r];e.strokeStyle=W(t.outlineColors[r]??t.outlineColor),e.beginPath(),e.arc(i.x,i.y,Math.max(1,t.thickness/2),0,Math.PI*2),e.fill(),e.stroke()}return;case`line-loop`:case`line-strip`:e.beginPath(),e.moveTo(n[0].x,n[0].y);for(let t of n.slice(1))e.lineTo(t.x,t.y);t.kind===`line-loop`&&(e.closePath(),t.fillColor.a>0&&e.fill()),e.stroke();return;case`line-list`:for(let t=0;t+1<n.length;t+=2)e.beginPath(),e.moveTo(n[t].x,n[t].y),e.lineTo(n[t+1].x,n[t+1].y),e.stroke()}}function W(e){return`rgba(${Math.round(Math.max(0,Math.min(1,e.r))*255)}, ${Math.round(Math.max(0,Math.min(1,e.g))*255)}, ${Math.round(Math.max(0,Math.min(1,e.b))*255)}, ${Math.max(0,Math.min(1,e.a))})`}function G(e,t,n){return t!==n&&(e.close(),!0)}const Mt={backgroundColor:`#000000`,flipHorizontal:!1,flipVertical:!1,rotationDeg:0,smoothing:!0,fitMode:`contain`};function K(e){return(e%360+360)%360}function Nt(e,t,n){let r=K(n)*Math.PI/180,i=Math.abs(Math.cos(r)),a=Math.abs(Math.sin(r));return{w:e*i+t*a,h:e*a+t*i}}const Pt={cssWidth:0,cssHeight:0,devicePixelRatio:1},Ft=5e3;var It=class{#e=null;#t=-1;#n=null;#r=null;#i=null;#a=0;#o=new Map;#s;constructor(e){this.#s=e}dispose(){this.reset(),this.#t=-1}reset(){this.#a+=1,this.#e&&this.#e.state!==`closed`&&this.#e.close(),this.#e=null,this.#n=null,this.#r=null,this.#i=null,this.#o.clear()}get codec(){return this.#n??void 0}get decodeQueueSize(){return this.#e?.state===`configured`?this.#e.decodeQueueSize:0}async submitFrame(e,t,n){if(typeof VideoDecoder>`u`)throw Error(`WebCodecs VideoDecoder is not supported`);let r=e.kind===`compressed`?S(e.format):null;if(!r)throw Error(`Compressed frame does not declare H.264 or H.265`);let i=_e(r,t);this.#e&&this.#e.state!==`closed`&&(this.#i!==null&&r!==this.#i||i&&i!==this.#r)&&this.reset();let a=this.#a;if(!await this.#c(r,t,i,a))return;let o=this.#e,s=ye(n,this.#t);this.#t=s,me(r,t)&&this.#o.set(s,{frame:e,startedAt:performance.now(),generation:a});try{o.decode(new EncodedVideoChunk({type:he(r,t),timestamp:s,data:t}))}catch(e){throw this.#o.delete(s),e}}async#c(e,t,n,r){if(this.#e&&this.#e.state!==`closed`)return!0;let i=null;for(let n of ge(e,t)){let e=[{codec:n,hardwareAcceleration:`prefer-hardware`,optimizeForLatency:!0},{codec:n,hardwareAcceleration:`no-preference`,optimizeForLatency:!0}];for(let t of e)try{let e=await VideoDecoder.isConfigSupported(t);if(r!==this.#a)return!1;if(e.supported){i=e.config??t;break}}catch{}if(i)break}if(!i)throw Error(`${e===`h264`?`H.264`:`H.265`} codec ${n??`fallback candidates`} is not supported`);this.#e=new VideoDecoder({output:e=>{let t=this.#o.get(e.timestamp);if(this.#o.delete(e.timestamp),!t||t.generation!==this.#a){e.close();return}this.#s.output({videoFrame:e,sourceFrame:t.frame,decodeMs:performance.now()-t.startedAt})},error:e=>this.#s.error(Error(String(e)))}),this.#e.addEventListener(`dequeue`,this.#s.dequeue);try{this.#e.configure(i),this.#n=i.codec,this.#r=n,this.#i=e}catch(e){throw this.#e.close(),this.#e=null,this.#n=null,this.#i=null,e}return!0}},Lt=class{#e=null;#t=null;#n=new OffscreenCanvas(1,1);#r=this.#n.getContext(`2d`,{alpha:!1});#i={...Mt};#a={...Pt};#o={};#s=null;#c=[];#l=!1;#u;#d=null;#f=null;#p=`idle`;#m=!1;#h=null;#g=null;#_=new Map;#v=null;#y=null;#b=vt();#x=0;#S=!1;#C=[];#w=[];#T=!1;#E=-1/0;#D=-1/0;#O=0;#k=0;#A=0;#j=-1/0;#M=null;#N=null;#P=null;#F=!1;#I=-1/0;#L=0;constructor(){if(!this.#r)throw Error(`Buffer canvas context is unavailable in worker`);this.#u=new It({output:e=>this.#K(e),error:e=>this.#Y(e),dequeue:()=>{this.#Q(),this.#W()}})}handle(e){switch(e.type){case`init`:if(this.#e=e.canvas,this.#t=e.canvas.getContext(`2d`,{alpha:!1,desynchronized:!0}),!this.#t)throw Error(`Canvas 2D context is unavailable in worker`);this.#fe(),this.#me(),this.#ce({phase:`idle`});return;case`viewport`:this.#a=e.viewport,this.#fe(),this.#re();return;case`renderOptions`:this.#i=e.options,this.#re();return;case`rawDecodeOptions`:this.#o=e.options,this.#ne();return;case`playback`:this.#M=Z(e.currentTime),this.#F=e.isPlaying,this.#Q(),this.#V(),this.#ee();return;case`frame`:if(this.#m)return;this.#B(e.frame),this.#l||this.#W();return;case`bootstrapVideo`:this.#R(e.codec,e.frames,e.preserveFrame===!0);return;case`reset`:this.#L+=1,this.#s=null,this.#c=[],this.#Z(),this.#m=!1,this.#$(),this.#u.reset(),this.#se(),e.preserveFrame||(this.#ae(),this.#v=null,this.#me(),this.#ce({phase:`idle`}));return;case`dispose`:this.#L+=1,this.#s=null,this.#c=[],this.#Z(),this.#m=!1,this.#u.dispose(),this.#se(),this.#ae(),this.#v=null,self.close();return}}#R(e,t,n){this.#L+=1,this.#s=null,this.#c=[],this.#Z(),this.#m=!1,this.#y=e,this.#$(),this.#u.reset(),n||(this.#ae(),this.#v=null,this.#me(),this.#ce({phase:`idle`}));let r=t.filter(t=>J(t)===e).slice(0,180);if(r.length===0||!r.some(t=>w(e,t.data))){this.#S=!0,this.#ee(!0);return}for(let e of r)this.#z(e,{applyBackpressure:!1});this.#ee(!0),this.#l||this.#W()}#z(e,t={}){let n=J(e);if(n){if(this.#y!==n&&(this.#y=n,this.#c=[],this.#w=[],this.#C=[],this.#S=!0,this.#X()),this.#w=Tt(n,this.#w,e),this.#S&&!w(n,e.data)){if(T(n,e.data)){this.#C=Tt(n,this.#C,e);return}this.#O+=1,t.applyBackpressure!==!1&&this.#ee();return}w(n,e.data)&&(this.#S=!1,this.#C.length>0&&(this.#c.push(...this.#C),this.#C=[])),this.#c.push(e),t.applyBackpressure!==!1&&(this.#Q(),this.#V(),this.#ee())}}#B(e){if(!Y(e)){this.#s=e;return}this.#z(e)}#V(){let e=X(this.#c),t=yt(this.#c.length,e),n=this.#b.mode===`degraded`&&(this.#c.length>36||e>250);if(!t&&!n)return;let r=this.#y;if(!r)return;let i=Et(r,this.#c,this.#w),a=t||performance.now()-this.#j>=200;if(i.resync&&a&&(this.#c=i.frames,this.#X(),this.#O+=i.droppedFrames),yt(this.#c.length,X(this.#c))){this.#H();return}i.resync}#H(){let e=wt(this.#c,!0);this.#O+=e.droppedFrames,this.#c=e.frames,this.#S=!0,this.#C=[...this.#w],this.#X(),this.#Q(),this.#ee(!0)}#U(){let e=this.#c.shift();if(e)return e;let t=this.#s;return this.#s=null,t}async#W(){if(this.#l)return;this.#l=!0;let e=this.#L;try{let t;for(;!(this.#c.length>0&&this.#u.decodeQueueSize>=4||(t=this.#U(),!t)||e!==this.#L);)if(Y(t)&&this.#T&&(this.#X(),this.#T=!1),await this.#G(t,e),this.#m){this.#s=null,this.#c=[];break}}finally{this.#l=!1,(this.#s||this.#c.length>0&&this.#u.decodeQueueSize<4)&&this.#W()}}async#G(e,t){this.#ce({phase:`decoding`,receiveTime:e.receiveTime});try{if(e.kind===`compressed`){let n=q(e.data);if(n.byteLength===0)throw Error(`Compressed image payload is empty: ${e.format}`);if(D(e.format)){let r=await Me(n,e.format);if(t!==this.#L)return;this.#te({receiveTime:e.receiveTime,encoding:r.encoding,width:r.width,height:r.height,step:r.step,isBigEndian:r.isBigEndian,data:q(r.data),annotation:e.annotation});return}let r=O(e.format),i=Z(e.receiveTime);if(r===`h264`||r===`h265`){if(await this.#u.submitFrame(e,n,i),t!==this.#L)return;this.#Q(),this.#ee();return}let a=await kt(this.#oe(n,e.format),Ft,`Compressed image decode timed out: ${e.format}`,Q);if(G(a,t,this.#L))return;let o=`displayWidth`in a?a.displayWidth:a.width,s=`displayHeight`in a?a.displayHeight:a.height,c;if(Ht(a))c=a;else{try{c=await kt(createImageBitmap(a),Ft,`Compressed image bitmap creation timed out: ${e.format}`,Vt)}finally{Q(a)}if(G(c,t,this.#L))return}this.#ie(c,o,s,e.format,e.receiveTime,e.annotation),this.#ue(c,o,s,e.receiveTime,e.annotation),this.#ce({phase:`ready`,width:o,height:s,encoding:e.format,receiveTime:e.receiveTime});return}let n=q(e.data);this.#te({receiveTime:e.receiveTime,encoding:e.encoding,width:e.width,height:e.height,step:e.step??e.width*Rt(e.encoding),isBigEndian:e.isBigEndian??!1,data:n,annotation:e.annotation})}catch(n){if(t!==this.#L)return;if(Y(e)){this.#O+=1,this.#Y(n instanceof Error?n:Error(String(n)));return}this.#m=!0,this.#ce({phase:`error`,message:n instanceof Error?n.message:String(n)})}}#K(e){let t=Z(e.sourceFrame.receiveTime);if(this.#N=t,this.#x=xt(this.#x,e.decodeMs),this.#F&&St(this.#M,t)){e.videoFrame.close(),this.#O+=1,this.#Q(),this.#ee();return}this.#d&&(this.#d.videoFrame.close(),this.#O+=1),this.#d={videoFrame:e.videoFrame,sourceFrame:e.sourceFrame},this.#q(),this.#Q(),this.#ee()}#q(){if(this.#f!=null||!this.#d)return;let e=this.#b.mode===`normal`?16.666666666666668:33.333333333333336,t=Math.max(0,e-(performance.now()-this.#E));if(t<=0){this.#J();return}this.#f=setTimeout(()=>{this.#f=null,this.#J()},t)}async#J(){let e=this.#d;if(this.#d=null,!e)return;let{videoFrame:t,sourceFrame:n}=e,r=this.#L,i=performance.now();try{let e=Z(n.receiveTime);if(this.#F&&St(this.#M,e)){this.#O+=1;return}let a=t.displayWidth||t.codedWidth,o=t.displayHeight||t.codedHeight;if(!this.#de(t,a,o,n.receiveTime,n.annotation)){this.#O+=1;return}if(this.#E=i,this.#k+=1,this.#ce({phase:`ready`,width:a,height:o,encoding:n.kind===`compressed`?n.format:this.#y??`h264`,receiveTime:n.receiveTime}),this.#b.mode===`normal`&&i-this.#D>=500)try{let e=await createImageBitmap(t);if(G(e,r,this.#L))return;this.#ie(e,a,o,n.kind===`compressed`?n.format:this.#y??`h264`,n.receiveTime,n.annotation),this.#D=i}catch{}}finally{t.close(),this.#ee(),this.#d&&this.#q()}}#Y(e){this.#X();let t=this.#y,n=t?Et(t,this.#c,this.#w,!0):{frames:[],droppedFrames:this.#c.length,resync:!1};n.resync?(this.#c=n.frames,this.#S=!1,this.#O+=n.droppedFrames,this.#W()):(this.#O+=this.#c.length,this.#c=[],this.#S=!0,this.#C=[...this.#w]),this.#k===0&&!this.#v&&this.#ce({phase:`error`,message:e.message}),this.#ee(!0)}#X(){this.#u.reset(),this.#Z(),this.#T=!1,this.#A+=1,this.#j=performance.now()}#Z(){this.#f!=null&&(clearTimeout(this.#f),this.#f=null),this.#d?.videoFrame.close(),this.#d=null}#Q(){let e=this.#b.mode,t=!this.#F||this.#N==null?0:U(this.#M,this.#N);this.#b=bt(this.#b,{queueFrames:this.#c.length,queueSpanMs:X(this.#c),decodeMs:this.#x,decodeQueueSize:this.#u.decodeQueueSize,mediaLagMs:t}),e!==this.#b.mode&&this.#ee(!0)}#$(){this.#b=vt(),this.#x=0,this.#S=!0,this.#C=[...this.#w],this.#T=!1,this.#E=-1/0,this.#D=-1/0,this.#O=0,this.#k=0,this.#A=0,this.#j=-1/0,this.#N=null,this.#P=null,this.#I=-1/0}#ee(e=!1){let t=performance.now();if(!e&&t-this.#I<1e3)return;this.#I=t;let n=this.#N==null?0:U(this.#M,this.#N),r={pressureMode:this.#b.mode,queueFrames:this.#c.length,queueSpanMs:X(this.#c),decodeMs:this.#x,droppedFrames:this.#O,renderedFrames:this.#k,decodeQueueSize:this.#u.decodeQueueSize,mediaLagMs:n,resyncCount:this.#A,codec:this.#u.codec};$.postMessage({type:`metrics`,metrics:r})}#te(e){let t=e.width*e.height*4,n=this.#h;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#h=n),(!this.#g||this.#g.width!==e.width||this.#g.height!==e.height)&&(this.#g=new ImageData(n,e.width,e.height)),gt({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#ae(),this.#v={kind:`raw`,width:e.width,height:e.height,encoding:e.encoding,step:e.step,isBigEndian:e.isBigEndian,data:e.data,receiveTime:e.receiveTime,annotation:e.annotation},this.#le(e.width,e.height,e.receiveTime,e.annotation),this.#ce({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}#ne(){let e=this.#v;if(!e||e.kind!==`raw`)return;let t=e.width*e.height*4,n=this.#h;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#h=n),(!this.#g||this.#g.width!==e.width||this.#g.height!==e.height)&&(this.#g=new ImageData(n,e.width,e.height));try{gt({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#le(e.width,e.height,e.receiveTime,e.annotation),this.#ce({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}catch{}}#re(){let e=this.#v;if(!e){this.#me();return}e.kind===`raw`?(this.#le(e.width,e.height,e.receiveTime,e.annotation),this.#ce({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})):(this.#ue(e.bitmap,e.width,e.height,e.receiveTime,e.annotation),this.#ce({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime}))}#ie(e,t,n,r,i,a){this.#ae(),this.#v={kind:`bitmap`,width:t,height:n,encoding:r,bitmap:e,receiveTime:i,annotation:a}}#ae(){this.#v?.kind===`bitmap`&&this.#v.bitmap.close()}async#oe(e,t){let n=Ee(t,e);if(typeof ImageDecoder<`u`){let t=this.#_.get(n);if(t===void 0&&(t=await ImageDecoder.isTypeSupported(n),this.#_.set(n,t)),t){let t=new ImageDecoder({type:n,data:e});try{let{image:e}=await t.decode({frameIndex:0});return e}finally{t.close()}}}return createImageBitmap(new Blob([e],{type:n}))}#se(){this.#_.clear(),this.#h=null,this.#g=null}#ce(e){if(e.phase===`decoding`&&this.#p!==`idle`&&this.#p!==`error`)return;this.#p=e.phase;let t={type:`status`,status:e};$.postMessage(t)}#le(e,t,n,r){zt(this.#n,e,t),this.#r.putImageData(this.#g,0,0),this.#de(this.#n,e,t,n,r)}#ue(e,t,n,r,i){this.#de(e,t,n,r,i)}#de(e,t,n,r,i){let a=Z(r);if(Ct(this.#F,this.#P,a))return!1;this.#fe();let o=this.#t,s=this.#e;if(!o||!s)return!1;let c=this.#a.cssWidth||s.width/Math.max(1,this.#a.devicePixelRatio)||1,l=this.#a.cssHeight||s.height/Math.max(1,this.#a.devicePixelRatio)||1,u=K(this.#i.rotationDeg),{w:d,h:f}=Nt(t,n,u),p=this.#i.fitMode===`contain`?Math.min(c/d,l/f):Math.max(c/d,l/f),m=Math.max(1,t*p),h=Math.max(1,n*p);o.save();let g=this.#pe();return o.setTransform(g,0,0,g,0,0),o.clearRect(0,0,c,l),o.fillStyle=this.#i.backgroundColor,o.fillRect(0,0,c,l),o.imageSmoothingEnabled=this.#i.smoothing,o.imageSmoothingQuality=this.#i.smoothing&&this.#b.mode===`normal`?`high`:`low`,o.translate(c/2,l/2),o.rotate(u*Math.PI/180),o.scale(this.#i.flipHorizontal?-1:1,this.#i.flipVertical?-1:1),o.drawImage(e,-m/2,-h/2,m,h),i&&(o.translate(-m/2,-h/2),o.scale(p,p),At(o,i)),o.restore(),this.#P=a,$.postMessage({type:`rendered`,timestampNs:a,width:t,height:n,annotationState:i===void 0?`disabled`:i===null?`gap`:`matched`}),!0}#fe(){if(!this.#e)return;let e=this.#pe(),t=Math.max(1,Math.round(Math.max(0,this.#a.cssWidth)*e)),n=Math.max(1,Math.round(Math.max(0,this.#a.cssHeight)*e));this.#e.width!==t&&(this.#e.width=t),this.#e.height!==n&&(this.#e.height=n)}#pe(){let e=Math.max(1,this.#a.devicePixelRatio);return this.#b.mode===`normal`?e:Math.min(e,1)}#me(){!this.#t||!this.#e||(this.#t.save(),this.#t.setTransform(1,0,0,1,0,0),this.#t.clearRect(0,0,this.#e.width,this.#e.height),this.#t.fillStyle=this.#i.backgroundColor,this.#t.fillRect(0,0,this.#e.width,this.#e.height),this.#t.restore())}};function Rt(e){switch(e.trim().toLowerCase()){case`rgb8`:case`bgr8`:case`8uc3`:return 3;case`rgba8`:case`bgra8`:case`32fc1`:return 4;case`mono16`:case`16uc1`:case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return 2;default:return 1}}function zt(e,t,n){e.width!==t&&(e.width=t),e.height!==n&&(e.height=n)}function Bt(e){let t=new Uint8Array(new ArrayBuffer(e.byteLength));return t.set(e),t}function q(e){return e.buffer instanceof ArrayBuffer&&e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e:Bt(e)}function J(e){return e.kind===`compressed`?S(e.format):null}function Y(e){return J(e)!==null}function X(e){if(e.length<2)return 0;let t=e.find(e=>{let t=J(e);return!t||!T(t,e.data)}),n=e.findLast(e=>{let t=J(e);return!t||!T(t,e.data)});if(!t||!n)return 0;let r=Z(n.receiveTime)-Z(t.receiveTime);return Math.max(0,Number(r)/1e6)}function Z(e){return BigInt(e.sec)*1000000000n+BigInt(e.nsec)}function Q(e){e.close()}function Vt(e){e.close()}function Ht(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap}const Ut=new Lt,$=self;$.onmessage=e=>{Ut.handle(e.data)};", G = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", W], { type: "text/javascript;charset=utf-8" });
function de(e) {
	let t;
	try {
		if (t = G && (self.URL || self.webkitURL).createObjectURL(G), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(W), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/features/panels/Image/ImagePanel.tsx
function fe(e) {
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
var K = (a) => {
	let { formatMessage: o } = e(), s = t((e) => e.playerState.activeData?.isPlaying ?? !1), { player: c, panelId: l, setConfig: u, topic: f, annotationTopic: m, annotationVisible: g, backgroundColor: _, showStatusText: y, fitMode: w, flipHorizontal: E, flipVertical: D, rotation: O, smoothing: k, colorMode: A, colorMap: ie, gradient: j, flatColor: M, explicitAlpha: ae, minValue: oe, maxValue: se } = a, ce = x(null), le = x(null), N = x(null), P = x(null), F = x(null), I = x({ phase: "idle" }), L = x(null), R = x(!1), z = x(!1), B = x(0), V = x([]), H = x("latest"), U = x(null), W = x(null), G = x(null), [K, he] = S({ phase: "idle" }), [J, ge] = S(null), [_e, Y] = S(!1), [ve, X] = S(!1), Z = x(null), [ye, be] = S("disabled"), Q = `${l}:image-main`, xe = `${l}:image-annotations`, $ = g ? m.trim() : "", Se = t((e) => e.playerState.activeData?.topics.find((e) => e.name === f)?.type ?? "");
	b(() => {
		let e = ce.current, t = le.current;
		if (!e || !t) return;
		if (typeof e.transferControlToOffscreen != "function") {
			let e = {
				phase: "error",
				message: o({ id: "panels.image.error.offscreenUnsupported" })
			};
			I.current = e, he(e);
			return;
		}
		P.current != null && (window.clearTimeout(P.current), P.current = null), N.current && F.current && F.current !== e && (N.current.postMessage({ type: "dispose" }), N.current.terminate(), N.current = null, F.current = null);
		let r = N.current;
		if (!r) {
			r = new de(), N.current = r;
			let t = e.transferControlToOffscreen();
			F.current = e, r.postMessage({
				type: "init",
				canvas: t
			}, [t]);
		}
		r.onmessage = (e) => {
			let t = e.data;
			if (t.type === "metrics") {
				ge(t.metrics);
				return;
			}
			if (t.type === "rendered") {
				be(t.annotationState), t.annotationState === "gap" && Y(!0);
				return;
			}
			if (t.type !== "status") return;
			let n = t.status;
			me(I.current, n) || (I.current = n, he(n));
		};
		let i = -1, a = -1, s = -1, c = null, l = () => {
			let e = t.getBoundingClientRect(), n = window.devicePixelRatio || 1, o = e.width, c = e.height;
			(o !== i || c !== a || n !== s) && (i = o, a = c, s = n, r.postMessage({
				type: "viewport",
				viewport: {
					cssWidth: o,
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
			c?.(), c = null, window.removeEventListener("resize", u), d.disconnect(), P.current = window.setTimeout(() => {
				let e = N.current;
				e && (e.postMessage({ type: "dispose" }), e.terminate(), N.current = null, F.current = null, I.current = { phase: "idle" }, he({ phase: "idle" }), ge(null), P.current = null);
			}, 0);
		};
	}, [o]), b(() => {
		if (!f) return;
		let e = N.current;
		if (!e) return;
		R.current = !1, z.current = !1, B.current += 1, V.current = [], H.current = "latest";
		let t = $ ? new re() : null, n = !0, r, i, a = !1, o = !1, s = 0;
		U.current = t, Y(!1), X(!1), be("disabled"), ge(null), e.postMessage({ type: "reset" });
		let l = (n) => {
			n.some((e) => e.annotation === null) && Y(!0);
			for (let t of n) q(e, t.frame, t.annotation);
			X((t?.pendingFrameCount ?? 0) > 0), u();
		};
		function u() {
			let e = t, d = c.getMessagesInTimeRange?.bind(c), f = e?.pendingRange();
			if (!e || !d || !f || r !== void 0 || a || o) return;
			let p = f.startNs, m = s;
			r = window.setTimeout(() => {
				if (r = void 0, !n || m !== s || a) return;
				let t = e?.pendingRange();
				if (!t || t.startNs !== p) {
					u();
					return;
				}
				a = !0;
				let c = new AbortController();
				i = c, d({
					start: ee(t.startNs),
					end: ee(t.endNs),
					topics: [$]
				}).then((r) => {
					if (!(!n || c.signal.aborted || m !== s)) {
						for (let t of r) l(e.pushAnnotation(t));
						l(e.confirmThrough(t.endNs));
					}
				}).catch((e) => {
					!c.signal.aborted && m === s && (o = !0, console.warn("ImagePanel: exceptional annotation gap read failed", e));
				}).finally(() => {
					m === s && (i === c && (i = void 0), a = !1, n && !o && u());
				});
			}, 250);
		}
		Z.current = () => {
			s += 1, r !== void 0 && (window.clearTimeout(r), r = void 0), i?.abort(), i = void 0, a = !1, o = !1;
		}, W.current = l;
		let p = (n) => {
			if (z.current) {
				V.current.push(n);
				return;
			}
			t ? l(t.pushFrame(n)) : q(e, n);
		}, m = (t) => {
			for (let n of t) ne(n) ? p(n) : q(e, n);
		};
		t && c.registerHighFrequencyConsumer(xe, {
			topic: $,
			lane: "video",
			mode: "all",
			onMessageBatch: (e) => {
				for (let n of e) l(t.pushAnnotation(n));
			}
		}), d(Se) && (R.current = !0, H.current = "all");
		let h = async (n, r) => {
			if (!n) return !1;
			let i = B.current + 1;
			B.current = i;
			let a = [...V.current];
			z.current = !0, $ && X(!0), L.current?.abort();
			let o = new AbortController();
			L.current = o;
			try {
				let s = await ue({
					player: c,
					worker: e,
					topic: f,
					targetTime: n,
					codec: a.map(T).find(Boolean) ?? void 0,
					liveEvents: a,
					signal: o.signal,
					preserveFrame: r,
					annotationTopic: $ || void 0,
					onAnnotationGap: () => Y(!0)
				});
				if (o.signal.aborted || i !== B.current) return !1;
				if (!s) return X(!1), !1;
				let u = v(n), d = V.current.slice(a.length).filter((e) => v(e.receiveTime) > u);
				V.current = [], X(!1);
				for (let n of d) t ? l(t.pushFrame(n)) : q(e, n);
				return !0;
			} finally {
				i === B.current && L.current === o && (z.current = !1, L.current = null);
			}
		};
		G.current = h;
		let g = async (e) => {
			if (R.current) {
				e && p(e);
				return;
			}
			R.current = !0, e && V.current.push(e), H.current !== "all" && (H.current = "all", c.unregisterHighFrequencyConsumer(Q), c.registerHighFrequencyConsumer(Q, {
				topic: f,
				lane: "video",
				mode: "all",
				onMessageBatch: m
			}));
			let t = c.getCurrentTime();
			t && await h(t, !1);
		}, _ = (e) => {
			if (ne(e)) {
				if (!R.current) {
					g(e);
					return;
				}
				p(e);
				return;
			}
			p(e);
		};
		if (H.current === "all") {
			c.registerHighFrequencyConsumer(Q, {
				topic: f,
				lane: "video",
				mode: "all",
				onMessageBatch: m
			});
			let e = c.getCurrentTime();
			e && h(e, !1);
		} else c.registerHighFrequencyConsumer(Q, {
			topic: f,
			lane: "video",
			mode: "latest",
			onLatestMessage: _,
			onMessageBatch: (e) => {
				if (R.current) return;
				let t = e.at(-1);
				t && _(t);
			}
		});
		return () => {
			n = !1, Z.current?.(), Z.current = null, B.current += 1, L.current?.abort(), L.current = null, V.current = [], z.current = !1, U.current = null, W.current = null, G.current = null, c.unregisterHighFrequencyConsumer(Q), t && c.unregisterHighFrequencyConsumer(xe), e.postMessage({ type: "reset" });
		};
	}, [
		xe,
		Q,
		c,
		$,
		f,
		Se
	]), b(() => () => {
		L.current?.abort(), L.current = null;
	}, [c, f]), b(() => c.subscribeSeek((e) => {
		U.current?.reset(), V.current = [], Y(!1), X($.length > 0), Z.current?.();
		let t = N.current;
		t && f && R.current ? G.current?.(e, !0) : t?.postMessage({
			type: "reset",
			preserveFrame: !0
		});
	}), [
		c,
		$,
		f
	]), b(() => c.subscribeCurrentTime((e) => {
		N.current?.postMessage({
			type: "playback",
			currentTime: e,
			isPlaying: s
		});
	}), [s, c]), b(() => {
		let e = N.current;
		e && e.postMessage({
			type: "rawDecodeOptions",
			options: fe({
				colorMode: A,
				colorMap: ie,
				gradient: j,
				flatColor: M,
				explicitAlpha: ae,
				minValue: oe,
				maxValue: se
			})
		});
	}, [
		A,
		ie,
		j,
		M,
		ae,
		oe,
		se
	]), b(() => {
		let e = {
			backgroundColor: _,
			flipHorizontal: E,
			flipVertical: D,
			rotationDeg: O,
			smoothing: k,
			fitMode: w
		};
		N.current?.postMessage({
			type: "renderOptions",
			options: e
		});
	}, [
		_,
		E,
		D,
		O,
		k,
		w
	]);
	let Ce = pe(K);
	return /* @__PURE__ */ te("div", {
		className: "flex flex-col h-full overflow-hidden relative",
		style: { background: _ },
		"data-testid": "image-panel",
		"data-video-codec": J?.codec,
		"data-video-pressure": J?.pressureMode,
		"data-video-queue-frames": J?.queueFrames,
		"data-video-dropped-frames": J?.droppedFrames,
		"data-video-decode-queue": J?.decodeQueueSize,
		"data-video-media-lag-ms": J?.mediaLagMs,
		"data-video-resync-count": J?.resyncCount,
		"data-video-rendered-frames": J?.renderedFrames,
		"data-annotation-state": $ && ve ? "buffering" : ye,
		children: [/* @__PURE__ */ C(i, {
			className: "border-zinc-800 bg-zinc-950",
			children: /* @__PURE__ */ C(r, {
				value: f,
				onChange: (e) => u((t) => h(e, t)),
				typeIncludes: [...p],
				placeholder: o({ id: "panels.framework.topicPicker.imagePlaceholder" }),
				className: "min-w-0 flex-1",
				triggerClassName: "border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50"
			})
		}), /* @__PURE__ */ te("div", {
			ref: le,
			className: "flex-1 relative min-h-0 min-w-0 flex items-center justify-center",
			children: [
				/* @__PURE__ */ C("canvas", {
					ref: ce,
					className: "w-full h-full block",
					"data-testid": "image-panel-canvas"
				}),
				y && Ce && /* @__PURE__ */ C("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 italic text-xs",
					children: Ce
				}),
				ve && /* @__PURE__ */ C("div", {
					className: "absolute top-1 left-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-muted-foreground",
					children: o({ id: "panels.image.status.waitingForAnnotation" })
				}),
				_e && /* @__PURE__ */ C("div", {
					className: "absolute top-1 right-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-amber-600",
					"data-testid": "image-annotation-gap-warning",
					children: o({ id: "panels.image.warning.annotationGap" })
				}),
				y && K.phase === "ready" && K.width && K.height && /* @__PURE__ */ te("div", {
					className: "absolute bottom-0 left-0 right-0 px-2 py-1 text-white/30 text-[10px] font-mono truncate pointer-events-none",
					"data-testid": "image-panel-status",
					children: [
						K.width,
						"x",
						K.height,
						" ",
						K.encoding ?? ""
					]
				})
			]
		})]
	});
};
function pe(e) {
	return e.phase === "idle" ? "Waiting for image data" : e.phase === "error" ? e.message ?? "Image decode failed" : e.phase === "decoding" && !e.width && !e.height ? "Decoding latest frame..." : null;
}
function me(e, t) {
	return e.phase === t.phase && e.width === t.width && e.height === t.height && e.encoding === t.encoding && e.message === t.message;
}
function q(e, t, n) {
	let r = w(t, { transferOwnership: !0 });
	r && (r.frame.annotation = n, e.postMessage({
		type: "frame",
		frame: r.frame
	}, r.transfer));
}
//#endregion
export { K as ImagePanel };
