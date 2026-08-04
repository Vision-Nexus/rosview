import { f as e, i as t, l as n, t as r } from "./rafScheduler-DNtaoEPW.js";
import { t as i } from "./chevron-right-BfEHxLF2.js";
import { t as a } from "./TopicQuickPicker-DOu76mVX.js";
import { t as o } from "./PanelTopicBar-Caya_sKz.js";
import { h as s } from "./rosMessageTypes-D0Ar3Pyn.js";
import { t as c } from "./messageBus-D2dmTOBd.js";
import { r as l } from "./time-BoEDgjoH.js";
import { t as u } from "./pickDefaultRawMessagesTopic-BA0mu-n2.js";
import d, { useCallback as f, useEffect as p, useMemo as ee, useRef as m, useState as h } from "react";
import { jsx as g, jsxs as te } from "react/jsx-runtime";
//#region src/features/panels/RawMessages/shapeTree.ts
var _ = [{
	id: "log_time",
	path: "log_time",
	key: "log_time",
	depth: 0,
	expandable: !1,
	parentIsArray: !1
}, {
	id: "publish_time",
	path: "publish_time",
	key: "publish_time",
	depth: 0,
	expandable: !1,
	parentIsArray: !1
}];
function v(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function y(e, t, n) {
	let r = [], i = [], a = (e) => {
		r.length < n && r.push(e);
	}, o = (e, s, c, l, u) => {
		if (r.length >= n) return;
		let d = e instanceof Uint8Array ? "u8" : e instanceof ArrayBuffer ? "ab" : Array.isArray(e) ? "arr" : v(e) ? "obj" : typeof e;
		if (i.push(`${s}:${d}`), e instanceof Uint8Array) {
			a({
				id: s,
				path: s,
				key: c,
				depth: l,
				expandable: !1,
				parentIsArray: u
			});
			return;
		}
		if (e instanceof ArrayBuffer) {
			o(new Uint8Array(e), s, c, l, u);
			return;
		}
		if (Array.isArray(e)) {
			let i = e.length > 0;
			if (a({
				id: s,
				path: s,
				key: c,
				depth: l,
				expandable: i,
				parentIsArray: u
			}), l >= t) return;
			for (let t = 0; t < e.length; t++) if (o(e[t], `${s}.${t}`, `${t}`, l + 1, !0), r.length >= n) return;
			return;
		}
		if (v(e)) {
			let i = Object.keys(e), d = i.length > 0;
			if (a({
				id: s,
				path: s,
				key: c,
				depth: l,
				expandable: d,
				parentIsArray: u
			}), l >= t) return;
			for (let t of i) if (o(e[t], `${s}.${t}`, t, l + 1, !1), r.length >= n) return;
			return;
		}
		a({
			id: s,
			path: s,
			key: c,
			depth: l,
			expandable: !1,
			parentIsArray: u
		});
	};
	return o(e, "message", "message", 0, !1), {
		rows: r,
		signature: i.join("|")
	};
}
function ne(e, t, n) {
	let r = y(e.message, t, Math.max(0, n - _.length));
	return {
		rows: [..._, ...r.rows],
		signature: `log_time:time|publish_time:time|${r.signature}`
	};
}
//#endregion
//#region src/features/panels/RawMessages/RawMessagesPanel.tsx
var b = 22, x = 8, re = 1200, S = 3, C = 80, ie = 1024, w = 32;
function T(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += e[n].toString(16).padStart(2, "0");
	return t;
}
function E(e) {
	let t = 32768, n = "";
	for (let r = 0; r < e.length; r += t) n += String.fromCharCode(...e.subarray(r, Math.min(r + t, e.length)));
	return btoa(n);
}
function D(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function O(e) {
	return e.split(".").filter((e) => e.length > 0);
}
function k(e) {
	return D(e) ? typeof e.sec == "number" && typeof e.nsec == "number" : !1;
}
function A(e) {
	let t = e.nsec.toString().padStart(9, "0");
	return `${e.sec}.${t} (${l(e)})`;
}
function j(e, t) {
	if (!e) return;
	if (t === "log_time") return e.receiveTime;
	if (t === "publish_time") return e.publishTime;
	if (!t || t === "message") return e.message;
	if (!t.startsWith("message.")) return;
	let n = O(t.replace(/^message\./, "")), r = e.message;
	for (let e of n) {
		if (Array.isArray(r)) {
			let t = Number(e);
			if (!Number.isInteger(t)) return;
			r = r[t];
			continue;
		}
		if (!D(r)) return;
		r = r[e];
	}
	return r;
}
function M(e, t) {
	let n = [], r = [];
	for (let i of e) {
		for (; r.length > 0 && i.depth <= r[r.length - 1];) r.pop();
		r.length > 0 || (n.push(i), i.expandable && !t.has(i.path) && r.push(i.depth));
	}
	return n;
}
function ae(e, t, n) {
	let r = Math.max(0, Math.floor(e / b) - x), i = Math.ceil(t / b) + x * 2;
	return {
		startRow: r,
		endRow: Math.min(n, r + i)
	};
}
function N(e) {
	if (e === null) return "null";
	if (typeof e == "string") {
		let t = JSON.stringify(e);
		return t.length > C ? `${t.slice(0, C)}...` : t;
	}
	if (typeof e == "number" || typeof e == "boolean") return String(e);
	if (e instanceof Uint8Array) return `Uint8Array(${e.byteLength})`;
	if (e instanceof ArrayBuffer) return `ArrayBuffer(${e.byteLength})`;
	if (Array.isArray(e)) return `Array(${e.length})`;
	if (D(e)) return `{${Object.keys(e).length} keys}`;
	if (typeof e == "bigint") return `${e.toString()}n`;
	if (typeof e == "function") return "[Function]";
	if (typeof e == "symbol") return e.toString();
	if (typeof e == "object" && e) try {
		return JSON.stringify(e);
	} catch {
		return Object.prototype.toString.call(e);
	}
	return e === void 0 ? "undefined" : Object.prototype.toString.call(e);
}
function oe(e) {
	let t = Object.keys(e);
	return t.length === 0 ? "{}" : `{${t.slice(0, S).map((t) => `${JSON.stringify(t)}:${N(e[t])}`).join(",")}${t.length > S ? ",..." : ""}}`;
}
function P(e, t, n) {
	if (k(e)) return {
		text: A(e),
		kind: "number"
	};
	if (e instanceof Uint8Array) {
		let r = n?.hideBinaryHex || e.byteLength > ie ? w : Math.min(e.byteLength, t), i = e.subarray(0, r);
		return {
			text: `Uint8Array(${e.byteLength}) 0x${T(i)}${e.byteLength > i.byteLength ? "..." : ""}`,
			kind: "binary"
		};
	}
	if (e instanceof ArrayBuffer) return P(new Uint8Array(e), t, n);
	if (Array.isArray(e)) return {
		text: `Array(${e.length})`,
		kind: "array"
	};
	if (D(e)) return {
		text: oe(e) ?? `{${Object.keys(e).length} keys}`,
		kind: "object"
	};
	if (e === null) return {
		text: "null",
		kind: "null"
	};
	if (typeof e == "string") return {
		text: JSON.stringify(e),
		kind: "string"
	};
	if (typeof e == "number") return {
		text: String(e),
		kind: "number"
	};
	if (typeof e == "boolean") return {
		text: e ? "true" : "false",
		kind: "boolean"
	};
	if (typeof e == "bigint") return {
		text: `${e.toString()}n`,
		kind: "unknown"
	};
	if (typeof e == "function") return {
		text: "[Function]",
		kind: "unknown"
	};
	if (typeof e == "symbol") return {
		text: e.toString(),
		kind: "unknown"
	};
	if (typeof e == "object" && e) try {
		return {
			text: JSON.stringify(e),
			kind: "unknown"
		};
	} catch {
		return {
			text: Object.prototype.toString.call(e),
			kind: "unknown"
		};
	}
	return e === void 0 ? {
		text: "undefined",
		kind: "unknown"
	} : {
		text: Object.prototype.toString.call(e),
		kind: "unknown"
	};
}
function F(e) {
	switch (e) {
		case "string": return "rgb(163 230 53)";
		case "number": return "rgb(125 211 252)";
		case "boolean": return "rgb(196 181 253)";
		case "null": return "rgb(248 113 113)";
		case "binary": return "rgb(251 191 36)";
		case "object":
		case "array": return "rgb(203 213 225)";
		default: return "rgb(229 231 235)";
	}
}
function I(e, t) {
	if (e instanceof Uint8Array) return t === "hex" ? {
		__type: "Uint8Array",
		encoding: "hex",
		data: T(e)
	} : t === "base64" ? {
		__type: "Uint8Array",
		encoding: "base64",
		data: E(e)
	} : {
		__type: "Uint8Array",
		data: Array.from(e)
	};
	if (e instanceof ArrayBuffer) return I(new Uint8Array(e), t);
	if (Array.isArray(e)) return e.map((e) => I(e, t));
	if (D(e)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) n[r] = I(i, t);
		return n;
	}
	return e;
}
async function se(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		return !1;
	}
}
function ce(e, t) {
	e.textContent = t.text, e.dataset.kind !== t.kind && (e.dataset.kind = t.kind, e.style.color = F(t.kind));
}
var le = d.memo(function({ row: e, expanded: t, onToggle: n, onCopy: r, registerValueNode: a }) {
	let o = f(() => {
		e.expandable && n(e.path);
	}, [
		n,
		e.expandable,
		e.path
	]), s = f(() => {
		r(e.path);
	}, [r, e.path]), c = f((t) => {
		a(e.path, t);
	}, [a, e.path]);
	return /* @__PURE__ */ te("div", {
		className: "group flex h-[22px] items-center border-b border-border/30",
		style: { paddingLeft: e.depth * 14 },
		children: [
			/* @__PURE__ */ g("button", {
				type: "button",
				className: `mr-1 inline-flex h-4 w-4 items-center justify-center rounded ${e.expandable ? "hover:bg-muted" : "opacity-20"}`,
				onClick: o,
				children: e.expandable ? /* @__PURE__ */ g(i, { className: `size-3 transition-transform ${t ? "rotate-90" : ""}` }) : null
			}),
			/* @__PURE__ */ te("span", {
				className: "mr-2 text-cyan-300",
				children: [e.key, ":"]
			}),
			/* @__PURE__ */ g("span", {
				ref: c,
				className: "truncate"
			}),
			/* @__PURE__ */ g("button", {
				type: "button",
				className: "ml-2 rounded px-1 text-[10px] text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100",
				onClick: s,
				children: "COPY"
			})
		]
	});
}), L = ({ player: i, panelId: l, topic: d, uiRefreshHz: _ = 10, pauseUpdates: v = !1, latestOnly: y = !0, maxExpandedDepth: x = 4, maxRows: S = 2e3, maxBinaryPreviewBytes: C = 256, binaryCopyFormat: ie = "uint8array", setConfig: w }) => {
	let { formatMessage: T } = e(), E = t((e) => e.sortedTopics), D = m(!1), O = ee(() => s(E.find((e) => e.name === d)?.type ?? ""), [d, E]), k = m(c.getLastMessage(d)), A = m(0), N = m(0), oe = m(v), F = m(_), L = m(y), R = m(!!c.getLastMessage(d)), z = m([]), B = m(""), V = m(/* @__PURE__ */ new Set(["message"])), H = m(0), ue = m(240), U = m({
		startRow: 0,
		endRow: 0,
		totalRows: 0
	}), W = m({
		maxExpandedDepth: x,
		maxRows: S,
		maxBinaryPreviewBytes: C,
		isImageTopic: O
	}), G = m(null), K = m(/* @__PURE__ */ new Map()), q = m(/* @__PURE__ */ new Map()), J = m(/* @__PURE__ */ new Map()), de = m(() => {}), fe = m(!1), [pe, me] = h(() => !!c.getLastMessage(d)), [Y, he] = h(() => /* @__PURE__ */ new Set(["message"])), [X, ge] = h([]), [_e, ve] = h(""), [Z, ye] = h({
		startRow: 0,
		endRow: 0,
		totalRows: 0
	});
	p(() => {
		oe.current = v;
	}, [v]), p(() => {
		F.current = _;
	}, [_]), p(() => {
		L.current = y;
	}, [y]), p(() => {
		W.current = {
			maxExpandedDepth: x,
			maxRows: S,
			maxBinaryPreviewBytes: C,
			isImageTopic: O
		};
	}, [
		O,
		C,
		x,
		S
	]), p(() => {
		V.current = Y;
	}, [Y]), p(() => {
		z.current = X;
	}, [X]), p(() => {
		B.current = _e;
	}, [_e]), p(() => {
		if (D.current) return;
		if (d && d.trim().length > 0) {
			D.current = !0;
			return;
		}
		if (E.length === 0) return;
		let e = u(E);
		e && (D.current = !0, w((t) => ({
			...t,
			topic: e
		})));
	}, [
		w,
		d,
		E
	]), p(() => {
		if (!d || d.trim().length === 0) {
			i.unregisterSubscriptions(l);
			return;
		}
		return i.registerSubscriptions(l, [{
			topic: d,
			subscriberId: l
		}]), () => i.unregisterSubscriptions(l);
	}, [
		i,
		l,
		d
	]);
	let be = f(() => {
		for (let [e, t] of J.current) {
			let n = K.current.get(e);
			n && ce(n, t);
		}
		J.current.clear();
	}, []), xe = f((e) => {
		let t = M(z.current, V.current), { startRow: n, endRow: i } = U.current, a = t.slice(n, i), o = Math.min(a.length, re), { maxBinaryPreviewBytes: s, isImageTopic: c } = W.current;
		for (let t = 0; t < o; t++) {
			let n = a[t];
			if (!n) continue;
			let r = P(j(e, n.path), s, { hideBinaryHex: c });
			q.current.set(n.path, r), (K.current.get(n.path)?.textContent ?? null) !== r.text && J.current.set(n.path, r);
		}
		J.current.size > 0 && r(be);
	}, [be]), Q = f(() => {
		let e = M(z.current, V.current).length, t = {
			...ae(H.current, ue.current, e),
			totalRows: e
		};
		ye((e) => e.startRow === t.startRow && e.endRow === t.endRow && e.totalRows === t.totalRows ? e : (U.current = t, t));
	}, []), $ = f(() => {
		let e = performance.now(), t = 1e3 / Math.max(1, F.current);
		if (oe.current || A.current <= 0) return;
		if (e - N.current < t) {
			r(() => {
				de.current();
			});
			return;
		}
		A.current = 0, N.current = e;
		let n = k.current;
		if (!n) return;
		let { maxExpandedDepth: i, maxRows: a } = W.current, o = ne(n, i, a);
		if (o.signature !== B.current) {
			if (B.current = o.signature, z.current = o.rows, ge(o.rows), ve(o.signature), !fe.current) {
				let e = /* @__PURE__ */ new Set(["message"]);
				for (let t of o.rows) t.depth === 1 && t.expandable && t.path.startsWith("message.") && e.add(t.path);
				V.current = e, he(e), fe.current = !0;
			}
			Q(), r(() => {
				k.current && xe(k.current);
			});
			return;
		}
		xe(n);
	}, [Q, xe]);
	p(() => {
		de.current = $;
	}), p(() => {
		!v && A.current > 0 && r($);
	}, [$, v]), p(() => (k.current = c.getLastMessage(d), A.current = 0, N.current = performance.now(), k.current && (A.current = 1, r($)), c.subscribeTopic(d, () => {
		k.current = c.getLastMessage(d), A.current = L.current ? 1 : A.current + 1, k.current && !R.current && (R.current = !0, me(!0)), r($);
	})), [$, d]), p(() => {
		if (!G.current) return;
		let e = null, t = new ResizeObserver((t) => {
			let n = t[0]?.contentRect.height;
			!n || n <= 0 || (ue.current = n, e?.(), e = r(Q));
		});
		return t.observe(G.current), () => {
			e?.(), t.disconnect();
		};
	}, [Q]), p(() => {
		k.current = c.getLastMessage(d), R.current = !!k.current, me(!!k.current), ve(""), ge([]), z.current = [], B.current = "", q.current.clear(), K.current.clear(), J.current.clear(), H.current = 0, U.current = {
			startRow: 0,
			endRow: 0,
			totalRows: 0
		}, ye({
			startRow: 0,
			endRow: 0,
			totalRows: 0
		}), V.current = /* @__PURE__ */ new Set(["message"]), he(/* @__PURE__ */ new Set(["message"])), fe.current = !1, A.current = +!!k.current, N.current = performance.now(), k.current && r($);
	}, [$, d]), p(() => {
		Q();
	}, [
		Q,
		Y,
		X
	]), p(() => {
		k.current && (q.current.clear(), A.current = Math.max(A.current, 1), r($));
	}, [
		$,
		O,
		C,
		x,
		S
	]);
	let Se = ee(() => X.length === 0 ? [] : M(X, Y), [Y, X]).slice(Z.startRow, Z.endRow), Ce = f((e, t) => {
		if (t) {
			K.current.set(e, t);
			let n = q.current.get(e);
			if (n == null && k.current) {
				let t = j(k.current, e), { maxBinaryPreviewBytes: r, isImageTopic: i } = W.current;
				n = P(t, r, { hideBinaryHex: i }), q.current.set(e, n);
			}
			n != null && ce(t, n);
		} else K.current.delete(e);
	}, []), we = f((e) => {
		he((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), V.current = n, n;
		});
	}, []), Te = f(async (e) => {
		let t = I(j(k.current, e), ie);
		await se(typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : JSON.stringify(t, null, 2) ?? "undefined") ? n.success(T({ id: "panels.rawMessages.copy.success" }, { path: e })) : n.error(T({ id: "panels.rawMessages.copy.error" }));
	}, [ie, T]), Ee = f((e) => {
		H.current = e.currentTarget.scrollTop, r(Q);
	}, [Q]);
	return /* @__PURE__ */ te("div", {
		className: "flex h-full flex-col overflow-hidden bg-background",
		children: [/* @__PURE__ */ g(o, { children: /* @__PURE__ */ g(a, {
			value: d,
			topics: E,
			onChange: (e) => w((t) => ({
				...t,
				topic: e
			})),
			placeholder: T({ id: "panels.framework.topicPicker.placeholder" }),
			className: "min-w-0 w-full"
		}) }), /* @__PURE__ */ g("div", {
			ref: G,
			className: "min-h-0 flex-1 overflow-auto p-2 font-mono text-[11px]",
			onScroll: Ee,
			children: pe && Z.totalRows > 0 ? /* @__PURE__ */ g("div", {
				style: {
					height: Z.totalRows * b,
					position: "relative"
				},
				children: /* @__PURE__ */ g("div", {
					style: { transform: `translateY(${Z.startRow * b}px)` },
					children: Se.map((e) => /* @__PURE__ */ g(le, {
						row: e,
						expanded: Y.has(e.path),
						onToggle: we,
						onCopy: Te,
						registerValueNode: Ce
					}, e.id))
				})
			}) : /* @__PURE__ */ g("div", {
				className: "flex h-full items-center justify-center text-xs italic text-muted-foreground",
				children: "Waiting for messages..."
			})
		})]
	});
};
//#endregion
export { L as RawMessagesPanel };
