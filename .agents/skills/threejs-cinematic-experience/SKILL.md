# Skill: Three.js Cinematic Experience & Transformation Engine

## Purpose
A specialized technical runbook for implementing high-performance, dark cinematic 3D web experiences in Next.js using Three.js, React Three Fiber, Drei, and GSAP. Built specifically to power the **futuristic yellow sports car &rarr; humanoid robot transformation sequence** while strictly guaranteeing zero lag, 60–120 FPS frame stability, and buttery smooth transitions.

---

## 1. Technical Stack & Architecture

- **Rendering Layer**: Three.js + `@react-three/fiber` (React 19 compatible)
- **3D Helpers & Asset Loading**: `@react-three/drei` (`useGLTF`, `useAnimations`, `PerspectiveCamera`, `Environment`)
- **Cinematic Timeline Choreography**: GSAP + `ScrollTrigger`
- **UI State & Micro-Interactions**: Framer Motion
- **Model Standard**: GLTF/GLB with embedded Draco compression and KTX2/WebP textures

```text
src/
  components/
    three/
      TransformationHero/
        TransformationCanvas.tsx    # Client-only dynamic wrapper (ssr: false)
        TransformationScene.tsx     # Lights, camera rig, environment
        SupercarRobotModel.tsx      # Rigged transformation model & AnimationMixer
        CameraRig.tsx               # Damped camera paths with GSAP sync
        LightingSetup.tsx           # Cybernetic studio lighting
      common/
        WebGLFallback.tsx           # Mobile & non-WebGL fallback
        CanvasErrorBoundary.tsx     # Crash recovery
```

---

## 2. Rigged Car-to-Robot Transformation Pipeline

### A. The Core Technical Requirement
A static car mesh cannot realistically transform through procedural code alone. A convincing mechanical transformation requires:
1. **Segmented Geometry**: Wheels, fenders, hood, doors, roof, and chassis modeled as distinct articulated sub-meshes.
2. **Skeletal Hierarchy**: Bones assigned to mechanical pivots (suspension folding into leg struts, hood splitting into chest plates, cockpit recessing to reveal head armature).
3. **Authored Animation Clips**:
   - `Drive`: Wheels spinning, subtle suspension bounce.
   - `Transform`: 0.0 to 1.0 sequenced unfolding action.
   - `RobotIdle`: Post-transformation breathing cycle and optical scanner pulse.

### B. Playback Control via GSAP & Scroll
To synchronize the transformation with visitor scroll or hero entrance:

```typescript
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export function SupercarRobotModel({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/supercar-transformer.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    const transformAction = actions["Transform"];
    if (!transformAction) return;

    transformAction.play();
    transformAction.paused = true; // Controlled externally via timeline
  }, [actions]);

  // Update animation frame strictly based on normalized progress (0.0 to 1.0)
  useFrame(() => {
    const transformAction = actions["Transform"];
    if (transformAction) {
      const clipDuration = transformAction.getClip().duration;
      // Damped interpolation towards target progress
      transformAction.time = THREE.MathUtils.lerp(
        transformAction.time,
        progress * clipDuration,
        0.1
      );
      mixer.update(0); // Evaluate at current scrubbed time
    }
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}
```

---

## 3. Zero-Lag & Zero-Hang Standards

### A. Delta-Time Clamping
Never calculate animation steps without delta clamping. When tabs switch or blur, delta surges, which will freeze or crash the browser upon refocus:
```typescript
useFrame((state, delta) => {
  const safeDelta = Math.min(delta, 0.05); // Cap at 50ms (20fps floor step)
  // Use safeDelta for all physics, mixers, and damping
});
```

### B. Frame-Rate Independent Exponential Damping
```typescript
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
```

### C. Offscreen & Background Suspension
```typescript
// Suspend render loops when the canvas is scrolled out of viewport
const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) {
    // Pause RAF loop
  }
});
```

### D. Adaptive DPR & Power Preference
```typescript
<Canvas
  gl={{
    powerPreference: "high-performance",
    antialias: true,
    alpha: true,
  }}
  dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.0 : 1.5]}
>
```

---

## 4. Single Property Ownership Principle
To prevent micro-stuttering:
- **GSAP**: Owns world camera movement and master section scroll timelines.
- **`useFrame`**: Owns subtle magnetic mouse lookAt and idle breathing offsets.
- **Framer Motion**: Owns DOM elements, typography reveals, and buttons.
- **Rule**: Never permit two animation engines to modify the same coordinate simultaneously.

---

## 5. WebGL Garbage Collection Runbook
On unmount, all GPU resources must be freed:
```typescript
scene.traverse((obj) => {
  if ((obj as THREE.Mesh).isMesh) {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m.dispose());
    } else if (mesh.material) {
      mesh.material.dispose();
    }
  }
});
renderer.dispose();
renderer.forceContextLoss();
```

