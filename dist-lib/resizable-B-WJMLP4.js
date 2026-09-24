import { s as e } from "./rafScheduler-DAI3WzmT.js";
import { t } from "./createLucideIcon-BrmWW16k.js";
import { t as n } from "./chevron-right-B4pWmr36.js";
import { A as r, F as i, I as a, L as o, P as s, T as c, t as l, v as u } from "./TopicQuickPicker-BVwmE0Mi.js";
import * as d from "react";
import { createContext as f, useCallback as p, useContext as m, useEffect as h, useId as g, useImperativeHandle as _, useLayoutEffect as v, useMemo as y, useRef as b, useState as x, useSyncExternalStore as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region node_modules/lucide-react/dist/esm/icons/grip-vertical.mjs
var E = {
	name: "grip-vertical",
	size: 24,
	node: [
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
	]
};
E.node;
var D = t(E), O = {
	name: "upload",
	size: 24,
	node: [
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
	]
};
O.node;
var k = t(O), A = Object.defineProperty, j = (e, t) => A(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function M(e) {
	let t = e + "CollectionProvider", [n, r] = o(t), [s, c] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), l = /* @__PURE__ */ j((e) => {
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
	return j(v, "useCollection"), [
		{
			Provider: l,
			Slot: p,
			ItemSlot: _
		},
		v,
		r
	];
}
j(M, "createCollection");
var N = /* @__PURE__ */ new WeakMap(), ee = class e extends Map {
	static {
		j(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], N.set(this, !0);
	}
	set(e, t) {
		return N.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = ne(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
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
		let t = P(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = P(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return P(this.#e, e);
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
function P(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = te(e, t);
	return n === -1 ? void 0 : e[n];
}
j(P, "at");
function te(e, t) {
	let n = e.length, r = ne(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
j(te, "toSafeIndex");
function ne(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
j(ne, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function re(e) {
	let t = e + "CollectionProvider", [n, r] = o(t), [s, c] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new ee(),
		setItemMap: /* @__PURE__ */ j(() => void 0, "setItemMap")
	}), l = /* @__PURE__ */ j(({ state: e, ...t }) => e ? /* @__PURE__ */ w(f, {
		...t,
		state: e
	}) : /* @__PURE__ */ w(u, { ...t }), "CollectionProvider");
	l.displayName = t;
	let u = /* @__PURE__ */ j((e) => {
		let t = y();
		return /* @__PURE__ */ w(f, {
			...e,
			state: t
		});
	}, "CollectionInit");
	u.displayName = t + "Init";
	let f = /* @__PURE__ */ j((e) => {
		let { scope: t, children: n, state: r } = e, i = d.useRef(null), [o, c] = d.useState(null), l = a(i, c), [u, f] = r;
		return d.useEffect(() => {
			if (!o) return;
			let e = se(() => {});
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
		ie(p.current, i) || (p.current = i);
		let m = p.current;
		return d.useEffect(() => {
			let e = m;
			return f((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(oe) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(oe)) : t), () => {
				f((e) => !s || !e.has(s) ? e : (e.delete(s), new ee(e)));
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
		return d.useState(new ee());
	}
	j(y, "useInitCollection");
	function b(t) {
		let { itemMap: n } = c(e + "CollectionConsumer", t);
		return n;
	}
	return j(b, "useCollection"), [{
		Provider: l,
		Slot: h,
		ItemSlot: v
	}, {
		createCollectionScope: r,
		useCollection: b,
		useInitCollection: y
	}];
}
j(re, "createCollection");
function ie(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
j(ie, "shallowEqual");
function ae(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
j(ae, "isElementPreceding");
function oe(e, t) {
	return !e[1].element || !t[1].element ? 0 : ae(e[1].element, t[1].element) ? -1 : 1;
}
j(oe, "sortByDocumentPosition");
function se(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
j(se, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var ce = Object.defineProperty, le = (e, t) => ce(e, "name", {
	value: t,
	configurable: !0
}), ue = d.createContext(void 0);
function de(e) {
	let t = d.useContext(ue);
	return e || t || "ltr";
}
le(de, "useDirection");
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var fe = Object.defineProperty, pe = (e, t) => fe(e, "name", {
	value: t,
	configurable: !0
});
function me(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
pe(me, "clamp");
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
var he = Object.defineProperty, ge = (e, t) => he(e, "name", {
	value: t,
	configurable: !0
});
function _e(e) {
	let t = d.useRef({
		value: e,
		previous: e
	});
	return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
ge(_e, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/react-slider/dist/index.mjs
var ve = Object.defineProperty, F = (e, t) => ve(e, "name", {
	value: t,
	configurable: !0
}), ye = ["PageUp", "PageDown"], be = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], xe = {
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
}, Se = "Slider", [Ce, we, Te] = /* @__PURE__ */ M(Se), [Ee, De] = o(Se, [Te]), [Oe, ke] = Ee(Se), Ae = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { name: n, min: r = 0, max: i = 100, step: o = 1, orientation: c = "horizontal", disabled: l = !1, minStepsBetweenThumbs: f = 0, defaultValue: p = [r], value: m, onValueChange: h = /* @__PURE__ */ F(() => {}, "onValueChange"), onValueCommit: g = /* @__PURE__ */ F(() => {}, "onValueCommit"), inverted: _ = !1, form: v, ...y } = e, b = d.useRef(/* @__PURE__ */ new Set()), x = d.useRef(0), S = d.useRef(!1), C = c === "horizontal" ? Ne : Pe, [T, E] = d.useState(null), D = a(t, E), [O = [], k] = u({
		prop: m,
		defaultProp: p,
		onChange: /* @__PURE__ */ F((e) => {
			[...b.current][x.current]?.focus({
				preventScroll: !0,
				focusVisible: S.current
			}), S.current = !1, h(e);
		}, "onChange")
	}), A = d.useRef(O), j = d.useRef(O);
	d.useEffect(() => {
		let e = v ? T?.ownerDocument.getElementById(v) : T?.closest("form");
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ F(() => k(j.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		T,
		v,
		k
	]);
	function M(e) {
		P(e, Qe(O, e));
	}
	F(M, "handleSlideStart");
	function N(e) {
		P(e, x.current);
	}
	F(N, "handleSlideMove");
	function ee() {
		String(O) !== String(A.current) && g(O);
	}
	F(ee, "handleSlideEnd");
	function P(e, t, { commit: n } = { commit: !1 }) {
		let a = rt(o), s = me(it(Math.round((e - r) / o) * o + r, a), [r, i]);
		k((e = []) => {
			let r = Ye(e, s, t);
			if (tt(r, f * o)) {
				x.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && g(r), t ? r : e;
			}
			return e;
		});
	}
	return F(P, "updateValues"), /* @__PURE__ */ w(Oe, {
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
		children: /* @__PURE__ */ w(Ce.Provider, {
			scope: e.__scopeSlider,
			children: /* @__PURE__ */ w(Ce.Slot, {
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
					onSlideStart: l ? void 0 : M,
					onSlideMove: l ? void 0 : N,
					onSlideEnd: l ? void 0 : ee,
					onHomeKeyDown: () => {
						l || (S.current = !0, P(r, 0, { commit: !0 }));
					},
					onEndKeyDown: () => {
						l || (S.current = !0, P(i, O.length - 1, { commit: !0 }));
					},
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!l) {
							S.current = !0;
							let n = ye.includes(e.key) || e.shiftKey && be.includes(e.key) ? 10 : 1, i = x.current, a = O[i];
							P(at(a, {
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
}, "Slider")), [je, Me] = Ee(Se, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), Ne = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { min: n, max: r, dir: i, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...f } = e, [p, m] = d.useState(null), h = a(t, m), g = d.useRef(void 0), _ = de(i), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || p.getBoundingClientRect(), i = nt([0, t.width], y ? [n, r] : [r, n]);
		return g.current = t, i(e - t.left);
	}
	return F(b, "getValueFromPointer"), /* @__PURE__ */ w(je, {
		scope: e.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ w(Fe, {
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
				let t = xe[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}, "SliderHorizontal")), Pe = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { min: n, max: r, inverted: i, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = e, f = d.useRef(null), p = a(t, f), m = d.useRef(void 0), h = !i;
	function g(e) {
		let t = m.current || f.current.getBoundingClientRect(), i = nt([0, t.height], h ? [r, n] : [n, r]);
		return m.current = t, i(e - t.top);
	}
	return F(g, "getValueFromPointer"), /* @__PURE__ */ w(je, {
		scope: e.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ w(Fe, {
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
				let t = xe[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}, "SliderVertical")), Fe = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { __scopeSlider: n, onSlideStart: i, onSlideMove: a, onSlideEnd: o, onHomeKeyDown: c, onEndKeyDown: l, onStepKeyDown: u, ...d } = e, f = ke(Se, n);
	return /* @__PURE__ */ w(r.span, {
		...d,
		ref: t,
		onKeyDown: s(e.onKeyDown, (e) => {
			e.key === "Home" ? (c(e), e.preventDefault()) : e.key === "End" ? (l(e), e.preventDefault()) : ye.concat(be).includes(e.key) && (u(e), e.preventDefault());
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
}, "SliderImpl")), Ie = "SliderTrack", Le = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { __scopeSlider: n, ...i } = e, a = ke(Ie, n);
	return /* @__PURE__ */ w(r.span, {
		"data-disabled": a.disabled ? "" : void 0,
		"data-orientation": a.orientation,
		...i,
		ref: t
	});
}, "SliderTrack")), Re = "SliderRange", ze = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { __scopeSlider: n, ...i } = e, o = ke(Re, n), s = Me(Re, n), c = d.useRef(null), l = a(t, c), u = o.values.length, f = o.values.map((e) => Xe(e, o.min, o.max)), p = u > 1 ? Math.min(...f) : 0, m = 100 - Math.max(...f);
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
}, "SliderRange")), [Be, Ve] = Ee("SliderThumb"), He = "SliderThumbProvider";
function Ue(e) {
	let { __scopeSlider: t, name: n, children: r, internal_do_not_use_render: i } = e, a = ke(He, t), o = we(t), [s, l] = d.useState(null), u = d.useMemo(() => s ? o().findIndex((e) => e.ref.current === s) : -1, [o, s]), f = c(s), p = !s || !!a.form || !!s.closest("form"), m = a.values[u], h = n ?? (a.name ? a.name + (a.values.length > 1 ? "[]" : "") : void 0), g = m === void 0 ? 0 : Xe(m, a.min, a.max);
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
	return /* @__PURE__ */ w(Be, {
		scope: t,
		..._,
		children: ot(i) ? i(_) : r
	});
}
F(Ue, "SliderThumbProvider");
var We = "SliderThumbTrigger", Ge = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { __scopeSlider: n, ...i } = e, o = ke(We, n), c = Me(We, n), { index: l, value: u, percent: d, size: f, onThumbChange: p } = Ve(We, n), m = a(t, p), h = Ze(l, o.values.length), g = f?.[c.size], _ = g ? $e(g, d, c.direction) : 0;
	return /* @__PURE__ */ w("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${d}% + ${_}px)`
		},
		children: /* @__PURE__ */ w(Ce.ItemSlot, {
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
}, "SliderThumbTrigger")), Ke = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function(e, t) {
	let { __scopeSlider: n, name: r, ...i } = e;
	return /* @__PURE__ */ w(Ue, {
		__scopeSlider: n,
		name: r,
		internal_do_not_use_render: ({ index: e, isFormControl: r }) => /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(Ge, {
			...i,
			ref: t,
			__scopeSlider: n
		}), r ? /* @__PURE__ */ w(Je, { __scopeSlider: n }, e) : null] })
	});
}, "SliderThumb")), qe = "SliderBubbleInput", Je = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ F(function({ __scopeSlider: e, ...t }, n) {
	let { value: i, name: o, form: s } = Ve(qe, e), c = d.useRef(null), l = a(c, n), u = _e(i);
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
function Ye(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
F(Ye, "getNextSortedValues");
function Xe(e, t, n) {
	return me(100 / (n - t) * (e - t), [0, 100]);
}
F(Xe, "convertValueToPercentage");
function Ze(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
F(Ze, "getLabel");
function Qe(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
F(Qe, "getClosestValueIndex");
function $e(e, t, n) {
	let r = e / 2;
	return (r - nt([0, 50], [0, r])(t) * n) * n;
}
F($e, "getThumbInBoundsOffset");
function et(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
F(et, "getStepsBetweenValues");
function tt(e, t) {
	if (t > 0) {
		let n = et(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
F(tt, "hasMinStepsBetweenValues");
function nt(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
F(nt, "linearScale");
function rt(e) {
	if (!Number.isFinite(e)) return 0;
	let t = e.toString();
	if (t.includes("e")) {
		let [e, n] = t.split("e"), r = e.split(".")[1] || "", i = Number(n);
		return Math.max(0, r.length - i);
	}
	let n = t.split(".")[1];
	return n ? n.length : 0;
}
F(rt, "getDecimalCount");
function it(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
F(it, "roundValue");
function at(e, { min: t, step: n, direction: r, multiplier: i }) {
	let a = rt(n), o = (e - t) / n, s = Math.round(o), c = it(s * n + t, a) === it(e, a), l;
	return l = c ? s + i * r : r > 0 ? Math.ceil(o) : Math.floor(o), it(l * n + t, a);
}
F(at, "getNextStepValue");
function ot(e) {
	return typeof e == "function";
}
F(ot, "isFunction");
//#endregion
//#region src/shared/ui/slider.tsx
var st = ({ value: e, onChange: t, onCommit: n, min: r = 0, max: i = 1, step: a = .01, disabled: o, className: s }) => /* @__PURE__ */ T(Ae, {
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
	children: [/* @__PURE__ */ w(Le, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-700/50",
		children: /* @__PURE__ */ w(ze, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ w(Ke, { className: "block h-3.5 w-3.5 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}), ct = ({ title: e, description: t, defaultOpen: r = !0, children: i }) => {
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
}, lt = ({ label: e, help: t, error: n, orientation: r = "stacked", children: i }) => r === "row" ? /* @__PURE__ */ T("div", {
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
}), ut = ({ value: e, onChange: t, placeholder: n, disabled: r, name: i }) => /* @__PURE__ */ w("input", {
	type: "text",
	name: i,
	value: e,
	placeholder: n,
	disabled: r,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
});
function dt(e, t, n) {
	let r = e;
	return typeof t == "number" && r < t && (r = t), typeof n == "number" && r > n && (r = n), r;
}
function ft(e) {
	return e === "" || e === "-" || e === "+" || e === "." || e === "-." || e === "+." || /^[+-]?(\d+\.?|\.\d+|\d+\.\d+)([eE][+-]?)?$/.test(e) && !Number.isFinite(Number(e));
}
function I(e) {
	return Number.isFinite(e) ? String(e) : "";
}
var pt = ({ value: e, onChange: t, min: n, max: r, step: i, disabled: a, name: o, placeholder: s }) => {
	let [c, l] = x(() => I(e)), u = b(!1), d = b(e);
	h(() => {
		if (d.current = e, u.current) return;
		let t = I(e);
		(Number(c) !== e || c === "") && l(t);
	}, [e, c]);
	let f = p((e) => {
		let i = e.trim();
		if (i === "" || ft(i)) return {
			committed: !1,
			nextText: I(d.current)
		};
		let a = Number(i);
		if (!Number.isFinite(a)) return {
			committed: !1,
			nextText: I(d.current)
		};
		let o = dt(a, n, r);
		return o !== d.current && t(o), {
			committed: !0,
			nextText: I(o)
		};
	}, [
		r,
		n,
		t
	]), m = p((e) => {
		let i = e.target.value;
		l(i);
		let a = i.trim();
		if (a === "" || ft(a)) return;
		let o = Number(a);
		if (!Number.isFinite(o)) return;
		let s = dt(o, n, r);
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
		} else if (e.key === "Escape") e.preventDefault(), l(I(d.current)), e.currentTarget.blur();
		else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			let a = typeof i == "number" && i > 0 ? i : 1, o = e.key === "ArrowUp" ? 1 : -1, s = dt((Number.isFinite(d.current) ? d.current : 0) + o * a, n, r);
			e.preventDefault(), l(I(s)), s !== d.current && t(s);
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
}, mt = ({ value: e, onChange: t, placeholder: n, rows: r = 6, disabled: i, name: a }) => /* @__PURE__ */ w("textarea", {
	name: a,
	value: e,
	rows: r,
	placeholder: n,
	disabled: i,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-[10px] font-mono leading-tight focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50 resize-y"
});
function ht({ value: e, options: t, onChange: n, disabled: r, name: i }) {
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
var gt = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, disabled: a }) => {
	let o = b(null), s = p((e) => {
		o.current != null && cancelAnimationFrame(o.current), o.current = requestAnimationFrame(() => {
			o.current = null, t(e);
		});
	}, [t]), c = p(([e]) => {
		o.current != null && (cancelAnimationFrame(o.current), o.current = null), e !== void 0 && t(e);
	}, [t]);
	return /* @__PURE__ */ w("div", {
		className: "min-w-0",
		children: /* @__PURE__ */ w(st, {
			value: e,
			onChange: s,
			min: n,
			max: r,
			step: i,
			disabled: a,
			onCommit: c
		})
	});
}, _t = ({ checked: e, onChange: t, disabled: n }) => /* @__PURE__ */ w("input", {
	type: "checkbox",
	checked: e,
	disabled: n,
	onChange: (e) => t(e.target.checked),
	className: "h-3.5 w-3.5 accent-primary disabled:opacity-50"
}), vt = ({ value: e, onChange: t, topics: n, typeIncludes: r, topicTypeMatches: i, nameIncludes: a, placeholder: o, disabled: s, name: c }) => /* @__PURE__ */ T(C, { children: [c != null && c.length > 0 ? /* @__PURE__ */ w("input", {
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
})] }), yt = ({ value: e, onChange: t, placeholder: n = "https:// or package://", disabled: r, name: i }) => /* @__PURE__ */ w("input", {
	type: "url",
	name: i,
	value: e,
	placeholder: n,
	disabled: r,
	onChange: (e) => t(e.target.value),
	className: "w-full border border-input rounded-sm bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
}), bt = ({ accept: e, onRead: t, label: n = "Choose file…", disabled: r, name: i }) => {
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
}, xt = () => ({
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
function St(e, t) {
	let n = getComputedStyle(e);
	return t * parseFloat(n.fontSize);
}
function Ct(e, t) {
	let n = getComputedStyle(e.ownerDocument.documentElement);
	return t * parseFloat(n.fontSize);
}
function wt(e) {
	return e / 100 * window.innerHeight;
}
function Tt(e) {
	return e / 100 * window.innerWidth;
}
function Et(e) {
	switch (typeof e) {
		case "number": return [e, "px"];
		case "string": {
			let t = parseFloat(e);
			return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
		}
	}
}
function Dt({ groupSize: e, panelElement: t, styleProp: n }) {
	let r, [i, a] = Et(n);
	switch (a) {
		case "%":
			r = i / 100 * e;
			break;
		case "px":
			r = i;
			break;
		case "rem":
			r = Ct(t, i);
			break;
		case "em":
			r = St(t, i);
			break;
		case "vh":
			r = wt(i);
			break;
		case "vw": r = Tt(i);
	}
	return r;
}
function L(e) {
	return parseFloat(e.toFixed(3));
}
function R({ group: e }) {
	let { orientation: t, panels: n } = e;
	return n.reduce((e, n) => (e += t === "horizontal" ? n.element.offsetWidth : n.element.offsetHeight, e), 0);
}
function Ot(e) {
	let { panels: t } = e, n = R({ group: e });
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
		r.collapsedSize !== void 0 && (i = L(Dt({
			groupSize: n,
			panelElement: t,
			styleProp: r.collapsedSize
		}) / n * 100));
		let a;
		r.defaultSize !== void 0 && (a = L(Dt({
			groupSize: n,
			panelElement: t,
			styleProp: r.defaultSize
		}) / n * 100));
		let o = 0;
		r.minSize !== void 0 && (o = L(Dt({
			groupSize: n,
			panelElement: t,
			styleProp: r.minSize
		}) / n * 100));
		let s = 100;
		return r.maxSize !== void 0 && (s = L(Dt({
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
function z(e, t = "Assertion error") {
	if (!e) throw Error(t);
}
function kt(e, t) {
	return Array.from(t).sort(e === "horizontal" ? At : jt);
}
function At(e, t) {
	let n = e.element.offsetLeft - t.element.offsetLeft;
	return n === 0 ? e.element.offsetWidth - t.element.offsetWidth : n;
}
function jt(e, t) {
	let n = e.element.offsetTop - t.element.offsetTop;
	return n === 0 ? e.element.offsetHeight - t.element.offsetHeight : n;
}
function Mt(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function Nt(e, t) {
	return {
		x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(Math.abs(e.x - t.left), Math.abs(e.x - t.right)),
		y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(Math.abs(e.y - t.top), Math.abs(e.y - t.bottom))
	};
}
function Pt({ orientation: e, rects: t, targetRect: n }) {
	let r = {
		x: n.x + n.width / 2,
		y: n.y + n.height / 2
	}, i, a = Number.MAX_VALUE;
	for (let n of t) {
		let { x: t, y: o } = Nt(r, n), s = e === "horizontal" ? t : o;
		s < a && (a = s, i = n);
	}
	return z(i, "No rect found"), i;
}
var Ft;
function It() {
	return Ft === void 0 && (Ft = typeof matchMedia == "function" && !!matchMedia("(pointer:coarse)").matches), Ft;
}
function Lt(e) {
	let { element: t, orientation: n, panels: r, separators: i } = e, a = kt(n, Array.from(t.children).filter(Mt).map((e) => ({ element: e }))).map(({ element: e }) => e), o = [], s = !1, c = !1, l = -1, u = -1, d = 0, f, p = [];
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
								m = [i, Pt({
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
						let r = "width" in n ? n : n.element.getBoundingClientRect(), a = It() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
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
							groupSize: R({ group: e }),
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
var Rt = class {
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
}, B = {
	cursorFlags: 0,
	state: "inactive"
}, zt = new Rt();
function V() {
	return B;
}
function Bt(e) {
	return zt.addListener("change", e);
}
function Vt(e) {
	let t = B, n = { ...B };
	n.cursorFlags = e, B = n, zt.emit("change", {
		prev: t,
		next: n
	});
}
function H(e) {
	let t = B;
	B = e, zt.emit("change", {
		prev: t,
		next: e
	});
}
var Ht = (e) => e, Ut = () => {}, Wt = 1, Gt = 2, Kt = 4, qt = 8, Jt = 3, Yt = 12, Xt;
function Zt() {
	return Xt === void 0 && (Xt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Xt = !0)), Xt;
}
function Qt({ cursorFlags: e, groups: t, state: n }) {
	let r = 0, i = 0;
	switch (n) {
		case "active":
		case "hover": t.forEach((e) => {
			if (!e.mutableState.disableCursor) switch (e.orientation) {
				case "horizontal":
					r++;
					break;
				case "vertical": i++;
			}
		});
	}
	if (r !== 0 || i !== 0) {
		if (n === "active" && e && Zt()) {
			let t = (e & Wt) !== 0, n = (e & Gt) !== 0, r = (e & Kt) !== 0, i = (e & qt) !== 0;
			if (t) return r ? "se-resize" : i ? "ne-resize" : "e-resize";
			if (n) return r ? "sw-resize" : i ? "nw-resize" : "w-resize";
			if (r) return "s-resize";
			if (i) return "n-resize";
		}
		return Zt() ? r > 0 && i > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && i > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
	}
}
var $t = /* @__PURE__ */ new WeakMap();
function en(e) {
	if (!e.defaultView || !e.adoptedStyleSheets) return;
	let { prevStyle: t, styleSheet: n } = $t.get(e) ?? {};
	n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [...e.adoptedStyleSheets, n]));
	let r = V();
	switch (r.state) {
		case "active":
		case "hover": {
			let e = Qt({
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
	$t.set(e, {
		prevStyle: t,
		styleSheet: n
	});
}
var U = /* @__PURE__ */ new Map(), tn = new Rt();
function nn(e) {
	U = new Map(U), U.delete(e);
}
function rn(e, t) {
	for (let [t] of U) if (t.id === e) return t;
}
function W(e, t) {
	for (let [t, n] of U) if (t.id === e) return n;
	if (t) throw Error(`Could not find data for Group with id ${e}`);
}
function G() {
	return U;
}
function an(e, t) {
	return tn.addListener("groupChange", (n) => {
		n.group.id === e && t(n);
	});
}
function K(e, t, n) {
	let r = U.get(e);
	U = new Map(U), U.set(e, t), tn.emit("groupChange", {
		group: e,
		isUserInteraction: n?.isUserInteraction === !0,
		prev: r,
		next: t
	});
}
function on(e) {
	let t = V(), n = G(), r = !1;
	return t.state === "active" && (H({
		cursorFlags: 0,
		state: "inactive"
	}), t.hitRegions.length > 0 && (en(e), r = !0, t.hitRegions.forEach((e) => {
		if (!n.has(e.group)) return;
		let t = W(e.group.id, !0);
		K(e.group, t, { isUserInteraction: !0 });
	}))), r;
}
function sn(e) {
	e.defaultPrevented || on(e.currentTarget);
}
function cn(e, t, n) {
	let r, i = {
		x: 1 / 0,
		y: 1 / 0
	};
	for (let a of t) {
		let t = Nt(n, a.rect);
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
function ln(e) {
	return typeof e == "object" && !!e && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function un(e, t) {
	if (e === t) throw Error("Cannot compare node with itself");
	let n = {
		a: gn(e),
		b: gn(t)
	}, r;
	for (; n.a.at(-1) === n.b.at(-1);) r = n.a.pop(), n.b.pop();
	z(r, "Stacking order can only be calculated for elements with a common ancestor");
	let i = {
		a: hn(mn(n.a)),
		b: hn(mn(n.b))
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
var dn = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function fn(e) {
	let t = getComputedStyle(_n(e) ?? e).display;
	return t === "flex" || t === "inline-flex";
}
function pn(e) {
	let t = getComputedStyle(e);
	return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || fn(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || dn.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function mn(e) {
	let t = e.length;
	for (; t--;) {
		let n = e[t];
		if (z(n, "Missing node"), pn(n)) return n;
	}
	return null;
}
function hn(e) {
	return e && Number(getComputedStyle(e).zIndex) || 0;
}
function gn(e) {
	let t = [];
	for (; e;) t.push(e), e = _n(e);
	return t;
}
function _n(e) {
	let { parentNode: t } = e;
	return ln(t) ? t.host : t;
}
function vn(e, t) {
	return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function yn({ groupElement: e, hitRegion: t, pointerEventTarget: n }) {
	if (!Mt(n) || n.contains(e) || e.contains(n)) return !0;
	if (un(n, e) > 0) {
		let r = n;
		for (; r;) {
			if (r.contains(e)) return !0;
			if (vn(r.getBoundingClientRect(), t)) return !1;
			r = r.parentElement;
		}
	}
	return !0;
}
function bn(e, t) {
	let n = [];
	return t.forEach((t, r) => {
		if (r.disabled) return;
		let i = Lt(r), a = cn(r.orientation, i, {
			x: e.clientX,
			y: e.clientY
		});
		a && a.distance.x <= 0 && a.distance.y <= 0 && yn({
			groupElement: r.element,
			hitRegion: a.hitRegion.rect,
			pointerEventTarget: e.target
		}) && n.push(a.hitRegion);
	}), n;
}
function xn(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
	return !0;
}
function q(e, t, n = 0) {
	return Math.abs(L(e) - L(t)) <= n;
}
function J(e, t) {
	return q(e, t) ? 0 : e > t ? 1 : -1;
}
function Y({ overrideDisabledPanels: e, panelConstraints: t, prevSize: n, size: r }) {
	let { collapsedSize: i = 0, collapsible: a, disabled: o, maxSize: s = 100, minSize: c = 0 } = t;
	if (o && !e) return n;
	if (J(r, c) < 0) {
		if (a) {
			let e = (i + c) / 2;
			r = J(r, e) < 0 ? i : c;
		} else r = c;
	}
	return r = Math.min(s, r), r = L(r), r;
}
function Sn({ delta: e, initialLayout: t, panelConstraints: n, pivotIndices: r, prevLayout: i, trigger: a }) {
	if (q(e, 0)) return t;
	let o = a === "imperative-api", s = Object.values(t), c = Object.values(i), l = [...s], [u, d] = r;
	z(u != null, "Invalid first pivot index"), z(d != null, "Invalid second pivot index");
	let f = 0;
	switch (a) {
		case "keyboard":
			{
				let t = e < 0 ? d : u, r = n[t];
				z(r, `Panel constraints not found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (z(n != null, `Previous layout not found for panel index ${t}`), q(n, i)) {
						let t = o - n;
						J(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			{
				let t = e < 0 ? u : d, r = n[t];
				z(r, `No panel constraints found for index ${t}`);
				let { collapsedSize: i = 0, collapsible: a, minSize: o = 0 } = r;
				if (a) {
					let n = s[t];
					if (z(n != null, `Previous layout not found for panel index ${t}`), q(n, o)) {
						let t = n - i;
						J(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t);
					}
				}
			}
			break;
		default: {
			let t = e < 0 ? d : u, r = n[t];
			z(r, `Panel constraints not found for index ${t}`);
			let i = s[t], { collapsible: a, collapsedSize: o, minSize: c } = r;
			if (a && J(i, c) < 0) {
				if (e > 0) {
					let t = c - o, n = t / 2;
					J(i + e, c) < 0 && (e = J(e, n) <= 0 ? 0 : t);
				} else {
					let t = c - o, n = 100 - t / 2;
					J(i - e, c) < 0 && (e = J(100 + e, n) > 0 ? 0 : -t);
				}
			}
			break;
		}
	}
	{
		let t = e < 0 ? 1 : -1, r = e < 0 ? d : u, i = 0;
		for (;;) {
			let e = s[r];
			z(e != null, `Previous layout not found for panel index ${r}`);
			let a = Y({
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
			z(i != null, `Previous layout not found for panel index ${t}`);
			let a = i - r, c = Y({
				overrideDisabledPanels: o,
				panelConstraints: n[t],
				prevSize: i,
				size: a
			});
			if (!q(i, c) && (f += i - c, l[t] = c, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, { numeric: !0 }) >= 0)) break;
			e < 0 ? t-- : t++;
		}
	}
	if (xn(c, l)) return i;
	{
		let t = e < 0 ? d : u, r = s[t];
		z(r != null, `Previous layout not found for panel index ${t}`);
		let i = r + f, a = Y({
			overrideDisabledPanels: o,
			panelConstraints: n[t],
			prevSize: r,
			size: i
		});
		if (l[t] = a, !q(a, i)) {
			let t = i - a, r = e < 0 ? d : u;
			for (; r >= 0 && r < n.length;) {
				let i = l[r];
				z(i != null, `Previous layout not found for panel index ${r}`);
				let a = i + t, s = Y({
					overrideDisabledPanels: o,
					panelConstraints: n[r],
					prevSize: i,
					size: a
				});
				if (q(i, s) || (t -= s - i, l[r] = s), q(t, 0)) break;
				e > 0 ? r-- : r++;
			}
		}
	}
	if (!q(Object.values(l).reduce((e, t) => t + e, 0), 100, .1)) return i;
	let p = Object.keys(i);
	return l.reduce((e, t, n) => (e[p[n]] = t, e), {});
}
function X(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (t[n] === void 0 || J(e[n], t[n]) !== 0) return !1;
	return !0;
}
function Z({ layout: e, panelConstraints: t }) {
	let n = Object.values(e), r = [...n], i = r.reduce((e, t) => e + t, 0);
	if (r.length !== t.length) throw Error(`Invalid ${t.length} panel layout: ${r.map((e) => `${e}%`).join(", ")}`);
	if (!q(i, 100) && r.length > 0) for (let e = 0; e < t.length; e++) {
		let t = r[e];
		z(t != null, `No layout data found for index ${e}`);
		let n = 100 / i * t;
		r[e] = n;
	}
	let a = 0;
	for (let e = 0; e < t.length; e++) {
		let i = n[e];
		z(i != null, `No layout data found for index ${e}`);
		let o = r[e];
		z(o != null, `No layout data found for index ${e}`);
		let s = Y({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: i,
			size: o
		});
		o != s && (a += o - s, r[e] = s);
	}
	if (!q(a, 0)) for (let e = 0; e < t.length; e++) {
		let n = r[e];
		z(n != null, `No layout data found for index ${e}`);
		let i = n + a, o = Y({
			overrideDisabledPanels: !0,
			panelConstraints: t[e],
			prevSize: n,
			size: i
		});
		if (n !== o && (a -= o - n, r[e] = o, q(a, 0))) break;
	}
	let o = Object.keys(e);
	return r.reduce((e, t, n) => (e[o[n]] = t, e), {});
}
function Cn({ groupId: e, panelId: t }) {
	let n = () => {
		let t = G();
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
			return n?.collapsible && q(n.collapsedSize, r[n.panelId]);
		}))) {
			let e = n.slice(0, s).reduce((e, t) => e + r[t.id], 0);
			return {
				...r,
				[t]: L(100 - e)
			};
		}
		return Sn({
			delta: l ? o - e : e - o,
			initialLayout: r,
			panelConstraints: i,
			pivotIndices: l ? [s - 1, s] : [s, s + 1],
			prevLayout: r,
			trigger: "imperative-api"
		});
	}, s = (e) => {
		if (e === a()) return;
		let { defaultLayoutDeferred: t, derivedPanelConstraints: r, group: i, groupSize: s, layout: c, separatorToPanels: l } = n(), u = Z({
			layout: o({
				nextSize: e,
				panels: i.panels,
				prevLayout: c,
				derivedPanelConstraints: r
			}),
			panelConstraints: r
		});
		X(c, u) || K(i, {
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
			return e && q(t, n);
		},
		resize: (e) => {
			let { group: t } = n(), { element: r } = i(), a = R({ group: t }), o = L(Dt({
				groupSize: a,
				panelElement: r,
				styleProp: e
			}) / a * 100);
			s(o);
		}
	};
}
function wn(e) {
	e.defaultPrevented || bn(e, G()).forEach((t) => {
		if (t.separator && !t.separator.disableDoubleClick) {
			let n = t.panels.find((e) => e.panelConstraints.defaultSize !== void 0);
			if (n) {
				let r = n.panelConstraints.defaultSize, i = Cn({
					groupId: t.group.id,
					panelId: n.id
				});
				i && r !== void 0 && (i.resize(r), e.preventDefault());
			}
		}
	});
}
function Tn(e) {
	let t = G();
	for (let [n] of t) if (n.separators.some((t) => t.element === e)) return n;
	throw Error("Could not find parent Group for separator element");
}
function En({ groupId: e }) {
	let t = () => {
		let t = G();
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
			let { defaultLayoutDeferred: n, derivedPanelConstraints: r, group: i, groupSize: a, layout: o, separatorToPanels: s } = t(), c = Z({
				layout: e,
				panelConstraints: r
			});
			return n ? o : (X(o, c) || K(i, {
				defaultLayoutDeferred: n,
				derivedPanelConstraints: r,
				groupSize: a,
				layout: c,
				separatorToPanels: s
			}), c);
		}
	};
}
function Q(e, t) {
	let n = Tn(e), r = W(n.id, !0), i = n.separators.find((t) => t.element === e);
	z(i, "Matching separator not found");
	let a = r.separatorToPanels.get(i);
	z(a, "Matching panels not found");
	let o = a.map((e) => n.panels.indexOf(e)), s = En({ groupId: n.id }).getLayout(), c = Z({
		layout: Sn({
			delta: t,
			initialLayout: s,
			panelConstraints: r.derivedPanelConstraints,
			pivotIndices: o,
			prevLayout: s,
			trigger: "keyboard"
		}),
		panelConstraints: r.derivedPanelConstraints
	});
	X(s, c) || K(n, {
		defaultLayoutDeferred: r.defaultLayoutDeferred,
		derivedPanelConstraints: r.derivedPanelConstraints,
		groupSize: r.groupSize,
		layout: c,
		separatorToPanels: r.separatorToPanels
	}, { isUserInteraction: !0 });
}
function Dn(e) {
	if (e.defaultPrevented) return;
	let t = e.currentTarget, n = Tn(t);
	if (!n.disabled) switch (e.key) {
		case "ArrowDown":
			e.preventDefault(), n.orientation === "vertical" && Q(t, 5);
			break;
		case "ArrowLeft":
			e.preventDefault(), n.orientation === "horizontal" && Q(t, -5);
			break;
		case "ArrowRight":
			e.preventDefault(), n.orientation === "horizontal" && Q(t, 5);
			break;
		case "ArrowUp":
			e.preventDefault(), n.orientation === "vertical" && Q(t, -5);
			break;
		case "End":
			e.preventDefault(), Q(t, 100);
			break;
		case "Enter": {
			e.preventDefault();
			let n = Tn(t), { derivedPanelConstraints: r, layout: i, separatorToPanels: a } = W(n.id, !0), o = n.separators.find((e) => e.element === t);
			z(o, "Matching separator not found");
			let s = a.get(o);
			z(s, "Matching panels not found");
			let c = s[0], l = r.find((e) => e.panelId === c.id);
			if (z(l, "Panel metadata not found"), l.collapsible) {
				let e = i[c.id];
				Q(t, (l.collapsedSize === e ? n.mutableState.expandedPanelSizes[c.id] ?? l.minSize : l.collapsedSize) - e);
			}
			break;
		}
		case "F6": {
			e.preventDefault();
			let n = Tn(t).separators.map((e) => e.element), r = Array.from(n).findIndex((t) => t === e.currentTarget);
			z(r !== null, "Index not found"), n[e.shiftKey ? r > 0 ? r - 1 : n.length - 1 : r + 1 < n.length ? r + 1 : 0].focus({ preventScroll: !0 });
			break;
		}
		case "Home": e.preventDefault(), Q(t, -100);
	}
}
function On(e) {
	if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0) return;
	let t = G(), n = bn(e, t), r = /* @__PURE__ */ new Map(), i = !1;
	n.forEach((e) => {
		e.separator && (i || (i = !0, e.separator.element.focus({
			focusVisible: !1,
			preventScroll: !0
		})));
		let n = t.get(e.group);
		n && r.set(e.group, n.layout);
	}), H({
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
function kn({ document: e, event: t, hitRegions: n, initialLayoutMap: r, mountedGroups: i, pointerDownAtPoint: a, prevCursorFlags: o }) {
	let s = 0;
	n.forEach((e) => {
		let { group: n, groupSize: o } = e, { orientation: c, panels: l } = n, { disableCursor: u } = n.mutableState, d = 0;
		d = a ? c === "horizontal" ? (t.clientX - a.x) / o * 100 : (t.clientY - a.y) / o * 100 : c === "horizontal" ? t.clientX < 0 ? -100 : 100 : t.clientY < 0 ? -100 : 100;
		let f = r.get(n), p = i.get(n);
		if (!f || !p) return;
		let { defaultLayoutDeferred: m, derivedPanelConstraints: h, groupSize: g, layout: _, separatorToPanels: v } = p;
		if (h && _ && v) {
			let t = Sn({
				delta: d,
				initialLayout: f,
				panelConstraints: h,
				pivotIndices: e.panels.map((e) => l.indexOf(e)),
				prevLayout: _,
				trigger: "mouse-or-touch"
			});
			if (X(t, _)) {
				if (d !== 0 && !u) switch (c) {
					case "horizontal":
						s |= d < 0 ? Wt : Gt;
						break;
					case "vertical": s |= d < 0 ? Kt : qt;
				}
			} else K(e.group, {
				defaultLayoutDeferred: m,
				derivedPanelConstraints: h,
				groupSize: g,
				layout: t,
				separatorToPanels: v
			});
		}
	});
	let c = 0;
	t.movementX === 0 ? c |= o & Jt : c |= s & Jt, t.movementY === 0 ? c |= o & Yt : c |= s & Yt, Vt(c), en(e);
}
function An(e) {
	let t = G(), n = V();
	n.state === "active" && kn({
		document: e.currentTarget,
		event: e,
		hitRegions: n.hitRegions,
		initialLayoutMap: n.initialLayoutMap,
		mountedGroups: t,
		prevCursorFlags: n.cursorFlags
	});
}
function jn(e) {
	if (e.defaultPrevented) return;
	let t = V(), n = G();
	switch (t.state) {
		case "active":
			if (e.buttons === 0) {
				H({
					cursorFlags: 0,
					state: "inactive"
				}), t.hitRegions.forEach((e) => {
					if (!n.has(e.group)) return;
					let t = W(e.group.id, !0);
					K(e.group, t, { isUserInteraction: !0 });
				});
				return;
			}
			for (let n of t.hitRegions) if (n.separator) {
				let { element: t } = n.separator;
				t.isConnected && !t.hasPointerCapture?.(e.pointerId) && t.setPointerCapture?.(e.pointerId);
			}
			kn({
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
			let r = bn(e, n);
			r.length === 0 ? t.state !== "inactive" && H({
				cursorFlags: 0,
				state: "inactive"
			}) : H({
				cursorFlags: 0,
				hitRegions: r,
				state: "hover"
			}), en(e.currentTarget);
			break;
		}
	}
}
function Mn(e) {
	if (e.relatedTarget instanceof HTMLIFrameElement) switch (V().state) {
		case "hover": H({
			cursorFlags: 0,
			state: "inactive"
		});
	}
}
function Nn(e) {
	e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || on(e.currentTarget) && e.preventDefault();
}
function Pn(e) {
	let t = 0, n = 0, r = {};
	for (let i of e) if (i.defaultSize !== void 0) {
		t++;
		let e = L(i.defaultSize);
		n += e, r[i.panelId] = e;
	} else r[i.panelId] = void 0;
	let i = e.length - t;
	if (i !== 0) {
		let t = L((100 - n) / i);
		for (let n of e) n.defaultSize === void 0 && (r[n.panelId] = t);
	}
	return r;
}
function Fn(e, t, n) {
	if (!n[0]) return;
	let r = e.panels.find((e) => e.element === t);
	if (!r || !r.onResize) return;
	let i = R({ group: e }), a = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, o = r.mutableValues.prevSize, s = {
		asPercentage: L(a / i * 100),
		inPixels: a
	};
	r.mutableValues.prevSize = s, r.onResize(s, r.id, o);
}
function In(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function Ln(e, t) {
	return e.length === t.length && e.every((e, n) => In(e, t[n]));
}
function Rn({ group: e, nextGroupSize: t, prevGroupSize: n, prevLayout: r }) {
	if (n <= 0 || t <= 0 || n === t) return r;
	let i = 0, a = 0, o = !1, s = /* @__PURE__ */ new Map(), c = [];
	for (let l of e.panels) {
		let e = r[l.id] ?? 0;
		switch (l.panelConstraints.groupResizeBehavior) {
			case "preserve-pixel-size": {
				o = !0;
				let r = L(e / 100 * n / t * 100);
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
	}), a > 0) for (let e of c) u[e] = L((r[e] ?? 0) / a * l);
	else {
		let e = L(l / c.length);
		for (let t of c) u[t] = e;
	}
	return u;
}
function zn(e, t) {
	let n = e.map((e) => e.id), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let e of n) if (!r.includes(e)) return !1;
	return !0;
}
var Bn = /* @__PURE__ */ new Map();
function Vn(e) {
	let t = !0;
	z(e.element.ownerDocument.defaultView, "Cannot register an unmounted Group");
	let n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = new n((n) => {
		for (let r of n) {
			let { borderBoxSize: n, target: i } = r;
			if (i === e.element) {
				if (t) {
					let t = R({ group: e });
					if (t === 0) return;
					let n = W(e.id);
					if (!n) return;
					let r = Ot(e), i = n.defaultLayoutDeferred ? Pn(r) : n.layout, a = Z({
						layout: Rn({
							group: e,
							nextGroupSize: t,
							prevGroupSize: n.groupSize,
							prevLayout: i
						}),
						panelConstraints: r
					});
					if (!n.defaultLayoutDeferred && X(n.layout, a) && Ln(n.derivedPanelConstraints, r) && n.groupSize === t) continue;
					K(e, {
						defaultLayoutDeferred: !1,
						derivedPanelConstraints: r,
						groupSize: t,
						layout: a,
						separatorToPanels: n.separatorToPanels
					});
				}
			} else Fn(e, i, n);
		}
	});
	a.observe(e.element), e.panels.forEach((e) => {
		z(!r.has(e.id), `Panel ids must be unique; id "${e.id}" was used more than once`), r.add(e.id), e.onResize && a.observe(e.element);
	});
	let o = R({ group: e }), s = Ot(e), c = e.panels.map(({ id: e }) => e).join(","), l = e.mutableState.defaultLayout;
	l && (zn(e.panels, l) || (l = void 0));
	let u = Z({
		layout: e.mutableState.layouts[c] ?? l ?? Pn(s),
		panelConstraints: s
	}), d = e.element.ownerDocument;
	Bn.set(d, (Bn.get(d) ?? 0) + 1);
	let f = /* @__PURE__ */ new Map();
	return Lt(e).forEach((e) => {
		e.separator && f.set(e.separator, e.panels);
	}), K(e, {
		defaultLayoutDeferred: o === 0,
		derivedPanelConstraints: s,
		groupSize: o,
		layout: u,
		separatorToPanels: f
	}), e.separators.forEach((e) => {
		z(!i.has(e.id), `Separator ids must be unique; id "${e.id}" was used more than once`), i.add(e.id), e.element.addEventListener("keydown", Dn);
	}), Bn.get(d) === 1 && (d.addEventListener("contextmenu", sn, !0), d.addEventListener("dblclick", wn, !0), d.addEventListener("pointerdown", On, !0), d.addEventListener("pointerleave", An), d.addEventListener("pointermove", jn), d.addEventListener("pointerout", Mn), d.addEventListener("pointerup", Nn, !0)), function() {
		t = !1, Bn.set(d, Math.max(0, (Bn.get(d) ?? 0) - 1)), nn(e), e.separators.forEach((e) => {
			e.element.removeEventListener("keydown", Dn);
		}), Bn.get(d) || (d.removeEventListener("contextmenu", sn, !0), d.removeEventListener("dblclick", wn, !0), d.removeEventListener("pointerdown", On, !0), d.removeEventListener("pointerleave", An), d.removeEventListener("pointermove", jn), d.removeEventListener("pointerout", Mn), d.removeEventListener("pointerup", Nn, !0)), a.disconnect();
	};
}
function Hn() {
	let [e, t] = x({});
	return [e, p(() => t({}), [])];
}
function Un(e) {
	let t = g();
	return `${e ?? t}`;
}
var $ = typeof window < "u" ? v : h;
function Wn(e) {
	let t = b(e);
	return $(() => {
		t.current = e;
	}, [e]), p((...e) => t.current?.(...e), [t]);
}
function Gn(...e) {
	return Wn((t) => {
		e.forEach((e) => {
			if (e) switch (typeof e) {
				case "function":
					e(t);
					break;
				case "object": e.current = t;
			}
		});
	});
}
function Kn(e) {
	let t = b({ ...e });
	return $(() => {
		for (let n in e) t.current[n] = e[n];
	}, [e]), t.current;
}
var qn = f(null);
function Jn(e, t) {
	let n = b({
		getLayout: () => ({}),
		setLayout: Ht
	});
	_(t, () => n.current, []), $(() => {
		Object.assign(n.current, En({ groupId: e }));
	});
}
function Yn({ children: e, className: t, defaultLayout: n, disableCursor: r, disabled: i, elementRef: a, groupRef: o, id: s, onLayoutChange: c, onLayoutChanged: l, orientation: u = "horizontal", resizeTargetMinimumSize: d = {
	coarse: 20,
	fine: 10
}, style: f, ...p }) {
	let m = b({
		onLayoutChange: {},
		onLayoutChanged: {}
	}), g = Wn((e) => {
		X(m.current.onLayoutChange, e) || (m.current.onLayoutChange = e, c?.(e));
	}), _ = Wn((e, t) => {
		X(m.current.onLayoutChanged, e) || (m.current.onLayoutChanged = e, l?.(e, { isUserInteraction: t }));
	}), v = Un(s), x = b(null), [S, C] = Hn(), T = b({
		lastExpandedPanelSizes: {},
		layouts: {},
		panels: [],
		resizeTargetMinimumSize: d,
		separators: []
	}), E = Gn(x, a);
	Jn(v, o);
	let D = Wn((e, t) => {
		let r = V(), i = rn(e), a = W(e);
		if (a) {
			let e = !1;
			return r.state === "active" && (e = r.hitRegions.some((e) => e.group === i)), {
				flexGrow: a.layout[t] ?? 1,
				pointerEvents: e ? "none" : void 0
			};
		}
		if (n?.[t]) return { flexGrow: n?.[t] };
	}), O = Kn({
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
			return t.panels = kt(u, [...t.panels, e]), C(), () => {
				t.panels = t.panels.filter((t) => t !== e), C();
			};
		},
		registerSeparator: (e) => {
			let t = T.current;
			return t.separators = kt(u, [...t.separators, e]), C(), () => {
				t.separators = t.separators.filter((t) => t !== e), C();
			};
		},
		updatePanelProps: (e, { disabled: t }) => {
			let n = T.current.panels.find((t) => t.id === e);
			n && (n.panelConstraints.disabled = t);
			let r = rn(v), i = W(v);
			r && i && K(r, {
				...i,
				derivedPanelConstraints: Ot(r)
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
		let a = Vn(r), { defaultLayoutDeferred: o, derivedPanelConstraints: s, layout: c } = W(r.id, !0);
		!o && s.length > 0 && (g(c), _(c, !1));
		let l = an(v, (e) => {
			let { defaultLayoutDeferred: t, derivedPanelConstraints: n, layout: i } = e.next;
			if (t || n.length === 0) return;
			let a = r.panels.map(({ id: e }) => e).join(",");
			r.mutableState.layouts[a] = i, n.forEach((t) => {
				if (t.collapsible) {
					let { layout: n } = e.prev ?? {};
					if (n) {
						let e = q(t.collapsedSize, i[t.panelId]), a = q(t.collapsedSize, n[t.panelId]);
						e && !a && (r.mutableState.expandedPanelSizes[t.panelId] = n[t.panelId]);
					}
				}
			});
			let o = V().state !== "active";
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
	}), /* @__PURE__ */ w(qn.Provider, {
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
Yn.displayName = "Group";
function Xn() {
	let e = m(qn);
	return z(e, "Group Context not found; did you render a Panel or Separator outside of a Group?"), e;
}
function Zn(e, t) {
	let { id: n } = Xn(), r = b({
		collapse: Ut,
		expand: Ut,
		getSize: () => ({
			asPercentage: 0,
			inPixels: 0
		}),
		isCollapsed: () => !1,
		resize: Ut
	});
	_(t, () => r.current, []), $(() => {
		Object.assign(r.current, Cn({
			groupId: n,
			panelId: e
		}));
	});
}
function Qn({ children: e, className: t, collapsedSize: n = "0%", collapsible: r = !1, defaultSize: i, disabled: a, elementRef: o, groupResizeBehavior: s = "preserve-relative-size", id: c, maxSize: l = "100%", minSize: u = "0%", onResize: d, panelRef: f, style: p, ...m }) {
	let g = !!c, _ = Un(c), v = Kn({ disabled: a }), y = b(null), x = Gn(y, o), { getPanelStyles: C, id: T, orientation: E, registerPanel: D, updatePanelProps: O } = Xn(), k = d !== null, A = Wn((e, t, n) => {
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
	]), Zn(_, f);
	let j = () => {
		let e = C(T, _);
		if (e) return JSON.stringify(e);
	}, M = S((e) => an(T, e), j, j), N;
	return N = M ? JSON.parse(M) : i === void 0 ? { flexGrow: 1 } : {
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
			...$n,
			display: "flex",
			flexBasis: 0,
			flexShrink: 1,
			overflow: "visible",
			...N
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
Qn.displayName = "Panel";
var $n = {
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
function er({ layout: e, panelConstraints: t, panelId: n, panelIndex: r }) {
	let i, a, o = e[n], s = t.find((e) => e.panelId === n);
	if (s) {
		let c = s.maxSize, l = s.collapsible ? s.collapsedSize : s.minSize, u = [r, r + 1];
		a = Z({
			layout: Sn({
				delta: l - o,
				initialLayout: e,
				panelConstraints: t,
				pivotIndices: u,
				prevLayout: e
			}),
			panelConstraints: t
		})[n], i = Z({
			layout: Sn({
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
function tr({ children: e, className: t, disabled: n, disableDoubleClick: r, elementRef: i, id: a, style: o, ...s }) {
	let c = Un(a), l = Kn({
		disabled: n,
		disableDoubleClick: r
	}), [u, d] = x({}), [f, p] = x("inactive"), [m, g] = x(!1), _ = b(null), v = Gn(_, i), { disableCursor: y, id: S, orientation: C, registerSeparator: T, updateSeparatorProps: E } = Xn(), D = C === "horizontal" ? "vertical" : "horizontal";
	$(() => {
		let e = _.current;
		if (e !== null) {
			let t = {
				disabled: l.disabled,
				disableDoubleClick: l.disableDoubleClick,
				element: e,
				id: c
			}, n = T(t), r = Bt((e) => {
				p(e.next.state !== "inactive" && e.next.hitRegions.some((e) => e.separator === t) ? e.next.state : "inactive");
			}), i = an(S, (e) => {
				let { derivedPanelConstraints: n, layout: r, separatorToPanels: i } = e.next, a = i.get(t);
				if (a) {
					let e = a[0], t = n.findIndex((t) => t.panelId === e.id);
					d(er({
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
tr.displayName = "Separator";
//#endregion
//#region src/shared/ui/resizable.tsx
var nr = ({ className: t, ...n }) => /* @__PURE__ */ w(Yn, {
	className: e("min-h-0 min-w-0 flex-1 data-[panel-group-direction=vertical]:flex-col", t),
	...n
}), rr = ({ className: t, ...n }) => /* @__PURE__ */ w(Qn, {
	className: e("min-h-0 min-w-0", t),
	...n
}), ir = ({ className: t, withHandle: n, ...r }) => /* @__PURE__ */ w(tr, {
	className: e("relative hidden h-full w-0.5 shrink-0 bg-border/70 transition-colors hover:bg-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:block aria-[orientation=horizontal]:h-0.5 aria-[orientation=horizontal]:w-full", t),
	...r,
	children: n ? /* @__PURE__ */ w("div", {
		className: "absolute left-1/2 top-1/2 z-10 flex h-6 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-background",
		children: /* @__PURE__ */ w(D, { className: "h-3.5 w-3.5 text-muted-foreground" })
	}) : null
});
//#endregion
export { _e as _, bt as a, M as b, ct as c, _t as d, ut as f, st as g, yt as h, xt as i, ht as l, vt as m, rr as n, lt as o, mt as p, nr as r, pt as s, ir as t, gt as u, me as v, k as x, de as y };
