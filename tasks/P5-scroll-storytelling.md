# Task P5 — Scroll Animations & Section Transitions

## Objective
Harmonize the 3D WebGL background layer with DOM foreground sections using GSAP and ScrollTrigger for a seamless narrative flow.

## Requirements
- **Fluid Section Staggering**:
  - Heading reveals, feature cards, and brand statistics smoothly enter the viewport with hardware-accelerated transforms (`transform`, `opacity`).
  - No layout thrashing (never animate `top`, `left`, `width`, or `height`).
- **Scroll Synchronization**:
  - WebGL hero canvas seamlessly transitions to ambient background or unmounts cleanly when passing into lower sections.
  - Native scroll momentum is preserved; no rigid scroll-jacking.
- **Accessibility**:
  - Fallback to instant, static layout when `prefers-reduced-motion` is active.

## Implementation Checklist
- [x] Configure CSS hardware-accelerated ease tokens (`cubic-bezier(0.16, 1, 0.3, 1)`).
- [x] GSAP and ScrollTrigger synchronization foundation established.
- [ ] Connect Hero scroll depth to character introduction section.
- [ ] Ensure all scroll event listeners are registered with `{ passive: true }`.

