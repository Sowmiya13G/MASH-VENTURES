"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Character } from "@/data/characters";

interface Character3DModelProps {
  character: Character;
  interactive?: boolean;
}

export default function Character3DModel({ character, interactive = true }: Character3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe10600, 3.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const cyanRim = new THREE.DirectionalLight(0x00d2ff, 1.8);
    cyanRim.position.set(6, -2, -2);
    scene.add(cyanRim);

    // Root Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // Holographic Cyber Pedestal (Cylinder + Grid rings)
    const baseGeo = new THREE.CylinderGeometry(1.9, 2.1, 0.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x220505,
    });
    const pedestal = new THREE.Mesh(baseGeo, baseMat);
    pedestal.position.y = -2.7;
    characterGroup.add(pedestal);

    // Glowing Neon Ring on Pedestal
    const ringGeo = new THREE.TorusGeometry(1.92, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe10600 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.62;
    characterGroup.add(ring);

    // Outer cyber scanner ring
    const outerRingGeo = new THREE.TorusGeometry(2.35, 0.015, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.6,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = -2.68;
    characterGroup.add(outerRing);

    // Load Character Texture
    const textureLoader = new THREE.TextureLoader();
    const imagePath = `/characters/${character.slug}.png`;

    let meshLayers: THREE.Mesh[] = [];

    textureLoader.load(
      imagePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // Multi-layered depth parallax figure (gives real 3D volume & depth)
        const planeGeo = new THREE.PlaneGeometry(3.4, 5.2, 32, 32);

        // Core Figure Layer
        const coreMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.05,
          metalness: 0.35,
          roughness: 0.45,
          side: THREE.DoubleSide,
        });

        const coreMesh = new THREE.Mesh(planeGeo, coreMat);
        coreMesh.position.set(0, -0.05, 0);
        characterGroup.add(coreMesh);
        meshLayers.push(coreMesh);

        // Holographic Back Reflection Depth Layer
        const backMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.35,
          color: 0x111111,
          side: THREE.DoubleSide,
        });
        const backMesh = new THREE.Mesh(planeGeo, backMat);
        backMesh.position.set(0, -0.05, -0.12);
        backMesh.scale.set(0.98, 0.98, 1);
        characterGroup.add(backMesh);
        meshLayers.push(backMesh);

        // Front Specular Glint Layer
        const glintMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.25,
          color: 0xff4444,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        });
        const glintMesh = new THREE.Mesh(planeGeo, glintMat);
        glintMesh.position.set(0, -0.05, 0.08);
        characterGroup.add(glintMesh);
        meshLayers.push(glintMesh);

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load character texture:", err);
        setLoading(false);
      }
    );

    // Mouse Interaction / Orbit State
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.009;
        targetRotationX += deltaY * 0.005;
        // Clamp vertical tilt
        targetRotationX = Math.max(-0.35, Math.min(0.35, targetRotationX));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle magnetic mouse tracking when hovering
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = normX * 0.45;
        targetRotationX = normY * 0.2;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle floating breathing cycle
      characterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Outer cyber ring continuous spin
      outerRing.rotation.z = elapsedTime * 0.4;

      // Smooth damped rotation towards target
      if (!isDragging) {
        // Continuous subtle 360 showcase drift
        targetRotationY += 0.003;
      }

      characterGroup.rotation.y += (targetRotationY - characterGroup.rotation.y) * 0.06;
      characterGroup.rotation.x += (targetRotationX - characterGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [character.slug, interactive]);

  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-mash-red border-t-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-chrome/60">
              Loading 3D Model...
            </span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-chrome/70 backdrop-blur-sm border border-white/10">
        3D View • Drag to Rotate
      </div>
    </div>
  );
}
