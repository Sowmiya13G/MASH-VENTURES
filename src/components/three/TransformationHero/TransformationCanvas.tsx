"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { TransformationScene } from "./TransformationScene";
import { Zap, RotateCw, Shield, Play, RotateCcw } from "lucide-react";

export default function TransformationCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.0); // 0.0 = Supercar, 1.0 = Winged Mecha Robot
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const [isTransforming, setIsTransforming] = useState(false);
  const [overclock, setOverclock] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hasAutoTriggeredRef = useRef(false);

  // Smooth cinematic transformation animator
  const runTransformation = useCallback((targetProgress: number, durationMs = 2600) => {
    setIsTransforming(true);
    const startTime = performance.now();
    const startProgress = progressRef.current;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1.0, elapsed / durationMs);
      // Decelerating cubic-bezier curve [0.16, 1, 0.3, 1] for gentle, premium mechanical motion
      const eased = 1 - Math.pow(1 - t, 3);
      const currentVal = startProgress + (targetProgress - startProgress) * eased;
      setProgress(currentVal);

      if (t < 1.0) {
        requestAnimationFrame(tick);
      } else {
        setIsTransforming(false);
        setProgress(targetProgress);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // AUTOMATIC TRANSFORMATION TRIGGER:
  // Starts in Supercar mode for 1.2s, then automatically transforms into the Humanoid Robot
  useEffect(() => {
    if (hasAutoTriggeredRef.current) return;
    hasAutoTriggeredRef.current = true;

    const autoTimer = setTimeout(() => {
      runTransformation(1.0, 2800);
    }, 1200);

    return () => clearTimeout(autoTimer);
  }, [runTransformation]);

  // Zero-Waste: Pause render loop when scrolled offscreen
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

  const handleModeCar = () => {
    setIsTransforming(false);
    setProgress(0.0);
  };

  const handleModeRobot = () => {
    setIsTransforming(false);
    setProgress(1.0);
  };

  const handleReplay = () => {
    setProgress(0.0);
    setTimeout(() => {
      runTransformation(1.0, 2600);
    }, 300);
  };

  // Live telemetry status text
  const getStatusText = () => {
    if (isTransforming) {
      if (progress < 0.4) return "UNCOUPLING CHASSIS...";
      if (progress < 0.75) return "DEPLOYING HYDRAULICS...";
      return "CALIBRATING OPTICS...";
    }
    if (progress <= 0.1) return "SUPERCAR // CRUISE MODE";
    if (progress >= 0.9) return "ROBOT GUARDIAN // ONLINE";
    return "MECHANICAL INTERMEDIARY";
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[380px] sm:h-[480px] lg:h-[540px] w-full max-w-2xl flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-charcoal/90 to-black/95 p-3 sm:p-5 shadow-2xl backdrop-blur-md overflow-hidden select-none touch-pan-y"
    >
      {/* Top Cybernetic Status Bar */}
      <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-6 z-10 flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase font-tech">
        <div className="flex items-center gap-1.5 sm:gap-2 text-chrome/80">
          <Shield size={13} className="text-mash-red shrink-0" />
          <span className="truncate max-w-[130px] sm:max-w-none">CYBER-CHASSIS // MK-IX</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-mash-red animate-ping" />
          <span className="text-mash-red font-mono font-bold tracking-wider text-[9px] sm:text-[11px]">
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
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

              // Register cleanup traversal on unmount
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
            <TransformationScene progress={progress} overclock={overclock} />
          </Canvas>
        )}

        {/* Orbit Interaction Hint */}
        <div className="pointer-events-none absolute bottom-16 right-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-chrome/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 font-tech">
          <RotateCw size={12} className="animate-spin text-mash-red" style={{ animationDuration: "6s" }} />
          <span>360° Drag Orbit</span>
        </div>
      </div>

      {/* Interactive Controls & Scrubbing Interface */}
      <div className="relative z-10 mt-auto w-full max-w-xl rounded-xl sm:rounded-2xl border border-white/10 bg-black/80 p-2.5 sm:p-3.5 backdrop-blur-xl shadow-lg">
        {/* Progress Slider */}
        <div className="mb-2 sm:mb-3 flex flex-col gap-1 sm:gap-1.5">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold tracking-widest text-chrome/70 uppercase font-tech">
            <span>0% Supercar</span>
            <span className="font-mono text-mash-red">{Math.round(progress * 100)}% Displaced</span>
            <span>100% Robot</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => {
              setIsTransforming(false);
              setProgress(parseFloat(e.target.value));
            }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-mash-red transition hover:bg-white/30"
            aria-label="Mechanical transformation progress scrubber"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 pt-1 border-t border-white/10">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={handleModeCar}
              className={`rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition font-tech ${
                progress <= 0.1 ? "bg-white text-black shadow-md" : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Supercar
            </button>
            <button
              type="button"
              onClick={handleModeRobot}
              className={`rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition font-tech ${
                progress >= 0.9 ? "bg-white text-black shadow-md" : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Robot
            </button>
          </div>

          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-mash-red to-mash-red-dark px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white shadow-[0_0_24px_rgba(201,0,16,0.5)] transition hover:brightness-110 active:scale-95 font-tech"
          >
            {isTransforming ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
            <span>Replay</span>
          </button>

          <button
            type="button"
            onClick={() => setOverclock(!overclock)}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition font-tech ${
              overclock
                ? "bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                : "bg-white/10 text-chrome/70 hover:bg-white/20"
            }`}
            title="Overclock core reactor and projector optics"
          >
            <Zap size={12} className={overclock ? "animate-bounce text-cyber-cyan" : ""} />
            <span>Boost</span>
          </button>
        </div>
      </div>
    </div>
  );
}
