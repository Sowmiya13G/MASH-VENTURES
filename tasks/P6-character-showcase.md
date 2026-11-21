# Task P6 — 3D Character Portfolio Showcase

## Objective
Provide an interactive 3D showcase allowing visitors to explore MASH VENTURES' premier robotic characters (Striker, Titan, Colossus).

## Requirements
- **Interactive Orbit & Showcase**:
  - 360° drag-to-rotate interaction with bounded vertical tilt (`±20°`).
  - Continuous subtle showcase drift when unhandled.
  - Multi-layered depth parallax figure for realistic volume.
- **Zero-Leak WebGL Lifecycle**:
  - Full recursive disposal of all textures, materials, and geometries when switching characters.
  - `renderer.forceContextLoss()` and clean DOM unmounting.
- **Resource Efficiency**:
  - Freeze RAF render loop via `IntersectionObserver` when scrolled off-screen.
  - Freeze render loop via Page Visibility API (`document.hidden`) when tab is inactive.

## Implementation Checklist
- [x] Interactive 3D Model component implemented in `Character3DModel.tsx`.
- [x] Full WebGL resource garbage collection implemented on unmount.
- [x] IntersectionObserver and Page Visibility pause listeners integrated.
- [x] Character database configured with Striker, Titan, and Colossus specifications.

