"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RobotCharacterMeshProps {
  slug: string;
}

export function RobotCharacterMesh({ slug }: RobotCharacterMeshProps) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();

    // Subtle organic breathing motion on root group
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.6) * 0.05;
    }

    // Magnetic mouse glance tracking on head
    if (headRef.current) {
      const mouse = state.pointer;
      const targetRotY = mouse.x * 0.45;
      const targetRotX = -mouse.y * 0.25;
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * (1 - Math.exp(-6.0 * safeDelta));
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * (1 - Math.exp(-6.0 * safeDelta));
    }

    // Arm idle micro-oscillation
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = 0.08 + Math.sin(t * 1.4) * 0.03;
      rightArmRef.current.rotation.z = -0.08 - Math.sin(t * 1.4) * 0.03;
    }

    // Pulse core reactor
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.6 + Math.sin(t * 3.0) * 0.5;
      }
    }
  });

  // Character-specific palette configuration
  const config = {
    striker: {
      primaryColor: "#f59e0b", // Radiant Bumblebee Amber/Gold
      secondaryColor: "#15171b", // Carbon Aero Black
      accentColor: "#00f0ff", // Electric Cyan Optics
      jointColor: "#cbd5e1", // Silver Titanium
      shoulderScale: [0.42, 0.36, 0.48] as [number, number, number],
      hasCrownVFin: true,
      hasShoulderCannons: false,
      hasHeavyFists: false,
    },
    titan: {
      primaryColor: "#1d4ed8", // Deep Cobalt Titanium Blue
      secondaryColor: "#334155", // Slate Gunmetal
      accentColor: "#38bdf8", // Sky Blue Optics & Energy Cores
      jointColor: "#e2e8f0", // Polished Chrome
      shoulderScale: [0.55, 0.45, 0.52] as [number, number, number],
      hasCrownVFin: false,
      hasShoulderCannons: true,
      hasHeavyFists: false,
    },
    colossus: {
      primaryColor: "#c90010", // Crimson Heavy Armor Red
      secondaryColor: "#0f172a", // Dark Iron Void
      accentColor: "#f97316", // Molten Orange Reactor
      jointColor: "#64748b", // Heavy Industrial Steel
      shoulderScale: [0.65, 0.55, 0.62] as [number, number, number],
      hasCrownVFin: false,
      hasShoulderCannons: false,
      hasHeavyFists: true,
    },
  }[slug] || {
    primaryColor: "#f59e0b",
    secondaryColor: "#15171b",
    accentColor: "#00f0ff",
    jointColor: "#cbd5e1",
    shoulderScale: [0.45, 0.38, 0.5] as [number, number, number],
    hasCrownVFin: true,
    hasShoulderCannons: false,
    hasHeavyFists: false,
  };

  // PBR Materials
  const primaryMat = (
    <meshStandardMaterial
      color={config.primaryColor}
      metalness={0.88}
      roughness={0.22}
      envMapIntensity={1.8}
    />
  );

  const secondaryMat = (
    <meshStandardMaterial
      color={config.secondaryColor}
      metalness={0.7}
      roughness={0.35}
    />
  );

  const jointMat = (
    <meshStandardMaterial
      color={config.jointColor}
      metalness={0.92}
      roughness={0.18}
    />
  );

  const emissiveOpticMat = (
    <meshStandardMaterial
      color={config.accentColor}
      emissive={config.accentColor}
      emissiveIntensity={2.2}
      metalness={0.8}
      roughness={0.1}
    />
  );

  return (
    <group ref={rootRef} position={[0, -0.15, 0]} scale={1.15}>
      {/* 1. CENTRAL TORSO & CHEST ARMOR */}
      <group position={[0, 0.5, 0]}>
        {/* Upper Pectoral Armor Shell */}
        <mesh position={[0, 0.35, 0.12]}>
          <boxGeometry args={[1.05, 0.58, 0.65]} />
          {primaryMat}
        </mesh>

        {/* Angular Sternum Inset Plate */}
        <mesh position={[0, 0.22, 0.42]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.72, 0.38, 0.22]} />
          {secondaryMat}
        </mesh>

        {/* Central Luminous Arc Reactor */}
        <mesh ref={coreRef} position={[0, 0.25, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
          {emissiveOpticMat}
        </mesh>

        {/* Dual Chest Energy Accent Bars */}
        <mesh position={[-0.32, 0.42, 0.44]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.24, 0.04, 0.04]} />
          {emissiveOpticMat}
        </mesh>
        <mesh position={[0.32, 0.42, 0.44]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.24, 0.04, 0.04]} />
          {emissiveOpticMat}
        </mesh>

        {/* Abdominal Hydraulic Actuators & Midsection */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.68, 0.42, 0.52]} />
          {secondaryMat}
        </mesh>
        <mesh position={[-0.2, -0.12, 0.18]}>
          <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
          {jointMat}
        </mesh>
        <mesh position={[0.2, -0.12, 0.18]}>
          <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
          {jointMat}
        </mesh>

        {/* Heavy Pelvic Chassis / Waist Plate */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.82, 0.24, 0.58]} />
          {primaryMat}
        </mesh>
      </group>

      {/* 2. ARTICULATED ROBOT HEAD */}
      <group ref={headRef} position={[0, 1.38, 0.08]}>
        {/* Main Angular Helmet Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.42, 0.44, 0.46]} />
          {primaryMat}
        </mesh>

        {/* Forehead Crest & Brow Armor */}
        <mesh position={[0, 0.14, 0.15]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.38, 0.16, 0.24]} />
          {secondaryMat}
        </mesh>

        {/* Glowing Optic Visor Scanner */}
        <mesh position={[0, 0.02, 0.24]}>
          <boxGeometry args={[0.32, 0.08, 0.04]} />
          {emissiveOpticMat}
        </mesh>

        {/* Chin Guard */}
        <mesh position={[0, -0.16, 0.18]}>
          <boxGeometry args={[0.22, 0.14, 0.18]} />
          {jointMat}
        </mesh>

        {/* Winged V-Fin Crown Antenna (Striker feature from Image 2) */}
        {config.hasCrownVFin && (
          <>
            <mesh position={[-0.28, 0.3, 0]} rotation={[0.3, 0, 0.72]}>
              <boxGeometry args={[0.08, 0.55, 0.14]} />
              {primaryMat}
            </mesh>
            <mesh position={[0.28, 0.3, 0]} rotation={[0.3, 0, -0.72]}>
              <boxGeometry args={[0.08, 0.55, 0.14]} />
              {primaryMat}
            </mesh>
          </>
        )}

        {/* Dual Command Antenna Fins (Titan feature) */}
        {config.hasShoulderCannons && (
          <>
            <mesh position={[-0.24, 0.28, -0.05]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.06, 0.42, 0.12]} />
              {jointMat}
            </mesh>
            <mesh position={[0.24, 0.28, -0.05]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.06, 0.42, 0.12]} />
              {jointMat}
            </mesh>
          </>
        )}

        {/* Heavy Blast Brow (Colossus feature) */}
        {config.hasHeavyFists && (
          <mesh position={[0, 0.24, 0.12]}>
            <boxGeometry args={[0.48, 0.16, 0.32]} />
            {secondaryMat}
          </mesh>
        )}
      </group>

      {/* 3. SHOULDER PAULDRONS & ARMS */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.82, 0.88, 0]}>
        {/* Tiered Shoulder Pauldron */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={config.shoulderScale} />
          {primaryMat}
        </mesh>
        {/* Shoulder Cannon Pod (Titan) */}
        {config.hasShoulderCannons && (
          <mesh position={[-0.05, 0.42, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.48, 16]} />
            {jointMat}
          </mesh>
        )}
        {/* Bicep Actuator */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.38, 16]} />
          {jointMat}
        </mesh>
        {/* Forearm Gauntlet */}
        <mesh position={[-0.04, -0.52, 0.08]}>
          <boxGeometry args={[0.34, 0.52, 0.38]} />
          {secondaryMat}
        </mesh>
        {/* Hand / Heavy Fist */}
        <mesh position={[-0.04, -0.86, 0.12]}>
          <boxGeometry args={config.hasHeavyFists ? [0.38, 0.34, 0.42] : [0.22, 0.24, 0.24]} />
          {primaryMat}
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.82, 0.88, 0]}>
        {/* Tiered Shoulder Pauldron */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={config.shoulderScale} />
          {primaryMat}
        </mesh>
        {/* Shoulder Cannon Pod (Titan) */}
        {config.hasShoulderCannons && (
          <mesh position={[0.05, 0.42, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.48, 16]} />
            {jointMat}
          </mesh>
        )}
        {/* Bicep Actuator */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.38, 16]} />
          {jointMat}
        </mesh>
        {/* Forearm Gauntlet */}
        <mesh position={[0.04, -0.52, 0.08]}>
          <boxGeometry args={[0.34, 0.52, 0.38]} />
          {secondaryMat}
        </mesh>
        {/* Hand / Heavy Fist */}
        <mesh position={[0.04, -0.86, 0.12]}>
          <boxGeometry args={config.hasHeavyFists ? [0.38, 0.34, 0.42] : [0.22, 0.24, 0.24]} />
          {primaryMat}
        </mesh>
      </group>

      {/* 4. BIPEDAL LEGS & HEAVY FEET */}
      {/* Left Leg */}
      <group position={[-0.38, -0.22, 0]}>
        {/* Thigh Armor */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.38, 0.58, 0.44]} />
          {primaryMat}
        </mesh>
        {/* Knee Joint Cylinder */}
        <mesh position={[0, -0.68, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.36, 16]} />
          {jointMat}
        </mesh>
        {/* Lower Shin Plate */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[0.42, 0.72, 0.48]} />
          {secondaryMat}
        </mesh>
        {/* Foot Stabilizer */}
        <mesh position={[0, -1.52, 0.16]}>
          <boxGeometry args={[0.44, 0.18, 0.76]} />
          {primaryMat}
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.38, -0.22, 0]}>
        {/* Thigh Armor */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.38, 0.58, 0.44]} />
          {primaryMat}
        </mesh>
        {/* Knee Joint Cylinder */}
        <mesh position={[0, -0.68, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.36, 16]} />
          {jointMat}
        </mesh>
        {/* Lower Shin Plate */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[0.42, 0.72, 0.48]} />
          {secondaryMat}
        </mesh>
        {/* Foot Stabilizer */}
        <mesh position={[0, -1.52, 0.16]}>
          <boxGeometry args={[0.44, 0.18, 0.76]} />
          {primaryMat}
        </mesh>
      </group>
    </group>
  );
}

