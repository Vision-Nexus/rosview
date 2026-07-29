import { c as e, f as t, i as n, s as r } from "./rafScheduler-Be5Ie1zf.js";
import { t as i } from "./createLucideIcon-C-kpPCU2.js";
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
}]]);
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function h(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = a.createContext(r);
		i.displayName = t + "Context";
		let o = n.length;
		n = [...n, r];
		let s = (t) => {
			let { scope: n, children: r, ...s } = t, c = n?.[e]?.[o] || i, l = a.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ u(c.Provider, {
				value: l,
				children: r
			});
		};
		s.displayName = t + "Provider";
		function c(n, s, c = {}) {
			let { optional: l = !1 } = c, u = s?.[e]?.[o] || i, d = a.useContext(u);
			if (d) return d;
			if (r !== void 0) return r;
			if (!l) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [s, c];
	}
	let i = () => {
		let t = n.map((e) => a.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return a.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, g(i, ...t)];
}
function g(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return a.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function _(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function v(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = _(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : _(e[t], null);
			}
		};
	};
}
function y(...e) {
	return a.useCallback(v(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
// @__NO_SIDE_EFFECTS__
function b(e) {
	let t = a.forwardRef((t, n) => {
		let { children: r, ...i } = t, o = null, s = !1, c = [];
		O(r) && typeof M == "function" && (r = M(r._payload)), a.Children.forEach(r, (e) => {
			if (E(e)) {
				s = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				O(n) && typeof M == "function" && (n = M(n._payload)), o = C(t, n), c.push(o?.props?.children);
			} else c.push(e);
		}), o ? o = a.cloneElement(o, void 0, c) : !s && a.Children.count(r) === 1 && a.isValidElement(r) && (o = r);
		let l = o ? T(o) : void 0, u = y(n, l);
		if (!o) {
			if (r || r === 0) throw Error(s ? j(e) : A(e));
			return r;
		}
		let d = w(i, o.props ?? {});
		return o.type !== a.Fragment && (d.ref = n ? u : l), a.cloneElement(o, d);
	});
	return t.displayName = `${e}.Slot`, t;
}
var x = /* @__PURE__ */ b("Slot"), S = Symbol.for("radix.slottable"), C = (e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return a.isValidElement(t) ? a.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return a.isValidElement(t) ? t : null;
};
function w(e, t) {
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
function T(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function E(e) {
	return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === S;
}
var D = Symbol.for("react.lazy");
function O(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === D && "_payload" in e && k(e._payload);
}
function k(e) {
	return typeof e == "object" && !!e && "then" in e;
}
var A = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, j = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, M = a.use;
typeof window < "u" && window.document && window.document.createElement;
function N(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var P = globalThis?.document ? a.useLayoutEffect : () => {}, ee = a.useId || (() => void 0), te = 0;
function F(e) {
	let [t, n] = a.useState(ee());
	return P(() => {
		e || n((e) => e ?? String(te++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var I = [
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
	let n = /* @__PURE__ */ b(`Primitive.${t}`), r = a.forwardRef((e, r) => {
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
function L(e, t) {
	e && f.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function R(e) {
	let t = a.useRef(e);
	return a.useEffect(() => {
		t.current = e;
	}), a.useMemo(() => ((...e) => t.current?.(...e)), []);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var ne = "DismissableLayer", re = "dismissableLayer.update", ie = "dismissableLayer.pointerDownOutside", ae = "dismissableLayer.focusOutside", oe, se = a.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), ce = a.forwardRef((e, t) => {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...d } = e, f = a.useContext(se), [p, m] = a.useState(null), h = p?.ownerDocument ?? globalThis?.document, [, g] = a.useState({}), _ = y(t, m), v = Array.from(f.layers), [b] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), x = b ? v.indexOf(b) : -1, S = p ? v.indexOf(p) : -1, C = f.layersWithOutsidePointerEventsDisabled.size > 0, w = S >= x, T = a.useRef(!1), E = pe((e) => {
		o?.(e), c?.(e), e.defaultPrevented || l?.();
	}, {
		ownerDocument: h,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: T,
		dismissableSurfaces: f.dismissableSurfaces,
		shouldHandlePointerDownOutside: a.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...f.branches].some((t) => t.contains(e));
			return w && !t;
		}, [f.branches, w])
	}), D = me((e) => {
		if (r && T.current) return;
		let t = e.target;
		[...f.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, h), O = p ? S === v.length - 1 : !1, k = R((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	});
	return a.useEffect(() => {
		if (O) return h.addEventListener("keydown", k, { capture: !0 }), () => h.removeEventListener("keydown", k, { capture: !0 });
	}, [
		h,
		O,
		k
	]), a.useEffect(() => {
		if (p) return n && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (oe = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(p)), f.layers.add(p), he(), () => {
			n && (f.layersWithOutsidePointerEventsDisabled.delete(p), f.layersWithOutsidePointerEventsDisabled.size === 0 && (h.body.style.pointerEvents = oe));
		};
	}, [
		p,
		h,
		n,
		f
	]), a.useEffect(() => () => {
		p && (f.layers.delete(p), f.layersWithOutsidePointerEventsDisabled.delete(p), he());
	}, [p, f]), a.useEffect(() => {
		let e = () => g({});
		return document.addEventListener(re, e), () => document.removeEventListener(re, e);
	}, []), /* @__PURE__ */ u(I.div, {
		...d,
		ref: _,
		style: {
			pointerEvents: C ? w ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: N(e.onFocusCapture, D.onFocusCapture),
		onBlurCapture: N(e.onBlurCapture, D.onBlurCapture),
		onPointerDownCapture: N(e.onPointerDownCapture, E.onPointerDownCapture)
	});
});
ce.displayName = ne;
var le = "DismissableLayerBranch", ue = a.forwardRef((e, t) => {
	let n = a.useContext(se), r = a.useRef(null), i = y(t, r);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return n.branches.add(e), () => {
			n.branches.delete(e);
		};
	}, [n.branches]), /* @__PURE__ */ u(I.div, {
		...e,
		ref: i
	});
});
ue.displayName = le;
function de() {
	let e = a.useContext(se), [t, n] = a.useState(null);
	return a.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
var fe = () => !0;
function pe(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: o, shouldHandlePointerDownOutside: s = fe } = t, c = R(e), l = a.useRef(!1), u = a.useRef(!1), d = a.useRef(/* @__PURE__ */ new Map()), f = a.useRef(() => {});
	return a.useEffect(() => {
		function e() {
			u.current = !1, i.current = !1, d.current.clear();
		}
		function t() {
			return Array.from(d.current.values()).some(Boolean);
		}
		function a(e) {
			if (!u.current) return;
			let t = e.target;
			t instanceof Node && [...o].some((e) => e.contains(t)) || d.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				u.current && f.current();
			}, 0);
		}
		function p(e) {
			u.current && d.current.set(e.type, !1);
		}
		let m = (a) => {
			if (a.target && !l.current) {
				let o = function() {
					n.removeEventListener("click", f.current);
					let r = t();
					e(), r || ge(ie, c, p, { discrete: !0 });
				};
				if (!s(a.target)) {
					n.removeEventListener("click", f.current), e(), l.current = !1;
					return;
				}
				let p = { originalEvent: a };
				u.current = !0, i.current = r && a.button === 0, d.current.clear(), !r || a.button !== 0 ? o() : (n.removeEventListener("click", f.current), f.current = o, n.addEventListener("click", f.current, { once: !0 }));
			} else n.removeEventListener("click", f.current), e();
			l.current = !1;
		}, h = [
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
	]), { onPointerDownCapture: () => l.current = !0 };
}
function me(e, t = globalThis?.document) {
	let n = R(e), r = a.useRef(!1);
	return a.useEffect(() => {
		let e = (e) => {
			e.target && !r.current && ge(ae, n, { originalEvent: e }, { discrete: !1 });
		};
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: () => r.current = !0,
		onBlurCapture: () => r.current = !1
	};
}
function he() {
	let e = new CustomEvent(re);
	document.dispatchEvent(e);
}
function ge(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? L(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var _e = 0, ve = null;
function ye() {
	a.useEffect(() => {
		ve ||= {
			start: be(),
			end: be()
		};
		let { start: e, end: t } = ve;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), _e++, () => {
			_e === 1 && (ve?.start.remove(), ve?.end.remove(), ve = null), _e = Math.max(0, _e - 1);
		};
	}, []);
}
function be() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var xe = "focusScope.autoFocusOnMount", Se = "focusScope.autoFocusOnUnmount", Ce = {
	bubbles: !1,
	cancelable: !0
}, we = "FocusScope", Te = a.forwardRef((e, t) => {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: o, ...s } = e, [c, l] = a.useState(null), d = R(i), f = R(o), p = a.useRef(null), m = y(t, l), h = a.useRef({
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
				c.contains(t) ? p.current = t : z(p.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || z(p.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && z(c);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
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
			Me.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(xe, Ce);
				c.addEventListener(xe, d), c.dispatchEvent(t), t.defaultPrevented || (Ee(Fe(Oe(c)), { select: !0 }), document.activeElement === e && z(c));
			}
			return () => {
				c.removeEventListener(xe, d), setTimeout(() => {
					let t = new CustomEvent(Se, Ce);
					c.addEventListener(Se, f), c.dispatchEvent(t), t.defaultPrevented || z(e ?? document.body, { select: !0 }), c.removeEventListener(Se, f), Me.remove(h);
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
			let t = e.currentTarget, [r, a] = De(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && z(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && z(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		h.paused
	]);
	return /* @__PURE__ */ u(I.div, {
		tabIndex: -1,
		...s,
		ref: m,
		onKeyDown: g
	});
});
Te.displayName = we;
function Ee(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (z(r, { select: t }), document.activeElement !== n) return;
}
function De(e) {
	let t = Oe(e);
	return [ke(t, e), ke(t.reverse(), e)];
}
function Oe(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function ke(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Ae(r, { upTo: t }))) return r;
}
function Ae(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function je(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function z(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && je(e) && t && e.select();
	}
}
var Me = Ne();
function Ne() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Pe(e, t), e.unshift(t);
		},
		remove(t) {
			e = Pe(e, t), e[0]?.resume();
		}
	};
}
function Pe(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Fe(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ie = [
	"top",
	"right",
	"bottom",
	"left"
], B = Math.min, V = Math.max, Le = Math.round, Re = Math.floor, H = (e) => ({
	x: e,
	y: e
}), ze = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Be(e, t, n) {
	return V(e, B(t, n));
}
function U(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function W(e) {
	return e.split("-")[0];
}
function Ve(e) {
	return e.split("-")[1];
}
function He(e) {
	return e === "x" ? "y" : "x";
}
function Ue(e) {
	return e === "y" ? "height" : "width";
}
function G(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function We(e) {
	return He(G(e));
}
function Ge(e, t, n) {
	n === void 0 && (n = !1);
	let r = Ve(e), i = We(e), a = Ue(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = et(o)), [o, et(o)];
}
function Ke(e) {
	let t = et(e);
	return [
		qe(e),
		t,
		qe(t)
	];
}
function qe(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Je = ["left", "right"], Ye = ["right", "left"], Xe = ["top", "bottom"], Ze = ["bottom", "top"];
function Qe(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Ye : Je : t ? Je : Ye;
		case "left":
		case "right": return t ? Xe : Ze;
		default: return [];
	}
}
function $e(e, t, n, r) {
	let i = Ve(e), a = Qe(W(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(qe)))), a;
}
function et(e) {
	let t = W(e);
	return ze[t] + e.slice(t.length);
}
function tt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function nt(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : tt(e);
}
function rt(e) {
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
function it(e, t, n) {
	let { reference: r, floating: i } = e, a = G(t), o = We(t), s = Ue(o), c = W(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Ve(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function at(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = U(t, e), p = nt(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = rt(await i.getClippingRect({
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
	}, y = rt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var ot = 50, st = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: at
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = it(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < ot && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = it(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ct = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = U(e, t) || {};
		if (l == null) return {};
		let d = nt(u), f = {
			x: n,
			y: r
		}, p = We(i), m = Ue(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = B(d[_], T), D = B(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = Be(E, k, O), j = !c.arrow && Ve(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
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
}), lt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = U(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = W(r), _ = G(o), v = W(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [et(o)] : Ke(o)), x = p !== "none";
			!d && x && b.push(...$e(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ge(r, a, y);
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
function ut(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function dt(e) {
	return Ie.some((t) => e[t] >= 0);
}
var ft = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = U(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = ut(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: dt(e)
					} };
				}
				case "escaped": {
					let e = ut(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: dt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, pt = /*#__PURE__*/ new Set(["left", "top"]);
async function mt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = W(n), s = Ve(n), c = G(n) === "y", l = pt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = U(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var ht = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await mt(t, e);
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
}, gt = function(e) {
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
			} }, ...l } = U(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = G(i), p = He(f), m = u[p], h = u[f], g = (e, t) => Be(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, _t = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = U(e, t), u = {
				x: n,
				y: r
			}, d = G(i), f = He(d), p = u[f], m = u[d], h = U(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = pt.has(W(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, vt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = U(e, t), c = await i.detectOverflow(t, s), l = W(n), u = Ve(n), d = G(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = B(p - c[m], g), y = B(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * V(c.left, c.right) : S = p - 2 * V(c.top, c.bottom)), await o({
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
function yt() {
	return typeof window < "u";
}
function bt(e) {
	return xt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
	return ((xt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function xt(e) {
	return yt() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function J(e) {
	return yt() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function Y(e) {
	return yt() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function St(e) {
	return !yt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function Ct(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = X(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function wt(e) {
	return /^(table|td|th)$/.test(bt(e));
}
function Tt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Et = /transform|translate|scale|rotate|perspective|filter/, Dt = /paint|layout|strict|content/, Ot = (e) => !!e && e !== "none", kt;
function At(e) {
	let t = J(e) ? X(e) : e;
	return Ot(t.transform) || Ot(t.translate) || Ot(t.scale) || Ot(t.rotate) || Ot(t.perspective) || !Mt() && (Ot(t.backdropFilter) || Ot(t.filter)) || Et.test(t.willChange || "") || Dt.test(t.contain || "");
}
function jt(e) {
	let t = Ft(e);
	for (; Y(t) && !Nt(t);) {
		if (At(t)) return t;
		if (Tt(t)) return null;
		t = Ft(t);
	}
	return null;
}
function Mt() {
	return kt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), kt;
}
function Nt(e) {
	return /^(html|body|#document)$/.test(bt(e));
}
function X(e) {
	return K(e).getComputedStyle(e);
}
function Pt(e) {
	return J(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ft(e) {
	if (bt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || St(e) && e.host || q(e);
	return St(t) ? t.host : t;
}
function It(e) {
	let t = Ft(e);
	return Nt(t) ? (e.ownerDocument || e).body : Y(t) && Ct(t) ? t : It(t);
}
function Lt(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = It(e), i = r === e.ownerDocument?.body, a = K(r);
	if (i) {
		let e = Rt(a);
		return t.concat(a, a.visualViewport || [], Ct(r) ? r : [], e && n ? Lt(e) : []);
	} else return t.concat(r, Lt(r, [], n));
}
function Rt(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function zt(e) {
	let t = X(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Y(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Le(n) !== a || Le(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Bt(e) {
	return J(e) ? e : e.contextElement;
}
function Vt(e) {
	let t = Bt(e);
	if (!Y(t)) return H(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = zt(t), o = (a ? Le(n.width) : n.width) / r, s = (a ? Le(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ht = /*#__PURE__*/ H(0);
function Ut(e) {
	let t = K(e);
	return !Mt() || !t.visualViewport ? Ht : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Wt(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === K(e);
}
function Gt(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Bt(e), o = H(1);
	t && (r ? J(r) && (o = Vt(r)) : o = Vt(e));
	let s = Wt(a, n, r) ? Ut(a) : H(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = K(a), t = J(r) ? K(r) : r, n = e, i = Rt(n);
		for (; i && t !== n;) {
			let e = Vt(i), t = i.getBoundingClientRect(), r = X(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = K(i), i = Rt(n);
		}
	}
	return rt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Kt(e, t) {
	let n = Pt(e).scrollLeft;
	return t ? t.left + n : Gt(q(e)).left + n;
}
function qt(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Kt(e, n),
		y: n.top + t.scrollTop
	};
}
function Jt(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = q(r), s = t ? Tt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = H(1), u = H(0), d = Y(r);
	if ((d || !a) && ((bt(r) !== "body" || Ct(o)) && (c = Pt(r)), d)) {
		let e = Gt(r);
		l = Vt(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? qt(o, c) : H(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Yt(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Xt(e) {
	let t = Pt(e), n = e.ownerDocument.body, r = V(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = V(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Kt(e), o = -t.scrollTop;
	return X(n).direction === "rtl" && (a += V(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Zt = 25;
function Qt(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = K(e), a = q(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Mt() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Kt(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Zt && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function $t(e, t) {
	let n = Gt(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Vt(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function en(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Qt(e, n, t);
	else if (t === "document") r = Xt(q(e));
	else if (J(t)) r = $t(t, n);
	else {
		let n = Ut(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return rt(r);
}
function tn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Lt(e, [], !1).filter((e) => J(e) && bt(e) !== "body"), i = null, a = X(e).position === "fixed", o = a ? Ft(e) : e;
	for (; J(o) && !Nt(o);) {
		let e = X(o), t = At(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Ft(o);
	}
	return t.set(e, r), r;
}
function nn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Tt(t) ? [] : tn(t, this._c) : [].concat(n), r], o = en(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = en(t, a[e], i);
		s = V(n.top, s), c = B(n.right, c), l = B(n.bottom, l), u = V(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function rn(e) {
	let { width: t, height: n } = zt(e);
	return {
		width: t,
		height: n
	};
}
function an(e, t, n) {
	let r = Y(t), i = q(t), a = n === "fixed", o = Gt(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = H(0);
	if ((r || !a) && ((bt(t) !== "body" || Ct(i)) && (s = Pt(t)), r)) {
		let e = Gt(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Kt(i));
	let l = i && !r && !a ? qt(i, s) : H(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function on(e) {
	return X(e).position === "static";
}
function sn(e, t) {
	if (!Y(e) || X(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return q(e) === n && (n = n.ownerDocument.body), n;
}
function cn(e, t) {
	let n = K(e);
	if (Tt(e)) return n;
	if (!Y(e)) {
		let t = Ft(e);
		for (; t && !Nt(t);) {
			if (J(t) && !on(t)) return t;
			t = Ft(t);
		}
		return n;
	}
	let r = sn(e, t);
	for (; r && wt(r) && on(r);) r = sn(r, t);
	return r && Nt(r) && on(r) && !At(r) ? n : r || jt(e) || n;
}
var ln = async function(e) {
	let t = this.getOffsetParent || cn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: an(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function un(e) {
	return X(e).direction === "rtl";
}
var dn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Jt,
	getDocumentElement: q,
	getClippingRect: nn,
	getOffsetParent: cn,
	getElementRects: ln,
	getClientRects: Yt,
	getDimensions: rn,
	getScale: Vt,
	isElement: J,
	isRTL: un
};
function fn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function pn(e, t, n) {
	let r = null, i, a = q(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Re(d), h = Re(a.clientWidth - (u + f)), g = Re(a.clientHeight - (d + p)), _ = Re(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: V(0, B(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!fn(l, e.getBoundingClientRect())) return s();
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
function mn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Bt(e), u = i || a ? [...l ? Lt(l) : [], ...t ? Lt(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? pn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Gt(e) : null;
	c && g();
	function g() {
		let t = Gt(e);
		h && !fn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var hn = ht, gn = gt, _n = lt, vn = vt, yn = ft, bn = ct, xn = _t, Sn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...dn,
		...i.platform,
		_c: r
	};
	return st(e, t, {
		...i,
		platform: a
	});
}, Cn = typeof document < "u" ? o : function() {};
function wn(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!wn(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !wn(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Tn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function En(e, t) {
	let n = Tn(e);
	return Math.round(t * n) / n;
}
function Dn(e) {
	let t = a.useRef(e);
	return Cn(() => {
		t.current = e;
	}), t;
}
function On(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = e, [d, p] = a.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = a.useState(r);
	wn(m, r) || h(r);
	let [g, _] = a.useState(null), [v, y] = a.useState(null), b = a.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = a.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = a.useRef(null), T = a.useRef(null), E = a.useRef(d), D = l != null, O = Dn(l), k = Dn(i), A = Dn(u), j = a.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: m
		};
		k.current && (e.platform = k.current), Sn(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !wn(E.current, t) && (E.current = t, f.flushSync(() => {
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
	Cn(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = a.useRef(!1);
	Cn(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Cn(() => {
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
	let N = a.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = a.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), ee = a.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = En(P.floating, d.x), r = En(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Tn(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		c,
		P.floating,
		d.x,
		d.y
	]);
	return a.useMemo(() => ({
		...d,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: ee
	}), [
		d,
		j,
		N,
		P,
		ee
	]);
}
var kn = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : bn({
				element: r.current,
				padding: i
			}).fn(n) : r ? bn({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, An = (e, t) => {
	let n = hn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, jn = (e, t) => {
	let n = gn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Mn = (e, t) => ({
	fn: xn(e).fn,
	options: [e, t]
}), Nn = (e, t) => {
	let n = _n(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Pn = (e, t) => {
	let n = vn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Fn = (e, t) => {
	let n = yn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, In = (e, t) => {
	let n = kn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ln = "Arrow", Rn = a.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ u(I.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ u("polygon", { points: "0,0 30,0 15,10" })
	});
});
Rn.displayName = Ln;
var zn = Rn;
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function Bn(e) {
	let [t, n] = a.useState(void 0);
	return P(() => {
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
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var Vn = "Popper", [Hn, Un] = h(Vn), [Wn, Gn] = Hn(Vn), Kn = (e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = a.useState(null), [o, s] = a.useState(void 0);
	return /* @__PURE__ */ u(Wn, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: o,
		setPlacementState: s,
		children: n
	});
};
Kn.displayName = Vn;
var qn = "PopperAnchor", Jn = a.forwardRef((e, t) => {
	let { __scopePopper: n, virtualRef: r, ...i } = e, o = Gn(qn, n), s = a.useRef(null), c = o.onAnchorChange, l = y(t, a.useCallback((e) => {
		s.current = e, e && c(e);
	}, [c])), d = a.useRef(null);
	a.useEffect(() => {
		if (!r) return;
		let e = d.current;
		d.current = r.current, e !== d.current && c(d.current);
	});
	let f = o.placementState && ir(o.placementState), p = f?.[0], m = f?.[1];
	return r ? null : /* @__PURE__ */ u(I.div, {
		"data-radix-popper-side": p,
		"data-radix-popper-align": m,
		...i,
		ref: l
	});
});
Jn.displayName = qn;
var Yn = "PopperContent", [Xn, Zn] = Hn(Yn), Qn = a.forwardRef((e, t) => {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = e, v = Gn(Yn, n), [b, x] = a.useState(null), S = y(t, x), [C, w] = a.useState(null), T = Bn(C), E = T?.width ?? 0, D = T?.height ?? 0, O = r + (o === "center" ? "" : "-" + o), k = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, A = Array.isArray(d) ? d : [d], j = A.length > 0, M = {
		padding: k,
		boundary: A.filter(nr),
		altBoundary: j
	}, { refs: N, floatingStyles: ee, placement: te, isPositioned: F, middlewareData: L } = On({
		strategy: "fixed",
		placement: O,
		whileElementsMounted: (...e) => mn(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			An({
				mainAxis: i + D,
				alignmentAxis: s
			}),
			l && jn({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? Mn() : void 0,
				...M
			}),
			l && Nn({ ...M }),
			Pn({
				...M,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			C && In({
				element: C,
				padding: c
			}),
			rr({
				arrowWidth: E,
				arrowHeight: D
			}),
			m && Fn({
				strategy: "referenceHidden",
				...M,
				boundary: j ? M.boundary : void 0
			})
		]
	}), ne = v.setPlacementState;
	P(() => (ne(te), () => {
		ne(void 0);
	}), [te, ne]);
	let [re, ie] = ir(te), ae = R(g);
	P(() => {
		F && ae?.();
	}, [F, ae]);
	let oe = L.arrow?.x, se = L.arrow?.y, ce = L.arrow?.centerOffset !== 0, [le, ue] = a.useState();
	return P(() => {
		b && ue(window.getComputedStyle(b).zIndex);
	}, [b]), /* @__PURE__ */ u("div", {
		ref: N.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...ee,
			transform: F ? ee.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: le,
			"--radix-popper-transform-origin": [L.transformOrigin?.x, L.transformOrigin?.y].join(" "),
			...L.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ u(Xn, {
			scope: n,
			placedSide: re,
			placedAlign: ie,
			onArrowChange: w,
			arrowX: oe,
			arrowY: se,
			shouldHideArrow: ce,
			children: /* @__PURE__ */ u(I.div, {
				"data-side": re,
				"data-align": ie,
				..._,
				ref: S,
				style: {
					..._.style,
					animation: F ? void 0 : "none"
				}
			})
		})
	});
});
Qn.displayName = Yn;
var $n = "PopperArrow", er = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, tr = a.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Zn($n, n), a = er[i.placedSide];
	return /* @__PURE__ */ u("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ u(zn, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
tr.displayName = $n;
function nr(e) {
	return e !== null;
}
var rr = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = ir(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function ir(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var ar = Kn, or = Jn, sr = Qn, cr = tr, lr = "Portal", ur = a.forwardRef((e, t) => {
	let { container: n, ...r } = e, [i, o] = a.useState(!1);
	P(() => o(!0), []);
	let s = n || i && globalThis?.document?.body;
	return s ? f.createPortal(/* @__PURE__ */ u(I.div, {
		...r,
		ref: t
	}), s) : null;
});
ur.displayName = lr;
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function dr(e, t) {
	return a.useReducer((e, n) => t[e][n] ?? e, e);
}
var fr = (e) => {
	let { present: t, children: n } = e, r = pr(t), i = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n), o = hr(r.ref, _r(i));
	return typeof n == "function" || r.isPresent ? a.cloneElement(i, { ref: o }) : null;
};
fr.displayName = "Presence";
function pr(e) {
	let [t, n] = a.useState(), r = a.useRef(null), i = a.useRef(e), o = a.useRef("none"), s = a.useRef(void 0), [c, l] = dr(e ? "mounted" : "unmounted", {
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
		c === "mounted" ? (o.current = s.current ?? gr(r.current), s.current = void 0) : o.current = "none";
	}, [c]), P(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = o.current, a = gr(t);
			e ? (s.current = a, l("MOUNT")) : a === "none" || t?.display === "none" ? l("UNMOUNT") : l(n && r !== a ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, l]), P(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, a = (a) => {
				let o = gr(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (l("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === t && (o.current = gr(r.current));
			};
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", a), t.addEventListener("animationend", a), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", a), t.removeEventListener("animationend", a);
			};
		} else l("ANIMATION_END");
	}, [t, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: a.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, s.current = gr(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
function mr(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function hr(...e) {
	let t = a.useRef(e);
	return t.current = e, a.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = mr(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : mr(n[e], null);
			}
		};
	}, []);
}
function gr(e) {
	return e?.animationName || "none";
}
function _r(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var vr = a.useInsertionEffect || P;
function yr({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, o, s] = br({
		defaultProp: t,
		onChange: n
	}), c = e !== void 0, l = c ? e : i;
	{
		let t = a.useRef(e !== void 0);
		a.useEffect(() => {
			let e = t.current;
			e !== c && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = c;
		}, [c, r]);
	}
	return [l, a.useCallback((t) => {
		if (c) {
			let n = xr(t) ? t(e) : t;
			n !== e && s.current?.(n);
		} else o(t);
	}, [
		c,
		e,
		o,
		s
	])];
}
function br({ defaultProp: e, onChange: t }) {
	let [n, r] = a.useState(e), i = a.useRef(n), o = a.useRef(t);
	return vr(() => {
		o.current = t;
	}, [t]), a.useEffect(() => {
		i.current !== n && (o.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		o
	];
}
function xr(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var Sr = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, Cr = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), Tr = {}, Er = 0, Dr = function(e) {
	return e && (e.host || Dr(e.parentNode));
}, Or = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Dr(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, kr = function(e, t, n, r) {
	var i = Or(t, Array.isArray(e) ? e : [e]);
	Tr[n] || (Tr[n] = /* @__PURE__ */ new WeakMap());
	var a = Tr[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (Cr.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				Cr.set(e, c), a.set(e, l), o.push(e), c === 1 && i && wr.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Er++, function() {
		o.forEach(function(e) {
			var t = Cr.get(e) - 1, i = a.get(e) - 1;
			Cr.set(e, t), a.set(e, i), t || (wr.has(e) || e.removeAttribute(r), wr.delete(e)), i || e.removeAttribute(n);
		}), Er--, Er || (Cr = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), Tr = {});
	};
}, Ar = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Sr(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), kr(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, Z = function() {
	return Z = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Z.apply(this, arguments);
};
function jr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Mr(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Nr = "right-scroll-bar-position", Pr = "width-before-scroll-bar", Fr = "with-scroll-bars-hidden", Ir = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Lr(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Rr(e, t) {
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
var zr = typeof window < "u" ? a.useLayoutEffect : a.useEffect, Br = /* @__PURE__ */ new WeakMap();
function Vr(e, t) {
	var n = Rr(t || null, function(t) {
		return e.forEach(function(e) {
			return Lr(e, t);
		});
	});
	return zr(function() {
		var t = Br.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Lr(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Lr(e, a);
			});
		}
		Br.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function Hr(e) {
	return e;
}
function Ur(e, t) {
	t === void 0 && (t = Hr);
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
function Wr(e) {
	e === void 0 && (e = {});
	var t = Ur(null);
	return t.options = Z({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Gr = function(e) {
	var t = e.sideCar, n = jr(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return a.createElement(r, Z({}, n));
};
Gr.isSideCarExport = !0;
function Kr(e, t) {
	return e.useMedium(t), Gr;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var qr = Wr(), Jr = function() {}, Yr = a.forwardRef(function(e, t) {
	var n = a.useRef(null), r = a.useState({
		onScrollCapture: Jr,
		onWheelCapture: Jr,
		onTouchMoveCapture: Jr
	}), i = r[0], o = r[1], s = e.forwardProps, c = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = jr(e, [
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
	]), S = p, C = Vr([n, t]), w = Z(Z({}, x), i);
	return a.createElement(a.Fragment, null, d && a.createElement(S, {
		sideCar: qr,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: n,
		gapMode: b
	}), s ? a.cloneElement(a.Children.only(c), Z(Z({}, w), { ref: C })) : a.createElement(y, Z({}, w, {
		className: l,
		ref: C
	}), c));
});
Yr.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Yr.classNames = {
	fullWidth: Pr,
	zeroRight: Nr
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var Xr, Zr = function() {
	if (Xr) return Xr;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Qr() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Zr();
	return t && e.setAttribute("nonce", t), e;
}
function $r(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ei(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var ti = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Qr()) && ($r(t, n), ei(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, ni = function() {
	var e = ti();
	return function(t, n) {
		a.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, ri = function() {
	var e = ni();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, ii = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, ai = function(e) {
	return parseInt(e || "", 10) || 0;
}, oi = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		ai(n),
		ai(r),
		ai(i)
	];
}, si = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return ii;
	var t = oi(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, ci = ri(), li = "data-scroll-locked", ui = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Fr} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${li}] {
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
  
  .${Nr} {
    right: ${s}px ${r};
  }
  
  .${Pr} {
    margin-right: ${s}px ${r};
  }
  
  .${Nr} .${Nr} {
    right: 0 ${r};
  }
  
  .${Pr} .${Pr} {
    margin-right: 0 ${r};
  }
  
  body[${li}] {
    ${Ir}: ${s}px;
  }
`;
}, di = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, fi = function() {
	a.useEffect(function() {
		return document.body.setAttribute(li, (di() + 1).toString()), function() {
			var e = di() - 1;
			e <= 0 ? document.body.removeAttribute(li) : document.body.setAttribute(li, e.toString());
		};
	}, []);
}, pi = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	fi();
	var o = a.useMemo(function() {
		return si(i);
	}, [i]);
	return a.createElement(ci, { styles: ui(o, !t, i, n ? "" : "!important") });
}, mi = !1;
if (typeof window < "u") try {
	var hi = Object.defineProperty({}, "passive", { get: function() {
		return mi = !0, !0;
	} });
	window.addEventListener("test", hi, hi), window.removeEventListener("test", hi, hi);
} catch {
	mi = !1;
}
var gi = mi ? { passive: !1 } : !1, _i = function(e) {
	return e.tagName === "TEXTAREA";
}, vi = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !_i(e) && n[t] === "visible");
}, yi = function(e) {
	return vi(e, "overflowY");
}, bi = function(e) {
	return vi(e, "overflowX");
}, xi = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), wi(e, r)) {
			var i = Ti(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Si = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Ci = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, wi = function(e, t) {
	return e === "v" ? yi(t) : bi(t);
}, Ti = function(e, t) {
	return e === "v" ? Si(t) : Ci(t);
}, Ei = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Di = function(e, t, n, r, i) {
	var a = Ei(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Ti(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && wi(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Oi = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ki = function(e) {
	return [e.deltaX, e.deltaY];
}, Ai = function(e) {
	return e && "current" in e ? e.current : e;
}, ji = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Mi = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Ni = 0, Pi = [];
function Fi(e) {
	var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), i = a.useState(Ni++)[0], o = a.useState(ri)[0], s = a.useRef(e);
	a.useEffect(function() {
		s.current = e;
	}, [e]), a.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Mr([e.lockRef.current], (e.shards || []).map(Ai), !0).filter(Boolean);
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
		var i = Oi(e), a = n.current, o = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = xi(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = xi(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (o || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return Di(h, t, e, h === "h" ? o : c, !0);
	}, []), l = a.useCallback(function(e) {
		var n = e;
		if (!(!Pi.length || Pi[Pi.length - 1] !== o)) {
			var r = "deltaY" in n ? ki(n) : Oi(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ji(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(Ai).filter(Boolean).filter(function(e) {
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
			shadowParent: Ii(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = a.useCallback(function(e) {
		n.current = Oi(e), r.current = void 0;
	}, []), f = a.useCallback(function(t) {
		u(t.type, ki(t), t.target, c(t, e.lockRef.current));
	}, []), p = a.useCallback(function(t) {
		u(t.type, Oi(t), t.target, c(t, e.lockRef.current));
	}, []);
	a.useEffect(function() {
		return Pi.push(o), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, gi), document.addEventListener("touchmove", l, gi), document.addEventListener("touchstart", d, gi), function() {
			Pi = Pi.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, gi), document.removeEventListener("touchmove", l, gi), document.removeEventListener("touchstart", d, gi);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return a.createElement(a.Fragment, null, h ? a.createElement(o, { styles: Mi(i) }) : null, m ? a.createElement(pi, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function Ii(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Li = Kr(qr, Fi), Ri = a.forwardRef(function(e, t) {
	return a.createElement(Yr, Z({}, e, {
		ref: t,
		sideCar: Li
	}));
});
Ri.classNames = Yr.classNames;
//#endregion
//#region src/shared/lib/rosviewPortal.ts
function zi() {
	if (!(typeof document > "u")) return document.getElementById("rosview-root") ?? void 0;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var Bi = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Vi = e, Hi = (e, t) => (n) => {
	if (t?.variants == null) return Vi(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Bi(t) || Bi(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Vi(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, Ui = Hi("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
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
}), Wi = a.forwardRef(({ className: e, variant: t, size: n, asChild: i = !1, ...a }, o) => /* @__PURE__ */ u(i ? x : "button", {
	className: r(Ui({
		variant: t,
		size: n,
		className: e
	})),
	ref: o,
	...a
}));
Wi.displayName = "Button";
//#endregion
//#region node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var Gi = 1, Ki = .9, qi = .8, Ji = .17, Yi = .1, Xi = .999, Zi = .9999, Qi = .99, $i = /[\\\/_+.#"@\[\(\{&]/, ea = /[\\\/_+.#"@\[\(\{&]/g, ta = /[\s-]/, na = /[\s-]/g;
function ra(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? Gi : Qi;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = ra(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= Gi : $i.test(e.charAt(l - 1)) ? (d *= qi, p = e.slice(i, l - 1).match(ea), p && i > 0 && (d *= Xi ** +p.length)) : ta.test(e.charAt(l - 1)) ? (d *= Ki, m = e.slice(i, l - 1).match(na), m && i > 0 && (d *= Xi ** +m.length)) : (d *= Ji, i > 0 && (d *= Xi ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= Zi)), (d < Yi && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = ra(e, t, n, r, l + 1, a + 2, o), f * Yi > d && (d = f * Yi)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function ia(e) {
	return e.toLowerCase().replace(na, " ");
}
function aa(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, ra(e, t, ia(e), ia(t), 0, 0, {});
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/dist/index.mjs
var oa = "Dialog", [sa, ca] = h(oa), [la, Q] = sa(oa), ua = (e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !0 } = e, c = a.useRef(null), l = a.useRef(null), [d, f] = yr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: oa
	});
	return /* @__PURE__ */ u(la, {
		scope: t,
		triggerRef: c,
		contentRef: l,
		contentId: F(),
		titleId: F(),
		descriptionId: F(),
		open: d,
		onOpenChange: f,
		onOpenToggle: a.useCallback(() => f((e) => !e), [f]),
		modal: s,
		children: n
	});
};
ua.displayName = oa;
var da = "DialogTrigger", fa = a.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Q(da, n), a = y(t, i.triggerRef);
	return /* @__PURE__ */ u(I.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": Ma(i.open),
		...r,
		ref: a,
		onClick: N(e.onClick, i.onOpenToggle)
	});
});
fa.displayName = da;
var pa = "DialogPortal", [ma, ha] = sa(pa, { forceMount: void 0 }), ga = (e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, o = Q(pa, t);
	return /* @__PURE__ */ u(ma, {
		scope: t,
		forceMount: n,
		children: a.Children.map(r, (e) => /* @__PURE__ */ u(fr, {
			present: n || o.open,
			children: /* @__PURE__ */ u(ur, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
};
ga.displayName = pa;
var _a = "DialogOverlay", va = a.forwardRef((e, t) => {
	let n = ha(_a, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q(_a, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ u(fr, {
		present: r || a.open,
		children: /* @__PURE__ */ u(ba, {
			...i,
			ref: t
		})
	}) : null;
});
va.displayName = _a;
var ya = /* @__PURE__ */ b("DialogOverlay.RemoveScroll"), ba = a.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Q(_a, n), a = y(t, de());
	return /* @__PURE__ */ u(Ri, {
		as: ya,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ u(I.div, {
			"data-state": Ma(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), xa = "DialogContent", Sa = a.forwardRef((e, t) => {
	let n = ha(xa, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Q(xa, e.__scopeDialog);
	return /* @__PURE__ */ u(fr, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(Ca, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(wa, {
			...i,
			ref: t
		})
	});
});
Sa.displayName = xa;
var Ca = a.forwardRef((e, t) => {
	let n = Q(xa, e.__scopeDialog), r = a.useRef(null), i = y(t, n.contentRef, r);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return Ar(e);
	}, []), /* @__PURE__ */ u(Ta, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: N(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: N(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: N(e.onFocusOutside, (e) => e.preventDefault())
	});
}), wa = a.forwardRef((e, t) => {
	let n = Q(xa, e.__scopeDialog), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(Ta, {
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
}), Ta = a.forwardRef((e, t) => {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = Q(xa, n);
	return ye(), /* @__PURE__ */ u(l, { children: /* @__PURE__ */ u(Te, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(ce, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionId,
			"aria-labelledby": s.titleId,
			"data-state": Ma(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}), Ea = "DialogTitle", Da = a.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Q(Ea, n);
	return /* @__PURE__ */ u(I.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
Da.displayName = Ea;
var Oa = "DialogDescription", ka = a.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Q(Oa, n);
	return /* @__PURE__ */ u(I.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
ka.displayName = Oa;
var Aa = "DialogClose", ja = a.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = Q(Aa, n);
	return /* @__PURE__ */ u(I.button, {
		type: "button",
		...r,
		ref: t,
		onClick: N(e.onClick, () => i.onOpenChange(!1))
	});
});
ja.displayName = Aa;
function Ma(e) {
	return e ? "open" : "closed";
}
//#endregion
//#region node_modules/cmdk/dist/index.mjs
var Na = "[cmdk-group=\"\"]", Pa = "[cmdk-group-items=\"\"]", Fa = "[cmdk-group-heading=\"\"]", Ia = "[cmdk-item=\"\"]", La = `${Ia}:not([aria-disabled="true"])`, Ra = "cmdk-item-select", za = "data-value", Ba = (e, t, n) => aa(e, t, n), Va = a.createContext(void 0), Ha = () => a.useContext(Va), Ua = a.createContext(void 0), Wa = () => a.useContext(Ua), Ga = a.createContext(void 0), Ka = a.forwardRef((e, t) => {
	let n = ao(() => ({
		search: "",
		value: e.value ?? e.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), r = ao(() => /* @__PURE__ */ new Set()), i = ao(() => /* @__PURE__ */ new Map()), o = ao(() => /* @__PURE__ */ new Map()), s = ao(() => /* @__PURE__ */ new Set()), c = ro(e), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = e, y = F(), b = F(), x = F(), S = a.useRef(null), C = co();
	io(() => {
		if (d !== void 0) {
			let e = d.trim();
			n.current.value = e, w.emit();
		}
	}, [d]), io(() => {
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
		let r = c.current?.filter ?? Ba;
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
			let t = e.closest(Pa);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${Pa} > *`)) : r.appendChild(e.parentElement === r ? e : e.closest(`${Pa} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${Na}[${za}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(za);
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
		t && (t.parentElement?.firstChild === t && ((e = t.closest(Na)?.querySelector(Fa)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${Ia}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(La) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(za));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(za));
	}
	function ee(e) {
		let t = j()?.closest(Na), n;
		for (; t && !n;) t = e > 0 ? to(t, Na) : no(t, Na), n = t?.querySelector(La);
		n ? w.setState("value", n.getAttribute(za)) : P(e);
	}
	let te = () => N(M().length - 1), L = (e) => {
		e.preventDefault(), e.metaKey ? te() : e.altKey ? ee(1) : P(1);
	}, R = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? ee(-1) : P(-1);
	};
	return a.createElement(I.div, {
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
					_ && e.ctrlKey && L(e);
					break;
				case "ArrowDown":
					L(e);
					break;
				case "p":
				case "k":
					_ && e.ctrlKey && R(e);
					break;
				case "ArrowUp":
					R(e);
					break;
				case "Home":
					e.preventDefault(), N(0);
					break;
				case "End":
					e.preventDefault(), te();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(Ra);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, a.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: fo
	}, l), uo(e, (e) => a.createElement(Ua.Provider, { value: w }, a.createElement(Va.Provider, { value: T }, e))));
}), qa = a.forwardRef((e, t) => {
	let n = F(), r = a.useRef(null), i = a.useContext(Ga), o = Ha(), s = ro(e), c = s.current?.forceMount ?? i?.forceMount;
	io(() => {
		if (!c) return o.item(n, i?.id);
	}, [c]);
	let l = so(n, r, [
		e.value,
		e.children,
		r
	], e.keywords), u = Wa(), d = oo((e) => e.value && e.value === l.current), f = oo((e) => c || o.filter() === !1 ? !0 : !e.search || e.filtered.items.get(n) > 0);
	a.useEffect(() => {
		let t = r.current;
		if (!(!t || e.disabled)) return t.addEventListener(Ra, p), () => t.removeEventListener(Ra, p);
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
	let { disabled: h, value: g, onSelect: _, forceMount: y, keywords: b, ...x } = e;
	return a.createElement(I.div, {
		ref: v(r, t),
		...x,
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
}), Ja = a.forwardRef((e, t) => {
	let { heading: n, children: r, forceMount: i, ...o } = e, s = F(), c = a.useRef(null), l = a.useRef(null), u = F(), d = Ha(), f = oo((e) => i || d.filter() === !1 ? !0 : !e.search || e.filtered.groups.has(s));
	io(() => d.group(s), []), so(s, c, [
		e.value,
		e.heading,
		l
	]);
	let p = a.useMemo(() => ({
		id: s,
		forceMount: i
	}), [i]);
	return a.createElement(I.div, {
		ref: v(c, t),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: !f || void 0
	}, n && a.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, n), uo(e, (e) => a.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? u : void 0
	}, a.createElement(Ga.Provider, { value: p }, e))));
}), Ya = a.forwardRef((e, t) => {
	let { alwaysRender: n, ...r } = e, i = a.useRef(null), o = oo((e) => !e.search);
	return !n && !o ? null : a.createElement(I.div, {
		ref: v(i, t),
		...r,
		"cmdk-separator": "",
		role: "separator"
	});
}), Xa = a.forwardRef((e, t) => {
	let { onValueChange: n, ...r } = e, i = e.value != null, o = Wa(), s = oo((e) => e.search), c = oo((e) => e.selectedItemId), l = Ha();
	return a.useEffect(() => {
		e.value != null && o.setState("search", e.value);
	}, [e.value]), a.createElement(I.input, {
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
}), Za = a.forwardRef((e, t) => {
	let { children: n, label: r = "Suggestions", ...i } = e, o = a.useRef(null), s = a.useRef(null), c = oo((e) => e.selectedItemId), l = Ha();
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
	}, []), a.createElement(I.div, {
		ref: v(o, t),
		...i,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": r,
		id: l.listId
	}, uo(e, (e) => a.createElement("div", {
		ref: v(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, e)));
}), Qa = a.forwardRef((e, t) => {
	let { open: n, onOpenChange: r, overlayClassName: i, contentClassName: o, container: s, ...c } = e;
	return a.createElement(ua, {
		open: n,
		onOpenChange: r
	}, a.createElement(ga, { container: s }, a.createElement(va, {
		"cmdk-overlay": "",
		className: i
	}), a.createElement(Sa, {
		"aria-label": e.label,
		"cmdk-dialog": "",
		className: o
	}, a.createElement(Ka, {
		ref: t,
		...c
	}))));
}), $a = a.forwardRef((e, t) => oo((e) => e.filtered.count === 0) ? a.createElement(I.div, {
	ref: t,
	...e,
	"cmdk-empty": "",
	role: "presentation"
}) : null), eo = a.forwardRef((e, t) => {
	let { progress: n, children: r, label: i = "Loading...", ...o } = e;
	return a.createElement(I.div, {
		ref: t,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": i
	}, uo(e, (e) => a.createElement("div", { "aria-hidden": !0 }, e)));
}), $ = Object.assign(Ka, {
	List: Za,
	Item: qa,
	Input: Xa,
	Group: Ja,
	Separator: Ya,
	Dialog: Qa,
	Empty: $a,
	Loading: eo
});
function to(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function no(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function ro(e) {
	let t = a.useRef(e);
	return io(() => {
		t.current = e;
	}), t;
}
var io = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function ao(e) {
	let t = a.useRef();
	return t.current === void 0 && (t.current = e()), t;
}
function oo(e) {
	let t = Wa(), n = () => e(t.snapshot());
	return a.useSyncExternalStore(t.subscribe, n, n);
}
function so(e, t, n, r = []) {
	let i = a.useRef(), o = Ha();
	return io(() => {
		var a;
		let s = (() => {
			for (let e of n) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : i.current;
			}
		})(), c = r.map((e) => e.trim());
		o.value(e, s, c), (a = t.current) == null || a.setAttribute(za, s), i.current = s;
	}), i;
}
var co = () => {
	let [e, t] = a.useState(), n = ao(() => /* @__PURE__ */ new Map());
	return io(() => {
		n.current.forEach((e) => e()), n.current = /* @__PURE__ */ new Map();
	}, [e]), (e, r) => {
		n.current.set(e, r), t({});
	};
};
function lo(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function uo({ asChild: e, children: t }, n) {
	return e && a.isValidElement(t) ? a.cloneElement(lo(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var fo = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, po = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($, {
	ref: n,
	className: r("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
	...t
}));
po.displayName = $.displayName;
var mo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	className: "flex items-center gap-2 border-b border-border px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ u(m, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ u($.Input, {
		ref: n,
		className: r("flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
		...t
	})]
}));
mo.displayName = $.Input.displayName;
var ho = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.List, {
	ref: n,
	className: r("max-h-[min(18rem,50vh)] overflow-y-auto overflow-x-hidden p-1", e),
	...t
}));
ho.displayName = $.List.displayName;
var go = a.forwardRef((e, t) => /* @__PURE__ */ u($.Empty, {
	ref: t,
	className: "py-6 text-center text-sm text-muted-foreground",
	...e
}));
go.displayName = $.Empty.displayName;
var _o = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Group, {
	ref: n,
	className: r("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", e),
	...t
}));
_o.displayName = $.Group.displayName;
var vo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Separator, {
	ref: n,
	className: r("-mx-1 h-px bg-border", e),
	...t
}));
vo.displayName = $.Separator.displayName;
var yo = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u($.Item, {
	ref: n,
	className: r("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50", e),
	...t
}));
yo.displayName = $.Item.displayName;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
var bo = "Popover", [xo, So] = h(bo, [Un]), Co = Un(), [wo, To] = xo(bo), Eo = (e) => {
	let { __scopePopover: t, children: n, open: r, defaultOpen: i, onOpenChange: o, modal: s = !1 } = e, c = Co(t), l = a.useRef(null), [d, f] = a.useState(!1), [p, m] = yr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: o,
		caller: bo
	});
	return /* @__PURE__ */ u(ar, {
		...c,
		children: /* @__PURE__ */ u(wo, {
			scope: t,
			contentId: F(),
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
};
Eo.displayName = bo;
var Do = "PopoverAnchor", Oo = a.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = To(Do, n), o = Co(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = i;
	return a.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ u(or, {
		...o,
		...r,
		ref: t
	});
});
Oo.displayName = Do;
var ko = "PopoverTrigger", Ao = a.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = To(ko, n), a = Co(n), o = y(t, i.triggerRef), s = /* @__PURE__ */ u(I.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": Go(i.open),
		...r,
		ref: o,
		onClick: N(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ u(or, {
		asChild: !0,
		...a,
		children: s
	});
});
Ao.displayName = ko;
var jo = "PopoverPortal", [Mo, No] = xo(jo, { forceMount: void 0 }), Po = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = To(jo, t);
	return /* @__PURE__ */ u(Mo, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ u(fr, {
			present: n || a.open,
			children: /* @__PURE__ */ u(ur, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Po.displayName = jo;
var Fo = "PopoverContent", Io = a.forwardRef((e, t) => {
	let n = No(Fo, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = To(Fo, e.__scopePopover);
	return /* @__PURE__ */ u(fr, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ u(Ro, {
			...i,
			ref: t
		}) : /* @__PURE__ */ u(zo, {
			...i,
			ref: t
		})
	});
});
Io.displayName = Fo;
var Lo = /* @__PURE__ */ b("PopoverContent.RemoveScroll"), Ro = a.forwardRef((e, t) => {
	let n = To(Fo, e.__scopePopover), r = a.useRef(null), i = y(t, r), o = a.useRef(!1);
	return a.useEffect(() => {
		let e = r.current;
		if (e) return Ar(e);
	}, []), /* @__PURE__ */ u(Ri, {
		as: Lo,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ u(Bo, {
			...e,
			ref: i,
			trapFocus: n.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: N(e.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || n.triggerRef.current?.focus();
			}),
			onPointerDownOutside: N(e.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				o.current = r;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: N(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), zo = a.forwardRef((e, t) => {
	let n = To(Fo, e.__scopePopover), r = a.useRef(!1), i = a.useRef(!1);
	return /* @__PURE__ */ u(Bo, {
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
}), Bo = a.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: d, ...f } = e, p = To(Fo, n), m = Co(n);
	return ye(), /* @__PURE__ */ u(Te, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ u(ce, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: d,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => p.onOpenChange(!1),
			deferPointerDownOutside: !0,
			children: /* @__PURE__ */ u(sr, {
				"data-state": Go(p.open),
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
}), Vo = "PopoverClose", Ho = a.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = To(Vo, n);
	return /* @__PURE__ */ u(I.button, {
		type: "button",
		...r,
		ref: t,
		onClick: N(e.onClick, () => i.onOpenChange(!1))
	});
});
Ho.displayName = Vo;
var Uo = "PopoverArrow", Wo = a.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ u(cr, {
		...Co(n),
		...r,
		ref: t
	});
});
Wo.displayName = Uo;
function Go(e) {
	return e ? "open" : "closed";
}
var Ko = Eo, qo = Ao, Jo = Po, Yo = Io, Xo = Ko, Zo = qo, Qo = a.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...i }, a) => /* @__PURE__ */ u(Jo, {
	container: zi(),
	children: /* @__PURE__ */ u(Yo, {
		ref: a,
		align: t,
		sideOffset: n,
		className: r("z-[100] w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-xl outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...i
	})
}));
Qo.displayName = Yo.displayName;
//#endregion
//#region src/features/panels/framework/TopicQuickPicker.tsx
function $o(e, t, n, r) {
	return e.filter((e) => {
		if (n && !n(e.type)) return !1;
		if (t && t.length > 0) {
			let n = e.type.toLowerCase();
			if (!t.some((e) => n.includes(e.toLowerCase()))) return !1;
		}
		return !(r && r.length > 0 && !e.name.includes(r));
	});
}
function es(e) {
	return `${e.name} ${e.type}`;
}
var ts = ({ value: e, onChange: i, topics: a, typeIncludes: o, topicTypeMatches: l, nameIncludes: f, disabled: m, placeholder: h, searchPlaceholder: g, emptyLabel: _, className: v, triggerClassName: y, contentClassName: b }) => {
	let { formatMessage: x } = t(), S = h ?? x({ id: "panels.framework.topicPicker.placeholder" }), C = g ?? x({ id: "panels.framework.topicPicker.searchPlaceholder" }), w = _ ?? x({ id: "panels.framework.topicPicker.empty" }), T = n((e) => e.sortedTopics), E = a ?? T, D = s(() => $o(E, o, l, f), [
		E,
		o,
		l,
		f
	]), [O, k] = c(!1), A = (e) => {
		let t = e.toLowerCase(), n = D.find((e) => es(e).toLowerCase() === t);
		return n ? n.name : D.find((e) => e.name.toLowerCase() === t)?.name;
	};
	return /* @__PURE__ */ d(Xo, {
		open: O,
		onOpenChange: k,
		children: [/* @__PURE__ */ u(Zo, {
			asChild: !0,
			children: /* @__PURE__ */ d(Wi, {
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
		}), /* @__PURE__ */ u(Qo, {
			className: r("w-[min(28rem,calc(100vw-2rem))] p-0", b),
			align: "start",
			children: /* @__PURE__ */ d(po, {
				shouldFilter: !0,
				children: [/* @__PURE__ */ u(mo, { placeholder: C }), /* @__PURE__ */ d(ho, { children: [/* @__PURE__ */ u(go, { children: w }), /* @__PURE__ */ u(_o, { children: D.map((t) => {
					let n = t.name === e;
					return /* @__PURE__ */ u(yo, {
						value: es(t),
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
export { R as A, sr as C, Te as D, Bn as E, N as F, b as I, y as L, L as M, F as N, ye as O, P, h as R, cr as S, Un as T, Ar as _, ua as a, ur as b, ka as c, Da as d, Wi as f, Ri as g, zi as h, Zo as i, I as j, ce as k, va as l, Hi as m, Xo as n, ja as o, Ui as p, Qo as r, Sa as s, ts as t, ga as u, yr as v, ar as w, or as x, fr as y, m as z };
