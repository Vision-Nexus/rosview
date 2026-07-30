import { c as e, f as t, i as n, s as r } from "./rafScheduler-CjUs5qQm.js";
import { t as i } from "./createLucideIcon-C0nbxVvC.js";
import * as a from "react";
import { useLayoutEffect as o, useMemo as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import * as f from "react-dom";
var p = i("ChevronsUpDown", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), m = i("Search", [["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}], ["path", {
	d: "m21 21-4.3-4.3",
	key: "1qie3q"
}]]), h = Object.defineProperty, g = (e, t) => h(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function _(e, t) {
	let n = a.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ g((e) => {
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
	return g(i, "useContext"), [r, i];
}
g(_, "createContext");
// @__NO_SIDE_EFFECTS__
function v(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = a.createContext(r);
		i.displayName = t + "Context";
		let o = n.length;
		n = [...n, r];
		let s = /* @__PURE__ */ g((t) => {
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
		return g(c, "useContext"), [s, c];
	}
	g(r, "createContext");
	let i = /* @__PURE__ */ g(() => {
		let t = n.map((e) => a.createContext(e));
		return /* @__PURE__ */ g(function(n) {
			let r = n?.[e] || t;
			return a.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, y(i, ...t)];
}
g(v, "createContextScope");
function y(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ g(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ g(function(e) {
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
g(y, "composeContextScopes");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.5_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var b = Object.defineProperty, x = (e, t) => b(e, "name", {
	value: t,
	configurable: !0
});
function S(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
x(S, "setRef");
function C(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = S(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : S(e[t], null);
			}
		};
	};
}
x(C, "composeRefs");
function w(...e) {
	return a.useCallback(C(...e), e);
}
x(w, "useComposedRefs");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.3.3_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-slot/dist/index.mjs
var T = Object.defineProperty, E = (e, t) => T(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function D(e) {
	let t = a.forwardRef((t, n) => {
		let { children: r, ...i } = t, o = null, s = !1, c = [];
		ne(r) && typeof ae == "function" && (r = ae(r._payload)), a.Children.forEach(r, (e) => {
			if (N(e)) {
				s = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				ne(n) && typeof ae == "function" && (n = ae(n._payload)), o = j(t, n), c.push(o?.props?.children);
			} else c.push(e);
		}), o ? o = a.cloneElement(o, void 0, c) : !s && a.Children.count(r) === 1 && a.isValidElement(r) && (o = r);
		let l = o ? ee(o) : void 0, u = w(n, l);
		if (!o) {
			if (r || r === 0) throw Error(s ? ie(e) : re(e));
			return r;
		}
		let d = M(i, o.props ?? {});
		return o.type !== a.Fragment && (d.ref = n ? u : l), a.cloneElement(o, d);
	});
	return t.displayName = `${e}.Slot`, t;
}
E(D, "createSlot");
var O = /* @__PURE__ */ D("Slot"), k = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function A(e) {
	let t = /* @__PURE__ */ E((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = k, t;
}
E(A, "createSlottable");
var j = /* @__PURE__ */ E((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return a.isValidElement(t) ? a.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return a.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function M(e, t) {
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
E(M, "mergeProps");
function ee(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
E(ee, "getElementRef");
function N(e) {
	return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === k;
}
E(N, "isSlottable");
var te = Symbol.for("react.lazy");
function ne(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === te && "_payload" in e && P(e._payload);
}
E(ne, "isLazyComponent");
function P(e) {
	return typeof e == "object" && !!e && "then" in e;
}
E(P, "isPromiseLike");
var re = /* @__PURE__ */ E((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), ie = /* @__PURE__ */ E((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), ae = a.use, oe = Object.defineProperty, se = (e, t) => oe(e, "name", {
	value: t,
	configurable: !0
}), ce = !!(typeof window < "u" && window.document && window.document.createElement);
function F(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ se(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
se(F, "composeEventHandlers");
function le(e) {
	if (!ce) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
se(le, "getOwnerWindow");
function ue(e) {
	if (!ce) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
se(ue, "getOwnerDocument");
function de(e, t = !1) {
	let { activeElement: n } = ue(e);
	if (!n?.nodeName) return null;
	if (fe(n) && n.contentDocument) return de(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = ue(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
se(de, "getActiveElement");
function fe(e) {
	return e.tagName === "IFRAME";
}
se(fe, "isFrame");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.4_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var I = globalThis?.document ? a.useLayoutEffect : () => {}, pe = Object.defineProperty, me = (e, t) => pe(e, "name", {
	value: t,
	configurable: !0
}), he = a.useId || (() => void 0), ge = 0;
function L(e) {
	let [t, n] = a.useState(he());
	return I(() => {
		e || n((e) => e ?? String(ge++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
me(L, "useId");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-primitive@2.1.10_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@1_ek4d4mqv7z2x5nnqnf5o2sri4e/node_modules/@radix-ui/react-primitive/dist/index.mjs
var _e = Object.defineProperty, ve = (e, t) => _e(e, "name", {
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
	let n = /* @__PURE__ */ D(`Primitive.${t}`), r = a.forwardRef((e, r) => {
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
function ye(e, t) {
	e && f.flushSync(() => e.dispatchEvent(t));
}
ve(ye, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.4_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var be = Object.defineProperty, xe = (e, t) => be(e, "name", {
	value: t,
	configurable: !0
});
function Se(e) {
	let t = a.useRef(e);
	return a.useEffect(() => {
		t.current = e;
	}), a.useMemo(() => ((...e) => t.current?.(...e)), []);
}
xe(Se, "useCallbackRef");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.19_@types+react-dom@19.2.3_@types+react@19.2.17__@types_gqnbcgrtq6kzewfr75bbh3smea/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Ce = Object.defineProperty, z = (e, t) => Ce(e, "name", {
	value: t,
	configurable: !0
}), we = "dismissableLayer.update", Te = "dismissableLayer.pointerDownOutside", Ee = "dismissableLayer.focusOutside", De, Oe = a.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), ke = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ z(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...d } = e, f = a.useContext(Oe), [p, m] = a.useState(null), h = p?.ownerDocument ?? globalThis?.document, [, g] = a.useState({}), _ = w(t, m), v = Array.from(f.layers), [y] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), b = y ? v.indexOf(y) : -1, x = p ? v.indexOf(p) : -1, S = f.layersWithOutsidePointerEventsDisabled.size > 0, C = x >= b, T = a.useRef(!1), E = Me((e) => {
		o?.(e), c?.(e), e.defaultPrevented || l?.();
	}, {
		ownerDocument: h,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: T,
		dismissableSurfaces: f.dismissableSurfaces,
		shouldHandlePointerDownOutside: a.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...f.branches].some((t) => t.contains(e));
			return C && !t;
		}, [f.branches, C])
	}), D = Ne((e) => {
		if (r && T.current) return;
		let t = e.target;
		[...f.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, h), O = p ? x === v.length - 1 : !1, k = Se((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	});
	return a.useEffect(() => {
		if (O) return h.addEventListener("keydown", k, { capture: !0 }), () => h.removeEventListener("keydown", k, { capture: !0 });
	}, [
		h,
		O,
		k
	]), a.useEffect(() => {
		if (p) return n && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (De = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(p)), f.layers.add(p), Pe(), () => {
			n && (f.layersWithOutsidePointerEventsDisabled.delete(p), f.layersWithOutsidePointerEventsDisabled.size === 0 && (h.body.style.pointerEvents = De));
		};
	}, [
		p,
		h,
		n,
		f
	]), a.useEffect(() => () => {
		p && (f.layers.delete(p), f.layersWithOutsidePointerEventsDisabled.delete(p), Pe());
	}, [p, f]), a.useEffect(() => {
		let e = /* @__PURE__ */ z(() => g({}), "handleUpdate");
		return document.addEventListener(we, e), () => document.removeEventListener(we, e);
	}, []), /* @__PURE__ */ u(R.div, {
		...d,
		ref: _,
		style: {
			pointerEvents: S ? C ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: F(e.onFocusCapture, D.onFocusCapture),
		onBlurCapture: F(e.onBlurCapture, D.onBlurCapture),
		onPointerDownCapture: F(e.onPointerDownCapture, E.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Ae() {
	let e = a.useContext(Oe), [t, n] = a.useState(null);
	return a.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
z(Ae, "useDismissableLayerSurface");
var je = /* @__PURE__ */ z(() => !0, "IS_TRUE");
function Me(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: o, shouldHandlePointerDownOutside: s = je } = t, c = Se(e), l = a.useRef(!1), u = a.useRef(!1), d = a.useRef(/* @__PURE__ */ new Map()), f = a.useRef(() => {});
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
					e(), r || Fe(Te, c, p, { discrete: !0 });
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
z(Me, "usePointerDownOutside");
function Ne(e, t = globalThis?.document) {
	let n = Se(e), r = a.useRef(!1);
	return a.useEffect(() => {
		let e = /* @__PURE__ */ z((e) => {
			e.target && !r.current && Fe(Ee, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ z(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ z(() => r.current = !1, "onBlurCapture")
	};
}
z(Ne, "useFocusOutside");
function Pe() {
	let e = new CustomEvent(we);
	document.dispatchEvent(e);
}
z(Pe, "dispatchUpdate");
function Fe(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? ye(i, a) : i.dispatchEvent(a);
}
z(Fe, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.6_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Ie = Object.defineProperty, Le = (e, t) => Ie(e, "name", {
	value: t,
	configurable: !0
}), Re = 0, ze = null;
function Be(e) {
	return Ve(), e.children;
}
Le(Be, "FocusGuards");
function Ve() {
	a.useEffect(() => {
		ze ||= {
			start: He(),
			end: He()
		};
		let { start: e, end: t } = ze;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Re++, () => {
			Re === 1 && (ze?.start.remove(), ze?.end.remove(), ze = null), Re = Math.max(0, Re - 1);
		};
	}, []);
}
Le(Ve, "useFocusGuards");
function He() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Le(He, "createFocusGuard");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-focus-scope@1.1.16_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react_txzvvtx54nj52kf6fzg6tlcyki/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Ue = Object.defineProperty, B = (e, t) => Ue(e, "name", {
	value: t,
	configurable: !0
}), We = "focusScope.autoFocusOnMount", Ge = "focusScope.autoFocusOnUnmount", Ke = {
	bubbles: !1,
	cancelable: !0
}, qe = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ B(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: o, ...s } = e, [c, l] = a.useState(null), d = Se(i), f = Se(o), p = a.useRef(null), m = w(t, l), h = a.useRef({
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
			et.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(We, Ke);
				c.addEventListener(We, d), c.dispatchEvent(t), t.defaultPrevented || (Je(rt(Xe(c)), { select: !0 }), document.activeElement === e && V(c));
			}
			return () => {
				c.removeEventListener(We, d), setTimeout(() => {
					let t = new CustomEvent(Ge, Ke);
					c.addEventListener(Ge, f), c.dispatchEvent(t), t.defaultPrevented || V(e ?? document.body, { select: !0 }), c.removeEventListener(Ge, f), et.remove(h);
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
			let t = e.currentTarget, [r, a] = Ye(t);
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
function Je(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (V(r, { select: t }), document.activeElement !== n) return;
}
B(Je, "focusFirst");
function Ye(e) {
	let t = Xe(e);
	return [Ze(t, e), Ze(t.reverse(), e)];
}
B(Ye, "getTabbableEdges");
function Xe(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ B((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
B(Xe, "getTabbableCandidates");
function Ze(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Qe(r, { upTo: t }))) return r;
}
B(Ze, "findVisible");
function Qe(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
B(Qe, "isHidden");
function $e(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
B($e, "isSelectableInput");
function V(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && $e(e) && t && e.select();
	}
}
B(V, "focus");
var et = tt();
function tt() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = nt(e, t), e.unshift(t);
		},
		remove(t) {
			e = nt(e, t), e[0]?.resume();
		}
	};
}
B(tt, "createFocusScopesStack");
function nt(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
B(nt, "arrayRemove");
function rt(e) {
	return e.filter((e) => e.tagName !== "A");
}
B(rt, "removeLinks");
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var it = [
	"top",
	"right",
	"bottom",
	"left"
], at = Math.min, H = Math.max, ot = Math.round, st = Math.floor, U = (e) => ({
	x: e,
	y: e
}), ct = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function lt(e, t, n) {
	return H(e, at(t, n));
}
function W(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ut(e) {
	return e.split("-")[0];
}
function dt(e) {
	return e.split("-")[1];
}
function ft(e) {
	return e === "x" ? "y" : "x";
}
function pt(e) {
	return e === "y" ? "height" : "width";
}
function G(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function mt(e) {
	return ft(G(e));
}
function ht(e, t, n) {
	n === void 0 && (n = !1);
	let r = dt(e), i = mt(e), a = pt(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = wt(o)), [o, wt(o)];
}
function gt(e) {
	let t = wt(e);
	return [
		_t(e),
		t,
		_t(t)
	];
}
function _t(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var vt = ["left", "right"], yt = ["right", "left"], bt = ["top", "bottom"], xt = ["bottom", "top"];
function St(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? yt : vt : t ? vt : yt;
		case "left":
		case "right": return t ? bt : xt;
		default: return [];
	}
}
function Ct(e, t, n, r) {
	let i = dt(e), a = St(ut(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(_t)))), a;
}
function wt(e) {
	let t = ut(e);
	return ct[t] + e.slice(t.length);
}
function Tt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Et(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Tt(e);
}
function Dt(e) {
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
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Ot(e, t, n) {
	let { reference: r, floating: i } = e, a = G(t), o = mt(t), s = pt(o), c = ut(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = dt(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function kt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = W(t, e), p = Et(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Dt(await i.getClippingRect({
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
	}, y = Dt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var At = 50, jt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: kt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ot(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < At && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ot(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Mt = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = W(e, t) || {};
		if (l == null) return {};
		let d = Et(u), f = {
			x: n,
			y: r
		}, p = mt(i), m = pt(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = at(d[_], T), D = at(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = lt(E, k, O), j = !c.arrow && dt(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
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
}), Nt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = W(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = ut(r), _ = G(o), v = ut(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [wt(o)] : gt(o)), x = p !== "none";
			!d && x && b.push(...Ct(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ht(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== G(t)) || T.every((e) => G(e.placement) !== _ || e.overflows[0] > 0))) return {
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
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Pt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ft(e) {
	return it.some((t) => e[t] >= 0);
}
var It = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = W(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Pt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ft(e)
					} };
				}
				case "escaped": {
					let e = Pt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ft(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Lt = /*#__PURE__*/ new Set(["left", "top"]);
async function Rt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = ut(n), s = dt(n), c = G(n) === "y", l = Lt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = W(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var zt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Rt(t, e);
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
}, Bt = function(e) {
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
			}, d = await a.detectOverflow(t, l), f = G(i), p = ft(f), m = u[p], h = u[f], g = (e, t) => lt(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Vt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = W(e, t), u = {
				x: n,
				y: r
			}, d = G(i), f = ft(d), p = u[f], m = u[d], h = W(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Lt.has(ut(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ht = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = W(e, t), c = await i.detectOverflow(t, s), l = ut(n), u = dt(n), d = G(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = at(p - c[m], g), y = at(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
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
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ut() {
	return typeof window < "u";
}
function Wt(e) {
	return Gt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
	return ((Gt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Gt(e) {
	return Ut() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function J(e) {
	return Ut() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function Kt(e) {
	return Ut() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function qt(e) {
	return !Ut() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function Jt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Y(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Yt(e) {
	return /^(table|td|th)$/.test(Wt(e));
}
function Xt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Zt = /transform|translate|scale|rotate|perspective|filter/, Qt = /paint|layout|strict|content/, $t = (e) => !!e && e !== "none", en;
function tn(e) {
	let t = J(e) ? Y(e) : e;
	return $t(t.transform) || $t(t.translate) || $t(t.scale) || $t(t.rotate) || $t(t.perspective) || !rn() && ($t(t.backdropFilter) || $t(t.filter)) || Zt.test(t.willChange || "") || Qt.test(t.contain || "");
}
function nn(e) {
	let t = sn(e);
	for (; Kt(t) && !an(t);) {
		if (tn(t)) return t;
		if (Xt(t)) return null;
		t = sn(t);
	}
	return null;
}
function rn() {
	return en ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), en;
}
function an(e) {
	return /^(html|body|#document)$/.test(Wt(e));
}
function Y(e) {
	return K(e).getComputedStyle(e);
}
function on(e) {
	return J(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function sn(e) {
	if (Wt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || qt(e) && e.host || q(e);
	return qt(t) ? t.host : t;
}
function cn(e) {
	let t = sn(e);
	return an(t) ? (e.ownerDocument || e).body : Kt(t) && Jt(t) ? t : cn(t);
}
function ln(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = cn(e), i = r === e.ownerDocument?.body, a = K(r);
	if (i) {
		let e = un(a);
		return t.concat(a, a.visualViewport || [], Jt(r) ? r : [], e && n ? ln(e) : []);
	} else return t.concat(r, ln(r, [], n));
}
function un(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function dn(e) {
	let t = Y(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Kt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ot(n) !== a || ot(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function fn(e) {
	return J(e) ? e : e.contextElement;
}
function pn(e) {
	let t = fn(e);
	if (!Kt(t)) return U(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = dn(t), o = (a ? ot(n.width) : n.width) / r, s = (a ? ot(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var mn = /*#__PURE__*/ U(0);
function hn(e) {
	let t = K(e);
	return !rn() || !t.visualViewport ? mn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function gn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === K(e);
}
function _n(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = fn(e), o = U(1);
	t && (r ? J(r) && (o = pn(r)) : o = pn(e));
	let s = gn(a, n, r) ? hn(a) : U(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = K(a), t = J(r) ? K(r) : r, n = e, i = un(n);
		for (; i && t !== n;) {
			let e = pn(i), t = i.getBoundingClientRect(), r = Y(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = K(i), i = un(n);
		}
	}
	return Dt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function vn(e, t) {
	let n = on(e).scrollLeft;
	return t ? t.left + n : _n(q(e)).left + n;
}
function yn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - vn(e, n),
		y: n.top + t.scrollTop
	};
}
function bn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = q(r), s = t ? Xt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = U(1), u = U(0), d = Kt(r);
	if ((d || !a) && ((Wt(r) !== "body" || Jt(o)) && (c = on(r)), d)) {
		let e = _n(r);
		l = pn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? yn(o, c) : U(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function xn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Sn(e) {
	let t = on(e), n = e.ownerDocument.body, r = H(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = H(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + vn(e), o = -t.scrollTop;
	return Y(n).direction === "rtl" && (a += H(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Cn = 25;
function wn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = K(e), a = q(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !rn() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (vn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Cn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Tn(e, t) {
	let n = _n(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = pn(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function En(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = wn(e, n, t);
	else if (t === "document") r = Sn(q(e));
	else if (J(t)) r = Tn(t, n);
	else {
		let n = hn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Dt(r);
}
function Dn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ln(e, [], !1).filter((e) => J(e) && Wt(e) !== "body"), i = null, a = Y(e).position === "fixed", o = a ? sn(e) : e;
	for (; J(o) && !an(o);) {
		let e = Y(o), t = tn(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = sn(o);
	}
	return t.set(e, r), r;
}
function On(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Xt(t) ? [] : Dn(t, this._c) : [].concat(n), r], o = En(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = En(t, a[e], i);
		s = H(n.top, s), c = at(n.right, c), l = at(n.bottom, l), u = H(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function kn(e) {
	let { width: t, height: n } = dn(e);
	return {
		width: t,
		height: n
	};
}
function An(e, t, n) {
	let r = Kt(t), i = q(t), a = n === "fixed", o = _n(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = U(0);
	if ((r || !a) && ((Wt(t) !== "body" || Jt(i)) && (s = on(t)), r)) {
		let e = _n(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = vn(i));
	let l = i && !r && !a ? yn(i, s) : U(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function jn(e) {
	return Y(e).position === "static";
}
function Mn(e, t) {
	if (!Kt(e) || Y(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return q(e) === n && (n = n.ownerDocument.body), n;
}
function Nn(e, t) {
	let n = K(e);
	if (Xt(e)) return n;
	if (!Kt(e)) {
		let t = sn(e);
		for (; t && !an(t);) {
			if (J(t) && !jn(t)) return t;
			t = sn(t);
		}
		return n;
	}
	let r = Mn(e, t);
	for (; r && Yt(r) && jn(r);) r = Mn(r, t);
	return r && an(r) && jn(r) && !tn(r) ? n : r || nn(e) || n;
}
var Pn = async function(e) {
	let t = this.getOffsetParent || Nn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: An(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Fn(e) {
	return Y(e).direction === "rtl";
}
var In = {
	convertOffsetParentRelativeRectToViewportRelativeRect: bn,
	getDocumentElement: q,
	getClippingRect: On,
	getOffsetParent: Nn,
	getElementRects: Pn,
	getClientRects: xn,
	getDimensions: kn,
	getScale: pn,
	isElement: J,
	isRTL: Fn
};
function Ln(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Rn(e, t, n) {
	let r = null, i, a = q(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = st(d), h = st(a.clientWidth - (u + f)), g = st(a.clientHeight - (d + p)), _ = st(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: H(0, at(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Ln(l, e.getBoundingClientRect())) return s();
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
function zn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = fn(e), u = i || a ? [...l ? ln(l) : [], ...t ? ln(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Rn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? _n(e) : null;
	c && g();
	function g() {
		let t = _n(e);
		h && !Ln(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Bn = zt, Vn = Bt, Hn = Nt, Un = Ht, Wn = It, Gn = Mt, Kn = Vt, qn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...In,
		...i.platform,
		_c: r
	};
	return jt(e, t, {
		...i,
		platform: a
	});
}, Jn = typeof document < "u" ? o : function() {};
function Yn(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Yn(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Yn(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Xn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zn(e, t) {
	let n = Xn(e);
	return Math.round(t * n) / n;
}
function Qn(e) {
	let t = a.useRef(e);
	return Jn(() => {
		t.current = e;
	}), t;
}
function $n(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = e, [d, p] = a.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = a.useState(r);
	Yn(m, r) || h(r);
	let [g, _] = a.useState(null), [v, y] = a.useState(null), b = a.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = a.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = a.useRef(null), T = a.useRef(null), E = a.useRef(d), D = l != null, O = Qn(l), k = Qn(i), A = Qn(u), j = a.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: m
		};
		k.current && (e.platform = k.current), qn(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Yn(E.current, t) && (E.current = t, f.flushSync(() => {
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
	Jn(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = a.useRef(!1);
	Jn(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Jn(() => {
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
	}), [S, C]), te = a.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = Zn(N.floating, d.x), r = Zn(N.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Xn(N.floating) >= 1.5 && { willChange: "transform" }
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
		floatingStyles: te
	}), [
		d,
		j,
		ee,
		N,
		te
	]);
}
var er = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : Gn({
				element: r.current,
				padding: i
			}).fn(n) : r ? Gn({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, tr = (e, t) => {
	let n = Bn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, nr = (e, t) => {
	let n = Vn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, rr = (e, t) => ({
	fn: Kn(e).fn,
	options: [e, t]
}), ir = (e, t) => {
	let n = Hn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ar = (e, t) => {
	let n = Un(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, or = (e, t) => {
	let n = Wn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, sr = (e, t) => {
	let n = er(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, cr = Object.defineProperty, lr = (e, t) => cr(e, "name", {
	value: t,
	configurable: !0
});
function ur(e) {
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
		} else n(void 0);
	}, [e]), t;
}
lr(ur, "useSize");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-popper@1.3.7_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@19.2._7b2zqlyhiyxkks45qyyqy474o4/node_modules/@radix-ui/react-popper/dist/index.mjs
var dr = Object.defineProperty, fr = (e, t) => dr(e, "name", {
	value: t,
	configurable: !0
}), pr = "Popper", [mr, hr] = /* @__PURE__ */ v(pr), [gr, _r] = mr(pr), vr = /* @__PURE__ */ fr((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = a.useState(null), [o, s] = a.useState(void 0);
	return /* @__PURE__ */ u(gr, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: o,
		setPlacementState: s,
		children: n
	});
}, "Popper"), yr = "PopperAnchor", br = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ fr(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, o = _r(yr, n), s = a.useRef(null), c = o.onAnchorChange, l = w(t, a.useCallback((e) => {
		s.current = e, e && c(e);
	}, [c])), d = a.useRef(null);
	a.useEffect(() => {
		if (!r) return;
		let e = d.current;
		d.current = r.current, e !== d.current && c(d.current);
	});
	let f = o.placementState && Dr(o.placementState), p = f?.[0], m = f?.[1];
	return r ? null : /* @__PURE__ */ u(R.div, {
		"data-radix-popper-side": p,
		"data-radix-popper-align": m,
		...i,
		ref: l
	});
}, "PopperAnchor")), xr = "PopperContent", [Sr, Cr] = mr(xr), wr = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ fr(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = e, v = _r(xr, n), [y, b] = a.useState(null), x = w(t, b), [S, C] = a.useState(null), T = ur(S), E = T?.width ?? 0, D = T?.height ?? 0, O = r + (o === "center" ? "" : "-" + o), k = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, A = Array.isArray(d) ? d : [d], j = A.length > 0, M = {
		padding: k,
		boundary: A.filter(Tr),
		altBoundary: j
	}, { refs: ee, floatingStyles: N, placement: te, isPositioned: ne, middlewareData: P } = $n({
		strategy: "fixed",
		placement: O,
		whileElementsMounted: /* @__PURE__ */ fr((...e) => zn(...e, { animationFrame: h === "always" }), "whileElementsMounted"),
		elements: { reference: v.anchor },
		middleware: [
			tr({
				mainAxis: i + D,
				alignmentAxis: s
			}),
			l && nr({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? rr() : void 0,
				...M
			}),
			l && ir({ ...M }),
			ar({
				...M,
				apply: /* @__PURE__ */ fr(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			S && sr({
				element: S,
				padding: c
			}),
			Er({
				arrowWidth: E,
				arrowHeight: D
			}),
			m && or({
				strategy: "referenceHidden",
				...M,
				boundary: j ? M.boundary : void 0
			})
		]
	}), re = v.setPlacementState;
	I(() => (re(te), () => {
		re(void 0);
	}), [te, re]);
	let [ie, ae] = Dr(te), oe = Se(g);
	I(() => {
		ne && oe?.();
	}, [ne, oe]);
	let se = P.arrow?.x, ce = P.arrow?.y, F = P.arrow?.centerOffset !== 0, [le, ue] = a.useState();
	return I(() => {
		y && ue(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ u("div", {
		ref: ee.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: ne ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: le,
			"--radix-popper-transform-origin": [P.transformOrigin?.x, P.transformOrigin?.y].join(" "),
			...P.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ u(Sr, {
			scope: n,
			placedSide: ie,
			placedAlign: ae,
			onArrowChange: C,
			arrowX: se,
			arrowY: ce,
			shouldHideArrow: F,
			children: /* @__PURE__ */ u(R.div, {
				"data-side": ie,
				"data-align": ae,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: ne ? _.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent"));
function Tr(e) {
	return e !== null;
}
fr(Tr, "isNotNull");
var Er = /* @__PURE__ */ fr((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Dr(n), u = {
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
function Dr(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
fr(Dr, "getSideAndAlignFromPlacement");
var Or = vr, kr = br, Ar = wr, jr = Object.defineProperty, Mr = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ ((e, t) => jr(e, "name", {
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
}, "Portal")), Nr = Object.defineProperty, Pr = (e, t) => Nr(e, "name", {
	value: t,
	configurable: !0
});
function Fr(e, t) {
	return a.useReducer((e, n) => t[e][n] ?? e, e);
}
Pr(Fr, "useStateMachine");
var Ir = /* @__PURE__ */ Pr((e) => {
	let { present: t, children: n } = e, r = Lr(t), i = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n), o = zr(r.ref, Vr(i));
	return typeof n == "function" || r.isPresent ? a.cloneElement(i, { ref: o }) : null;
}, "Presence");
function Lr(e) {
	let [t, n] = a.useState(), r = a.useRef(null), i = a.useRef(e), o = a.useRef("none"), s = a.useRef(void 0), [c, l] = Fr(e ? "mounted" : "unmounted", {
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
		c === "mounted" ? (o.current = s.current ?? Br(r.current), s.current = void 0) : o.current = "none";
	}, [c]), I(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = o.current, a = Br(t);
			e ? (s.current = a, l("MOUNT")) : a === "none" || t?.display === "none" ? l("UNMOUNT") : l(n && r !== a ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, l]), I(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, a = /* @__PURE__ */ Pr((a) => {
				let o = Br(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (l("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Pr((e) => {
				e.target === t && (o.current = Br(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", a), t.addEventListener("animationend", a), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", a), t.removeEventListener("animationend", a);
			};
		} else l("ANIMATION_END");
	}, [t, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: a.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, s.current = Br(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
Pr(Lr, "usePresence");
function Rr(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Pr(Rr, "setRef");
function zr(...e) {
	let t = a.useRef(e);
	return t.current = e, a.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = Rr(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : Rr(n[e], null);
			}
		};
	}, []);
}
Pr(zr, "useStableComposedRefs");
function Br(e) {
	return e?.animationName || "none";
}
Pr(Br, "getAnimationName");
function Vr(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Pr(Vr, "getElementRef");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-effect-event@0.0.5_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var Hr = Object.defineProperty, Ur = (e, t) => Hr(e, "name", {
	value: t,
	configurable: !0
}), Wr = a.useEffectEvent, Gr = a.useInsertionEffect;
function Kr(e) {
	if (typeof Wr == "function") return Wr(e);
	let t = a.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof Gr == "function" ? Gr(() => {
		t.current = e;
	}) : I(() => {
		t.current = e;
	}), a.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Ur(Kr, "useEffectEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.6_@types+react@19.2.17_react@19.2.8/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var qr = Object.defineProperty, Jr = (e, t) => qr(e, "name", {
	value: t,
	configurable: !0
}), Yr = a.useInsertionEffect || I;
function Xr({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ Jr(() => {}, "onChange"), caller: r }) {
	let [i, o, s] = Zr({
		defaultProp: t,
		onChange: n
	}), c = e !== void 0;
	return [c ? e : i, a.useCallback((t) => {
		if (c) {
			let n = Qr(t) ? t(e) : t;
			n !== e && s.current?.(n);
		} else o(t);
	}, [
		c,
		e,
		o,
		s
	])];
}
Jr(Xr, "useControllableState");
function Zr({ defaultProp: e, onChange: t }) {
	let [n, r] = a.useState(e), i = a.useRef(n), o = a.useRef(t);
	return Yr(() => {
		o.current = t;
	}, [t]), a.useEffect(() => {
		i.current !== n && (o.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		o
	];
}
Jr(Zr, "useUncontrolledState");
function Qr(e) {
	return typeof e == "function";
}
Jr(Qr, "isFunction");
var $r = Symbol("RADIX:SYNC_STATE");
function ei(e, t, n, r) {
	let { prop: i, defaultProp: o, onChange: s, caller: c } = t, l = i !== void 0, u = Kr(s), d = [{
		...n,
		state: o
	}];
	r && d.push(r);
	let [f, p] = a.useReducer((t, n) => {
		if (n.type === $r) return {
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
			type: $r,
			state: i
		});
	}, [
		i,
		f.state,
		l
	]), [g, p];
}
Jr(ei, "useControllableStateReducer");
//#endregion
//#region node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var ti = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ni = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), ii = {}, ai = 0, oi = function(e) {
	return e && (e.host || oi(e.parentNode));
}, si = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = oi(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, ci = function(e, t, n, r) {
	var i = si(t, Array.isArray(e) ? e : [e]);
	ii[n] || (ii[n] = /* @__PURE__ */ new WeakMap());
	var a = ii[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ni.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ni.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ri.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ai++, function() {
		o.forEach(function(e) {
			var t = ni.get(e) - 1, i = a.get(e) - 1;
			ni.set(e, t), a.set(e, i), t || (ri.has(e) || e.removeAttribute(r), ri.delete(e)), i || e.removeAttribute(n);
		}), ai--, ai || (ni = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), ii = {});
	};
}, li = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ti(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), ci(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, X = function() {
	return X = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, X.apply(this, arguments);
};
function ui(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function di(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.17_react@19.2.8/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var fi = "right-scroll-bar-position", pi = "width-before-scroll-bar", mi = "with-scroll-bars-hidden", hi = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.17_react@19.2.8/node_modules/use-callback-ref/dist/es2015/assignRef.js
function gi(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.17_react@19.2.8/node_modules/use-callback-ref/dist/es2015/useRef.js
function _i(e, t) {
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
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.17_react@19.2.8/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var vi = typeof window < "u" ? a.useLayoutEffect : a.useEffect, yi = /* @__PURE__ */ new WeakMap();
function bi(e, t) {
	var n = _i(t || null, function(t) {
		return e.forEach(function(e) {
			return gi(e, t);
		});
	});
	return vi(function() {
		var t = yi.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || gi(e, null);
			}), i.forEach(function(e) {
				r.has(e) || gi(e, a);
			});
		}
		yi.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.17_react@19.2.8/node_modules/use-sidecar/dist/es2015/medium.js
function xi(e) {
	return e;
}
function Si(e, t) {
	t === void 0 && (t = xi);
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
function Ci(e) {
	e === void 0 && (e = {});
	var t = Si(null);
	return t.options = X({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.17_react@19.2.8/node_modules/use-sidecar/dist/es2015/exports.js
var wi = function(e) {
	var t = e.sideCar, n = ui(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return a.createElement(r, X({}, n));
};
wi.isSideCarExport = !0;
function Ti(e, t) {
	return e.useMedium(t), wi;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.17_react@19.2.8/node_modules/react-remove-scroll/dist/es2015/medium.js
var Ei = Ci(), Di = function() {}, Oi = a.forwardRef(function(e, t) {
	var n = a.useRef(null), r = a.useState({
		onScrollCapture: Di,
		onWheelCapture: Di,
		onTouchMoveCapture: Di
	}), i = r[0], o = r[1], s = e.forwardProps, c = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = ui(e, [
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
	]), S = p, C = bi([n, t]), w = X(X({}, x), i);
	return a.createElement(a.Fragment, null, d && a.createElement(S, {
		sideCar: Ei,
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
Oi.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Oi.classNames = {
	fullWidth: pi,
	zeroRight: fi
};
//#endregion
//#region node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var ki, Ai = function() {
	if (ki) return ki;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.17_react@19.2.8/node_modules/react-style-singleton/dist/es2015/singleton.js
function ji() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Ai();
	return t && e.setAttribute("nonce", t), e;
}
function Mi(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ni(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Pi = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = ji()) && (Mi(t, n), Ni(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Fi = function() {
	var e = Pi();
	return function(t, n) {
		a.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Ii = function() {
	var e = Fi();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Li = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Ri = function(e) {
	return parseInt(e || "", 10) || 0;
}, zi = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Ri(n),
		Ri(r),
		Ri(i)
	];
}, Bi = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Li;
	var t = zi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Vi = Ii(), Hi = "data-scroll-locked", Ui = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${mi} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Hi}] {
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
  
  .${fi} {
    right: ${s}px ${r};
  }
  
  .${pi} {
    margin-right: ${s}px ${r};
  }
  
  .${fi} .${fi} {
    right: 0 ${r};
  }
  
  .${pi} .${pi} {
    margin-right: 0 ${r};
  }
  
  body[${Hi}] {
    ${hi}: ${s}px;
  }
`;
}, Wi = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Gi = function() {
	a.useEffect(function() {
		return document.body.setAttribute(Hi, (Wi() + 1).toString()), function() {
			var e = Wi() - 1;
			e <= 0 ? document.body.removeAttribute(Hi) : document.body.setAttribute(Hi, e.toString());
		};
	}, []);
}, Ki = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	Gi();
	var o = a.useMemo(function() {
		return Bi(i);
	}, [i]);
	return a.createElement(Vi, { styles: Ui(o, !t, i, n ? "" : "!important") });
}, qi = !1;
if (typeof window < "u") try {
	var Ji = Object.defineProperty({}, "passive", { get: function() {
		return qi = !0, !0;
	} });
	window.addEventListener("test", Ji, Ji), window.removeEventListener("test", Ji, Ji);
} catch {
	qi = !1;
}
var Yi = qi ? { passive: !1 } : !1, Xi = function(e) {
	return e.tagName === "TEXTAREA";
}, Zi = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Xi(e) && n[t] === "visible");
}, Qi = function(e) {
	return Zi(e, "overflowY");
}, $i = function(e) {
	return Zi(e, "overflowX");
}, ea = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), ra(e, r)) {
			var i = ia(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, ta = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, na = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, ra = function(e, t) {
	return e === "v" ? Qi(t) : $i(t);
}, ia = function(e, t) {
	return e === "v" ? ta(t) : na(t);
}, aa = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, oa = function(e, t, n, r, i) {
	var a = aa(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = ia(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && ra(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, sa = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ca = function(e) {
	return [e.deltaX, e.deltaY];
}, la = function(e) {
	return e && "current" in e ? e.current : e;
}, ua = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, da = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, fa = 0, pa = [];
function ma(e) {
	var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), i = a.useState(fa++)[0], o = a.useState(Ii)[0], s = a.useRef(e);
	a.useEffect(function() {
		s.current = e;
	}, [e]), a.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = di([e.lockRef.current], (e.shards || []).map(la), !0).filter(Boolean);
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
		var i = sa(e), a = n.current, o = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = ea(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = ea(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (o || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return oa(h, t, e, h === "h" ? o : c, !0);
	}, []), l = a.useCallback(function(e) {
		var n = e;
		if (!(!pa.length || pa[pa.length - 1] !== o)) {
			var r = "deltaY" in n ? ca(n) : sa(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ua(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(la).filter(Boolean).filter(function(e) {
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
			shadowParent: ha(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = a.useCallback(function(e) {
		n.current = sa(e), r.current = void 0;
	}, []), f = a.useCallback(function(t) {
		u(t.type, ca(t), t.target, c(t, e.lockRef.current));
	}, []), p = a.useCallback(function(t) {
		u(t.type, sa(t), t.target, c(t, e.lockRef.current));
	}, []);
	a.useEffect(function() {
		return pa.push(o), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Yi), document.addEventListener("touchmove", l, Yi), document.addEventListener("touchstart", d, Yi), function() {
			pa = pa.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Yi), document.removeEventListener("touchmove", l, Yi), document.removeEventListener("touchstart", d, Yi);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return a.createElement(a.Fragment, null, h ? a.createElement(o, { styles: da(i) }) : null, m ? a.createElement(Ki, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function ha(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.17_react@19.2.8/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var ga = Ti(Ei, ma), _a = a.forwardRef(function(e, t) {
	return a.createElement(Oi, X({}, e, {
		ref: t,
		sideCar: ga
	}));
});
_a.classNames = Oi.classNames;
//#endregion
//#region src/shared/lib/rosviewPortal.ts
function va() {
	if (!(typeof document > "u")) return document.getElementById("rosview-root") ?? void 0;
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var ya = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ba = e, xa = (e, t) => (n) => {
	if (t?.variants == null) return ba(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = ya(t) || ya(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return ba(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, Sa = xa("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
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
}), Ca = a.forwardRef(({ className: e, variant: t, size: n, asChild: i = !1, ...a }, o) => /* @__PURE__ */ u(i ? O : "button", {
	className: r(Sa({
		variant: t,
		size: n,
		className: e
	})),
	ref: o,
	...a
}));
Ca.displayName = "Button";
//#endregion
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@19.2.17_react-dom@19.2._edv4j3ppflaykfucuvo6hhgajq/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var wa = 1, Ta = .9, Ea = .8, Da = .17, Oa = .1, ka = .999, Aa = .9999, ja = .99, Ma = /[\\\/_+.#"@\[\(\{&]/, Na = /[\\\/_+.#"@\[\(\{&]/g, Pa = /[\s-]/, Fa = /[\s-]/g;
function Ia(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? wa : ja;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = Ia(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= wa : Ma.test(e.charAt(l - 1)) ? (d *= Ea, p = e.slice(i, l - 1).match(Na), p && i > 0 && (d *= ka ** +p.length)) : Pa.test(e.charAt(l - 1)) ? (d *= Ta, m = e.slice(i, l - 1).match(Fa), m && i > 0 && (d *= ka ** +m.length)) : (d *= Da, i > 0 && (d *= ka ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= Aa)), (d < Oa && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = Ia(e, t, n, r, l + 1, a + 2, o), f * Oa > d && (d = f * Oa)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function La(e) {
	return e.toLowerCase().replace(Fa, " ");
}
function Ra(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Ia(e, t, La(e), La(t), 0, 0, {});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-dialog@1.1.23_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@19.2_uhhxxtq5ctqckfbha67rokvta4/node_modules/@radix-ui/react-dialog/dist/index.mjs
var za = Object.defineProperty, Z = (e, t) => za(e, "name", {
	value: t,
	configurable: !0
}), Ba = "Dialog", [Va, Ha] = /* @__PURE__ */ v(Ba), [Ua, Q] = Va(Ba), Wa = /* @__PURE__ */ Z((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !0 } = e, c = a.useRef(null), l = a.useRef(null), [d, f] = Xr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: Ba
	}), [p, m] = a.useState(0), [h, g] = a.useState(0);
	return /* @__PURE__ */ u(Ua, {
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
}, "Dialog"), Ga = "DialogPortal", [Ka, qa] = Va(Ga, { forceMount: void 0 }), Ja = /* @__PURE__ */ Z((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, o = Q(Ga, t);
	return /* @__PURE__ */ u(Ka, {
		scope: t,
		forceMount: n,
		children: a.Children.map(r, (e) => /* @__PURE__ */ u(Ir, {
			present: n || o.open,
			children: /* @__PURE__ */ u(Mr, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), Ya = "DialogOverlay", Xa = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = qa(Ya, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q(Ya, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ u(Ir, {
		present: r || a.open,
		children: /* @__PURE__ */ u(Qa, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), Za = /* @__PURE__ */ D("DialogOverlay.RemoveScroll"), Qa = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(Ya, n), a = w(t, Ae());
	return /* @__PURE__ */ u(_a, {
		as: Za,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ u(R.div, {
			"data-state": uo(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), $a = "DialogContent", eo = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = qa($a, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q($a, e.__scopeDialog);
	return /* @__PURE__ */ u(Ir, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(to, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(no, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), to = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Q($a, e.__scopeDialog), r = a.useRef(null), i = w(t, n.contentRef, r);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return li(e);
	}, []), /* @__PURE__ */ u(ro, {
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
}, "DialogContentModal")), no = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let n = Q($a, e.__scopeDialog), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(ro, {
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
}, "DialogContentNonModal")), ro = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = Q($a, n);
	return Ve(), /* @__PURE__ */ u(l, { children: /* @__PURE__ */ u(qe, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(ke, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": uo(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), io = "DialogTitle", ao = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(io, n), { setTitleCount: a } = i;
	return I(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ u(R.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), oo = "DialogDescription", so = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(oo, n), { setDescriptionCount: a } = i;
	return I(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ u(R.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), co = "DialogClose", lo = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ Z(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Q(co, n);
	return /* @__PURE__ */ u(R.button, {
		type: "button",
		...r,
		ref: t,
		onClick: F(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function uo(e) {
	return e ? "open" : "closed";
}
Z(uo, "getState");
//#endregion
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@19.2.17_react-dom@19.2._edv4j3ppflaykfucuvo6hhgajq/node_modules/cmdk/dist/index.mjs
var fo = "[cmdk-group=\"\"]", po = "[cmdk-group-items=\"\"]", mo = "[cmdk-group-heading=\"\"]", ho = "[cmdk-item=\"\"]", go = `${ho}:not([aria-disabled="true"])`, _o = "cmdk-item-select", vo = "data-value", yo = (e, t, n) => Ra(e, t, n), bo = a.createContext(void 0), xo = () => a.useContext(bo), So = a.createContext(void 0), Co = () => a.useContext(So), wo = a.createContext(void 0), To = a.forwardRef((e, t) => {
	let n = Ro(() => ({
		search: "",
		value: e.value ?? e.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), r = Ro(() => /* @__PURE__ */ new Set()), i = Ro(() => /* @__PURE__ */ new Map()), o = Ro(() => /* @__PURE__ */ new Map()), s = Ro(() => /* @__PURE__ */ new Set()), c = Io(e), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = e, y = L(), b = L(), x = L(), S = a.useRef(null), C = Vo();
	Lo(() => {
		if (d !== void 0) {
			let e = d.trim();
			n.current.value = e, w.emit();
		}
	}, [d]), Lo(() => {
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
		let r = c.current?.filter ?? yo;
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
			let t = e.closest(po);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${po} > *`)) : r.appendChild(e.parentElement === r ? e : e.closest(`${po} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${fo}[${vo}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(vo);
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
		t && (t.parentElement?.firstChild === t && ((e = t.closest(fo)?.querySelector(mo)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${ho}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(go) || []);
	}
	function ee(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(vo));
	}
	function N(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(vo));
	}
	function te(e) {
		let t = j()?.closest(fo), n;
		for (; t && !n;) t = e > 0 ? Po(t, fo) : Fo(t, fo), n = t?.querySelector(go);
		n ? w.setState("value", n.getAttribute(vo)) : N(e);
	}
	let ne = () => ee(M().length - 1), P = (e) => {
		e.preventDefault(), e.metaKey ? ne() : e.altKey ? te(1) : N(1);
	}, re = (e) => {
		e.preventDefault(), e.metaKey ? ee(0) : e.altKey ? te(-1) : N(-1);
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
					_ && e.ctrlKey && P(e);
					break;
				case "ArrowDown":
					P(e);
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
					e.preventDefault(), ne();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(_o);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, a.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: Wo
	}, l), Uo(e, (e) => a.createElement(So.Provider, { value: w }, a.createElement(bo.Provider, { value: T }, e))));
}), Eo = a.forwardRef((e, t) => {
	let n = L(), r = a.useRef(null), i = a.useContext(wo), o = xo(), s = Io(e), c = s.current?.forceMount ?? i?.forceMount;
	Lo(() => {
		if (!c) return o.item(n, i?.id);
	}, [c]);
	let l = Bo(n, r, [
		e.value,
		e.children,
		r
	], e.keywords), u = Co(), d = zo((e) => e.value && e.value === l.current), f = zo((e) => c || o.filter() === !1 ? !0 : !e.search || e.filtered.items.get(n) > 0);
	a.useEffect(() => {
		let t = r.current;
		if (!(!t || e.disabled)) return t.addEventListener(_o, p), () => t.removeEventListener(_o, p);
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
		ref: C(r, t),
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
}), Do = a.forwardRef((e, t) => {
	let { heading: n, children: r, forceMount: i, ...o } = e, s = L(), c = a.useRef(null), l = a.useRef(null), u = L(), d = xo(), f = zo((e) => i || d.filter() === !1 ? !0 : !e.search || e.filtered.groups.has(s));
	Lo(() => d.group(s), []), Bo(s, c, [
		e.value,
		e.heading,
		l
	]);
	let p = a.useMemo(() => ({
		id: s,
		forceMount: i
	}), [i]);
	return a.createElement(R.div, {
		ref: C(c, t),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: !f || void 0
	}, n && a.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, n), Uo(e, (e) => a.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? u : void 0
	}, a.createElement(wo.Provider, { value: p }, e))));
}), Oo = a.forwardRef((e, t) => {
	let { alwaysRender: n, ...r } = e, i = a.useRef(null), o = zo((e) => !e.search);
	return !n && !o ? null : a.createElement(R.div, {
		ref: C(i, t),
		...r,
		"cmdk-separator": "",
		role: "separator"
	});
}), ko = a.forwardRef((e, t) => {
	let { onValueChange: n, ...r } = e, i = e.value != null, o = Co(), s = zo((e) => e.search), c = zo((e) => e.selectedItemId), l = xo();
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
}), Ao = a.forwardRef((e, t) => {
	let { children: n, label: r = "Suggestions", ...i } = e, o = a.useRef(null), s = a.useRef(null), c = zo((e) => e.selectedItemId), l = xo();
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
		ref: C(o, t),
		...i,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": r,
		id: l.listId
	}, Uo(e, (e) => a.createElement("div", {
		ref: C(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, e)));
}), jo = a.forwardRef((e, t) => {
	let { open: n, onOpenChange: r, overlayClassName: i, contentClassName: o, container: s, ...c } = e;
	return a.createElement(Wa, {
		open: n,
		onOpenChange: r
	}, a.createElement(Ja, { container: s }, a.createElement(Xa, {
		"cmdk-overlay": "",
		className: i
	}), a.createElement(eo, {
		"aria-label": e.label,
		"cmdk-dialog": "",
		className: o
	}, a.createElement(To, {
		ref: t,
		...c
	}))));
}), Mo = a.forwardRef((e, t) => zo((e) => e.filtered.count === 0) ? a.createElement(R.div, {
	ref: t,
	...e,
	"cmdk-empty": "",
	role: "presentation"
}) : null), No = a.forwardRef((e, t) => {
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
	}, Uo(e, (e) => a.createElement("div", { "aria-hidden": !0 }, e)));
}), $ = Object.assign(To, {
	List: Ao,
	Item: Eo,
	Input: ko,
	Group: Do,
	Separator: Oo,
	Dialog: jo,
	Empty: Mo,
	Loading: No
});
function Po(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function Fo(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function Io(e) {
	let t = a.useRef(e);
	return Lo(() => {
		t.current = e;
	}), t;
}
var Lo = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function Ro(e) {
	let t = a.useRef();
	return t.current === void 0 && (t.current = e()), t;
}
function zo(e) {
	let t = Co(), n = () => e(t.snapshot());
	return a.useSyncExternalStore(t.subscribe, n, n);
}
function Bo(e, t, n, r = []) {
	let i = a.useRef(), o = xo();
	return Lo(() => {
		var a;
		let s = (() => {
			for (let e of n) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : i.current;
			}
		})(), c = r.map((e) => e.trim());
		o.value(e, s, c), (a = t.current) == null || a.setAttribute(vo, s), i.current = s;
	}), i;
}
var Vo = () => {
	let [e, t] = a.useState(), n = Ro(() => /* @__PURE__ */ new Map());
	return Lo(() => {
		n.current.forEach((e) => e()), n.current = /* @__PURE__ */ new Map();
	}, [e]), (e, r) => {
		n.current.set(e, r), t({});
	};
};
function Ho(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Uo({ asChild: e, children: t }, n) {
	return e && a.isValidElement(t) ? a.cloneElement(Ho(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var Wo = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, Go = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($, {
	ref: n,
	className: r("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
	...t
}));
Go.displayName = $.displayName;
var Ko = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	className: "flex items-center gap-2 border-b border-border px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ u(m, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ u($.Input, {
		ref: n,
		className: r("flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
		...t
	})]
}));
Ko.displayName = $.Input.displayName;
var qo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.List, {
	ref: n,
	className: r("max-h-[min(18rem,50vh)] overflow-y-auto overflow-x-hidden p-1", e),
	...t
}));
qo.displayName = $.List.displayName;
var Jo = a.forwardRef((e, t) => /* @__PURE__ */ u($.Empty, {
	ref: t,
	className: "py-6 text-center text-sm text-muted-foreground",
	...e
}));
Jo.displayName = $.Empty.displayName;
var Yo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Group, {
	ref: n,
	className: r("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", e),
	...t
}));
Yo.displayName = $.Group.displayName;
var Xo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Separator, {
	ref: n,
	className: r("-mx-1 h-px bg-border", e),
	...t
}));
Xo.displayName = $.Separator.displayName;
var Zo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Item, {
	ref: n,
	className: r("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50", e),
	...t
}));
Zo.displayName = $.Item.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-popover@1.1.23_@types+react-dom@19.2.3_@types+react@19.2.17__@types+react@19._zm4qa3vpv6cm27vdpzkhtwjdwm/node_modules/@radix-ui/react-popover/dist/index.mjs
var Qo = Object.defineProperty, $o = (e, t) => Qo(e, "name", {
	value: t,
	configurable: !0
}), es = "Popover", [ts, ns] = /* @__PURE__ */ v(es, [hr]), rs = hr(), [is, as] = ts(es), os = /* @__PURE__ */ $o((e) => {
	let { __scopePopover: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !1 } = e, c = rs(t), l = a.useRef(null), [d, f] = a.useState(!1), [p, m] = Xr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: es
	});
	return /* @__PURE__ */ u(Or, {
		...c,
		children: /* @__PURE__ */ u(is, {
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
}, "Popover"), ss = "PopoverTrigger", cs = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ $o(function(e, t) {
	let { __scopePopover: n, ...r } = e, i = as(ss, n), a = rs(n), o = w(t, i.triggerRef), s = /* @__PURE__ */ u(R.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": ys(i.open),
		...r,
		ref: o,
		onClick: F(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ u(kr, {
		asChild: !0,
		...a,
		children: s
	});
}, "PopoverTrigger")), ls = "PopoverPortal", [us, ds] = ts(ls, { forceMount: void 0 }), fs = /* @__PURE__ */ $o((e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = as(ls, t);
	return /* @__PURE__ */ u(us, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ u(Ir, {
			present: n || a.open,
			children: /* @__PURE__ */ u(Mr, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "PopoverPortal"), ps = "PopoverContent", ms = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ $o(function(e, t) {
	let n = ds(ps, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = as(ps, e.__scopePopover);
	return /* @__PURE__ */ u(Ir, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(gs, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(_s, {
			...i,
			ref: t
		})
	});
}, "PopoverContent")), hs = /* @__PURE__ */ D("PopoverContent.RemoveScroll"), gs = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ $o(function(e, t) {
	let n = as(ps, e.__scopePopover), r = a.useRef(null), i = w(t, r), o = a.useRef(!1);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return li(e);
	}, []), /* @__PURE__ */ u(_a, {
		as: hs,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ u(vs, {
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
}, "PopoverContentModal")), _s = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ $o(function(e, t) {
	let n = as(ps, e.__scopePopover), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(vs, {
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
}, "PopoverContentNonModal")), vs = /* @__PURE__ */ a.forwardRef(/* @__PURE__ */ $o(function(e, t) {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: d, ...f } = e, p = as(ps, n), m = rs(n);
	return Ve(), /* @__PURE__ */ u(qe, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(ke, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: d,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => p.onOpenChange(!1),
			deferPointerDownOutside: !0,
			children: /* @__PURE__ */ u(Ar, {
				"data-state": ys(p.open),
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
function ys(e) {
	return e ? "open" : "closed";
}
$o(ys, "getState");
var bs = os, xs = cs, Ss = fs, Cs = ms, ws = bs, Ts = xs, Es = a.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...i }, a) => /* @__PURE__ */ u(Ss, {
	container: va(),
	children: /* @__PURE__ */ u(Cs, {
		ref: a,
		align: t,
		sideOffset: n,
		className: r("z-[100] w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-xl outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...i
	})
}));
Es.displayName = Cs.displayName;
//#endregion
//#region src/features/panels/framework/TopicQuickPicker.tsx
function Ds(e, t, n, r) {
	return e.filter((e) => {
		if (n && !n(e.type)) return !1;
		if (t && t.length > 0) {
			let n = e.type.toLowerCase();
			if (!t.some((e) => n.includes(e.toLowerCase()))) return !1;
		}
		return !(r && r.length > 0 && !e.name.includes(r));
	});
}
function Os(e) {
	return `${e.name} ${e.type}`;
}
var ks = ({ value: e, onChange: i, topics: a, typeIncludes: o, topicTypeMatches: l, nameIncludes: f, disabled: m, placeholder: h, searchPlaceholder: g, emptyLabel: _, className: v, triggerClassName: y, contentClassName: b }) => {
	let { formatMessage: x } = t(), S = h ?? x({ id: "panels.framework.topicPicker.placeholder" }), C = g ?? x({ id: "panels.framework.topicPicker.searchPlaceholder" }), w = _ ?? x({ id: "panels.framework.topicPicker.empty" }), T = n((e) => e.sortedTopics), E = a ?? T, D = s(() => Ds(E, o, l, f), [
		E,
		o,
		l,
		f
	]), [O, k] = c(!1), A = (e) => {
		let t = e.toLowerCase(), n = D.find((e) => Os(e).toLowerCase() === t);
		return n ? n.name : D.find((e) => e.name.toLowerCase() === t)?.name;
	};
	return /* @__PURE__ */ d(ws, {
		open: O,
		onOpenChange: k,
		children: [/* @__PURE__ */ u(Ts, {
			asChild: !0,
			children: /* @__PURE__ */ d(Ca, {
				type: "button",
				variant: "ghost",
				role: "combobox",
				"aria-expanded": O,
				disabled: m,
				className: r("h-8 min-w-0 w-full justify-between gap-2 px-2 font-mono text-xs font-normal", v, y),
				children: [/* @__PURE__ */ u("span", {
					className: "truncate text-left",
					children: e.length > 0 ? e : S
				}), /* @__PURE__ */ u(p, {
					"data-icon": "inline-end",
					className: "shrink-0 opacity-50"
				})]
			})
		}), /* @__PURE__ */ u(Es, {
			className: r("w-[min(28rem,calc(100vw-2rem))] p-0", b),
			align: "start",
			children: /* @__PURE__ */ d(Go, {
				shouldFilter: !0,
				children: [/* @__PURE__ */ u(Ko, { placeholder: C }), /* @__PURE__ */ d(qo, { children: [/* @__PURE__ */ u(Jo, { children: w }), /* @__PURE__ */ u(Yo, { children: D.map((t) => {
					let n = t.name === e;
					return /* @__PURE__ */ u(Zo, {
						value: Os(t),
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
export { R as A, Or as C, Ve as D, qe as E, D as F, w as I, v as L, L as M, I as N, ke as O, F as P, m as R, Ar as S, ur as T, li as _, Wa as a, Mr as b, so as c, ao as d, Ca as f, _a as g, va as h, Ts as i, ye as j, Se as k, Xa as l, xa as m, ws as n, lo as o, Sa as p, Es as r, eo as s, ks as t, Ja as u, Xr as v, hr as w, kr as x, Ir as y };
