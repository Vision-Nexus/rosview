import * as THREE from 'three';

export const HANDPOSE_POINTS_TOPIC = '/robot0/perception/handpose/points';
export const HANDPOSE_CONFIDENCE_THRESHOLD = 0.5;

const HAND_COUNT = 2;
const MEDIAPIPE_JOINT_COUNT = 21;
const WEBXR_JOINT_COUNT = 25;
const POINT_STEP = 32;
const EXPECTED_POINT_COUNT = HAND_COUNT * MEDIAPIPE_JOINT_COUNT;
const FLOAT32 = 7;
const UINT16 = 4;
const UINT8 = 2;

const WEBXR_BONE_NAMES = [
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

const MEDIAPIPE_TO_WEBXR = [
  0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24,
] as const;
const DERIVED_METACARPALS = [5, 10, 15, 20] as const;
const PROXIMAL_JOINTS = [6, 11, 16, 21] as const;
const CONCEPTUAL_PARENTS = [
  -1, 0, 1, 2, 3, 0, 5, 6, 7, 8, 0, 10, 11, 12, 13, 0, 15, 16, 17, 18, 0, 20, 21, 22, 23,
] as const;
const CONCEPTUAL_CHILDREN = [
  1, 2, 3, 4, -1, 6, 7, 8, 9, -1, 11, 12, 13, 14, -1, 16, 17, 18, 19, -1, 21, 22, 23,
  24, -1,
] as const;

interface PointFieldLike {
  name: string;
  offset: number;
  datatype: number;
  count: number;
}

interface PointFieldLayout {
  x: number;
  y: number;
  z: number;
  confidence: number;
  jointIndex: number;
  handId: number;
  state: number;
}

export interface HandPointState {
  readonly positions: Float32Array;
  readonly usable: Uint8Array;
  readonly seen: Uint8Array;
  readonly handVisible: Uint8Array;
  fieldLayout: PointFieldLayout | null;
}

export function createHandPointState(): HandPointState {
  const positions = new Float32Array(EXPECTED_POINT_COUNT * 3);
  positions.fill(Number.NaN);
  return {
    positions,
    usable: new Uint8Array(EXPECTED_POINT_COUNT),
    seen: new Uint8Array(EXPECTED_POINT_COUNT),
    handVisible: new Uint8Array(HAND_COUNT),
    fieldLayout: null,
  };
}

function fieldLayout(fields: unknown): PointFieldLayout | null {
  if (!Array.isArray(fields)) return null;
  const byName = new Map<string, PointFieldLike>();
  for (const value of fields) {
    if (!value || typeof value !== 'object') return null;
    const field = value as Record<string, unknown>;
    if (
      typeof field.name !== 'string' ||
      typeof field.offset !== 'number' ||
      typeof field.datatype !== 'number' ||
      typeof field.count !== 'number'
    ) {
      return null;
    }
    byName.set(field.name, {
      name: field.name,
      offset: field.offset,
      datatype: field.datatype,
      count: field.count,
    });
  }
  const exact = (name: string, datatype: number): number | null => {
    const field = byName.get(name);
    return field?.datatype === datatype && field.count === 1 ? field.offset : null;
  };
  const x = exact('x', FLOAT32);
  const y = exact('y', FLOAT32);
  const z = exact('z', FLOAT32);
  const confidence = exact('confidence', FLOAT32);
  const jointIndex = exact('joint_index', UINT16);
  const handId = exact('hand_id', UINT8);
  const state = exact('state', UINT8);
  if ([x, y, z, confidence, jointIndex, handId, state].some((offset) => offset == null)) {
    return null;
  }
  return {
    x: x as number,
    y: y as number,
    z: z as number,
    confidence: confidence as number,
    jointIndex: jointIndex as number,
    handId: handId as number,
    state: state as number,
  };
}

function clearPointState(state: HandPointState): void {
  state.positions.fill(Number.NaN);
  state.usable.fill(0);
  state.seen.fill(0);
  state.handVisible.fill(0);
}

export function parseHandPointCloud2(message: unknown, output: HandPointState): boolean {
  clearPointState(output);
  if (!message || typeof message !== 'object') return false;
  const record = message as Record<string, unknown>;
  if (
    !(record.data instanceof Uint8Array) ||
    record.is_bigendian === true ||
    record.point_step !== POINT_STEP ||
    typeof record.row_step !== 'number' ||
    typeof record.width !== 'number' ||
    typeof record.height !== 'number' ||
    !Number.isInteger(record.width) ||
    !Number.isInteger(record.height) ||
    record.width * record.height !== EXPECTED_POINT_COUNT
  ) {
    return false;
  }
  output.fieldLayout ??= fieldLayout(record.fields);
  const layout = output.fieldLayout;
  if (!layout) return false;
  const rowStep = record.row_step;
  const width = record.width;
  const height = record.height;
  if (rowStep < width * POINT_STEP || record.data.byteLength < rowStep * height) return false;
  const view = new DataView(record.data.buffer, record.data.byteOffset, record.data.byteLength);
  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      const base = row * rowStep + column * POINT_STEP;
      const hand = view.getUint8(base + layout.handId);
      const joint = view.getUint16(base + layout.jointIndex, true);
      if (hand >= HAND_COUNT || joint >= MEDIAPIPE_JOINT_COUNT) return false;
      const index = hand * MEDIAPIPE_JOINT_COUNT + joint;
      if (output.seen[index] !== 0) return false;
      output.seen[index] = 1;
      const x = view.getFloat32(base + layout.x, true);
      const y = view.getFloat32(base + layout.y, true);
      const z = view.getFloat32(base + layout.z, true);
      const confidence = view.getFloat32(base + layout.confidence, true);
      const usable =
        view.getUint8(base + layout.state) !== 0 &&
        confidence >= HANDPOSE_CONFIDENCE_THRESHOLD &&
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        Number.isFinite(z);
      const position = index * 3;
      output.positions[position] = x;
      output.positions[position + 1] = y;
      output.positions[position + 2] = z;
      output.usable[index] = usable ? 1 : 0;
    }
  }
  for (let hand = 0; hand < HAND_COUNT; hand += 1) {
    let visible = true;
    const start = hand * MEDIAPIPE_JOINT_COUNT;
    for (let joint = 0; joint < MEDIAPIPE_JOINT_COUNT; joint += 1) {
      if (output.usable[start + joint] === 0) {
        visible = false;
        break;
      }
    }
    output.handVisible[hand] = visible ? 1 : 0;
  }
  return true;
}

export function shouldClearHandSurface(previousNs: bigint | null, currentNs: bigint): boolean {
  if (previousNs == null) return false;
  const delta = currentNs - previousNs;
  return delta < 0n || delta > 250_000_000n;
}

export function isHandSurfaceSampleCurrent(sampleNs: bigint, currentNs: bigint): boolean {
  const delta = sampleNs >= currentNs ? sampleNs - currentNs : currentNs - sampleNs;
  return delta <= 250_000_000n;
}

function finiteVector(vector: THREE.Vector3): boolean {
  return Number.isFinite(vector.x) && Number.isFinite(vector.y) && Number.isFinite(vector.z);
}

function setPalmBasis(
  joints: readonly THREE.Vector3[],
  matrix: THREE.Matrix4,
  xAxis: THREE.Vector3,
  yAxis: THREE.Vector3,
  zAxis: THREE.Vector3,
): boolean {
  xAxis.subVectors(joints[6], joints[21]);
  yAxis.subVectors(joints[11], joints[0]);
  if (xAxis.lengthSq() < 1e-10 || yAxis.lengthSq() < 1e-10) return false;
  xAxis.normalize();
  yAxis.addScaledVector(xAxis, -yAxis.dot(xAxis));
  if (yAxis.lengthSq() < 1e-10) return false;
  yAxis.normalize();
  zAxis.crossVectors(xAxis, yAxis);
  if (zAxis.lengthSq() < 1e-10) return false;
  zAxis.normalize();
  yAxis.crossVectors(zAxis, xAxis).normalize();
  matrix.makeBasis(xAxis, yAxis, zAxis);
  return true;
}

export class HandSurfaceRig {
  readonly root: THREE.Object3D;
  private readonly bones: THREE.Bone[];
  private readonly restPositions: THREE.Vector3[];
  private readonly targetPositions: THREE.Vector3[];
  private readonly metacarpalRatios: number[];
  private readonly restBasisInverse = new THREE.Matrix4();
  private readonly observedBasis = new THREE.Matrix4();
  private readonly palmRotationMatrix = new THREE.Matrix4();
  private readonly palmRotation = new THREE.Quaternion();
  private readonly swing = new THREE.Quaternion();
  private readonly restDirection = new THREE.Vector3();
  private readonly targetDirection = new THREE.Vector3();
  private readonly rotatedRestDirection = new THREE.Vector3();
  private readonly xAxis = new THREE.Vector3();
  private readonly yAxis = new THREE.Vector3();
  private readonly zAxis = new THREE.Vector3();

  constructor(root: THREE.Object3D, expectedHandedness: 'left' | 'right') {
    this.root = root;
    const armature = root.getObjectByName('Armature');
    if (!armature) throw new Error('generic-hand GLB omits Armature');
    this.bones = WEBXR_BONE_NAMES.map((name) => {
      const candidate = root.getObjectByName(name);
      if (!candidate || candidate.type !== 'Bone' || candidate.parent !== armature) {
        throw new Error(`generic-hand GLB has incompatible flat bone: ${name}`);
      }
      return candidate as THREE.Bone;
    });
    this.restPositions = this.bones.map((bone) => bone.position.clone());
    this.targetPositions = this.restPositions.map(() => new THREE.Vector3());
    this.metacarpalRatios = DERIVED_METACARPALS.map((metacarpal, index) => {
      const proximal = PROXIMAL_JOINTS[index];
      return (
        this.restPositions[0].distanceTo(this.restPositions[metacarpal]) /
        this.restPositions[0].distanceTo(this.restPositions[proximal])
      );
    });
    if (
      !setPalmBasis(
        this.restPositions,
        this.restBasisInverse,
        this.xAxis,
        this.yAxis,
        this.zAxis,
      )
    ) {
      throw new Error('generic-hand GLB has degenerate rest palm');
    }
    const thumbPalmSide = this.targetDirection
      .subVectors(this.restPositions[1], this.restPositions[0])
      .dot(this.zAxis);
    if (
      (expectedHandedness === 'left' && thumbPalmSide >= -1e-6) ||
      (expectedHandedness === 'right' && thumbPalmSide <= 1e-6)
    ) {
      throw new Error(`generic-hand GLB handedness does not match ${expectedHandedness}`);
    }
    this.restBasisInverse.invert();
    root.traverse((object) => {
      if (object instanceof THREE.Mesh && !(object instanceof THREE.SkinnedMesh)) {
        object.visible = false;
      }
      object.frustumCulled = false;
    });
    this.root.visible = false;
  }

  hide(): boolean {
    if (!this.root.visible) return false;
    this.root.visible = false;
    return true;
  }

  update(points: HandPointState, hand: 0 | 1): boolean {
    if (points.handVisible[hand] === 0) return this.hide();
    const sourceStart = hand * MEDIAPIPE_JOINT_COUNT;
    for (let source = 0; source < MEDIAPIPE_JOINT_COUNT; source += 1) {
      const target = MEDIAPIPE_TO_WEBXR[source];
      const sourceOffset = (sourceStart + source) * 3;
      this.targetPositions[target].set(
        points.positions[sourceOffset],
        points.positions[sourceOffset + 1],
        points.positions[sourceOffset + 2],
      );
    }
    for (let index = 0; index < DERIVED_METACARPALS.length; index += 1) {
      this.targetPositions[DERIVED_METACARPALS[index]]
        .copy(this.targetPositions[0])
        .lerp(this.targetPositions[PROXIMAL_JOINTS[index]], this.metacarpalRatios[index]);
    }
    if (
      this.targetPositions.some((position) => !finiteVector(position)) ||
      !setPalmBasis(
        this.targetPositions,
        this.observedBasis,
        this.xAxis,
        this.yAxis,
        this.zAxis,
      )
    ) {
      return this.hide();
    }
    this.palmRotationMatrix.multiplyMatrices(this.observedBasis, this.restBasisInverse);
    this.palmRotation.setFromRotationMatrix(this.palmRotationMatrix).normalize();
    for (let index = 0; index < WEBXR_JOINT_COUNT; index += 1) {
      const bone = this.bones[index];
      bone.position.copy(this.targetPositions[index]);
      if (index === 0) {
        bone.quaternion.copy(this.palmRotation);
      } else {
        const child = CONCEPTUAL_CHILDREN[index];
        if (child < 0) {
          bone.quaternion.copy(this.bones[CONCEPTUAL_PARENTS[index]].quaternion);
        } else {
          this.restDirection
            .subVectors(this.restPositions[child], this.restPositions[index])
            .normalize();
          this.targetDirection
            .subVectors(this.targetPositions[child], this.targetPositions[index])
            .normalize();
          this.rotatedRestDirection.copy(this.restDirection).applyQuaternion(this.palmRotation);
          this.swing.setFromUnitVectors(this.rotatedRestDirection, this.targetDirection);
          bone.quaternion.copy(this.swing).multiply(this.palmRotation).normalize();
        }
      }
      bone.updateMatrix();
    }
    this.root.updateMatrixWorld(true);
    const changed = !this.root.visible;
    this.root.visible = true;
    return changed;
  }
}
