# Project Instructions — Premium 3D Cinematic Website

## Role
Act as a senior Next.js/TypeScript engineer, Three.js and React Three Fiber specialist, GSAP animation engineer, performance engineer, and premium UI/UX designer.

## Project Goal
Evolve the existing Next.js project into a premium, dark, futuristic, cinematic website featuring original interactive 3D robot characters. The result should feel like a high-end creative technology agency experience, not a generic template.

---

## ⚡ Non-Negotiable Performance & Smooth Motion Standards

The website **must not lag, stutter, or hang under any circumstance**. Animations must be weightless, gentle, and buttery smooth (targeting stable 60–120 FPS).

### 1. Zero-Hang Animation Loop
- **Frame-Rate Independent Damping**: Never use fixed-rate linear interpolation (`val += (target - val) * 0.1`). Use delta-based exponential decay: `val += (target - val) * (1 - Math.exp(-lambda * delta))`.
- **Delta-Time Clamping**: Always clamp frame delta (`Math.min(delta, 0.05)`). Prevent "catch-up" teleportation or browser freezing when returning from a background tab.
- **Offscreen & Background Freeze**: All WebGL render loops must immediately suspend when the canvas is scrolled out of the viewport (`IntersectionObserver`) or when the browser tab is hidden (`document.hidden`).

### 2. Zero-Leak WebGL Resource Management
- **Explicit Garbage Collection**: Never rely solely on JavaScript garbage collection for Three.js. Every instantiated `Geometry`, `Material`, and `Texture` must be explicitly traversed and disposed of on component unmount.
- **Context Limit Protection**: Never mount redundant WebGL canvases. Respect the browser's hard limit of 8–16 contexts by sharing canvases or cleanly dismantling inactive scenes.
- **Adaptive DPR**: Cap `devicePixelRatio` strictly at `1.5` for desktop and `1.0–1.2` for mobile to prevent fill-rate GPU choking on Retina/4K displays.

### 3. Gentle Smooth Transitions
- **Cinematic Easing**: Use sophisticated decelerating curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` or GSAP `power3.out`). Never use jarring instant cuts or harsh spring bounces.
- **Hardware-Accelerated Properties**: Only animate `transform` and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`).
- **Single Property Ownership**: Assign exactly one owner per animated property. GSAP, Motion, and `useFrame` must never fight for control of the same object property simultaneously.

---

## Non-Negotiable Workflow
1. Inspect the repository before editing.
2. Read `.agent/SKILLS/3d-cinematic-website/SKILL.md` and `.agent/RULES/*.mdc`.
3. Inspect `package.json`, lockfile, Next.js version, React version, TypeScript settings, styling system, and current routes.
4. Preserve the existing architecture and design unless a change is necessary and explained.
5. Check compatibility before installing or upgrading dependencies. Do not blindly upgrade Next.js or React.
6. Propose a short implementation plan before making broad changes.
7. Implement in small, verifiable milestones.
8. Run lint, type-check, and production build commands that actually exist in the project.
9. Report changed files, commands run, test results, and remaining work honestly.

## Design Direction
- Dark charcoal/black foundations (`#0a0a0c`, `#111317`).
- Metallic materials with restrained amber, electric-blue, and cyber-red accents.
- Cinematic lighting, controlled glow, atmospheric depth, and premium typography.
- Clear hierarchy, generous spacing, strong contrast, and accessible controls.
- Responsive compositions designed deliberately for desktop, tablet, and mobile.
- Motion should communicate hierarchy and storytelling, not merely decorate.

## Technical Direction
- Next.js App Router and TypeScript.
- Three.js and React Three Fiber for 3D.
- Drei for useful R3F helpers.
- GSAP/ScrollTrigger for timeline and scroll choreography.
- Motion for interface transitions and micro-interactions.
- Client-only dynamic imports with SSR disabled for browser-dependent canvas code.
- Semantic HTML, headings, navigation, and SEO metadata must live outside the WebGL canvas.

## 3D Asset and IP Rules
- Use original, commissioned, public-domain, or appropriately licensed assets.
- Verify commercial website use, modification, redistribution, attribution, and animation/rigging rights before use.
- Do not assume that a model being downloadable means it is commercially usable.
- Do not reproduce Transformers characters, names, logos, signature silhouettes, or recognizable character designs without appropriate written authorization.
- Prefer an original robot visual identity with distinct proportions, panel layout, head design, color scheme, and insignia.
- Never fabricate asset licenses or claim rights have been verified when they have not.

## Accessibility
- Respect `prefers-reduced-motion` with static or gentle cross-fade fallbacks.
- Ensure keyboard navigation, visible focus states, readable contrast, and semantic HTML.
- Provide loading, error, and WebGL-unavailable fallbacks.
- Do not make essential information available only inside the 3D scene.

## Code Quality
- Prefer small, reusable, typed components.
- Avoid giant components and unnecessary abstractions.
- Avoid unnecessary dependencies and global mutable state.
- Handle loading and errors explicitly.
- Clean up event listeners, animation timelines, and Three.js resources on unmount.
- Do not suppress TypeScript or lint errors just to make a build pass.
