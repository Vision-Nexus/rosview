import type { Player } from '@/core/types/player';
import { useSceneObject, useThreeCanvas } from '@/features/panels/common/threeCanvas';
import { use, useEffect, useMemo, useRef } from 'react';
import { SkinnedMesh } from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import leftHandAssetUrl from './assets/generic-hand/left.glb?url';
import rightHandAssetUrl from './assets/generic-hand/right.glb?url';
import {
  HANDPOSE_POINTS_TOPIC,
  HandSurfaceRig,
  createHandPointState,
  parseHandPointCloud2,
  shouldClearHandSurface,
  isHandSurfaceSampleCurrent,
} from './handSurface';

// The baked GLBs share immutable geometry and materials; each panel clones its skeletons.
let handAssets: Promise<GLTF[]> | undefined;

function loadHandAssets(): Promise<GLTF[]> {
  if (!handAssets) {
    const loader = new GLTFLoader();
    handAssets = Promise.all([
      loader.loadAsync(leftHandAssetUrl),
      loader.loadAsync(rightHandAssetUrl),
    ]);
  }
  return handAssets;
}

export function HandSurfaceLayer({ player, panelId }: { player: Player; panelId: string }) {
  const assets = use(loadHandAssets());
  const rigs = useMemo(() => {
    try {
      return {
        left: new HandSurfaceRig(cloneSkeleton(assets[0].scene), 'left'),
        right: new HandSurfaceRig(cloneSkeleton(assets[1].scene), 'right'),
      };
    } catch (error) {
      console.error('hand surface disabled:', error);
      return null;
    }
  }, [assets]);
  const leftRig = rigs?.left;
  const rightRig = rigs?.right;
  const pointsRef = useRef(createHandPointState());
  const previousTimeRef = useRef<bigint | null>(null);
  const lastSampleTimeRef = useRef<bigint | null>(null);
  const { invalidate } = useThreeCanvas();
  const invalidateRef = useRef(invalidate);

  useEffect(() => {
    invalidateRef.current = invalidate;
  }, [invalidate]);

  useEffect(() => {
    if (!leftRig || !rightRig) return;
    const consumerId = `${panelId}:hand-surface`;
    player.registerHighFrequencyConsumer(consumerId, {
      topic: HANDPOSE_POINTS_TOPIC,
      lane: 'pointcloud',
      mode: 'latest',
      onLatestMessage: (event) => {
        lastSampleTimeRef.current =
          BigInt(event.publishTime.sec) * 1_000_000_000n + BigInt(event.publishTime.nsec);
        if (parseHandPointCloud2(event.message, pointsRef.current)) {
          leftRig.update(pointsRef.current, 0);
          rightRig.update(pointsRef.current, 1);
        } else {
          leftRig.hide();
          rightRig.hide();
        }
        invalidateRef.current();
      },
    });
    return () => {
      player.unregisterHighFrequencyConsumer(consumerId);
      leftRig.hide();
      rightRig.hide();
      lastSampleTimeRef.current = null;
    };
  }, [leftRig, panelId, player, rightRig]);

  useEffect(() => {
    if (!leftRig || !rightRig) return;
    return player.subscribeCurrentTime((time) => {
      const current = BigInt(time.sec) * 1_000_000_000n + BigInt(time.nsec);
      const sampleTime = lastSampleTimeRef.current;
      if (
        shouldClearHandSurface(previousTimeRef.current, current) ||
        (sampleTime != null && !isHandSurfaceSampleCurrent(sampleTime, current))
      ) {
        const leftChanged = leftRig.hide();
        const rightChanged = rightRig.hide();
        if (leftChanged || rightChanged) invalidateRef.current();
      }
      previousTimeRef.current = current;
    });
  }, [leftRig, player, rightRig]);

  useSceneObject(leftRig?.root ?? null);
  useSceneObject(rightRig?.root ?? null);
  useEffect(() => () => {
    for (const rig of [leftRig, rightRig]) {
      rig?.root.traverse((object) => {
        if (object instanceof SkinnedMesh) object.skeleton.dispose();
      });
    }
  }, [leftRig, rightRig]);
  return null;
}
