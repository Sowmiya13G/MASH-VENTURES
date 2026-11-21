# Task P9 — Production Hardening & Zero-Lag Optimization

## Objective
Enforce strict performance benchmarks, mobile responsiveness, memory hygiene, and SEO compliance to ensure the website runs at locked 60–120 FPS without lag.

## Requirements
- **FPS & Frame Budget**:
  - Locked 60–120 FPS; no main-thread JavaScript task exceeding 16.6ms.
  - Exponential damping (`1 - Math.exp(-lambda * dt)`) and delta clamping (`Math.min(delta, 0.05)`).
- **GPU Fill-Rate & Adaptive DPR**:
  - Desktop DPR strictly capped at `1.5`.
  - Mobile DPR strictly capped at `1.0` to prevent overheating and battery drain.
- **Memory & Context Protection**:
  - Maximum 1 active WebGL canvas context at any time.
  - Automatic disposal of all Three.js resources upon route transition or unmount.
- **Typography & Assets**:
  - Preconnected Google Fonts (`Orbitron` & `Rajdhani`) for instant zero-FOUT rendering.
  - Compressed WebP/AVIF images and WebGL Draco model compression.

## Implementation Checklist
- [x] Adaptive DPR configuration established.
- [x] Delta clamping and exponential damping integrated in 3D loop.
- [x] Clean zero-warning lint check and typecheck.
- [x] Production build passes with 23/23 static pages generated.

