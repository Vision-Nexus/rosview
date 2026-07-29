import * as e from "three";
//#region src/features/panels/ThreeD/core/transformTree.ts
var t = 32;
function n(t) {
	return new e.Vector3(t.x, t.y, t.z);
}
function r(t) {
	return new e.Quaternion(t.x, t.y, t.z, t.w);
}
var i = class {
	frames = /* @__PURE__ */ new Map();
	scratchRootMatrix = new e.Matrix4();
	scratchChildMatrix = new e.Matrix4();
	scratchLocalMatrix = new e.Matrix4();
	scratchRelativeMatrix = new e.Matrix4();
	scratchInvRootMatrix = new e.Matrix4();
	scratchComposePos = new e.Vector3();
	scratchComposeQuat = new e.Quaternion();
	scratchUnitScale = new e.Vector3(1, 1, 1);
	scratchDecomposeScale = new e.Vector3();
	scratchAncestors = [];
	scratchVisiting = /* @__PURE__ */ new Set();
	addFrame(e) {
		let t = o(e);
		!t || this.frames.has(t) || this.frames.set(t, {
			id: t,
			samples: []
		});
	}
	addTransform(e, i, a, s, c) {
		let l = o(e), u = o(i);
		if (!l || !u || l === u || (this.addFrame(l), this.addFrame(u), this.wouldCreateCycle(u, l))) return;
		let d = this.frames.get(u);
		d.parentId = l;
		let f = d.samples, p = {
			time: a,
			position: n(s),
			rotation: r(c)
		}, m = f.length > 0 ? f[f.length - 1] : void 0;
		if (!m || a > m.time) f.push(p);
		else if (a === m.time) f[f.length - 1] = p;
		else {
			let e = f.findIndex((e) => e.time === a);
			if (e >= 0) f[e] = p;
			else {
				let e = f.findIndex((e) => e.time > a);
				e === -1 ? f.push(p) : f.splice(e, 0, p);
			}
		}
		f.length > t && f.splice(0, f.length - t);
	}
	hasFrame(e) {
		return this.frames.has(o(e));
	}
	getRootFrameId(e) {
		let t = e ? o(e) : void 0;
		if (t && this.frames.has(t)) {
			let e = this.frames.get(t);
			for (; e.parentId;) {
				let t = this.frames.get(e.parentId);
				if (!t) break;
				e = t;
			}
			return e.id;
		}
		if (this.frames.has("world")) return "world";
		for (let e of this.frames.values()) if (!e.parentId) return e.id;
		return this.frames.keys().next().value;
	}
	getRelativeTransform(t, n, r) {
		let i = new e.Vector3(), a = new e.Quaternion();
		if (this.getRelativeTransformInto(t, n, r, i, a)) return {
			position: i,
			rotation: a
		};
	}
	getRelativeTransformInto(e, t, n, r, i) {
		return this.scratchVisiting.clear(), !this.buildWorldMatrixInto(o(e), n, this.scratchRootMatrix) || (this.scratchVisiting.clear(), !this.buildWorldMatrixInto(o(t), n, this.scratchChildMatrix)) ? !1 : (this.scratchInvRootMatrix.copy(this.scratchRootMatrix).invert(), this.scratchRelativeMatrix.multiplyMatrices(this.scratchInvRootMatrix, this.scratchChildMatrix), this.scratchRelativeMatrix.decompose(r, i, this.scratchDecomposeScale), !0);
	}
	getWorldMatrix(t, n) {
		let r = new e.Matrix4();
		return this.scratchVisiting.clear(), this.buildWorldMatrixInto(o(t), n, r) ? r : void 0;
	}
	buildWorldMatrixInto(e, t, n) {
		let r = this.scratchAncestors;
		r.length = 0;
		let i = e;
		for (; i;) {
			if (this.scratchVisiting.has(i)) return !1;
			let e = this.frames.get(i);
			if (!e) return !1;
			this.scratchVisiting.add(i), r.push(i), i = e.parentId;
		}
		n.identity();
		for (let e = r.length - 1; e >= 0; --e) {
			let i = this.frames.get(r[e]);
			if (i.parentId) {
				if (!a(i.samples, t, this.scratchComposePos, this.scratchComposeQuat)) return !1;
				this.scratchLocalMatrix.compose(this.scratchComposePos, this.scratchComposeQuat, this.scratchUnitScale), n.multiply(this.scratchLocalMatrix);
			}
		}
		return !0;
	}
	wouldCreateCycle(e, t) {
		let n = this.frames.get(t);
		for (; n?.parentId;) {
			if (n.parentId === e) return !0;
			n = this.frames.get(n.parentId);
		}
		return !1;
	}
};
function a(e, t, n, r) {
	if (e.length === 0) return !1;
	if (e.length === 1 || t <= e[0].time) return n.copy(e[0].position), r.copy(e[0].rotation), !0;
	if (t >= e[e.length - 1].time) {
		let t = e[e.length - 1];
		return n.copy(t.position), r.copy(t.rotation), !0;
	}
	let i = 0, a = e.length - 1;
	for (; a - i > 1;) {
		let n = i + a >> 1;
		e[n].time <= t ? i = n : a = n;
	}
	let o = e[i], s = e[a];
	if (o.time === s.time) return n.copy(s.position), r.copy(s.rotation), !0;
	let c = Number(t - o.time) / Number(s.time - o.time);
	return n.lerpVectors(o.position, s.position, c), r.slerpQuaternions(o.rotation, s.rotation, c), !0;
}
function o(e) {
	return e.startsWith("/") ? e.slice(1) : e;
}
//#endregion
export { o as n, i as t };
