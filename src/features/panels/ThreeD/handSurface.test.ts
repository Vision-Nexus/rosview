import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  HandSurfaceRig,
  createHandPointState,
  parseHandPointCloud2,
  isHandSurfaceSampleCurrent,
  shouldClearHandSurface,
} from './handSurface';

const BONE_NAMES = [
  'wrist',
  'thumb-metacarpal',
  'thumb-phalanx-proximal',
  'thumb-phalanx-distal',
  'thumb-tip',
  'index-finger-metacarpal',
  'index-finger-phalanx-proximal',
  'index-finger-phalanx-intermediate',
  'index-finger-phalanx-distal',
  'index-finger-tip',
  'middle-finger-metacarpal',
  'middle-finger-phalanx-proximal',
  'middle-finger-phalanx-intermediate',
  'middle-finger-phalanx-distal',
  'middle-finger-tip',
  'ring-finger-metacarpal',
  'ring-finger-phalanx-proximal',
  'ring-finger-phalanx-intermediate',
  'ring-finger-phalanx-distal',
  'ring-finger-tip',
  'pinky-finger-metacarpal',
  'pinky-finger-phalanx-proximal',
  'pinky-finger-phalanx-intermediate',
  'pinky-finger-phalanx-distal',
  'pinky-finger-tip',
] as const;

type Point3 = [number, number, number];

function glbHandedness(filename: 'left.glb' | 'right.glb'): { digest: string; sign: number } {
  const bytes = readFileSync(new URL(`./assets/generic-hand/${filename}`, import.meta.url));
  const jsonLength = bytes.readUInt32LE(12);
  const document = JSON.parse(bytes.subarray(20, 20 + jsonLength).toString('utf8').trim()) as {
    nodes: Array<{ name?: string; translation?: Point3 }>;
  };
  const position = (name: string): Point3 => {
    const value = document.nodes.find((node) => node.name === name)?.translation;
    if (!value) throw new Error(`missing ${name}`);
    return value;
  };
  const subtract = (a: Point3, b: Point3): Point3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot = (a: Point3, b: Point3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const scale = (a: Point3, value: number): Point3 => [a[0] * value, a[1] * value, a[2] * value];
  const normalize = (a: Point3): Point3 => scale(a, 1 / Math.sqrt(dot(a, a)));
  const cross = (a: Point3, b: Point3): Point3 => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const wrist = position('wrist');
  const xAxis = normalize(
    subtract(position('index-finger-phalanx-proximal'), position('pinky-finger-phalanx-proximal')),
  );
  const middle = subtract(position('middle-finger-phalanx-proximal'), wrist);
  const yAxis = normalize(subtract(middle, scale(xAxis, dot(middle, xAxis))));
  const zAxis = normalize(cross(xAxis, yAxis));
  return {
    digest: createHash('sha256').update(bytes).digest('hex'),
    sign: dot(subtract(position('thumb-metacarpal'), wrist), zAxis),
  };
}

const FIELDS = [
  { name: 'x', offset: 0, datatype: 7, count: 1 },
  { name: 'y', offset: 4, datatype: 7, count: 1 },
  { name: 'z', offset: 8, datatype: 7, count: 1 },
  { name: 'confidence', offset: 12, datatype: 7, count: 1 },
  { name: 'ray_residual_m', offset: 16, datatype: 7, count: 1 },
  { name: 'ray_angle_degrees', offset: 20, datatype: 7, count: 1 },
  { name: 'joint_index', offset: 24, datatype: 4, count: 1 },
  { name: 'hand_id', offset: 26, datatype: 2, count: 1 },
  { name: 'state', offset: 27, datatype: 2, count: 1 },
  { name: 'view_count', offset: 28, datatype: 2, count: 1 },
];

function jointPosition(hand: number, joint: number): [number, number, number] {
  const xOffset = hand * 0.3;
  const fingers = [
    [0.045, 0.025],
    [0.035, 0.065],
    [0, 0.075],
    [-0.025, 0.068],
    [-0.05, 0.055],
  ] as const;
  if (joint === 0) return [xOffset, 0, 0];
  const finger = joint <= 4 ? 0 : Math.floor((joint - 1) / 4);
  const segment = joint <= 4 ? joint : ((joint - 1) % 4) + 1;
  return [
    xOffset + fingers[finger][0],
    fingers[finger][1] + segment * 0.025,
    finger * 0.004,
  ];
}

function pointCloud(options: { lowConfidenceIndex?: number; nanIndex?: number } = {}) {
  const data = new Uint8Array(42 * 32);
  const view = new DataView(data.buffer);
  for (let hand = 0; hand < 2; hand += 1) {
    for (let joint = 0; joint < 21; joint += 1) {
      const index = hand * 21 + joint;
      const base = index * 32;
      const [x, y, z] = jointPosition(hand, joint);
      view.setFloat32(base, index === options.nanIndex ? Number.NaN : x, true);
      view.setFloat32(base + 4, y, true);
      view.setFloat32(base + 8, z, true);
      view.setFloat32(base + 12, index === options.lowConfidenceIndex ? 0.49 : 0.9, true);
      view.setUint16(base + 24, joint, true);
      view.setUint8(base + 26, hand);
      view.setUint8(base + 27, 1);
      view.setUint8(base + 28, 3);
    }
  }
  return {
    fields: FIELDS,
    width: 42,
    height: 1,
    point_step: 32,
    row_step: 42 * 32,
    is_bigendian: false,
    data,
  };
}

function restPosition(index: number): THREE.Vector3 {
  if (index === 0) return new THREE.Vector3(0, 0, 0);
  const finger = index <= 4 ? 0 : Math.floor((index - 5) / 5) + 1;
  const segment = index <= 4 ? index : ((index - 5) % 5) + 1;
  const x = [-0.55, -0.4, 0, 0.3, 0.55][finger];
  return new THREE.Vector3(x, segment * 0.45, finger * 0.03);
}

function rigRoot(): THREE.Group {
  const root = new THREE.Group();
  const armature = new THREE.Group();
  armature.name = 'Armature';
  root.add(armature);
  BONE_NAMES.forEach((name, index) => {
    const bone = new THREE.Bone();
    bone.name = name;
    bone.position.copy(restPosition(index));
    armature.add(bone);
  });
  return root;
}

function rigFixture(): { root: THREE.Group; rig: HandSurfaceRig } {
  const root = rigRoot();
  return { root, rig: new HandSurfaceRig(root, 'left') };
}

describe('WebXR generic hand surface', () => {
  it('decodes both exact 21-point hands and drives a flat 25-bone rig', () => {
    const points = createHandPointState();
    expect(parseHandPointCloud2(pointCloud(), points)).toBe(true);
    expect(Array.from(points.handVisible)).toEqual([1, 1]);
    const { root, rig } = rigFixture();
    rig.update(points, 0);
    expect(root.visible).toBe(true);
    const wrist = root.getObjectByName('wrist') as THREE.Bone;
    const proximal = root.getObjectByName('index-finger-phalanx-proximal') as THREE.Bone;
    const metacarpal = root.getObjectByName('index-finger-metacarpal') as THREE.Bone;
    expect(wrist.position.toArray()).toEqual(jointPosition(0, 0));
    jointPosition(0, 5).forEach((value, axis) => {
      expect(proximal.position.getComponent(axis)).toBeCloseTo(value, 6);
    });
    expect(metacarpal.position.distanceTo(wrist.position)).toBeGreaterThan(0);
    expect(metacarpal.position.distanceTo(wrist.position)).toBeLessThan(
      proximal.position.distanceTo(wrist.position),
    );
  });

  it('rejects a GLB whose palm geometry contradicts the requested handedness', () => {
    expect(() => new HandSurfaceRig(rigRoot(), 'right')).toThrow(
      'generic-hand GLB handedness does not match right',
    );
  });

  it('pins the upstream left and right GLBs as a mirrored pair', () => {
    const left = glbHandedness('left.glb');
    const right = glbHandedness('right.glb');
    expect(left.digest).toBe('bc67783144944ea1cda54d9247885825ea5fb9d4651469fe7d00be517a5c2b87');
    expect(right.digest).toBe('291790c14f7f88a7f9bd35330c47392ed8e8d395ae6728f4bb7089f1bc1f2b96');
    expect(left.sign).toBeLessThan(0);
    expect(right.sign).toBeGreaterThan(0);
  });

  it('hides only the hand with a low-confidence or non-finite point', () => {
    const lowConfidence = createHandPointState();
    expect(parseHandPointCloud2(pointCloud({ lowConfidenceIndex: 8 }), lowConfidence)).toBe(true);
    expect(Array.from(lowConfidence.handVisible)).toEqual([0, 1]);
    const missingWrist = createHandPointState();
    expect(parseHandPointCloud2(pointCloud({ nanIndex: 21 }), missingWrist)).toBe(true);
    expect(Array.from(missingWrist.handVisible)).toEqual([1, 0]);
  });

  it('hides a hand when the observed palm basis degenerates', () => {
    const points = createHandPointState();
    expect(parseHandPointCloud2(pointCloud(), points)).toBe(true);
    for (const joint of [5, 9, 17]) {
      const offset = joint * 3;
      points.positions[offset] = points.positions[0];
      points.positions[offset + 1] = points.positions[1];
      points.positions[offset + 2] = points.positions[2];
    }
    const { root, rig } = rigFixture();
    rig.update(points, 0);
    expect(root.visible).toBe(false);
  });

  it('clears stale surfaces on seek and reverse playback', () => {
    expect(shouldClearHandSurface(null, 100n)).toBe(false);
    expect(shouldClearHandSurface(100n, 90n)).toBe(true);
    expect(shouldClearHandSurface(100n, 200_000_000n)).toBe(false);
    expect(shouldClearHandSurface(100n, 300_000_100n)).toBe(true);
    expect(isHandSurfaceSampleCurrent(100n, 250_000_100n)).toBe(true);
    expect(isHandSurfaceSampleCurrent(100n, 250_000_101n)).toBe(false);
  });

  it('rejects a PointCloud2 without the exact handpose fields', () => {
    const points = createHandPointState();
    const message = pointCloud();
    message.fields = message.fields.filter((field) => field.name !== 'hand_id');
    expect(parseHandPointCloud2(message, points)).toBe(false);
    expect(Array.from(points.handVisible)).toEqual([0, 0]);
  });
});
