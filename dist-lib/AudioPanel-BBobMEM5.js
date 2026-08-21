import { f as e, i as t } from "./rafScheduler-CNDq0Etb.js";
import { f as n, t as r } from "./TopicQuickPicker-vzANSyR_.js";
import { c as i, d as a, l as o, m as s, u as c } from "./rosMessageTypes-Di-HH75w.js";
import { t as l } from "./messageBus-tPJ7Uycq.js";
import { t as u } from "./useMessageBus-zT5FCuxY.js";
import { t as d } from "./shallow-DHPf4mbW.js";
import { a as f, n as p } from "./timeSeries-Al2bAf1m.js";
import { a as m, i as h, n as g, r as _, t as v } from "./resolveAudioInfo-DZgATyML.js";
import { useCallback as y, useEffect as b, useLayoutEffect as x, useMemo as S, useRef as C, useState as w } from "react";
import { jsx as T, jsxs as E } from "react/jsx-runtime";
//#region src/features/panels/Audio/core/audioPlaybackController.ts
var D = class {
	context = null;
	gain = null;
	sources = [];
	lastCurrentLogNs = null;
	isRunning() {
		return this.context != null && this.context.state === "running";
	}
	getAudioContext() {
		return this.context;
	}
	async ensureRunning() {
		return typeof AudioContext > "u" ? !1 : (this.context || (this.context = new AudioContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination)), this.context.state === "suspended" && await this.context.resume(), this.context.state === "running");
	}
	setVolume(e) {
		if (!this.gain || !this.context) return;
		let t = Math.max(0, Math.min(1, e));
		this.gain.gain.setValueAtTime(t, this.context.currentTime);
	}
	suspend() {
		this.context?.suspend();
	}
	resume() {
		this.context?.resume();
	}
	flush(e = !1) {
		for (let e of this.sources) {
			try {
				e.stop(0);
			} catch {}
			try {
				e.disconnect();
			} catch {}
		}
		this.sources.length = 0, this.lastCurrentLogNs = null, e && this.context && this.context.suspend();
	}
	dispose() {
		this.flush(!1), this.context?.close(), this.context = null, this.gain = null;
	}
	scheduleChunk(e, t, n) {
		if (!n || !this.context || !this.gain || this.context.state !== "running") return;
		let r = this.context, i = r.currentTime, a = Number(e.startNs - t) / 1e9, o = i + Math.max(0, a), { sampleRate: s, channels: c, pcmF32Interleaved: l } = e, u = l.length / c;
		if (u <= 0 || !Number.isFinite(u)) return;
		let d = r.createBuffer(c, u, s);
		for (let e = 0; e < c; e++) {
			let t = d.getChannelData(e);
			for (let n = 0; n < u; n++) t[n] = l[n * c + e];
		}
		let f = r.createBufferSource();
		f.buffer = d, f.connect(this.gain);
		try {
			f.start(o), this.sources.push(f), f.onended = () => {
				let e = this.sources.indexOf(f);
				e >= 0 && this.sources.splice(e, 1);
			};
		} catch {}
		this.lastCurrentLogNs = t;
	}
	handlePlaybackTimeJump(e, t) {
		e != null && t + 10000000n < e && this.flush(!1), this.lastCurrentLogNs = t;
	}
	getLastCurrentLogNs() {
		return this.lastCurrentLogNs;
	}
};
//#endregion
//#region src/features/panels/Audio/core/pcmConvert.ts
function O(e) {
	if (e instanceof Uint8Array) return e;
	if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "number").map((e) => e & 255);
		return new Uint8Array(t);
	}
	return null;
}
function k(e) {
	let t = e.timestamp ?? e.stamp;
	if (!t || typeof t != "object") return null;
	let n = t, r = typeof n.sec == "number" ? n.sec : Number(n.sec), i = typeof n.nsec == "number" ? n.nsec : typeof n.nanosec == "number" ? n.nanosec : Number(n.nsec ?? n.nanosec);
	return !Number.isFinite(r) || !Number.isFinite(i) ? null : BigInt(Math.trunc(r)) * 1000000000n + BigInt(Math.trunc(i));
}
function A(e) {
	return !e || typeof e != "object" ? null : k(e);
}
function j(e, t, n) {
	if (!e || typeof e != "object") return null;
	let r = e, i = r.format ?? r.FORMAT;
	if ((typeof i == "string" ? i.trim() : "") !== "pcm-s16") return null;
	let a = typeof r.sample_rate == "number" ? r.sample_rate : Number(r.sample_rate), o = typeof r.number_of_channels == "number" ? r.number_of_channels : Number(r.number_of_channels);
	if (!Number.isFinite(a) || a <= 0 || !Number.isFinite(o) || o <= 0 || o > 32) return null;
	let s = O(r.data);
	if (!s || s.length === 0) return null;
	let c = 2 * o;
	if (s.length % c !== 0) return null;
	let l = s.length / c, u = new Float32Array(l * o), d = new DataView(s.buffer, s.byteOffset, s.byteLength), f = 0;
	for (let e = 0; e < l; e++) for (let t = 0; t < o; t++) {
		let n = d.getInt16(e * c + t * 2, !0);
		u[f++] = n / 32768;
	}
	let p = A(e);
	if (p == null && n && (p = BigInt(n.sec) * 1000000000n + BigInt(n.nsec)), p == null) return null;
	let m = [];
	return A(e) == null && n && m.push("receive_time_fallback"), {
		startNs: p,
		sampleRate: Math.floor(a),
		channels: o,
		pcmF32Interleaved: u,
		sourceTopic: t,
		qualityFlags: m
	};
}
function M(e) {
	let t = e.trim().toUpperCase().replace(/\s+/g, "");
	return t === "S16LE" || t === "S_16LE" ? "s16le" : t === "S16BE" || t === "S_16BE" ? "s16be" : t === "U8" || t === "UINT8" ? "u8" : t === "S8" || t === "INT8" ? "s8" : t === "F32LE" || t === "FLOAT32LE" ? "f32le" : null;
}
function N(e, t, n, r, i, a) {
	let o = t.channels, s = M(t.sampleFormat);
	if (!s || o <= 0 || o > 32) return null;
	if (s === "s16le") {
		if (e.length % (2 * o) != 0) return null;
		let t = e.length / (2 * o), s = new Float32Array(t * o), c = new DataView(e.buffer, e.byteOffset, e.byteLength), l = 0;
		for (let e = 0; e < t; e++) for (let t = 0; t < o; t++) {
			let n = c.getInt16(e * o * 2 + t * 2, !0);
			s[l++] = n / 32768;
		}
		return {
			startNs: n,
			sampleRate: r,
			channels: o,
			pcmF32Interleaved: s,
			sourceTopic: i,
			qualityFlags: a
		};
	}
	if (s === "s16be") {
		if (e.length % (2 * o) != 0) return null;
		let t = e.length / (2 * o), s = new Float32Array(t * o), c = new DataView(e.buffer, e.byteOffset, e.byteLength), l = 0;
		for (let e = 0; e < t; e++) for (let t = 0; t < o; t++) {
			let n = c.getInt16(e * o * 2 + t * 2, !1);
			s[l++] = n / 32768;
		}
		return {
			startNs: n,
			sampleRate: r,
			channels: o,
			pcmF32Interleaved: s,
			sourceTopic: i,
			qualityFlags: a
		};
	}
	if (s === "u8") {
		if (e.length % o !== 0) return null;
		let t = e.length / o, s = new Float32Array(t * o), c = 0;
		for (let n = 0; n < t; n++) for (let t = 0; t < o; t++) {
			let r = e[n * o + t] ?? 0;
			s[c++] = (r - 128) / 128;
		}
		return {
			startNs: n,
			sampleRate: r,
			channels: o,
			pcmF32Interleaved: s,
			sourceTopic: i,
			qualityFlags: a
		};
	}
	if (s === "s8") {
		if (e.length % o !== 0) return null;
		let t = e.length / o, s = new Float32Array(t * o), c = 0;
		for (let n = 0; n < t; n++) for (let t = 0; t < o; t++) {
			let r = (e[n * o + t] ?? 0) << 24 >> 24;
			s[c++] = r / 128;
		}
		return {
			startNs: n,
			sampleRate: r,
			channels: o,
			pcmF32Interleaved: s,
			sourceTopic: i,
			qualityFlags: a
		};
	}
	if (s === "f32le") {
		if (e.length % (4 * o) != 0) return null;
		let t = e.length / (4 * o), s = new Float32Array(t * o), c = new DataView(e.buffer, e.byteOffset, e.byteLength), l = 0;
		for (let e = 0; e < t; e++) for (let t = 0; t < o; t++) s[l++] = c.getFloat32(e * o * 4 + t * 4, !0);
		return {
			startNs: n,
			sampleRate: r,
			channels: o,
			pcmF32Interleaved: s,
			sourceTopic: i,
			qualityFlags: a
		};
	}
	return null;
}
//#endregion
//#region src/features/panels/Audio/core/normalize.ts
function P(e) {
	return {
		ok: !1,
		error: e
	};
}
function F(e) {
	return {
		ok: !0,
		frame: e
	};
}
function I(e) {
	return BigInt(e.sec) * 1000000000n + BigInt(e.nsec);
}
function L(e, t, n, r) {
	let { defaults: a, audioInfoTopic: l } = r;
	if (c(t)) return P("audio_info_metadata_only");
	if (s(t)) {
		let t = j(e.message, e.topic, e.receiveTime);
		if (!t) {
			let t = e.message, n = t?.format ?? t?.FORMAT, r = typeof n == "string" ? n.trim() : "";
			return P(r && r !== "pcm-s16" ? "unsupported_raw_audio_format" : "invalid_raw_audio");
		}
		return F(t);
	}
	if (o(t)) {
		let { info: t, degraded: r } = _(e.topic, l, n, a);
		if (m(t.codingFormat) || !h(t.codingFormat)) return P("unsupported_coding_format");
		let i = e.message.audio, o = i ? O(i.data) : null;
		if (!o || o.length === 0) return P("empty_audio_payload");
		let s = p(e.message), c = I(s || e.receiveTime), u = [...r];
		s || u.push("receive_time_fallback");
		let d = N(o, t, c, t.sampleRate, e.topic, u);
		return d ? F(d) : P("unsupported_sample_format");
	}
	if (i(t)) {
		let { info: t, degraded: r } = _(e.topic, l, n, a);
		if (m(t.codingFormat) || !h(t.codingFormat)) return P("unsupported_coding_format");
		let i = O(e.message.data);
		if (!i || i.length === 0) return P("empty_audio_payload");
		let o = I(e.receiveTime), s = [...r, "receive_time_fallback"], c = N(i, t, o, t.sampleRate, e.topic, s);
		return c ? F(c) : P("unsupported_sample_format");
	}
	return P("unsupported_schema");
}
//#endregion
//#region src/features/panels/Audio/core/waveformBuffer.ts
var R = class {
	windowNs;
	samples = [];
	constructor(e) {
		let t = Math.max(.5, Math.min(30, e));
		this.windowNs = BigInt(Math.round(t * 1e9));
	}
	pushFrame(e) {
		let { pcmF32Interleaved: t, channels: n, startNs: r, sampleRate: i } = e;
		if (n <= 0 || i <= 0 || t.length / n <= 0) return;
		let a = Infinity, o = -Infinity;
		for (let e = 0; e < t.length; e++) {
			let n = t[e] ?? 0;
			n < a && (a = n), n > o && (o = n);
		}
		if (!Number.isFinite(a) || !Number.isFinite(o)) return;
		this.samples.push({
			tNs: r,
			min: a,
			max: o
		});
		let s = r - this.windowNs;
		this.samples = this.samples.filter((e) => e.tNs >= s);
	}
	clear() {
		this.samples = [];
	}
	getSamples() {
		return this.samples;
	}
};
//#endregion
//#region src/features/panels/Audio/AudioPanel.tsx
function z(e) {
	return e.filter((e) => a(e.type));
}
var B = (i) => {
	let { formatMessage: a } = e(), { player: o, panelId: p, setConfig: m, ...h } = i, _ = t((e) => e.sortedTopics), { isPlaying: O, speed: k } = t(d((e) => ({
		isPlaying: e.playerState.activeData?.isPlaying ?? !1,
		speed: e.playerState.activeData?.speed ?? 1
	}))), A = S(() => _.find((e) => e.name === h.topic)?.type ?? "", [_, h.topic]), j = S(() => {
		if (!h.topic) return [];
		let e = /* @__PURE__ */ new Set([h.topic]);
		if (h.audioInfoTopic.trim().length > 0 && e.add(h.audioInfoTopic.trim()), !s(A)) for (let t of v(h.topic)) _.some((e) => e.name === t && c(e.type)) && e.add(t);
		return [...e];
	}, [
		h.topic,
		h.audioInfoTopic,
		A,
		_
	]), M = C(/* @__PURE__ */ new Map()), N = C(0n), P = C(null), F = C(new D()), I = C(new R(h.waveformWindowSec)), B = C(null), [V, H] = w("waiting"), [U, W] = w(!1), G = u(p);
	b(() => {
		M.current = /* @__PURE__ */ new Map(), I.current = new R(h.waveformWindowSec), F.current.flush(!0), H((h.topic, "waiting"));
	}, [h.topic, h.waveformWindowSec]), b(() => j.length === 0 ? (o.unregisterSubscriptions(p), () => o.unregisterSubscriptions(p)) : (o.registerSubscriptions(p, j.map((e) => ({
		topic: e,
		subscriberId: p
	}))), () => o.unregisterSubscriptions(p)), [
		p,
		o,
		j
	]), b(() => {
		F.current.setVolume(h.mute ? 0 : h.volume);
	}, [h.volume, h.mute]);
	let K = S(() => !O || h.mute ? !1 : Math.abs(k - 1) < 1e-4, [
		O,
		h.mute,
		k
	]);
	b(() => o.subscribeCurrentTime((e) => {
		let t = f(e);
		F.current.handlePlaybackTimeJump(P.current, t), P.current = t, N.current = t;
	}), [o]), b(() => {
		O ? F.current.resume() : F.current.suspend();
	}, [O]), b(() => {
		let e = F.current;
		return () => {
			e.dispose();
		};
	}, []), b(() => {
		K || F.current.flush(!1);
	}, [K]);
	let q = y(() => {
		let e = B.current, t = I.current;
		if (!e || !t) return;
		let n = e.getBoundingClientRect(), r = typeof window < "u" && window.devicePixelRatio || 1, i = Math.max(1, Math.floor(n.width * r)), a = Math.max(1, Math.floor(n.height * r));
		(e.width !== i || e.height !== a) && (e.width = i, e.height = a);
		let o = e.getContext("2d");
		if (!o) return;
		o.fillStyle = "hsl(var(--muted))", o.fillRect(0, 0, i, a);
		let s = t.getSamples();
		if (s.length < 2) return;
		let c = s[0], l = s[s.length - 1];
		if (!c || !l) return;
		let u = c.tNs, d = l.tNs, f = d > u ? Number(d - u) : 1;
		o.strokeStyle = h.waveformColor, o.lineWidth = Math.max(1, r), o.beginPath();
		for (let e = 0; e < s.length; e++) {
			let t = s[e];
			if (!t) continue;
			let n = Number(t.tNs - u) / f * i, r = a * (.5 - .45 * t.min);
			e === 0 ? o.moveTo(n, r) : o.lineTo(n, r);
		}
		for (let e = s.length - 1; e >= 0; e--) {
			let t = s[e];
			if (!t) continue;
			let n = Number(t.tNs - u) / f * i, r = a * (.5 - .45 * t.max);
			o.lineTo(n, r);
		}
		o.closePath(), o.fillStyle = `${h.waveformColor}55`, o.fill(), o.stroke();
	}, [h.waveformColor]);
	x(() => {
		q();
	}, [
		q,
		G,
		h.waveformWindowSec
	]), b(() => {
		if (!h.topic || !A) {
			H("waiting");
			return;
		}
		let e = l.getSubscriberMessages(p);
		if (!e || e.length === 0) return;
		for (let t of e) {
			let e = _.find((e) => e.name === t.topic)?.type ?? "";
			c(e) && g(t.topic, t.message, M.current);
		}
		let t = e.filter((e) => e.topic === h.topic);
		if (t.length === 0) return;
		let n = F.current, r = I.current, i = !1;
		for (let e of t) {
			let t = L(e, A, M.current, {
				defaults: {
					sampleRate: h.defaultSampleRate,
					channels: h.defaultChannels,
					sampleFormat: h.defaultSampleFormat
				},
				audioInfoTopic: h.audioInfoTopic.trim() || void 0
			});
			if (!t.ok) {
				H(t.error);
				continue;
			}
			i = !0, r.pushFrame(t.frame);
			let a = N.current, o = K;
			o && (async () => {
				if (!await n.ensureRunning()) {
					W(!0);
					return;
				}
				W(!1), n.scheduleChunk(t.frame, a, o);
			})();
		}
		i && H("playing"), requestAnimationFrame(q);
	}, [
		G,
		K,
		h.topic,
		h.audioInfoTopic,
		h.defaultSampleRate,
		h.defaultChannels,
		h.defaultSampleFormat,
		A,
		p,
		_,
		q
	]);
	let J = S(() => {
		if (!h.topic) return a({ id: "panels.audio.status.waitingTopic" });
		if (!K && O && !h.mute && Math.abs(k - 1) >= 1e-4) return a({ id: "panels.audio.status.mutedNon1x" });
		switch (V) {
			case "waiting": return a({ id: "panels.audio.status.waiting" });
			case "playing": return a({ id: "panels.audio.status.playing" });
			case "unsupported_raw_audio_format": return a({ id: "panels.audio.status.unsupportedRawFormat" });
			case "unsupported_coding_format": return a({ id: "panels.audio.status.unsupportedCoding" });
			case "unsupported_sample_format": return a({ id: "panels.audio.status.unsupportedSampleFormat" });
			case "invalid_raw_audio": return a({ id: "panels.audio.status.invalidRaw" });
			case "empty_audio_payload": return a({ id: "panels.audio.status.emptyPayload" });
			case "unsupported_schema": return a({ id: "panels.audio.status.unsupportedSchema" });
			case "audio_info_metadata_only": return a({ id: "panels.audio.status.infoOnly" });
			default: return V;
		}
	}, [
		K,
		h.mute,
		h.topic,
		a,
		O,
		k,
		V
	]);
	return /* @__PURE__ */ E("div", {
		className: "flex h-full min-h-0 flex-col bg-card",
		"data-testid": "audio-panel",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-2 py-1",
				children: [/* @__PURE__ */ T(r, {
					value: h.topic,
					onChange: (e) => m((t) => ({
						...t,
						topic: e
					})),
					topics: z(_),
					placeholder: a({ id: "panels.audio.topicPlaceholder" }),
					className: "min-w-0 flex-1"
				}), U ? /* @__PURE__ */ T(n, {
					type: "button",
					size: "sm",
					variant: "secondary",
					"data-testid": "audio-unlock",
					onClick: () => {
						F.current?.ensureRunning().then((e) => W(!e));
					},
					children: a({ id: "panels.audio.unlock" })
				}) : null]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-2 py-1 text-[10px] text-muted-foreground",
				children: [/* @__PURE__ */ T("span", {
					className: "truncate font-mono",
					children: J
				}), h.topic && A && !s(A) ? /* @__PURE__ */ T("span", {
					className: "shrink-0 text-[9px] opacity-80",
					children: a({ id: "panels.audio.infoCacheHint" })
				}) : null]
			}),
			/* @__PURE__ */ T("div", {
				className: "relative min-h-0 flex-1 min-w-0 p-2",
				children: /* @__PURE__ */ T("canvas", {
					ref: B,
					className: "h-full w-full rounded border border-border/50 bg-muted/30"
				})
			})
		]
	});
};
//#endregion
export { B as AudioPanel };
