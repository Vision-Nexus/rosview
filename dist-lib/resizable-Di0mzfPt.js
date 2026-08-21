import { s as e } from "./rafScheduler-CNDq0Etb.js";
import { t } from "./createLucideIcon-DDY8HuQR.js";
import { t as n } from "./chevron-right-4pIadFHI.js";
import { A as r, F as i, I as a, L as o, P as s, T as c, t as l, v as u } from "./TopicQuickPicker-vzANSyR_.js";
import * as d from "react";
import { createContext as f, useCallback as p, useContext as m, useEffect as h, useId as g, useImperativeHandle as _, useLayoutEffect as v, useMemo as y, useRef as b, useState as x, useSyncExternalStore as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
var E = t("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]), D = t("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]), O = Object.defineProperty, k = (e, t) => O(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function A(e) {
	let t = e + "CollectionProvider", [n, r] = o(t), [s, c] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), l = /* @__PURE__ */ k((e) => {
		let { scope: t, children: n } = e, r = d.useRef(null), i = d.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ w(s, {
			scope: t,
			itemMap: i,
			collectionRef: r,
			children: n
		});
	}, "CollectionProvider");
	l.displayName = t;
	let u = e + "CollectionSlot", f = i(u), p = d.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = c(u, n), o = a(t, i.collectionRef);
		return /* @__PURE__ */ w(f, {
			ref: o,
			children: r
		});
	});
	p.displayName = u;
	let m = e + "CollectionItemSlot", h = "data-radix-collection-item", g = i(m), _ = d.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = d.useRef(null), s = a(t, o), l = c(m, n);
		return d.useEffect(() => (l.itemMap.set(o, {
			ref: o,
			...i
		}), () => void l.itemMap.delete(o))), /* @__PURE__ */ w(g, {
			[h]: "",
			ref: s,
			children: r
		});
	});
	_.displayName = m;
	function v(t) {
		let n = c(e + "CollectionConsumer", t);
		return d.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${h}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return k(v, "useCollection"), [
		{
			Provider: l,
			Slot: p,
			ItemSlot: _
		},
		v,
		r
	];
}
k(A, "createCollection");
var ee = /* @__PURE__ */ new WeakMap(), j = class e extends Map {
	static {
		k(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], ee.set(this, !0);
	}
	set(e, t) {
		return ee.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = N(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t !== void 0 && this.delete(t);
	}
	at(e) {
		let t = M(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = M(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return M(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		let n = [...this.entries()].sort(t);
		return new e(n);
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function M(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = te(e, t);
	return n === -1 ? void 0 : e[n];
}
k(M, "at");
function te(e, t) {
	let n = e.length, r = N(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
k(te, "toSafeIndex");
function N(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
k(N, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function ne(e) {
	let t = e + "CollectionProvider", [n, r] = o(t), [s, c] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new j(),
		setItemMap: /* @__PURE__ */ k(() => void 0, "setItemMap")
	}), l = /* @__PURE__ */ k(({ state: e, ...t }) => e ? /* @__PURE__ */ w(f, {
		...t,
		state: e
	}) : /* @__PURE__ */ w(u, { ...t }), "CollectionProvider");
	l.displayName = t;
	let u = /* @__PURE__ */ k((e) => {
		let t = y();
		return /* @__PURE__ */ w(f, {
			...e,
			state: t
		});
	}, "CollectionInit");
	u.displayName = t + "Init";
	let f = /* @__PURE__ */ k((e) => {
		let { scope: t, children: n, state: r } = e, i = d.useRef(null), [o, c] = d.useState(null), l = a(i, c), [u, f] = r;
		return d.useEffect(() => {
			if (!o) return;
			let e = oe(() => {});
			return e.observe(o, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [o]), /* @__PURE__ */ w(s, {
			scope: t,
			itemMap: u,
			setItemMap: f,
			collectionRef: l,
			collectionRefObject: i,
			collectionElement: o,
			children: n
		});
	}, "CollectionProviderImpl");
	f.displayName = t + "Impl";
	let p = e + "CollectionSlot", m = i(p), h = d.forwardRef((e, t) => {
		let { scope: n, children: r } = e, i = c(p, n), o = a(t, i.collectionRef);
		return /* @__PURE__ */ w(m, {
			ref: o,
			children: r
		});
	});
	h.displayName = p;
	let g = e + "CollectionItemSlot", _ = i(g), v = d.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = d.useRef(null), [s, l] = d.useState(null), u = a(t, o, l), { setItemMap: f } = c(g, n), p = d.useRef(i);
		re(p.current, i) || (p.current = i);
		let m = p.current;
		return d.useEffect(() => {
			let e = m;
			return f((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(ae) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(ae)) : t), () => {
				f((e) => !s || !e.has(s) ? e : (e.delete(s), new j(e)));
			};
		}, [
			s,
			m,
			f
		]), /* @__PURE__ */ w(_, {
			"data-radix-collection-item": "",
			ref: u,
			children: r
		});
	});
	v.displayName = g;
	function y() {
		return d.useState(new j());
	}
	k(y, "useInitCollection");
	function b(t) {
		let { itemMap: n } = c(e + "CollectionConsumer", t);
		return n;
	}
	return k(b, "useCollection"), [{
		Provider: l,
		Slot: h,
		ItemSlot: v
	}, {
		createCollectionScope: r,
		useCollection: b,
		useInitCollection: y
	}];
}
k(ne, "createCollection");
function re(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
k(re, "shallowEqual");
function ie(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
k(ie, "isElementPreceding");
function ae(e, t) {
	return !e[1].element || !t[1].element ? 0 : ie(e[1].element, t[1].element) ? -1 : 1;
}
k(ae, "sortByDocumentPosition");
function oe(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
k(oe, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var se = Object.defineProperty, ce = (e, t) => se(e, "name", {
	value: t,
	configurable: !0
}), le = d.createContext(void 0);
function ue(e) {
	let t = d.useContext(le);
	return e || t || "ltr";
}
ce(ue, "useDirection");
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var de = Object.defineProperty, fe = (e, t) => de(e, "name", {
	value: t,
	configurable: !0
});
function pe(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
fe(pe, "clamp");
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
var me = Object.defineProperty, he = (e, t) => me(e, "name", {
	value: t,
	configurable: !0
});
function ge(e) {
	let t = d.useRef({
		value: e,
		previous: e
	});
	return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
he(ge, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var _e = Object.defineProperty, P = (e, t) => _e(e, "name", {
	value: t,
	configurable: !0
}), ve = ["PageUp", "PageDown"], ye = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], be = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
}, xe = "Slider", [Se, Ce, we] = /* @__PURE__ */ A(xe), [Te, Ee] = o(xe, [we]), [De, Oe] = Te(xe), ke = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { name: n, min: r = 0, max: i = 100, step: o = 1, orientation: c = "horizontal", disabled: l = !1, minStepsBetweenThumbs: f = 0, defaultValue: p = [r], value: m, onValueChange: h = /* @__PURE__ */ P(() => {}, "onValueChange"), onValueCommit: g = /* @__PURE__ */ P(() => {}, "onValueCommit"), inverted: _ = !1, form: v, ...y } = e, b = d.useRef(/* @__PURE__ */ new Set()), x = d.useRef(0), S = d.useRef(!1), C = c === "horizontal" ? Me : Ne, [T, E] = d.useState(null), D = a(t, E), [O = [], k] = u({
		prop: m,
		defaultProp: p,
		onChange: /* @__PURE__ */ P((e) => {
			[...b.current][x.current]?.focus({
				preventScroll: !0,
				focusVisible: S.current
			}), S.current = !1, h(e);
		}, "onChange")
	}), A = d.useRef(O), ee = d.useRef(O);
	d.useEffect(() => {
		let e = v ? T?.ownerDocument.getElementById(v) : T?.closest("form");
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ P(() => k(ee.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		T,
		v,
		k
	]);
	function j(e) {
		N(e, Ze(O, e));
	}
	P(j, "handleSlideStart");
	function M(e) {
		N(e, x.current);
	}
	P(M, "handleSlideMove");
	function te() {
		String(O) !== String(A.current) && g(O);
	}
	P(te, "handleSlideEnd");
	function N(e, t, { commit: n } = { commit: !1 }) {
		let a = nt(o), s = pe(rt(Math.round((e - r) / o) * o + r, a), [r, i]);
		k((e = []) => {
			let r = Je(e, s, t);
			if (et(r, f * o)) {
				x.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && g(r), t ? r : e;
			}
			return e;
		});
	}
	return P(N, "updateValues"), /* @__PURE__ */ w(De, {
		scope: e.__scopeSlider,
		name: n,
		disabled: l,
		min: r,
		max: i,
		valueIndexToChangeRef: x,
		thumbs: b.current,
		values: O,
		orientation: c,
		form: v,
		children: /* @__PURE__ */ w(Se.Provider, {
			scope: e.__scopeSlider,
			children: /* @__PURE__ */ w(Se.Slot, {
				scope: e.__scopeSlider,
				children: /* @__PURE__ */ w(C, {
					"aria-disabled": l,
					"data-disabled": l ? "" : void 0,
					...y,
					ref: D,
					onPointerDown: s(y.onPointerDown, () => {
						l || (A.current = O, S.current = !1);
					}),
					min: r,
					max: i,
					inverted: _,
					onSlideStart: l ? void 0 : j,
					onSlideMove: l ? void 0 : M,
					onSlideEnd: l ? void 0 : te,
					onHomeKeyDown: () => {
						l || (S.current = !0, N(r, 0, { commit: !0 }));
					},
					onEndKeyDown: () => {
						l || (S.current = !0, N(i, O.length - 1, { commit: !0 }));
					},
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!l) {
							S.current = !0;
							let n = ve.includes(e.key) || e.shiftKey && ye.includes(e.key) ? 10 : 1, i = x.current, a = O[i];
							N(it(a, {
								min: r,
								step: o,
								direction: t,
								multiplier: n
							}), i, { commit: !0 });
						}
					}
				})
			})
		})
	});
}, "Slider")), [Ae, je] = Te(xe, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), Me = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { min: n, max: r, dir: i, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...f } = e, [p, m] = d.useState(null), h = a(t, m), g = d.useRef(void 0), _ = ue(i), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || p.getBoundingClientRect(), i = tt([0, t.width], y ? [n, r] : [r, n]);
		return g.current = t, i(e - t.left);
	}
	return P(b, "getValueFromPointer"), /* @__PURE__ */ w(Ae, {
		scope: e.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ w(Pe, {
			dir: _,
			"data-orientation": "horizontal",
			...f,
			ref: h,
			style: {
				...f.style,
				"--radix-slider-thumb-transform": "translateX(-50%)"
			},
			onSlideStart: (e) => {
				let t = b(e.clientX);
				s?.(t);
			},
			onSlideMove: (e) => {
				let t = b(e.clientX);
				c?.(t);
			},
			onSlideEnd: () => {
				g.current = void 0, l?.();
			},
			onStepKeyDown: (e) => {
				let t = be[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}, "SliderHorizontal")), Ne = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { min: n, max: r, inverted: i, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = e, f = d.useRef(null), p = a(t, f), m = d.useRef(void 0), h = !i;
	function g(e) {
		let t = m.current || f.current.getBoundingClientRect(), i = tt([0, t.height], h ? [r, n] : [n, r]);
		return m.current = t, i(e - t.top);
	}
	return P(g, "getValueFromPointer"), /* @__PURE__ */ w(Ae, {
		scope: e.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ w(Pe, {
			"data-orientation": "vertical",
			...u,
			ref: p,
			style: {
				...u.style,
				"--radix-slider-thumb-transform": "translateY(50%)"
			},
			onSlideStart: (e) => {
				let t = g(e.clientY);
				o?.(t);
			},
			onSlideMove: (e) => {
				let t = g(e.clientY);
				s?.(t);
			},
			onSlideEnd: () => {
				m.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = be[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}, "SliderVertical")), Pe = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { __scopeSlider: n, onSlideStart: i, onSlideMove: a, onSlideEnd: o, onHomeKeyDown: c, onEndKeyDown: l, onStepKeyDown: u, ...d } = e, f = Oe(xe, n);
	return /* @__PURE__ */ w(r.span, {
		...d,
		ref: t,
		onKeyDown: s(e.onKeyDown, (e) => {
			e.key === "Home" ? (c(e), e.preventDefault()) : e.key === "End" ? (l(e), e.preventDefault()) : ve.concat(ye).includes(e.key) && (u(e), e.preventDefault());
		}),
		onPointerDown: s(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), f.thumbs.has(t) ? t.focus({
				preventScroll: !0,
				focusVisible: !1
			}) : i(e);
		}),
		onPointerMove: s(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && a(e);
		}),
		onPointerUp: s(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), o(e));
		})
	});
}, "SliderImpl")), Fe = "SliderTrack", Ie = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { __scopeSlider: n, ...i } = e, a = Oe(Fe, n);
	return /* @__PURE__ */ w(r.span, {
		"data-disabled": a.disabled ? "" : void 0,
		"data-orientation": a.orientation,
		...i,
		ref: t
	});
}, "SliderTrack")), Le = "SliderRange", Re = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { __scopeSlider: n, ...i } = e, o = Oe(Le, n), s = je(Le, n), c = d.useRef(null), l = a(t, c), u = o.values.length, f = o.values.map((e) => Ye(e, o.min, o.max)), p = u > 1 ? Math.min(...f) : 0, m = 100 - Math.max(...f);
	return /* @__PURE__ */ w(r.span, {
		"data-orientation": o.orientation,
		"data-disabled": o.disabled ? "" : void 0,
		...i,
		ref: l,
		style: {
			...e.style,
			[s.startEdge]: p + "%",
			[s.endEdge]: m + "%"
		}
	});
}, "SliderRange")), [ze, Be] = Te("SliderThumb"), Ve = "SliderThumbProvider";
function He(e) {
	let { __scopeSlider: t, name: n, children: r, internal_do_not_use_render: i } = e, a = Oe(Ve, t), o = Ce(t), [s, l] = d.useState(null), u = d.useMemo(() => s ? o().findIndex((e) => e.ref.current === s) : -1, [o, s]), f = c(s), p = !s || !!a.form || !!s.closest("form"), m = a.values[u], h = n ?? (a.name ? a.name + (a.values.length > 1 ? "[]" : "") : void 0), g = m === void 0 ? 0 : Ye(m, a.min, a.max);
	d.useEffect(() => {
		if (s) return a.thumbs.add(s), () => {
			a.thumbs.delete(s);
		};
	}, [s, a.thumbs]);
	let _ = {
		value: m,
		name: h,
		form: a.form,
		isFormControl: p,
		index: u,
		thumb: s,
		onThumbChange: l,
		percent: g,
		size: f
	};
	return /* @__PURE__ */ w(ze, {
		scope: t,
		..._,
		children: at(i) ? i(_) : r
	});
}
P(He, "SliderThumbProvider");
var Ue = "SliderThumbTrigger", We = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { __scopeSlider: n, ...i } = e, o = Oe(Ue, n), c = je(Ue, n), { index: l, value: u, percent: d, size: f, onThumbChange: p } = Be(Ue, n), m = a(t, p), h = Xe(l, o.values.length), g = f?.[c.size], _ = g ? Qe(g, d, c.direction) : 0;
	return /* @__PURE__ */ w("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${d}% + ${_}px)`
		},
		children: /* @__PURE__ */ w(Se.ItemSlot, {
			scope: n,
			children: /* @__PURE__ */ w(r.span, {
				role: "slider",
				"aria-label": e["aria-label"] || h,
				"aria-valuemin": o.min,
				"aria-valuenow": u,
				"aria-valuemax": o.max,
				"aria-orientation": o.orientation,
				"data-orientation": o.orientation,
				"data-disabled": o.disabled ? "" : void 0,
				tabIndex: o.disabled ? void 0 : 0,
				...i,
				ref: m,
				style: u === void 0 ? { display: "none" } : e.style,
				onFocus: s(e.onFocus, () => {
					o.valueIndexToChangeRef.current = l;
				})
			})
		})
	});
}, "SliderThumbTrigger")), Ge = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function(e, t) {
	let { __scopeSlider: n, name: r, ...i } = e;
	return /* @__PURE__ */ w(He, {
		__scopeSlider: n,
		name: r,
		internal_do_not_use_render: ({ index: e, isFormControl: r }) => /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(We, {
			...i,
			ref: t,
			__scopeSlider: n
		}), r ? /* @__PURE__ */ w(qe, { __scopeSlider: n }, e) : null] })
	});
}, "SliderThumb")), Ke = "SliderBubbleInput", qe = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ P(function({ __scopeSlider: e, ...t }, n) {
	let { value: i, name: o, form: s } = Be(Ke, e), c = d.useRef(null), l = a(c, n), u = ge(i);
	return d.useEffect(() => {
		let e = c.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (u !== i && n) {
			let t = new Event("input", { bubbles: !0 });
			n.call(e, i), e.dispatchEvent(t);
		}
	}, [u, i]), /* @__PURE__ */ w(r.input, {
		style: { display: "none" },
		name: o,
		form: s,
		...t,
		ref: l,
		defaultValue: i
	});
}, "SliderBubbleInput"));
function Je(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
P(Je, "getNextSortedValues");
function Ye(e, t, n) {
	return pe(100 / (n - t) * (e - t), [0, 100]);
}
P(Ye, "convertValueToPercentage");
function Xe(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
P(Xe, "getLabel");
function Ze(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
P(Ze, "getClosestValueIndex");
function Qe(e, t, n) {
	let r = e / 2;
	return (r - tt([0, 50], [0, r])(t) * n) * n;
}
P(Qe, "getThumbInBoundsOffset");
function $e(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
P($e, "getStepsBetweenValues");
function et(e, t) {
	if (t > 0) {
		let n = $e(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
P(et, "hasMinStepsBetweenValues");
function tt(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
P(tt, "linearScale");
function nt(e) {
	if (!Number.isFinite(e)) return 0;
	let t = e.toString();
	if (t.includes("e")) {
		let [e, n] = t.split("e"), r = e.split(".")[1] || "", i = Number(n);
		return Math.max(0, r.length - i);
	}
	let n = t.split(".")[1];
	return n ? n.length : 0;
}
P(nt, "getDecimalCount");
function rt(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
P(rt, "roundValue");
function it(e, { min: t, step: n, direction: r, multiplier: i }) {
	let a = nt(n), o = (e - t) / n, s = Math.round(o), c = rt(s * n + t, a) === rt(e, a), l;
	return l = c ? s + i * r : r > 0 ? Math.ceil(o) : Math.floor(o), rt(l * n + t, a);
}
P(it, "getNextStepValue");
function at(e) {
	return typeof e == "function";
}
P(at, "isFunction");
//#endregion
//#region src/shared/ui/slider.tsx
var ot = ({ value: e, onChange: t, onCommit: n, min: r = 0, max: i = 1, step: a = .01, disabled: o, className: s }) => /* @__PURE__ */ T(ke, {
	className: `relative flex w-full touch-none select-none items-center ${s ?? ""}`,
	value: [e],
	min: r,
	max: i,
	step: a,
	disabled: o,
	onValueChange: ([e]) => {
		e !== void 0 && t(e);
	},
	onValueCommit: n,
	children: [/* @__PURE__ */ w(Ie, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-700/50",
		children: /* @__PURE__ */ w(Re, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ w(Ge, { className: "block h-3.5 w-3.5 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}), st = ({ title: e, description: t, defaultOpen: r = !0, children: i }) => {
	let [a, o] = x(r);
	return /* @__PURE__ */ T("div", {
		className: "rounded-md border border-border bg-card/40",
		children: [/* @__PURE__ */ T("button", {
			type: "button",
			onClick: () => o((e) => !e),
			className: "flex w-full items-center gap-1.5 px-2 py-1.5 text-left",
			"aria-expanded": a,
			children: [/* @__PURE__ */ w(n, { className: `h-3.5 w-3.5 shrink-0 transition-transform ${a ? "rotate-90" : ""}` }), /* @__PURE__ */ w("span", {
				className: "text-xs font-semibold",
				children: e
			})]
		}), a && /* @__PURE__ */ T("div", {
			className: "px-2 pb-2 space-y-2",
			children: [t && /* @__PURE__ */ w("div", {
				className: "text-[10px] text-muted-foreground",
				children: t
			}), i]
		})]
	});
}, ct = ({ label: e, help: t, error: n, orientation: r = "stacked", children: i }) => r === "row" ? /* @__PURE__ */ T("div", {
	className: "flex items-center justify-between gap-2",
	children: [/* @__PURE__ */ T("div", {
		className: "flex flex-col min-w-0",
		children: [/* @__PURE__ */ w("span", {
			className: "text-xs",
			children: e
		}), t && /* @__PURE__ */ w("span", {
			className: "text-[10px] text-muted-foreground",
			children: t
		})]
	}), /* @__PURE__ */ w("div", {
		className: "shrink-0",
		children: i
	})]
}) : /* @__PURE__ */ T("label", {
	className: "flex flex-col gap-1",
	children: [
		/* @__PURE__ */ w("span", {
			className: "text-xs",
			children: e
		}),
		t && /* @__PURE__ */ w("span", {
			className: "text-[10px] text-muted-foreground",
			children: t
		}),
		i,
		n && /* @__PURE__ */ w("span", {
			className: "text-[10px] text-destructive",
			children: n
		})
	]
}), lt = ({ value: e, onChange: t, placeholder: n, disabled: r, name: i }) => /* @__PURE__ */ w("input", {
	type: "text",
	name: i,
	value: e,
	placeholder: n,
	disabled: r,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
});
function ut(e, t, n) {
	let r = e;
	return typeof t == "number" && r < t && (r = t), typeof n == "number" && r > n && (r = n), r;
}
function dt(e) {
	return e === "" || e === "-" || e === "+" || e === "." || e === "-." || e === "+." || /^[+-]?(\d+\.?|\.\d+|\d+\.\d+)([eE][+-]?)?$/.test(e) && !Number.isFinite(Number(e));
}
function F(e) {
	return Number.isFinite(e) ? String(e) : "";
}
var ft = ({ value: e, onChange: t, min: n, max: r, step: i, disabled: a, name: o, placeholder: s }) => {
	let [c, l] = x(() => F(e)), u = b(!1), d = b(e);
	h(() => {
		if (d.current = e, u.current) return;
		let t = F(e);
		(Number(c) !== e || c === "") && l(t);
	}, [e, c]);
	let f = p((e) => {
		let i = e.trim();
		if (i === "" || dt(i)) return {
			committed: !1,
			nextText: F(d.current)
		};
		let a = Number(i);
		if (!Number.isFinite(a)) return {
			committed: !1,
			nextText: F(d.current)
		};
		let o = ut(a, n, r);
		return o !== d.current && t(o), {
			committed: !0,
			nextText: F(o)
		};
	}, [
		r,
		n,
		t
	]), m = p((e) => {
		let i = e.target.value;
		l(i);
		let a = i.trim();
		if (a === "" || dt(a)) return;
		let o = Number(a);
		if (!Number.isFinite(o)) return;
		let s = ut(o, n, r);
		s !== d.current && t(s);
	}, [
		r,
		n,
		t
	]), g = p(() => {
		u.current = !1;
		let { nextText: e } = f(c);
		l(e);
	}, [f, c]), _ = p((e) => {
		u.current = !0, e.currentTarget.select();
	}, []), v = p((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let { nextText: t } = f(c);
			l(t), e.currentTarget.blur();
		} else if (e.key === "Escape") e.preventDefault(), l(F(d.current)), e.currentTarget.blur();
		else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			let a = typeof i == "number" && i > 0 ? i : 1, o = e.key === "ArrowUp" ? 1 : -1, s = ut((Number.isFinite(d.current) ? d.current : 0) + o * a, n, r);
			e.preventDefault(), l(F(s)), s !== d.current && t(s);
		}
	}, [
		f,
		r,
		n,
		t,
		i,
		c
	]);
	return /* @__PURE__ */ w("input", {
		type: "text",
		inputMode: "decimal",
		name: o,
		value: c,
		placeholder: s,
		min: n,
		max: r,
		step: i,
		disabled: a,
		onChange: m,
		onBlur: g,
		onFocus: _,
		onKeyDown: v,
		autoComplete: "off",
		className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
	});
}, pt = ({ value: e, onChange: t, placeholder: n, rows: r = 6, disabled: i, name: a }) => /* @__PURE__ */ w("textarea", {
	name: a,
	value: e,
	rows: r,
	placeholder: n,
	disabled: i,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-[10px] font-mono leading-tight focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50 resize-y"
});
function mt({ value: e, options: t, onChange: n, disabled: r, name: i }) {
	return /* @__PURE__ */ w("select", {
		name: i,
		value: e,
		disabled: r,
		onChange: (e) => n(e.target.value),
		className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50",
		children: t.map((e) => /* @__PURE__ */ w("option", {
			value: e.value,
			disabled: e.disabled,
			children: e.label
		}, e.value))
	});
}
var ht = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, disabled: a }) => {
	let o = b(null), s = p((e) => {
		o.current != null && cancelAnimationFrame(o.current), o.current = requestAnimationFrame(() => {
			o.current = null, t(e);
		});
	}, [t]), c = p(([e]) => {
		o.current != null && (cancelAnimationFrame(o.current), o.current = null), e !== void 0 && t(e);
	}, [t]);
	return /* @__PURE__ */ w("div", {
		className: "min-w-0",
		children: /* @__PURE__ */ w(ot, {
			value: e,
			onChange: s,
			min: n,
			max: r,
			step: i,
			disabled: a,
			onCommit: c
		})
	});
}, gt = ({ checked: e, onChange: t, disabled: n }) => /* @__PURE__ */ w("input", {
	type: "checkbox",
	checked: e,
	disabled: n,
	onChange: (e) => t(e.target.checked),
	className: "h-3.5 w-3.5 accent-primary disabled:opacity-50"
}), _t = ({ value: e, onChange: t, topics: n, typeIncludes: r, topicTypeMatches: i, nameIncludes: a, placeholder: o, disabled: s, name: c }) => /* @__PURE__ */ T(C, { children: [c != null && c.length > 0 ? /* @__PURE__ */ w("input", {
	type: "hidden",
	name: c,
	value: e,
	readOnly: !0,
	"aria-hidden": !0
}) : null, /* @__PURE__ */ w(l, {
	value: e,
	onChange: t,
	topics: n,
	typeIncludes: r,
	topicTypeMatches: i,
	nameIncludes: a,
	placeholder: o,
	disabled: s,
	className: "w-full min-w-0"
})] }), vt = ({ value: e, onChange: t, placeholder: n = "https:// or package://", disabled: r, name: i }) => /* @__PURE__ */ w("input", {
	type: "url",
	name: i,
	value: e,
	placeholder: n,
	disabled: r,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
}), yt = ({ accept: e, onRead: t, label: n = "Choose file…", disabled: r, name: i }) => {
	let a = g();
	return /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("input", {
		id: a,
		type: "file",
		name: i ?? a,
		accept: e,
		disabled: r,
		className: "hidden",
		onChange: async (e) => {
			let n = e.target.files?.[0];
			if (e.target.value = "", n) try {
				t(await n.text(), n);
			} catch (e) {
				console.warn("[FileInput] Failed to read file", e);
			}
		}
	}), /* @__PURE__ */ w("button", {
		type: "button",
		onClick: () => document.getElementById(a)?.click(),
		disabled: r,
		className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs hover:bg-accent disabled:opacity-50",
		children: n
	})] });
}, bt = () => ({
	urdfSourceType: "file",
	urdfTopic: "",
	jointStateTopic: "",
	urdfFileName: "",
	urdfFileContent: "",
	meshStrategy: "localUpload",
	packageName: "",
	packageBaseUrl: "",
	framePrefix: "",
	rotateMeshVisuals: !1,
	visualRpyOffset: [
		0,
		0,
		0
	],
	fallbackMeshColor: "#94a3b8",
	showGrid: !0,
	showAxes: !0,
	manualJointPositions: {},
	followLiveJointState: !1,
	settingsPanelPercent: 35
});
//#endregion
//#region node_modules/react-resizable-panels/dist/react-resizable-panels.js
function xt(e, t) {
	let n = getComputedStyle(e);
	return t * parseFloat(n.fontSize);
}
function St(e, t) {
	let n = getComputedStyle(e.ownerDocument.documentElement);
	return t * parseFloat(n.fontSize);
}
function Ct(e) {
	return e / 100 * window.innerHeight;
}
function wt(e) {
	return e / 100 * window.innerWidth;
}
function Tt(e) {
	switch (typeof e) {
		case "number": return [e, "px"];
		case "string": {
			let t = parseFloat(e);
			return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
		}
	}
}
function Et({ groupSize: e, panelElement: t, styleProp: n }) {
	let r, [i, a] = Tt(n);
	switch (a) {
		case "%":
			r = i / 100 * e;
			break;
		case "px":
			r = i;
			break;
		case "rem":
			r = St(t, i);
			break;
		case "em":
			r = xt(t, i);
			break;
		case "vh":
			r = Ct(i);
			break;
		case "vw": r = wt(i);
	}
	return r;
}
function I(e) {
	return parseFloat(e.toFixed(3));
}
function L({ group: e }) {
	let { orientation: t, panels: n } = e;
	return n.reduce((e, n) => (e += t === "horizontal" ? n.element.offsetWidth : n.element.offsetHeight, e), 0);
}
function Dt(e) {
	let { panels: t } = e, n = L({ group: e });
	return n === 0 ? t.map((e) => ({
		groupResizeBehavior: e.panelConstraints.groupResizeBehavior,
		collapsedSize: 0,
		collapsible: e.panelConstraints.collapsible === !0,
		defaultSize: void 0,
		disabled: e.panelConstraints.disabled,
		minSize: 0,
		maxSize: 100,
		panelId: e.id
	})) : t.map((e) => {
		let { element: t, panelConstraints: r } = e, i = 0;
		r.collapsedSize !== void 0 && (i = I(Et({
			groupSize: n,
			panelElement: t,
			styleProp: r.collapsedSize
		}) / n * 100));
		let a;
		r.defaultSize !== void 0 && (a = I(Et({
			groupSize: n,
			panelElement: t,
			styleProp: r.defaultSize
		}) / n * 100));
		let o = 0;
		r.minSize !== void 0 && (o = I(Et({
			groupSize: n,
			panelElement: t,
			styleProp: r.minSize
		}) / n * 100));
		let s = 100;
		return r.maxSize !== void 0 && (s = I(Et({
			groupSize: n,
			panelElement: t,
			styleProp: r.maxSize
		}) / n * 100)), {
			groupResizeBehavior: r.groupResizeBehavior,
			collapsedSize: i,
			collapsible: r.collapsible === !0,
			defaultSize: a,
			disabled: r.disabled,
			minSize: o,
			maxSize: s,
			panelId: e.id
		};
	});
}
function R(e, t = "Assertion error") {
	if (!e) throw Error(t);
}
function Ot(e, t) {
	return Array.from(t).sort(e === "horizontal" ? kt : At);
}
function kt(e, t) {
	let n = e.element.offsetLeft - t.element.offsetLeft;
	return n === 0 ? e.element.offsetWidth - t.element.offsetWidth : n;
}
function At(e, t) {
	let n = e.element.offsetTop - t.element.offsetTop;
	return n === 0 ? e.element.offsetHeight - t.element.offsetHeight : n;
}
function jt(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Mt(e, t) {
	return {
		x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(Math.abs(e.x - t.left), Math.abs(e.x - t.right)),
		y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(Math.abs(e.y - t.top), Math.abs(e.y - t.bottom))
	};
}
function Nt({ orientation: e, rects: t, targetRect: n }) {
	let r = {
		x: n.x + n.width / 2,
		y: n.y + n.height / 2
	}, i, a = Number.MAX_VALUE;
	for (let n of t) {
		let { x: t, y: o } = Mt(r, n), s = e === "horizontal" ? t : o;
		s < a && (a = s, i = n);
	}
	return R(i, "No rect found"), i;
}
var Pt;
function Ft() {
	return Pt === void 0 && (Pt = typeof matchMedia == "function" && !!matchMedia("(pointer:coarse)").matches), Pt;
}
function It(e) {
	let { element: t, orientation: n, panels: r, separators: i } = e, a = Ot(n, Array.from(t.children).filter(jt).map((e) => ({ element: e }))).map(({ element: e }) => e), o = [], s = !1, c = !1, l = -1, u = -1, d = 0, f, p = [];
	{
		let e = -1;
		for (let t of a) t.hasAttribute("data-panel") && (e++, t.hasAttribute("data-disabled") || (d++, l === -1 && (l = e), u = e));
	}
	if (d > 1) {
		let t = -1;
		for (let d of a) if (d.hasAttribute("data-panel")) {
			t++;
			let i = r.find((e) => e.element === d);
			if (i) {
				if (f) {
					let r = f.element.getBoundingClientRect(), a = d.getBoundingClientRect(), m;
					if (c) {
						let e = n === "horizontal" ? new DOMRect(r.right, r.top, 0, r.height) : new DOMRect(r.left, r.bottom, r.width, 0), t = n === "horizontal" ? new DOMRect(a.left, a.top, 0, a.height) : new DOMRect(a.left, a.top, a.width, 0);
						switch (p.length) {
							case 0:
								m = [e, t];
								break;
							case 1: {
								let i = p[0];
								m = [i, Nt({
									orientation: n,
									rects: [r, a],
									targetRect: i.element.getBoundingClientRect()
								}) === r ? t : e];
								break;
							}
							default: m = p;
						}
					} else m = p.length ? p : [n === "horizontal" ? new DOMRect(r.right, a.top, a.left - r.right, a.height) : new DOMRect(a.left, r.bottom, a.width, a.top - r.bottom)];
					for (let n of m) {
						let r = "width" in n ? n : n.element.getBoundingClientRect(), a = Ft() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
						if (r.width < a) {
							let e = a - r.width;
							r = new DOMRect(r.x - e / 2, r.y, r.width + e, r.height);
						}
						if (r.height < a) {
							let e = a - r.height;
							r = new DOMRect(r.x, r.y - e / 2, r.width, r.height + e);
						}
						!s && !(t <= l || t > u) && o.push({
							group: e,
							groupSize: L({ group: e }),
							panels: [f, i],
							separator: "width" in n ? void 0 : n,
							rect: r
						}), s = !1;
					}
				}
				c = !1, f = i, p = [];
			}
		} else if (d.hasAttribute("data-separator")) {
			d.ariaDisabled !== null && (s = !0);
			let e = i.find((e) => e.element === d);
			e ? p.push(e) : (f = void 0, p = []);
		} else c = !0;
	}
	return o;
}
var Lt = class {
	#e = {};
	addListener(e, t) {
		let n = this.#e[e];
		return n === void 0 ? this.#e[e] = [t] : n.includes(t) || n.push(t), () => {
			this.removeListener(e, t);
		};
	}
	emit(e, t) {
		let n = this.#e[e];
		if (n !== void 0) {
			if (n.length === 1) n[0].call(null, t);
			else {
				let e = !1, r = null, i = Array.from(n);
				for (let n = 0; n < i.length; n++) {
					let a = i[n];
					try {
						a.call(null, t);
					} catch (t) {
						r === null && (e = !0, r = t);
					}
				}
				if (e) throw r;
			}
		}
	}
	removeAllListeners() {
		this.#e = {};
	}
	removeListener(e, t) {
		let n = this.#e[e];
		if (n !== void 0) {
			let e = n.indexOf(t);
			e >= 0 && n.splice(e, 1);
		}
	}
}, z = {
	cursorFlags: 0,
	state: "inactive"
}, Rt = new Lt();
function B() {
	return z;
}
function zt(e) {
	return Rt.addListener("change", e);
}
function Bt(e) {
	let t = z, n = { ...z };
	n.cursorFlags = e, z = n, Rt.emit("change", {
		prev: t,
		next: n
	});
}
function V(e) {
	let t = z;
	z = e, Rt.emit("change", {
		prev: t,
		next: e
	});
}
var Vt = (e) => e, Ht = () => {}, Ut = 1, Wt = 2, Gt = 4, Kt = 8, qt = 3, Jt = 12, Yt;
function Xt() {
	return Yt === void 0 && (Yt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Yt = !0)), Yt;
}
function Zt({ cursorFlags: e, groups: t, state: n }) {
	let r = 0, i = 0;
	switch (n) {
		case "active":
		case "hover": t.forEach((e) => {
			if (!e.mutableState.disableCursor) switch (e.orientation) {
				case "horizontal":
					r++;
					break;
				case "vertical":
					i++;
					break;
			}
		});
	}
	if (r !== 0 || i !== 0) {
		if (n === "active" && e && Xt()) {
			let t = (e & Ut) !== 0, n = (e & Wt) !== 0, r = (e & Gt) !== 0, i = (e & Kt) !== 0;
			if (t) return r ? "se-resize" : i ? "ne-resize" : "e-resize";
			if (n) return r ? "sw-resize" : i ? "nw-resize" : "w-resize";
			if (r) return "s-resize";
			if (i) return "n-resize";
		}
		return Xt() ? r > 0 && i > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && i > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
	}
}
var Qt = /* @__PURE__ */ new WeakMap();
function $t(e) {
	if (!e.defaultView || !e.adoptedStyleSheets) return;
	let { prevStyle: t, styleSheet: n } = Qt.get(e) ?? {};
	n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [...e.adoptedStyleSheets, n]));
	let r = B();
	switch (r.state) {
		case "active":
		case "hover": {
			let e = Zt({
				cursorFlags: r.cursorFlags,
				groups: r.hitRegions.map((e) => e.group),
				state: r.state
			}), i = `*, *:hover {cursor: ${e} !important; }`;
			if (t === i) return;
			t = i, e ? n.cssRules.length === 0 ? n.insertRule(i) : n.replaceSync(i) : n.cssRules.length === 1 && n.deleteRule(0);
			break;
		}
		case "inactive": t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
	}
	Qt.set(e, {
		prevStyle: t,
		styleSheet: n
	});
}
var H = /* @__PURE__ */ new Map(), en = new Lt();
function tn(e) {
	H = new Map(H), H.delete(e);
}
function nn(e, t) {
	for (let [t] of H) if (t.id === e) return t;
}
function U(e, t) {
	for (let [t, n] of H) if (t.id === e) return n;
	if (t) throw Error(`Could not find data for Group with id ${e}`);
}
function W() {
	return H;
}
function rn(e, t) {
	return en.addListener("groupChange", (n) => {
		n.group.id === e && t(n);
	});
}
function G(e, t, n) {
	let r = H.get(e);
	H = new Map(H), H.set(e, t), en.emit("groupChange", {
		group: e,
		isUserInteraction: n?.isUserInteraction === !0,
		prev: r,
		next: t
	});
}
function an(e) {
	let t = B(), n = W(), r = !1;
	return t.state === "active" && (V({
		cursorFlags: 0,
		state: "inactive"
	}), t.hitRegions.length > 0 && ($t(e), r = !0, t.hitRegions.forEach((e) => {
		if (!n.has(e.group)) return;
		let t = U(e.group.id, !0);
		G(e.group, t, { isUserInteraction: !0 });
	}))), r;
}
function on(e) {
	e.defaultPrevented || an(e.currentTarget);
}
function sn(e, t, n) {
	let r, i = {
		x: 1 / 0,
		y: 1 / 0
	};
	for (let a of t) {
		let t = Mt(n, a.rect);
		switch (e) {
			case "horizontal":
				t.x <= i.x && (r = a, i = t);
				break;
			case "vertical": t.y <= i.y && (r = a, i = t);
		}
	}
	return r ? {
		distance: i,
		hitRegion: r
	} : void 0;
}
function cn(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function ln(e, t) {
	if (e === t) throw Error("Cannot compare node with itself");
	let n = {
		a: hn(e),
		b: hn(t)
	}, r;
	for (; n.a.at(-1) === n.b.at(-1);) r = n.a.pop(), n.b.pop();
	R(r, "Stacking order can only be calculated for elements with a common ancestor");
	let i = {
		a: mn(pn(n.a)),
		b: mn(pn(n.b))
	};
	if (i.a === i.b) {
		let e = r.childNodes, t = {
			a: n.a.at(-1),
			b: n.b.at(-1)
		}, i = e.length;
		for (; i--;) {
			let n = e[i];
			if (n === t.a) return 1;
			if (n === t.b) return -1;
		}
	}
	return Math.sign(i.a - i.b);
}
var un = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function dn(e) {
	let t = getComputedStyle(gn(e) ?? e).display;
	return t === "flex" || t === "inline-flex";
}
function fn(e) {
	let t = getComputedStyle(e);
	return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || dn(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || un.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function pn(e) {
	let t = e.length;
	for (; t--;) {
		let n = e[t];
		if (R(n, "Missing node"), fn(n)) return n;
	}
	return null;
}
function mn(e) {
	return e && Number(getComputedStyle(e).zIndex) || 0;
}
function hn(e) {
	let t = [];
	for (; e;) t.push(e), e = gn(e);
	return t;
}
function gn(e) {
	let { parentNode: t } = e;
	return cn(t) ? t.host : t;
}
function _n(e, t) {
	return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function vn({ groupElement: e, hitRegion: t, pointerEventTarget: n }) {
	if (!jt(n) || n.contains(e) || e.contains(n)) return !0;
	if (ln(n, e) > 0) {
		let r = n;
		for (; r;) {
			if (r.contains(e)) return !0;
			if (_n(r.getBoundingClientRect(), t)) return !1;
			r = r.parentElement;
		}
	}
	return !0;
}
function yn(e, t) {
	let n = [];
	return t.forEach((t, r) => {
		if (r.disabled) return;
		let i = It(r), a = sn(r.orientation, i, {
			x: e.clientX,
			y: e.clientY
		});
		a && a.distance.x <= 0 && a.distance.y <= 0 && vn({
			groupElement: r.element,
			hitRegion: a.hitRegion.rect,
			pointerEventTarget: e.target
		}) && n.push(a.hitRegion);
	}), n;
}
function bn(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
	return !0;
}
function K(e, t, n = 0) {
	return Math.abs(I(e) - I(t)) <= n;
}
function q(e, t) {
	return K(e, t) ? 0 : e > t ? 1 : -1;
}
function J({ overrideDisabledPanels: e, panelConstraints: t, prevSize: n, size: r }) {
	let { collapsedSize: i = 0, collapsible: a, disabled: o, maxSize: s = 100, minSize: c = 0 } = t;
	if (o && !e) return n;
	if (q(r, c) < 0) {
		if (a) {
			let e = (i + c) / 2;
			r = q(r, e) < 0 ? i : c;
		} else r = c;
	}
	return r = Math.min(s, r), r = I(r), r;
}
function xn({ delta: e, initialLayout: t, panelConstraints: n, pivotIndices: r, prevLayout: i, trigger: a }) {
	if (K(e, 0)) return t;
	let o = a === "imperative-api", s = Object.values(t), c = Object.values(i), l = [...s], [u, d] = r;
	R(u != null, "Invalid first pivot index"), R(d != null, "Invalid second pivot index");
	let f = 0;
	switch (a) {
		case "keyboard":
			{
				let t = e < 0 ? d : u, r = n[t];
				R(r, `Panel constraints not found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (R(n != null, `Previous layout not found for panel index ${t}`), K(n, i)) {
						let t = o - n;
						q(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			{
				let t = e < 0 ? u : d, r = n[t];
				R(r, `No panel constraints found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (R(n != null, `Previous layout not found for panel index ${t}`), K(n, o)) {
						let t = n - i;
						q(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			break;
		default: {
			let t = e < 0 ? d : u, r = n[t];
			R(r, `Panel constraints not found for index ${t}`);
			let i = s[t], { collapsible: a, collapsedSize: o, minSize: c } = r;
			if (a && q(i, c) < 0) {
				if (e > 0) {
					let t = c - o, n = t / 2;
					q(i + e, c) < 0 && (e = q(e, n) <= 0 ? 0 : t);
				} else {
					let t = c - o, n = 100 - t / 2;
					q(i - e, c) < 0 && (e = q(100 + e, n) > 0 ? 0 : -t);
				}
			}
			break;
		}
	}
	{
		let t = e < 0 ? 1 : -1, r = e < 0 ? d : u, i = 0;
		for (;;) {
			let e = s[r];
			R(e != null, `Previous layout not found for panel index ${r}`);
			let a = J({
				overrideDisabledPanels: o,
				panelConstraints: n[r],
				prevSize: e,
				size: 100
			}) - e;
			if (i += a, r += t, r < 0 || r >= n.length) break;
		}
		let a = Math.min(Math.abs(e), Math.abs(i));
		e = e < 0 ? 0 - a : a;
	}
	{
		let t = e < 0 ? u : d;
		for (; t >= 0 && t < n.length;) {
			let r = Math.abs(e) - Math.abs(f), i = s[t];
			R(i != null, `Previous layout not found for panel index ${t}`);
			let a = i - r, c = J({
				overrideDisabledPanels: o,
				panelConstraints: n[t],
				prevSize: i,
				size: a
			});
			if (!K(i, c) && (f += i - c, l[t] = c, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, { numeric: !0 }) >= 0)) break;
			e < 0 ? t-- : t++;
		}
	}
	if (bn(c, l)) return i;
	{
		let t = e < 0 ? d : u, r = s[t];
		R(r != null, `Previous layout not found for panel index ${t}`);
		let i = r + f, a = J({
			overrideDisabledPanels: o,
			panelConstraints: n[t],
			prevSize: r,
			size: i
		});
		if (l[t] = a, !K(a, i)) {
			let t = i - a, r = e < 0 ? d : u;
			for (; r >= 0 && r < n.length;) {
				let i = l[r];
				R(i != null, `Previous layout not found for panel index ${r}`);
				let a = i + t, s = J({
					overrideDisabledPanels: o,
					panelConstraints: n[r],
					prevSize: i,
					size: a
				});
				if (K(i, s) || (t -= s - i, l[r] = s), K(t, 0)) break;
				e > 0 ? r-- : r++;
			}
		}
	}
	if (!K(Object.values(l).reduce((e, t) => t + e, 0), 100, .1)) return i;
	let p = Object.keys(i);
	return l.reduce((e, t, n) => (e[p[n]] = t, e), {});
}
function Y(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (t[n] === void 0 || q(e[n], t[n]) !== 0) return !1;
	return !0;
}
function X({ layout: e, panelConstraints: t }) {
	let n = Object.values(e), r = [...n], i = r.reduce((e, t) => e + t, 0);
	if (r.length !== t.length) throw Error(`Invalid ${t.length} panel layout: ${r.map((e) => `${e}%`).join(", ")}`);
	if (!K(i, 100) && r.length > 0) for (let e = 0; e < t.length; e++) {
		let t = r[e];
		R(t != null, `No layout data found for index ${e}`);
		let n = 100 / i * t;
		r[e] = n;
	}
	let a = 0;
	for (let e = 0; e < t.length; e++) {
		let i = n[e];
		R(i != null, `No layout data found for index ${e}`);
		let o = r[e];
		R(o != null, `No layout data found for index ${e}`);
		let s = J({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: i,
			size: o
		});
		o != s && (a += o - s, r[e] = s);
	}
	if (!K(a, 0)) for (let e = 0; e < t.length; e++) {
		let n = r[e];
		R(n != null, `No layout data found for index ${e}`);
		let i = n + a, o = J({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: n,
			size: i
		});
		if (n !== o && (a -= o - n, r[e] = o, K(a, 0))) break;
	}
	let o = Object.keys(e);
	return r.reduce((e, t, n) => (e[o[n]] = t, e), {});
}
function Sn({ groupId: e, panelId: t }) {
	let n = () => {
		let t = W();
		for (let [n, { defaultLayoutDeferred: r, derivedPanelConstraints: i, layout: a, groupSize: o, separatorToPanels: s }] of t) if (n.id === e) return {
			defaultLayoutDeferred: r,
			derivedPanelConstraints: i,
			group: n,
			groupSize: o,
			layout: a,
			separatorToPanels: s
		};
		throw Error(`Group ${e} not found`);
	}, r = () => {
		let e = n().derivedPanelConstraints.find((e) => e.panelId === t);
		if (e !== void 0) return e;
		throw Error(`Panel constraints not found for Panel ${t}`);
	}, i = () => {
		let e = n().group.panels.find((e) => e.id === t);
		if (e !== void 0) return e;
		throw Error(`Layout not found for Panel ${t}`);
	}, a = () => {
		let e = n().layout[t];
		if (e !== void 0) return e;
		throw Error(`Layout not found for Panel ${t}`);
	}, o = ({ nextSize: e, panels: n, prevLayout: r, derivedPanelConstraints: i }) => {
		let o = a(), s = n.findIndex((e) => e.id === t), c = s === 0, l = s === n.length - 1;
		if (l && e < o && (c || n.slice(0, s).every((e, t) => {
			let n = i[t];
			return n?.collapsible && K(n.collapsedSize, r[n.panelId]);
		}))) {
			let e = n.slice(0, s).reduce((e, t) => e + r[t.id], 0);
			return {
				...r,
				[t]: I(100 - e)
			};
		}
		return xn({
			delta: l ? o - e : e - o,
			initialLayout: r,
			panelConstraints: i,
			pivotIndices: l ? [s - 1, s] : [s, s + 1],
			prevLayout: r,
			trigger: "imperative-api"
		});
	}, s = (e) => {
		if (e === a()) return;
		let { defaultLayoutDeferred: t, derivedPanelConstraints: r, group: i, groupSize: s, layout: c, separatorToPanels: l } = n(), u = X({
			layout: o({
				nextSize: e,
				panels: i.panels,
				prevLayout: c,
				derivedPanelConstraints: r
			}),
			panelConstraints: r
		});
		Y(c, u) || G(i, {
			defaultLayoutDeferred: t,
			derivedPanelConstraints: r,
			groupSize: s,
			layout: u,
			separatorToPanels: l
		});
	};
	return {
		collapse: () => {
			let { collapsible: e, collapsedSize: t } = r(), { mutableValues: n } = i(), o = a();
			e && o !== t && (n.expandToSize = o, s(t));
		},
		expand: () => {
			let { collapsible: e, collapsedSize: t, minSize: n } = r(), { mutableValues: o } = i(), c = a();
			if (e && c === t) {
				let e = o.expandToSize ?? n;
				e === 0 && (e = 1), s(e);
			}
		},
		getSize: () => {
			let { group: e } = n(), t = a(), { element: r } = i();
			return {
				asPercentage: t,
				inPixels: e.orientation === "horizontal" ? r.offsetWidth : r.offsetHeight
			};
		},
		isCollapsed: () => {
			let { collapsible: e, collapsedSize: t } = r(), n = a();
			return e && K(t, n);
		},
		resize: (e) => {
			let { group: t } = n(), { element: r } = i(), a = L({ group: t }), o = I(Et({
				groupSize: a,
				panelElement: r,
				styleProp: e
			}) / a * 100);
			s(o);
		}
	};
}
function Cn(e) {
	e.defaultPrevented || yn(e, W()).forEach((t) => {
		if (t.separator && !t.separator.disableDoubleClick) {
			let n = t.panels.find((e) => e.panelConstraints.defaultSize !== void 0);
			if (n) {
				let r = n.panelConstraints.defaultSize, i = Sn({
					groupId: t.group.id,
					panelId: n.id
				});
				i && r !== void 0 && (i.resize(r), e.preventDefault());
			}
		}
	});
}
function wn(e) {
	let t = W();
	for (let [n] of t) if (n.separators.some((t) => t.element === e)) return n;
	throw Error("Could not find parent Group for separator element");
}
function Tn({ groupId: e }) {
	let t = () => {
		let t = W();
		for (let [n, r] of t) if (n.id === e) return {
			group: n,
			...r
		};
		throw Error(`Could not find Group with id "${e}"`);
	};
	return {
		getLayout() {
			let { defaultLayoutDeferred: e, layout: n } = t();
			return e ? {} : n;
		},
		setLayout(e) {
			let { defaultLayoutDeferred: n, derivedPanelConstraints: r, group: i, groupSize: a, layout: o, separatorToPanels: s } = t(), c = X({
				layout: e,
				panelConstraints: r
			});
			return n ? o : (Y(o, c) || G(i, {
				defaultLayoutDeferred: n,
				derivedPanelConstraints: r,
				groupSize: a,
				layout: c,
				separatorToPanels: s
			}), c);
		}
	};
}
function Z(e, t) {
	let n = wn(e), r = U(n.id, !0), i = n.separators.find((t) => t.element === e);
	R(i, "Matching separator not found");
	let a = r.separatorToPanels.get(i);
	R(a, "Matching panels not found");
	let o = a.map((e) => n.panels.indexOf(e)), s = Tn({ groupId: n.id }).getLayout(), c = X({
		layout: xn({
			delta: t,
			initialLayout: s,
			panelConstraints: r.derivedPanelConstraints,
			pivotIndices: o,
			prevLayout: s,
			trigger: "keyboard"
		}),
		panelConstraints: r.derivedPanelConstraints
	});
	Y(s, c) || G(n, {
		defaultLayoutDeferred: r.defaultLayoutDeferred,
		derivedPanelConstraints: r.derivedPanelConstraints,
		groupSize: r.groupSize,
		layout: c,
		separatorToPanels: r.separatorToPanels
	}, { isUserInteraction: !0 });
}
function En(e) {
	if (e.defaultPrevented) return;
	let t = e.currentTarget, n = wn(t);
	if (!n.disabled) switch (e.key) {
		case "ArrowDown":
			e.preventDefault(), n.orientation === "vertical" && Z(t, 5);
			break;
		case "ArrowLeft":
			e.preventDefault(), n.orientation === "horizontal" && Z(t, -5);
			break;
		case "ArrowRight":
			e.preventDefault(), n.orientation === "horizontal" && Z(t, 5);
			break;
		case "ArrowUp":
			e.preventDefault(), n.orientation === "vertical" && Z(t, -5);
			break;
		case "End":
			e.preventDefault(), Z(t, 100);
			break;
		case "Enter": {
			e.preventDefault();
			let n = wn(t), { derivedPanelConstraints: r, layout: i, separatorToPanels: a } = U(n.id, !0), o = n.separators.find((e) => e.element === t);
			R(o, "Matching separator not found");
			let s = a.get(o);
			R(s, "Matching panels not found");
			let c = s[0], l = r.find((e) => e.panelId === c.id);
			if (R(l, "Panel metadata not found"), l.collapsible) {
				let e = i[c.id];
				Z(t, (l.collapsedSize === e ? n.mutableState.expandedPanelSizes[c.id] ?? l.minSize : l.collapsedSize) - e);
			}
			break;
		}
		case "F6": {
			e.preventDefault();
			let n = wn(t).separators.map((e) => e.element), r = Array.from(n).findIndex((t) => t === e.currentTarget);
			R(r !== null, "Index not found"), n[e.shiftKey ? r > 0 ? r - 1 : n.length - 1 : r + 1 < n.length ? r + 1 : 0].focus({ preventScroll: !0 });
			break;
		}
		case "Home":
			e.preventDefault(), Z(t, -100);
			break;
	}
}
function Dn(e) {
	if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0) return;
	let t = W(), n = yn(e, t), r = /* @__PURE__ */ new Map(), i = !1;
	n.forEach((e) => {
		e.separator && (i || (i = !0, e.separator.element.focus({
			focusVisible: !1,
			preventScroll: !0
		})));
		let n = t.get(e.group);
		n && r.set(e.group, n.layout);
	}), V({
		cursorFlags: 0,
		hitRegions: n,
		initialLayoutMap: r,
		pointerDownAtPoint: {
			x: e.clientX,
			y: e.clientY
		},
		state: "active"
	}), n.length && e.preventDefault();
}
function On({ document: e, event: t, hitRegions: n, initialLayoutMap: r, mountedGroups: i, pointerDownAtPoint: a, prevCursorFlags: o }) {
	let s = 0;
	n.forEach((e) => {
		let { group: n, groupSize: o } = e, { orientation: c, panels: l } = n, { disableCursor: u } = n.mutableState, d = 0;
		d = a ? c === "horizontal" ? (t.clientX - a.x) / o * 100 : (t.clientY - a.y) / o * 100 : c === "horizontal" ? t.clientX < 0 ? -100 : 100 : t.clientY < 0 ? -100 : 100;
		let f = r.get(n), p = i.get(n);
		if (!f || !p) return;
		let { defaultLayoutDeferred: m, derivedPanelConstraints: h, groupSize: g, layout: _, separatorToPanels: v } = p;
		if (h && _ && v) {
			let t = xn({
				delta: d,
				initialLayout: f,
				panelConstraints: h,
				pivotIndices: e.panels.map((e) => l.indexOf(e)),
				prevLayout: _,
				trigger: "mouse-or-touch"
			});
			if (Y(t, _)) {
				if (d !== 0 && !u) switch (c) {
					case "horizontal":
						s |= d < 0 ? Ut : Wt;
						break;
					case "vertical":
						s |= d < 0 ? Gt : Kt;
						break;
				}
			} else G(e.group, {
				defaultLayoutDeferred: m,
				derivedPanelConstraints: h,
				groupSize: g,
				layout: t,
				separatorToPanels: v
			});
		}
	});
	let c = 0;
	t.movementX === 0 ? c |= o & qt : c |= s & qt, t.movementY === 0 ? c |= o & Jt : c |= s & Jt, Bt(c), $t(e);
}
function kn(e) {
	let t = W(), n = B();
	n.state === "active" && On({
		document: e.currentTarget,
		event: e,
		hitRegions: n.hitRegions,
		initialLayoutMap: n.initialLayoutMap,
		mountedGroups: t,
		prevCursorFlags: n.cursorFlags
	});
}
function An(e) {
	if (e.defaultPrevented) return;
	let t = B(), n = W();
	switch (t.state) {
		case "active":
			if (e.buttons === 0) {
				V({
					cursorFlags: 0,
					state: "inactive"
				}), t.hitRegions.forEach((e) => {
					if (!n.has(e.group)) return;
					let t = U(e.group.id, !0);
					G(e.group, t, { isUserInteraction: !0 });
				});
				return;
			}
			for (let n of t.hitRegions) if (n.separator) {
				let { element: t } = n.separator;
				t.hasPointerCapture?.(e.pointerId) || t.setPointerCapture?.(e.pointerId);
			}
			On({
				document: e.currentTarget,
				event: e,
				hitRegions: t.hitRegions,
				initialLayoutMap: t.initialLayoutMap,
				mountedGroups: n,
				pointerDownAtPoint: t.pointerDownAtPoint,
				prevCursorFlags: t.cursorFlags
			});
			break;
		default: {
			let r = yn(e, n);
			r.length === 0 ? t.state !== "inactive" && V({
				cursorFlags: 0,
				state: "inactive"
			}) : V({
				cursorFlags: 0,
				hitRegions: r,
				state: "hover"
			}), $t(e.currentTarget);
			break;
		}
	}
}
function jn(e) {
	if (e.relatedTarget instanceof HTMLIFrameElement) switch (B().state) {
		case "hover": V({
			cursorFlags: 0,
			state: "inactive"
		});
	}
}
function Mn(e) {
	e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || an(e.currentTarget) && e.preventDefault();
}
function Nn(e) {
	let t = 0, n = 0, r = {};
	for (let i of e) if (i.defaultSize !== void 0) {
		t++;
		let e = I(i.defaultSize);
		n += e, r[i.panelId] = e;
	} else r[i.panelId] = void 0;
	let i = e.length - t;
	if (i !== 0) {
		let t = I((100 - n) / i);
		for (let n of e) n.defaultSize === void 0 && (r[n.panelId] = t);
	}
	return r;
}
function Pn(e, t, n) {
	if (!n[0]) return;
	let r = e.panels.find((e) => e.element === t);
	if (!r || !r.onResize) return;
	let i = L({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, o = r.mutableValues.prevSize, s = {
		asPercentage: I(a / i * 100),
		inPixels: a
	};
	r.mutableValues.prevSize = s, r.onResize(s, r.id, o);
}
function Fn(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function In(e, t) {
	return e.length === t.length && e.every((e, n) => Fn(e, t[n]));
}
function Ln({ group: e, nextGroupSize: t, prevGroupSize: n, prevLayout: r }) {
	if (n <= 0 || t <= 0 || n === t) return r;
	let i = 0, a = 0, o = !1, s = /* @__PURE__ */ new Map(), c = [];
	for (let l of e.panels) {
		let e = r[l.id] ?? 0;
		switch (l.panelConstraints.groupResizeBehavior) {
			case "preserve-pixel-size": {
				o = !0;
				let r = I(e / 100 * n / t * 100);
				s.set(l.id, r), i += r;
				break;
			}
			default: c.push(l.id), a += e;
		}
	}
	if (!o || c.length === 0) return r;
	let l = 100 - i, u = { ...r };
	if (s.forEach((e, t) => {
		u[t] = e;
	}), a > 0) for (let e of c) u[e] = I((r[e] ?? 0) / a * l);
	else {
		let e = I(l / c.length);
		for (let t of c) u[t] = e;
	}
	return u;
}
function Rn(e, t) {
	let n = e.map((e) => e.id), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let e of n) if (!r.includes(e)) return !1;
	return !0;
}
var Q = /* @__PURE__ */ new Map();
function zn(e) {
	let t = !0;
	R(e.element.ownerDocument.defaultView, "Cannot register an unmounted Group");
	let n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = new n((n) => {
		for (let r of n) {
			let { borderBoxSize: n, target: i } = r;
			if (i === e.element) {
				if (t) {
					let t = L({ group: e });
					if (t === 0) return;
					let n = U(e.id);
					if (!n) return;
					let r = Dt(e), i = n.defaultLayoutDeferred ? Nn(r) : n.layout, a = X({
						layout: Ln({
							group: e,
							nextGroupSize: t,
							prevGroupSize: n.groupSize,
							prevLayout: i
						}),
						panelConstraints: r
					});
					if (!n.defaultLayoutDeferred && Y(n.layout, a) && In(n.derivedPanelConstraints, r) && n.groupSize === t) continue;
					G(e, {
						defaultLayoutDeferred: !1,
						derivedPanelConstraints: r,
						groupSize: t,
						layout: a,
						separatorToPanels: n.separatorToPanels
					});
				}
			} else Pn(e, i, n);
		}
	});
	a.observe(e.element), e.panels.forEach((e) => {
		R(!r.has(e.id), `Panel ids must be unique; id "${e.id}" was used more than once`), r.add(e.id), e.onResize && a.observe(e.element);
	});
	let o = L({ group: e }), s = Dt(e), c = e.panels.map(({ id: e }) => e).join(","), l = e.mutableState.defaultLayout;
	l && (Rn(e.panels, l) || (l = void 0));
	let u = X({
		layout: e.mutableState.layouts[c] ?? l ?? Nn(s),
		panelConstraints: s
	}), d = e.element.ownerDocument;
	Q.set(d, (Q.get(d) ?? 0) + 1);
	let f = /* @__PURE__ */ new Map();
	return It(e).forEach((e) => {
		e.separator && f.set(e.separator, e.panels);
	}), G(e, {
		defaultLayoutDeferred: o === 0,
		derivedPanelConstraints: s,
		groupSize: o,
		layout: u,
		separatorToPanels: f
	}), e.separators.forEach((e) => {
		R(!i.has(e.id), `Separator ids must be unique; id "${e.id}" was used more than once`), i.add(e.id), e.element.addEventListener("keydown", En);
	}), Q.get(d) === 1 && (d.addEventListener("contextmenu", on, !0), d.addEventListener("dblclick", Cn, !0), d.addEventListener("pointerdown", Dn, !0), d.addEventListener("pointerleave", kn), d.addEventListener("pointermove", An), d.addEventListener("pointerout", jn), d.addEventListener("pointerup", Mn, !0)), function() {
		t = !1, Q.set(d, Math.max(0, (Q.get(d) ?? 0) - 1)), tn(e), e.separators.forEach((e) => {
			e.element.removeEventListener("keydown", En);
		}), Q.get(d) || (d.removeEventListener("contextmenu", on, !0), d.removeEventListener("dblclick", Cn, !0), d.removeEventListener("pointerdown", Dn, !0), d.removeEventListener("pointerleave", kn), d.removeEventListener("pointermove", An), d.removeEventListener("pointerout", jn), d.removeEventListener("pointerup", Mn, !0)), a.disconnect();
	};
}
function Bn() {
	let [e, t] = x({});
	return [e, p(() => t({}), [])];
}
function Vn(e) {
	let t = g();
	return `${e ?? t}`;
}
var $ = typeof window < "u" ? v : h;
function Hn(e) {
	let t = b(e);
	return $(() => {
		t.current = e;
	}, [e]), p((...e) => t.current?.(...e), [t]);
}
function Un(...e) {
	return Hn((t) => {
		e.forEach((e) => {
			if (e) switch (typeof e) {
				case "function":
					e(t);
					break;
				case "object":
					e.current = t;
					break;
			}
		});
	});
}
function Wn(e) {
	let t = b({ ...e });
	return $(() => {
		for (let n in e) t.current[n] = e[n];
	}, [e]), t.current;
}
var Gn = f(null);
function Kn(e, t) {
	let n = b({
		getLayout: () => ({}),
		setLayout: Vt
	});
	_(t, () => n.current, []), $(() => {
		Object.assign(n.current, Tn({ groupId: e }));
	});
}
function qn({ children: e, className: t, defaultLayout: n, disableCursor: r, disabled: i, elementRef: a, groupRef: o, id: s, onLayoutChange: c, onLayoutChanged: l, orientation: u = "horizontal", resizeTargetMinimumSize: d = {
	coarse: 20,
	fine: 10
}, style: f, ...p }) {
	let m = b({
		onLayoutChange: {},
		onLayoutChanged: {}
	}), g = Hn((e) => {
		Y(m.current.onLayoutChange, e) || (m.current.onLayoutChange = e, c?.(e));
	}), _ = Hn((e, t) => {
		Y(m.current.onLayoutChanged, e) || (m.current.onLayoutChanged = e, l?.(e, { isUserInteraction: t }));
	}), v = Vn(s), x = b(null), [S, C] = Bn(), T = b({
		lastExpandedPanelSizes: {},
		layouts: {},
		panels: [],
		resizeTargetMinimumSize: d,
		separators: []
	}), E = Un(x, a);
	Kn(v, o);
	let D = Hn((e, t) => {
		let r = B(), i = nn(e), a = U(e);
		if (a) {
			let e = !1;
			return r.state === "active" && (e = r.hitRegions.some((e) => e.group === i)), {
				flexGrow: a.layout[t] ?? 1,
				pointerEvents: e ? "none" : void 0
			};
		}
		if (n?.[t]) return { flexGrow: n?.[t] };
	}), O = Wn({
		defaultLayout: n,
		disableCursor: r
	}), k = y(() => ({
		get disableCursor() {
			return !!O.disableCursor;
		},
		getPanelStyles: D,
		id: v,
		orientation: u,
		registerPanel: (e) => {
			let t = T.current;
			return t.panels = Ot(u, [...t.panels, e]), C(), () => {
				t.panels = t.panels.filter((t) => t !== e), C();
			};
		},
		registerSeparator: (e) => {
			let t = T.current;
			return t.separators = Ot(u, [...t.separators, e]), C(), () => {
				t.separators = t.separators.filter((t) => t !== e), C();
			};
		},
		updatePanelProps: (e, { disabled: t }) => {
			let n = T.current.panels.find((t) => t.id === e);
			n && (n.panelConstraints.disabled = t);
			let r = nn(v), i = U(v);
			r && i && G(r, {
				...i,
				derivedPanelConstraints: Dt(r)
			});
		},
		updateSeparatorProps: (e, { disabled: t, disableDoubleClick: n }) => {
			let r = T.current.separators.find((t) => t.id === e);
			r && (r.disabled = t, r.disableDoubleClick = n);
		}
	}), [
		D,
		v,
		C,
		u,
		O
	]), A = b(null);
	return $(() => {
		let e = x.current;
		if (e === null) return;
		let t = T.current, n;
		if (O.defaultLayout !== void 0 && Object.keys(O.defaultLayout).length === t.panels.length) {
			n = {};
			for (let e of t.panels) {
				let t = O.defaultLayout[e.id];
				t !== void 0 && (n[e.id] = t);
			}
		}
		let r = {
			disabled: !!i,
			element: e,
			id: v,
			mutableState: {
				defaultLayout: n,
				disableCursor: !!O.disableCursor,
				expandedPanelSizes: T.current.lastExpandedPanelSizes,
				layouts: T.current.layouts
			},
			orientation: u,
			panels: t.panels,
			resizeTargetMinimumSize: t.resizeTargetMinimumSize,
			separators: t.separators
		};
		A.current = r;
		let a = zn(r), { defaultLayoutDeferred: o, derivedPanelConstraints: s, layout: c } = U(r.id, !0);
		!o && s.length > 0 && (g(c), _(c, !1));
		let l = rn(v, (e) => {
			let { defaultLayoutDeferred: t, derivedPanelConstraints: n, layout: i } = e.next;
			if (t || n.length === 0) return;
			let a = r.panels.map(({ id: e }) => e).join(",");
			r.mutableState.layouts[a] = i, n.forEach((t) => {
				if (t.collapsible) {
					let { layout: n } = e.prev ?? {};
					if (n) {
						let e = K(t.collapsedSize, i[t.panelId]), a = K(t.collapsedSize, n[t.panelId]);
						e && !a && (r.mutableState.expandedPanelSizes[t.panelId] = n[t.panelId]);
					}
				}
			});
			let o = B().state !== "active";
			g(i), o && _(i, e.isUserInteraction);
		});
		return () => {
			A.current = null, a(), l();
		};
	}, [
		i,
		v,
		_,
		g,
		u,
		S,
		O
	]), h(() => {
		let e = A.current;
		e && (e.mutableState.defaultLayout = n, e.mutableState.disableCursor = !!r);
	}), /* @__PURE__ */ w(Gn.Provider, {
		value: k,
		children: /* @__PURE__ */ w("div", {
			...p,
			className: t,
			"data-group": !0,
			"data-testid": v,
			id: v,
			ref: E,
			style: {
				height: "100%",
				width: "100%",
				overflow: "hidden",
				...f,
				display: "flex",
				flexDirection: u === "horizontal" ? "row" : "column",
				flexWrap: "nowrap",
				touchAction: u === "horizontal" ? "pan-y" : "pan-x"
			},
			children: e
		})
	});
}
qn.displayName = "Group";
function Jn() {
	let e = m(Gn);
	return R(e, "Group Context not found; did you render a Panel or Separator outside of a Group?"), e;
}
function Yn(e, t) {
	let { id: n } = Jn(), r = b({
		collapse: Ht,
		expand: Ht,
		getSize: () => ({
			asPercentage: 0,
			inPixels: 0
		}),
		isCollapsed: () => !1,
		resize: Ht
	});
	_(t, () => r.current, []), $(() => {
		Object.assign(r.current, Sn({
			groupId: n,
			panelId: e
		}));
	});
}
function Xn({ children: e, className: t, collapsedSize: n = "0%", collapsible: r = !1, defaultSize: i, disabled: a, elementRef: o, groupResizeBehavior: s = "preserve-relative-size", id: c, maxSize: l = "100%", minSize: u = "0%", onResize: d, panelRef: f, style: p, ...m }) {
	let g = !!c, _ = Vn(c), v = Wn({ disabled: a }), y = b(null), x = Un(y, o), { getPanelStyles: C, id: T, orientation: E, registerPanel: D, updatePanelProps: O } = Jn(), k = d !== null, A = Hn((e, t, n) => {
		d?.(e, c, n);
	});
	$(() => {
		let e = y.current;
		if (e !== null) {
			let t = {
				element: e,
				id: _,
				idIsStable: g,
				mutableValues: {
					expandToSize: void 0,
					prevSize: void 0
				},
				onResize: k ? A : void 0,
				panelConstraints: {
					groupResizeBehavior: s,
					collapsedSize: n,
					collapsible: r,
					defaultSize: i,
					disabled: v.disabled,
					maxSize: l,
					minSize: u
				}
			};
			return D(t);
		}
	}, [
		s,
		n,
		r,
		i,
		k,
		_,
		g,
		l,
		u,
		A,
		D,
		v
	]), h(() => {
		O(_, { disabled: a });
	}, [
		a,
		_,
		O
	]), Yn(_, f);
	let ee = () => {
		let e = C(T, _);
		if (e) return JSON.stringify(e);
	}, j = S((e) => rn(T, e), ee, ee), M;
	return M = j ? JSON.parse(j) : i === void 0 ? { flexGrow: 1 } : {
		flexGrow: void 0,
		flexShrink: void 0,
		flexBasis: i
	}, /* @__PURE__ */ w("div", {
		...m,
		"data-disabled": a || void 0,
		"data-panel": !0,
		"data-testid": _,
		id: _,
		ref: x,
		style: {
			...Zn,
			display: "flex",
			flexBasis: 0,
			flexShrink: 1,
			overflow: "visible",
			...M
		},
		children: /* @__PURE__ */ w("div", {
			className: t,
			style: {
				maxHeight: "100%",
				maxWidth: "100%",
				flexGrow: 1,
				overflow: "auto",
				...p,
				touchAction: E === "horizontal" ? "pan-y" : "pan-x"
			},
			children: e
		})
	});
}
Xn.displayName = "Panel";
var Zn = {
	minHeight: 0,
	maxHeight: "100%",
	height: "auto",
	minWidth: 0,
	maxWidth: "100%",
	width: "auto",
	border: "none",
	borderWidth: 0,
	padding: 0,
	margin: 0
};
function Qn({ layout: e, panelConstraints: t, panelId: n, panelIndex: r }) {
	let i, a, o = e[n], s = t.find((e) => e.panelId === n);
	if (s) {
		let c = s.maxSize, l = s.collapsible ? s.collapsedSize : s.minSize, u = [r, r + 1];
		a = X({
			layout: xn({
				delta: l - o,
				initialLayout: e,
				panelConstraints: t,
				pivotIndices: u,
				prevLayout: e
			}),
			panelConstraints: t
		})[n], i = X({
			layout: xn({
				delta: c - o,
				initialLayout: e,
				panelConstraints: t,
				pivotIndices: u,
				prevLayout: e
			}),
			panelConstraints: t
		})[n];
	}
	return {
		valueControls: n,
		valueMax: i,
		valueMin: a,
		valueNow: o
	};
}
function $n({ children: e, className: t, disabled: n, disableDoubleClick: r, elementRef: i, id: a, style: o, ...s }) {
	let c = Vn(a), l = Wn({
		disabled: n,
		disableDoubleClick: r
	}), [u, d] = x({}), [f, p] = x("inactive"), [m, g] = x(!1), _ = b(null), v = Un(_, i), { disableCursor: y, id: S, orientation: C, registerSeparator: T, updateSeparatorProps: E } = Jn(), D = C === "horizontal" ? "vertical" : "horizontal";
	$(() => {
		let e = _.current;
		if (e !== null) {
			let t = {
				disabled: l.disabled,
				disableDoubleClick: l.disableDoubleClick,
				element: e,
				id: c
			}, n = T(t), r = zt((e) => {
				p(e.next.state !== "inactive" && e.next.hitRegions.some((e) => e.separator === t) ? e.next.state : "inactive");
			}), i = rn(S, (e) => {
				let { derivedPanelConstraints: n, layout: r, separatorToPanels: i } = e.next, a = i.get(t);
				if (a) {
					let e = a[0], t = a.indexOf(e);
					d(Qn({
						layout: r,
						panelConstraints: n,
						panelId: e.id,
						panelIndex: t
					}));
				}
			});
			return () => {
				r(), i(), n();
			};
		}
	}, [
		S,
		c,
		T,
		l
	]), h(() => {
		E(c, {
			disabled: n,
			disableDoubleClick: r
		});
	}, [
		n,
		r,
		c,
		E
	]);
	let O;
	n && !y && (O = "not-allowed");
	let k;
	if (n) k = "disabled";
	else switch (f) {
		case "active":
			k = "active";
			break;
		default: k = m ? "focus" : f;
	}
	return /* @__PURE__ */ w("div", {
		...s,
		"aria-controls": u.valueControls,
		"aria-disabled": n || void 0,
		"aria-orientation": D,
		"aria-valuemax": u.valueMax,
		"aria-valuemin": u.valueMin,
		"aria-valuenow": u.valueNow,
		children: e,
		className: t,
		"data-separator": k,
		"data-testid": c,
		id: c,
		onBlur: () => g(!1),
		onFocus: () => g(!0),
		ref: v,
		role: "separator",
		style: {
			flexBasis: "auto",
			cursor: O,
			...o,
			flexGrow: 0,
			flexShrink: 0,
			touchAction: "none"
		},
		tabIndex: n ? void 0 : 0
	});
}
$n.displayName = "Separator";
//#endregion
//#region src/shared/ui/resizable.tsx
var er = ({ className: t, ...n }) => /* @__PURE__ */ w(qn, {
	className: e("min-h-0 min-w-0 flex-1 data-[panel-group-direction=vertical]:flex-col", t),
	...n
}), tr = ({ className: t, ...n }) => /* @__PURE__ */ w(Xn, {
	className: e("min-h-0 min-w-0", t),
	...n
}), nr = ({ className: t, withHandle: n, ...r }) => /* @__PURE__ */ w($n, {
	className: e("relative hidden h-full w-0.5 shrink-0 bg-border/70 transition-colors hover:bg-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:block aria-[orientation=horizontal]:h-0.5 aria-[orientation=horizontal]:w-full", t),
	...r,
	children: n ? /* @__PURE__ */ w("div", {
		className: "absolute left-1/2 top-1/2 z-10 flex h-6 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background",
		children: /* @__PURE__ */ w(E, { className: "h-3.5 w-3.5 text-muted-foreground" })
	}) : null
});
//#endregion
export { ge as _, yt as a, A as b, st as c, gt as d, lt as f, ot as g, vt as h, bt as i, mt as l, _t as m, tr as n, ct as o, pt as p, er as r, ft as s, nr as t, ht as u, pe as v, D as x, ue as y };
