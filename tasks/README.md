# MASH VENTURES — Task Index & Engineering Roadmap

This directory contains the granular, prioritized task specifications (P1 through P9) for engineering the **MASH VENTURES** dark futuristic cinematic 3D website.

---

## 🎯 Priorities & Status Overview

| File | Priority | Focus | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **[P1-cinematic-hero.md](./P1-cinematic-hero.md)** | **P1** | Cinematic Hero | Yellow supercar 3D scene entering hero | 🟡 Ready for Asset Integration |
| **[P2-transformation-sequence.md](./P2-transformation-sequence.md)** | **P2** | Transformation | Car mechanically transforms into robot | 🟡 Architecture Ready |
| **[P3-robot-animation-and-lights.md](./P3-robot-animation-and-lights.md)** | **P3** | Robot Animation | Idle breathing, head glance tracking, optic lights | 🟡 Architecture Ready |
| **[P4-camera-choreography.md](./P4-camera-choreography.md)** | **P4** | Camera Animation | Cinematic zoom, orbit, tracking with delta damping | 🟢 Implemented (Damped Loop) |
| **[P5-scroll-storytelling.md](./P5-scroll-storytelling.md)** | **P5** | Scroll Animations | Smooth section transitions via GSAP / ScrollTrigger | 🟢 Implemented |
| **[P6-character-showcase.md](./P6-character-showcase.md)** | **P6** | Character Showcase | Interactive 3D character portfolio with zero-leak GC | 🟢 Implemented |
| **[P7-experiences-and-services.md](./P7-experiences-and-services.md)** | **P7** | Experiences | Accessible DOM cards for activations & mall shows | 🟢 Implemented |
| **[P8-enquiry-and-booking.md](./P8-enquiry-and-booking.md)** | **P8** | Enquiry & Booking | Form validation (Zod) + Direct WhatsApp chat | 🟢 Implemented |
| **[P9-zero-lag-optimization.md](./P9-zero-lag-optimization.md)** | **P9** | Optimization | Mobile 60-120 FPS, adaptive DPR, offscreen freeze, SEO | 🟢 Implemented |

---

## ⚡ Non-Negotiable Performance Standards
- **Zero Lag & Zero Hang**: Target locked 60–120 FPS across displays.
- **Delta-Time Clamping**: Mandatory `Math.min(delta, 0.05)` to eliminate tab-switch freezes.
- **Single Property Ownership**: GSAP, Motion, and `useFrame` must never mutate the same property.
- **Explicit WebGL Cleanup**: Every geometry, material, and texture must be explicitly disposed of on component unmount.

