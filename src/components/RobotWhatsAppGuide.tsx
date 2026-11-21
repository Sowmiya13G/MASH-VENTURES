"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function RobotWhatsAppGuide() {
  const [mounted, setMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation & state refs (all GPU transforms, zero layout reflows)
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);

  // Mechanical kinematic limb refs
  const leftLegRef = useRef<SVGGElement>(null);
  const rightLegRef = useRef<SVGGElement>(null);
  const leftArmRef = useRef<SVGGElement>(null);
  const rightArmRef = useRef<SVGGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const visorRef = useRef<SVGPolygonElement>(null);

  // Kinematic state
  // Mode: "WALKING_TO_TARGET" | "POINTING_AT_BUTTON" | "WALKING_AWAY" | "PAUSED_SCAN"
  const animState = useRef<{
    mode: "WALKING_TO_TARGET" | "POINTING_AT_BUTTON" | "WALKING_AWAY" | "PAUSED_SCAN";
    x: number; // Current x position in pixels from screen left
    targetX: number; // Target x
    speed: number; // px/sec
    facing: number; // 1 for right, -1 for left
    walkCycle: number; // Radian accumulator for walk swing
    stateTimer: number; // Timer for pointing or scanning duration
    pointingArmProgress: number; // 0.0 = relaxed, 1.0 = fully pointing at WhatsApp button
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

    // Delta clamping strictly to 50ms (per performance guidelines in AGENTS.md)
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

    // The WhatsApp button is fixed at `right: 24px` with width 56px.
    // The target parking stop for the robot to point at the button:
    // On desktop: ~135px to the left of the screen right edge (leaving comfortable space before the button).
    // On mobile: ~105px to the left of the button.
    const buttonZoneX = windowWidth - (isMobile ? 120 : 155);
    const patrolLeftX = isMobile ? Math.max(20, buttonZoneX - 90) : Math.max(50, windowWidth * 0.22);

    // If user hovers, override state to pointing
    if (isHovered) {
      state.pointingArmProgress = Math.min(1.0, state.pointingArmProgress + delta * 5.0);
      state.facing = 1;
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
          } else {
            // Reached target pointing position! Transition to POINTING_AT_BUTTON
            state.x = buttonZoneX;
            state.mode = "POINTING_AT_BUTTON";
            state.stateTimer = 7.5; // Stay pointing for 7.5 seconds
          }
          break;
        }

        case "POINTING_AT_BUTTON": {
          state.facing = 1;
          state.walkCycle = 0; // Stand firmly
          state.pointingArmProgress = Math.min(1.0, state.pointingArmProgress + delta * 4.5);

          state.stateTimer -= delta;
          if (state.stateTimer <= 0) {
            // Finished pointing duration; turn around and walk away to patrol the floor
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
          } else {
            // Reached left patrol boundary! Pause and scan floor
            state.x = patrolLeftX;
            state.mode = "PAUSED_SCAN";
            state.stateTimer = 2.4; // Pause for 2.4 seconds
          }
          break;
        }

        case "PAUSED_SCAN": {
          state.walkCycle = 0;
          state.pointingArmProgress = 0;
          state.stateTimer -= delta;

          if (state.stateTimer <= 0) {
            // Done scanning; walk back to point at the WhatsApp button again!
            state.mode = "WALKING_TO_TARGET";
          }
          break;
        }
      }
    }

    // Apply kinematic transforms to DOM elements via hardware-accelerated CSS transforms
    if (robotRef.current) {
      // Bobbing torso on walk cycle: |sin(walkCycle)| * 2.4px
      const bob = Math.abs(Math.sin(state.walkCycle)) * 2.4;
      robotRef.current.style.transform = `translate3d(${state.x}px, ${-bob}px, 0) scaleX(${state.facing})`;
    }

    // Leg swings (sinusoidal rotation in degrees)
    const legAngle = Math.sin(state.walkCycle) * 26; // -26deg to +26deg
    if (leftLegRef.current) {
      leftLegRef.current.style.transform = `rotate(${legAngle}deg)`;
    }
    if (rightLegRef.current) {
      rightLegRef.current.style.transform = `rotate(${-legAngle}deg)`;
    }

    // Left arm swings with opposite leg
    if (leftArmRef.current) {
      const armSwing = Math.sin(state.walkCycle) * 22;
      leftArmRef.current.style.transform = `rotate(${-armSwing}deg)`;
    }

    // Right arm (Pointing arm):
    // When walking: swings slightly.
    // When pointing: smoothly elevates to -48deg pointing toward the WhatsApp button!
    if (rightArmRef.current) {
      const walkSwing = Math.sin(state.walkCycle) * 20;
      const targetPointAngle = -48;
      const currentArmAngle = (1 - state.pointingArmProgress) * walkSwing + state.pointingArmProgress * targetPointAngle;
      rightArmRef.current.style.transform = `rotate(${currentArmAngle}deg)`;
    }

    // Optical Visor Eyes Glow Pulse
    if (visorRef.current) {
      const visorPulse = 0.8 + Math.sin(timestamp * 0.005) * 0.2 + state.pointingArmProgress * 0.3;
      visorRef.current.style.opacity = `${Math.min(1.0, visorPulse)}`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [isDismissed, isHovered]);

  useEffect(() => {
    if (!mounted) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      animState.current.x = window.innerWidth - 150;
      animState.current.mode = "POINTING_AT_BUTTON";
      animState.current.pointingArmProgress = 1.0;
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
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-28 overflow-visible select-none"
      >
        {/* The Animated Robotic Mecha Scout */}
        <div
          ref={robotRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            window.open(href, "_blank", "noopener,noreferrer");
          }}
          className={`pointer-events-auto absolute bottom-4 left-0 flex h-24 w-20 cursor-pointer flex-col items-center justify-end transition-opacity duration-300 ${
            isDismissed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Ground Soft Contact Shadow */}
          <div className="absolute -bottom-1 h-2.5 w-14 rounded-full bg-black/60 blur-[3px]" />

          {/* Scalable Hard-Surface Vector Robot */}
          <svg
            viewBox="0 0 100 120"
            className="h-full w-full overflow-visible"
            style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.65))" }}
          >
            <defs>
              {/* Metallic Yellow Sports Car Finish */}
              <linearGradient id="armorYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#e5a00d" />
                <stop offset="100%" stopColor="#b47407" />
              </linearGradient>

              {/* Matte Carbon Black Chassis */}
              <linearGradient id="carbonChassis" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d3139" />
                <stop offset="100%" stopColor="#14161a" />
              </linearGradient>

              {/* Cyber Cyan Optic Glow */}
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Back Door Wings (Car-doors flared behind shoulders) */}
            <g id="backWings">
              <path
                d="M 36 34 L 14 14 L 24 38 Z"
                fill="url(#armorYellow)"
                stroke="#181a1f"
                strokeWidth="1.5"
              />
              <path
                d="M 64 34 L 86 14 L 76 38 Z"
                fill="url(#armorYellow)"
                stroke="#181a1f"
                strokeWidth="1.5"
              />
            </g>

            {/* Left Leg (Hips origin at (40, 72)) */}
            <g
              ref={leftLegRef}
              style={{ transformOrigin: "40px 72px", transition: "transform 0.04s linear" }}
            >
              {/* Thigh */}
              <rect x="34" y="72" width="10" height="18" rx="3" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1.2" />
              {/* Knee Joint */}
              <circle cx="39" cy="90" r="4" fill="url(#carbonChassis)" stroke="#71717a" strokeWidth="1" />
              {/* Shin & Boot */}
              <polygon points="34,92 44,92 46,112 32,112" fill="url(#carbonChassis)" stroke="#181a1f" strokeWidth="1" />
              <rect x="30" y="112" width="18" height="6" rx="2" fill="url(#armorYellow)" />
              {/* Ankle Wheel Detail */}
              <circle cx="31" cy="106" r="4.5" fill="#181a1f" stroke="#a1a1aa" strokeWidth="1" />
            </g>

            {/* Right Leg (Hips origin at (60, 72)) */}
            <g
              ref={rightLegRef}
              style={{ transformOrigin: "60px 72px", transition: "transform 0.04s linear" }}
            >
              {/* Thigh */}
              <rect x="56" y="72" width="10" height="18" rx="3" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1.2" />
              {/* Knee Joint */}
              <circle cx="61" cy="90" r="4" fill="url(#carbonChassis)" stroke="#71717a" strokeWidth="1" />
              {/* Shin & Boot */}
              <polygon points="56,92 66,92 68,112 54,112" fill="url(#carbonChassis)" stroke="#181a1f" strokeWidth="1" />
              <rect x="52" y="112" width="18" height="6" rx="2" fill="url(#armorYellow)" />
              {/* Ankle Wheel Detail */}
              <circle cx="69" cy="106" r="4.5" fill="#181a1f" stroke="#a1a1aa" strokeWidth="1" />
            </g>

            {/* Left Arm (Origin at shoulder (28, 42)) */}
            <g
              ref={leftArmRef}
              style={{ transformOrigin: "28px 42px", transition: "transform 0.04s linear" }}
            >
              {/* Shoulder Pauldron */}
              <path d="M 20 38 L 36 34 L 34 48 L 18 46 Z" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1.2" />
              {/* Arm & Forearm */}
              <rect x="22" y="46" width="8" height="15" rx="2" fill="url(#carbonChassis)" />
              <rect x="20" y="60" width="10" height="14" rx="2" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1" />
              {/* Hand */}
              <circle cx="25" cy="76" r="3.5" fill="url(#carbonChassis)" />
            </g>

            {/* Torso & Chassis */}
            <g ref={torsoRef}>
              {/* Lower Pelvis */}
              <polygon points="36,66 64,66 58,74 42,74" fill="url(#carbonChassis)" stroke="#181a1f" strokeWidth="1" />

              {/* Chest Breastplate (Car Hood / Grille Aesthetic) */}
              <path
                d="M 30 38 L 70 38 L 64 66 L 36 66 Z"
                fill="url(#carbonChassis)"
                stroke="#181a1f"
                strokeWidth="1.2"
              />
              {/* Muscle Yellow Pectoral Plates */}
              <polygon points="32,40 48,40 46,56 34,56" fill="url(#armorYellow)" />
              <polygon points="52,40 68,40 66,56 54,56" fill="url(#armorYellow)" />

              {/* Glowing Core Spark Matrix (Cyan pulse) */}
              <circle cx="50" cy="50" r="4.5" fill="#00f0ff" filter="url(#cyanGlow)" />
              <circle cx="50" cy="50" r="2" fill="#ffffff" />
            </g>

            {/* Head & Battle Helmet */}
            <g id="mechaHead">
              {/* Helmet Crest & Horns */}
              <polygon points="50,10 44,22 56,22" fill="url(#armorYellow)" />
              <polygon points="40,16 46,26 38,26" fill="url(#armorYellow)" />
              <polygon points="60,16 62,26 54,26" fill="url(#armorYellow)" />

              {/* Helmet Face Mask */}
              <polygon points="40,24 60,24 57,38 43,38" fill="url(#carbonChassis)" stroke="#181a1f" strokeWidth="1.2" />
              <polygon points="42,22 58,22 56,28 44,28" fill="url(#armorYellow)" />

              {/* Glowing Cyan Optical Visor */}
              <polygon
                ref={visorRef}
                points="43,28 57,28 55,32 45,32"
                fill="#00f0ff"
                filter="url(#cyanGlow)"
              />
            </g>

            {/* Right Arm: The Iconic Pointing Arm (Origin at right shoulder (72, 42)) */}
            <g
              ref={rightArmRef}
              style={{ transformOrigin: "72px 42px", transition: "transform 0.04s linear" }}
            >
              {/* Shoulder Pauldron */}
              <path d="M 64 34 L 80 38 L 82 46 L 66 48 Z" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1.2" />
              {/* Bicep */}
              <rect x="70" y="46" width="8" height="15" rx="2" fill="url(#carbonChassis)" />
              {/* Forearm Guard */}
              <rect x="68" y="60" width="10" height="14" rx="2" fill="url(#armorYellow)" stroke="#181a1f" strokeWidth="1" />

              {/* Articulated Pointing Hand with Glowing Index Tip */}
              <circle cx="73" cy="75" r="4" fill="url(#carbonChassis)" />
              {/* Extended Pointing Finger */}
              <polygon points="72,75 83,75 84,72 72,72" fill="url(#armorYellow)" />
              {/* Glowing Laser / Energy Tip on Finger */}
              <circle cx="85" cy="73.5" r="2.5" fill="#00f0ff" filter="url(#cyanGlow)" />
            </g>
          </svg>
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
          className="fixed bottom-24 right-8 z-[101] flex h-8 w-8 items-center justify-center rounded-full bg-[#e5a00d] text-black shadow-lg border border-black hover:scale-110 transition animate-bounce"
        >
          <Sparkles size={16} />
        </button>
      )}
    </>
  );
}
