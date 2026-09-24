import { c as e, f as t, i as n, s as r } from "./rafScheduler-DAI3WzmT.js";
import { t as i } from "./createLucideIcon-BrmWW16k.js";
import * as a from "react";
import { useLayoutEffect as o, useMemo as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import * as f from "react-dom";
//#region node_modules/lucide-react/dist/esm/icons/chevrons-up-down.mjs
var p = {
	name: "chevrons-up-down",
	size: 24,
	node: [["path", {
		d: "m7 15 5 5 5-5",
		key: "1hf1tw"
	}], ["path", {
		d: "m7 9 5-5 5 5",
		key: "sgt6xg"
	}]]
};
p.node;
var m = i(p), h = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
h.node;
var g = i(h), _ = Object.defineProperty, v = (e, t) => _(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function y(e, t) {
	let n = a.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ v((e) => {
		let { children: t, ...r } = e, i = a.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ u(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: o = !1 } = i, s = a.useContext(n);
		if (s) return s;
		if (t !== void 0) return t;
		if (!o) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return v(i, "useContext"), [r, i];
}
v(y, "createContext");
// @__NO_SIDE_EFFECTS__
function b(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = a.createContext(r);
		i.displayName = t + "Context";
		let o = n.length;
		n = [...n, r];
		let s = /* @__PURE__ */ v((t) => {
			let { scope: n, children: r, ...s } = t, c = n?.[e]?.[o] || i, l = a.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ u(c.Provider, {
				value: l,
				children: r
			});
		}, "Provider");
		s.displayName = t + "Provider";
		function c(n, s, c = {}) {
			let { optional: l = !1 } = c, u = s?.[e]?.[o] || i, d = a.useContext(u);
			if (d) return d;
			if (r !== void 0) return r;
			if (!l) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return v(c, "useContext"), [s, c];
	}
	v(r, "createContext");
	let i = /* @__PURE__ */ v(() => {
		let t = n.map((e) => a.createContext(e));
		return /* @__PURE__ */ v(function(n) {
			let r = n?.[e] || t;
			return a.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, x(i, ...t)];
}
v(b, "createContextScope");
function x(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ v(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ v(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return a.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
v(x, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var S = Object.defineProperty, C = (e, t) => S(e, "name", {
	value: t,
	configurable: !0
});
function w(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
C(w, "setRef");
function T(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = w(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : w(e[t], null);
			}
		};
	};
}
C(T, "composeRefs");
function E(...e) {
	return a.useCallback(T(...e), e);
}
C(E, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var D = Object.defineProperty, O = (e, t) => D(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function k(e) {
	let t = a.forwardRef((t, n) => {
		let { children: r, ...i } = t, o = null, s = !1, c = [];
		re(r) && typeof se == "function" && (r = se(r._payload)), a.Children.forEach(r, (e) => {
			if (te(e)) {
				s = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				re(n) && typeof se == "function" && (n = se(n._payload)), o = ee(t, n), c.push(o?.props?.children);
			} else c.push(e);
		}), o ? o = a.cloneElement(o, void 0, c) : !s && a.Children.count(r) === 1 && a.isValidElement(r) && (o = r);
		let l = o ? P(o) : void 0, u = E(n, l);
		if (!o) {
			if (r || r === 0) throw Error(s ? oe(e) : ae(e));
			return r;
		}
		let d = N(i, o.props ?? {});
		return o.type !== a.Fragment && (d.ref = n ? u : l), a.cloneElement(o, d);
	});
	return t.displayName = `${e}.Slot`, t;
}
O(k, "createSlot");
var A = /* @__PURE__ */ k("Slot"), j = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function M(e) {
	let t = /* @__PURE__ */ O((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = j, t;
}
O(M, "createSlottable");
var ee = /* @__PURE__ */ O((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return a.isValidElement(t) ? a.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return a.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function N(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
O(N, "mergeProps");
function P(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
O(P, "getElementRef");
function te(e) {
	return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === j;
}
O(te, "isSlottable");
var ne = Symbol.for("react.lazy");
function re(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === ne && "_payload" in e && ie(e._payload);
}
O(re, "isLazyComponent");
function ie(e) {
	return typeof e == "object" && !!e && "then" in e;
}
O(ie, "isPromiseLike");
var ae = /* @__PURE__ */ O((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), oe = /* @__PURE__ */ O((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), se = a.use, ce = Object.defineProperty, le = (e, t) => ce(e, "name", {
	value: t,
	configurable: !0
}), ue = !!(typeof window < "u" && window.document && window.document.createElement);
function F(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ le(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
le(F, "composeEventHandlers");
function de(e) {
	if (!ue) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
le(de, "getOwnerWindow");
function fe(e) {
	if (!ue) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
le(fe, "getOwnerDocument");
function pe(e, t = !1) {
	let { activeElement: n } = fe(e);
	if (!n?.nodeName) return null;
	if (me(n) && n.contentDocument) return pe(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = fe(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
le(pe, "getActiveElement");
function me(e) {
	return e.tagName === "IFRAME";
}
le(me, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var I = globalThis?.document ? a.useLayoutEffect : () => {}, he = Object.defineProperty, ge = (e, t) => he(e, "name", {
	value: t,
	configurable: !0
}), _e = a.useId || (() => void 0), ve = 0;
function L(e) {
	let [t, n] = a.useState(_e());
	return I(() => {
		e || n((e) => e ?? String(ve++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
ge(L, "useId");
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var ye = Object.defineProperty, be = (e, t) => ye(e, "name", {
	value: t,
	configurable: !0
}), R = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ k(`Primitive.${t}`), r = a.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function xe(e, t) {
	e && f.flushSync(() => e.dispatchEvent(t));
}
be(xe, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var Se = Object.defineProperty, Ce = (e, t) => Se(e, "name", {
	value: t,
	configurable: !0
});
function we(e) {
	let t = a.useRef(e);
	return a.useEffect(() => {
		t.current = e;
	}), a.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Ce(we, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Te = Object.defineProperty, z = (e, t) => Te(e, "name", {
	value: t,
	configurable: !0
}), Ee = "dismissableLayer.update", De = "dismissableLayer.pointerDownOutside", Oe = "dismissableLayer.focusOutside", ke, Ae = a.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), je = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ z(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...d } = e, f = a.useContext(Ae), [p, m] = a.useState(null), h = p?.ownerDocument ?? globalThis?.document, [, g] = a.useState({}), _ = E(t, m), v = Array.from(f.layers), [y] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), b = y ? v.indexOf(y) : -1, x = p ? v.indexOf(p) : -1, S = f.layersWithOutsidePointerEventsDisabled.size > 0, C = x >= b, w = a.useRef(!1), T = Pe((e) => {
		o?.(e), c?.(e), e.defaultPrevented || l?.();
	}, {
		ownerDocument: h,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: w,
		dismissableSurfaces: f.dismissableSurfaces,
		shouldHandlePointerDownOutside: a.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...f.branches].some((t) => t.contains(e));
			return C && !t;
		}, [f.branches, C])
	}), D = Fe((e) => {
		if (r && w.current) return;
		let t = e.target;
		[...f.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, h), O = p ? x === v.length - 1 : !1, k = we((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	});
	return a.useEffect(() => {
		if (O) return h.addEventListener("keydown", k, { capture: !0 }), () => h.removeEventListener("keydown", k, { capture: !0 });
	}, [
		h,
		O,
		k
	]), a.useEffect(() => {
		if (p) return n && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (ke = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(p)), f.layers.add(p), Ie(), () => {
			n && (f.layersWithOutsidePointerEventsDisabled.delete(p), f.layersWithOutsidePointerEventsDisabled.size === 0 && (h.body.style.pointerEvents = ke));
		};
	}, [
		p,
		h,
		n,
		f
	]), a.useEffect(() => () => {
		p && (f.layers.delete(p), f.layersWithOutsidePointerEventsDisabled.delete(p), Ie());
	}, [p, f]), a.useEffect(() => {
		let e = /* @__PURE__ */ z(() => g({}), "handleUpdate");
		return document.addEventListener(Ee, e), () => document.removeEventListener(Ee, e);
	}, []), /* @__PURE__ */ u(R.div, {
		...d,
		ref: _,
		style: {
			pointerEvents: S ? C ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: F(e.onFocusCapture, D.onFocusCapture),
		onBlurCapture: F(e.onBlurCapture, D.onBlurCapture),
		onPointerDownCapture: F(e.onPointerDownCapture, T.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Me() {
	let e = a.useContext(Ae), [t, n] = a.useState(null);
	return a.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
z(Me, "useDismissableLayerSurface");
var Ne = /* @__PURE__ */ z(() => !0, "IS_TRUE");
function Pe(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: o, shouldHandlePointerDownOutside: s = Ne } = t, c = we(e), l = a.useRef(!1), u = a.useRef(!1), d = a.useRef(/* @__PURE__ */ new Map()), f = a.useRef(() => {});
	return a.useEffect(() => {
		function e() {
			u.current = !1, i.current = !1, d.current.clear();
		}
		z(e, "resetOutsideInteraction");
		function t() {
			return Array.from(d.current.values()).some(Boolean);
		}
		z(t, "isOutsideInteractionIntercepted");
		function a(e) {
			if (!u.current) return;
			let t = e.target;
			t instanceof Node && [...o].some((e) => e.contains(t)) || d.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				u.current && f.current();
			}, 0);
		}
		z(a, "handleInteractionCapture");
		function p(e) {
			u.current && d.current.set(e.type, !1);
		}
		z(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ z((a) => {
			if (a.target && !l.current) {
				let o = function() {
					n.removeEventListener("click", f.current);
					let r = t();
					e(), r || Le(De, c, p, { discrete: !0 });
				};
				if (z(o, "handleAndDispatchPointerDownOutsideEvent"), !s(a.target)) {
					n.removeEventListener("click", f.current), e(), l.current = !1;
					return;
				}
				let p = { originalEvent: a };
				u.current = !0, i.current = r && a.button === 0, d.current.clear(), !r || a.button !== 0 ? o() : (n.removeEventListener("click", f.current), f.current = o, n.addEventListener("click", f.current, { once: !0 }));
			} else n.removeEventListener("click", f.current), e();
			l.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, a, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", f.current);
			for (let e of h) n.removeEventListener(e, a, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		c,
		r,
		i,
		o,
		s
	]), { onPointerDownCapture: /* @__PURE__ */ z(() => l.current = !0, "onPointerDownCapture") };
}
z(Pe, "usePointerDownOutside");
function Fe(e, t = globalThis?.document) {
	let n = we(e), r = a.useRef(!1);
	return a.useEffect(() => {
		let e = /* @__PURE__ */ z((e) => {
			e.target && !r.current && Le(Oe, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ z(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ z(() => r.current = !1, "onBlurCapture")
	};
}
z(Fe, "useFocusOutside");
function Ie() {
	let e = new CustomEvent(Ee);
	document.dispatchEvent(e);
}
z(Ie, "dispatchUpdate");
function Le(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? xe(i, a) : i.dispatchEvent(a);
}
z(Le, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Re = Object.defineProperty, ze = (e, t) => Re(e, "name", {
	value: t,
	configurable: !0
}), Be = 0, Ve = null;
function He(e) {
	return Ue(), e.children;
}
ze(He, "FocusGuards");
function Ue() {
	a.useEffect(() => {
		Ve ||= {
			start: We(),
			end: We()
		};
		let { start: e, end: t } = Ve;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Be++, () => {
			Be === 1 && (Ve?.start.remove(), Ve?.end.remove(), Ve = null), Be = Math.max(0, Be - 1);
		};
	}, []);
}
ze(Ue, "useFocusGuards");
function We() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
ze(We, "createFocusGuard");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Ge = Object.defineProperty, B = (e, t) => Ge(e, "name", {
	value: t,
	configurable: !0
}), Ke = "focusScope.autoFocusOnMount", qe = "focusScope.autoFocusOnUnmount", Je = {
	bubbles: !1,
	cancelable: !0
}, Ye = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ B(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: o, ...s } = e, [c, l] = a.useState(null), d = we(i), f = we(o), p = a.useRef(null), m = E(t, l), h = a.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	a.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (h.paused || !c) return;
				let t = e.target;
				c.contains(t) ? p.current = t : V(p.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || V(p.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && V(c);
			};
			B(e, "handleFocusIn"), B(t, "handleFocusOut"), B(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return c && r.observe(c, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		c,
		h.paused
	]), a.useEffect(() => {
		if (c) {
			nt.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Ke, Je);
				c.addEventListener(Ke, d), c.dispatchEvent(t), t.defaultPrevented || (Xe(at(Qe(c)), { select: !0 }), document.activeElement === e && V(c));
			}
			return () => {
				c.removeEventListener(Ke, d), setTimeout(() => {
					let t = new CustomEvent(qe, Je);
					c.addEventListener(qe, f), c.dispatchEvent(t), t.defaultPrevented || V(e ?? document.body, { select: !0 }), c.removeEventListener(qe, f), nt.remove(h);
				}, 0);
			};
		}
	}, [
		c,
		d,
		f,
		h
	]);
	let g = a.useCallback((e) => {
		if (!n && !r || h.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = Ze(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && V(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && V(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		h.paused
	]);
	return /* @__PURE__ */ u(R.div, {
		tabIndex: -1,
		...s,
		ref: m,
		onKeyDown: g
	});
}, "FocusScope"));
function Xe(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (V(r, { select: t }), document.activeElement !== n) return;
}
B(Xe, "focusFirst");
function Ze(e) {
	let t = Qe(e);
	return [$e(t, e), $e(t.reverse(), e)];
}
B(Ze, "getTabbableEdges");
function Qe(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ B((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
B(Qe, "getTabbableCandidates");
function $e(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : et(r, { upTo: t }))) return r;
}
B($e, "findVisible");
function et(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
B(et, "isHidden");
function tt(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
B(tt, "isSelectableInput");
function V(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && tt(e) && t && e.select();
	}
}
B(V, "focus");
var nt = rt();
function rt() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = it(e, t), e.unshift(t);
		},
		remove(t) {
			e = it(e, t), e[0]?.resume();
		}
	};
}
B(rt, "createFocusScopesStack");
function it(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
B(it, "arrayRemove");
function at(e) {
	return e.filter((e) => e.tagName !== "A");
}
B(at, "removeLinks");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var ot = [
	"top",
	"right",
	"bottom",
	"left"
], st = Math.min, H = Math.max, ct = Math.round, lt = Math.floor, U = (e) => ({
	x: e,
	y: e
}), ut = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function dt(e, t, n) {
	return H(e, st(t, n));
}
function W(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ft(e) {
	return e.split("-")[0];
}
function pt(e) {
	return e.split("-")[1];
}
function mt(e) {
	return e === "x" ? "y" : "x";
}
function ht(e) {
	return e === "y" ? "height" : "width";
}
function G(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function gt(e) {
	return mt(G(e));
}
function _t(e, t, n) {
	n === void 0 && (n = !1);
	let r = pt(e), i = gt(e), a = ht(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Et(o)), [o, Et(o)];
}
function vt(e) {
	let t = Et(e);
	return [
		yt(e),
		t,
		yt(t)
	];
}
function yt(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var bt = ["left", "right"], xt = ["right", "left"], St = ["top", "bottom"], Ct = ["bottom", "top"];
function wt(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? xt : bt : t ? bt : xt;
		case "left":
		case "right": return t ? St : Ct;
		default: return [];
	}
}
function Tt(e, t, n, r) {
	let i = pt(e), a = wt(ft(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(yt)))), a;
}
function Et(e) {
	let t = ft(e);
	return ut[t] + e.slice(t.length);
}
function Dt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Ot(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Dt(e);
}
function kt(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function At(e, t, n) {
	let { reference: r, floating: i } = e, a = G(t), o = gt(t), s = ht(o), c = ft(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = pt(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function jt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = W(t, e), p = Ot(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = kt(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = kt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Mt = 50, Nt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: jt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = At(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Mt && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = At(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Pt = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = W(e, t) || {};
		if (l == null) return {};
		let d = Ot(u), f = {
			x: n,
			y: r
		}, p = gt(i), m = ht(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = st(d[_], T), D = st(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = dt(E, k, O), j = !c.arrow && pt(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), Ft = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = W(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = ft(r), _ = G(o), v = ft(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Et(o)] : vt(o)), x = p !== "none";
			!d && x && b.push(...Tt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = _t(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === G(t) || T.every((e) => G(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = G(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function It(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Lt(e) {
	return ot.some((t) => e[t] >= 0);
}
var Rt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = W(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = It(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Lt(e)
					} };
				}
				case "escaped": {
					let e = It(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Lt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, zt = /*#__PURE__*/ new Set(["left", "top"]);
async function Bt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = ft(n), s = pt(n), c = G(n) === "y", l = zt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = W(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Vt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Bt(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Ht = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = W(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = G(i), p = mt(f), m = u[p], h = u[f], g = (e, t) => dt(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Ut = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = W(e, t), u = {
				x: n,
				y: r
			}, d = G(i), f = mt(d), p = u[f], m = u[d], h = W(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = zt.has(ft(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Wt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = W(e, t), c = await i.detectOverflow(t, s), l = ft(n), u = pt(n), d = G(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = st(p - c[m], g), y = st(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * H(c.left, c.right) : S = p - 2 * H(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Gt() {
	return typeof window < "u";
}
function Kt(e) {
	return qt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
	return ((qt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function qt(e) {
	return Gt() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function J(e) {
	return Gt() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function Jt(e) {
	return Gt() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function Yt(e) {
	return !Gt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function Xt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Y(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Zt(e) {
	return /^(table|td|th)$/.test(Kt(e));
}
function Qt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var $t = /transform|translate|scale|rotate|perspective|filter/, en = /paint|layout|strict|content/, tn = (e) => !!e && e !== "none", nn;
function rn(e) {
	let t = J(e) ? Y(e) : e;
	return tn(t.transform) || tn(t.translate) || tn(t.scale) || tn(t.rotate) || tn(t.perspective) || !on() && (tn(t.backdropFilter) || tn(t.filter)) || $t.test(t.willChange || "") || en.test(t.contain || "");
}
function an(e) {
	let t = ln(e);
	for (; Jt(t) && !sn(t);) {
		if (rn(t)) return t;
		if (Qt(t)) return null;
		t = ln(t);
	}
	return null;
}
function on() {
	return nn ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), nn;
}
function sn(e) {
	return /^(html|body|#document)$/.test(Kt(e));
}
function Y(e) {
	return K(e).getComputedStyle(e);
}
function cn(e) {
	return J(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ln(e) {
	if (Kt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Yt(e) && e.host || q(e);
	return Yt(t) ? t.host : t;
}
function un(e) {
	let t = ln(e);
	return sn(t) ? (e.ownerDocument || e).body : Jt(t) && Xt(t) ? t : un(t);
}
function dn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = un(e), i = r === e.ownerDocument?.body, a = K(r);
	if (i) {
		let e = fn(a);
		return t.concat(a, a.visualViewport || [], Xt(r) ? r : [], e && n ? dn(e) : []);
	}
	return t.concat(r, dn(r, [], n));
}
function fn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function pn(e) {
	let t = Y(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Jt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ct(n) !== a || ct(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function mn(e) {
	return J(e) ? e : e.contextElement;
}
function hn(e) {
	let t = mn(e);
	if (!Jt(t)) return U(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = pn(t), o = (a ? ct(n.width) : n.width) / r, s = (a ? ct(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var gn = /*#__PURE__*/ U(0);
function _n(e) {
	let t = K(e);
	return !on() || !t.visualViewport ? gn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function vn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === K(e);
}
function yn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = mn(e), o = U(1);
	t && (r ? J(r) && (o = hn(r)) : o = hn(e));
	let s = vn(a, n, r) ? _n(a) : U(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = K(a), t = J(r) ? K(r) : r, n = e, i = fn(n);
		for (; i && t !== n;) {
			let e = hn(i), t = i.getBoundingClientRect(), r = Y(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = K(i), i = fn(n);
		}
	}
	return kt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function bn(e, t) {
	let n = cn(e).scrollLeft;
	return t ? t.left + n : yn(q(e)).left + n;
}
function xn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - bn(e, n),
		y: n.top + t.scrollTop
	};
}
function Sn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = q(r), s = t ? Qt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = U(1), u = U(0), d = Jt(r);
	if ((d || !a) && ((Kt(r) !== "body" || Xt(o)) && (c = cn(r)), d)) {
		let e = yn(r);
		l = hn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? xn(o, c) : U(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Cn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function wn(e) {
	let t = cn(e), n = e.ownerDocument.body, r = H(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = H(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + bn(e), o = -t.scrollTop;
	return Y(n).direction === "rtl" && (a += H(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Tn = 25;
function En(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = K(e), a = q(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !on() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (bn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Tn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Dn(e, t) {
	let n = yn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = hn(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function On(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = En(e, n, t);
	else if (t === "document") r = wn(q(e));
	else if (J(t)) r = Dn(t, n);
	else {
		let n = _n(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return kt(r);
}
function kn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = dn(e, [], !1).filter((e) => J(e) && Kt(e) !== "body"), i = null, a = Y(e).position === "fixed", o = a ? ln(e) : e;
	for (; J(o) && !sn(o);) {
		let e = Y(o), t = rn(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = ln(o);
	}
	return t.set(e, r), r;
}
function An(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Qt(t) ? [] : kn(t, this._c) : [].concat(n), r], o = On(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = On(t, a[e], i);
		s = H(n.top, s), c = st(n.right, c), l = st(n.bottom, l), u = H(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function jn(e) {
	let { width: t, height: n } = pn(e);
	return {
		width: t,
		height: n
	};
}
function Mn(e, t, n) {
	let r = Jt(t), i = q(t), a = n === "fixed", o = yn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = U(0);
	if ((r || !a) && ((Kt(t) !== "body" || Xt(i)) && (s = cn(t)), r)) {
		let e = yn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = bn(i));
	let l = i && !r && !a ? xn(i, s) : U(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Nn(e) {
	return Y(e).position === "static";
}
function Pn(e, t) {
	if (!Jt(e) || Y(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return q(e) === n && (n = n.ownerDocument.body), n;
}
function Fn(e, t) {
	let n = K(e);
	if (Qt(e)) return n;
	if (!Jt(e)) {
		let t = ln(e);
		for (; t && !sn(t);) {
			if (J(t) && !Nn(t)) return t;
			t = ln(t);
		}
		return n;
	}
	let r = Pn(e, t);
	for (; r && Zt(r) && Nn(r);) r = Pn(r, t);
	return r && sn(r) && Nn(r) && !rn(r) ? n : r || an(e) || n;
}
var In = async function(e) {
	let t = this.getOffsetParent || Fn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Mn(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Ln(e) {
	return Y(e).direction === "rtl";
}
var Rn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Sn,
	getDocumentElement: q,
	getClippingRect: An,
	getOffsetParent: Fn,
	getElementRects: In,
	getClientRects: Cn,
	getDimensions: jn,
	getScale: hn,
	isElement: J,
	isRTL: Ln
};
function zn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Bn(e, t, n) {
	let r = null, i, a = q(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = lt(d), h = lt(a.clientWidth - (u + f)), g = lt(a.clientHeight - (d + p)), _ = lt(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: H(0, st(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!zn(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = K(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Vn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = mn(e), u = i || a ? [...l ? dn(l) : [], ...t ? dn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Bn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? yn(e) : null;
	c && g();
	function g() {
		let t = yn(e);
		h && !zn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Hn = Vt, Un = Ht, Wn = Ft, Gn = Wt, Kn = Rt, qn = Pt, Jn = Ut, Yn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Rn,
		...i.platform,
		_c: r
	};
	return Nt(e, t, {
		...i,
		platform: a
	});
}, Xn = typeof document < "u" ? o : function() {};
function Zn(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Zn(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Zn(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Qn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $n(e, t) {
	let n = Qn(e);
	return Math.round(t * n) / n;
}
function er(e) {
	let t = a.useRef(e);
	return Xn(() => {
		t.current = e;
	}), t;
}
function tr(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = e, [d, p] = a.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = a.useState(r);
	Zn(m, r) || h(r);
	let [g, _] = a.useState(null), [v, y] = a.useState(null), b = a.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = a.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = a.useRef(null), T = a.useRef(null), E = a.useRef(d), D = l != null, O = er(l), k = er(i), A = er(u), j = a.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: m
		};
		k.current && (e.platform = k.current), Yn(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Zn(E.current, t) && (E.current = t, f.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		t,
		n,
		k,
		A
	]);
	Xn(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = a.useRef(!1);
	Xn(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Xn(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let ee = a.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), N = a.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), P = a.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = $n(N.floating, d.x), r = $n(N.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Qn(N.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		c,
		N.floating,
		d.x,
		d.y
	]);
	return a.useMemo(() => ({
		...d,
		update: j,
		refs: ee,
		elements: N,
		floatingStyles: P
	}), [
		d,
		j,
		ee,
		N,
		P
	]);
}
var nr = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : qn({
				element: r.current,
				padding: i
			}).fn(n) : r ? qn({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, rr = (e, t) => {
	let n = Hn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ir = (e, t) => {
	let n = Un(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ar = (e, t) => ({
	fn: Jn(e).fn,
	options: [e, t]
}), or = (e, t) => {
	let n = Wn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, sr = (e, t) => {
	let n = Gn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, cr = (e, t) => {
	let n = Kn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, lr = (e, t) => {
	let n = nr(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ur = Object.defineProperty, dr = (e, t) => ur(e, "name", {
	value: t,
	configurable: !0
});
function fr(e) {
	let [t, n] = a.useState(void 0);
	return I(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		}
		n(void 0);
	}, [e]), t;
}
dr(fr, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var pr = Object.defineProperty, mr = (e, t) => pr(e, "name", {
	value: t,
	configurable: !0
}), hr = "Popper", [gr, _r] = /* @__PURE__ */ b(hr), [vr, yr] = gr(hr), br = /* @__PURE__ */ mr((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = a.useState(null), [o, s] = a.useState(void 0);
	return /* @__PURE__ */ u(vr, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: o,
		setPlacementState: s,
		children: n
	});
}, "Popper"), xr = "PopperAnchor", Sr = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ mr(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, o = yr(xr, n), s = a.useRef(null), c = o.onAnchorChange, l = E(t, a.useCallback((e) => {
		s.current = e, e && c(e);
	}, [c])), d = a.useRef(null);
	a.useEffect(() => {
		if (!r) return;
		let e = d.current;
		d.current = r.current, e !== d.current && c(d.current);
	});
	let f = o.placementState && kr(o.placementState), p = f?.[0], m = f?.[1];
	return r ? null : /* @__PURE__ */ u(R.div, {
		"data-radix-popper-side": p,
		"data-radix-popper-align": m,
		...i,
		ref: l
	});
}, "PopperAnchor")), Cr = "PopperContent", [wr, Tr] = gr(Cr), Er = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ mr(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = e, v = yr(Cr, n), [y, b] = a.useState(null), x = E(t, b), [S, C] = a.useState(null), w = fr(S), T = w?.width ?? 0, D = w?.height ?? 0, O = r + (o === "center" ? "" : "-" + o), k = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, A = Array.isArray(d) ? d : [d], j = A.length > 0, M = {
		padding: k,
		boundary: A.filter(Dr),
		altBoundary: j
	}, { refs: ee, floatingStyles: N, placement: P, isPositioned: te, middlewareData: ne } = tr({
		strategy: "fixed",
		placement: O,
		whileElementsMounted: /* @__PURE__ */ mr((...e) => Vn(...e, { animationFrame: h === "always" }), "whileElementsMounted"),
		elements: { reference: v.anchor },
		middleware: [
			rr({
				mainAxis: i + D,
				alignmentAxis: s
			}),
			l && ir({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? ar() : void 0,
				...M
			}),
			l && or({ ...M }),
			sr({
				...M,
				apply: /* @__PURE__ */ mr(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			S && lr({
				element: S,
				padding: c
			}),
			Or({
				arrowWidth: T,
				arrowHeight: D
			}),
			m && cr({
				strategy: "referenceHidden",
				...M,
				boundary: j ? M.boundary : void 0
			})
		]
	}), re = v.setPlacementState;
	I(() => (re(P), () => {
		re(void 0);
	}), [P, re]);
	let [ie, ae] = kr(P), oe = we(g);
	I(() => {
		te && oe?.();
	}, [te, oe]);
	let se = ne.arrow?.x, ce = ne.arrow?.y, le = ne.arrow?.centerOffset !== 0, [ue, F] = a.useState();
	return I(() => {
		y && F(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ u("div", {
		ref: ee.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: te ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ue,
			"--radix-popper-transform-origin": [ne.transformOrigin?.x, ne.transformOrigin?.y].join(" "),
			...ne.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ u(wr, {
			scope: n,
			placedSide: ie,
			placedAlign: ae,
			onArrowChange: C,
			arrowX: se,
			arrowY: ce,
			shouldHideArrow: le,
			children: /* @__PURE__ */ u(R.div, {
				"data-side": ie,
				"data-align": ae,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: te ? _.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent"));
function Dr(e) {
	return e !== null;
}
mr(Dr, "isNotNull");
var Or = /* @__PURE__ */ mr((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = kr(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function kr(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
mr(kr, "getSideAndAlignFromPlacement");
var Ar = br, jr = Sr, Mr = Er, Nr = Object.defineProperty, Pr = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ ((e, t) => Nr(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, o] = a.useState(!1);
	I(() => o(!0), []);
	let s = n || i && globalThis?.document?.body;
	return s ? f.createPortal(/* @__PURE__ */ u(R.div, {
		...r,
		ref: t
	}), s) : null;
}, "Portal")), Fr = Object.defineProperty, Ir = (e, t) => Fr(e, "name", {
	value: t,
	configurable: !0
});
function Lr(e, t) {
	return a.useReducer((e, n) => t[e][n] ?? e, e);
}
Ir(Lr, "useStateMachine");
var Rr = /* @__PURE__ */ Ir((e) => {
	let { present: t, children: n } = e, r = zr(t), i = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n), o = Vr(r.ref, Ur(i));
	return typeof n == "function" || r.isPresent ? a.cloneElement(i, { ref: o }) : null;
}, "Presence");
function zr(e) {
	let [t, n] = a.useState(), r = a.useRef(null), i = a.useRef(e), o = a.useRef("none"), s = a.useRef(void 0), [c, l] = Lr(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return a.useEffect(() => {
		c === "mounted" ? (o.current = s.current ?? Hr(r.current), s.current = void 0) : o.current = "none";
	}, [c]), I(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = o.current, a = Hr(t);
			e ? (s.current = a, l("MOUNT")) : a === "none" || t?.display === "none" ? l("UNMOUNT") : l(n && r !== a ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, l]), I(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, a = /* @__PURE__ */ Ir((a) => {
				let o = Hr(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (l("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Ir((e) => {
				e.target === t && (o.current = Hr(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", a), t.addEventListener("animationend", a), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", a), t.removeEventListener("animationend", a);
			};
		}
		l("ANIMATION_END");
	}, [t, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: a.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, s.current = Hr(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
Ir(zr, "usePresence");
function Br(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Ir(Br, "setRef");
function Vr(...e) {
	let t = a.useRef(e);
	return t.current = e, a.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = Br(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : Br(n[e], null);
			}
		};
	}, []);
}
Ir(Vr, "useStableComposedRefs");
function Hr(e) {
	return e?.animationName || "none";
}
Ir(Hr, "getAnimationName");
function Ur(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Ir(Ur, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var Wr = Object.defineProperty, Gr = (e, t) => Wr(e, "name", {
	value: t,
	configurable: !0
}), Kr = a.useEffectEvent, qr = a.useInsertionEffect;
function Jr(e) {
	if (typeof Kr == "function") return Kr(e);
	let t = a.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof qr == "function" ? qr(() => {
		t.current = e;
	}) : I(() => {
		t.current = e;
	}), a.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Gr(Jr, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Yr = Object.defineProperty, Xr = (e, t) => Yr(e, "name", {
	value: t,
	configurable: !0
}), Zr = a.useInsertionEffect || I;
function Qr({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ Xr(() => {}, "onChange"), caller: r }) {
	let [i, o, s] = $r({
		defaultProp: t,
		onChange: n
	}), c = e !== void 0;
	return [c ? e : i, a.useCallback((t) => {
		if (c) {
			let n = ei(t) ? t(e) : t;
			n !== e && s.current?.(n);
		} else o(t);
	}, [
		c,
		e,
		o,
		s
	])];
}
Xr(Qr, "useControllableState");
function $r({ defaultProp: e, onChange: t }) {
	let [n, r] = a.useState(e), i = a.useRef(n), o = a.useRef(t);
	return Zr(() => {
		o.current = t;
	}, [t]), a.useEffect(() => {
		i.current !== n && (o.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		o
	];
}
Xr($r, "useUncontrolledState");
function ei(e) {
	return typeof e == "function";
}
Xr(ei, "isFunction");
var ti = Symbol("RADIX:SYNC_STATE");
function ni(e, t, n, r) {
	let { prop: i, defaultProp: o, onChange: s, caller: c } = t, l = i !== void 0, u = Jr(s), d = [{
		...n,
		state: o
	}];
	r && d.push(r);
	let [f, p] = a.useReducer((t, n) => {
		if (n.type === ti) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return l && !Object.is(r.state, t.state) && u(r.state), r;
	}, ...d), m = f.state, h = a.useRef(m);
	a.useEffect(() => {
		h.current !== m && (h.current = m, l || u(m));
	}, [
		m,
		h,
		l
	]);
	let g = a.useMemo(() => i === void 0 ? f : {
		...f,
		state: i
	}, [f, i]);
	return a.useEffect(() => {
		l && !Object.is(i, f.state) && p({
			type: ti,
			state: i
		});
	}, [
		i,
		f.state,
		l
	]), [g, p];
}
Xr(ni, "useControllableStateReducer");
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ri = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ii = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), oi = {}, si = 0, ci = function(e) {
	return e && (e.host || ci(e.parentNode));
}, li = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ci(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, ui = function(e, t, n, r) {
	var i = li(t, Array.isArray(e) ? e : [e]);
	oi[n] || (oi[n] = /* @__PURE__ */ new WeakMap());
	var a = oi[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		e && !s.has(e) && (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		e && !c.has(e) && Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ii.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ii.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ai.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), si++, function() {
		o.forEach(function(e) {
			var t = ii.get(e) - 1, i = a.get(e) - 1;
			ii.set(e, t), a.set(e, i), t || (ai.has(e) || e.removeAttribute(r), ai.delete(e)), i || e.removeAttribute(n);
		}), si--, si || (ii = /* @__PURE__ */ new WeakMap(), ii = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), oi = {});
	};
}, di = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ri(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), ui(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, X = function() {
	return X = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, X.apply(this, arguments);
};
function fi(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function pi(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var mi = "right-scroll-bar-position", hi = "width-before-scroll-bar", gi = "with-scroll-bars-hidden", _i = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function vi(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function yi(e, t) {
	var n = c(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var bi = typeof window < "u" ? a.useLayoutEffect : a.useEffect, xi = /* @__PURE__ */ new WeakMap();
function Si(e, t) {
	var n = yi(t || null, function(t) {
		return e.forEach(function(e) {
			return vi(e, t);
		});
	});
	return bi(function() {
		var t = xi.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || vi(e, null);
			}), i.forEach(function(e) {
				r.has(e) || vi(e, a);
			});
		}
		xi.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function Ci(e) {
	return e;
}
function wi(e, t) {
	t === void 0 && (t = Ci);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Ti(e) {
	e === void 0 && (e = {});
	var t = wi(null);
	return t.options = X({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Ei = function(e) {
	var t = e.sideCar, n = fi(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return a.createElement(r, X({}, n));
};
Ei.isSideCarExport = !0;
function Di(e, t) {
	return e.useMedium(t), Ei;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Oi = Ti(), ki = function() {}, Ai = a.forwardRef(function(e, t) {
	var n = a.useRef(null), r = a.useState({
		onScrollCapture: ki,
		onWheelCapture: ki,
		onTouchMoveCapture: ki
	}), i = r[0], o = r[1], s = e.forwardProps, c = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = fi(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = Si([n, t]), w = X(X({}, x), i);
	return a.createElement(a.Fragment, null, d && a.createElement(S, {
		sideCar: Oi,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: n,
		gapMode: b
	}), s ? a.cloneElement(a.Children.only(c), X(X({}, w), { ref: C })) : a.createElement(y, X({}, w, {
		className: l,
		ref: C
	}), c));
});
Ai.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ai.classNames = {
	fullWidth: hi,
	zeroRight: mi
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var ji = function() {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Mi() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = ji();
	return t && e.setAttribute("nonce", t), e;
}
function Ni(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Pi(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Fi = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Mi()) && (Ni(t, n), Pi(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Ii = function() {
	var e = Fi();
	return function(t, n) {
		a.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Li = function() {
	var e = Ii();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Ri = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, zi = function(e) {
	return parseInt(e || "", 10) || 0;
}, Bi = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		zi(n),
		zi(r),
		zi(i)
	];
}, Vi = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Ri;
	var t = Bi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Hi = Li(), Ui = "data-scroll-locked", Wi = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${gi} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Ui}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${mi} {
    right: ${s}px ${r};
  }
  
  .${hi} {
    margin-right: ${s}px ${r};
  }
  
  .${mi} .${mi} {
    right: 0 ${r};
  }
  
  .${hi} .${hi} {
    margin-right: 0 ${r};
  }
  
  body[${Ui}] {
    ${_i}: ${s}px;
  }
`;
}, Gi = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ki = function() {
	a.useEffect(function() {
		return document.body.setAttribute(Ui, (Gi() + 1).toString()), function() {
			var e = Gi() - 1;
			e <= 0 ? document.body.removeAttribute(Ui) : document.body.setAttribute(Ui, e.toString());
		};
	}, []);
}, qi = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	Ki();
	var o = a.useMemo(function() {
		return Vi(i);
	}, [i]);
	return a.createElement(Hi, { styles: Wi(o, !t, i, n ? "" : "!important") });
}, Ji = !1;
if (typeof window < "u") try {
	var Yi = Object.defineProperty({}, "passive", { get: function() {
		return Ji = !0, !0;
	} });
	window.addEventListener("test", Yi, Yi), window.removeEventListener("test", Yi, Yi);
} catch {
	Ji = !1;
}
var Xi = Ji ? { passive: !1 } : !1, Zi = function(e) {
	return e.tagName === "TEXTAREA";
}, Qi = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Zi(e) && n[t] === "visible");
}, $i = function(e) {
	return Qi(e, "overflowY");
}, ea = function(e) {
	return Qi(e, "overflowX");
}, ta = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), ia(e, r)) {
			var i = aa(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, na = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, ra = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, ia = function(e, t) {
	return e === "v" ? $i(t) : ea(t);
}, aa = function(e, t) {
	return e === "v" ? na(t) : ra(t);
}, oa = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, sa = function(e, t, n, r, i) {
	var a = oa(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = aa(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && ia(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, ca = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, la = function(e) {
	return [e.deltaX, e.deltaY];
}, ua = function(e) {
	return e && "current" in e ? e.current : e;
}, da = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, fa = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, pa = 0, ma = [];
function ha(e) {
	var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), i = a.useState(pa++)[0], o = a.useState(Li)[0], s = a.useRef(e);
	a.useEffect(function() {
		s.current = e;
	}, [e]), a.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = pi([e.lockRef.current], (e.shards || []).map(ua), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var c = a.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !s.current.allowPinchZoom;
		var i = ca(e), a = n.current, o = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = ta(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = ta(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (o || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return sa(h, t, e, h === "h" ? o : c, !0);
	}, []), l = a.useCallback(function(e) {
		var n = e;
		if (ma.length && ma[ma.length - 1] === o) {
			var r = "deltaY" in n ? la(n) : ca(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && da(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(ua).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(a.length > 0 ? c(n, a[0]) : !s.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), u = a.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: ga(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = a.useCallback(function(e) {
		n.current = ca(e), r.current = void 0;
	}, []), f = a.useCallback(function(t) {
		u(t.type, la(t), t.target, c(t, e.lockRef.current));
	}, []), p = a.useCallback(function(t) {
		u(t.type, ca(t), t.target, c(t, e.lockRef.current));
	}, []);
	a.useEffect(function() {
		return ma.push(o), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Xi), document.addEventListener("touchmove", l, Xi), document.addEventListener("touchstart", d, Xi), function() {
			ma = ma.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Xi), document.removeEventListener("touchmove", l, Xi), document.removeEventListener("touchstart", d, Xi);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return a.createElement(a.Fragment, null, h ? a.createElement(o, { styles: fa(i) }) : null, m ? a.createElement(qi, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function ga(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var _a = Di(Oi, ha), va = a.forwardRef(function(e, t) {
	return a.createElement(Ai, X({}, e, {
		ref: t,
		sideCar: _a
	}));
});
va.classNames = Ai.classNames;
//#endregion
//#region src/shared/lib/rosviewPortal.ts
function ya() {
	if (!(typeof document > "u")) return document.getElementById("rosview-root") ?? void 0;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var ba = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, xa = e, Sa = (e, t) => (n) => {
	if (t?.variants == null) return xa(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = ba(t) || ba(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return xa(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Ca = Sa("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
}), wa = a.forwardRef(({ className: e, variant: t, size: n, asChild: i = !1, ...a }, o) => /* @__PURE__ */ u(i ? A : "button", {
	className: r(Ca({
		variant: t,
		size: n,
		className: e
	})),
	ref: o,
	...a
}));
wa.displayName = "Button";
//#endregion
//#region node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var Ta = 1, Ea = .9, Da = .8, Oa = .17, ka = .1, Aa = .999, ja = .9999, Ma = .99, Na = /[\\\/_+.#"@\[\(\{&]/, Pa = /[\\\/_+.#"@\[\(\{&]/g, Fa = /[\s-]/, Ia = /[\s-]/g;
function La(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? Ta : Ma;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = La(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= Ta : Na.test(e.charAt(l - 1)) ? (d *= Da, p = e.slice(i, l - 1).match(Pa), p && i > 0 && (d *= Aa ** +p.length)) : Fa.test(e.charAt(l - 1)) ? (d *= Ea, m = e.slice(i, l - 1).match(Ia), m && i > 0 && (d *= Aa ** +m.length)) : (d *= Oa, i > 0 && (d *= Aa ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= ja)), (d < ka && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = La(e, t, n, r, l + 1, a + 2, o), f * ka > d && (d = f * ka)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function Ra(e) {
	return e.toLowerCase().replace(Ia, " ");
}
function za(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, La(e, t, Ra(e), Ra(t), 0, 0, {});
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/dist/index.mjs
var Ba = Object.defineProperty, Z = (e, t) => Ba(e, "name", {
	value: t,
	configurable: !0
}), Va = "Dialog", [Ha, Ua] = /* @__PURE__ */ b(Va), [Wa, Q] = Ha(Va), Ga = /* @__PURE__ */ Z((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !0 } = e, c = a.useRef(null), l = a.useRef(null), [d, f] = Qr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: Va
	}), [p, m] = a.useState(0), [h, g] = a.useState(0);
	return /* @__PURE__ */ u(Wa, {
		scope: t,
		triggerRef: c,
		contentRef: l,
		contentId: L(),
		titleId: L(),
		descriptionId: L(),
		titlePresent: p > 0,
		descriptionPresent: h > 0,
		setTitleCount: m,
		setDescriptionCount: g,
		open: d,
		onOpenChange: f,
		onOpenToggle: a.useCallback(() => f((e) => !e), [f]),
		modal: s,
		children: n
	});
}, "Dialog"), Ka = "DialogPortal", [qa, Ja] = Ha(Ka, { forceMount: void 0 }), Ya = /* @__PURE__ */ Z((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, o = Q(Ka, t);
	return /* @__PURE__ */ u(qa, {
		scope: t,
		forceMount: n,
		children: a.Children.map(r, (e) => /* @__PURE__ */ u(Rr, {
			present: n || o.open,
			children: /* @__PURE__ */ u(Pr, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), Xa = "DialogOverlay", Za = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Ja(Xa, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q(Xa, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ u(Rr, {
		present: r || a.open,
		children: /* @__PURE__ */ u($a, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), Qa = /* @__PURE__ */ k("DialogOverlay.RemoveScroll"), $a = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(Xa, n), a = E(t, Me());
	return /* @__PURE__ */ u(va, {
		as: Qa,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ u(R.div, {
			"data-state": fo(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), eo = "DialogContent", to = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Ja(eo, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q(eo, e.__scopeDialog);
	return /* @__PURE__ */ u(Rr, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(no, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(ro, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), no = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Q(eo, e.__scopeDialog), r = a.useRef(null), i = E(t, n.contentRef, r);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return di(e);
	}, []), /* @__PURE__ */ u(io, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: F(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: F(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: F(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), ro = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Q(eo, e.__scopeDialog), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(io, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), io = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = Q(eo, n);
	return Ue(), /* @__PURE__ */ u(l, { children: /* @__PURE__ */ u(Ye, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(je, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": fo(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), ao = "DialogTitle", oo = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(ao, n), { setTitleCount: a } = i;
	return I(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ u(R.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), so = "DialogDescription", co = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(so, n), { setDescriptionCount: a } = i;
	return I(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ u(R.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), lo = "DialogClose", uo = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(lo, n);
	return /* @__PURE__ */ u(R.button, {
		type: "button",
		...r,
		ref: t,
		onClick: F(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function fo(e) {
	return e ? "open" : "closed";
}
Z(fo, "getState");
//#endregion
//#region node_modules/cmdk/dist/index.mjs
var po = "[cmdk-group=\"\"]", mo = "[cmdk-group-items=\"\"]", ho = "[cmdk-group-heading=\"\"]", go = "[cmdk-item=\"\"]", _o = `${go}:not([aria-disabled="true"])`, vo = "cmdk-item-select", yo = "data-value", bo = (e, t, n) => za(e, t, n), xo = a.createContext(void 0), So = () => a.useContext(xo), Co = a.createContext(void 0), wo = () => a.useContext(Co), To = a.createContext(void 0), Eo = a.forwardRef((e, t) => {
	let n = zo(() => ({
		search: "",
		value: e.value ?? e.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), r = zo(() => /* @__PURE__ */ new Set()), i = zo(() => /* @__PURE__ */ new Map()), o = zo(() => /* @__PURE__ */ new Map()), s = zo(() => /* @__PURE__ */ new Set()), c = Lo(e), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = e, y = L(), b = L(), x = L(), S = a.useRef(null), C = Ho();
	Ro(() => {
		if (d !== void 0) {
			let e = d.trim();
			n.current.value = e, w.emit();
		}
	}, [d]), Ro(() => {
		C(6, A);
	}, []);
	let w = a.useMemo(() => ({
		subscribe: (e) => (s.current.add(e), () => s.current.delete(e)),
		snapshot: () => n.current,
		setState: (e, t, r) => {
			var i, a, o;
			if (!Object.is(n.current[e], t)) {
				if (n.current[e] = t, e === "search") k(), D(), C(1, O);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let e = document.getElementById(x);
						e ? e.focus() : (i = document.getElementById(y)) == null || i.focus();
					}
					if (C(7, () => {
						n.current.selectedItemId = j()?.id, w.emit();
					}), r || C(5, A), c.current?.value !== void 0) {
						let e = t ?? "";
						(o = (a = c.current).onValueChange) == null || o.call(a, e);
						return;
					}
				}
				w.emit();
			}
		},
		emit: () => {
			s.current.forEach((e) => e());
		}
	}), []), T = a.useMemo(() => ({
		value: (e, t, r) => {
			t !== o.current.get(e)?.value && (o.current.set(e, {
				value: t,
				keywords: r
			}), n.current.filtered.items.set(e, E(t, r)), C(2, () => {
				D(), w.emit();
			}));
		},
		item: (e, t) => (r.current.add(e), t && (i.current.has(t) ? i.current.get(t).add(e) : i.current.set(t, /* @__PURE__ */ new Set([e]))), C(3, () => {
			k(), D(), n.current.value || O(), w.emit();
		}), () => {
			o.current.delete(e), r.current.delete(e), n.current.filtered.items.delete(e);
			let t = j();
			C(4, () => {
				k(), t?.getAttribute("id") === e && O(), w.emit();
			});
		}),
		group: (e) => (i.current.has(e) || i.current.set(e, /* @__PURE__ */ new Set()), () => {
			o.current.delete(e), i.current.delete(e);
		}),
		filter: () => c.current.shouldFilter,
		label: l || e["aria-label"],
		getDisablePointerSelection: () => c.current.disablePointerSelection,
		listId: y,
		inputId: x,
		labelId: b,
		listInnerRef: S
	}), []);
	function E(e, t) {
		let r = c.current?.filter ?? bo;
		return e ? r(e, n.current.search, t) : 0;
	}
	function D() {
		if (!n.current.search || c.current.shouldFilter === !1) return;
		let e = n.current.filtered.items, t = [];
		n.current.filtered.groups.forEach((n) => {
			let r = i.current.get(n), a = 0;
			r.forEach((t) => {
				let n = e.get(t);
				a = Math.max(n, a);
			}), t.push([n, a]);
		});
		let r = S.current;
		M().sort((t, n) => {
			let r = t.getAttribute("id"), i = n.getAttribute("id");
			return (e.get(i) ?? 0) - (e.get(r) ?? 0);
		}).forEach((e) => {
			let t = e.closest(mo);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${mo} > *`)) : r.appendChild(e.parentElement === r ? e : e.closest(`${mo} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${po}[${yo}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(yo);
		w.setState("value", e || void 0);
	}
	function k() {
		if (!n.current.search || c.current.shouldFilter === !1) {
			n.current.filtered.count = r.current.size;
			return;
		}
		n.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of r.current) {
			let r = E(o.current.get(t)?.value ?? "", o.current.get(t)?.keywords ?? []);
			n.current.filtered.items.set(t, r), r > 0 && e++;
		}
		for (let [e, t] of i.current) for (let r of t) if (n.current.filtered.items.get(r) > 0) {
			n.current.filtered.groups.add(e);
			break;
		}
		n.current.filtered.count = e;
	}
	function A() {
		var e;
		let t = j();
		t && (t.parentElement?.firstChild === t && ((e = t.closest(po)?.querySelector(ho)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${go}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(_o) || []);
	}
	function ee(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(yo));
	}
	function N(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(yo));
	}
	function P(e) {
		let t = j()?.closest(po), n;
		for (; t && !n;) t = e > 0 ? Fo(t, po) : Io(t, po), n = t?.querySelector(_o);
		n ? w.setState("value", n.getAttribute(yo)) : N(e);
	}
	let te = () => ee(M().length - 1), ne = (e) => {
		e.preventDefault(), e.metaKey ? te() : e.altKey ? P(1) : N(1);
	}, re = (e) => {
		e.preventDefault(), e.metaKey ? ee(0) : e.altKey ? P(-1) : N(-1);
	};
	return a.createElement(R.div, {
		ref: t,
		tabIndex: -1,
		...v,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var t;
			(t = v.onKeyDown) == null || t.call(v, e);
			let n = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || n)) switch (e.key) {
				case "n":
				case "j":
					_ && e.ctrlKey && ne(e);
					break;
				case "ArrowDown":
					ne(e);
					break;
				case "p":
				case "k":
					_ && e.ctrlKey && re(e);
					break;
				case "ArrowUp":
					re(e);
					break;
				case "Home":
					e.preventDefault(), ee(0);
					break;
				case "End":
					e.preventDefault(), te();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(vo);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, a.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: Go
	}, l), Wo(e, (e) => a.createElement(Co.Provider, { value: w }, a.createElement(xo.Provider, { value: T }, e))));
}), Do = a.forwardRef((e, t) => {
	let n = L(), r = a.useRef(null), i = a.useContext(To), o = So(), s = Lo(e), c = s.current?.forceMount ?? i?.forceMount;
	Ro(() => {
		if (!c) return o.item(n, i?.id);
	}, [c]);
	let l = Vo(n, r, [
		e.value,
		e.children,
		r
	], e.keywords), u = wo(), d = Bo((e) => e.value && e.value === l.current), f = Bo((e) => c || o.filter() === !1 ? !0 : !e.search || e.filtered.items.get(n) > 0);
	a.useEffect(() => {
		let t = r.current;
		if (t && !e.disabled) return t.addEventListener(vo, p), () => t.removeEventListener(vo, p);
	}, [
		f,
		e.onSelect,
		e.disabled
	]);
	function p() {
		var e, t;
		m(), (t = (e = s.current).onSelect) == null || t.call(e, l.current);
	}
	function m() {
		u.setState("value", l.current, !0);
	}
	if (!f) return null;
	let { disabled: h, value: g, onSelect: _, forceMount: v, keywords: y, ...b } = e;
	return a.createElement(R.div, {
		ref: T(r, t),
		...b,
		id: n,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!h,
		"aria-selected": !!d,
		"data-disabled": !!h,
		"data-selected": !!d,
		onPointerMove: h || o.getDisablePointerSelection() ? void 0 : m,
		onClick: h ? void 0 : p
	}, e.children);
}), Oo = a.forwardRef((e, t) => {
	let { heading: n, children: r, forceMount: i, ...o } = e, s = L(), c = a.useRef(null), l = a.useRef(null), u = L(), d = So(), f = Bo((e) => i || d.filter() === !1 ? !0 : !e.search || e.filtered.groups.has(s));
	Ro(() => d.group(s), []), Vo(s, c, [
		e.value,
		e.heading,
		l
	]);
	let p = a.useMemo(() => ({
		id: s,
		forceMount: i
	}), [i]);
	return a.createElement(R.div, {
		ref: T(c, t),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: !f || void 0
	}, n && a.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, n), Wo(e, (e) => a.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? u : void 0
	}, a.createElement(To.Provider, { value: p }, e))));
}), ko = a.forwardRef((e, t) => {
	let { alwaysRender: n, ...r } = e, i = a.useRef(null), o = Bo((e) => !e.search);
	return !n && !o ? null : a.createElement(R.div, {
		ref: T(i, t),
		...r,
		"cmdk-separator": "",
		role: "separator"
	});
}), Ao = a.forwardRef((e, t) => {
	let { onValueChange: n, ...r } = e, i = e.value != null, o = wo(), s = Bo((e) => e.search), c = Bo((e) => e.selectedItemId), l = So();
	return a.useEffect(() => {
		e.value != null && o.setState("search", e.value);
	}, [e.value]), a.createElement(R.input, {
		ref: t,
		...r,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": l.listId,
		"aria-labelledby": l.labelId,
		"aria-activedescendant": c,
		id: l.inputId,
		type: "text",
		value: i ? e.value : s,
		onChange: (e) => {
			i || o.setState("search", e.target.value), n?.(e.target.value);
		}
	});
}), jo = a.forwardRef((e, t) => {
	let { children: n, label: r = "Suggestions", ...i } = e, o = a.useRef(null), s = a.useRef(null), c = Bo((e) => e.selectedItemId), l = So();
	return a.useEffect(() => {
		if (s.current && o.current) {
			let e = s.current, t = o.current, n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--cmdk-list-height", n.toFixed(1) + "px");
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		}
	}, []), a.createElement(R.div, {
		ref: T(o, t),
		...i,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": r,
		id: l.listId
	}, Wo(e, (e) => a.createElement("div", {
		ref: T(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, e)));
}), Mo = a.forwardRef((e, t) => {
	let { open: n, onOpenChange: r, overlayClassName: i, contentClassName: o, container: s, ...c } = e;
	return a.createElement(Ga, {
		open: n,
		onOpenChange: r
	}, a.createElement(Ya, { container: s }, a.createElement(Za, {
		"cmdk-overlay": "",
		className: i
	}), a.createElement(to, {
		"aria-label": e.label,
		"cmdk-dialog": "",
		className: o
	}, a.createElement(Eo, {
		ref: t,
		...c
	}))));
}), No = a.forwardRef((e, t) => Bo((e) => e.filtered.count === 0) ? a.createElement(R.div, {
	ref: t,
	...e,
	"cmdk-empty": "",
	role: "presentation"
}) : null), Po = a.forwardRef((e, t) => {
	let { progress: n, children: r, label: i = "Loading...", ...o } = e;
	return a.createElement(R.div, {
		ref: t,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": i
	}, Wo(e, (e) => a.createElement("div", { "aria-hidden": !0 }, e)));
}), $ = Object.assign(Eo, {
	List: jo,
	Item: Do,
	Input: Ao,
	Group: Oo,
	Separator: ko,
	Dialog: Mo,
	Empty: No,
	Loading: Po
});
function Fo(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function Io(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function Lo(e) {
	let t = a.useRef(e);
	return Ro(() => {
		t.current = e;
	}), t;
}
var Ro = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function zo(e) {
	let t = a.useRef();
	return t.current === void 0 && (t.current = e()), t;
}
function Bo(e) {
	let t = wo(), n = () => e(t.snapshot());
	return a.useSyncExternalStore(t.subscribe, n, n);
}
function Vo(e, t, n, r = []) {
	let i = a.useRef(), o = So();
	return Ro(() => {
		var a;
		let s = (() => {
			for (let e of n) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : i.current;
			}
		})(), c = r.map((e) => e.trim());
		o.value(e, s, c), (a = t.current) == null || a.setAttribute(yo, s), i.current = s;
	}), i;
}
var Ho = () => {
	let [e, t] = a.useState(), n = zo(() => /* @__PURE__ */ new Map());
	return Ro(() => {
		n.current.forEach((e) => e()), n.current = /* @__PURE__ */ new Map();
	}, [e]), (e, r) => {
		n.current.set(e, r), t({});
	};
};
function Uo(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Wo({ asChild: e, children: t }, n) {
	return e && a.isValidElement(t) ? a.cloneElement(Uo(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var Go = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, Ko = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($, {
	ref: n,
	className: r("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
	...t
}));
Ko.displayName = $.displayName;
var qo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	className: "flex items-center gap-2 border-b border-border px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ u(g, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ u($.Input, {
		ref: n,
		className: r("flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
		...t
	})]
}));
qo.displayName = $.Input.displayName;
var Jo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.List, {
	ref: n,
	className: r("max-h-[min(18rem,50vh)] overflow-y-auto overflow-x-hidden p-1", e),
	...t
}));
Jo.displayName = $.List.displayName;
var Yo = a.forwardRef((e, t) => /* @__PURE__ */ u($.Empty, {
	ref: t,
	className: "py-6 text-center text-sm text-muted-foreground",
	...e
}));
Yo.displayName = $.Empty.displayName;
var Xo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Group, {
	ref: n,
	className: r("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", e),
	...t
}));
Xo.displayName = $.Group.displayName;
var Zo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Separator, {
	ref: n,
	className: r("-mx-1 h-px bg-border", e),
	...t
}));
Zo.displayName = $.Separator.displayName;
var Qo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Item, {
	ref: n,
	className: r("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50", e),
	...t
}));
Qo.displayName = $.Item.displayName;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var $o = Object.defineProperty, es = (e, t) => $o(e, "name", {
	value: t,
	configurable: !0
}), ts = "Popover", [ns, rs] = /* @__PURE__ */ b(ts, [_r]), is = _r(), [as, os] = ns(ts), ss = /* @__PURE__ */ es((e) => {
	let { __scopePopover: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !1 } = e, c = is(t), l = a.useRef(null), [d, f] = a.useState(!1), [p, m] = Qr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: ts
	});
	return /* @__PURE__ */ u(Ar, {
		...c,
		children: /* @__PURE__ */ u(as, {
			scope: t,
			contentId: L(),
			triggerRef: l,
			open: p,
			onOpenChange: m,
			onOpenToggle: a.useCallback(() => m((e) => !e), [m]),
			hasCustomAnchor: d,
			onCustomAnchorAdd: a.useCallback(() => f(!0), []),
			onCustomAnchorRemove: a.useCallback(() => f(!1), []),
			modal: s,
			children: n
		})
	});
}, "Popover"), cs = "PopoverTrigger", ls = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ es(function(e, t) {
	let { __scopePopover: n, ...r } = e, i = os(cs, n), a = is(n), o = E(t, i.triggerRef), s = /* @__PURE__ */ u(R.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": bs(i.open),
		...r,
		ref: o,
		onClick: F(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ u(jr, {
		asChild: !0,
		...a,
		children: s
	});
}, "PopoverTrigger")), us = "PopoverPortal", [ds, fs] = ns(us, { forceMount: void 0 }), ps = /* @__PURE__ */ es((e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = os(us, t);
	return /* @__PURE__ */ u(ds, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ u(Rr, {
			present: n || a.open,
			children: /* @__PURE__ */ u(Pr, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "PopoverPortal"), ms = "PopoverContent", hs = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ es(function(e, t) {
	let n = fs(ms, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = os(ms, e.__scopePopover);
	return /* @__PURE__ */ u(Rr, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(_s, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(vs, {
			...i,
			ref: t
		})
	});
}, "PopoverContent")), gs = /* @__PURE__ */ k("PopoverContent.RemoveScroll"), _s = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ es(function(e, t) {
	let n = os(ms, e.__scopePopover), r = a.useRef(null), i = E(t, r), o = a.useRef(!1);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return di(e);
	}, []), /* @__PURE__ */ u(va, {
		as: gs,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ u(ys, {
			...e,
			ref: i,
			trapFocus: n.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: F(e.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || n.triggerRef.current?.focus();
			}),
			onPointerDownOutside: F(e.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				o.current = r;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: F(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}, "PopoverContentModal")), vs = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ es(function(e, t) {
	let n = os(ms, e.__scopePopover), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(ys, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "PopoverContentNonModal")), ys = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ es(function(e, t) {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: d, ...f } = e, p = os(ms, n), m = is(n);
	return Ue(), /* @__PURE__ */ u(Ye, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(je, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: d,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => p.onOpenChange(!1),
			deferPointerDownOutside: !0,
			children: /* @__PURE__ */ u(Mr, {
				"data-state": bs(p.open),
				role: "dialog",
				id: p.contentId,
				...m,
				...f,
				ref: t,
				style: {
					...f.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}, "PopoverContentImpl"));
function bs(e) {
	return e ? "open" : "closed";
}
es(bs, "getState");
var xs = ss, Ss = ls, Cs = ps, ws = hs, Ts = xs, Es = Ss, Ds = a.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...i }, a) => /* @__PURE__ */ u(Cs, {
	container: ya(),
	children: /* @__PURE__ */ u(ws, {
		ref: a,
		align: t,
		sideOffset: n,
		className: r("z-[100] w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-xl outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...i
	})
}));
Ds.displayName = ws.displayName;
//#endregion
//#region src/features/panels/framework/TopicQuickPicker.tsx
function Os(e, t, n, r) {
	return e.filter((e) => {
		if (n && !n(e.type)) return !1;
		if (t && t.length > 0) {
			let n = e.type.toLowerCase();
			if (!t.some((e) => n.includes(e.toLowerCase()))) return !1;
		}
		return !(r && r.length > 0 && !e.name.includes(r));
	});
}
function ks(e) {
	return `${e.name} ${e.type}`;
}
var As = ({ value: e, onChange: i, topics: a, typeIncludes: o, topicTypeMatches: l, nameIncludes: f, disabled: p, placeholder: h, searchPlaceholder: g, emptyLabel: _, className: v, triggerClassName: y, contentClassName: b }) => {
	let { formatMessage: x } = t(), S = h ?? x({ id: "panels.framework.topicPicker.placeholder" }), C = g ?? x({ id: "panels.framework.topicPicker.searchPlaceholder" }), w = _ ?? x({ id: "panels.framework.topicPicker.empty" }), T = n((e) => e.sortedTopics), E = a ?? T, D = s(() => Os(E, o, l, f), [
		E,
		o,
		l,
		f
	]), [O, k] = c(!1), A = (e) => {
		let t = e.toLowerCase(), n = D.find((e) => ks(e).toLowerCase() === t);
		return n ? n.name : D.find((e) => e.name.toLowerCase() === t)?.name;
	};
	return /* @__PURE__ */ d(Ts, {
		open: O,
		onOpenChange: k,
		children: [/* @__PURE__ */ u(Es, {
			asChild: !0,
			children: /* @__PURE__ */ d(wa, {
				type: "button",
				variant: "ghost",
				role: "combobox",
				"aria-expanded": O,
				disabled: p,
				className: r("h-8 min-w-0 w-full justify-between gap-2 px-2 font-mono text-xs font-normal", v, y),
				children: [/* @__PURE__ */ u("span", {
					className: "truncate text-left",
					children: e.length > 0 ? e : S
				}), /* @__PURE__ */ u(m, {
					"data-icon": "inline-end",
					className: "shrink-0 opacity-50"
				})]
			})
		}), /* @__PURE__ */ u(Ds, {
			className: r("w-[min(28rem,calc(100vw-2rem))] p-0", b),
			align: "start",
			children: /* @__PURE__ */ d(Ko, {
				shouldFilter: !0,
				children: [/* @__PURE__ */ u(qo, { placeholder: C }), /* @__PURE__ */ d(Jo, { children: [/* @__PURE__ */ u(Yo, { children: w }), /* @__PURE__ */ u(Xo, { children: D.map((t) => {
					let n = t.name === e;
					return /* @__PURE__ */ u(Qo, {
						value: ks(t),
						className: r(n && "bg-primary/10"),
						onSelect: (e) => {
							let t = A(e);
							t != null && i(t), k(!1);
						},
						children: /* @__PURE__ */ d("div", {
							className: "flex min-w-0 flex-1 flex-col gap-0.5",
							children: [/* @__PURE__ */ u("div", {
								className: r("truncate text-[11px] font-medium leading-4", n ? "text-primary" : "text-foreground"),
								children: t.name
							}), /* @__PURE__ */ u("div", {
								className: "truncate text-[10px] leading-4 text-muted-foreground",
								children: t.type
							})]
						})
					}, t.name);
				}) })] })]
			})
		})]
	});
};
//#endregion
export { R as A, Ar as C, Ue as D, Ye as E, k as F, E as I, b as L, L as M, I as N, je as O, F as P, g as R, Mr as S, fr as T, di as _, Ga as a, Pr as b, co as c, oo as d, wa as f, va as g, ya as h, Es as i, xe as j, we as k, Za as l, Sa as m, Ts as n, uo as o, Ca as p, Ds as r, to as s, As as t, Ya as u, Qr as v, _r as w, jr as x, Rr as y };
