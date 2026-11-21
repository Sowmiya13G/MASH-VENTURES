# MASH VENTURES — Development Tasks & Roadmap

> **Mission**: Build an ultra-premium, dark, futuristic cinematic website for MASH VENTURES where the signature hero moment is a sleek yellow supercar entering and mechanically transforming into a powerful humanoid robot.

---

## Task Priorities Overview

| Priority | Task | Focus | Status |
| :--- | :--- | :--- | :--- |
| **P1** | **Cinematic Hero** | Futuristic yellow sports car 3D scene entering hero | 🟡 Ready for Asset Integration |
| **P2** | **Transformation Sequence** | Rigged mechanical transformation from car to humanoid robot | 🟡 Architecture Ready |
| **P3** | **Robot Motion & Lighting** | Idle breathing, head glance tracking, mechanical glowing lights | 🟡 Architecture Ready |
| **P4** | **Cinematic Camera Choreography** | Smooth zoom, orbit, tracking, exponential damping | 🟢 Implemented (Damped Loop) |
| **P5** | **Scroll Animations** | GSAP / ScrollTrigger section transitions & timeline sync | 🟢 Implemented |
| **P6** | **3D Character Showcase** | Interactive 3D character portfolio with zero-leak lifecycle | 🟢 Implemented |
| **P7** | **Experiences & Services** | Accessible DOM cards for brand activations & mall spectacles | 🟢 Implemented |
| **P8** | **Enquiry & Conversion** | Fast booking form & direct WhatsApp activation | 🟢 Implemented |
| **P9** | **Zero-Lag & Mobile Optimization** | Adaptive DPR, offscreen RAF freeze, 60–120 FPS guarantee, SEO | 🟢 Implemented |

---

## Detailed Task Breakdown

### [P1] Cinematic Hero: Futuristic Yellow Supercar 3D Scene
- [ ] Source or assemble an original, high-poly-look, low-draw-call futuristic yellow sports car model (Nakamotors supercar design language).
- [ ] Implement realistic metallic/clearcoat paint shaders with subtle environmental reflections.
- [ ] Configure cinematic hero entrance lighting: key light, rim lights, ground shadow contact, and cyber-pedestal.
- [ ] Build responsive camera rig framing correctly on mobile and desktop viewports.
- [ ] Add headlights activation sequence with bloom/glint effects.

### [P2] Signature Mechanical Transformation
- [ ] Integrate rigged GLB asset with segmented body panels, hydraulic joints, and transformation animation clips.
- [ ] Bind transformation timeline to user scroll progress or an interactive toggle via GSAP / `AnimationMixer`.
- [ ] Synchronize wheel collapse, chest expansion, and head emergence in a sequenced mechanical choreography.
- [ ] Provide graceful static fallback for devices without WebGL or with `prefers-reduced-motion`.

### [P3] Robot Animation & Post-Transformation Hero Pose
- [ ] Seamless transition into idle stance after transformation finishes.
- [ ] Subtle procedural floating / breathing motion using clamped delta time.
- [ ] Magnetic cursor tracking: robot head and upper torso smoothly look toward pointer.
- [ ] Luminous cybernetic accents: pulsating chest core and optic visors with controlled emissive intensity.

### [P4] Camera Animation & Choreography
- [ ] Implement multi-stage camera path: sweeping low-angle car reveal &rarr; dynamic dolly during transformation &rarr; dramatic hero framing.
- [ ] Enforce delta-based exponential damping: `val += (target - val) * (1 - Math.exp(-lambda * dt))`.
- [ ] Clamp frame delta (`Math.min(delta, 0.05)`) to eliminate teleportation and tab-switch freezing.

### [P5] Scroll Animations & Section Transitions
- [ ] Smoothly orchestrate 3D background with DOM foreground sections using GSAP and ScrollTrigger.
- [ ] Separate property ownership: GSAP handles DOM section reveals, R3F handles 3D object transforms.
- [ ] Ensure full keyboard navigation and natural native scroll velocity.

### [P6] 3D Character Portfolio Showcase
- [x] Character selector for Striker, Titan, and Colossus.
- [x] Three.js canvas with interactive orbit and auto-drift showcase.
- [x] Complete resource garbage collection on model switch (dispose geometries, materials, and textures).
- [x] Offscreen pausing via `IntersectionObserver` to preserve battery and GPU memory.

### [P7] Experiences & Brand Activations
- [x] Structured service offerings: Mall Appearances, Brand Activations, Corporate Events, Private Celebrations.
- [x] Accessible semantic HTML cards outside WebGL canvas for 100% crawlability and SEO.

### [P8] High-Conversion Enquiry Flow
- [x] Booking form with real-time validation via React Hook Form & Zod.
- [x] Direct WhatsApp floating button and instant chat links with pre-filled event inquiry text.

### [P9] Production Hardening & Zero-Lag Guarantee
- [x] Adaptive DPR: strictly capped at `1.5` on desktop and `1.0–1.2` on mobile.
- [x] Page Visibility API integration: stop RAF loop when tab is hidden.
- [x] Clean zero-warning lint check and type check.
- [x] Full static generation (`23/23` pages built).

