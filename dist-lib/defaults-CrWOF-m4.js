//#region src/features/panels/ThreeD/defaults.ts
var e = () => ({
	sourceType: "topic",
	topic: "",
	url: "",
	fileContent: ""
}), t = () => ({
	showGrid: !0,
	showAxes: !1,
	showPlaceholder: !0,
	pointSize: .05,
	skeleton: {
		enabled: !0,
		renderMode: "stick",
		scale: .01,
		yUpToZUp: !0,
		flipY: !0,
		color: "#22c55e"
	},
	urdf: e(),
	topicSettings: []
});
//#endregion
export { e as n, t };
