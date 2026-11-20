# Skill: Next.js 3D Cinematic Robot Website

## Purpose
A reusable implementation playbook for building an immersive, dark futuristic website in an existing Next.js project, featuring original 3D robot characters and cinematic interaction.

## 1. Discovery before implementation
Inspect:
- `package.json` and lockfile.
- Next.js, React, React DOM, and TypeScript versions.
- App Router structure and existing layouts/pages.
- CSS framework and design tokens.
- Existing animation, state, and component libraries.
- Deployment constraints and current build scripts.

Do not assume a version. React Three Fiber v9 is intended for React 19; v8 is intended for React 18. Verify current package compatibility and project constraints before installing.

## 2. Suggested stack
Use only what is needed:
- Next.js App Router + TypeScript.
- Three.js.
- `@react-three/fiber`.
- `@react-three/drei`.
- GSAP + ScrollTrigger.
- Motion for UI transitions.
- Lenis for smooth scrolling only when appropriate.
- Zustand only when scene state must be shared across components.
- Blender for authoring and optimizing original models.

Potential installation after version checks:
```bash
npm install three @react-three/fiber @react-three/drei gsap motion
npm install -D @types/three
```
Add Lenis or Zustand only if the implementation needs them. Do not run installation commands until peer compatibility has been checked.

## 3. Suggested architecture
Adapt this to the existing repository rather than forcing a full restructure.

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    Navbar.tsx
    Footer.tsx
    Preloader.tsx
  sections/
    Hero.tsx
    About.tsx
    Services.tsx
    Projects.tsx
    Contact.tsx
  three/
    SceneLoader.tsx
    SceneCanvas.tsx
    RobotScene.tsx
    RobotModel.tsx
    CameraRig.tsx
    Lighting.tsx
    Environment.tsx
    animations/
      RobotAnimations.ts
      ScrollAnimations.ts
  animations/
    TextReveal.tsx
    PageTransition.tsx
hooks/
  useReducedMotion.ts
  useScrollProgress.ts
store/
  sceneStore.ts
public/
  models/
  textures/
  hdri/
  images/
lib/
  three/
  gsap/
types/
```

## 4. Rendering architecture
- Keep the 3D canvas in a client component.
- Dynamically import browser-dependent scene code with SSR disabled from a client boundary.
- Use `Suspense` and a visible loading UI.
- Add an error boundary or equivalent failure state.
- Keep headings, CTA links, navigation, and SEO content in normal DOM elements.
- Set camera, canvas sizing, DPR, and render settings deliberately.
- Avoid mounting multiple expensive canvases when one shared scene or one active scene is sufficient.
- Provide a static image or video fallback if WebGL is unavailable.

## 5. Robot asset pipeline
Find or create a model with:
- Clear commercial-use permission.
- A suitable polygon and texture budget.
- Correct scale, origin, and orientation.
- Clean materials and UVs.
- Rigging and animation clips if character animation is required.
- Separate meshes/bones for components that need procedural movement.

Asset workflow:
1. Define a distinct original character concept.
2. Source a model from a reputable marketplace or commission a 3D artist.
3. Read the exact license for the selected asset.
4. Inspect the GLB in a viewer and in the actual scene.
5. Check scale, axes, materials, skeleton, and animation clips.
6. Optimize geometry and textures.
7. Compress with suitable tools (Draco/Meshopt for geometry; KTX2 for textures where supported).
8. Test visual quality and loading on desktop and mobile.

Possible asset discovery sites:
- Sketchfab: https://sketchfab.com/
- CGTrader: https://www.cgtrader.com/
- BlenderKit: https://www.blenderkit.com/
- TurboSquid: https://www.turbosquid.com/

These are discovery sources, not blanket guarantees of commercial rights. Check each individual asset's license and terms.

## 6. Original-character intellectual property safeguards
The visual brief may reference broad science-fiction themes such as mechanical armor, industrial robotics, futuristic materials, and cinematic lighting. It must not copy protected character expression.

Do not use Transformers names, logos, character likenesses, signature silhouettes, distinctive color/shape combinations, or recognizable transformation designs without appropriate written authorization. Create a distinct robot identity, silhouette, face, armor language, palette, and insignia.

## 7. Character interaction
Implement in increasing complexity:
1. Static model correctly framed.
2. Subtle idle movement.
3. Pointer-based head or upper-body tracking.
4. Authored animation clips through `AnimationMixer`.
5. Camera choreography.
6. Scroll-synchronized animation.
7. Complex mechanical sequences only if the model was built for them.

Use `useFrame` for lightweight procedural motion. Use animation mixers for skeletal clips. Avoid React state updates on every frame; mutate Three.js objects through refs.

## 8. Animation system
Recommended responsibilities:
- AnimationMixer: authored skeletal clips (idle, walk, turn).
- `useFrame`: small procedural movement and pointer smoothing.
- GSAP: camera timelines, section choreography, text reveals, scroll timelines.
- Motion: navigation, buttons, dialogs, and DOM micro-interactions.
- Lenis: optional smooth scrolling, integrated carefully with ScrollTrigger.

Important: assign one owner to each animated property. For example, if GSAP controls `camera.position`, do not also update that same position in `useFrame`.

For scroll scenes:
- Use stable timeline setup and cleanup.
- Avoid creating duplicate ScrollTriggers on rerender.
- Keep DOM scroll content usable without WebGL.
- Avoid pinning too many sections, especially on mobile.
- Test refresh, resize, route changes, and reduced-motion behavior.

## 9. Visual design direction
- Background: near-black, charcoal, subtle gradients.
- Accents: restrained amber, electric blue, or a project-specific palette.
- Materials: metallic, roughness variation, controlled emissive details.
- Lighting: key, fill, rim, and environment lighting; use volumetric effects sparingly.
- Typography: strong display face paired with a highly readable body face.
- Layout: bold hero, clear content hierarchy, generous whitespace, purposeful CTA.
- Avoid excessive glow, noisy backgrounds, tiny text, and constant motion.

## 10. Page experience
Suggested initial landing page:
1. Short branded preloader (skippable and accessible).
2. Hero with original robot and clear value proposition.
3. About section with restrained scroll storytelling.
4. Services presented as accessible DOM cards.
5. Projects/portfolio with optimized media.
6. Contact CTA and footer.

Build separate routes only when they provide real content value. Do not force every section to depend on the 3D canvas.

## 11. Performance
- Lazy-load non-critical models and sections.
- Use compressed GLB assets and appropriately sized textures.
- Consider LOD and simplified mobile assets.
- Limit real-time shadows, transparent layers, particles, and post-processing.
- Use instancing for repeated geometry.
- Avoid unnecessary React rerenders and per-frame state changes.
- Pause or reduce rendering when scenes are offscreen where practical.
- Dispose of resources and clean up listeners/timelines when components unmount.
- Measure on representative hardware; do not promise a fixed FPS.
- Keep initial HTML and primary content useful before the model loads.

## 12. Accessibility and resilience
- Respect `prefers-reduced-motion`.
- Provide pause/skip controls for long intro sequences.
- Ensure keyboard access and visible focus.
- Maintain text contrast.
- Use semantic headings and links.
- Do not put essential information only inside the canvas.
- Provide useful loading, error, and unsupported-WebGL states.
- Do not trap scrolling or disable browser navigation.

## 13. Milestone plan
### Milestone 1 — Foundation
Inspect project, confirm versions, plan architecture, and install only compatible dependencies.

### Milestone 2 — Hero model
Load a placeholder or licensed original GLB, frame it correctly, add lighting, loading state, and fallback.

### Milestone 3 — Interaction
Add idle animation and pointer-responsive movement, with reduced-motion support.

### Milestone 4 — Cinematic hero
Add typography, CTA, background atmosphere, and carefully controlled camera movement.

### Milestone 5 — Scroll storytelling
Add a small number of meaningful GSAP/ScrollTrigger sequences. Test mobile and route changes.

### Milestone 6 — Remaining website
Build About, Services, Projects, Contact, and navigation as responsive accessible DOM components.

### Milestone 7 — Production hardening
Optimize assets, test mobile/desktop, run lint/type-check/build, verify Vercel deployment, and document remaining limitations.

## 14. Definition of done for the first milestone
- Model loads without console errors.
- Correct framing on common desktop and mobile sizes.
- Loading and failure states are visible and usable.
- Pointer movement is smooth and bounded.
- Reduced-motion mode is respected.
- No essential content depends on WebGL.
- No major layout shift when the model loads.
- Project lint, type-check, and production build pass (if scripts exist).
- Asset usage rights are documented.
