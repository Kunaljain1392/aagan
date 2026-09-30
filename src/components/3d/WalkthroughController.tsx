import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface Keyframe {
  time: number;
  camPos: [number, number, number];
  target: [number, number, number];
  subtitle: string;
}

export const WALKTHROUGH_KEYFRAMES: Keyframe[] = [
  {
    time: 0,
    camPos: [55, 15, 55],
    target: [0, 12, 0],
    subtitle: "00:00 — Approaching the 60x60m corner plot along the shaded tree-lined public pedestrian way.",
  },
  {
    time: 5,
    camPos: [24, 3, 24],
    target: [0, 3, 0],
    subtitle: "00:05 — Stepping under the double-height 4.5m colonnade into the vibrant community retail plaza.",
  },
  {
    time: 10,
    camPos: [0, 1.8, 4],
    target: [0, 35, 0],
    subtitle: "00:10 — Entering the 16x16m central courtyard. Looking up through the 35m open-air vertical thermal chimney.",
  },
  {
    time: 15,
    camPos: [0, 18, 2],
    target: [8, 18, 0],
    subtitle: "00:15 — Ascending the vertical stack core. Dual-aspect residential balconies and terracotta jaali screens.",
  },
  {
    time: 20,
    camPos: [16, 38, 16],
    target: [0, 32, 0],
    subtitle: "00:20 — Reaching the bio-solar rooftop: 85 kWp solar PV pergolas and community sky garden.",
  },
  {
    time: 25,
    camPos: [48, 42, -42],
    target: [0, 18, 0],
    subtitle: "00:25 — Aerial sunset panorama: shops below, homes above, an ancient courtyard reborn for modern India.",
  },
  {
    time: 30,
    camPos: [52, 28, 52],
    target: [0, 15, 0],
    subtitle: "00:30 — AANGAN: The building that breathes. Team MIDNIGHT-CODERS (PS 26116).",
  },
];

export const WalkthroughController: React.FC = () => {
  const { camera } = useThree();
  const { walkthrough, setWalkthroughTime, setWalkthroughPlaying, cameraPreset } = useAppStore();

  useFrame((_, delta) => {
    if (!walkthrough.isPlaying) {
      // If user selected a preset camera and walkthrough is not playing, lerp to preset
      if (cameraPreset === 'street') {
        camera.position.lerp(new THREE.Vector3(38, 2.5, 38), delta * 4);
        camera.lookAt(0, 5, 0);
      } else if (cameraPreset === 'courtyard') {
        camera.position.lerp(new THREE.Vector3(0, 1.8, 1), delta * 4);
        camera.lookAt(0, 30, 0);
      } else if (cameraPreset === 'top') {
        camera.position.lerp(new THREE.Vector3(0, 75, 0.1), delta * 4);
        camera.lookAt(0, 0, 0);
      } else if (cameraPreset === 'axonometric') {
        camera.position.lerp(new THREE.Vector3(45, 45, 45), delta * 4);
        camera.lookAt(0, 15, 0);
      }
      return;
    }

    const nextTime = walkthrough.currentTimeSeconds + delta;
    if (nextTime >= 30) {
      setWalkthroughTime(30);
      setWalkthroughPlaying(false);
      return;
    }

    setWalkthroughTime(nextTime);

    // Find the two surrounding keyframes
    let kf1 = WALKTHROUGH_KEYFRAMES[0];
    let kf2 = WALKTHROUGH_KEYFRAMES[1];

    for (let i = 0; i < WALKTHROUGH_KEYFRAMES.length - 1; i++) {
      if (nextTime >= WALKTHROUGH_KEYFRAMES[i].time && nextTime <= WALKTHROUGH_KEYFRAMES[i + 1].time) {
        kf1 = WALKTHROUGH_KEYFRAMES[i];
        kf2 = WALKTHROUGH_KEYFRAMES[i + 1];
        break;
      }
    }

    const duration = kf2.time - kf1.time;
    const progress = Math.min(1, Math.max(0, (nextTime - kf1.time) / duration));
    // Smooth cosine easing
    const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);

    // Interpolate camera position
    const camX = kf1.camPos[0] + (kf2.camPos[0] - kf1.camPos[0]) * eased;
    const camY = kf1.camPos[1] + (kf2.camPos[1] - kf1.camPos[1]) * eased;
    const camZ = kf1.camPos[2] + (kf2.camPos[2] - kf1.camPos[2]) * eased;

    // Interpolate target lookAt
    const tgtX = kf1.target[0] + (kf2.target[0] - kf1.target[0]) * eased;
    const tgtY = kf1.target[1] + (kf2.target[1] - kf1.target[1]) * eased;
    const tgtZ = kf1.target[2] + (kf2.target[2] - kf1.target[2]) * eased;

    camera.position.set(camX, camY, camZ);
    camera.lookAt(tgtX, tgtY, tgtZ);
  });

  return null;
};
