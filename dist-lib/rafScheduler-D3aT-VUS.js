import * as e from "react";
import t, { createContext as n, useContext as r, useEffect as i, useMemo as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import u from "react-dom";
//#region node_modules/@formatjs/fast-memoize/index.js
function d(e, t) {
	let n = t && t.cache ? t.cache : b, r = t && t.serializer ? t.serializer : v;
	return (t && t.strategy ? t.strategy : g)(e, {
		cache: n,
		serializer: r
	});
}
function f(e) {
	return e == null || typeof e == "number" || typeof e == "boolean";
}
function p(e, t, n, r) {
	let i = f(r) ? r : n(r), a = t.get(i);
	return a === void 0 && (a = e.call(this, r), t.set(i, a)), a;
}
function m(e, t, n) {
	let r = Array.prototype.slice.call(arguments, 3), i = n(r), a = t.get(i);
	return a === void 0 && (a = e.apply(this, r), t.set(i, a)), a;
}
function h(e, t, n, r, i) {
	return n.bind(t, e, r, i);
}
function g(e, t) {
	let n = e.length === 1 ? p : m;
	return h(e, this, n, t.cache.create(), t.serializer);
}
function ee(e, t) {
	return h(e, this, m, t.cache.create(), t.serializer);
}
function _(e, t) {
	return h(e, this, p, t.cache.create(), t.serializer);
}
var v = function() {
	return JSON.stringify(arguments);
}, y = class {
	constructor() {
		this.cache = Object.create(null);
	}
	get(e) {
		return this.cache[e];
	}
	set(e, t) {
		this.cache[e] = t;
	}
}, b = { create: function() {
	return new y();
} }, x = {
	variadic: ee,
	monadic: _
}, te = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function S(e) {
	let t = {};
	return e.replace(te, (e) => {
		let n = e.length;
		switch (e[0]) {
			case "G":
				t.era = n === 4 ? "long" : n === 5 ? "narrow" : "short";
				break;
			case "y":
				t.year = n === 2 ? "2-digit" : "numeric";
				break;
			case "Y":
			case "u":
			case "U":
			case "r": throw RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
			case "q":
			case "Q": throw RangeError("`q/Q` (quarter) patterns are not supported");
			case "M":
			case "L":
				t.month = [
					"numeric",
					"2-digit",
					"short",
					"long",
					"narrow"
				][n - 1];
				break;
			case "w":
			case "W": throw RangeError("`w/W` (week) patterns are not supported");
			case "d":
				t.day = ["numeric", "2-digit"][n - 1];
				break;
			case "D":
			case "F":
			case "g": throw RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
			case "E":
				t.weekday = n === 4 ? "long" : n === 5 ? "narrow" : "short";
				break;
			case "e":
				if (n < 4) throw RangeError("`e..eee` (weekday) patterns are not supported");
				t.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][n - 3];
				break;
			case "c":
				if (n < 4) throw RangeError("`c..ccc` (weekday) patterns are not supported");
				t.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][n - 3];
				break;
			case "a":
				t.hour12 = !0;
				break;
			case "b":
			case "B": throw RangeError("`b/B` (period) patterns are not supported, use `a` instead");
			case "h":
				t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][n - 1];
				break;
			case "H":
				t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][n - 1];
				break;
			case "K":
				t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][n - 1];
				break;
			case "k":
				t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][n - 1];
				break;
			case "j":
			case "J":
			case "C": throw RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
			case "m":
				t.minute = ["numeric", "2-digit"][n - 1];
				break;
			case "s":
				t.second = ["numeric", "2-digit"][n - 1];
				break;
			case "S":
			case "A": throw RangeError("`S/A` (second) patterns are not supported, use `s` instead");
			case "z":
				t.timeZoneName = n < 4 ? "short" : "long";
				break;
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x": throw RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
		}
		return "";
	}), t;
}
var C = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function w(e) {
	if (e.length === 0) throw Error("Number skeleton cannot be empty");
	let t = e.split(C).filter((e) => e.length > 0), n = [];
	for (let e of t) {
		let t = e.split("/");
		if (t.length === 0) throw Error("Invalid number skeleton");
		let [r, ...i] = t;
		for (let e of i) if (e.length === 0) throw Error("Invalid number skeleton");
		n.push({
			stem: r,
			options: i
		});
	}
	return n;
}
function T(e) {
	return e.replace(/^(.*?)-/, "");
}
var E = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, ne = /^(@+)?(\+|#+)?[rs]?$/g, re = /(\*)(0+)|(#+)(0+)|(0+)/g, D = /^(0+)$/;
function O(e) {
	let t = {};
	return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(ne, function(e, n, r) {
		return typeof r == "string" ? r === "+" ? t.minimumSignificantDigits = n.length : n[0] === "#" ? t.maximumSignificantDigits = n.length : (t.minimumSignificantDigits = n.length, t.maximumSignificantDigits = n.length + (typeof r == "string" ? r.length : 0)) : (t.minimumSignificantDigits = n.length, t.maximumSignificantDigits = n.length), "";
	}), t;
}
function k(e) {
	switch (e) {
		case "sign-auto": return { signDisplay: "auto" };
		case "sign-accounting":
		case "()": return { currencySign: "accounting" };
		case "sign-always":
		case "+!": return { signDisplay: "always" };
		case "sign-accounting-always":
		case "()!": return {
			signDisplay: "always",
			currencySign: "accounting"
		};
		case "sign-except-zero":
		case "+?": return { signDisplay: "exceptZero" };
		case "sign-accounting-except-zero":
		case "()?": return {
			signDisplay: "exceptZero",
			currencySign: "accounting"
		};
		case "sign-never":
		case "+_": return { signDisplay: "never" };
	}
}
function ie(e) {
	let t;
	if (e[0] === "E" && e[1] === "E" ? (t = { notation: "engineering" }, e = e.slice(2)) : e[0] === "E" && (t = { notation: "scientific" }, e = e.slice(1)), t) {
		let n = e.slice(0, 2);
		if (n === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : n === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !D.test(e)) throw Error("Malformed concise eng/scientific notation");
		t.minimumIntegerDigits = e.length;
	}
	return t;
}
function A(e) {
	return k(e) || {};
}
function j(e) {
	let t = {};
	for (let n of e) {
		switch (n.stem) {
			case "percent":
			case "%":
				t.style = "percent";
				continue;
			case "%x100":
				t.style = "percent", t.scale = 100;
				continue;
			case "currency":
				t.style = "currency", t.currency = n.options[0];
				continue;
			case "group-off":
			case ",_":
				t.useGrouping = !1;
				continue;
			case "precision-integer":
			case ".":
				t.maximumFractionDigits = 0;
				continue;
			case "measure-unit":
			case "unit":
				t.style = "unit", t.unit = T(n.options[0]);
				continue;
			case "compact-short":
			case "K":
				t.notation = "compact", t.compactDisplay = "short";
				continue;
			case "compact-long":
			case "KK":
				t.notation = "compact", t.compactDisplay = "long";
				continue;
			case "scientific":
				t = {
					...t,
					notation: "scientific",
					...n.options.reduce((e, t) => ({
						...e,
						...A(t)
					}), {})
				};
				continue;
			case "engineering":
				t = {
					...t,
					notation: "engineering",
					...n.options.reduce((e, t) => ({
						...e,
						...A(t)
					}), {})
				};
				continue;
			case "notation-simple":
				t.notation = "standard";
				continue;
			case "unit-width-narrow":
				t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
				continue;
			case "unit-width-short":
				t.currencyDisplay = "code", t.unitDisplay = "short";
				continue;
			case "unit-width-full-name":
				t.currencyDisplay = "name", t.unitDisplay = "long";
				continue;
			case "unit-width-iso-code":
				t.currencyDisplay = "symbol";
				continue;
			case "scale":
				t.scale = parseFloat(n.options[0]);
				continue;
			case "rounding-mode-floor":
				t.roundingMode = "floor";
				continue;
			case "rounding-mode-ceiling":
				t.roundingMode = "ceil";
				continue;
			case "rounding-mode-down":
				t.roundingMode = "trunc";
				continue;
			case "rounding-mode-up":
				t.roundingMode = "expand";
				continue;
			case "rounding-mode-half-even":
				t.roundingMode = "halfEven";
				continue;
			case "rounding-mode-half-down":
				t.roundingMode = "halfTrunc";
				continue;
			case "rounding-mode-half-up":
				t.roundingMode = "halfExpand";
				continue;
			case "integer-width":
				if (n.options.length > 1) throw RangeError("integer-width stems only accept a single optional option");
				n.options[0].replace(re, function(e, n, r, i, a, o) {
					if (n) t.minimumIntegerDigits = r.length;
					else if (i && a) throw Error("We currently do not support maximum integer digits");
					else if (o) throw Error("We currently do not support exact integer digits");
					return "";
				});
				continue;
		}
		if (D.test(n.stem)) {
			t.minimumIntegerDigits = n.stem.length;
			continue;
		}
		if (E.test(n.stem)) {
			if (n.options.length > 1) throw RangeError("Fraction-precision stems only accept a single optional option");
			n.stem.replace(E, function(e, n, r, i, a, o) {
				return r === "*" ? t.minimumFractionDigits = n.length : i && i[0] === "#" ? t.maximumFractionDigits = i.length : a && o ? (t.minimumFractionDigits = a.length, t.maximumFractionDigits = a.length + o.length) : (t.minimumFractionDigits = n.length, t.maximumFractionDigits = n.length), "";
			});
			let e = n.options[0];
			e === "w" ? t = {
				...t,
				trailingZeroDisplay: "stripIfInteger"
			} : e && (t = {
				...t,
				...O(e)
			});
			continue;
		}
		if (ne.test(n.stem)) {
			t = {
				...t,
				...O(n.stem)
			};
			continue;
		}
		let e = k(n.stem);
		e && (t = {
			...t,
			...e
		});
		let r = ie(n.stem);
		r && (t = {
			...t,
			...r
		});
	}
	return t;
}
//#endregion
//#region node_modules/@formatjs/icu-messageformat-parser/index.js
var ae = /* @__PURE__ */ function(e) {
	return e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG", e;
}({}), M = /* @__PURE__ */ function(e) {
	return e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag", e;
}({});
function N(e) {
	return e.type === 0;
}
function oe(e) {
	return e.type === 1;
}
function P(e) {
	return e.type === 2;
}
function F(e) {
	return e.type === 3;
}
function se(e) {
	return e.type === 4;
}
function ce(e) {
	return e.type === 5;
}
function I(e) {
	return e.type === 6;
}
function le(e) {
	return e.type === 7;
}
function L(e) {
	return e.type === 8;
}
function ue(e) {
	return !!(e && typeof e == "object" && e.type === 0);
}
function de(e) {
	return !!(e && typeof e == "object" && e.type === 1);
}
var R = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, fe = {
	"001": ["H", "h"],
	419: [
		"h",
		"H",
		"hB",
		"hb"
	],
	AC: [
		"H",
		"h",
		"hb",
		"hB"
	],
	AD: ["H", "hB"],
	AE: [
		"h",
		"hB",
		"hb",
		"H"
	],
	AF: [
		"H",
		"hb",
		"hB",
		"h"
	],
	AG: [
		"h",
		"hb",
		"H",
		"hB"
	],
	AI: [
		"H",
		"h",
		"hb",
		"hB"
	],
	AL: [
		"h",
		"H",
		"hB"
	],
	AM: ["H", "hB"],
	AO: ["H", "hB"],
	AR: [
		"h",
		"H",
		"hB",
		"hb"
	],
	AS: ["h", "H"],
	AT: ["H", "hB"],
	AU: [
		"h",
		"hb",
		"H",
		"hB"
	],
	AW: ["H", "hB"],
	AX: ["H"],
	AZ: [
		"H",
		"hB",
		"h"
	],
	BA: [
		"H",
		"hB",
		"h"
	],
	BB: [
		"h",
		"hb",
		"H",
		"hB"
	],
	BD: [
		"h",
		"hB",
		"H"
	],
	BE: ["H", "hB"],
	BF: ["H", "hB"],
	BG: [
		"H",
		"hB",
		"h"
	],
	BH: [
		"h",
		"hB",
		"hb",
		"H"
	],
	BI: ["H", "h"],
	BJ: ["H", "hB"],
	BL: ["H", "hB"],
	BM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	BN: [
		"hb",
		"hB",
		"h",
		"H"
	],
	BO: [
		"h",
		"H",
		"hB",
		"hb"
	],
	BQ: ["H"],
	BR: ["H", "hB"],
	BS: [
		"h",
		"hb",
		"H",
		"hB"
	],
	BT: ["h", "H"],
	BW: [
		"H",
		"h",
		"hb",
		"hB"
	],
	BY: ["H", "h"],
	BZ: [
		"H",
		"h",
		"hb",
		"hB"
	],
	CA: [
		"h",
		"hb",
		"H",
		"hB"
	],
	CC: [
		"H",
		"h",
		"hb",
		"hB"
	],
	CD: ["hB", "H"],
	CF: [
		"H",
		"h",
		"hB"
	],
	CG: ["H", "hB"],
	CH: [
		"H",
		"hB",
		"h"
	],
	CI: ["H", "hB"],
	CK: [
		"H",
		"h",
		"hb",
		"hB"
	],
	CL: [
		"h",
		"H",
		"hB",
		"hb"
	],
	CM: [
		"H",
		"h",
		"hB"
	],
	CN: [
		"H",
		"hB",
		"hb",
		"h"
	],
	CO: [
		"h",
		"H",
		"hB",
		"hb"
	],
	CP: ["H"],
	CR: [
		"h",
		"H",
		"hB",
		"hb"
	],
	CU: [
		"h",
		"H",
		"hB",
		"hb"
	],
	CV: ["H", "hB"],
	CW: ["H", "hB"],
	CX: [
		"H",
		"h",
		"hb",
		"hB"
	],
	CY: [
		"h",
		"H",
		"hb",
		"hB"
	],
	CZ: ["H"],
	DE: ["H", "hB"],
	DG: [
		"H",
		"h",
		"hb",
		"hB"
	],
	DJ: ["h", "H"],
	DK: ["H"],
	DM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	DO: [
		"h",
		"H",
		"hB",
		"hb"
	],
	DZ: [
		"h",
		"hB",
		"hb",
		"H"
	],
	EA: [
		"H",
		"h",
		"hB",
		"hb"
	],
	EC: [
		"h",
		"H",
		"hB",
		"hb"
	],
	EE: ["H", "hB"],
	EG: [
		"h",
		"hB",
		"hb",
		"H"
	],
	EH: [
		"h",
		"hB",
		"hb",
		"H"
	],
	ER: ["h", "H"],
	ES: [
		"H",
		"hB",
		"h",
		"hb"
	],
	ET: [
		"hB",
		"hb",
		"h",
		"H"
	],
	FI: ["H"],
	FJ: [
		"h",
		"hb",
		"H",
		"hB"
	],
	FK: [
		"H",
		"h",
		"hb",
		"hB"
	],
	FM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	FO: ["H", "h"],
	FR: ["H", "hB"],
	GA: ["H", "hB"],
	GB: [
		"H",
		"h",
		"hb",
		"hB"
	],
	GD: [
		"h",
		"hb",
		"H",
		"hB"
	],
	GE: [
		"H",
		"hB",
		"h"
	],
	GF: ["H", "hB"],
	GG: [
		"H",
		"h",
		"hb",
		"hB"
	],
	GH: ["h", "H"],
	GI: [
		"H",
		"h",
		"hb",
		"hB"
	],
	GL: ["H", "h"],
	GM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	GN: ["H", "hB"],
	GP: ["H", "hB"],
	GQ: [
		"H",
		"hB",
		"h",
		"hb"
	],
	GR: [
		"h",
		"H",
		"hb",
		"hB"
	],
	GS: [
		"H",
		"h",
		"hb",
		"hB"
	],
	GT: [
		"h",
		"H",
		"hB",
		"hb"
	],
	GU: [
		"h",
		"hb",
		"H",
		"hB"
	],
	GW: ["H", "hB"],
	GY: [
		"h",
		"hb",
		"H",
		"hB"
	],
	HK: [
		"h",
		"hB",
		"hb",
		"H"
	],
	HN: [
		"h",
		"H",
		"hB",
		"hb"
	],
	HR: ["H", "hB"],
	HU: ["H", "h"],
	IC: [
		"H",
		"h",
		"hB",
		"hb"
	],
	ID: ["H"],
	IE: [
		"H",
		"h",
		"hb",
		"hB"
	],
	IL: ["H", "hB"],
	IM: [
		"H",
		"h",
		"hb",
		"hB"
	],
	IN: ["h", "H"],
	IO: [
		"H",
		"h",
		"hb",
		"hB"
	],
	IQ: [
		"h",
		"hB",
		"hb",
		"H"
	],
	IR: ["hB", "H"],
	IS: ["H"],
	IT: ["H", "hB"],
	JE: [
		"H",
		"h",
		"hb",
		"hB"
	],
	JM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	JO: [
		"h",
		"hB",
		"hb",
		"H"
	],
	JP: [
		"H",
		"K",
		"h"
	],
	KE: [
		"hB",
		"hb",
		"H",
		"h"
	],
	KG: [
		"H",
		"h",
		"hB",
		"hb"
	],
	KH: [
		"hB",
		"h",
		"H",
		"hb"
	],
	KI: [
		"h",
		"hb",
		"H",
		"hB"
	],
	KM: [
		"H",
		"h",
		"hB",
		"hb"
	],
	KN: [
		"h",
		"hb",
		"H",
		"hB"
	],
	KP: [
		"h",
		"H",
		"hB",
		"hb"
	],
	KR: [
		"h",
		"H",
		"hB",
		"hb"
	],
	KW: [
		"h",
		"hB",
		"hb",
		"H"
	],
	KY: [
		"h",
		"hb",
		"H",
		"hB"
	],
	KZ: ["H", "hB"],
	LA: [
		"H",
		"hb",
		"hB",
		"h"
	],
	LB: [
		"h",
		"hB",
		"hb",
		"H"
	],
	LC: [
		"h",
		"hb",
		"H",
		"hB"
	],
	LI: [
		"H",
		"hB",
		"h"
	],
	LK: [
		"H",
		"h",
		"hB",
		"hb"
	],
	LR: [
		"h",
		"hb",
		"H",
		"hB"
	],
	LS: ["h", "H"],
	LT: [
		"H",
		"h",
		"hb",
		"hB"
	],
	LU: [
		"H",
		"h",
		"hB"
	],
	LV: [
		"H",
		"hB",
		"hb",
		"h"
	],
	LY: [
		"h",
		"hB",
		"hb",
		"H"
	],
	MA: [
		"H",
		"h",
		"hB",
		"hb"
	],
	MC: ["H", "hB"],
	MD: ["H", "hB"],
	ME: [
		"H",
		"hB",
		"h"
	],
	MF: ["H", "hB"],
	MG: ["H", "h"],
	MH: [
		"h",
		"hb",
		"H",
		"hB"
	],
	MK: [
		"H",
		"h",
		"hb",
		"hB"
	],
	ML: ["H"],
	MM: [
		"hB",
		"hb",
		"H",
		"h"
	],
	MN: [
		"H",
		"h",
		"hb",
		"hB"
	],
	MO: [
		"h",
		"hB",
		"hb",
		"H"
	],
	MP: [
		"h",
		"hb",
		"H",
		"hB"
	],
	MQ: ["H", "hB"],
	MR: [
		"h",
		"hB",
		"hb",
		"H"
	],
	MS: [
		"H",
		"h",
		"hb",
		"hB"
	],
	MT: ["H", "h"],
	MU: ["H", "h"],
	MV: ["H", "h"],
	MW: [
		"h",
		"hb",
		"H",
		"hB"
	],
	MX: [
		"h",
		"H",
		"hB",
		"hb"
	],
	MY: [
		"hb",
		"hB",
		"h",
		"H"
	],
	MZ: ["H", "hB"],
	NA: [
		"h",
		"H",
		"hB",
		"hb"
	],
	NC: ["H", "hB"],
	NE: ["H"],
	NF: [
		"H",
		"h",
		"hb",
		"hB"
	],
	NG: [
		"H",
		"h",
		"hb",
		"hB"
	],
	NI: [
		"h",
		"H",
		"hB",
		"hb"
	],
	NL: ["H", "hB"],
	NO: ["H", "h"],
	NP: [
		"H",
		"h",
		"hB"
	],
	NR: [
		"H",
		"h",
		"hb",
		"hB"
	],
	NU: [
		"H",
		"h",
		"hb",
		"hB"
	],
	NZ: [
		"h",
		"hb",
		"H",
		"hB"
	],
	OM: [
		"h",
		"hB",
		"hb",
		"H"
	],
	PA: [
		"h",
		"H",
		"hB",
		"hb"
	],
	PE: [
		"h",
		"H",
		"hB",
		"hb"
	],
	PF: [
		"H",
		"h",
		"hB"
	],
	PG: ["h", "H"],
	PH: [
		"h",
		"hB",
		"hb",
		"H"
	],
	PK: [
		"h",
		"hB",
		"H"
	],
	PL: ["H", "h"],
	PM: ["H", "hB"],
	PN: [
		"H",
		"h",
		"hb",
		"hB"
	],
	PR: [
		"h",
		"H",
		"hB",
		"hb"
	],
	PS: [
		"h",
		"hB",
		"hb",
		"H"
	],
	PT: ["H", "hB"],
	PW: ["h", "H"],
	PY: [
		"h",
		"H",
		"hB",
		"hb"
	],
	QA: [
		"h",
		"hB",
		"hb",
		"H"
	],
	RE: ["H", "hB"],
	RO: ["H", "hB"],
	RS: [
		"H",
		"hB",
		"h"
	],
	RU: ["H"],
	RW: ["H", "h"],
	SA: [
		"h",
		"hB",
		"hb",
		"H"
	],
	SB: [
		"h",
		"hb",
		"H",
		"hB"
	],
	SC: [
		"H",
		"h",
		"hB"
	],
	SD: [
		"h",
		"hB",
		"hb",
		"H"
	],
	SE: ["H"],
	SG: [
		"h",
		"hb",
		"H",
		"hB"
	],
	SH: [
		"H",
		"h",
		"hb",
		"hB"
	],
	SI: ["H", "hB"],
	SJ: ["H"],
	SK: ["H"],
	SL: [
		"h",
		"hb",
		"H",
		"hB"
	],
	SM: [
		"H",
		"h",
		"hB"
	],
	SN: [
		"H",
		"h",
		"hB"
	],
	SO: ["h", "H"],
	SR: ["H", "hB"],
	SS: [
		"h",
		"hb",
		"H",
		"hB"
	],
	ST: ["H", "hB"],
	SV: [
		"h",
		"H",
		"hB",
		"hb"
	],
	SX: [
		"H",
		"h",
		"hb",
		"hB"
	],
	SY: [
		"h",
		"hB",
		"hb",
		"H"
	],
	SZ: [
		"h",
		"hb",
		"H",
		"hB"
	],
	TA: [
		"H",
		"h",
		"hb",
		"hB"
	],
	TC: [
		"h",
		"hb",
		"H",
		"hB"
	],
	TD: [
		"h",
		"H",
		"hB"
	],
	TF: [
		"H",
		"h",
		"hB"
	],
	TG: ["H", "hB"],
	TH: ["H", "h"],
	TJ: ["H", "h"],
	TL: [
		"H",
		"hB",
		"hb",
		"h"
	],
	TM: ["H", "h"],
	TN: [
		"h",
		"hB",
		"hb",
		"H"
	],
	TO: ["h", "H"],
	TR: ["H", "hB"],
	TT: [
		"h",
		"hb",
		"H",
		"hB"
	],
	TW: [
		"hB",
		"hb",
		"h",
		"H"
	],
	TZ: [
		"hB",
		"hb",
		"H",
		"h"
	],
	UA: [
		"H",
		"hB",
		"h"
	],
	UG: [
		"hB",
		"hb",
		"H",
		"h"
	],
	UM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	US: [
		"h",
		"hb",
		"H",
		"hB"
	],
	UY: [
		"h",
		"H",
		"hB",
		"hb"
	],
	UZ: [
		"H",
		"hB",
		"h"
	],
	VA: [
		"H",
		"h",
		"hB"
	],
	VC: [
		"h",
		"hb",
		"H",
		"hB"
	],
	VE: [
		"h",
		"H",
		"hB",
		"hb"
	],
	VG: [
		"h",
		"hb",
		"H",
		"hB"
	],
	VI: [
		"h",
		"hb",
		"H",
		"hB"
	],
	VN: ["H", "h"],
	VU: ["h", "H"],
	WF: ["H", "hB"],
	WS: ["h", "H"],
	XK: [
		"H",
		"hB",
		"h"
	],
	YE: [
		"h",
		"hB",
		"hb",
		"H"
	],
	YT: ["H", "hB"],
	ZA: [
		"H",
		"h",
		"hb",
		"hB"
	],
	ZM: [
		"h",
		"hb",
		"H",
		"hB"
	],
	ZW: ["H", "h"],
	"af-ZA": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"ar-001": [
		"h",
		"hB",
		"hb",
		"H"
	],
	"ca-ES": [
		"H",
		"h",
		"hB"
	],
	"en-001": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-HK": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"en-IL": [
		"H",
		"h",
		"hb",
		"hB"
	],
	"en-MY": [
		"h",
		"hb",
		"H",
		"hB"
	],
	"es-BR": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-ES": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"es-GQ": [
		"H",
		"h",
		"hB",
		"hb"
	],
	"fr-CA": [
		"H",
		"h",
		"hB"
	],
	"gl-ES": [
		"H",
		"h",
		"hB"
	],
	"gu-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"hi-IN": [
		"hB",
		"h",
		"H"
	],
	"it-CH": [
		"H",
		"h",
		"hB"
	],
	"it-IT": [
		"H",
		"h",
		"hB"
	],
	"kn-IN": [
		"hB",
		"h",
		"H"
	],
	"ku-SY": ["H", "hB"],
	"ml-IN": [
		"hB",
		"h",
		"H"
	],
	"mr-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"pa-IN": [
		"hB",
		"hb",
		"h",
		"H"
	],
	"ta-IN": [
		"hB",
		"h",
		"hb",
		"H"
	],
	"te-IN": [
		"hB",
		"h",
		"H"
	],
	"zu-ZA": [
		"H",
		"hB",
		"hb",
		"h"
	]
};
function pe(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e.charAt(r);
		if (i === "j") {
			let a = 0;
			for (; r + 1 < e.length && e.charAt(r + 1) === i;) a++, r++;
			let o = 1 + (a & 1), s = a < 2 ? 1 : 3 + (a >> 1), c = me(t);
			for ((c == "H" || c == "k") && (s = 0); s-- > 0;) n += "a";
			for (; o-- > 0;) n = c + n;
		} else n += i === "J" ? "H" : i;
	}
	return n;
}
function me(e) {
	let t = e.hourCycle;
	if (t === void 0 && e.hourCycles && e.hourCycles.length && (t = e.hourCycles[0]), t) switch (t) {
		case "h24": return "k";
		case "h23": return "H";
		case "h12": return "h";
		case "h11": return "K";
		default: throw Error("Invalid hourCycle");
	}
	let n = e.language, r;
	return n !== "root" && (r = e.maximize().region), (fe[r || ""] || fe[n || ""] || fe[`${n}-001`] || fe["001"])[0];
}
var he = RegExp(`^${R.source}*`), ge = RegExp(`${R.source}*$`);
function z(e, t) {
	return {
		start: e,
		end: t
	};
}
var _e = !!Object.fromEntries, ve = !!String.prototype.trimStart, ye = !!String.prototype.trimEnd, be = _e ? Object.fromEntries : function(e) {
	let t = {};
	for (let [n, r] of e) t[n] = r;
	return t;
}, xe = ve ? function(e) {
	return e.trimStart();
} : function(e) {
	return e.replace(he, "");
}, Se = ye ? function(e) {
	return e.trimEnd();
} : function(e) {
	return e.replace(ge, "");
}, Ce = /* @__PURE__ */ RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function we(e, t) {
	return Ce.lastIndex = t, Ce.exec(e)[1] ?? "";
}
function Te(e) {
	if (e.length === 0) return null;
	let t = 1, n = 1;
	for (let r = 0; r < e.length;) {
		let i = e.charCodeAt(r);
		switch (i) {
			case 35:
			case 39:
			case 60:
			case 123:
			case 125: return null;
		}
		if (i === 10) t++, n = 1, r++;
		else if (n++, i >= 55296 && i <= 56319 && r + 1 < e.length) {
			let t = e.charCodeAt(r + 1);
			r += t >= 56320 && t <= 57343 ? 2 : 1;
		} else r++;
	}
	return {
		offset: e.length,
		line: t,
		column: n
	};
}
var B = class {
	constructor(e, t = {}) {
		this.message = e, this.position = {
			offset: 0,
			line: 1,
			column: 1
		}, this.ignoreTag = !!t.ignoreTag, this.locale = t.locale, this.requiresOtherClause = !!t.requiresOtherClause, this.shouldParseSkeletons = !!t.shouldParseSkeletons;
	}
	parse() {
		if (this.offset() !== 0) throw Error("parser can only be used once");
		if (this.message.length > 0) {
			let e = this.message.charCodeAt(0);
			if (e !== 35 && e !== 39 && e !== 60 && e !== 123 && e !== 125) {
				let e = Te(this.message);
				if (e) {
					let t = this.clonePosition();
					return this.position = e, {
						val: [{
							type: 0,
							value: this.message,
							location: z(t, this.clonePosition())
						}],
						err: null
					};
				}
			}
		}
		return this.parseMessage(0, "", !1);
	}
	parseMessage(e, t, n) {
		let r = [];
		for (; !this.isEOF();) {
			let i = this.char();
			if (i === 123) {
				let t = this.parseArgument(e, n);
				if (t.err) return t;
				r.push(t.val);
			} else if (i === 125 && e > 0) break;
			else if (i === 35 && (t === "plural" || t === "selectordinal")) {
				let e = this.clonePosition();
				this.bump(), r.push({
					type: 7,
					location: z(e, this.clonePosition())
				});
			} else if (i === 60 && !this.ignoreTag && this.peek() === 47) {
				if (n) break;
				return this.error(26, z(this.clonePosition(), this.clonePosition()));
			} else if (i === 60 && !this.ignoreTag && Ee(this.peek() || 0)) {
				let n = this.parseTag(e, t);
				if (n.err) return n;
				r.push(n.val);
			} else {
				let n = this.parseLiteral(e, t);
				if (n.err) return n;
				r.push(n.val);
			}
		}
		return {
			val: r,
			err: null
		};
	}
	parseTag(e, t) {
		let n = this.clonePosition();
		this.bump();
		let r = this.parseTagName();
		if (this.bumpSpace(), this.bumpIf("/>")) return {
			val: {
				type: 0,
				value: `<${r}/>`,
				location: z(n, this.clonePosition())
			},
			err: null
		};
		if (this.bumpIf(">")) {
			let i = this.parseMessage(e + 1, t, !0);
			if (i.err) return i;
			let a = i.val, o = this.clonePosition();
			if (this.bumpIf("</")) {
				if (this.isEOF() || !Ee(this.char())) return this.error(23, z(o, this.clonePosition()));
				let e = this.clonePosition();
				return r === this.parseTagName() ? (this.bumpSpace(), this.bumpIf(">") ? {
					val: {
						type: 8,
						value: r,
						children: a,
						location: z(n, this.clonePosition())
					},
					err: null
				} : this.error(23, z(o, this.clonePosition()))) : this.error(26, z(e, this.clonePosition()));
			}
			return this.error(27, z(n, this.clonePosition()));
		}
		return this.error(23, z(n, this.clonePosition()));
	}
	parseTagName() {
		let e = this.offset();
		for (this.bump(); !this.isEOF() && V(this.char());) this.bump();
		return this.message.slice(e, this.offset());
	}
	parseLiteral(e, t) {
		let n = this.clonePosition(), r = "";
		for (;;) {
			let n = this.tryParseQuote(t);
			if (n) {
				r += n;
				continue;
			}
			let i = this.tryParseUnquoted(e, t);
			if (i) {
				r += i;
				continue;
			}
			let a = this.tryParseLeftAngleBracket();
			if (a) {
				r += a;
				continue;
			}
			break;
		}
		let i = z(n, this.clonePosition());
		return {
			val: {
				type: 0,
				value: r,
				location: i
			},
			err: null
		};
	}
	tryParseLeftAngleBracket() {
		return !this.isEOF() && this.char() === 60 && (this.ignoreTag || !De(this.peek() || 0)) ? (this.bump(), "<") : null;
	}
	tryParseQuote(e) {
		if (this.isEOF() || this.char() !== 39) return null;
		switch (this.peek()) {
			case 39: return this.bump(), this.bump(), "'";
			case 123:
			case 60:
			case 62:
			case 125: break;
			case 35:
				if (e === "plural" || e === "selectordinal") break;
				return null;
			default: return null;
		}
		this.bump();
		let t = [this.char()];
		for (this.bump(); !this.isEOF();) {
			let e = this.char();
			if (e === 39) {
				if (this.peek() === 39) t.push(39), this.bump();
				else {
					this.bump();
					break;
				}
			} else t.push(e);
			this.bump();
		}
		return String.fromCodePoint(...t);
	}
	tryParseUnquoted(e, t) {
		if (this.isEOF()) return null;
		let n = this.char();
		return n === 60 || n === 123 || n === 35 && (t === "plural" || t === "selectordinal") || n === 125 && e > 0 ? null : (this.bump(), String.fromCodePoint(n));
	}
	parseArgument(e, t) {
		let n = this.clonePosition();
		if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(1, z(n, this.clonePosition()));
		if (this.char() === 125) return this.bump(), this.error(2, z(n, this.clonePosition()));
		let r = this.parseIdentifierIfPossible().value;
		if (!r) return this.error(3, z(n, this.clonePosition()));
		if (this.bumpSpace(), this.isEOF()) return this.error(1, z(n, this.clonePosition()));
		switch (this.char()) {
			case 125: return this.bump(), {
				val: {
					type: 1,
					value: r,
					location: z(n, this.clonePosition())
				},
				err: null
			};
			case 44: return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(1, z(n, this.clonePosition())) : this.parseArgumentOptions(e, t, r, n);
			default: return this.error(3, z(n, this.clonePosition()));
		}
	}
	parseIdentifierIfPossible() {
		let e = this.clonePosition(), t = this.offset(), n = we(this.message, t), r = t + n.length;
		return this.bumpTo(r), {
			value: n,
			location: z(e, this.clonePosition())
		};
	}
	parseArgumentOptions(e, t, n, r) {
		let i = this.clonePosition(), a = this.parseIdentifierIfPossible().value, o = this.clonePosition();
		switch (a) {
			case "": return this.error(4, z(i, o));
			case "number":
			case "date":
			case "time": {
				this.bumpSpace();
				let e = null;
				if (this.bumpIf(",")) {
					this.bumpSpace();
					let t = this.clonePosition(), n = this.parseSimpleArgStyleIfPossible();
					if (n.err) return n;
					let r = Se(n.val);
					if (r.length === 0) return this.error(6, z(this.clonePosition(), this.clonePosition()));
					e = {
						style: r,
						styleLocation: z(t, this.clonePosition())
					};
				}
				let t = this.tryParseArgumentClose(r);
				if (t.err) return t;
				let i = z(r, this.clonePosition());
				if (e && e.style.startsWith("::")) {
					let t = xe(e.style.slice(2));
					if (a === "number") {
						let r = this.parseNumberSkeletonFromString(t, e.styleLocation);
						return r.err ? r : {
							val: {
								type: 2,
								value: n,
								location: i,
								style: r.val
							},
							err: null
						};
					}
					{
						if (t.length === 0) return this.error(10, i);
						let r = t;
						this.locale && (r = pe(t, this.locale));
						let o = {
							type: 1,
							pattern: r,
							location: e.styleLocation,
							parsedOptions: this.shouldParseSkeletons ? S(r) : {}
						};
						return {
							val: {
								type: a === "date" ? 3 : 4,
								value: n,
								location: i,
								style: o
							},
							err: null
						};
					}
				}
				return {
					val: {
						type: a === "number" ? 2 : a === "date" ? 3 : 4,
						value: n,
						location: i,
						style: e?.style ?? null
					},
					err: null
				};
			}
			case "plural":
			case "selectordinal":
			case "select": {
				let i = this.clonePosition();
				if (this.bumpSpace(), !this.bumpIf(",")) return this.error(12, z(i, { ...i }));
				this.bumpSpace();
				let o = this.parseIdentifierIfPossible(), s = 0;
				if (a !== "select" && o.value === "offset") {
					if (!this.bumpIf(":")) return this.error(13, z(this.clonePosition(), this.clonePosition()));
					this.bumpSpace();
					let e = this.tryParseDecimalInteger(13, 14);
					if (e.err) return e;
					this.bumpSpace(), o = this.parseIdentifierIfPossible(), s = e.val;
				}
				let c = this.tryParsePluralOrSelectOptions(e, a, t, o);
				if (c.err) return c;
				let l = this.tryParseArgumentClose(r);
				if (l.err) return l;
				let u = z(r, this.clonePosition());
				return a === "select" ? {
					val: {
						type: 5,
						value: n,
						options: be(c.val),
						location: u
					},
					err: null
				} : {
					val: {
						type: 6,
						value: n,
						options: be(c.val),
						offset: s,
						pluralType: a === "plural" ? "cardinal" : "ordinal",
						location: u
					},
					err: null
				};
			}
			default: return this.error(5, z(i, o));
		}
	}
	tryParseArgumentClose(e) {
		return this.isEOF() || this.char() !== 125 ? this.error(1, z(e, this.clonePosition())) : (this.bump(), {
			val: !0,
			err: null
		});
	}
	parseSimpleArgStyleIfPossible() {
		let e = 0, t = this.clonePosition();
		for (; !this.isEOF();) switch (this.char()) {
			case 39: {
				this.bump();
				let e = this.clonePosition();
				if (!this.bumpUntil("'")) return this.error(11, z(e, this.clonePosition()));
				this.bump();
				break;
			}
			case 123:
				e += 1, this.bump();
				break;
			case 125:
				if (e > 0) --e;
				else return {
					val: this.message.slice(t.offset, this.offset()),
					err: null
				};
				break;
			default: this.bump();
		}
		return {
			val: this.message.slice(t.offset, this.offset()),
			err: null
		};
	}
	parseNumberSkeletonFromString(e, t) {
		let n = [];
		try {
			n = w(e);
		} catch {
			return this.error(7, t);
		}
		return {
			val: {
				type: 0,
				tokens: n,
				location: t,
				parsedOptions: this.shouldParseSkeletons ? j(n) : {}
			},
			err: null
		};
	}
	tryParsePluralOrSelectOptions(e, t, n, r) {
		let i = !1, a = [], o = /* @__PURE__ */ new Set(), { value: s, location: c } = r;
		for (;;) {
			if (s.length === 0) {
				let e = this.clonePosition();
				if (t !== "select" && this.bumpIf("=")) {
					let t = this.tryParseDecimalInteger(16, 19);
					if (t.err) return t;
					c = z(e, this.clonePosition()), s = this.message.slice(e.offset, this.offset());
				} else break;
			}
			if (o.has(s)) return this.error(t === "select" ? 21 : 20, c);
			s === "other" && (i = !0), this.bumpSpace();
			let r = this.clonePosition();
			if (!this.bumpIf("{")) return this.error(t === "select" ? 17 : 18, z(this.clonePosition(), this.clonePosition()));
			let l = this.parseMessage(e + 1, t, n);
			if (l.err) return l;
			let u = this.tryParseArgumentClose(r);
			if (u.err) return u;
			a.push([s, {
				value: l.val,
				location: z(r, this.clonePosition())
			}]), o.add(s), this.bumpSpace(), {value: s, location: c} = this.parseIdentifierIfPossible();
		}
		return a.length === 0 ? this.error(t === "select" ? 15 : 16, z(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !i ? this.error(22, z(this.clonePosition(), this.clonePosition())) : {
			val: a,
			err: null
		};
	}
	tryParseDecimalInteger(e, t) {
		let n = 1, r = this.clonePosition();
		this.bumpIf("+") || this.bumpIf("-") && (n = -1);
		let i = !1, a = 0;
		for (; !this.isEOF();) {
			let e = this.char();
			if (e >= 48 && e <= 57) i = !0, a = a * 10 + (e - 48), this.bump();
			else break;
		}
		let o = z(r, this.clonePosition());
		return i ? (a *= n, Number.isSafeInteger(a) ? {
			val: a,
			err: null
		} : this.error(t, o)) : this.error(e, o);
	}
	offset() {
		return this.position.offset;
	}
	isEOF() {
		return this.offset() === this.message.length;
	}
	clonePosition() {
		return {
			offset: this.position.offset,
			line: this.position.line,
			column: this.position.column
		};
	}
	char() {
		let e = this.position.offset;
		if (e >= this.message.length) throw Error("out of bound");
		let t = this.message.codePointAt(e);
		if (t === void 0) throw Error(`Offset ${e} is at invalid UTF-16 code unit boundary`);
		return t;
	}
	error(e, t) {
		return {
			val: null,
			err: {
				kind: e,
				message: this.message,
				location: t
			}
		};
	}
	bump() {
		if (this.isEOF()) return;
		let e = this.char();
		e === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
	}
	bumpIf(e) {
		if (this.message.startsWith(e, this.offset())) {
			for (let t = 0; t < e.length; t++) this.bump();
			return !0;
		}
		return !1;
	}
	bumpUntil(e) {
		let t = this.offset(), n = this.message.indexOf(e, t);
		return n >= 0 ? (this.bumpTo(n), !0) : (this.bumpTo(this.message.length), !1);
	}
	bumpTo(e) {
		if (this.offset() > e) throw Error(`targetOffset ${e} must be greater than or equal to the current offset ${this.offset()}`);
		for (e = Math.min(e, this.message.length);;) {
			let t = this.offset();
			if (t === e) break;
			if (t > e) throw Error(`targetOffset ${e} is at invalid UTF-16 code unit boundary`);
			if (this.bump(), this.isEOF()) break;
		}
	}
	bumpSpace() {
		for (; !this.isEOF() && Oe(this.char());) this.bump();
	}
	peek() {
		if (this.isEOF()) return null;
		let e = this.char(), t = this.offset();
		return this.message.charCodeAt(t + (e >= 65536 ? 2 : 1)) ?? null;
	}
};
function Ee(e) {
	return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function De(e) {
	return Ee(e) || e === 47;
}
function V(e) {
	return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function Oe(e) {
	return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function ke(e) {
	e.forEach((e) => {
		if (delete e.location, ce(e) || I(e)) for (let t in e.options) delete e.options[t].location, ke(e.options[t].value);
		else P(e) && ue(e.style) || (F(e) || se(e)) && de(e.style) ? delete e.style.location : L(e) && ke(e.children);
	});
}
function Ae(e, t = {}) {
	t = {
		shouldParseSkeletons: !0,
		requiresOtherClause: !0,
		...t
	};
	let n = new B(e, t).parse();
	if (n.err) {
		let e = SyntaxError(ae[n.err.kind]);
		throw e.location = n.err.location, e.originalMessage = n.err.message, e;
	}
	return t?.captureLocation || ke(n.val), n.val;
}
//#endregion
//#region node_modules/intl-messageformat/index.js
var je = /* @__PURE__ */ function(e) {
	return e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API", e;
}({}), H = class extends Error {
	constructor(e, t, n) {
		super(e), this.code = t, this.originalMessage = n;
	}
	toString() {
		return `[formatjs Error: ${this.code}] ${this.message}`;
	}
}, Me = class extends H {
	constructor(e, t, n, r) {
		super(`Invalid values for "${e}": "${t}". Options are "${Object.keys(n).join("\", \"")}"`, "INVALID_VALUE", r);
	}
}, Ne = class extends H {
	constructor(e, t, n) {
		super(`Value for "${e}" must be of type ${t}`, "INVALID_VALUE", n);
	}
}, Pe = class extends H {
	constructor(e, t) {
		super(`The intl string context variable "${e}" was not provided to the string "${t}"`, "MISSING_VALUE", t);
	}
};
function Fe(e) {
	return e.length < 2 ? e : e.reduce((e, t) => {
		let n = e[e.length - 1];
		return !n || n.type !== 0 || t.type !== 0 ? e.push(t) : n.value += t.value, e;
	}, []);
}
function Ie(e) {
	return typeof e == "function";
}
function Le(e, t, n, r, i, a, o) {
	if (e.length === 1 && N(e[0])) return [{
		type: 0,
		value: e[0].value
	}];
	let s = [];
	for (let c of e) {
		if (N(c)) {
			s.push({
				type: 0,
				value: c.value
			});
			continue;
		}
		if (le(c)) {
			typeof a == "number" && s.push({
				type: 0,
				value: n.getNumberFormat(t).format(a)
			});
			continue;
		}
		let { value: e } = c;
		if (!(i && e in i)) throw new Pe(e, o);
		let l = i[e];
		if (oe(c)) {
			(!l || typeof l == "string" || typeof l == "number" || typeof l == "bigint") && (l = typeof l == "string" || typeof l == "number" || typeof l == "bigint" ? String(l) : ""), s.push({
				type: typeof l == "string" ? 0 : 1,
				value: l
			});
			continue;
		}
		if (F(c)) {
			let e = typeof c.style == "string" ? r.date[c.style] : de(c.style) ? c.style.parsedOptions : void 0;
			s.push({
				type: 0,
				value: n.getDateTimeFormat(t, e).format(l)
			});
			continue;
		}
		if (se(c)) {
			let e = typeof c.style == "string" ? r.time[c.style] : de(c.style) ? c.style.parsedOptions : r.time.medium;
			s.push({
				type: 0,
				value: n.getDateTimeFormat(t, e).format(l)
			});
			continue;
		}
		if (P(c)) {
			let e = typeof c.style == "string" ? r.number[c.style] : ue(c.style) ? c.style.parsedOptions : void 0;
			if (e && e.scale) {
				let t = e.scale || 1;
				if (typeof l == "bigint") {
					if (!Number.isInteger(t)) throw TypeError(`Cannot apply fractional scale ${t} to bigint value. Scale must be an integer when formatting bigint.`);
					l *= BigInt(t);
				} else l *= t;
			}
			s.push({
				type: 0,
				value: n.getNumberFormat(t, e).format(l)
			});
			continue;
		}
		if (L(c)) {
			let { children: e, value: l } = c, u = i[l];
			if (!Ie(u)) throw new Ne(l, "function", o);
			let d = u(Le(e, t, n, r, i, a).map((e) => e.value));
			Array.isArray(d) || (d = [d]), s.push(...d.map((e) => ({
				type: typeof e == "string" ? 0 : 1,
				value: e
			})));
		}
		if (ce(c)) {
			let e = l, a = (Object.prototype.hasOwnProperty.call(c.options, e) ? c.options[e] : void 0) || c.options.other;
			if (!a) throw new Me(c.value, l, Object.keys(c.options), o);
			s.push(...Le(a.value, t, n, r, i));
			continue;
		}
		if (I(c)) {
			let e = `=${l}`, a = Object.prototype.hasOwnProperty.call(c.options, e) ? c.options[e] : void 0;
			if (!a) {
				if (!Intl.PluralRules) throw new H("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", "MISSING_INTL_API", o);
				let e = typeof l == "bigint" ? Number(l) : l, r = n.getPluralRules(t, { type: c.pluralType }).select(e - (c.offset || 0));
				a = (Object.prototype.hasOwnProperty.call(c.options, r) ? c.options[r] : void 0) || c.options.other;
			}
			if (!a) throw new Me(c.value, l, Object.keys(c.options), o);
			let u = typeof l == "bigint" ? Number(l) : l;
			s.push(...Le(a.value, t, n, r, i, u - (c.offset || 0)));
			continue;
		}
	}
	return Fe(s);
}
function Re(e, t) {
	return t ? {
		...e,
		...t,
		...Object.keys(e).reduce((n, r) => (n[r] = {
			...e[r],
			...t[r]
		}, n), {})
	} : e;
}
function ze(e, t) {
	return t ? Object.keys(e).reduce((n, r) => (n[r] = Re(e[r], t[r]), n), { ...e }) : e;
}
function Be(e) {
	return { create() {
		return {
			get(t) {
				return e[t];
			},
			set(t, n) {
				e[t] = n;
			}
		};
	} };
}
function Ve(e = {
	number: {},
	dateTime: {},
	pluralRules: {}
}) {
	return {
		getNumberFormat: d((...e) => new Intl.NumberFormat(...e), {
			cache: Be(e.number),
			strategy: x.variadic
		}),
		getDateTimeFormat: d((...e) => new Intl.DateTimeFormat(...e), {
			cache: Be(e.dateTime),
			strategy: x.variadic
		}),
		getPluralRules: d((...e) => new Intl.PluralRules(...e), {
			cache: Be(e.pluralRules),
			strategy: x.variadic
		})
	};
}
var He = class e {
	constructor(t, n = e.defaultLocale, r, i) {
		if (this.formatterCache = {
			number: {},
			dateTime: {},
			pluralRules: {}
		}, this.format = (e) => {
			let t = this.formatToParts(e);
			if (t.length === 1) return t[0].value;
			let n = t.reduce((e, t) => (!e.length || t.type !== 0 || typeof e[e.length - 1] != "string" ? e.push(t.value) : e[e.length - 1] += t.value, e), []);
			return n.length <= 1 ? n[0] || "" : n;
		}, this.formatToParts = (e) => Le(this.ast, this.locales, this.formatters, this.formats, e, void 0, this.message), this.resolvedOptions = () => ({ locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0] }), this.getAst = () => this.ast, this.locales = n, this.resolvedLocale = e.resolveLocale(n), typeof t == "string") {
			if (this.message = t, !e.__parse) throw TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
			let { ...n } = i || {};
			this.ast = e.__parse(t, {
				...n,
				locale: this.resolvedLocale
			});
		} else this.ast = t;
		if (!Array.isArray(this.ast)) throw TypeError("A message must be provided as a String or AST.");
		this.formats = ze(e.formats, r), this.formatters = i && i.formatters || Ve(this.formatterCache);
	}
	static {
		this.memoizedDefaultLocale = null;
	}
	static get defaultLocale() {
		return e.memoizedDefaultLocale ||= new Intl.NumberFormat().resolvedOptions().locale, e.memoizedDefaultLocale;
	}
	static {
		this.resolveLocale = (e) => {
			if (Intl.Locale === void 0) return;
			let t = Intl.NumberFormat.supportedLocalesOf(e);
			return t.length > 0 ? new Intl.Locale(t[0]) : new Intl.Locale(typeof e == "string" ? e : e[0]);
		};
	}
	static {
		this.__parse = Ae;
	}
	static {
		this.formats = {
			number: {
				integer: { maximumFractionDigits: 0 },
				currency: { style: "currency" },
				percent: { style: "percent" }
			},
			date: {
				short: {
					month: "numeric",
					day: "numeric",
					year: "2-digit"
				},
				medium: {
					month: "short",
					day: "numeric",
					year: "numeric"
				},
				long: {
					month: "long",
					day: "numeric",
					year: "numeric"
				},
				full: {
					weekday: "long",
					month: "long",
					day: "numeric",
					year: "numeric"
				}
			},
			time: {
				short: {
					hour: "numeric",
					minute: "numeric"
				},
				medium: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric"
				},
				long: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					timeZoneName: "short"
				},
				full: {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					timeZoneName: "short"
				}
			}
		};
	}
}, Ue = class e extends Error {
	constructor(t, n, r) {
		let i = r ? r instanceof Error ? r : Error(String(r)) : void 0;
		super(`[@formatjs/intl Error ${t}] ${n}
${i ? `\n${i.message}\n${i.stack}` : ""}`), this.code = t, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, e);
	}
}, We = class extends Ue {
	constructor(e, t) {
		super("UNSUPPORTED_FORMATTER", e, t);
	}
}, Ge = class extends Ue {
	constructor(e, t) {
		super("INVALID_CONFIG", e, t);
	}
}, Ke = class extends Ue {
	constructor(e, t) {
		super("MISSING_DATA", e, t);
	}
}, U = class extends Ue {
	constructor(e, t, n) {
		super("FORMAT_ERROR", `${e}
Locale: ${t}
`, n), this.locale = t;
	}
}, qe = class extends U {
	constructor(e, t, n, r) {
		super(`${e}
MessageID: ${n?.id}
Default Message: ${n?.defaultMessage}
Description: ${n?.description}
`, t, r), this.descriptor = n, this.locale = t;
	}
}, Je = class extends Ue {
	constructor(e, t) {
		super("MISSING_TRANSLATION", `Missing message: "${e.id}" for locale "${t}", using ${e.defaultMessage ? `default message (${typeof e.defaultMessage == "string" ? e.defaultMessage : e.defaultMessage.map((e) => e.value ?? JSON.stringify(e)).join()})` : "id"} as fallback.`), this.descriptor = e;
	}
};
function Ye(e, t, n = Error) {
	if (!e) throw new n(t);
}
function Xe(e, t, n = {}) {
	return t.reduce((t, r) => (r in e ? t[r] = e[r] : r in n && (t[r] = n[r]), t), {});
}
var Ze = {
	formats: {},
	messages: {},
	timeZone: void 0,
	defaultLocale: "en",
	defaultFormats: {},
	fallbackOnEmptyString: !0,
	onError: (e) => {
		process.env.NODE_ENV !== "production" && console.error(e);
	},
	onWarn: (e) => {
		process.env.NODE_ENV !== "production" && console.warn(e);
	}
};
function Qe() {
	return {
		dateTime: {},
		number: {},
		message: {},
		relativeTime: {},
		pluralRules: {},
		list: {},
		displayNames: {}
	};
}
function $e(e) {
	return { create() {
		return {
			get(t) {
				return e[t];
			},
			set(t, n) {
				e[t] = n;
			}
		};
	} };
}
function et(e = Qe()) {
	let t = Intl.RelativeTimeFormat, n = Intl.ListFormat, r = Intl.DisplayNames, i = d((...e) => new Intl.DateTimeFormat(...e), {
		cache: $e(e.dateTime),
		strategy: x.variadic
	}), a = d((...e) => new Intl.NumberFormat(...e), {
		cache: $e(e.number),
		strategy: x.variadic
	}), o = d((...e) => new Intl.PluralRules(...e), {
		cache: $e(e.pluralRules),
		strategy: x.variadic
	});
	return {
		getDateTimeFormat: i,
		getNumberFormat: a,
		getMessageFormat: d((e, t, n, r) => new He(e, t, n, {
			formatters: {
				getNumberFormat: a,
				getDateTimeFormat: i,
				getPluralRules: o
			},
			...r
		}), {
			cache: $e(e.message),
			strategy: x.variadic
		}),
		getRelativeTimeFormat: d((...e) => new t(...e), {
			cache: $e(e.relativeTime),
			strategy: x.variadic
		}),
		getPluralRules: o,
		getListFormat: d((...e) => new n(...e), {
			cache: $e(e.list),
			strategy: x.variadic
		}),
		getDisplayNames: d((...e) => new r(...e), {
			cache: $e(e.displayNames),
			strategy: x.variadic
		})
	};
}
function tt(e, t, n, r) {
	let i = e && e[t], a;
	if (i && (a = i[n]), a) return a;
	r(new We(`No ${t} format named: ${n}`));
}
function nt(e, t) {
	return Object.keys(e).reduce((n, r) => (n[r] = {
		timeZone: t,
		...e[r]
	}, n), {});
}
function rt(e, t) {
	return Object.keys({
		...e,
		...t
	}).reduce((n, r) => (n[r] = {
		...e[r],
		...t[r]
	}, n), {});
}
function it(e, t) {
	if (!t) return e;
	let n = He.formats;
	return {
		...n,
		...e,
		date: rt(nt(n.date, t), nt(e.date || {}, t)),
		time: rt(nt(n.time, t), nt(e.time || {}, t))
	};
}
function at(e) {
	let { defaultMessage: t } = e;
	try {
		return t === void 0 ? `\nMessage Descriptor: ${JSON.stringify(e)}` : `\nDefault Message: ${typeof t == "string" ? t : JSON.stringify(t)}`;
	} catch {
		return "";
	}
}
var ot = ({ locale: e, formats: t, messages: n, defaultLocale: r, defaultFormats: i, fallbackOnEmptyString: a, onError: o, timeZone: s, defaultRichTextElements: c }, l, u = { id: "" }, d, f) => {
	let { id: p, defaultMessage: m } = u;
	p || Ye(!1, `[@formatjs/intl] An \`id\` must be provided to format a message. You can either:
1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.github.io/docs/tooling/babel-plugin)
or [@formatjs/ts-transformer](https://formatjs.github.io/docs/tooling/ts-transformer) OR
2. Configure your \`eslint\` config to include [eslint-plugin-formatjs](https://formatjs.github.io/docs/tooling/linter#enforce-id)
to autofix this issue${at(u)}`);
	let h = String(p), g = n && Object.prototype.hasOwnProperty.call(n, h) && n[h];
	if (Array.isArray(g) && g.length === 1 && g[0].type === M.literal) return g[0].value;
	if (d = {
		...c,
		...d
	}, t = it(t, s), i = it(i, s), !g) {
		if (a === !1 && g === "") return g;
		if ((!m || e && e.toLowerCase() !== r.toLowerCase()) && o(new Je(u, e)), m) try {
			return l.getMessageFormat(m, r, i, f).format(d);
		} catch (t) {
			return o(new qe(`Error formatting default message for: "${h}", rendering default message verbatim`, e, u, t)), typeof m == "string" ? m : h;
		}
		return h;
	}
	try {
		return l.getMessageFormat(g, e, t, {
			formatters: l,
			...f
		}).format(d);
	} catch (t) {
		o(new qe(`Error formatting message: "${h}", using ${m ? "default message" : "id"} as fallback.`, e, u, t));
	}
	if (m) try {
		return l.getMessageFormat(m, r, i, f).format(d);
	} catch (t) {
		o(new qe(`Error formatting the default message for: "${h}", rendering message verbatim`, e, u, t));
	}
	return typeof g == "string" ? g : typeof m == "string" ? m : h;
}, st = [
	"formatMatcher",
	"timeZone",
	"hour12",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"hourCycle",
	"dateStyle",
	"timeStyle",
	"calendar",
	"numberingSystem",
	"fractionalSecondDigits"
];
function ct({ locale: e, formats: t, onError: n, timeZone: r }, i, a, o = {}) {
	let { format: s } = o, c = Xe(o, st, {
		...r && { timeZone: r },
		...s && tt(t, i, s, n)
	});
	return i === "time" && !c.hour && !c.minute && !c.second && !c.timeStyle && !c.dateStyle && (c = {
		...c,
		hour: "numeric",
		minute: "numeric"
	}), a(e, c);
}
function lt(e, t, n, r = {}) {
	let i = typeof n == "string" ? new Date(n || 0) : n;
	try {
		return ct(e, "date", t, r).format(i);
	} catch (t) {
		e.onError(new U("Error formatting date.", e.locale, t));
	}
	return String(i);
}
function ut(e, t, n, r = {}) {
	let i = typeof n == "string" ? new Date(n || 0) : n;
	try {
		return ct(e, "time", t, r).format(i);
	} catch (t) {
		e.onError(new U("Error formatting time.", e.locale, t));
	}
	return String(i);
}
function dt(e, t, n, r, i = {}) {
	let a = typeof n == "string" ? new Date(n || 0) : n, o = typeof r == "string" ? new Date(r || 0) : r;
	try {
		return ct(e, "dateTimeRange", t, i).formatRange(a, o);
	} catch (t) {
		e.onError(new U("Error formatting date time range.", e.locale, t));
	}
	return String(a);
}
function ft(e, t, n, r = {}) {
	let i = typeof n == "string" ? new Date(n || 0) : n;
	try {
		return ct(e, "date", t, r).formatToParts(i);
	} catch (t) {
		e.onError(new U("Error formatting date.", e.locale, t));
	}
	return [];
}
function pt(e, t, n, r = {}) {
	let i = typeof n == "string" ? new Date(n || 0) : n;
	try {
		return ct(e, "time", t, r).formatToParts(i);
	} catch (t) {
		e.onError(new U("Error formatting time.", e.locale, t));
	}
	return [];
}
var mt = [
	"style",
	"type",
	"fallback",
	"languageDisplay"
];
function ht({ locale: e, onError: t }, n, r, i) {
	Intl.DisplayNames || t(new H("Intl.DisplayNames is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-displaynames\"\n", je.MISSING_INTL_API));
	let a = Xe(i, mt);
	try {
		return n(e, a).of(r);
	} catch (n) {
		t(new U("Error formatting display name.", e, n));
	}
}
var gt = ["type", "style"], _t = Date.now();
function vt(e) {
	return `${_t}_${e}_${_t}`;
}
function yt(e, t, n, r = {}) {
	let i = bt(e, t, n, r).reduce((e, t) => {
		let n = t.value;
		return typeof n == "string" && typeof e[e.length - 1] == "string" ? e[e.length - 1] += n : e.push(n), e;
	}, []);
	return i.length === 1 ? i[0] : i.length === 0 ? "" : i;
}
function bt({ locale: e, onError: t }, n, r, i = {}) {
	Intl.ListFormat || t(new H("Intl.ListFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-listformat\"\n", je.MISSING_INTL_API));
	let a = Xe(i, gt);
	try {
		let t = {}, i = Array.from(r).map((e, n) => {
			if (typeof e == "object" && e) {
				let r = vt(n);
				return t[r] = e, r;
			}
			return String(e);
		});
		return n(e, a).formatToParts(i).map((e) => e.type === "literal" ? e : {
			...e,
			value: t[e.value] || e.value
		});
	} catch (n) {
		t(new U("Error formatting list.", e, n));
	}
	return r;
}
var xt = ["type"];
function St({ locale: e, onError: t }, n, r, i = {}) {
	Intl.PluralRules || t(new H("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", je.MISSING_INTL_API));
	let a = Xe(i, xt);
	try {
		return n(e, a).select(r);
	} catch (n) {
		t(new U("Error formatting plural.", e, n));
	}
	return "other";
}
var Ct = ["numeric", "style"];
function wt({ locale: e, formats: t, onError: n }, r, i = {}) {
	let { format: a } = i;
	return r(e, Xe(i, Ct, !!a && tt(t, "relative", a, n) || {}));
}
function Tt(e, t, n, r, i = {}) {
	r ||= "second", Intl.RelativeTimeFormat || e.onError(new H("Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-relativetimeformat\"\n", je.MISSING_INTL_API));
	try {
		return wt(e, t, i).format(n, r);
	} catch (t) {
		e.onError(new U("Error formatting relative time.", e.locale, t));
	}
	return String(n);
}
var Et = [
	"style",
	"currency",
	"unit",
	"unitDisplay",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"currencyDisplay",
	"currencySign",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"numberingSystem",
	"trailingZeroDisplay",
	"roundingPriority",
	"roundingIncrement",
	"roundingMode"
];
function Dt({ locale: e, formats: t, onError: n }, r, i = {}) {
	let { format: a } = i;
	return r(e, Xe(i, Et, a && tt(t, "number", a, n) || {}));
}
function Ot(e, t, n, r = {}) {
	try {
		return Dt(e, t, r).format(n);
	} catch (t) {
		e.onError(new U("Error formatting number.", e.locale, t));
	}
	return String(n);
}
function kt(e, t, n, r = {}) {
	try {
		return Dt(e, t, r).formatToParts(n);
	} catch (t) {
		e.onError(new U("Error formatting number.", e.locale, t));
	}
	return [];
}
function At(e) {
	return typeof (e ? e[Object.keys(e)[0]] : void 0) == "string";
}
function jt(e) {
	e.onWarn && e.defaultRichTextElements && At(e.messages || {}) && e.onWarn("[@formatjs/intl] \"defaultRichTextElements\" was specified but \"message\" was not pre-compiled. \nPlease consider using \"@formatjs/cli\" to pre-compile your messages for performance.\nFor more details see https://formatjs.github.io/docs/getting-started/message-distribution");
}
function Mt(e, t) {
	let n = et(t), r = {
		...Ze,
		...e
	}, { locale: i, defaultLocale: a, onError: o } = r;
	return i ? !Intl.NumberFormat.supportedLocalesOf(i).length && o ? o(new Ke(`Missing locale data for locale: "${i}" in Intl.NumberFormat. Using default locale: "${a}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`)) : !Intl.DateTimeFormat.supportedLocalesOf(i).length && o && o(new Ke(`Missing locale data for locale: "${i}" in Intl.DateTimeFormat. Using default locale: "${a}" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details`)) : (o && o(new Ge(`"locale" was not configured, using "${a}" as fallback. See https://formatjs.github.io/docs/react-intl/api#intlshape for more details`)), r.locale = r.defaultLocale || "en"), jt(r), {
		...r,
		formatters: n,
		formatNumber: Ot.bind(null, r, n.getNumberFormat),
		formatNumberToParts: kt.bind(null, r, n.getNumberFormat),
		formatRelativeTime: Tt.bind(null, r, n.getRelativeTimeFormat),
		formatDate: lt.bind(null, r, n.getDateTimeFormat),
		formatDateToParts: ft.bind(null, r, n.getDateTimeFormat),
		formatTime: ut.bind(null, r, n.getDateTimeFormat),
		formatDateTimeRange: dt.bind(null, r, n.getDateTimeFormat),
		formatTimeToParts: pt.bind(null, r, n.getDateTimeFormat),
		formatPlural: St.bind(null, r, n.getPluralRules),
		formatMessage: ot.bind(null, r, n),
		$t: ot.bind(null, r, n),
		formatList: yt.bind(null, r, n.getListFormat),
		formatListToParts: bt.bind(null, r, n.getListFormat),
		formatDisplayName: ht.bind(null, r, n.getDisplayNames)
	};
}
//#endregion
//#region node_modules/react-intl/index.js
function Nt(e, t, n = Error) {
	if (!e) throw new n(t);
}
function Pt(e) {
	Nt(e, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
var Ft = {
	...Ze,
	textComponent: e.Fragment
}, It = (t) => e.Children.toArray(t).map((t, n) => e.isValidElement(t) ? /* @__PURE__ */ c(e.Fragment, { children: t }, n) : t);
function Lt(e) {
	return function(t) {
		return e(It(t));
	};
}
function Rt(e, t) {
	if (e === t) return !0;
	if (!e || !t) return !1;
	var n = Object.keys(e), r = Object.keys(t), i = n.length;
	if (r.length !== i) return !1;
	for (var a = 0; a < i; a++) {
		var o = n[a];
		if (e[o] !== t[o] || !Object.prototype.hasOwnProperty.call(t, o)) return !1;
	}
	return !0;
}
var zt = e.createContext(null), Bt = zt.Provider;
function Vt() {
	let t = e.useContext(zt);
	return Pt(t), t;
}
var Ht = /* @__PURE__ */ function(e) {
	return e.formatDate = "FormattedDate", e.formatTime = "FormattedTime", e.formatNumber = "FormattedNumber", e.formatList = "FormattedList", e.formatDisplayName = "FormattedDisplayName", e;
}(Ht || {}), Ut = /* @__PURE__ */ function(e) {
	return e.formatDate = "FormattedDateParts", e.formatTime = "FormattedTimeParts", e.formatNumber = "FormattedNumberParts", e.formatList = "FormattedListParts", e;
}(Ut || {});
function Wt(e) {
	let t = (t) => {
		let n = Vt(), { value: r, children: i, ...a } = t, o = typeof r == "string" ? new Date(r || 0) : r;
		return i(e === "formatDate" ? n.formatDateToParts(o, a) : n.formatTimeToParts(o, a));
	};
	return t.displayName = Ut[e], t;
}
function Gt(t) {
	let n = (n) => {
		let r = Vt(), { value: i, children: a, ...o } = n, s = r[t](i, o);
		if (typeof a == "function") return a(s);
		let l = r.textComponent || e.Fragment;
		return /* @__PURE__ */ c(l, { children: s });
	};
	return n.displayName = Ht[t], n;
}
function Kt(e) {
	return e && Object.keys(e).reduce((t, n) => {
		let r = e[n];
		return t[n] = Ie(r) ? Lt(r) : r, t;
	}, {});
}
var qt = (e, t, n, r, ...i) => {
	let a = ot(e, t, n, Kt(r), ...i);
	return Array.isArray(a) ? It(a) : a;
}, Jt = ({ defaultRichTextElements: e, ...t }, n) => {
	let r = Kt(e), i = Mt({
		...Ft,
		...t,
		defaultRichTextElements: r
	}, n), a = {
		locale: i.locale,
		timeZone: i.timeZone,
		fallbackOnEmptyString: i.fallbackOnEmptyString,
		formats: i.formats,
		defaultLocale: i.defaultLocale,
		defaultFormats: i.defaultFormats,
		messages: i.messages,
		onError: i.onError,
		defaultRichTextElements: r
	};
	return {
		...i,
		formatMessage: qt.bind(null, a, i.formatters),
		$t: qt.bind(null, a, i.formatters)
	};
};
function Yt(e, t) {
	let { values: n, ...r } = e, { values: i, ...a } = t;
	return Rt(i, n) && Rt(r, a);
}
function Xt(t) {
	let { formatMessage: n, textComponent: r = e.Fragment } = Vt(), { id: i, description: a, defaultMessage: o, values: l, children: u, tagName: d = r, ignoreTag: f } = t, p = n({
		id: i,
		description: a,
		defaultMessage: o
	}, l, { ignoreTag: f });
	return typeof u == "function" ? u(Array.isArray(p) ? p : [p]) : c(d || s, { children: p });
}
Xt.displayName = "FormattedMessage";
var Zt = e.memo(Xt, Yt);
Zt.displayName = "MemoizedFormattedMessage";
function Qt(e) {
	return {
		locale: e.locale,
		timeZone: e.timeZone,
		fallbackOnEmptyString: e.fallbackOnEmptyString,
		formats: e.formats,
		textComponent: e.textComponent,
		messages: e.messages,
		defaultLocale: e.defaultLocale,
		defaultFormats: e.defaultFormats,
		onError: e.onError,
		onWarn: e.onWarn,
		wrapRichTextChunksInFragment: e.wrapRichTextChunksInFragment,
		defaultRichTextElements: e.defaultRichTextElements
	};
}
function $t(t) {
	let n = e.useRef(Qe()), r = e.useRef(void 0), i = e.useRef(void 0), a = {};
	for (let e in t) t[e] !== void 0 && (a[e] = t[e]);
	let o = Qt({
		...Ft,
		...a
	});
	return (!r.current || !Rt(r.current, o)) && (r.current = o, i.current = Jt(o, n.current)), Pt(i.current), /* @__PURE__ */ c(Bt, {
		value: i.current,
		children: t.children
	});
}
$t.displayName = "IntlProvider";
var en = $t;
Gt("formatDate"), Gt("formatTime"), Gt("formatNumber"), Gt("formatList"), Gt("formatDisplayName"), Wt("formatDate"), Wt("formatTime");
//#endregion
//#region src/shared/intl/messages/en/common.json
var tn = {
	"common.productName": "ROS View",
	"common.theme": "Theme",
	"common.light": "Light",
	"common.dark": "Dark",
	"common.system": "System",
	"errors.loadFailed": "Failed to load",
	"errors.noRecordingsInArchive": "No supported recordings found in archive",
	"viewer.resizeSidebar": "Resize sidebar",
	"viewer.remoteUrlPrompt": "Enter remote recording or TAR URL (https://…)",
	"viewer.mergeToast.message": "Merged {name} into the current session",
	"viewer.mergeToast.action": "Switch to replace instead",
	"common.dialogClose": "Close"
}, nn = {
	"layout.panelTab.addReplaceCurrent": "Replace current panel",
	"layout.panelTab.addToRight": "Add to the right",
	"layout.panelTab.addToBelow": "Add below",
	"layout.panelTab.addToGroup": "Add to tab group",
	"layout.panelTab.addPanelSubmenu": "Add panel",
	"layout.panelTab.moreAria": "More tab actions",
	"layout.panelTab.moreTitle": "More actions",
	"layout.panelTab.openSettings": "Open settings",
	"layout.panelTab.openSettingsAria": "Open panel settings in sidebar",
	"layout.panelTab.openSettingsTitle": "Open settings in sidebar",
	"layout.panelTab.addPanelAria": "Add panel",
	"layout.panelTab.addPanelTitle": "Add panel",
	"layout.panelTab.closePanel": "Close panel",
	"layout.panelTab.closePanelAria": "Close this panel",
	"layout.panelTab.closePanelTitle": "Close panel",
	"layout.panelTab.context.close": "Close",
	"layout.panelTab.context.closeAllInGroup": "Close all in group",
	"layout.panelTab.context.resetPanel": "Reset panel",
	"layout.panelTab.context.copyPanelId": "Copy panel ID",
	"layout.panelTab.context.duplicatePanel": "Duplicate panel",
	"layout.welcomePanel.title": "Add a panel",
	"layout.welcomePanel.hint": "Select a panel type to open it here.",
	"layout.welcomePanel.desc.Image": "Display camera and compressed image topics",
	"layout.welcomePanel.desc.Plot": "Plot numeric ROS fields and arrays over time",
	"layout.welcomePanel.desc.JointStatePlot": "Plot joint position, velocity, and effort over time",
	"layout.welcomePanel.desc.3D": "Visualize 3D markers, transforms, and point clouds",
	"layout.welcomePanel.desc.Audio": "Play back ROS audio message streams",
	"layout.welcomePanel.desc.Pose": "Track PoseStamped trajectory on a 2D canvas",
	"layout.welcomePanel.desc.RawMessages": "Inspect deserialized message fields as a tree",
	"layout.welcomePanel.desc.Timeline": "View per-topic message density and frame drops",
	"layout.welcomePanel.desc.TopicGraph": "Explore topic publisher/subscriber connectivity",
	"layout.welcomePanel.desc.Align": "Diagnose multi-sensor timestamp synchronization",
	"layout.panelSuspense.loading": "Loading panel…"
}, rn = {
	"navbar.open": "Open",
	"navbar.openMenu": "Open recording",
	"navbar.menuFile": "File",
	"navbar.openLocalFile": "Local file…",
	"navbar.openLocalDir": "Local folder…",
	"navbar.openLocalTar": "Local TAR / TGZ…",
	"navbar.openRemoteUrl": "Remote URL…",
	"navbar.browseSamples": "Browse samples…",
	"navbar.recentOpens": "Recent",
	"navbar.recentOpensEmpty": "No recent files yet",
	"navbar.selectLanguage": "Select language",
	"navbar.sourceLoading": "Loading…",
	"navbar.exportLayout": "Export layout",
	"navbar.importLayout": "Import layout",
	"navbar.layoutMenu": "Layout",
	"navbar.saveLayout": "Save layout",
	"navbar.resetLayout": "Reset saved layout",
	"navbar.lang.en": "English",
	"navbar.lang.zh": "Simplified Chinese",
	"navbar.lang.ja": "Japanese",
	"navbar.reapplyAutoLayout": "Reapply auto layout",
	"navbar.goHome": "Back to home"
}, an = {
	"panels.image.defaultTitle": "Image",
	"panels.image.warning.annotationGap": "Some video frames have no matching annotation data.",
	"panels.image.status.waitingForAnnotation": "Buffering until the matching annotation is ready…",
	"panels.plot.defaultTitle": "Plot",
	"panels.plot.toolbar.selectTopic": "Select topic…",
	"panels.plot.toolbar.resetZoom": "Reset zoom",
	"panels.plot.toolbar.resetZoomAria": "Reset chart zoom",
	"panels.plot.status.detectingPaths": "Detecting paths…",
	"panels.plot.status.loading": "Loading…",
	"panels.plot.status.loadingProgress": "Loading {count} messages…",
	"panels.plot.status.sampling": "Sampled {percent}%",
	"panels.plot.empty.selectTopic": "Select a topic to plot numeric series",
	"panels.plot.empty.noNumericData": "No numeric data found",
	"panels.plot.warning.nonIndexedSource": "This source does not support random access by topic; sampling is limited and downsampling is forced.",
	"panels.plot.warning.downsampleLimited": "Downsampled to fit the point budget.",
	"panels.plot.warning.noNumericValues": "No numeric values found for {topic}.{path}",
	"panels.plot.warning.missingXPath": "Missing X path for {topic}.{path}",
	"panels.plot.warning.mismatchedXY": "Mismatched X/Y lengths for {topic}: {xPath} vs {yPath}",
	"panels.plot.settings.section.legend": "Legend",
	"panels.plot.settings.series.legend.title": "Curves",
	"panels.plot.settings.legend.description": "Select which curves from this topic to display on the chart. Uncheck to hide a curve.",
	"panels.plot.settings.legend.empty": "Curve list appears after data is loaded",
	"panels.plot.settings.legend.selectedCount": "{visible} / {total} selected",
	"panels.plot.settings.legend.selectAllAria": "Select all curves for this series",
	"panels.plot.legend.visibleCount": "{visible} / {total} curves",
	"panels.plot.legend.expand": "Expand legend",
	"panels.plot.legend.collapse": "Collapse legend",
	"panels.plot.legend.searchPlaceholder": "Search curves…",
	"panels.plot.legend.showAll": "Show all",
	"panels.plot.legend.hideAll": "Hide all",
	"panels.plot.legend.only": "Only",
	"panels.plot.legend.onlyThis": "Show only this curve",
	"panels.plot.legend.showCurve": "Show curve",
	"panels.plot.legend.hideCurve": "Hide curve",
	"panels.plot.legend.noMatches": "No matching curves",
	"panels.plot.settings.section.plot": "Plot",
	"panels.plot.settings.section.series": "Series",
	"panels.plot.settings.field.xAxis": "X axis",
	"panels.plot.settings.field.maxPoints": "Max points ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages": "Non-indexed max messages ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages.help": "Limit for streaming sources (e.g. ROS bag) that cannot random-access by topic.",
	"panels.plot.settings.field.jointStateFields": "JointState fields",
	"panels.plot.settings.field.jointStateFields.help": "Enabled array fields for JointState topics.",
	"panels.plot.settings.field.followingWindow": "Following window (seconds)",
	"panels.plot.settings.field.followingWindow.help": "0 disables follow mode.",
	"panels.plot.settings.field.syncX": "Sync X range",
	"panels.plot.settings.field.export": "Export",
	"panels.plot.settings.export.download": "Download CSV",
	"panels.plot.settings.series.title": "Series {index}",
	"panels.plot.settings.series.show": "Show series {index}",
	"panels.plot.settings.series.hide": "Hide series {index}",
	"panels.plot.settings.field.topic": "Topic",
	"panels.plot.settings.field.topicFields": "Topic fields",
	"panels.plot.settings.field.topicFields.help": "Select numeric message fields to plot.",
	"panels.plot.settings.field.topicFields.loading": "Detecting fields…",
	"panels.plot.settings.field.topicFields.empty": "No numeric fields detected.",
	"panels.plot.settings.field.yPath": "Y path",
	"panels.plot.settings.field.yPath.help": "Auto-detected when you pick a topic.",
	"panels.plot.settings.field.yPath.placeholder": "auto-detected",
	"panels.plot.settings.field.xPath": "X path",
	"panels.plot.settings.field.xPath.placeholder": "time[:] or x[:]",
	"panels.plot.settings.field.label": "Label",
	"panels.plot.settings.field.label.placeholder": "optional",
	"panels.plot.settings.field.timestampSource": "Timestamp source",
	"panels.plot.settings.field.lineStyle": "Line style",
	"panels.plot.settings.field.lineSize": "Line size",
	"panels.plot.settings.addSeries": "Add series",
	"panels.plot.settings.enum.xAxis.timestamp": "Timestamp",
	"panels.plot.settings.enum.xAxis.index": "Index",
	"panels.plot.settings.enum.xAxis.custom": "Custom X/Y",
	"panels.plot.settings.enum.xAxis.currentCustom": "Current custom X/Y",
	"panels.plot.settings.enum.xAxis.requiresArrayHint": "(needs array path)",
	"panels.plot.settings.enum.xAxis.requiresXPathHint": "(needs X path)",
	"panels.plot.settings.enum.timestamp.headerStamp": "Header stamp",
	"panels.plot.settings.enum.timestamp.receiveTime": "Receive time",
	"panels.plot.settings.enum.timestamp.publishTime": "Publish time",
	"panels.plot.settings.enum.lineStyle.solid": "Solid",
	"panels.plot.settings.enum.lineStyle.dashed": "Dashed",
	"panels.jointStatePlot.defaultTitle": "JointState Plot",
	"panels.threeD.defaultTitle": "3D View",
	"panels.audio.defaultTitle": "Audio",
	"panels.pose.defaultTitle": "Pose",
	"panels.rawMessages.defaultTitle": "Raw",
	"panels.timeline.defaultTitle": "Timeline",
	"panels.topicGraph.defaultTitle": "Topic Graph",
	"panels.align.defaultTitle": "Align",
	"panels.unavailable.defaultTitle": "Unavailable",
	"panels.urdfDebug.defaultTitle": "URDF Debug",
	"panels.jointStatePlot.fallback.missingHeaderStamp": "header.stamp missing; fell back to receiveTime",
	"panels.jointStatePlot.fallback.missingCustomPath": "Custom timestamp path invalid; fell back to receiveTime",
	"panels.jointStatePlot.panorama.waitJointState": "Waiting for JointState messages to determine joint count…",
	"panels.jointStatePlot.empty.configureSeries": "Add field paths or multi-series in sidebar settings, or enable JointState panorama.",
	"panels.jointStatePlot.invalidFields": "No valid fields: {labels}",
	"panels.jointStatePlot.rangeStatus.loading": "Loading…",
	"panels.jointStatePlot.rangeStatus.ready": "Ready",
	"panels.jointStatePlot.rangeStatus.error": "Error",
	"panels.jointStatePlot.seriesCount": "{count} series",
	"panels.jointStatePlot.timestamp.receiveTime": "receiveTime",
	"panels.jointStatePlot.timestamp.headerStamp": "headerStamp",
	"panels.jointStatePlot.timestamp.publishTime": "publishTime",
	"panels.jointStatePlot.timestamp.customField": "customField",
	"panels.pose.overlay.status": "Pose: {count} topic(s)",
	"panels.pose.overlay.tfFallback": "TF aligned mode unavailable, using raw frame pose fallback.",
	"panels.framework.topicPicker.placeholder": "Select topic…",
	"panels.framework.topicPicker.searchPlaceholder": "Search name or type…",
	"panels.framework.topicPicker.empty": "No matching topics",
	"panels.framework.topicPicker.imagePlaceholder": "Select image topic…",
	"panels.audio.topicPlaceholder": "Select audio topic…",
	"panels.audio.unlock": "Unlock audio",
	"panels.audio.infoCacheHint": "AudioInfo merged when present",
	"panels.audio.status.waitingTopic": "Select an audio topic",
	"panels.audio.status.waiting": "Waiting for audio…",
	"panels.audio.status.playing": "Receiving audio",
	"panels.audio.status.mutedNon1x": "Audio muted (playback is not 1×)",
	"panels.audio.status.unsupportedRawFormat": "Unsupported RawAudio format (need pcm-s16)",
	"panels.audio.status.unsupportedCoding": "Unsupported AudioInfo coding_format (compressed decode not enabled)",
	"panels.audio.status.unsupportedSampleFormat": "Unsupported sample_format for PCM decode",
	"panels.audio.status.invalidRaw": "Invalid RawAudio payload",
	"panels.audio.status.emptyPayload": "Empty audio payload",
	"panels.audio.status.unsupportedSchema": "Unsupported message type for this panel",
	"panels.audio.status.infoOnly": "AudioInfo topic cannot be used as main stream",
	"panels.align.timeMode.receiveTime": "Receive / record time (receive)",
	"panels.align.timeMode.headerStamp": "Message header stamp (falls back to receive)",
	"panels.align.section.main.title": "Main view",
	"panels.align.section.main.description": "Timeline, half-window, and scatter style are configured in the sidebar. Scroll the Align canvas to zoom the half-window (ms); values below stay in sync.",
	"panels.align.field.hint.label": "Hint",
	"panels.align.field.hint.body": "Topic names are not drawn on the canvas; hover a point for full topic and time.",
	"panels.align.section.topics.title": "Topics",
	"panels.align.section.topics.description": "Leave empty to show all image-class topics in the dataset.",
	"panels.align.field.topicList.label": "Topic list (one per line)",
	"panels.align.field.topicList.help": "sensor_msgs/Image or CompressedImage only.",
	"panels.align.section.timeline.title": "Timeline",
	"panels.align.field.horizontalTime.label": "Horizontal time",
	"panels.align.field.windowHalf.label": "Half-window (ms)",
	"panels.align.field.windowHalf.help": "Centered on current playback time, extend by this many ms on each side.",
	"panels.align.section.scatter.title": "Scatter appearance",
	"panels.align.field.dotRadius.label": "Dot radius (px)",
	"panels.align.field.dotOpacity.label": "Dot opacity",
	"panels.align.overlay.plot": "plot: {value}",
	"panels.align.overlay.receive": "receive: {value}",
	"panels.align.overlay.stamp": "stamp: {value}",
	"panels.align.overlay.stampNone": "stamp: (none)",
	"panels.timeline.empty": "No timeline data yet.",
	"panels.timeline.messageCount": "{count} msgs",
	"panels.timeline.durationSeconds": "time {seconds} s",
	"panels.timeline.durationUnavailable": "time -- s",
	"panels.timeline.currentTimeMarker": "Current playback time",
	"panels.framework.errorBoundary.title": "Panel crashed: {panelName}",
	"panels.framework.errorBoundary.instance": "Instance: {panelId}",
	"panels.framework.errorBoundary.unknownError": "Unknown error",
	"panels.framework.errorBoundary.resetButton": "Reset panel state",
	"panels.framework.unavailable.title": "Panel unavailable",
	"panels.framework.unavailable.instance": "Instance: {panelId}",
	"panels.framework.unavailable.type": "Type: {panelType}",
	"panels.topicGraph.toolbar.toggleOrientation": "Toggle orientation",
	"panels.topicGraph.toolbar.fitView": "Fit view",
	"panels.jointStatePlot.axis.time": "time",
	"panels.image.error.offscreenUnsupported": "OffscreenCanvas is unavailable in this browser context",
	"panels.topicGraph.empty.waitingMetadata": "Waiting for topic metadata…",
	"panels.audio.settings.section.source": "Source",
	"panels.audio.settings.field.audioTopic.label": "Audio topic",
	"panels.audio.settings.field.audioTopic.help": "RawAudio or audio_common_msgs audio stream.",
	"panels.audio.settings.field.audioTopic.placeholder": "/sensor/.../audio",
	"panels.audio.settings.field.audioInfoTopic.label": "AudioInfo topic (optional)",
	"panels.audio.settings.field.audioInfoTopic.help": "For AudioData / AudioDataStamped: explicit AudioInfo topic. Leave empty to try common suffixes (_info, /audio_info) or panel defaults.",
	"panels.audio.settings.field.audioInfoTopic.placeholder": "/audio_info",
	"panels.audio.settings.section.defaults": "Defaults (AudioData fallback)",
	"panels.audio.settings.field.defaultSampleRate": "Default sample rate: {rate} Hz",
	"panels.audio.settings.field.defaultChannels": "Default channels: {n}",
	"panels.audio.settings.field.defaultSampleFormat.label": "Default sample format",
	"panels.audio.settings.field.defaultSampleFormat.help": "e.g. S16LE, F32LE",
	"panels.audio.settings.section.playback": "Playback",
	"panels.audio.settings.field.volume": "Volume: {pct}%",
	"panels.audio.settings.field.mute": "Mute",
	"panels.audio.settings.section.display": "Display",
	"panels.audio.settings.field.waveformWindow": "Waveform window (s)",
	"panels.audio.settings.field.waveformColor": "Waveform color",
	"panels.timeline.settings.section.display": "Display",
	"panels.timeline.settings.field.showFrameDrops": "Show frame drops",
	"panels.topicGraph.settings.section.layout": "Layout",
	"panels.topicGraph.settings.field.orientation": "Orientation",
	"panels.topicGraph.settings.enum.rankDir.lr": "Left / Right",
	"panels.topicGraph.settings.enum.rankDir.tb": "Top / Bottom",
	"panels.topicGraph.settings.field.showInlineControls": "Show inline controls",
	"panels.rawMessages.settings.section.source": "Source",
	"panels.rawMessages.settings.field.topic": "Topic",
	"panels.rawMessages.settings.section.display": "Display",
	"panels.rawMessages.settings.field.uiRefreshHz": "UI refresh (Hz)",
	"panels.rawMessages.settings.field.uiRefreshHz.help": "Decouple UI redraw from incoming message rate",
	"panels.rawMessages.settings.field.pauseUpdates": "Pause updates",
	"panels.rawMessages.settings.field.latestOnly": "Latest-only mode",
	"panels.rawMessages.settings.field.latestOnly.help": "Always drop intermediate frames",
	"panels.rawMessages.settings.field.maxExpandedDepth": "Max expanded depth",
	"panels.rawMessages.settings.field.maxRows": "Max rows",
	"panels.rawMessages.settings.field.binaryPreviewBytes": "Binary preview bytes",
	"panels.rawMessages.settings.field.binaryPreviewBytes.help": "Show first N bytes for Uint8Array fields",
	"panels.rawMessages.settings.field.binaryCopyFormat": "Binary copy format",
	"panels.rawMessages.settings.enum.binaryCopy.uint8array": "Uint8Array",
	"panels.rawMessages.settings.enum.binaryCopy.hex": "Hex",
	"panels.rawMessages.settings.enum.binaryCopy.base64": "Base64",
	"panels.rawMessages.copy.success": "Copied {path}",
	"panels.rawMessages.copy.error": "Copy failed",
	"panels.pose.settings.section.source": "Source",
	"panels.pose.settings.field.schemaAuto.label": "Schema auto-detection",
	"panels.pose.settings.field.schemaAuto.help": "Pose panel automatically includes geometry_msgs/msg/PoseStamped.",
	"panels.pose.settings.field.topics.label": "Topics",
	"panels.pose.settings.field.topics.help": "Detected PoseStamped topics are selected by default.",
	"panels.pose.settings.button.selectAll": "Select all",
	"panels.pose.settings.button.clearAll": "Clear all",
	"panels.pose.settings.empty.noPoseStamped": "No PoseStamped topics found in current data source.",
	"panels.pose.settings.field.color": "Color",
	"panels.pose.settings.section.trajectory": "Trajectory",
	"panels.pose.settings.field.historyWindow": "History window: {sec}s",
	"panels.pose.settings.field.minLineWidth": "Min line width: {px}px",
	"panels.pose.settings.field.maxLineWidth": "Max line width: {px}px",
	"panels.pose.settings.section.pose": "Pose",
	"panels.pose.settings.field.showOrientation": "Show orientation",
	"panels.pose.settings.field.orientationScale": "Orientation scale: {scale}",
	"panels.pose.settings.section.frame": "Frame",
	"panels.pose.settings.field.frameMode": "Frame mode",
	"panels.pose.settings.enum.frameMode.raw": "Raw frame",
	"panels.pose.settings.enum.frameMode.tfAligned": "TF aligned",
	"panels.pose.settings.field.targetFrame.label": "Target frame",
	"panels.pose.settings.field.targetFrame.help": "Only used in TF aligned mode. Falls back to raw frame when TF is unavailable.",
	"panels.pose.settings.field.targetFrame.placeholder": "map",
	"panels.jointStatePlot.settings.section.source": "Source",
	"panels.jointStatePlot.settings.field.topic": "Topic",
	"panels.jointStatePlot.settings.section.sampling": "Sampling",
	"panels.jointStatePlot.settings.field.timestampSource": "Timestamp source",
	"panels.jointStatePlot.settings.enum.timestamp.headerStamp": "Header stamp",
	"panels.jointStatePlot.settings.enum.timestamp.receiveTime": "Receive time",
	"panels.jointStatePlot.settings.enum.timestamp.publishTime": "Publish time",
	"panels.jointStatePlot.settings.field.maxPointsPerJoint": "Max points per joint: {n}",
	"panels.jointStatePlot.toolbar.field.position": "position",
	"panels.jointStatePlot.toolbar.field.velocity": "velocity",
	"panels.jointStatePlot.toolbar.field.effort": "effort",
	"panels.jointStatePlot.filter.allJoints": "All joints",
	"panels.jointStatePlot.empty.selectTopic": "Select a JointState topic above",
	"panels.jointStatePlot.empty.waitingData": "Waiting for JointState data…",
	"panels.threeD.settings.section.display": "Display",
	"panels.threeD.settings.field.showGrid": "Show grid",
	"panels.threeD.settings.field.showAxes": "Show axes",
	"panels.threeD.settings.field.showPlaceholder": "Show placeholder",
	"panels.threeD.settings.field.pointSize": "Point size: {n}",
	"panels.threeD.settings.field.pointSize.help": "Size of point-cloud points, in metres.",
	"panels.threeD.settings.section.urdf": "URDF",
	"panels.threeD.settings.section.urdf.description": "Where to load the robot description from.",
	"panels.threeD.settings.field.urdfSource": "Source",
	"panels.threeD.settings.enum.urdfSource.topic": "ROS topic",
	"panels.threeD.settings.enum.urdfSource.url": "URL",
	"panels.threeD.settings.enum.urdfSource.file": "Upload file",
	"panels.threeD.settings.field.urdfTopic.label": "Topic",
	"panels.threeD.settings.field.urdfTopic.help": "Leave empty to auto-detect (first topic whose name contains `robot_description`).",
	"panels.threeD.settings.field.urdfUrl.label": "URL",
	"panels.threeD.settings.field.urdfUrl.help": "http(s):// or package:// URL pointing to the URDF XML file.",
	"panels.threeD.settings.field.uploadUrdf": "Upload URDF XML",
	"panels.threeD.settings.field.fileInput.replace": "Replace file…",
	"panels.threeD.settings.field.fileInput.choose": "Choose file…",
	"panels.threeD.settings.field.urdfPreview": "Preview ({n} chars)",
	"panels.threeD.settings.field.urdfPreview.help": "Read-only preview of the uploaded URDF. Edit in your local tool and re-upload.",
	"panels.threeD.settings.section.topics": "Topics",
	"panels.threeD.settings.section.topics.description": "One topic per line: /topic mode=color. Modes: auto, path, pose, marker, laserScan, depth, skeleton.",
	"panels.threeD.settings.field.topicSettings": "Topic settings",
	"panels.threeD.settings.section.bvh": "BVH Skeleton",
	"panels.threeD.settings.section.bvh.description": "Default transform and style for BVH skeleton line rendering.",
	"panels.threeD.settings.field.skeletonEnabled": "Enable skeleton rendering",
	"panels.threeD.settings.field.skeletonStyle": "Skeleton style",
	"panels.threeD.settings.enum.skeletonStyle.stick": "Box-link stickman",
	"panels.threeD.settings.enum.skeletonStyle.line": "Green lines",
	"panels.threeD.settings.field.skeletonScale": "Scale: {n}",
	"panels.threeD.settings.field.skeletonScale.help": "Scale applied to BVH coordinates before rendering.",
	"panels.threeD.settings.field.yUpToZUp": "Convert Y-up to Z-up",
	"panels.threeD.settings.field.flipYAfterConversion": "Flip Y axis after conversion",
	"panels.threeD.settings.field.skeletonColor": "Skeleton color",
	"panels.image.settings.section.source": "Source",
	"panels.image.settings.field.topic.label": "Topic",
	"panels.image.settings.field.topic.help": "ROS image topic (compressed or raw).",
	"panels.image.settings.field.topic.placeholder": "/camera/.../image_raw",
	"panels.image.settings.field.annotationTopic.label": "Annotations",
	"panels.image.settings.field.annotationTopic.help": "foxglove.ImageAnnotations topic drawn over the image.",
	"panels.image.settings.field.annotationTopic.placeholder": "Select annotations topic",
	"panels.image.settings.field.annotationVisible": "Show annotations",
	"panels.image.settings.section.display": "Display",
	"panels.image.settings.field.showStatusText": "Show status text",
	"panels.image.settings.field.backgroundColor": "Background color",
	"panels.image.settings.field.fitMode": "Fit mode",
	"panels.image.settings.field.smoothing": "Smoothing",
	"panels.image.settings.section.transform": "Transform",
	"panels.image.settings.field.flipHorizontal": "Flip horizontal",
	"panels.image.settings.field.flipVertical": "Flip vertical",
	"panels.image.settings.field.rotation": "Rotation",
	"panels.image.settings.field.rotation.help": "Clockwise angle in degrees (0–360).",
	"panels.image.settings.section.color": "Color (raw / depth)",
	"panels.image.settings.colorHint.directRgb": "Colour encoding {encoding} — pixel colours come directly from the data. No remapping applied.",
	"panels.image.settings.colorHint.encodingPending": "Waiting for the first frame — depth/range controls use default bounds until encoding is detected.",
	"panels.image.settings.field.colorMode": "Color mode",
	"panels.image.settings.field.flatColor": "Flat color",
	"panels.image.settings.field.gradientStart": "Gradient start",
	"panels.image.settings.field.gradientEnd": "Gradient end",
	"panels.image.settings.field.colormap": "Colormap",
	"panels.image.settings.field.opacity": "Opacity",
	"panels.image.settings.field.opacity.help": "Alpha multiplier (0 = transparent, 1 = opaque).",
	"panels.image.settings.field.minValue": "Min value",
	"panels.image.settings.field.minValue.help": "Drag slider — values below this are clipped to the start colour. Slider range: {min}–{max}.",
	"panels.image.settings.field.maxValue": "Max value",
	"panels.image.settings.field.maxValue.help": "Drag slider — values above this are clipped to the end colour. Slider range: {min}–{max}.",
	"panels.image.settings.enum.fitMode.contain": "Contain",
	"panels.image.settings.enum.fitMode.cover": "Cover",
	"panels.image.settings.enum.rotation.deg0": "0°",
	"panels.image.settings.enum.rotation.deg90": "90°",
	"panels.image.settings.enum.rotation.deg180": "180°",
	"panels.image.settings.enum.rotation.deg270": "270°",
	"panels.image.settings.enum.colorMode.colormap": "Colormap",
	"panels.image.settings.enum.colorMode.gradient": "Gradient",
	"panels.image.settings.enum.colorMode.flat": "Flat",
	"panels.image.settings.enum.colorMode.rgb": "RGB packed",
	"panels.image.settings.enum.colorMode.rgba": "RGBA packed",
	"panels.image.settings.enum.colorMode.rgbaFields": "RGBA separate fields",
	"panels.image.settings.enum.colorMap.turbo": "Turbo",
	"panels.image.settings.enum.colorMap.rainbow": "Rainbow",
	"panels.jointStatePlot.filter.partial": "{current}/{total}",
	"urdfDebug.defaultTitle": "URDF Debug",
	"urdfDebug.section.input": "Input",
	"urdfDebug.section.appearance": "Appearance",
	"urdfDebug.section.joints": "Joint pose",
	"urdfDebug.section.export": "Export",
	"urdfDebug.field.jointTopic": "JointState topic",
	"urdfDebug.field.urdfRequired": "URDF file (required)",
	"urdfDebug.upload.dropUrdfTitle": "Drop URDF file here",
	"urdfDebug.upload.dropUrdfHint": "Supports .urdf and .xml — drag and drop or click to browse",
	"urdfDebug.upload.dropMeshTitle": "Drop mesh folder here",
	"urdfDebug.upload.dropMeshHint": "Drag a folder containing .stl, .dae, or .obj files, or click to browse",
	"urdfDebug.upload.browse": "Browse files",
	"urdfDebug.upload.invalidUrdf": "Please drop a .urdf or .xml file.",
	"urdfDebug.upload.invalidMesh": "No mesh files (.stl, .dae, .obj) found in the selection.",
	"urdfDebug.resizeSettings": "Resize settings panel",
	"urdfDebug.field.meshOptional": "Mesh files (optional)",
	"urdfDebug.field.meshStrategy": "Mesh strategy",
	"urdfDebug.field.packageBaseUrl": "Package base URL",
	"urdfDebug.field.packageName": "Package name",
	"urdfDebug.field.visualRpyOffset": "Visual RPY offset",
	"urdfDebug.selectTopic": "Select topic",
	"urdfDebug.selectJointStateTopic": "Select JointState topic",
	"urdfDebug.section.meshResources": "Mesh resources",
	"urdfDebug.meshBase.hint": "Resolve package:// mesh paths in the URDF. Pick a local folder containing meshes/, or enter a remote base URL and click Apply.",
	"urdfDebug.meshBase.mode.localFolder": "Local folder",
	"urdfDebug.meshBase.mode.remoteUrl": "Remote base URL (HTTP/HTTPS)",
	"urdfDebug.meshBase.pickFolder": "Choose folder…",
	"urdfDebug.meshBase.folderSelected": "Folder “{folder}” · {count} mesh files",
	"urdfDebug.meshBase.folderEmpty": "No folder selected yet.",
	"urdfDebug.meshBase.remotePlaceholder": "https://your-host/resources/Robot/meshes",
	"urdfDebug.meshBase.apply": "Apply",
	"urdfDebug.meshBase.applied": "Applied base URL",
	"urdfDebug.meshBase.remoteNotApplied": "Enter a URL and click Apply to resolve mesh links.",
	"urdfDebug.meshBase.remoteInvalid": "Enter a valid http:// or https:// URL.",
	"urdfDebug.meshBase.detectPackage": "Detect from URDF",
	"urdfDebug.meshBase.resolvedTitle": "Resolved mesh URLs",
	"urdfDebug.meshBase.refresh": "Recheck",
	"urdfDebug.meshBase.checking": "Checking mesh URLs…",
	"urdfDebug.meshBase.summary": "{ok} / {total} reachable · {failed} issues",
	"urdfDebug.meshStatus.pending": "Checking",
	"urdfDebug.meshStatus.ok": "Reachable",
	"urdfDebug.meshStatus.local": "Loaded from folder",
	"urdfDebug.meshStatus.missing": "Not resolved",
	"urdfDebug.meshStatus.error": "Load error",
	"urdfDebug.meshStatus.cors": "CORS blocked (may still render in 3D)",
	"urdfDebug.meshStatus.unchecked": "Not checked",
	"urdfDebug.meshStrategy.packageBaseUrl": "Package base URL",
	"urdfDebug.meshStrategy.leaveAsIs": "Leave as-is",
	"urdfDebug.rotateMeshVisuals": "Rotate mesh visuals",
	"urdfDebug.rotateMeshVisualsHint": "Turn on when the model looks tilted or lying on its side (common for CAD-exported STL, e.g. Tron2, Unitree G1). Turn off when the model already stands upright. Exported scripts write the chosen orientation into the URDF.",
	"urdfDebug.preview.empty": "Upload a URDF file to preview the robot.",
	"urdfDebug.preview.emptyTopicNoSelection": "Select a /robot_description topic or open a recording that contains one.",
	"urdfDebug.preview.emptyTopicWaiting": "Subscribed to {topic}; waiting for URDF string message…",
	"urdfDebug.preview.error": "URDF preview failed: {message}",
	"urdfDebug.preview.emptyModel": "No visible geometry ({failed}/{total} meshes failed, {visible} visible links)",
	"urdfDebug.preview.issueLine": "{url}: {reason}",
	"urdfDebug.preview.moreIssues": "+{count} more issues",
	"urdfDebug.input.source.file": "Upload URDF file",
	"urdfDebug.input.source.topic": "From MCAP topic (std_msgs/String)",
	"urdfDebug.input.topicLoaded": "Loaded from {topic} · {bytes} bytes",
	"urdfDebug.input.topicWaiting": "Waiting for first message on {topic}…",
	"urdfDebug.input.topicAutoDetectHint": "Leave empty to auto-detect a topic whose name contains robot_description.",
	"urdfDebug.preview.title": "URDF Preview · rotate mesh: {rotateMesh}",
	"urdfDebug.preview.rotateMeshOn": "ON",
	"urdfDebug.preview.rotateMeshOff": "OFF",
	"urdfDebug.preview.loadingMesh": "Loading mesh {loaded}/{total}",
	"urdfDebug.showGrid": "Show grid",
	"urdfDebug.showAxes": "Show axes",
	"urdfDebug.joints.followLive": "Follow MCAP JointState",
	"urdfDebug.joints.noJointStateTopics": "No JointState topics found in this recording.",
	"urdfDebug.joints.selectJointStateTopicHint": "Choose a JointState topic to drive the preview.",
	"urdfDebug.joints.waitingForJointState": "Subscribed to {topic}; waiting for JointState messages…",
	"urdfDebug.joints.resetAll": "Reset all",
	"urdfDebug.joints.filter": "Filter joints…",
	"urdfDebug.joints.uploadUrdfHint": "Upload a URDF to configure joint sliders.",
	"urdfDebug.joints.noMatch": "No joints match the filter.",
	"urdfDebug.joints.manualUnsupported": "Manual tuning not supported for this joint type.",
	"urdfDebug.joints.fixedJoint": "Fixed joint (no slider).",
	"urdfDebug.jointType.revolute": "revolute",
	"urdfDebug.jointType.prismatic": "prismatic",
	"urdfDebug.jointType.continuous": "continuous",
	"urdfDebug.jointType.fixed": "fixed",
	"urdfDebug.jointType.planar": "planar",
	"urdfDebug.jointType.floating": "floating",
	"urdfDebug.action.autoMatch": "Auto match",
	"urdfDebug.action.symmetricPair": "Symmetric pair",
	"urdfDebug.action.mimicFill": "Mimic fill",
	"urdfDebug.action.invertFirst": "Invert first",
	"urdfDebug.action.gripper01": "Gripper 0-1",
	"urdfDebug.action.xArm851": "xArm 851",
	"urdfDebug.noRules": "No rules yet.",
	"urdfDebug.diag.jointTopic": "Joint topic",
	"urdfDebug.diag.existingTf": "Existing /tf",
	"urdfDebug.diag.existingRobotDescription": "Existing /robot_description",
	"urdfDebug.diag.robot": "Robot",
	"urdfDebug.diag.linksJoints": "Links / joints",
	"urdfDebug.diag.matchCoverage": "Match coverage",
	"urdfDebug.diag.generatedTfCount": "Generated TF count",
	"urdfDebug.diag.unmatchedInputJoints": "Unmatched input joints",
	"urdfDebug.diag.missingUrdfJoints": "Missing URDF joints",
	"urdfDebug.diag.meshIssues": "Mesh issues",
	"urdfDebug.diag.missing": "Missing",
	"urdfDebug.yes": "Yes",
	"urdfDebug.no": "No",
	"urdfDebug.rule.inputJoint": "Input joint",
	"urdfDebug.rule.urdfJoint": "URDF joint",
	"urdfDebug.rule.rename": "Rename",
	"urdfDebug.rule.linear": "Linear",
	"urdfDebug.rule.constant": "Constant",
	"urdfDebug.rule.ignore": "Ignore",
	"urdfDebug.help.body": "Upload a URDF and tune joint mapping until the preview matches your recording. Toggle Rotate mesh visuals when mesh orientation looks wrong (common for CAD exports). Use Symmetric pair for left/right gripper joints and Mimic fill to apply URDF mimic tags. Export recipe.json or a processing script to rewrite MCAP with /robot_description and /tf."
}, on = {
	"playback.annotationsEmpty": "No annotation ranges",
	"playback.buffering": "Buffering playback",
	"playback.play": "Play playback",
	"playback.pause": "Pause playback",
	"playback.timeMode.relative.aria": "Relative time from log start; click to switch to absolute local time",
	"playback.timeMode.absolute.aria": "Absolute local date and time; click to switch to relative time",
	"playback.timeMode.relative.title": "Relative time (from log start). Click to use absolute local date and time.",
	"playback.timeMode.absolute.title": "Absolute local date and time. Click to use relative time from log start.",
	"playback.stepBack.aria": "Step backward one message",
	"playback.stepBack.title": "Step back one message (hold Alt: step by time, default 10 ms; Alt+Ctrl/Cmd: 100 ms)",
	"playback.stepForward.aria": "Step forward one message",
	"playback.stepForward.title": "Step forward one message (hold Alt: step by time)",
	"playback.speed.aria": "Playback speed",
	"playback.samplingFps.aria": "Sampling FPS",
	"playback.loop.aria": "Playback loop mode",
	"playback.loop.loop": "Loop",
	"playback.loop.once": "Once"
}, sn = {
	"quality.title": "Quality",
	"quality.empty": "No report.",
	"quality.header.scanWithPct": "Scanned {scanned} / {total} ({pct}%){suffix}",
	"quality.header.scanNoPct": "Scanned {scanned} / {total}{suffix}",
	"quality.scan.start": "Start scan",
	"quality.scan.rescan": "Rescan",
	"quality.scan.auto": "Auto scan small files",
	"quality.scan.idleHint": "Quality scan is idle. Start manually when needed to avoid blocking large files.",
	"quality.scan.skippedLargeFile": "Skipped automatic scan for {total} messages. Files above {limit} messages are scanned manually to keep playback responsive.",
	"quality.scan.failed": "Quality scan failed. Try rescanning or inspect the file format.",
	"quality.status.scanning": "{scanned}/{total}…",
	"quality.status.ready": "{scanned}/{total}",
	"quality.noMatches": "No issues found",
	"quality.noFilterMatches": "No matching incidents",
	"quality.count": "{count}×",
	"quality.maxMagnitude": "Δmax {ms} ms",
	"quality.trend": "Trend",
	"quality.clockSource": "Clock",
	"quality.clock.header": "Header",
	"quality.clock.log": "Log",
	"quality.scope": "Scope",
	"quality.scope.topic": "Topic",
	"quality.scope.group": "Group",
	"quality.scope.global": "Global",
	"quality.baselineInterval": "Baseline Δt",
	"quality.beforeVsAnomaly": "Before / anomaly Δt",
	"quality.afterInterval": "After Δt",
	"quality.chart.time": "time",
	"quality.chart.deltaNs": "Δt",
	"quality.chart.zoomHint": "Drag to zoom",
	"quality.chart.resetZoom": "Reset zoom",
	"quality.chart.axis.deviation": "Frame interval deviation",
	"quality.evidence.zone.before": "before",
	"quality.evidence.zone.anomaly": "anomaly",
	"quality.evidence.zone.after": "after",
	"quality.flag.rollback": "reverse",
	"quality.flag.dropEstimate": "gap est.",
	"quality.clearFilter": "Clear filter",
	"quality.type.timestamp_rollback": "Rollback",
	"quality.type.topic_frame_drop": "Topic drop",
	"quality.summary.timestamp_rollback": "{clock}: rollback {ms} ms",
	"quality.summary.topic_frame_drop": "{clock}: gap ~{ms} ms",
	"quality.summary.generic": "{clock}: Δ ~{ms} ms",
	"quality.incident.title.timestamp_rollback": "{topic} timestamp rollback",
	"quality.incident.title.topic_frame_drop": "{topic} frame gap",
	"quality.incident.title.generic": "Quality incident",
	"quality.incident.impact.timestamp_rollback": "{count} rollback errors, max rollback {ms} ms.",
	"quality.incident.impact.topic_frame_drop": "{count} gap errors, max gap over average {ms} ms.",
	"quality.incident.impact.generic_timing": "{count} timing anomaly points across {topicCount} topics, max deviation {ms} ms.",
	"quality.incident.recommendation.timestamp_rollback": "Inspect the sensor driver clock/source timestamp. Prefer log time around this segment if header time is unstable.",
	"quality.incident.recommendation.frame_drop": "Check publisher frequency, QoS, and transport pressure for the affected topic group.",
	"quality.incident.recommendation.generic": "Review the affected messages around this time.",
	"quality.mergedSources": "{n} merged",
	"quality.chart.balancedLegend": "B{b} · A{a} · N{n}",
	"quality.overview": "Incident overview",
	"quality.incidentCount": "{count} errors",
	"quality.tabs.chart": "Chart",
	"quality.tabs.table": "Raw data",
	"quality.metric.anomalyPoints": "Anomaly {count}",
	"quality.metric.maxDeviation": "Max |Δ| {value} ms",
	"quality.metric.topicCount": "Topics {count}",
	"quality.details.topic": "Topic",
	"quality.details.noTopic": "No topic",
	"quality.details.noRows": "No raw points",
	"quality.details.table.index": "Index",
	"quality.details.table.logTime": "Log time",
	"quality.details.table.headerTime": "Header time",
	"quality.details.table.deviation": "Deviation",
	"quality.details.table.zone": "Zone",
	"quality.filter.all": "All",
	"quality.filter.error": "Severe",
	"quality.filter.warn": "Warn",
	"quality.filter.allTypes": "All types",
	"quality.filter.search": "Search topic or group",
	"quality.recommendation": "Suggestion"
}, cn = {
	"sidebar.tab.topics": "Topics",
	"sidebar.tab.datasets": "Data",
	"sidebar.tab.quality": "Quality",
	"sidebar.tab.settings": "Settings",
	"sidebar.settings.noActivePanel": "Select a panel to edit its settings.",
	"sidebar.settings.noSettings": "This panel does not expose any settings.",
	"sidebar.topicFilter": "Filter topics…",
	"sidebar.topicMeta": "{count} msgs",
	"sidebar.topicRow.actionsMenu": "Topic actions",
	"sidebar.topicRow.copyTopicName": "Copy topic name",
	"sidebar.topicRow.copySchemaName": "Copy schema name",
	"sidebar.topicRow.sourceFiles": "Source: {files}",
	"sidebar.topicDropTitle": "Drop here to open Raw Messages",
	"sidebar.topicDropSubtitle": "Release to create a Raw Messages panel",
	"sidebar.datasetSize": "{size}",
	"sidebar.datasetDuration": "{sec}s",
	"sidebar.datasetTopics": "{n} topics",
	"sidebar.datasetGroup.fileCount": "{count} files merged",
	"sidebar.openFile": "Add file",
	"sidebar.openDirectory": "Open Directory",
	"sidebar.noTopics": "No topics found",
	"sidebar.noDatasets": "No files loaded",
	"sidebar.displayMulti": "Multi",
	"sidebar.displayAgg": "Agg"
}, ln = {
	"welcome.heroEyebrow": "Recording viewer",
	"welcome.tagline": "Open MCAP, bag, db3, or HDF5 — locally, from a URL, or from a tar.",
	"welcome.heroSubtitle": "Browse local ROS or HDF5 recordings — without uploading to the cloud.",
	"welcome.badgeLocalFirst": "Runs locally in your browser",
	"welcome.samplesSectionHint": "Open curated examples with cover images.",
	"welcome.footerDevelopedBy": "Developed by ",
	"welcome.footerOrgName": "IO-AI.TECH",
	"welcome.footerDevelopedSuffix": ", open source on ",
	"welcome.footerOpenSourceLink": "GitHub",
	"welcome.footerOpenSourceSuffix": ".",
	"welcome.historyTitle": "Recent",
	"welcome.historyExpand": "Show all history",
	"welcome.historyCollapse": "Show less",
	"welcome.historyEmpty": "No recent items yet.",
	"welcome.historyPermissionDenied": "Could not read the saved file or folder — grant permission or pick the item again.",
	"welcome.historyFileCount": "{count} files",
	"welcome.historyFolderPicker": "Folder",
	"welcome.historyDroppedFiles": "Dropped files",
	"welcome.historyFromFilePicker": "Local file picker",
	"welcome.historyEmptyDirectory": "No supported recordings found in that folder.",
	"welcome.historyNoSupportedRecordings": "No supported recordings in the saved selection.",
	"welcome.urlLocalRestoreMiss": "Could not restore this local file or folder from history — pick it again or open it from Recent.",
	"welcome.sampleManifestNotConfigured": "Sample catalog is not configured — set VITE_SAMPLE_DATASETS_MANIFEST_URL or VITE_SAMPLES_BASE_URL at build time.",
	"welcome.sampleIdNotFound": "No sample dataset with id “{id}” in the catalog.",
	"welcome.historyKindUrl": "URL",
	"welcome.historyKindRemoteTar": "Remote tar",
	"welcome.historyKindSample": "Sample",
	"welcome.historyKindFolder": "Folder",
	"welcome.historyKindFiles": "Files",
	"welcome.historyKindTar": "Tar",
	"welcome.tabFile": "File",
	"welcome.tabDirectory": "Folder",
	"welcome.tabRemote": "URL",
	"welcome.tabTar": "Archive",
	"welcome.openLocalTar": "Tar / tgz",
	"welcome.tarHint": "Contains recordings",
	"welcome.remoteUrlPlaceholder": "https://…/file.mcap",
	"welcome.remoteUrlErrorRequired": "Enter a URL.",
	"welcome.remoteUrlErrorInvalid": "Use http:// or https://",
	"welcome.remoteUrlErrorUnsupported": "Use .mcap, .bag, .db3, .hdf5, .h5, or .tar / .tgz",
	"welcome.opening": "Opening…",
	"welcome.open": "Open",
	"welcome.samplesSectionTitle": "Samples",
	"welcome.samplesLoading": "Loading…",
	"welcome.samplesEmpty": "No samples configured.",
	"welcome.samplesDialogTitle": "Samples",
	"welcome.samplesDialogDescription": "Choose one to open.",
	"welcome.openFile": "Choose file",
	"welcome.openDirectory": "Choose folder",
	"welcome.fileTypes": "mcap · bag · db3 · hdf5 · bvh",
	"welcome.directoryHint": "All matching files in folder",
	"welcome.loadingTitle": "Loading",
	"welcome.loadingPhase.preparing": "Preparing…",
	"welcome.loadingSpeed": "{speed}/s",
	"welcome.loadingEtaSeconds": "about {n}s",
	"welcome.loadingEtaMinutes": "about {n} min",
	"welcome.loadingEtaHours": "about {n} hr",
	"welcome.cancelLoading": "Cancel",
	"welcome.manualOpenFileHint": "Please manually open the {name} file.",
	"welcome.manualOpenFolderHint": "Please manually open the {name} folder."
}, un = {
	"common.productName": "ROS View",
	"common.theme": "テーマ",
	"common.light": "ライト",
	"common.dark": "ダーク",
	"common.system": "システムに合わせる",
	"errors.loadFailed": "読み込みに失敗しました",
	"errors.noRecordingsInArchive": "アーカイブ内に対応する録画が見つかりません",
	"viewer.resizeSidebar": "サイドバーの幅を変更",
	"viewer.remoteUrlPrompt": "リモートの録画または TAR の URL を入力（https://…）",
	"viewer.mergeToast.message": "{name} を現在のセッションに統合しました",
	"viewer.mergeToast.action": "置き換えに切り替える",
	"common.dialogClose": "閉じる"
}, dn = {
	"layout.panelTab.addReplaceCurrent": "現在のパネルを置き換え",
	"layout.panelTab.addToRight": "右に追加",
	"layout.panelTab.addToBelow": "下に追加",
	"layout.panelTab.addToGroup": "タブグループに追加",
	"layout.panelTab.addPanelSubmenu": "パネルを追加",
	"layout.panelTab.moreAria": "タブのその他の操作",
	"layout.panelTab.moreTitle": "その他の操作",
	"layout.panelTab.openSettings": "設定を開く",
	"layout.panelTab.openSettingsAria": "サイドバーでパネル設定を開く",
	"layout.panelTab.openSettingsTitle": "サイドバーで設定を開く",
	"layout.panelTab.addPanelAria": "パネルを追加",
	"layout.panelTab.addPanelTitle": "パネルを追加",
	"layout.panelTab.closePanel": "パネルを閉じる",
	"layout.panelTab.closePanelAria": "このパネルを閉じる",
	"layout.panelTab.closePanelTitle": "パネルを閉じる",
	"layout.panelTab.context.close": "閉じる",
	"layout.panelTab.context.closeAllInGroup": "グループ内をすべて閉じる",
	"layout.panelTab.context.resetPanel": "パネルをリセット",
	"layout.panelTab.context.copyPanelId": "パネル ID をコピー",
	"layout.panelTab.context.duplicatePanel": "パネルを複製",
	"layout.welcomePanel.title": "パネルを追加",
	"layout.welcomePanel.hint": "パネル種類を選ぶとここに開きます。",
	"layout.welcomePanel.desc.Image": "カメラと圧縮画像トピックを表示",
	"layout.welcomePanel.desc.Plot": "ROS の数値フィールドと配列をプロット",
	"layout.welcomePanel.desc.JointStatePlot": "関節位置・速度・トルクを時間でプロット",
	"layout.welcomePanel.desc.3D": "3D マーカー、座標変換、点群を可視化",
	"layout.welcomePanel.desc.Audio": "ROS オーディオメッセージを再生",
	"layout.welcomePanel.desc.Pose": "PoseStamped の軌跡を 2D キャンバスで追跡",
	"layout.welcomePanel.desc.RawMessages": "デシリアライズ済みフィールドをツリーで確認",
	"layout.welcomePanel.desc.Timeline": "トピックごとのメッセージ密度とフレームドロップを表示",
	"layout.welcomePanel.desc.TopicGraph": "トピックの pub/sub 接続を探索",
	"layout.welcomePanel.desc.Align": "マルチセンサのタイムスタンプ同期を診断",
	"layout.panelSuspense.loading": "パネルを読み込み中…"
}, fn = {
	"navbar.open": "開く",
	"navbar.openMenu": "録画を開く",
	"navbar.menuFile": "ファイル",
	"navbar.openLocalFile": "ローカルファイル…",
	"navbar.openLocalDir": "ローカルフォルダ…",
	"navbar.openLocalTar": "ローカル TAR / TGZ…",
	"navbar.openRemoteUrl": "リモート URL…",
	"navbar.browseSamples": "サンプルを見る…",
	"navbar.recentOpens": "最近使ったファイル",
	"navbar.recentOpensEmpty": "最近のファイルはありません",
	"navbar.selectLanguage": "言語を選択",
	"navbar.sourceLoading": "読込中…",
	"navbar.exportLayout": "レイアウトを書き出し",
	"navbar.importLayout": "レイアウトを読込",
	"navbar.layoutMenu": "レイアウト",
	"navbar.saveLayout": "レイアウトを保存",
	"navbar.resetLayout": "保存したレイアウトを削除",
	"navbar.lang.en": "English",
	"navbar.lang.zh": "中文",
	"navbar.lang.ja": "日本語",
	"navbar.reapplyAutoLayout": "自動レイアウトを再適用",
	"navbar.goHome": "ホームへ戻る"
}, pn = {
	"panels.image.defaultTitle": "画像",
	"panels.image.warning.annotationGap": "一部の映像フレームに一致する注釈データがありません。",
	"panels.image.status.waitingForAnnotation": "一致する注釈の準備ができるまでバッファリングしています…",
	"panels.plot.defaultTitle": "プロット",
	"panels.plot.toolbar.selectTopic": "トピックを選択…",
	"panels.plot.toolbar.resetZoom": "ズームをリセット",
	"panels.plot.toolbar.resetZoomAria": "グラフのズームをリセット",
	"panels.plot.status.detectingPaths": "パスを検出中…",
	"panels.plot.status.loading": "読み込み中…",
	"panels.plot.status.loadingProgress": "読み込み中 {count} 件",
	"panels.plot.status.sampling": "サンプリング {percent}%",
	"panels.plot.empty.selectTopic": "数値系列を描画するトピックを選択してください",
	"panels.plot.empty.noNumericData": "数値データが見つかりません",
	"panels.plot.warning.nonIndexedSource": "このソースはトピック単位のランダムアクセスに非対応のため、サンプリングを制限し強制ダウンサンプルします。",
	"panels.plot.warning.downsampleLimited": "点数上限に合わせてダウンサンプルしました。",
	"panels.plot.warning.noNumericValues": "数値が見つかりません: {topic}.{path}",
	"panels.plot.warning.missingXPath": "X パスがありません: {topic}.{path}",
	"panels.plot.warning.mismatchedXY": "X/Y の長さが一致しません {topic}: {xPath} vs {yPath}",
	"panels.plot.settings.section.legend": "凡例",
	"panels.plot.settings.series.legend.title": "曲線",
	"panels.plot.settings.legend.description": "このトピックからグラフに表示する曲線を選択します。チェックを外すと非表示になります。",
	"panels.plot.settings.legend.empty": "データ読み込み後に曲線リストが表示されます",
	"panels.plot.settings.legend.selectedCount": "選択 {visible} / {total}",
	"panels.plot.settings.legend.selectAllAria": "この系列の曲線をすべて選択",
	"panels.plot.legend.visibleCount": "{visible} / {total} 曲線",
	"panels.plot.legend.expand": "凡例を展開",
	"panels.plot.legend.collapse": "凡例を折りたたむ",
	"panels.plot.legend.searchPlaceholder": "曲線を検索…",
	"panels.plot.legend.showAll": "すべて表示",
	"panels.plot.legend.hideAll": "すべて非表示",
	"panels.plot.legend.only": "のみ",
	"panels.plot.legend.onlyThis": "この曲線のみ表示",
	"panels.plot.legend.showCurve": "曲線を表示",
	"panels.plot.legend.hideCurve": "曲線を非表示",
	"panels.plot.legend.noMatches": "一致する曲線がありません",
	"panels.plot.settings.section.plot": "プロット",
	"panels.plot.settings.section.series": "系列",
	"panels.plot.settings.field.xAxis": "X 軸",
	"panels.plot.settings.field.maxPoints": "最大点数 ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages": "非インデックス最大メッセージ数 ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages.help": "トピック単位のランダムアクセス不可なストリーミングソース（ROS bag 等）の上限。",
	"panels.plot.settings.field.jointStateFields": "JointState フィールド",
	"panels.plot.settings.field.jointStateFields.help": "JointState トピックで有効にする配列フィールド。",
	"panels.plot.settings.field.followingWindow": "フォロー窗口（秒）",
	"panels.plot.settings.field.followingWindow.help": "0 でフォローモード無効。",
	"panels.plot.settings.field.syncX": "X 範囲を同期",
	"panels.plot.settings.field.export": "エクスポート",
	"panels.plot.settings.export.download": "CSV をダウンロード",
	"panels.plot.settings.series.title": "系列 {index}",
	"panels.plot.settings.series.show": "系列 {index} を表示",
	"panels.plot.settings.series.hide": "系列 {index} を非表示",
	"panels.plot.settings.field.topic": "トピック",
	"panels.plot.settings.field.topicFields": "トピックフィールド",
	"panels.plot.settings.field.topicFields.help": "描画する数値メッセージフィールドを選択します。",
	"panels.plot.settings.field.topicFields.loading": "フィールドを検出中…",
	"panels.plot.settings.field.topicFields.empty": "数値フィールドが見つかりません。",
	"panels.plot.settings.field.yPath": "Y パス",
	"panels.plot.settings.field.yPath.help": "トピック選択時に自動検出されます。",
	"panels.plot.settings.field.yPath.placeholder": "自動検出",
	"panels.plot.settings.field.xPath": "X パス",
	"panels.plot.settings.field.xPath.placeholder": "time[:] または x[:]",
	"panels.plot.settings.field.label": "ラベル",
	"panels.plot.settings.field.label.placeholder": "任意",
	"panels.plot.settings.field.timestampSource": "タイムスタンプ源",
	"panels.plot.settings.field.lineStyle": "線種",
	"panels.plot.settings.field.lineSize": "線幅",
	"panels.plot.settings.addSeries": "系列を追加",
	"panels.plot.settings.enum.xAxis.timestamp": "タイムスタンプ",
	"panels.plot.settings.enum.xAxis.index": "インデックス",
	"panels.plot.settings.enum.xAxis.custom": "カスタム X/Y",
	"panels.plot.settings.enum.xAxis.currentCustom": "現在のカスタム X/Y",
	"panels.plot.settings.enum.xAxis.requiresArrayHint": "（配列パスが必要）",
	"panels.plot.settings.enum.xAxis.requiresXPathHint": "（X パスが必要）",
	"panels.plot.settings.enum.timestamp.headerStamp": "ヘッダースタンプ",
	"panels.plot.settings.enum.timestamp.receiveTime": "受信時刻",
	"panels.plot.settings.enum.timestamp.publishTime": "公開時刻",
	"panels.plot.settings.enum.lineStyle.solid": "実線",
	"panels.plot.settings.enum.lineStyle.dashed": "破線",
	"panels.jointStatePlot.defaultTitle": "ジョイント状態",
	"panels.threeD.defaultTitle": "3D ビュー",
	"panels.audio.defaultTitle": "オーディオ",
	"panels.pose.defaultTitle": "ポーズ",
	"panels.rawMessages.defaultTitle": "生メッセージ",
	"panels.timeline.defaultTitle": "タイムライン",
	"panels.topicGraph.defaultTitle": "トピックグラフ",
	"panels.align.defaultTitle": "整列",
	"panels.unavailable.defaultTitle": "利用不可",
	"panels.urdfDebug.defaultTitle": "URDF デバッグ",
	"panels.jointStatePlot.fallback.missingHeaderStamp": "header.stamp がありません。receiveTime にフォールバックしました",
	"panels.jointStatePlot.fallback.missingCustomPath": "カスタムタイムスタンプパスが無効です。receiveTime にフォールバックしました",
	"panels.jointStatePlot.panorama.waitJointState": "JointState メッセージを待って関節数を決定しています…",
	"panels.jointStatePlot.empty.configureSeries": "サイドバーでフィールドパスまたは複数系列を追加するか、JointState パノラマを有効にしてください。",
	"panels.jointStatePlot.invalidFields": "有効なフィールドがありません: {labels}",
	"panels.jointStatePlot.rangeStatus.loading": "読み込み中…",
	"panels.jointStatePlot.rangeStatus.ready": "準備完了",
	"panels.jointStatePlot.rangeStatus.error": "エラー",
	"panels.jointStatePlot.seriesCount": "系列 {count}",
	"panels.jointStatePlot.timestamp.receiveTime": "receiveTime",
	"panels.jointStatePlot.timestamp.headerStamp": "headerStamp",
	"panels.jointStatePlot.timestamp.publishTime": "publishTime",
	"panels.jointStatePlot.timestamp.customField": "customField",
	"panels.pose.overlay.status": "Pose: {count} トピック",
	"panels.pose.overlay.tfFallback": "TF 整列モードが利用できないため、生フレームの Pose を表示しています。",
	"panels.framework.topicPicker.placeholder": "トピックを選択…",
	"panels.framework.topicPicker.searchPlaceholder": "名前または型で検索…",
	"panels.framework.topicPicker.empty": "一致するトピックがありません",
	"panels.framework.topicPicker.imagePlaceholder": "画像トピックを選択…",
	"panels.audio.topicPlaceholder": "オーディオトピックを選択…",
	"panels.audio.unlock": "オーディオを有効化",
	"panels.audio.infoCacheHint": "AudioInfo がある場合は統合",
	"panels.audio.status.waitingTopic": "オーディオトピックを選択してください",
	"panels.audio.status.waiting": "オーディオ待機中…",
	"panels.audio.status.playing": "オーディオ受信中",
	"panels.audio.status.mutedNon1x": "ミュート中（1× 以外では再生しません）",
	"panels.audio.status.unsupportedRawFormat": "未対応の RawAudio 形式（pcm-s16 が必要）",
	"panels.audio.status.unsupportedCoding": "未対応の AudioInfo coding_format（圧縮デコード無効）",
	"panels.audio.status.unsupportedSampleFormat": "未対応の sample_format（PCM デコード）",
	"panels.audio.status.invalidRaw": "無効な RawAudio データ",
	"panels.audio.status.emptyPayload": "オーディオのペイロードが空です",
	"panels.audio.status.unsupportedSchema": "このパネルの主入力として未対応の型です",
	"panels.audio.status.infoOnly": "AudioInfo トピックは主ストリームに使えません",
	"panels.align.timeMode.receiveTime": "受信 / 記録時刻 (receive)",
	"panels.align.timeMode.headerStamp": "メッセージヘッダ stamp（なければ receive）",
	"panels.align.section.main.title": "メイン表示",
	"panels.align.section.main.description": "タイムライン・半窓・散布図のスタイルはサイドバーで設定。Align キャンバスでホイールを回すと半窓（ms）をズームし、下の数値と連動します。",
	"panels.align.field.hint.label": "ヒント",
	"panels.align.field.hint.body": "キャンバスにトピック名は表示されません。点にポインタを合わせるとトピック全体と時刻が表示されます。",
	"panels.align.section.topics.title": "Topics",
	"panels.align.section.topics.description": "空欄の場合はデータセット内の画像系トピックをすべて表示します。",
	"panels.align.field.topicList.label": "トピック一覧（1 行に 1 つ）",
	"panels.align.field.topicList.help": "sensor_msgs/Image または CompressedImage のみ。",
	"panels.align.section.timeline.title": "タイムライン",
	"panels.align.field.horizontalTime.label": "横軸の時間",
	"panels.align.field.windowHalf.label": "半窓の長さ (ms)",
	"panels.align.field.windowHalf.help": "現在の再生時刻を中心に、左右へこのミリ秒だけ伸ばします。",
	"panels.align.section.scatter.title": "散布図の外観",
	"panels.align.field.dotRadius.label": "ドット半径 (px)",
	"panels.align.field.dotOpacity.label": "ドットの不透明度",
	"panels.align.overlay.plot": "plot: {value}",
	"panels.align.overlay.receive": "receive: {value}",
	"panels.align.overlay.stamp": "stamp: {value}",
	"panels.align.overlay.stampNone": "stamp: （なし）",
	"panels.timeline.empty": "タイムラインデータがありません。",
	"panels.timeline.messageCount": "{count} 件",
	"panels.timeline.durationSeconds": "時間 {seconds} 秒",
	"panels.timeline.durationUnavailable": "時間 -- 秒",
	"panels.timeline.currentTimeMarker": "現在の再生時刻",
	"panels.framework.errorBoundary.title": "パネルがクラッシュしました: {panelName}",
	"panels.framework.errorBoundary.instance": "インスタンス: {panelId}",
	"panels.framework.errorBoundary.unknownError": "不明なエラー",
	"panels.framework.errorBoundary.resetButton": "パネル状態をリセット",
	"panels.framework.unavailable.title": "パネルを利用できません",
	"panels.framework.unavailable.instance": "インスタンス: {panelId}",
	"panels.framework.unavailable.type": "種類: {panelType}",
	"panels.topicGraph.toolbar.toggleOrientation": "向きを切り替え",
	"panels.topicGraph.toolbar.fitView": "表示を合わせる",
	"panels.jointStatePlot.axis.time": "時間",
	"panels.image.error.offscreenUnsupported": "このブラウザ環境では OffscreenCanvas を利用できません",
	"panels.topicGraph.empty.waitingMetadata": "トピックのメタデータを待機しています…",
	"panels.audio.settings.section.source": "ソース",
	"panels.audio.settings.field.audioTopic.label": "オーディオトピック",
	"panels.audio.settings.field.audioTopic.help": "RawAudio または audio_common_msgs のオーディオストリーム。",
	"panels.audio.settings.field.audioTopic.placeholder": "/sensor/.../audio",
	"panels.audio.settings.field.audioInfoTopic.label": "AudioInfo トピック（任意）",
	"panels.audio.settings.field.audioInfoTopic.help": "For AudioData / AudioDataStamped: explicit AudioInfo topic. Leave empty to try common suffixes (_info, /audio_info) or panel defaults.",
	"panels.audio.settings.field.audioInfoTopic.placeholder": "/audio_info",
	"panels.audio.settings.section.defaults": "既定値（AudioData フォールバック）",
	"panels.audio.settings.field.defaultSampleRate": "既定サンプルレート: {rate} Hz",
	"panels.audio.settings.field.defaultChannels": "既定チャンネル数: {n}",
	"panels.audio.settings.field.defaultSampleFormat.label": "既定サンプル形式",
	"panels.audio.settings.field.defaultSampleFormat.help": "例: S16LE, F32LE",
	"panels.audio.settings.section.playback": "再生",
	"panels.audio.settings.field.volume": "音量: {pct}%",
	"panels.audio.settings.field.mute": "ミュート",
	"panels.audio.settings.section.display": "表示",
	"panels.audio.settings.field.waveformWindow": "波形ウィンドウ（秒）",
	"panels.audio.settings.field.waveformColor": "波形の色",
	"panels.timeline.settings.section.display": "表示",
	"panels.timeline.settings.field.showFrameDrops": "フレームドロップを表示",
	"panels.topicGraph.settings.section.layout": "レイアウト",
	"panels.topicGraph.settings.field.orientation": "向き",
	"panels.topicGraph.settings.enum.rankDir.lr": "左 / 右",
	"panels.topicGraph.settings.enum.rankDir.tb": "上 / 下",
	"panels.topicGraph.settings.field.showInlineControls": "インライン操作を表示",
	"panels.rawMessages.settings.section.source": "ソース",
	"panels.rawMessages.settings.field.topic": "トピック",
	"panels.rawMessages.settings.section.display": "表示",
	"panels.rawMessages.settings.field.uiRefreshHz": "UI 更新 (Hz)",
	"panels.rawMessages.settings.field.uiRefreshHz.help": "UI の再描画を受信レートから切り離す",
	"panels.rawMessages.settings.field.pauseUpdates": "更新を一時停止",
	"panels.rawMessages.settings.field.latestOnly": "最新のみ",
	"panels.rawMessages.settings.field.latestOnly.help": "中間フレームを常に破棄",
	"panels.rawMessages.settings.field.maxExpandedDepth": "最大展開深度",
	"panels.rawMessages.settings.field.maxRows": "最大行数",
	"panels.rawMessages.settings.field.binaryPreviewBytes": "バイナリプレビュー先頭バイト数",
	"panels.rawMessages.settings.field.binaryPreviewBytes.help": "Uint8Array フィールドの先頭 N バイトを表示",
	"panels.rawMessages.settings.field.binaryCopyFormat": "バイナリコピー形式",
	"panels.rawMessages.settings.enum.binaryCopy.uint8array": "Uint8Array",
	"panels.rawMessages.settings.enum.binaryCopy.hex": "Hex",
	"panels.rawMessages.settings.enum.binaryCopy.base64": "Base64",
	"panels.rawMessages.copy.success": "{path} をコピーしました",
	"panels.rawMessages.copy.error": "コピーに失敗しました",
	"panels.pose.settings.section.source": "ソース",
	"panels.pose.settings.field.schemaAuto.label": "スキーマ自動検出",
	"panels.pose.settings.field.schemaAuto.help": "Pose panel automatically includes geometry_msgs/msg/PoseStamped.",
	"panels.pose.settings.field.topics.label": "トピック",
	"panels.pose.settings.field.topics.help": "Detected PoseStamped topics are selected by default.",
	"panels.pose.settings.button.selectAll": "すべて選択",
	"panels.pose.settings.button.clearAll": "すべて解除",
	"panels.pose.settings.empty.noPoseStamped": "現在のデータソースに PoseStamped トピックがありません。",
	"panels.pose.settings.field.color": "色",
	"panels.pose.settings.section.trajectory": "軌跡",
	"panels.pose.settings.field.historyWindow": "History window: {sec}s",
	"panels.pose.settings.field.minLineWidth": "Min line width: {px}px",
	"panels.pose.settings.field.maxLineWidth": "Max line width: {px}px",
	"panels.pose.settings.section.pose": "ポーズ",
	"panels.pose.settings.field.showOrientation": "向きを表示",
	"panels.pose.settings.field.orientationScale": "Orientation scale: {scale}",
	"panels.pose.settings.section.frame": "フレーム",
	"panels.pose.settings.field.frameMode": "フレームモード",
	"panels.pose.settings.enum.frameMode.raw": "Raw frame",
	"panels.pose.settings.enum.frameMode.tfAligned": "TF aligned",
	"panels.pose.settings.field.targetFrame.label": "ターゲットフレーム",
	"panels.pose.settings.field.targetFrame.help": "Only used in TF aligned mode. Falls back to raw frame when TF is unavailable.",
	"panels.pose.settings.field.targetFrame.placeholder": "map",
	"panels.jointStatePlot.settings.section.source": "ソース",
	"panels.jointStatePlot.settings.field.topic": "トピック",
	"panels.jointStatePlot.settings.section.sampling": "サンプリング",
	"panels.jointStatePlot.settings.field.timestampSource": "タイムスタンプ",
	"panels.jointStatePlot.settings.enum.timestamp.headerStamp": "Header stamp",
	"panels.jointStatePlot.settings.enum.timestamp.receiveTime": "Receive time",
	"panels.jointStatePlot.settings.enum.timestamp.publishTime": "Publish time",
	"panels.jointStatePlot.settings.field.maxPointsPerJoint": "Max points per joint: {n}",
	"panels.jointStatePlot.toolbar.field.position": "position",
	"panels.jointStatePlot.toolbar.field.velocity": "velocity",
	"panels.jointStatePlot.toolbar.field.effort": "effort",
	"panels.jointStatePlot.filter.allJoints": "すべてのジョイント",
	"panels.jointStatePlot.empty.selectTopic": "上で JointState トピックを選択してください",
	"panels.jointStatePlot.empty.waitingData": "JointState データを待機しています…",
	"panels.threeD.settings.section.display": "表示",
	"panels.threeD.settings.field.showGrid": "グリッドを表示",
	"panels.threeD.settings.field.showAxes": "軸を表示",
	"panels.threeD.settings.field.showPlaceholder": "Show placeholder",
	"panels.threeD.settings.field.pointSize": "Point size: {n}",
	"panels.threeD.settings.field.pointSize.help": "Size of point-cloud points, in metres.",
	"panels.threeD.settings.section.urdf": "URDF",
	"panels.threeD.settings.section.urdf.description": "Where to load the robot description from.",
	"panels.threeD.settings.field.urdfSource": "Source",
	"panels.threeD.settings.enum.urdfSource.topic": "ROS topic",
	"panels.threeD.settings.enum.urdfSource.url": "URL",
	"panels.threeD.settings.enum.urdfSource.file": "Upload file",
	"panels.threeD.settings.field.urdfTopic.label": "Topic",
	"panels.threeD.settings.field.urdfTopic.help": "Leave empty to auto-detect (first topic whose name contains `robot_description`).",
	"panels.threeD.settings.field.urdfUrl.label": "URL",
	"panels.threeD.settings.field.urdfUrl.help": "http(s):// or package:// URL pointing to the URDF XML file.",
	"panels.threeD.settings.field.uploadUrdf": "Upload URDF XML",
	"panels.threeD.settings.field.fileInput.replace": "Replace file…",
	"panels.threeD.settings.field.fileInput.choose": "Choose file…",
	"panels.threeD.settings.field.urdfPreview": "Preview ({n} chars)",
	"panels.threeD.settings.field.urdfPreview.help": "Read-only preview of the uploaded URDF. Edit in your local tool and re-upload.",
	"panels.threeD.settings.section.topics": "トピック",
	"panels.threeD.settings.section.topics.description": "One topic per line: /topic mode=color. Modes: auto, path, pose, marker, laserScan, depth, skeleton.",
	"panels.threeD.settings.field.topicSettings": "Topic settings",
	"panels.threeD.settings.section.bvh": "BVH Skeleton",
	"panels.threeD.settings.section.bvh.description": "Default transform and style for BVH skeleton line rendering.",
	"panels.threeD.settings.field.skeletonEnabled": "Enable skeleton rendering",
	"panels.threeD.settings.field.skeletonStyle": "Skeleton style",
	"panels.threeD.settings.enum.skeletonStyle.stick": "Box-link stickman",
	"panels.threeD.settings.enum.skeletonStyle.line": "Green lines",
	"panels.threeD.settings.field.skeletonScale": "Scale: {n}",
	"panels.threeD.settings.field.skeletonScale.help": "Scale applied to BVH coordinates before rendering.",
	"panels.threeD.settings.field.yUpToZUp": "Convert Y-up to Z-up",
	"panels.threeD.settings.field.flipYAfterConversion": "Flip Y axis after conversion",
	"panels.threeD.settings.field.skeletonColor": "Skeleton color",
	"panels.image.settings.section.source": "ソース",
	"panels.image.settings.field.topic.label": "トピック",
	"panels.image.settings.field.topic.help": "ROS image topic (compressed or raw).",
	"panels.image.settings.field.topic.placeholder": "/camera/.../image_raw",
	"panels.image.settings.field.annotationTopic.label": "アノテーション",
	"panels.image.settings.field.annotationTopic.help": "画像に重ねる foxglove.ImageAnnotations トピック。",
	"panels.image.settings.field.annotationTopic.placeholder": "アノテーショントピックを選択",
	"panels.image.settings.field.annotationVisible": "アノテーションを表示",
	"panels.image.settings.section.display": "表示",
	"panels.image.settings.field.showStatusText": "ステータス文字を表示",
	"panels.image.settings.field.backgroundColor": "背景色",
	"panels.image.settings.field.fitMode": "フィットモード",
	"panels.image.settings.field.smoothing": "スムージング",
	"panels.image.settings.section.transform": "変換",
	"panels.image.settings.field.flipHorizontal": "左右反転",
	"panels.image.settings.field.flipVertical": "上下反転",
	"panels.image.settings.field.rotation": "回転",
	"panels.image.settings.field.rotation.help": "時計回りの角度（度、0–360）。",
	"panels.image.settings.section.color": "カラー（生 / 深度）",
	"panels.image.settings.colorHint.directRgb": "Colour encoding {encoding} — pixel colours come directly from the data. No remapping applied.",
	"panels.image.settings.colorHint.encodingPending": "先頭フレーム待ち — encoding が判明するまで深度レンジは既定の 0–65535 を使用します。",
	"panels.image.settings.field.colorMode": "カラーモード",
	"panels.image.settings.field.flatColor": "単色",
	"panels.image.settings.field.gradientStart": "グラデーション開始",
	"panels.image.settings.field.gradientEnd": "グラデーション終了",
	"panels.image.settings.field.colormap": "カラーマップ",
	"panels.image.settings.field.opacity": "不透明度",
	"panels.image.settings.field.opacity.help": "Alpha multiplier (0 = transparent, 1 = opaque).",
	"panels.image.settings.field.minValue": "最小値",
	"panels.image.settings.field.minValue.help": "スライダーをドラッグ — これ未満の値は開始色にクリップされます。範囲: {min}–{max}。",
	"panels.image.settings.field.maxValue": "最大値",
	"panels.image.settings.field.maxValue.help": "スライダーをドラッグ — これを超える値は終了色にクリップされます。範囲: {min}–{max}。",
	"panels.image.settings.enum.fitMode.contain": "Contain",
	"panels.image.settings.enum.fitMode.cover": "Cover",
	"panels.image.settings.enum.rotation.deg0": "0°",
	"panels.image.settings.enum.rotation.deg90": "90°",
	"panels.image.settings.enum.rotation.deg180": "180°",
	"panels.image.settings.enum.rotation.deg270": "270°",
	"panels.image.settings.enum.colorMode.colormap": "Colormap",
	"panels.image.settings.enum.colorMode.gradient": "Gradient",
	"panels.image.settings.enum.colorMode.flat": "Flat",
	"panels.image.settings.enum.colorMode.rgb": "RGB packed",
	"panels.image.settings.enum.colorMode.rgba": "RGBA packed",
	"panels.image.settings.enum.colorMode.rgbaFields": "RGBA separate fields",
	"panels.image.settings.enum.colorMap.turbo": "Turbo",
	"panels.image.settings.enum.colorMap.rainbow": "Rainbow",
	"panels.jointStatePlot.filter.partial": "{current}/{total}",
	"urdfDebug.defaultTitle": "URDF デバッグ",
	"urdfDebug.section.input": "入力",
	"urdfDebug.section.appearance": "外観",
	"urdfDebug.section.joints": "関節姿勢",
	"urdfDebug.section.export": "エクスポート",
	"urdfDebug.field.jointTopic": "JointState トピック",
	"urdfDebug.field.urdfRequired": "URDF ファイル（必須）",
	"urdfDebug.upload.dropUrdfTitle": "URDF ファイルをここにドロップ",
	"urdfDebug.upload.dropUrdfHint": ".urdf / .xml に対応 — ドラッグ＆ドロップまたはクリック",
	"urdfDebug.upload.dropMeshTitle": "Mesh フォルダをここにドロップ",
	"urdfDebug.upload.dropMeshHint": ".stl / .dae / .obj を含むフォルダをドロップ、またはクリック",
	"urdfDebug.upload.browse": "ファイルを参照",
	"urdfDebug.upload.invalidUrdf": ".urdf または .xml ファイルをドロップしてください。",
	"urdfDebug.upload.invalidMesh": "選択に mesh ファイル（.stl / .dae / .obj）が見つかりません。",
	"urdfDebug.resizeSettings": "設定パネルの幅を変更",
	"urdfDebug.field.meshOptional": "Mesh ファイル（任意）",
	"urdfDebug.field.meshStrategy": "Mesh 戦略",
	"urdfDebug.field.packageBaseUrl": "Package ベース URL",
	"urdfDebug.field.packageName": "Package 名",
	"urdfDebug.field.visualRpyOffset": "Visual RPY オフセット",
	"urdfDebug.selectTopic": "トピックを選択",
	"urdfDebug.selectJointStateTopic": "JointState トピックを選択",
	"urdfDebug.section.meshResources": "Mesh リソース",
	"urdfDebug.meshBase.hint": "URDF 内の package:// mesh パスを解決します。ローカル meshes フォルダを選ぶか、リモート Base URL を入力して「適用」をクリックしてください。",
	"urdfDebug.meshBase.mode.localFolder": "ローカルフォルダ",
	"urdfDebug.meshBase.mode.remoteUrl": "リモート Base URL（HTTP/HTTPS）",
	"urdfDebug.meshBase.pickFolder": "フォルダを選択…",
	"urdfDebug.meshBase.folderSelected": "フォルダ「{folder}」· {count} 個の mesh",
	"urdfDebug.meshBase.folderEmpty": "フォルダ未選択。",
	"urdfDebug.meshBase.remotePlaceholder": "https://your-host/resources/Robot/meshes",
	"urdfDebug.meshBase.apply": "適用",
	"urdfDebug.meshBase.applied": "適用済み Base URL",
	"urdfDebug.meshBase.remoteNotApplied": "URL を入力し「適用」をクリックすると mesh リンクが解決されます。",
	"urdfDebug.meshBase.remoteInvalid": "有効な http:// または https:// URL を入力してください。",
	"urdfDebug.meshBase.detectPackage": "URDF から検出",
	"urdfDebug.meshBase.resolvedTitle": "Mesh 解決結果",
	"urdfDebug.meshBase.refresh": "再チェック",
	"urdfDebug.meshBase.checking": "Mesh URL を確認中…",
	"urdfDebug.meshBase.summary": "{ok} / {total} 到達可能 · {failed} 件の問題",
	"urdfDebug.meshStatus.pending": "確認中",
	"urdfDebug.meshStatus.ok": "到達可能",
	"urdfDebug.meshStatus.local": "ローカルから読込",
	"urdfDebug.meshStatus.missing": "未解決",
	"urdfDebug.meshStatus.error": "読込エラー",
	"urdfDebug.meshStatus.cors": "CORS 制限（3D では表示される場合あり）",
	"urdfDebug.meshStatus.unchecked": "未確認",
	"urdfDebug.meshStrategy.packageBaseUrl": "Package ベース URL",
	"urdfDebug.meshStrategy.leaveAsIs": "そのまま",
	"urdfDebug.rotateMeshVisuals": "Mesh ビジュアルを回転",
	"urdfDebug.rotateMeshVisualsHint": "モデルが傾いたり横たわって見える場合（CAD 出力の STL でよくある、Tron2・Unitree G1 など）は ON にしてください。すでに正しく立っている場合は OFF にしてください。エクスポートスクリプトは選択した向きを URDF に書き込みます。",
	"urdfDebug.preview.empty": "URDF ファイルをアップロードしてロボットをプレビューします。",
	"urdfDebug.preview.emptyTopicNoSelection": "/robot_description トピックを選択するか、該当トピックを含む録画を開いてください。",
	"urdfDebug.preview.emptyTopicWaiting": "{topic} を購読中。URDF 文字列メッセージを待っています…",
	"urdfDebug.preview.error": "URDF プレビュー失敗: {message}",
	"urdfDebug.preview.emptyModel": "表示可能なジオメトリがありません（mesh 失敗 {failed}/{total}、表示 link {visible}）",
	"urdfDebug.preview.issueLine": "{url}: {reason}",
	"urdfDebug.preview.moreIssues": "他 {count} 件の問題",
	"urdfDebug.input.source.file": "URDF ファイルをアップロード",
	"urdfDebug.input.source.topic": "MCAP トピックから読み込み（std_msgs/String）",
	"urdfDebug.input.topicLoaded": "{topic} から読み込み済み · {bytes} bytes",
	"urdfDebug.input.topicWaiting": "{topic} の最初のメッセージを待機中…",
	"urdfDebug.input.topicAutoDetectHint": "空欄のままにすると robot_description を含むトピックを自動検出します。",
	"urdfDebug.preview.title": "URDF プレビュー · Mesh 回転: {rotateMesh}",
	"urdfDebug.preview.rotateMeshOn": "ON",
	"urdfDebug.preview.rotateMeshOff": "OFF",
	"urdfDebug.preview.loadingMesh": "Mesh 読込 {loaded}/{total}",
	"urdfDebug.showGrid": "グリッド表示",
	"urdfDebug.showAxes": "軸表示",
	"urdfDebug.joints.followLive": "MCAP JointState に追従",
	"urdfDebug.joints.noJointStateTopics": "この録画に JointState トピックがありません。",
	"urdfDebug.joints.selectJointStateTopicHint": "プレビューを駆動する JointState トピックを選択してください。",
	"urdfDebug.joints.waitingForJointState": "{topic} を購読中 — JointState メッセージを待っています…",
	"urdfDebug.joints.resetAll": "すべてリセット",
	"urdfDebug.joints.filter": "関節をフィルタ…",
	"urdfDebug.joints.uploadUrdfHint": "URDF をアップロードすると関節スライダーが使えます。",
	"urdfDebug.joints.noMatch": "一致する関節がありません。",
	"urdfDebug.joints.manualUnsupported": "この関節タイプは手動調整に未対応です。",
	"urdfDebug.joints.fixedJoint": "固定関節（スライダーなし）。",
	"urdfDebug.jointType.revolute": "回転",
	"urdfDebug.jointType.prismatic": "直線",
	"urdfDebug.jointType.continuous": "連続回転",
	"urdfDebug.jointType.fixed": "固定",
	"urdfDebug.jointType.planar": "平面",
	"urdfDebug.jointType.floating": "浮動",
	"urdfDebug.action.autoMatch": "自動マッチ",
	"urdfDebug.action.symmetricPair": "対称関節ペア",
	"urdfDebug.action.mimicFill": "Mimic 補完",
	"urdfDebug.action.invertFirst": "先頭を反転",
	"urdfDebug.action.gripper01": "グリッパ 0-1",
	"urdfDebug.action.xArm851": "xArm 851",
	"urdfDebug.noRules": "ルールがありません。",
	"urdfDebug.diag.jointTopic": "Joint トピック",
	"urdfDebug.diag.existingTf": "既存 /tf",
	"urdfDebug.diag.existingRobotDescription": "既存 /robot_description",
	"urdfDebug.diag.robot": "ロボット",
	"urdfDebug.diag.linksJoints": "Links / joints",
	"urdfDebug.diag.matchCoverage": "マッチ率",
	"urdfDebug.diag.generatedTfCount": "生成 TF 数",
	"urdfDebug.diag.unmatchedInputJoints": "未マッチ入力関節",
	"urdfDebug.diag.missingUrdfJoints": "不足 URDF 関節",
	"urdfDebug.diag.meshIssues": "Mesh 問題",
	"urdfDebug.diag.missing": "なし",
	"urdfDebug.yes": "はい",
	"urdfDebug.no": "いいえ",
	"urdfDebug.rule.inputJoint": "入力関節",
	"urdfDebug.rule.urdfJoint": "URDF 関節",
	"urdfDebug.rule.rename": "リネーム",
	"urdfDebug.rule.linear": "線形",
	"urdfDebug.rule.constant": "定数",
	"urdfDebug.rule.ignore": "無視",
	"urdfDebug.help.body": "URDF をアップロードし、プレビューが録画データと一致するまで関節マッピングを調整します。mesh の向きが合わない場合（CAD 出力でよくある）は「Mesh ビジュアルを回転」を切り替えてください。対称関節ペアは左右グリッパー用、Mimic 補完は URDF の mimic タグに従い従動関節を補完します。recipe.json または処理スクリプトをエクスポートすると、/robot_description と /tf を含む MCAP をローカルで再生成できます。"
}, mn = {
	"playback.annotationsEmpty": "注釈範囲がありません",
	"playback.buffering": "再生をバッファリング中",
	"playback.play": "再生",
	"playback.pause": "一時停止",
	"playback.timeMode.relative.aria": "ログ先頭からの相対時刻です。クリックで絶対時刻に切り替え",
	"playback.timeMode.absolute.aria": "ローカルの日付・時刻です。クリックで相対時刻に切り替え",
	"playback.timeMode.relative.title": "相対時刻（ログ起点から）。クリックでローカル日時に切り替え。",
	"playback.timeMode.absolute.title": "ローカル日時。クリックで相対時刻に切り替え。",
	"playback.stepBack.aria": "1 メッセージ戻る",
	"playback.stepBack.title": "1 メッセージ戻る（Alt 押下で時間ステップ、既定 10ms、Alt+Ctrl/Cmd で 100ms）",
	"playback.stepForward.aria": "1 メッセージ進む",
	"playback.stepForward.title": "1 メッセージ進む（Alt 押下で時間ステップ）",
	"playback.speed.aria": "再生速度",
	"playback.samplingFps.aria": "サンプリング FPS",
	"playback.loop.aria": "ループ再生モード",
	"playback.loop.loop": "ループ",
	"playback.loop.once": "1 回"
}, hn = {
	"quality.title": "品質",
	"quality.empty": "なし",
	"quality.header.scanWithPct": "走査 {scanned} / {total}（{pct}%）{suffix}",
	"quality.header.scanNoPct": "走査 {scanned} / {total}{suffix}",
	"quality.scan.start": "スキャン開始",
	"quality.scan.rescan": "再スキャン",
	"quality.scan.auto": "小さいファイルを自動スキャン",
	"quality.scan.idleHint": "品質スキャンは停止中です。必要なときに手動実行して、大きなファイルでの負荷を抑えます。",
	"quality.scan.skippedLargeFile": "{total} 件のメッセージがあるため自動スキャンをスキップしました。{limit} 件を超えるファイルは、再生を保つため手動スキャンにします。",
	"quality.scan.failed": "品質スキャンに失敗しました。再スキャンするか、ファイル形式を確認してください。",
	"quality.status.scanning": "{scanned}/{total}…",
	"quality.status.ready": "{scanned}/{total}",
	"quality.noMatches": "問題は検出されませんでした",
	"quality.noFilterMatches": "該当なし",
	"quality.count": "{count} 件",
	"quality.maxMagnitude": "最大 {ms} ms",
	"quality.trend": "推移",
	"quality.clockSource": "クロック",
	"quality.clock.header": "Header",
	"quality.clock.log": "Log",
	"quality.scope": "範囲",
	"quality.scope.topic": "単 topic",
	"quality.scope.group": "グループ",
	"quality.scope.global": "全体",
	"quality.baselineInterval": "基準 Δt",
	"quality.beforeVsAnomaly": "前 / 異常 Δt",
	"quality.afterInterval": "後 Δt",
	"quality.chart.time": "時刻",
	"quality.chart.deltaNs": "Δt",
	"quality.chart.zoomHint": "ドラッグで拡大",
	"quality.chart.resetZoom": "ズーム解除",
	"quality.chart.axis.deviation": "フレーム間隔偏差",
	"quality.evidence.zone.before": "前",
	"quality.evidence.zone.anomaly": "異常",
	"quality.evidence.zone.after": "後",
	"quality.flag.rollback": "逆行",
	"quality.flag.dropEstimate": "欠落推定",
	"quality.clearFilter": "解除",
	"quality.type.timestamp_rollback": "逆行",
	"quality.type.topic_frame_drop": "単 topic 欠落",
	"quality.summary.timestamp_rollback": "{clock}: 逆行 {ms} ms",
	"quality.summary.topic_frame_drop": "{clock}: ギャップ ~{ms} ms",
	"quality.summary.generic": "{clock}: 異常 ~{ms} ms",
	"quality.incident.title.timestamp_rollback": "{topic} タイムスタンプ逆行",
	"quality.incident.title.topic_frame_drop": "{topic} フレーム間隔異常",
	"quality.incident.title.generic": "品質問題",
	"quality.incident.impact.timestamp_rollback": "{count} 件の逆行エラー、最大逆行 {ms} ms。",
	"quality.incident.impact.topic_frame_drop": "{count} 件のギャップエラー、平均間隔超過の最大 {ms} ms。",
	"quality.incident.impact.generic_timing": "{topicCount} topic で {count} 件のタイミング異常点、最大偏差 {ms} ms。",
	"quality.incident.recommendation.timestamp_rollback": "センサードライバのクロックまたはソースタイムスタンプを確認してください。header 時刻が不安定な区間では log time を優先します。",
	"quality.incident.recommendation.frame_drop": "影響を受けた topic グループの publish 周波数、QoS、通信負荷を確認してください。",
	"quality.incident.recommendation.generic": "この時刻周辺の影響メッセージを確認してください。",
	"quality.mergedSources": "統合 {n}",
	"quality.chart.balancedLegend": "B{b} · A{a} · N{n}",
	"quality.overview": "問題概要",
	"quality.incidentCount": "{count} 件",
	"quality.tabs.chart": "チャート",
	"quality.tabs.table": "生データ",
	"quality.metric.anomalyPoints": "異常点 {count}",
	"quality.metric.maxDeviation": "最大 |Δ| {value} ms",
	"quality.metric.topicCount": "影響 topic {count}",
	"quality.details.topic": "Topic",
	"quality.details.noTopic": "Topic なし",
	"quality.details.noRows": "生データ点なし",
	"quality.details.table.index": "番号",
	"quality.details.table.logTime": "log time",
	"quality.details.table.headerTime": "header time",
	"quality.details.table.deviation": "差分",
	"quality.details.table.zone": "区間",
	"quality.filter.all": "すべて",
	"quality.filter.error": "重大",
	"quality.filter.warn": "警告",
	"quality.filter.allTypes": "全タイプ",
	"quality.filter.search": "topic / グループ検索",
	"quality.recommendation": "提案"
}, gn = {
	"sidebar.tab.topics": "トピック",
	"sidebar.tab.datasets": "データ",
	"sidebar.tab.quality": "品質",
	"sidebar.tab.settings": "設定",
	"sidebar.settings.noActivePanel": "パネルを選択して設定を編集します。",
	"sidebar.settings.noSettings": "このパネルには設定項目がありません。",
	"sidebar.topicFilter": "トピックを絞り込み…",
	"sidebar.topicMeta": "{count} メッセージ",
	"sidebar.topicRow.actionsMenu": "トピックの操作",
	"sidebar.topicRow.copyTopicName": "トピック名をコピー",
	"sidebar.topicRow.copySchemaName": "スキーマ名をコピー",
	"sidebar.topicRow.sourceFiles": "ソース: {files}",
	"sidebar.topicDropTitle": "ここにドロップして Raw Messages を開く",
	"sidebar.topicDropSubtitle": "離すと Raw Messages パネルを作成します",
	"sidebar.datasetSize": "{size}",
	"sidebar.datasetDuration": "{sec} 秒",
	"sidebar.datasetTopics": "{n} トピック",
	"sidebar.datasetGroup.fileCount": "{count} 件のファイルを統合",
	"sidebar.openFile": "ファイルを追加",
	"sidebar.openDirectory": "フォルダを開く",
	"sidebar.noTopics": "トピックがありません",
	"sidebar.noDatasets": "ファイルがありません",
	"sidebar.displayMulti": "複数",
	"sidebar.displayAgg": "集約"
}, _n = {
	"welcome.heroEyebrow": "録画ビューア",
	"welcome.tagline": "MCAP / bag / db3 / HDF5 を、ローカル・URL・tar から開けます。",
	"welcome.heroSubtitle": "ROS や HDF5 の録画をローカルで閲覧。クラウドへアップロードする必要はありません。",
	"welcome.badgeLocalFirst": "ブラウザ内でローカル処理",
	"welcome.samplesSectionHint": "カバー画像付きのサンプルから開けます。",
	"welcome.footerDevelopedBy": "開発: ",
	"welcome.footerOrgName": "IO-AI.TECH",
	"welcome.footerDevelopedSuffix": "、",
	"welcome.footerOpenSourceLink": "GitHub でオープンソース",
	"welcome.footerOpenSourceSuffix": "。",
	"welcome.historyTitle": "最近",
	"welcome.historyExpand": "すべて表示",
	"welcome.historyCollapse": "折りたたむ",
	"welcome.historyEmpty": "まだ履歴がありません。",
	"welcome.historyPermissionDenied": "保存されたファイル/フォルダを読み取れません。権限を付与するか、再度選択してください。",
	"welcome.historyFileCount": "{count} ファイル",
	"welcome.historyFolderPicker": "フォルダ",
	"welcome.historyDroppedFiles": "ドロップしたファイル",
	"welcome.historyFromFilePicker": "ファイル選択",
	"welcome.historyEmptyDirectory": "そのフォルダに対応する録画が見つかりません。",
	"welcome.historyNoSupportedRecordings": "保存された選択に対応する録画がありません。",
	"welcome.urlLocalRestoreMiss": "履歴からこのローカルファイル/フォルダを復元できません。再度選択するか「最近」から開いてください。",
	"welcome.sampleManifestNotConfigured": "サンプル一覧が未設定です。ビルド時に VITE_SAMPLE_DATASETS_MANIFEST_URL または VITE_SAMPLES_BASE_URL を設定してください。",
	"welcome.sampleIdNotFound": "カタログに id「{id}」のサンプルはありません。",
	"welcome.historyKindUrl": "URL",
	"welcome.historyKindRemoteTar": "リモート tar",
	"welcome.historyKindSample": "サンプル",
	"welcome.historyKindFolder": "フォルダ",
	"welcome.historyKindFiles": "ファイル",
	"welcome.historyKindTar": "tar",
	"welcome.tabFile": "ファイル",
	"welcome.tabDirectory": "フォルダ",
	"welcome.tabRemote": "URL",
	"welcome.tabTar": "アーカイブ",
	"welcome.openLocalTar": "tar / tgz",
	"welcome.tarHint": "録画を含むアーカイブ",
	"welcome.remoteUrlPlaceholder": "https://…/file.mcap",
	"welcome.remoteUrlErrorRequired": "URL を入力",
	"welcome.remoteUrlErrorInvalid": "http(s):// で始めてください",
	"welcome.remoteUrlErrorUnsupported": "mcap、bag、db3、hdf5、tar/tgz に対応",
	"welcome.opening": "開いています…",
	"welcome.open": "開く",
	"welcome.samplesSectionTitle": "サンプル",
	"welcome.samplesLoading": "読み込み中…",
	"welcome.samplesEmpty": "サンプルは未設定です。",
	"welcome.samplesDialogTitle": "サンプル",
	"welcome.samplesDialogDescription": "選択して開きます。",
	"welcome.openFile": "ファイルを選ぶ",
	"welcome.openDirectory": "フォルダを選ぶ",
	"welcome.fileTypes": "mcap · bag · db3 · hdf5 · bvh",
	"welcome.directoryHint": "フォルダ内の該当ファイルすべて",
	"welcome.loadingTitle": "読み込み中",
	"welcome.loadingPhase.preparing": "準備中…",
	"welcome.loadingSpeed": "{speed}/s",
	"welcome.loadingEtaSeconds": "約 {n} 秒",
	"welcome.loadingEtaMinutes": "約 {n} 分",
	"welcome.loadingEtaHours": "約 {n} 時間",
	"welcome.cancelLoading": "キャンセル",
	"welcome.manualOpenFileHint": "{name} ファイルを手動で開いてください。",
	"welcome.manualOpenFolderHint": "{name} フォルダを手動で開いてください。"
}, vn = {
	"common.productName": "ROS View",
	"common.theme": "主题",
	"common.light": "浅色",
	"common.dark": "深色",
	"common.system": "跟随系统",
	"errors.loadFailed": "加载失败",
	"errors.noRecordingsInArchive": "归档中未找到支持的录制文件",
	"viewer.resizeSidebar": "调整侧栏宽度",
	"viewer.remoteUrlPrompt": "输入远程录制或 TAR 的 URL（https://…）",
	"viewer.mergeToast.message": "已将 {name} 合并到当前会话",
	"viewer.mergeToast.action": "改为替换",
	"common.dialogClose": "关闭"
}, yn = {
	"layout.panelTab.addReplaceCurrent": "替换当前面板",
	"layout.panelTab.addToRight": "添加到右侧",
	"layout.panelTab.addToBelow": "添加到下方",
	"layout.panelTab.addToGroup": "添加到分组",
	"layout.panelTab.addPanelSubmenu": "添加面板",
	"layout.panelTab.moreAria": "更多标签操作",
	"layout.panelTab.moreTitle": "更多操作",
	"layout.panelTab.openSettings": "打开设置",
	"layout.panelTab.openSettingsAria": "在侧边栏打开面板设置",
	"layout.panelTab.openSettingsTitle": "在侧边栏打开设置",
	"layout.panelTab.addPanelAria": "添加面板",
	"layout.panelTab.addPanelTitle": "添加面板",
	"layout.panelTab.closePanel": "关闭面板",
	"layout.panelTab.closePanelAria": "关闭此面板",
	"layout.panelTab.closePanelTitle": "关闭面板",
	"layout.panelTab.context.close": "关闭",
	"layout.panelTab.context.closeAllInGroup": "关闭组内全部",
	"layout.panelTab.context.resetPanel": "重置面板",
	"layout.panelTab.context.copyPanelId": "复制面板 ID",
	"layout.panelTab.context.duplicatePanel": "复制面板",
	"layout.welcomePanel.title": "添加面板",
	"layout.welcomePanel.hint": "选择一种面板类型以在此处打开。",
	"layout.welcomePanel.desc.Image": "显示相机与压缩图像话题",
	"layout.welcomePanel.desc.Plot": "绘制 ROS 数值字段与数组曲线",
	"layout.welcomePanel.desc.JointStatePlot": "绘制关节位置、速度与力矩随时间变化",
	"layout.welcomePanel.desc.3D": "可视化三维标记、坐标变换与点云",
	"layout.welcomePanel.desc.Audio": "回放 ROS 音频消息流",
	"layout.welcomePanel.desc.Pose": "在二维画布上跟踪 PoseStamped 轨迹",
	"layout.welcomePanel.desc.RawMessages": "以树形结构查看反序列化后的消息字段",
	"layout.welcomePanel.desc.Timeline": "查看各话题消息密度与丢帧",
	"layout.welcomePanel.desc.TopicGraph": "探索话题发布/订阅连接关系",
	"layout.welcomePanel.desc.Align": "诊断多传感器时间戳同步",
	"layout.panelSuspense.loading": "正在加载面板…"
}, bn = {
	"navbar.open": "打开",
	"navbar.openMenu": "打开录制",
	"navbar.menuFile": "文件",
	"navbar.openLocalFile": "本地文件…",
	"navbar.openLocalDir": "本地文件夹…",
	"navbar.openLocalTar": "本地 TAR / TGZ…",
	"navbar.openRemoteUrl": "远程 URL…",
	"navbar.browseSamples": "浏览样例…",
	"navbar.recentOpens": "最近打开",
	"navbar.recentOpensEmpty": "暂无最近打开的文件",
	"navbar.selectLanguage": "选择语言",
	"navbar.sourceLoading": "加载中…",
	"navbar.exportLayout": "导出布局",
	"navbar.importLayout": "导入布局",
	"navbar.layoutMenu": "布局",
	"navbar.saveLayout": "保存布局",
	"navbar.resetLayout": "重置已保存布局",
	"navbar.lang.en": "English",
	"navbar.lang.zh": "中文",
	"navbar.lang.ja": "日本語",
	"navbar.reapplyAutoLayout": "重新应用自动布局",
	"navbar.goHome": "返回首页"
}, xn = {
	"panels.image.defaultTitle": "图像",
	"panels.image.warning.annotationGap": "部分视频帧缺少匹配的标注数据。",
	"panels.image.status.waitingForAnnotation": "正在缓冲，等待匹配的标注数据…",
	"panels.plot.defaultTitle": "图表",
	"panels.plot.toolbar.selectTopic": "选择 Topic…",
	"panels.plot.toolbar.resetZoom": "重置缩放",
	"panels.plot.toolbar.resetZoomAria": "重置图表缩放",
	"panels.plot.status.detectingPaths": "检测路径…",
	"panels.plot.status.loading": "加载中…",
	"panels.plot.status.loadingProgress": "加载中 {count} 条",
	"panels.plot.status.sampling": "采样 {percent}%",
	"panels.plot.empty.selectTopic": "选择 Topic 以绘制数值曲线",
	"panels.plot.empty.noNumericData": "未找到数值数据",
	"panels.plot.warning.nonIndexedSource": "该数据源不支持按 topic 随机读取，已限制采样范围并强制降采样。",
	"panels.plot.warning.downsampleLimited": "已降采样以符合点数上限。",
	"panels.plot.warning.noNumericValues": "未找到数值：{topic}.{path}",
	"panels.plot.warning.missingXPath": "缺少 X 路径：{topic}.{path}",
	"panels.plot.warning.mismatchedXY": "X/Y 长度不匹配 {topic}：{xPath} vs {yPath}",
	"panels.plot.settings.section.legend": "图例",
	"panels.plot.settings.series.legend.title": "曲线",
	"panels.plot.settings.legend.description": "选择本 Topic 要在图表中显示的曲线。取消勾选可隐藏对应曲线。",
	"panels.plot.settings.legend.empty": "加载数据后将显示曲线列表",
	"panels.plot.settings.legend.selectedCount": "已选 {visible} / {total}",
	"panels.plot.settings.legend.selectAllAria": "全选本序列的曲线",
	"panels.plot.legend.visibleCount": "{visible} / {total} 条曲线",
	"panels.plot.legend.expand": "展开图例",
	"panels.plot.legend.collapse": "收起图例",
	"panels.plot.legend.searchPlaceholder": "搜索曲线…",
	"panels.plot.legend.showAll": "全部显示",
	"panels.plot.legend.hideAll": "全部隐藏",
	"panels.plot.legend.only": "仅看",
	"panels.plot.legend.onlyThis": "只显示这条曲线",
	"panels.plot.legend.showCurve": "显示曲线",
	"panels.plot.legend.hideCurve": "隐藏曲线",
	"panels.plot.legend.noMatches": "没有匹配的曲线",
	"panels.plot.settings.section.plot": "图表",
	"panels.plot.settings.section.series": "序列",
	"panels.plot.settings.field.xAxis": "X 轴",
	"panels.plot.settings.field.maxPoints": "最大点数 ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages": "非索引最大消息数 ({count})",
	"panels.plot.settings.field.nonIndexedMaxMessages.help": "流式数据源（如 ROS bag）无法按 topic 随机读取时的上限。",
	"panels.plot.settings.field.jointStateFields": "JointState 字段",
	"panels.plot.settings.field.jointStateFields.help": "JointState topic 启用的数组字段。",
	"panels.plot.settings.field.followingWindow": "跟随窗口（秒）",
	"panels.plot.settings.field.followingWindow.help": "0 表示关闭跟随模式。",
	"panels.plot.settings.field.syncX": "同步 X 轴范围",
	"panels.plot.settings.field.export": "导出",
	"panels.plot.settings.export.download": "下载 CSV",
	"panels.plot.settings.series.title": "序列 {index}",
	"panels.plot.settings.series.show": "显示序列 {index}",
	"panels.plot.settings.series.hide": "隐藏序列 {index}",
	"panels.plot.settings.field.topic": "Topic",
	"panels.plot.settings.field.topicFields": "Topic 字段",
	"panels.plot.settings.field.topicFields.help": "选择要绘制的数值消息字段。",
	"panels.plot.settings.field.topicFields.loading": "正在检测字段…",
	"panels.plot.settings.field.topicFields.empty": "未检测到数值字段。",
	"panels.plot.settings.field.yPath": "Y 路径",
	"panels.plot.settings.field.yPath.help": "选择 Topic 后自动检测。",
	"panels.plot.settings.field.yPath.placeholder": "自动检测",
	"panels.plot.settings.field.xPath": "X 路径",
	"panels.plot.settings.field.xPath.placeholder": "time[:] 或 x[:]",
	"panels.plot.settings.field.label": "标签",
	"panels.plot.settings.field.label.placeholder": "可选",
	"panels.plot.settings.field.timestampSource": "时间戳来源",
	"panels.plot.settings.field.lineStyle": "线型",
	"panels.plot.settings.field.lineSize": "线宽",
	"panels.plot.settings.addSeries": "添加序列",
	"panels.plot.settings.enum.xAxis.timestamp": "时间戳",
	"panels.plot.settings.enum.xAxis.index": "索引",
	"panels.plot.settings.enum.xAxis.custom": "自定义 X/Y",
	"panels.plot.settings.enum.xAxis.currentCustom": "当前自定义 X/Y",
	"panels.plot.settings.enum.xAxis.requiresArrayHint": "（需要数组路径）",
	"panels.plot.settings.enum.xAxis.requiresXPathHint": "（需要 X 路径）",
	"panels.plot.settings.enum.timestamp.headerStamp": "消息头时间戳",
	"panels.plot.settings.enum.timestamp.receiveTime": "接收时间",
	"panels.plot.settings.enum.timestamp.publishTime": "发布时间",
	"panels.plot.settings.enum.lineStyle.solid": "实线",
	"panels.plot.settings.enum.lineStyle.dashed": "虚线",
	"panels.jointStatePlot.defaultTitle": "关节状态图",
	"panels.threeD.defaultTitle": "三维",
	"panels.audio.defaultTitle": "音频",
	"panels.pose.defaultTitle": "位姿",
	"panels.rawMessages.defaultTitle": "原始消息",
	"panels.timeline.defaultTitle": "时间线",
	"panels.topicGraph.defaultTitle": "话题图",
	"panels.align.defaultTitle": "对齐",
	"panels.unavailable.defaultTitle": "不可用",
	"panels.urdfDebug.defaultTitle": "URDF 调试",
	"panels.jointStatePlot.fallback.missingHeaderStamp": "header.stamp 缺失，已回退到 receiveTime",
	"panels.jointStatePlot.fallback.missingCustomPath": "custom timestamp path 无效，已回退到 receiveTime",
	"panels.jointStatePlot.panorama.waitJointState": "等待 JointState 消息以确定关节数量…",
	"panels.jointStatePlot.empty.configureSeries": "在侧栏设置中添加字段路径或多序列配置，或启用 JointState 全景模式。",
	"panels.jointStatePlot.invalidFields": "无有效字段：{labels}",
	"panels.jointStatePlot.rangeStatus.loading": "加载中…",
	"panels.jointStatePlot.rangeStatus.ready": "就绪",
	"panels.jointStatePlot.rangeStatus.error": "错误",
	"panels.jointStatePlot.seriesCount": "{count} 条序列",
	"panels.jointStatePlot.timestamp.receiveTime": "receiveTime",
	"panels.jointStatePlot.timestamp.headerStamp": "headerStamp",
	"panels.jointStatePlot.timestamp.publishTime": "publishTime",
	"panels.jointStatePlot.timestamp.customField": "customField",
	"panels.pose.overlay.status": "Pose：{count} 个 topic",
	"panels.pose.overlay.tfFallback": "TF 对齐模式暂不可用，已回退为原始 frame 下的 Pose。",
	"panels.framework.topicPicker.placeholder": "选择 topic…",
	"panels.framework.topicPicker.searchPlaceholder": "搜索名称或类型…",
	"panels.framework.topicPicker.empty": "没有匹配的 topic",
	"panels.framework.topicPicker.imagePlaceholder": "选择图像 topic…",
	"panels.audio.topicPlaceholder": "选择音频 topic…",
	"panels.audio.unlock": "解锁音频播放",
	"panels.audio.infoCacheHint": "收到 AudioInfo 时会合并元数据",
	"panels.audio.status.waitingTopic": "请选择音频 topic",
	"panels.audio.status.waiting": "等待音频数据…",
	"panels.audio.status.playing": "正在接收音频",
	"panels.audio.status.mutedNon1x": "已静音（仅 1× 倍速播放音频）",
	"panels.audio.status.unsupportedRawFormat": "不支持的 RawAudio 格式（需要 pcm-s16）",
	"panels.audio.status.unsupportedCoding": "不支持的 AudioInfo coding_format（未启用压缩解码）",
	"panels.audio.status.unsupportedSampleFormat": "不支持的 sample_format PCM 解码",
	"panels.audio.status.invalidRaw": "无效的 RawAudio 数据",
	"panels.audio.status.emptyPayload": "音频负载为空",
	"panels.audio.status.unsupportedSchema": "该消息类型不能作为此面板主数据源",
	"panels.audio.status.infoOnly": "AudioInfo topic 不能作为主音频流",
	"panels.align.timeMode.receiveTime": "接收 / 记录时间 (receive)",
	"panels.align.timeMode.headerStamp": "消息头 stamp（缺省回退 receive）",
	"panels.align.section.main.title": "主画面",
	"panels.align.section.main.description": "时间轴、半窗、散点样式均在侧边栏配置。在 Align 面板画布上滚动滚轮可缩放半窗（毫秒），与下方数值联动。",
	"panels.align.field.hint.label": "提示",
	"panels.align.field.hint.body": "画布上不显示 topic 名称；将指针移到点上即可查看完整 topic 与时间。",
	"panels.align.section.topics.title": "Topics",
	"panels.align.section.topics.description": "留空则显示数据集中全部图像类 topic。",
	"panels.align.field.topicList.label": "Topic 列表（每行一个）",
	"panels.align.field.topicList.help": "仅 sensor_msgs/Image 或 CompressedImage。",
	"panels.align.section.timeline.title": "时间轴",
	"panels.align.field.horizontalTime.label": "横轴时间",
	"panels.align.field.windowHalf.label": "半窗时长 (ms)",
	"panels.align.field.windowHalf.help": "以当前播放时间为中心，左右各延伸该毫秒数。",
	"panels.align.section.scatter.title": "散点外观",
	"panels.align.field.dotRadius.label": "点半径 (px)",
	"panels.align.field.dotOpacity.label": "点透明度",
	"panels.align.overlay.plot": "plot：{value}",
	"panels.align.overlay.receive": "receive：{value}",
	"panels.align.overlay.stamp": "stamp：{value}",
	"panels.align.overlay.stampNone": "stamp：（无）",
	"panels.timeline.empty": "暂无时间线数据。",
	"panels.timeline.messageCount": "{count} 条消息",
	"panels.timeline.durationSeconds": "时间 {seconds} 秒",
	"panels.timeline.durationUnavailable": "时间 -- 秒",
	"panels.timeline.currentTimeMarker": "当前播放时间",
	"panels.framework.errorBoundary.title": "面板崩溃：{panelName}",
	"panels.framework.errorBoundary.instance": "实例：{panelId}",
	"panels.framework.errorBoundary.unknownError": "未知错误",
	"panels.framework.errorBoundary.resetButton": "重置面板状态",
	"panels.framework.unavailable.title": "面板不可用",
	"panels.framework.unavailable.instance": "实例：{panelId}",
	"panels.framework.unavailable.type": "类型：{panelType}",
	"panels.topicGraph.toolbar.toggleOrientation": "切换布局方向",
	"panels.topicGraph.toolbar.fitView": "适应视图",
	"panels.jointStatePlot.axis.time": "时间",
	"panels.image.error.offscreenUnsupported": "当前浏览器环境不支持 OffscreenCanvas",
	"panels.topicGraph.empty.waitingMetadata": "正在等待话题元数据…",
	"panels.audio.settings.section.source": "数据源",
	"panels.audio.settings.field.audioTopic.label": "音频话题",
	"panels.audio.settings.field.audioTopic.help": "RawAudio 或 audio_common_msgs 音频流。",
	"panels.audio.settings.field.audioTopic.placeholder": "/sensor/.../audio",
	"panels.audio.settings.field.audioInfoTopic.label": "AudioInfo 话题（可选）",
	"panels.audio.settings.field.audioInfoTopic.help": "For AudioData / AudioDataStamped: explicit AudioInfo topic. Leave empty to try common suffixes (_info, /audio_info) or panel defaults.",
	"panels.audio.settings.field.audioInfoTopic.placeholder": "/audio_info",
	"panels.audio.settings.section.defaults": "默认值（AudioData 回退）",
	"panels.audio.settings.field.defaultSampleRate": "默认采样率：{rate} Hz",
	"panels.audio.settings.field.defaultChannels": "默认声道数：{n}",
	"panels.audio.settings.field.defaultSampleFormat.label": "默认采样格式",
	"panels.audio.settings.field.defaultSampleFormat.help": "例如 S16LE、F32LE",
	"panels.audio.settings.section.playback": "播放",
	"panels.audio.settings.field.volume": "音量：{pct}%",
	"panels.audio.settings.field.mute": "静音",
	"panels.audio.settings.section.display": "显示",
	"panels.audio.settings.field.waveformWindow": "波形窗口（秒）",
	"panels.audio.settings.field.waveformColor": "波形颜色",
	"panels.timeline.settings.section.display": "显示",
	"panels.timeline.settings.field.showFrameDrops": "显示掉帧",
	"panels.topicGraph.settings.section.layout": "布局",
	"panels.topicGraph.settings.field.orientation": "方向",
	"panels.topicGraph.settings.enum.rankDir.lr": "左 / 右",
	"panels.topicGraph.settings.enum.rankDir.tb": "上 / 下",
	"panels.topicGraph.settings.field.showInlineControls": "显示内联控件",
	"panels.rawMessages.settings.section.source": "数据源",
	"panels.rawMessages.settings.field.topic": "话题",
	"panels.rawMessages.settings.section.display": "显示",
	"panels.rawMessages.settings.field.uiRefreshHz": "UI 刷新（Hz）",
	"panels.rawMessages.settings.field.uiRefreshHz.help": "将 UI 重绘与消息到达率解耦",
	"panels.rawMessages.settings.field.pauseUpdates": "暂停更新",
	"panels.rawMessages.settings.field.latestOnly": "仅保留最新",
	"panels.rawMessages.settings.field.latestOnly.help": "始终丢弃中间帧",
	"panels.rawMessages.settings.field.maxExpandedDepth": "最大展开深度",
	"panels.rawMessages.settings.field.maxRows": "最大行数",
	"panels.rawMessages.settings.field.binaryPreviewBytes": "二进制预览字节数",
	"panels.rawMessages.settings.field.binaryPreviewBytes.help": "Uint8Array 字段仅显示前 N 字节",
	"panels.rawMessages.settings.field.binaryCopyFormat": "二进制复制格式",
	"panels.rawMessages.settings.enum.binaryCopy.uint8array": "Uint8Array",
	"panels.rawMessages.settings.enum.binaryCopy.hex": "Hex",
	"panels.rawMessages.settings.enum.binaryCopy.base64": "Base64",
	"panels.rawMessages.copy.success": "已复制 {path}",
	"panels.rawMessages.copy.error": "复制失败",
	"panels.pose.settings.section.source": "数据源",
	"panels.pose.settings.field.schemaAuto.label": "模式自动检测",
	"panels.pose.settings.field.schemaAuto.help": "Pose panel automatically includes geometry_msgs/msg/PoseStamped.",
	"panels.pose.settings.field.topics.label": "话题",
	"panels.pose.settings.field.topics.help": "Detected PoseStamped topics are selected by default.",
	"panels.pose.settings.button.selectAll": "全选",
	"panels.pose.settings.button.clearAll": "全不选",
	"panels.pose.settings.empty.noPoseStamped": "当前数据源中未找到 PoseStamped 话题。",
	"panels.pose.settings.field.color": "颜色",
	"panels.pose.settings.section.trajectory": "轨迹",
	"panels.pose.settings.field.historyWindow": "History window: {sec}s",
	"panels.pose.settings.field.minLineWidth": "Min line width: {px}px",
	"panels.pose.settings.field.maxLineWidth": "Max line width: {px}px",
	"panels.pose.settings.section.pose": "位姿",
	"panels.pose.settings.field.showOrientation": "显示朝向",
	"panels.pose.settings.field.orientationScale": "Orientation scale: {scale}",
	"panels.pose.settings.section.frame": "坐标系",
	"panels.pose.settings.field.frameMode": "坐标系模式",
	"panels.pose.settings.enum.frameMode.raw": "Raw frame",
	"panels.pose.settings.enum.frameMode.tfAligned": "TF aligned",
	"panels.pose.settings.field.targetFrame.label": "目标坐标系",
	"panels.pose.settings.field.targetFrame.help": "Only used in TF aligned mode. Falls back to raw frame when TF is unavailable.",
	"panels.pose.settings.field.targetFrame.placeholder": "map",
	"panels.jointStatePlot.settings.section.source": "数据源",
	"panels.jointStatePlot.settings.field.topic": "话题",
	"panels.jointStatePlot.settings.section.sampling": "采样",
	"panels.jointStatePlot.settings.field.timestampSource": "时间戳来源",
	"panels.jointStatePlot.settings.enum.timestamp.headerStamp": "Header stamp",
	"panels.jointStatePlot.settings.enum.timestamp.receiveTime": "Receive time",
	"panels.jointStatePlot.settings.enum.timestamp.publishTime": "Publish time",
	"panels.jointStatePlot.settings.field.maxPointsPerJoint": "Max points per joint: {n}",
	"panels.jointStatePlot.toolbar.field.position": "position",
	"panels.jointStatePlot.toolbar.field.velocity": "velocity",
	"panels.jointStatePlot.toolbar.field.effort": "effort",
	"panels.jointStatePlot.filter.allJoints": "全部关节",
	"panels.jointStatePlot.empty.selectTopic": "请在上方选择 JointState 话题",
	"panels.jointStatePlot.empty.waitingData": "正在等待 JointState 数据…",
	"panels.threeD.settings.section.display": "显示",
	"panels.threeD.settings.field.showGrid": "显示网格",
	"panels.threeD.settings.field.showAxes": "显示坐标轴",
	"panels.threeD.settings.field.showPlaceholder": "Show placeholder",
	"panels.threeD.settings.field.pointSize": "Point size: {n}",
	"panels.threeD.settings.field.pointSize.help": "Size of point-cloud points, in metres.",
	"panels.threeD.settings.section.urdf": "URDF",
	"panels.threeD.settings.section.urdf.description": "Where to load the robot description from.",
	"panels.threeD.settings.field.urdfSource": "Source",
	"panels.threeD.settings.enum.urdfSource.topic": "ROS topic",
	"panels.threeD.settings.enum.urdfSource.url": "URL",
	"panels.threeD.settings.enum.urdfSource.file": "Upload file",
	"panels.threeD.settings.field.urdfTopic.label": "Topic",
	"panels.threeD.settings.field.urdfTopic.help": "Leave empty to auto-detect (first topic whose name contains `robot_description`).",
	"panels.threeD.settings.field.urdfUrl.label": "URL",
	"panels.threeD.settings.field.urdfUrl.help": "http(s):// or package:// URL pointing to the URDF XML file.",
	"panels.threeD.settings.field.uploadUrdf": "Upload URDF XML",
	"panels.threeD.settings.field.fileInput.replace": "Replace file…",
	"panels.threeD.settings.field.fileInput.choose": "Choose file…",
	"panels.threeD.settings.field.urdfPreview": "Preview ({n} chars)",
	"panels.threeD.settings.field.urdfPreview.help": "Read-only preview of the uploaded URDF. Edit in your local tool and re-upload.",
	"panels.threeD.settings.section.topics": "话题",
	"panels.threeD.settings.section.topics.description": "One topic per line: /topic mode=color. Modes: auto, path, pose, marker, laserScan, depth, skeleton.",
	"panels.threeD.settings.field.topicSettings": "Topic settings",
	"panels.threeD.settings.section.bvh": "BVH Skeleton",
	"panels.threeD.settings.section.bvh.description": "Default transform and style for BVH skeleton line rendering.",
	"panels.threeD.settings.field.skeletonEnabled": "Enable skeleton rendering",
	"panels.threeD.settings.field.skeletonStyle": "Skeleton style",
	"panels.threeD.settings.enum.skeletonStyle.stick": "Box-link stickman",
	"panels.threeD.settings.enum.skeletonStyle.line": "Green lines",
	"panels.threeD.settings.field.skeletonScale": "Scale: {n}",
	"panels.threeD.settings.field.skeletonScale.help": "Scale applied to BVH coordinates before rendering.",
	"panels.threeD.settings.field.yUpToZUp": "Convert Y-up to Z-up",
	"panels.threeD.settings.field.flipYAfterConversion": "Flip Y axis after conversion",
	"panels.threeD.settings.field.skeletonColor": "Skeleton color",
	"panels.image.settings.section.source": "数据源",
	"panels.image.settings.field.topic.label": "话题",
	"panels.image.settings.field.topic.help": "ROS image topic (compressed or raw).",
	"panels.image.settings.field.topic.placeholder": "/camera/.../image_raw",
	"panels.image.settings.field.annotationTopic.label": "标注",
	"panels.image.settings.field.annotationTopic.help": "叠加在图像上的 foxglove.ImageAnnotations 话题。",
	"panels.image.settings.field.annotationTopic.placeholder": "选择标注话题",
	"panels.image.settings.field.annotationVisible": "显示标注",
	"panels.image.settings.section.display": "显示",
	"panels.image.settings.field.showStatusText": "显示状态文字",
	"panels.image.settings.field.backgroundColor": "背景色",
	"panels.image.settings.field.fitMode": "适配模式",
	"panels.image.settings.field.smoothing": "平滑",
	"panels.image.settings.section.transform": "变换",
	"panels.image.settings.field.flipHorizontal": "水平翻转",
	"panels.image.settings.field.flipVertical": "垂直翻转",
	"panels.image.settings.field.rotation": "旋转",
	"panels.image.settings.field.rotation.help": "顺时针角度，单位为度（0–360）。",
	"panels.image.settings.section.color": "颜色（原始 / 深度）",
	"panels.image.settings.colorHint.directRgb": "Colour encoding {encoding} — pixel colours come directly from the data. No remapping applied.",
	"panels.image.settings.colorHint.encodingPending": "正在等待首帧；在检测到像素 encoding 之前，深度范围滑块使用默认 0–65535。",
	"panels.image.settings.field.colorMode": "颜色模式",
	"panels.image.settings.field.flatColor": "纯色",
	"panels.image.settings.field.gradientStart": "渐变起点",
	"panels.image.settings.field.gradientEnd": "渐变终点",
	"panels.image.settings.field.colormap": "伪彩色映射",
	"panels.image.settings.field.opacity": "不透明度",
	"panels.image.settings.field.opacity.help": "Alpha multiplier (0 = transparent, 1 = opaque).",
	"panels.image.settings.field.minValue": "最小值",
	"panels.image.settings.field.minValue.help": "拖动滑块 — 低于此值的像素会裁切到起始颜色。滑块范围：{min}–{max}。",
	"panels.image.settings.field.maxValue": "最大值",
	"panels.image.settings.field.maxValue.help": "拖动滑块 — 高于此值的像素会裁切到结束颜色。滑块范围：{min}–{max}。",
	"panels.image.settings.enum.fitMode.contain": "Contain",
	"panels.image.settings.enum.fitMode.cover": "Cover",
	"panels.image.settings.enum.rotation.deg0": "0°",
	"panels.image.settings.enum.rotation.deg90": "90°",
	"panels.image.settings.enum.rotation.deg180": "180°",
	"panels.image.settings.enum.rotation.deg270": "270°",
	"panels.image.settings.enum.colorMode.colormap": "Colormap",
	"panels.image.settings.enum.colorMode.gradient": "Gradient",
	"panels.image.settings.enum.colorMode.flat": "Flat",
	"panels.image.settings.enum.colorMode.rgb": "RGB packed",
	"panels.image.settings.enum.colorMode.rgba": "RGBA packed",
	"panels.image.settings.enum.colorMode.rgbaFields": "RGBA separate fields",
	"panels.image.settings.enum.colorMap.turbo": "Turbo",
	"panels.image.settings.enum.colorMap.rainbow": "Rainbow",
	"panels.jointStatePlot.filter.partial": "{current}/{total}",
	"urdfDebug.defaultTitle": "URDF 调试",
	"urdfDebug.section.input": "输入",
	"urdfDebug.section.appearance": "外观",
	"urdfDebug.section.joints": "关节姿态",
	"urdfDebug.section.export": "导出",
	"urdfDebug.field.jointTopic": "JointState 话题",
	"urdfDebug.field.urdfRequired": "URDF 文件（必填）",
	"urdfDebug.upload.dropUrdfTitle": "拖放 URDF 文件到此处",
	"urdfDebug.upload.dropUrdfHint": "支持 .urdf / .xml，可拖放或点击浏览",
	"urdfDebug.upload.dropMeshTitle": "拖放 Mesh 文件夹到此处",
	"urdfDebug.upload.dropMeshHint": "拖入含 .stl、.dae、.obj 的文件夹，或点击浏览",
	"urdfDebug.upload.browse": "浏览文件",
	"urdfDebug.upload.invalidUrdf": "请拖入 .urdf 或 .xml 文件。",
	"urdfDebug.upload.invalidMesh": "所选内容中未找到 mesh 文件（.stl / .dae / .obj）。",
	"urdfDebug.resizeSettings": "调整调参面板宽度",
	"urdfDebug.field.meshOptional": "Mesh 文件（可选）",
	"urdfDebug.field.meshStrategy": "Mesh 策略",
	"urdfDebug.field.packageBaseUrl": "Package 基础 URL",
	"urdfDebug.field.packageName": "Package 名称",
	"urdfDebug.field.visualRpyOffset": "Visual RPY 偏移",
	"urdfDebug.selectTopic": "选择话题",
	"urdfDebug.selectJointStateTopic": "选择 JointState 话题",
	"urdfDebug.section.meshResources": "Mesh 资源",
	"urdfDebug.meshBase.hint": "解析 URDF 中的 package:// mesh 路径。可选择本地 meshes 文件夹，或填写远程 Base URL 后点击「应用」。",
	"urdfDebug.meshBase.mode.localFolder": "本地文件夹",
	"urdfDebug.meshBase.mode.remoteUrl": "远程 Base URL（HTTP/HTTPS）",
	"urdfDebug.meshBase.pickFolder": "选择文件夹…",
	"urdfDebug.meshBase.folderSelected": "文件夹「{folder}」· {count} 个 mesh 文件",
	"urdfDebug.meshBase.folderEmpty": "尚未选择文件夹。",
	"urdfDebug.meshBase.remotePlaceholder": "https://your-host/resources/Robot/meshes",
	"urdfDebug.meshBase.apply": "应用",
	"urdfDebug.meshBase.applied": "已应用 Base URL",
	"urdfDebug.meshBase.remoteNotApplied": "请输入 URL 并点击「应用」后才会解析 mesh 链接。",
	"urdfDebug.meshBase.remoteInvalid": "请输入有效的 http:// 或 https:// URL。",
	"urdfDebug.meshBase.detectPackage": "从 URDF 检测",
	"urdfDebug.meshBase.resolvedTitle": "Mesh 解析结果",
	"urdfDebug.meshBase.refresh": "重新检测",
	"urdfDebug.meshBase.checking": "正在检测 mesh URL…",
	"urdfDebug.meshBase.summary": "{ok} / {total} 可访问 · {failed} 个问题",
	"urdfDebug.meshStatus.pending": "检测中",
	"urdfDebug.meshStatus.ok": "可访问",
	"urdfDebug.meshStatus.local": "已从本地加载",
	"urdfDebug.meshStatus.missing": "未解析",
	"urdfDebug.meshStatus.error": "加载失败",
	"urdfDebug.meshStatus.cors": "CORS 受限（3D 预览仍可能成功）",
	"urdfDebug.meshStatus.unchecked": "未检测",
	"urdfDebug.meshStrategy.packageBaseUrl": "Package 基础 URL",
	"urdfDebug.meshStrategy.leaveAsIs": "保持原样",
	"urdfDebug.rotateMeshVisuals": "旋转 mesh 视觉",
	"urdfDebug.rotateMeshVisualsHint": "若模型倾斜或侧躺（常见于 CAD 导出的 STL，如 Tron2、Unitree G1），请开启；若模型已正确站立，请关闭。导出脚本会将对应朝向写入 URDF。",
	"urdfDebug.preview.empty": "上传 URDF 文件以预览机器人。",
	"urdfDebug.preview.emptyTopicNoSelection": "请选择 /robot_description 话题，或打开包含该话题的录制文件。",
	"urdfDebug.preview.emptyTopicWaiting": "已订阅 {topic}，等待 URDF 字符串消息…",
	"urdfDebug.preview.error": "URDF 预览失败：{message}",
	"urdfDebug.preview.emptyModel": "没有可见几何体（{failed}/{total} 个 mesh 失败，{visible} 个 link 可见）",
	"urdfDebug.preview.issueLine": "{url}：{reason}",
	"urdfDebug.preview.moreIssues": "还有 {count} 个问题",
	"urdfDebug.input.source.file": "上传 URDF 文件",
	"urdfDebug.input.source.topic": "从 MCAP 话题读取（std_msgs/String）",
	"urdfDebug.input.topicLoaded": "已从 {topic} 加载 · {bytes} 字节",
	"urdfDebug.input.topicWaiting": "正在等待 {topic} 的首条消息…",
	"urdfDebug.input.topicAutoDetectHint": "留空将自动检测名称包含 robot_description 的话题。",
	"urdfDebug.preview.title": "URDF 预览 · 旋转 mesh：{rotateMesh}",
	"urdfDebug.preview.rotateMeshOn": "开",
	"urdfDebug.preview.rotateMeshOff": "关",
	"urdfDebug.preview.loadingMesh": "加载 mesh {loaded}/{total}",
	"urdfDebug.showGrid": "显示网格",
	"urdfDebug.showAxes": "显示坐标轴",
	"urdfDebug.joints.followLive": "跟随 MCAP JointState",
	"urdfDebug.joints.noJointStateTopics": "当前录制中没有 JointState 话题。",
	"urdfDebug.joints.selectJointStateTopicHint": "请选择一个 JointState 话题以驱动预览。",
	"urdfDebug.joints.waitingForJointState": "已订阅 {topic}，等待 JointState 消息…",
	"urdfDebug.joints.resetAll": "全部归零",
	"urdfDebug.joints.filter": "过滤关节…",
	"urdfDebug.joints.uploadUrdfHint": "上传 URDF 后可使用关节 Slider 调试姿态。",
	"urdfDebug.joints.noMatch": "没有匹配的关节。",
	"urdfDebug.joints.manualUnsupported": "该关节类型暂不支持手动调试。",
	"urdfDebug.joints.fixedJoint": "固定关节（无 Slider）。",
	"urdfDebug.jointType.revolute": "旋转",
	"urdfDebug.jointType.prismatic": "移动",
	"urdfDebug.jointType.continuous": "连续旋转",
	"urdfDebug.jointType.fixed": "固定",
	"urdfDebug.jointType.planar": "平面",
	"urdfDebug.jointType.floating": "浮动",
	"urdfDebug.action.autoMatch": "自动匹配",
	"urdfDebug.action.symmetricPair": "对称关节对",
	"urdfDebug.action.mimicFill": "Mimic 填充",
	"urdfDebug.action.invertFirst": "反转首个",
	"urdfDebug.action.gripper01": "夹爪 0-1",
	"urdfDebug.action.xArm851": "xArm 851",
	"urdfDebug.noRules": "暂无规则。",
	"urdfDebug.diag.jointTopic": "Joint 话题",
	"urdfDebug.diag.existingTf": "已有 /tf",
	"urdfDebug.diag.existingRobotDescription": "已有 /robot_description",
	"urdfDebug.diag.robot": "机器人",
	"urdfDebug.diag.linksJoints": "Links / joints",
	"urdfDebug.diag.matchCoverage": "匹配覆盖率",
	"urdfDebug.diag.generatedTfCount": "生成 TF 数量",
	"urdfDebug.diag.unmatchedInputJoints": "未匹配输入关节",
	"urdfDebug.diag.missingUrdfJoints": "缺失 URDF 关节",
	"urdfDebug.diag.meshIssues": "Mesh 问题",
	"urdfDebug.diag.missing": "缺失",
	"urdfDebug.yes": "是",
	"urdfDebug.no": "否",
	"urdfDebug.rule.inputJoint": "输入关节",
	"urdfDebug.rule.urdfJoint": "URDF 关节",
	"urdfDebug.rule.rename": "重命名",
	"urdfDebug.rule.linear": "线性",
	"urdfDebug.rule.constant": "常量",
	"urdfDebug.rule.ignore": "忽略",
	"urdfDebug.help.body": "上传 URDF 并调整关节映射，直到预览与录制数据一致。若 mesh 朝向不对（常见于 CAD 导出），可切换「旋转 mesh 视觉」。对称关节对用于左右夹爪；Mimic 填充会根据 URDF 的 mimic 标签补齐从动关节。导出 recipe.json 或处理脚本后，可在本地重写 MCAP，写入 /robot_description 与 /tf。"
}, Sn = {
	"playback.annotationsEmpty": "暂无标注区间",
	"playback.buffering": "播放缓冲中",
	"playback.play": "播放",
	"playback.pause": "暂停",
	"playback.timeMode.relative.aria": "当前为相对时间，点击切换为绝对时间",
	"playback.timeMode.absolute.aria": "当前为绝对时间，点击切换为相对时间",
	"playback.timeMode.relative.title": "相对时间（距日志起点）。点击切换为绝对时间（本地日期时间）",
	"playback.timeMode.absolute.title": "绝对时间（本地日期时间）。点击切换为相对时间（距日志起点）",
	"playback.stepBack.aria": "按消息后退一条",
	"playback.stepBack.title": "按消息后退一条（按住 Alt：按时间步进，默认 10ms；Alt+Ctrl/Cmd 为 100ms）",
	"playback.stepForward.aria": "按消息前进一条",
	"playback.stepForward.title": "按消息前进一条（按住 Alt：按时间步进）",
	"playback.speed.aria": "播放速度",
	"playback.samplingFps.aria": "采样帧率",
	"playback.loop.aria": "循环播放模式",
	"playback.loop.loop": "循环",
	"playback.loop.once": "单次"
}, Cn = {
	"quality.title": "质量",
	"quality.empty": "暂无报告",
	"quality.header.scanWithPct": "已扫 {scanned} / {total}（{pct}%）{suffix}",
	"quality.header.scanNoPct": "已扫 {scanned} / {total}{suffix}",
	"quality.scan.start": "开始扫描",
	"quality.scan.rescan": "重新扫描",
	"quality.scan.auto": "小文件自动扫描",
	"quality.scan.idleHint": "质量扫描当前未启动。需要时手动开始，避免大文件影响流程。",
	"quality.scan.skippedLargeFile": "已跳过自动扫描：共 {total} 条消息。超过 {limit} 条消息的文件需要手动扫描，以保持播放流畅。",
	"quality.scan.failed": "质量扫描失败。请重新扫描或检查文件格式。",
	"quality.status.scanning": "{scanned}/{total}…",
	"quality.status.ready": "{scanned}/{total}",
	"quality.noMatches": "没有发现问题",
	"quality.noFilterMatches": "无匹配",
	"quality.count": "{count} 次",
	"quality.maxMagnitude": "最大 {ms} ms",
	"quality.trend": "走势",
	"quality.clockSource": "时钟",
	"quality.clock.header": "Header",
	"quality.clock.log": "Log",
	"quality.scope": "范围",
	"quality.scope.topic": "单 topic",
	"quality.scope.group": "组",
	"quality.scope.global": "全局",
	"quality.baselineInterval": "基线 Δt",
	"quality.beforeVsAnomaly": "前 / 异常 Δt",
	"quality.afterInterval": "后 Δt",
	"quality.chart.time": "时间",
	"quality.chart.deltaNs": "Δt",
	"quality.chart.zoomHint": "拖拽放大",
	"quality.chart.resetZoom": "重置缩放",
	"quality.chart.axis.deviation": "帧间隔偏差",
	"quality.evidence.zone.before": "前",
	"quality.evidence.zone.anomaly": "异常",
	"quality.evidence.zone.after": "后",
	"quality.flag.rollback": "回退",
	"quality.flag.dropEstimate": "估间隙",
	"quality.clearFilter": "清除筛选",
	"quality.type.timestamp_rollback": "回退",
	"quality.type.topic_frame_drop": "单 topic 丢帧",
	"quality.summary.timestamp_rollback": "{clock}：回退 {ms} ms",
	"quality.summary.topic_frame_drop": "{clock}：间隔 ~{ms} ms",
	"quality.summary.generic": "{clock}：异常 ~{ms} ms",
	"quality.incident.title.timestamp_rollback": "{topic} 时间戳回退",
	"quality.incident.title.topic_frame_drop": "{topic} 帧间隔异常",
	"quality.incident.title.generic": "质量问题",
	"quality.incident.impact.timestamp_rollback": "{count} 个回退错误，最大回退 {ms} ms。",
	"quality.incident.impact.topic_frame_drop": "{count} 个间隙错误，最大超出平均间隔 {ms} ms。",
	"quality.incident.impact.generic_timing": "{topicCount} 个 Topic 中出现 {count} 个时序异常点，最大偏差 {ms} ms。",
	"quality.incident.recommendation.timestamp_rollback": "检查传感器驱动的时钟或源时间戳；如果 header 时间不稳定，该片段建议优先使用 log time。",
	"quality.incident.recommendation.frame_drop": "检查受影响 Topic 组的发布频率、QoS 和传输压力。",
	"quality.incident.recommendation.generic": "查看该时间附近受影响的消息。",
	"quality.mergedSources": "合并 {n}",
	"quality.chart.balancedLegend": "B{b} · A{a} · N{n}",
	"quality.overview": "问题总览",
	"quality.incidentCount": "{count} 个错误",
	"quality.tabs.chart": "图表",
	"quality.tabs.table": "原始数据",
	"quality.metric.anomalyPoints": "异常点 {count}",
	"quality.metric.maxDeviation": "最大 |Δ| {value} ms",
	"quality.metric.topicCount": "影响 Topic {count}",
	"quality.details.topic": "Topic",
	"quality.details.noTopic": "无 Topic",
	"quality.details.noRows": "无原始点数据",
	"quality.details.table.index": "序号",
	"quality.details.table.logTime": "log time",
	"quality.details.table.headerTime": "header time",
	"quality.details.table.deviation": "差值",
	"quality.details.table.zone": "区段",
	"quality.filter.all": "全部",
	"quality.filter.error": "严重",
	"quality.filter.warn": "警告",
	"quality.filter.allTypes": "全部类型",
	"quality.filter.search": "搜索 topic 或分组",
	"quality.recommendation": "建议"
}, wn = {
	"sidebar.tab.topics": "话题",
	"sidebar.tab.datasets": "数据",
	"sidebar.tab.quality": "质量",
	"sidebar.tab.settings": "设置",
	"sidebar.settings.noActivePanel": "选择一个面板以编辑其设置。",
	"sidebar.settings.noSettings": "该面板未提供任何设置项。",
	"sidebar.topicFilter": "筛选话题…",
	"sidebar.topicMeta": "{count} 条消息",
	"sidebar.topicRow.actionsMenu": "话题操作",
	"sidebar.topicRow.copyTopicName": "复制话题名称",
	"sidebar.topicRow.copySchemaName": "复制 Schema 名称",
	"sidebar.topicRow.sourceFiles": "来源：{files}",
	"sidebar.topicDropTitle": "拖到此处打开原始消息",
	"sidebar.topicDropSubtitle": "松开后会创建 Raw Messages 面板",
	"sidebar.datasetSize": "{size}",
	"sidebar.datasetDuration": "{sec} 秒",
	"sidebar.datasetTopics": "{n} 个话题",
	"sidebar.datasetGroup.fileCount": "已合并 {count} 个文件",
	"sidebar.openFile": "添加文件",
	"sidebar.openDirectory": "打开目录",
	"sidebar.noTopics": "无话题",
	"sidebar.noDatasets": "未加载文件",
	"sidebar.displayMulti": "多行",
	"sidebar.displayAgg": "聚合"
}, Tn = {
	"welcome.heroEyebrow": "录制查看",
	"welcome.tagline": "支持 MCAP、bag、db3、HDF5；本地、URL 或 tar 包。",
	"welcome.heroSubtitle": "浏览本地 ROS 或者 HDF5 数据，无需上传云端。",
	"welcome.badgeLocalFirst": "本地浏览器运行，数据不上云",
	"welcome.samplesSectionHint": "以下为带封面的示例数据，点击即可打开。",
	"welcome.footerDevelopedBy": "由 ",
	"welcome.footerOrgName": "IO-AI.TECH",
	"welcome.footerDevelopedSuffix": " 开发并 ",
	"welcome.footerOpenSourceLink": "开源",
	"welcome.footerOpenSourceSuffix": "。",
	"welcome.historyTitle": "最近打开",
	"welcome.historyExpand": "展开全部历史",
	"welcome.historyCollapse": "收起",
	"welcome.historyEmpty": "暂无最近记录。",
	"welcome.historyPermissionDenied": "无法读取已保存的文件或文件夹，请授权后重试或重新选择。",
	"welcome.historyFileCount": "{count} 个文件",
	"welcome.historyFolderPicker": "文件夹",
	"welcome.historyDroppedFiles": "拖入的文件",
	"welcome.historyFromFilePicker": "本地文件选择",
	"welcome.historyEmptyDirectory": "该文件夹内没有支持的录制文件。",
	"welcome.historyNoSupportedRecordings": "已保存的选择中没有支持的录制文件。",
	"welcome.urlLocalRestoreMiss": "无法从浏览记录恢复该本地文件或文件夹，请重新选择或通过「最近打开」打开。",
	"welcome.sampleManifestNotConfigured": "未配置示例索引 — 构建时请设置 VITE_SAMPLE_DATASETS_MANIFEST_URL 或 VITE_SAMPLES_BASE_URL。",
	"welcome.sampleIdNotFound": "示例目录中没有 id 为「{id}」的数据集。",
	"welcome.historyKindUrl": "链接",
	"welcome.historyKindRemoteTar": "远程归档",
	"welcome.historyKindSample": "样例",
	"welcome.historyKindFolder": "文件夹",
	"welcome.historyKindFiles": "文件",
	"welcome.historyKindTar": "归档",
	"welcome.tabFile": "文件",
	"welcome.tabDirectory": "文件夹",
	"welcome.tabRemote": "链接",
	"welcome.tabTar": "归档",
	"welcome.openLocalTar": "本地 tar / tgz",
	"welcome.tarHint": "内含录制文件",
	"welcome.remoteUrlPlaceholder": "https://…/xxx.mcap",
	"welcome.remoteUrlErrorRequired": "请输入 URL",
	"welcome.remoteUrlErrorInvalid": "需以 http:// 或 https:// 开头",
	"welcome.remoteUrlErrorUnsupported": "扩展名需为 mcap、bag、db3、hdf5 或 tar/tgz",
	"welcome.opening": "打开中…",
	"welcome.open": "打开",
	"welcome.samplesSectionTitle": "样例",
	"welcome.samplesLoading": "加载中…",
	"welcome.samplesEmpty": "未配置样例。",
	"welcome.samplesDialogTitle": "样例",
	"welcome.samplesDialogDescription": "选择一项打开。",
	"welcome.openFile": "选择文件",
	"welcome.openDirectory": "选择文件夹",
	"welcome.fileTypes": "mcap · bag · db3 · hdf5 · bvh",
	"welcome.directoryHint": "导入文件夹内全部匹配文件",
	"welcome.loadingTitle": "加载中",
	"welcome.loadingPhase.preparing": "准备中…",
	"welcome.loadingSpeed": "{speed}/s",
	"welcome.loadingEtaSeconds": "约 {n} 秒",
	"welcome.loadingEtaMinutes": "约 {n} 分钟",
	"welcome.loadingEtaHours": "约 {n} 小时",
	"welcome.cancelLoading": "取消",
	"welcome.manualOpenFileHint": "请手动打开 {name} 文件。",
	"welcome.manualOpenFolderHint": "请手动打开 {name} 文件夹。"
}, En = [
	tn,
	ln,
	rn,
	nn,
	cn,
	sn,
	on,
	an
], Dn = [
	vn,
	Tn,
	bn,
	yn,
	wn,
	Cn,
	Sn,
	xn
], On = [
	un,
	_n,
	fn,
	dn,
	gn,
	hn,
	mn,
	pn
];
function kn(e, ...t) {
	let n = {};
	for (let e of t) for (let [t, r] of Object.entries(e)) n[t] = r;
	return n;
}
var An = {
	en: kn("en", ...En),
	zh: kn("zh", ...Dn),
	ja: kn("ja", ...On)
};
function jn(e) {
	return An[e] ?? An.en;
}
//#endregion
//#region node_modules/sonner/dist/index.mjs
function Mn(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var Nn = (e) => {
	switch (e) {
		case "success": return In;
		case "info": return Rn;
		case "warning": return Ln;
		case "error": return zn;
		default: return null;
	}
}, Pn = Array(12).fill(0), Fn = ({ visible: e, className: n }) => /*#__PURE__*/ t.createElement("div", {
	className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ t.createElement("div", { className: "sonner-spinner" }, Pn.map((e, n) => /*#__PURE__*/ t.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${n}`
})))), In = /*#__PURE__*/ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ t.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Ln = /*#__PURE__*/ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ t.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), Rn = /*#__PURE__*/ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), zn = /*#__PURE__*/ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ t.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Bn = /*#__PURE__*/ t.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true"
}, /*#__PURE__*/ t.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ t.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), Vn = () => {
	let [e, n] = t.useState(document.hidden);
	return t.useEffect(() => {
		let e = () => {
			n(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, Hn = 1, Un = 100, Wn = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : Hn++, W = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - Un;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = Wn(e), i = this.pendingDismissals.get(r);
			i !== void 0 && (cancelAnimationFrame(i), this.pendingDismissals.delete(r), this.dismissedToasts.delete(r));
			let a = this.dismissedToasts.has(r), o = e.dismissible === void 0 || e.dismissible;
			return a && (this.dismissedToasts.delete(r), this.toasts = this.toasts.filter((e) => e.id !== r)), !a && this.toasts.find((e) => e.id === r) ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: o,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: o,
				id: r
			}), r;
		}, this.dismiss = (e) => {
			if (e == null) return this.getActiveToasts().forEach((e) => {
				this.dismissedToasts.add(e.id), this.subscribers.forEach((t) => t({
					id: e.id,
					dismiss: !0
				}));
			}), e;
			this.dismissedToasts.add(e);
			let t = this.pendingDismissals.get(e);
			return t !== void 0 && cancelAnimationFrame(t), this.pendingDismissals.set(e, requestAnimationFrame(() => {
				this.pendingDismissals.delete(e), this.subscribers.forEach((t) => t({
					id: e,
					dismiss: !0
				}));
			})), e;
		}, this.message = (e, t) => this.create({
			...t,
			message: e,
			type: void 0
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, n) => {
			if (!n) return;
			let r;
			n.loading !== void 0 && (r = this.create({
				...n,
				promise: e,
				type: "loading",
				message: n.loading,
				description: typeof n.description == "function" ? void 0 : n.description
			}));
			let i = Promise.resolve(e instanceof Function ? e() : e), a = r !== void 0, o, s = i.then(async (e) => {
				if (o = ["resolve", e], t.isValidElement(e)) a = !1, this.create({
					id: r,
					type: "default",
					message: e
				});
				else if (Kn(e) && !e.ok) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(`HTTP error! status: ${e.status}`) : n.error, o = typeof n.description == "function" ? await n.description(`HTTP error! status: ${e.status}`) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				} else if (e instanceof Error) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(e) : n.error, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				} else if (n.success !== void 0) {
					a = !1;
					let i = typeof n.success == "function" ? await n.success(e) : n.success, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "success",
						description: o,
						...s
					});
				}
			}).catch(async (e) => {
				if (o = ["reject", e], n.error !== void 0) {
					a = !1;
					let i = typeof n.error == "function" ? await n.error(e) : n.error, o = typeof n.description == "function" ? await n.description(e) : n.description, s = typeof i == "object" && !t.isValidElement(i) ? i : { message: i };
					this.create({
						id: r,
						type: "error",
						description: o,
						...s
					});
				}
			}).finally(() => {
				a && (this.dismiss(r), r = void 0), n.finally == null || n.finally.call(n);
			}), c = () => new Promise((e, t) => s.then(() => o[0] === "reject" ? t(o[1]) : e(o[1])).catch(t));
			return typeof r != "string" && typeof r != "number" ? { unwrap: c } : Object.assign(r, { unwrap: c });
		}, this.custom = (e, t) => {
			let n = Wn(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), Gn = (e, t) => W.message(e, t), Kn = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", qn = Object.assign(Gn, {
	success: W.success,
	info: W.info,
	warning: W.warning,
	error: W.error,
	custom: W.custom,
	message: W.message,
	promise: W.promise,
	dismiss: W.dismiss,
	loading: W.loading
}, {
	getHistory: () => W.toasts,
	getToasts: () => W.getActiveToasts()
});
Mn("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Jn(e) {
	return e.label !== void 0;
}
var Yn = 3, Xn = "24px", Zn = "16px", Qn = 4e3, $n = 356, er = 14, tr = 45, nr = 200;
function G(...e) {
	return e.filter(Boolean).join(" ");
}
function rr(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var ir = (e) => {
	let { invert: n, toast: r, unstyled: i, interacting: a, setHeights: o, visibleToasts: s, heights: c, index: l, toasts: u, expanded: d, removeToast: f, defaultRichColors: p, closeButton: m, style: h, cancelButtonStyle: g, actionButtonStyle: ee, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: x, expandByDefault: te, classNames: S, icons: C, closeButtonAriaLabel: w = "Close toast" } = e, [T, E] = t.useState(null), [ne, re] = t.useState(null), [D, O] = t.useState(!1), [k, ie] = t.useState(!1), [A, j] = t.useState(!1), [ae, M] = t.useState(!1), [N, oe] = t.useState(!1), [P, F] = t.useState(0), [se, ce] = t.useState(0), I = t.useRef(r.duration || y || Qn), le = t.useRef(null), L = t.useRef(null), ue = l === 0, de = l + 1 <= s, R = r.type, fe = R ?? "default", pe = r.dismissible !== !1, me = r.className || "", he = r.descriptionClassName || "", ge = t.useMemo(() => c.findIndex((e) => e.toastId === r.id) || 0, [c, r.id]), z = t.useMemo(() => r.closeButton ?? m, [r.closeButton, m]), _e = t.useMemo(() => r.duration || y || Qn, [r.duration, y]), ve = t.useRef(0), ye = t.useRef(0), be = t.useRef(0), xe = t.useRef(null), [Se, Ce] = b.split("-"), we = t.useMemo(() => c.reduce((e, t, n) => n >= ge ? e : e + t.height, 0), [c, ge]), Te = Vn(), B = t.useMemo(() => e.swipeDirections ?? rr(b), [e.swipeDirections, b]), Ee = r.invert || n, De = R === "loading";
	ye.current = t.useMemo(() => ge * x + we, [ge, we]), t.useEffect(() => {
		I.current = _e;
	}, [_e]), t.useEffect(() => {
		O(!0);
	}, []), t.useEffect(() => {
		let e = L.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return ce(t), o((e) => [{
				toastId: r.id,
				height: t,
				position: r.position
			}, ...e]), () => o((e) => e.filter((e) => e.toastId !== r.id));
		}
	}, [o, r.id]), t.useLayoutEffect(() => {
		if (!D) return;
		let e = L.current, t = e.style.height;
		e.style.height = "auto";
		let n = e.getBoundingClientRect().height;
		e.style.height = t, ce(n), o((e) => e.find((e) => e.toastId === r.id) ? e.map((e) => e.toastId === r.id ? {
			...e,
			height: n
		} : e) : [{
			toastId: r.id,
			height: n,
			position: r.position
		}, ...e]);
	}, [
		D,
		r.title,
		r.description,
		o,
		r.id,
		r.jsx,
		r.action,
		r.cancel
	]);
	let V = t.useCallback(() => {
		ie(!0), F(ye.current), o((e) => e.filter((e) => e.toastId !== r.id)), setTimeout(() => {
			f(r);
		}, nr);
	}, [
		r,
		f,
		o,
		ye
	]);
	t.useEffect(() => {
		if (r.promise && R === "loading" || r.duration === Infinity || r.type === "loading") return;
		let e;
		return d || a || Te ? (() => {
			if (be.current < ve.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - ve.current;
				I.current -= e;
			}
			be.current = (/* @__PURE__ */ new Date()).getTime();
		})() : I.current !== Infinity && (ve.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			r.onAutoClose == null || r.onAutoClose.call(r, r), V();
		}, I.current)), () => clearTimeout(e);
	}, [
		d,
		a,
		r,
		R,
		Te,
		V
	]), t.useEffect(() => {
		r.delete && (V(), r.onDismiss == null || r.onDismiss.call(r, r));
	}, [V, r.delete]);
	function Oe() {
		return C?.loading ? /*#__PURE__*/ t.createElement("div", {
			className: G(S?.loader, r?.classNames?.loader, "sonner-loader"),
			"data-visible": R === "loading"
		}, C.loading) : /*#__PURE__*/ t.createElement(Fn, {
			className: G(S?.loader, r?.classNames?.loader),
			visible: R === "loading"
		});
	}
	let ke = r.icon || C?.[R] || Nn(R);
	return /*#__PURE__*/ t.createElement("li", {
		tabIndex: 0,
		ref: L,
		className: G(_, me, S?.toast, r?.classNames?.toast, S?.[fe], r?.classNames?.[fe]),
		"data-sonner-toast": "",
		"data-rich-colors": r.richColors ?? p,
		"data-styled": !(r.jsx || r.unstyled || i),
		"data-mounted": D,
		"data-promise": !!r.promise,
		"data-swiped": N,
		"data-removed": k,
		"data-visible": de,
		"data-y-position": Se,
		"data-x-position": Ce,
		"data-index": l,
		"data-front": ue,
		"data-swiping": A,
		"data-dismissible": pe,
		"data-type": R,
		"data-invert": Ee,
		"data-swipe-out": ae,
		"data-swipe-direction": ne,
		"data-expanded": !!(d || te && D),
		"data-testid": r.testId,
		style: {
			"--index": l,
			"--toasts-before": l,
			"--z-index": u.length - l,
			"--offset": `${k ? P : ye.current}px`,
			"--initial-height": te ? "auto" : `${se}px`,
			...h,
			...r.style
		},
		onDragEnd: () => {
			j(!1), E(null), xe.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (De || !pe || (le.current = /* @__PURE__ */ new Date(), F(ye.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (j(!0), xe.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (ae || !pe) return;
			xe.current = null;
			let e = Number(L.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(L.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), n = (/* @__PURE__ */ new Date()).getTime() - le.current?.getTime(), i = T === "x" ? e : t, a = Math.abs(i) / n;
			if ((T === "x" ? B.includes(e > 0 ? "right" : "left") : B.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= tr || a > .11)) {
				F(ye.current), r.onDismiss == null || r.onDismiss.call(r, r), re(T === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), V(), M(!0);
				return;
			}
			var o, s;
			(o = L.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = L.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), oe(!1), j(!1), E(null);
		},
		onPointerMove: (e) => {
			var t, n;
			if (!xe.current || !pe || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - xe.current.y, i = e.clientX - xe.current.x;
			!T && (Math.abs(i) > 1 || Math.abs(r) > 1) && E(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (T === "y") {
				if (B.includes("top") || B.includes("bottom")) {
					if (B.includes("top") && r < 0 || B.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (T === "x" && (B.includes("left") || B.includes("right"))) {
				if (B.includes("left") && i < 0 || B.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && oe(!0), (t = L.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = L.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, z && !r.jsx && R !== "loading" ? /*#__PURE__*/ t.createElement("button", {
		"aria-label": w,
		"data-disabled": De,
		"data-close-button": !0,
		onClick: De || !pe ? () => {} : () => {
			V(), r.onDismiss == null || r.onDismiss.call(r, r);
		},
		className: G(S?.closeButton, r?.classNames?.closeButton)
	}, C?.close ?? Bn) : null, (R || r.icon || r.promise) && r.icon !== null && (C?.[R] !== null || r.icon) ? /*#__PURE__*/ t.createElement("div", {
		"data-icon": "",
		className: G(S?.icon, r?.classNames?.icon)
	}, R === "loading" ? r.icon || Oe() : r.promise ? Oe() : null, R === "loading" ? null : ke) : null, /*#__PURE__*/ t.createElement("div", {
		"data-content": "",
		className: G(S?.content, r?.classNames?.content)
	}, /*#__PURE__*/ t.createElement("div", {
		"data-title": "",
		className: G(S?.title, r?.classNames?.title)
	}, r.jsx ? r.jsx : typeof r.title == "function" ? r.title() : r.title), r.description ? /*#__PURE__*/ t.createElement("div", {
		"data-description": "",
		className: G(v, he, S?.description, r?.classNames?.description)
	}, typeof r.description == "function" ? r.description() : r.description) : null), /*#__PURE__*/ t.isValidElement(r.cancel) ? r.cancel : r.cancel && Jn(r.cancel) ? /*#__PURE__*/ t.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: r.cancelButtonStyle || g,
		onClick: (e) => {
			Jn(r.cancel) && pe && (r.cancel.onClick == null || r.cancel.onClick.call(r.cancel, e), V());
		},
		className: G(S?.cancelButton, r?.classNames?.cancelButton)
	}, r.cancel.label) : null, /*#__PURE__*/ t.isValidElement(r.action) ? r.action : r.action && Jn(r.action) ? /*#__PURE__*/ t.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: r.actionButtonStyle || ee,
		onClick: (e) => {
			Jn(r.action) && (r.action.onClick == null || r.action.onClick.call(r.action, e), !e.defaultPrevented && V());
		},
		className: G(S?.actionButton, r?.classNames?.actionButton)
	}, r.action.label) : null);
};
function ar() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function or(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? Zn : Xn;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var sr = /*#__PURE__*/ t.forwardRef(function(e, n) {
	let { id: r, invert: i, position: a = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: c, className: l, offset: d, mobileOffset: f, theme: p = "light", richColors: m, duration: h, style: g, visibleToasts: ee = Yn, toastOptions: _, dir: v = ar(), gap: y = er, icons: b, customAriaLabel: x, containerAriaLabel: te = "Notifications" } = e, [S, C] = t.useState([]), w = t.useMemo(() => r ? S.filter((e) => e.toasterId === r) : S.filter((e) => !e.toasterId), [S, r]), T = t.useMemo(() => Array.from(new Set([a].concat(w.filter((e) => e.position).map((e) => e.position)))), [w, a]), [E, ne] = t.useState([]), [re, D] = t.useState(!1), [O, k] = t.useState(!1), [ie, A] = t.useState(p === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : p), j = t.useRef(null), ae = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), M = t.useRef(null), N = t.useRef(!1), oe = t.useCallback((e) => {
		C((t) => (t.find((t) => t.id === e.id)?.delete || W.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return t.useEffect(() => W.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				C((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			u.flushSync(() => {
				C((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), []), t.useEffect(() => {
		if (p !== "system") {
			A(p);
			return;
		}
		if (p === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? A("dark") : A("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				A(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					A(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [p]), t.useEffect(() => {
		S.length <= 1 && D(!1);
	}, [S]), t.useEffect(() => {
		let e = (e) => {
			if (o.length > 0 && o.every((t) => e[t] || e.code === t)) {
				var t;
				D(!0), (t = j.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === j.current || j.current?.contains(document.activeElement)) && D(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [o]), t.useEffect(() => {
		if (j.current) return () => {
			M.current && (M.current.focus({ preventScroll: !0 }), M.current = null, N.current = !1);
		};
	}, [j.current]), /*#__PURE__*/ t.createElement("section", {
		ref: n,
		"aria-label": x ?? `${te} ${ae}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, T.map((n, r) => {
		let [a, o] = n.split("-");
		return w.length ? /*#__PURE__*/ t.createElement("ol", {
			key: n,
			dir: v === "auto" ? ar() : v,
			tabIndex: -1,
			ref: j,
			className: l,
			"data-sonner-toaster": !0,
			"data-sonner-theme": ie,
			"data-y-position": a,
			"data-x-position": o,
			style: {
				"--front-toast-height": `${E[0]?.height || 0}px`,
				"--width": `${$n}px`,
				"--gap": `${y}px`,
				...g,
				...or(d, f)
			},
			onBlur: (e) => {
				N.current && !e.currentTarget.contains(e.relatedTarget) && (N.current = !1, M.current &&= (M.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || N.current || (N.current = !0, M.current = e.relatedTarget);
			},
			onMouseEnter: () => D(!0),
			onMouseMove: () => D(!0),
			onMouseLeave: () => {
				O || D(!1);
			},
			onDragEnd: () => D(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || k(!0);
			},
			onPointerUp: () => k(!1)
		}, w.filter((e) => !e.position && r === 0 || e.position === n).map((r, a) => /*#__PURE__*/ t.createElement(ir, {
			key: r.id,
			icons: b,
			index: a,
			toast: r,
			defaultRichColors: m,
			duration: _?.duration ?? h,
			className: _?.className,
			descriptionClassName: _?.descriptionClassName,
			invert: i,
			visibleToasts: ee,
			closeButton: _?.closeButton ?? c,
			interacting: O,
			position: n,
			style: _?.style,
			unstyled: _?.unstyled,
			classNames: _?.classNames,
			cancelButtonStyle: _?.cancelButtonStyle,
			actionButtonStyle: _?.actionButtonStyle,
			closeButtonAriaLabel: _?.closeButtonAriaLabel,
			removeToast: oe,
			toasts: w.filter((e) => e.position == r.position),
			heights: E.filter((e) => e.position == r.position),
			setHeights: ne,
			expandByDefault: s,
			gap: y,
			expanded: re,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
});
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function cr(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = cr(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function lr() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = cr(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
var ur = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, dr = (e, t) => ({
	classGroupId: e,
	validator: t
}), fr = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), pr = "-", mr = [], hr = "arbitrary..", gr = (e) => {
	let t = yr(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return vr(e);
			let n = e.split(pr);
			return _r(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? ur(i, t) : t : i || mr;
			}
			return n[e] || mr;
		}
	};
}, _r = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = _r(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(pr) : e.slice(t).join(pr), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, vr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? hr + r : void 0;
})(), yr = (e) => {
	let { theme: t, classGroups: n } = e;
	return br(n, t);
}, br = (e, t) => {
	let n = fr();
	for (let r in e) {
		let i = e[r];
		xr(i, n, r, t);
	}
	return n;
}, xr = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Sr(i, t, n, r);
	}
}, Sr = (e, t, n, r) => {
	if (typeof e == "string") {
		Cr(e, t, n);
		return;
	}
	if (typeof e == "function") {
		wr(e, t, n, r);
		return;
	}
	Tr(e, t, n, r);
}, Cr = (e, t, n) => {
	let r = e === "" ? t : Er(t, e);
	r.classGroupId = n;
}, wr = (e, t, n, r) => {
	if (Dr(e)) {
		xr(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(dr(n, e));
}, Tr = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		xr(o, Er(t, a), n, r);
	}
}, Er = (e, t) => {
	let n = e, r = t.split(pr), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = fr(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Dr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Or = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, kr = "!", Ar = ":", jr = [], Mr = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Nr = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Ar) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(kr) ? (c = s.slice(0, -1), l = !0) : s.startsWith(kr) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Mr(t, l, c, u);
	};
	if (t) {
		let e = t + Ar, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Mr(jr, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Pr = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, Fr = (e) => ({
	cache: Or(e.cacheSize),
	parseClassName: Nr(e),
	sortModifiers: Pr(e),
	postfixLookupClassGroupIds: Ir(e),
	...gr(e)
}), Ir = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Lr = /\s+/, Rr = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Lr), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let ee = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), _ = f ? ee + kr : ee, v = _ + g;
		if (s.indexOf(v) > -1) continue;
		s.push(v);
		let y = i(g, h);
		for (let e = 0; e < y.length; ++e) {
			let t = y[e];
			s.push(_ + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, zr = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Br(n)) && (i && (i += " "), i += r);
	return i;
}, Br = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Br(e[r])) && (n && (n += " "), n += t);
	return n;
}, Vr = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Fr(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Rr(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(zr(...e));
}, Hr = [], K = (e) => {
	let t = (t) => t[e] || Hr;
	return t.isThemeGetter = !0, t;
}, Ur = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Wr = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Gr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Kr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Jr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Yr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, q = (e) => Gr.test(e), J = (e) => !!e && !Number.isNaN(Number(e)), Y = (e) => !!e && Number.isInteger(Number(e)), Zr = (e) => e.endsWith("%") && J(e.slice(0, -1)), X = (e) => Kr.test(e), Qr = () => !0, $r = (e) => qr.test(e) && !Jr.test(e), ei = () => !1, ti = (e) => Yr.test(e), ni = (e) => Xr.test(e), ri = (e) => !Z(e) && !Q(e), ii = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), ai = (e) => $(e, Ci, ei), Z = (e) => Ur.test(e), oi = (e) => $(e, wi, $r), si = (e) => $(e, Ti, J), ci = (e) => $(e, Di, Qr), li = (e) => $(e, Ei, ei), ui = (e) => $(e, xi, ei), di = (e) => $(e, Si, ni), fi = (e) => $(e, Oi, ti), Q = (e) => Wr.test(e), pi = (e) => bi(e, wi), mi = (e) => bi(e, Ei), hi = (e) => bi(e, xi), gi = (e) => bi(e, Ci), _i = (e) => bi(e, Si), vi = (e) => bi(e, Oi, !0), yi = (e) => bi(e, Di, !0), $ = (e, t, n) => {
	let r = Ur.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, bi = (e, t, n = !1) => {
	let r = Wr.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, xi = (e) => e === "position" || e === "percentage", Si = (e) => e === "image" || e === "url", Ci = (e) => e === "length" || e === "size" || e === "bg-size", wi = (e) => e === "length", Ti = (e) => e === "number", Ei = (e) => e === "family-name", Di = (e) => e === "number" || e === "weight", Oi = (e) => e === "shadow", ki = /*#__PURE__*/ Vr(() => {
	let e = K("color"), t = K("font"), n = K("text"), r = K("font-weight"), i = K("tracking"), a = K("leading"), o = K("breakpoint"), s = K("container"), c = K("spacing"), l = K("radius"), u = K("shadow"), d = K("inset-shadow"), f = K("text-shadow"), p = K("drop-shadow"), m = K("blur"), h = K("perspective"), g = K("aspect"), ee = K("ease"), _ = K("animate"), v = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], y = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], b = () => [
		...y(),
		Q,
		Z
	], x = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], te = () => [
		"auto",
		"contain",
		"none"
	], S = () => [
		Q,
		Z,
		c
	], C = () => [
		q,
		"full",
		"auto",
		...S()
	], w = () => [
		Y,
		"none",
		"subgrid",
		Q,
		Z
	], T = () => [
		"auto",
		{ span: [
			"full",
			Y,
			Q,
			Z
		] },
		Y,
		Q,
		Z
	], E = () => [
		Y,
		"auto",
		Q,
		Z
	], ne = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], re = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], D = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], O = () => ["auto", ...S()], k = () => [
		q,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], ie = () => [
		q,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...S()
	], A = () => [
		q,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], j = () => [
		e,
		Q,
		Z
	], ae = () => [
		...y(),
		hi,
		ui,
		{ position: [Q, Z] }
	], M = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], N = () => [
		"auto",
		"cover",
		"contain",
		gi,
		ai,
		{ size: [Q, Z] }
	], oe = () => [
		Zr,
		pi,
		oi
	], P = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], F = () => [
		"",
		J,
		pi,
		oi
	], se = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ce = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], I = () => [
		J,
		Zr,
		hi,
		ui
	], le = () => [
		"",
		"none",
		m,
		Q,
		Z
	], L = () => [
		"none",
		J,
		Q,
		Z
	], ue = () => [
		"none",
		J,
		Q,
		Z
	], de = () => [
		J,
		Q,
		Z
	], R = () => [
		q,
		"full",
		...S()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [X],
			breakpoint: [X],
			color: [Qr],
			container: [X],
			"drop-shadow": [X],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [ri],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [X],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [X],
			shadow: [X],
			spacing: ["px", J],
			text: [X],
			"text-shadow": [X],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				q,
				Z,
				Q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Q,
				Z
			] }],
			"container-named": [ii],
			columns: [{ columns: [
				J,
				Z,
				Q,
				s
			] }],
			"break-after": [{ "break-after": v() }],
			"break-before": [{ "break-before": v() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: b() }],
			overflow: [{ overflow: x() }],
			"overflow-x": [{ "overflow-x": x() }],
			"overflow-y": [{ "overflow-y": x() }],
			overscroll: [{ overscroll: te() }],
			"overscroll-x": [{ "overscroll-x": te() }],
			"overscroll-y": [{ "overscroll-y": te() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: C() }],
			"inset-x": [{ "inset-x": C() }],
			"inset-y": [{ "inset-y": C() }],
			start: [{
				"inset-s": C(),
				start: C()
			}],
			end: [{
				"inset-e": C(),
				end: C()
			}],
			"inset-bs": [{ "inset-bs": C() }],
			"inset-be": [{ "inset-be": C() }],
			top: [{ top: C() }],
			right: [{ right: C() }],
			bottom: [{ bottom: C() }],
			left: [{ left: C() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Y,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				q,
				"full",
				"auto",
				s,
				...S()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				J,
				q,
				"auto",
				"initial",
				"none",
				Z
			] }],
			grow: [{ grow: [
				"",
				J,
				Q,
				Z
			] }],
			shrink: [{ shrink: [
				"",
				J,
				Q,
				Z
			] }],
			order: [{ order: [
				Y,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": w() }],
			"col-start-end": [{ col: T() }],
			"col-start": [{ "col-start": E() }],
			"col-end": [{ "col-end": E() }],
			"grid-rows": [{ "grid-rows": w() }],
			"row-start-end": [{ row: T() }],
			"row-start": [{ "row-start": E() }],
			"row-end": [{ "row-end": E() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ne() }],
			"auto-rows": [{ "auto-rows": ne() }],
			gap: [{ gap: S() }],
			"gap-x": [{ "gap-x": S() }],
			"gap-y": [{ "gap-y": S() }],
			"justify-content": [{ justify: [...re(), "normal"] }],
			"justify-items": [{ "justify-items": [...D(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...D()] }],
			"align-content": [{ content: ["normal", ...re()] }],
			"align-items": [{ items: [...D(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...D(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": re() }],
			"place-items": [{ "place-items": [...D(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...D()] }],
			p: [{ p: S() }],
			px: [{ px: S() }],
			py: [{ py: S() }],
			ps: [{ ps: S() }],
			pe: [{ pe: S() }],
			pbs: [{ pbs: S() }],
			pbe: [{ pbe: S() }],
			pt: [{ pt: S() }],
			pr: [{ pr: S() }],
			pb: [{ pb: S() }],
			pl: [{ pl: S() }],
			m: [{ m: O() }],
			mx: [{ mx: O() }],
			my: [{ my: O() }],
			ms: [{ ms: O() }],
			me: [{ me: O() }],
			mbs: [{ mbs: O() }],
			mbe: [{ mbe: O() }],
			mt: [{ mt: O() }],
			mr: [{ mr: O() }],
			mb: [{ mb: O() }],
			ml: [{ ml: O() }],
			"space-x": [{ "space-x": S() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": S() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: k() }],
			"inline-size": [{ inline: ["auto", ...ie()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ie()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ie()] }],
			"block-size": [{ block: ["auto", ...A()] }],
			"min-block-size": [{ "min-block": ["auto", ...A()] }],
			"max-block-size": [{ "max-block": ["none", ...A()] }],
			w: [{ w: [
				s,
				"screen",
				...k()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...k()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...k()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...k()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...k()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...k()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				pi,
				oi
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				yi,
				ci
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Zr,
				Z
			] }],
			"font-family": [{ font: [
				mi,
				li,
				t
			] }],
			"font-features": [{ "font-features": [Z] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Q,
				Z
			] }],
			"line-clamp": [{ "line-clamp": [
				J,
				"none",
				Q,
				si
			] }],
			leading: [{ leading: [a, ...S()] }],
			"list-image": [{ "list-image": [
				"none",
				Q,
				Z
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Q,
				Z
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: j() }],
			"text-color": [{ text: j() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...se(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				J,
				"from-font",
				"auto",
				Q,
				oi
			] }],
			"text-decoration-color": [{ decoration: j() }],
			"underline-offset": [{ "underline-offset": [
				J,
				"auto",
				Q,
				Z
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: S() }],
			"tab-size": [{ tab: [
				Y,
				Q,
				Z
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				Q,
				Z
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				Q,
				Z
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ae() }],
			"bg-repeat": [{ bg: M() }],
			"bg-size": [{ bg: N() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Y,
						Q,
						Z
					],
					radial: [
						"",
						Q,
						Z
					],
					conic: [
						Y,
						Q,
						Z
					]
				},
				_i,
				di
			] }],
			"bg-color": [{ bg: j() }],
			"gradient-from-pos": [{ from: oe() }],
			"gradient-via-pos": [{ via: oe() }],
			"gradient-to-pos": [{ to: oe() }],
			"gradient-from": [{ from: j() }],
			"gradient-via": [{ via: j() }],
			"gradient-to": [{ to: j() }],
			rounded: [{ rounded: P() }],
			"rounded-s": [{ "rounded-s": P() }],
			"rounded-e": [{ "rounded-e": P() }],
			"rounded-t": [{ "rounded-t": P() }],
			"rounded-r": [{ "rounded-r": P() }],
			"rounded-b": [{ "rounded-b": P() }],
			"rounded-l": [{ "rounded-l": P() }],
			"rounded-ss": [{ "rounded-ss": P() }],
			"rounded-se": [{ "rounded-se": P() }],
			"rounded-ee": [{ "rounded-ee": P() }],
			"rounded-es": [{ "rounded-es": P() }],
			"rounded-tl": [{ "rounded-tl": P() }],
			"rounded-tr": [{ "rounded-tr": P() }],
			"rounded-br": [{ "rounded-br": P() }],
			"rounded-bl": [{ "rounded-bl": P() }],
			"border-w": [{ border: F() }],
			"border-w-x": [{ "border-x": F() }],
			"border-w-y": [{ "border-y": F() }],
			"border-w-s": [{ "border-s": F() }],
			"border-w-e": [{ "border-e": F() }],
			"border-w-bs": [{ "border-bs": F() }],
			"border-w-be": [{ "border-be": F() }],
			"border-w-t": [{ "border-t": F() }],
			"border-w-r": [{ "border-r": F() }],
			"border-w-b": [{ "border-b": F() }],
			"border-w-l": [{ "border-l": F() }],
			"divide-x": [{ "divide-x": F() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": F() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...se(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...se(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: j() }],
			"border-color-x": [{ "border-x": j() }],
			"border-color-y": [{ "border-y": j() }],
			"border-color-s": [{ "border-s": j() }],
			"border-color-e": [{ "border-e": j() }],
			"border-color-bs": [{ "border-bs": j() }],
			"border-color-be": [{ "border-be": j() }],
			"border-color-t": [{ "border-t": j() }],
			"border-color-r": [{ "border-r": j() }],
			"border-color-b": [{ "border-b": j() }],
			"border-color-l": [{ "border-l": j() }],
			"divide-color": [{ divide: j() }],
			"outline-style": [{ outline: [
				...se(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				J,
				Q,
				Z
			] }],
			"outline-w": [{ outline: [
				"",
				J,
				pi,
				oi
			] }],
			"outline-color": [{ outline: j() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				vi,
				fi
			] }],
			"shadow-color": [{ shadow: j() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				vi,
				fi
			] }],
			"inset-shadow-color": [{ "inset-shadow": j() }],
			"ring-w": [{ ring: F() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: j() }],
			"ring-offset-w": [{ "ring-offset": [J, oi] }],
			"ring-offset-color": [{ "ring-offset": j() }],
			"inset-ring-w": [{ "inset-ring": F() }],
			"inset-ring-color": [{ "inset-ring": j() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				vi,
				fi
			] }],
			"text-shadow-color": [{ "text-shadow": j() }],
			opacity: [{ opacity: [
				J,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...ce(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ce() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [J] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": I() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": j() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": j() }],
			"mask-image-t-from-pos": [{ "mask-t-from": I() }],
			"mask-image-t-to-pos": [{ "mask-t-to": I() }],
			"mask-image-t-from-color": [{ "mask-t-from": j() }],
			"mask-image-t-to-color": [{ "mask-t-to": j() }],
			"mask-image-r-from-pos": [{ "mask-r-from": I() }],
			"mask-image-r-to-pos": [{ "mask-r-to": I() }],
			"mask-image-r-from-color": [{ "mask-r-from": j() }],
			"mask-image-r-to-color": [{ "mask-r-to": j() }],
			"mask-image-b-from-pos": [{ "mask-b-from": I() }],
			"mask-image-b-to-pos": [{ "mask-b-to": I() }],
			"mask-image-b-from-color": [{ "mask-b-from": j() }],
			"mask-image-b-to-color": [{ "mask-b-to": j() }],
			"mask-image-l-from-pos": [{ "mask-l-from": I() }],
			"mask-image-l-to-pos": [{ "mask-l-to": I() }],
			"mask-image-l-from-color": [{ "mask-l-from": j() }],
			"mask-image-l-to-color": [{ "mask-l-to": j() }],
			"mask-image-x-from-pos": [{ "mask-x-from": I() }],
			"mask-image-x-to-pos": [{ "mask-x-to": I() }],
			"mask-image-x-from-color": [{ "mask-x-from": j() }],
			"mask-image-x-to-color": [{ "mask-x-to": j() }],
			"mask-image-y-from-pos": [{ "mask-y-from": I() }],
			"mask-image-y-to-pos": [{ "mask-y-to": I() }],
			"mask-image-y-from-color": [{ "mask-y-from": j() }],
			"mask-image-y-to-color": [{ "mask-y-to": j() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": I() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": j() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": j() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": y() }],
			"mask-image-conic-pos": [{ "mask-conic": [J] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": I() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": j() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": j() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ae() }],
			"mask-repeat": [{ mask: M() }],
			"mask-size": [{ mask: N() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Q,
				Z
			] }],
			filter: [{ filter: [
				"",
				"none",
				Q,
				Z
			] }],
			blur: [{ blur: le() }],
			brightness: [{ brightness: [
				J,
				Q,
				Z
			] }],
			contrast: [{ contrast: [
				J,
				Q,
				Z
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				vi,
				fi
			] }],
			"drop-shadow-color": [{ "drop-shadow": j() }],
			grayscale: [{ grayscale: [
				"",
				J,
				Q,
				Z
			] }],
			"hue-rotate": [{ "hue-rotate": [
				J,
				Q,
				Z
			] }],
			invert: [{ invert: [
				"",
				J,
				Q,
				Z
			] }],
			saturate: [{ saturate: [
				J,
				Q,
				Z
			] }],
			sepia: [{ sepia: [
				"",
				J,
				Q,
				Z
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Q,
				Z
			] }],
			"backdrop-blur": [{ "backdrop-blur": le() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				J,
				Q,
				Z
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				J,
				Q,
				Z
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				J,
				Q,
				Z
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				J,
				Q,
				Z
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				J,
				Q,
				Z
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				J,
				Q,
				Z
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				J,
				Q,
				Z
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				J,
				Q,
				Z
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": S() }],
			"border-spacing-x": [{ "border-spacing-x": S() }],
			"border-spacing-y": [{ "border-spacing-y": S() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				Q,
				Z
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				J,
				"initial",
				Q,
				Z
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				ee,
				Q,
				Z
			] }],
			delay: [{ delay: [
				J,
				Q,
				Z
			] }],
			animate: [{ animate: [
				"none",
				_,
				Q,
				Z
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Q,
				Z
			] }],
			"perspective-origin": [{ "perspective-origin": b() }],
			rotate: [{ rotate: L() }],
			"rotate-x": [{ "rotate-x": L() }],
			"rotate-y": [{ "rotate-y": L() }],
			"rotate-z": [{ "rotate-z": L() }],
			scale: [{ scale: ue() }],
			"scale-x": [{ "scale-x": ue() }],
			"scale-y": [{ "scale-y": ue() }],
			"scale-z": [{ "scale-z": ue() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: de() }],
			"skew-x": [{ "skew-x": de() }],
			"skew-y": [{ "skew-y": de() }],
			transform: [{ transform: [
				Q,
				Z,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: b() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: R() }],
			"translate-x": [{ "translate-x": R() }],
			"translate-y": [{ "translate-y": R() }],
			"translate-z": [{ "translate-z": R() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Y,
				Q,
				Z
			] }],
			accent: [{ accent: j() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: j() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				Q,
				Z
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": j() }],
			"scrollbar-track-color": [{ "scrollbar-track": j() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": S() }],
			"scroll-mx": [{ "scroll-mx": S() }],
			"scroll-my": [{ "scroll-my": S() }],
			"scroll-ms": [{ "scroll-ms": S() }],
			"scroll-me": [{ "scroll-me": S() }],
			"scroll-mbs": [{ "scroll-mbs": S() }],
			"scroll-mbe": [{ "scroll-mbe": S() }],
			"scroll-mt": [{ "scroll-mt": S() }],
			"scroll-mr": [{ "scroll-mr": S() }],
			"scroll-mb": [{ "scroll-mb": S() }],
			"scroll-ml": [{ "scroll-ml": S() }],
			"scroll-p": [{ "scroll-p": S() }],
			"scroll-px": [{ "scroll-px": S() }],
			"scroll-py": [{ "scroll-py": S() }],
			"scroll-ps": [{ "scroll-ps": S() }],
			"scroll-pe": [{ "scroll-pe": S() }],
			"scroll-pbs": [{ "scroll-pbs": S() }],
			"scroll-pbe": [{ "scroll-pbe": S() }],
			"scroll-pt": [{ "scroll-pt": S() }],
			"scroll-pr": [{ "scroll-pr": S() }],
			"scroll-pb": [{ "scroll-pb": S() }],
			"scroll-pl": [{ "scroll-pl": S() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				Q,
				Z
			] }],
			fill: [{ fill: ["none", ...j()] }],
			"stroke-w": [{ stroke: [
				J,
				pi,
				oi,
				si
			] }],
			stroke: [{ stroke: ["none", ...j()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/shared/lib/utils.ts
function Ai(...e) {
	return ki(lr(e));
}
//#endregion
//#region src/shared/ui/sonner.tsx
var ji = {
	toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
	description: "group-[.toast]:text-muted-foreground",
	actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
	cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
}, Mi = e.forwardRef(({ className: e, toastOptions: t, ...n }, r) => /* @__PURE__ */ c(sr, {
	ref: r,
	className: Ai("toaster group", e),
	toastOptions: {
		...t,
		classNames: {
			...ji,
			...t?.classNames
		}
	},
	...n
}));
Mi.displayName = "Toaster";
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var Ni = (e) => {
	let t, n = /* @__PURE__ */ new Set(), r = (e, r) => {
		let i = typeof e == "function" ? e(t) : e;
		if (!Object.is(i, t)) {
			let e = t;
			t = r ?? (typeof i != "object" || !i) ? i : Object.assign({}, t, i), n.forEach((n) => n(t, e));
		}
	}, i = () => t, a = {
		setState: r,
		getState: i,
		getInitialState: () => o,
		subscribe: (e) => (n.add(e), () => n.delete(e))
	}, o = t = e(r, i, a);
	return a;
}, Pi = ((e) => e ? Ni(e) : Ni), Fi = (e) => e;
function Ii(e, n = Fi) {
	let r = t.useSyncExternalStore(e.subscribe, t.useCallback(() => n(e.getState()), [e, n]), t.useCallback(() => n(e.getInitialState()), [e, n]));
	return t.useDebugValue(r), r;
}
var Li = (e) => {
	let t = Pi(e), n = (e) => Ii(t, e);
	return Object.assign(n, t), n;
}, Ri = ((e) => e ? Li(e) : Li), zi = /* @__PURE__ */ new Map(), Bi = {}, Vi = Ri((e) => ({
	playerState: {
		presence: "preinit",
		progress: {}
	},
	sortedTopics: [],
	datatypes: Bi,
	subscriptions: [],
	publishersByTopic: zi,
	setPlayerState: (t) => e((e) => {
		let n = t.activeData;
		return n ? {
			playerState: t,
			sortedTopics: n.topics === e.sortedTopics ? e.sortedTopics : n.topics,
			datatypes: n.datatypes === e.datatypes ? e.datatypes : n.datatypes,
			publishersByTopic: n.publishersByTopic === e.publishersByTopic ? e.publishersByTopic : n.publishersByTopic
		} : {
			playerState: t,
			sortedTopics: e.sortedTopics.length === 0 ? e.sortedTopics : [],
			datatypes: Bi,
			publishersByTopic: zi
		};
	}),
	setSubscriptions: (t) => e({ subscriptions: t })
}));
//#endregion
//#region src/core/pipeline/useMessagePipeline.ts
function Hi(e) {
	return Vi(e);
}
//#endregion
//#region src/features/viewer/RosViewProvider.tsx
var Ui = n({
	theme: "system",
	resolvedTheme: "dark"
});
function Wi(e) {
	return e === "system" ? typeof window > "u" || window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e;
}
function Gi() {
	return r(Ui);
}
function Ki(e) {
	return e === "zh" ? "zh-CN" : e === "ja" ? "ja-JP" : "en";
}
var qi = ({ theme: e = "system", language: t = "en", children: n }) => {
	let [r, s] = o(() => Wi(e));
	i(() => {
		if (e !== "system") {
			s(e);
			return;
		}
		if (typeof window > "u") {
			s("dark");
			return;
		}
		let t = window.matchMedia("(prefers-color-scheme: dark)"), n = () => {
			s(t.matches ? "dark" : "light");
		};
		return n(), t.addEventListener("change", n), () => t.removeEventListener("change", n);
	}, [e]);
	let u = a(() => ({
		theme: e,
		resolvedTheme: r
	}), [e, r]), d = a(() => jn(t), [t]), f = Hi((e) => e.playerState.presence);
	return /* @__PURE__ */ c(Ui.Provider, {
		value: u,
		children: /* @__PURE__ */ c("div", {
			id: "rosview-root",
			"data-language": t,
			"data-theme": r,
			"data-player-presence": f,
			className: `rosview-root-shell ${r === "dark" ? "dark" : ""}`,
			children: /* @__PURE__ */ c("div", {
				className: "h-full w-full min-h-0 min-w-0",
				children: /* @__PURE__ */ l(en, {
					locale: Ki(t),
					defaultLocale: "en",
					messages: d,
					children: [n, /* @__PURE__ */ c(Mi, { theme: r })]
				})
			})
		})
	});
}, Ji = /* @__PURE__ */ new Set(), Yi = null, Xi = 8;
function Zi() {
	Yi != null || typeof requestAnimationFrame > "u" || (Yi = requestAnimationFrame(Qi));
}
function Qi() {
	if (Yi = null, Ji.size === 0) return;
	let e = performance.now(), t = 0, n = Array.from(Ji);
	for (let r of n) if (Ji.delete(r)) {
		try {
			r();
		} catch (e) {
			console.error("rafScheduler task failed", e);
		}
		if (t += 1, t > 0 && Ji.size > 0 && performance.now() - e >= Xi) break;
	}
	Ji.size > 0 && Zi();
}
function $i(e) {
	return Ji.add(e), Zi(), () => {
		Ji.delete(e);
	};
}
//#endregion
export { Vi as a, lr as c, Jt as d, Vt as f, Hi as i, qn as l, qi as n, Ri as o, Qe as p, Gi as r, Ai as s, $i as t, jn as u };
