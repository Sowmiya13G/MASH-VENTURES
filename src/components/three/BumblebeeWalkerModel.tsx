"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

export interface BumblebeeKinematics {
  walkCycle: number;
  isWalking: boolean;
  pointingProgress: number; // 0.0 = relaxed, 1.0 = pointing arm towards button
  facing: number; // 1 for right, -1 for left
}

interface BumblebeeWalkerModelProps {
  kinematicsRef: React.RefObject<BumblebeeKinematics>;
}

export function BumblebeeWalkerModel({ kinematicsRef }: BumblebeeWalkerModelProps) {
  const { scene } = useGLTF("/models/bumblebee.glb");

  // Clone with skeleton so skinned mesh binds uniquely to its own bones
  const clonedScene = useMemo(() => {
    const clone = cloneSkeleton(scene);
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.SkinnedMesh).isSkinnedMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.frustumCulled = false; // Prevent culling during procedural bone animation
        if (mesh.material) {
          const origMat = mesh.material as THREE.MeshStandardMaterial;
          const mat = origMat.clone();
          // Vibrant Bumblebee PBR finish - rich yellow & dark metal details
          mat.roughness = 0.45;
          mat.metalness = 0.12;
          mat.side = THREE.DoubleSide;
          mat.needsUpdate = true;
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Bone references for procedural kinematics
  const bonesRef = useRef<{
    hips?: THREE.Bone;
    spine?: THREE.Bone;
    neck?: THREE.Bone;
    head?: THREE.Bone;
    leftUpLeg?: THREE.Bone;
    leftLeg?: THREE.Bone;
    leftFoot?: THREE.Bone;
    rightUpLeg?: THREE.Bone;
    rightLeg?: THREE.Bone;
    rightFoot?: THREE.Bone;
    leftArm?: THREE.Bone;
    leftForeArm?: THREE.Bone;
    leftHand?: THREE.Bone;
    rightArm?: THREE.Bone;
    rightForeArm?: THREE.Bone;
  }>({});

  // Resting rotations map (preserves original rig bind pose)
  const restingEulerMap = useRef<Map<string, THREE.Euler>>(new Map());

  useEffect(() => {
    const bones: typeof bonesRef.current = {};
    const eulers = new Map<string, THREE.Euler>();

    clonedScene.traverse((obj) => {
      if ((obj as THREE.Bone).isBone) {
        const bone = obj as THREE.Bone;
        eulers.set(bone.name, bone.rotation.clone());

        if (bone.name.includes("Hips")) bones.hips = bone;
        else if (bone.name.includes("Spine2") || bone.name.includes("Spine1")) bones.spine = bone;
        else if (bone.name.includes("Neck")) bones.neck = bone;
        else if (bone.name.includes("Head_06") || bone.name.includes("Head")) bones.head = bone;
        else if (bone.name.includes("LeftUpLeg")) bones.leftUpLeg = bone;
        else if (bone.name.includes("LeftLeg")) bones.leftLeg = bone;
        else if (bone.name.includes("LeftFoot")) bones.leftFoot = bone;
        else if (bone.name.includes("RightUpLeg")) bones.rightUpLeg = bone;
        else if (bone.name.includes("RightLeg")) bones.rightLeg = bone;
        else if (bone.name.includes("RightFoot")) bones.rightFoot = bone;
        else if (bone.name.includes("LeftArm")) bones.leftArm = bone;
        else if (bone.name.includes("LeftForeArm")) bones.leftForeArm = bone;
        else if (bone.name.includes("LeftHand")) bones.leftHand = bone;
        else if (bone.name.includes("RightArm")) bones.rightArm = bone;
        else if (bone.name.includes("RightForeArm")) bones.rightForeArm = bone;
      }
    });

    bonesRef.current = bones;
    restingEulerMap.current = eulers;
  }, [clonedScene]);

  // Zero-hang WebGL frame loop directly reading kinematic transforms without React re-renders
  useFrame((state) => {
    const kinematics = kinematicsRef.current;
    if (!kinematics) return;

    const { walkCycle, isWalking, pointingProgress } = kinematics;
    const t = state.clock.getElapsedTime();
    const bones = bonesRef.current;
    const eulers = restingEulerMap.current;

    const getRest = (bone?: THREE.Bone) => (bone ? eulers.get(bone.name) : undefined);

    // 1. LEGS (Walking Cadence - calibrated for Mixamo 180° inverted local Z frame)
    const legSwing = isWalking ? Math.sin(walkCycle) * 0.38 : 0;
    const kneeBend = isWalking ? Math.abs(Math.sin(walkCycle)) * 0.28 : 0;

    if (bones.leftUpLeg) {
      const rest = getRest(bones.leftUpLeg);
      if (rest) bones.leftUpLeg.rotation.x = rest.x - legSwing;
    }
    if (bones.rightUpLeg) {
      const rest = getRest(bones.rightUpLeg);
      if (rest) bones.rightUpLeg.rotation.x = rest.x + legSwing;
    }

    if (bones.leftLeg) {
      const rest = getRest(bones.leftLeg);
      if (rest) bones.leftLeg.rotation.x = rest.x + (legSwing > 0 ? kneeBend : 0.05);
    }
    if (bones.rightLeg) {
      const rest = getRest(bones.rightLeg);
      if (rest) bones.rightLeg.rotation.x = rest.x + (legSwing < 0 ? kneeBend : 0.05);
    }

    // 2. ARMS
    // Left Arm (on +X side in character space, facing right towards the WhatsApp button):
    if (bones.leftArm) {
      const rest = getRest(bones.leftArm);
      if (rest) {
        const armWalk = isWalking ? Math.sin(walkCycle) * 0.32 : Math.sin(t * 1.5) * 0.04;
        const targetElevation = -0.72;
        const targetOutward = -0.32;
        const p = pointingProgress;

        bones.leftArm.rotation.x = THREE.MathUtils.lerp(rest.x + armWalk, rest.x + targetElevation, p);
        bones.leftArm.rotation.z = THREE.MathUtils.lerp(rest.z, rest.z + targetOutward, p);
      }
    }

    if (bones.leftForeArm) {
      const rest = getRest(bones.leftForeArm);
      if (rest) {
        const targetForearm = -0.28;
        bones.leftForeArm.rotation.x = THREE.MathUtils.lerp(rest.x, rest.x + targetForearm, pointingProgress);
      }
    }

    // Right Arm:
    if (bones.rightArm) {
      const rest = getRest(bones.rightArm);
      if (rest) {
        const armWalk = isWalking ? -Math.sin(walkCycle) * 0.32 : -Math.sin(t * 1.5) * 0.04;
        const targetRest = -0.15;
        bones.rightArm.rotation.x = THREE.MathUtils.lerp(rest.x + armWalk, rest.x + targetRest, pointingProgress);
      }
    }

    // 3. HEAD & LOOKAT
    if (bones.head) {
      const rest = getRest(bones.head);
      if (rest) {
        const lookAngle = THREE.MathUtils.lerp(0, -0.35, pointingProgress);
        bones.head.rotation.y = rest.y + lookAngle;
        bones.head.rotation.x = rest.x + Math.sin(t * 2.0) * 0.03;
      }
    }

    // 4. HIPS & BREATHING
    if (bones.hips) {
      const rest = getRest(bones.hips);
      if (rest) {
        const bob = isWalking ? Math.abs(Math.sin(walkCycle * 2)) * 0.04 : Math.sin(t * 1.6) * 0.015;
        bones.hips.position.y = rest.y + bob;
      }
    }
  });

  // Perfectly balanced scale & position framing the full figure (Head to Feet) in view
  return (
    <group position={[0, -0.55, 0]} rotation={[0, 0.2, 0]} scale={16}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/bumblebee.glb");
