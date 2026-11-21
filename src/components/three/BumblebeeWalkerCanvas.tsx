"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BumblebeeWalkerModel, BumblebeeKinematics } from "./BumblebeeWalkerModel";

interface BumblebeeWalkerCanvasProps {
  kinematicsRef: React.RefObject<BumblebeeKinematics>;
}

export default function BumblebeeWalkerCanvas({ kinematicsRef }: BumblebeeWalkerCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      className="h-full w-full pointer-events-none"
    >
      {/* Balanced 3-point cyber studio lighting */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[2.5, 4, 3]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-2.5, 2, 2]} intensity={1.5} color="#ffd54f" />
      <directionalLight position={[0, -2, 2]} intensity={0.9} color="#38bdf8" />
      <pointLight position={[0, 0.8, 1.5]} intensity={1.2} color="#ffffff" />

      <Suspense fallback={null}>
        <BumblebeeWalkerModel kinematicsRef={kinematicsRef} />
      </Suspense>
    </Canvas>
  );
}
