"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { RobotCharacterMesh } from "./RobotCharacterMesh";
import { RotateCw } from "lucide-react";

interface RobotCharacterCanvasProps {
  slug: string;
}

export default function RobotCharacterCanvas({ slug }: RobotCharacterCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause WebGL rendering when scrolled out of view to maintain 60–120 FPS across the site
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none cursor-grab active:cursor-grabbing bg-gradient-to-b from-white/[0.04] via-charcoal to-black rounded-2xl overflow-hidden"
    >
      {isVisible && (
        <Canvas
          dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.0 : 1.5]}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.25;

            return () => {
              scene.traverse((obj) => {
                if ((obj as THREE.Mesh).isMesh) {
                  const m = obj as THREE.Mesh;
                  m.geometry?.dispose();
                  if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
                  else m.material?.dispose();
                }
              });
              gl.dispose();
              gl.forceContextLoss();
            };
          }}
        >
          {/* Camera framing */}
          <PerspectiveCamera makeDefault position={[0, 0.4, 4.6]} fov={42} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3.2}
            maxDistance={7.0}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.05}
            dampingFactor={0.06}
            enableDamping={true}
          />

          {/* Studio Lighting */}
          <ambientLight intensity={1.3} />
          <directionalLight position={[5, 7, 5]} intensity={2.6} color="#ffffff" />
          <directionalLight position={[-5, 4, -4]} intensity={3.2} color="#e10600" />
          <directionalLight position={[4, -2, -3]} intensity={2.0} color="#00d2ff" />

          {/* 3D Volumetric Robot Mesh */}
          <RobotCharacterMesh slug={slug} />

          {/* Holographic Cyber Pedestal */}
          <group position={[0, -2.1, 0]}>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[1.8, 2.0, 0.18, 36]} />
              <meshStandardMaterial color="#0c0e12" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
              <torusGeometry args={[1.85, 0.035, 16, 48]} />
              <meshBasicMaterial color="#e10600" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
              <torusGeometry args={[2.2, 0.015, 16, 48]} />
              <meshBasicMaterial color="#00d2ff" transparent opacity={0.6} />
            </mesh>
          </group>
        </Canvas>
      )}

      {/* Orbit Interaction Hint */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-chrome/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 font-tech">
        <RotateCw size={11} className="animate-spin text-mash-red" style={{ animationDuration: "6s" }} />
        <span>3D Drag View</span>
      </div>
    </div>
  );
}

