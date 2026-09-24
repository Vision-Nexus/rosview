//#region src/features/panels/common/poseExtractors.ts
function e(e) {
	return e && typeof e == "object" ? e : null;
}
function t(t) {
	let n = e(t);
	if (!n) return null;
	let r = n.pose, i = e(r);
	return i ? e(i.pose) ?? i : n;
}
function n(n) {
	let r = t(n);
	if (!r) return;
	let i = e(r.position ?? e(n)?.position);
	if (i && typeof i.x == "number" && typeof i.y == "number") return [
		i.x,
		i.y,
		typeof i.z == "number" ? i.z : 0
	];
}
function r(n) {
	let r = t(n);
	if (!r) return;
	let i = e(r.orientation);
	if (i && typeof i.x == "number" && typeof i.y == "number" && typeof i.z == "number" && typeof i.w == "number") return [
		i.x,
		i.y,
		i.z,
		i.w
	];
}
function i(t) {
	let n = e(e(t)?.header);
	return typeof n?.frame_id == "string" ? n.frame_id : "";
}
function a(t) {
	let r = e(t)?.poses;
	if (!Array.isArray(r)) {
		let e = n(t);
		return e ? [e] : [];
	}
	return r.map(n).filter((e) => e != null);
}
//#endregion
//#region src/features/panels/common/scenePanelTheme.ts
function o(e) {
	return e === "light" ? {
		panelBackgroundClassName: "bg-slate-50",
		overlayClassName: "bg-white/80 text-slate-800 border border-slate-200",
		sceneBackground: "#f8fafc",
		gridPrimary: "#cbd5e1",
		gridSecondary: "#e2e8f0",
		gizmoLabelColor: "#0f172a",
		pointCloudColor: "#0f766e",
		placeholderColor: "#f59e0b",
		ambientLightIntensity: .45,
		hemisphereLightIntensity: .55,
		keyLightIntensity: 1.2,
		fillLightIntensity: .6,
		rimLightIntensity: .85,
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#1e293b"
	} : {
		panelBackgroundClassName: "bg-[#111]",
		overlayClassName: "bg-black/50 text-white border border-white/10",
		sceneBackground: "#111111",
		gridPrimary: "#666",
		gridSecondary: "#444",
		gizmoLabelColor: "white",
		pointCloudColor: "#00ff00",
		placeholderColor: "orange",
		ambientLightIntensity: .35,
		hemisphereLightIntensity: .45,
		keyLightIntensity: 1.05,
		fillLightIntensity: .5,
		rimLightIntensity: .75,
		fallbackMeshColor: "#cbd5e1",
		meshOutlineColor: "#94a3b8"
	};
}
//#endregion
export { n as a, r as i, a as n, i as r, o as t };
