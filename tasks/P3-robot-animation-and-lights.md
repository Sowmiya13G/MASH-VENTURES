# Task P3 — Robot Motion & Cybernetic Lighting

## Objective
Bring the transformed humanoid robot to life with organic idle movement, glowing optic visors, and interactive cursor tracking.

## Requirements
- **Post-Transformation Idle**:
  - Natural breathing cycle using damped sine oscillation on upper chest: `Math.sin(elapsedTime * 1.5) * 0.05`.
  - Subtle micro-weight shift in the robotic joints.
- **Magnetic Glance Tracking**:
  - Robot head and upper torso smoothly look toward the cursor pointer position with clamped bounding angles (`max ±25°`).
  - Decoupled from mousemove event handlers; updated smoothly in render loop via exponential damping.
- **Optic Visors & Core Reactor**:
  - Glowing red/blue cybernetic visors with gentle breathing pulse.
  - Emissive core illumination without excessive post-processing bloom.

## Implementation Checklist
- [ ] Configure `RobotIdle` skeletal animation clip blending in `AnimationMixer`.
- [ ] Implement normalized pointer listener (`targetX`, `targetY`) with passive event registration.
- [ ] Apply damped lookAt rotation on robot head bone via `useFrame`.
- [ ] Add pulsing emissive shader chunk to visor and core reactor materials.

