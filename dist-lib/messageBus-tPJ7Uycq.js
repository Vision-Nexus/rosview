var e = new class {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	#i = /* @__PURE__ */ new Map();
	#a = /* @__PURE__ */ new Map();
	update(e, t) {
		if (e.size !== 0 || t.size !== 0) {
			for (let [t, n] of e) this.#t.set(t, n), this.#r.set(t, (this.#r.get(t) ?? 0) + 1);
			for (let [e, n] of t) this.#e.set(e, n), this.#n.set(e, (this.#n.get(e) ?? 0) + 1);
			for (let e of t.keys()) {
				let t = this.#i.get(e);
				if (t) for (let e of t) e();
			}
			for (let t of e.keys()) {
				let e = this.#a.get(t);
				if (e) for (let t of e) t();
			}
		}
	}
	reset() {
		this.#e.clear(), this.#t.clear(), this.#n.clear(), this.#r.clear();
		for (let e of this.#i.values()) for (let t of e) t();
		for (let e of this.#a.values()) for (let t of e) t();
	}
	getTopicSeq(e) {
		return this.#n.get(e) ?? 0;
	}
	getSubscriberSeq(e) {
		return this.#r.get(e) ?? 0;
	}
	getLastMessage(e) {
		return this.#e.get(e) ?? null;
	}
	getSubscriberMessages(e) {
		return this.#t.get(e) ?? null;
	}
	subscribeTopic(e, t) {
		let n = this.#i.get(e);
		return n || (n = /* @__PURE__ */ new Set(), this.#i.set(e, n)), n.add(t), () => {
			let n = this.#i.get(e);
			n && (n.delete(t), n.size === 0 && this.#i.delete(e));
		};
	}
	subscribeToMessages(e, t) {
		let n = this.#a.get(e);
		return n || (n = /* @__PURE__ */ new Set(), this.#a.set(e, n)), n.add(t), () => {
			let n = this.#a.get(e);
			n && (n.delete(t), n.size === 0 && this.#a.delete(e));
		};
	}
}();
//#endregion
export { e as t };
