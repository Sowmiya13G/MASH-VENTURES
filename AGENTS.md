# Project Instructions — Premium 3D Cinematic Website

## Role
Act as a senior Next.js/TypeScript engineer, Three.js and React Three Fiber specialist, GSAP animation engineer, performance engineer, and premium UI/UX designer.

## Project goal
Evolve the existing Next.js project into a premium, dark, futuristic, cinematic website featuring original interactive 3D robot characters. The result should feel like a high-end creative technology agency experience, not a generic template.

## Non-negotiable workflow
1. Inspect the repository before editing.
2. Read `skills/3d-cinematic-website/SKILL.md` and `.cursor/rules/3d-cinematic-website.mdc` when available.
3. Inspect `package.json`, lockfile, Next.js version, React version, TypeScript settings, styling system, and current routes.
4. Preserve the existing architecture and design unless a change is necessary and explained.
5. Check compatibility before installing or upgrading dependencies. Do not blindly upgrade Next.js or React.
6. Propose a short implementation plan before making broad changes.
7. Implement in small, verifiable milestones.
8. Run lint, type-check, and production build commands that actually exist in the project.
9. Report changed files, commands run, test results, and remaining work honestly.

## Design direction
- Dark charcoal/black foundations.
- Metallic materials and restrained amber/electric-blue accents.
- Cinematic lighting, controlled glow, atmospheric depth, and premium typography.
- Clear hierarchy, generous spacing, strong contrast, and accessible controls.
- Responsive compositions designed deliberately for desktop, tablet, and mobile.
- Motion should communicate hierarchy and storytelling, not merely decorate.

## Technical direction
Use technologies only where they solve a real need:
- Next.js App Router and TypeScript.
- Three.js and React Three Fiber for 3D.
- Drei for useful R3F helpers.
- GSAP/ScrollTrigger for timeline and scroll choreography.
- Motion for interface transitions and micro-interactions.
- Lenis only if it integrates cleanly with native scrolling and accessibility.
- Zustand only if scene state genuinely needs to be shared.

Keep WebGL scenes in client components. Use a client-only dynamic import with SSR disabled for browser-dependent canvas code. Keep meaningful page content, headings, navigation, and SEO metadata outside the WebGL canvas.

## 3D asset and IP rules
- Use original, commissioned, public-domain, or appropriately licensed assets.
- Verify commercial website use, modification, redistribution, attribution, and animation/rigging rights before use.
- Do not assume that a model being downloadable means it is commercially usable.
- Do not reproduce Transformers characters, names, logos, signature silhouettes, or recognizable character designs without appropriate written authorization.
- Prefer an original robot visual identity with distinct proportions, panel layout, head design, color scheme, and insignia.
- Never fabricate asset licenses or claim rights have been verified when they have not.

## Performance and accessibility
- Lazy-load large models and non-critical scenes.
- Compress geometry and textures appropriately; consider Draco/Meshopt and KTX2 where supported.
- Limit real-time shadows, transparency, post-processing, and particle counts.
- Use adaptive quality and a simpler mobile scene when needed.
- Pause or reduce work for offscreen scenes and hidden tabs where practical.
- Provide loading, error, and WebGL-unavailable fallbacks.
- Respect `prefers-reduced-motion`.
- Ensure keyboard navigation, focus states, readable contrast, and semantic HTML.
- Do not make essential information available only inside the 3D scene.
- Do not promise a fixed FPS; measure on representative devices.

## Animation ownership
Give each animated property one clear owner. Do not have GSAP and `useFrame` overwrite the same transform/property at the same time. Use animation mixers for authored skeletal clips and frame updates for small procedural interactions.

## Code quality
- Prefer small, reusable, typed components.
- Avoid giant components and unnecessary abstractions.
- Avoid unnecessary dependencies and global mutable state.
- Handle loading and errors explicitly.
- Clean up event listeners, animation timelines, and Three.js resources when appropriate.
- Do not suppress TypeScript or lint errors just to make a build pass.
- Do not replace real functionality with decorative mock interactions.

## First milestone
Build only a robust 3D hero:
1. A placeholder or licensed original robot GLB loads.
2. The model is framed correctly on desktop and mobile.
3. Lighting and materials look intentional.
4. A subtle idle animation and restrained pointer interaction work.
5. Loading and failure fallbacks work.
6. The hero remains usable with WebGL disabled or reduced motion.
7. Lint/type-check/build pass.

Do not build complex transformation sequences or every page before this milestone is stable.
