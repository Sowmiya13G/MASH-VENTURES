"use client";

import { useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SupercarTransformerModel } from "./SupercarTransformerModel";

interface TransformationSceneProps {
  progress: number;
  overclock?: boolean;
}

export function TransformationScene({ progress, overclock = false }: TransformationSceneProps) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const pedestalGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Continuous smooth cyber scanner rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.45;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.7;
    }
  });

  return (
    <>
      {/* Dynamic Camera with high-end framing */}
      <PerspectiveCamera makeDefault position={[3.6, 2.2, 5.2]} fov={38} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.8}
        maxDistance={8.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate={false}
        dampingFactor={0.06}
        enableDamping={true}
      />

      {/* Cybernetic Studio Lighting Rig */}
      <ambientLight intensity={1.2} />

      {/* Key Studio Light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* Cyber-Red Rim Light (Brand identity) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={3.5}
        color="#c90010"
      />

      {/* Electric Cyan Fill (Supercar optics & cyber reflections) */}
      <directionalLight
        position={[5, -2, -3]}
        intensity={2.2}
        color="#00d2ff"
      />

      {/* Warm Golden Key Accent */}
      <pointLight
        position={[0, 4, 3]}
        intensity={1.5}
        color="#f59e0b"
      />

      {/* Center Stage Supercar -> Robot Model */}
      <SupercarTransformerModel progress={progress} overclock={overclock} />

      {/* Holographic Cyber Pedestal */}
      <group ref={pedestalGroup} position={[0, -1.5, 0]}>
        {/* Solid carbon base */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[2.5, 2.7, 0.25, 48]} />
          <meshStandardMaterial
            color="#0b0d10"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Primary Glowing Red Neon Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <torusGeometry args={[2.48, 0.045, 16, 64]} />
          <meshBasicMaterial color="#c90010" />
        </mesh>

        {/* Outer Rotating Cyan Scanner Ring */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <torusGeometry args={[2.9, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.65} />
        </mesh>

        {/* Inner Counter-Rotating Golden Ring */}
        <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 48]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} />
        </mesh>

        {/* Floor Grid Contact Shadow Disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <circleGeometry args={[4.2, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.7} />
        </mesh>
      </group>
    </>
  );
}

