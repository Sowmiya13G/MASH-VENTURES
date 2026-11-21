# Task P1 — Cinematic Hero (Yellow Supercar 3D Scene)

## Objective
Implement the initial hero stage featuring a futuristic yellow sports car entering the viewport in a dark, atmospheric cyber-studio.

## Requirements
- **Visuals**:
  - Aerodynamic yellow/gold metallic sports car (Nakamotors supercar design language).
  - Clearcoat reflections, carbon fiber trims, and active headlights with subtle glint.
  - Directional key light, cybernetic red/blue rim lights, and a holographic contact shadow.
- **Technology**:
  - Next.js 15 App Router (client-only dynamic import with `ssr: false`).
  - Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`).
- **Framing & Responsiveness**:
  - Automatic camera distance calibration for mobile, tablet, and widescreen desktop.
  - Zero horizontal overflow (`overflow-x-clip`).

## Implementation Checklist
- [ ] Source or assemble rigged supercar GLB model (`/public/models/yellow-supercar.glb`).
- [ ] Create `src/components/three/HeroScene/SupercarCanvas.tsx` with dynamic SSR-disabled loading.
- [ ] Add lighting rig: key spotlight, red rim directional, cyan bounce, ambient floor bounce.
- [ ] Implement headlights activation trigger with luminous emissive intensity.
- [ ] Add loading placeholder and WebGL-unavailable fallback.

