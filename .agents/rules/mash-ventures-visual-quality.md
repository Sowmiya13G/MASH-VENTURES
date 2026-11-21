---
description: "Visual quality, design standards, and strict motion rules for MASH VENTURES."
globs: "*"
alwaysApply: true
---

# MASH VENTURES — Visual Quality & Design Rules

## 1. Aesthetic Direction
- **Atmosphere**: Dark, cinematic, futuristic creative agency aesthetic.
- **Background Palette**: Void black (`#0a0a0c`) and deep carbon charcoal (`#111317`).
- **Accent Hierarchy**:
  - Primary Brand Red: `#c90010`
  - Dark Red: `#96000c`
  - Cybernetic Gold/Amber: `#f59e0b` (for supercar body and mechanical core accents)
  - Cyber Cyan / Electric Blue: `#00d2ff` (for scanner rings and optical visors)
  - Platinum Chrome: `#e5e7eb` (for typography and structural trims)
- **Materials**: Realistic car clearcoat, brushed gunmetal, industrial carbon weave, and subtle matte finishes.

---

## 2. Strict Design & Performance Commandments

1. **No Unnecessary Animations**:
   - Every movement must serve narrative hierarchy or direct visitor focus.
   - Do not decorate with gratuitous floating cubes, pointless confetti, or chaotic background particles.

2. **No Excessive Glowing Effects**:
   - Keep emissive bloom disciplined and localized (e.g. headlight beams, optic visors, core reactors).
   - Never blow out contrast or wash out readability with blinding neon wash.

3. **No Laggy Scrolling**:
   - Never hijack or trap native scroll behavior.
   - If using smooth scroll (such as Lenis), synchronize it directly with GSAP's ticker without introducing input latency.
   - Event listeners for touch and wheel must always use `{ passive: true }`.

4. **No Horizontal Overflow on Mobile**:
   - Test all viewports down to 320px width.
   - Wrap 3D viewports and text containers in strict `overflow-x-clip` or `overflow-x-hidden`.

5. **No Huge or Obstructive Loading Screens**:
   - The initial DOM layout, typography, and navigation must paint immediately without blocking behind a full-screen loader.
   - 3D assets stream in progressively with a subtle, non-intrusive status indicator.

6. **No 3D Canvas Blocking Buttons or Navigation**:
   - Set `pointer-events: none` on ambient 3D canvases.
   - Interactive orbit/drag zones must be scoped strictly to designated interactive containers without overlapping headers, CTAs, or navigation links.

7. **No Animation That Interferes with Reading**:
   - Body copy, pricing, technical specifications, and forms must remain stationary or finish entering quickly.
   - Never animate text while a visitor is attempting to read or fill out inputs.

8. **Always Provide a Mobile Fallback**:
   - Low-tier mobile devices with constrained GPUs must gracefully fall back to an optimized WebP render or simplified low-draw-call scene.
   - Cap DPR at `1.0` on mobile.

9. **Respect Reduced-Motion Settings**:
   - When `prefers-reduced-motion: reduce` is detected, disable camera travel, floating oscillations, and transformation sweeps.
   - Show the fully transformed hero robot in a static, majestic pose with instantaneous cross-fades.

10. **Keep the Website Premium and Clean**:
    - Prioritize generous negative space, crisp typography, and high contrast ratios for maximum prestige.
    - Avoid cluttered templates; maintain the feel of an elite creative technology studio.
