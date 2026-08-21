import { f as e, i as t, l as n, t as r } from "./rafScheduler-CNDq0Etb.js";
import { t as i } from "./chevron-right-4pIadFHI.js";
import { t as a } from "./TopicQuickPicker-vzANSyR_.js";
import { t as o } from "./PanelTopicBar-DQnIAHFk.js";
import { h as s } from "./rosMessageTypes-Di-HH75w.js";
import { t as c } from "./messageBus-tPJ7Uycq.js";
import { r as l } from "./time-BoEDgjoH.js";
import { t as u } from "./pickDefaultRawMessagesTopic-BuHDUGuI.js";
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
function y(e) {
	return Array.isArray(e) ? !0 : ArrayBuffer.isView(e) && !(e instanceof DataView) && !(e instanceof Uint8Array);
}
function b(e, t, n) {
	let r = [], i = [], a = (e) => {
		r.length < n && r.push(e);
	}, o = (e, s, c, l, u) => {
		if (r.length >= n) return;
		let d = e instanceof Uint8Array ? "u8" : e instanceof ArrayBuffer ? "ab" : y(e) ? "arr" : v(e) ? "obj" : typeof e;
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
		if (y(e)) {
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
	let r = b(e.message, t, Math.max(0, n - _.length));
	return {
		rows: [..._, ...r.rows],
		signature: `log_time:time|publish_time:time|${r.signature}`
	};
}
//#endregion
//#region src/features/panels/RawMessages/RawMessagesPanel.tsx
var x = 22, S = 8, re = 1200, C = 3, w = 80, T = 1024, E = 32;
function D(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += e[n].toString(16).padStart(2, "0");
	return t;
}
function O(e) {
	let t = 32768, n = "";
	for (let r = 0; r < e.length; r += t) n += String.fromCharCode(...e.subarray(r, Math.min(r + t, e.length)));
	return btoa(n);
}
function k(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function A(e) {
	return e.split(".").filter((e) => e.length > 0);
}
function j(e) {
	return k(e) ? typeof e.sec == "number" && typeof e.nsec == "number" : !1;
}
function M(e) {
	let t = e.nsec.toString().padStart(9, "0");
	return `${e.sec}.${t} (${l(e)})`;
}
function N(e, t) {
	if (!e) return;
	if (t === "log_time") return e.receiveTime;
	if (t === "publish_time") return e.publishTime;
	if (!t || t === "message") return e.message;
	if (!t.startsWith("message.")) return;
	let n = A(t.replace(/^message\./, "")), r = e.message;
	for (let e of n) {
		if (y(r)) {
			let t = Number(e);
			if (!Number.isInteger(t)) return;
			r = r[t];
			continue;
		}
		if (!k(r)) return;
		r = r[e];
	}
	return r;
}
function P(e, t) {
	let n = [], r = [];
	for (let i of e) {
		for (; r.length > 0 && i.depth <= r[r.length - 1];) r.pop();
		r.length > 0 || (n.push(i), i.expandable && !t.has(i.path) && r.push(i.depth));
	}
	return n;
}
function ie(e, t, n) {
	let r = Math.max(0, Math.floor(e / x) - S), i = Math.ceil(t / x) + 16;
	return {
		startRow: r,
		endRow: Math.min(n, r + i)
	};
}
function F(e) {
	if (e === null) return "null";
	if (typeof e == "string") {
		let t = JSON.stringify(e);
		return t.length > w ? `${t.slice(0, w)}...` : t;
	}
	if (typeof e == "number" || typeof e == "boolean") return String(e);
	if (e instanceof Uint8Array) return `Uint8Array(${e.byteLength})`;
	if (e instanceof ArrayBuffer) return `ArrayBuffer(${e.byteLength})`;
	if (y(e)) return `Array(${e.length})`;
	if (k(e)) return `{${Object.keys(e).length} keys}`;
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
function I(e) {
	let t = Object.keys(e);
	return t.length === 0 ? "{}" : `{${t.slice(0, C).map((t) => `${JSON.stringify(t)}:${F(e[t])}`).join(",")}${t.length > C ? ",..." : ""}}`;
}
function L(e, t, n) {
	if (j(e)) return {
		text: M(e),
		kind: "number"
	};
	if (e instanceof Uint8Array) {
		let r = n?.hideBinaryHex || e.byteLength > T ? E : Math.min(e.byteLength, t), i = e.subarray(0, r);
		return {
			text: `Uint8Array(${e.byteLength}) 0x${D(i)}${e.byteLength > i.byteLength ? "..." : ""}`,
			kind: "binary"
		};
	}
	if (e instanceof ArrayBuffer) return L(new Uint8Array(e), t, n);
	if (y(e)) return {
		text: `Array(${e.length})`,
		kind: "array"
	};
	if (k(e)) return {
		text: I(e) ?? `{${Object.keys(e).length} keys}`,
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
function R(e) {
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
function z(e, t) {
	if (e instanceof Uint8Array) return t === "hex" ? {
		__type: "Uint8Array",
		encoding: "hex",
		data: D(e)
	} : t === "base64" ? {
		__type: "Uint8Array",
		encoding: "base64",
		data: O(e)
	} : {
		__type: "Uint8Array",
		data: Array.from(e)
	};
	if (e instanceof ArrayBuffer) return z(new Uint8Array(e), t);
	if (y(e)) return Array.from(e, (e) => z(e, t));
	if (k(e)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) n[r] = z(i, t);
		return n;
	}
	return e;
}
async function ae(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		return !1;
	}
}
function oe(e, t) {
	e.textContent = t.text, e.dataset.kind !== t.kind && (e.dataset.kind = t.kind, e.style.color = R(t.kind));
}
var se = d.memo(function({ row: e, expanded: t, onToggle: n, onCopy: r, registerValueNode: a }) {
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
}), B = ({ player: i, panelId: l, topic: d, uiRefreshHz: _ = 10, pauseUpdates: v = !1, latestOnly: y = !0, maxExpandedDepth: b = 4, maxRows: S = 2e3, maxBinaryPreviewBytes: C = 256, binaryCopyFormat: w = "uint8array", setConfig: T }) => {
	let { formatMessage: E } = e(), D = t((e) => e.sortedTopics), O = m(!1), k = ee(() => {
		let e = D.find((e) => e.name === d)?.type ?? "";
		return s(e);
	}, [d, D]), A = m(c.getLastMessage(d)), j = m(0), M = m(0), F = m(v), I = m(_), R = m(y), B = m(!!c.getLastMessage(d)), V = m([]), H = m(""), U = m(/* @__PURE__ */ new Set(["message"])), W = m(0), ce = m(240), le = m({
		startRow: 0,
		endRow: 0,
		totalRows: 0
	}), G = m({
		maxExpandedDepth: b,
		maxRows: S,
		maxBinaryPreviewBytes: C,
		isImageTopic: k
	}), ue = m(null), K = m(/* @__PURE__ */ new Map()), q = m(/* @__PURE__ */ new Map()), J = m(/* @__PURE__ */ new Map()), de = m(() => {}), fe = m(!1), [pe, me] = h(() => !!c.getLastMessage(d)), [Y, he] = h(() => /* @__PURE__ */ new Set(["message"])), [X, ge] = h([]), [_e, ve] = h(""), [Z, ye] = h({
		startRow: 0,
		endRow: 0,
		totalRows: 0
	});
	p(() => {
		F.current = v;
	}, [v]), p(() => {
		I.current = _;
	}, [_]), p(() => {
		R.current = y;
	}, [y]), p(() => {
		G.current = {
			maxExpandedDepth: b,
			maxRows: S,
			maxBinaryPreviewBytes: C,
			isImageTopic: k
		};
	}, [
		k,
		C,
		b,
		S
	]), p(() => {
		U.current = Y;
	}, [Y]), p(() => {
		V.current = X;
	}, [X]), p(() => {
		H.current = _e;
	}, [_e]), p(() => {
		if (O.current) return;
		if (d && d.trim().length > 0) {
			O.current = !0;
			return;
		}
		if (D.length === 0) return;
		let e = u(D);
		e && (O.current = !0, T((t) => ({
			...t,
			topic: e
		})));
	}, [
		T,
		d,
		D
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
			n && oe(n, t);
		}
		J.current.clear();
	}, []), xe = f((e) => {
		let t = P(V.current, U.current), { startRow: n, endRow: i } = le.current, a = t.slice(n, i), o = Math.min(a.length, re), { maxBinaryPreviewBytes: s, isImageTopic: c } = G.current;
		for (let t = 0; t < o; t++) {
			let n = a[t];
			if (!n) continue;
			let r = L(N(e, n.path), s, { hideBinaryHex: c });
			q.current.set(n.path, r), (K.current.get(n.path)?.textContent ?? null) !== r.text && J.current.set(n.path, r);
		}
		J.current.size > 0 && r(be);
	}, [be]), Q = f(() => {
		let e = P(V.current, U.current).length, t = {
			...ie(W.current, ce.current, e),
			totalRows: e
		};
		ye((e) => e.startRow === t.startRow && e.endRow === t.endRow && e.totalRows === t.totalRows ? e : (le.current = t, t));
	}, []), $ = f(() => {
		let e = performance.now(), t = 1e3 / Math.max(1, I.current);
		if (F.current || j.current <= 0) return;
		if (e - M.current < t) {
			r(() => {
				de.current();
			});
			return;
		}
		j.current = 0, M.current = e;
		let n = A.current;
		if (!n) return;
		let { maxExpandedDepth: i, maxRows: a } = G.current, o = ne(n, i, a);
		if (o.signature !== H.current) {
			if (H.current = o.signature, V.current = o.rows, ge(o.rows), ve(o.signature), !fe.current) {
				let e = /* @__PURE__ */ new Set(["message"]);
				for (let t of o.rows) t.depth === 1 && t.expandable && t.path.startsWith("message.") && e.add(t.path);
				U.current = e, he(e), fe.current = !0;
			}
			Q(), r(() => {
				A.current && xe(A.current);
			});
			return;
		}
		xe(n);
	}, [Q, xe]);
	p(() => {
		de.current = $;
	}), p(() => {
		!v && j.current > 0 && r($);
	}, [$, v]), p(() => (A.current = c.getLastMessage(d), j.current = 0, M.current = performance.now(), A.current && (j.current = 1, r($)), c.subscribeTopic(d, () => {
		A.current = c.getLastMessage(d), j.current = R.current ? 1 : j.current + 1, A.current && !B.current && (B.current = !0, me(!0)), r($);
	})), [$, d]), p(() => {
		if (!ue.current) return;
		let e = null, t = new ResizeObserver((t) => {
			let n = t[0]?.contentRect.height;
			!n || n <= 0 || (ce.current = n, e?.(), e = r(Q));
		});
		return t.observe(ue.current), () => {
			e?.(), t.disconnect();
		};
	}, [Q]), p(() => {
		A.current = c.getLastMessage(d), B.current = !!A.current, me(!!A.current), ve(""), ge([]), V.current = [], H.current = "", q.current.clear(), K.current.clear(), J.current.clear(), W.current = 0, le.current = {
			startRow: 0,
			endRow: 0,
			totalRows: 0
		}, ye({
			startRow: 0,
			endRow: 0,
			totalRows: 0
		}), U.current = /* @__PURE__ */ new Set(["message"]), he(/* @__PURE__ */ new Set(["message"])), fe.current = !1, j.current = +!!A.current, M.current = performance.now(), A.current && r($);
	}, [$, d]), p(() => {
		Q();
	}, [
		Q,
		Y,
		X
	]), p(() => {
		A.current && (q.current.clear(), j.current = Math.max(j.current, 1), r($));
	}, [
		$,
		k,
		C,
		b,
		S
	]);
	let Se = ee(() => X.length === 0 ? [] : P(X, Y), [Y, X]).slice(Z.startRow, Z.endRow), Ce = f((e, t) => {
		if (t) {
			K.current.set(e, t);
			let n = q.current.get(e);
			if (n == null && A.current) {
				let t = N(A.current, e), { maxBinaryPreviewBytes: r, isImageTopic: i } = G.current;
				n = L(t, r, { hideBinaryHex: i }), q.current.set(e, n);
			}
			n != null && oe(t, n);
		} else K.current.delete(e);
	}, []), we = f((e) => {
		he((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), U.current = n, n;
		});
	}, []), Te = f(async (e) => {
		let t = z(N(A.current, e), w);
		await ae(typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : JSON.stringify(t, null, 2) ?? "undefined") ? n.success(E({ id: "panels.rawMessages.copy.success" }, { path: e })) : n.error(E({ id: "panels.rawMessages.copy.error" }));
	}, [w, E]), Ee = f((e) => {
		W.current = e.currentTarget.scrollTop, r(Q);
	}, [Q]);
	return /* @__PURE__ */ te("div", {
		className: "flex h-full flex-col overflow-hidden bg-background",
		children: [/* @__PURE__ */ g(o, { children: /* @__PURE__ */ g(a, {
			value: d,
			topics: D,
			onChange: (e) => T((t) => ({
				...t,
				topic: e
			})),
			placeholder: E({ id: "panels.framework.topicPicker.placeholder" }),
			className: "min-w-0 w-full"
		}) }), /* @__PURE__ */ g("div", {
			ref: ue,
			className: "min-h-0 flex-1 overflow-auto p-2 font-mono text-[11px]",
			onScroll: Ee,
			children: pe && Z.totalRows > 0 ? /* @__PURE__ */ g("div", {
				style: {
					height: Z.totalRows * x,
					position: "relative"
				},
				children: /* @__PURE__ */ g("div", {
					style: { transform: `translateY(${Z.startRow * x}px)` },
					children: Se.map((e) => /* @__PURE__ */ g(se, {
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
export { B as RawMessagesPanel };
