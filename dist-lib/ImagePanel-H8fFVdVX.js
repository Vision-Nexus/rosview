import { f as e, i as t, t as n } from "./rafScheduler-DAI3WzmT.js";
import { t as r } from "./TopicQuickPicker-BVwmE0Mi.js";
import { t as i } from "./PanelTopicBar-raI_BYos.js";
import { _ as a, a as o, b as s, c, d as l, g as u, h as d, i as f, n as p, p as m, u as h, v as g, x as ee, y as _ } from "./asyncTimeout-stQ7dsAY.js";
import { a as te, o as v, t as y } from "./time-BoEDgjoH.js";
import { useEffect as b, useEffectEvent as ne, useRef as x, useState as S } from "react";
import { jsx as C, jsxs as re } from "react/jsx-runtime";
//#region src/features/panels/Image/core/messageFrameAdapter.ts
function w(e, t = {}) {
	let n = e.message;
	if (l(n)) {
		let r = d(n.data, t);
		return r ? {
			frame: {
				kind: "compressed",
				receiveTime: e.receiveTime,
				publishTime: e.publishTime,
				format: h(n),
				data: r.data
			},
			transfer: r.transfer
		} : null;
	}
	if (m(n)) {
		let r = d(n.data, t);
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
	return l(t) ? s(h(t)) : null;
}
function ie(e) {
	return T(e) !== null;
}
function E(e) {
	let t = e.message;
	return l(t) && s(t.format) ? t.data : null;
}
//#endregion
//#region src/features/panels/Image/core/frameAnnotationPairer.ts
function ae(e) {
	let t = v(e.receiveTime), n = f(e.message, t);
	return n ? {
		...n,
		timestampNs: t
	} : null;
}
var oe = 120, se = 67108864, ce = 512, le = class {
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
	constructor(e = oe, t = se, n = ce) {
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
		let n = this.#t.get(t) ?? [], r = ue(e);
		return n.push(r), this.#t.set(t, n), this.#i += 1, this.#a += D(r), this.#p(), [];
	}
	pushAnnotation(e) {
		let t = v(e.receiveTime), n = ae(e);
		return this.#e.set(t, n), (this.#n === null || t > this.#n) && (this.#n = t), this.#m(), [...this.#d(t, n), ...this.#f()].sort(O);
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
		return n ? (this.#t.delete(e), this.#i -= n.length, this.#a -= n.reduce((e, t) => e + D(t), 0), n.map((e) => ({
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
			this.#t.delete(n), this.#i -= r.length, this.#a -= r.reduce((e, t) => e + D(t), 0);
			for (let e of r) t.push({
				frame: e,
				annotation: null
			});
		}
		return t.sort(O);
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
			--this.#i, this.#a -= D(r), this.#o += 1, n.length === 0 && this.#t.delete(t);
		}
	}
	#m() {
		for (; this.#e.size > this.#u;) {
			let e = this.#e.keys().next().value;
			if (e === void 0) return;
			this.#e.delete(e);
			let t = this.#t.get(e);
			t && (this.#t.delete(e), this.#i -= t.length, this.#a -= t.reduce((e, t) => e + D(t), 0), this.#o += t.length), (this.#s === null || e > this.#s) && (this.#s = e);
		}
	}
};
function ue(e) {
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
function D(e) {
	let t = e.message;
	if (typeof t != "object" || !t || !("data" in t)) return 0;
	let n = t.data;
	return ArrayBuffer.isView(n) || n instanceof ArrayBuffer ? n.byteLength : 0;
}
function O(e, t) {
	let n = v(e.frame.receiveTime) - v(t.frame.receiveTime);
	return n < 0n ? -1 : +(n > 0n);
}
//#endregion
//#region src/features/panels/Image/core/videoQueue.ts
function de(e, t, n = [], r = !1) {
	let i = fe(e, t);
	if (i < 0) return {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	if (i === 0) return r ? {
		frames: ee(e, t[0].data) ? [...t] : [...n, ...t],
		droppedFrames: 0,
		resync: !0
	} : {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	let a = _(e, t[i].data), o = e === "h264" ? a.includes(7) : a.includes(32) || a.includes(33), s = o ? [] : pe(e, t, i), c = [...o || s.length > 0 ? s : [...n], ...t.slice(i)], l = i - s.length;
	return l === 0 ? {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	} : {
		frames: c,
		droppedFrames: l,
		resync: !0
	};
}
function fe(e, t) {
	for (let n = t.length - 1; n >= 0; --n) if (a(e, t[n].data)) return n;
	return -1;
}
function pe(e, t, n) {
	let r = -1;
	for (let i = n - 1; i >= 0; --i) {
		let n = t[i];
		if (!g(e, n.data)) continue;
		let a = _(e, n.data);
		if (e === "h264" && a.includes(7)) {
			r = i;
			break;
		}
		if (e === "h265" && a.includes(32)) {
			r = i;
			break;
		}
		e === "h265" && r < 0 && a.includes(33) && (r = i);
	}
	return r < 0 ? [] : t.slice(r, n).filter((t) => g(e, t.data));
}
//#endregion
//#region src/features/panels/Image/core/videoSeekRepair.ts
var me = [
	2e3,
	5e3,
	1e4,
	3e4
], he = 2e3, k = 15e3, A = 5e3;
function j(e, t) {
	let n = v(e.receiveTime) - v(t.receiveTime);
	return n < 0n ? -1 : +(n > 0n);
}
function M(e) {
	return [...e].sort(j);
}
function N(e, t) {
	let n;
	for (let r of e) {
		let e = T(r);
		!e || t && e !== t || (!n || v(r.receiveTime) > v(n)) && (n = r.receiveTime);
	}
	return n;
}
function P(e, t) {
	for (let n of M(e)) {
		if (T(n) !== t) continue;
		let e = E(n);
		if (e && a(t, e)) return n.receiveTime;
	}
}
function F(e, t) {
	return e.some((e) => e.kind === "compressed" && s(e.format) === t && a(t, e.data));
}
function I(e, t, n) {
	let r = v(t), i = M(e.filter((e) => T(e) === n && v(e.receiveTime) <= r)).flatMap((e) => {
		let t = E(e);
		return t ? [{
			event: e,
			data: t
		}] : [];
	});
	return i.some(({ data: e }) => a(n, e)) ? R(n, de(n, i).frames).map(({ event: e }) => e) : [];
}
function L(e, t, n, r = {}) {
	let i = I(e, t, n);
	if (i.length > 0) return i;
	let a = P(e, n);
	if (!a) return [];
	let o = [
		r.coverageEndTime ?? t,
		t,
		a
	].map(v).reduce((e, t) => t > e ? t : e);
	return I(e, {
		sec: Number(o / 1000000000n),
		nsec: Number(o % 1000000000n)
	}, n);
}
function R(e, t) {
	let n = t.findIndex(({ data: t }) => a(e, t));
	return n < 0 || n >= 600 ? [] : t.slice(0, 600);
}
function z(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => {
		let n = E(e), r = 2166136261;
		if (n) for (let e of n) r = Math.imul(r ^ e, 16777619) >>> 0;
		let i = `${e.receiveTime.sec}:${e.receiveTime.nsec}:${e.publishTime.sec}:${e.publishTime.nsec}:${n?.byteLength ?? 0}:${r}`;
		return !t.has(i) && (t.add(i), !0);
	});
}
function B(e, t, n) {
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
async function V(e, t, n, r = {}) {
	if (!e.getMessagesInTimeRange || r.signal?.aborted) return null;
	let i = r.coverageEndTime ?? n, a = y(i, he), o = r.annotationTopic ? [t, r.annotationTopic] : [t], s = Date.now() + k;
	for (let c of me) {
		if (r.signal?.aborted || Date.now() >= s) return null;
		let l = Math.max(1, s - Date.now()), u = await p(e.getMessagesInTimeRange({
			start: y(n, -c),
			end: a,
			topics: o,
			signal: r.signal
		}), Math.min(A, l), "Video bootstrap range read timed out");
		if (r.signal?.aborted) return null;
		let d = u.filter((e) => e.topic === t), f = r.codec ?? d.map(T).find(Boolean) ?? null;
		if (!f) continue;
		let m = L(d, n, f, { coverageEndTime: i });
		if (m.length !== 0) return {
			codec: f,
			events: m,
			annotationsByFrameKey: r.annotationTopic ? new Map(u.filter((e) => e.topic === r.annotationTopic).map((e) => [v(e.receiveTime), ae(e)])) : void 0
		};
	}
	return null;
}
async function ge(e) {
	let { player: t, worker: n, topic: r, targetTime: i, liveEvents: a = [], signal: o, preserveFrame: s = !1, transferOwnership: c = !1 } = e;
	if (o?.aborted) return !1;
	let l = [...a], u = e.codec ?? l.map(T).find(Boolean) ?? void 0, d = await V(t, r, i, {
		signal: o,
		coverageEndTime: N(l, u) ?? i,
		codec: u,
		annotationTopic: e.annotationTopic
	});
	if (!d || o?.aborted) return !1;
	let f = B(z(M([...d.events, ...l.filter((e) => T(e) === d.codec)])), c, d.annotationsByFrameKey);
	return F(f.frames, d.codec) ? (e.annotationTopic && f.frames.at(-1)?.annotation === null && e.onAnnotationGap?.(), n.postMessage({
		type: "bootstrapVideo",
		codec: d.codec,
		frames: f.frames,
		preserveFrame: s,
		generation: e.generation ?? 0
	}, f.transfer), !0) : !1;
}
//#endregion
//#region src/features/panels/Image/core/videoBackpressure.ts
var H = 4e3;
//#endregion
//#region src/features/panels/Image/core/videoLiveBuffer.ts
function _e(e) {
	let t = E(e);
	return t ? {
		...e,
		message: {
			...e.message,
			data: new Uint8Array(t)
		}
	} : e;
}
function U(e) {
	if (e.length === 0) return e;
	let t = e.length > 120 ? e.slice(e.length - 120) : e, n = t.at(-1);
	if (!n) return t;
	let r = v(n.receiveTime) - BigInt(H) * 1000000n, i = t.findIndex((e) => v(e.receiveTime) >= r);
	return i > 0 && (t = t.slice(i)), t;
}
function ve(e, t) {
	let n = ie(t) ? _e(t) : t;
	e.push(n);
	let r = U(e);
	return r !== e && (e.length = 0, e.push(...r)), e;
}
//#endregion
//#region src/features/panels/Image/core/ImageRender.worker.ts?worker&inline
var W = "function e(e,t,n){let r=e+t-n,i=Math.abs(r-e),a=Math.abs(r-t),o=Math.abs(r-n);return i<=a&&i<=o?e:a<=o?t:n}function t(e,t,n){for(let r=0;r<n;r++)t[r]=e[r]}function n(e,t,n,r){let i=0;for(;i<r;i++)t[i]=e[i];for(;i<n;i++)t[i]=e[i]+t[i-r]&255}function r(e,t,n,r){if(n.length===0){for(let n=0;n<r;n++)t[n]=e[n];return}for(let i=0;i<r;i++)t[i]=e[i]+n[i]&255}function i(e,t,n,r,i){let a=0;if(n.length===0){for(;a<i;a++)t[a]=e[a];for(;a<r;a++)t[a]=e[a]+(t[a-i]>>1)&255;return}for(;a<i;a++)t[a]=e[a]+(n[a]>>1)&255;for(;a<r;a++)t[a]=e[a]+(t[a-i]+n[a]>>1)&255}function a(t,n,r,i,a){let o=0;if(r.length===0){for(;o<a;o++)n[o]=t[o];for(;o<i;o++)n[o]=t[o]+n[o-a]&255;return}for(;o<a;o++)n[o]=t[o]+r[o]&255;for(;o<i;o++)n[o]=t[o]+e(n[o-a],r[o],r[o-a])&255}function o(e,o,s){let c=o*2,l=s*(1+c);if(e.byteLength!==l)throw Error(`PNG inflated length ${e.byteLength} !== expected ${l}`);let u=new Uint8Array(s*c),d=new Uint8Array,f=0;for(let o=0;o<s;o++){let s=e[f++],l=e.subarray(f,f+c);f+=c;let p=u.subarray(o*c,(o+1)*c);switch(s){case 0:t(l,p,c);break;case 1:n(l,p,c,2);break;case 2:r(l,p,d,c);break;case 3:i(l,p,d,c,2);break;case 4:a(l,p,d,c,2);break;default:throw Error(`Unsupported PNG filter type: ${s}`)}d=p}for(let e=0;e<u.length;e+=2){let t=u[e];u[e]=u[e+1],u[e+1]=t}return u}const s=new Uint8Array([137,80,78,71,13,10,26,10]);function c(e){let t=Math.max(0,e.byteLength-s.byteLength);for(let n=0;n<=t;n++){let t=!0;for(let r=0;r<s.byteLength;r++)if(e[n+r]!==s[r]){t=!1;break}if(t)return n}return-1}function l(e,t){return e.getUint32(t,!1)}function u(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=[],r=s.byteLength;for(;r+8<=e.byteLength;){let i=l(t,r),a=String.fromCharCode(e[r+4],e[r+5],e[r+6],e[r+7]),o=r+8,s=o+i;if(s+4>e.byteLength)throw Error(`PNG chunk exceeds buffer bounds`);if(a===`IDAT`&&n.push(e.subarray(o,s)),a===`IEND`)break;r=s+4}if(n.length===0)throw Error(`PNG is missing IDAT chunks`);let i=n.reduce((e,t)=>e+t.byteLength,0),a=new Uint8Array(i),o=0;for(let e of n)a.set(e,o),o+=e.byteLength;return a}async function d(e){if(typeof DecompressionStream>`u`)throw Error(`DecompressionStream is not supported in this environment`);let t=new Uint8Array(e.byteLength);t.set(e);let n=new Blob([t.buffer]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(n).arrayBuffer())}function f(e){if(e.byteLength<s.byteLength+8+13)throw Error(`PNG buffer is too small`);for(let t=0;t<s.byteLength;t++)if(e[t]!==s[t])throw Error(`Invalid PNG signature`);let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=l(t,s.byteLength);if(String.fromCharCode(e[s.byteLength+4],e[s.byteLength+5],e[s.byteLength+6],e[s.byteLength+7])!==`IHDR`||n!==13)throw Error(`PNG is missing IHDR chunk`);let r=s.byteLength+8;return{width:l(t,r),height:l(t,r+4),bitDepth:e[r+8],colorType:e[r+9]}}async function p(e){let{width:t,height:n,bitDepth:r,colorType:i}=f(e);if(t<=0||n<=0)throw Error(`Invalid PNG dimensions: ${t}x${n}`);if(r!==16||i!==0)throw Error(`Compressed depth PNG must be 16-bit grayscale (got depth=${r}, colorType=${i})`);return{width:t,height:n,data:o(await d(u(e)),t,n)}}function m(e){let t=[],n=0;for(;n<e.byteLength-2;){let r=ee(e,n);if(r<0)break;let i=r+(e[r+2]===1?3:4);i<e.byteLength&&t.push(i),n=i+1}return t.length===0?e.byteLength>0?[{offset:0,end:e.byteLength}]:[]:t.map((n,r)=>({offset:n,end:r+1<t.length?g(e,t[r+1]):e.byteLength}))}function h(e){let t=new Uint8Array(e.byteLength),n=0,r=0;for(let i of e){if(r>=2&&i===3){r=0;continue}t[n]=i,n+=1,r=i===0?r+1:0}return t.subarray(0,n)}function g(e,t){return t>=4&&e[t-4]===0&&e[t-3]===0&&e[t-2]===0&&e[t-1]===1?t-4:t-3}function ee(e,t){for(let n=t;n<e.byteLength-2;n+=1)if(e[n]===0&&e[n+1]===0&&(e[n+2]===1||n+3<e.byteLength&&e[n+2]===0&&e[n+3]===1))return n;return-1}function te(e){return re(e)?`key`:`delta`}function ne(e){return _(e).includes(5)}function re(e){for(let t of _(e))if(t===5||t===7||t===8)return!0;return!1}function ie(e){for(let{offset:t}of m(e)){if((e[t]&31)!=7||t+3>=e.byteLength)continue;let n=e[t+1],r=e[t+2],i=e[t+3];return`avc1.${v(n)}${v(r)}${v(i)}`}return null}function ae(e){let t=ie(e),n=[t,t?`avc1.${t.slice(5,7)}00${t.slice(-2)}`:null,`avc1.42E01E`,`avc1.4D4020`,`avc1.640028`];return[...new Set(n.filter(e=>e!=null))]}function _(e){return m(e).map(({offset:t})=>e[t]&31)}function v(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function y(e){return m(e).flatMap(({offset:t})=>t+1<e.byteLength?[e[t]>>1&63]:[])}function oe(e){return y(e).some(e=>e===19||e===20||e===21)}function se(e){return y(e).some(e=>e===32||e===33||e===34)}function ce(e){return y(e).some(e=>e<=31)}function le(e){return oe(e)||se(e)?`key`:`delta`}function ue(e){for(let t of m(e)){if(t.offset+1>=t.end||(e[t.offset]>>1&63)!=33)continue;let n=h(e.subarray(t.offset+2,t.end));if(n.byteLength<13)continue;let r=n[1],i=fe(r>>6),a=r&32?`H`:`L`,o=r&31,s=pe((n[2]<<24|n[3]<<16|n[4]<<8|n[5])>>>0),c=n[12],l=[...n.subarray(6,12)];for(;l.at(-1)===0;)l.pop();let u=l.length?`.${l.map(me).join(``)}`:``;return`${i}${o}.${s.toString(16).toUpperCase()}.${a}${c}${u}`}return null}function de(e){let t=[ue(e),`1.6.L93.B0`,`1.6.L120.B0`,`1.6.L123.B0`,`1.6.L150.B0`].flatMap(e=>e?[`hev1.${e}`,`hvc1.${e}`]:[]);return[...new Set(t)]}function fe(e){return[``,`A`,`B`,`C`][e&3]??``}function pe(e){let t=e>>>0,n=0;for(let e=0;e<32;e+=1)n=(n<<1|t&1)>>>0,t>>>=1;return n}function me(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function b(e){let t=e.trim().toLowerCase();return/\\b(?:h264|avc)\\b/.test(t)?`h264`:/\\b(?:h265|hevc)\\b/.test(t)?`h265`:null}function x(e,t){return e===`h264`?_(t):y(t)}function S(e,t){return e===`h264`?ne(t):oe(t)}function he(e,t){return e===`h264`?_(t).some(e=>e===7||e===8):se(t)}function ge(e,t){return e===`h264`?_(t).some(e=>e===1||e===5):ce(t)}function _e(e,t){return e===`h264`?te(t):le(t)}function ve(e,t){return e===`h264`?ae(t):de(t)}function ye(e,t){return e===`h264`?ie(t):ue(t)}function C(e,t){let n=x(e,t);return e===`h264`?n.includes(7):n.includes(32)||n.includes(33)}function w(e,t){return he(e,t)&&!ge(e,t)}function be(e,t){let n=Number(e/1000n);return Math.max(n,t+1)}const xe=/\\b(jpeg|jpg|png|webp|gif|avif|bmp)\\b/i,Se=new Set([`16uc1`,`32fc1`,`mono16`,`mono8`,`8uc1`,`rgb8`,`bgr8`,`rgba8`,`bgra8`,`8uc3`]);function Ce(e){return e.trim().toLowerCase()}function we(e){let t=Ce(e);return t===`16uc1`||t===`mono16`?`16uc1`:t===`32fc1`?`32fc1`:null}function Te(e){let t=e.trim().toLowerCase();if(t.includes(`compresseddepth`))return/\\brvl\\b/.test(t)?`rvl`:`png`}function T(e){let t=e.trim(),n=t.split(`;`).map(e=>e.trim()).filter(Boolean),r=n[0]?Ce(n[0]):void 0,i=n.length>1?n.slice(1).join(`;`).trim():void 0;return{rawEncoding:r,transport:i,depthCodec:i?Te(i):void 0,bitmapKind:D(t)}}function E(e){let t=T(e);return t.depthCodec!=null&&we(t.rawEncoding??``)!=null}function Ee(e){return E(e)?we(T(e).rawEncoding??``):null}function D(e){let t=b(e);if(t)return t;let n=e.match(xe);if(!n||!n[1])return null;let r=n[1].toLowerCase();return r===`jpg`||r===`jpeg`?`jpeg`:r===`png`||r===`webp`||r===`gif`||r===`avif`||r===`bmp`?r:null}function O(e){return e.byteLength>=3&&e[0]===255&&e[1]===216&&e[2]===255?`image/jpeg`:e.byteLength>=8&&e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71&&e[4]===13&&e[5]===10&&e[6]===26&&e[7]===10?`image/png`:e.byteLength>=12&&e[0]===82&&e[1]===73&&e[2]===70&&e[3]===70&&e[8]===87&&e[9]===69&&e[10]===66&&e[11]===80?`image/webp`:null}function De(e,t){if(E(e))throw Error(`Compressed depth format must not use bitmap MIME routing: ${e}`);let n=D(e);if(n===`jpeg`)return`image/jpeg`;if(n===`png`||n===`webp`||n===`gif`||n===`avif`||n===`bmp`)return`image/${n}`;let r=e.split(`;`)[0]?.trim().split(/\\s+/)[0]?.toLowerCase();if(!r)return t?O(t)??`image/jpeg`:`image/jpeg`;if(r.startsWith(`image/`))return r;if(r===`jpg`)return`image/jpeg`;if(Se.has(r)){let n=t?O(t):null;if(n)return n;throw Error(`Unsupported compressed image format token: ${e}`)}return t?O(t)??`image/jpeg`:`image/jpeg`}function k(e){return c(e)}function Oe(e,t){if(t<4)return{compressionFormat:0,depthParam:[0,0]};let n=new DataView(e.buffer,e.byteOffset,e.byteLength);return{compressionFormat:n.getInt32(0,!0),depthParam:[n.getFloat32(4,!0),n.getFloat32(8,!0)]}}async function ke(e){let t=k(e);if(t<0)throw Error(`Compressed depth payload does not contain a PNG signature`);let n=await p(e.subarray(t));return{width:n.width,height:n.height,data:n.data}}async function Ae(e){let{width:t,height:n,data:r}=await ke(e);return{encoding:`16uc1`,width:t,height:n,step:t*2,isBigEndian:!1,data:r}}async function je(e,t){let{width:n,height:r,data:i}=await ke(e),[a,o]=t.depthParam,s=new Uint8Array(n*r*4),c=new DataView(s.buffer,s.byteOffset,s.byteLength),l=new DataView(i.buffer,i.byteOffset,i.byteLength);for(let e=0;e<n*r;e++){let t=l.getUint16(e*2,!0),n=0;t!==0&&(n=a/(t-o),Number.isFinite(n)||(n=0)),c.setFloat32(e*4,n,!0)}return{encoding:`32fc1`,width:n,height:r,step:n*4,isBigEndian:!1,data:s}}async function Me(e,t){if(!E(t))throw Error(`Not a compressed depth format: ${t}`);if(T(t).depthCodec===`rvl`)throw Error(`RVL compressed depth is not supported yet`);let n=Ee(t);if(!n)throw Error(`Unsupported compressed depth encoding in format: ${t}`);let r=k(e);if(r<0)throw Error(`Compressed depth payload is missing PNG data`);if(r<12&&e.byteLength<12)throw Error(`Compressed depth payload is too small`);let i=Oe(e,r);return n===`16uc1`?Ae(e):je(e,i)}const A={colorMode:`colormap`,flatColor:`#ffffff`,gradient:[`#000000`,`#ffffff`],colorMap:`turbo`,explicitAlpha:1};function j(e,t,n){return Math.max(t,Math.min(n,e))}const Ne={r:0,g:0,b:0,a:0},Pe={r:0,g:0,b:0,a:0};function M(e,t){let n=t.trim(),r=n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(r){let t=r[1];return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e.r=parseInt(t.slice(0,2),16)/255,e.g=parseInt(t.slice(2,4),16)/255,e.b=parseInt(t.slice(4,6),16)/255,e.a=1,e}let i=n.match(/^rgba?\\(\\s*([0-9.]+)\\s*,\\s*([0-9.]+)\\s*,\\s*([0-9.]+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)$/i);return i?(e.r=Number(i[1])/255,e.g=Number(i[2])/255,e.b=Number(i[3])/255,e.a=i[4]==null?1:Number(i[4]),e):(e.r=e.g=e.b=e.a=1,e)}function Fe(e,t,n,r){let i=j(r,0,1);e.r=t.r+(n.r-t.r)*i,e.g=t.g+(n.g-t.g)*i,e.b=t.b+(n.b-t.b)*i,e.a=t.a+(n.a-t.a)*i}function Ie(e,t){let n=(1-j(t,0,1))*5+1,r=Math.floor(n),i=n%1;r%2<1&&(i=1-i);let a=1-i;r<=1?(e.r=a,e.g=0,e.b=1):r===2?(e.r=0,e.g=a,e.b=1):r===3?(e.r=0,e.g=1,e.b=a):r===4?(e.r=a,e.g=1,e.b=0):(e.r=1,e.g=a,e.b=0),e.a=1}const N=[.13572138,4.6153926,-42.66032258,132.13108234],P=[.09140261,2.19418839,4.84296658,-14.18503333],F=[.1066733,12.64194608,-60.58204836,110.36276771],I=[-152.94239396,59.28637943],Le=[4.27729857,2.82956604],Re=[-89.90310912,27.34824973];function ze(e,t){let n=j(t,0,1)*.99+.01,r=n*n,i=r*n,a=1*N[0]+n*N[1]+r*N[2]+i*N[3],o=1*P[0]+n*P[1]+r*P[2]+i*P[3],s=1*F[0]+n*F[1]+r*F[2]+i*F[3],c=r*r,l=i*r,u=c*I[0]+l*I[1],d=c*Le[0]+l*Le[1],f=c*Re[0]+l*Re[1];e.r=j(a+u,0,1),e.g=j(o+d,0,1),e.b=j(s+f,0,1),e.a=1}const Be=65535;let L;function Ve(e,t){if(!L){L=new Float32Array(Be*3);let e={r:0,g:0,b:0,a:0};for(let t=0;t<Be;t++){ze(e,t/65534);let n=t*3;L[n+0]=e.r,L[n+1]=e.g,L[n+2]=e.b}}let n=Math.trunc(t*65534)*3;e.r=L[n+0],e.g=L[n+1],e.b=L[n+2],e.a=1}function R(e,t){let n=t>>>0;e.a=((n&4278190080)>>>24)/255,e.r=((n&16711680)>>>16)/255,e.g=((n&65280)>>>8)/255,e.b=((n&255)>>>0)/255}function z(e,t,n){let r=e.colorMode;if(r===`rgba-fields`)throw Error(`rgba-fields color mode is not supported for scalar depth images`);switch(r){case`flat`:{let t=M(Ne,e.flatColor);return e=>{e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}}case`gradient`:{let r=Math.max(n-t,2**-52),i=M(Ne,e.gradient[0]),a=M(Pe,e.gradient[1]);return(e,n)=>{let o=Math.max(0,Math.min((n-t)/r,1));Fe(e,i,a,o)}}case`colormap`:{let r=Math.max(n-t,2**-52);return e.colorMap===`turbo`?(n,i)=>{Ve(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}:(n,i)=>{Ie(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}}case`rgb`:return(t,n)=>{R(t,n),t.a=e.explicitAlpha};case`rgba`:return(e,t)=>{R(e,t)};default:throw Error(`Unsupported color mode: ${String(r)}`)}}const He=1e4,Ue=/depth|aligned_depth|compressed_depth/i,We=/wrist|hand|left|right|gripper|eef|end_effector/;function Ge(e){return e.trim().toLowerCase()}function Ke(e){let t=Ge(e);return t===`16uc1`||t===`mono16`}function qe(e){return Ge(e)===`32fc1`}function Je(e){return Ue.test(e)}function Ye(e){let t=e.trim().toLowerCase();if(!t)return null;let n=Je(t),r=!n&&We.test(t),i={colorMode:`colormap`,colorMap:`turbo`};return n?{...i,minValue:200,maxValue:He}:r?{...i,minValue:0,maxValue:1e3}:null}function Xe(e,t){let n=t?Ye(t):null;return n?n.minValue:Ke(e)?200:0}function Ze(e,t){let n=t?Ye(t):null;return n?n.maxValue:qe(e)?1:Ke(e)?He:65535}function Qe(e,t,n){return{minValue:t?.minValue??Xe(e,n),maxValue:t?.maxValue??Ze(e,n)}}function $e(e,t,n,r,i,a){a[i]=e+Math.trunc(1403*r/1e3),a[i+1]=e-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+2]=e+Math.trunc(1770*t/1e3),a[i+3]=255,a[i+4]=n+Math.trunc(1403*r/1e3),a[i+5]=n-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+6]=n+Math.trunc(1770*t/1e3),a[i+7]=255}function et(e,t,n,r,i){if(r<t*2)throw Error(`UYVY image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t]-128,s=e[t+1],c=e[t+2]-128,l=e[t+3];$e(s,o,l,c,a,i),a+=8}}}function tt(e,t,n,r,i){if(r<t*2)throw Error(`YUYV image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t],s=e[t+1]-128,c=e[t+2];$e(o,s,c,e[t+3]-128,a,i),a+=8}}}function nt(e,t,n,r,i){if(r<t*3)throw Error(`RGB8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=255}}}function rt(e,t,n,r,i){if(r<t*4)throw Error(`RGBA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=e[t+3]}}}function it(e,t,n,r,i){if(r<t*4)throw Error(`BGRA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=e[t+3]}}}function at(e,t,n,r,i){if(r<t*3)throw Error(`BGR8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=255}}}function ot(e,t,n,r,i,a,o){if(r<t*4)throw Error(`Float image row step (${r}) must be at least 4*width (${t*4})`);let{minValue:s,maxValue:c}=Qe(`32fc1`,o),l;try{l=z(o,s,c)}catch{l=z({...A,colorMode:`gradient`},s,c)}let u={r:0,g:0,b:0,a:0},d=new DataView(e.buffer,e.byteOffset,e.byteLength),f=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=d.getFloat32(n+e*4,!i);l(u,t),a[f++]=Math.round(B(u.r)*255),a[f++]=Math.round(B(u.g)*255),a[f++]=Math.round(B(u.b)*255),a[f++]=Math.round(B(u.a)*255)}}}function B(e){return Math.max(0,Math.min(1,e))}function st(e,t,n,r,i){if(r<t)throw Error(`Mono8 image row step (${r}) must be at least width (${t})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=e[n+r];i[a++]=t,i[a++]=t,i[a++]=t,i[a++]=255}}}function ct(e,t,n,r,i,a,o,s){if(r<t*2)throw Error(`Mono16 image row step (${r}) must be at least 2*width (${t*2})`);let{minValue:c,maxValue:l}=Qe(s,o),u;try{u=z(o,c,l)}catch{u=z({...A,colorMode:`gradient`},c,l)}let d={r:0,g:0,b:0,a:0},f=new DataView(e.buffer,e.byteOffset,e.byteLength),p=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=f.getUint16(n+e*2,!i);u(d,t),a[p++]=Math.round(B(d.r)*255),a[p++]=Math.round(B(d.g)*255),a[p++]=Math.round(B(d.b)*255),a[p++]=Math.round(B(d.a)*255)}}}function V(e,t,n,r){return Function(`data`,`width`,`height`,`step`,`output`,`\n      if (step < width) {\n        throw new Error(\\`Bayer image row step (\\${step}) must be at least width (\\${width})\\`);\n      }\n      for (let i = 0; i < height / 2; i++) {\n        let inIdx = i * 2 * step;\n        let outTopIdx = i * 2 * width * 4;\n        let outBottomIdx = (i * 2 + 1) * width * 4;\n        for (let j = 0; j < width / 2; j++) {\n          const tl = data[inIdx++];\n          const tr = data[inIdx++];\n          const bl = data[inIdx + step - 2];\n          const br = data[inIdx + step - 1];\n\n          const ${e} = tl;\n          const ${t} = tr;\n          const ${n} = bl;\n          const ${r} = br;\n\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n        }\n      }\n    `)}const lt=V(`r`,`g0`,`g1`,`b`),ut=V(`b`,`g0`,`g1`,`r`),dt=V(`g0`,`b`,`r`,`g1`),ft=V(`g0`,`r`,`b`,`g1`);function pt(e){return e.trim().toLowerCase()}function mt(e,t,n){let r=e.width,i=e.height,a=e.step??ht(e),o=e.is_bigendian??!1,s=pt(e.encoding),c=e.data,l={...A,...n};switch(s){case`rgb8`:nt(c,r,i,a,t);return;case`rgba8`:rt(c,r,i,a,t);return;case`bgra8`:it(c,r,i,a,t);return;case`bgr8`:case`8uc3`:at(c,r,i,a,t);return;case`mono8`:case`8uc1`:st(c,r,i,a,t);return;case`mono16`:case`16uc1`:ct(c,r,i,a,o,t,l,s);return;case`32fc1`:ot(c,r,i,a,o,t,l);return;case`uyvy`:case`yuv422`:et(c,r,i,a,t);return;case`yuyv`:case`yuv422_yuy2`:tt(c,r,i,a,t);return;case`bayer_rggb8`:lt(c,r,i,a,t);return;case`bayer_bggr8`:ut(c,r,i,a,t);return;case`bayer_gbrg8`:dt(c,r,i,a,t);return;case`bayer_grbg8`:ft(c,r,i,a,t);return;default:throw Error(`Unsupported image encoding: ${e.encoding}`)}}function ht(e){switch(pt(e.encoding)){case`rgb8`:case`bgr8`:case`8uc3`:return e.width*3;case`rgba8`:case`bgra8`:case`32fc1`:return e.width*4;case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return e.width*2;case`mono16`:case`16uc1`:return e.width*2;case`mono8`:case`8uc1`:case`bayer_rggb8`:case`bayer_bggr8`:case`bayer_gbrg8`:case`bayer_grbg8`:return e.width;default:return e.width*4}}const H={frames:72,spanMs:350,decodeMs:55,decodeQueueSize:8,mediaLagMs:1500},U={frames:18,spanMs:120,decodeMs:32,decodeQueueSize:1},W={frames:40,spanMs:250,decodeMs:45,decodeQueueSize:6,mediaLagMs:1e3};function gt(){return{mode:`normal`,healthySamples:0}}function _t(e,t){return e>120||t>4e3}function vt(e,t){let n=t.queueFrames>=H.frames||t.queueSpanMs>=H.spanMs||t.decodeMs>=H.decodeMs||t.decodeQueueSize>=H.decodeQueueSize||t.mediaLagMs>=H.mediaLagMs,r=t.queueFrames<=U.frames&&t.queueSpanMs<=U.spanMs&&t.decodeMs<=U.decodeMs&&t.decodeQueueSize<=U.decodeQueueSize,i=t.queueFrames>=W.frames||t.queueSpanMs>=W.spanMs||t.decodeMs>=W.decodeMs||t.decodeQueueSize>=W.decodeQueueSize||t.mediaLagMs>=W.mediaLagMs;if(e.mode===`normal`)return n?{mode:`degraded`,healthySamples:0}:e;if(e.mode===`degraded`)return r?{mode:`recovery`,healthySamples:1}:e;if(i)return{mode:`degraded`,healthySamples:0};if(!r)return{mode:`recovery`,healthySamples:0};let a=e.healthySamples+1;return a>=12?{mode:`normal`,healthySamples:0}:{mode:`recovery`,healthySamples:a}}function yt(e,t){return!Number.isFinite(t)||t<0?e:e===0?t:e*.8+t*.2}function bt(e,t){return e==null?0:Math.max(0,Number(e-t)/1e6)}function xt(e,t){return t!=null&&t>=e}function St(e,t,n=400){return!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0?!1:e>Math.max(n,t*4)}function Ct(e,t,n){return e&&t!==null&&n<t}function wt(e,t){return t?{frames:[],droppedFrames:e.length,waitForRandomAccess:!0}:{frames:[...e],droppedFrames:0,waitForRandomAccess:!1}}function Tt(e,t,n){if(!w(e,n.data))return[...t];if(e===`h264`||x(e,n.data).includes(32))return C(e,n.data)?[n]:[...t,n];if(x(e,n.data).includes(33)){let r=[...t].reverse().find(t=>x(e,t.data).includes(32));return r?[r,n]:[n]}return[...t,n]}function Et(e,t,n=[],r=!1){let i=Dt(e,t);if(i<0)return{frames:[...t],droppedFrames:0,resync:!1};if(i===0)return r?{frames:C(e,t[0].data)?[...t]:[...n,...t],droppedFrames:0,resync:!0}:{frames:[...t],droppedFrames:0,resync:!1};let a=x(e,t[i].data),o=e===`h264`?a.includes(7):a.includes(32)||a.includes(33),s=o?[]:Ot(e,t,i),c=[...o||s.length>0?s:[...n],...t.slice(i)],l=i-s.length;return l===0?{frames:[...t],droppedFrames:0,resync:!1}:{frames:c,droppedFrames:l,resync:!0}}function Dt(e,t){for(let n=t.length-1;n>=0;--n)if(S(e,t[n].data))return n;return-1}function Ot(e,t,n){let r=-1;for(let i=n-1;i>=0;--i){let n=t[i];if(!w(e,n.data))continue;let a=x(e,n.data);if(e===`h264`&&a.includes(7)){r=i;break}if(e===`h265`&&a.includes(32)){r=i;break}e===`h265`&&r<0&&a.includes(33)&&(r=i)}return r<0?[]:t.slice(r,n).filter(t=>w(e,t.data))}var kt=class extends Error{name=`TimeoutError`;constructor(e){super(e)}};function G(e,t,n,r){let i=!1,a=null;return new Promise((o,s)=>{a=setTimeout(()=>{i=!0,a=null,s(new kt(n))},t),e.then(e=>{if(a!=null&&(clearTimeout(a),a=null),i){r?.(e);return}o(e)},e=>{a!=null&&(clearTimeout(a),a=null),i||s(e instanceof Error?e:Error(String(e)))})})}function At(e,t){e.lineCap=`round`,e.lineJoin=`round`;for(let n of t.points)jt(e,n)}function jt(e,t){let{points:n}=t;if(n.length!==0)switch(e.lineWidth=Math.max(1,t.thickness),e.strokeStyle=K(t.outlineColor),e.fillStyle=K(t.fillColor),t.kind){case`points`:for(let r=0;r<n.length;r+=1){let i=n[r];e.strokeStyle=K(t.outlineColors[r]??t.outlineColor),e.beginPath(),e.arc(i.x,i.y,Math.max(1,t.thickness/2),0,Math.PI*2),e.fill(),e.stroke()}return;case`line-loop`:case`line-strip`:e.beginPath(),e.moveTo(n[0].x,n[0].y);for(let t of n.slice(1))e.lineTo(t.x,t.y);t.kind===`line-loop`&&(e.closePath(),t.fillColor.a>0&&e.fill()),e.stroke();return;case`line-list`:for(let t=0;t+1<n.length;t+=2)e.beginPath(),e.moveTo(n[t].x,n[t].y),e.lineTo(n[t+1].x,n[t+1].y),e.stroke()}}function K(e){return`rgba(${Math.round(Math.max(0,Math.min(1,e.r))*255)}, ${Math.round(Math.max(0,Math.min(1,e.g))*255)}, ${Math.round(Math.max(0,Math.min(1,e.b))*255)}, ${Math.max(0,Math.min(1,e.a))})`}function q(e,t,n){return t!==n&&(e.close(),!0)}const Mt={backgroundColor:`#000000`,flipHorizontal:!1,flipVertical:!1,rotationDeg:0,smoothing:!0,fitMode:`contain`};function Nt(e){return(e%360+360)%360}function Pt(e,t,n){let r=Nt(n)*Math.PI/180,i=Math.abs(Math.cos(r)),a=Math.abs(Math.sin(r));return{w:e*i+t*a,h:e*a+t*i}}const Ft={cssWidth:0,cssHeight:0,devicePixelRatio:1},J=5e3;var It=class{#e=null;#t=-1;#n=null;#r=null;#i=null;#a=0;#o=new Map;#s;constructor(e){this.#s=e}dispose(){this.reset(),this.#t=-1}reset(){this.#a+=1,this.#e&&this.#e.state!==`closed`&&this.#e.close(),this.#e=null,this.#n=null,this.#r=null,this.#i=null,this.#o.clear()}get codec(){return this.#n??void 0}get decodeQueueSize(){return this.#e?.state===`configured`?this.#e.decodeQueueSize:0}get hasPendingWork(){return this.#o.size>0||this.decodeQueueSize>0}sweepPending(){this.#c()}async submitFrame(e,t,n){if(typeof VideoDecoder>`u`)throw Error(`WebCodecs VideoDecoder is not supported`);let r=e.kind===`compressed`?b(e.format):null;if(!r)throw Error(`Compressed frame does not declare H.264 or H.265`);let i=ye(r,t);this.#e&&this.#e.state!==`closed`&&(this.#i!==null&&r!==this.#i||i&&i!==this.#r)&&this.reset();let a=this.#a;if(!await this.#l(r,t,i,a))return;let o=this.#e,s=be(n,this.#t);this.#t=s,ge(r,t)&&this.#o.set(s,{frame:e,startedAt:performance.now(),queueDepth:o.decodeQueueSize,generation:a});try{o.decode(new EncodedVideoChunk({type:_e(r,t),timestamp:s,data:t}))}catch(e){throw this.#o.delete(s),e}this.#c()}#c(e=performance.now()){for(let[t,n]of this.#o)if(!(e-n.startedAt<=J)){this.#o.delete(t),this.#s.error(Error(`Video decode timed out`));return}}async#l(e,t,n,r){if(this.#e&&this.#e.state!==`closed`)return!0;let i=null;for(let n of ve(e,t)){let e=[{codec:n,hardwareAcceleration:`prefer-hardware`,optimizeForLatency:!0},{codec:n,hardwareAcceleration:`no-preference`,optimizeForLatency:!0}];for(let t of e)try{let e=await G(VideoDecoder.isConfigSupported(t),3e3,`VideoDecoder.isConfigSupported timed out`);if(r!==this.#a)return!1;if(e.supported){i=e.config??t;break}}catch{}if(i)break}if(!i)throw Error(`${e===`h264`?`H.264`:`H.265`} codec ${n??`fallback candidates`} is not supported`);this.#e=new VideoDecoder({output:e=>{let t=this.#o.get(e.timestamp);if(this.#o.delete(e.timestamp),!t||t.generation!==this.#a){e.close();return}this.#s.output({videoFrame:e,sourceFrame:t.frame,decodeMs:(performance.now()-t.startedAt)/(t.queueDepth+1)})},error:e=>this.#s.error(Error(String(e)))}),this.#e.addEventListener(`dequeue`,this.#s.dequeue);try{this.#e.configure(i),this.#n=i.codec,this.#r=n,this.#i=e}catch(e){throw this.#e.close(),this.#e=null,this.#n=null,this.#i=null,e}return!0}},Lt=class{#e=null;#t=null;#n=new OffscreenCanvas(1,1);#r=this.#n.getContext(`2d`,{alpha:!1});#i={...Mt};#a={...Ft};#o={};#s=null;#c=[];#l=!1;#u=null;#d;#f=null;#p=null;#m=`idle`;#h=!1;#g=null;#_=null;#v=new Map;#y=null;#b=null;#x=gt();#S=0;#C=!1;#w=null;#T=[];#E=[];#D=0;#O=null;#k=0;#A=-1/0;#j=null;#M=!1;#N=-1/0;#P=-1/0;#F=0;#I=0;#L=0;#R=-1/0;#z=null;#B=null;#V=null;#H=!1;#U=-1/0;#W=0;#G=0;#K=null;constructor(){if(!this.#r)throw Error(`Buffer canvas context is unavailable in worker`);this.#d=new It({output:e=>this.#ce(e),error:e=>this.#de(e),dequeue:()=>{this.#me(),this.#_e(),this.#oe()}})}handle(e){switch(e.type){case`init`:if(this.#e=e.canvas,this.#t=e.canvas.getContext(`2d`,{alpha:!1,desynchronized:!0}),!this.#t)throw Error(`Canvas 2D context is unavailable in worker`);this.#ke(),this.#je(),this.#Te({phase:`idle`}),this.#_e(!0);return;case`viewport`:this.#a=e.viewport,this.#ke(),this.#be();return;case`renderOptions`:this.#i=e.options,this.#be();return;case`rawDecodeOptions`:this.#o=e.options,this.#ye();return;case`playback`:this.#z=Q(e.currentTime),this.#H=e.isPlaying,this.#me(),this.#re(),this.#ee(),this.#ge();return;case`frame`:if(this.#G=e.generation,this.#h){this.#_e(!0);return}this.#ne(e.frame),this.#_e(),this.#l||this.#oe();return;case`bootstrapVideo`:this.#q(e.codec,e.frames,e.preserveFrame===!0,e.generation);return;case`reset`:this.#G=e.generation,this.#W+=1,this.#s=null,this.#c=[],this.#D=0,this.#pe(),this.#h=!1,this.#he(),this.#d.reset(),this.#we(),e.preserveFrame||(this.#Se(),this.#y=null,this.#je(),this.#Te({phase:`idle`})),this.#_e(!0);return;case`dispose`:this.#W+=1,this.#s=null,this.#c=[],this.#D=0,this.#pe(),this.#h=!1,this.#d.dispose(),this.#we(),this.#Se(),this.#y=null,self.close();return}}#q(e,t,n,r){this.#G=r,this.#W+=1,this.#s=null,this.#c=[],this.#D=0,this.#pe(),this.#h=!1,this.#b!==e&&(this.#E=[],this.#T=[]),this.#b=e,this.#he(),this.#d.reset(),n||(this.#Se(),this.#y=null,this.#je(),this.#Te({phase:`idle`}));let i=t.filter(t=>X(t)===e).slice(0,600);if(i.length===0||!i.some(t=>S(e,t.data))){this.#X(),this.#ge(!0),this.#_e(!0);return}for(let e of i)this.#J(e,{applyBackpressure:!1});this.#D=this.#c.length,this.#ge(!0),this.#_e(!0),this.#l||this.#oe()}#J(e,t={}){let n=X(e);if(!n)return;let r=t.applyBackpressure!==!1;if(this.#b!==n&&(this.#b=n,this.#c=[],this.#D=0,this.#E=[],this.#T=[],this.#X(),this.#fe()),this.#E=Tt(n,this.#E,e),r&&this.#Y(e,n),this.#C&&!S(n,e.data)){if(w(n,e.data)){this.#T=Tt(n,this.#T,e);return}this.#F+=1,r&&(this.#$(),this.#ge());return}S(n,e.data)&&(this.#Z(),this.#T.length>0&&(this.#c.push(...this.#T),this.#T=[])),this.#c.push(e),r&&(this.#me(),this.#re(),this.#ge())}#Y(e,t){let n=Q(e.receiveTime),r=this.#O;if(this.#O=n,r==null){this.#j??=performance.now();return}let i=Number(n-r)/1e6;if(!(i<=0)){if(!S(t,e.data)&&St(i,this.#k)){this.#F+=this.#c.length,this.#c=[],this.#D=0,this.#X(),this.#fe(),this.#Q();return}this.#k=yt(this.#k,i)}}#X(){this.#C=!0,this.#w=performance.now(),this.#T=[...this.#E]}#Z(){this.#C=!1,this.#w=null}#Q(){let e=performance.now();e-this.#A<1500||(this.#A=e,$.postMessage({type:`needsBootstrap`}))}#$(){let e=this.#w;e==null||performance.now()-e<500||this.#Q()}#ee(){let e=this.#j;e!=null&&this.#H&&(performance.now()-e<4e3||this.#M||(this.#M=!0,this.#Te({phase:`stalled`}),this.#Q()))}#te(){this.#j=performance.now(),this.#M=!1}#ne(e){if(!Vt(e)){this.#s=e;return}this.#J(e)}#re(){if(this.#D>0)return;let e=Z(this.#c),t=_t(this.#c.length,e),n=this.#x.mode===`degraded`&&(this.#c.length>36||e>250);if(!t&&!n)return;let r=this.#b;if(!r)return;let i=Et(r,this.#c,this.#E),a=t||performance.now()-this.#R>=200;if(i.resync&&a&&(this.#c=i.frames,this.#fe(),this.#F+=i.droppedFrames),_t(this.#c.length,Z(this.#c))){this.#ie();return}i.resync}#ie(){let e=wt(this.#c,!0);this.#F+=e.droppedFrames,this.#c=e.frames,this.#D=0,this.#X(),this.#fe(),this.#me(),this.#ge(!0),this.#Q()}#ae(){let e=this.#c.shift();if(e)return this.#D>0&&--this.#D,e;let t=this.#s;return this.#s=null,t}async#oe(){if(this.#l)return;this.#l=!0;let e=this.#W;this.#u=e;try{let t;for(;!(this.#c.length>0&&this.#d.decodeQueueSize>=4||(t=this.#ae(),!t)||e!==this.#W);)if(await this.#se(t,e),this.#h){this.#s=null,this.#c=[],this.#D=0;break}}finally{this.#l=!1,this.#u=null,this.#_e(),(this.#s||this.#c.length>0&&this.#d.decodeQueueSize<4)&&this.#oe()}}async#se(e,t){this.#Te({phase:`decoding`,receiveTime:e.receiveTime});try{if(e.kind===`compressed`){let n=Y(e.data);if(n.byteLength===0)throw Error(`Compressed image payload is empty: ${e.format}`);if(E(e.format)){let r=await Me(n,e.format);if(t!==this.#W)return;this.#ve({receiveTime:e.receiveTime,encoding:r.encoding,width:r.width,height:r.height,step:r.step,isBigEndian:r.isBigEndian,data:Y(r.data),annotation:e.annotation});return}let r=D(e.format),i=Q(e.receiveTime);if(r===`h264`||r===`h265`){if(await this.#d.submitFrame(e,n,i),t!==this.#W)return;this.#me(),this.#ge();return}let a=await G(this.#Ce(n,e.format),J,`Compressed image decode timed out: ${e.format}`,Ht);if(q(a,t,this.#W))return;let o=`displayWidth`in a?a.displayWidth:a.width,s=`displayHeight`in a?a.displayHeight:a.height,c;if(Wt(a))c=a;else{try{c=await G(createImageBitmap(a),J,`Compressed image bitmap creation timed out: ${e.format}`,Ut)}finally{Ht(a)}if(q(c,t,this.#W))return}this.#xe(c,o,s,e.format,e.receiveTime,e.annotation),this.#De(c,o,s,e.receiveTime,e.annotation),this.#Te({phase:`ready`,width:o,height:s,encoding:e.format,receiveTime:e.receiveTime});return}let n=Y(e.data);this.#ve({receiveTime:e.receiveTime,encoding:e.encoding,width:e.width,height:e.height,step:e.step??e.width*Rt(e.encoding),isBigEndian:e.isBigEndian??!1,data:n,annotation:e.annotation})}catch(n){if(t!==this.#W)return;if(Vt(e)){this.#F+=1,this.#de(n instanceof Error?n:Error(String(n)));return}this.#h=!0,this.#Te({phase:`error`,message:n instanceof Error?n.message:String(n)})}}#ce(e){let t=Q(e.sourceFrame.receiveTime);this.#B=t,this.#S=yt(this.#S,e.decodeMs);let n=this.#f;if(n){if(xt(t,Q(n.sourceFrame.receiveTime))){e.videoFrame.close(),this.#F+=1,this.#me(),this.#ge();return}n.videoFrame.close(),this.#F+=1}this.#f={videoFrame:e.videoFrame,sourceFrame:e.sourceFrame},this.#_e(),this.#le(),this.#me(),this.#ge()}#le(){if(this.#p!=null||!this.#f)return;let e=this.#x.mode===`normal`?16.666666666666668:33.333333333333336,t=Math.max(0,e-(performance.now()-this.#N));if(t<=0){this.#ue();return}this.#p=setTimeout(()=>{this.#p=null,this.#ue()},t)}async#ue(){let e=this.#f;if(this.#f=null,!e)return;let{videoFrame:t,sourceFrame:n}=e,r=this.#W,i=performance.now();try{let e=t.displayWidth||t.codedWidth,a=t.displayHeight||t.codedHeight;if(!this.#Oe(t,e,a,n.receiveTime,n.annotation)){this.#F+=1;return}if(this.#N=i,this.#I+=1,this.#te(),this.#Te({phase:`ready`,width:e,height:a,encoding:n.kind===`compressed`?n.format:this.#b??`video`,receiveTime:n.receiveTime}),this.#x.mode===`normal`&&i-this.#P>=500)try{let o=await createImageBitmap(t);if(q(o,r,this.#W))return;this.#xe(o,e,a,n.kind===`compressed`?n.format:this.#b??`video`,n.receiveTime,n.annotation),this.#P=i}catch{}}finally{t.close(),this.#ge(),this.#f&&this.#le(),this.#_e()}}#de(e){console.warn(`ImageRenderWorker: video decode failed`,e),this.#fe();let t=this.#b,n=t?Et(t,this.#c,this.#E,!0):{frames:[],droppedFrames:this.#c.length,resync:!1};n.resync?(this.#c=n.frames,this.#D=0,this.#Z(),this.#F+=n.droppedFrames,this.#oe()):(this.#F+=this.#c.length,this.#c=[],this.#D=0,this.#X(),this.#Q()),this.#I===0&&!this.#y&&this.#Te({phase:`error`,message:e.message}),this.#ge(!0),this.#_e()}#fe(){this.#d.reset(),this.#pe(),this.#L+=1,this.#R=performance.now()}#pe(){this.#p!=null&&(clearTimeout(this.#p),this.#p=null),this.#f?.videoFrame.close(),this.#f=null}#me(){let e=this.#x.mode,t=!this.#H||this.#B==null?0:bt(this.#z,this.#B);this.#x=vt(this.#x,{queueFrames:this.#c.length,queueSpanMs:Z(this.#c),decodeMs:this.#S,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:t}),e!==this.#x.mode&&this.#ge(!0)}#he(){this.#x=gt(),this.#S=0,this.#X(),this.#D=0,this.#O=null,this.#k=0,this.#j=null,this.#M=!1,this.#N=-1/0,this.#P=-1/0,this.#F=0,this.#I=0,this.#L=0,this.#R=-1/0,this.#B=null,this.#V=null,this.#U=-1/0}#ge(e=!1){this.#d.sweepPending();let t=performance.now();if(!e&&t-this.#U<1e3)return;this.#U=t;let n=this.#B==null?0:bt(this.#z,this.#B),r={pressureMode:this.#x.mode,queueFrames:this.#c.length,queueSpanMs:Z(this.#c),decodeMs:this.#S,droppedFrames:this.#F,renderedFrames:this.#I,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:n,resyncCount:this.#L,waitingForRandomAccess:this.#C,codec:this.#d.codec};$.postMessage({type:`metrics`,metrics:r})}#_e(e=!1){let t=this.#l&&this.#u===this.#W||this.#s!=null||this.#c.length>0||this.#d.hasPendingWork||this.#f!=null||this.#p!=null;(e||this.#K?.generation!==this.#G||this.#K.pending!==t)&&(this.#K={generation:this.#G,pending:t},$.postMessage({type:`renderHealth`,generation:this.#G,pending:t}))}#ve(e){let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height)),mt({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#Se(),this.#y={kind:`raw`,width:e.width,height:e.height,encoding:e.encoding,step:e.step,isBigEndian:e.isBigEndian,data:e.data,receiveTime:e.receiveTime,annotation:e.annotation},this.#Ee(e.width,e.height,e.receiveTime,e.annotation),this.#Te({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}#ye(){let e=this.#y;if(!e||e.kind!==`raw`)return;let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height));try{mt({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#Ee(e.width,e.height,e.receiveTime,e.annotation),this.#Te({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}catch{}}#be(){let e=this.#y;if(!e){this.#je();return}e.kind===`raw`?(this.#Ee(e.width,e.height,e.receiveTime,e.annotation),this.#Te({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})):(this.#De(e.bitmap,e.width,e.height,e.receiveTime,e.annotation),this.#Te({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime}))}#xe(e,t,n,r,i,a){this.#Se(),this.#y={kind:`bitmap`,width:t,height:n,encoding:r,bitmap:e,receiveTime:i,annotation:a}}#Se(){this.#y?.kind===`bitmap`&&this.#y.bitmap.close()}async#Ce(e,t){let n=De(t,e);if(typeof ImageDecoder<`u`){let t=this.#v.get(n);if(t===void 0&&(t=await ImageDecoder.isTypeSupported(n),this.#v.set(n,t)),t){let t=new ImageDecoder({type:n,data:e});try{let{image:e}=await t.decode({frameIndex:0});return e}finally{t.close()}}}return createImageBitmap(new Blob([e],{type:n}))}#we(){this.#v.clear(),this.#g=null,this.#_=null}#Te(e){if(e.phase===`decoding`&&this.#m!==`idle`&&this.#m!==`error`)return;this.#m=e.phase;let t={type:`status`,status:e};$.postMessage(t)}#Ee(e,t,n,r){zt(this.#n,e,t),this.#r.putImageData(this.#_,0,0),this.#Oe(this.#n,e,t,n,r)}#De(e,t,n,r,i){this.#Oe(e,t,n,r,i)}#Oe(e,t,n,r,i){let a=Q(r);if(Ct(this.#H,this.#V,a))return!1;this.#ke();let o=this.#t,s=this.#e;if(!o||!s)return!1;let c=this.#a.cssWidth||s.width/Math.max(1,this.#a.devicePixelRatio)||1,l=this.#a.cssHeight||s.height/Math.max(1,this.#a.devicePixelRatio)||1,u=Nt(this.#i.rotationDeg),{w:d,h:f}=Pt(t,n,u),p=this.#i.fitMode===`contain`?Math.min(c/d,l/f):Math.max(c/d,l/f),m=Math.max(1,t*p),h=Math.max(1,n*p);o.save();let g=this.#Ae();return o.setTransform(g,0,0,g,0,0),o.clearRect(0,0,c,l),o.fillStyle=this.#i.backgroundColor,o.fillRect(0,0,c,l),o.imageSmoothingEnabled=this.#i.smoothing,o.imageSmoothingQuality=this.#i.smoothing&&this.#x.mode===`normal`?`high`:`low`,o.translate(c/2,l/2),o.rotate(u*Math.PI/180),o.scale(this.#i.flipHorizontal?-1:1,this.#i.flipVertical?-1:1),o.drawImage(e,-m/2,-h/2,m,h),i&&(o.translate(-m/2,-h/2),o.scale(p,p),At(o,i)),o.restore(),this.#V=a,$.postMessage({type:`rendered`,generation:this.#G,timestampNs:a,width:t,height:n,annotationState:i===void 0?`disabled`:i===null?`gap`:`matched`}),!0}#ke(){if(!this.#e)return;let e=this.#Ae(),t=Math.max(1,Math.round(Math.max(0,this.#a.cssWidth)*e)),n=Math.max(1,Math.round(Math.max(0,this.#a.cssHeight)*e));this.#e.width!==t&&(this.#e.width=t),this.#e.height!==n&&(this.#e.height=n)}#Ae(){let e=Math.max(1,this.#a.devicePixelRatio);return this.#x.mode===`normal`?e:Math.min(e,1)}#je(){this.#t&&this.#e&&(this.#t.save(),this.#t.setTransform(1,0,0,1,0,0),this.#t.clearRect(0,0,this.#e.width,this.#e.height),this.#t.fillStyle=this.#i.backgroundColor,this.#t.fillRect(0,0,this.#e.width,this.#e.height),this.#t.restore())}};function Rt(e){switch(e.trim().toLowerCase()){case`rgb8`:case`bgr8`:case`8uc3`:return 3;case`rgba8`:case`bgra8`:case`32fc1`:return 4;case`mono16`:case`16uc1`:case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return 2;default:return 1}}function zt(e,t,n){e.width!==t&&(e.width=t),e.height!==n&&(e.height=n)}function Bt(e){let t=new Uint8Array(new ArrayBuffer(e.byteLength));return t.set(e),t}function Y(e){return e.buffer instanceof ArrayBuffer&&e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e:Bt(e)}function X(e){return e.kind===`compressed`?b(e.format):null}function Vt(e){return X(e)!==null}function Z(e){if(e.length<2)return 0;let t=e.find(e=>{let t=X(e);return!t||!w(t,e.data)}),n=e.findLast(e=>{let t=X(e);return!t||!w(t,e.data)});if(!t||!n)return 0;let r=Q(n.receiveTime)-Q(t.receiveTime);return Math.max(0,Number(r)/1e6)}function Q(e){return BigInt(e.sec)*1000000000n+BigInt(e.nsec)}function Ht(e){e.close()}function Ut(e){e.close()}function Wt(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap}const Gt=new Lt,$=self;$.onmessage=e=>{try{Gt.handle(e.data)}catch(e){let t=e instanceof Error?e.message:String(e);$.postMessage({type:`status`,status:{phase:`error`,message:t}})}};", G = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", W], { type: "text/javascript;charset=utf-8" });
function ye(e) {
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
function be(e) {
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
	let { formatMessage: s } = e(), l = t((e) => e.playerState.activeData?.isPlaying ?? !1), { player: d, panelId: f, visible: p, setConfig: m, topic: h, annotationTopic: g, annotationVisible: ee, backgroundColor: _, showStatusText: y, fitMode: w, flipHorizontal: E, flipVertical: ae, rotation: oe, smoothing: se, colorMode: ce, colorMap: ue, gradient: D, flatColor: O, explicitAlpha: de, minValue: fe, maxValue: pe } = a, me = x(null), he = x(null), k = x(null), A = x(null), j = x(0), M = x(!1), N = x(void 0), P = x(null), F = x({ phase: "idle" }), I = x(null), L = x(!1), R = x(!1), z = x(0), B = x([]), V = x("latest"), H = x(null), _e = x(null), U = x(null), W = x(null), G = x(null), [K, Te] = S({ phase: "idle" }), [q, Ee] = S(null), [De, J] = S(!1), [Oe, Y] = S(!1), X = x(null), [ke, Ae] = S("disabled"), Z = `${f}:image-main`, je = `${f}:image-annotations`, Q = ee ? g.trim() : "", Me = t((e) => e.playerState.activeData?.topics.find((e) => e.name === h)), Ne = Me?.type ?? "", Pe = Ce(Me), $ = ne(() => {
		if (!h.trim()) {
			d.unregisterRenderHealth?.(f);
			return;
		}
		d.updateRenderHealth?.(f, {
			topic: h,
			visible: p,
			pending: M.current || R.current || (H.current?.pendingFrameCount ?? 0) > 0,
			renderedTime: N.current,
			averageFrameIntervalMs: Pe
		});
	});
	b(() => {
		h.trim() ? $() : d.unregisterRenderHealth?.(f);
	}, [
		Pe,
		f,
		d,
		h,
		p
	]), b(() => () => {
		d.unregisterRenderHealth?.(f);
	}, [f, d]), b(() => {
		let e = me.current, t = he.current;
		if (!e || !t) return;
		if (typeof e.transferControlToOffscreen != "function") {
			let e = {
				phase: "error",
				message: s({ id: "panels.image.error.offscreenUnsupported" })
			};
			F.current = e, Te(e);
			return;
		}
		A.current != null && (window.clearTimeout(A.current), A.current = null), k.current && P.current && P.current !== e && (k.current.postMessage({ type: "dispose" }), k.current.terminate(), k.current = null, P.current = null);
		let r = k.current;
		if (!r) {
			r = new ye(), k.current = r;
			let t = e.transferControlToOffscreen();
			P.current = e, r.postMessage({
				type: "init",
				canvas: t
			}, [t]);
		}
		let i = (e) => {
			z.current += 1, I.current?.abort(), I.current = null, B.current = [], R.current = !1, M.current = !1, $();
			let t = {
				phase: "error",
				message: e
			};
			F.current = t, Te(t);
		};
		r.onerror = (e) => {
			i(e.message || "Image worker crashed");
		}, r.onmessageerror = () => {
			i("Image worker failed to deserialize a message");
		}, r.onmessage = (e) => {
			let t = e.data;
			if (t.type === "metrics") {
				Ee(t.metrics);
				return;
			}
			if (t.type === "needsBootstrap") {
				W.current?.();
				return;
			}
			if (t.type === "renderHealth") {
				if (t.generation !== j.current) return;
				M.current = t.pending, $();
				return;
			}
			if (t.type === "rendered") {
				if (t.generation !== j.current) return;
				N.current = te(t.timestampNs), $(), Ae(t.annotationState), t.annotationState === "gap" && J(!0);
				return;
			}
			if (t.type !== "status") return;
			let n = t.status;
			Se(F.current, n) || (F.current = n, Te(n));
		};
		let a = -1, o = -1, c = -1, l = null, u = () => {
			let e = t.getBoundingClientRect(), n = window.devicePixelRatio || 1, i = e.width, s = e.height;
			(i !== a || s !== o || n !== c) && (a = i, o = s, c = n, r.postMessage({
				type: "viewport",
				viewport: {
					cssWidth: i,
					cssHeight: s,
					devicePixelRatio: n
				}
			}));
		}, d = () => {
			l?.(), l = n(u);
		};
		u();
		let f = new ResizeObserver(d);
		return f.observe(t), window.addEventListener("resize", d), () => {
			l?.(), l = null, window.removeEventListener("resize", d), f.disconnect(), A.current = window.setTimeout(() => {
				let e = k.current;
				e && (e.postMessage({ type: "dispose" }), e.terminate(), k.current = null, P.current = null, F.current = { phase: "idle" }, Te({ phase: "idle" }), Ee(null), A.current = null);
			}, 0);
		};
	}, [s]), b(() => {
		if (!h) return;
		let e = k.current;
		if (!e) return;
		L.current = !1, R.current = !1, z.current += 1;
		let t = j.current + 1;
		j.current = t, B.current = [], V.current = "latest";
		let n = Q ? new le() : null, r = !0, i, a, o = !1, s = !1, c = 0;
		H.current = n, J(!1), Y(!1), Ae("disabled"), Ee(null), M.current = !1, N.current = void 0, $(), e.postMessage({
			type: "reset",
			generation: t
		});
		let l = (t, n) => {
			we(e, t, j.current, n) && (M.current = !0, $());
		}, p = (e) => {
			e.some((e) => e.annotation === null) && J(!0);
			for (let t of e) l(t.frame, t.annotation);
			Y((n?.pendingFrameCount ?? 0) > 0), $(), m();
		};
		function m() {
			let e = n, t = d.getMessagesInTimeRange?.bind(d), l = e?.pendingRange();
			if (!e || !t || !l || i !== void 0 || o || s) return;
			let u = l.startNs, f = c;
			i = window.setTimeout(() => {
				if (i = void 0, !r || f !== c || o) return;
				let n = e?.pendingRange();
				if (!n || n.startNs !== u) {
					m();
					return;
				}
				o = !0;
				let l = new AbortController();
				a = l, t({
					start: te(n.startNs),
					end: te(n.endNs),
					topics: [Q]
				}).then((t) => {
					if (r && !l.signal.aborted && f === c) {
						for (let n of t) p(e.pushAnnotation(n));
						p(e.confirmThrough(n.endNs));
					}
				}).catch((e) => {
					!l.signal.aborted && f === c && (s = !0, console.warn("ImagePanel: exceptional annotation gap read failed", e));
				}).finally(() => {
					f === c && (a === l && (a = void 0), o = !1, r && !s && m());
				});
			}, 250);
		}
		X.current = () => {
			c += 1, i !== void 0 && (window.clearTimeout(i), i = void 0), a?.abort(), a = void 0, o = !1, s = !1;
		}, _e.current = p;
		let g = (e) => {
			if (R.current) {
				ve(B.current, e), $();
				return;
			}
			n ? p(n.pushFrame(e)) : l(e);
		}, ee = (e) => {
			for (let t of e) ie(t) ? g(t) : l(t);
		};
		n && d.registerHighFrequencyConsumer(je, {
			topic: Q,
			lane: "video",
			mode: "all",
			onMessageBatch: (e) => {
				for (let t of e) p(n.pushAnnotation(t));
			}
		}), u(Ne) && (L.current = !0, V.current = "all");
		let _ = async (t, r) => {
			if (!t) return !1;
			let i = z.current + 1;
			z.current = i;
			let a = [...B.current];
			R.current = !0, $(), Q && Y(!0), I.current?.abort();
			let o = new AbortController();
			I.current = o;
			try {
				let s = await ge({
					player: d,
					worker: e,
					topic: h,
					targetTime: t,
					codec: a.map(T).find(Boolean) ?? void 0,
					liveEvents: a,
					signal: o.signal,
					preserveFrame: r,
					generation: j.current,
					annotationTopic: Q || void 0,
					onAnnotationGap: () => J(!0)
				});
				if (o.signal.aborted || i !== z.current) return !1;
				if (!s) return Y(!1), !1;
				let c = v(t), u = B.current.filter((e) => v(e.receiveTime) > c);
				B.current = [], Y(!1);
				for (let e of u) n ? p(n.pushFrame(e)) : l(e);
				return !0;
			} catch (e) {
				return o.signal.aborted || i !== z.current ? !1 : (console.warn("ImagePanel: video bootstrap failed", e), Y(!1), !1);
			} finally {
				i === z.current && (B.current = [], I.current === o && (R.current = !1, I.current = null, $()));
			}
		};
		U.current = _, W.current = () => {
			if (!L.current || R.current) return;
			let e = d.getCurrentTime();
			e && _(e, !0);
		};
		let y = async (e) => {
			if (L.current) {
				e && g(e);
				return;
			}
			L.current = !0, e && ve(B.current, e), V.current !== "all" && (V.current = "all", d.unregisterHighFrequencyConsumer(Z), d.registerHighFrequencyConsumer(Z, {
				topic: h,
				lane: "video",
				mode: "all",
				onMessageBatch: ee
			}));
			let t = d.getCurrentTime();
			t && await _(t, !1);
		}, b = (e) => {
			if (ie(e)) {
				if (!L.current) {
					y(e);
					return;
				}
				g(e);
				return;
			}
			g(e);
		};
		if (V.current === "all") {
			d.registerHighFrequencyConsumer(Z, {
				topic: h,
				lane: "video",
				mode: "all",
				onMessageBatch: ee
			});
			let e = d.getCurrentTime();
			e && _(e, !1);
		} else d.registerHighFrequencyConsumer(Z, {
			topic: h,
			lane: "video",
			mode: "latest",
			onLatestMessage: b,
			onMessageBatch: (e) => {
				if (L.current) return;
				let t = e.at(-1);
				t && b(t);
			}
		});
		return () => {
			r = !1, X.current?.(), X.current = null, z.current += 1, j.current += 1, I.current?.abort(), I.current = null, B.current = [], R.current = !1, H.current = null, _e.current = null, U.current = null, W.current = null, d.unregisterHighFrequencyConsumer(Z), n && d.unregisterHighFrequencyConsumer(je), M.current = !1, N.current = void 0, d.unregisterRenderHealth?.(f), e.postMessage({
				type: "reset",
				generation: j.current
			});
		};
	}, [
		je,
		Z,
		d,
		f,
		Q,
		h,
		Ne
	]), b(() => () => {
		I.current?.abort(), I.current = null;
	}, [d, h]), b(() => d.subscribeSeek((e) => {
		j.current += 1, G.current = v(e), H.current?.reset(), B.current = [], M.current = !1, N.current = void 0, J(!1), Y(Q.length > 0), X.current?.(), $();
		let t = k.current;
		t && h && L.current ? U.current?.(e, !0) : t?.postMessage({
			type: "reset",
			preserveFrame: !0,
			generation: j.current
		});
	}), [
		d,
		Q,
		h
	]), b(() => d.subscribeCurrentTime((e) => {
		k.current?.postMessage({
			type: "playback",
			currentTime: e,
			isPlaying: l
		});
		let t = v(e), n = G.current;
		if (n != null && t + 5000000n < n) {
			let t = k.current;
			t && h && L.current ? U.current?.(e, !0) : t?.postMessage({
				type: "reset",
				preserveFrame: !0,
				generation: j.current
			});
		}
		G.current = t;
	}), [
		l,
		d,
		h
	]), b(() => {
		let e = k.current;
		e && e.postMessage({
			type: "rawDecodeOptions",
			options: be({
				colorMode: ce,
				colorMap: ue,
				gradient: D,
				flatColor: O,
				explicitAlpha: de,
				minValue: fe,
				maxValue: pe
			})
		});
	}, [
		ce,
		ue,
		D,
		O,
		de,
		fe,
		pe
	]), b(() => {
		let e = {
			backgroundColor: _,
			flipHorizontal: E,
			flipVertical: ae,
			rotationDeg: oe,
			smoothing: se,
			fitMode: w
		};
		k.current?.postMessage({
			type: "renderOptions",
			options: e
		});
	}, [
		_,
		E,
		ae,
		oe,
		se,
		w
	]);
	let Fe = K.phase === "idle" ? s({ id: "panels.image.status.noImageAtCurrentTime" }) : xe(K);
	return /* @__PURE__ */ re("div", {
		className: "flex flex-col h-full overflow-hidden relative",
		style: { background: _ },
		"data-testid": "image-panel",
		"data-video-codec": q?.codec,
		"data-video-pressure": q?.pressureMode,
		"data-video-queue-frames": q?.queueFrames,
		"data-video-dropped-frames": q?.droppedFrames,
		"data-video-decode-queue": q?.decodeQueueSize,
		"data-video-media-lag-ms": q?.mediaLagMs,
		"data-video-resync-count": q?.resyncCount,
		"data-video-rendered-frames": q?.renderedFrames,
		"data-video-waiting-for-random-access": q ? String(q.waitingForRandomAccess) : void 0,
		"data-annotation-state": Q && Oe ? "buffering" : ke,
		children: [/* @__PURE__ */ C(i, {
			className: "border-zinc-800 bg-zinc-950",
			children: /* @__PURE__ */ C(r, {
				value: h,
				onChange: (e) => m((t) => o(e, t)),
				typeIncludes: [...c],
				placeholder: s({ id: "panels.framework.topicPicker.imagePlaceholder" }),
				className: "min-w-0 flex-1",
				triggerClassName: "border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50"
			})
		}), /* @__PURE__ */ re("div", {
			ref: he,
			className: "flex-1 relative min-h-0 min-w-0 flex items-center justify-center",
			children: [
				/* @__PURE__ */ C("canvas", {
					ref: me,
					className: "w-full h-full block",
					"data-testid": "image-panel-canvas"
				}),
				y && Fe && /* @__PURE__ */ C("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 italic text-xs",
					children: Fe
				}),
				Oe && /* @__PURE__ */ C("div", {
					className: "absolute top-1 left-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-muted-foreground",
					children: s({ id: "panels.image.status.waitingForAnnotation" })
				}),
				De && /* @__PURE__ */ C("div", {
					className: "absolute top-1 right-1 rounded border border-border bg-card/90 px-2 py-1 text-[10px] text-amber-600",
					"data-testid": "image-annotation-gap-warning",
					children: s({ id: "panels.image.warning.annotationGap" })
				}),
				y && K.phase === "ready" && K.width && K.height && /* @__PURE__ */ re("div", {
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
function xe(e) {
	return e.phase === "error" ? e.message ?? "Image decode failed" : e.phase === "stalled" ? e.message ?? "Video stalled — recovering" : e.phase === "decoding" && !e.width && !e.height ? "Decoding latest frame..." : null;
}
function Se(e, t) {
	return e.phase === t.phase && e.width === t.width && e.height === t.height && e.encoding === t.encoding && e.message === t.message;
}
function Ce(e) {
	if (e?.durationSec != null && Number.isFinite(e.durationSec) && e.durationSec > 0 && e.messageCount != null && e.messageCount > 1) return e.durationSec * 1e3 / (e.messageCount - 1);
	if (e?.frequency != null && Number.isFinite(e.frequency) && e.frequency > 0) return 1e3 / e.frequency;
}
function we(e, t, n, r) {
	let i = w(t, { transferOwnership: !0 });
	return i ? (i.frame.annotation = r, e.postMessage({
		type: "frame",
		frame: i.frame,
		generation: n
	}, i.transfer), !0) : !1;
}
//#endregion
export { K as ImagePanel };
