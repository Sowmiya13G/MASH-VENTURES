"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import type { BumblebeeKinematics } from "./three/BumblebeeWalkerModel";

// Dynamic client-only 3D Canvas
const BumblebeeWalkerCanvas = dynamic(() => import("./three/BumblebeeWalkerCanvas"), {
  ssr: false,
});

export default function RobotWhatsAppGuide() {
  const [mounted, setMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation & DOM refs (zero layout reflows, strictly GPU translate3d)
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);

  // Kinematics Ref accessed directly inside WebGL frame loop without React re-renders
  const kinematicsRef = useRef<BumblebeeKinematics>({
    walkCycle: 0,
    isWalking: true,
    pointingProgress: 0,
    facing: 1,
  });

  // Kinematic state
  // Mode: "WALKING_TO_TARGET" | "POINTING_AT_BUTTON" | "WALKING_AWAY" | "PAUSED_SCAN"
  const animState = useRef<{
    mode: "WALKING_TO_TARGET" | "POINTING_AT_BUTTON" | "WALKING_AWAY" | "PAUSED_SCAN";
    x: number; // Current x position in pixels from screen left
    targetX: number;
    speed: number;
    facing: number;
    walkCycle: number;
    stateTimer: number;
    pointingArmProgress: number;
  }>({
    mode: "WALKING_TO_TARGET",
    x: 80,
    targetX: 80,
    speed: 68,
    facing: 1,
    walkCycle: 0,
    stateTimer: 0,
    pointingArmProgress: 0,
  });

  const lastFrameTime = useRef<number>(0);
  const rafId = useRef<number>(0);

  const href = whatsappLink();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Main high-performance animation loop (Zero-hang, delta clamped, hardware-accelerated transforms)
  const animate = useCallback((timestamp: number) => {
    if (!lastFrameTime.current) {
      lastFrameTime.current = timestamp;
    }

    const rawDelta = (timestamp - lastFrameTime.current) / 1000;
    const delta = Math.min(rawDelta, 0.05);
    lastFrameTime.current = timestamp;

    if (document.hidden || isDismissed) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    const state = animState.current;
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const isMobile = windowWidth < 680;

    // Ideal stopping point so the full 3D figure aligns naturally beside the WhatsApp button
    const buttonZoneX = windowWidth - (isMobile ? 195 : 235);
    const patrolLeftX = isMobile ? Math.max(20, buttonZoneX - 90) : Math.max(50, windowWidth * 0.22);

    // If user hovers, pause and point
    if (isHovered) {
      state.pointingArmProgress = Math.min(1.0, state.pointingArmProgress + delta * 5.0);
      state.facing = 1;
      kinematicsRef.current = {
        walkCycle: 0,
        isWalking: false,
        pointingProgress: state.pointingArmProgress,
        facing: 1,
      };
    } else {
      // Finite State Machine
      switch (state.mode) {
        case "WALKING_TO_TARGET": {
          state.facing = 1;
          state.targetX = buttonZoneX;
          const dist = state.targetX - state.x;

          if (dist > 2) {
            state.x += Math.min(dist, state.speed * delta);
            state.walkCycle += delta * 7.5;
            state.pointingArmProgress = Math.max(0, state.pointingArmProgress - delta * 4.0);

            kinematicsRef.current = {
              walkCycle: state.walkCycle,
              isWalking: true,
              pointingProgress: state.pointingArmProgress,
              facing: 1,
            };
          } else {
            // Reached pointing stop!
            state.x = buttonZoneX;
            state.mode = "POINTING_AT_BUTTON";
            state.stateTimer = 7.5; // Stay pointing for 7.5 seconds
          }
          break;
        }

        case "POINTING_AT_BUTTON": {
          state.facing = 1;
          state.walkCycle = 0;
          state.pointingArmProgress = Math.min(1.0, state.pointingArmProgress + delta * 4.5);

          kinematicsRef.current = {
            walkCycle: 0,
            isWalking: false,
            pointingProgress: state.pointingArmProgress,
            facing: 1,
          };

          state.stateTimer -= delta;
          if (state.stateTimer <= 0) {
            state.mode = "WALKING_AWAY";
            state.targetX = patrolLeftX;
          }
          break;
        }

        case "WALKING_AWAY": {
          state.facing = -1;
          state.targetX = patrolLeftX;
          state.pointingArmProgress = Math.max(0, state.pointingArmProgress - delta * 4.0);
          const dist = state.x - state.targetX;

          if (dist > 2) {
            state.x -= Math.min(dist, state.speed * 0.9 * delta);
            state.walkCycle += delta * 7.0;

            kinematicsRef.current = {
              walkCycle: state.walkCycle,
              isWalking: true,
              pointingProgress: state.pointingArmProgress,
              facing: -1,
            };
          } else {
            // Reached left patrol boundary!
            state.x = patrolLeftX;
            state.mode = "PAUSED_SCAN";
            state.stateTimer = 2.4;
          }
          break;
        }

        case "PAUSED_SCAN": {
          state.walkCycle = 0;
          state.pointingArmProgress = 0;
          state.stateTimer -= delta;

          kinematicsRef.current = {
            walkCycle: 0,
            isWalking: false,
            pointingProgress: 0,
            facing: state.facing,
          };

          if (state.stateTimer <= 0) {
            state.mode = "WALKING_TO_TARGET";
          }
          break;
        }
      }
    }

    // Hardware-accelerated GPU transform along the bottom floor
    if (robotRef.current) {
      robotRef.current.style.transform = `translate3d(${state.x}px, 0, 0) scaleX(${state.facing})`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [isDismissed, isHovered]);

  useEffect(() => {
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      animState.current.x = window.innerWidth - 235;
      animState.current.mode = "POINTING_AT_BUTTON";
      animState.current.pointingArmProgress = 1.0;
      kinematicsRef.current = {
        walkCycle: 0,
        isWalking: false,
        pointingProgress: 1.0,
        facing: 1,
      };
    }

    rafId.current = requestAnimationFrame(animate);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastFrameTime.current = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, animate]);

  if (!mounted || !href) return null;

  return (
    <>
      {/* 1. Global Viewport Floor Patrol Container (pointer-events-none so it never blocks page clicks) */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-48 overflow-visible select-none"
      >
        {/* The Full-Body 3D Rigged Bumblebee Model */}
        <div
          ref={robotRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            window.open(href, "_blank", "noopener,noreferrer");
          }}
          className={`pointer-events-auto absolute bottom-2 left-0 flex h-48 w-40 cursor-pointer flex-col items-center justify-end transition-opacity duration-300 ${
            isDismissed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Ground Soft Contact Shadow */}
          <div className="absolute bottom-2 h-3 w-24 rounded-full bg-black/75 blur-[4px]" />

          {/* 3D Model Canvas */}
          <div className="relative h-full w-full">
            <BumblebeeWalkerCanvas kinematicsRef={kinematicsRef} />
          </div>
        </div>
      </div>

      {/* 2. Tiny Mecha Mascot Restore Badge if dismissed */}
      {isDismissed && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(false);
          }}
          title="Wake up Bumblebee Scout"
          className="fixed bottom-24 right-8 z-[101] flex h-8 w-8 items-center justify-center rounded-full bg-[#e5a00d] text-black shadow-lg border border-black hover:scale-110 transition animate-bounce"
        >
          <Sparkles size={16} />
        </button>
      )}
    </>
  );
}
