import { f as e, i as t, t as n } from "./rafScheduler-CNDq0Etb.js";
import { t as r } from "./TopicQuickPicker-vzANSyR_.js";
import { t as i } from "./PanelTopicBar-DQnIAHFk.js";
import { _ as a, c as o, d as s, g as c, h as l, l as u, m as d, n as ee, o as te, p as f, r as ne, v as p, y as re } from "./imageAnnotations-DwyUos7b.js";
import { o as m, t as h } from "./time-BoEDgjoH.js";
import { useEffect as g, useRef as _, useState as ie } from "react";
import { jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/features/panels/Image/core/messageFrameAdapter.ts
function b(e, t = {}) {
	let n = e.message;
	if (u(n)) {
		let r = f(n.data, t);
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
		let r = f(n.data, t);
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
function x(e) {
	let t = e.message;
	return u(t) ? p(o(t)) : null;
}
function ae(e) {
	return x(e) !== null;
}
function S(e) {
	let t = e.message;
	return u(t) && p(t.format) ? t.data : null;
}
//#endregion
//#region src/features/panels/Image/core/videoQueue.ts
function C(e, t, n = [], r = !1) {
	let i = w(e, t);
	if (i < 0) return {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	if (i === 0) return r ? {
		frames: re(e, t[0].data) ? [...t] : [...n, ...t],
		droppedFrames: 0,
		resync: !0
	} : {
		frames: [...t],
		droppedFrames: 0,
		resync: !1
	};
	let o = a(e, t[i].data), s = e === "h264" ? o.includes(7) : o.includes(32) || o.includes(33), c = s ? [] : T(e, t, i), l = [...s || c.length > 0 ? c : [...n], ...t.slice(i)], u = i - c.length;
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
function w(e, t) {
	for (let n = t.length - 1; n >= 0; --n) if (l(e, t[n].data)) return n;
	return -1;
}
function T(e, t, n) {
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
var E = [
	2e3,
	5e3,
	1e4,
	3e4
], D = 2e3;
function O(e, t) {
	let n = m(e.receiveTime) - m(t.receiveTime);
	return n < 0n ? -1 : +(n > 0n);
}
function k(e) {
	return [...e].sort(O);
}
function A(e, t) {
	let n;
	for (let r of e) {
		let e = x(r);
		!e || t && e !== t || (!n || m(r.receiveTime) > m(n)) && (n = r.receiveTime);
	}
	return n;
}
function j(e, t) {
	for (let n of k(e)) {
		if (x(n) !== t) continue;
		let e = S(n);
		if (e && l(t, e)) return n.receiveTime;
	}
}
function M(e, t) {
	return e.some((e) => e.kind === "compressed" && p(e.format) === t && l(t, e.data));
}
function N(e, t, n) {
	let r = m(t), i = k(e.filter((e) => x(e) === n && m(e.receiveTime) <= r)).flatMap((e) => {
		let t = S(e);
		return t ? [{
			event: e,
			data: t
		}] : [];
	});
	return i.some(({ data: e }) => l(n, e)) ? F(n, C(n, i).frames).map(({ event: e }) => e) : [];
}
function P(e, t, n, r = {}) {
	let i = N(e, t, n);
	if (i.length > 0) return i;
	let a = j(e, n);
	if (!a) return [];
	let o = [
		r.coverageEndTime ?? t,
		t,
		a
	].map(m).reduce((e, t) => t > e ? t : e);
	return N(e, {
		sec: Number(o / 1000000000n),
		nsec: Number(o % 1000000000n)
	}, n);
}
function F(e, t) {
	let n = t.findIndex(({ data: t }) => l(e, t));
	return n < 0 || n >= 180 ? [] : t.slice(0, 180);
}
function I(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => {
		let n = S(e), r = 2166136261;
		if (n) for (let e of n) r = Math.imul(r ^ e, 16777619) >>> 0;
		let i = `${e.receiveTime.sec}:${e.receiveTime.nsec}:${e.publishTime.sec}:${e.publishTime.nsec}:${n?.byteLength ?? 0}:${r}`;
		return !t.has(i) && (t.add(i), !0);
	});
}
function L(e, t) {
	let n = [], r = [];
	for (let i of e) {
		let e = b(i, { transferOwnership: t });
		e && (n.push(e.frame), r.push(...e.transfer));
	}
	return {
		frames: n,
		transfer: r
	};
}
async function R(e, t, n, r = {}) {
	if (!e.getMessagesInTimeRange || r.signal?.aborted) return null;
	let i = r.coverageEndTime ?? n, a = h(i, D);
	for (let o of E) {
		let s = (await e.getMessagesInTimeRange({
			start: h(n, -o),
			end: a,
			topics: [t]
		})).filter((e) => e.topic === t);
		if (r.signal?.aborted) return null;
		let c = r.codec ?? s.map(x).find(Boolean) ?? null;
		if (!c) continue;
		let l = P(s, n, c, { coverageEndTime: i });
		if (l.length > 0) return {
			codec: c,
			events: l
		};
	}
	return null;
}
async function oe(e) {
	let { player: t, worker: n, topic: r, targetTime: i, liveEvents: a = [], signal: o, preserveFrame: s = !1, transferOwnership: c = !1 } = e;
	if (o?.aborted) return !1;
	let l = e.codec ?? a.map(x).find(Boolean) ?? void 0, u = await R(t, r, i, {
		signal: o,
		coverageEndTime: A(a, l) ?? i,
		codec: l
	});
	if (!u || o?.aborted) return !1;
	let d = L(I(k([...u.events, ...a.filter((e) => x(e) === u.codec)])), c);
	return M(d.frames, u.codec) ? (n.postMessage({
		type: "bootstrapVideo",
		codec: u.codec,
		frames: d.frames,
		preserveFrame: s
	}, d.transfer), !0) : !1;
}
//#endregion
//#region src/features/panels/Image/core/ImageRender.worker.ts?worker&inline
var z = "function e(e,t,n){let r=e+t-n,i=Math.abs(r-e),a=Math.abs(r-t),o=Math.abs(r-n);return i<=a&&i<=o?e:a<=o?t:n}function t(e,t,n){for(let r=0;r<n;r++)t[r]=e[r]}function n(e,t,n,r){let i=0;for(;i<r;i++)t[i]=e[i];for(;i<n;i++)t[i]=e[i]+t[i-r]&255}function r(e,t,n,r){if(n.length===0){for(let n=0;n<r;n++)t[n]=e[n];return}for(let i=0;i<r;i++)t[i]=e[i]+n[i]&255}function i(e,t,n,r,i){let a=0;if(n.length===0){for(;a<i;a++)t[a]=e[a];for(;a<r;a++)t[a]=e[a]+(t[a-i]>>1)&255;return}for(;a<i;a++)t[a]=e[a]+(n[a]>>1)&255;for(;a<r;a++)t[a]=e[a]+(t[a-i]+n[a]>>1)&255}function a(t,n,r,i,a){let o=0;if(r.length===0){for(;o<a;o++)n[o]=t[o];for(;o<i;o++)n[o]=t[o]+n[o-a]&255;return}for(;o<a;o++)n[o]=t[o]+r[o]&255;for(;o<i;o++)n[o]=t[o]+e(n[o-a],r[o],r[o-a])&255}function o(e,o,s){let c=o*2,l=s*(1+c);if(e.byteLength!==l)throw Error(`PNG inflated length ${e.byteLength} !== expected ${l}`);let u=new Uint8Array(s*c),d=new Uint8Array,f=0;for(let o=0;o<s;o++){let s=e[f++],l=e.subarray(f,f+c);f+=c;let p=u.subarray(o*c,(o+1)*c);switch(s){case 0:t(l,p,c);break;case 1:n(l,p,c,2);break;case 2:r(l,p,d,c);break;case 3:i(l,p,d,c,2);break;case 4:a(l,p,d,c,2);break;default:throw Error(`Unsupported PNG filter type: ${s}`)}d=p}for(let e=0;e<u.length;e+=2){let t=u[e];u[e]=u[e+1],u[e+1]=t}return u}const s=new Uint8Array([137,80,78,71,13,10,26,10]);function c(e){let t=Math.max(0,e.byteLength-s.byteLength);for(let n=0;n<=t;n++){let t=!0;for(let r=0;r<s.byteLength;r++)if(e[n+r]!==s[r]){t=!1;break}if(t)return n}return-1}function l(e,t){return e.getUint32(t,!1)}function u(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=[],r=s.byteLength;for(;r+8<=e.byteLength;){let i=l(t,r),a=String.fromCharCode(e[r+4],e[r+5],e[r+6],e[r+7]),o=r+8,s=o+i;if(s+4>e.byteLength)throw Error(`PNG chunk exceeds buffer bounds`);if(a===`IDAT`&&n.push(e.subarray(o,s)),a===`IEND`)break;r=s+4}if(n.length===0)throw Error(`PNG is missing IDAT chunks`);let i=n.reduce((e,t)=>e+t.byteLength,0),a=new Uint8Array(i),o=0;for(let e of n)a.set(e,o),o+=e.byteLength;return a}async function d(e){if(typeof DecompressionStream>`u`)throw Error(`DecompressionStream is not supported in this environment`);let t=new Uint8Array(e.byteLength);t.set(e);let n=new Blob([t.buffer]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(n).arrayBuffer())}function f(e){if(e.byteLength<s.byteLength+8+13)throw Error(`PNG buffer is too small`);for(let t=0;t<s.byteLength;t++)if(e[t]!==s[t])throw Error(`Invalid PNG signature`);let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=l(t,s.byteLength);if(String.fromCharCode(e[s.byteLength+4],e[s.byteLength+5],e[s.byteLength+6],e[s.byteLength+7])!==`IHDR`||n!==13)throw Error(`PNG is missing IHDR chunk`);let r=s.byteLength+8;return{width:l(t,r),height:l(t,r+4),bitDepth:e[r+8],colorType:e[r+9]}}async function p(e){let{width:t,height:n,bitDepth:r,colorType:i}=f(e);if(t<=0||n<=0)throw Error(`Invalid PNG dimensions: ${t}x${n}`);if(r!==16||i!==0)throw Error(`Compressed depth PNG must be 16-bit grayscale (got depth=${r}, colorType=${i})`);return{width:t,height:n,data:o(await d(u(e)),t,n)}}function m(e){let t=[],n=0;for(;n<e.byteLength-2;){let r=ee(e,n);if(r<0)break;let i=r+(e[r+2]===1?3:4);i<e.byteLength&&t.push(i),n=i+1}return t.length===0?e.byteLength>0?[{offset:0,end:e.byteLength}]:[]:t.map((n,r)=>({offset:n,end:r+1<t.length?g(e,t[r+1]):e.byteLength}))}function h(e){let t=new Uint8Array(e.byteLength),n=0,r=0;for(let i of e){if(r>=2&&i===3){r=0;continue}t[n]=i,n+=1,r=i===0?r+1:0}return t.subarray(0,n)}function g(e,t){return t>=4&&e[t-4]===0&&e[t-3]===0&&e[t-2]===0&&e[t-1]===1?t-4:t-3}function ee(e,t){for(let n=t;n<e.byteLength-2;n+=1)if(e[n]===0&&e[n+1]===0&&(e[n+2]===1||n+3<e.byteLength&&e[n+2]===0&&e[n+3]===1))return n;return-1}function te(e){return re(e)?`key`:`delta`}function ne(e){return _(e).includes(5)}function re(e){for(let t of _(e))if(t===5||t===7||t===8)return!0;return!1}function ie(e){for(let{offset:t}of m(e)){if((e[t]&31)!=7||t+3>=e.byteLength)continue;let n=e[t+1],r=e[t+2],i=e[t+3];return`avc1.${v(n)}${v(r)}${v(i)}`}return null}function ae(e){let t=ie(e),n=[t,t?`avc1.${t.slice(5,7)}00${t.slice(-2)}`:null,`avc1.42E01E`,`avc1.4D4020`,`avc1.640028`];return[...new Set(n.filter(e=>e!=null))]}function _(e){return m(e).map(({offset:t})=>e[t]&31)}function v(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function y(e){return m(e).flatMap(({offset:t})=>t+1<e.byteLength?[e[t]>>1&63]:[])}function oe(e){return y(e).some(e=>e===19||e===20||e===21)}function se(e){return y(e).some(e=>e===32||e===33||e===34)}function ce(e){return y(e).some(e=>e<=31)}function le(e){return oe(e)||se(e)?`key`:`delta`}function ue(e){for(let t of m(e)){if(t.offset+1>=t.end||(e[t.offset]>>1&63)!=33)continue;let n=h(e.subarray(t.offset+2,t.end));if(n.byteLength<13)continue;let r=n[1],i=fe(r>>6),a=r&32?`H`:`L`,o=r&31,s=pe((n[2]<<24|n[3]<<16|n[4]<<8|n[5])>>>0),c=n[12],l=[...n.subarray(6,12)];for(;l.at(-1)===0;)l.pop();let u=l.length?`.${l.map(me).join(``)}`:``;return`${i}${o}.${s.toString(16).toUpperCase()}.${a}${c}${u}`}return null}function de(e){let t=[ue(e),`1.6.L93.B0`,`1.6.L120.B0`,`1.6.L123.B0`,`1.6.L150.B0`].flatMap(e=>e?[`hev1.${e}`,`hvc1.${e}`]:[]);return[...new Set(t)]}function fe(e){return[``,`A`,`B`,`C`][e&3]??``}function pe(e){let t=e>>>0,n=0;for(let e=0;e<32;e+=1)n=(n<<1|t&1)>>>0,t>>>=1;return n}function me(e){return e.toString(16).padStart(2,`0`).toUpperCase()}function b(e){let t=e.trim().toLowerCase();return/\\b(?:h264|avc)\\b/.test(t)?`h264`:/\\b(?:h265|hevc)\\b/.test(t)?`h265`:null}function x(e,t){return e===`h264`?_(t):y(t)}function S(e,t){return e===`h264`?ne(t):oe(t)}function he(e,t){return e===`h264`?_(t).some(e=>e===7||e===8):se(t)}function ge(e,t){return e===`h264`?_(t).some(e=>e===1||e===5):ce(t)}function _e(e,t){return e===`h264`?te(t):le(t)}function ve(e,t){return e===`h264`?ae(t):de(t)}function ye(e,t){return e===`h264`?ie(t):ue(t)}function be(e,t){let n=x(e,t);return e===`h264`?n.includes(7):n.includes(32)||n.includes(33)}function C(e,t){return he(e,t)&&!ge(e,t)}function xe(e,t){let n=Number(e/1000n);return Math.max(n,t+1)}const Se=/\\b(jpeg|jpg|png|webp|gif|avif|bmp)\\b/i,Ce=new Set([`16uc1`,`32fc1`,`mono16`,`mono8`,`8uc1`,`rgb8`,`bgr8`,`rgba8`,`bgra8`,`8uc3`]);function we(e){return e.trim().toLowerCase()}function Te(e){let t=we(e);return t===`16uc1`||t===`mono16`?`16uc1`:t===`32fc1`?`32fc1`:null}function Ee(e){let t=e.trim().toLowerCase();if(t.includes(`compresseddepth`))return/\\brvl\\b/.test(t)?`rvl`:`png`}function w(e){let t=e.trim(),n=t.split(`;`).map(e=>e.trim()).filter(Boolean),r=n[0]?we(n[0]):void 0,i=n.length>1?n.slice(1).join(`;`).trim():void 0;return{rawEncoding:r,transport:i,depthCodec:i?Ee(i):void 0,bitmapKind:E(t)}}function T(e){let t=w(e);return t.depthCodec!=null&&Te(t.rawEncoding??``)!=null}function De(e){return T(e)?Te(w(e).rawEncoding??``):null}function E(e){let t=b(e);if(t)return t;let n=e.match(Se);if(!n||!n[1])return null;let r=n[1].toLowerCase();return r===`jpg`||r===`jpeg`?`jpeg`:r===`png`||r===`webp`||r===`gif`||r===`avif`||r===`bmp`?r:null}function D(e){return e.byteLength>=3&&e[0]===255&&e[1]===216&&e[2]===255?`image/jpeg`:e.byteLength>=8&&e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71&&e[4]===13&&e[5]===10&&e[6]===26&&e[7]===10?`image/png`:e.byteLength>=12&&e[0]===82&&e[1]===73&&e[2]===70&&e[3]===70&&e[8]===87&&e[9]===69&&e[10]===66&&e[11]===80?`image/webp`:null}function Oe(e,t){if(T(e))throw Error(`Compressed depth format must not use bitmap MIME routing: ${e}`);let n=E(e);if(n===`jpeg`)return`image/jpeg`;if(n===`png`||n===`webp`||n===`gif`||n===`avif`||n===`bmp`)return`image/${n}`;let r=e.split(`;`)[0]?.trim().split(/\\s+/)[0]?.toLowerCase();if(!r)return t?D(t)??`image/jpeg`:`image/jpeg`;if(r.startsWith(`image/`))return r;if(r===`jpg`)return`image/jpeg`;if(Ce.has(r)){let n=t?D(t):null;if(n)return n;throw Error(`Unsupported compressed image format token: ${e}`)}return t?D(t)??`image/jpeg`:`image/jpeg`}function ke(e){return c(e)}function Ae(e,t){if(t<4)return{compressionFormat:0,depthParam:[0,0]};let n=new DataView(e.buffer,e.byteOffset,e.byteLength);return{compressionFormat:n.getInt32(0,!0),depthParam:[n.getFloat32(4,!0),n.getFloat32(8,!0)]}}async function je(e){let t=ke(e);if(t<0)throw Error(`Compressed depth payload does not contain a PNG signature`);let n=await p(e.subarray(t));return{width:n.width,height:n.height,data:n.data}}async function Me(e){let{width:t,height:n,data:r}=await je(e);return{encoding:`16uc1`,width:t,height:n,step:t*2,isBigEndian:!1,data:r}}async function Ne(e,t){let{width:n,height:r,data:i}=await je(e),[a,o]=t.depthParam,s=new Uint8Array(n*r*4),c=new DataView(s.buffer,s.byteOffset,s.byteLength),l=new DataView(i.buffer,i.byteOffset,i.byteLength);for(let e=0;e<n*r;e++){let t=l.getUint16(e*2,!0),n=0;t!==0&&(n=a/(t-o),Number.isFinite(n)||(n=0)),c.setFloat32(e*4,n,!0)}return{encoding:`32fc1`,width:n,height:r,step:n*4,isBigEndian:!1,data:s}}async function Pe(e,t){if(!T(t))throw Error(`Not a compressed depth format: ${t}`);if(w(t).depthCodec===`rvl`)throw Error(`RVL compressed depth is not supported yet`);let n=De(t);if(!n)throw Error(`Unsupported compressed depth encoding in format: ${t}`);let r=ke(e);if(r<0)throw Error(`Compressed depth payload is missing PNG data`);if(r<12&&e.byteLength<12)throw Error(`Compressed depth payload is too small`);let i=Ae(e,r);return n===`16uc1`?Me(e):Ne(e,i)}const O={colorMode:`colormap`,flatColor:`#ffffff`,gradient:[`#000000`,`#ffffff`],colorMap:`turbo`,explicitAlpha:1};function k(e,t,n){return Math.max(t,Math.min(n,e))}const Fe={r:0,g:0,b:0,a:0},Ie={r:0,g:0,b:0,a:0};function A(e,t){let n=t.trim(),r=n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(r){let t=r[1];return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e.r=parseInt(t.slice(0,2),16)/255,e.g=parseInt(t.slice(2,4),16)/255,e.b=parseInt(t.slice(4,6),16)/255,e.a=1,e}let i=n.match(/^rgba?\\(\\s*([0-9.]+)\\s*,\\s*([0-9.]+)\\s*,\\s*([0-9.]+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)$/i);return i?(e.r=Number(i[1])/255,e.g=Number(i[2])/255,e.b=Number(i[3])/255,e.a=i[4]==null?1:Number(i[4]),e):(e.r=e.g=e.b=e.a=1,e)}function Le(e,t,n,r){let i=k(r,0,1);e.r=t.r+(n.r-t.r)*i,e.g=t.g+(n.g-t.g)*i,e.b=t.b+(n.b-t.b)*i,e.a=t.a+(n.a-t.a)*i}function Re(e,t){let n=(1-k(t,0,1))*5+1,r=Math.floor(n),i=n%1;r%2<1&&(i=1-i);let a=1-i;r<=1?(e.r=a,e.g=0,e.b=1):r===2?(e.r=0,e.g=a,e.b=1):r===3?(e.r=0,e.g=1,e.b=a):r===4?(e.r=a,e.g=1,e.b=0):(e.r=1,e.g=a,e.b=0),e.a=1}const j=[.13572138,4.6153926,-42.66032258,132.13108234],M=[.09140261,2.19418839,4.84296658,-14.18503333],N=[.1066733,12.64194608,-60.58204836,110.36276771],ze=[-152.94239396,59.28637943],Be=[4.27729857,2.82956604],Ve=[-89.90310912,27.34824973];function He(e,t){let n=k(t,0,1)*.99+.01,r=n*n,i=r*n,a=1*j[0]+n*j[1]+r*j[2]+i*j[3],o=1*M[0]+n*M[1]+r*M[2]+i*M[3],s=1*N[0]+n*N[1]+r*N[2]+i*N[3],c=r*r,l=i*r,u=c*ze[0]+l*ze[1],d=c*Be[0]+l*Be[1],f=c*Ve[0]+l*Ve[1];e.r=k(a+u,0,1),e.g=k(o+d,0,1),e.b=k(s+f,0,1),e.a=1}const Ue=65535;let P;function We(e,t){if(!P){P=new Float32Array(Ue*3);let e={r:0,g:0,b:0,a:0};for(let t=0;t<Ue;t++){He(e,t/65534);let n=t*3;P[n+0]=e.r,P[n+1]=e.g,P[n+2]=e.b}}let n=Math.trunc(t*65534)*3;e.r=P[n+0],e.g=P[n+1],e.b=P[n+2],e.a=1}function Ge(e,t){let n=t>>>0;e.a=((n&4278190080)>>>24)/255,e.r=((n&16711680)>>>16)/255,e.g=((n&65280)>>>8)/255,e.b=((n&255)>>>0)/255}function F(e,t,n){let r=e.colorMode;if(r===`rgba-fields`)throw Error(`rgba-fields color mode is not supported for scalar depth images`);switch(r){case`flat`:{let t=A(Fe,e.flatColor);return e=>{e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}}case`gradient`:{let r=Math.max(n-t,2**-52),i=A(Fe,e.gradient[0]),a=A(Ie,e.gradient[1]);return(e,n)=>{let o=Math.max(0,Math.min((n-t)/r,1));Le(e,i,a,o)}}case`colormap`:{let r=Math.max(n-t,2**-52);return e.colorMap===`turbo`?(n,i)=>{We(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}:(n,i)=>{Re(n,Math.max(0,Math.min((i-t)/r,1))),n.a=e.explicitAlpha}}case`rgb`:return(t,n)=>{Ge(t,n),t.a=e.explicitAlpha};case`rgba`:return(e,t)=>{Ge(e,t)};default:throw Error(`Unsupported color mode: ${String(r)}`)}}const I=1e4,Ke=/depth|aligned_depth|compressed_depth/i,qe=/wrist|hand|left|right|gripper|eef|end_effector/;function L(e){return e.trim().toLowerCase()}function R(e){let t=L(e);return t===`16uc1`||t===`mono16`}function Je(e){return L(e)===`32fc1`}function Ye(e){return Ke.test(e)}function Xe(e){let t=e.trim().toLowerCase();if(!t)return null;let n=Ye(t),r=!n&&qe.test(t),i={colorMode:`colormap`,colorMap:`turbo`};return n?{...i,minValue:200,maxValue:I}:r?{...i,minValue:0,maxValue:1e3}:null}function Ze(e,t){let n=t?Xe(t):null;return n?n.minValue:R(e)?200:0}function Qe(e,t){let n=t?Xe(t):null;return n?n.maxValue:Je(e)?1:R(e)?I:65535}function $e(e,t,n){return{minValue:t?.minValue??Ze(e,n),maxValue:t?.maxValue??Qe(e,n)}}function et(e,t,n,r,i,a){a[i]=e+Math.trunc(1403*r/1e3),a[i+1]=e-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+2]=e+Math.trunc(1770*t/1e3),a[i+3]=255,a[i+4]=n+Math.trunc(1403*r/1e3),a[i+5]=n-Math.trunc(344*t/1e3)-Math.trunc(714*r/1e3),a[i+6]=n+Math.trunc(1770*t/1e3),a[i+7]=255}function tt(e,t,n,r,i){if(r<t*2)throw Error(`UYVY image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t]-128,s=e[t+1],c=e[t+2]-128,l=e[t+3];et(s,o,l,c,a,i),a+=8}}}function nt(e,t,n,r,i){if(r<t*2)throw Error(`YUYV image row step (${r}) must be at least 2*width (${t*2})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r+=2){let t=n+r*2,o=e[t],s=e[t+1]-128,c=e[t+2];et(o,s,c,e[t+3]-128,a,i),a+=8}}}function rt(e,t,n,r,i){if(r<t*3)throw Error(`RGB8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=255}}}function it(e,t,n,r,i){if(r<t*4)throw Error(`RGBA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t],i[a++]=e[t+1],i[a++]=e[t+2],i[a++]=e[t+3]}}}function at(e,t,n,r,i){if(r<t*4)throw Error(`BGRA8 image row step (${r}) must be at least 4*width (${t*4})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*4;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=e[t+3]}}}function ot(e,t,n,r,i){if(r<t*3)throw Error(`BGR8 image row step (${r}) must be at least 3*width (${t*3})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=n+r*3;i[a++]=e[t+2],i[a++]=e[t+1],i[a++]=e[t],i[a++]=255}}}function st(e,t,n,r,i,a,o){if(r<t*4)throw Error(`Float image row step (${r}) must be at least 4*width (${t*4})`);let{minValue:s,maxValue:c}=$e(`32fc1`,o),l;try{l=F(o,s,c)}catch{l=F({...O,colorMode:`gradient`},s,c)}let u={r:0,g:0,b:0,a:0},d=new DataView(e.buffer,e.byteOffset,e.byteLength),f=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=d.getFloat32(n+e*4,!i);l(u,t),a[f++]=Math.round(z(u.r)*255),a[f++]=Math.round(z(u.g)*255),a[f++]=Math.round(z(u.b)*255),a[f++]=Math.round(z(u.a)*255)}}}function z(e){return Math.max(0,Math.min(1,e))}function ct(e,t,n,r,i){if(r<t)throw Error(`Mono8 image row step (${r}) must be at least width (${t})`);let a=0;for(let o=0;o<n;o++){let n=o*r;for(let r=0;r<t;r++){let t=e[n+r];i[a++]=t,i[a++]=t,i[a++]=t,i[a++]=255}}}function lt(e,t,n,r,i,a,o,s){if(r<t*2)throw Error(`Mono16 image row step (${r}) must be at least 2*width (${t*2})`);let{minValue:c,maxValue:l}=$e(s,o),u;try{u=F(o,c,l)}catch{u=F({...O,colorMode:`gradient`},c,l)}let d={r:0,g:0,b:0,a:0},f=new DataView(e.buffer,e.byteOffset,e.byteLength),p=0;for(let e=0;e<n;e++){let n=e*r;for(let e=0;e<t;e++){let t=f.getUint16(n+e*2,!i);u(d,t),a[p++]=Math.round(z(d.r)*255),a[p++]=Math.round(z(d.g)*255),a[p++]=Math.round(z(d.b)*255),a[p++]=Math.round(z(d.a)*255)}}}function B(e,t,n,r){return Function(`data`,`width`,`height`,`step`,`output`,`\n      if (step < width) {\n        throw new Error(\\`Bayer image row step (\\${step}) must be at least width (\\${width})\\`);\n      }\n      for (let i = 0; i < height / 2; i++) {\n        let inIdx = i * 2 * step;\n        let outTopIdx = i * 2 * width * 4;\n        let outBottomIdx = (i * 2 + 1) * width * 4;\n        for (let j = 0; j < width / 2; j++) {\n          const tl = data[inIdx++];\n          const tr = data[inIdx++];\n          const bl = data[inIdx + step - 2];\n          const br = data[inIdx + step - 1];\n\n          const ${e} = tl;\n          const ${t} = tr;\n          const ${n} = bl;\n          const ${r} = br;\n\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n          output[outTopIdx++] = r;\n          output[outTopIdx++] = g0;\n          output[outTopIdx++] = b;\n          output[outTopIdx++] = 255;\n\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n          output[outBottomIdx++] = r;\n          output[outBottomIdx++] = g1;\n          output[outBottomIdx++] = b;\n          output[outBottomIdx++] = 255;\n        }\n      }\n    `)}const ut=B(`r`,`g0`,`g1`,`b`),dt=B(`b`,`g0`,`g1`,`r`),ft=B(`g0`,`b`,`r`,`g1`),pt=B(`g0`,`r`,`b`,`g1`);function mt(e){return e.trim().toLowerCase()}function ht(e,t,n){let r=e.width,i=e.height,a=e.step??gt(e),o=e.is_bigendian??!1,s=mt(e.encoding),c=e.data,l={...O,...n};switch(s){case`rgb8`:rt(c,r,i,a,t);return;case`rgba8`:it(c,r,i,a,t);return;case`bgra8`:at(c,r,i,a,t);return;case`bgr8`:case`8uc3`:ot(c,r,i,a,t);return;case`mono8`:case`8uc1`:ct(c,r,i,a,t);return;case`mono16`:case`16uc1`:lt(c,r,i,a,o,t,l,s);return;case`32fc1`:st(c,r,i,a,o,t,l);return;case`uyvy`:case`yuv422`:tt(c,r,i,a,t);return;case`yuyv`:case`yuv422_yuy2`:nt(c,r,i,a,t);return;case`bayer_rggb8`:ut(c,r,i,a,t);return;case`bayer_bggr8`:dt(c,r,i,a,t);return;case`bayer_gbrg8`:ft(c,r,i,a,t);return;case`bayer_grbg8`:pt(c,r,i,a,t);return;default:throw Error(`Unsupported image encoding: ${e.encoding}`)}}function gt(e){switch(mt(e.encoding)){case`rgb8`:case`bgr8`:case`8uc3`:return e.width*3;case`rgba8`:case`bgra8`:case`32fc1`:return e.width*4;case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return e.width*2;case`mono16`:case`16uc1`:return e.width*2;case`mono8`:case`8uc1`:case`bayer_rggb8`:case`bayer_bggr8`:case`bayer_gbrg8`:case`bayer_grbg8`:return e.width;default:return e.width*4}}const V={frames:72,spanMs:350,decodeMs:55,decodeQueueSize:8,mediaLagMs:350},H={frames:18,spanMs:120,decodeMs:32,decodeQueueSize:1,mediaLagMs:120},U={frames:40,spanMs:250,decodeMs:45,decodeQueueSize:6,mediaLagMs:250};function _t(){return{mode:`normal`,healthySamples:0}}function vt(e,t){return e>120||t>1e3}function yt(e,t){let n=t.queueFrames>=V.frames||t.queueSpanMs>=V.spanMs||t.decodeMs>=V.decodeMs||t.decodeQueueSize>=V.decodeQueueSize||t.mediaLagMs>=V.mediaLagMs,r=t.queueFrames<=H.frames&&t.queueSpanMs<=H.spanMs&&t.decodeMs<=H.decodeMs&&t.decodeQueueSize<=H.decodeQueueSize&&t.mediaLagMs<=H.mediaLagMs,i=t.queueFrames>=U.frames||t.queueSpanMs>=U.spanMs||t.decodeMs>=U.decodeMs||t.decodeQueueSize>=U.decodeQueueSize||t.mediaLagMs>=U.mediaLagMs;if(e.mode===`normal`)return n?{mode:`degraded`,healthySamples:0}:e;if(e.mode===`degraded`)return r?{mode:`recovery`,healthySamples:1}:e;if(i)return{mode:`degraded`,healthySamples:0};if(!r)return{mode:`recovery`,healthySamples:0};let a=e.healthySamples+1;return a>=12?{mode:`normal`,healthySamples:0}:{mode:`recovery`,healthySamples:a}}function bt(e,t){return!Number.isFinite(t)||t<0?e:e===0?t:e*.8+t*.2}function W(e,t){return e==null?0:Math.max(0,Number(e-t)/1e6)}function xt(e,t,n=120){return W(e,t)>n}function St(e,t,n){return e&&t!==null&&n<t}function Ct(e,t){return t?{frames:[],droppedFrames:e.length,waitForRandomAccess:!0}:{frames:[...e],droppedFrames:0,waitForRandomAccess:!1}}function wt(e,t,n){if(!C(e,n.data))return[...t];if(e===`h264`||x(e,n.data).includes(32))return be(e,n.data)?[n]:[...t,n];if(x(e,n.data).includes(33)){let r=[...t].reverse().find(t=>x(e,t.data).includes(32));return r?[r,n]:[n]}return[...t,n]}function Tt(e,t,n=[],r=!1){let i=Et(e,t);if(i<0)return{frames:[...t],droppedFrames:0,resync:!1};if(i===0)return r?{frames:be(e,t[0].data)?[...t]:[...n,...t],droppedFrames:0,resync:!0}:{frames:[...t],droppedFrames:0,resync:!1};let a=x(e,t[i].data),o=e===`h264`?a.includes(7):a.includes(32)||a.includes(33),s=o?[]:Dt(e,t,i),c=[...o||s.length>0?s:[...n],...t.slice(i)],l=i-s.length;return l===0?{frames:[...t],droppedFrames:0,resync:!1}:{frames:c,droppedFrames:l,resync:!0}}function Et(e,t){for(let n=t.length-1;n>=0;--n)if(S(e,t[n].data))return n;return-1}function Dt(e,t,n){let r=-1;for(let i=n-1;i>=0;--i){let n=t[i];if(!C(e,n.data))continue;let a=x(e,n.data);if(e===`h264`&&a.includes(7)){r=i;break}if(e===`h265`&&a.includes(32)){r=i;break}e===`h265`&&r<0&&a.includes(33)&&(r=i)}return r<0?[]:t.slice(r,n).filter(t=>C(e,t.data))}function Ot(e,t,n,r){let i=!1,a=null;return new Promise((o,s)=>{a=setTimeout(()=>{i=!0,a=null,s(Error(n))},t),e.then(e=>{if(a!=null&&(clearTimeout(a),a=null),i){r?.(e);return}o(e)},e=>{a!=null&&(clearTimeout(a),a=null),i||s(e instanceof Error?e:Error(String(e)))})})}function kt(e,t,n=8000000n){let r=null,i=n+1n;for(let n of e){let e=n.timestampNs>=t?n.timestampNs-t:t-n.timestampNs;e<i&&(r=n,i=e)}return i<=n?r:null}function At(e,t){e.lineCap=`round`,e.lineJoin=`round`;for(let n of t.points)jt(e,n)}function jt(e,t){let{points:n}=t;if(n.length!==0)switch(e.lineWidth=Math.max(1,t.thickness),e.strokeStyle=G(t.outlineColor),e.fillStyle=G(t.fillColor),t.kind){case`points`:for(let r=0;r<n.length;r+=1){let i=n[r];e.strokeStyle=G(t.outlineColors[r]??t.outlineColor),e.beginPath(),e.arc(i.x,i.y,Math.max(1,t.thickness/2),0,Math.PI*2),e.fill(),e.stroke()}return;case`line-loop`:case`line-strip`:e.beginPath(),e.moveTo(n[0].x,n[0].y);for(let t of n.slice(1))e.lineTo(t.x,t.y);t.kind===`line-loop`&&(e.closePath(),t.fillColor.a>0&&e.fill()),e.stroke();return;case`line-list`:for(let t=0;t+1<n.length;t+=2)e.beginPath(),e.moveTo(n[t].x,n[t].y),e.lineTo(n[t+1].x,n[t+1].y),e.stroke()}}function G(e){return`rgba(${Math.round(Math.max(0,Math.min(1,e.r))*255)}, ${Math.round(Math.max(0,Math.min(1,e.g))*255)}, ${Math.round(Math.max(0,Math.min(1,e.b))*255)}, ${Math.max(0,Math.min(1,e.a))})`}function K(e,t,n){return t!==n&&(e.close(),!0)}const Mt={backgroundColor:`#000000`,flipHorizontal:!1,flipVertical:!1,rotationDeg:0,smoothing:!0,fitMode:`contain`};function Nt(e){return(e%360+360)%360}function Pt(e,t,n){let r=Nt(n)*Math.PI/180,i=Math.abs(Math.cos(r)),a=Math.abs(Math.sin(r));return{w:e*i+t*a,h:e*a+t*i}}const Ft={cssWidth:0,cssHeight:0,devicePixelRatio:1},q=5e3;var It=class{#e=null;#t=-1;#n=null;#r=null;#i=null;#a=0;#o=new Map;#s;constructor(e){this.#s=e}dispose(){this.reset(),this.#t=-1}reset(){this.#a+=1,this.#e&&this.#e.state!==`closed`&&this.#e.close(),this.#e=null,this.#n=null,this.#r=null,this.#i=null,this.#o.clear()}get codec(){return this.#n??void 0}get decodeQueueSize(){return this.#e?.state===`configured`?this.#e.decodeQueueSize:0}async submitFrame(e,t,n){if(typeof VideoDecoder>`u`)throw Error(`WebCodecs VideoDecoder is not supported`);let r=e.kind===`compressed`?b(e.format):null;if(!r)throw Error(`Compressed frame does not declare H.264 or H.265`);let i=ye(r,t);this.#e&&this.#e.state!==`closed`&&(this.#i!==null&&r!==this.#i||i&&i!==this.#r)&&this.reset();let a=this.#a;if(!await this.#c(r,t,i,a))return;let o=this.#e,s=xe(n,this.#t);this.#t=s,ge(r,t)&&this.#o.set(s,{frame:e,startedAt:performance.now(),generation:a});try{o.decode(new EncodedVideoChunk({type:_e(r,t),timestamp:s,data:t}))}catch(e){throw this.#o.delete(s),e}}async#c(e,t,n,r){if(this.#e&&this.#e.state!==`closed`)return!0;let i=null;for(let n of ve(e,t)){let e=[{codec:n,hardwareAcceleration:`prefer-hardware`,optimizeForLatency:!0},{codec:n,hardwareAcceleration:`no-preference`,optimizeForLatency:!0}];for(let t of e)try{let e=await VideoDecoder.isConfigSupported(t);if(r!==this.#a)return!1;if(e.supported){i=e.config??t;break}}catch{}if(i)break}if(!i)throw Error(`${e===`h264`?`H.264`:`H.265`} codec ${n??`fallback candidates`} is not supported`);this.#e=new VideoDecoder({output:e=>{let t=this.#o.get(e.timestamp);if(this.#o.delete(e.timestamp),!t||t.generation!==this.#a){e.close();return}this.#s.output({videoFrame:e,sourceFrame:t.frame,decodeMs:performance.now()-t.startedAt})},error:e=>this.#s.error(Error(String(e)))}),this.#e.addEventListener(`dequeue`,this.#s.dequeue);try{this.#e.configure(i),this.#n=i.codec,this.#r=n,this.#i=e}catch(e){throw this.#e.close(),this.#e=null,this.#n=null,this.#i=null,e}return!0}},Lt=class{#e=null;#t=null;#n=new OffscreenCanvas(1,1);#r=this.#n.getContext(`2d`,{alpha:!1});#i={...Mt};#a={...Ft};#o={};#s=[];#c=null;#l=[];#u=!1;#d;#f=null;#p=null;#m=`idle`;#h=!1;#g=null;#_=null;#v=new Map;#y=null;#b=null;#x=_t();#S=0;#C=!1;#w=[];#T=[];#E=!1;#D=-1/0;#O=-1/0;#k=0;#A=0;#j=0;#M=-1/0;#N=null;#P=null;#F=null;#I=!1;#L=-1/0;#R=0;constructor(){if(!this.#r)throw Error(`Buffer canvas context is unavailable in worker`);this.#d=new It({output:e=>this.#q(e),error:e=>this.#X(e),dequeue:()=>{this.#$(),this.#G()}})}handle(e){switch(e.type){case`init`:if(this.#e=e.canvas,this.#t=e.canvas.getContext(`2d`,{alpha:!1,desynchronized:!0}),!this.#t)throw Error(`Canvas 2D context is unavailable in worker`);this.#me(),this.#ge(),this.#ue({phase:`idle`});return;case`viewport`:this.#a=e.viewport,this.#me(),this.#ae();return;case`renderOptions`:this.#i=e.options,this.#ae();return;case`rawDecodeOptions`:this.#o=e.options,this.#re();return;case`playback`:this.#N=Q(e.currentTime),this.#I=e.isPlaying,this.#$(),this.#H(),this.#te();return;case`frame`:if(this.#h)return;this.#V(e.frame),this.#u||this.#G();return;case`overlay`:if(!e.overlay)this.#s=[];else{let t=this.#s.findIndex(t=>t.timestampNs===e.overlay?.timestampNs);t>=0?this.#s[t]=e.overlay:this.#s.push(e.overlay),this.#s.length>120&&this.#s.shift()}this.#ie();return;case`bootstrapVideo`:this.#z(e.codec,e.frames,e.preserveFrame===!0);return;case`reset`:this.#R+=1,this.#c=null,this.#l=[],this.#Q(),this.#h=!1,this.#ee(),this.#d.reset(),this.#le(),this.#s=[],e.preserveFrame||(this.#se(),this.#y=null,this.#ge(),this.#ue({phase:`idle`}));return;case`dispose`:this.#R+=1,this.#c=null,this.#l=[],this.#Q(),this.#h=!1,this.#d.dispose(),this.#le(),this.#se(),this.#y=null,self.close();return}}#z(e,t,n){this.#R+=1,this.#c=null,this.#l=[],this.#Q(),this.#h=!1,this.#b=e,this.#ee(),this.#d.reset(),n||(this.#se(),this.#y=null,this.#ge(),this.#ue({phase:`idle`}));let r=t.filter(t=>Y(t)===e).slice(0,180);if(r.length===0||!r.some(t=>S(e,t.data))){this.#C=!0,this.#te(!0);return}for(let e of r)this.#B(e,{applyBackpressure:!1});this.#te(!0),this.#u||this.#G()}#B(e,t={}){let n=Y(e);if(n){if(this.#b!==n&&(this.#b=n,this.#l=[],this.#T=[],this.#w=[],this.#C=!0,this.#Z()),this.#T=wt(n,this.#T,e),this.#C&&!S(n,e.data)){if(C(n,e.data)){this.#w=wt(n,this.#w,e);return}this.#k+=1,t.applyBackpressure!==!1&&this.#te();return}S(n,e.data)&&(this.#C=!1,this.#w.length>0&&(this.#l.push(...this.#w),this.#w=[])),this.#l.push(e),t.applyBackpressure!==!1&&(this.#$(),this.#H(),this.#te())}}#V(e){if(!X(e)){this.#c=e;return}this.#B(e)}#H(){let e=Z(this.#l),t=vt(this.#l.length,e),n=this.#x.mode===`degraded`&&(this.#l.length>36||e>250);if(!t&&!n)return;let r=this.#b;if(!r)return;let i=Tt(r,this.#l,this.#T),a=t||performance.now()-this.#M>=200;if(i.resync&&a&&(this.#l=i.frames,this.#Z(),this.#k+=i.droppedFrames),vt(this.#l.length,Z(this.#l))){this.#U();return}i.resync}#U(){let e=Ct(this.#l,!0);this.#k+=e.droppedFrames,this.#l=e.frames,this.#C=!0,this.#w=[...this.#T],this.#Z(),this.#$(),this.#te(!0)}#W(){let e=this.#l.shift();if(e)return e;let t=this.#c;return this.#c=null,t}async#G(){if(this.#u)return;this.#u=!0;let e=this.#R;try{let t;for(;!(this.#l.length>0&&this.#d.decodeQueueSize>=4||(t=this.#W(),!t)||e!==this.#R);)if(X(t)&&this.#E&&(this.#Z(),this.#E=!1),await this.#K(t,e),this.#h){this.#c=null,this.#l=[];break}}finally{this.#u=!1,(this.#c||this.#l.length>0&&this.#d.decodeQueueSize<4)&&this.#G()}}async#K(e,t){this.#ue({phase:`decoding`,receiveTime:e.receiveTime});try{if(e.kind===`compressed`){let n=J(e.data);if(n.byteLength===0)throw Error(`Compressed image payload is empty: ${e.format}`);if(T(e.format)){let r=await Pe(n,e.format);if(t!==this.#R)return;this.#ne({receiveTime:e.receiveTime,publishTime:e.publishTime,encoding:r.encoding,width:r.width,height:r.height,step:r.step,isBigEndian:r.isBigEndian,data:J(r.data)});return}let r=E(e.format),i=Q(e.receiveTime);if(r===`h264`||r===`h265`){if(await this.#d.submitFrame(e,n,i),t!==this.#R)return;this.#$(),this.#te();return}let a=await Ot(this.#ce(n,e.format),q,`Compressed image decode timed out: ${e.format}`,Vt);if(K(a,t,this.#R))return;let o=`displayWidth`in a?a.displayWidth:a.width,s=`displayHeight`in a?a.displayHeight:a.height,c;if(Ut(a))c=a;else{try{c=await Ot(createImageBitmap(a),q,`Compressed image bitmap creation timed out: ${e.format}`,Ht)}finally{Vt(a)}if(K(c,t,this.#R))return}this.#oe(c,o,s,e.format,e.receiveTime,e.publishTime),this.#fe(c,o,s,e.publishTime),this.#ue({phase:`ready`,width:o,height:s,encoding:e.format,receiveTime:e.receiveTime});return}let n=J(e.data);this.#ne({receiveTime:e.receiveTime,publishTime:e.publishTime,encoding:e.encoding,width:e.width,height:e.height,step:e.step??e.width*Rt(e.encoding),isBigEndian:e.isBigEndian??!1,data:n})}catch(n){if(t!==this.#R)return;if(X(e)){this.#k+=1,this.#X(n instanceof Error?n:Error(String(n)));return}this.#h=!0,this.#ue({phase:`error`,message:n instanceof Error?n.message:String(n)})}}#q(e){let t=Q(e.sourceFrame.receiveTime);if(this.#P=t,this.#S=bt(this.#S,e.decodeMs),this.#I&&xt(this.#N,t)){e.videoFrame.close(),this.#k+=1,this.#$(),this.#te();return}this.#f&&(this.#f.videoFrame.close(),this.#k+=1),this.#f={videoFrame:e.videoFrame,sourceFrame:e.sourceFrame},this.#J(),this.#$(),this.#te()}#J(){if(this.#p!=null||!this.#f)return;let e=this.#x.mode===`normal`?16.666666666666668:33.333333333333336,t=Math.max(0,e-(performance.now()-this.#D));if(t<=0){this.#Y();return}this.#p=setTimeout(()=>{this.#p=null,this.#Y()},t)}async#Y(){let e=this.#f;if(this.#f=null,!e)return;let{videoFrame:t,sourceFrame:n}=e,r=this.#R,i=performance.now();try{let e=Q(n.receiveTime);if(this.#I&&xt(this.#N,e)){this.#k+=1;return}let a=t.displayWidth||t.codedWidth,o=t.displayHeight||t.codedHeight;if(!this.#pe(t,a,o,n.publishTime)){this.#k+=1;return}if(this.#D=i,this.#A+=1,this.#ue({phase:`ready`,width:a,height:o,encoding:n.kind===`compressed`?n.format:this.#b??`h264`,receiveTime:n.receiveTime}),this.#x.mode===`normal`&&i-this.#O>=500)try{let e=await createImageBitmap(t);if(K(e,r,this.#R))return;this.#oe(e,a,o,n.kind===`compressed`?n.format:this.#b??`h264`,n.receiveTime,n.publishTime),this.#O=i}catch{}}finally{t.close(),this.#te(),this.#f&&this.#J()}}#X(e){this.#Z();let t=this.#b,n=t?Tt(t,this.#l,this.#T,!0):{frames:[],droppedFrames:this.#l.length,resync:!1};n.resync?(this.#l=n.frames,this.#C=!1,this.#k+=n.droppedFrames,this.#G()):(this.#k+=this.#l.length,this.#l=[],this.#C=!0,this.#w=[...this.#T]),this.#A===0&&!this.#y&&this.#ue({phase:`error`,message:e.message}),this.#te(!0)}#Z(){this.#d.reset(),this.#Q(),this.#E=!1,this.#j+=1,this.#M=performance.now()}#Q(){this.#p!=null&&(clearTimeout(this.#p),this.#p=null),this.#f?.videoFrame.close(),this.#f=null}#$(){let e=this.#x.mode,t=!this.#I||this.#P==null?0:W(this.#N,this.#P);this.#x=yt(this.#x,{queueFrames:this.#l.length,queueSpanMs:Z(this.#l),decodeMs:this.#S,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:t}),e!==this.#x.mode&&this.#te(!0)}#ee(){this.#x=_t(),this.#S=0,this.#C=!0,this.#w=[...this.#T],this.#E=!1,this.#D=-1/0,this.#O=-1/0,this.#k=0,this.#A=0,this.#j=0,this.#M=-1/0,this.#P=null,this.#F=null,this.#L=-1/0}#te(e=!1){let t=performance.now();if(!e&&t-this.#L<1e3)return;this.#L=t;let n=this.#P==null?0:W(this.#N,this.#P),r={pressureMode:this.#x.mode,queueFrames:this.#l.length,queueSpanMs:Z(this.#l),decodeMs:this.#S,droppedFrames:this.#k,renderedFrames:this.#A,decodeQueueSize:this.#d.decodeQueueSize,mediaLagMs:n,resyncCount:this.#j,codec:this.#d.codec};$.postMessage({type:`metrics`,metrics:r})}#ne(e){let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height)),ht({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#se(),this.#y={kind:`raw`,width:e.width,height:e.height,encoding:e.encoding,step:e.step,isBigEndian:e.isBigEndian,data:e.data,receiveTime:e.receiveTime,publishTime:e.publishTime},this.#de(e.width,e.height,e.publishTime),this.#ue({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}#re(){let e=this.#y;if(!e||e.kind!==`raw`)return;let t=e.width*e.height*4,n=this.#g;(!n||n.length!==t)&&(n=new Uint8ClampedArray(t),this.#g=n),(!this.#_||this.#_.width!==e.width||this.#_.height!==e.height)&&(this.#_=new ImageData(n,e.width,e.height));try{ht({encoding:e.encoding,width:e.width,height:e.height,step:e.step,is_bigendian:e.isBigEndian,data:e.data},n,this.#o),this.#de(e.width,e.height,e.publishTime),this.#ue({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})}catch{}}#ie(){let e=this.#y;if(e?.kind===`bitmap`&&b(e.encoding)){this.#F!==null&&Q(e.publishTime)===this.#F&&this.#ae();return}this.#ae()}#ae(){let e=this.#y;if(!e){this.#ge();return}e.kind===`raw`?(this.#de(e.width,e.height,e.publishTime),this.#ue({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime})):(this.#fe(e.bitmap,e.width,e.height,e.publishTime),this.#ue({phase:`ready`,width:e.width,height:e.height,encoding:e.encoding,receiveTime:e.receiveTime}))}#oe(e,t,n,r,i,a){this.#se(),this.#y={kind:`bitmap`,width:t,height:n,encoding:r,bitmap:e,receiveTime:i,publishTime:a}}#se(){this.#y?.kind===`bitmap`&&this.#y.bitmap.close()}async#ce(e,t){let n=Oe(t,e);if(typeof ImageDecoder<`u`){let t=this.#v.get(n);if(t===void 0&&(t=await ImageDecoder.isTypeSupported(n),this.#v.set(n,t)),t){let t=new ImageDecoder({type:n,data:e});try{let{image:e}=await t.decode({frameIndex:0});return e}finally{t.close()}}}return createImageBitmap(new Blob([e],{type:n}))}#le(){this.#v.clear(),this.#g=null,this.#_=null}#ue(e){if(e.phase===`decoding`&&this.#m!==`idle`&&this.#m!==`error`)return;this.#m=e.phase;let t={type:`status`,status:e};$.postMessage(t)}#de(e,t,n){zt(this.#n,e,t),this.#r.putImageData(this.#_,0,0),this.#pe(this.#n,e,t,n)}#fe(e,t,n,r){this.#pe(e,t,n,r)}#pe(e,t,n,r){let i=Q(r);if(St(this.#I,this.#F,i))return!1;this.#me();let a=this.#t,o=this.#e;if(!a||!o)return!1;let s=this.#a.cssWidth||o.width/Math.max(1,this.#a.devicePixelRatio)||1,c=this.#a.cssHeight||o.height/Math.max(1,this.#a.devicePixelRatio)||1,l=Nt(this.#i.rotationDeg),{w:u,h:d}=Pt(t,n,l),f=this.#i.fitMode===`contain`?Math.min(s/u,c/d):Math.max(s/u,c/d),p=Math.max(1,t*f),m=Math.max(1,n*f);a.save();let h=this.#he();a.setTransform(h,0,0,h,0,0),a.clearRect(0,0,s,c),a.fillStyle=this.#i.backgroundColor,a.fillRect(0,0,s,c),a.imageSmoothingEnabled=this.#i.smoothing,a.imageSmoothingQuality=this.#i.smoothing&&this.#x.mode===`normal`?`high`:`low`,a.translate(s/2,c/2),a.rotate(l*Math.PI/180),a.scale(this.#i.flipHorizontal?-1:1,this.#i.flipVertical?-1:1),a.drawImage(e,-p/2,-m/2,p,m);let g=kt(this.#s,i);return g&&(a.translate(-p/2,-m/2),a.scale(f,f),At(a,g)),a.restore(),this.#F=i,$.postMessage({type:`rendered`,timestampNs:i,width:t,height:n}),!0}#me(){if(!this.#e)return;let e=this.#he(),t=Math.max(1,Math.round(Math.max(0,this.#a.cssWidth)*e)),n=Math.max(1,Math.round(Math.max(0,this.#a.cssHeight)*e));this.#e.width!==t&&(this.#e.width=t),this.#e.height!==n&&(this.#e.height=n)}#he(){let e=Math.max(1,this.#a.devicePixelRatio);return this.#x.mode===`normal`?e:Math.min(e,1)}#ge(){!this.#t||!this.#e||(this.#t.save(),this.#t.setTransform(1,0,0,1,0,0),this.#t.clearRect(0,0,this.#e.width,this.#e.height),this.#t.fillStyle=this.#i.backgroundColor,this.#t.fillRect(0,0,this.#e.width,this.#e.height),this.#t.restore())}};function Rt(e){switch(e.trim().toLowerCase()){case`rgb8`:case`bgr8`:case`8uc3`:return 3;case`rgba8`:case`bgra8`:case`32fc1`:return 4;case`mono16`:case`16uc1`:case`uyvy`:case`yuyv`:case`yuv422`:case`yuv422_yuy2`:return 2;default:return 1}}function zt(e,t,n){e.width!==t&&(e.width=t),e.height!==n&&(e.height=n)}function Bt(e){let t=new Uint8Array(new ArrayBuffer(e.byteLength));return t.set(e),t}function J(e){return e.buffer instanceof ArrayBuffer&&e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e:Bt(e)}function Y(e){return e.kind===`compressed`?b(e.format):null}function X(e){return Y(e)!==null}function Z(e){if(e.length<2)return 0;let t=e.find(e=>{let t=Y(e);return!t||!C(t,e.data)}),n=e.findLast(e=>{let t=Y(e);return!t||!C(t,e.data)});if(!t||!n)return 0;let r=Q(n.receiveTime)-Q(t.receiveTime);return Math.max(0,Number(r)/1e6)}function Q(e){return BigInt(e.sec)*1000000000n+BigInt(e.nsec)}function Vt(e){e.close()}function Ht(e){e.close()}function Ut(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap}const Wt=new Lt,$=self;$.onmessage=e=>{Wt.handle(e.data)};", B = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", z], { type: "text/javascript;charset=utf-8" });
function se(e) {
	let t;
	try {
		if (t = B && (self.URL || self.webkitURL).createObjectURL(B), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(z), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/features/panels/Image/ImagePanel.tsx
function ce(e) {
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
var V = (a) => {
	let { formatMessage: o } = e(), s = t((e) => e.playerState.activeData?.isPlaying ?? !1), { player: c, panelId: l, setConfig: u, topic: f, annotationTopic: p, annotationVisible: re, backgroundColor: b, showStatusText: S, fitMode: C, flipHorizontal: w, flipVertical: T, rotation: E, smoothing: D, colorMode: O, colorMap: k, gradient: A, flatColor: j, explicitAlpha: M, minValue: N, maxValue: P } = a, F = _(null), I = _(null), L = _(null), R = _(null), z = _(null), B = _(null), V = _(0), U = _({ phase: "idle" }), W = _(null), G = _(!1), K = _(!1), q = _(0), J = _([]), Y = _("latest"), [X, Z] = ie({ phase: "idle" }), [Q, de] = ie(null), $ = `${l}:image-main`, fe = `${l}:image-annotations`, pe = re ? p.trim() : "", me = t((e) => e.playerState.activeData?.topics.find((e) => e.name === f)?.type ?? "");
	g(() => {
		let e = F.current, t = I.current;
		if (!e || !t) return;
		if (typeof e.transferControlToOffscreen != "function") {
			let e = {
				phase: "error",
				message: o({ id: "panels.image.error.offscreenUnsupported" })
			};
			U.current = e, Z(e);
			return;
		}
		R.current != null && (window.clearTimeout(R.current), R.current = null), L.current && z.current && z.current !== e && (L.current.postMessage({ type: "dispose" }), L.current.terminate(), L.current = null, z.current = null);
		let r = L.current;
		if (!r) {
			r = new se(), L.current = r;
			let t = e.transferControlToOffscreen();
			z.current = e, r.postMessage({
				type: "init",
				canvas: t
			}, [t]);
		}
		r.onmessage = (e) => {
			let t = e.data;
			if (t.type === "metrics") {
				de(t.metrics);
				return;
			}
			if (t.type !== "status") return;
			let n = t.status;
			ue(U.current, n) || (U.current = n, Z(n));
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
			c?.(), c = null, window.removeEventListener("resize", u), d.disconnect(), R.current = window.setTimeout(() => {
				let e = L.current;
				e && (e.postMessage({ type: "dispose" }), e.terminate(), L.current = null, z.current = null, U.current = { phase: "idle" }, Z({ phase: "idle" }), de(null), R.current = null);
			}, 0);
		};
	}, [o]), g(() => {
		if (!f) return;
		let e = L.current;
		if (!e) return;
		G.current = !1, K.current = !1, q.current += 1, J.current = [], Y.current = "latest", de(null), e.postMessage({ type: "reset" }), d(me) && (G.current = !0, Y.current = "all");
		let t = (t) => {
			if (K.current) {
				J.current.push(t);
				return;
			}
			H(e, t);
		}, n = (n) => {
			for (let r of n) ae(r) ? t(r) : H(e, r);
		}, r = async (t, n) => {
			if (!t) return !1;
			let r = q.current;
			K.current = !0, W.current?.abort();
			let i = new AbortController();
			W.current = i;
			try {
				let a = await oe({
					player: c,
					worker: e,
					topic: f,
					targetTime: t,
					codec: J.current.map(x).find(Boolean) ?? void 0,
					liveEvents: J.current,
					signal: i.signal,
					preserveFrame: n
				});
				return i.signal.aborted || r !== q.current ? !1 : (a && (J.current = []), a);
			} finally {
				r === q.current && (K.current = !1), W.current === i && (W.current = null);
			}
		}, i = async (e) => {
			if (G.current) {
				e && t(e);
				return;
			}
			G.current = !0, e && J.current.push(e), Y.current !== "all" && (Y.current = "all", c.unregisterHighFrequencyConsumer($), c.registerHighFrequencyConsumer($, {
				topic: f,
				lane: "video",
				mode: "all",
				onMessageBatch: n
			}));
			let i = c.getCurrentTime();
			i && await r(i, !1);
		}, a = (n) => {
			if (ae(n)) {
				if (!G.current) {
					i(n);
					return;
				}
				t(n);
				return;
			}
			H(e, n);
		};
		if (Y.current === "all") {
			c.registerHighFrequencyConsumer($, {
				topic: f,
				lane: "video",
				mode: "all",
				onMessageBatch: n
			});
			let e = c.getCurrentTime();
			e && r(e, !1);
		} else c.registerHighFrequencyConsumer($, {
			topic: f,
			lane: "video",
			mode: "latest",
			onLatestMessage: a,
			onMessageBatch: (e) => {
				if (G.current) return;
				let t = e.at(-1);
				t && a(t);
			}
		});
		return () => {
			q.current += 1, W.current?.abort(), W.current = null, J.current = [], K.current = !1, c.unregisterHighFrequencyConsumer($), e.postMessage({ type: "reset" });
		};
	}, [
		$,
		c,
		f,
		me
	]), g(() => () => {
		W.current?.abort(), W.current = null;
	}, [c, f]), g(() => {
		let e = L.current;
		if (!(!pe || !e)) return c.registerHighFrequencyConsumer(fe, {
			topic: pe,
			lane: "video",
			mode: "all",
			onMessageBatch: (t) => {
				for (let n of t) {
					let t = ee(n.message);
					t && e.postMessage({
						type: "overlay",
						overlay: t
					});
				}
			}
		}), () => {
			c.unregisterHighFrequencyConsumer(fe), e.postMessage({
				type: "overlay",
				overlay: null
			});
		};
	}, [
		fe,
		c,
		pe
	]), g(() => c.subscribeCurrentTime((e) => {
		L.current?.postMessage({
			type: "playback",
			currentTime: e,
			isPlaying: s
		});
		let t = m(e), n = B.current;
		if (n !== t && (V.current += 1), n != null && t + 5000000n < n) {
			let n = V.current, r = L.current, i = r && f && !G.current ? f : null;
			if (W.current?.abort(), W.current = null, r && f && G.current) {
				K.current = !0, J.current = [];
				let t = q.current, n = new AbortController();
				W.current = n, (async () => {
					try {
						await oe({
							player: c,
							worker: r,
							topic: f,
							targetTime: e,
							codec: J.current.map(x).find(Boolean) ?? void 0,
							liveEvents: J.current,
							signal: n.signal,
							preserveFrame: !0
						}) && !n.signal.aborted && t === q.current && (J.current = []);
					} finally {
						t === q.current && (K.current = !1), W.current === n && (W.current = null);
					}
				})();
			} else r?.postMessage({ type: "reset" });
			let a = /* @__PURE__ */ new Set();
			i && a.add(i), a.size > 0 && c.getMessagesInTimeRange && c.getMessagesInTimeRange({
				start: h(e, -2e3),
				end: e,
				topics: [...a]
			}).then((e) => {
				if (V.current !== n) return;
				let a;
				for (let n of e) i && n.topic === i && m(n.receiveTime) <= t && (!a || m(n.receiveTime) > m(a.receiveTime)) && (a = n);
				r && a && H(r, a);
			});
		}
		B.current = t;
	}), [
		s,
		c,
		f
	]), g(() => {
		let e = L.current;
		e && e.postMessage({
			type: "rawDecodeOptions",
			options: ce({
				colorMode: O,
				colorMap: k,
				gradient: A,
				flatColor: j,
				explicitAlpha: M,
				minValue: N,
				maxValue: P
			})
		});
	}, [
		O,
		k,
		A,
		j,
		M,
		N,
		P
	]), g(() => {
		let e = {
			backgroundColor: b,
			flipHorizontal: w,
			flipVertical: T,
			rotationDeg: E,
			smoothing: D,
			fitMode: C
		};
		L.current?.postMessage({
			type: "renderOptions",
			options: e
		});
	}, [
		b,
		w,
		T,
		E,
		D,
		C
	]);
	let he = le(X);
	return /* @__PURE__ */ y("div", {
		className: "flex flex-col h-full overflow-hidden relative",
		style: { background: b },
		"data-testid": "image-panel",
		"data-video-codec": Q?.codec,
		"data-video-pressure": Q?.pressureMode,
		"data-video-queue-frames": Q?.queueFrames,
		"data-video-dropped-frames": Q?.droppedFrames,
		"data-video-decode-queue": Q?.decodeQueueSize,
		"data-video-media-lag-ms": Q?.mediaLagMs,
		"data-video-resync-count": Q?.resyncCount,
		"data-video-rendered-frames": Q?.renderedFrames,
		children: [/* @__PURE__ */ v(i, {
			className: "border-zinc-800 bg-zinc-950",
			children: /* @__PURE__ */ v(r, {
				value: f,
				onChange: (e) => u((t) => ne(e, t)),
				typeIncludes: [...te],
				placeholder: o({ id: "panels.framework.topicPicker.imagePlaceholder" }),
				className: "min-w-0 flex-1",
				triggerClassName: "border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50"
			})
		}), /* @__PURE__ */ y("div", {
			ref: I,
			className: "flex-1 relative min-h-0 min-w-0 flex items-center justify-center",
			children: [
				/* @__PURE__ */ v("canvas", {
					ref: F,
					className: "w-full h-full block",
					"data-testid": "image-panel-canvas"
				}),
				S && he && /* @__PURE__ */ v("div", {
					className: "absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 italic text-xs",
					children: he
				}),
				S && X.phase === "ready" && X.width && X.height && /* @__PURE__ */ y("div", {
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
function le(e) {
	return e.phase === "idle" ? "Waiting for image data" : e.phase === "error" ? e.message ?? "Image decode failed" : e.phase === "decoding" && !e.width && !e.height ? "Decoding latest frame..." : null;
}
function ue(e, t) {
	return e.phase === t.phase && e.width === t.width && e.height === t.height && e.encoding === t.encoding && e.message === t.message;
}
function H(e, t) {
	let n = b(t, { transferOwnership: !0 });
	n && e.postMessage({
		type: "frame",
		frame: n.frame
	}, n.transfer);
}
//#endregion
export { V as ImagePanel };
