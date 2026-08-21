//#region src/shared/ros/rosMessageTypes.ts
var e = "sensor_msgs/msg/Image", t = "sensor_msgs/msg/CompressedImage", n = "foxglove_msgs/msg/CompressedVideo", r = "geometry_msgs/msg/PoseStamped", i = "foxglove_msgs/msg/RawAudio", a = "audio_common_msgs/msg/AudioData", o = "audio_common_msgs/msg/AudioDataStamped";
function s(e) {
	return e.trim().replace(/\s*\[[^\]]+\]\s*$/u, "").toLowerCase().replace(/^([^/]+)\/msg\/(.+)$/u, "$1/$2");
}
function c(e, t) {
	return s(e) === s(t);
}
function l(e) {
	return c(e, "sensor_msgs/msg/JointState");
}
function u(e) {
	if (c(e, "sensor_msgs/msg/Image") || c(e, "sensor_msgs/msg/CompressedImage") || c(e, "foxglove_msgs/msg/CompressedVideo")) return !0;
	let t = s(e);
	return !!(t.includes("compressedimage") || t.includes("compressedvideo") || /\/image$/i.test(t) && !t.includes("camerainfo") && !t.includes("annotations"));
}
function d(e) {
	return c(e, r);
}
function f(e) {
	return c(e, "foxglove_msgs/msg/RawAudio") || c(e, "foxglove_msgs/RawAudio") || c(e, "foxglove/RawAudio");
}
function p(e) {
	return c(e, a);
}
function m(e) {
	return c(e, o);
}
function h(e) {
	return c(e, "audio_common_msgs/msg/AudioInfo");
}
function g(e) {
	return f(e) || p(e) || m(e);
}
//#endregion
export { s as _, r as a, p as c, g as d, l as f, c as g, u as h, i, m as l, f as m, o as n, t as o, d as p, n as r, e as s, a as t, h as u };
