import { s as e } from "./rafScheduler-BAifbkGY.js";
import { createContext as t, useContext as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/features/panels/framework/PanelTopicBar.tsx
var i = t(!0), a = ({ visible: e, children: t }) => /* @__PURE__ */ r(i.Provider, {
	value: e,
	children: t
}), o = ({ className: t, children: a }) => n(i) ? /* @__PURE__ */ r("div", {
	"data-testid": "panel-topic-bar",
	className: e("flex shrink-0 items-center gap-2 border-b border-border bg-muted px-2", t),
	children: a
}) : null;
//#endregion
export { a as n, o as t };
