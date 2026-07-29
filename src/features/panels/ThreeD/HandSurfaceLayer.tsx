import type { Player } from '@/core/types/player';
import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
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
} from './handSurface';

export function HandSurfaceLayer({ player, panelId }: { player: Player; panelId: string }) {
  const assets = useLoader(GLTFLoader, [leftHandAssetUrl, rightHandAssetUrl]) as GLTF[];
  const leftRig = useMemo(() => new HandSurfaceRig(cloneSkeleton(assets[0].scene), 'left'), [assets]);
  const rightRig = useMemo(() => new HandSurfaceRig(cloneSkeleton(assets[1].scene), 'right'), [assets]);
  const pointsRef = useRef(createHandPointState());
  const previousTimeRef = useRef<bigint | null>(null);
  const { invalidate } = useThree();
  const invalidateRef = useRef(invalidate);

  useEffect(() => {
    invalidateRef.current = invalidate;
  }, [invalidate]);

  useEffect(() => {
    const consumerId = `${panelId}:hand-surface`;
    player.registerHighFrequencyConsumer(consumerId, {
      topic: HANDPOSE_POINTS_TOPIC,
      lane: 'pointcloud',
      mode: 'latest',
      onLatestMessage: (event) => {
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
    };
  }, [leftRig, panelId, player, rightRig]);

  useEffect(() => {
    return player.subscribeCurrentTime((time) => {
      const current = BigInt(time.sec) * 1_000_000_000n + BigInt(time.nsec);
      if (shouldClearHandSurface(previousTimeRef.current, current)) {
        const leftChanged = leftRig.hide();
        const rightChanged = rightRig.hide();
        if (leftChanged || rightChanged) invalidateRef.current();
      }
      previousTimeRef.current = current;
    });
  }, [leftRig, player, rightRig]);

  return (
    <>
      <primitive object={leftRig.root} />
      <primitive object={rightRig.root} />
    </>
  );
}
