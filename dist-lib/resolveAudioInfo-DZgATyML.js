//#region src/features/panels/Audio/core/parseAudioInfo.ts
function e(e) {
	return typeof e == "string" ? e.trim() : "";
}
function t(t) {
	if (!t || typeof t != "object") return null;
	let n = t, r = typeof n.channels == "number" ? n.channels : Number(n.channels), i = typeof n.sample_rate == "number" ? n.sample_rate : Number(n.sample_rate);
	if (!Number.isFinite(r) || r <= 0 || r > 32 || !Number.isFinite(i) || i <= 0 || i > 1e6) return null;
	let a = e(n.sample_format) || "S16LE", o = e(n.coding_format), s = typeof n.bitrate == "number" ? n.bitrate : Number(n.bitrate);
	return {
		channels: Math.floor(r),
		sampleRate: Math.floor(i),
		sampleFormat: a,
		codingFormat: o,
		bitrate: Number.isFinite(s) ? Math.floor(s) : void 0
	};
}
var n = /* @__PURE__ */ new Set([
	"",
	"pcm",
	"raw",
	"linear"
]);
function r(e) {
	let t = e.trim().toLowerCase();
	return !!(t.length === 0 || n.has(t) || t === "wave" || t === "wav");
}
var i = /* @__PURE__ */ new Set([
	"mp3",
	"aac",
	"ogg",
	"opus",
	"flac",
	"m4a",
	"wma"
]);
function a(e) {
	let t = e.trim().toLowerCase();
	return t.length === 0 || r(e) ? !1 : i.has(t) ? !0 : !n.has(t);
}
//#endregion
//#region src/features/panels/Audio/core/resolveAudioInfo.ts
function o(e) {
	let t = e.replace(/\/+$/, ""), n = [];
	return n.push(`${t}_info`), n.push(`${t}/info`), /\/audio$/i.test(t) && (n.push(t.replace(/\/audio$/i, "/audio_info")), n.push(t.replace(/\/audio$/i, "/info"))), /\/audio\//i.test(t) && n.push(t.replace(/\/audio\//i, "/audio_info/")), [...new Set(n)];
}
function s(e, t, n, r) {
	let i = [];
	if (t && t.length > 0) {
		let e = n.get(t);
		if (e) return {
			info: e,
			degraded: i,
			matchedTopic: t
		};
		i.push("configured_info_topic_missing");
	}
	for (let t of o(e)) {
		let e = n.get(t);
		if (e) return {
			info: e,
			degraded: i,
			matchedTopic: t
		};
	}
	let a = {
		channels: r.channels,
		sampleRate: r.sampleRate,
		sampleFormat: r.sampleFormat,
		codingFormat: ""
	};
	return i.push("using_panel_defaults"), {
		info: a,
		degraded: i,
		matchedTopic: void 0
	};
}
function c(e, n, r) {
	let i = t(n);
	i && r.set(e, i);
}
//#endregion
export { a, r as i, c as n, s as r, o as t };
