# Task P4 — Cinematic Camera Choreography

## Objective
Engineer a dynamic, cinematic camera rig that guides visitor perspective during the car entrance, transformation, and hero reveal.

## Requirements
- **Multi-Stage Camera Trajectory**:
  - **Stage 1 (Entrance)**: Low-angle dramatic side sweep tracking the arriving sports car.
  - **Stage 2 (Transformation)**: Orbiting dolly in-and-up as the vehicle expands into vertical robot height.
  - **Stage 3 (Hero Pose)**: Powerful low-to-eye-level framing showcasing character stature.
- **Physics & Damping**:
  - Smooth decelerating curves (`power3.out`).
  - Clamped frame delta (`Math.min(delta, 0.05)`) to eliminate teleportation and tab-switch freezes.
- **Single Property Ownership**:
  - GSAP exclusively owns the camera world position; `useFrame` only controls subtle micro-sway.

## Implementation Checklist
- [x] Exponential damping formula configured (`1 - Math.exp(-lambda * dt)`).
- [ ] Define 3D Catmull-Rom spline path for camera travel.
- [ ] Bind spline progress to GSAP timeline.
- [ ] Ensure camera aspect ratio and projection matrix update cleanly on window resize.

