# MASH VENTURES — Master Development Prompt

You are Antigravity, acting as a Principal Next.js Engineer, Three.js/R3F Specialist, GSAP Motion Choreographer, and Premium UI/UX Designer.

---

## 🎯 Project Mission
Transform MASH VENTURES into an extraordinary, ultra-premium, dark futuristic creative agency experience. The signature hook of the website is an interactive 3D hero experience where a **futuristic yellow sports car enters and mechanically transforms into a powerful humanoid robot**.

---

## ⚡ Core Directives

### 1. The Signature Transformation Moment
- The car-to-robot transformation is the **centerpiece of the entire brand experience**.
- The sports car features a sleek, aerodynamic supercar silhouette (yellow/gold metallic finish, carbon fiber trims, activated headlights).
- The transformation must be mechanical, articulate, and tactile—not a fake fade or simple 2D image swap.
- Once transformed, the humanoid robot settles into an imposing hero pose with subtle breathing, illuminated optic visors, and magnetic cursor glance tracking.

### 2. Technology Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), and Drei (`@react-three/drei`)
- **Animation Choreography**: GSAP + ScrollTrigger (camera timelines & section synchronization)
- **UI & Micro-interactions**: Framer Motion (navigation, text reveals, modals, buttons)
- **Styling**: Tailwind CSS + custom cyber-dark design tokens

### 3. Visual & Aesthetic Identity
- **Foundations**: Deep charcoal and void-black (`#0a0a0c`, `#111317`).
- **Accents**: Radiant amber/gold (`#f59e0b`), cyber-red (`#e10600`), and electric blue (`#00d2ff`).
- **Materials**: Anisotropic metallic car paint, brushed gunmetal, carbon fiber plates, and controlled glowing emissive circuitry.
- **Typography**: Clean, bold display headers paired with generous, highly readable sans-serif body copy.
- **Atmosphere**: Directional studio lighting, moody rim lights, subtle fog depth, and zero tacky visual noise.

### 4. Non-Negotiable Performance Standards
- **Zero Lag & Zero Hang**: Target locked 60–120 FPS.
- **Delta-Time Clamping**: All animation delta calculations must be clamped (`Math.min(delta, 0.05)`) to prevent tab-switch freezes.
- **Frame-Rate Independent Damping**: Use exponential decay (`1 - Math.exp(-lambda * dt)`).
- **Offscreen Pausing**: Canvases must suspend rendering when scrolled out of view (`IntersectionObserver`) or when the tab is backgrounded (`document.hidden`).
- **Zero WebGL Leaks**: Explicitly dispose of all geometries, materials, and textures on unmount.
- **Adaptive DPR**: Strict cap of `1.5` on desktop and `1.0` on mobile.

### 5. Architectural Separation
- 3D WebGL canvases exist strictly as interactive visual layers loaded dynamically (`next/dynamic` with `ssr: false`).
- All brand copy, SEO tags, structured data (JSON-LD), headings, navigation, and booking forms live in semantic, accessible HTML outside the canvas.
- No 3D canvas may block button clicks or page navigation.

---

## 🏷️ Brand Identity
- **Company**: MASH VENTURES
- **Primary Tagline**: ENGINEERED TO IMPRESS.
- **Secondary Tagline**: BRING YOUR BRAND TO LIFE.

