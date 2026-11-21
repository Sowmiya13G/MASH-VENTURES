# Task P2 — Signature Mechanical Transformation Sequence

## Objective
Orchestrate the signature transformation moment of MASH VENTURES: the sleek yellow sports car mechanically unfolding and reconstructing into an imposing humanoid robot.

## Requirements
- **Mechanical Integrity**:
  - The transformation must be structural and mechanical—not a simple opacity cross-fade or 2D image swap.
  - Wheels fold into lower legs, doors/roof recess into back plating, hood splits into chest armor, and head rises with activating optic visors.
- **Control & Scrubbing**:
  - Bound to user scroll progress or an interactive CTA button via GSAP timeline and `AnimationMixer`.
  - Scrub smoothly from `progress: 0.0` (pure sports car) to `progress: 1.0` (fully transformed humanoid robot).
- **Smoothness**:
  - Frame-rate independent exponential damping to prevent jitter during fast wheel scrolls.
  - Clamped delta-time (`Math.min(delta, 0.05)`).

## Implementation Checklist
- [ ] Prepare rigged model with articulated skeletal joints and `Transform` animation clip.
- [ ] Build `SupercarRobotModel.tsx` with `@react-three/drei` `useAnimations`.
- [ ] Hook `transformAction.time` to normalized progress via GSAP `ScrollTrigger`.
- [ ] Add sound FX trigger (subtle mechanical servos/pneumatics) if audio toggle is enabled.
- [ ] Respect `prefers-reduced-motion` by displaying the robot immediately in final hero pose.

