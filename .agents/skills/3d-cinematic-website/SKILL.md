# Skill: Next.js 3D Cinematic Robot Website

## Purpose
A production-grade implementation playbook for engineering a dark, futuristic cinematic website featuring interactive 3D robot characters. Built specifically to guarantee **zero lag, zero browser hangs, stable 60–120 FPS, and gentle, buttery smooth animations and transitions**.

---

## 1. Discovery Before Implementation
Before modifying or creating any component:
1. Check `package.json` and versions: Next.js App Router, React 19, Three.js, R3F, Framer Motion / Motion.
2. Confirm canvas mounting strategy: dynamic client import with `ssr: false`.
3. Check memory & WebGL context footprint: ensure previous canvases unmount and dispose properly before mounting new ones.
4. Verify asset weights and formats: GLB, Draco compression, KTX2/WebP textures.

---

## 2. Zero-Lag & Zero-Hang WebGL Pipeline

### A. Frame-Rate Independent Exponential Damping (Butter-Smooth Smoothing)
Do not use `current += (target - current) * 0.1` — it feels sluggish at 60Hz and unnaturally fast at 120Hz/144Hz.
Instead, use frame-rate independent exponential decay:

```typescript
// Smoothly interpolate a value regardless of screen refresh rate
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

// In RAF loop or useFrame:
const safeDelta = Math.min(delta, 0.05); // CLAMP delta to avoid catch-up spikes
model.rotation.y = damp(model.rotation.y, targetRotationY, 7.5, safeDelta);
model.rotation.x = damp(model.rotation.x, targetRotationX, 7.5, safeDelta);
```

### B. Delta-Time Clamping
Whenever a user tabs away, `requestAnimationFrame` freezes. When the user returns, `delta` can be 10+ seconds.
Without clamping, models jump wildly, physics blow up, and the main thread freezes trying to execute multiple catch-up cycles.
**Mandatory rule**:
```typescript
const delta = clock.getDelta();
const safeDelta = Math.min(delta, 0.05); // Hard cap at 50ms (20fps floor step)
```

### C. Offscreen & Background Pausing (GPU Power Saving)
Never leave a WebGL render loop running if the user cannot see it:
1. **IntersectionObserver**: If the 3D canvas is scrolled out of view, stop calling `requestAnimationFrame` or set R3F `frameloop="demand"`.
2. **Page Visibility API**:
```typescript
useEffect(() => {
  let isTabActive = true;

  const handleVisibility = () => {
    isTabActive = !document.hidden;
    if (isTabActive) {
      clock.getDelta(); // Reset clock delta accumulation
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  return () => document.removeEventListener("visibilitychange", handleVisibility);
}, []);
```

### D. Adaptive DPR & Power Preference
High-resolution 4K or Retina displays will overheat mobile GPUs if rendered at DPR 3+:
```typescript
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
});

// Strict DPR ceiling: max 1.5 on desktop, 1.0 on mobile
const isMobile = window.innerWidth < 768;
const maxDpr = isMobile ? 1.0 : 1.5;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
```

---

## 3. WebGL Resource Lifecycle & Zero Memory Leaks

WebGL contexts and GPU buffers are NOT cleaned up automatically by JavaScript garbage collection. Failing to dispose of meshes, materials, and textures causes browser crashes and `CONTEXT_LOST_WEBGL` errors.

### Universal Three.js Scene Cleanup Function
```typescript
export function disposeThreeScene(scene: THREE.Scene, renderer?: THREE.WebGLRenderer) {
  scene.traverse((object) => {
    if (!(object as THREE.Mesh).isMesh) return;
    const mesh = object as THREE.Mesh;

    // Dispose Geometry
    mesh.geometry?.dispose();

    // Dispose Material & Textures
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(disposeMaterial);
    } else if (mesh.material) {
      disposeMaterial(mesh.material);
    }
  });

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement?.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }
}

function disposeMaterial(mat: THREE.Material) {
  // Dispose all potential texture maps on the material
  const m = mat as any;
  const textureKeys = ["map", "normalMap", "roughnessMap", "metalnessMap", "alphaMap", "emissiveMap"];
  textureKeys.forEach((key) => {
    if (m[key] && typeof m[key].dispose === "function") {
      m[key].dispose();
    }
  });
  mat.dispose();
}
```

---

## 4. Gentle, Cinematic Motion & Transition Standards

To ensure interactions feel tactile, premium, and calm rather than frantic:

### A. Easing Design Tokens
- **Cinematic Ease-Out (DOM & Micro-Interactions)**:
  `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, natural deceleration with zero bounce)
- **Fluid Floating Motion**:
  `Math.sin(elapsedTime * 1.2) * 0.05` (slow, organic hover rhythm)
- **Soft Damped Magnetic Pointer**:
  `targetAngle = normalizedMouse * 0.25` (subtle bounding to avoid dizzying tilts)

### B. Single Ownership Principle
To prevent jank and animation stutter:
- **GSAP / ScrollTrigger**: Owns section scroll progress and global camera travel path.
- **`useFrame` / RAF**: Owns internal character micro-motion (idle breathing, head glance tracking).
- **Framer Motion**: Owns DOM UI elements (text reveals, drawer slides, button hover states).
- **Never** let two systems write to the same object property at the same time.

### C. Hardware-Accelerated CSS Transitions
For DOM overlays and page sections:
```css
/* Ensure GPU composite layer with no subpixel font blur */
.smooth-transition {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}
```

---

## 5. Character Pipeline & IP Safeguards
- **Originality**: All robot assets must have distinct proportions, mechanical joint structures, and aesthetic identities.
- **No IP Infringement**: Never reproduce Transformers logos, head sculpts (e.g. Optimus, Bumblebee), or trademarked likenesses.
- **Optimization Checklist**:
  - Max polycount: < 80,000 triangles for hero character; < 30,000 for secondary characters.
  - Textures: 1024x1024 or 2048x2048 max, compressed with WebP or KTX2.
  - Rigging: Keep bone count under 64 bones for fast skeletal skinning.

---

## 6. Implementation Runbook & Verification
When adding or updating 3D features:
1. **Frame Stability Check**: Verify in Chrome DevTools Performance panel that no single task exceeds 16.6ms (60fps) during orbit or scroll.
2. **Tab Switch Test**: Minimize or switch tabs for 10 seconds, then return. Verify that the 3D model does not jump, glitch, or freeze.
3. **Memory Leak Test**: Mount, unmount, and switch characters 5 times. Verify heap memory stabilizes and active WebGL context count does not exceed 1.
4. **Code Quality**:
   - `npm run typecheck` passes with zero errors.
   - `npm run lint` passes with zero warnings.
